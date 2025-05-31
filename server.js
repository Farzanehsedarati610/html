const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/transfer", (req, res) => {
    const { hash, balance, accountNumber, routingNumber } = req.body;
    console.log(`Executing transfer: $${balance} from sender hash ${hash} to ${accountNumber} (Routing: ${routingNumber})`);
    res.json({ status: "Transfer successful", hash, balance });
});

app.listen(3000, () => console.log("Transaction service running on port 3000"));

