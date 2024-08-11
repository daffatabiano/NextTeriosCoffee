'use client';

import { useEffect, useState } from 'react';
import Logo from '../../ui/Logo';
import NavList from '../../ui/NavList';
import { NavbarLists } from './partials/NavbarLists';
import { Button, Drawer, Badge, Select, Input, Divider, Modal } from 'antd';
import {
    DollarOutlined,
    EditOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { useSession } from 'next-auth/react';

export default function Navbar() {
    const { data: session }: any = useSession();
    const { TextArea } = Input;
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModalEdit = () => {
        setIsOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setIsOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                title="Terios Coffee Order"
                open={isOpen}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <div className="flex gap-5 align-center">
                    <div className="w-[40%] h-full m-auto">
                        <img
                            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg"
                            alt=""
                            className="bg-cover bg-center bg-no-repeat h-full w-full m-0"
                        />
                    </div>
                    <div className="w-[60%] flex flex-col gap-1 px-2">
                        <h1 className="font-bold text-yellow-500">
                            Coffee Cappucino
                        </h1>
                        <Select
                            aria-required
                            defaultValue="-- Hot-or-Ice --"
                            style={{ width: '100%' }}
                            options={[
                                { value: 'Iced', label: 'Iced' },
                                { value: 'Hot', label: 'Hot' },
                            ]}
                        />
                        <label htmlFor="notes">Notes</label>
                        <TextArea
                            showCount
                            maxLength={50}
                            placeholder="(Notes...)"
                            style={{
                                height: '100%',
                                resize: 'none',
                                marginBottom: '8px',
                            }}
                        />
                    </div>
                </div>
            </Modal>
            <nav className="sticky top-0 z-50 md:px-32">
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
                                <div className="flex flex-col justify-between h-full">
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
                                                    onClick={showModalEdit}
                                                >
                                                    <EditOutlined />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-end align-bottom flex-col ">
                                        <div className="flex justify-between w-full my-[-25px]">
                                            <b>Total</b>
                                            <p>25.000</p>
                                        </div>
                                        <Divider />
                                        <Button
                                            style={{
                                                width: '25%',
                                            }}
                                        >
                                            <DollarOutlined /> Order
                                        </Button>
                                    </div>
                                </div>
                            </Drawer>
                        </div>
                    </div>
                </nav>
                <nav className="bg-[rgba(225,225,225,0.5)] rounded-full">
                    <div className="max-w-screen-xl flex flex-wrap justify-center md:justify-start items-center md:px-10 py-3 mx-auto">
                        <div className="flex items-center">
                            <ul className="flex flex-row font-medium mt-0 space-x-4 rtl:space-x-reverse text-sm">
                                <NavList
                                    items={NavbarLists}
                                    session={session}
                                />
                            </ul>
                        </div>
                    </div>
                </nav>
            </nav>
        </>
    );
}
