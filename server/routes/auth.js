import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import multer from 'multer';
import User from '../models/User.js';



const router = express.Router()
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "public/uploads/")
    },
    
    filename:function(req,file,cb){
        cb(null, file.originalname);
    },

});
const upload = multer({storage})




//User register 

router.post("/register",upload.single("profileImage"), async (req, res)=>{

try{
    //get all information from the form 
    const {firstName, lastName, email, password} = req.body
    
    const profileImage = req.file;
    if(!profileImage){
        return res.status(400).send("no file uploaded")
    }
// path of uploaded profile image
const profileImagePath = profileImage.path


//checking if user exist
const existingUser = await User.findOne({email})
if(existingUser){
    return res.status(409).json({message:"User already exists!"})
}


//hashing the password
const salt = await bcrypt.genSalt()
const hashedPassword = await bcrypt.hash(password, salt)


//creating a new user
const newUser = new User({
    firstName,
    lastName,
    email,
    password:hashedPassword,
    profileImagePath,
});

//saving the new User
await newUser.save()


//if successful send successful message
res.status(200).json({message:"User registered successfully!",user:newUser})

}catch(err){
console.log(err)
res.status(500).json({message:"User Registration failed", error:err.message })
}

});





// User login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Correct capitalization for User model
        const user = await User.findOne({ email }); // Use 'User' instead of 'user'
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist!" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "An error occurred during login" });
    }
});

export default router;







