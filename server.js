const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

const DATA_FILE = "balances.json";
// Load balances from file or create empty structure
let balances = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : { hashes: {}, accounts: {} };

// ✅ **GET /api/balance (Now persistent)**
app.get('/', (req, res) => res.send('API is running'));

app.get("/api/balance", (req, res) => {
    // ✅ Convert BigInt values to strings before returning JSON
    const formattedBalances = {
        hashes: Object.fromEntries(Object.entries(hashBalances).map(([hash, balance]) => [hash, balance.toString()])),
        accounts: Object.fromEntries(Object.entries(accountBalances).map(([account, balance]) => [account, balance.toString()]))
    };

    res.json(formattedBalances);
});

// ✅ **POST /api/transfer (Ensures balance deductions persist)**
app.post('/transfer', (req, res) => {
    const { hash, balance, routing, account } = req.body;
    // Store balance update logic here
    res.json({ message: "Transfer successful", hash, balance, routing, account });
});

app.post("/api/transfer", (req, res) => {
    const { hash, balance, accountNumber } = req.body;

    balances.hashes[hash] = (balances.hashes[hash] || BigInt(0)) - BigInt(balance);
    balances.accounts[accountNumber] = (balances.accounts[accountNumber] || BigInt(0)) + BigInt(balance);

    fs.writeFileSync(DATA_FILE, JSON.stringify(balances)); // Save updates to file
    res.json({ status: "Transfer successfull", hash, balance, accountNumber });
    console.log(`[TRANSFER SUCCESS] $${balance} from ${hash} → ${accountNumber}`);
    console.log(`[TRANSFER SUCCESS] $${balance} from ${hash} → ${accountNumber}`);
    console.log(`Updated balance for ${hash}: ${balances.hashes[hash]}`);
    console.log(`Updated balance for ${accountNumber}: ${balances.accounts[accountNumber]}`);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

