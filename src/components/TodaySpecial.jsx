import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ClickableAvatar from '../components/ClickableAvatar';

import { useGetMealByIdQuery } from '../services/theMealDBAPI';

const id = [52912,52922,52945,52987,52988,52989,52918,53025];
const selectedId = id[Math.floor(Math.random()*id.length)];

const TodaySpecial = () => {
    const { data } = useGetMealByIdQuery(selectedId);

    return (
        <>
            <Box sx={{ 
                minHeight: "90vh", 
                width: "100%", 
                backgroundColor: "primary.main", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                gap: "5rem" }} >
                <Typography variant="h2" color="info" sx={{ fontWeight: "bold" }}>Today's Special</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <ClickableAvatar 
                        sx = {{ border: "10px solid white", height: 500, width: 500, transform: "rotate(-5deg)", "&:hover": { transform: "scale(1.2)", transition: "0.25s" } }}
                        src = {data?.meals ? data?.meals[0]?.strMealThumb : ""}
                        alt = {data?.meals ? data?.meals[0]?.strMeal : ""}
                        variant = "square" />
                    <Box sx={{ padding: "0 5rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start", justifyContent: "space-between" }}>
                        <Typography variant="h2" color="info" textAlign="left" sx={{ fontWeight: "bold" }}>{data?.meals ? data?.meals[0]?.strMeal : ""}</Typography>
                        <br/>
                        <Typography variant="h4" color="info" sx={{ color: "info.main" }}>{data?.meals ? data?.meals[0]?.strCategory : ""} - {data?.meals ? data?.meals[0]?.strArea : ""} Cuisine</Typography>
                        <br/>
                        <Typography variant="h4" color="info" sx={{ color: "info.main" }}>Main Ingredients:</Typography>
                        <Typography variant="h4" color="info" sx={{ color: "info.main" }}>{data?.meals ? data?.meals[0]?.strIngredient1 : ""} - {data?.meals ? data?.meals[0]?.strIngredient2 : ""} - {data?.meals ? data?.meals[0]?.strIngredient3 : ""}</Typography>
                        <br/>
                        <Button href={`/meal/${selectedId}`} variant="contained" color="secondary" sx={{ minWidth: 160 }} size="large">More Information</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default TodaySpecial;