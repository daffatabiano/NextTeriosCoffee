import Link from 'next/link';
import style from './NavList.module.css';

type NavListProps = {
    items: { name: string; path: string }[];
    session: any;
};
export default function NavList(prop: NavListProps) {
    console.log(prop.session, 'prop');

    if (prop.session) {
        const updateItems = prop.items.map((item) => {
            if (item.name === 'Login' && prop.session.user) {
                return {
                    ...item,
                    name: prop?.session?.user?.email,
                    path: '/login',
                };
            }
            return item;
        });
        return (
            <>
                {updateItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.path}
                            className={
                                item.name === prop.session.user?.email
                                    ? style.login
                                    : style.line
                            }
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </>
        );
    }

    return (
        <>
            {prop.items.map((item, index) => (
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
