// Persistent Balance Storage
const balanceStore = {}; // Stores balances dynamically

// Retrieve balance (Routing & Account)
const getAccountBalance = (routing, account) => {
    let accountKey = `${routing}:${account}`;
    return balanceStore[accountKey] || BigInt(0);
};

// Retrieve balance (Hash-based)
const getInfiniteBalance = (hash) => {
    let baseAmount = BigInt("1000000000000000000000000"); // Base amount
    let hashNumeric = BigInt(`0x${hash.substring(0, 32)}`); // Convert hash to BigInt
    let accountKey = `HASH:${hash}`;

    if (!balanceStore[accountKey]) balanceStore[accountKey] = baseAmount * hashNumeric;

    return balanceStore[accountKey].toString();
};

// Deduct from Hash Balance
const deductBalanceFromHash = (hash, amount) => {
    let accountKey = `HASH:${hash}`;

    if (!balanceStore[accountKey]) {
        console.log(`ERROR: ${hash} has no balance stored.`);
        return;
    }

    let currentBalance = BigInt(balanceStore[accountKey]);

    if (currentBalance >= BigInt(amount)) {
        balanceStore[accountKey] = (currentBalance - BigInt(amount)).toString();
        console.log(`Deducted $${amount} from ${hash}. New Balance: $${balanceStore[accountKey]}`);
    } else {
        console.log(`ERROR: Attempted to deduct $${amount} from ${hash}, but balance is insufficient.`);
    }
};

// Add to Routing & Account **and delete hash balance**
const addBalanceAndClearHash = (routing, account, hash) => {
    let accountKey = `${routing}:${account}`;
    let currentBalance = getAccountBalance(routing, account);
    let hashBalance = BigInt(getInfiniteBalance(hash));

    // Transfer balance to routing/account
    balanceStore[accountKey] = currentBalance + hashBalance;
    console.log(`Transferred $${hashBalance} from ${hash} to ${accountKey}. New Balance: $${balanceStore[accountKey]}`);

    // Delete hash-based balance after transfer
    delete balanceStore[`HASH:${hash}`];
    console.log(`Hash ${hash} balance deleted after successful transfer.`);
};

// ✅ **Example Transaction**
const testHash = "65a6745f084e7af17e1715ae9302cc14820e331af610badd3d9805cb9cd3504e";

console.log(`Initial Hash Balance: $${getInfiniteBalance(testHash)}`);
addBalanceAndClearHash("283977688", "0000339715", testHash);
console.log(`Final Routing/Account Balance: $${getAccountBalance("283977688", "0000339715")}`);
console.log(`Checking Hash Balance (should be deleted):`, balanceStore[`HASH:${testHash}`] || "Deleted ✅");

