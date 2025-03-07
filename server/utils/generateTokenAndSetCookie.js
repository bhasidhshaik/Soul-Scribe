import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    console.log(userId);
    
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "5d" // expires in 5 days
          });
        
          res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 432000000, // expires in 5 days
            path:'/'
          });
          console.log('Res send');
    } catch (error) {
        console.log(error);
        
        
    }
 
};