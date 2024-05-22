import React from "react";
//здесь используесть в качестве элементов обьект, но лично мне хотелось бы видеть лист, но нужно было потренировать обьект и значения по умолчанию
const Filter = ({ items, valueProperty, contentProperty }) => {
    const array = Object.keys(items);
    return (
        <div className="dropdown mb-3">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Фильтр
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {array.map((key) => (
                    <li key={items[key]._id}>
                        <button className="dropdown-item" type="button">
                            {items[key].name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
