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
                    </th>
                ))}
            </tr>
        </thead>
    );
}
