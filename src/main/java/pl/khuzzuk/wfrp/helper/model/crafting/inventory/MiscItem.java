package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class MiscItem extends Item {
}
