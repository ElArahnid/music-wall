import React, { useContext } from "react";
import { Button, Form, Input, Select } from "antd";
import api from "../Api/api";
import { PostsContext } from "../../context/PostsContext";
import { useCallback } from "react";

export const EditForm = ({onOk, ...props}) => {
  const [form] = Form.useForm();
  const {posts, setPosts} = useContext(PostsContext);
  

  const onFinish = useCallback((values) => {
    values.tags = values.tags.split(',').map(res => res.trim());
    api.editPost(props.id, values)
    .then( console.log("Success:", values) )
    .then( onOk() )
  }, [onOk, props.id]);
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form name="editpost" form={form} onFinish={onFinish} >
      <Form.Item shouldUpdate label="Картинка поста" name="image" initialValue={props?.image}>
        <Input placeholder={props?.image} />
      </Form.Item>
      <Form.Item shouldUpdate label="Заголовок поста" name="title" initialValue={props?.title}>
        <Input placeholder={props?.title} />
      </Form.Item>
      <Form.Item shouldUpdate label="Текст поста" name="text" initialValue={props?.text}>
        <Input.TextArea  placeholder={props?.text}></Input.TextArea>
      </Form.Item>
      <Form.Item shouldUpdate label="Опубликовано?" name="isPublished" initialValue={props?.isPublished}>
        <Select>
            <Select.Option value={true} selected>Опубликовано</Select.Option>
            <Select.Option value={false}>Не опубликовано</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate label='теги' name='tags' initialValue={props.tags.join(', ')}>
        <Input />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
          >
            изменить
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default EditForm;
