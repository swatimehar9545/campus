package com.aiwebsitebuilder.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "generated_code")
@Data
public class GeneratedCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(columnDefinition = "TEXT")
    private String sourceCode;
}
