/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcryptjs');

module.exports = {

    register: async function (req, res) {
        const { username, password } = req.body;

        try {
            // Check if the username is already taken
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Encrypt the password
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await User.create({ username, password: encryptedPassword }).fetch();

            // Return success message or user data
            return res.json({ message: 'User registered successfully', user: newUser });
        } catch (err) {
            return res.serverError(err);
        }
    },

    login: async function (req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Set authenticated session
            req.session.authenticated = true;
            req.session.user = user;

            // สร้าง token หรือ session สำหรับล็อคอินแล้วส่งกลับไปยัง client
            // เช่นใช้ JWT token, session, หรือตัวบอกสถานะล็อคอินอื่นๆ
            return res.json({ message: 'Login successful', user });
        } catch (err) {
            return res.serverError(err);
        }
    },

    logout: async function (req, res) {
        try {
            // Clear session
            req.session.authenticated = false;
            req.session.user = null;

            return res.json({ message: 'Logout successful' });
        } catch (err) {
            return res.serverError(err);
        }
    },

    repassword: async function (req, res) {
        const { username, newPassword } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Encrypt the new password
            const encryptedPassword = await bcrypt.hash(newPassword, 10);

            // Update user's password
            await User.updateOne({ id: user.id }).set({ password: encryptedPassword });

            // Return success message
            return res.json({ message: 'Password updated successfully' });
        } catch (err) {
            return res.serverError(err);
        }
    },

    checkAuth: function (req, res, next) {
        console.log(req.session.authenticated)
        console.log(req.session.user)

        // Check if session contains authenticated user
        if (req.session.authenticated && req.session.user) {
            // User is authenticated, proceed to next middleware or action
            // return next();
            return res.json({
                // id
                username:req.session.user.username,
            });
        } else {
            // User is not authenticated, return unauthorized response
            return res.status(401).json({ message: 'Unauthorized' });
        }
    },

};

