import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import FoodIngredientRow from '../components/FoodIngredientRow';

import { useGetMealByIdQuery } from '../services/theMealDBAPI';


const Detail = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error } = useGetMealByIdQuery(params?.id);

    const meal = data?.meals ? data?.meals[0] : null;

    useEffect(() => {
        if (!isLoading && !data?.meals){
            navigate('/not-found')
        }
    }, [isLoading, navigate, data])

    useEffect(() => {
        if (meal?.strMeal){
            document.title = `DAN | ${meal?.strMeal}`
        }
    }, [meal?.strMeal])

    if (isLoading){ 
        return; 
    } else if (error){
        return;
    }
    
    return (
        <>
            <Box sx={{ 
                display: "flex", 
                flexDirection: "row", 
                alignItems: "flex-start", 
                padding: "5rem 10rem", 
                backgroundImage: "linear-gradient(to bottom, rgb(230,230,230) 0%, rgb(230,230,230) 275px, rgb(255, 255, 255) 275px, rgb(255, 255, 255) 100%)" 
            }}>
                <Avatar src={meal?.strMealThumb} alt={meal?.strMeal} variant="square" sx={{ width: 500, height: 500, border: "10px solid white" }}/>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0 5rem" }}>
                    <Typography variant="h2" color="primary" sx={{ fontWeight: "bold" }} textAlign="left">{meal?.strMeal}</Typography>
                    <br/>
                    <Typography variant="h5" sx={{ fontWeight: "semi-bold", color: "info.dark" }}>
                        Category:
                        &nbsp;
                        <Link to={`/category/${meal?.strCategory}`} style={{ textDecoration: "none", fontWeight: "bold", color: "inherit" }}>{meal?.strCategory}</Link>
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "semi-bold", color: "info.dark" }}>Area: {meal?.strArea}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: "semi-bold", color: "info.dark" }}>Tags: {meal?.strTags}</Typography>
                    <br/>
                    <Typography variant="h6" sx={{ color: "info.dark" }}>Instructions:</Typography> 
                    <Box>
                        {meal?.strInstructions?.replace(/tbsp./g,"tbsp").split(". ")?.map((item,index) => <Typography key={item} variant="h6" sx={{ color: "info.dark" }} textAlign="left">{index+1}. {item}.</Typography>)}
                    </Box>
                    <br/>
                    <Typography variant="h6" sx={{ color: "info.dark" }}>Ingredients:</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "0.2rem", flexWrap: "wrap" }}>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((number) => {
                            if (meal["strIngredient" + number]){
                                return <FoodIngredientRow ingredient={meal["strIngredient" + number]} amount={meal["strMeasure" + number]} />;
                            }
                            return null;
                        })}
                    </Box>
                </Box>
            </Box>
            {meal?.strYoutube ? (
                <>
                    <Typography variant="h6" sx={{ color: "info.dark" }}>Tutorial Videos:</Typography>
                    <iframe 
                        width="560" 
                        height="315" 
                        src={`https://www.youtube.com/embed/${meal?.strYoutube?.substring(32)}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        style={{ margin: "2rem 0" }} >
                    </iframe>
                </>
            ) : null }
            {meal?.strSource ? (
                <Box sx={{ margin: "2rem 0" }}>
                    <Button target="_blank" href={meal?.strSource} size="large">Additional Information</Button>
                </Box>
            ) : null }
        </>
    )
}

export default Detail;