import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { TodoPorps } from "../Types/types";
import { useContext } from "react";
import { TodosContext } from "../Contexts/TodosContexts";




export default function Todo(todo: TodoPorps) {
  const value = useContext(TodosContext);



  // State for controlling the delete dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog,setShowUpdateDialog] =  useState(false);

  const [todoContent,setTodoContent]=useState({
    title:todo.title,
    details:todo.deteles

  })

  // Toggle complete status
  function handleCheckedClick(id: string) {
    const newTodo = value.todos.map((t) => {
      if (t.id === id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    value.setTodos(newTodo);
       localStorage.setItem("todos", JSON.stringify(newTodo));

  }

  function handleUpdateClick()
  {
    const newTodo = value.todos.map((t) => {

      if(t.id === todo.id)
      {
        return {...t,title:todoContent.title,details:todoContent.details}

      }
      else
      {
        return t;
      }


    })

    value.setTodos(newTodo)


   localStorage.setItem("todos" ,JSON.stringify(newTodo))

    setShowUpdateDialog(false);

  }

  // Handle Delete Action
  function handleDeleteClick() {
    const newTodos = value.todos.filter((t) => t.id !== todo.id);
    value.setTodos(newTodos);
    setShowDeleteDialog(false); // Close the dialog after deletion
       localStorage.setItem("todos", JSON.stringify(newTodos));

  }


return (
  <>
<Card
sx={{
minWidth: 275,
direction: "rtl",
backgroundColor: "#021998",
color: "white",
transition: ".2s",
margin: "15px 10px",
}}
>
<CardContent>
<Grid
container
className="hoverCard"
sx={{ transition: ".2s" }}
spacing={2}
>
<Grid sx={{ textAlign: "right" }} size={8}>
<Typography
  variant="h3"
  sx={{
    fontWeight: "bold",
    fontSize: "25px",
    marginBottom: "5px",
    textDecoration: todo.isCompleted ?  "line-through" : "none"  ,
  }}
>
  {todo.title}
</Typography>
<Typography>{todo.deteles}</Typography>
</Grid>

<Grid size={4}>
{/* Check Button */}
<IconButton
  onClick={() => handleCheckedClick(todo.id)}
  aria-label="Checked"
>
  <CheckIcon
    sx={{
      color: todo.isCompleted ? "white" : "#70fb70",
      backgroundColor: todo.isCompleted ? "#70fb70" : "white",
      padding: "1px",
      borderRadius: "50%",
      border: "1px solid #70fb70",
      transition: "all 0.3s ease",
      "&:hover": {
        color: todo.isCompleted ? "#70fb70" : "white",
        backgroundColor: todo.isCompleted ? "white" : "#70fb70",
      },
    }}
  />
</IconButton>

{/* Edit Button */}
<IconButton
  onClick={() => {
    setShowUpdateDialog(true);
  }}
  aria-label="Edit"
>
  <EditIcon
    sx={{
      color: "white",
      borderRadius: "50%",
      border: "1px solid white",
      padding: "1px",

      transition: "all 0.3s ease",
      "&:hover": {
        color: "#70fb70",
        backgroundColor: "white",
      },
    }}
  />
</IconButton>

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
    <Button
      onClick={() => setShowUpdateDialog(false)}
      color="primary"
    >
      Cancel
    </Button>
    <Button onClick={handleUpdateClick} color="error">
      Update
    </Button>
  </DialogActions>
</Dialog>
{/* Update Confirmation Dialog */}

{/* =============================================== */}

{/* Delete Button */}
<IconButton
  onClick={() => setShowDeleteDialog(true)} // Open the delete dialog
  aria-label="Delete"
>
  <DeleteIcon
    sx={{
      color: "#d14848",
      borderRadius: "50%",
      border: "1px solid #d14848",
      transition: "all 0.3s ease",
      padding: "1px",
      "&:hover": {
        color: "white",
        backgroundColor: "#d14848",
      },
    }}
  />
</IconButton>
</Grid>
</Grid>
</CardContent>
</Card>

    {/* Delete Confirmation Dialog */}
    <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>Are you sure you want to delete this task?</DialogContent>
      <DialogActions>
        <Button onClick={() => setShowDeleteDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteClick} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    {/* Delete Confirmation Dialog */}
  </>
);
}
