import { FormSignIn } from '../page';

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
                <FormSignIn path="/login" role="user" title="as Admin" />
            </div>
        </div>
    );
}
