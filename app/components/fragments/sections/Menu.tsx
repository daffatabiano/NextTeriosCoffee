'use client';

import { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { Col, Skeleton } from 'antd';
import Card from '@/app/components/ui/Card';
import { MenuData } from './partials/data/MenuData';
import ModalOrder, { eventChange } from '../ModalOrder';
import { fetcher } from '@/lib/axios/instance';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [notes, setNotes] = useState('');
    const [isVariant, setIsVariant] = useState('');
    const [isProducts, setIsProducts]: any = useState<any>([]);
    const { status } = useSession();
    const { push } = useRouter();
    console.log(status);
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
    console.log(isProducts);

    useEffect(() => {
        getProductsData();
    }, []);

    return (
        <Fragment key="menu">
            <Col
                span={24}
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 15px 0px rgb(230, 230, 230)',
                    padding: '15px',
                    width: '100%',
                }}
            >
                <h1 className="sm:text-3xl text-2xl font-extrabold text-center mb-5 uppercase text-yellow-800">
                    menu
                </h1>
                <h2 className="text-xl font-bold mb-2"> ☕ Hot Coffee </h2>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-auto">
                    {status === 'loading' &&
                        Array.from({ length: 9 }).map((_, index) => (
                            <div className="flex flex-col gap-4" key={index}>
                                <Skeleton.Image
                                    active
                                    style={{ height: '100px', width: '220px' }}
                                    className=" md:h-full md:w-full justify-between h-[100px]"
                                />
                                <Skeleton
                                    active
                                    paragraph={{ rows: 3 }}
                                    className=" md:h-full md:w-full justify-between h-[100px]"
                                />
                            </div>
                        ))}
                    {isProducts?.map(
                        (item: PropsWithChildren, index: number) => (
                            <Card
                                key={index + 1}
                                {...item}
                                onClick={
                                    status === 'unauthenticated'
                                        ? () => push('/login')
                                        : showModal
                                }
                                buttonType={
                                    status === 'unauthenticated'
                                        ? 'button'
                                        : 'submit'
                                }
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
