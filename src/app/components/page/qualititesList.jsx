import React from "react";
import { useQualities } from "../hooks/useQualities.jsx";

export default function QualititesList() {
    const {qualites} = useQualities()
const quality = useQualities().getQuality("668fa78e386964af5e139171")
    return (
        <>
            <p>QualititesList</p>
            {qualites.map((q) => <p key={q._id}>{q.name}</p>)}

            <p>QualititesId = 668fa78e386964af5e139171</p>
            <p>{quality.name}</p>
        </>
    );
}
