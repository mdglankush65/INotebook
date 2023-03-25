const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const getAll =require('../controllers/getAll-controller')
const { body } = require('express-validator');
const addNotes = require('../controllers/add-controller');
const updateNote = require('../controllers/update-controller');
const deleteNote = require('../controllers/delete-controller');
// app.get /app.use nhi karna h yha par router.get/router.use likhna h

// ROUTE 1: Get all the notes using : GET "/fetchallnotes" . Login Required
router.get('/fetchallnotes', fetchuser, getAll);

// ROUTE 2: Add a new Note using : POST "/addnote" . Login Required
router.post('/addnote', fetchuser,
    body('title', 'Title must be atleast 3 characters.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters.').isLength({ min: 5 }),
    addNotes);
// ROUTE 3: Update an existing Note using : PUT "/updatenote/:id" . Login Required
router.put('/updatenote/:id', fetchuser,
    updateNote);

// ROUTE 4: Delete an existing Note using : DELETE "/deletenote/:id" . Login Required
router.delete('/deletenote/:id', fetchuser,
    deleteNote);

module.exports = router