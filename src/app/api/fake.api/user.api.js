import { professions } from "./profession.api";
import { qualities } from "./qualities.api";

const users = [
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Джон Дориан",
        profession: professions.doctor,
        qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
        completedMeetings: 36,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(2001, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471816",
        name: "Кокс",
        profession: professions.doctor,
        qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
        completedMeetings: 15,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(2000, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471817",
        name: "Боб Келсо",
        profession: professions.doctor,
        qualities: [qualities.buller],
        completedMeetings: 247,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(1999, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471818",
        name: "Рэйчел Грин",
        profession: professions.waiter,
        qualities: [qualities.uncertain],
        completedMeetings: 148,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(1996, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471819",
        name: "Шелдон Купер",
        profession: professions.physics,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 37,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(2023, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471820",
        name: "Леонард Хофстедтер",
        profession: professions.physics,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 147,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(1976, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471821",
        name: "Говард Воловиц",
        profession: professions.engineer,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 72,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(1985, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471822",
        name: "Никола Тесла",
        profession: professions.engineer,
        qualities: [qualities.handsome],
        completedMeetings: 72,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(1999, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471823",
        name: "Моника Геллер",
        profession: professions.cook,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 17,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(2004, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed471824",
        name: "Рататуй",
        profession: professions.cook,
        qualities: [qualities.handsome, qualities.buller],
        completedMeetings: 17,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(2019, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed47181f",
        name: "Джоуи Триббиани",
        profession: professions.actor,
        qualities: [qualities.uncertain, qualities.strange],
        completedMeetings: 434,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(2008, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
    {
        _id: "67rdca3eeb7f6fgeed47181r",
        name: "Брэд Питт",
        profession: professions.actor,
        qualities: [qualities.handsome],
        completedMeetings: 434,
        phone: "+7 (495) 123-45-67",
        birthday: new Date(1998, 1, 14, 12, 42, 12),
        mail: "exjohnsmith@gmail.com",
        bookmark: false,
    },
];

export function fetchAll() {
    return users;
}

export function getById(id) {
    return users.find((user) => user._id === id);
}
