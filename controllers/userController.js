import validator from "validator";
import userModel from "../models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// create token
const createToken = (id) =>{
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
}


// route for user login
const loginUser = async (req, res) => {};
// route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // validating email address and strong password

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: " Email address already exists" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        });
    }

    // hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);


    // create new user
    const newUser = new userModel({ name, email, password : hashedPassword});
    const savedUser = await newUser.save();

    const token = createToken(user._id)
    res.json({success: true, token})

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// route for admin login
const adminLogin = async (req, res) => {
  // authenticate admin credentials
};

export { loginUser, registerUser, adminLogin };
