import Link from 'next/link';
import style from './NavList.module.css';
import { useRouter } from 'next/router';

type NavListProps = {
    items: { name: string; path: string }[];
    session: any;
};
export default function NavList(prop: NavListProps) {
    const displayName = prop?.session?.user?.username.slice(0, 5);

    if (prop.session) {
        const updateItems = prop.items.map((item) => {
            if (item.name === 'Login' && prop.session.user) {
                return {
                    ...item,
                    name: displayName,
                    path: '/profile',
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
                                item.name === 'Login' ||
                                item.name === displayName
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
