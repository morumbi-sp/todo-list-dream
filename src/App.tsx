import { useState } from 'react';
import BackBoard from './components/BackBoard';
import NavBar from './components/NavBar';
import MainBoard from './components/MainBoard';
import Footer from './components/Footer';

export interface ITodo {
  id: string;
  text: string;
  status: string;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [navMenu, setNavMenu] = useState<'all' | 'active' | 'completed'>('all');

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleAddTodo = (data: string) => {
    window.event?.preventDefault();
    const newTodo = {
      id: Date.now().toString(),
      text: data,
      status: 'active',
    };
    setTodoList((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChangeStatus = (id: string, e: React.BaseSyntheticEvent) => {
    setTodoList((prev) =>
      prev.map((item) => {
        if (item.id === id && e.target.checked === true) {
          return { ...item, status: 'completed' };
        } else if (item.id === id && e.target.checked === false) {
          return { ...item, status: 'active' };
        } else return item;
      })
    );
  };

  const handleNavMenu = (event: React.BaseSyntheticEvent) => {
    setNavMenu(event.target.name);
  };

  return (
    <BackBoard darkMode={darkMode}>
      <NavBar
        toggleDarkMode={handleDarkMode}
        darkMode={darkMode}
        onNavMenu={handleNavMenu}
        navMenu={navMenu}
      />
      <MainBoard
        todoList={todoList}
        onDeleteTodo={handleDeleteTodo}
        onChangeStatus={handleChangeStatus}
        navMenu={navMenu}
      />
      <Footer onAddTodo={handleAddTodo} />
    </BackBoard>
  );
}

export default App;
