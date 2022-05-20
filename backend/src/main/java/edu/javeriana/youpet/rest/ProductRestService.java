package edu.javeriana.youpet.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.javeriana.youpet.entity.Product;
import edu.javeriana.youpet.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductRestService {

	@Autowired
	private ProductService productService;

	@PutMapping(value = "/put")
	public Product putProduct(@RequestBody Product product) {
		return productService.putProduct(product);
	}

	@GetMapping(value = "/getAll", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

	@DeleteMapping(value = "/delete/{id}")
	public void deleteProduct(@PathVariable Integer id) {
		productService.deleteProduct(id);
	}

	@GetMapping(value = "/getId/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public Optional<Product> getById(@PathVariable Integer id) {
		return productService.getById(id);
	}

	@GetMapping(value = "/getUsername/{username}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<Product> findByUsername(@PathVariable String username) {
		return productService.findByUsername(username);
	}
}
