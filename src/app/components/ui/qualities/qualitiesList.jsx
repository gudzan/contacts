import React from "react";
import Quality from "./quality.jsx";

export default function QualitiesList({ qualities }) {   
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality} id={quality}/>
            ))}
        </>
    );
}
