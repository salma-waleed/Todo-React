import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import TodoList from "./components/TodoList";
import { TodosContext } from "./components/contexts/TodosCntext";
import { useState } from "react";

const intialTOdos = [];

function App() {
  const [todo, setTodo] = useState(intialTOdos);

  const themes = createTheme({
    typography: {
      fontFamily: "Roboto, Arial",
    },
    palette: {
      primary: {
        main: "#311b92",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={themes}>
        <TodosContext.Provider value={{ todo, setTodo }}>
          <TodoList />
        </TodosContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
