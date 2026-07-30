package com.sejahit.dao;

import com.sejahit.model.CartInfo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CartInfoDAO {

    // Method to retrieve all carts
    public List<CartInfo> getAllCartInfos() throws Exception {
        List<CartInfo> cartInfos = new ArrayList<>();
        String query =
        "SELECT " +
        "    u.\"ID\"        AS \"UserID\", " +
        "    c.\"CartID\"    AS \"CartID\", " +
        "    c.\"ClotheID\"  AS \"ClotheID\", " +
        "    cl.\"ImageID\"  AS \"ImageID\", " +
        "    cl.\"Name\"     AS \"ClotheName\", " +
        "    cl.\"Price\"    AS \"Price\", " +
        "    cl.\"About\"    AS \"About\", " +
        "    i.\"ImagePath\" AS \"ImagePath\" " +
        "FROM public.\"Cart\" c " +
        "LEFT JOIN public.\"Users\" u " +
        "       ON u.\"ID\" = c.\"ID\" " +
        "JOIN public.\"Clothe\" cl " +
        "     ON c.\"ClotheID\" = cl.\"ClotheID\" " +
        "LEFT JOIN public.\"Image\" i " +
        "       ON i.\"ImageID\" = cl.\"ImageID\";";

        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                CartInfo cartInfo = new CartInfo();
                cartInfo.setId(rs.getInt("UserID"));
                cartInfo.setCartID(rs.getInt("CartID"));
                cartInfo.setClotheID(rs.getInt("ClotheID"));
                cartInfo.setImageID(rs.getInt("ImageID"));
                cartInfo.setClotheName(rs.getString("ClotheName"));
                cartInfo.setImagePath(rs.getString("ImagePath"));
                cartInfo.setPrice(rs.getInt("Price"));
                cartInfo.setAbout(rs.getString("About"));
                cartInfos.add(cartInfo);
            }

        }
        return cartInfos;
    }
}
