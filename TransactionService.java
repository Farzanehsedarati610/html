@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction processTransfer(Transaction tx) {
        tx.setStatus("Pending Approval"); // Default status
        tx.setTransactionDate(LocalDate.now());
        return transactionRepository.save(tx);
    }

    public Transaction getTransfer(Long id) {
        return transactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Transfer not found"));
    }

    public List<Transaction> getAllTransfers() {
        return transactionRepository.findAll();
    }
}

