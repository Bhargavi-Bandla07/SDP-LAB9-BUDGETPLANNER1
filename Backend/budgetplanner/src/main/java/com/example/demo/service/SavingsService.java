package com.example.demo.service;

import com.example.demo.entity.Savings;
import java.util.List;

public interface SavingsService {
    List<Savings> getAllSavings();

    Savings getSavingsById(Long id);

    Savings addSavings(Savings savings);

    Savings updateSavings(Long id, Savings savings);

    void deleteSavings(Long id);
}
