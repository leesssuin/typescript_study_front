import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Error, Main, Menu, Options, Result } from "pages";
import { GlobalStyle, theme } from "styles";
import { ERROR_MESSAGE } from "const";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Menu />} />
          <Route path="/:id/:menuId" element={<Options />} />
          <Route path="/:id/:menuId/result" element={<Result />} />
          <Route
            path="/error"
            element={<Error message={ERROR_MESSAGE.INVALID_ERROR} />}
          />
          <Route
            path="*"
            element={<Error message={ERROR_MESSAGE.PAGE_NOT_FOUND} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
