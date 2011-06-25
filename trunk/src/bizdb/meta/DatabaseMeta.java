/*
 * Copyright 2011, iPay (Pty) Ltd, Evan Summers
 * Apache Software License 2.0
 * Supported by BizSwitch.net
 */
package bizdb.meta;

import common.result.RowSets;
import common.logger.Logr;
import common.logger.LogrFactory;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;

/**
 *
 * @author evanx
 */
public class DatabaseMeta {
    
    Logr logger = LogrFactory.getLogger(getClass());
    DatabaseParameters parameters;
    DatabaseMetaData metaData;
    Connection connection;
    Statement statement;

    public DatabaseMeta(DatabaseParameters parameters) {
        this.parameters = parameters;
    }

    protected void connect() throws Exception {
        connection = RowSets.getConnection(parameters.database, parameters.schema);
        metaData = connection.getMetaData();
        ResultSet schemas = metaData.getSchemas();
        ResultSetMetaData md = schemas.getMetaData();
        for (int i = 1; i <= md.getColumnCount(); i++) {
        }
        while (schemas.next()) {            
            logger.info(schemas.getString("table_schem"));
        }
        connection.close();
    }

    protected void process() throws Exception {
    }

    public static void main(String[] args) {
        try {
            DatabaseParameters parameters = new DatabaseParameters();
            new DatabaseMeta(parameters).connect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
