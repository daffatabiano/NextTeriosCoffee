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
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const FormSignIn = ({
    title = '',
    path,
    role,
    onSubmit,
    onClick,
    type,
    isLoading,
    desc,
}: {
    title?: string;
    path: string;
    role: string;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    onClick?: () => void;
    type: 'submit' | 'button' | 'reset';
    isLoading?: boolean;
    desc?: string;
}): JSX.Element => {
    return (
        <Form onSubmit={onSubmit}>
            <div className="text-blue-950 mb-2 ">
                <h1 className="text-3xl  font-extrabold">Sign In {title}</h1>
                <p className="text-md font-light py-2 px-1">{desc}</p>
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
                    text={isLoading ? 'Loading..' : 'Sign in'}
                    onClick={onClick}
                    disabled={isLoading ? true : false}
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
    const route = useRouter();
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
                        route.push('/');
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
                    console.log(err);
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
                        Create your account and be part of us
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
                    <Button
                        type="submit"
                        text={isLoading ? 'Loading..' : 'Sign Up'}
                        disabled={isLoading}
                    />
                </div>
            </Form>
        </>
    );
};

export default function Page() {
    const { md, xs } = useBreakpoint();
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
                callbackUrl: '/',
            });
            if (res?.status === 200) {
                api['success']({
                    message: 'Login Success',
                    description: 'Welcome Back !',
                });
                setTimeout(() => {
                    setIsLoading(false);
                    router.push('/');
                }, 0);
            } else if (res?.error) {
                setIsLoading(false);
                api['error']({
                    message: 'Login Failed',
                    description: 'User Not Found',
                });
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
                    desc="Take a good time with a cup of coffee"
                    isLoading={isLoading}
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
            <div className=" w-full bg-[#ebeff6] flex flex-col">
                <div className="h-[30%] w-full flex justify-center">
                    <img
                        src="/img/login.png"
                        alt=""
                        className="w-[45%] sm:w-[30%] md:w-[20%] h-full object-cover object-center"
                    />
                </div>
                <div className="h-[70%] w-full flex px-6 py-2 md:px-36 lg:px-72 xl:px-96 xxl:px-128">
                    <Tabs
                        style={{ width: '100%' }}
                        size="large"
                        centered
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                        indicator={{ size: md ? 200 : 50, align: 'center' }}
                        tabBarGutter={xs ? 85 : 225}
                    />
                </div>
            </div>
        </>
    );
}
