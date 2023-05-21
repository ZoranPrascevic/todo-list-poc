import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal, editTodo, addTodo } from "../features/todo/todoSlice";

const TodoModal = () => {
  // Use the useSelector hook to get state from the store
  const modalOpen = useSelector((state) => state.todo.modalOpen);
  const editData = useSelector((state) =>
    state.todo.todos.find((a) => a.key === state.todo.editId)
  );
   // Use the useDispatch hook to dispatch actions to the store
  const dispatch = useDispatch();
   // Define a function to handle form submission
  const handleFinish = (value) => {
    // Check if editData exists, if it does then dispatch an editTodo action,
    // else dispatch an addTodo action
    if (editData) {
      dispatch(editTodo(value));
    } else {
      dispatch(addTodo(value));
    }
    // Dispatch a toggleModal action to close the modal
    dispatch(toggleModal());
  };

  return (
    <Modal
      // Set the title of the modal based on whether or not editData exists
      title={editData ? "Edit Todo" : "Add a new Todo"}
      // Set the visibility of the modal based on the modalOpen state
      visible={modalOpen}
      // Set the onCancel callback to dispatch a toggleModal action
      onCancel={() => dispatch(toggleModal())}
      // Hide the footer of the modal
      footer={null}
      // Destroy the component on close so state is reset on each open
      destroyOnClose
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        // Set the initial values of the form fields based on editData
        initialValues={editData || { title: "", description: "" }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Title is required." }]}
          label="Title"
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }} style={{ margin: 0 }}>
          <Button size="large" shape="round" type="primary" htmlType="submit">
            {editData ? "Save" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoModal;
