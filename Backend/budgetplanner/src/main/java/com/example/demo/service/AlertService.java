package com.example.demo.service;

import com.example.demo.entity.Alert;

import java.util.List;

public interface AlertService {
    List<Alert> getAllAlerts();
    void evaluateAlerts(double limit);
    void clearAlerts();
}
