# React Frontend for Web Scraper

## Assumptions
- Correct security to be implemented with a separate Node Backend handling API KEYs instead of this code.
- As of now a basic security is implemened by directly reading the API KEY due to time constraint on interview submission.
- Tests are written only for ROR Backend and not for this React App.

## Setup
- Make sure you have installed Node versoin >= 18.20.5
- In project's root directory create `.env` file and add value to `REACT_APP_API_KEY`
- `cd` to the directory and do `npm install` to install all packages.

## Runnig the app
- `npm start` will start the app on `http://localhost:3001` 

## Production Build
- Do `npm run build` to create production build.

## Using the app
- On the main page, it will list all the existing products.
- Click on `Fetch Product` menu at the top to visit the form to add a new product.
