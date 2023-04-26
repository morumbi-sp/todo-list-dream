import { useEffect, useState } from 'react';
import BackBoard from './components/BackBoard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';

export interface ITodo {
  id: string;
  text: string;
  status: 'flag' | 'active' | 'complete';
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  );

  const [drag, setDrag] = useState(true);

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

  const onDragEnd = (arg: DropResult) => {
    const {
      source: { droppableId, index: fromIdx },
    } = arg;
    const toIdx = arg.destination?.index;

    if (droppableId === 'flag' && toIdx) {
      const newArray = changeArrayItem([...flagTodoList], fromIdx, toIdx);
      setFlagTodoList((prev) => newArray);
    }
  };

  return (
    <>
      <BackBoard darkMode={darkMode}>
        <NavBar
          toggleDarkMode={handleDarkMode}
          darkMode={darkMode}
          onNavMenu={handleNavMenu}
          navMenu={navMenu}
        />
        {drag ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className='min-h-[300px] space-y-4 bg-light-100 px-5 py-5 dark:bg-dark-100'>
              {flagTodoList && navMenu !== 'completed' && (
                <Droppable droppableId='flag'>
                  {(magic) => (
                    <div
                      ref={magic.innerRef}
                      {...magic.droppableProps}
                      className='space-y-3  border-b border-dashed border-gray-200 pb-4'
                    >
                      {flagTodoList.map((item, idx) => (
                        <Draggable
                          draggableId={item.id}
                          index={idx}
                          key={item.id}
                        >
                          {(magic) => (
                            <TodoItem
                              refData={magic.innerRef}
                              draggableProps={magic.draggableProps}
                              dragHandleProps={magic.dragHandleProps}
                              item={item}
                              onDeleteTodo={handleDeleteTodo}
                              onChangeStatus={handleChangeStatus}
                              onChangeFlag={handleChangeFlag}
                              drag
                            />
                          )}
                        </Draggable>
                      ))}
                      {magic.placeholder}
                    </div>
                  )}
                </Droppable>
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
                      drag
                    />
                  ))}
                </div>
              )}

              {completeTodoList && navMenu !== 'active' && (
                <div className='space-y-4'>
                  {completeTodoList.map((item) => (
                    <TodoItem
                      key={item.id}
                      item={item}
                      onDeleteTodo={handleDeleteTodo}
                      onChangeStatus={handleChangeStatus}
                      onChangeFlag={handleChangeFlag}
                      drag
                    />
                  ))}
                </div>
              )}
            </div>
          </DragDropContext>
        ) : (
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

            {completeTodoList && navMenu !== 'active' && (
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
        )}

        <Footer onAddTodo={handleAddTodo} />
      </BackBoard>
    </>
  );
}

export default App;

function changeArrayItem(
  arr: ITodo[],
  draggedItem: number,
  targetIndex: number
): ITodo[] {
  // 배열의 길이가 1 이하인 경우는 정렬할 필요가 없습니다.
  if (arr.length <= 1) {
    return arr;
  }

  // 선택한 값을 제외한 나머지 요소들만을 대상으로 정렬합니다.
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 선택한 값을 비교하지 않도록 건너뜁니다.
      if (j === draggedItem || j + 1 === draggedItem) {
        continue;
      }

      if (arr[j] > arr[j + 1]) {
        // 두 요소의 위치를 교환합니다.
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  // 선택한 값을 지정된 위치로 이동시킵니다.
  const excludedValue = arr.splice(draggedItem, 1)[0];
  arr.splice(targetIndex, 0, excludedValue);

  return arr;
}
