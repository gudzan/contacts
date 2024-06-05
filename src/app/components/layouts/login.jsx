import React, { useState } from "react";

export default function Login() {
    const [login, setLogin] = useState("")
    function handleClick(e){
        setLogin(e.target.value)
        console.log(e.target.value);
    }
    return (
        <form action="">
            <div className="m-3">
                <label htmlFor="login">Логин:</label>
                <input id="login" type="text" name="login" value={login} onChange={handleClick}/>
            </div>
            <div className="m-3">
                <label htmlFor="password">Пароль:</label>
                <input id="password" type="password" name="password" />
            </div>

            <button className="m-3 btn btn-primary" type="submit">Сохранить</button>
        </form>
    );
}
