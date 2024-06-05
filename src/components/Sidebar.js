import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, HomeOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider collapsible breakpoint="lg" collapsedWidth="0">
    <div className="logo" />
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/employees">Funcionários</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        <Link to="/settings">Configurações</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<FileOutlined />}>
        <Link to="/reports">Relatórios</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
