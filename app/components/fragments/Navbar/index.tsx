'use client';

import { useState } from 'react';
import Logo from '../../ui/Logo';
import NavList from '../../ui/NavList';
import { NavbarLists } from './partials/NavbarLists';
import { Button, Drawer, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <nav className="sticky top-0 z-50">
            <nav className="bg-transparent backdrop-blur-sm  border-gray-200 text-gray-900 px-4">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl md:px-10  py-4">
                    <Logo />
                    <div className="flex items-center md:space-x-6 rtl:space-x-reverse">
                        <Badge count={2}>
                            <Button
                                type="link"
                                style={{
                                    color: 'var(--text-color)',
                                    padding: '0',
                                    fontSize: '1.4rem',
                                    mixBlendMode: 'difference',
                                }}
                                onClick={showDrawer}
                            >
                                <ShoppingCartOutlined />
                            </Button>
                        </Badge>
                        <Drawer
                            title="Basic Drawer"
                            onClose={onClose}
                            open={open}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Drawer>
                    </div>
                </div>
            </nav>
            <nav className="bg-[rgba(225,225,225,0.5)] rounded-full">
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
