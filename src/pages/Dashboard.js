import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Card, List, Avatar, notification, Steps } from 'antd';
import { UserOutlined, HomeOutlined, SettingOutlined, FileOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, addEmployee, removeEmployee, updateEmployee } from '../redux/actions/employeeActions';
import AddEmployee from '../components/AddEmployee';
import { useNavigate } from 'react-router-dom'; // Certifique-se de importar useNavigate
import './Dashboard.css'; // Importar o arquivo CSS para estilos personalizados

const { Header, Content, Sider } = Layout;
const { Step } = Steps;

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showActive, setShowActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // Estado para controlar a etapa atual
  const { employees, loading, error } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utilize useNavigate

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const onCreate = (values) => {
    if (currentEmployee) {
      dispatch(updateEmployee(currentEmployee.id, values));
      notification.success({
        message: 'Funcionário Atualizado',
        description: `${values.name} foi atualizado com sucesso.`,
      });
      setCurrentEmployee(null);
    } else {
      dispatch(addEmployee(values));
      notification.success({
        message: 'Funcionário Adicionado',
        description: `${values.name} foi adicionado com sucesso.`,
      });
    }
    setVisible(false);
  };

  const onEdit = (employee) => {
    setCurrentEmployee(employee);
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
    setCurrentEmployee(null);
  };

  const filteredEmployees = showActive
    ? employees.filter(employee => employee.status === 'ativo')
    : employees;

  const handleNext = () => {
    setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={80} className="custom-sider">
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" className="custom-menu">
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate('/')}>
            
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate('/employees')}>
            
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
            
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />} onClick={() => navigate('/reports')}>
            
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="steps-container">
            <Card className="steps-card">
              <Steps current={currentStep} className="steps">
                <Step title="Item 1" />
                <Step title="Item 2" />
                <Step title="Item 3" />
                <Step title="Item 4" />
              </Steps>
            </Card>
          </div>
          <div className="content-container">
            {currentStep === 0 ? (
              <>
                <Card className="info-card">
                  <div className="info-section">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit suscipit porttitor. Suspendisse ex lorem, rhoncus nec ante eu, venenatis aliquam turpis. Nulla facilisi. Curabitur nec mattis dolor. Nulla finibus bibendum ligula tempus vehicula. Ut at tristique libero, nec efficitur dui. Aliquam erat volutpat. Fusce quam sem, tempus nec justo eget, luctus scelerisque velit. Nam sollicitudin purus urna, vitae ornare neque tincidunt vel. Proin ac lacinia erat, et commodo felis. Phasellus tempor tellus eu vulputate tempus.</p>
                    <div className="profile-pic"></div>
                  </div>
                </Card>
                <Card className="employee-card">
                  <div className="employee-section">
                    <Card title="Funcionário(s)">
                      <Button
                        type="primary"
                        onClick={() => {
                          setCurrentEmployee(null);
                          setVisible(true);
                        }}
                      >
                        + Adicionar Funcionário
                      </Button>
                      <Button onClick={() => setShowActive(!showActive)} style={{ margin: '0 8px' }}>
                        Ver apenas ativos
                      </Button>
                      <Button onClick={() => setShowActive(false)}>
                        Limpar filtros
                      </Button>
                      <div style={{ margin: '16px 0' }}>
                        {loading && <p>Carregando...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && (
                          <List
                            itemLayout="horizontal"
                            dataSource={filteredEmployees}
                            renderItem={(item) => (
                              <List.Item
                                actions={[
                                  <Button onClick={() => onEdit(item)}>Editar</Button>,
                                  <Button
                                    type="danger"
                                    onClick={() => dispatch(removeEmployee(item.id))}
                                  >
                                    Remover
                                  </Button>,
                                  <EllipsisOutlined />
                                ]}
                              >
                                <List.Item.Meta
                                  avatar={<Avatar icon="user" />}
                                  title={<a href="https://ant.design">{item.name}</a>}
                                  description={`CPF: ${item.cpf} - Status: ${item.status} - Cargo: ${item.role}`}
                                />
                              </List.Item>
                            )}
                          />
                        )}
                      </div>
                      <AddEmployee
                        visible={visible}
                        onCreate={onCreate}
                        onCancel={onCancel}
                        currentEmployee={currentEmployee}
                      />
                    </Card>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="coming-soon-card">
                <div className="coming-soon">
                  <h2>Em breve</h2>
                </div>
              </Card>
            )}
          </div>
          <div className="navigation-buttons">
            <Button onClick={handlePrevious} disabled={currentStep === 0}>
              Etapa Anterior
            </Button>
            <Button onClick={handleNext} disabled={currentStep === 3} style={{ marginLeft: '8px' }}>
              Próxima Etapa
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
