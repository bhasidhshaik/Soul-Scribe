import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
export const googleLogin = async (req, res) => {
    try {
      const { code } = req.body;
      const token = code;
      // console.log(token);
      
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      // console.log(payload);
      
      const { email, name, picture , sub:googleId } = payload;

      let user = await User.findOne({email})
      if(!user){
        user = new User({email, name, picture , googleId})
        await user.save();
      }
      generateTokenAndSetCookie(user._id , res)
      res.status(200).json({ email, name, picture });
   
      
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Invalid token', error });
    }
  };

  export const getMe = async(req , res)=>{
    try {
      const user = await User.findById(req.user._id).select("-_id -googleId");
      res.status(200).json(user);
    } catch (error) {
      console.log("Error in getMe controller" , error);
      res.status(400).json({ message: 'Internal server error' });
    }

  }