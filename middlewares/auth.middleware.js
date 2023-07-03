const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const auth = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if(!accessToken) {
        res.status(201).json({message : "Please Login..."});
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.SECRET);
        const {userId, role} = decoded;
        const user = await UserModel.findById(decoded.userId);
        if(!user) {
            res.status(400).json({error : "User Not Found"});
        }
        req.user = {userId, role};
        next();
    } catch (error) {
        res.status(400).json({error : "error while authenticating user", error : error})
    }
}

const authorizedUser = (roles) => {
    return (req,res,next) => {
        const { role } = req.user;
        if(!role.include(role)) {
            res.status(403).json({error : "Unauthorized"})
        }
        next();
    };
};

module.exports = {
    auth, authorizedUser
}