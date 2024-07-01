import Button from '@/app/components/ui/Form/Button';
import Form from '@/app/components/ui/Form/Form';
import Input from '@/app/components/ui/Form/Input';
import Link from 'next/link';

export default function page() {
    return (
        <div className="h-screen w-full bg-[#ebeff6] flex flex-col">
            <div className="h-[30%] w-full  flex justify-center items-center pt-4">
                <img
                    src="/img/admin-login.png"
                    alt=""
                    className="w-[50%] h-full object-cover object-center"
                />
            </div>
            <div className="h-[70%] w-full flex px-8 py-2 items-center">
                <Form>
                    <div className="text-blue-950 mb-2">
                        <h1 className="text-3xl  font-extrabold">
                            Admin Sign In
                        </h1>
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
                            href="/login"
                            className="text-blue-950 no-underline"
                        >
                            Login as User
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}
