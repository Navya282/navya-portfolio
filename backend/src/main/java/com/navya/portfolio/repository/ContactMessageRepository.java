package com.navya.portfolio.repository;

import com.navya.portfolio.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {

    List<ContactMessage> findAllByOrderByReceivedAtDesc();
}
