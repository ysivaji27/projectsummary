package com.practice.demo.project.controller;

import com.practice.demo.project.model.Activity;
import com.practice.demo.project.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api/activity")
public class ActivityController {
    @Autowired
    private ActivityService activityService;

    @GetMapping
    public List<Activity> getRecentActivity(@RequestParam Long projectId) {
        return activityService.getRecentActivitiesForProject(projectId);
    }

//    @GetMapping
//    public Page<Activity> getActivityPage(@RequestParam(defaultValue = "0") int page,
//                                          @RequestParam(defaultValue = "5") int size) {
//        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
//        return activityService.getActivityPage(pageable);
//    }

}

