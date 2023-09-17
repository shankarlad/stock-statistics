import React, { useState } from 'react';
import axios from 'axios';
import './StockData.css';

const StockData = () => {
    const [symbol, setSymbol] = useState('');
    const [date, setDate] = useState('');
    const [tradeData, setTradeData] = useState(null);

    // Method to fetch the stock data for selected date and selected stock.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/fetchStockData`, { symbol, date });
            setTradeData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1 className="header">Stock Trade Statistics</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="symbol">Stock Symbol:</label>
                    <input
                        type="text"
                        id="symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Select Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>

            {tradeData && (
                <div className="result">
                    <h2>Trade Statistics</h2>
                    <ul>
                        <li><span>Open:</span> {tradeData.open}</li>
                        <li><span>High:</span> {tradeData.high}</li>
                        <li><span>Low:</span> {tradeData.low}</li>
                        <li><span>Close:</span> {tradeData.close}</li>
                        <li><span>Volume:</span> {tradeData.volume}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};


export default StockData;
