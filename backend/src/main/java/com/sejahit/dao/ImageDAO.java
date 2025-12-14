package com.sejahit.dao;

import com.sejahit.model.Image;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ImageDAO {
    public List<Image> getAllImages() throws Exception {
        List<Image> images = new ArrayList<>();
        String query = "SELECT * FROM public.\"Image\"";

        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                Image image = new Image();
                image.setImageID(rs.getInt("ImageID"));
                image.setImageData(rs.getBytes("ImageData"));
                images.add(image);
            }
        }
        return images;
    }

    public void addImage(Image image) throws Exception {
        String query = "INSERT INTO public.\"Image\" (\"ImageData\") VALUES (?)";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setBytes(1, image.getImageData());
            pstmt.executeUpdate();
        }
    }
}
