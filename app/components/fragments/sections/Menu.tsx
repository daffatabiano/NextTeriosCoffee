'use client';

import { Fragment, useEffect, useState } from 'react';
import { Col } from 'antd';
import Card from '@/app/components/ui/Card';
import { MenuData } from './partials/data/MenuData';
import ModalOrder, { eventChange } from '../ModalOrder';
import { fetcher } from '@/lib/axios/instance';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [notes, setNotes] = useState('');
    const [isVariant, setIsVariant] = useState('');
    const [isProducts, setIsProducts]: any = useState<any>([]);
    const showModal = () => {
        setOpen(true);
    };
    const onChangeSelect = (e: any) => {
        setIsVariant(e);
    };

    const onChangeNotes = (e: eventChange) => {
        setNotes(e?.target?.value);
    };

    const handleOk = () => {
        setNotes(notes);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const getProductsData = async () => {
        try {
            const response = await fetcher('/api/products');
            const data = response;
            setIsProducts(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    console.log(isProducts);
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
                    {isProducts?.map((item, index): any => (
                        <Card key={index + 1} {...item} onClick={showModal} />
                    ))}
                </div>
                <h2 className="text-xl font-bold mb-2"> 🧊 Ice Coffee </h2>
            </Col>
            <ModalOrder
                isOpen={open}
                handleOk={handleOk}
                handleCancel={handleCancel}
                confirmLoading={confirmLoading}
                onChangeSelect={onChangeSelect}
                onChangeNotes={onChangeNotes}
            />
            {/* <Modal
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
                            {'Coffee Cappucino'}
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
            </Modal> */}
        </Fragment>
    );
}
