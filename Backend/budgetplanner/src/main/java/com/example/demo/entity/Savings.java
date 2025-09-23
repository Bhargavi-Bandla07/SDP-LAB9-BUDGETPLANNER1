package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "savings")
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "goal_name")
    private String goalName;

    @Column(name = "target_amount")
    private double targetAmount;

    @Column(name = "saved_amount")
    private double savedAmount;

    // ✅ Map the existing DB column `current_amount`
    @Column(name = "current_amount", nullable = false)
    private double currentAmount = 0.0;

    public Savings() {
    }

    public Savings(String goalName, double targetAmount, double savedAmount) {
        this.goalName = goalName;
        this.targetAmount = targetAmount;
        this.savedAmount = savedAmount;
        this.currentAmount = savedAmount; // initialize with savedAmount or keep 0
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public double getSavedAmount() {
        return savedAmount;
    }

    public void setSavedAmount(double savedAmount) {
        this.savedAmount = savedAmount;
    }

    public double getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(double currentAmount) {
        this.currentAmount = currentAmount;
    }

    // helper to increment saved + current
    public void addToSavedAmount(double amount) {
        this.savedAmount += amount;
        this.currentAmount += amount;
    }
}
