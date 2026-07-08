package com.aiwebsitebuilder.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "prompts")
@Data
public class Prompt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
}
