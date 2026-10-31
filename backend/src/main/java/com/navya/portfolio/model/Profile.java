package com.navya.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Everything shown on the portfolio, stored as a single MongoDB document.
 * Initial content comes from resources/profile-seed.json.
 */
@Document(collection = "profile")
public record Profile(
        @Id String id,
        String name,
        String title,
        String tagline,
        String summary,
        Contact contact,
        List<JourneyStep> journey,
        List<SkillGroup> skillGroups,
        Experience experience,
        List<Project> projects,
        List<Education> education,
        List<String> achievements
) {

    public record Contact(
            String email,
            String phone,
            String location,
            String linkedin,
            String github,
            String instagram,
            String youtube,
            String facebook
    ) {}

    public record JourneyStep(String period, String title, String place, String description) {}

    /** level: "confident", "working" or "learning". learnedAt: where the skill was picked up. */
    public record Skill(String name, String level, String learnedAt) {}

    public record SkillGroup(String name, List<Skill> skills) {}

    public record Experience(
            String company,
            String role,
            String startDate,
            String companyType,
            String summary,
            List<String> stack,
            List<Contribution> contributions
    ) {}

    /** visual: optional hint for the frontend to render a small illustration ("charts", "result-table"). */
    public record Contribution(
            String title,
            String category,
            String description,
            String highlight,
            List<String> tools,
            String visual
    ) {}

    public record Project(String name, String description, List<String> points, List<String> tech, String link) {}

    public record Education(String institution, String degree, String score, String year) {}
}
