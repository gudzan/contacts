import React, { useEffect, useState } from "react";
import TextField from "../textField";
import { validate } from "../../utils/validator";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const errorConfig = {
        email: {
            isRequired: {
                message: "Поле почта обязательно для заполнения",
            },
            isEmail: {
                message: "Почта введена некорректно",
            },
        },
        password: {
            isRequired: {
                message: "Поле пароль обязательно для заполнения",
            },
        },
    };

    useEffect(() => {
        validateFields();
    }, [data]);

    function handleClick(e) {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateFields()) return
    }

    function validateFields() {
        const error = validate(data, errorConfig)
        setErrors(error);
        return Object.keys(error).length === 0;
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Почта:"
                name="email"
                value={data.email}
                onChange={handleClick}
                error={errors.email}
            />
            <TextField
                label="Пароль:"
                name="password"
                type="password"
                value={data.password}
                onChange={handleClick}
                error={errors.password}
            />
            <button className="m-3 btn btn-primary" type="submit">
                Сохранить
            </button>
        </form>
    );
}
