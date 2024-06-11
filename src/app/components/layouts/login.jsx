import React, { useState } from "react";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";
import { Link, useParams } from "react-router-dom";

export default function Login() {
    const { type } = useParams();
    const defaultType = type === "register" ? type : "login";
    const [formType, setFormType] = useState(defaultType);

    function toggleFormType() {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-5">
                    <h2 className="mb-4">Login layout</h2>
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register form</h3>
                            <RegisterForm />
                            <div
                                className="mt-4"
                                role="button"
                                onClick={toggleFormType}
                            >
                                Уже есть аккаунт?{" "}
                                <Link to="/login">
                                    Войти
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login form</h3>
                            <LoginForm />
                            <div
                                className="mt-4"
                                role="button"
                                onClick={toggleFormType}
                            >
                                Еще нет аккаунта?{" "}
                                <Link to="/login/register">
                                    Зарегистрироваться
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
