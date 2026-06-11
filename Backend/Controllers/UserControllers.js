import User from '../Models/User.js';
import bcrypt from 'bcrypt';
import { connect } from 'mongoose';


export const Signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already Exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashPassword
        })

        res.status(200).json({ message: "User register Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        console.log(error)
    }
}

// Login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User Not Found" })
        }

        const Password = await bcrypt.compare(password, user.password)
        if (!Password) {
            res.status(400).json({ message: "Invailed Codinasile" })
        } else {

            res.status(200).json({ message: "Login Successfully", userId: user._id, name: user.name })
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        console.log(error)
    }

}