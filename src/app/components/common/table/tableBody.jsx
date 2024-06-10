import React from "react";
import _ from "lodash";
import * as utils from "../../../utils/utils.js";

const TableBody = ({ columns, data }) => {
    function dateToString(date) {
        if (date instanceof Date) {
            return `${date.toLocaleDateString()} (${utils.renderPhrase(
                utils.calculateAge(date),
                "год",
                "года",
                "лет"
            )})`;
        } else {
            return date;
        }
    }

    function render(item, column) {
        const component = columns[column].component;
        if (component) {
            if (typeof component === "function") {
                return component(item);
            } else {
                return component;
            }
        } else {
            return dateToString(_.get(item, columns[column].path));
        }
    }

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{render(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
