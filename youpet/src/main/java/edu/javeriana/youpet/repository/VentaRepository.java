package edu.javeriana.youpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.javeriana.youpet.entity.UsuarioEntity;
import edu.javeriana.youpet.entity.VentaEntity;

public interface VentaRepository extends JpaRepository<VentaEntity, Long> {
	
	UsuarioEntity findByUsername(String username);

}
