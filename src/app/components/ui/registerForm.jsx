import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField.jsx";
import SelectField from "../common/form/selectField";
import CheckBoxField from "../common/form/checkBoxField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validate } from "../../utils/validator";
import { useProfessions } from "../hooks/useProfessions.jsx";
import { useQualities } from "../hooks/useQualities.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

const RegisterForm = () => {
    const sex = [
        { name: "Женщина", value: "female" },
        { name: "Мужчина", value: "male" },
        { name: "Не скажу/другое", value: "other" },
    ];

    const {singUp} = useAuth();

    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: sex[0].value,
        qualities: [],
        licence: false,
    });

    const { professions } = useProfessions();
    const { qualities } = useQualities();
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
        licence: {
            isRequired: {
                message:
                    "Необходимо прочитать и принять лицензионное соглашение",
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
        console.log(data);
        singUp(data)
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

            <RadioField
                label="Выбери пол"
                name="sex"
                options={sex}
                value={data.sex}
                onChange={handleClick}
            />

            <MultiSelectField
                label="Выбери качества"
                name="qualities"
                options={qualities}
                value={data.qualities}
                onChange={handleClick}
            />

            <CheckBoxField
                name="licence"
                value={data.licence}
                onChange={handleClick}
                error={errors.licence}
            >
                Я прочитал и принимаю <a href="#">лицензионное соглашение</a>
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

export default RegisterForm;
