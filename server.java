@RestController
@RequestMapping("/api")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transfer")
    public ResponseEntity<?> processTransfer(@RequestBody TransferRequest request) {
        return ResponseEntity.ok(transactionService.executeTransfer(request));
    }

    @GetMapping("/balance/{hash}")
    public ResponseEntity<?> getBalance(@PathVariable String hash) {
        return ResponseEntity.ok(transactionService.getBalance(hash));
    }
}

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transfer executeTransfer(TransferRequest request) {
        Transfer tx = new Transfer();
        tx.setHash(request.getHash());
        tx.setAmount(request.getAmount());
        tx.setAccountNumber(request.getAccountNumber());
        tx.setStatus("Pending Approval"); // Default status before processing
        tx.setTransactionDate(LocalDate.now());
        return transactionRepository.save(tx);
    }

    public BigDecimal getBalance(String hash) {
        return transactionRepository.findByHash(hash)
            .map(Transfer::getAmount)
            .orElse(BigDecimal.ZERO);
    }
}

@Entity
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String hash;
    private BigDecimal amount;
    private String accountNumber;
    private String status;
    private LocalDate transactionDate;
}

