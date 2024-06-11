import React from "react";

const RadioField = ({ label, name, value, onChange, options }) => {
    return (
        <>
            <div className="mb-4">
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>

                {options &&
                    options.map((el) => (
                        <div key={el.value} className="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name={name}
                                id={name + "-" + el.value}
                                value={el.value}
                                onChange={onChange}
                                checked={el.value === value}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={name + "-" + el.value}
                            >
                                {el.name}
                            </label>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default RadioField;
