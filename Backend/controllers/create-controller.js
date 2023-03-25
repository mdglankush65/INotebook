const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Client aur server k beech bhut hi secure communication karwata h JWT
// contains three parts first is title and second is body and then the signature which is very important component.

const JWT_Secret = 'Ankushisagoodb$oy';

const createUser = async (req, res) => {
    // console.log(req.body);
    // const u1= user(req.body);
    // u1.save();
    // if there are errors then return bad requests and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        //      check whether the user with this email exist already or not.
        let User = await user.findOne({ email: req.body.email });
        // console.log(User);
        let success=false;
        if (User) { // if user is !=NULL aur already exist then give this message.
            return res.status(400).json({ success, err: "Sorry, a user with this email already exists." });
        }
        // creating a salt and then added it to the hashcode of our password 
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        // creating a new user
        User = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        });
        const data = {
            User: {
                id: User.id
            }
        }
        const authToken = jwt.sign(data, JWT_Secret);
        // console.log(jwtData);
        // res.json(User);
        success=true;
        res.json({ success, authToken });
    } catch (error) {
        // if any unwanted error occured then this will run and show the 500 error status.
        console.log({ error: error.message });
        res.status(500).send("Internal Server Error.");
    }
    // user.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }).then(user => res.json(user))
    // .catch(err=>{console.log(err);
    //     res.json({err: 'Please enter a unique email.', message:err.message});
    // })
    // res.send(req.body);
}

module.exports=createUser;