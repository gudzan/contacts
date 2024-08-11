import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField.jsx";
import { validate } from "../../utils/validator.js";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../hooks/useAuth.jsx"; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";

const LoginForm = () => {
    const {singIn} = useAuth();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false,
    });
    const [errors, setErrors] = useState({});
    const history = useHistory()

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

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateFields()) return;
        console.log(data);
        try {
            await singIn(data);
            history.push("/");
        } catch (error) {
            console.log(error.message);   
            setErrors(error);
        }
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
