package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.server.Command;

public abstract class WebComponent extends Div {
    public void execute(Command command) {
        getUI().orElseThrow(IllegalStateException::new).access(command);
    }
}
