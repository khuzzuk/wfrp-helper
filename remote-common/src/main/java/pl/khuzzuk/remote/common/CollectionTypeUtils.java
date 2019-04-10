package pl.khuzzuk.remote.common;

import org.apache.commons.lang3.StringUtils;

import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.Element;
import java.util.Set;

public class CollectionTypeUtils {
    private static final Set<String> COLLECTION_TYPE_NAMES = Set.of(
            "java.util.Collection",
            "java.util.List",
            "java.util.Set",
            "java.util.Queue"
    );

    public static boolean isFieldCollection(Element field) {
        String fieldTypeDeclaration = field.asType().toString();
        return COLLECTION_TYPE_NAMES.stream().anyMatch(fieldTypeDeclaration::contains);
    }

    public static Element getTypeFromCollectionField(Element field, ProcessingEnvironment processingEnvironment) {
        String typeText = field.asType().toString();
        typeText = StringUtils.substringAfterLast(typeText.replaceAll(">", ""), "<");

        return processingEnvironment.getElementUtils().getTypeElement(typeText);
    }
}
