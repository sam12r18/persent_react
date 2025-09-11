export default function MinBtn({ onClick, text}) {
    return (
        <button
            onClick={onClick}
            className="btn rounded-3 text-white btn-green"
        >{text}</button>
    );
}
