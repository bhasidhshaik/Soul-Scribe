import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, // Reference to User
    entry: String, // Journal content
    sentimentScore: Number, // Sentiment score (e.g., -1 to 1)
    sentiment: String, // Sentiment label (positive, neutral, negative)
    feedback: String, // AI-generated feedback
  },
  {
    timestamps: true, 
  }
);

const Journal = mongoose.model('Journal' , journalSchema);
export default Journal
  