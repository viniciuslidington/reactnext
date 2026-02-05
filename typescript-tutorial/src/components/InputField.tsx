import React, { useRef } from 'react'
import './styles.css'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (event: React.SubmitEvent) => void;
}

const InputField = ({todo, setTodo, handleAdd}:Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form 
				className='text' 
				onSubmit= {(event) => {
					handleAdd(event)
					inputRef.current?.blur();
				}}
				>
        <input 
						ref={inputRef}
						type="input"
            value={todo}
            onChange={ (event) => setTodo(event.target.value)
            }
            placeholder='Enter a task' className='input__box'></input>

        <button className='input_submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField