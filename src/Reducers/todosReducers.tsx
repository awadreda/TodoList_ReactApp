import { EMethodReducer, todoObj } from "../Types/types";
import { v4 as uuidv4 } from "uuid";

export default function reducerTodos(
  currentTodos: todoObj[],
  action: { type: EMethodReducer; payload: { todo: todoObj }  }) {
  //  console.log("call todo reducer",currentTodos,action);

  switch (action.type) {
    case EMethodReducer.Add: {
      const newTodos: todoObj = {
        id: uuidv4(),
        title: action.payload.todo.title,
        details: "",
        isCompleted: false,
      };
      const newTodoList = [...currentTodos, newTodos];

      localStorage.setItem("todos", JSON.stringify(newTodoList));
      return newTodoList;

      break;
    }

    case EMethodReducer.Update: {
      const newTodo = currentTodos.map((t) => {
        if (t.id === action.payload.todo.id) {
          return {
            ...t,
            title: action.payload.todo.title,
            details: action.payload.todo.details,
          };
        } else {
          return t;
        }
      });

      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    }

    case EMethodReducer.Delete: {
      const newTodos = currentTodos.filter(
        (t) => t.id !== action.payload.todo.id
      );

      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }

    case EMethodReducer.Check: {

       const newTodo = currentTodos.map((t) => {
         if (t.id === action.payload.todo.id) {
           t.isCompleted = !t.isCompleted;
         }
         return t;
       });

       // value.setTodos(newTodo);

       localStorage.setItem("todos", JSON.stringify(newTodo));
   return newTodo;
    }

    case EMethodReducer.Get: {

      
    const storgeTodos = JSON.parse(
      localStorage.getItem("todos") || JSON.stringify(currentTodos)
    );
    return storgeTodos ;

      
    }

    default: {
      throw Error("UnKown Type" + action.type);
    }
  }

  return [];
}
