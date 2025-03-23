import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";
import { useState } from 'react';

export default function ContextPage() {
    const [counter,setCounter] = useState(0);
    return (
    <ThemeProvider>
        <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <main className = "flex-1 w-full">
        <ThemeContent/>
        </main>
        </div>
        </ThemeProvider>
</>
    )
}