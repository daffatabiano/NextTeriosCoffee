export default function Input({
    type,
    name,
    placeholder,
    req,
    ...rest
}: {
    type: 'text' | 'email' | 'password';
    name: string;
    placeholder: string;
    [key: string]: any;
    req?: boolean;
}) {
    return (
        <input
            className="w-full bg-[#fffff] border-none focus:outline-none text-lg text-slate-700 rounded-full px-3 py-1"
            {...rest}
            type={type}
            name={name}
            placeholder={placeholder}
            autoComplete="off"
            required={req}
        />
    );
}

const Label = ({ label, ...rest }: { label: string; [key: string]: any }) => {
    return (
        <label className="text-xl text-slate-700 " {...rest}>
            {label}
        </label>
    );
};

Input.Label = Label;
