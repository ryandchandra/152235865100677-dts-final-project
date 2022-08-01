import './App.css';
import { ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router";
import Footer from "./components/Footer";
import theme from "./themes/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<NavBar />
				<Outlet/>
        		<Footer/>
			</div>
		</ThemeProvider>
	);
}

export default App;