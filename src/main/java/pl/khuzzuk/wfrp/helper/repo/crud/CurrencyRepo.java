package pl.khuzzuk.wfrp.helper.repo.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.money.Currency;

public interface CurrencyRepo extends JpaRepository<Currency, Long> {
}
