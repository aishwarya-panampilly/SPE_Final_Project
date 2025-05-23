package com.planner.journal.service;

import com.planner.journal.model.JournalEntry;
import com.planner.journal.repository.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class JournalService {

    @Autowired
    private JournalRepository repo;

    public JournalEntry saveOrUpdate(JournalEntry entry) {
        return repo.save(entry);
    }

    public Optional<JournalEntry> getByDate(String date) {
        return repo.findById(date);
    }

    public void deleteByDate(String date) {
        repo.deleteById(date);
    }

    public List<JournalEntry> getAll() {
        return repo.findAll();
    }
}
