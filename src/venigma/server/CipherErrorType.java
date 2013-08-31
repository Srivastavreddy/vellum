/*
 * Licensed to the Apache Software Foundation (ASF) by Evan Summers
 * 
 */
package venigma.server;

/**
 *
 * @author evan
 */
public enum CipherErrorType {
    CERT,
    SUBJECT,
    AUTH,
    NOT_PROVIDER,
    NOT_USER,
    NOT_ADMIN,
    NOT_STARTED,
    USER_NOT_FOUND;
    
}