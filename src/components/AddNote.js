import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote]=useState({
        title:"",
        description:"",
        tag:""
    });
    // let flag=false;
    const addingNote=(e)=>{
        e.preventDefault();
        // if (flag){
            addNote(note.title, note.description, note.tag);
            setNote({
                title: "",
                description: "",
                tag: ""
            });
            props.showAlert('Added Successfully', 'success');
        // }
        // else
        //     props.showAlert('Empty Note can\'t Added ', 'danger');
    }
    const collectData=(e)=>{
        // flag=true;
        setNote({...note,[e.target.name]:e.target.value});
    }
    return (
        <>
            <div className="my-3">
                <h4>Add a note</h4>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title}  onChange={collectData} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={collectData} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={collectData} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addingNote}>Add</button>
                </form>
            </div>
        </>
    )
}

export default AddNote