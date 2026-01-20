package com.example.e_com.util;

public class AmountUtil {
    private AmountUtil() {}
    public static int toPaise(Double amount) {
        return (int) Math.round(amount * 100);
    }
}
