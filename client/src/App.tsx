import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './assets';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App;