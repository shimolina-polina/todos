import { Box } from '@mui/material'
import './App.css'
import InputField from './components/InputField'
import TaskList from './components/TaskList'
import Title from './components/Title'
import type { ITodo } from './interfaces/ITodo'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', [])


  const addTodo = (inputValue: string) => {
    if (!inputValue.trim()) return
    const newTodo: ITodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    }
    setTodos([newTodo, ...todos])
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100vh' }}>
      <Title/>
      <InputField addTodo={addTodo}/>
      <TaskList todos={todos} setTodos={setTodos} />
      </Box>
  )
}

export default App
