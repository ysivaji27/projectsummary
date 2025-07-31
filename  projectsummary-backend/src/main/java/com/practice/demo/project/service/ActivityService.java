package com.practice.demo.project.service;

import com.practice.demo.project.model.Activity;
import com.practice.demo.project.model.Project;
import com.practice.demo.project.model.Task;
import com.practice.demo.project.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepo;

    public void log(String message, String username, Task updatedTask) {
        Activity activity = new Activity();
        activity.setMessage(message);
        activity.setUsername(username);
        activity.setTimestamp(LocalDateTime.now());
        activity.setProject(updatedTask.getProject());
        activityRepo.save(activity);
    }

    public List<Activity> getRecentActivities() {
        return activityRepo.findTop10ByOrderByTimestampDesc();
    }

    public Page<Activity> getActivityPage(Pageable pageable) {
        return activityRepo.findAll(pageable);
    }

    public List<Activity> getRecentActivitiesForProject(Long projectId) {
        return activityRepo.findTop10ByProject_IdOrderByTimestampDesc(projectId);
    }

    public void log(String message, String username, long  projectId) {
        Activity activity = new Activity();
        activity.setMessage(message);
        activity.setUsername(username);
        Project project = new Project();
        project.setId(projectId);
        activity.setProject(project);
        activity.setTimestamp(LocalDateTime.now());
        activityRepo.save(activity);
    }
}
