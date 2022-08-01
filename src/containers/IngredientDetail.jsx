import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { reset, setPage, selectPage } from '../features/pagination/paginationSlice';

import { ScreenContext } from '../contexts/ScreenContext';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import ClickableAvatar from '../components/ClickableAvatar';
import FoodRow from '../components/FoodRow';

import { useGetIngredientsQuery, useGetMealsByMainIngredientQuery } from '../services/theMealDBAPI';

const ENTRIES_ON_ONE_PAGE = 5;

const IngredientDetail = () => {
    const { isMobile } = useContext(ScreenContext)
    const [ingredient, setIngredient] = useState({});

    const page = useSelector(selectPage);
    const dispatch = useDispatch();

    const params = useParams();
    const navigate = useNavigate();

    const { data: ingredients, ingredientLoading } = useGetIngredientsQuery();
    const { data } = useGetMealsByMainIngredientQuery(params.ingredient);

    const onPaginationChange = (event, value) => dispatch(setPage(value));

    // reset page count on mount
    useEffect(() => {
        dispatch(reset());
    }, [dispatch])

    // if ingredient fails to load, redirect to /not-found
    useEffect(() => {
        if (!ingredientLoading && ingredients && ingredients?.meals?.length){
            const index = ingredients?.meals?.findIndex((ingredient) => ingredient?.strIngredient === params.ingredient);
            if (index !== -1){
                setIngredient(ingredients?.meals[index]);
            } else {
                navigate('/not-found');
            }
        }
    }, [ingredientLoading, ingredients, params, navigate])

    // change document title
    useEffect(() => {
        if (ingredient?.strIngredient){
            document.title = `DAN | ${ingredient?.strIngredient}`
        }
    }, [ingredient?.strIngredient])

    if (ingredientLoading){ 
        return; 
    }

    return (
        <>
            <Box sx={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                alignItems: isMobile ? "center" : "flex-start", 
                padding: isMobile ? "5rem" : "5rem 10rem", 
            }}>
                <ClickableAvatar 
                    src={`https://www.themealdb.com/images/ingredients/${ingredient?.strIngredient}.png`} 
                    alt={ingredient?.strIngredient} 
                    variant="square" 
                    sx={{ 
                        width: isMobile ? 400 : 500, 
                        height: isMobile ? 400 : 500 
                    }} />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", padding: isMobile ? "2rem 0" : "0 5rem" }}>
                    <Typography variant="h2" color="primary" sx={{ fontWeight: "bold" }}>{ingredient?.strIngredient}</Typography>                
                    <br/>
                    <Typography variant="h6" sx={{ color: "info.dark" }}>Description:</Typography> 
                    <Typography variant="h6" sx={{ color: "info.dark" }} textAlign="justify">{ingredient?.strDescription}</Typography> 
                    <br/>
                </Box>
            </Box>

            <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5rem"
            }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>Meals with this ingredient:</Typography>
                {data?.meals?.length ? (
                    <FoodRow 
                        title="" 
                        data={data?.meals?.filter((meal, mealIndex) => mealIndex>=(page-1)*ENTRIES_ON_ONE_PAGE && mealIndex<page*ENTRIES_ON_ONE_PAGE)} 
                        fields={{ id: "idMeal", title: "strMeal", image: "strMealThumb" }}
                        getPath={(meal) => `/meal/${meal?.id}`}
                        padding="1.5rem 0" />
                ) : <>No Dishes Found</>}
                <Pagination color="primary" count={data?.meals?.length ? Math.ceil(data?.meals?.length/ENTRIES_ON_ONE_PAGE) : 1} page={page} onChange={onPaginationChange}/>
            </Box>
        </>
    )
}

export default IngredientDetail;