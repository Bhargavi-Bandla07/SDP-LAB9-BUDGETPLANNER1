package com.example.demo.controller;

import com.example.demo.entity.Alert;
import com.example.demo.service.AlertService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    public List<Alert> getAlerts() {
        return alertService.getAllAlerts();
    }

    @PostMapping("/evaluate")
    public void evaluateAlerts(@RequestParam double limit) {
        alertService.evaluateAlerts(limit);
    }

    @DeleteMapping("/clear")
    public void clearAlerts() {
        alertService.clearAlerts();
    }
}
