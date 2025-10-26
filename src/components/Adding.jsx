import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodosContext } from "./contexts/TodosCntext";
import { useContext } from "react";

export default function Adding() {
  const [titleInput, setTitleInput] = useState("");

  const { todo, setTodo } = useContext(TodosContext);

  function handleAddition() {
    if (titleInput.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        title: titleInput,
        description: "",
        done: false,
      };
      const updated = [...todo, newTodo];
      setTodo(updated);
      localStorage.setItem("todos", JSON.stringify(updated));
      setTitleInput("");
    }
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={8}>
          <TextField
            id="outlined-basic"
            label="New Task"
            variant="outlined"
            style={{ width: "100%", height: "100%" }}
            value={titleInput}
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
          />
        </Grid>

        <Grid
          size={4}
          style={{
            display: "flex",
            justifyContent: " center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "#464e83ff",
              width: "100%",
              height: "100%",
            }}
            onClick={handleAddition}
            disabled={titleInput.length == 0}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
