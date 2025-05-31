const express = require("express");
const app = express();
app.use(express.json());

// Simulated database for balances
let accountBalances = {}; // Tracks balance per account
let hashBalances = {}; // Stores balance per hash

// ✅ **Fix: Get balances properly**
app.get("/api/balance", (req, res) => {
    res.json({ hashes: hashBalances, accounts: accountBalances });
});

// ✅ **Fix: Transfer logic with correct deductions**
app.post("/api/transfer", (req, res) => {
    const { hash, balance, accountNumber, routingNumber } = req.body;

    if (!hashBalances[hash]) hashBalances[hash] = BigInt(balance);
    if (!accountBalances[accountNumber]) accountBalances[accountNumber] = BigInt(0);

    if (hashBalances[hash] < BigInt(balance)) {
        console.error(`[ERROR] Insufficient funds for hash: ${hash}`);
        return res.status(400).json({ status: "ERROR", reason: "Insufficient funds." });
    }

    // ✅ **Deduct balance from hash & add to account**
    hashBalances[hash] -= BigInt(balance);
    accountBalances[accountNumber] += BigInt(balance);

    console.log(`[TRANSFER SUCCESS] $${balance} from ${hash} → ${accountNumber}`);
    res.json({ status: "Transfer successful", hash, balance, accountNumber });
});

// ✅ **Ensure server runs correctly**
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Transaction service running on port ${PORT}`));

