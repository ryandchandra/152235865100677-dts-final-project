import React from 'react';

import Button from '@mui/material/Button';

const Pagination = ({ page, setPage, maxPage }) => {
    
    const onFirstPageClick = () => setPage(1);
    const onPrevPageClick = () => setPage(page > 1 ? page-1 : page);
    const onNextPageClick = () => setPage(page < maxPage ? page+1 : page);
    const onLastPageClick = () => setPage(maxPage);

    return (
        <>
            <Button onClick={onFirstPageClick} variant="contained"></Button>
            <Button onClick={onPrevPageClick} variant="contained"></Button>
            <Typography>{page} / {maxPage}</Typography>
            <Button onClick={onNextPageClick} variant="contained"></Button>
            <Button onClick={onLastPageClick} variant="contained"></Button>
        </>
    )
}

export default Pagination;