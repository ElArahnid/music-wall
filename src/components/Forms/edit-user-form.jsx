import React from "react";
import { Button, Form, Input } from "antd";
import api from "../Api/api";

const EditUserForm = ({ setUserInfo, userInfo, setInfoCard, ...props }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const oneBlock = {name: values.name, about: values.about};
    const twoBlock = {avatar: values.avatar};
    api.editUserNameAbout(oneBlock)
      .then(api.editUserAvatar(twoBlock))
      .then( setUserInfo({
          ...userInfo,
          name: values.name,
          about: values.about,
          avatar: values.avatar,
        }))
      .then(localStorage.setItem('avatar', values.avatar))
      .then(console.log("Success:", values))
      .then(setInfoCard("view"));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(props, userInfo);
  return (
    <>
      <h3>{props.titleHead}</h3>
      <Form name="editName" form={form} onFinish={onFinish}>
        <Form.Item
          shouldUpdate
          label="Аватар"
          name="avatar"
          rules={[
            {
              min: 7,
              message: "Минимум 7 символjd",
            },
          ]}
          initialValue={userInfo?.avatar}
        >
          <Input placeholder={userInfo?.avatar} />
        </Form.Item>
        <Form.Item
          shouldUpdate
          label="Имя"
          name="name"
          rules={[
            {
              min: 2,
              message: "Минимум 2 символа",
            },
          ]}
          initialValue={userInfo?.name}
        >
          <Input placeholder={userInfo?.name} />
        </Form.Item>
        <Form.Item
          shouldUpdate
          label="Обо мне"
          required="2"
          name="about"
          rules={[
            {
              min: 2,
              message: "Минимум 2 символа",
            },
          ]}
          initialValue={userInfo?.about}
        >
          <Input placeholder={userInfo?.about} />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit">
              изменить
            </Button>
          )}
        </Form.Item>
        <span style={{ cursor: "pointer" }} onClick={() => setInfoCard("view")}>
          назад
        </span>
      </Form>
    </>
  );
};

export default EditUserForm;
