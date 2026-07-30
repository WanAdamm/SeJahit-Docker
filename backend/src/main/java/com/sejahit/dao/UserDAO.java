package com.sejahit.dao;

import com.sejahit.model.User;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    public List<User> getAllUsers() throws Exception {
        List<User> users = new ArrayList<>();
        String query = "SELECT * FROM public.\"Users\"";

        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("ID"));
                user.setUsername(rs.getString("UserName"));
                user.setPassword(rs.getString("Password"));
                user.setName(rs.getString("Name"));
                user.setAdmin(rs.getBoolean("Admin"));
                users.add(user);
            }
        }
        return users;
    }

    public void addUser(User user) throws Exception {
        String query = "INSERT INTO public.\"Users\" (\"Username\", \"Password\", \"Name\", \"Admin\") VALUES (?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setString(1, user.getUsername());
            pstmt.setString(2, user.getPassword());
            pstmt.setString(3, user.getName());
            pstmt.setBoolean(4, user.getAdmin());
            pstmt.executeUpdate();
        }
    }

    public boolean isAdmin(String username) throws Exception {
        String query = "SELECT \"Admin\" FROM public.\"Users\" WHERE \"Username\" = ?";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setString(1, username);
            try (ResultSet rs = pstmt.executeQuery()) {
                return rs.next() && rs.getBoolean("Admin");
            }
        }
    }
}
