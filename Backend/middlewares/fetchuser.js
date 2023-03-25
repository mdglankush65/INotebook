const jwt = require('jsonwebtoken');
const JWT_Secret = 'Ankushisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to request object
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ error: "Access Denied -- Please authenticate using a valid token." });
    try {
        const data = jwt.verify(token, JWT_Secret);
        req.user = data.User;
        next();
    } catch (error) {
        // if any unwanted error occured then this will run and show the 500 error status.
        // console.log({ error: error.message });
        res.status(401).json({ error: "Access Denied -- Please authenticate using a valid token." });
    }
}
module.exports = fetchuser;