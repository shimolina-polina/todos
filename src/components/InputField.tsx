import { Box, TextField } from "@mui/material";
import { useState } from "react";

interface IInputField {
    addTodo: (value: string) => void;
}

const InputField = ({addTodo}: IInputField) => {
    const [inputValue, setInputValue] = useState<string>("");
    
    return (
        <Box
            sx={{
                paddingX: '10px',
                width: 'calc(100% - 20px)'
            }}>
            <TextField 
                label="What needs to be done?"  
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        addTodo(inputValue);
                        setInputValue('');
                    }
                }}
                fullWidth
                sx={{
                    fontFamily: 'Roboto',
                }}
                slotProps={{
                    input: {
                        sx: {
                        fontFamily: 'Roboto',
                        },
                    },
                }}
                                    />
        </Box>
    )
}

export default InputField;