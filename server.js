const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

const DATA_FILE = "balances.json";
// Load balances from file or create empty structure
let balances = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : { hashes: {}, accounts: {} };

// ✅ **GET /api/balance (Now persistent)**
app.get("/api/balance", (req, res) => {
    res.json(balances);
});

// ✅ **POST /api/transfer (Ensures balance deductions persist)**
app.post("/api/transfer", (req, res) => {
    const { hash, balance, accountNumber } = req.body;

    balances.hashes[hash] = (balances.hashes[hash] || BigInt(0)) - BigInt(balance);
    balances.accounts[accountNumber] = (balances.accounts[accountNumber] || BigInt(0)) + BigInt(balance);

    fs.writeFileSync(DATA_FILE, JSON.stringify(balances)); // Save updates to file

    console.log(`[TRANSFER SUCCESS] $${balance} from ${hash} → ${accountNumber}`);
    res.json({ status: "Transfer successful", hash, balance, accountNumber });
    console.log(`[TRANSFER SUCCESS] $${balance} from ${hash} → ${accountNumber}`);
    console.log(`Updated balance for ${hash}: ${balances.hashes[hash]}`);
    console.log(`Updated balance for ${accountNumber}: ${balances.accounts[accountNumber]}`);
});

app.listen(3000, () => console.log("Transaction service running on port 3000"));

