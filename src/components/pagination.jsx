import React from "react";
import _ from "lodash";

const Pagination = (props) => {
    const {
        itemsCount,
        pageSize,
        currentPage,
        onSelectPage,
        onPreviousPage,
        onNextPage,
    } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);

    const getClassForActiveItem = (page) => {
        return currentPage === page ? " active" : "";
    };

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li
                    className={
                        "page-item" + (currentPage === 1 ? " disabled" : "")
                    }
                >
                    <button
                        className="page-link"
                        onClick={() => onPreviousPage()}
                    >
                        Previous
                    </button>
                </li>
                {pages.map((page) => (
                    <li
                        className={`page-item` + getClassForActiveItem(page)}
                        key={`page: ${page}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onSelectPage(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li
                    className={
                        "page-item" +
                        (currentPage === pages[pages.length - 1]
                            ? " disabled"
                            : "")
                    }
                >
                    <button className="page-link" onClick={() => onNextPage()}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
