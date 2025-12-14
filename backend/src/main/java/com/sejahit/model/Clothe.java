package com.sejahit.model;

public class Clothe {
    private int ClotheID;
    private String name;
    private int price;
    private String about;
    private int ImageID;
    private String type;

    // Getter for ClotheID
    public int getClotheID() {
        return ClotheID;
    }

    // Setter for ClotheID
    public void setClotheID(int clotheID) {
        this.ClotheID = clotheID;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }

    // Getter for price
    public int getPrice() {
        return price;
    }

    // Setter for price
    public void setPrice(int price) {
        this.price = price;
    }

    // Getter for about
    public String getAbout() {
        return about;
    }

    // Setter for about
    public void setAbout(String about) {
        this.about = about;
    }

    // Getter for ImageID
    public int getImageID() {
        return ImageID;
    }

    // Setter for ImageID
    public void setImageID(int imageID) {
        this.ImageID = imageID;
    }

    // Getter for type
    public String getType() {
        return type;
    }

    // Setter for type
    public void setType(String type)
    {
        this.type = type;
    }
}
