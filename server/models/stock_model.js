const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    zone: {
        type: String,
        enum:['00', '01', '02','03','04','05','06','07','08','09'],
        unique: true
    },
    stock: [{
        ean: String,
        productName: String,
        sysQty: Number,
        onHandQty: {
            type: Number,
            default: 0
        },
        sid: [{
            name: String,
            sid: Number,
            times: Number
        }]
    }]
   
})



const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock };

// const userSchema = mongoose.Schema({
//     account: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: 1
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     sid: {
//         type: Number,
//         required: true,
//         trim: true,
//         unique: 1
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin', 'newbie'],
//         default: 'newbie'
//     },
//     zone: {
//         type: String,
//         enum:['00', '01', '02','03','04','05','06','07','08','09']
//     }
// })

// userSchema.pre('save', function(next) {
//     let user = this;

//     bcrypt.genSalt(saltRounds, (err, salt) => {
//         if(err) {
//             console.log({
//                 message: 'gen salt error',
//                 error: err
//             })
//             next();
//         }

//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if(err) {
//                 console.log({
//                     message: 'bcrpt hash error',
//                     error: err
//                 });
//             }

//             user.password = hash;
//             next();
//         })
//     })

// })

// userSchema.method('comparePassword', function(password, cb) {
//     let user = this;

//     bcrypt.compare(password, user.password, (err, result) => {
//         if(err) {
//             const errMessage = {
//                 message: 'bcrypt compare error',
//                 error: err
//             }
//             console.log(errMessage);
//             cb(err);
//             return;
//         }

//         cb(null, result);
//     })
// })

// userSchema.method('generateToken', function() {
//     let user = this;
//     // console.log(user);
//     let token = jwt.sign(user._id.toString(), jwtSecret);

//     return token;
    
// })

// const User = mongoose.model('User', userSchema);

// module.exports = { User };