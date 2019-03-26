package pl.khuzzuk.remote.processor;

import javax.annotation.processing.RoundEnvironment;
import java.io.PrintWriter;

class JpaRepoGenerator extends AbstractFileGenerator {
    JpaRepoGenerator(RoundEnvironment roundEnv, SourceFileDescription sourceFileDescription) {
        super(roundEnv, sourceFileDescription);
    }

    @Override
    String getGeneratedClassName() {
        return sourceFileDescription.getPackageElement().getQualifiedName()
                + "."
                + sourceFileDescription.getElement().getSimpleName()
                + "Repo";
    }

    @Override
    void generateContent(PrintWriter writer) {
        String repoClassName = sourceFileDescription.getElement().getSimpleName() + "Repo";
        String packageName = sourceFileDescription.getPackageElement().getQualifiedName().toString();

        printPackage(writer, packageName);

        printImports(writer, "org.springframework.data.jpa.repository.JpaRepository");

        writer.println(String.format("public interface %s extends JpaRepository<%s, Long> {", repoClassName, sourceFileDescription.getElement()));
        writer.println("}");
    }
}
