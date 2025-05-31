const express = require("express");
const app = express();
app.use(express.json());

// Simulated balance database
let accountBalances = {}; // Stores balance for each account
let hashBalances = {}; // Tracks hash value balances

// Process Transfer Request
app.post("/api/transfer", (req, res) => {
    const { hash, balance, accountNumber, routingNumber } = req.body;

    // Ensure both hash and account exist in balances
    if (!hashBalances[hash]) hashBalances[hash] = BigInt(balance);
    if (!accountBalances[accountNumber]) accountBalances[accountNumber] = BigInt(0);

    // Check if hash has enough balance to send
    if (hashBalances[hash] < BigInt(balance)) {
        return res.status(400).json({ status: "ERROR", reason: "Insufficient funds in hash." });
    }

    // Deduct balance from hash
    hashBalances[hash] -= BigInt(balance);

    // Add balance to recipient account
    accountBalances[accountNumber] += BigInt(balance);

    console.log(`Transfer successful: $${balance} from hash ${hash} → Account ${accountNumber}`);

    res.json({ status: "Transfer successful", hash, balance, accountNumber, routingNumber });
});

app.listen(3000, () => console.log("Transaction service running on port 3000"));

