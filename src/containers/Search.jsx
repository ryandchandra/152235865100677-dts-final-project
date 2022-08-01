import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { reset, setPage, selectPage } from '../features/pagination/paginationSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import FoodRow from '../components/FoodRow';

import { useSearchMealQuery } from '../services/theMealDBAPI';

const ENTRIES_ON_ONE_PAGE = 5;

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState({ category: '', area: '', ingredient: '' })
    const [filteredData, setFilteredData] = useState([]);

    const [queryStrings, ] = useSearchParams();

    const page = useSelector(selectPage);
    const dispatch = useDispatch();

    const { data, isLoading, error } = useSearchMealQuery(queryStrings.get('term'));

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        let target = `/search?term=${searchTerm}`
        if (filterTerm?.category){ target += `&category=${filterTerm.category}` }
        if (filterTerm?.area){ target += `&area=${filterTerm.area}` }
        if (filterTerm?.ingredient){ target += `&ingredient=${filterTerm.ingredient}` }

        navigate(target);
    }

    const onPaginationChange = (event, value) => dispatch(setPage(value));

    // reset page on mount
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    useEffect(() => {
        if (queryStrings.get('term')){
            setSearchTerm(queryStrings.get('term'));
        }
        if (queryStrings.get('category')){
            setFilterTerm((filterTerm) => ({ ...filterTerm, category: queryStrings.get('category')}));
        }
        if (queryStrings.get('area')){
            setFilterTerm((filterTerm) => ({ ...filterTerm, area: queryStrings.get('area')}));
        }
        if (queryStrings.get('ingredient')){
            setFilterTerm((filterTerm) => ({ ...filterTerm, ingredient: queryStrings.get('ingredient')}));
        }
    }, [queryStrings]);

    useEffect(() => {
        document.title = "DAN | Search"
    }, [])

    useEffect(() => {
        setFilteredData(data?.meals?.filter((meal) => {
            return meal.strCategory?.toLowerCase()?.includes(queryStrings.get('category')?.toLowerCase() || '') &&
                meal.strArea?.toLowerCase()?.includes(queryStrings.get('area')?.toLowerCase() || '') &&
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].some((number) => meal["strIngredient" + number]?.toLowerCase()?.includes(queryStrings.get('ingredient')?.toLowerCase() || ''))
        }))
    }, [data, queryStrings])

    if (isLoading){
        return <>Please Wait</>
    } else if (error){
        return <>Something went wrong</>
    } else {
        return (
            <Box sx={{ 
                width: "100%", 
                padding: "2.5rem 0", 
                minHeight: "70vh", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: "5rem", 
                backgroundImage: "linear-gradient(to bottom, rgb(230,230,230) 0%, rgb(230,230,230) 275px, rgb(255, 255, 255) 275px, rgb(255, 255, 255) 100%)"  
            }}>
                <Box component="form" noValidate onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "80%" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", gap: "2rem" }}>
                        <Typography variant="h6" color="info" >Search Meals</Typography>
                        <TextField
                                margin="none"
                                id="search"
                                placeholder="Search"
                                name="search"
                                autoComplete="search"
                                autoFocus 
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                size="small"
                                sx={{ backgroundColor: "info.main", flex: 1 }} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                        <Button type="submit" variant="contained" color="secondary">Search</Button>
                    </Box>
                    <br/>
                    <br/>
                    <Typography variant="h6" color="info" >Additional Filters</Typography>
                    <br/>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", gap: "2rem" }}>
                        <Typography variant="h6" color="info" >Category</Typography>
                        <TextField
                            margin="none"
                            id="category"
                            placeholder="Category"
                            name="category"
                            autoComplete="category"
                            value={filterTerm.category}
                            onChange={(event) => setFilterTerm({ ...filterTerm, category: event.target.value})}
                            size="small"
                            sx={{ backgroundColor: "info.main", flex: 1 }} />
                        <Typography variant="h6" color="info" >Area</Typography>
                        <TextField
                            margin="none"
                            id="area"
                            placeholder="Area"
                            name="area"
                            autoComplete="area"
                            value={filterTerm.area}
                            onChange={(event) => setFilterTerm({ ...filterTerm, area: event.target.value})}
                            size="small"
                            sx={{ backgroundColor: "info.main", flex: 1 }} />
                        <Typography variant="h6" color="info" >Ingredient</Typography>
                        <TextField
                            margin="none"
                            id="ingredient"
                            placeholder="Ingredient"
                            name="ingredient"
                            autoComplete="ingredient"
                            value={filterTerm.ingredient}
                            onChange={(event) => setFilterTerm({ ...filterTerm, ingredient: event.target.value})}
                            size="small"
                            sx={{ backgroundColor: "info.main", flex: 1 }} />
                    </Box>
                </Box>
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "5rem",
                    width: "100%"
                }}>
                    {filteredData?.length ? (
                        <>
                            <FoodRow 
                                title="" 
                                data={filteredData
                                    ?.filter((meal,mealIndex) => mealIndex>=(page-1)*ENTRIES_ON_ONE_PAGE && mealIndex<page*ENTRIES_ON_ONE_PAGE)
                                    ?.map((meal) => ({ ...meal, description: `${meal.strCategory} - ${meal.strArea} Cuisine` }))} 
                                fields={{ id: "idMeal", title: "strMeal", description: "description", image: "strMealThumb" }}
                                getPath={(meal) => `/meal/${meal?.id}`}
                                padding="1.5rem 0" />
                            <Pagination color="primary" count={filteredData?.length ? Math.ceil(filteredData?.length/ENTRIES_ON_ONE_PAGE) : 1} page={page} onChange={onPaginationChange}/>
                        </>
                    ) : <Typography sx={{ margin: "10rem" }}>No Dishes Found</Typography>}
                </Box>
            </Box>
        )
    }
}

export default Search;