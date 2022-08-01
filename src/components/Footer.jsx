import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

const Footer = () => {
    const isMobile = useMediaQuery('(max-width:899px)');

    return (
        <Box sx={{ backgroundColor: 'secondary.main', display: 'flex', flexDirection: 'column', padding: !isMobile ? '2rem 10rem' : '2rem 5rem', color: 'info.main', gap: "2rem" }}> 
            <Box sx={{ display: 'flex', flexDirection: !isMobile ? 'row' : 'column', justifyContent: "space-evenly", gap: '1rem', width: "100%"}}>
                <Typography>Foods</Typography>
                <Typography>Beverage</Typography>
                <Typography>Appetizer</Typography>
                <Typography>Dessert</Typography>
            </Box>
            <Typography>&copy; 2022 DTS REA2A 152235865100-677 Ryan Dharma Chandra, All Rights Reserved</Typography>
        </Box>
    )
}

export default Footer;