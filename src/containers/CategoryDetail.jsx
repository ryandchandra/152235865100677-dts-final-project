import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { reset, setPage, selectPage } from '../features/pagination/paginationSlice';

import FoodRow from '../components/FoodRow';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { useGetCategoriesQuery, useGetMealsByCategoryQuery } from '../services/theMealDBAPI';

const ENTRIES_ON_ONE_PAGE = 5;

const CategoryDetail = () => {
    const [category, setCategory] = useState({});
    
    const page = useSelector(selectPage);
    const dispatch = useDispatch();

    const params = useParams();
    const navigate = useNavigate();

    const { data: categories, categoryLoading } = useGetCategoriesQuery();
    const { data } = useGetMealsByCategoryQuery(params.category);

    const onPaginationChange = (event, value) => dispatch(setPage(value));

    // reset page on mount
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    // if category (from route param) fails to load, redirect to /not-found
    useEffect(() => {
        if (!categoryLoading && categories && categories?.categories?.length){
            const index = categories?.categories?.findIndex((category) => category?.strCategory === params.category);
            if (index !== -1){
                setCategory(categories?.categories[index]);
            } else {
                navigate('/not-found');
            }
        }
    }, [categoryLoading, categories, params, navigate])

    // change document title
    useEffect(() => {
        if (category?.strCategory){
            document.title = `DAN | ${category?.strCategory}`
        }
    }, [category?.strCategory])

    if (categoryLoading){ 
        return; 
    }

    return (
        <>
            <Box sx={{ 
                display: "flex", 
                flexDirection: "row", 
                alignItems: "flex-start", 
                padding: "5rem 10rem", 
            }}>
                <Avatar src={category?.strCategoryThumb} alt={category?.strCategory} variant="square" sx={{ width: 500, height: 500 }}/>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0 5rem" }}>
                    <Typography variant="h2" color="primary" sx={{ fontWeight: "bold" }}>{category?.strCategory}</Typography>                
                    <br/>
                    <Typography variant="h6" sx={{ color: "info.dark" }}>Description:</Typography> 
                    <Typography variant="h6" sx={{ color: "info.dark" }} textAlign="justify">{category?.strCategoryDescription}</Typography> 
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
                <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>Meals in this category:</Typography>
                {data?.meals?.length ? (
                    <FoodRow 
                        title="" 
                        data={data?.meals?.filter((meal, mealIndex) => mealIndex>=(page-1)*ENTRIES_ON_ONE_PAGE && mealIndex<page*ENTRIES_ON_ONE_PAGE)} 
                        fields={{ id: "idMeal", title: "strMeal", image: "strMealThumb" }}
                        getPath={(meal) => `/meal/${meal?.id}`} />
                ) : <>No Dishes Found</>}
                <Pagination color="primary" count={data?.meals?.length ? Math.ceil(data?.meals?.length/ENTRIES_ON_ONE_PAGE) : 1} page={page} onChange={onPaginationChange}/>
            </Box>
        </>
    )
}

export default CategoryDetail;