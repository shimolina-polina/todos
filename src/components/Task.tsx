import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type { ITodo } from "../interfaces/ITodo";

interface ITaskProps {
  todo: ITodo;
  onToggle: () => void;
  onDelete: () => void;
}

const Task = ({ todo, onToggle, onDelete }: ITaskProps) => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Checkbox checked={todo.completed} onChange={onToggle} />
      <Typography
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'text.disabled' : 'text.primary',
          fontFamily: 'Roboto',
          fontSize: '1.2em',
          fontWeight: 300,
        }}
      >
        {todo.text}
      </Typography>
      <IconButton onClick={onDelete} aria-label="удалить">
        <CloseRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default Task;
