'use client';

import Link from 'next/link';
import Button from '../components/ui/Form/Button';
import Form from '../components/ui/Form/Form';
import Input from '../components/ui/Form/Input';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';

export const Newtabs = () => {
    return (
        <div className="flex justify-between w-full">
            <h1>Sign In</h1>
            <h1>Sign Up</h1>
        </div>
    );
};
export default function page() {
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Sign In',
            children: (
                <Form>
                    <div className="text-blue-950 mb-2">
                        <h1 className="text-3xl  font-extrabold">Sign In</h1>
                        <p className="text-md font-light py-2 px-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </p>
                    </div>
                    <div>
                        <Input.Label label="Email" />
                        <Input
                            name="email"
                            placeholder="example@mail.com"
                            type="email"
                        />
                    </div>
                    <div>
                        <Input.Label label="Password" />
                        <Input
                            name="password"
                            placeholder="••••••••"
                            type="email"
                        />
                        <Link
                            href="/forget-password"
                            className="text-blue-950 underline ps-2 pt-1"
                        >
                            Forget password?
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Button type="button" text="Sign In" />
                        <Link
                            href="/login/admin"
                            className="text-blue-950 no-underline"
                        >
                            Login as Admin
                        </Link>
                    </div>
                </Form>
            ),
        },
        {
            key: '2',
            label: 'Sign Up',
            children: 'Content of Tab Pane 2',
        },
    ];
    return (
        <div className="h-screen w-full bg-[#ebeff6] flex flex-col">
            <div className="h-[30%] w-full  flex justify-center">
                <img
                    src="/img/login.png"
                    alt=""
                    className="w-[50%] h-full object-cover object-center"
                />
            </div>
            <div className="h-[70%] w-full flex px-8 py-2">
                <Tabs
                    style={{ width: '100%' }}
                    size="large"
                    centered
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                    indicator={{ size: 200, align: 'center' }}
                    tabBarGutter={225}
                />
            </div>
        </div>
    );
}
