import React, { useState, useContext } from 'react';

import { ScreenContext } from '../contexts/ScreenContext';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const ClickableAvatar = (props) => {
    const { isMobile } = useContext(ScreenContext)
    const [open, setOpen] = useState(false);

    const onAvatarClick = () => setOpen(!open);

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
                    alignItems: "center",
                    userSelect: "none",
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