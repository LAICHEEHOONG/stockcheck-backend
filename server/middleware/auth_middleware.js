const { User } = require('../models/user_model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

exports.checkToken = async (req, res, next) => {
    try {
        if (req.cookies.auth) {
            const token = req.cookies.auth;
            const decoded = jwt.verify(token, jwtSecret); //decoded === user _id
            const loginUser = await User.findById(decoded);

            // console.log(loginUser);

            res.json({ login: true, role: loginUser.role, zone: loginUser.zone, account: loginUser.account, sid: loginUser.sid });

            next();
        } else {
            console.log('no auth token');
            //res.json({ login: false, message: 'no auth token' });
            next();
        }

    } catch (err) {
        return res.status(401).json({ message: 'Bad Token', errors: err });
    }
}

