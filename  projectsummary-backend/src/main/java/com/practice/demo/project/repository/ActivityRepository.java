package com.practice.demo.project.repository;

import com.practice.demo.project.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findTop10ByOrderByTimestampDesc();

    List<Activity> findTop10ByProject_IdOrderByTimestampDesc(Long projectId);
}