package pl.khuzzuk.remote.processor;

import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.element.Element;
import java.io.PrintWriter;
import java.util.Locale;

class DtoGenerator extends AbstractFileGenerator {
    DtoGenerator(RoundEnvironment roundEnv, SourceFileDescription sourceFileDescription) {
        super(roundEnv, sourceFileDescription);
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

        writer.println(String.format("public class %sDTO {", sourceFileDescription.getElement().getSimpleName()));

        writeFields(writer);

        writer.println("}");
    }

    private void writeFields(PrintWriter writer) {
        writer.println();

        for (Element element : sourceFileDescription.getFields()) {
            String fieldName = element.getSimpleName().toString();
            String type = element.asType().toString();
            String methodSuffix = fieldName.substring(0, 1).toUpperCase(Locale.ROOT) + fieldName.substring(1);

            writer.println(String.format("private %s %s;", type, fieldName));
            writer.println();

            writer.println(String.format("public %s get%s() { return this.%s; }",
                    type, methodSuffix, fieldName));
            writer.println();

            writer.println(String.format("public void set%s(%s field) { this.%s = field; }",
                    methodSuffix, type, fieldName));
            writer.println();
        }

        writer.println();
    }
}
