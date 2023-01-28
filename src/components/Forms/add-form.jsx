import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { Option } from "antd/es/mentions";
import { useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import { PostsContext } from "../../context/PostsContext";

const AddForm = ({ onOk }) => {
    const [form] = Form.useForm(); 
    const {posts} = useContext(PostsContext);

    console.log(posts);

  const onFinish = useCallback((values) => {
    values.tags = values?.tags?.split(',').map(res => res.trim());
    api.addPost(values)
    .then(onOk())
    .then(console.log("Success:", values))
  }, [onOk]);

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
        label="Теги"
        name='tags'
        rules={[
          {
            required: false,
            message: "Пожалуйста, введите теги через запятую",
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
