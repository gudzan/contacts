import React, { useState } from "react";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
    const { type } = useParams();
    const defaultType = type === "register" ? type : "login";
    const [formType, setFormType] = useState(defaultType);
    
    function toggleFormType(){
        setFormType((prevState)=>(prevState === "register" ? "login" : "register"))
        console.log(formType);
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-5">
                    <h3 className="mb-4">Login form</h3>
                    {formType === "register" ? (
                        <>
                            <RegisterForm />
                            <div className="mt-4" role="button" onClick={toggleFormType}>
                                Уже есть аккаунт? <a>Войти</a>
                            </div>
                        </>
                    ) : (
                        <>
                            <LoginForm />
                            <div className="mt-4" role="button" onClick={toggleFormType}>
                                Еще нет аккаунта? <a>Зарегистрироваться</a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
