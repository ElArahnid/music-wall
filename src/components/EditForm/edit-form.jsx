import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { Option } from "antd/es/mentions";

const EditForm = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    api.getPost(id).then((showPost) => {
      setPost(showPost);
    });
  }, []);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(post);
  const { author, image, isPublished, text, title, _id } = post;
  return (
    <Form name="editpost">
      <Form.Item label="ID автора" name="author_id">
        <Input placeholder={_id} />
      </Form.Item>
      <Form.Item label="Имя автора" name="authorname">
        <Input />
      </Form.Item>
      <Form.Item label="Об авторе" name="authorabout">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Аватар автора" name="authoravatar">
        <Input />
      </Form.Item>
      <Form.Item label="Заголовок поста" name="titlepost">
        <Input />
      </Form.Item>
      <Form.Item label="Картинка поста" name="imagepost">
        <Input />
      </Form.Item>
      <Form.Item label="Текст поста" name="textpost">
        <Input.TextArea >55555555555555555</Input.TextArea>
      </Form.Item>
      <Form.Item label="Опубликовано?" name="isPublished">
        <Select>
            <Option value="true">Опубликовано</Option>
            <Option value="false">Не опубликовано</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button>Сохранить</Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
