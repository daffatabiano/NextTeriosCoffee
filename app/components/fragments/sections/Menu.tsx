'use client';

import { Fragment, useState } from 'react';
import { Col, Modal } from 'antd';
import Card from '@/app/components/ui/Card';
import { CoffeeOutlined } from '@ant-design/icons';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
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
                <Card onClick={showModal} />
                <h2 className="text-xl font-bold mb-2"> 🧊 Ice Coffee </h2>
                <Card />
            </Col>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </Fragment>
    );
}
