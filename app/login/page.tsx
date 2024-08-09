'use client';

import Link from 'next/link';
import Button from '../components/ui/Form/Button';
import Form from '../components/ui/Form/Form';
import Input from '../components/ui/Form/Input';
import type { TabsProps } from 'antd';
import { notification, Tabs } from 'antd';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import authServices from '@/services/auth';

export const FormSignIn = ({
    title = '',
    path,
    role,
    onClick,
}: {
    title?: string;
    path: string;
    role: string;
    onClick?: () => void;
}): JSX.Element => {
    return (
        <Form>
            <div className="text-blue-950 mb-2">
                <h1 className="text-3xl  font-extrabold">Sign In {title}</h1>
                <p className="text-md font-light py-2 px-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                <Input name="password" placeholder="••••••••" type="password" />
                <Link
                    href="/forget-password"
                    className="text-blue-950 underline ps-2 pt-1"
                >
                    Forget password?
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Button type="button" text="Sign In" onClick={onClick} />
                <Link href={path} className="text-blue-950 no-underline">
                    Login as {role}
                </Link>
            </div>
        </Form>
    );
};

export const FormSignUp = (): JSX.Element => {
    const [api, contextHolder] = notification.useNotification();
    const handleRegister = async (e: any) => {
        try {
            e.preventDefault();

            const body = {
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value,
                passwordRepeat: e.target.passwordRepeat.value,
            };
            if (body.password !== body.passwordRepeat) {
                api['error']({
                    message: 'Password does not match',
                    description:
                        'Please enter the same password in both fields',
                });
            }

            await authServices.register(body).then((res) => console.log(res));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {contextHolder}
            <Form onSubmit={handleRegister}>
                <div className="text-blue-950 mb-2">
                    <h1 className="text-3xl  font-extrabold">Sign Up</h1>
                    <p className="text-md font-light py-2 px-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div>
                    <Input.Label label="Email" />
                    <Input
                        name="email"
                        placeholder="example@mail.com"
                        type="email"
                        req
                    />
                </div>
                <div>
                    <Input.Label label="Username" />
                    <Input
                        name="username"
                        placeholder="John Doe"
                        type="text"
                        req
                    />
                </div>
                <div>
                    <Input.Label label="Password" />
                    <Input
                        name="password"
                        placeholder="••••••••"
                        type="password"
                        req
                    />
                </div>
                <div>
                    <Input.Label label="Password Repeat" />
                    <Input
                        name="passwordRepeat"
                        placeholder="••••••••"
                        type="password"
                        req
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Button type="submit" text="Sign Up" />
                </div>
            </Form>
        </>
    );
};

export default function page() {
    const onChange = (key: string) => {};
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Sign In',
            children: (
                <FormSignIn
                    title=""
                    path="/login/admin"
                    role="Admin"
                    onClick={() => signIn()}
                />
            ),
        },
        {
            key: '2',
            label: 'Sign Up',
            children: <FormSignUp />,
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
