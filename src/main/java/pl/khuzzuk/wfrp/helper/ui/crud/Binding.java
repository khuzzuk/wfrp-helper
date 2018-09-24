package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.Component;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.lang.invoke.MethodHandle;

@Getter
@Setter
@EqualsAndHashCode(of = "name")
@RequiredArgsConstructor
public class Binding {
    private final String name;
    private MethodHandle getter;
    private MethodHandle setter;
    private Component component;
}
