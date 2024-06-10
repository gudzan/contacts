import React from "react";

export default function TableHeader({ selectSort, onSort, columns }) {
    function handleSort(item) {
        if (item === selectSort.iterate) {
            onSort({
                ...selectSort,
                order: selectSort.order === "asc" ? "desc" : "asc",
            });
        } else {
            onSort({ iterate: item, order: "asc" });
        }
    }

    const typeOfArrow =
        selectSort.order === "asc" ? (
            <i className="bi bi-caret-down-fill"></i>
        ) : (
            <i className="bi bi-caret-up-fill"></i>
        );

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((col) => (
                    <th
                        key={col}
                        onClick={
                            columns[col].sort
                                ? () => handleSort(columns[col].path)
                                : undefined
                        }
                        scope="col"
                        role={columns[col].sort && "button"}
                    >
                        {columns[col].name}
                        {selectSort.iterate === columns[col].path &&
                            typeOfArrow}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
