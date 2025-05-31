@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bankAccountTransferId;
    private String status; // Pending Approval, Settled, Failed
    private String businessUnit;
    private String fromBankAccountName;
    private String toBankAccountName;
    private BigDecimal paymentAmount;
    private BigDecimal conversionRate;
    private String paymentMethod;
    private LocalDate transactionDate;
}

