package pl.khuzzuk.wfrp.helper.common;

import java.sql.Types;
import org.hibernate.dialect.PostgreSQL95Dialect;

public class PostgresqlDialect extends PostgreSQL95Dialect {

  public PostgresqlDialect() {
    registerColumnType(Types.BLOB, "lo");
  }
}
