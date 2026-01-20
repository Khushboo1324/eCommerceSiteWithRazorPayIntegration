package com.example.e_com.util;

import java.time.LocalDateTime;

public class DateTimeUtil {
    private DateTimeUtil() {}
    public static LocalDateTime now() {
        return LocalDateTime.now();
    }
}