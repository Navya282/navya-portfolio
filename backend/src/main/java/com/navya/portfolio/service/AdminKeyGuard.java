package com.navya.portfolio.service;

import com.navya.portfolio.exception.UnauthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/** Simple check for owner-only actions (changing the photo, reading messages). */
@Component
public class AdminKeyGuard {

    private final String adminKey;

    public AdminKeyGuard(@Value("${portfolio.admin-key}") String adminKey) {
        this.adminKey = adminKey;
    }

    public void check(String providedKey) {
        if (providedKey == null || !providedKey.equals(adminKey)) {
            throw new UnauthorizedException("Invalid admin key");
        }
    }
}
