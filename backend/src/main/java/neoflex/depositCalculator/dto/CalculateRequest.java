package neoflex.depositCalculator.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CalculateRequest {

    @NotNull(message = "Сумма обязательна")
    @DecimalMin(value = "1000", message = "Минимальная сумма 1000")
    @DecimalMax(value = "10000000", message = "Максимальная сумма 10000000")
    private BigDecimal amount;

    @NotNull(message = "Указание срока обязательно")
    @Min(value = 1, message = "Минимальное количество месяцев - 1")
    @Max(value = 60, message = "Максимальное количество месяцев - 60")
    private Integer months;

    @NotNull(message = "Ставка обязательна")
    @DecimalMin(value = "1", message = "Минимальная ставка 1%")
    @DecimalMax(value = "20", message = "Максимальная ставка 20%")
    private BigDecimal rate;

}
