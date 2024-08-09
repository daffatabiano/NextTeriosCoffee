import { FormEventHandler } from 'react';

export default function Form({
    children,
    onSubmit,
    ...rest
}: {
    children: React.ReactNode;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    [key: string]: any;
}) {
    return (
        <form
            className="w-full flex flex-col gap-6"
            {...rest}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
}
