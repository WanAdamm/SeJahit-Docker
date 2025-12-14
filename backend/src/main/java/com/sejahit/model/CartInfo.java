package com.sejahit.model;

public class CartInfo {
    private int id;
    private int CartID;
    private int ClotheID;
    private String clotheName;
    private int price;
    private String about;
    
    // Getter and Setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and Setter for CartID
    public int getCartID() {
        return CartID;
    }

    public void setCartID(int cartID) {
        CartID = cartID;
    }

    // Getter and Setter for ClotheID
    public int getClotheID() {
        return ClotheID;
    }

    public void setClotheID(int clotheID) {
        ClotheID = clotheID;
    }

    // Getter and Setter for clotheName
    public String getClotheName() {
        return clotheName;
    }

    public void setClotheName(String clotheName) {
        this.clotheName = clotheName;
    }

    // Getter and Setter for price
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    // Getter and Setter for about
    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }
}
