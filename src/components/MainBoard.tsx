import React from 'react';
import TodoItem from './TodoItem';
import { ITodo } from '../App';

interface Props {
  todoList: ITodo[];
  onDeleteTodo: (id: string) => void;
  onChangeStatus: (id: string, e: React.BaseSyntheticEvent) => void;
  navMenu: string;
}

export default function MainBoard({
  todoList,
  onDeleteTodo,
  onChangeStatus,
  navMenu,
}: Props) {
  if (navMenu === 'active') {
    todoList = todoList.filter((item) => item.status === 'active');
  }
  if (navMenu === 'completed') {
    todoList = todoList.filter((item) => item.status === 'completed');
  }

  return (
    <div className='min-h-[300px] space-y-4 bg-light-100 px-5 py-5 dark:bg-dark-100'>
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          item={item.text}
          id={item.id}
          status={item.status}
          onDeleteTodo={(id: string) => onDeleteTodo(id)}
          onChangeStatus={(id: string, e: React.BaseSyntheticEvent) =>
            onChangeStatus(id, e)
          }
        />
      ))}
    </div>
  );
}
