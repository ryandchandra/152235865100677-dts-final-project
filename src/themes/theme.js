// import createTheme di sini
import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
    palette: {
        primary: {
            main: "#00AA5F",
        },
        secondary: {
            main: "#3B4A3F",
        },
        info: {
            main: "#fff",
            dark: "#000"
        }
    },
});

const theme = createTheme(baseTheme, {
    typography: {
        h2: {
            color: baseTheme.palette.info.main
        },
        h5: {
            color: baseTheme.palette.info.main
        },
        // subtitle1: {
        //     color: baseTheme.palette.info.main
        // },
        // subtitle2: {
        //     color: baseTheme.palette.info.main
        // },
        // body1: {
        //     color: baseTheme.palette.info.main
        // },
        // body2: {
        //     color: baseTheme.palette.info.main
        // },
        // inherit: {
        //     color: baseTheme.palette.info.main
        // }
    }
})

export default theme;