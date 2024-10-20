// route for user login 
const loginUser = async (req, res) => {

};
// route for user registration
const registerUser = async (req, res) => {
 res.json({msg : "Registration api working"})
};

// route for admin login
const adminLogin = async (req, res) => {
    // authenticate admin credentials
};

export { loginUser, registerUser, adminLogin};