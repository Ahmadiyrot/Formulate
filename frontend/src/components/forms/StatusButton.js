const StatusButton = (props) => {
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center rounded-2" style={{ backgroundColor: props.color, color: "red", width: props.cardwidth }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            </svg>
            <span>Paused</span>
        </div>
    )
}
export default StatusButton