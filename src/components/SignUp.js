import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const Cred = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const host = "http://localhost:5000";
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Api call
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            })
            const json = await response.json();
            // printing the fetched data
            console.log(json);
            if (json.success) {
                // save the auth token and redirect to notes
                localStorage.setItem('token', json.authToken);
                navigate("/");
                props.showAlert('SignIn Successfully', 'success');
            }
            else {
                props.showAlert('Enter Valid Details', 'danger');
            }
        } catch (error) {
            throw error;
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-5 my-5">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={credentials.name} onChange={Cred} />
                </div>
                <div className="mb-5 my-5">
                    <label htmlFor="inputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={Cred} />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={Cred} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp

// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";

// const SignUp = (props) => {
//     const navigate = useNavigate();
//     const [credentials, setCredentials] = useState({ name:"", email: "", password: "" });
//     const Cred = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     }
//     const host = "http://localhost:5000";
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Api call
//         const response = await fetch(`${host}/api/auth/createuser`, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
//         })
//         const json = await response.json();
//         // printing the fetched data
//         console.log(json);
//         // save the auth token and redirect to notes
//         if (json.success) {
//             localStorage.setItem('token', json.authToken);
//             navigate("/");
//             props.showAlert('Account Created Successfully', 'success');
//         }
//         else {
//             props.showAlert('Invalid Credentials', 'danger');
//         }
//     }
//   return (
//     <div>
//           <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="exampleInputEmail1" className="form-label">Your Name</label>
//                   <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={credentials.name} onChange={Cred} />
//               </div>
//               <div className="mb-3">
//                   <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//                   <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={Cred} />
//               </div>
//               <div className="mb-3">
//                   <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//                   <input type="password" className="form-control" id="Password" value={credentials.password} onChange={Cred} />
//               </div>
//               <div className="mb-3">
//                   <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
//                   <input type="password" className="form-control" id="ConfPassword" />
//               </div>
//               <button type="submit" className="btn btn-primary">Submit</button>
//           </form>
//     </div>
//   )
// }

// export default SignUp
