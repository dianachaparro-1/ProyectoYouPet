package edu.javeriana.youpet.service;

import java.util.List;
import java.util.Optional;

import edu.javeriana.youpet.entity.Product;

public interface ProductService {
	public Product putProduct(Product product);

	public List<Product> getAllProducts();

	public void deleteProduct(Integer id);

    public Optional<Product> getById(Integer id);

	public List<Product> findByUsername(String username);
}
