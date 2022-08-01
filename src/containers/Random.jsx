import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRandomQuery } from '../services/theMealDBAPI';

const Random = () => {
    const navigate = useNavigate();

    const { data, isLoading, error } = useRandomQuery();

    useEffect(() => {
        document.title = "DAN | Random"
    }, [])

    useEffect(() => {
        if (data?.meals[0]?.idMeal){
            navigate(`/meal/${data?.meals[0]?.idMeal}`);
        }
    }, [navigate, data])

    if (isLoading){
        return;
    } else if (error){
        return;
    } else {
        return;
    }
}

export default Random;