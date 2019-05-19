package pl.khuzzuk.wfrp.helper.common;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class StringArrayType implements UserType {
    public static final String DEF = "pl.khuzzuk.wfrp.helper.common.StringArrayType";

    @Override
    public int[] sqlTypes() {
        return new int[]{Types.ARRAY};
    }

    @Override
    public Class returnedClass() {
        return String[].class;
    }

    @Override
    public boolean equals(Object x, Object y) throws HibernateException {
        return x.equals(y);
    }

    @Override
    public int hashCode(Object x) {
        return x.hashCode();
    }

    @Override
    public Object nullSafeGet(ResultSet rs, String[] names, SharedSessionContractImplementor session, Object owner) throws SQLException {
        String string = rs.getString(names[0]);
        if (string == null || string.equals("{}")) {
            return Set.of();
        }

        String[] split = string.substring(1, string.length() - 1).split(",");
        return Arrays.stream(split)
                .map(value -> value.startsWith("\"")
                        ? value.substring(1, value.length() - 1)
                        : value)
                .collect(Collectors.toSet());
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index, SharedSessionContractImplementor session) throws SQLException {
        if (value == null) {
            st.setNull(index, Types.ARRAY);
        } else {
            Set<String> source = (Set<String>) value;
            String[] valueToPersist = source.toArray(new String[source.size()]);
            st.setObject(index, valueToPersist, Types.ARRAY);
        }
    }

    @Override
    public Object deepCopy(Object value) {
        return new HashSet<>((Set<String>) value);
    }

    @Override
    public boolean isMutable() {
        return false;
    }

    @Override
    public Serializable disassemble(Object value) {
        return (Serializable) value;
    }

    @Override
    public Object assemble(Serializable cached, Object owner) {
        return cached;
    }

    @Override
    public Object replace(Object original, Object target, Object owner) {
        return original;
    }
}
