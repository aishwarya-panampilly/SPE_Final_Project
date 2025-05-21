package com.planner.todo.service;

import com.planner.todo.model.Task;
import com.planner.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    public Task addTask(Task task) {
        return repo.save(task);
    }

    public List<Task> getIncompleteTasks() {
        return repo.findByCompleted(false);
    }

    public List<Task> getCompletedTasks() {
        return repo.findByCompleted(true);
    }

    public Task toggleTask(String id) {
        Task task = repo.findById(id).orElseThrow();
        task.setCompleted(!task.isCompleted());
        return repo.save(task);
    }

    public List<Task> getTasksWithDueDateAndNotCompleted() {
        return repo.findByDueDateNotNullAndCompletedFalse();
    }

}
