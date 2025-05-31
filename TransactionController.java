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

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody Transaction transaction) {
        return ResponseEntity.ok("Transfer endpoint reached");
    }
}
