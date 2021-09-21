package pl.khuzzuk.wfrp.helper.common;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.DynamicParameterizedType;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.Objects;
import java.util.Properties;
import java.util.stream.Collectors;

/**
 * Maps Set of enums in JVM to Postgresql enum[]. Set defaults to EnumSet;
 * @param <T> Retrieved from entity field by reflection, throws {@link IllegalArgumentException} when field is not Set of Enum.
 */
@SuppressWarnings("unchecked")
public class EnumSetType<T extends Enum<T>> implements UserType, DynamicParameterizedType {
    public static final String DEF = "pl.khuzzuk.wfrp.helper.common.EnumSetType";

    private Class<T> fieldType;

    @Override
    public void setParameterValues(Properties parameters) {
        String entityClass = (String) parameters.get(DynamicParameterizedType.ENTITY);
        String fieldName = (String) parameters.get(DynamicParameterizedType.PROPERTY);
        try {
            ParameterizedType genericType = (ParameterizedType) Class.forName(entityClass).getDeclaredField(fieldName).getGenericType();
            fieldType = (Class<T>) genericType.getActualTypeArguments()[0];
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            throw new IllegalArgumentException(e);
        }

        if (!fieldType.isEnum()) {
            throw new IllegalArgumentException(String.format("Wrong type provided for enum field mapping: %s should " +
                    "extend Enum.", fieldType));
        }
    }

    @Override
    public int[] sqlTypes() {
        return new int[]{Types.OTHER};
    }

    @Override
    public Class<?> returnedClass() {
        return EnumSet.class;
    }

    @Override
    public boolean equals(Object x, Object y) throws HibernateException {
        return Objects.equals(x, y);
    }

    @Override
    public int hashCode(Object x) throws HibernateException {
        return Objects.hashCode(x);
    }

    @Override
    public Object nullSafeGet(ResultSet rs, String[] names, SharedSessionContractImplementor session, Object owner)
            throws HibernateException, SQLException {
        String value = rs.getString(names[0]);
        if (value == null || "{}".equals(value)) {
            return EnumSet.noneOf(fieldType);
        }

        String[] split = value.substring(1, value.length() - 1).split(",");
        return Arrays.stream(split)
                .map(val -> Enum.valueOf(fieldType, val))
                .collect(Collectors.toCollection(() -> EnumSet.noneOf(fieldType)));
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index, SharedSessionContractImplementor session)
            throws HibernateException, SQLException {
        if (value == null) {
            st.setNull(index, Types.ARRAY);
        } else {
            EnumSet<T> enumSet = (EnumSet<T>) value;
            String sqlValue = enumSet.stream()
                    .map(Enum::name)
                    .collect(Collectors.joining(", ", "{", "}"));

            st.setObject(index, sqlValue, Types.OTHER);
        }
    }

    @Override
    public Object deepCopy(Object value) throws HibernateException {
        return EnumSet.copyOf((EnumSet<T>) value);
    }

    @Override
    public boolean isMutable() {
        return true;
    }

    @Override
    public Serializable disassemble(Object value) throws HibernateException {
        return (Serializable) value;
    }

    @Override
    public Object assemble(Serializable cached, Object owner) throws HibernateException {
        return cached;
    }

    @Override
    public Object replace(Object original, Object target, Object owner) throws HibernateException {
        return original;
    }
}
