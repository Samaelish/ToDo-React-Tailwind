import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItems = ({ text, deleteTodo, completed, toggleComplete, index }) => {
  return (
    <li className='flex items-center my-3 gap-2'>
      <div className='flex flex-1 items-center cursor-pointer'>
        <img className='w-7' src={completed ? tick : not_tick} alt='' onClick={() => toggleComplete(index)} />
        <p className='text-slate-700 ml-4 text-[17px]'>{text}</p>
      </div>
      <img onClick={() => deleteTodo(index)} className='w-3.5 cursor-pointer' src={delete_icon} alt='' />
    </li>
  )
}

export default TodoItems
