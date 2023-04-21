import { useState } from 'react';
import BackBoard from './components/BackBoard';
import NavBar from './components/NavBar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <BackBoard darkMode={darkMode}>
      {/* Nav Bar */}
      <NavBar toggleDarkMode={handleDarkMode} darkMode={darkMode} />

      {/* Main */}
      <div>
        {['Study React', 'Work out', 'visit park', 'eat stake'].map(
          (item, idx) => (
            <div key={idx}>
              <div>
                <input type='checkbox' />
                <span>{item}</span>
              </div>
              <button>Delete</button>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <form>
        <input type='text' />
        <button type='submit'>Add</button>
      </form>
    </BackBoard>
  );
}

export default App;
