package com.aiwebsitebuilder.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "themes")
@Data
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String colorPalette;
}
