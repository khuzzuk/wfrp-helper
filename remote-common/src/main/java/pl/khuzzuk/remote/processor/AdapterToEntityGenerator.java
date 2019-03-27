package pl.khuzzuk.remote.processor;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import java.io.PrintWriter;

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
                "pl.khuzzuk.wfrp.helper.repo.Adapter");

        String sourceSimpleName = sourceFileDescription.getElement().getSimpleName().toString();
        writer.println("@Mapper(componentModel = \"spring\")");
        writer.println(String.format("public interface %sAdapter extends Adapter<%sDTO, %s> {}",
                sourceSimpleName, sourceSimpleName, sourceSimpleName));
    }
}
