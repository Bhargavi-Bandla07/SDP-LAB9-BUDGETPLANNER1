package com.example.demo.service;

import com.example.demo.entity.Expense;
import java.util.List;

public interface ExpenseService {
    List<Expense> getAllExpenses();
    Expense getExpenseById(Long id);
    Expense addExpense(Expense expense);
    Expense updateExpense(Long id, Expense expenseDetails);
    void deleteExpense(Long id);
}