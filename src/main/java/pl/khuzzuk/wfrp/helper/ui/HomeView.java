package pl.khuzzuk.wfrp.helper.ui;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;
import pl.khuzzuk.wfrp.helper.ui.menu.RightMenu;
import pl.khuzzuk.wfrp.helper.ui.menu.TopMenu;

@Route("")
@Component
@UIScope
@HtmlImport("wfrp-helper-style.html")
@HtmlImport("grid-style.html")
@HtmlImport("text-field-style.html")
@Push
@Tag("HomeView")
@RequiredArgsConstructor
public class HomeView extends WebComponent implements InitializingBean {
    @UIProperty
    private final TopMenu topMenu;

    private final RightMenu rightMenu;
    private final MainContent content;
    @UIProperty
    @CSS(classNames = {"right-menu-content"})
    private FlexLayout rightContentLayout = new FlexLayout();

    @Override
    public void afterPropertiesSet() {
        rightContentLayout.add(rightMenu, content);
    }
}
