// src/components/AddEmployee.js
import React from 'react';
import { Modal, Form, Input } from 'antd';

const AddEmployee = ({ visible, onCreate, onCancel, currentEmployee }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (currentEmployee) {
      form.setFieldsValue({
        name: currentEmployee.name,
        status: currentEmployee.status,
        role: currentEmployee.role,
        id: currentEmployee.id,
      });
    } else {
      form.resetFields();
    }
  }, [currentEmployee, form]);

  return (
    <Modal
      visible={visible}
      title={currentEmployee ? "Editar Funcionário" : "Adicionar Funcionário"}
      okText={currentEmployee ? "Atualizar" : "Adicionar"}
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={[{ required: true, message: 'Por favor insira o nome do funcionário!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Por favor insira o status do funcionário!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Cargo"
          rules={[{ required: true, message: 'Por favor insira o cargo do funcionário!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployee;
