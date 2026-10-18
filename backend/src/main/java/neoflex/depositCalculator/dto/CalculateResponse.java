package neoflex.depositCalculator.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CalculateResponse {

    private BigDecimal total;

    private BigDecimal profit;
}
