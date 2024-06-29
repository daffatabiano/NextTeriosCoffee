import { Modal, Select, Input } from 'antd';
export interface eventChange {
    target: {
        value: string;
    };
    preventDefault?: () => void;
}

interface ModalOrderProps {
    isOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    confirmLoading: boolean;
    onChangeSelect: (e: any) => void;
    onChangeNotes: (e: any) => void;
}

export default function ModalOrder({
    isOpen,
    handleOk,
    handleCancel,
    confirmLoading,
    onChangeSelect,
    onChangeNotes,
}: ModalOrderProps) {
    const { TextArea } = Input;

    return (
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
                        {'Coffee Cappucino'}
                    </h1>
                    <Select
                        aria-required
                        onChange={onChangeSelect}
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
                        onChange={onChangeNotes}
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
    );
}
