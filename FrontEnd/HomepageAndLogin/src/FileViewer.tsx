import {Breadcrumb, Layout, Menu} from 'antd';
import {DesktopOutlined, FileOutlined, UserOutlined,} from '@ant-design/icons';
import React from "react";
//import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;

class FileViewer extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: any) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        const {collapsed} = this.state;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<FileOutlined/>}>
                            New Submission
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>
                            Past Submissions
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="Account">
                            <Menu.Item key="3">Info</Menu.Item>
                            <Menu.Item key="4">Settings</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Minecraft Steve</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                           Trying to view files.
                        </div>
                        

                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default FileViewer;