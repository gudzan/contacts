import React from "react";

export default function Quality(props) {
    return (
        <span class={`badge m-1 rounded-pill bg-${props.color}`}>
            {props.name}
        </span>
    );
}
