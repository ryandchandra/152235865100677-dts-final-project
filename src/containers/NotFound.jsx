import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

const NotFound = () => {

    useEffect(() => {
        document.title = "DAN | Not Found"
    }, [])

    return (
        <main style={{ padding: "1rem 15rem", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <p>There's nothing here!</p>
            <Button href="/" variant="contained">
                Go Back
            </Button>
        </main>
    )
}

export default NotFound;