export function validate(data, errorConfig) {
    const errors = {};

    function compare(data, config, method) {
        let statusCompare;
        switch (method) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusCompare = !data;
                } else {
                    statusCompare = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailReqExp = /^\S+@\S+\.\S+$/g;
                statusCompare = !emailReqExp.test(data);
                break;
            }
            case "isCapital": {
                const passReqExp = /[A-Z]+/g;
                statusCompare = !passReqExp.test(data);
                break;
            }
            case "isNumber": {
                const passReqExp = /\d+/g;
                statusCompare = !passReqExp.test(data);
                break;
            }
            case "isSymbol": {
                const passReqExp = /\W+/g;
                statusCompare = !passReqExp.test(data);
                break;
            }
            case "min": {
                statusCompare = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusCompare) {
            return config.message;
        }
    }

    for (const field in data) {
        for (const validateMetod in errorConfig[field]) {
            const error = compare(
                data[field],
                errorConfig[field][validateMetod],
                validateMetod
            );
            if (error && !errors[field]) {
                errors[field] = error;
            }
        }
    }
    return errors;
}
