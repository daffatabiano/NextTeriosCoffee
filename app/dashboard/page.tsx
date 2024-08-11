import React from 'react';
import Input from '../components/ui/Form/Input';
import {
    EditOutlined,
    FallOutlined,
    LineOutlined,
    RiseOutlined,
} from '@ant-design/icons';
import { Col, Row, Statistic, StatisticProps } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import CountUp from 'react-countup/build/CountUp';

const formatter: StatisticProps['formatter'] = (value: any) => (
    <CountUp
        start={0}
        end={value}
        duration={2.75}
        separator=" "
        decimals={0}
        decimal=","
        prefix=""
        suffix=" +"
        delay={0}
    />
);

export default function Page() {
    const { md } = useBreakpoint();
    return (
        <>
            <h1 className="md:text-3xl text-2xl font-bold uppercase">
                profile
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <div className="w-full md:w-[25%] my-4 flex justify-center items-center rounded-full ">
                    <img
                        className="w-[200px] h-[200px] p-2 object-cover object-center rounded-full bg-slate-200"
                        src=""
                        alt=""
                    />
                </div>
                <div className="flex flex-col w-full md:w-[50%] gap-4">
                    <Input
                        placeholder="john doe"
                        type="text"
                        name="username"
                        disabled
                        style={{ cursor: 'not-allowed' }}
                    />
                    <Input
                        placeholder="••••••••"
                        type="password"
                        name="password"
                        disabled
                        style={{ cursor: 'not-allowed' }}
                    />
                    <Input
                        placeholder="email@mail.com"
                        type="email"
                        name="email"
                        disabled
                        style={{ cursor: 'not-allowed' }}
                    />
                    <div
                        className="flex justify-end"
                        style={{ cursor: 'pointer' }}
                    >
                        <EditOutlined />
                    </div>
                </div>
                <Row
                    gutter={!md ? 16 : 32}
                    style={{
                        display: 'flex',
                        flexDirection: !md ? 'row' : 'column',
                        justifyContent: !md ? 'space-between' : 'flex-start',
                        alignItems: md ? 'center' : 'flex-start',
                        width: md ? '25%' : '100%',
                        textAlign: 'center',
                    }}
                >
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
        </>
    );
}
