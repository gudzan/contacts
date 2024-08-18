import React from "react";
import { useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus } from "../../store/professions";

export default function Profession({ id }) {
    const isLoading = useSelector(getProfessionsLoadingStatus())
    const profession = useSelector(getProfessionById(id))
    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else return null;
}