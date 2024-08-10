'use client';

export interface CardProps {
    onClick: () => void;
    img: string;
    name: string;
    price: number;
    category?: string;
}

export default function Card(props: any) {
    const { onClick, img, name, price, category }: CardProps = props;
    return (
        <div className="flex hover:shadow-md hover:shadow-slate-400 hover:transform  hover:-translate-y-1 hover:scale-102 duration-300 md:flex-col md:h-full md:w-full justify-between h-[100px] border-[1.5px] shadow-[0_0_4px_2px] shadow-slate-200 border-yellow-500 rounded-xl overflow-hidden">
            <div className="w-[30%] h-full md:w-full md:h-[100px]">
                <img
                    className=" h-full w-full m-0 object-cover object-center "
                    src={img}
                    alt="coffee cup"
                />
            </div>
            <div className="w-[50%] px-4 py-1 md:w-full flex flex-col justify-between md:pb-4 md:px-2">
                <h1 className="sm:text-xl text-md  font-bold text-yellow-500">
                    {name}
                </h1>
                <p className="text-sm text-gray-700">
                    Rp.{' '}
                    {price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    <span className="text-gray-500 text-xs ml-1 font-light italic line-through">
                        {'50.000'}
                    </span>
                </p>
            </div>
            <button
                onClick={onClick}
                className="w-[20%] h-full bg-yellow-500 text-white rounded-lg m-0 md:w-full md:p-2"
            >
                Buy
            </button>
        </div>
    );
}
