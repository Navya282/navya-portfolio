package com.navya.portfolio.service;

import com.navya.portfolio.exception.BadRequestException;
import com.navya.portfolio.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.stream.Stream;

/**
 * Stores the profile photo on disk as uploads/profile.{jpg|png|webp}.
 * Uploading a new photo replaces the old one.
 * If nothing has been uploaded (e.g. on free hosting, where the disk is wiped on every restart),
 * the photo bundled in src/main/resources/photo/ is served instead.
 */
@Service
public class PhotoService {

    private static final String BASE_NAME = "profile";
    private static final Map<String, String> EXTENSIONS = Map.of(
            "image/jpeg", "jpg",
            "image/png", "png",
            "image/webp", "webp"
    );

    private final Path uploadDir;

    public PhotoService(@Value("${portfolio.upload-dir}") String uploadDir) throws IOException {
        this.uploadDir = Path.of(uploadDir).toAbsolutePath();
        Files.createDirectories(this.uploadDir);
    }

    public Resource getPhoto() {
        for (String ext : EXTENSIONS.values()) {
            Path candidate = uploadDir.resolve(BASE_NAME + "." + ext);
            if (Files.exists(candidate)) {
                return new FileSystemResource(candidate);
            }
        }
        for (String ext : EXTENSIONS.values()) {
            Resource bundled = new ClassPathResource("photo/" + BASE_NAME + "." + ext);
            if (bundled.exists()) {
                return bundled;
            }
        }
        throw new NotFoundException("No profile photo uploaded");
    }

    public void savePhoto(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Please choose an image file");
        }
        String ext = EXTENSIONS.get(file.getContentType());
        if (ext == null) {
            throw new BadRequestException("Only JPG, PNG or WEBP images are allowed");
        }

        deleteExistingPhotos();
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, uploadDir.resolve(BASE_NAME + "." + ext), StandardCopyOption.REPLACE_EXISTING);
        }
    }

    private void deleteExistingPhotos() throws IOException {
        try (Stream<Path> files = Files.list(uploadDir)) {
            for (Path p : files.filter(p -> p.getFileName().toString().startsWith(BASE_NAME + ".")).toList()) {
                Files.deleteIfExists(p);
            }
        }
    }
}
