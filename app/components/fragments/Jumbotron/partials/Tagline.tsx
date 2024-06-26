export default function Tagline() {
    return (
        <div className="md:w-[65%] md:text-start text-center w-full  md:pt-5 ps-5 text-white uppercase">
            <h1 className="text-6xl font-bold tracking-wide [text-shadow:0_3px_1px_rgba(0,0,0,0.4)]">
                start your day with a cup of{' '}
                <span className="text-yellow-900">coffee!</span>
            </h1>
            <p className="font-light md:w-[75%] md:pt-5 text-lg normal-case">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                ullam quae, exercitationem aliquam velit earum.
            </p>
            <button className="focus:outline-none md:mt-[50px] mt-10 text-white text-lg bg-yellow-800 hover:bg-yellow-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                Buy Now
            </button>
        </div>
    );
}
