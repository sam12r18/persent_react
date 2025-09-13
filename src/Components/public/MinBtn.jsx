export default function MinBtn({ onClick, text, className}) {
    return (
        <button
            onClick={onClick}
            className={`btn rounded-3 text-white ${className}`}
        >{text}</button>
    );
}
