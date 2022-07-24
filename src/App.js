import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./view/theme";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./view/routes";
import { persistor } from "./application/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <div className="App">
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </div>
  );
}

export default App;
