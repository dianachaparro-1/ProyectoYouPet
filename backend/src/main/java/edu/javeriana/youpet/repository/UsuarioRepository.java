package edu.javeriana.youpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.javeriana.youpet.entity.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
	
	UsuarioEntity findByUsername(String username);

}
