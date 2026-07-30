package com.sejahit.servlet;

import com.sejahit.dao.ClotheDAO;
import com.sejahit.dao.UserDAO;
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
    private UserDAO userDAO = new UserDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            List<Clothe> clothes = clotheDAO.getAllClothes();
            String json = gson.toJson(clothes);
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
            if (!isAdmin(req, resp)) {
                return;
            }

            Clothe clothe = gson.fromJson(req.getReader(), Clothe.class);
            clotheDAO.addClothe(clothe);
            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write("{\"message\": \"POST request processed successfully.\"}");
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

            // Create an error response in JSON format
            String errorJson = gson.toJson(Map.of(
                    "error", "Internal Server Error",
                    "message", e.getMessage()));

            // Write the error response
            PrintWriter out = resp.getWriter();
            out.write(errorJson);
            out.close();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            if (!isAdmin(req, resp)) {
                return;
            }

            int clotheID = getClotheID(req);
            Clothe clothe = gson.fromJson(req.getReader(), Clothe.class);
            boolean updated = clotheDAO.updateClothe(clotheID, clothe);

            resp.setStatus(updated ? HttpServletResponse.SC_OK : HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write(gson.toJson(Map.of("message", updated ? "Product updated." : "Product not found.")));
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"Invalid product ID.\"}");
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(gson.toJson(Map.of("message", e.getMessage())));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            if (!isAdmin(req, resp)) {
                return;
            }

            int clotheID = getClotheID(req);
            boolean deleted = clotheDAO.deleteClothe(clotheID);

            resp.setStatus(deleted ? HttpServletResponse.SC_OK : HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write(gson.toJson(Map.of("message", deleted ? "Product deleted." : "Product not found.")));
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"Invalid product ID.\"}");
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(gson.toJson(Map.of("message", e.getMessage())));
        }
    }

    private int getClotheID(HttpServletRequest req) {
        String pathInfo = req.getPathInfo();
        String id = pathInfo != null && pathInfo.length() > 1 ? pathInfo.substring(1) : req.getParameter("id");
        return Integer.parseInt(id);
    }

    private boolean isAdmin(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String username = req.getHeader("X-Username");

        if (username != null && userDAO.isAdmin(username)) {
            return true;
        }

        resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
        resp.getWriter().write("{\"message\": \"Admin access required.\"}");
        return false;
    }
}
