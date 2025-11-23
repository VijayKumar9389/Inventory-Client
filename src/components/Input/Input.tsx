import React, {useState, ChangeEvent} from 'react';
import {BiSearch, BiX} from 'react-icons/bi';
import './Input.Module.scss';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const Input: React.FC<InputProps> = ({value, onChange, placeholder}) => {
    const [inputValue, setInputValue] = useState<string>(value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = e.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    const handleClear = (): void => {
        setInputValue('');
        onChange('');
    };

    return (
        <div className="input-container">
            {inputValue ? (
                <button onClick={handleClear} className="search-btn">
                    <BiX/>
                </button>
            ) : (
                <button className="search-btn">
                    <BiSearch/>
                </button>
            )}
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="input"
            />
        </div>
    );
};

export default Input;
