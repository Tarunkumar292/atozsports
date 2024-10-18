const User = require("../modals/userschema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Signup route
const signupuser = async (req, res) => {
    try {
        const { password, ...data } = req.body;

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = new User({ ...data, password: hashedPassword });
        const response = await user.save();
        console.log('Signup Successfully', hashedPassword);
        res.status(201).json({ response });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: "Error fetching user profile" });
    }
};

// Login user and generate token
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, "JWT_SECRET", { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            token,
            user: { id: user.id, name: user.name }
        });
        console.log("Login Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Update user profile 
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateuser = await User.findByIdAndUpdate(req.user._id, {
            name: name,
            email: email

        }, { new: true })

        res.status(200).json({ message: "Profile updated successfully", updateuser });
        console.log("Profile updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating profile" });
    }
}

// Update password 
const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        let updatePassword = await User.findByIdAndUpdate(req.user._id, {
            password: hashedPassword,

        }, { new: true })

        res.status(200).json({ message: "Password updated successfully", updatePassword });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: "Error updating password" });
    }
};

module.exports = { signupuser, getProfile, loginUser, updatePassword, updateProfile };
