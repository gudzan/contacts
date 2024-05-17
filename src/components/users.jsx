import React, { useState } from "react";
import api from "../api";

export default function Users() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const returnAllUsers = () => {
        setUsers(api.users.fetchAll());
    };

    const renderPhrase = (
        number,
        nominative,
        genitiveSingular,
        genitivePlural,
        end = ""
    ) => {
        let result = number + " ";
        if (number % 10 === 1 && number !== 11) {
            result += nominative;
        } else if (
            (number % 10 === 2 || number % 10 === 3 || number % 10 === 4) &&
            number !== 12 &&
            number !== 13 &&
            number !== 14
        ) {
            result += genitiveSingular;
        } else {
            result += genitivePlural;
        }
        return result + (end && ` ${end}`);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const calculateAge = (birthday) => {
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var birthdayThisYear = new Date(
            today.getFullYear(),
            birthday.getMonth(),
            birthday.getDate()
        );
        var age;
        age = today.getFullYear() - birthday.getFullYear();
        if (today < birthdayThisYear) {
            age = age - 1;
        }
        return age;
    };

    const renderUsers = (user) => {
        return (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map((qualiti) => (
                        <span
                            class={`badge m-1 rounded-pill bg-${qualiti.color}`}
                        >
                            {qualiti.name}
                        </span>
                    ))}
                </td>
                <td>
                    {user.birthday.toLocaleDateString()} (
                    {renderPhrase(
                        calculateAge(user.birthday),
                        "год",
                        "года",
                        "лет"
                    )}
                    )
                </td>
                <td>{user.profession.name}</td>
                <td>
                    <a className="link-primary" href={`tel:${user.phone}`}>
                        {user.phone}
                    </a>
                </td>
                <td>
                    <a className="link-primary" href={`mailto::${user.mail}`}>
                        {user.mail}
                    </a>
                </td>
                <td>
                    <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-outline-danger"
                    >
                        удалить
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <div className="m-5">
            <p className="mb-4 fs-2">
                {users.length !== 0
                    ? renderPhrase(
                          users.length,
                          "юзер",
                          "юзера",
                          "юзеров",
                          "в базе"
                      )
                    : "Никого нет, ты всех удалил :("}
            </p>
            {users.length === 0 && (
                <button onClick={returnAllUsers} className="btn btn-success">
                    Вернуть всех обратно
                </button>
            )}
            {users.length !== 0 && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Тэги</th>
                            <th scope="col">Дата рождения</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Телефон</th>
                            <th scope="col">Почта</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>{users.map((user) => renderUsers(user))}</tbody>
                </table>
            )}
        </div>
    );
}
