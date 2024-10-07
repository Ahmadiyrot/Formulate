import React, { useState } from 'react';

const QWithImgAnswer = ({ question, uploadedFileUrl, inputValue, setInputValue }) => {
    const [isImageView, setIsImageView] = useState(false);

    const handleImageClick = () => {
        setIsImageView(true);
    };

    const closeImageView = () => {
        setIsImageView(false);
    };

    return (
        <div className="w-100 mt-2 mb-2 d-flex flex-column align-items-center" style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}>
            <div className="w-100 mb-2">
                <textarea
                    className="w-100 p-2 rounded-2 textArea-Textinput"
                    placeholder="Question"
                    value={question}
                    readOnly
                    style={{ resize: "none", backgroundColor: "#f0f0f0", height: "60px" }}
                />
            </div>

            {uploadedFileUrl ? (
                uploadedFileUrl.endsWith('.png') || uploadedFileUrl.endsWith('.jpg') || uploadedFileUrl.endsWith('.jpeg') ? (
                    <div className="position-relative w-100">
                        <img
                            src={uploadedFileUrl}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }}
                            onClick={handleImageClick}
                        />
                        {isImageView && (
                            <div className="image-viewer">
                                <div className="overlay" onClick={closeImageView} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 999 }}></div>
                                <img src={uploadedFileUrl} alt="Full Preview" style={{ maxWidth: '90%', maxHeight: '90%', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }} />
                                <button onClick={() => window.open(uploadedFileUrl)} style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', zIndex: 1000 }}>
                                    Download
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="d-flex align-items-center justify-content-center p-2 border rounded m-3" style={{ cursor: 'pointer', backgroundColor: '#f8f9fa', minWidth: "200px", position: 'relative' }}>
                        <i className="bi bi-file-earmark-pdf" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                        <span>{uploadedFileUrl.split('/').pop()}</span>
                        <button onClick={() => window.open(uploadedFileUrl)} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Download
                        </button>
                    </div>
                )
            ) : (
                <div className="d-flex align-items-center justify-content-center p-2 border rounded m-3" style={{ cursor: 'not-allowed', backgroundColor: '#f8f9fa', minWidth: "200px" }}>
                    <span>No file uploaded</span>
                </div>
            )}

            <div className='position-relative w-100'>
                <textarea
                    className='w-100 p-1 ps-2 textArea-Textinput rounded-2'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Answer'
                    style={{
                        resize: "none",
                        backgroundColor: "#f0f0f0",
                        height: "120px", 
                    }}
                />
                <i
                    className="bi bi-x-lg position-absolute"
                    style={{
                        right: '10px',
                        top: '20%',
                        transform: 'translateY(-50%)',                 
                        backgroundColor: 'transparent',
                    }}
                />
            </div>
        </div>
    );
};

export default QWithImgAnswer;
