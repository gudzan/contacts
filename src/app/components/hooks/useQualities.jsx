import React, { useContext, useState, useEffect } from "react";
import qualityService from "../services/qualityService";

const QualitiesContex = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContex);
};

export const QualitiesProvider = ({ children }) => {
    const [qualites, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.getAll();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                setError(error.response.data);
                console.log(error.response.data);
            }
        };
        getQualities();
    }, []);

    return (
        <QualitiesContex.Provider value={{qualites, isLoading}}>
            {!isLoading ? children : <h1>Loading....</h1>}
        </QualitiesContex.Provider>
    );
};
