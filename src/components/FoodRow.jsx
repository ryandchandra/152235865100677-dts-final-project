import React from 'react';
import FoodCard from './FoodCard';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const FoodRow = ({ title, limit = 20, size = {}, data, fields, more, morePath, moreText, getPath, padding }) => {

    return (
        <Box sx={{ width: "100%", padding: padding ? padding : "5rem 0" }}>
            <Typography variant="h4">{title}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "0.5rem", padding:"2rem 5rem", flexWrap: "wrap" }}>
                { data?.filter((item,index) => !limit || index<limit)?.map((item) => <FoodCard 
                    key={item[fields?.id]} 
                    data={{ 
                        id: item[fields?.id], 
                        title: item[fields?.title], 
                        description: item[fields?.description], 
                        image: item[fields?.image] }} 
                    size={size}
                    getPath={getPath}
                />)}
            </Box>
            { more ? <Button href={morePath} color="primary" size="large">{moreText || "More Information"}</Button> : null}
        </Box>
    )
}

export default FoodRow;