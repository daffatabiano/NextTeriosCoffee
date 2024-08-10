'use client';

import { FormSignIn } from '../page';

export default function page() {
    return (
        <div className="h-screen w-full bg-[#ebeff6] flex flex-col">
            <div className="h-[30%] w-full  flex justify-center items-center pt-4">
                <img
                    src="/img/admin-login.png"
                    alt=""
                    className="w-[45%] sm:w-[30%] md:w-[20%] h-full object-cover object-center"
                />
            </div>
            <div className="h-[70%] w-full  flex px-8 py-2 items-center">
                <FormSignIn
                    type="submit"
                    onSubmit={() => {}}
                    path="/login"
                    role="user"
                    title="as Admin"
                    desc="Please input your credentials with admin role"
                />
            </div>
        </div>
    );
}
