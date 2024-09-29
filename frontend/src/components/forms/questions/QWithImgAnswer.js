import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const QWithImgAnswer = ({ inputValue, setInputValue, dropzoneEnabled }) => {
    const [uploadedFile, setUploadedFile] = useState(null); // Manage uploaded file state locally
    const [preview, setPreview] = useState(null); // Preview for image files

    useEffect(() => {
        // Generate a preview for image files
        if (uploadedFile) {
            if (uploadedFile.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(uploadedFile);
                setPreview(imageUrl);
            } else {
                setPreview(null); // No preview for non-image files
            }
        } else {
            setPreview(null);
        }
    }, [uploadedFile]);

    const clearInput = () => {
        setInputValue('');
        setUploadedFile(null); // Clear the uploaded file when input is cleared
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]; // Single file only
        setUploadedFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg'],
            'application/pdf': ['.pdf'],
        },
        onDrop,
        multiple: false,
        disabled: !dropzoneEnabled, // Use dynamic disabling based on prop
    });

    return (
        <div className="w-100 mt-2 mb-2 d-flex justify-content-center flex-column row-gap-2 rounded-3" style={{ backgroundColor: "#fff", padding: "5px" }}>
            <div className="position-relative w-100">
                <input
                    type="text"
                    className="w-100 ps-2 rounded-2 textArea-Textinput"
                    placeholder="Question"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <i
                    className="bi bi-x-lg position-absolute"
                    style={{
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                    }}
                    onClick={clearInput}
                />
            </div>

            {uploadedFile && (
                preview ? (
                    <div className="d-flex align-items-center justify-content-center p-2 border rounded m-3" style={{ minWidth: "200px", position: 'relative' }}>
                        <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                        <i
                            className="bi bi-x-lg position-absolute"
                            style={{
                                right: '10px',
                                top: '10px',
                                cursor: 'pointer',
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                            }}
                            onClick={() => setUploadedFile(null)}
                        />
                    </div>
                ) : (
                    <div className="d-flex align-items-center justify-content-center p-2 border rounded m-3" style={{ backgroundColor: '#f8f9fa', minWidth: "200px", position: 'relative' }}>
                        <i className="bi bi-file-earmark-pdf" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                        <span>{uploadedFile.name}</span>
                        <i
                            className="bi bi-x-lg position-absolute"
                            style={{
                                right: '10px',
                                top: '10px',
                                cursor: 'pointer',
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                            }}
                            onClick={() => setUploadedFile(null)}
                        />
                    </div>
                )
            )}

            <div {...getRootProps()} className="d-flex align-items-center justify-content-center p-2 border rounded m-3" style={{ cursor: dropzoneEnabled ? 'pointer' : 'not-allowed', backgroundColor: '#f8f9fa', minWidth: "200px" }}>
                <input {...getInputProps()} />
                <i className="bi bi-file-image" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                <span>Upload Image or PDF</span>
            </div>
        </div>
    );
};

export default QWithImgAnswer;
