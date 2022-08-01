import React, { useEffect } from 'react';
import { useState } from 'react';
import FoodRow from '../components/FoodRow';
import { useGetIngredientsQuery } from '../services/theMealDBAPI';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

const ENTRIES_ON_ONE_PAGE = 10;

const Ingredients = () => {
    const [page, setPage] = useState(1);

    const { data: ingredients } = useGetIngredientsQuery();

    const onPaginationChange = (event, value) => setPage(value);

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