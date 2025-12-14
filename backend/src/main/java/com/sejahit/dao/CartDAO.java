package com.sejahit.dao;

import com.sejahit.model.Cart;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CartDAO {

    // Method to retrieve all carts
    public List<Cart> getAllCarts() throws Exception {
        List<Cart> carts = new ArrayList<>();
        String query = "SELECT * FROM public.\"Cart\"";

        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                Cart cart = new Cart();
                cart.setCartID(rs.getInt("CartID"));
                cart.setUserID(rs.getInt("ID"));
                cart.setClotheID(rs.getInt("ClotheID"));
                carts.add(cart);
            }
        }
        return carts;
    }

    // Method to add a new cart
    public void addCart(Cart cart) throws Exception {
        String query = "INSERT INTO public.\"Cart\" (\"ID\", \"ClotheID\") VALUES (?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setInt(1, cart.getUserID()); // Set UserID
            pstmt.setInt(2, cart.getClotheID()); // Set ClotheID
            pstmt.executeUpdate(); // Execute query
        }
    }

    // Method to delete a cart by CartID
    public boolean deleteCart(int cartID) throws Exception {
        String query = "DELETE FROM public.\"Cart\" WHERE \"CartID\" = ?";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setInt(1, cartID); // Set CartID
            int rowsAffected = pstmt.executeUpdate(); // Execute query
            return rowsAffected > 0; // Return true if at least one row was deleted
        }
    }
}
