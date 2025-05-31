@RestController
@RequestMapping("/api")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transfer")
    public ResponseEntity<?> createBankAccountTransfer(@RequestBody Transaction tx) {
        return ResponseEntity.ok(transactionService.processTransfer(tx));
    }

    @GetMapping("/transfer/{id}")
    public ResponseEntity<?> getTransferById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransfer(id));
    }

    @GetMapping("/transfers")
    public ResponseEntity<?> getAllTransfers() {
        return ResponseEntity.ok(transactionService.getAllTransfers());
    }
}

