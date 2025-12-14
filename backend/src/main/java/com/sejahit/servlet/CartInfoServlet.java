package com.sejahit.servlet;

import com.sejahit.dao.CartInfoDAO;
import com.sejahit.model.CartInfo;
import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class CartInfoServlet extends HttpServlet {
    private CartInfoDAO cartInfoDAO = new CartInfoDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            List<CartInfo> cartInfoList = cartInfoDAO.getAllCartInfos();
            String json = new Gson().toJson(cartInfoList);
            PrintWriter out = resp.getWriter();
            out.write(json);
            out.close();
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
