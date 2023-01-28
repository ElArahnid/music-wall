import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import api from "../Api/api";
import { useCallback } from "react";
import { PostsContext } from "../../context/PostsContext";
import { useNavigate } from "react-router-dom";

const AddForm = ({ onOk }) => {
    const [form] = Form.useForm(); 
    const {posts, setPosts} = useContext(PostsContext);

    // console.log(posts);

  const onFinish = useCallback((values) => {
    values.tags = values.tags?.split(',').map(res => res.trim());
    api.addPost(values)
    .then(api.getAllPosts().then(res => setPosts(
      res.filter((value) => {
        return value.author._id === '636a510659b98b038f779cee'}
        ).sort((a, b) => Date.parse(b?.created_at) - Date.parse(a?.created_at)))))
    .then(console.log("Success:", values))
    .then(onOk())
  }, [onOk, setPosts]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form name="addpost" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        label="Картинка поста"
        name="image"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите адрес картинки",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Заголовок поста"
        name="title"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите заголовок поста",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Теги, через запятую (пробелы будут удалены)"
        name='tags'
        rules={[
          {
            required: false,
            message: "Пожалуйста, введите теги через запятую (тут добавить проверку)",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Текст поста"
        name="text"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите текст картинки",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
          >
            добавить
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddForm;
