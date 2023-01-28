import React from "react";
import { Button, Form, Input } from "antd";
import api from "../Api/api";

const EditUserForm = ({onOk, setUserInfo, setInfoCard, ...props}) => {
  const [form] = Form.useForm();

  console.log(setInfoCard);

  const onFinish = (values) => {
    api.editUserNameAbout(values)
    .then( console.log("Success:", values) )
    // .then(setUserInfo({name: values.name, about: values.about}))
    .then(setInfoCard('view'));
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
<>
<h3>{props.titleHead}</h3>
<Form name='editNameAva' form={form} onFinish={onFinish}>
<Form.Item 
        shouldUpdate 
        label="Имя" 
        name="name" 
        initialValue={props?.name}>
    <Input placeholder={props?.name} />
    </Form.Item>
    <Form.Item 
        shouldUpdate 
        label="Обо мне" 
        name="about" 
        initialValue={props?.about}>
    <Input placeholder={props?.about} />
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
          <span style={{cursor: 'pointer'}} onClick={() => setInfoCard('view')}>назад</span>
</Form>
</>

  );
};

export default EditUserForm;
