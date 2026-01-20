package com.example.e_com.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class RazorpayUtil {

    private RazorpayUtil() {}

    public static boolean verifySignature(String payload,
                                          String actualSignature,
                                          String secret) {
        try {
            Mac sha256 = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec =
                    new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            sha256.init(keySpec);

            byte[] hash = sha256.doFinal(payload.getBytes());
            String generatedSignature =
                    Base64.getEncoder().encodeToString(hash);

            return generatedSignature.equals(actualSignature);
        } catch (Exception e) {
            return false;
        }
    }
}
