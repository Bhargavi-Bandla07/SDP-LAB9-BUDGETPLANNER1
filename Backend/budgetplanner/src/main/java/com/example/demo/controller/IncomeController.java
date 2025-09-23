package com.example.demo.controller;

import com.example.demo.entity.Income;
import com.example.demo.repository.IncomeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/incomes")
@CrossOrigin(origins = "*") // React frontend URL
public class IncomeController {

    private final IncomeRepository incomeRepository;

    public IncomeController(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    // Get all incomes
    @GetMapping
    public List<Income> getAllIncomes() {
        return incomeRepository.findAll();
    }

    // Add new income
    @PostMapping
    public Income addIncome(@RequestBody Income income) {
        return incomeRepository.save(income);
    }

    // Update existing income
    @PutMapping("/{id}")
    public Income updateIncome(@PathVariable Long id, @RequestBody Income incomeDetails) {
        Optional<Income> optionalIncome = incomeRepository.findById(id);
        if (optionalIncome.isPresent()) {
            Income income = optionalIncome.get();
            income.setSource(incomeDetails.getSource());
            income.setAmount(incomeDetails.getAmount());
            return incomeRepository.save(income);
        } else {
            throw new RuntimeException("Income not found with id " + id);
        }
    }

    // Delete income
    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id) {
        incomeRepository.deleteById(id);
    }
}
