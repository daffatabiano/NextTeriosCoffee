'use client';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { FormEventHandler } from 'react';
import Button from '../../ui/Form/Button';
import Form from '../../ui/Form/Form';
import Input from '../../ui/Form/Input';
import authServices from '@/services/auth';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';

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
}) => {
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

export const FormSignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();
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
                setIsLoading(false);
                api['error']({
                    message: 'Password does not match',
                    description:
                        'Please enter the same password in both fields',
                });
                return;
            } else if (body.username >= 8) {
                setIsLoading(false);
                api['error']({
                    message: 'Username is too long',
                    description: 'Username must be less than 8 characters',
                });
                return;
            }

            await authServices
                .register(body)
                .then((res: any) => {
                    if (!res?.status && !res.error) {
                        api['success']({
                            message: 'Register is success',
                            description: 'Account is created',
                        });
                        setTimeout(() => {
                            setIsLoading(false);
                            router.refresh();
                        }, 1000);
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
