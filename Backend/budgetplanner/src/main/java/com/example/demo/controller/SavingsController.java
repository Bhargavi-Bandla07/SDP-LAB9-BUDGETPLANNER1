package com.example.demo.controller;

import com.example.demo.entity.Savings;
import com.example.demo.service.SavingsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/savings")
@CrossOrigin(origins = "*") // allow frontend React app
public class SavingsController {

    private final SavingsService savingsService;

    public SavingsController(SavingsService savingsService) {
        this.savingsService = savingsService;
    }

    @GetMapping
    public List<Savings> getAllSavings() {
        return savingsService.getAllSavings();
    }

    @GetMapping("/{id}")
    public Savings getSavingsById(@PathVariable Long id) {
        return savingsService.getSavingsById(id);
    }

    @PostMapping
    public ResponseEntity<?> addSavings(@RequestBody Savings savings) {
        try {
            Savings saved = savingsService.addSavings(savings);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSavings(@PathVariable Long id, @RequestBody Savings savings) {
        try {
            Savings updated = savingsService.updateSavings(id, savings);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public void deleteSavings(@PathVariable Long id) {
        savingsService.deleteSavings(id);
    }
}
