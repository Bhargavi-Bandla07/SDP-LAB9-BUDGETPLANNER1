package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "savings")
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String goalName;
    private double targetAmount;
    private double savedAmount;

    public Savings() {}

    public Savings(String goalName, double targetAmount, double savedAmount) {
        this.goalName = goalName;
        this.targetAmount = targetAmount;
        this.savedAmount = savedAmount;
    }

    // Getters & Setters
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

    // ✅ Optional: helper method to increment savedAmount
    public void addToSavedAmount(double amount) {
        this.savedAmount += amount;
    }
}
