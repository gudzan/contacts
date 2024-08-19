import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField.jsx";
import { validate } from "../../utils/validator.js";
import CheckBoxField from "../common/form/checkBoxField";
import history from "../../utils/history.js";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users.js";

const LoginForm = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(getAuthErrors());
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false,
    });
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
        const dataChange = e.target ? e.target : e;
        setData((prevState) => ({
            ...prevState,
            [dataChange.name]: dataChange.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateFields()) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(login({ payload: data, redirect }));
        // history.push(
        //     history.location.state ? history.location.state.from.pathname : "/"
        // );
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
                autoFocus
            />
            <TextField
                label="Пароль:"
                name="password"
                type="password"
                value={data.password}
                onChange={handleClick}
                error={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleClick}
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
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

export default LoginForm;
