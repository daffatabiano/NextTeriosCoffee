import Link from 'next/link';
import style from './NavList.module.css';

type NavListProps = {
    items: { name: string; path: string }[];
};
export default function NavList({ items }: NavListProps, prop: any) {
    console.log(prop, 'proppiee');
    return (
        <>
            {items.map((item, index) => (
                <li key={index}>
                    <Link
                        href={item.path}
                        className={
                            item.name === 'Login' ? style.login : style.line
                        }
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </>
    );
}
