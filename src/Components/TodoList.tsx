import {
  Container,
  Card,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "../App.css";
import Grid from "@mui/material/Grid2";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { TodosContext } from "../Contexts/TodosContexts";
import { todoObj, TodoPorps } from "../Types/types";
import { TosatContext } from "../Contexts/toastContext";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const value = useContext(TodosContext);

  const ToastValue = useContext(TosatContext);

  const [todosToSHwo, setTodosToShow] = useState("All");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [targedToDO, setTargetTOdo] = useState<TodoPorps>({
    id: "",
    deteles: "",
    handleDeleteClick: () => {},

    isCompleted: false,
    title: "",
    handleClickUpdateButton: () => {},
  });

  const [todoContent, setTodoContent] = useState({
    title: targedToDO.title,
    details: targedToDO.deteles,
  });

  function handleDeleteClick() {
    const newTodos = value.todos.filter((t) => t.id !== targedToDO.id);
    value.setTodos(newTodos);
    setShowDeleteDialog(false); // Close the dialog after deletion
    localStorage.setItem("todos", JSON.stringify(newTodos));
    ToastValue.showHideTost("تم الحذف بنجاح ")
  }

  function handleUpdateClick(todo: TodoPorps) {
    const newTodo = value.todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: todoContent.title, details: todoContent.details };
      } else {
        return t;
      }
    });

    value.setTodos(newTodo);

    localStorage.setItem("todos", JSON.stringify(newTodo));

    setShowUpdateDialog(false);
  }

  function handleClickUpdateButton(todo: TodoPorps) {
    setTargetTOdo(todo);
    setTodoContent({ title: todo.title, details: todo.deteles });
    setShowUpdateDialog(true);
  }

  function handleShowDelteDialogClick(todo: TodoPorps) {
    setTargetTOdo(todo);
    setShowDeleteDialog(true);
  }

  function handleChangeTodos(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const newTOdosToSHow = (e.target as HTMLButtonElement).value;

    setTodosToShow(newTOdosToSHow);
  }

  const compeletdTodos = useMemo(() => {
    return value.todos.filter((t) => {
      return t.isCompleted;
    });
  }, [value.todos]);

  const nonCompeletdTodos = useMemo(() => {
    return value.todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [value.todos]);

  let tsxTodo = value.todos;

  if (todosToSHwo === "Completed") {
    tsxTodo = compeletdTodos;
  } else if (todosToSHwo === "non-Completed") {
    tsxTodo = nonCompeletdTodos;
  }

  useEffect(() => {
    const storgeTodos = JSON.parse(
      localStorage.getItem("todos") || JSON.stringify(value.todos)
    );
    value.setTodos(storgeTodos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todosTSX = tsxTodo.map((t) => {
    return (
      <Todo
        key={t.id}
        isCompleted={t.isCompleted}
        title={t.title}
        deteles={t.details}
        id={t.id}
        handleDeleteClick={handleShowDelteDialogClick}
        handleClickUpdateButton={handleClickUpdateButton}
      />
    );
  });

  return (
    <>
      {/* Update Confirmation Dialog */}
      <Dialog
        open={showUpdateDialog}
        onClose={() => setShowUpdateDialog(false)}
      >
        <DialogTitle variant="h3">Uptate The Task</DialogTitle>
        <DialogContent>
          <div
            id="inputsContainer"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              id="EditTitle"
              type="text"
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "25px",
                fontWeight: "bold",
                outline: "none",
                border: "none",
                borderBottom: "2px solid  black",
                margin: "15px 15px",
              }}
              value={todoContent.title}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const newTitle = (e.target as HTMLInputElement).value;

                setTodoContent({ ...todoContent, title: newTitle });
              }}
            />

            <input
              id="EditDetails"
              type="text"
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "25px",
                fontWeight: "bold",
                outline: "none",
                border: "none",
                borderBottom: "2px solid  black",
                margin: "15px 15px",
              }}
              value={todoContent.details}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const newDetails = (e.target as HTMLInputElement).value;

                setTodoContent({ ...todoContent, details: newDetails });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdateClick(targedToDO);
              ToastValue.showHideTost("تم التعديل بنجاح ")
            }}
            color="success"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Confirmation Dialog */}

      {/* Delteing Dialoig */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delteing Dialoig */}

      <Container
        maxWidth="sm"
        sx={{
          fontFamily: "Alexandria, sans-serif",
          marginTop: "-50px",
          maxWidth: 400,
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
              variant="h3"
              sx={{
                position: "relative",
                zIndex: "9",
                fontWeight: "bolder",
                fontSize: "40px",
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

          <Grid
            container
            sx={{ margin: "10px 10px" }}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
          >
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
                  width: "90%",
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
                  padding: "15px 10px",
                  fontSize: "15px",
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
                  ToastValue.showHideTost("تم إضافة المهمة بنجاح");
                }}
                disabled={!(titleInput.length > 0)}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>

          {/* Add Todo */}
        </Card>
      </Container>
    </>
  );
}
