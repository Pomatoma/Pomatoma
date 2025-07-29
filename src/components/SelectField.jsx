import React, {useState} from 'react';

export default function SelectField() {
    const [selected, setSelected] = useState('');
    const options = [10, 20, 30, 40, 50, 60];

    const handleChange = (e) => {
        setSelected(e.target.value);
    };
    return (
        <>
            <select id="number" value={selected} onChange={handleChange} className="rounded-sm border border-[#FF5B5E] w-35">
                <option value="50" />
                {options.map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
        </>
    );
}
