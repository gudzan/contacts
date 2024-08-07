import React from "react";
import { useProfessions } from "../hooks/useProfessions";

export default function Profession({ id }) {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return null;
}