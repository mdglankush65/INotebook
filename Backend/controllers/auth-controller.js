const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Client aur server k beech bhut hi secure communication karwata h JWT
// contains three parts first is title and second is body and then the signature which is very important component.

const JWT_Secret = 'Ankushisagoodb$oy';

const authentication = async (req, res) => {
    // if there are errors then return bad requests and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let User = await user.findOne({ email });
        let success=false;
        if (!User) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
        const passwordCompare = await bcrypt.compare(password, User.password);
        if (!passwordCompare){
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
            

        const data = {
            User: {
                id: User.id
            }
        }
        const authToken = jwt.sign(data, JWT_Secret);
        success=true;
        res.json({ success, authToken });
    } catch (error) {
        // if any unwanted error occured then this will run and show the 500 error status.
        console.log({ error: error.message });
        res.status(500).send("Internal Server Error.");
    }
}

module.exports=authentication;