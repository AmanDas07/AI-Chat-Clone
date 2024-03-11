import errorResponse from "../utils/errorResponse.js";
import userModel from "../models/userModel.js"

export const sendToken = async (user, stausCode, res) => {
    //console.log("ghusaa");
    const token = user.getSignedToken(res);
    res.status(stausCode).json({
        success: true,
        token,
    })
}

export const registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return next(new errorResponse('Email is already Registered', 500));
        }
        const user = await userModel.create({ username, email, password });
        sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new errorResponse('Please provide Email or Password'));
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new errorResponse("Invalid Email or Password", 401));

        }

        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return next(new errorResponse("Invalid Email or Password", 401))
        }
        sendToken(user, 200, res);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const logoutController = async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json({
        success: true,
        message: "Logout Succesfully",
    });
}