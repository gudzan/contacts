import React, { useEffect, useState } from "react";
import qualityService from "../services/qualityService.js";

export default function QualititesList() {
    const [qualitites, setQualitites] = useState([]);
    useEffect(() => {
        qualityService.getAll().then((data)=>setQualitites(data.content))
    }, []);
    return (
        <>
            <p>QualititesList+axios</p>
            {qualitites && qualitites.map((q) => <p key={q._id}>{q.name}</p>)}
        </>
    );
}
