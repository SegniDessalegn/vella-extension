
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Trash } from 'lucide-react';


type Props = {};

const ContentScript = (props: Props) => {
    
    const [pageData, setPageData] = useState<{ url: string, pageData: string, description?: string } | null>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<"loading" | "success" | "error" | undefined>("loading");
    const [user, setUser] = useState<{ _id: string, username: string } | null>(null);

    useEffect(() => {
        setStatus("loading");
        chrome.runtime.sendMessage({ type: 'checkSaved' }, (response) => {
            setPageData(response.data);
            setStatus("success");
            setTimeout(() => setStatus(undefined), 2000);
        });

        chrome.runtime.sendMessage({ type: 'getUser' }, (response) => {
            setUser(response.data);
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

    const handleClick = () => {
        if (!user) {
            window.open('/login-page', '_blank');
            return;
        }
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

    const handleDeletePage = () => {
        setStatus("loading");
        chrome.runtime.sendMessage({ type: 'deletePage' }, (response) => {
            if (response.data) {
                setPageData(null);
                setDescription(undefined);
                setStatus("success");
                setTimeout(() => setStatus(undefined), 2000);
            }
        });
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
        {pageData && pageData.description && (
            <div 
                style={{ 
                backgroundColor: "white",
                color: "#4c6daf",
                padding: 5,
                borderRadius: 5,
                fontSize: 10,
                maxWidth: 250,
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflowWrap: "break-word"
                }}
            > 
                {pageData.description}
            </div>
        )}
        {isHovered && user && <Input autoFocus onChange={(e) => setDescription(e.target.value)} placeholder="Description (Optional)" />}
            <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                <Button onClick={() => handleClick()}>{!user ? "Login" : pageData ? "Update page" : "Save page"}</Button>
                {pageData && 
                    <Trash 
                        onMouseEnter={() => handleHover(false)}
                        onMouseLeave={() => handleHover(true)}
                        onClick={()=> handleDeletePage()}
                        style={{ color: "red", cursor: "pointer" }}
                    />
                }
            </div>
            <div style={{ fontSize: 10, position: "absolute", bottom: -10, right: 0 }}>{status}</div>
        </div>
    );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<ContentScript />);
