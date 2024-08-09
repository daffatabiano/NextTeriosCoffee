'use client';

import Link from 'next/link';
import Button from '../components/ui/Form/Button';
import Form from '../components/ui/Form/Form';
import Input from '../components/ui/Form/Input';
import type { TabsProps } from 'antd';
import { notification, Tabs } from 'antd';
import { redirect, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import authServices from '@/services/auth';
import { FormEvent, FormEventHandler, useState } from 'react';

export const FormSignIn = ({
    title = '',
    path,
    role,
    onSubmit,
    onClick,
    type,
    disabled,
}: {
    title?: string;
    path: string;
    role: string;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    onClick?: () => void;
    type: 'submit' | 'button' | 'reset';
    disabled?: boolean;
}): JSX.Element => {
    return (
        <Form onSubmit={onSubmit}>
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
                <Button
                    type={type}
                    text="Sign In"
                    onClick={onClick}
                    disabled={disabled}
                />
                <Link href={path} className="text-blue-950 no-underline">
                    Login as {role}
                </Link>
            </div>
        </Form>
    );
};

export const FormSignUp = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const form = e.target as HTMLFormElement;

            const body = {
                email: form.email.value,
                username: form.username.value,
                password: form.password.value,
                passwordRepeat: form.passwordRepeat.value,
            };

            if (body.password !== body.passwordRepeat) {
                api['error']({
                    message: 'Password does not match',
                    description:
                        'Please enter the same password in both fields',
                });
            }

            await authServices
                .register(body)
                .then((res: any) => {
                    if (!res?.error) {
                        api['success']({
                            message: 'Register is success',
                            description: 'Account is created',
                        });
                        setIsLoading(false);
                    } else {
                        api['error']({
                            message: 'Register fail',
                            description: 'Email already taken!',
                        });
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    api['error']({
                        message: 'Register Fail',
                        description: 'Something went wrong',
                    });
                    setIsLoading(false);
                });
        } catch (err) {
            console.log(err);
            setIsLoading(false);
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
                    <Button type="submit" text="Sign Up" disabled={isLoading} />
                </div>
            </Form>
        </>
    );
};

export default function Page() {
    const router = useRouter();
    const onChange = (key: string) => {
        console.log(key);
    };
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const form = e.target as HTMLFormElement;
            const body = {
                email: form.email.value,
                password: form.password.value,
            };
            const res = await signIn('credentials', {
                ...body,
                redirect: false,
                callbackUrl: '/dashboard',
            });
            if (res?.status === 200) {
                api['success']({
                    message: 'Login Success',
                    description: 'Welcome Back !',
                    duration: 1,
                });
                setIsLoading(false);
                router.push('/dashboard');
            } else if (res?.error) {
                api['error']({
                    message: 'Login Failed',
                    description: 'User Not Found',
                });
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (err: any) {
            console.log(err);
            api['error']({
                message: 'Login Failed',
                description: err?.response?.message?.data || 'User Not Found',
            });
            setIsLoading(false);
        }
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Sign In',
            children: (
                <FormSignIn
                    onSubmit={handleLogin}
                    type="submit"
                    title=""
                    path="/login/admin"
                    role="Admin"
                    disabled={isLoading}
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
        <>
            {contextHolder}
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
        </>
    );
}
