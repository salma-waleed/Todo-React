import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Adding from "./Adding";

import { TodosContext } from "./contexts/TodosCntext";
import { useContext, useEffect, useState } from "react";

export default function TodoList() {
  const { todo, setTodo } = useContext(TodosContext);
  const [displayMood, setDisplayMood] = useState("all");
  const todoList =
    displayMood === "all"
      ? todo.map((t) => <Todo todoItem={t} key={t.id} />)
      : displayMood === "completed"
      ? todo.map((t) => (t.done ? <Todo todoItem={t} key={t.id} /> : ""))
      : todo.map((t) => (!t.done ? <Todo todoItem={t} key={t.id} /> : ""));

  function handeMood(e) {
    setDisplayMood(e.target.value);
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodo(storedTodos);
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Card
        style={{
          padding: "20px",
          backgroundColor: "#909adfff",
          width: "60vw",
        }}
      >
        <CardContent>
          {/* head title */}
          <Typography variant="h5">My Tasks</Typography>
          <Divider variant="fullWidth" />

          {/* buttons */}
          <ToggleButtonGroup
            exclusive
            value={displayMood}
            onChange={handeMood}
            style={{
              marginTop: "20px",
              marginBottom: " 20px",
              backgroundColor: "white",
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="not-completed">Non Completed</ToggleButton>
          </ToggleButtonGroup>

          {/* todos */}
          {todoList}

          {/* Adding */}
          <Adding />
        </CardContent>
      </Card>
    </Container>
  );
}
