'use client';

import { useState } from 'react';
import type { StatisticProps } from 'antd';
import { Layout, Menu, theme, Button, Row, Col, Statistic } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CoffeeOutlined,
    TeamOutlined,
    EditOutlined,
    RiseOutlined,
    FallOutlined,
    LineOutlined,
} from '@ant-design/icons';
import Input from '../components/ui/Form/Input';
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
);

export default function useDashboard() {
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
                    <h1 className="md:text-3xl text-2xl font-bold uppercase">
                        profile
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
                        <div className="w-full my-4 flex justify-center items-center rounded-full ">
                            <img
                                className="w-[200px] h-[200px] p-2 object-cover object-center rounded-full bg-slate-200"
                                src=""
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Input
                                placeholder="john doe"
                                type="text"
                                name="username"
                                disabled
                            />
                            <Input
                                placeholder="••••••••"
                                type="password"
                                name="password"
                                disabled
                            />
                            <Input
                                placeholder="email@mail.com"
                                type="email"
                                name="email"
                                disabled
                            />
                            <div className="flex justify-end">
                                <EditOutlined />
                            </div>
                        </div>
                        <Row gutter={16}>
                            <Col>
                                <Statistic
                                    title="MEMBER"
                                    formatter={formatter}
                                    value={104}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<RiseOutlined />}
                                />
                            </Col>
                            <Col>
                                {' '}
                                <Statistic
                                    title="PRODUCTS"
                                    formatter={formatter}
                                    value={21}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<FallOutlined />}
                                />
                            </Col>
                            <Col>
                                {' '}
                                <Statistic
                                    title="ORDERS"
                                    formatter={formatter}
                                    value={1987}
                                    valueStyle={{ color: '#ddddd' }}
                                    prefix={<LineOutlined />}
                                />
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
