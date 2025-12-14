package com.sejahit.servlet;

import com.sejahit.dao.ClotheDAO;
import com.sejahit.model.Clothe;
import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

public class ClotheServlet extends HttpServlet {
    private ClotheDAO clotheDAO = new ClotheDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            List<Clothe> clothes = clotheDAO.getAllClothes();
            String json = new Gson().toJson(clothes);
            PrintWriter out = resp.getWriter();
            out.write(json);
            out.close();
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            Clothe clothe = new Gson().fromJson(req.getReader(), Clothe.class);
            clotheDAO.addClothe(clothe);
            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write("{\"message\": \"POST request processed successfully.\"}");
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

            // Create an error response in JSON format
            String errorJson = new Gson().toJson(Map.of(
                    "error", "Internal Server Error",
                    "message", e.getMessage()));

            // Write the error response
            PrintWriter out = resp.getWriter();
            out.write(errorJson);
            out.close();
        }
    }
}
