import {
  Container,
  Card,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import '../App.css'
import Grid from "@mui/material/Grid2";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import React, { useContext, useEffect, useState } from "react";
import { TodosContext } from "../Contexts/TodosContexts";
import { todoObj } from "../Types/types";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const value = useContext(TodosContext);

  const [todosToSHwo,setTodosToShow] = useState("All");


  function handleChangeTodos(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const newTOdosToSHow = (e.target as HTMLButtonElement).value;

    setTodosToShow(newTOdosToSHow);
  }


  const compeletdTodos = value.todos.filter((t) => t.isCompleted)


  const nonCompeletdTodos = value.todos.filter((t) => !t.isCompleted)


let tsxTodo = value.todos;

if(todosToSHwo==="Completed")
{
  tsxTodo=compeletdTodos
}else if (todosToSHwo === "non-Completed") {

  tsxTodo =nonCompeletdTodos;
  
}

  useEffect(() => {


  const  storgeTodos = JSON.parse(localStorage.getItem("todos")|| JSON.stringify(value.todos) );
  value.setTodos(storgeTodos);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  


  const todosTSX = tsxTodo.map((t) => {
    return (
      <Todo
        key={t.id}
        isCompleted={t.isCompleted}
        title={t.title}
        deteles={t.details}
        id={t.id}
      />
    );
  });

return (
  <Container
    maxWidth="sm"
    sx={{
      fontFamily: "Alexandria, sans-serif",

      maxWidth: 450,
      boxShadow:
        "0 4px 10px rgba(255, 255, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.8)",
      backgroundColor: "white", // Ensures the container is white to contrast with the shadow
      borderRadius: "10px", // Optional for rounded corners
      padding: "20px", // Adds spacing inside the container
    }}
  >
    <Card sx={{ minWidth: 275, direction: "rtl" }}>
      <CardContent>
        <Typography
          variant="h2"
          sx={{
            position: "relative",
            zIndex: "9",
            fontWeight: "bolder",
            fontSize: "60px",
            fontFamily: "Alexandria, sans-serif",
          }}
          component="div"
        >
          مهامي
        </Typography>
        <hr style={{ position: "relative", top: "-19px", zIndex: "1" }} />

        <ToggleButtonGroup
          color="primary"
          value={todosToSHwo}
          exclusive
          onChange={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            handleChangeTodos(e);
          }}
          sx={{ direction: "ltr", marginTop: "15px" }}
          aria-label="Platform"
        >
          <ToggleButton
            sx={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
            value="non-Completed"
          >
            غير منجز
          </ToggleButton>
          <ToggleButton
            sx={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
            value="Completed"
          >
            منجز
          </ToggleButton>
          <ToggleButton
            sx={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
            value="All"
          >
            الكل
          </ToggleButton>
        </ToggleButtonGroup>
      </CardContent>

      {/* All Todos */}
      <div
        className="TodosContainer"
        style={{
          display: "block",
          maxHeight: "450px",

          marginBottom: "20px",
          overflow: "auto",
        }}
      >
        {todosTSX}
      </div>
      {/* All Todos */}

      {/* Add Todo */}

      <Grid container sx={{ margin: "10px 10px"  }} display={"flex"} justifyContent={"space-between"} alignItems={"center"} spacing={2}>
        <Grid sx={{ textAlign: "right", backgroundColor: "" }} size={8}>
          <input
            value={titleInput}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const newValue = (e.target as HTMLInputElement).value;
              setTitleInput(newValue);
            }}
            type="text"
            placeholder="Add Task"
            style={{
              backgroundColor: "white",
              padding: "12px",
              width: "93%",
              outline: "none",
              color: "black",
              fontSize: "20px",
              direction: "ltr",
            }}
          />
        </Grid>

        <Grid display={"flex"} justifyContent={"left"} sx={{}} size={4}>
          <Button
            sx={{
              backgroundColor: "#021998",
              color: "white",
              padding: "10px 25px",
            }}
            size="large"
            onClick={() => {
              const newTodos: todoObj = {
                id: uuidv4(),
                title: titleInput,
                details: "",
                isCompleted: false,
              };
              const newTodoList = [...value.todos, newTodos];

              value.setTodos(newTodoList);
              localStorage.setItem("todos", JSON.stringify(newTodoList));
            }}
            disabled={!(titleInput.length>0)}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>

      {/* Add Todo */}
    </Card>
  </Container>
);
}
