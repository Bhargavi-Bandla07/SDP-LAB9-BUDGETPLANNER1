package com.example.demo.service;

import com.example.demo.entity.Savings;
import com.example.demo.repository.SavingsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavingsServiceImpl implements SavingsService {

    private final SavingsRepository savingsRepository;

    public SavingsServiceImpl(SavingsRepository savingsRepository) {
        this.savingsRepository = savingsRepository;
    }

    @Override
    public List<Savings> getAllSavings() {
        return savingsRepository.findAll();
    }

    @Override
    public Savings getSavingsById(Long id) {
        return savingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Savings not found for id :: " + id));
    }

    @Override
    public Savings addSavings(Savings savings) {
        return savingsRepository.save(savings);
    }

    @Override
    public Savings updateSavings(Long id, Savings savingsDetails) {
        Savings savings = savingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Savings not found for id :: " + id));

        // Update fields
        savings.setGoalName(savingsDetails.getGoalName());
        savings.setTargetAmount(savingsDetails.getTargetAmount());
        savings.setSavedAmount(savingsDetails.getSavedAmount());

        return savingsRepository.save(savings);
    }

    @Override
    public void deleteSavings(Long id) {
        savingsRepository.deleteById(id);
    }
}
