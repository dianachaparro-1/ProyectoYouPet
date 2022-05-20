package edu.javeriana.youpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.javeriana.youpet.entity.PurchasedProduct;

public interface PurchasedProductRepository extends JpaRepository<PurchasedProduct, Integer> {

}
