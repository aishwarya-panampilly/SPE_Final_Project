package com.planner.todo.repository;

import com.planner.todo.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByCompleted(boolean completed);
    List<Task> findByDueDateNotNullAndCompletedFalse();

}
