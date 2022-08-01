import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const ClickableAvatar = (props) => {
    const isMobile = useMediaQuery('(max-width:899px)');
    const [open, setOpen] = useState(false);

    const onAvatarClick = () => setOpen(!open);

    console.log(isMobile)

    return (
        <>
            <Avatar {...props} sx={{ ...props.sx, cursor: "pointer" }} onClick={onAvatarClick}/>

            { open ? (
                <Box sx={{ 
                    position: "fixed", 
                    zIndex: 100000, 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    width: "100%", 
                    height: "100%", 
                    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }} onClick={onAvatarClick}>
                    <img
                        src={props.src}
                        alt={props.alt}
                        style = {isMobile ? { width: "90vw", cursor: "pointer" } : { height: "90vh", cursor: "pointer" }}
                        />
                </Box>
            ) : null}
        </>
    )
}

export default ClickableAvatar;