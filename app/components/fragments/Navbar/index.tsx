import Logo from '../../ui/Logo';
import NavList from '../../ui/NavList';
import { NavbarLists, NavbarSupportItems } from './partials/NavbarLists';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50">
            <nav className="bg-white border-gray-200 text-gray-900 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl md:px-10 px-2 py-4">
                    <Logo />
                    <div className="flex items-center space-x-2 md:space-x-6 rtl:space-x-reverse">
                        {NavbarSupportItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className="text-sm  text-gray-900 hover:text-gray-700"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
            <nav className="bg-[#f2f2f2]">
                <div className="max-w-screen-xl flex flex-wrap justify-center md:justify-start items-center md:px-10 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <NavList items={NavbarLists} />
                        </ul>
                    </div>
                </div>
            </nav>
        </nav>
    );
}
