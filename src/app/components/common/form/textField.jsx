import React, { useState } from "react";

export default function TextField({
    label,
    name,
    type,
    value,
    onChange,
    error,
}) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword((prevState) => !prevState);
    }

    function getInputClassName() {
        let inputClassName = "form-control";
        if (error) {
            inputClassName += " is-invalid";
        }
        return inputClassName;
    }
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="has-validation input-group">
                <input
                    className={getInputClassName()}
                    id={name}
                    type={showPassword ? "text" : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <button
                        class="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i className={"bi bi-eye"+(showPassword?"-slash":"")}></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
}

TextField.defaultProps = {
    type: "text",
    error: "",
};
