import Link from 'next/link';

export default function Logo() {
    return (
        <Link
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
        >
            <img
                src="logo.png"
                className="h-8 w-8 bg-cover border rounded-full"
                alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-700">
                Terios Coffee
            </span>
        </Link>
    );
}
