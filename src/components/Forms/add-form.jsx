import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { Option } from "antd/es/mentions";

const AddForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.tags = values.tags.split(',').map(res => res.trim());
    api.addPost(values);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form name="addpost" form={form} onFinish={onFinish}>
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
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            добавить
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddForm;
