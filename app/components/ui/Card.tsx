'use client';

export interface CardProps {
    onClick: () => void;
    img: string;
    name: string;
    price: number;
    category: string;
}

export default function Card(props: any) {
    const { onClick, img, name, price, category } = props;
    return (
        <div className="flex justify-between h-[100px] border-[1.5px] shadow-[0_0_4px_2px] shadow-slate-200 border-yellow-500 rounded-xl overflow-hidden">
            <div className="w-[30%] md:w-[20%] h-full">
                <img
                    className=" h-full w-full m-0 object-cover object-center "
                    src={img}
                    alt="coffee cup"
                />
            </div>
            <div className="w-[50%] px-4 py-1 flex flex-col justify-between">
                <h1 className="sm:text-xl text-md font-bold text-yellow-500">
                    {name}
                </h1>
                <p className="text-sm">
                    Rp
                    {price}
                </p>
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
