import React from 'react';
import { createRoot } from 'react-dom/client';

type Props = {}

const Welcome = (props: Props) => {
    return (
        <div style={{ 
            position: "relative", 
            width: "100vw", 
            height: "90vh", 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center", 
            overflow: "hidden" 
        }}>
            <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundImage: "url(/icon.png)", 
                backgroundSize: "cover", 
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                filter: "blur(15px)",
                zIndex: 0
            }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <h1>Welcome</h1>
                <h2>This is <span style={{ color: "#4c6daf"}}>Vella</span> extension to scrape pages and save them in the backend.</h2>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Welcome />
    </React.StrictMode>
);