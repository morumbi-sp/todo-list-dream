import { useEffect, useState } from 'react';
import BackBoard from './components/BackBoard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem';

export interface ITodo {
  id: string;
  text: string;
  status: string;
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  );
  const [todoList, setTodoList] = useState<ITodo[]>(() =>
    JSON.parse(localStorage.getItem('todoList') ?? '[]')
  );
  const [navMenu, setNavMenu] = useState<'all' | 'active' | 'completed'>('all');

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
              status: e.target.checked === true ? 'completed' : 'active',
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
    <>
      <BackBoard darkMode={darkMode}>
        <NavBar
          toggleDarkMode={handleDarkMode}
          darkMode={darkMode}
          onNavMenu={handleNavMenu}
          navMenu={navMenu}
        />
        <div className='min-h-[300px] space-y-4 bg-light-100 px-5 py-5 dark:bg-dark-100'>
          {todoList
            .filter((item) =>
              navMenu === 'all' ? item : item.status === navMenu
            )
            .map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onDeleteTodo={handleDeleteTodo}
                onChangeStatus={handleChangeStatus}
              />
            ))}
        </div>
        <Footer onAddTodo={handleAddTodo} />
      </BackBoard>
    </>
  );
}

export default App;
