package pl.khuzzuk.wfrp.helper.common;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.boot.model.relational.QualifiedName;
import org.hibernate.boot.model.relational.QualifiedNameParser;
import org.hibernate.dialect.Dialect;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.hibernate.id.enhanced.SequenceStyleGenerator;
import org.hibernate.internal.util.config.ConfigurationHelper;
import org.hibernate.service.ServiceRegistry;

import javax.persistence.Table;
import java.util.Properties;

@SuppressWarnings("unused") // Used by hibernate reflection
@Slf4j
public class BigSerialSequenceGenerator extends SequenceStyleGenerator {

    @Override
    protected QualifiedName determineSequenceName(Properties params, Dialect dialect, JdbcEnvironment jdbcEnv,
                                                  ServiceRegistry serviceRegistry) {
        String sequence = ConfigurationHelper.getString(TABLE, params) + "_id_seq";
        String entityClassName = ConfigurationHelper.getString(ENTITY_NAME, params);

        try {
            Class<?> entityClass = Class.forName(entityClassName);

            if (entityClass.isAnnotationPresent(Table.class)) {
                Table table = entityClass.getAnnotation(Table.class);

                if (!table.schema().isEmpty()) {
                    params.put(SCHEMA, table.schema());
                    String schema = table.schema();
                    return new QualifiedNameParser.NameParts(
                            jdbcEnv.getIdentifierHelper().toIdentifier(ConfigurationHelper.getString(CATALOG, params)),
                            jdbcEnv.getIdentifierHelper().toIdentifier(schema),
                            jdbcEnv.getIdentifierHelper().toIdentifier(sequence)
                    );
                }
            }
        } catch (ClassNotFoundException e) {
            log.error("Cannot determine schema name for sequence in {}", entityClassName);
        }

        return QualifiedNameParser.INSTANCE.parse(sequence);
    }
}
