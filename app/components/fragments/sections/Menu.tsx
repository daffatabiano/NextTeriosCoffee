'use client';

import { Fragment, useEffect, useState } from 'react';
import { Col, Skeleton } from 'antd';
import Card from '@/app/components/ui/Card';
import { MenuData } from './partials/data/MenuData';
import ModalOrder, { eventChange } from '../ModalOrder';
import { fetcher } from '@/lib/axios/instance';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
        setIsLoading(true);
        try {
            const response = await fetcher('/api/products');
            const data = response;
            setIsProducts(data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
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
                    {isProducts?.map((item, index): any =>
                        isProducts.length <= 0 || isLoading ? (
                            <Skeleton key={index + 1} active />
                        ) : (
                            <Card
                                key={index + 1}
                                {...item}
                                onClick={showModal}
                            />
                        )
                    )}
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
        </Fragment>
    );
}
