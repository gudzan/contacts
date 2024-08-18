import React, { useEffect } from "react";
import Quality from "./quality.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList,
} from "../../../store/qualities.js";

export default function QualitiesList({ qualities }) {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities), {
        devModeChecks: { stabilityCheck: "never" },
    });
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
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
