import React from "react";

const Filter = ({
    items,
    valueProperty,
    contentProperty,
    onSelectItem,
    selectedItem,
}) => {   
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
                {selectedItem ? selectedItem.name : "Фильтр"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {items.map((item) => (
                    <li key={item._id}>
                        <button
                            className={
                                "dropdown-item" +
                                getClassForActiveItem(item)
                            }
                            type="button"
                            onClick={() => onSelectItem(item)}
                        >
                            {item.name}
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
