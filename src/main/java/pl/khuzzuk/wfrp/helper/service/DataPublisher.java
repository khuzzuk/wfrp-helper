package pl.khuzzuk.wfrp.helper.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DataPublisher {
  private final SimpMessagingTemplate simpMessagingTemplate;

  @Scheduled(cron = "*/5 * * * * *")
  void send() {
    simpMessagingTemplate.convertAndSend("/topic/data", "Hello world");
  }
}
