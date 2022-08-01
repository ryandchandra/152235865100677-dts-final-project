import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const theMealDBAPI = createApi({
  reducerPath: "theMealDBAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://www.themealdb.com/api/json/v1/${process.env.REACT_APP_TMDB_KEY}`,
  }),
  endpoints: (builder) => ({
    getMealById: builder.query({
        query: (id) => `/lookup.php?i=${id}`,
    }),
    random: builder.query({
        query: () => `/random.php`,
    }),
    getCategories: builder.query({
        query: () => `/categories.php`,
    }),
    getAreas: builder.query({
        query: () => `/list.php?a=list`,
    }),
    getIngredients: builder.query({
        query: () => `/list.php?i=list`,
    }),
    searchMeal: builder.query({
        query: (searchTerm) => `/search.php?s=${searchTerm}`,
    }),
    getMealsByMainIngredient: builder.query({
        query: (ingredient) => `/filter.php?i=${ingredient}`,
    }),
    getMealsByCategory: builder.query({
        query: (category) => `/filter.php?c=${category}`,
    }),
  })
});

export const {
  useGetMealByIdQuery,
  useRandomQuery,
  useGetCategoriesQuery,
  useGetAreasQuery,
  useGetIngredientsQuery,
  useSearchMealQuery,
  useGetMealsByMainIngredientQuery,
  useGetMealsByCategoryQuery
} = theMealDBAPI;