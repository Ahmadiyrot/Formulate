import React, { useState } from 'react';
import './SignUp.css';
import validator from 'validator';
import countries from './countries.json'

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        birthDate: '',
        email: '',
        password: '',
        repeatPassword: '',
        country: ''
    });
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateStepOne = () => {
        const newErrors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;
        const currentDate = new Date();
        const selectedDate = new Date(formData.birthDate);

        if (!nameRegex.test(formData.fullName)) {
            newErrors.fullName = 'Full name must only contain letters and spaces';
        }

        if (!formData.birthDate || selectedDate >= currentDate) {
            newErrors.birthDate = 'Date of birth must be in the past';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStepTwo = () => {
        const newErrors = {};

        if (!validator.isEmail(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (formData.password !== formData.repeatPassword) {
            newErrors.repeatPassword = 'Passwords do not match';
        }

        if (!formData.country) {
            newErrors.country = 'Country is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (validateStepOne()) {
                setStep(2);
            }
        } else {
            if (validateStepTwo()) {
                // Create final form data without repeatPassword
                const finalFormData = {
                    fullName: formData.fullName,
                    gender: formData.gender,
                    birthDate: formData.birthDate,
                    email: formData.email,
                    password: formData.password,
                    country: formData.country
                };
                console.log('Final Form Data:', finalFormData);
                // Final submission logic here
            }
        }
    };

    return (
        <div className="d-flex w-100 justify-content-center align-items-center h-100 pt-5 mt-5">
            <div className="d-flex justify-content-center w-50 bg-white rounded-4">
                <div style={{ width: "45%" }}>
                    <div style={{ color: "black" }} className="d-flex justify-content-center align-items-center flex-column">
                        <p className="h1">Sign up</p>
                        <p className="h6">We need you to help us with some basic information to create your account.</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ps-1 pe-1">
                        <span className={`bi bi-1-circle-fill ps-1 pe-1 ${step === 1 ? '' : 'opacity-25'}`} style={{ color: "black" }} />
                        <span className="opacity-25" style={{ backgroundColor: "black", width: "100%", height: "2px" }} />
                        <span className={`bi bi-2-circle-fill ps-1 pe-1 ${step === 2 ? '' : 'opacity-25'}`} style={{ color: "black" }} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                                    <span style={{ fontWeight: "500" }}>Full name</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ width: "inherit" }}
                                        aria-describedby="nameHelp"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
                                <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                                    <span style={{ fontWeight: "500" }}>Gender</span>
                                    <div className="d-flex justify-content-center gap-5">
                                        <div className="d-flex align-items-center me-3">
                                            <input
                                                type="radio"
                                                id="genderMale"
                                                name="gender"
                                                value="Male"
                                                checked={formData.gender === 'Male'}
                                                onChange={handleChange}
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
                                                checked={formData.gender === 'Female'}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="genderFemale">
                                                <i className="bi bi-gender-female p-2 rounded-circle icon" style={{ backgroundColor: "#F4F8FF" }}></i>
                                                <span className="ms-1">Female</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                                    <span style={{ fontWeight: "500" }}>Date of birth</span>
                                    <input
                                        className="rounded-1 border w-50 p-1"
                                        type="date"
                                        id="birthday"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.birthDate && <p className="text-danger">{errors.birthDate}</p>}
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                                    <span style={{ fontWeight: "500" }}>Email</span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        style={{ width: "inherit" }}
                                        aria-describedby="emailHelp"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                                <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                                    <span style={{ fontWeight: "500" }}>Password</span>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                                    <span style={{ fontWeight: "500" }}>Repeat Password</span>
                                    <div className="input-group">
                                        <input
                                            type={showRepeatPassword ? "text" : "password"}
                                            className="form-control"
                                            name="repeatPassword"
                                            value={formData.repeatPassword}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                        >
                                            <i className={showRepeatPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                        </button>
                                    </div>
                                </div>
                                {errors.repeatPassword && <p className="text-danger">{errors.repeatPassword}</p>}
                                <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                                    <span style={{ fontWeight: "500" }}>Country</span>
                                    <select
                                        className="form-control"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select your country</option>
                                        {countries.countries.map((country, index) => (
                                            <option key={index} value={country}>
                                                {country}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                {errors.country && <p className="text-danger">{errors.country}</p>}
                            </>
                        )}
                        <div className='pt-4'>
                            <button type="submit" className="btn w-100 rounded-5" style={{ backgroundColor: "#FFBF00", fontWeight: "bold" }}>
                                {step === 1 ? 'Next step' : 'Submit'}
                            </button>
                            <small>
                                By clicking the button, I accept the <a href='/TOS'>Terms of Use of the service</a> and its <a href='/PRP'>Privacy Policy</a>, as well as consent to the processing of personal data.
                            </small>
                        </div>
                        <div className="w-100 d-flex justify-content-between align-items-center ps-1 pe-1">
                            <span className="opacity-25" style={{ backgroundColor: "black", width: "100%", height: "2px" }} />
                            <span className="p-2">or</span>
                            <span className="opacity-25" style={{ backgroundColor: "black", width: "100%", height: "2px" }} />
                        </div>

                    </form>
                    <div className="d-flex justify-content-center">
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
                    <div>
                        <p className="text-center" style={{ color: "black", fontSize: "14px", margin: "5px 0" }}>Already have an account? <a href="/login" style={{ fontSize: "14px", marginLeft: "5px", color: "#2d79f3", fontWeight: "500", cursor: "pointer", textDecoration: "none" }}>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
