import React, { useState } from 'react'
import { Todo } from '../model'
import { MdDoneOutline, MdEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodocomponent: React.FC<Props> = ({todo, todos, setTodos}) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, seteditTodo] = useState(todo.todo);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <form className='todos__single'>
        {todo.isDone? (
          <s className='todos__single--text'>{todo.todo}</s>
        ): (
          <span className='todos__single--text'>{todo.todo}</span>
        )}
        <span className='todos__single--text'>
            {todo.todo}
        </span>

        <div>
            <span className="icon"
              onClick={()=> {
                if(!edit && !todo.isDone){
                  setEdit(!edit);
                }
              }}
            > <MdEdit/> </span>
            <span className="icon" onClick={()=> handleDelete(todo.id)}> <LuTrash2/> </span>
            <span className="icon" onClick={()=> handleDone(todo.id)}> <MdDoneOutline/> </span>
        </div>

    </form>
  )
}

export default SingleTodocomponent