import { useState } from 'react';
import BackBoard from './components/BackBoard';
import NavBar from './components/NavBar';
import MainBoard from './components/MainBoard';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <BackBoard darkMode={darkMode}>
      <NavBar toggleDarkMode={handleDarkMode} darkMode={darkMode} />
      <MainBoard />
      <Footer />
    </BackBoard>
  );
}

export default App;
