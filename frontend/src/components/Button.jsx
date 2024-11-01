export default function Button({ text, className, onClick }) {
    return (
        <button
            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}