package com.practice.demo.project.repository;

import com.practice.demo.project.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserUsername(String username);

    List<Task> findByUserUsernameAndProjectId(String username, Long projectId);

}

