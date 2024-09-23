import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import isEmail from 'validator/lib/isEmail'
import countries from './countries.json'
import './SignUp.css'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { saveDocument } from "../../api/API's";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+]).{8,24}$/;


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [value, onChange] = useState(new Date());
    const formattedDate = value ? dayjs(value).format('YYYY-MM-DD') : 'None';

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [gender, setGender] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('');

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['jwt'])

    useEffect(() => {
        if (cookies.flag) {
            navigate('/')
        }
    }, []);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setValidEmail(isEmail(email))
    })

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await saveDocument("SignUp", {
                userName: user,
                email: email,
                dateOfBirth: formattedDate,
                gender: gender,
                password: pwd,
                country: selectedCountry,
            });

            console.log(response)
            if (response.user && response.token) {
                toast.success("Account created");
                navigate('/login');
            } else {
                if (response.status === 401) {
                    console.log("username is already taken")
                }
                if (response.status === 402) {
                    console("email already in use")
                }
            }
        } catch (err) {

        }

    };

    return (
        <div className="d-flex justify-content-center pt-5">
            <section className="section-container rounded-4">
                <form onSubmit={handleSubmit} className="form-container">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="d-flex justify-content-center">Sign Up</h1>
                    <p className="h6" style={{ textAlign: "center" }}>We need you to help us with some basic information to create your account.</p>

                    {/*-------------------------------Username Area-------------------- */}
                    <div className="d-flex justify-content-start flex-column pt-3">
                        <label htmlFor="username" className="label-field">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className="input-field SignUpBars"
                            placeholder="Username"
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>
                    {/*-------------------------------Email Area-------------------- */}
                    <div className="d-flex justify-content-start flex-column pt-3">
                        <label htmlFor="email" className="label-field">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className="input-field SignUpBars"
                            placeholder="example@gmail.com"
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please provide a valid email<br />

                        </p>
                    </div>


                    {/*-------------------------------Password Area-------------------- */}

                    <div className=" d-flex justify-content-start flex-column pt-3">
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="input-field SignUpBars"
                            placeholder="••••••••••••"
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd" className="pt-3">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="input-field SignUpBars"
                            placeholder="••••••••••••"
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        {/*-------------------------------Gender Area-------------------- */}
                        <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                            <span style={{ fontWeight: "500" }}>Gender</span>
                            <div className="d-flex justify-content-center gap-5">
                                <div className="d-flex align-items-center me-3">
                                    <input
                                        type="radio"
                                        id="genderMale"
                                        name="gender"
                                        value="Male"
                                        checked={gender === 'Male'}
                                        onChange={() => setGender('Male')}

                                    />
                                    <label htmlFor="genderMale">
                                        <i className="bi bi-gender-male p-2 rounded-circle icon" style={{ backgroundColor: "#F4F8FF" }}></i>
                                        <span className="ms-1">Male</span>
                                    </label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="radio"
                                        id="genderFemale"
                                        name="gender"
                                        value="Female"
                                        checked={gender === 'Female'}
                                        onChange={() => setGender('Female')}

                                    />
                                    <label htmlFor="genderFemale">
                                        <i className="bi bi-gender-female p-2 rounded-circle icon" style={{ backgroundColor: "#F4F8FF" }}></i>
                                        <span className="ms-1">Female</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <DatePicker onChange={onChange} value={value} className="pt-5" />
                        {/*-------------------------------country Area-------------------- */}
                        <select
                            className="form-control mt-5 mb-4"
                            name="country"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)} >
                            <option value="" disabled hidden>Select your country</option>
                            {countries.countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="SubmitButtonSignUp" disabled={!validName || !validPwd || !validMatch || !gender || !selectedCountry ? true : false}>Sign Up</button>
                    <small className="pt-4">
                        By clicking the button, I accept the <a href='/TOS'>Terms of Use of the service</a> and its <a href='/PRP'>Privacy Policy</a>, as well as consent to the processing of personal data.
                    </small>
                    <div className="w-100 d-flex justify-content-between align-items-center ps-1 pe-1">
                        <span className="opacity-25" style={{ backgroundColor: "black", width: "100%", height: "2px" }} />
                        <span className="p-2">or</span>
                        <span className="opacity-25" style={{ backgroundColor: "black", width: "100%", height: "2px" }} />
                    </div>
                    <div>
                        <p className="text-center" style={{ color: "black", fontSize: "14px", margin: "5px 0" }}>Already have an account? <a href="/login" style={{ fontSize: "14px", marginLeft: "5px", color: "#2d79f3", fontWeight: "500", cursor: "pointer", textDecoration: "none" }}>Login</a></p>
                    </div>
                </form>
            </section >
        </div>

    );
}

export default Register;
