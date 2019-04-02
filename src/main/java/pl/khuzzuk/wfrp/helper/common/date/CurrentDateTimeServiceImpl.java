package pl.khuzzuk.wfrp.helper.common.date;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
class CurrentDateTimeServiceImpl implements CurrentDateTimeService {
    @Override
    public LocalDateTime now() {
        return LocalDateTime.now();
    }
}
