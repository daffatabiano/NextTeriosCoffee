export default function Form({
    children,
    onSubmit,
    ...rest
}: {
    children: React.ReactNode;
    onSubmit?: () => void;
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
