import React, { useState } from 'react';

export default function SelectField() {
    const [selected, setSelected] = useState('50');
    const options = [10, 20, 30, 40, 50, 60];

    const handleChange = (e) => {
        setSelected(e.target.value);
    };

    return (
        <div className="relative w-40 h-7">
            <select
                id="number"
                value={selected}
                onChange={handleChange}
                className="appearance-none w-full h-full text-base px-2 border border-[#FF5B5E] rounded-sm focus:outline-none"
            >
                {options.map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>

            {/*버튼 부분*/}
            <div className="pointer-events-none absolute top-0 right-0 h-full px-1 flex items-center rounded-sm bg-[#FF5B5E]">
                <span className="text-white text-xs">▼</span>
            </div>
        </div>
    );
}
