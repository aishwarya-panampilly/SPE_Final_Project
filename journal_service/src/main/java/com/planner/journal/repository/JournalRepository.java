package com.planner.journal.repository;

import com.planner.journal.model.JournalEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JournalRepository extends MongoRepository<JournalEntry, String> {}
