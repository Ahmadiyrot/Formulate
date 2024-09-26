import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

const MultiAnswerQ = ({ inputValue, setInputValue, dropzoneEnabled  }) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const clearInput = () => {
        setInputValue('');
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setUploadedFile(file);

        if (file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        } else {
            setPreview(null);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg'],
            'application/pdf': ['.pdf'],
        },
        onDrop,
        multiple: false,
        disabled: !dropzoneEnabled
    });

    return (
        <div className="w-100 mt-2 mb-2 d-flex justify-content-center flex-column align-items-center row-gap-2 rounded-3" style={{ backgroundColor: "#fff", padding: "5px" }}>

            {uploadedFile ? (
                preview ? (
                    <div className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                        style={{ minWidth: "200px", position: 'relative' }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                        />
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

                    <div className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                        style={{ cursor: 'pointer', backgroundColor: '#f8f9fa', minWidth: "200px", position: 'relative' }}>
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
            ) : (

                <div {...getRootProps()}
                    className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                    style={{ cursor: 'pointer', backgroundColor: '#f8f9fa', minWidth: "200px" }}>
                    <input {...getInputProps()} />
                    <i className="bi bi-file-image" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                    <span>Upload Image or PDF</span>
                </div>
            )}

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
            <div className='position-relative w-100'>
                <textarea
                    className='w-100 p-1 ps-2 textArea-Textinput rounded-2'
                    disabled
                    placeholder='Answer'
                    style={{
                        resize: "none",
                        cursor: "not-allowed",
                        backgroundColor: "#ff000029",
                        height: "120px",
                    }}
                />
                <i
                    className="bi bi-x-lg position-absolute"
                    style={{
                        right: '10px',
                        top: '20%',
                        transform: 'translateY(-50%)',
                        cursor: 'not-allowed',
                        backgroundColor: 'transparent',
                    }}
                />
            </div>
        </div>
    );
};

export default MultiAnswerQ;
