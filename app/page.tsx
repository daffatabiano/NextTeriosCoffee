import Menu from './components/fragments/sections/Menu';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
            <Menu />
            <h1>Hello World</h1>
        </main>
    );
}
