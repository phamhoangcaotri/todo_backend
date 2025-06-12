const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { HTTP_STATUS } = require('../constants/constants');

require('dotenv').config();

exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Username and password are required' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
        return res.status(HTTP_STATUS.EXISTING).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user)
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
};