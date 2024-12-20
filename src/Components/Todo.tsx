// import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  // Button,
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

  

  // Handle Delete Action
  

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
  todo.handleClickUpdateButton(todo) ;
 
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

{/* =============================================== */}

{/* Delete Button */}
<IconButton
  onClick={() => {
    todo.handleDeleteClick(todo)
  
  }} // Open the delete dialog
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
    {/* <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
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
    </Dialog> */}
    {/* Delete Confirmation Dialog */}
  </>
);
}
