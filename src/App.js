import { Outlet } from "react-router";

import { ScreenContext } from "./contexts/ScreenContext";

import { ThemeProvider } from "@mui/material";
import theme from "./themes/theme";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import useMediaQuery from "@mui/material/useMediaQuery";

import './App.css';

function App() {
	const isMobile = useMediaQuery('(max-width:899px)');

	return (
		<ScreenContext.Provider value={{ isMobile }}>
			<ThemeProvider theme={theme}>
				<div className="App" sx={{ backgroundColor: "info.main" }}>
					<NavBar />
					<Outlet/>
					<Footer/>
				</div>
			</ThemeProvider>
		</ScreenContext.Provider>
	);
}

export default App;