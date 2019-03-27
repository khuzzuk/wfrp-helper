package pl.khuzzuk.remote.processor;

import org.apache.commons.lang3.StringUtils;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.element.Element;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeKind;
import javax.lang.model.type.TypeMirror;
import java.io.PrintWriter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class AdapterToDtoGenerator extends AbstractFileGenerator {
    AdapterToDtoGenerator(RoundEnvironment roundEnv, SourceFileDescription sourceFileDescription, ProcessingEnvironment processingEnvironment) {
        super(roundEnv, sourceFileDescription, processingEnvironment);
    }

    @Override
    String getGeneratedClassName() {
        return sourceFileDescription.getPackageElement().getQualifiedName()
                + "."
                + sourceFileDescription.getElement().getSimpleName()
                + "DTOAdapter";
    }

    @Override
    void generateContent(PrintWriter writer) {
        printPackage(writer, sourceFileDescription.getPackageElement().getQualifiedName().toString());

        printImports(writer,
                "org.mapstruct.Mapper",
                "pl.khuzzuk.wfrp.helper.repo.Adapter");

        String sourceSimpleName = sourceFileDescription.getElement().getSimpleName().toString();

        StringBuilder mapperDeclaration = new StringBuilder("@Mapper(componentModel = \"spring\"");

        List<Element> fields = sourceFileDescription.getFields();
        if (!fields.isEmpty()) {
            mapperDeclaration.append(", uses = {");
            String usesDeclaration = fields.stream()
                    .filter(AbstractFileGenerator::isEntity)
                    .flatMap(this::maybeAddUsesDeclaration)
                    .collect(Collectors.joining(", "));
            mapperDeclaration.append(usesDeclaration)
                    .append("}");
        }

        mapperDeclaration.append(")");
        writer.println(mapperDeclaration);
        writer.println(String.format("public interface %sDTOAdapter extends Adapter<%s, %sDTO> {}",
                sourceSimpleName, sourceSimpleName, sourceSimpleName));
    }

    private Stream<String> maybeAddUsesDeclaration(Element field) {
        TypeMirror type = field.asType();
        if (type.getKind().equals(TypeKind.DECLARED)) {
            DeclaredType declaredType = (DeclaredType) type;
            return declaredType.getTypeArguments().stream()
                    .map(Object::toString)
                    .map(AdapterToDtoGenerator::typeToBeanName);
        } else {
            return Stream.of(typeToBeanName(type.toString()));
        }
    }

    private static String typeToBeanName(String type) {
        return type.contains(" ") ? StringUtils.substringAfterLast(type, " ") : type
                + "DTOAdapter.class";
    }
}
