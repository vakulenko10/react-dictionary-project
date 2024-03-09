import './App.css';
import Header from './Components/Header';
import MainComponent from './Components/MainComponent';
import { useTheme } from './Components/themeContext';


function App() {
  const {theme, toggleTheme } = useTheme();
  return (
    <div className={`App min-h-screen ${theme == 'light'? 'bg-slate-200':'bg-slate-800 text-white'}`}>
      <Header />
      <main>
        <MainComponent/>
      </main>
    </div>
  );
}

export default App;
