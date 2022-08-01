import React, { useEffect } from 'react';
import HomeHero from '../components/HomeHero';
import FoodRow from '../components/FoodRow';
import { useGetCategoriesQuery, useGetIngredientsQuery } from '../services/theMealDBAPI';
import TodaySpecial from '../components/TodaySpecial';

const Home = () => {

    const { data: categories } = useGetCategoriesQuery();
    const { data: ingredients } = useGetIngredientsQuery();

    useEffect(() => {
        document.title = "DAN | Home"
    }, [])

    return (
        <>
            <HomeHero />
            <FoodRow 
                title="Browse by Categories" 
                data={categories?.categories} 
                fields={{ id: "idCategory", title: "strCategory", description: "strCategoryDescription", image: "strCategoryThumb" }}
                limit={5} 
                more={true}
                morePath="/category" 
                moreText="More Categories"
                getPath={(category) => `/category/${category?.title}`} />
            <TodaySpecial />
            <FoodRow 
                title="Browse by Ingredients" 
                data={ingredients?.meals.map((ingredient) => ({...ingredient, strIngredientThumb: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}))} 
                fields={{ id: "idIngredient", title: "strIngredient", description: "strDescription", image: "strIngredientThumb" }}
                limit={5} 
                more={true}
                morePath="/ingredient"
                moreText="More Ingredients"
                getPath={(ingredient) => `/ingredient/${ingredient?.title}`} />
        </>
    )
}

export default Home;