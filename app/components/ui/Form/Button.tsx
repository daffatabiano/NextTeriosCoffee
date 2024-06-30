export default function Button({
    type,
    text,
    ...rest
}: {
    type: 'submit' | 'button' | 'reset';
    text: string;
    [key: string]: any;
}) {
    return (
        <button
            type={type}
            className="w-full bg-slate-500 text-white rounded-full m-0 text-lg px-5 py-2.5 me-2 mb-2"
            {...rest}
        >
            {text}
        </button>
    );
}
