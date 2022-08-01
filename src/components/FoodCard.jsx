import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const FoodCard = ({ data, size = {}, getPath }) => {

    return (
        <Card sx={{ 
            ...size, 
            width: "20%", 
            maxWidth: 300, 
            minHeight: 400,
            mb: 2, 
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            "&:hover": { transform: "translateY(-10px)", transition: "0.25s" } 
        }}>
            <CardMedia
                component="img"
                height="200"
                image={data?.image}
                alt={data?.title} />
            <CardContent>
                <Typography variant="h6" textAlign="left">{data?.title}</Typography>
                <Typography textAlign="justify">{data?.description?.substring(0,200)}{data?.description?.length>200 ? "..." : ""}</Typography>
            </CardContent>
            <Box sx={{ flex: 1 }} />
            { getPath ? (
                <CardActions>
                    <Button href={getPath(data)} size="small">Learn More</Button>
                </CardActions>
            ) : null }
        </Card>
    )
}

export default FoodCard;