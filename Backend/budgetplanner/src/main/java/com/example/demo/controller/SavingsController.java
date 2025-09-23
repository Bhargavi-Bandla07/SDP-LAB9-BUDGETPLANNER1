package com.example.demo.controller;

import com.example.demo.entity.Savings;
import com.example.demo.service.SavingsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for Savings CRUD operations.
 * Uses constructor injection and returns ResponseEntity for clear HTTP status
 * codes.
 */
@RestController
@RequestMapping("/api/savings")
@CrossOrigin(origins = "*")
public class SavingsController {

    private final SavingsService savingsService;

    public SavingsController(SavingsService savingsService) {
        this.savingsService = savingsService;
    }

    /**
     * Get all savings entries.
     */
    @GetMapping
    public ResponseEntity<?> getAllSavings() {
        try {
            List<Savings> list = savingsService.getAllSavings();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Get a single savings by id.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getSavingsById(@PathVariable Long id) {
        try {
            Savings savings = savingsService.getSavingsById(id);
            return ResponseEntity.ok(savings);
        } catch (RuntimeException e) {
            // service throws RuntimeException when not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Create a new savings entry.
     * Returns 201 Created with the saved entity.
     */
    @PostMapping
    public ResponseEntity<?> addSavings(@RequestBody Savings savings) {
        try {
            // ensure currentAmount is set (optional)
            if (savings.getCurrentAmount() == 0) {
                savings.setCurrentAmount(savings.getSavedAmount());
            }
            Savings saved = savingsService.addSavings(savings);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Update an existing savings entry.
     * If not found returns 404.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSavings(@PathVariable Long id, @RequestBody Savings savingsDetails) {
        try {
            // ensure currentAmount update semantics (preserve or set from incoming)
            if (savingsDetails.getCurrentAmount() == 0) {
                savingsDetails.setCurrentAmount(savingsDetails.getSavedAmount());
            }
            Savings updated = savingsService.updateSavings(id, savingsDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            // thrown by service when entity not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Delete a savings entry.
     * Returns 204 No Content when removed, or 404 if not found.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSavings(@PathVariable Long id) {
        try {
            // verify existence first (service will throw if not present)
            savingsService.getSavingsById(id);
            savingsService.deleteSavings(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
