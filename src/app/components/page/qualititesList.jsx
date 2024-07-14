import React, { useEffect, useState } from "react";
import httpService from "../services/httpService.js"

export default function QualititesList() {
    const [qualitites, setQualitites] = useState([]);
    useEffect(() => {
        httpService
            .get("quality")
            .then((res) => setQualitites(res.data.content));
    }, []);
    return (
        <>
            <p>QualititesList+axios</p>
            {qualitites && qualitites.map((q) => <p key={q._id}>{q.name}</p>)}
        </>
    );
}
