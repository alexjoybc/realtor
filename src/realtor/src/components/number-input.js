export default function NumberInput({ name, label, value, step, rightLabel, leftLabel, onValueChange }) {
    return (
        <>
            <div>
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    { !!leftLabel && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div> }
                    <input
                        type="number"
                        step={step}
                        value={value}
                        name={name}
                        id={name}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                        aria-describedby="amount-currency"
                        onChange={onValueChange}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm" id="amount-currency">
                            {rightLabel}
                        </span>
                    </div>
                </div>
            </div>  
        </>
    )
}