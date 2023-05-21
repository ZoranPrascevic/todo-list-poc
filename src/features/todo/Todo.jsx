// Fixing performance issues in the code:
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleModal, toggleTodo } from "./todoSlice";
import {
  Button,
  Table,
  Tag,
  Space,
  Checkbox,
  Typography,
  Popconfirm,
} from "antd";
const { Text } = Typography;
 const Todo = () => {
  // Define dispatch for updating the store
  const dispatch = useDispatch();
   const todos = useSelector((state) => state.todo.todos);
   // Use useMemo to memoize the sorted Todos and avoid unnecessary re-renders
  const sortedTodos = useMemo(() => {
    // Filter todos by state
    const completedTodos = todos.filter((todo) => todo.state === true);
    const inProgressTodos = todos.filter((todo) => todo.state !== true);
    // Sort todos by created time
    completedTodos.sort((a, b) => b.createdTime - a.createdTime);
    inProgressTodos.sort((a, b) => b.createdTime - a.createdTime);
    // Return the sorted todos list
    return [...inProgressTodos, ...completedTodos];
  }, [todos]);
   // Define the columns for the todo table
  const columns = useMemo(
    () => [
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
        key: "title",
        ellipsis: true,
        render: (_, record) => (
          <Text strong disabled={record.state} delete={record.state}>
            {record.title}
          </Text>
        ),
      },
      {
        title: "Description",
        key: "description",
        ellipsis: true,
        render: (_, record) => (
          <Text disabled={record.state} delete={record.state}>
            {record.description}
          </Text>
        ),
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
            <Popconfirm
              title="Delete the Todo"
              description="Are you sure to delete this Todo?"
              onConfirm={() => dispatch(deleteTodo({ key: record.key }))}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [dispatch]
  );
   // Use the "key" prop as a unique identifier for each todo item
  const rowKey = (record) => record.key;
   // Render the todo table with the sorted todos list
  return (
    <Table
      columns={columns}
      dataSource={sortedTodos}
      pagination={false}
      rowKey={rowKey}
    />
  );
};
 export default Todo;