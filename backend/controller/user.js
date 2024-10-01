const User = require("../userschema");
const bcrypt = require('bcrypt');

// Signup route
// const signupuser = async (req, res) => {
//     try {
//         const { password, ...data } = req.body;

//         if (password.length < 6) {
//             return res.status(400).json({ error: 'Password must be at least 6 characters long' });
//         }

//         const user = new User({ ...data, password });
//         const response = await user.save();
//         console.log('Signup Successfully');
//         res.status(201).json({ response });
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({ error: err.message });
//     }
// }

// Login user
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ user: { id: user.id, name: user.name } });
        console.log("Login  Successfully");

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}
//update profile
const updateprofile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
            
            user.name = name;
            user.email = email;
            await user.save();
            res.status(200).json({ user });
            console.log("Profile updated Successfully");

        }
        catch(err){
            console.log(err);
            res.status(400).json({ error: err.message });
        }
    }

// Update password route (protected)
const updatepass = async (req, res) => {
    const userId = req.params.id;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send("User not found");
    }

    user.password = await (password);
    await user.save();
    return res.status(200).send("Password updated successfully");
}

module.exports = { loginuser, updatepass, updateprofile };
