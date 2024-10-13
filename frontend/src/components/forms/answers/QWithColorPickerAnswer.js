import React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const QWithColorPickerAnswer = ({
    question,
    selectedColors,
    onColorsChange,
    readOnly,
}) => {
    const [color, setColor] = useColor("hex", "#ffffff");

    const handleAddColor = () => {
        if (!selectedColors.includes(color.hex)) {
            onColorsChange([...selectedColors, color.hex]);
        }
    };

    return (
        <div
            className="w-100 mt-2 mb-2 d-flex flex-column justify-content-center rounded-3"
            style={{ backgroundColor: "#fff", padding: "15px" }}
        >
            <div className="position-relative w-100 mb-3">
                <input
                    type="text"
                    className="w-100 ps-2 rounded-2"
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

            {!readOnly && (
                <>
                    <div className="mb-3">
                        <ColorPicker
                            width={300}
                            height={150}
                            color={color}
                            onChange={setColor}
                            hideHSV
                            dark
                        />
                    </div>

                    <button onClick={handleAddColor} className="btn btn-primary mt-2">
                        Add Color
                    </button>
                </>
            )}

            {selectedColors.length > 0 && (
                <div className="d-flex flex-wrap mt-3">
                    {selectedColors.map((hex, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: hex,
                                width: "100px",
                                height: "100px",
                                margin: "5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        >
                            <span style={{ color: "#fff", fontWeight: "bold" }}>{hex}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QWithColorPickerAnswer;
