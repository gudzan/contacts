import React, { useContext, useState, useEffect } from "react";
import professionService from "../services/professionService";
import { toast } from "react-toastify";

const ProfessionsContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionsContext);
};

export const ProfessionsProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getProfessions = async () => {
            try {
                const { content } = await professionService.getAll();
                setProfessions(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getProfessions();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, []);

    function getProfession(id) {
        return professions.find((profession) => profession._id === id);
    }

    function errorCatcher(error) {
        setError(error.response.data);
        console.log(error.response.data);
    }

    return (
        <ProfessionsContext.Provider value={{ professions, getProfession, isLoading }}>
            {children}
        </ProfessionsContext.Provider>
    );
};