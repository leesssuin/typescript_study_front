import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, theme } from "styles";
import { Main, Menu, Options } from "pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Menu />} />
          <Route path="/:id/:menuId" element={<Options />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
