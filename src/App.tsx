import { useEffect, useState } from 'react';
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
  const [todoList, setTodoList] = useState<ITodo[]>(() =>
    JSON.parse(localStorage.getItem('todoList') ?? '[]')
  );
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
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: e.target.checked === true ? 'completed' : ' active',
            }
          : item
      )
    );
  };

  const handleNavMenu = (event: React.BaseSyntheticEvent) => {
    setNavMenu(event.target.name);
  };

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

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
