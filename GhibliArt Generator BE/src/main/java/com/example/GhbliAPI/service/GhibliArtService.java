package com.example.GhbliAPI.service;

import com.example.GhbliAPI.client.StabilityAIClient;
import com.example.GhbliAPI.dto.TextToImageRequest;
import com.example.GhbliAPI.util.ByteArrayMultipartFile;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class GhibliArtService {

    private final StabilityAIClient stabilityAIClient;
    private final String apiKey;

    // This is the ONLY engine available for your API key
    private static final String ENGINE_ID = "stable-diffusion-xl-1024-v1-0";

    // SDXL requires width*height >= 262,144 and works best at 1024x1024
    private static final int TARGET_SIZE = 1024;

    public GhibliArtService(StabilityAIClient stabilityAIClient,
                             @Value("${stability.api.key}") String apiKey) {
        this.stabilityAIClient = stabilityAIClient;
        this.apiKey = apiKey;
    }

    public byte[] createGhibliArt(MultipartFile image, String prompt) throws IOException {

        String finalPrompt = prompt + ", in the beautiful, detailed anime style of studio ghibli.";
        String stylePreset = "anime";

        // Resize uploaded image to 1024x1024 so Stability AI always accepts it
        MultipartFile resizedImage = resizeImage(image);

        return stabilityAIClient.generateImageFromImage(
                "Bearer " + apiKey,
                ENGINE_ID,
                resizedImage,
                finalPrompt,
                stylePreset);
    }

    public byte[] createGhibliArtFromText(String prompt, String style) {

        String finalPrompt = prompt + ", in the beautiful, detailed anime style of studio ghibli.";
        String stylePreset = style.equals("general") ? "anime" : style.replace("_", "-");

        TextToImageRequest requestPayload = new TextToImageRequest(finalPrompt, stylePreset);

        return stabilityAIClient.generateImageFromText(
                "Bearer " + apiKey,
                ENGINE_ID,
                requestPayload);
    }

    /**
     * Resizes the uploaded image to TARGET_SIZE x TARGET_SIZE and returns it
     * as PNG bytes wrapped in a MultipartFile, ready to send to Stability AI.
     */
    private MultipartFile resizeImage(MultipartFile original) throws IOException {

        BufferedImage inputImage = ImageIO.read(new ByteArrayInputStream(original.getBytes()));

        if (inputImage == null) {
            throw new IOException("Uploaded file is not a valid image.");
        }

        BufferedImage outputImage = new BufferedImage(TARGET_SIZE, TARGET_SIZE, BufferedImage.TYPE_INT_RGB);

        Graphics2D g2d = outputImage.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g2d.drawImage(inputImage, 0, 0, TARGET_SIZE, TARGET_SIZE, null);
        g2d.dispose();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(outputImage, "png", baos);
        byte[] resizedBytes = baos.toByteArray();

        return new ByteArrayMultipartFile(
                "init_image",
                "resized-" + original.getOriginalFilename() + ".png",
                "image/png",
                resizedBytes
        );
    }
}