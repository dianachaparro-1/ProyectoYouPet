package edu.javeriana.youpet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.javeriana.youpet.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsername(String username);

	@Query("SELECT p FROM User p WHERE LOWER(p.username) = ?1 OR LOWER(p.email) = ?2")
	List<User> findByUsernameOrEmail(String name, String email);

}
