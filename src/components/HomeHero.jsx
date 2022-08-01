import React from 'react';

import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const suggestions = ["apple","chicken","cake","fish","ham","lamb","noodles","orange","pasta","pie","pizza","steak","soup","tomato",];

const HomeHero = () => {
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const search = data.get('search');

        navigate(`/search?term=${search}`);
    }

    return (
        <>
            <Box sx={{ 
                minHeight: "90vh", 
                width: "100%", 
                backgroundColor: "primary.main", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center"
            }}>
                <Typography variant="h2" color="info" sx={{ fontWeight: "bold" }}>Welcome</Typography>
                <Avatar src="images/logo/logo-white.png" alt="Logo" sx={{ width: 200, height: 200 }} />
                <Box component="form" noValidate onSubmit={onSubmit} sx={{ width: "50%" }}>
                    <Typography variant="h4" color="info" sx={{ fontWeight: "bold", color: "info.main" }}>Start Searching Here</Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="search"
                        placeholder="Start Searching Here"
                        name="search"
                        autoComplete="search"
                        autoFocus 
                        size="small"
                        sx={{ backgroundColor: "info.main", my: 5 }} 
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search />
                              </InputAdornment>
                            ),
                        }} />
                    <Button type="submit" variant="contained" color="secondary" sx={{ mx: 5, my: 2, minWidth: 160 }}>Search</Button>
                    <Button href="/random" variant="contained" color="secondary" sx={{ mx: 5, my: 2, minWidth: 160 }}>Surprise Me!</Button>
                </Box>
                <Box sx={{ marginTop: "5rem", padding: "0 5rem" }}>
                    <Typography variant="h6" color="info" sx={{ fontWeight: "bold", color: "info.main" }}>Suggestions:</Typography>
                    { suggestions.map((suggestion) => <Button key={suggestion} href={`/search?term=${suggestion}`} color="info">{suggestion}</Button>)}
                </Box>
            </Box>
        </>
    )
}

export default HomeHero;