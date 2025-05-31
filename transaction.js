document.addEventListener("DOMContentLoaded", function() {
    window.transferFunds = function(hash, amount, accountNumber) {
        // ✅ Fetch stored balances or initialize structure
        let balances = JSON.parse(localStorage.getItem("balances")) || { hashes: {}, accounts: {} };

        // ✅ Deduct from hash balance, add to account balance
        balances.hashes[hash] = (balances.hashes[hash] || 0) - parseInt(amount);
        balances.accounts[accountNumber] = (balances.accounts[accountNumber] || 0) + parseInt(amount);

        // ✅ Save updated balances
        localStorage.setItem("balances", JSON.stringify(balances));

        console.log(`[TRANSFER SUCCESS] $${amount} from ${hash} → ${accountNumber}`);
        alert(`Transfer Complete! New Balance: ${balances.accounts[accountNumber]}`);
    };
});

