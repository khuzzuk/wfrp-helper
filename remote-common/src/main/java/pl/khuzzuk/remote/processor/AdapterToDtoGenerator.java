package pl.khuzzuk.remote.processor;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import java.io.PrintWriter;

class AdapterToDtoGenerator extends AbstractAdapterGenerator {
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
        writer.println(getMapperDeclaration("DTOAdapter"));
        writer.println(String.format("public interface %sDTOAdapter extends Adapter<%s, %sDTO> {}",
                sourceSimpleName, sourceSimpleName, sourceSimpleName));
    }
}
