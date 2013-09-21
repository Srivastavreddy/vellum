/*
 * Source https://code.google.com/p/vellum by @evanxsummers

       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements. See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.  
 */
package vellum.crypto.rsa;

import com.sun.net.ssl.internal.pkcs12.PKCS12KeyStore;
import java.io.OutputStream;
import java.util.Date;
import java.security.cert.X509Certificate;
import vellum.security.DefaultKeyStores;

/**
 * @see GeneratedRsaKeyPair
 * 
 * @author evan.summers
 */
public class PKCS12KeyStores {    
    
    public static PKCS12KeyStore generateKeyStore(String dname, int validityDays,
            X509Certificate signingCert,
            String alias, char[] password, OutputStream stream) throws Exception {
        GeneratedRsaKeyPair keyPair = new GeneratedRsaKeyPair();
        keyPair.generate(dname, new Date(), validityDays);
        keyPair.sign(DefaultKeyStores.getPrivateKey(alias), signingCert);
        PKCS12KeyStore p12KeyStore = new PKCS12KeyStore();
        X509Certificate[] chain = new X509Certificate[] {keyPair.getCert(), signingCert};
        p12KeyStore.engineSetKeyEntry(alias, keyPair.getPrivateKey(), password, chain);
        p12KeyStore.engineStore(stream, password);
        return p12KeyStore;
    }
    
}
