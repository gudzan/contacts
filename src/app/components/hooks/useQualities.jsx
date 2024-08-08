import React, { useContext, useState, useEffect } from "react";
import qualityService from "../services/qualityService";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.getAll();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualities();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, []);

    function getQuality(id) {
        return qualities.find((q) => q._id === id);
    }

    function errorCatcher(error) {
        setError(error.response.data);
        console.log(error.response.data);
    }

    return (
        <QualitiesContext.Provider value={{ qualities, getQuality }}>
            {children}
        </QualitiesContext.Provider>
    );
};
