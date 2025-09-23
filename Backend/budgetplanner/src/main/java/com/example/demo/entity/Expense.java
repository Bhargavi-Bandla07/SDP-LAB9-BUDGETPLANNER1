package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity // Marks this class as a JPA entity
@Table(name = "expenses") // Maps to a database table named 'expenses'
public class Expense {

    @Id // Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    private String name;        // Expense Name
    private Double amount;      // Amount
    private String category;    // Category
    private LocalDate date;     // Date

    // --- Constructors ---
    public Expense() {
    }

    // --- Getters and Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}