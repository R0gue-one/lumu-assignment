// background.js
let popupPort;

chrome.runtime.onConnect.addListener((port) => {
  console.log("Connection established");
  popupPort = port;
  
  // Send stored product info if available
  chrome.storage.local.get(['productInfo'], (result) => {
    if (result.productInfo) {
      port.postMessage({ type: 'PRODUCT_INFO', productInfo: result.productInfo });
    }
  });

  port.onDisconnect.addListener(() => {
    console.log("Popup disconnected");
    popupPort = null;
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);
  if (message.productInfo) {
    // Store the product info
    chrome.storage.local.set({ productInfo: message.productInfo }, () => {
      console.log('Product info stored');
    });

    // Send to popup if connected
    if (popupPort) {
      popupPort.postMessage({ type: 'PRODUCT_INFO', productInfo: message.productInfo });
    }
  }
});