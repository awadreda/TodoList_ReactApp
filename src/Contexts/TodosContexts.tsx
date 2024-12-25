import { createContext, ReactNode, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { todoObj } from "../Types/types";
import reducerTodos from "../Reducers/todosReducers";
import React from "react";




type tTodosContexts = {
  todos: todoObj[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>; // Update the type of `dispatch` accordingly
};


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



// eslint-disable-next-line react-refresh/only-export-components
export  const TodosContext = createContext<tTodosContexts>({
  todos: todosValueList,
  dispatch: () => {} // Update the type of `dispatch` accordingly
});

type todoPrviderProps = {

  children:ReactNode
}


export  const TodosProvider = ({children}:todoPrviderProps) => {

    const [todos, dispatch] = useReducer(reducerTodos,[] as todoObj[]);



  return (

    <>
    <TodosContext.Provider value={{todos,dispatch}}>
    {children}
      </TodosContext.Provider> 
    
    
    </>
    
  )
  
}


// eslint-disable-next-line react-refresh/only-export-components
export const  useTodos = () => {


  return  useContext(TodosContext);
}





