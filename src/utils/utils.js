export function calculateAge(birthday) {
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
}

export function renderPhrase(
    number,
    nominative,
    genitiveSingular,
    genitivePlural,
    end = ""
) {
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
}
