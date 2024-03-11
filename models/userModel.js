import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js"
import JWT from "jsonwebtoken";
import cookie from "cookie";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [7, "Minimun length of password should be of 7 digits"],
        unique: true,
    },
    customerId: {
        type: String,
        default: "",
    },
    subscription: {
        type: String,
        default: "",
    },

});

userSchema.pre('save', async function (next) {  //Before saving userChema we hash the password using next middleware, which when called first hash the password and then save the Schema 
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//match-password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);

}

//Signed-Tokens
userSchema.methods.getSignedToken = function (res) {
    const accessToken = JWT.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });
    const refreshToken = JWT.sign({ _id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN })
    res.cookie('resfreshToken', `${refreshToken}`, { maxAge: 86400 * 7000, httpOnly: true })
}

const User = mongoose.model("User", userSchema);

export default User;