package pl.khuzzuk.wfrp.helper.common;

import org.hibernate.dialect.PostgreSQL95Dialect;

import java.sql.Types;

public class PostgresqlDialect extends PostgreSQL95Dialect {

  public PostgresqlDialect() {
    registerColumnType(Types.BLOB, "lo");
  }
}
