import AppNavigation from './src/navigation/AppNavigation';
import ThemeProvider from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation/>
    </ThemeProvider>
  );
}
