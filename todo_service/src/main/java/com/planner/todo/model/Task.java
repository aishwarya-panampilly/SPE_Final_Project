package com.planner.todo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    private String text;
    private String dueDate;
    private boolean completed;

    public Task() {}

    public Task(String text, String dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.completed = false;
    }

    // ✅ Getters
    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public String getDueDate() {
        return dueDate;
    }

    public boolean isCompleted() {
        return completed;
    }

    // ✅ Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
