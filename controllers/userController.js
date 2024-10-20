import validator from "validator";
import userModel from "../models/userModel";

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

    // create new user
    const newUser = new userModel({ name, email, password });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {}
};

// route for admin login
const adminLogin = async (req, res) => {
  // authenticate admin credentials
};

export { loginUser, registerUser, adminLogin };
