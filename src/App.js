import { useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import MainComponent from './Components/MainComponent';
import { useTheme } from './Components/themeContext';
function App() {
  const [showCopied, setShowCopied] = useState(false);
  const {theme, toggleTheme } = useTheme();
  return (
    <div className={`App min-h-screen ${theme == 'light'? 'bg-slate-200':'bg-slate-800 text-white'}`}>
      <Header />
      <main>
        <MainComponent/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
