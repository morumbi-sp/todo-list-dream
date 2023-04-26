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
  // const [todoList, setTodoList] = useState<ITodo[]>(() =>
  //   JSON.parse(localStorage.getItem('todoList') ?? '[]')
  // );

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
    const newTodo = {
      id: Date.now().toString(),
      text: data,
      status: 'active',
      flag: false,
    };

    setActiveTodoList((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    setFlagTodoList((prev) => prev.filter((item) => item.id !== id));
    setActiveTodoList((prev) => prev.filter((item) => item.id !== id));
    setCompleteTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChangeStatus = (id: string, e: React.BaseSyntheticEvent) => {
    const toComplete = activeTodoList.find((item) => item.id === id);
    const toActive = completeTodoList.find((item) => item.id === id);

    if (toComplete) {
      toComplete.status = 'complete';
      setCompleteTodoList((prev) => [...prev, toComplete]);
      setActiveTodoList((prev) =>
        prev.filter((item) => item.id !== toComplete.id)
      );
    }

    if (toActive) {
      toActive.status = 'active';
      setActiveTodoList((prev) => [...prev, toActive]);
      setCompleteTodoList((prev) =>
        prev.filter((item) => item.id !== toActive.id)
      );
    }
  };

  const handleChangeFlag = (id: string, e: React.BaseSyntheticEvent) => {
    setFlagTodoList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              flag: !item.flag,
            }
          : item
      )
    );
    setActiveTodoList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              flag: !item.flag,
            }
          : item
      )
    );
    setCompleteTodoList((prev) =>
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
    localStorage.setItem('flagTodoList', JSON.stringify(flagTodoList));
    localStorage.setItem('activeTodoList', JSON.stringify(activeTodoList));
    localStorage.setItem('completeTodoList', JSON.stringify(completeTodoList));
  }, [flagTodoList, activeTodoList, completeTodoList]);

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
          {flagTodoList.length && navMenu !== 'completed' ? (
            <div className='space-y-3  border-b border-dashed border-gray-200 pb-4'>
              {flagTodoList
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
          ) : null}

          <div className='space-y-4'>
            {activeTodoList
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
          <div className='space-y-4'>
            {completeTodoList
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
        </div>
        <Footer onAddTodo={handleAddTodo} />
      </BackBoard>
    </>
  );
}

export default App;

// function sortedTodoList(list: ITodo[]): {
//   flagList: ITodo[];
//   restList: ITodo[];
// } {
//   const flagList = [...list].filter((item) => item.flag === true);
//   // .sort((a, b) => b.id.localeCompare(a.id));
//   const restList = [...list]
//     .filter((item) => item.flag === false)
//     .sort((a, b) => {
//       if (a.status === b.status) return b.id.localeCompare(a.id);
//       else return a.status.localeCompare(b.status);
//     });
//   const activeList = [...list].filter(
//     (item) => item.flag === false && item.status === 'active'
//   );
//   return { flagList, restList };
// }
