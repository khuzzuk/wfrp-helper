package pl.khuzzuk.wfrp.helper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableConfigurationProperties(WfrpHelperConfig.class)
public class WfrpHelperApplication {

  public static void main(String[] args) {
    SpringApplication.run(WfrpHelperApplication.class, args);
  }
}
