package pl.khuzzuk.remote.processor;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeKind;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Set;

abstract class AbstractFileGenerator {
    private static final Set<String> DEFAULT_TYPES = Set.of(
            "int", "java.lang.Integer",
            "long", "java.lang.Long",
            "float", "java.lang.Float",
            "double", "java.lang.Double",
            "boolean", "java.lang.Boolean",
            "java.lang.String",
            "java.util.Date", "java.sql.Date", "java.sql.Timestamp", "java.sql.Time"
    );

    RoundEnvironment roundEnv;
    SourceFileDescription sourceFileDescription;
    ProcessingEnvironment processingEnvironment;

    AbstractFileGenerator(RoundEnvironment roundEnv, SourceFileDescription sourceFileDescription, ProcessingEnvironment processingEnvironment) {
        this.roundEnv = roundEnv;
        this.sourceFileDescription = sourceFileDescription;
        this.processingEnvironment = processingEnvironment;
    }

    void writeFile() {
        try (PrintWriter writer = new PrintWriter(processingEnvironment.getFiler()
                .createSourceFile(getGeneratedClassName()).openWriter())) {
            generateContent(writer);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    abstract String getGeneratedClassName();

    abstract void generateContent(PrintWriter printWriter);

    void printPackage(PrintWriter printWriter, String packageName) {
        printWriter.println(String.format("package %s;", packageName));
        printWriter.println();
    }

    void printImports(PrintWriter printWriter, String... imports) {
        for (String importPackage : imports) {
            printWriter.println(String.format("import %s;", importPackage));
        }
        printWriter.println();
    }

    static boolean isEntity(Element field) {
        if (field.asType().getKind().equals(TypeKind.DECLARED)) {
            DeclaredType type = (DeclaredType) field.asType();
            if (type.asElement().getKind().equals(ElementKind.ENUM)) {
                return false;
            }
        }

        String fieldType = field.asType().toString();
        return DEFAULT_TYPES.stream().noneMatch(fieldType::endsWith);
    }
}
