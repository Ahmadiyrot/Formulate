import React, { useState } from 'react';
import axios from '../../api/axios.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth.js";

const CreateForm = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active');
    const MAX_TITLE_LENGTH = 50;
    const MAX_DESCRIPTION_LENGTH = 250;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.length > MAX_TITLE_LENGTH) {
            toast.error("Title cannot be longer than 50 characters");
            return;
        }
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            toast.error("Description cannot be longer than 250 characters");
            return;
        }

        const formData = {
            formName: title,
            formDescription: description,
            status: status,
            formOwnerId: auth?.userInfo?._id || null,
        };

        toast.promise(
            axios.post('CreateForm', formData),
            {
                loading: 'Creating form...',
                success: 'Form created successfully!',
                error: 'Error creating form. Please try again.',
            }
        ).then(response => {
            const createdFormId = response.data.form._id;
            console.log('Form created with ID:', createdFormId);

            navigate(`/AddElements/${createdFormId}`);
        }).catch(error => {
            console.error("Error creating form:", error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border border-secondary rounded bg-light" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="mb-3">
                <label className="form-label fw-bold">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={MAX_TITLE_LENGTH}
                    required
                    className="form-control"
                />
                <small className="form-text text-muted text-end">
                    {MAX_TITLE_LENGTH - title.length} characters remaining
                </small>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    required
                    className="form-control"
                    style={{ minHeight: '100px' }}
                />
                <small className="form-text text-muted text-end">
                    {MAX_DESCRIPTION_LENGTH - description.length} characters remaining
                </small>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="form-select"
                >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
            >
                Create Form
            </button>
        </form>
    );
};

export default CreateForm;
