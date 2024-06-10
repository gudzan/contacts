import React from "react";

export default function Bookmark(props) {
    return (
        <button onClick={() => props.onToggleBookmark(props.id)}>
            <i
                className={`bi bi-bookmark${
                    props.bookmark ? "-heart-fill" : ""
                }`}
            ></i>
        </button>
    );
}
