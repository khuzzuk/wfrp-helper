package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.server.Command;
import org.springframework.beans.factory.InitializingBean;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;

public abstract class WebComponent extends Div implements InitializingBean {
    protected void execute(Command command) {
        getUI().ifPresent(ui -> ui.access(command));
    }

    @Override
    public void afterPropertiesSet() {
        ComponentInitialization.initializeComponents(this);
    }
}
