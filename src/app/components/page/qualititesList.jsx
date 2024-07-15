import React from "react";
import { useQualities } from "../hooks/useQualities.jsx";

export default function QualititesList() {
    const {qualites, isLoading} = useQualities()
    return (
        <>
            <p>QualititesList+axios</p>
            {!isLoading && qualites.map((q) => <p key={q._id}>{q.name}</p>)}
        </>
    );
}
