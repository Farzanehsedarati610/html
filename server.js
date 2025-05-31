const express = require("express");
const app = express();
app.use(express.json());
app.post("/api/transfer", (req, res) => {
    const { hash, balance, accountNumber, routingNumber } = req.body;

    // Ensure balance is correctly formatted
    let formattedBalance = parseInt(balance, 10).toLocaleString("en-US");

    console.log(`Executing transfer: $${formattedBalance} from sender hash ${hash} to ${accountNumber} (Routing: ${routingNumber})`);
    
    res.json({ status: "Transfer successful", hash, balance: formattedBalance });
});

app.listen(3000, () => console.log("Transaction service running on port 3000"));

