import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    });
    const notifySuccess = () => toast.success("successfully stored !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const notifyFail = () => toast.warn("fields are null please fill all fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    // let flag=false;
    const addingNote = (e) => {

        // if (flag){
        addNote(note.title, note.description, note.tag);
        setNote({
            title: "",
            description: "",
            tag: ""
        });
        if (!note.title && !note.description && !note.tag) {
            notifyFail();
        } else {
            notifySuccess();
        }

        // }
        // else
        //     props.showAlert('Empty Note can\'t Added ', 'danger');
        e.preventDefault();
    }
    const collectData = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className="my-3">
                <h4>Add a note</h4>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Title</label>
                        <input required type="text" className="form-control" id="title" name='title' value={note.title} onChange={collectData} minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input required type="text" className="form-control" id="description" name='description' value={note.description} onChange={collectData} minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input required type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={collectData} minLength={5} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addingNote}>Add</button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default AddNote