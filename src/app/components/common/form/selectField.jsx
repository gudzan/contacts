import React from "react";

const SelectField = ({
    label,
    disabledOption,
    name,
    value,
    onChange,
    options,
    error,
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? options
            : Object.keys(options).map((key) => ({
                name: options[key].name,
                value: options[key]._id,
            }));

    function getSelectClassName() {
        let selectClassName = "form-select";
        if (error) {
            selectClassName += " is-invalid";
        }
        return selectClassName;
    }

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getSelectClassName()}
                value={value}
                id={name}
                name={name}
                onChange={onChange}
            >
                <option disabled value="">
                    {disabledOption}
                </option>

                {options &&
                    optionsArray.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default SelectField;
