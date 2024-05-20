import React from "react";
import _ from "lodash";
import * as utils from "../utils/utils.js";

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button className="page-link">Previous</button>
                </li>
                {pages.map((page) => (
                    <li className="page-item" key={`page: ${page}`}>
                        <button className="page-link"> 
                            {page}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button className="page-link">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
