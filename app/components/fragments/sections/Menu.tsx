'use client';

import { Fragment, useState } from 'react';
import { Col, Modal, Select, Input } from 'antd';
import Card from '@/app/components/ui/Card';
import { MenuData } from './partials/data/MenuData';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const { TextArea } = Input;
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <Fragment key="menu">
            <Col
                span={24}
                style={{
                    backgroundColor: '#fff',
                    padding: '15px',
                    width: '100%',
                }}
            >
                <h1 className="sm:text-3xl text-2xl font-extrabold text-center mb-5 uppercase text-yellow-800">
                    menu
                </h1>
                <h2 className="text-xl font-bold mb-2"> ☕ Hot Coffee </h2>
                <div className="flex flex-col gap-4">
                    {MenuData.map((item, index) => (
                        <Card key={index} {...item} onClick={showModal} />
                    ))}
                </div>
                <h2 className="text-xl font-bold mb-2"> 🧊 Ice Coffee </h2>
            </Col>
            <Modal
                title="Terios Coffee Order"
                open={open}
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
        </Fragment>
    );
}
