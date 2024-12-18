import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { todoObj } from "../Types/types";




type tTodosContexts = {
  todos: todoObj[];
  setTodos: React.Dispatch<React.SetStateAction<todoObj[]>>;
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



export  const TodosContext= createContext<tTodosContexts>({
  
  todos:todosValueList,
  setTodos:() => {}
});
