
const { BlackList } = require("../models/blackList.model")

const blackListing = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const blackListToken = await BlackList.findOne({token})
        if(blackListToken) {
            res.status(400).json({message : "login please..."})
        }
        next();
    } catch (error) {
        next(error);
    }
} ;

module.exports = {blackListing}