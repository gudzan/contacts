import React from "react";

export default function Quality(props) {
    return (
        <span className={`badge m-1 rounded-pill bg-${props.color}`}>
            {props.name}
        </span>
    );
}