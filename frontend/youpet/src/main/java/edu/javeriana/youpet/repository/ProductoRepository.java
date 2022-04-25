package edu.javeriana.youpet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.javeriana.youpet.entity.ProductoEntity;

public interface ProductoRepository extends JpaRepository<ProductoEntity, Long> {
	
	@Query("SELECT p FROM ProductoEntity p WHERE LOWER(p.nombre) LIKE %?1%") 
	List<ProductoEntity> findByNombre(String nombre);
	
	@Query("SELECT p FROM ProductoEntity p WHERE LOWER(p.marca) LIKE %?1%") 
	List<ProductoEntity> findByMarca(String marca);

}
