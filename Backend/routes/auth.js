const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const fetchuser=require('../middlewares/fetchuser');
const getDetail = require('../controllers/getAuth-controller');
const createUser = require('../controllers/create-controller');
const authentication = require('../controllers/auth-controller');

// app.get /app.use nhi karna h yha par router.get/router.use likhna h

// ROUTE 1: Create a user using: POST "/api/auth/createuser". Doesn't require auth
router.post('/createuser',
    body('name', 'Enter a name (min length = 3).').isLength({ min: 3 }),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Enter a password (min length = 5).').isLength({ min: 5 }),
    createUser
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". Doesn't require auth
router.post('/login',
    body('email', 'Enter a valid email.').isEmail(),
    body('password', "Password cann't be blank.").exists(),
    authentication
    );

// ROUTE 3: Get loggedIn user details using: POST "/api/auth/userposts". Login Required
router.post('/userposts',fetchuser,getDetail);

module.exports = router