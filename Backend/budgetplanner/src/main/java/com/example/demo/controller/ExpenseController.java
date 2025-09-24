package com.example.demo.controller;

import com.example.demo.entity.Expense; // Corrected to use the 'entity' package
import com.example.demo.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*") // allow React frontend
public class ExpenseController {

    private final ExpenseService expenseService; // Use the interface

    // Spring Boot automatically injects the ExpenseServiceImpl here
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // READ: GET http://localhost:8080/api/expenses

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // READ: GET http://localhost:8080/api/expenses/{id}
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    // ADD: POST http://localhost:8080/api/expenses
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }
}