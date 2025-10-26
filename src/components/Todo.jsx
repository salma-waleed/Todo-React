import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Grid from "@mui/material/Grid";

import { TodosContext } from "./contexts/TodosCntext";
import { useContext, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todoItem }) {
  const { todo, setTodo } = useContext(TodosContext);
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showEditDialog, setEditDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    description: "",
  });

  // done functionality
  function handleCheckClick() {
    const updated = todo.map((t) =>
      t.id === todoItem.id ? { ...t, done: !t.done } : t
    );
    setTodo(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  }
  // done functionality

  // delete functionality
  function handleDeleteCLicked() {
    setshowDeleteDialog(true);
  }
  function handleDeleteClose() {
    setshowDeleteDialog(false);
  }
  function handleDeleteConfirm() {
    const updatedList = todo.filter((t) => t.id !== todoItem.id);
    setTodo(updatedList);
    localStorage.setItem("todos", JSON.stringify(updatedList));
  }
  // delete functionality

  // edit functionality
  function handleEditClicked() {
    setUpdatedTodo({
      title: todoItem.title,
      description: todoItem.description,
    });
    setEditDialog(true);
  }
  function handleEditClose() {
    setEditDialog(false);
  }
  function handleConfirmEdit() {
    const updatedList = todo.map((t) =>
      t.id === todoItem.id
        ? {
            ...t,
            title: updatedTodo.title,
            description: updatedTodo.description,
          }
        : t
    );

    setTodo(updatedList);
    localStorage.setItem("todos", JSON.stringify(updatedList));
    setEditDialog(false);
  }
  // edit functionality

  return (
    <>
      {/* delete Dialog  */}
      <Dialog
        // fullScreen={fullScreen}
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure, delete task ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{todoItem.title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteClose}>
            Discard
          </Button>
          <Button
            autoFocus
            style={{ backgroundColor: "#883434ff", color: "white" }}
            onClick={handleDeleteConfirm}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete Dialog  */}

      {/* edit dialog */}
      <Dialog open={showEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form
            // onSubmit={handleSubmit}
            id="subscription-form"
          >
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) => {
                setUpdatedTodo({ ...updatedTodo, title: e.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="description"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.description}
              onChange={(e) => {
                setUpdatedTodo({ ...updatedTodo, description: e.target.value });
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            form="subscription-form"
            style={{ backgroundColor: "#1769aa", color: "white" }}
            onClick={handleConfirmEdit}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit dialog */}

      <Card
        style={{
          backgroundColor: "#20286196",
          color: "white",
          marginBottom: "10px",
          marginTop: "10px",
        }}
        className="todo"
      >
        <CardActionArea>
          <CardContent sx={{ height: "100%" }}>
            <Grid container spacing={2}>
              <Grid size={8} style={{ padding: "5px" }}>
                <Typography
                  style={{
                    textAlign: "left",
                    textDecoration: todoItem.done ? "line-through" : "none",
                  }}
                  variant="h5"
                  component="div"
                >
                  {todoItem.title}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#ffffff93", textAlign: "left" }}
                >
                  {todoItem.description}
                </Typography>
              </Grid>

              {/* control buttons */}
              <Grid
                size={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <IconButton
                  className="iconButton"
                  style={{
                    backgroundColor: "white",
                    color: "#8b290bff",
                    border: "2px solid #8b290bff",
                    borderRadius: "50%",
                  }}
                  onClick={handleDeleteCLicked}
                >
                  <DeleteOutlinedIcon />
                </IconButton>

                <IconButton
                  className="iconButton"
                  style={{
                    backgroundColor: "white",
                    color: "#1769aa",
                    border: "2px solid #1769aa",
                    borderRadius: "50%",
                  }}
                  onClick={handleEditClicked}
                >
                  <EditOutlinedIcon />
                </IconButton>

                <IconButton
                  className="iconButton"
                  style={{
                    backgroundColor: todoItem.done ? "#8bc34a" : "white",
                    color: todoItem.done ? "white" : "#8bc34a",
                    border: "2px solid #8bc34a",
                    borderRadius: "50%",
                  }}
                  onClick={handleCheckClick}
                >
                  <CheckIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
