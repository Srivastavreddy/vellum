/*
 * Apache Software License 2.0
 * Supported by iPay (Pty) Ltd, BizSwitch.net
 * Licensed to the Apache Software Foundation (ASF) by Evan Summers
 */

package vellum.printer;

import vellum.util.Strings;
import java.io.PrintStream;

/**
 *
 * @author evan.summers
 */
public class EscapePrinter implements Printer {
    Printer printer;

    public EscapePrinter(Printer printer) {
        this.printer = printer;
    }

    public void println() {
        printer.println();
    }

    public void println(Object object) {
        printer.println(Strings.escapeHtml(object.toString()));
    }

    public void print(Object object) {
        printer.print(Strings.escapeHtml(object.toString()));
    }

    public void printf(String format, Object... args) {
        printer.print(Strings.escapeHtml(String.format(format, args)));
    }

    public void printlnf(String format, Object... args) {
        printer.println(Strings.escapeHtml(String.format(format, args)));
    }

    public void flush() {
        printer.flush();
    }

    public void close() {
        printer.close();
    }

}