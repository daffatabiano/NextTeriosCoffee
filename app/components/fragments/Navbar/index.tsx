'use client';

import { useState } from 'react';
import Logo from '../../ui/Logo';
import NavList from '../../ui/NavList';
import { NavbarLists } from './partials/NavbarLists';
import { Button, Drawer, Badge, Select, Input } from 'antd';
import { EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';

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
                            title="Terios Coffee Order"
                            onClose={onClose}
                            open={open}
                        >
                            <div className="flex">
                                <div className="w-[30%]">
                                    <img
                                        src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="w-[70%] px-4 flex flex-col gap-2">
                                    <h1>Coffee cappucino</h1>
                                    <Select
                                        style={{ width: '100%' }}
                                        defaultValue={'Hot'}
                                        disabled
                                    />
                                    <Input
                                        value={'tidak ada note..'}
                                        disabled
                                    />
                                    <div className="flex justify-between text-sm font-light px-2 text-gray-500">
                                        <em>1 x 25.000</em>
                                        <b>25.000</b>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            style={{
                                                width: '20%',
                                            }}
                                        >
                                            <EditOutlined />
                                        </Button>
                                    </div>
                                </div>
                            </div>
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
