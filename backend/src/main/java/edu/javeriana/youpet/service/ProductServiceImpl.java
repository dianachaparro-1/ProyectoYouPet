package edu.javeriana.youpet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.javeriana.youpet.entity.Product;
import edu.javeriana.youpet.repository.ProductRepository;
import edu.javeriana.youpet.util.ObjectNotFoundException;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public Product putProduct(Product product) {
		productRepository.save(product);
		return product;
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}	

	@Override
	public void deleteProduct(Integer id) {
		Optional<Product> product = productRepository.findById(id);
		if(product.isPresent()) {
			productRepository.delete(product.get());
		} else {
			throw new ObjectNotFoundException(id);
		}
	}

	@Override
	public Optional<Product> getById(Integer id) {
		return productRepository.findById(id);
	}

	@Override
	public List<Product> findByUsername(String username) {
		return productRepository.findByUsername(username);
	}
}
