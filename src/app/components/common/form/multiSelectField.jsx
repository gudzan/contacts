import React from "react";
import Select from "react-select";

const MultiSelectField = ({ label, name, value, onChange, options }) => {
    const optionsList =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((key) => ({
                  label: options[key].name,
                  value: options[key]._id,
              }))
            : options;

    function handleChange(value) {
        const values = Object.keys(value).map((key) => ({
            value: value[key].value,
        }));
        onChange({ name: name, value: values });
    }

    return (
        <div className="mb-4">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsList}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

export default MultiSelectField;
