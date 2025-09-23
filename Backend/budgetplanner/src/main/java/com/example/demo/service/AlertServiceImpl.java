package com.example.demo.service;

import com.example.demo.entity.Alert;
import com.example.demo.entity.Expense;
import com.example.demo.repository.AlertRepository;
import com.example.demo.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;
    private final ExpenseRepository expenseRepository;

    public AlertServiceImpl(AlertRepository alertRepository, ExpenseRepository expenseRepository) {
        this.alertRepository = alertRepository;
        this.expenseRepository = expenseRepository;
    }

    @Override
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    @Override
    public void evaluateAlerts(double limit) {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.withDayOfMonth(1);
        LocalDate endOfMonth = today.withDayOfMonth(today.lengthOfMonth());

        List<Expense> monthlyExpenses = expenseRepository.findByDateBetween(startOfMonth, endOfMonth);
        double total = monthlyExpenses.stream().mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0).sum();

        // Clear previous alerts
        alertRepository.deleteAll();

        if (total > limit) {
            Alert alert = new Alert();
            alert.setTitle("Monthly limit exceeded");
            alert.setMessage("Your monthly expenses ₹" + total + " exceeded your limit of ₹" + limit);
            alert.setSeverity("CRITICAL");
            alert.setCreatedAt(LocalDateTime.now());
            alertRepository.save(alert);
        } else if (total >= limit * 0.9) {
            Alert alert = new Alert();
            alert.setTitle("Approaching monthly limit");
            alert.setMessage("You've spent ₹" + total + " (≥90% of ₹" + limit + ")");
            alert.setSeverity("WARNING");
            alert.setCreatedAt(LocalDateTime.now());
            alertRepository.save(alert);
        }
    }

    @Override
    public void clearAlerts() {
        alertRepository.deleteAll();
    }
}
