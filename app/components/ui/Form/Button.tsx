export default function Button({
    type,
    text,
    variant = 'primary',
    ...rest
}: {
    type: 'submit' | 'button' | 'reset';
    text: string;
    [key: string]: any;
    variant?: 'primary' | 'secondary';
}) {
    return (
        <button
            type={type}
            className={`w-full ${
                variant === 'primary' ? 'bg-slate-500' : 'bg-yellow-500'
            } text-white rounded-full m-0 text-lg px-5 py-2.5 me-2 mb-2`}
            {...rest}
        >
            {text}
        </button>
    );
}
