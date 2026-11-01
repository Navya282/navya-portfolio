package com.navya.portfolio.controller;

import com.navya.portfolio.model.ContactMessage;
import com.navya.portfolio.repository.ContactMessageRepository;
import com.navya.portfolio.service.AdminKeyGuard;
import com.navya.portfolio.service.ContactNotifier;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;
    private final AdminKeyGuard adminKeyGuard;
    private final ContactNotifier contactNotifier;

    public ContactController(ContactMessageRepository contactMessageRepository, AdminKeyGuard adminKeyGuard,
                             ContactNotifier contactNotifier) {
        this.contactMessageRepository = contactMessageRepository;
        this.adminKeyGuard = adminKeyGuard;
        this.contactNotifier = contactNotifier;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> sendMessage(@Valid @RequestBody ContactMessage request) {
        ContactMessage saved = contactMessageRepository.save(new ContactMessage(
                null, request.name().trim(), request.email().trim(), request.subject().trim(),
                request.message().trim(), Instant.now()));
        // Optional email alert to the site owner (does nothing unless RESEND_API_KEY and NOTIFY_EMAIL are set)
        contactNotifier.notifyNewMessage(saved);
        return Map.of("message", "Thanks! Your message has been received.");
    }

    @GetMapping
    public List<ContactMessage> listMessages(@RequestHeader(value = "X-Admin-Key", required = false) String adminKey) {
        adminKeyGuard.check(adminKey);
        return contactMessageRepository.findAllByOrderByReceivedAtDesc();
    }
}
