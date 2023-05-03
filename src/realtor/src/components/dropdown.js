export default function Dropdown({ name, label, options, onChange }) {
    return (<>
        <div>
            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <select
                    id={name}
                    name={name}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    {options.map((option => (<option key={option.value} value={option.value}>{option.label}</option>)))}
                </select>
            </div>
        </div>
    </>)
}