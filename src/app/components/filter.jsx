import React from "react";
import PropTypes from "prop-types";
//здесь используесть в качестве элементов обьект, но лично мне хотелось бы видеть лист, но нужно было потренировать обьект и значения по умолчанию
const Filter = ({
    items,
    valueProperty,
    contentProperty,
    onSelectItem,
    selectedItem,
}) => {
    const array = Object.keys(items);
    const getClassForActiveItem = (item) => {
        return selectedItem === item ? " active" : "";
    };
    return (
        <div className="dropdown ">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selectedItem ? selectedItem[contentProperty] : "Фильтр"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {array.map((key) => (
                    <li key={items[key][valueProperty]}>
                        <button
                            className={
                                "dropdown-item" +
                                getClassForActiveItem(items[key])
                            }
                            type="button"
                            onClick={() => onSelectItem(items[key])}
                        >
                            {items[key][contentProperty]}
                        </button>
                    </li>
                ))}
                <li>
                    <hr className="dropdown-divider"></hr>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => onSelectItem()}
                    >
                        Сброс
                    </button>
                </li>
            </ul>
        </div>
    );
};

Filter.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name",
};
export default Filter;
