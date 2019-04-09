package pl.khuzzuk.remote.processor;

import com.google.auto.service.AutoService;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.Processor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.annotation.processing.SupportedSourceVersion;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.TypeElement;
import java.util.Optional;
import java.util.Set;

@SupportedAnnotationTypes({"pl.khuzzuk.remote.DTO", "pl.khuzzuk.remote.RemoteEntity"})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
@AutoService(Processor.class)
public class RemoteEntityProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        boolean processed = false;

        Optional<? extends TypeElement> dto = annotations.stream()
                .filter(annotation -> annotation.getQualifiedName().toString().equals("pl.khuzzuk.remote.DTO"))
                .findFirst();
        if (dto.isPresent()) {
            processed = processingDtoAnnotation(dto.get(), roundEnv);
        }

        Optional<? extends TypeElement> remoteEntity = annotations.stream()
                .filter(annotation -> annotation.getQualifiedName().toString().equals("pl.khuzzuk.remote.RemoteEntity"))
                .findFirst();

        if (remoteEntity.isPresent()) {
            processed = processRemoteEntityAnnotation(remoteEntity.get(), roundEnv) || processed;
        }

        return processed;
    }

    private boolean processingDtoAnnotation(TypeElement annotation, RoundEnvironment roundEnv) {
        Set<? extends Element> elements = roundEnv.getElementsAnnotatedWith(annotation);
        for (Element element : elements) {
            SourceFileDescription sourceFileDescription = SourceFileDescription.create(element, processingEnv);

            DtoGenerator dtoGenerator = new DtoGenerator(roundEnv, sourceFileDescription, processingEnv);
            dtoGenerator.writeFile();
        }

        return !elements.isEmpty();
    }

    private boolean processRemoteEntityAnnotation(TypeElement annotation, RoundEnvironment roundEnv) {
        Set<? extends Element> elements = roundEnv.getElementsAnnotatedWith(annotation);

        for (Element element : elements) {
            SourceFileDescription sourceFileDescription = SourceFileDescription.create(element, processingEnv);

            JpaRepoGenerator jpaRepoGenerator = new JpaRepoGenerator(roundEnv, sourceFileDescription, processingEnv);
            jpaRepoGenerator.writeFile();

            DtoEntityGenerator dtoGenerator = new DtoEntityGenerator(roundEnv, sourceFileDescription, processingEnv);
            dtoGenerator.writeFile();

            AdapterToDtoGenerator adapterToDtoGenerator = new AdapterToDtoGenerator(roundEnv, sourceFileDescription, processingEnv);
            adapterToDtoGenerator.writeFile();
            AdapterToEntityGenerator adapterToEntityGenerator  = new AdapterToEntityGenerator(roundEnv, sourceFileDescription, processingEnv);
            adapterToEntityGenerator.writeFile();

            RemoteServiceGenerator remoteServiceGenerator = new RemoteServiceGenerator(roundEnv, sourceFileDescription, processingEnv);
            remoteServiceGenerator.writeFile();
        }

        return !elements.isEmpty();
    }
}
