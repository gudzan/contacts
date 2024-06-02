import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

export default function Table({selectSort, onSort, columns, data, children}) {
    return (
        <table className="table table-hover">
            {children || (
                <>
                    <TableHeader {...{ selectSort, onSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
}
