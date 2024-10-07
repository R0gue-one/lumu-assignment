
function extractProductInfo() {
  const productInfo = {
    imageSrc: '',
    name: '',
    price: ''
  };

  // Extract image
  const imgTag = document.querySelector('.product-detail-main-image-container img');
  if (imgTag) {
    let imgSrc = imgTag.getAttribute('src');
    productInfo.imageSrc = imgSrc.replace('//', 'https://');
    console.log("Image link:", productInfo.imageSrc);
  }

  // Extract product name
  const nameElement = document.querySelector('.ProductName-module--container__3Qbt1 h1');
  if (nameElement) {
    productInfo.name = nameElement.textContent.trim();
    console.log("Product name:", productInfo.name);
  }

  // Extract price
  const priceElement = document.querySelector('.price.parbase .e26896 .edbe20');
  if (priceElement) {
    productInfo.price = priceElement.textContent.trim();
    console.log("Product price:", productInfo.price);
  }

  // Send the product info to the background script
  chrome.runtime.sendMessage({ productInfo }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error sending message:", chrome.runtime.lastError);
    } else {
      console.log("Product info sent successfully");
    }
  });
}

// Run the function when the script loads
extractProductInfo();

// Also run the function when the page content changes (for dynamic loading)
const observer = new MutationObserver(extractProductInfo);
observer.observe(document.body, { childList: true, subtree: true });