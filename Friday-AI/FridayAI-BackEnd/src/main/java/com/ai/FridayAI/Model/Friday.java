package com.ai.FridayAI.Model;

import java.io.*;
import java.net.*;
import org.json.*;
import org.springframework.stereotype.Component;

import java.awt.*;


@Component
public class Friday {
	
	public String chatWithFriday(String message) {
		
		System.out.println("in friday chat");
		System.out.println(message);
		
		String url = "https://api.openai.com/v1/completions";
		
		
		// https://platform.openai.com/account/api-keys
		String apiKey = "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";
		String model = "gpt-3.5-turbo";
		
		try {
			// Create HTTP POST Request
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection)obj.openConnection();
			con.setRequestMethod("POST");
			con.setRequestProperty("Authorization", "Bearer "+apiKey);
			con.setRequestProperty("Content-Type", "application/json");
			
			JSONObject data = new JSONObject();
	        data.put("model", "text-davinci-003");
	        data.put("prompt", message);
	        data.put("max_tokens", 4000);
	        data.put("temperature", 1.0);

	        con.setDoOutput(true);
	        con.getOutputStream().write(data.toString().getBytes());

	        String output = new BufferedReader(new InputStreamReader(con.getInputStream())).lines()
	                .reduce((a, b) -> a + b).get();
	        
	        String finalOutput = (new JSONObject(output).getJSONArray("choices").getJSONObject(0).getString("text"));
	        	        
			return finalOutput;
			
			}catch(Exception e) {
				System.out.println(e.getMessage());
				return "An unexpected error occuered!\nPlease try again.";
		}		
	}
	
	public String generateImagesWithFriday(String message)
	 {
		System.out.println("in friday image");
		System.out.println(message);
		
		String url = "https://api.openai.com/v1/images/generations";
		
		// https://platform.openai.com/account/api-keys
		String apiKey = "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";
		String model = "gpt-3.5-turbo";
		
		try {
			System.out.println("try");
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection)obj.openConnection();
			con.setRequestMethod("POST");
			con.setRequestProperty("Authorization", "Bearer "+apiKey);
			con.setRequestProperty("Content-Type", "application/json");

		    String requestJson = "{\"prompt\":\"" + message + "\",\"n\":" + 1 + "}";

		    con.setDoOutput(true);
	        con.getOutputStream().write(requestJson.getBytes());
	        String output = new BufferedReader(new InputStreamReader(con.getInputStream())).lines()
	              .reduce((a, b) -> a + b).get();
	        
	        String finalOutput = (new JSONObject(output).getJSONArray("data").getJSONObject(0).get("url")).toString();
	        
	        URI uri = new URI(finalOutput);
	        
	        // Desktop.getDesktop().browse(uri);
	        
		    return finalOutput;
		    
		}catch(Exception e) {
			System.out.println("catch");
			System.out.println(e);
			return "An unexpected error occured!\nPlease try again.";
		}
	 }

}
