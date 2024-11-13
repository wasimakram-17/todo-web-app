const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json('User registered successfully');
    } catch (err) {
        res.status(400).json(err.message);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json(err.message);
    }
};
