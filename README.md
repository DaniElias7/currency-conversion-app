# Currency Conversion Microservice

This project is a simple full-stack currency conversion microservice built using Next.js for the frontend and Express.js for the backend. It utilizes the ExchangeRate-API to fetch real-time exchange rates.

## Setup and Running the Application

Follow these steps to get the application running on your local machine:

### Backend (API)

1.  Navigate to the backend directory:
    ```bash
    cd api
    ```

2.  Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Create a `.env` file in the `api` directory and add your ExchangeRate-API key and the desired port:
    ```
    EXCHANGERATE_API_KEY=YOUR_ACTUAL_API_KEY
    PORT=3001
    ```
    **Important:** Replace `YOUR_ACTUAL_API_KEY` with your API key from [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/).

4.  Start the backend server:
    ```bash
    npm start
    # or
    yarn start
    ```
    The backend server should now be running on `http://localhost:3001` (or the port specified in your `.env` file).

### Frontend (Client)

1.  Navigate to the frontend directory:
    ```bash
    cd ../client
    ```

2.  Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the frontend development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend application should now be running on `http://localhost:3000`.

## Using the Application

1.  Open your browser and navigate to `http://localhost:3000`.
2.  You should see a currency converter interface.
3.  Select the source currency from the "From" dropdown.
4.  Select the target currency from the "To" dropdown.
5.  Enter the amount you want to convert in the "Amount" field.
6.  Click the "Convert" button.
7.  The converted amount will be displayed below the button.

## Backend Caching

The backend implements a simple in-memory cache to optimize API calls to the ExchangeRate-API. The exchange rates for each base currency are cached for **1 hour**. After this time, a fresh set of rates will be fetched from the API upon the next request.

## Supported Currencies

The frontend currently supports conversion between the following currencies: USD, BRL, CNY, EUR, and GBP. You can modify the `supportedCurrencies` array in the `client/pages/index.js` file to include more currencies if needed.