package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.messaging.BusPublisher;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.model.inventory.Item;
import pl.khuzzuk.wfrp.helper.model.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.inventory.weapons.ArmorBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.weapons.MeleeWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.inventory.weapons.RangedWeaponBlueprint;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.skill.Skill;
import pl.khuzzuk.wfrp.helper.repo.crud.ArmorBlueprintRepo;
import pl.khuzzuk.wfrp.helper.repo.crud.ItemRepo;
import pl.khuzzuk.wfrp.helper.repo.crud.MeleeWeaponBlueprintRepo;
import pl.khuzzuk.wfrp.helper.repo.crud.MiscItemRepo;
import pl.khuzzuk.wfrp.helper.repo.crud.ProfessionClassRepo;
import pl.khuzzuk.wfrp.helper.repo.crud.ProfessionRepo;
import pl.khuzzuk.wfrp.helper.repo.crud.RaceRepo;
import pl.khuzzuk.wfrp.helper.repo.crud.RangedWeaponBlueprintRepo;
import pl.khuzzuk.wfrp.helper.repo.crud.SkillRepo;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

@RequiredArgsConstructor
@Component
class RepoDispatcher implements InitializingBean {
    private final Bus<Event> bus;
    private final RaceRepo raceRepo;
    private final SkillRepo skillRepo;
    private final ProfessionClassRepo professionClassRepo;
    private final ProfessionRepo professionRepo;
    private final ItemRepo itemRepo;
    private final MiscItemRepo miscItemRepo;
    private final MeleeWeaponBlueprintRepo meleeWeaponBlueprintRepo;
    private final RangedWeaponBlueprintRepo rangedWeaponBlueprintRepo;
    private final ArmorBlueprintRepo armorBlueprintRepo;

    private Map<Class<?>, JpaRepository> repositories;

    @Override
    public void afterPropertiesSet() {
        repositories = new HashMap<>();
        repositories.put(Race.class, raceRepo);
        repositories.put(Skill.class, skillRepo);
        repositories.put(ProfessionClass.class, professionClassRepo);
        repositories.put(Profession.class, professionRepo);
        repositories.put(Item.class, itemRepo);
        repositories.put(MiscItem.class, miscItemRepo);
        repositories.put(MeleeWeaponBlueprint.class, meleeWeaponBlueprintRepo);
        repositories.put(RangedWeaponBlueprint.class, rangedWeaponBlueprintRepo);
        repositories.put(ArmorBlueprint.class, armorBlueprintRepo);

        bus.subscribingFor(Event.FIND_ALL).accept((Consumer<Class<?>>) this::findAll).subscribe();
        bus.subscribingFor(Event.SAVE).accept(this::save).subscribe();
        bus.subscribingFor(Event.DELETE).accept(this::remove).subscribe();
    }

    @SuppressWarnings("unchecked")
    private <T> void findAll(Class<T> type) {
        JpaRepository repository = repositories.get(type);
        if (repository == null) {
            throw new IllegalStateException(String.format("No repository defined for type %s", type));
        }

        List all = repository.findAll();
        BusPublisher<Event> message = bus.message(Event.DATA_ALL);
        BusPublisher<Event> eventBusPublisher = message.withContent(new QueryAllResult<>(type, (Collection<T>) all));
        eventBusPublisher.send();
    }

    private void save(Object entity) {
        repositories.get(entity.getClass()).save(entity);
        findAll(entity.getClass());
    }

    @SuppressWarnings("unchecked")
    private void remove(Object entity) {
        repositories.get(entity.getClass()).delete(entity);
        findAll(entity.getClass());
    }
}
