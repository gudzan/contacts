function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введены некорректно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        case "INVALID_LOGIN_CREDENTIALS":
            return "Email или пароль введены некорректно";
        case "EMAIL_NOT_FOUND":
            return "Такой пользователь не существует";
        case "USER_DISABLED":
            return "Пользователь заблокирован" ;
        default:
            return `Неизвестная ошибка`;
    }
}

export default generateAuthError