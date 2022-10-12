const express = require('express');
// const { checkToken } = require('../../middleware/auth_middleware');
let router = express.Router();
const {User} = require('../../models/user_model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

router.route('/register')
.post(async(req, res) => {
    try {
        const account = req.body.account;
        const password = req.body.password;
        const sid = req.body.sid;
        const zone = req.body.zone;

        let user = new User({
            account,
            password,
            sid,
            zone
        })

        await user.save();

        console.log('user register');

        res.json({
            message: 'user register'
        })

    } catch(err) {
        console.log('/auth/register post error',err);
        res.json({
            message: 'register failed',
            error: err
        })
    }
})

router.route('/login')
.post(async(req, res) => {
    const sid = req.body.sid
    const password = req.body.password;
    try {

        const loginUser = await User.findOne({sid});
        if(!loginUser) {
            const errMessage = {message: 'login failed', error: 'wrong staff id'};
            console.log(errMessage);
            res.json(errMessage);
            return;
        }

        loginUser.comparePassword(password, function(err, result) {
            if(err) {
                const errMessage = {message: 'wrong password', error: err};
                console.log(errMessage);
                res.json(errMessage);
                return;
            }

            if(result) {
                let token = loginUser.generateToken();
                //res.cookie('auth', token).json({message: 'login success', role: loginUser.role});
                res.cookie('auth', token).json({message: 'login success', role: loginUser.role, cookie_: {name: 'auth', token: token}});

            } else {
                res.json({message: 'login failed', error: 'wrong password'});
            }

            return;

        })


    } catch(err) {
        console.log({
            message: 'login failed',
            error: err
        })
        res.json({
            message: 'login failed',
            error: err
        })
    }
})

router.route('/verify')
.post(async(req, res) => {
    try {
        const cookieName = req.body.cookieName;
        const cookieToken = req.body.cookieToken;

        console.log(`cookieName: ${cookieName}, cookieToken: ${cookieToken}`)

        if (cookieName) {
            const token = cookieToken;
            const decoded = jwt.verify(token, jwtSecret); //decoded === user _id
            const loginUser = await User.findById(decoded);

            // console.log(loginUser);

            res.json({ login: true, role: loginUser.role, zone: loginUser.zone, account: loginUser.account, sid: loginUser.sid });

            // next();
        } else {
            console.log('no auth token');
            res.json({ login: false, message: 'no auth token' });
            // next();
        }

    } catch (err) {
        return res.status(401).json({ message: 'Bad Token', errors: err });
    }
})

router.route('/admin')
.get(async(req, res) => {
    try {
        const allUser = await User.find();

        res.json(allUser);
        
    } catch(err) {
        console.log({message: '/admin error', errors: err});
        res.json({message: '/admin error', errors: err});
    }
})
.patch(async(req, res) => {
    try {
        const id = req.body.id;
        const zone = req.body.zone;
        const role = req.body.role;

        if(!role) {
            await User.updateOne({_id: id}, {$set: {zone}});
            res.json({message: 'update zone successful', update: true});
        } 
        if(!zone) {
            await User.updateOne({_id: id}, {$set: {role}});
            res.json({message: 'update role successful', update: true});
        }

     
    } catch(err) {
        console.log(err);
        res.json({
            message:'/admin patch errors',
            errors: err
        })
    }
})
.delete(async(req, res) => {
    const id = req.body.id;

    try {
        await User.findByIdAndRemove(id);
        res.json('user delete successful');

    } catch(err) {
        console.log({message: 'delete account falied', errors: err});
        res.json({message: 'delete account falied', errors: err});
    }
})

router.route('/test')
.get(async(req, res) => {
    try {
        res.json({message: 'testing response ok!!'})
    } catch(err) {
        res.json({message: 'testing response failed!', error: err})

    }
})

module.exports = router;
