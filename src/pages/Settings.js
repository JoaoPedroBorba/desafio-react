import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Header, Content } = Layout;

const Settings = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sidebar />
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <h1>Em breve</h1>
        </div>
      </Content>
    </Layout>
  </Layout>
);

export default Settings;
