package com.aiwebsitebuilder.service;

import com.aiwebsitebuilder.entity.Project;
import com.aiwebsitebuilder.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<Project> getAllProjectsByUserId(Long userId) {
        return projectRepository.findByUserId(userId);
    }
    
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
}
