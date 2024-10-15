import { getData, postData, updateData } from "../api/api";


chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: "welcome.html" });
  }
});
let canMakeRequest = true;

// async function handleTextSelectedMessage(
//   message: { type: string; shortcut_id: string; text: string; },
//   sender: chrome.runtime.MessageSender,
//   sendResponse: (response?: any) => void
// ) {
//   try {
//     if (!canMakeRequest) return;
//     canMakeRequest = false;


//   } catch (error: any) {
//     console.error(error.message);
//   } finally {
//     canMakeRequest = true;
//   }
// }

async function handleIsPageSavedMessage(
  message: { type: string; },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  try {
    if (!canMakeRequest) return;
    canMakeRequest = false;

    const response = await getData(`pages/${sender.tab?.url}`);

    sendResponse(response);

  } catch (error: any) {
    console.error(error.message);
  } finally {
    canMakeRequest = true;
  }
}

async function handleSavePageMessage(
  message: { type: string; page: string; description: string; },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  try {
    if (!canMakeRequest) return;
    canMakeRequest = false;

    const response = await postData(`pages/`, { url: sender.tab?.url, page: message.page, description: message.description });

    sendResponse(response);

  } catch (error: any) {
    console.error(error.message);
  } finally {
    canMakeRequest = true;
  }
}

async function handleUpdatePageMessage(
  message: { type: string; page: string; description: string; },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  try {
    if (!canMakeRequest) return;
    canMakeRequest = false;

    const response = await updateData(`pages/${sender.tab?.url}`, { page: message.page, description: message.description });

    sendResponse(response);

  } catch (error: any) {
    console.error(error.message);
  } finally {
    canMakeRequest = true;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === 'checkSaved'){
    handleIsPageSavedMessage(message, sender, sendResponse);
  }
  if (message.type === 'savePage'){
    handleSavePageMessage(message, sender, sendResponse);
  }
  if (message.type === 'updatePage'){
    handleUpdatePageMessage(message, sender, sendResponse);
  }

  return true;
});

