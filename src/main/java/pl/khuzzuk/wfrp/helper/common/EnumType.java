package pl.khuzzuk.wfrp.helper.common;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.DynamicParameterizedType;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Properties;

/**
 * enum type mapping for postgresql
 *
 * @param <T> used only for code style
 */
public class EnumType<T extends Enum<T>> implements UserType, DynamicParameterizedType {
    public static final String DEF = "pl.khuzzuk.wfrp.helper.common.EnumType";

    private Class<T> type;

    @Override
    public int[] sqlTypes() {
        return new int[]{Types.VARCHAR};
    }

    @Override
    public Class<T> returnedClass() {
        return type;
    }

    @Override
    public boolean equals(Object x, Object y) throws HibernateException {
        return x.equals(y);
    }

    @Override
    public int hashCode(Object x) throws HibernateException {
        return x.hashCode();
    }

    @Override
    public Object nullSafeGet(ResultSet rs, String[] names, SharedSessionContractImplementor session, Object owner) throws HibernateException, SQLException {
        String value = rs.getString(names[0]);
        return value != null ? Enum.valueOf(type, value) : null;
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index, SharedSessionContractImplementor session) throws HibernateException, SQLException {
        if (value == null) {
            st.setNull(index, Types.OTHER);
        } else {
            T valueToPersist = (T) value;
            st.setObject(index, valueToPersist.name(), Types.OTHER);
        }
    }

    @Override
    public Object deepCopy(Object value) throws HibernateException {
        return value;
    }

    @Override
    public boolean isMutable() {
        return false;
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

    @Override
    public void setParameterValues(Properties parameters) {
        ParameterType reader = (ParameterType) parameters.get(DynamicParameterizedType.PARAMETER_TYPE);
        type = reader.getReturnedClass();
        if (!type.isEnum()) {
            throw new IllegalArgumentException(
                    String.format("Wrong type provided for enum mapping, %s is not an enum", type));
        }
    }
}
