package edu.javeriana.youpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.javeriana.youpet.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Integer> {

}
