package edu.javeriana.youpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.javeriana.youpet.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findById(int i);
	
}
