export default function Select({ value, setValue }) {
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="">
            <select
                defaultValue={value}
                onChange={handleChange}
                className="bg-gray-50 max-w-[20rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value={true}>Công khai</option>
                <option value={false}>Chỉ riêng tôi</option>
            </select>
        </div>
    );
}
