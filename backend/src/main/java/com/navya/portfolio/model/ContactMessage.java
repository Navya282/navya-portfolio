package com.navya.portfolio.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "contact_messages")
public record ContactMessage(
        @Id String id,
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email String email,
        @NotBlank @Size(max = 150) String subject,
        @NotBlank @Size(max = 2000) String message,
        Instant receivedAt
) {}
