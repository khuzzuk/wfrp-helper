package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.model.Race;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

@Component
@UIScope
@Tag("character-sheet")
@HtmlImport("wfrp-character-sheet-style.html")
public class CharacterSheet extends WebComponent {
    @UIProperty
    private Image imageFront = new Image("images/sheet_a.png", "Character sheet");
    @UIProperty
    @CSS(classNames = "cs-text-field", id = "name")
    private TextField name = new TextField();
    @UIProperty
    @CSS(classNames = "cs-combo-box", id="race")
    private ComboBox<Race> race = new ComboBox<>();
}
