package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import pl.javahello.RemoteEntity;

import javax.persistence.Entity;
import pl.javahello.RemoteEntity.SecuredService;

@Entity
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class MiscItem extends Item {
}
