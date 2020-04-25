package pl.khuzzuk.remote.common;

import java.util.Set;
import javax.lang.model.element.Element;

public class TypeUtils {

  private static Set<String> LANG_TYPES = Set.of(Integer.class.getCanonicalName(),
                                                 Long.class.getCanonicalName(),
                                                 Short.class.getCanonicalName(),
                                                 Byte.class.getCanonicalName(),
                                                 Float.class.getCanonicalName(),
                                                 Double.class.getCanonicalName(),
                                                 String.class.getCanonicalName(),
                                                 Integer[].class.getCanonicalName(),
                                                 Long[].class.getCanonicalName(),
                                                 Short[].class.getCanonicalName(),
                                                 Byte[].class.getCanonicalName(),
                                                 Float[].class.getCanonicalName(),
                                                 Double[].class.getCanonicalName(),
                                                 String[].class.getCanonicalName());

  public static boolean isJavaLangType(Element field) {
    String fieldTypeDeclaration = field.asType().toString();
    return LANG_TYPES.stream().anyMatch(fieldTypeDeclaration::endsWith);
  }
}
