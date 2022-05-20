package edu.javeriana.youpet.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.javeriana.youpet.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	@Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE %?1%") 
	List<Product> findByName(String name);

	@Query("SELECT p FROM Product p WHERE LOWER(p.id) = ?1") 
	Optional<Product> findById(Integer id);

	@Query(value = "SELECT * FROM SALE INNER JOIN PURCHASED_PRODUCT ON SALE.ID = PURCHASED_PRODUCT.SALE_ID INNER JOIN PRODUCT ON PURCHASED_PRODUCT.PRODUCT_ID = PRODUCT.ID INNER JOIN USER ON SALE.USER_ID= USER.ID WHERE USER.USERNAME = ?1", nativeQuery = true)
	List<Product> findByUsername(String username);
}
