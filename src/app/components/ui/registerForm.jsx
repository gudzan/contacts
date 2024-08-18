import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField.jsx";
import SelectField from "../common/form/selectField";
import CheckBoxField from "../common/form/checkBoxField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validate } from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities.js";
import { getProfessions, getProfessionsLoadingStatus } from "../../store/professions.js";
import { signUp } from "../../store/users.js";

const RegisterForm = () => {
    const sex = [
        { name: "Женщина", value: "female" },
        { name: "Мужчина", value: "male" },
        { name: "Не скажу/другое", value: "other" },
    ];

    const dispatch = useDispatch()
    //const { singUp } = useAuth();

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        profession: "",
        sex: sex[0].value,
        qualities: [],
        licence: false,
    });

    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const [errors, setErrors] = useState({});
    // const history = useHistory();

    const errorConfig = {
        email: {
            isRequired: {
                message: "Поле почта обязательно для заполнения",
            },
            isEmail: {
                message: "Почта введена некорректно",
            },
        },
        name: {
            isRequired: {
                message: "Поле имя обязательно для заполнения",
            },
            min: {
                value: 3,
                message: "Имя должно состоять более чем из 3 символов",
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
        dispatch(signUp(data))
    }

    function validateFields() {
        const error = validate(data, errorConfig);
        setErrors(error);
        return Object.keys(error).length === 0;
    }

    const isValid = Object.keys(errors).length === 0;
    if (!qualitiesLoading || !professionsLoading) {
        return (<form onSubmit={handleSubmit}>
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

            <TextField
                label="Имя:"
                name="name"
                value={data.name}
                onChange={handleClick}
                error={errors.name}
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
        </form>);
    } else return <p>Loading...</p>;
};

export default RegisterForm;
