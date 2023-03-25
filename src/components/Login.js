import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const Cred = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const host = "http://localhost:5000";
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Api call
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            const json = await response.json();
            // printing the fetched data
            console.log(json);
            if (json.success) {
                // save the auth token and redirect to notes
                localStorage.setItem('token', json.authToken);
                navigate("/");
                props.showAlert('Logged In Successfully', 'success');
            }
            else {
                props.showAlert('Invalid Details', 'danger');
            }
        } catch (error) {
            // res.status(401).json({ error: "Access Denied -- Please authenticate using a valid token." });
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
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

export default Login
