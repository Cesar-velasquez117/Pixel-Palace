const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) return res.status(400).json({ message: 'Email already in use'});

        const newUser = new User({ name, email, password, address, phone });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user =  await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};