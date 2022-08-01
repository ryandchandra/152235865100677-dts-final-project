import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchMealQuery } from '../services/theMealDBAPI';

import { useNavigate } from 'react-router-dom';

import FoodRow from '../components/FoodRow';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

const ENTRIES_ON_ONE_PAGE = 5;

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [queryStrings, ] = useSearchParams();

    const { data, isLoading, error } = useSearchMealQuery(queryStrings.get('term'));

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        navigate(`/search?term=${searchTerm}`);
    }

    const onPaginationChange = (event, value) => setPage(value);

    useEffect(() => {
        if (queryStrings.get('term')){
            setSearchTerm(queryStrings.get('term'));
        }
    }, [queryStrings]);

    useEffect(() => {
        document.title = "DAN | Search"
    }, [])

    if (isLoading){
        return <>Please Wait</>
    } else if (error){
        return <>Something went wrong</>
    } else {
        return (
            <Box sx={{ width: "100%", padding: "2.5rem 0", minHeight: "70vh" }}>
                <Box component="form" noValidate onSubmit={onSubmit}>
                    <Typography variant="h6" color="info">Search Meals</Typography>
                    <TextField
                        margin="none"
                        id="search"
                        placeholder="Start Searching Here"
                        name="search"
                        autoComplete="search"
                        autoFocus 
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        size="small"
                        sx={{ backgroundColor: "info.main", my: 5, width: "80%" }} 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }} />
                </Box>
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "5rem"
                }}>
                    {data?.meals?.length ? (
                        <FoodRow 
                            title="" 
                            data={data?.meals?.map((meal) => ({ ...meal, description: `${meal.strCategory} - ${meal.strArea} Cuisine` }))} 
                            fields={{ id: "idMeal", title: "strMeal", description: "description", image: "strMealThumb" }}
                            getPath={(meal) => `/meal/${meal?.id}`}
                            padding="1.5rem 0" />
                    ) : <>No Dishes Found</>}
                    <Pagination color="primary" count={data?.meals?.length ? Math.ceil(data?.meals?.length/ENTRIES_ON_ONE_PAGE) : 1} page={page} onChange={onPaginationChange}/>
                </Box>
            </Box>
        )
    }
}

export default Search;