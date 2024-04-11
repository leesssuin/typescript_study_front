import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, theme } from "styles";
import { Main, Menu } from "pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Menu />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
