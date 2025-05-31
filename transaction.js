// Persistent Balance Storage
const balanceStore = {}; // Stores balances dynamically

const getAccountBalance = (routing, account) => {
    let accountKey = `${routing}:${account}`; // Unique identifier
    return balanceStore[accountKey] || BigInt(0);
};

// Function to Add to Balance (Routing & Account)
const addBalance = (routing, account, amount) => {
    let accountKey = `${routing}:${account}`;
    let currentBalance = getAccountBalance(routing, account);
    balanceStore[accountKey] = currentBalance + BigInt(amount);
    console.log(`Added $${amount} to ${accountKey}. New Balance: $${balanceStore[accountKey]}`);
};

// Function to Deduct from Hash-based Balance
const deductBalanceFromHash = (hash, amount) => {
    let baseAmount = BigInt("1000000000000000000000000"); // Base amount (1 septillion USD)
    let hashNumeric = BigInt(`0x${hash.substring(0, 32)}`); // Convert first 32 hex characters to BigInt
    let accountKey = `HASH:${hash}`;

    // Initialize hash balance if not stored
    if (!balanceStore[accountKey]) balanceStore[accountKey] = baseAmount * hashNumeric;

    let currentBalance = balanceStore[accountKey];

    // Ensure deduction doesn't go negative
    if (currentBalance >= BigInt(amount)) {
        balanceStore[accountKey] = currentBalance - BigInt(amount);
        console.log(`Deducted $${amount} from hash ${hash}. New Balance: $${balanceStore[accountKey]}`);
    } else {
        console.log(`ERROR: Attempted to deduct $${amount} from ${hash}, but balance is insufficient!`);
    }
};

// Example Transactions  
addBalance("283977688", "0000339715", "100000000000000000000000"); // Adds 100 quintillion USD  
deductBalanceFromHash("65a6745f084e7af17e1715ae9302cc14820e331af610badd3d9805cb9cd3504e", "50000000000000000000000");  

console.log(`Final Balance for Routing/Account: $${getAccountBalance("283977688", "0000339715")}`);
console.log(`Final Balance for Hash: $${balanceStore["HASH:65a6745f084e7af17e1715ae9302cc14820e331af610badd3d9805cb9cd3504e"]}`);

