package com.navya.portfolio.controller;

import com.navya.portfolio.model.Profile;
import com.navya.portfolio.service.AdminKeyGuard;
import com.navya.portfolio.service.PhotoService;
import com.navya.portfolio.service.ProfileService;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final PhotoService photoService;
    private final AdminKeyGuard adminKeyGuard;

    public ProfileController(ProfileService profileService, PhotoService photoService, AdminKeyGuard adminKeyGuard) {
        this.profileService = profileService;
        this.photoService = photoService;
        this.adminKeyGuard = adminKeyGuard;
    }

    @GetMapping
    public Profile getProfile() {
        return profileService.getProfile();
    }

    @GetMapping("/photo")
    public ResponseEntity<Resource> getPhoto() {
        Resource resource = photoService.getPhoto();
        MediaType type = MediaTypeFactory.getMediaType(resource).orElse(MediaType.IMAGE_JPEG);
        return ResponseEntity.ok()
                .contentType(type)
                .cacheControl(CacheControl.noCache())
                .body(resource);
    }

    @PostMapping("/photo")
    public Map<String, String> uploadPhoto(@RequestHeader(value = "X-Admin-Key", required = false) String adminKey,
                                           @RequestParam("file") MultipartFile file) throws IOException {
        adminKeyGuard.check(adminKey);
        photoService.savePhoto(file);
        return Map.of("message", "Photo updated");
    }
}
