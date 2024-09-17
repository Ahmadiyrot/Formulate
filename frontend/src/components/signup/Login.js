import './Login.css'

import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
const LOGIN_URL = '/signIn';

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }

            )
            console.log(response?.data)
            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken })
            setUser('');
            setPwd('');
            setSuccess(true);

        } catch (error) {
            console.log(error)
            if (!error.response) {
                setErrMsg('No server response ')
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }


    }

    return (
        <section className="d-flex w-100 justify-content-center align-items-center h-100 pt-5 mt-5">

            <div className="d-flex justify-content-center w-50 bg-white rounded-4 login-container">
                <div style={{ width: "75%" }}>
                    <div style={{ color: "black" }} className="d-flex justify-content-center align-items-center flex-column pt-3">
                        <p ref={errRef} style={{ color: "red", fontSize: "20px" }} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <p className="h1">Login</p>
                        <p className="h6">Please provide your login information to log in.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="pt-5" style={{ fontWeight: "bold" }}>
                            <label htmlFor='email'>Email Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => { setUser(e.target.value) }}
                                value={user}
                                required
                            />
                        </div>
                        <div className="pt-3" style={{ fontWeight: "bold" }}>
                            <label htmlFor='password'>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={(e) => { setPwd(e.target.value) }}
                                value={pwd}
                                required
                            />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="btn w-100 rounded-5" style={{ backgroundColor: "#FFBF00", fontWeight: "bold" }}>Login</button>
                        </div>
                    </form>

                    <div className="w-100 d-flex justify-content-between align-items-center ps-1 pe-1">
                        <span className="opacity-25" style={{ backgroundColor: "black", width: "100%", height: "2px" }} />
                        <span className="p-2">or</span>
                        <span className="opacity-25" style={{ backgroundColor: "black", width: "100%", height: "2px" }} />
                    </div>
                    <div className="d-flex justify-content-center pt-2">
                        <button className="btn btn-outline-secondary d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" width="20" height="20" className="me-2">
                                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                    <div className="pt-3 pb-5">
                        <p className="text-center" style={{ color: "black", fontSize: "14px", margin: "5px 0" }}>Don't have an account? <a href="/SignUp" style={{ fontSize: "14px", marginLeft: "5px", color: "#2d79f3", fontWeight: "500", cursor: "pointer", textDecoration: "none" }}>Sign Up</a></p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login