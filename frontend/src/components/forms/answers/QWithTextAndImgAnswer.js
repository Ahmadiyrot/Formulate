import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useParams } from 'react-router-dom';

const QWithTextAndImgAnswer = ({
    question,
    answer,
    setAnswer,
    uploadedFileUrl,
    setUploadedFileUrl,
    readOnly,
}) => {
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (uploadedFileUrl) {
            if (uploadedFileUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
                setPreview(uploadedFileUrl);
            } else {
                setPreview(null);
            }
        } else {
            setPreview(null);
        }
    }, [uploadedFileUrl]);

    const clearInput = () => {
        setAnswer('');
        setUploadedFileUrl('');
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        uploadFileToFirebase(file);
    };

    const uploadFileToFirebase = (file) => {
        setUploading(true);
        const storage = getStorage();
        const storageRef = ref(storage, `${id}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
            },
            (error) => {
                console.error('Upload failed:', error);
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUploadedFileUrl(downloadURL);
                    setUploading(false);
                });
            }
        );
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'application/pdf': ['.pdf'],
        },
        onDrop,
        multiple: false,
        disabled: readOnly,
    });

    return (
        <div
            className="w-100 mt-2 mb-2 d-flex flex-column justify-content-center rounded-3"
            style={{ backgroundColor: "#fff", padding: "5px" }}
        >
            <div className="position-relative w-100">
                <input
                    type="text"
                    className="w-100 ps-2 rounded-2 textArea-Textinput"
                    placeholder="Question"
                    value={question}
                    readOnly
                    style={{
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ccc",
                        height: "40px",
                        fontSize: "16px",
                    }}
                />
            </div>

            <div className="position-relative w-100 mt-2">
                <textarea
                    className="w-100 p-1 ps-2 textArea-Textinput rounded-2"
                    value={answer}
                    onChange={(e) => !readOnly && setAnswer(e.target.value)}
                    placeholder="Answer"
                    readOnly={readOnly}
                    style={{
                        resize: "none",
                        backgroundColor: "#f0f0f0",
                        height: "120px",
                    }}
                />
                {!readOnly && (
                    <i
                        className="bi bi-x-lg position-absolute"
                        style={{
                            right: '10px',
                            top: '20%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                        }}
                        onClick={() => setAnswer('')}
                    />
                )}
            </div>

            {uploadedFileUrl ? (
                preview ? (
                    <div
                        className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                        style={{ minWidth: "200px", position: 'relative' }}
                    >
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                        />
                        {!readOnly && (
                            <i
                                className="bi bi-x-lg position-absolute"
                                style={{
                                    right: '10px',
                                    top: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    borderRadius: '50%',
                                }}
                                onClick={() => setUploadedFileUrl('')}
                            />
                        )}
                    </div>
                ) : (
                    <div
                        className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                        style={{ backgroundColor: '#f8f9fa', minWidth: "200px", position: 'relative' }}
                    >
                        <i className="bi bi-file-earmark" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                        <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
                            {uploadedFileUrl.split('/').pop()}
                        </a>
                        {!readOnly && (
                            <i
                                className="bi bi-x-lg position-absolute"
                                style={{
                                    right: '10px',
                                    top: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    borderRadius: '50%',
                                }}
                                onClick={() => setUploadedFileUrl('')}
                            />
                        )}
                    </div>
                )
            ) : readOnly ? (
                <div
                    className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                    style={{
                        cursor: 'not-allowed',
                        backgroundColor: '#f8f9fa',
                        minWidth: "200px",
                    }}
                >
                    <span>No file uploaded</span>
                </div>
            ) : null}

            {!readOnly && (
                <div
                    {...getRootProps()}
                    className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                    style={{ cursor: 'pointer', backgroundColor: '#f8f9fa', minWidth: "200px" }}
                >
                    <input {...getInputProps()} />
                    <i className="bi bi-upload" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                    <span>Upload Image or PDF</span>
                </div>
            )}

            {uploading && <p>Uploading file...</p>}

            {!readOnly && (
                <button onClick={clearInput} className="btn btn-secondary mt-2">
                    Clear Answer and File
                </button>
            )}
        </div>
    );
};

export default QWithTextAndImgAnswer;
