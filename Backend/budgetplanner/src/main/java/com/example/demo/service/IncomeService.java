package com.example.demo.service;

import com.example.demo.entity.Income;

import java.util.List;

public interface IncomeService {
    List<Income> getAllIncome();
    Income getIncomeById(Long id);
    Income addIncome(Income income);
    Income updateIncome(Long id, Income income);
    void deleteIncome(Long id);
    Double getTotalIncome();
}
