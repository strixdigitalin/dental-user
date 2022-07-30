import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./view/theme";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./view/routes";
import { persistor } from "./application/store";
import { PersistGate } from "redux-persist/integration/react";
import "./view/Style/responsive.css";
import "./view/Style/text.css";
import "./view/Style/measurement.css";
import "./view/Style/colors.css";
import "./view/Style/Component/package.css";

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
