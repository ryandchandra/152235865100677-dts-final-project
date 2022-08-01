import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ScreenContext } from '../contexts/ScreenContext';

const Footer = () => {
    const { isMobile } = useContext(ScreenContext)

    return (
        <Box sx={{ 
            backgroundColor: 'secondary.main', 
            display: 'flex', 
            flexDirection: 'column', 
            padding: !isMobile ? '2rem 10rem' : '2rem 5rem', 
            color: 'info.main', gap: "2rem" 
        }}> 
            <Box sx={{ display: 'flex', flexDirection: !isMobile ? 'row' : 'column', justifyContent: "space-evenly", gap: '1rem', width: "100%"}}>
                <Typography>Foods</Typography>
                <Typography>Beverage</Typography>
                <Typography>Appetizer</Typography>
                <Typography>Dessert</Typography>
            </Box>
            <Typography>Data Source: <a href="https://www.themealdb.com" style={{ fontWeight: "bold" }}>The Meal DB</a></Typography>
            <Typography>&copy; 2022 DTS REA2A 152235865100-677 Ryan Dharma Chandra, All Rights Reserved</Typography>
        </Box>
    )
}

export default Footer;