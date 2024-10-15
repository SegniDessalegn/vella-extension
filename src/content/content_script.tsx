
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

type Props = {};

const ContentScript = (props: Props) => {
    
    const [pageData, setPageData] = useState<{ url: string, pageData: string, description?: string } | null>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<"loading" | "success" | "error" | undefined>("loading");

    useEffect(() => {
        setStatus("loading");
        chrome.runtime.sendMessage({ type: 'checkSaved' }, (response) => {
            setPageData(response.data);
            setStatus("success");
            setTimeout(() => setStatus(undefined), 2000);
        });
    }, []);

    useEffect(() => {
        setStatus("loading");
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === 'saved') {
                setPageData(message.data);
                setStatus("success");
                setTimeout(() => setStatus(undefined), 2000);
            }
        });
    }, []);

    const handleSavePage = () => {
        setStatus("loading");
        if (pageData === null) {
            chrome.runtime.sendMessage({ type: 'savePage', page: document.body.innerHTML, description: description }, (response) => {
                if (response.data) {
                    setPageData(response.data);
                    setDescription(undefined);
                    setStatus("success");
                    setTimeout(() => setStatus(undefined), 2000);
                }
            });
        } else {
            chrome.runtime.sendMessage({ type: 'updatePage', page: document.body.outerHTML, description: description }, (response) => {
                if (response.data) {
                    setPageData(response.data);
                    setDescription(undefined);
                    setStatus("success");
                    setTimeout(() => setStatus(undefined), 2000);
                }
            });
        }
    }

    const handleHover = (hovering: boolean) => {
        setIsHovered(hovering);
    }

    if (pageData === undefined) return <></>

    return (
        <div
            className='v-main'
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
            {pageData && pageData.description && <div style={{ backgroundColor: "white", color: "#4c6daf", padding: 5, borderRadius: 5, fontSize: 10, maxWidth: 250, height: "auto" }}> {pageData.description}</div>}
            {isHovered && <Input autoFocus onChange={(e) => setDescription(e.target.value)} placeholder="Description (Optional)" />}
            <Button onClick={() => handleSavePage()}>{pageData ? "Update page" : "Save page"}</Button>
            <div style={{ fontSize: 10, position: "absolute", bottom: -10, right: 0 }}>{status}</div>
        </div>
    );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<ContentScript />);
