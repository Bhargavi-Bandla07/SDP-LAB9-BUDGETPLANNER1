package com.example.demo.controller;

import com.example.demo.entity.Savings;
import com.example.demo.service.SavingsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savings")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend React app
public class SavingsController {

    private final SavingsService savingsService;

    // Constructor injection
    public SavingsController(SavingsService savingsService) {
        this.savingsService = savingsService;
    }

    // Get all savings
    @GetMapping
    public List<Savings> getAllSavings() {
        return savingsService.getAllSavings();
    }

    // Get savings by ID
    @GetMapping("/{id}")
    public Savings getSavingsById(@PathVariable Long id) {
        return savingsService.getSavingsById(id);
    }

    // Add new savings
    @PostMapping
    public Savings addSavings(@RequestBody Savings savings) {
        return savingsService.addSavings(savings);
    }

    // ✅ Update existing savings
    @PutMapping("/{id}")
    public Savings updateSavings(@PathVariable Long id, @RequestBody Savings savings) {
        return savingsService.updateSavings(id, savings);
    }

    // Delete savings
    @DeleteMapping("/{id}")
    public void deleteSavings(@PathVariable Long id) {
        savingsService.deleteSavings(id);
    }
}
