package com.ai.FridayAI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ai.FridayAI.Pojo.FridayPojo;
import com.ai.FridayAI.Repo.FridayRepo;
import com.ai.FridayAI.Utils.Utils;


@RestController
@RequestMapping("/friday")
@CrossOrigin(origins = "http://localhost:3000/")
public class FridayController {
	
	@Autowired
	Utils util;
	
	@Autowired
	FridayRepo repo;
		
	
	@GetMapping("/test")
	public String test() {
		System.out.println("Working");
		return "Working";
	}

	@PostMapping("/activate/{value}")
	public String activate(@PathVariable String value) {
		System.out.println("in activate");
		System.out.println(value);
		value=value.replaceAll("--","\\\\");
		value=value.replaceAll("==","/");
		System.out.println(value);
		 try {
			 String res = util.utils(value);
			 System.out.println(res);
			 return res;
		 }catch(Exception e) {
			 System.out.println(e.getMessage());
			 return "An unexpected error occuered!\nPlease try again.";
		 }
	}
	
	@PostMapping("/saveIt")
	public String feedback(@RequestBody FridayPojo pojo) {
		try {
			repo.save(pojo);
			return "Saved!!";
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return "An unexpected error occuered!\nPlease try again.";
		}
		
	}
}
