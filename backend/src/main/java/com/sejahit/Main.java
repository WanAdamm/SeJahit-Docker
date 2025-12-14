package com.sejahit;

import com.sejahit.dao.DatabaseConnection;
import com.sejahit.dao.UserDAO;
import com.sejahit.model.User;

import java.sql.Connection;

public class Main {
    public static void main(String[] args) {
        try {
            // Test database connection
            Connection connection = DatabaseConnection.getConnection();
            if (connection != null) {
                System.out.println("Database connected successfully!");
            }

            // Initialize UserDAO for testing
            UserDAO userDAO = new UserDAO();

            
            // test adding user
            User user = new User();
            user.setName("mbv");
            user.setUsername("mbv");
            user.setPassword("admin");
            userDAO.addUser(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
