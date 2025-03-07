import vader from 'vader-sentiment';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Journal from '../models/journal.model.js';

const analyzeSentiment = (text) => {
    const result = vader.SentimentIntensityAnalyzer.polarity_scores(text);
    return result;
};

const generateFeedbackFromGemini = async (text) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Provide a thoughtful and personalized response to the following journal entry. The response should offer emotional support, reflect on the key themes or sentiments expressed, and give practical advice for improving mental well-being. The journal entry is:\n\n"${text}"\n\nMake sure to balance encouragement with constructive suggestions. The tone should be empathetic, non-judgmental, and supportive. Consider the sentiment of the entry to adjust the response accordingly. At the end, include a quote that aligns with the sentiment or theme of the entry, to inspire or offer comfort. The quote should be uplifting and relevant to the context of the journal entry.`;

        const result = await model.generateContent(prompt, { maxOutputTokens: 200 }); // Limit to 300 tokens for a more substantial response

        // console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.log("Error while generating gemini ai feedback");
        return "Trouble while generating response. Try again later";
    }
};

export const createJournal = async (req, res) => {
    try {
        const { entry } = req.body;
        const userId = req.user._id;

        // Check if a journal entry already exists for today
        const today = new Date();

// Create a new Date instance for the start of today
const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0);

// Create a new Date instance for the end of today
const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999);

// Find an existing journal for the user created today
const existingJournal = await Journal.findOne({
    userId,
    createdAt: { $gte: startOfDay, $lte: endOfDay }
});

if (existingJournal) {
    // If a journal entry already exists for today
    // console.log("Exisit");
    
    return res.status(200).json({
        success: false,
        journal:{
 feedback: 'Apologies from Shiba: You can only submit one journal entry per day. But don’t worry, Shiba will be here waiting for you! Please come back tomorrow and share your thoughts with me then.'
        }
       
      });
      
}

// Proceed with saving the journal entry if no existing entry for today


        // Get sentiment analysis result
        const sentimentResult = analyzeSentiment(entry);

        // Generate feedback using Gemini AI
        const feedback = await generateFeedbackFromGemini(entry);

        // Create a new journal entry
        const newJournal = new Journal({
            userId,
            entry,
            sentimentScore: sentimentResult.compound, // Store compound score
            sentiment: sentimentResult.compound > 0 ? 'positive' : sentimentResult.compound < 0 ? 'negative' : 'neutral',
            feedback // AI-generated feedback
        });

        await newJournal.save();

        res.status(201).json({
            success: true,
            message: 'Journal entry created successfully!',
            journal: newJournal
        });
    } catch (error) {
        console.error('Error creating journal entry:', error);
        res.status(500).json({ success: false, message: 'Failed to create journal entry' });
    }
};

export const getJournals = async (req , res)=>{
    const userId = req.user._id;
    try {
        const journals = await Journal.find({ userId }).select('-userId').sort({createdAt : -1}); // Exclude the `userId` field
        if(!journals){
            return res.status(200).json({message  : "No data found. Please write your first journal now."})
        }
        return res.status(200).json(journals);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to retrieve journals', error: error.message });
    }
}
