package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.initialize.ComponentInitialization;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;
import pl.khuzzuk.wfrp.helper.ui.menu.RightMenu;

@Route("")
@Component
@UIScope
@HtmlImport("wfrp-helper-style.html")
@Push
@Tag("HomeView")
@RequiredArgsConstructor
public class HomeView extends WebComponent implements InitializingBean {
    @UIProperty
    private final RightMenu rightMenu;

    @UIProperty
    private final Div content;

    @Override
    public void afterPropertiesSet() {
        ComponentInitialization.initializeComponents(this);
    }
}
