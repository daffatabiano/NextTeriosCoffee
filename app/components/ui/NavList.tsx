import style from './NavList.module.css';

type NavListProps = {
    items: { name: string; path: string }[];
};
export default function NavList({ items }: NavListProps) {
    return (
        <>
            {items.map((item, index) => (
                <li key={index}>
                    <a href={item.path} className={style.line}>
                        {item.name}
                    </a>
                </li>
            ))}
        </>
    );
}
