const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        }
    },
    password: { type: String, required: true, trim: true, minlength: 9 },
    tokens: [{
        token: { type: String, required: true }
    }]
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 11);
    }
    next();
});

userSchema.methods.generateAuthTokens = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_JWT);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.loginUser = async (email, pass) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email or password');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
        throw new Error('Incorrect email or password');
    }
    return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
