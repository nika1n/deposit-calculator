package neoflex.depositCalculator.service;

import neoflex.depositCalculator.dto.CalculateRequest;
import neoflex.depositCalculator.dto.CalculateResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CalculateService {

    public CalculateResponse calculate(CalculateRequest request) {

        BigDecimal monthRate = request.getRate()
                .divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP)
                .divide(BigDecimal.valueOf(12), 10, RoundingMode.HALF_UP);

        BigDecimal totalAmount = request.getAmount().multiply((BigDecimal.ONE.add(monthRate))
                .pow(request.getMonths())).setScale(2, RoundingMode.HALF_UP);

        BigDecimal profit = totalAmount.subtract(request.getAmount()).setScale(2, RoundingMode.HALF_UP);

        return CalculateResponse.builder()
                .total(totalAmount)
                .profit(profit)
                .build();
    }

}
