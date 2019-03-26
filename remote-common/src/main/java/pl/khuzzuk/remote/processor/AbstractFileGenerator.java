package pl.khuzzuk.remote.processor;

import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import java.io.IOException;
import java.io.PrintWriter;

abstract class AbstractFileGenerator {
    RoundEnvironment roundEnv;
    SourceFileDescription sourceFileDescription;

    AbstractFileGenerator(RoundEnvironment roundEnv, SourceFileDescription sourceFileDescription) {
        this.roundEnv = roundEnv;
        this.sourceFileDescription = sourceFileDescription;
    }

    void writeFile(ProcessingEnvironment processingEnvironment) {
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
}
