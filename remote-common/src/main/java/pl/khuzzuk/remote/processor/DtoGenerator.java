package pl.khuzzuk.remote.processor;

import org.apache.commons.lang3.StringUtils;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.element.Element;
import javax.lang.model.type.TypeKind;
import javax.lang.model.type.TypeMirror;
import java.io.PrintWriter;
import java.util.List;

class DtoGenerator extends AbstractFileGenerator {
    DtoGenerator(RoundEnvironment roundEnv, SourceFileDescription sourceFileDescription, ProcessingEnvironment processingEnvironment) {
        super(roundEnv, sourceFileDescription, processingEnvironment);
    }

    @Override
    String getGeneratedClassName() {
        return sourceFileDescription.getPackageElement().getQualifiedName()
                + "."
                + sourceFileDescription.getElement().getSimpleName()
                + "DTO";
    }

    @Override
    void generateContent(PrintWriter writer) {
        printPackage(writer, sourceFileDescription.getPackageElement().getQualifiedName().toString());

        String extender = "pl.khuzzuk.remote.BaseDTO";
        List<? extends TypeMirror> directSupertypes = processingEnvironment.getTypeUtils().directSupertypes(sourceFileDescription.getElement().asType());
        if (directSupertypes.stream().anyMatch(t -> t.toString().endsWith("ListableEntity"))) {
            extender = "pl.khuzzuk.remote.ListableDTO";
        }

        writer.println(String.format("public class %sDTO extends %s {",
                sourceFileDescription.getElement().getSimpleName(), extender));
        writer.println();

        for (Element element : sourceFileDescription.getFields()) {
            writeFields(writer, element);
        }

        writer.println();
        writer.println("}");
    }

    private void writeFields(PrintWriter writer, Element field) {

        String fieldName = field.getSimpleName().toString();
        String type = field.asType().toString();
        String methodSuffix = StringUtils.capitalize(fieldName);

        if (isEntity(field)) {
            if (field.asType().getKind().equals(TypeKind.DECLARED)) {
                type = StringUtils.substringBeforeLast(type, ">") + "DTO>";
            } else {
                type = type + "DTO";
            }
        }

        writer.println(String.format("private %s %s;", type, fieldName));
        writer.println();

        writer.println(String.format("public %s get%s() { return this.%s; }",
                type, methodSuffix, fieldName));
        writer.println();

        writer.println(String.format("public void set%s(%s field) { this.%s = field; }",
                methodSuffix, type, fieldName));
        writer.println();

    }
}
