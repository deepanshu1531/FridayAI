package com.ai.FridayAI.Pojo;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class FridayPojo {
	
	private String query;
	private String solution;
	
	public String getQuery() {
		return query;
	}
	
	public void setQuery(String query) {
		this.query = query;
	}
	
	public String getSolution() {
		return solution;
	}
	
	public void setSolution(String solution) {
		this.solution = solution;
	}
	
	
}
