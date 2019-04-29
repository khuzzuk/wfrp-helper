package pl.khuzzuk.wfrp.helper.model.rule;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.EnumSet;
import java.util.Set;

public enum Placement {
    BODY,
    HEAD,
    TORSO,
    HAND,
    LEG,
    BELT,
    NECK,
    FINGER,
    SHIELD,
    BOTH_HANDS;

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.FIELD)
    @Constraint(validatedBy = Validator.class)
    public @interface PlacementValues {
        Placement[] value() default {};
        String message() default "Wrong placement value";
        Class<?>[] groups() default {};
        Class<? extends Payload>[] payload() default {};
    }

    public static class Validator implements ConstraintValidator<PlacementValues, Object> {
        private EnumSet<Placement> values;

        @Override
        public void initialize(PlacementValues constraintAnnotation) {
            Set<Placement> value = Set.of(constraintAnnotation.value());
            values = EnumSet.noneOf(Placement.class);
            values.addAll(value);
        }

        @Override
        public boolean isValid(Object value, ConstraintValidatorContext context) {
            return values.contains(value);
        }
    }
}
