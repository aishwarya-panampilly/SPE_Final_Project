package com.planner.journal.controller;

import com.planner.journal.model.JournalEntry;
import com.planner.journal.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/journal")
public class JournalController {

    @Autowired
    private JournalService service;

    @PostMapping
    public JournalEntry addOrUpdate(@RequestBody JournalEntry entry) {
        return service.saveOrUpdate(entry);
    }

    @GetMapping("/{date}")
    public Optional<JournalEntry> getByDate(@PathVariable String date) {
        return service.getByDate(date);
    }

    @DeleteMapping("/{date}")
    public void deleteByDate(@PathVariable String date) {
        service.deleteByDate(date);
    }

    @GetMapping
    public List<JournalEntry> getAll() {
        return service.getAll();
    }
}
