import { Divider, Typography } from "@mui/material";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Task from "./Task";
import type { ITodo } from "../interfaces/ITodo";
import { useState } from "react";

const FilterButton = styled('button', {
    shouldForwardProp: (prop) => prop !== 'active',
    })<{ active: boolean }>(({ active, theme }) => ({
    minWidth: 'unset',
    border: '1px solid',
    borderColor: active ? theme.palette.grey[400] : 'transparent',
    borderRadius: '5px',
    color: theme.palette.grey[400],
    background: 'transparent',
    fontSize: '13px',
    height: '2em',
    padding: '2px 5px',
    textTransform: 'none',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily
}));

interface ITaskList {
  todos: ITodo[];
  setTodos: (value: ITodo[]) => void;
}

const TaskList = ({ todos, setTodos }: ITaskList) => {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const uncompletedCount = todos.filter(todo => !todo.completed).length;

    const clearCompleted = () => {
        const filtered = todos.filter(todo => !todo.completed);
        setTodos(filtered);
    }

    return (
        <>
            {filteredTodos.length === 0 ? (
            <Typography
                sx={{
                    fontSize: '16px',
                    color: 'grey.700',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    mt: 2
                }}
            >
                Start adding tasks by typing in the text field above
            </Typography>
        ) : (filteredTodos.map((todo, index) => (
                <div key={todo.id} style={{width: 'calc(100% - 20px)'}}>
                    <Task
                        todo={todo}
                        onToggle={() => toggleTodo(todo.id)}
                        onDelete={() => deleteTodo(todo.id)}
                    />
                    {index !== filteredTodos.length - 1 && (
                        <Divider sx={{ width: '100%' }} />
                    )}
                </div>
            )))}

            <Box sx={{ display: 'flex', position: 'absolute', bottom: '20px', justifyContent: 'space-between', width: 'calc(100% - 20px)', left: '10px', right: '10px' }}>
                <Typography sx={{fontSize: '13px', color: 'grey.400', display: 'flex', alignItems: 'center', padding: '2px 5px', border: '1px solid transparent',}}>{uncompletedCount} items left</Typography>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                    <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
                    <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
                    <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</FilterButton>
                </Box>
                <FilterButton active={false} onClick={clearCompleted}>Clear completed</FilterButton>

            </Box>

        </>
    );
};

export default TaskList;
