import React, { useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { UserContext } from "../../context/UserContext";

export const AuthForm = ({ onOk }) => {
  const [form] = Form.useForm();

const  { AccessAllowed, setAuthState } = useContext(UserContext)

  const onFinish = (values) => {
    AccessAllowed(values.email, values.password);
    setAuthState(true)
    console.log("Success:", values);
    onOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите свой email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="E-Mail"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите свой пароль!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Парооль"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
          >
            войти
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
