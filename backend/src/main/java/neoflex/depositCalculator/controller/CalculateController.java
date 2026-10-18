package neoflex.depositCalculator.controller;


import jakarta.validation.Valid;
import neoflex.depositCalculator.dto.CalculateRequest;
import neoflex.depositCalculator.dto.CalculateResponse;
import neoflex.depositCalculator.service.CalculateService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class CalculateController {

    private final CalculateService calculateService;

    public CalculateController(CalculateService calculateService) {
        this.calculateService = calculateService;
    }

    @PostMapping("/calculate")
    public CalculateResponse calculate(@Valid @RequestBody CalculateRequest request) {
        return calculateService.calculate(request);
    }
}
