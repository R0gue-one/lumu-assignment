# Extension For H&M
Download the extension (crx file) from [here](https://drive.google.com/file/d/1MmZ9piXeCisYWpowUnggcVGbjGFcHzzo/view?usp=sharing) 
## How to run the extension
- Download the dist.crx file and drag and drop it to the `chrome://extensions/` page
- Open H&M India site, exs:
  ```
  https://www2.hm.com/en_in/women/shop-by-product/view-all.html
  ```
  ```
  https://www2.hm.com/en_in/men/shop-by-product/view-all.html
  ```
- Open any product page and click on the extension
- Scroll down and click the search similar products button. This will give you list of similar products

## Video Demo

https://github.com/user-attachments/assets/08d1ff13-8473-4009-8e67-ae5811bfadb5

## Screenshots

![image](https://github.com/user-attachments/assets/c1577a48-89a1-4b56-9e1a-7f12942642f7)

![image](https://github.com/user-attachments/assets/a068023a-9726-443b-92a6-8d5c9fd0b9dc)


## Build yourself
- Clone the repo
- In the [App.jsx](src/App.jsx) replace the google api key with your own
- Get your API key from [here](https://developers.google.com/custom-search/v1/overview)
- run `npm run build` to build the "dist" file the laod it in `chrome://extensions/` page

### note
the extension doesnt seem to work in finish H&M it seems they have different html for product page, I only realised this today :(
