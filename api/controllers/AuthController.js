/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
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

    login: async function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return res.serverError(err); }
            if (!user) { return res.forbidden(info && info.message); }
            req.logIn(user, function (err) {
                if (err) { return res.serverError(err); }
                return res.ok("Logged in successfully!");
            });
        })(req, res);
    },

    checkAuth: function (req, res) {
        if (req.isAuthenticated()) {
            return res.json({
                message: 'User is authenticated',
                username: req.user.username
            });
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    },

    logout: async function (req, res) {
        req.logout();
        return res.send("Logged out successfully!");
    },


};

