import './App.css'
import { Layout, Menu } from 'antd';
import InvestorsList from './components/Investors/InvestorsList';
const { Header, Content } = Layout;


function App() {

  
  return (
    <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[
            {
              key:1,
              label: 'nav 1',
            }
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '20px 20px' }}>
        <InvestorsList />
      </Content>
    </Layout>
  )
}

export default App
