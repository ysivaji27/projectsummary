package  com.practice.demo.project.service;

import com.practice.demo.project.model.Task;
import com.practice.demo.project.model.User;
import com.practice.demo.project.repository.ProjectRepository;
import com.practice.demo.project.repository.TaskRepository;
import com.practice.demo.project.repository.UserRepository;
import com.practice.demo.project.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private ActivityService activityService;

    public List<Task> getTasksForUser(String username) {
        return taskRepo.findByUserUsername(username);
    }

    public Task createTask(Task task, String username, Long projectId) {

        activityService.log("Created task: " + task.getTitle(), username, projectId);

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        task.setUser(user);
        task.setProject(project);
        return taskRepo.save(task);
    }

    public Task updateTask(Long id, Task updatedTask, String username) {
       activityService.log("Updated task: " + updatedTask.getTitle(), username,updatedTask);

        Task existingTask = taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Ensure task belongs to logged-in user
        if (!existingTask.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Not authorized to update this task");
        }

        // Update fields
        if (updatedTask.getTitle() != null) {
            existingTask.setTitle(updatedTask.getTitle());
        }
        if (updatedTask.getDescription() != null) {
            existingTask.setDescription(updatedTask.getDescription());
        }
        if (updatedTask.getStatus() != null) {
            existingTask.setStatus(updatedTask.getStatus());
        }
        if (updatedTask.getPriority() != null) {
            existingTask.setPriority(updatedTask.getPriority());
        }
        if (updatedTask.getDueDate() != null) {
            existingTask.setDueDate(updatedTask.getDueDate());
        }

        return taskRepo.save(existingTask);
    }


    public void deleteTask(Long id) {
        Optional<Task> taskOpt =  taskRepo.findById(id);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            String username = task.getUser() != null ? task.getUser().getUsername() : "unknown";
           activityService.log("Deleted task: " + task.getTitle(), username, task);
        }
        taskRepo.deleteById(id);
    }

    public List<Task> getTasksForUserAndProject(String username, Long projectId) {
        return taskRepo.findByUserUsernameAndProjectId(username, projectId);
    }

}
