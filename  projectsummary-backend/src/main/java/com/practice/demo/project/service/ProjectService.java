package com.practice.demo.project.service;

import com.practice.demo.project.model.Project;
import com.practice.demo.project.model.User;
import com.practice.demo.project.repository.ProjectRepository;
import com.practice.demo.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private UserRepository userRepo;

    public Project createProject(Project project, String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        project.setOwner(user);
        return projectRepo.save(project);
    }

    public List<Project> getUserProjects(String username) {
        return projectRepo.findByOwnerUsername(username);
    }
}
