import React from "react";
import Quality from "./quality.jsx";
import { useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
} from "../../../store/qualities.js";

export default function QualitiesList({ qualities }) {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities), {
        devModeChecks: { stabilityCheck: "never" },
    });
    if (isLoading) {
        return <p>Loading...</p>;
    } else {
        return (
            <>
                {qualitiesList.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </>
        );
    }
}
