package com.practice.demo.project.controller;

import com.practice.demo.project.model.*;
import com.practice.demo.project.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getMyTasks(@RequestParam Long projectId, Authentication authentication) {
        String username = authentication.getName();
        return taskService.getTasksForUserAndProject(username, projectId);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task,
                           @RequestParam Long projectId,
                           Authentication auth) {
        return taskService.createTask(task, auth.getName(), projectId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task updatedTask,
            Authentication authentication) {

        String username = authentication.getName();
        Task task = taskService.updateTask(id, updatedTask, username);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Deleted");
    }


}
