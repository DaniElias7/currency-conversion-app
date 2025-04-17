import React, { useState } from 'react';
import styles from '../styles/Home.module.css'; // We'll create this CSS module

const supportedCurrencies = ['USD', 'BRL', 'CNY', 'EUR', 'GBP'];

export default function Home() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('BRL');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        setError(null);
        setConvertedAmount(null);

        if (!amount || isNaN(amount)) {
            setError('Please enter a valid amount.');
            return;
        }

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(
                `${backendUrl}/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
            );
            const data = await response.json();

            if (response.ok && data.convertedAmount) {
                setConvertedAmount(data.convertedAmount);
            } else {
                setError(data.error || 'Failed to convert currency.');
            }
        } catch (err) {
            console.error('Error during conversion:', err);
            setError('Failed to connect to the backend.');
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Currency Converter
                </h1>

                <div className={styles.converter}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="fromCurrency">From:</label>
                        <select
                            id="fromCurrency"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {supportedCurrencies.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="toCurrency">To:</label>
                        <select
                            id="toCurrency"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {supportedCurrencies.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <button className={styles.convertButton} onClick={handleConvert}>
                        Convert
                    </button>

                    {convertedAmount !== null && (
                        <div className={styles.result}>
                            {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
                        </div>
                    )}

                    {error && (
                        <p className={styles.error}>{error}</p>
                    )}
                </div>
            </main>
        </div>
    );
}