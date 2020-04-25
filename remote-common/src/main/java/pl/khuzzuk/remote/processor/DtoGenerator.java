package pl.khuzzuk.remote.processor;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import pl.khuzzuk.remote.DTO;
import pl.khuzzuk.remote.common.CollectionTypeUtils;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.element.AnnotationMirror;
import javax.lang.model.element.Element;
import javax.lang.model.type.TypeMirror;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

class DtoGenerator extends AbstractFileGenerator {
    private final Set<String> excludedFields = new HashSet<>();

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
            if (element.getAnnotation(DTO.Exclude.class) != null) {
                continue;
            }

            if (!excludedFields.contains(element.getSimpleName().toString())) {
                writeField(writer, element);
            }
        }

        writer.println();
        writer.println("}");
    }

    void writeClassDeclaration(PrintWriter writer) {
        StringBuilder classDeclaration = new StringBuilder()
                .append("public class ")
                .append(sourceFileDescription.getElement().getSimpleName())
                .append("DTO");

        if (sourceFileDescription.hasField("uuid")) {
            classDeclaration.append(" extends pl.khuzzuk.remote.ListableDTO");
            excludedFields.add("uuid");
            excludedFields.add("id");
        } else if (sourceFileDescription.hasField("id")) {
            classDeclaration.append(" extends pl.khuzzuk.remote.BaseDTO");
            excludedFields.add("id");
        }

        classDeclaration.append("{");

        writer.println(classDeclaration);
        writer.println();
    }

    private void writeField(PrintWriter writer, Element field) {

        String fieldName = field.getSimpleName().toString();
        String type = field.asType().toString();
        String methodSuffix = StringUtils.capitalize(fieldName);

        if (CollectionTypeUtils.isMap(field)) {
            Pair<TypeMirror, TypeMirror> mapTypes = CollectionTypeUtils.extractTypesFromMap(field, processingEnvironment);
            String keyType = mapTypes.getKey().toString();
            String valueType = mapTypes.getValue().toString();
            if (isEntity(processingEnvironment.getTypeUtils().asElement(mapTypes.getKey()))) {
                keyType = keyType + "DTO";
            }
            if (isEntity(processingEnvironment.getTypeUtils().asElement(mapTypes.getValue()))) {
                valueType = valueType + "DTO";
            }

            type = "java.util.Map<" + keyType + ", " + valueType + ">";
        } else if (CollectionTypeUtils.isFieldCollection(field)) {
            Element collectionType = CollectionTypeUtils.getTypeFromCollectionField(field, processingEnvironment);
            if (isEntity(collectionType)) {
                type = StringUtils.substringBeforeLast(type, ">") + "DTO>";
            }
        } else if (isEntity(field)) {
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
