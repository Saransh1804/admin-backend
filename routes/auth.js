const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER

router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
    });

    try{

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        // console.log(savedUser);
    }catch(err){
        // console.log(err);
        res.status(500).json(err);
    }
})

//LOGIN

router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});

        !user && res.status(401).json("Wrong credentials");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET);

        // CryptoJS.enc.Utf8 YE LAGANA PADEGA WRNA WO PASSWORD GALAT BTA RHA H
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const InputPassword = req.body.password;

        Originalpassword !== InputPassword && res.status(401).json("Wrong credentials")

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
                {expiresIn:"3d"}
            );

        // password chupane ke liye
        const { password , ...others} = user._doc;

        
        // IF EVERYTHING IS OKAY
        res.status(200).json({...others,accessToken});


    }catch(err){
        // console.log(err);
        res.status(500).json(err);
    }

})



module.exports = router;