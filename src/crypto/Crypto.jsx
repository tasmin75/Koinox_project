import React, { useState } from "react";
import { FormControl, Select, TextField, Grid, Paper } from "@mui/material";
import styles from "./Crypto.module.css";

const Crypto = () => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investmentType, setInvestmentType] = useState("Long Term");
  const [showDiscountForLongTermGains, setShowDiscountForLongTermGains] = useState(true);

  const calculateTaxRate = () => {
    return "$5092 + 32.5% of excess over $45000";
  };

  const calculateCapitalGains = () => {
    return salePrice - purchasePrice - expenses;
  };

  const calculateDiscountForLongTermGains = () => {
    const capitalGains = calculateCapitalGains();
    if (investmentType === "Long Term" && capitalGains > 0) {
      return capitalGains * 0.5;
    }
    return 0;
  };

  const calculateNetCapitalGains = () => {
    const capitalGains = calculateCapitalGains();
    const discount = calculateDiscountForLongTermGains();
    return capitalGains - discount;
  };

  const calculateTaxes = () => {
    const taxRate = calculateTaxRate();
    const netCapitalGains = calculateNetCapitalGains();
    const taxRateParts = taxRate.split(" ");
    if (taxRateParts.length === 8) {
      const baseTax = parseFloat(taxRateParts[0].replace("$", ""));
      const taxRatePercent = parseFloat(taxRateParts[7].replace("%", ""));
      return (
        baseTax +
        (taxRatePercent / 100) * (netCapitalGains - 45000)
      ).toFixed(2);
    }
    return 0;
  };

  
  const handleInvestmentTypeChange = (e) => {
    setInvestmentType(e.target.value);
    setShowDiscountForLongTermGains(e.target.value === "Long Term");
  };

  return (
    <div className={styles.crypto}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <h1>Free Crypto Tax Calculator for Australia</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <p>Financial Year</p>
              <select
              >
                <option value="">FY 2023-24</option>
                <option value="">FY 2024-25</option>
              </select>
          </Grid>
          <Grid item xs={6}>
          <select
              >
                <option value="">India</option>
                <option value="">Australia</option>
              </select>
          </Grid>
          <Grid item xs={6}>
            <label>Enter purchase price of Crypto</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(parseFloat(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <label>Enter sale price of Crypto</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(parseFloat(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <label>Enter your Expenses</label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(parseFloat(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
              <p>Investment Type</p>
              <select
                value={investmentType}
                onChange={handleInvestmentTypeChange}
              >
                <option value="Long Term">Long Term</option>
                <option value="Short Term">Short Term</option>
              </select>
          </Grid>
          <Grid item xs={6}>
            {showDiscountForLongTermGains && (
              <div>
                <p>Discount for Long Term Gains</p>
                <p>{calculateDiscountForLongTermGains()}</p>
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <p>Tax Rate</p>
            <p>{calculateTaxRate()}</p>
          </Grid>
          <Grid item xs={6}>
            <p>Capital Gains Amount</p>
            <input value={calculateCapitalGains()}/>
          </Grid>
          <Grid item xs={6}>
            <p>Discount for Long Term Gains</p>
            <input value={calculateDiscountForLongTermGains()}/>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.green}>
              <p className={styles.text}>Net Capital Gains tax amount</p>
              <p className={styles.result}>${calculateNetCapitalGains()}</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.blue}>
              <p className={styles.text}>The tax you need to pay</p>
              <p className={styles.result}>${calculateTaxes()}</p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Crypto;
