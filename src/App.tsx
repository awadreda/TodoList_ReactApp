import { useState } from 'react';
import './App.css'
import TodoList from './Components/TodoList'
import { v4 as uuidv4 } from "uuid";


// Extend the default theme

// import { orange } from '@mui/material/colors';

import { createTheme, ThemeProvider} from "@mui/material";

import { TodosContext } from './Contexts/TodosContexts';
import { todoObj } from './Types/types';
// import MySnackBar from "./Components/MySnackBar";
import { ToastProvider } from './Contexts/ToastContext';
// import { DeleteContext } from './Contexts/DeleteContext';
// import { FastForward } from '@mui/icons-material';
// import { Typography } from "@mui/material";

// Create a custom theme with a global font family
const theme = createTheme({
  typography: {
    fontFamily: "Alexandria, sans-serif",
  },
});






const todosValueList: todoObj[] = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "lool",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "مذاكرة",
    details: "lool",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "حل الواجب",
    details: "lool",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "بس كفاية كدا انهاردة",
    details: "lool",
    isCompleted: false,
  },
];



function App() {

  

    const [todos,setTodos]=useState(todosValueList)


  
  return (
    <>
      <ThemeProvider theme={theme}>
            <ToastProvider>
        <div style={{ width: "100vw" }}>
          <TodosContext.Provider value={{ todos, setTodos }}>
          

            <TodoList />
          
          
          </TodosContext.Provider>
        </div>
            </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App
;

