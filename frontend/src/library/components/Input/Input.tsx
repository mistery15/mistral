import React, { ChangeEvent, createRef, FunctionComponent, FocusEvent } from "react";

interface InputProps {
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    onBlur: (e: FocusEvent<HTMLInputElement>) => void,
    name: string,
    className?: string,
    label: string,
    placeholder?: string,
    required?: boolean,
    type?: 'password' | 'email' | 'date' | 'range',
    value: string | number,
    hasError?: boolean,
    max?: number | string,
    min?: number | string,
    step?: number | string
}

const Input: FunctionComponent<InputProps> = ({ onChange, onBlur, hasError, name, className = '', label, placeholder, required, type, value, max, min, step }) => {
    const inputRef = createRef<HTMLInputElement>();
    return (
        <div onClick={() => inputRef?.current?.focus()} className={`Input container ${className} ${hasError ? 'error' : ''}`}>
            <label className="label" htmlFor={name}>
                {label}{required ? '*' : ''}
            </label>
            <input min={min} step={step} max={max} value={value} required={required} type={type} placeholder={placeholder} autoComplete="off" id={name} name={name} onChange={onChange} onBlur={onBlur} ref={inputRef} className="input" />
        </div>
    );
};

export { Input };