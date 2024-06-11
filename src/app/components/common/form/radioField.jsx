import React from "react";

const RadioField = ({ label, name, value, onChange, options }) => {
    return (
        <>
            <div className="mb-4">
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>

                {options &&
                    options.map((element) => (
                        <div key={element.value} className="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name={name}
                                id={name + "-" + element.value}
                                value={element.value}
                                onChange={onChange}
                                checked={element.value === value}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={name + "-" + element.value}
                            >
                                {element.name}
                            </label>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default RadioField;
