package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.polymertemplate.EventHandler;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;

@Tag("character-sheet")
@HtmlImport("src/views/character-sheet.html")
public class CharacterSheet extends PolymerTemplate<PersonDTO> {
    public CharacterSheet() {
        setId("template");
    }

    @EventHandler
    private void onSave() {
        System.out.println(getModel());
        System.out.println(getModel().getName());
    }
}
