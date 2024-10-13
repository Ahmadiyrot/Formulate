import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useParams } from 'react-router-dom';

const QWithAnswerImg = ({ question, uploadedFileUrl, setUploadedFileUrl, readOnly }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (uploadedFileUrl) {
            if (uploadedFileUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
                setPreview(uploadedFileUrl);
            } else {
                setPreview(null);
            }
        } else {
            setPreview(null);
        }
    }, [uploadedFileUrl]);

    const clearInput = () => {
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
            className="w-100 mt-2 mb-2 d-flex flex-column align-items-center"
            style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        >
            <div className="w-100 mb-2">
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

            {uploadedFileUrl && (
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
            )}

            {!readOnly && (
                <>
                    <div
                        {...getRootProps()}
                        className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                        style={{ cursor: 'pointer', backgroundColor: '#f8f9fa', minWidth: "200px" }}
                    >
                        <input {...getInputProps()} />
                        <i className="bi bi-upload" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                        <span>Upload Image or PDF</span>
                    </div>

                    {uploading && <p>Uploading file...</p>}

                    <button onClick={clearInput} className="btn btn-secondary mt-2">
                        Clear Uploaded File
                    </button>
                </>
            )}

            {readOnly && !uploadedFileUrl && (
                <div
                    className="d-flex align-items-center justify-content-center p-2 border rounded m-3"
                    style={{
                        backgroundColor: '#f8f9fa',
                        minWidth: "200px",
                    }}
                >
                    <span>No file uploaded</span>
                </div>
            )}
        </div>
    );
};

export default QWithAnswerImg;
