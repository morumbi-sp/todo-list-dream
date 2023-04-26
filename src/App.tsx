import { useEffect, useState } from 'react';
import BackBoard from './components/BackBoard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { changeArrayItem } from './libs/dragNdrop';

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
  const handleDragMode = () => {
    setDrag((prev) => !prev);
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

    if (droppableId === 'flag' && toIdx !== undefined) {
      const newArray = changeArrayItem([...flagTodoList], fromIdx, toIdx);
      setFlagTodoList((prev) => newArray);
    }
    if (droppableId === 'active' && toIdx !== undefined) {
      const newArray = changeArrayItem([...activeTodoList], fromIdx, toIdx);
      setActiveTodoList((prev) => newArray);
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
          toggleDragMode={handleDragMode}
          dragMode={drag}
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
                              toggleDragMode={handleDragMode}
                              dragMode={drag}
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
                <Droppable droppableId='active'>
                  {(magic) => (
                    <div
                      ref={magic.innerRef}
                      {...magic.droppableProps}
                      className='space-y-4'
                    >
                      {activeTodoList.map((item, idx) => (
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
                              toggleDragMode={handleDragMode}
                              dragMode={drag}
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

        <Footer
          onAddTodo={handleAddTodo}
          toggleDragMode={handleDragMode}
          dragMode={drag}
        />
      </BackBoard>
    </>
  );
}

export default App;
