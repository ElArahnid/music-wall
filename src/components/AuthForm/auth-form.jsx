import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { SHA1, SHA256 } from "crypto-js";

export const AuthForm = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = (values) => {
    if ((values.email === "elogim@gmail.com") && (values.password === "000")) {
      console.log("OK:", values);
      console.log(SHA1(values.email)[0] === SHA1(values.email)[0]);
    //   localStorage.setItem("token_el.com", ("elogim@gmail.com 000").charCodeAt)
    } else {
      console.log("ERROR:", values.email + values.password);
      localStorage.removeItem("token_el.com")
      // alert('Неверный E-Mail!')
    }
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
