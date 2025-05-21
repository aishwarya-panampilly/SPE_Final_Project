package com.planner.todo.controller;

import com.planner.todo.model.Task;
import com.planner.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService service;

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return service.addTask(task);
    }

    @GetMapping("/incomplete")
    public List<Task> getIncompleteTasks() {
        return service.getIncompleteTasks();
    }

    @GetMapping("/completed")
    public List<Task> getCompletedTasks() {
        return service.getCompletedTasks();
    }

    @PutMapping("/{id}/toggle")
    public Task toggleTask(@PathVariable String id) {
        return service.toggleTask(id);

    }
    @CrossOrigin("*")
    @GetMapping("/calendar")
    public List<Task> getTasksForCalendar() {
        return service.getTasksWithDueDateAndNotCompleted();
    }

}
