import React, { useState } from 'react';
import './SignUp.css';
import validator from 'validator';

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
        <div className="d-flex justify-content-center w-50 bg-white">
            <div style={{ width: "45%" }}>
                <div style={{ color: "black" }}>
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
                                        style={{ width: "inherit" }} 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                    />
                                    <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                        <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pe-2 pt-5">
                                <span style={{ fontWeight: "500" }}>Repeat Password</span>
                                <div className="input-group">
                                    <input 
                                        type={showRepeatPassword ? "text" : "password"} 
                                        className="form-control" 
                                        style={{ width: "inherit" }} 
                                        name="repeatPassword" 
                                        value={formData.repeatPassword} 
                                        onChange={handleChange} 
                                    />
                                    <span className="input-group-text" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                                        <i className={showRepeatPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                    </span>
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
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                    <option value="UK">UK</option>
                                    <option value="Germany">Germany</option>
                                    <option value="France">France</option>
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
                </form>
            </div>
        </div>
    );
}

export default SignUp;
