import React from "react";
import { Button, Card, Layout } from "antd";
import { useDispatch } from "react-redux";
import { toggleModal } from "./features/todo/todoSlice";
import TodoModal from "./components/TodoModal";
import Todo from "./features/todo/Todo";
const App = () => {
  // Assign useDispatch hook to dispatch variable
  const dispatch = useDispatch();
   // Define function to handle opening/closing TodoModal
  const handleToggleModal = () => {
    dispatch(toggleModal());
  };
  return (
    <Layout style={{ padding: "1rem", minHeight: "100vh" }}>
      <Card
        title="My Todo List"
        extra={
          <Button onClick={handleToggleModal} type="primary" danger>
            Add a new Todo
          </Button>
        }
      >
        <Todo />
      </Card>
      <TodoModal />
    </Layout>
  );
};
export default App;
