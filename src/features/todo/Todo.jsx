import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleModal, toggleTodo } from "./todoSlice";
import { Button, Table, Tag, Space, Checkbox } from "antd";
const Todo = () => {
  // Define dispatch for updating the store
  const dispatch = useDispatch();
  // Get the current list of todos from the store and sort them by state
  const sortedTodos = useSelector((state) => {
    const todosCopy = [...state.todo.todos];
    // Filter todos by state
    const completedTodos = todosCopy.filter((todo) => todo.state === true);
    const inProgressTodos = todosCopy.filter((todo) => todo.state !== true);
    // Sort todos by created time
    completedTodos.sort((a, b) => b.createdTime - a.createdTime);
    inProgressTodos.sort((a, b) => b.createdTime - a.createdTime);
    // Return the sorted todos list
    return [...inProgressTodos, ...completedTodos];
  });
  // Define the columns for the todo table
  const columns = [
    {
      title: "Finish",
      key: "check",
      width: 100,
      // Render a checkbox for completing the todo
      render: (_, record) => (
        <Checkbox
          onChange={() => dispatch(toggleTodo({ key: record.key }))}
          checked={record.state}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "state",
      width: 150,
      key: "state",
      // Render a tag for the todo status
      render: (_, { state }) => (
        <Tag color={state ? "success" : "processing"}>
          {state ? "Completed" : "In Progress"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      // Render buttons for editing or deleting the todo
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => dispatch(toggleModal(record.key))}>
            Edit
          </Button>
          <Button onClick={() => dispatch(deleteTodo({ key: record.key }))}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  // Render the todo table with the sorted todos list
  return (
    <Table columns={columns} dataSource={sortedTodos} pagination={false} />
  );
};
export default Todo;
