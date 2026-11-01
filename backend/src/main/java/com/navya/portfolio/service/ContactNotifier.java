package com.navya.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.navya.portfolio.model.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * Emails the site owner when a contact message arrives, using the Resend email API (https://resend.com).
 * Optional: if RESEND_API_KEY or NOTIFY_EMAIL is not set, it does nothing (messages are still saved in MongoDB).
 * Sending happens in the background, so a slow or failed email never affects the visitor.
 */
@Service
public class ContactNotifier {

    private static final Logger log = LoggerFactory.getLogger(ContactNotifier.class);
    private static final URI RESEND_URL = URI.create("https://api.resend.com/emails");

    private final String apiKey;
    private final String notifyEmail;
    private final ObjectMapper objectMapper;
    private final HttpClient http = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();

    public ContactNotifier(@Value("${portfolio.notify.resend-api-key:}") String apiKey,
                           @Value("${portfolio.notify.email:}") String notifyEmail,
                           ObjectMapper objectMapper) {
        this.apiKey = apiKey;
        this.notifyEmail = notifyEmail;
        this.objectMapper = objectMapper;
    }

    public void notifyNewMessage(ContactMessage message) {
        if (apiKey.isBlank() || notifyEmail.isBlank()) {
            return;
        }
        CompletableFuture.runAsync(() -> send(message));
    }

    private void send(ContactMessage message) {
        try {
            String html = """
                    <h2>New message from your portfolio</h2>
                    <p><b>Name:</b> %s<br><b>Email:</b> %s<br><b>Subject:</b> %s</p>
                    <p style="white-space:pre-wrap">%s</p>
                    <p style="color:#888">Reply to this email to answer them directly.</p>
                    """.formatted(
                    HtmlUtils.htmlEscape(message.name()),
                    HtmlUtils.htmlEscape(message.email()),
                    HtmlUtils.htmlEscape(message.subject()),
                    HtmlUtils.htmlEscape(message.message()));

            String body = objectMapper.writeValueAsString(Map.of(
                    "from", "Portfolio <onboarding@resend.dev>",
                    "to", List.of(notifyEmail),
                    "reply_to", message.email(),
                    "subject", "Portfolio: " + message.subject() + " (from " + message.name() + ")",
                    "html", html));

            HttpRequest request = HttpRequest.newBuilder(RESEND_URL)
                    .timeout(Duration.ofSeconds(15))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = http.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 300) {
                log.warn("Contact email not sent: Resend returned {} {}", response.statusCode(), response.body());
            } else {
                log.info("Contact email sent to {}", notifyEmail);
            }
        } catch (Exception e) {
            log.warn("Contact email not sent: {}", e.getMessage());
        }
    }
}
