package com.navya.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.navya.portfolio.exception.NotFoundException;
import com.navya.portfolio.model.Profile;
import com.navya.portfolio.repository.ProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

@Service
public class ProfileService {

    private static final Logger log = LoggerFactory.getLogger(ProfileService.class);
    private static final String SEED_FILE = "profile-seed.json";

    private final ProfileRepository profileRepository;
    private final ObjectMapper objectMapper;
    private final boolean reloadOnStartup;

    public ProfileService(ProfileRepository profileRepository,
                          ObjectMapper objectMapper,
                          @Value("${portfolio.seed.reload-on-startup}") boolean reloadOnStartup) {
        this.profileRepository = profileRepository;
        this.objectMapper = objectMapper;
        this.reloadOnStartup = reloadOnStartup;
    }

    public Profile getProfile() {
        return profileRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Profile has not been created yet"));
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedProfile() throws IOException {
        if (!reloadOnStartup && profileRepository.count() > 0) {
            return;
        }
        try (InputStream in = new ClassPathResource(SEED_FILE).getInputStream()) {
            Profile seed = objectMapper.readValue(in, Profile.class);
            profileRepository.deleteAll();
            profileRepository.save(seed);
            log.info("Loaded profile for '{}' from {}", seed.name(), SEED_FILE);
        }
    }
}
