import React from "react";

export default function TextField({ label, name, type, value, onChange, error }) {
    return (
        <div className="m-3">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}

TextField.defaultProps = {
    type: "text",
    error: "",
};
