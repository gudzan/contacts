import React from "react";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    function handleChange() {
        onChange({ name: name, value: !value });
    }
    function getInputClassName() {
        let inputClassName = "form-check-input";
        if (error) {
            inputClassName += " is-invalid";
        }
        return inputClassName;
    }
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClassName()}
                type="checkbox"
                name={name}
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default CheckBoxField;
