import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';


const App:React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (event: React.SubmitEvent) => {
    event.preventDefault();
    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false }])
      setTodo("")
      console.log(todos)
    }
  };


  return <div className='App'>
    <span className="heading">Taskify</span>
    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>

    {todos.map((target)=>(
      <li>{target.todo}</li>
    ))}
    
  </div>;

}

export default App;
