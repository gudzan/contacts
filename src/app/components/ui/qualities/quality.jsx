import React from "react";

export default function Quality({ _id, color, name }) {
    return (
        <span key={_id} className={`badge m-1 rounded-pill bg-${color}`}>
            {name}
        </span>
    );
}
