package com.ai.FridayAI.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ai.FridayAI.Pojo.FridayPojo;


@Repository
public interface FridayRepo extends MongoRepository<FridayPojo, String>{

		Optional<FridayPojo> findByQueryIgnoreCase(String query);
		void deleteByQuery(String query);
		List<FridayPojo> findOneByQueryContainingIgnoreCase(String query);
}
