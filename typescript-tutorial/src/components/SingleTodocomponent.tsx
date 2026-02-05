import React, { useState, useEffect, useRef } from 'react'
import { Todo } from '../model'
import { MdDoneOutline, MdEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";

// Definição das Props (propriedades) que o componente recebe
type Props = {
    todo: Todo; // Um único objeto todo
    todos: Todo[]; // Array com todos os todos
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // Função para atualizar a lista de todos
}

// Componente funcional tipado com TypeScript
const SingleTodocomponent: React.FC<Props> = ({todo, todos, setTodos}) => {

  // Estado para controlar se está no modo de edição
  const [edit, setEdit] = useState<boolean>(false);
  
  // Estado para armazenar o texto editado do todo
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // useRef cria uma referência para o input de edição
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect executa quando o estado 'edit' muda
  useEffect(() => {
    if (edit) {
      // Foca automaticamente no input quando entra no modo de edição
      inputRef.current?.focus();
    }
  }, [edit]); // Array de dependências: executa quando 'edit' muda

  // Função para deletar um todo específico pelo ID
  const handleDelete = (id: number) => {
    // Filtra o array removendo o todo com o ID correspondente
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Função para marcar/desmarcar um todo como concluído
  const handleDone = (id: number) => {
    // Mapeia o array e inverte o valor de isDone do todo correspondente
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    console.log(todos) // Log para verificar o estado atualizado dos todos
  };

  // Função para salvar a edição do todo
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar página)
    
    // Atualiza o texto do todo correspondente
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    );
    
    // Sai do modo de edição
    setEdit(false);
  };

  return (
    // Form que dispara handleEdit ao pressionar Enter
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
        {/* Renderização condicional tripla */}
        {edit ? (
          // Se estiver editando, mostra input
          <input 
            ref={inputRef} // Referência para focar o input
            value={editTodo} // Valor controlado pelo estado
            onChange={(e) => setEditTodo(e.target.value)} // Atualiza o estado ao digitar
            className='todos__single--text'
          />
        ) : todo.isDone ? (
          // Se não está editando E está concluído, mostra tachado
          <s className='todos__single--text'>{todo.todo}</s>
        ) : (
          // Se não está editando E não está concluído, mostra normal
          <span className='todos__single--text'>{todo.todo}</span>
        )}

        {/* Container com os ícones de ação */}
        <div>
            {/* Ícone de Editar - só ativa se não estiver editando e não estiver concluído */}
            <span className="icon"
              onClick={() => {
                if(!edit && !todo.isDone){
                  setEdit(!edit); // Alterna o modo de edição
                }
              }}
            > 
              <MdEdit/> 
            </span>
            
            {/* Ícone de Deletar - remove o todo da lista */}
            <span className="icon" onClick={() => handleDelete(todo.id)}> 
              <LuTrash2/> 
            </span>
            
            {/* Ícone de Concluir - marca/desmarca como concluído */}
            <span className="icon" onClick={() => handleDone(todo.id)}> 
              <MdDoneOutline/> 
            </span>
        </div>

    </form>
  )
}

export default SingleTodocomponent