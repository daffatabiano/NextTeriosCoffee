'use client';

import ImageList from '../../ui/ImageList';
import CupCoffee from './partials/CupCoffee';
import { ImageLists } from './partials/ImageLists';
import Tagline from './partials/Tagline';

export default function Jumbotron() {
    return (
        <div className="relative w-full h-screen">
            {/* <!-- Carousel wrapper --> */}
            <div className="relative h-full overflow-hidden">
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        inset: 0,
                        maskImage: "url('/img/maskhome.png')",
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        maskSize: 'cover',
                    }}
                >
                    <div className="z-10 flex w-full justify-between px-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
                        <Tagline />
                        <CupCoffee />
                    </div>
                    <ImageList images={ImageLists} />
                </div>
            </div>
        </div>
    );
}
