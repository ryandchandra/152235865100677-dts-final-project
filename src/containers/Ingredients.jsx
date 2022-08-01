import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { reset, setPage, selectPage } from '../features/pagination/paginationSlice';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import FoodRow from '../components/FoodRow';

import { useGetIngredientsQuery } from '../services/theMealDBAPI';

const ENTRIES_ON_ONE_PAGE = 10;

const Ingredients = () => {
    const page = useSelector(selectPage);
    const dispatch = useDispatch();

    const { data: ingredients } = useGetIngredientsQuery();

    const onPaginationChange = (event, value) => dispatch(setPage(value));

    // reset page on mount
    useEffect(() => {
        dispatch(reset());
    }, [dispatch])

    // change document title
    useEffect(() => {
        document.title = `DAN | Ingredients`
    }, [])

    return (
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "5rem"
        }}>
            <FoodRow 
                title="Ingredients" 
                data={ingredients?.meals
                    ?.filter((ingredient, ingredientIndex) => ingredientIndex>=(page-1)*ENTRIES_ON_ONE_PAGE && ingredientIndex<page*ENTRIES_ON_ONE_PAGE)
                    ?.map((ingredient) => ({...ingredient, strIngredientThumb: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}))} 
                fields={{ id: "idIngredient", title: "strIngredient", description: "strDescription", image: "strIngredientThumb" }}
                getPath={(ingredient) => `/ingredient/${ingredient?.title}`} />
            <Pagination color="primary" count={ingredients?.meals?.length ? Math.ceil(ingredients?.meals?.length/ENTRIES_ON_ONE_PAGE) : 1} page={page} onChange={onPaginationChange}/>
        </Box>
    )
}

export default Ingredients;