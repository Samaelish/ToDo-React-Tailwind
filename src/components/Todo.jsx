import todo_icon from '../assets/todo_icon.png'
import TodoItem from './TodoItem'
import { useEffect, useState } from 'react'

const Todo = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = JSON.parse(localStorage.getItem('todos'))
    if (!localTodos) {
      return
    }

    console.log(localTodos)
    setTodos(localTodos)
  }, [])

  const persistData = newList => {
    localStorage.setItem('todos', JSON.stringify(newList))
    console.log(newList)
  }

  const addTodo = inputValueText => {
    const newTodo = {
      id: Date.now(),
      text: inputValueText,
      completed: false,
    }
    const newList = [...todos, newTodo]
    setTodos(newList)
    setInputValue('')
    persistData(newList)
  }

  const deleteTodo = deletedTodoIndex => {
    const newList = todos.filter((todo, todoIndex) => todoIndex !== deletedTodoIndex)
    setTodos(newList)
    persistData(newList)
  }

  const toggleComplete = completedTodoIndex => {
    const newList = todos.map((todo, todoIndex) => {
      if (todoIndex === completedTodoIndex) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    setTodos(newList)
    persistData(newList)
  }

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md min-w-8 flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt='' />
        <h1 className='text-3xl font-semibold'>Список задач</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          type='text'
          placeholder='Добавь задачу'
        />
        <button
          onClick={() => addTodo(inputValue)}
          className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'
        >
          Добавить
        </button>
      </div>

      <ul>
        {todos.map((todo, todoIndex) => (
          <TodoItem
            key={todo.id}
            index={todoIndex}
            text={todo.text}
            completed={todo.completed}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  )
}

export default Todo
