package com.sejahit.model;

public class Cart {
    private int CartID;
    private int UserID;
    private int ClotheID;

    // Getter for CartID
    public int getCartID() {
        return CartID;
    }

    // Setter for CartID
    public void setCartID(int cartID) {
        this.CartID = cartID;
    }

    // Getter for UserID
    public int getUserID() {
        return UserID;
    }

    // Setter for UserID
    public void setUserID(int userID) {
        this.UserID = userID;
    }

    // Getter for ClotheID
    public int getClotheID() {
        return ClotheID;
    }

    // Setter for ClotheID
    public void setClotheID(int clotheID) {
        this.ClotheID = clotheID;
    }
}
