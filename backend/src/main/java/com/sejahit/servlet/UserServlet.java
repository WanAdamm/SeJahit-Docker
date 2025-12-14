package com.sejahit.servlet;

import com.sejahit.dao.UserDAO;
import com.sejahit.model.User;
import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

public class UserServlet extends HttpServlet {
    private UserDAO userDAO = new UserDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            List<User> users = userDAO.getAllUsers();
            String json = new Gson().toJson(users);
            PrintWriter out = resp.getWriter();
            out.write(json);
            out.close();
        } catch (Exception e) {
            // Set the status to 500 (Internal Server Error)
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

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            User user = new Gson().fromJson(req.getReader(), User.class);
            userDAO.addUser(user);
            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write("{\"message\": \"POST request processed successfully.\"}");
        } catch (Exception e) {
            // Set the status to 500 (Internal Server Error)
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
