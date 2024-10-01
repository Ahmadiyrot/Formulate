import React, { useState } from 'react';
import axios from '../../api/axios.js';
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import useAuth from "../../hooks/useAuth.js";

const CreateForm = () => {
    const { auth } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate for routing

    // Initialize state for title, description, and status
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active'); // Default to 'active'
    const MAX_TITLE_LENGTH = 50;
    const MAX_DESCRIPTION_LENGTH = 250;

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate title and description lengths
        if (title.length > MAX_TITLE_LENGTH) {
            toast.error("Title cannot be longer than 50 characters");
            return;
        }
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            toast.error("Description cannot be longer than 250 characters");
            return;
        }

        // Create the form data object
        const formData = {
            formName: title,
            formDescription: description,
            status: status,
            formOwnerId: auth?.userInfo?._id || null, // Safely access _id
        };

        // Use toast.promise to show loading, success, and error notifications
        toast.promise(
            axios.post('CreateForm', formData),
            {
                loading: 'Creating form...',
                success: 'Form created successfully!',
                error: 'Error creating form. Please try again.',
            }
        ).then(response => {
            const createdFormId = response.data.form._id; // Assuming response.data contains the created form's ID
            console.log('Form created with ID:', createdFormId);

            // Navigate to /AddElements:id where :id is the form ID
            navigate(`/AddElements/${createdFormId}`);
        }).catch(error => {
            console.error("Error creating form:", error); // Handle error
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            {/* Title Input */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={MAX_TITLE_LENGTH}
                    required
                    style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <small style={{ marginTop: '5px', fontSize: '12px', color: '#666', alignSelf: 'flex-end' }}>
                    {MAX_TITLE_LENGTH - title.length} characters remaining
                </small>
            </div>

            {/* Description Input */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    required
                    style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}
                />
                <small style={{ marginTop: '5px', fontSize: '12px', color: '#666', alignSelf: 'flex-end' }}>
                    {MAX_DESCRIPTION_LENGTH - description.length} characters remaining
                </small>
            </div>

            {/* Status Dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                </select>
            </div>

            <button
                type="submit"
                style={{ padding: '10px', fontSize: '16px', color: '#fff', backgroundColor: '#007BFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Create Form
            </button>
        </form>
    );
};

export default CreateForm;
