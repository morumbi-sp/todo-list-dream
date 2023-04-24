import { useEffect, useState } from 'react';
import BackBoard from './components/BackBoard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem';

export interface ITodo {
  id: string;
  text: string;
  status: string;
  flag: boolean;
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
      flag: false,
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
              flag: e.target.checked === true ? false : item.flag,
            }
          : item
      )
    );
  };
  const handleChangeFlag = (id: string, e: React.BaseSyntheticEvent) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              flag: !item.flag,
              status:
                item.status === 'completed' && item.flag === false
                  ? 'active'
                  : item.status,
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
          {sortTodoList(todoList)
            .filter((item) =>
              navMenu === 'all' ? item : item.status === navMenu
            )
            .map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onDeleteTodo={handleDeleteTodo}
                onChangeStatus={handleChangeStatus}
                onChangeFlag={handleChangeFlag}
              />
            ))}
        </div>
        <Footer onAddTodo={handleAddTodo} />
      </BackBoard>
    </>
  );
}

export default App;

function sortTodoList(list: ITodo[]): ITodo[] {
  const sortedTodoList = [...list]; // 배열 복사
  sortedTodoList.sort((a, b) => {
    if (a.flag === b.flag) {
      if (a.status === b.status) {
        return a.id.localeCompare(b.id); // id로 오름차순 정렬
      } else {
        return a.status.localeCompare(b.status);
      }
    } else {
      return Number(b.flag) - Number(a.flag); // flag가 true인 것을 우선으로 정렬
    }
  });
  return sortedTodoList;
}
