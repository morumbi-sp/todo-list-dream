import { useEffect, useState } from 'react';
import BackBoard from './components/BackBoard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem';

export interface ITodo {
  id: string;
  text: string;
  status: 'flag' | 'active' | 'complete';
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  );

  const [flagTodoList, setFlagTodoList] = useState<ITodo[]>(() =>
    JSON.parse(localStorage.getItem('flagTodoList') ?? '[]')
  );
  const [activeTodoList, setActiveTodoList] = useState<ITodo[]>(() =>
    JSON.parse(localStorage.getItem('activeTodoList') ?? '[]')
  );
  const [completeTodoList, setCompleteTodoList] = useState<ITodo[]>(() =>
    JSON.parse(localStorage.getItem('completeTodoList') ?? '[]')
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
    const newTodo: ITodo = {
      id: Date.now().toString(),
      text: data,
      status: 'active',
    };
    setActiveTodoList((prev) => [...prev, newTodo]);
    console.log(activeTodoList);
  };

  const handleDeleteTodo = (id: string) => {
    setFlagTodoList((prev) => prev.filter((item) => item.id !== id));
    setActiveTodoList((prev) => prev.filter((item) => item.id !== id));
    setCompleteTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChangeStatus = (id: string, e: React.BaseSyntheticEvent) => {
    const fromFlag = flagTodoList.find((item) => item.id === id);
    const fromActive = activeTodoList.find((item) => item.id === id);
    const fromComplete = completeTodoList.find((item) => item.id === id);

    if (fromFlag) {
      fromFlag.status = 'complete';
      setCompleteTodoList((prev) => [...prev, fromFlag]);
      setFlagTodoList((prev) => prev.filter((item) => item.id !== fromFlag.id));
    }

    if (fromActive) {
      fromActive.status = 'complete';
      setCompleteTodoList((prev) => [...prev, fromActive]);
      setActiveTodoList((prev) =>
        prev.filter((item) => item.id !== fromActive.id)
      );
    }

    if (fromComplete) {
      fromComplete.status = 'active';
      setActiveTodoList((prev) => [...prev, fromComplete]);
      setCompleteTodoList((prev) =>
        prev.filter((item) => item.id !== fromComplete.id)
      );
    }
  };

  const handleChangeFlag = (id: string, e: React.BaseSyntheticEvent) => {
    const fromFlag = flagTodoList.find((item) => item.id === id);
    const fromActive = activeTodoList.find((item) => item.id === id);
    const fromComplete = completeTodoList.find((item) => item.id === id);

    if (fromFlag) {
      fromFlag.status = 'active';
      setActiveTodoList((prev) => [...prev, fromFlag]);
      setFlagTodoList((prev) => prev.filter((item) => item.id !== fromFlag.id));
    }

    if (fromActive) {
      fromActive.status = 'flag';
      setFlagTodoList((prev) => [...prev, fromActive]);
      setActiveTodoList((prev) =>
        prev.filter((item) => item.id !== fromActive.id)
      );
    }

    if (fromComplete) {
      fromComplete.status = 'flag';
      setFlagTodoList((prev) => [...prev, fromComplete]);
      setCompleteTodoList((prev) =>
        prev.filter((item) => item.id !== fromComplete.id)
      );
    }
  };

  const handleNavMenu = (event: React.BaseSyntheticEvent) => {
    setNavMenu(event.target.name);
  };

  useEffect(() => {
    localStorage.setItem('flagTodoList', JSON.stringify(flagTodoList));
    localStorage.setItem('activeTodoList', JSON.stringify(activeTodoList));
    localStorage.setItem('completeTodoList', JSON.stringify(completeTodoList));
  }, [flagTodoList, activeTodoList, completeTodoList]);

  console.log(navMenu);

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
          {flagTodoList && navMenu !== 'completed' && (
            <div className='space-y-3  border-b border-dashed border-gray-200 pb-4'>
              {flagTodoList.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  onDeleteTodo={handleDeleteTodo}
                  onChangeStatus={handleChangeStatus}
                  onChangeFlag={handleChangeFlag}
                />
              ))}
            </div>
          )}

          {activeTodoList && navMenu !== 'completed' && (
            <div className='space-y-4'>
              {activeTodoList.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  onDeleteTodo={handleDeleteTodo}
                  onChangeStatus={handleChangeStatus}
                  onChangeFlag={handleChangeFlag}
                />
              ))}
            </div>
          )}

          {completeTodoList && navMenu === 'completed' && (
            <div className='space-y-4'>
              {completeTodoList.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  onDeleteTodo={handleDeleteTodo}
                  onChangeStatus={handleChangeStatus}
                  onChangeFlag={handleChangeFlag}
                />
              ))}
            </div>
          )}
        </div>
        <Footer onAddTodo={handleAddTodo} />
      </BackBoard>
    </>
  );
}

export default App;
