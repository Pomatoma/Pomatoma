import React from 'react';

export default function SelectField({ value, onChange }) {
    const options = [10, 20, 30, 40, 50, 60];

    return (
        <div className="relative w-40 h-7">
            <select
                id="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none w-full h-full text-base px-2 border border-[#FF5B5E] rounded-sm focus:outline-none"
            >
                {options.map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>

            {/* 버튼 부분 */}
            <div className="pointer-events-none absolute top-0 right-0 h-full px-1 flex items-center rounded-sm bg-[#FF5B5E]">
                <span className="text-white text-xs">▼</span>
            </div>
        </div>
    );
}
