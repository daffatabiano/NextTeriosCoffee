'use client';

export default function Card(props: any) {
    const { onClick } = props;
    return (
        <div className="flex justify-between h-[100px] border-[1.5px] shadow-[0_0_4px_2px] shadow-slate-200 border-yellow-500 rounded-xl overflow-hidden">
            <div className="w-[30%] h-full">
                <img
                    className="bg-cover bg-center bg-no-repeat h-full w-full m-0"
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg"
                    alt="coffee cup"
                />
            </div>
            <div className="w-[50%] px-4 py-1 flex flex-col justify-between">
                <h1 className="sm:text-xl text-md font-bold text-yellow-500">
                    Coffee Capuccino
                </h1>
                <p className="text-sm">${'10.00'}</p>
            </div>
            <button
                onClick={onClick}
                className="w-[20%] h-full bg-yellow-500 text-white rounded-lg m-0"
            >
                Buy
            </button>
        </div>
    );
}
