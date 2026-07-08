package com.aiwebsitebuilder.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "websites")
@Data
public class Website {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String domain;
    private String htmlContent;
}
