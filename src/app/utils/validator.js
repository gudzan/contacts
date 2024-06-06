export function validate(data, errorConfig) {
    const errors = {};
    
    function compare(data, config, method) {
        switch (method) {
            case "isRequired":
                if (data.trim() === "") {
                    return config.message;
                }
                break;
            case "isEmail": {
                const emailReqExp = /^\S+@\S+\.\S+$/g;
                if (!emailReqExp.test(data)) {
                    return config.message;
                }
                break;
            }
            default:
                break;
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
