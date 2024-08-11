'use client';

import { useState } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CoffeeOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import React from 'react';

export default function useDashboard(prop: { children: React.ReactNode }) {
    const { children } = prop;
    const [collapsed, setCollapsed] = useState(false);
    const { Header, Sider, Content } = Layout;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: 'dashboard-profile',
                            icon: <UserOutlined />,
                            label: 'Profile',
                        },
                        {
                            key: 'dashboard/user',
                            icon: <TeamOutlined />,
                            label: 'User',
                        },
                        {
                            key: '3',
                            icon: <CoffeeOutlined />,
                            label: 'Products',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: '10px 14px',
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                    key={'dashboard-profile'}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
