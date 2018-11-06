package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;

@RequiredArgsConstructor
@Component
@UIScope
@Tag("gm-character-view")
public class GMCharacterView extends WebComponent implements InitializingBean {
    @Override
    public void afterPropertiesSet() {

    }
}
