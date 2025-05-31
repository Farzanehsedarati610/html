const express = require("express");
const app = express();
app.use(express.json());

// Simulated balance database
let accountBalances = {}; // Stores balance for each account
let hashBalances = {}; // Tracks hash value balances

// Process Transfer Request
app.post("/api/transfer", (req, res) => {
    const { hash, balance, accountNumber, routingNumber } = req.body;

    if (!hashBalances[hash]) hashBalances[hash] = BigInt(balance);
    if (!accountBalances[accountNumber]) accountBalances[accountNumber] = BigInt(0);

    if (hashBalances[hash] < BigInt(balance)) {
        console.error(`[ERROR] Insufficient funds for hash: ${hash}`);
        return res.status(400).json({ status: "ERROR", reason: "Insufficient funds." });
    }

    // Log the transaction details before executing the transfer
    console.log(`[TRANSACTION] Transfer: $${balance} from ${hash} → Account ${accountNumber} (Routing ${routingNumber})`);

    // Process the transfer
    hashBalances[hash] -= BigInt(balance);
    accountBalances[accountNumber] += BigInt(balance);

    console.log(`[SUCCESS] Transfer successful: $${balance} → Account ${accountNumber}`);

    res.json({ status: "Transfer successful", hash, balance, accountNumber });
});
app.get("/api/balance", (req, res) => {
    res.json({ hashes: hashBalances, accounts: accountBalances });
});
console.log(`Updated balance for ${hash}: ${hashBalances[hash]}`);
console.log(`Updated balance for ${accountNumber}: ${accountBalances[accountNumber]}`);


app.listen(3000, () => console.log("Transaction service running on port 3000"));

