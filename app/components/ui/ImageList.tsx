import { useEffect, useState } from 'react';

export default function ImageList({
    images,
}: {
    images: { src: string; alt: string }[];
}) {
    const [isIndex, setIsIndex] = useState(0);
    const autoSlide = () => {
        if (isIndex < images.length - 1) {
            setIsIndex(isIndex + 1);
        } else {
            setIsIndex(0);
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            autoSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [isIndex]);
    let [onScroll, setOnScroll] = useState(false);
    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY <= 0) {
                setOnScroll(true);
            } else if (window.scrollY > 0) {
                setOnScroll(false);
            }
        };
    }, [onScroll]);
    return (
        <>
            {images.map((item, index) => (
                <div
                    className={`${isIndex === index ? 'block' : 'hidden'}`}
                    data-carousel-item={isIndex === index ? true : false}
                    key={index}
                >
                    <img
                        src={item.src}
                        className={`absolute filter w-full h-full background object-cover bg-no-repeat bg-center  transition-all ease-in-out block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}
                        style={{
                            filter: onScroll
                                ? 'brightness(50%)'
                                : 'blur(2px) sepia(0.8) brightness(70%)',
                        }}
                        alt={item.alt}
                    />
                </div>
            ))}
        </>
    );
}
