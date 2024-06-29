import Jumbotron from './components/fragments/Jumbotron';
import Navbar from './components/fragments/Navbar';
import Menu from './components/fragments/sections/Menu';

export default function Home() {
    return (
        <>
            <Jumbotron />
            <Navbar />
            <main className="p-4">
                <Menu />
                <h1>Hello World</h1>
            </main>
        </>
    );
}
