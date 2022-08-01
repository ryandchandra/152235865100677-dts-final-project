import React, { useEffect } from 'react';

import FoodRow from '../components/FoodRow';

import { useGetCategoriesQuery } from '../services/theMealDBAPI';

const Categories = () => {

    const { data: categories } = useGetCategoriesQuery();

    useEffect(() => {
        document.title = " DAN | Categories"
    }, [])

    return (
        <>
            <FoodRow 
                title="Categories" 
                data={categories?.categories} 
                fields={{ id: "idCategory", title: "strCategory", description: "strCategoryDescription", image: "strCategoryThumb" }}
                getPath={(category) => `/category/${category?.title}`} />
        </>
    )
}

export default Categories;