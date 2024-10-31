export default function InputField({ label, type, name, placeholder, value, onChange }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-blue-500"
            />
        </div>
    );
}