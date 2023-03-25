import React, { useState } from 'react'
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Fetch all note
    const fetchAllNote = async () => {
        try {
            // Api call
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            })
            const json = await response.json();
            // printing the fetched data
            // console.log(json);
            setNotes(json);

        } catch (error) {
            throw error;
        }
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        try {
            // Api call
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })
            const json = await response.json();
            // Logic to edit note in client side
            console.log("New note added.");
            const note = {
                title: title,
                description: description,
                tag: tag
            };
            setNotes(notes.concat(note));
            console.log(json);

        } catch (error) {
                throw error;
        }
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            // Api call
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })
            const json = await response.json();
            // Logic to edit note in client side
            for (let i = 0; i < notes.length; i++) {
                const element = notes[i];
                if (element._id === id) {
                    element.title = title;
                    element.description = description;
                    element.tag = tag;
                }
            }
            console.log(json);

        } catch (error) {
            throw error;
        }
    }

    // Delete a note
    const deleteNote = async (id) => {
        try {

            // Api call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            })
            const json = response.json();

            // logic to delete a note
            const newNotes = notes.filter((note) => { return note._id !== id });
            // console.log(newNotes);
            setNotes(newNotes);
            console.log(json);

        } catch (error) {
            throw error;
        }
    }

    return (
        // <noteContext.Provider value={{ state, update }}>
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, fetchAllNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;


// faltu ka text
// const s1 = {
    //     "name": 'Ankush',
    //     "age": 20
    // }
    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
            // setState({
            //     "name": 'Ankit',
            //     "age": '23'
            // });
    //         if (state.name === 'Ankush') {
    //             setState({
    //                 "name": 'Ankit',
    //                 "age": '23'
    //             });
    //         }
    //         else {
    //             setState({
    //                 name: 'Ankush',
    //                 age: '20'
    //             });
    //         }
    //     }, 3000);
    // }