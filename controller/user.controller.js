const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const { UserModel } = require("../models/user.model");

const userRegister = async (req, res) => {
    const {name, email, password, role} = req.body;
    try {
        const existingUser = await UserModel.findOne({email});
        if(existingUser) {
            res.status(200).json({message : "User with this email already exist"})
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = new UserModel({name, email, password:hashPass, role});
        await user.save();
        res.status(200).json({message : "User has been register...", user : user})
    } catch (error) {
        res.status(400).json({error : "error while registering", error : error})
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user) {
            res.status(200).json({message: "Invalid Email"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(200).json({message : "Invalid Password"})
        }
        const accessToken = jwt.sign({userId: user._id, role : user.role}, process.env.SECRET, {
            expiresIn : "7d"
        });
        const refreshToken = jwt.sign({userId: user._id, role : user.role}, process.env.ReSECRET, {
            expiresIn : "7d"
        });
        res.status(200).json({message : "logged in successfully", token : accessToken, refresh: refreshToken})
    } catch (error) {
        res.status(400).json({error : "error while logging in", error : error})
    }
}

const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(token) {
            const blackListToken = new BlackList({token});
            await blackListToken.save();
        }
        res.status(200).json({message : "User has been Logout"})
    } catch (error) {
        res.status(400).json({error : "error while logging in", error : error})
    }
} ;

module.exports = {
    userRegister,userLogin,logoutUser
}