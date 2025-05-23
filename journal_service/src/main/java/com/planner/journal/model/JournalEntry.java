package com.planner.journal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "journal_entries")
public class JournalEntry {

    @Id
    private String date; // format: yyyy-MM-dd
    private String text;
    private String mood;

    public JournalEntry() {}

    public JournalEntry(String date, String text, String mood) {
        this.date = date;
        this.text = text;
        this.mood = mood;
    }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }
}
