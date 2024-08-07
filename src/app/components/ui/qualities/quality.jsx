import React from "react";
import { useQualities } from "../../hooks/useQualities";

export default function Quality({id}) {
    const { getQuality } = useQualities();
    const { color, name } = getQuality(id);
    return (
        <span className={`badge m-1 rounded-pill bg-${color}`}>
            {name}
        </span>
    );
}