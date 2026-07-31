package com.sejahit.dao;

import com.sejahit.model.Clothe;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ClotheDAO {
    public List<Clothe> getAllClothes() throws Exception {
        List<Clothe> clothes = new ArrayList<>();
        String query = "SELECT * FROM public.\"Clothe\"";

        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                Clothe clothe = new Clothe();
                clothe.setClotheID(rs.getInt("ClotheID"));
                clothe.setName(rs.getString("Name"));
                clothe.setPrice(rs.getInt("Price"));
                clothe.setAbout(rs.getString("About"));
                clothe.setImageID(rs.getInt("ImageID"));
                clothe.setType(rs.getString("Type"));
                clothes.add(clothe);
            }
        }
        return clothes;
    }

    public void addClothe(Clothe clothe) throws Exception {
        String query = "INSERT INTO public.\"Clothe\" (\"Name\", \"Price\", \"About\", \"ImageID\", \"Type\") VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setString(1, clothe.getName()); // Set Name
            pstmt.setInt(2, clothe.getPrice()); // Set Price
            pstmt.setString(3, clothe.getAbout()); // Set About
            pstmt.setObject(4, clothe.getImageID() == 0 ? null : clothe.getImageID(), Types.INTEGER);
            pstmt.setString(5, clothe.getType());

            pstmt.executeUpdate(); // Execute the query
        }
    }

    public boolean updateClothe(int clotheID, Clothe clothe) throws Exception {
        String query = "UPDATE public.\"Clothe\" SET \"Name\" = ?, \"Price\" = ?, \"About\" = ?, \"ImageID\" = ?, \"Type\" = ? WHERE \"ClotheID\" = ?";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setString(1, clothe.getName());
            pstmt.setInt(2, clothe.getPrice());
            pstmt.setString(3, clothe.getAbout());
            pstmt.setObject(4, clothe.getImageID() == 0 ? null : clothe.getImageID(), Types.INTEGER);
            pstmt.setString(5, clothe.getType());
            pstmt.setInt(6, clotheID);

            return pstmt.executeUpdate() > 0;
        }
    }

    public boolean deleteClothe(int clotheID) throws Exception {
        String query = "DELETE FROM public.\"Clothe\" WHERE \"ClotheID\" = ?";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setInt(1, clotheID);
            return pstmt.executeUpdate() > 0;
        }
    }
}
