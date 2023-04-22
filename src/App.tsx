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

  console.log(todoList);

  return (
    <BackBoard darkMode={darkMode}>
      <NavBar toggleDarkMode={handleDarkMode} darkMode={darkMode} />
      <MainBoard
        todoList={todoList}
        onDeleteTodo={handleDeleteTodo}
        onChangeStatus={handleChangeStatus}
      />
      <Footer onAddTodo={handleAddTodo} />
    </BackBoard>
  );
}

export default App;
