package com.practice.demo.project.controller;

import com.practice.demo.project.model.Project;
import com.practice.demo.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> create(@RequestBody Project project, Authentication auth) {
        Project created = projectService.createProject(project, auth.getName());
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public List<Project> getMyProjects(Authentication auth) {
        return projectService.getUserProjects(auth.getName());
    }
}

