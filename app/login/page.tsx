'use client';

import type { TabsProps } from 'antd';
import { notification, Tabs } from 'antd';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { FormSignIn, FormSignUp } from '../components/fragments/Forms';
// @ts-ignore

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
            children: <FormSignUp changeSection={() => onChange('1')} />,
        },
    ];
    return (
        <>
            {contextHolder}
            <div className=" w-full min-h-screen bg-[#ebeff6] flex flex-col">
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
