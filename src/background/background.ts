import { getData, postData } from "../api/api";
const baseAPIURI = "https://repeate.glitch.me";


chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: "welcome.html" });
  }
});
let canMakeRequest = true;

async function handleTextSelectedMessage(
  message: { type: string; shortcut_id: string; text: string; },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  try {
    if (!canMakeRequest) return;
    canMakeRequest = false;


  } catch (error: any) {
    console.error(error.message);
  } finally {
    canMakeRequest = true;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleTextSelectedMessage(message, sender, sendResponse);

  return true;
});

