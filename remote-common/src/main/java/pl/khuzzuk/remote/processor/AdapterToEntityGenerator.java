package pl.khuzzuk.remote.processor;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.element.Element;
import javax.lang.model.type.TypeMirror;
import java.io.PrintWriter;
import java.util.List;
import java.util.stream.Collectors;

class AdapterToEntityGenerator extends AbstractFileGenerator {
    AdapterToEntityGenerator(RoundEnvironment roundEnv, SourceFileDescription sourceFileDescription, ProcessingEnvironment processingEnvironment) {
        super(roundEnv, sourceFileDescription, processingEnvironment);
    }

    @Override
    String getGeneratedClassName() {
        return sourceFileDescription.getPackageElement().getQualifiedName()
                + "."
                + sourceFileDescription.getElement().getSimpleName()
                + "Adapter";
    }

    @Override
    void generateContent(PrintWriter writer) {
        printPackage(writer, sourceFileDescription.getPackageElement().getQualifiedName().toString());

        printImports(writer,
                "org.mapstruct.Mapper",
                "pl.khuzzuk.wfrp.helper.repo.Adapter",
                "org.mapstruct.Mapping",
                "org.mapstruct.NullValueCheckStrategy");

        String sourceSimpleName = sourceFileDescription.getElement().getSimpleName().toString();

        writer.println(getMapperDeclaration());
        writer.println(String.format("public interface %sAdapter extends Adapter<%sDTO, %s> {",
                sourceSimpleName, sourceSimpleName, sourceSimpleName));

        if (sourceFileDescription.hasField("uuid")) {
            writer.println("@Override");
            writer.println("@Mapping(target = \"uuid\", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)");
            writer.println(String.format("%s map(%sDTO source);", sourceSimpleName, sourceSimpleName));
        }

        writer.println("}");
    }

    private String getMapperDeclaration() {
        StringBuilder mapperDeclaration = new StringBuilder("@Mapper(componentModel = \"spring\"");

        List<Element> entityWithOwnMappers = sourceFileDescription.getEntityWithOwnMappers(processingEnvironment);
        if (!entityWithOwnMappers.isEmpty()) {
            mapperDeclaration.append(", uses={\n");

            String mappersToUse = entityWithOwnMappers.stream()
                    .map(Element::asType)
                    .map(TypeMirror::toString)
                    .map(entityTypeName -> String.format("\t\t\t%sAdapter.class", entityTypeName))
                    .collect(Collectors.joining(",\n"));
            mapperDeclaration.append(mappersToUse);

            mapperDeclaration.append("\n}");
        }

        mapperDeclaration.append(")");

        return mapperDeclaration.toString();
    }
}
