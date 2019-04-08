package pl.khuzzuk.remote.processor;

import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.PackageElement;
import javax.lang.model.element.TypeElement;
import java.util.List;
import java.util.stream.Collectors;

class SourceFileDescription {
    private Element element;
    private PackageElement packageElement;
    private List<? extends Element> members = List.of();

    static SourceFileDescription create(Element element, ProcessingEnvironment processingEnvironment) {
        SourceFileDescription sourceFileDescription = new SourceFileDescription();
        sourceFileDescription.setElement(element);
        sourceFileDescription.setPackageElement(processingEnvironment.getElementUtils().getPackageOf(element));
        sourceFileDescription.setMembers(processingEnvironment.getElementUtils().getAllMembers((TypeElement) element));

        return sourceFileDescription;
    }

    List<Element> getFields() {
        return members.stream()
                .filter(e -> ElementKind.FIELD == e.getKind())
                .collect(Collectors.toList());
    }

    public Element getElement() {
        return element;
    }

    public void setElement(Element element) {
        this.element = element;
    }

    public PackageElement getPackageElement() {
        return packageElement;
    }

    public void setPackageElement(PackageElement packageElement) {
        this.packageElement = packageElement;
    }

    public List<? extends Element> getMembers() {
        return members;
    }

    public void setMembers(List<? extends Element> members) {
        this.members = members;
    }
}
