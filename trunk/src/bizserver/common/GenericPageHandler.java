/*
 * (c) Copyright 2010, iPay (Pty) Ltd, Evan Summers
 * Apache Software License 2.0
 * Supported by BizSwitch.net
 */
package bizserver.common;

import bizmon.util.Types;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import bizmon.exception.Exceptions;
import java.io.IOException;

/**
 *
 * @author evanx
 */
public class GenericPageHandler implements HttpHandler {

    Class type;

    public GenericPageHandler(Class type) {
        this.type = type;
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        try {
            HttpHandler handler = (HttpHandler) Types.newInstance(type);
            handler.handle(httpExchange);
        } catch (IOException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace(System.err);
            throw Exceptions.newRuntimeException(e);

        }
    }
}
