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
import java.time.LocalDateTime;
import java.util.Set;

@SupportedAnnotationTypes({"pl.khuzzuk.remote.RemoteEntity"})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
@AutoService(Processor.class)
public class RemoteEntityProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (TypeElement annotation : annotations) {
            Set<? extends Element> elements = roundEnv.getElementsAnnotatedWith(annotation);

            for (Element element : elements) {
                long start = System.currentTimeMillis();
                System.out.println(String.format("%s\tStarting RemoteEntity process %s",
                        LocalDateTime.now(), element));

                SourceFileDescription sourceFileDescription = SourceFileDescription.create(element, processingEnv);

                JpaRepoGenerator jpaRepoGenerator = new JpaRepoGenerator(roundEnv, sourceFileDescription, processingEnv);
                jpaRepoGenerator.writeFile();

                DtoGenerator dtoGenerator = new DtoGenerator(roundEnv, sourceFileDescription, processingEnv);
                dtoGenerator.writeFile();

                AdapterToDtoGenerator adapterToDtoGenerator = new AdapterToDtoGenerator(roundEnv, sourceFileDescription, processingEnv);
                adapterToDtoGenerator.writeFile();
                AdapterToEntityGenerator adapterToEntityGenerator = new AdapterToEntityGenerator(roundEnv, sourceFileDescription, processingEnv);
                adapterToEntityGenerator.writeFile();

                RemoteServiceGenerator remoteServiceGenerator = new RemoteServiceGenerator(roundEnv, sourceFileDescription, processingEnv);
                remoteServiceGenerator.writeFile();

                System.out.println(String.format("%s\tfinished RemoteEntity, overall time: %s ms", LocalDateTime.now(), System.currentTimeMillis() - start));
            }

            return !elements.isEmpty();
        }

        return false;
    }
}
