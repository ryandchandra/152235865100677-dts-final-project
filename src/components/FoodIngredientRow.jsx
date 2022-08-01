import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FoodIngredientRow = ({ ingredient, amount }) => {

    return (
        <Link to={`/ingredient/${ingredient}`} style={{ color: "inherit", textDecoration: "none", width: "30%", minWidth: 150 }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                <Avatar variant="square" src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`} alt={ingredient} sx={{ height: 60, width: 60 }} />
                <Box>
                    <Typography variant="h6" sx={{ color: "info.dark", fontWeight: "bold" }} textAlign="left">{ingredient}</Typography>
                    <Typography variant="h6" sx={{ color: "info.dark" }} textAlign="left">{amount}</Typography>
                </Box>
            </Box>
        </Link>
    )
}

export default FoodIngredientRow;