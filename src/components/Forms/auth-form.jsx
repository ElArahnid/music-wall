import React, { useContext, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { UserContext } from "../../context/UserContext";

export const AuthForm = () => {
  const [form] = Form.useForm();
  const [forceUpdate, setForceUpdate] = useState({});

const  { AccessAllowed } = useContext(UserContext)

  // To disable submit button at the beginning.
  useEffect(() => {
    setForceUpdate({});
  }, []);

  const onFinish = (values) => {
    AccessAllowed(values.email, values.password)
  };
  
  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
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
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            войти
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
