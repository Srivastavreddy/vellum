/*
 * Copyright Evan Summers
 * 
 */
package vellum.provider;

import java.io.File;
import java.io.FileInputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.security.KeyStore;
import java.security.SecureRandom;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import vellum.logger.Logr;
import vellum.logger.LogrFactory;

/**
 *
 * @author evan
 */
public class VCipherContext {
    Logr logger = LogrFactory.getLogger(getClass());
    VCipherConfig config;    
    VCipherProperties properties;    
    SecureRandom sr = new SecureRandom();
    SSLContext sslContext;
    InetSocketAddress address;
    InetAddress inetAddress;
    
    public VCipherContext() {
    }

    public void config(VCipherConfig config, VCipherProperties properties) throws Exception {
        this.config = config;        
        this.properties = properties;
        inetAddress = InetAddress.getByName(config.serverIp);
        address = new InetSocketAddress(inetAddress, config.sslPort);
        sslContext = SSLContext.getInstance("TLS");
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
        KeyStore ks = KeyStore.getInstance("JCEKS");
        File keyStoreFile = new File(config.keyStore);
        logger.info(keyStoreFile.getAbsolutePath());
        FileInputStream fis = new FileInputStream(keyStoreFile);
        ks.load(fis, properties.keyStorePassword);
        kmf.init(ks, properties.privateKeyPassword);
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
        KeyStore ts = KeyStore.getInstance("JCEKS");
        FileInputStream trustStoreStream = new FileInputStream(config.trustKeyStore);
        ts.load(trustStoreStream, properties.trustKeyStorePassword);
        tmf.init(ts);
        sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), sr);
    }
}
