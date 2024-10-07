import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const QWithColorPicker = ({ inputValue, setInputValue }) => {

    const [color, setColor] = useColor("hex", "#ffffff");

    const clearInput = () => {
        setInputValue('');
    };

    return (
        <div
            className="w-100 mt-2 mb-2 d-flex justify-content-center flex-column row-gap-2 rounded-3"
            style={{backgroundColor: "#fff", padding: "5px" }}
        >
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
            <div className="mt-2">
                <ColorPicker
                    color={color}
                    onChange={setColor}
                    disabled
                />
            </div>
        </div>
    )
}
export default QWithColorPicker;
