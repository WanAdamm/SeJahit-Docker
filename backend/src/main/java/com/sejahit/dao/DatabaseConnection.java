package com.sejahit.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {

    private static final String URL =
        System.getenv().getOrDefault(
            "DB_URL",
            "jdbc:postgresql://db:5432/SeJahit"
        );

    private static final String USER =
        System.getenv().getOrDefault("DB_USER", "coder");

    private static final String PASSWORD =
        System.getenv().getOrDefault("DB_PASSWORD", "admin");

    public static Connection getConnection() throws Exception {
        Class.forName("org.postgresql.Driver");
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
