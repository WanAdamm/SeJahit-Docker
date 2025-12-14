package com.sejahit.model;

public class Image {
    private int ImageID;
    private byte[] ImageData;

    // Getter for ImageID
    public int getImageID() {
        return ImageID;
    }

    // Setter for ImageID
    public void setImageID(int imageID) {
        this.ImageID = imageID;
    }

    // Getter for ImageData
    public byte[] getImageData() {
        return ImageData;
    }

    // Setter for ImageData
    public void setImageData(byte[] imageData) {
        this.ImageData = imageData;
    }
}
