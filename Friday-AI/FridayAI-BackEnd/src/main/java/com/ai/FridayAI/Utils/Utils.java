package com.ai.FridayAI.Utils;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ai.FridayAI.Model.Friday;
import com.ai.FridayAI.Pojo.FridayPojo;
import com.ai.FridayAI.Repo.FridayRepo;

@Component
public class Utils {
	
	@Autowired
	Friday friday;
	
	@Autowired
	FridayRepo repo;
	
	public String utils(String value) {
		String output="";
		
		System.out.println("in utils");
		System.out.println(value);
		
		if(repo.findByQueryIgnoreCase(value).isPresent()) {
			output=repo.findByQueryIgnoreCase(value).get().getSolution();
		}
		else if(value.equalsIgnoreCase("hello") || value.equalsIgnoreCase("hi") || value.equalsIgnoreCase("hey")) {
			output=repo.findByQueryIgnoreCase("hello").get().getSolution();
		}
		else if(!repo.findOneByQueryContainingIgnoreCase(value).isEmpty()) {
			output=repo.findOneByQueryContainingIgnoreCase(value).get(0).getSolution();
		}
		else {
			
			if(!value.contains("image"))
				output=friday.chatWithFriday(value);
			else
				output=friday.generateImagesWithFriday(value);
			
//			FridayPojo pojo = new FridayPojo();
//			pojo.setQuery(value.toLowerCase());
//			pojo.setSolution(output);
//			repo.save(pojo);
		}
		
		System.out.println(output);
		
		return output;
	}
}
