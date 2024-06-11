import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField.jsx";
import SelectField from "../common/form/selectField";
import { validate } from "../../utils/validator.js";
import api from "../../api/index.js";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
    });
    const [professions, setProfessions] = useState();
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
            isCapital: {
                message: "Пароль должен содержать хотябы одну заглавную букву",
            },
            isNumber: {
                message: "Пароль должен содержать хотябы одно число",
            },
            isSymbol: {
                message: "Пароль должен содержать хотябы один спец символ",
            },
            min: {
                value: 8,
                message: "Пароль должен состоять более чем из 8 символов",
            },
        },
        profession: {
            isRequired: {
                message: "Поле профессия обязательно для заполнения",
            },
        },
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

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
        if (!validateFields()) return;
        console.log(data);
    }

    function validateFields() {
        const error = validate(data, errorConfig);
        setErrors(error);
        return Object.keys(error).length === 0;
    }

    const isValid = Object.keys(errors).length === 0;

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

            <SelectField
                label="Выбери профессию"
                disabledOption="твоя профессия это..."
                name="profession"
                value={data.profession}
                onChange={handleClick}
                options={professions}
                error={errors.profession}
            />

            <button
                className="w-100 mx-auto btn btn-primary"
                type="submit"
                disabled={!isValid}
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
