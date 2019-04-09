package pl.khuzzuk.remote.processor;

import org.apache.commons.lang3.StringUtils;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.element.AnnotationMirror;
import javax.lang.model.element.Element;
import java.io.PrintWriter;
import java.util.List;
import java.util.regex.Pattern;

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
        writeClassDeclaration(writer);

        for (Element element : sourceFileDescription.getFields()) {
            writeFields(writer, element);
        }

        writer.println();
        writer.println("}");
    }

    void writeClassDeclaration(PrintWriter writer) {
        writer.println(String.format("public class %sDTO {",
                sourceFileDescription.getElement().getSimpleName()));
        writer.println();
    }

    private void writeFields(PrintWriter writer, Element field) {

        String fieldName = field.getSimpleName().toString();
        String type = field.asType().toString();
        String methodSuffix = StringUtils.capitalize(fieldName);

        if (isEntity(field)) {
            if (type.endsWith(">")) {
                type = StringUtils.substringBeforeLast(type, ">") + "DTO>";
            } else {
                type = type + "DTO";
            }
        }

        if (type.startsWith("@")) {
            for (AnnotationMirror annotation : field.asType().getAnnotationMirrors()) {
                type = type.replaceFirst(Pattern.quote(annotation.toString()), "");
                if (type.startsWith(",")) {
                    type = type.substring(1);
                }
                type = annotation + " " + type;
            }
        }

        List<? extends AnnotationMirror> annotationMirrors = field.getAnnotationMirrors();

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
