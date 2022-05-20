package edu.javeriana.youpet;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import edu.javeriana.youpet.entity.DocumentType;
import edu.javeriana.youpet.entity.Product;
import edu.javeriana.youpet.entity.PurchasedProduct;
import edu.javeriana.youpet.entity.Role;
import edu.javeriana.youpet.entity.User;
import edu.javeriana.youpet.entity.Sale;
import edu.javeriana.youpet.repository.DocumentTypeRepository;
import edu.javeriana.youpet.repository.ProductRepository;
import edu.javeriana.youpet.repository.PurchasedProductRepository;
import edu.javeriana.youpet.repository.RoleRepository;
import edu.javeriana.youpet.repository.SaleRepository;
import edu.javeriana.youpet.repository.UserRepository;

@Configuration
public class LoadData {
	
	@Bean
	CommandLineRunner initUsuarios(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder, DocumentTypeRepository documentTypeRepository, ProductRepository productRepository, SaleRepository saleRepository, PurchasedProductRepository purchasedProductRepository) {
		return args -> {

			DocumentType ccDocumentType = new DocumentType();
			ccDocumentType.setName("C.C.");
			documentTypeRepository.save(ccDocumentType);

			DocumentType ceDocumentType = new DocumentType();
			ceDocumentType.setName("C.E.");
			documentTypeRepository.save(ceDocumentType);

			DocumentType nitDocumentType = new DocumentType();
			nitDocumentType.setName("N.I.T.");
			documentTypeRepository.save(nitDocumentType);

			DocumentType passportDocumentType = new DocumentType();
			passportDocumentType.setName("PASAPORTE");
			documentTypeRepository.save(passportDocumentType);

			Role adminRole = new Role();
			adminRole.setName("ADMIN");
			roleRepository.save(adminRole);
			
			Role customerRole = new Role();
			customerRole.setName("CLIENTE");
			roleRepository.save(customerRole);

			User admin = new User();
			admin.setUsername("admin");
			admin.setPassword(bCryptPasswordEncoder.encode("12345"));
			admin.setRole(adminRole);
			admin.setDocument("90328423");
			admin.setEmail("camilad@gmail.com");
			admin.setDocumentType(ceDocumentType);
			admin.setFirstName("Camila");
			admin.setLastName("Duarte");
			userRepository.save(admin);
			
			User customer = new User();
			customer.setUsername("dianac");
			customer.setPassword(bCryptPasswordEncoder.encode("12345"));
			customer.setRole(customerRole);
			customer.setDocument("123456789");
			customer.setEmail("dianac@gmail.com");
			customer.setDocumentType(ccDocumentType);
			customer.setFirstName("Diana");
			customer.setLastName("Chaparro");
			userRepository.save(customer);

			Product product = new Product();
			product.setName("Alimento Para Gato - Felix Fantastic Tiritas Carne");
			product.setDescription("Tiritas con carne son Filetes suaves y jugosos de carne "
					+ "marinados en una deliciosa salsa.");
			product.setPrice(4600.00);
			product.setStock(20);
			product.setFreeShipping(true);
			product.setImageURL("https://d1cft8rz0k7w99.cloudfront.net/n/a/c/5/7/ac570469055cad19aeece81f240c6c9613a67612_195622_01.jpg");
			product.setTags("[Comida, Alimento, Comida para Gatos]");
			productRepository.save(product);
			Product auxProduct = product;
			
			for (int i = 1; i <= 5 ; i++) {
				product = null;
				product = new Product();
				product.setName("Alimento Para Perro " + i);
				product.setDescription("Ayuda a mantener una buena digestión.");
				product.setPrice(120400.00);
				product.setStock(15+i);
				product.setFreeShipping(false);
				product.setImageURL("https://d1cft8rz0k7w99.cloudfront.net/n/e/9/7/d/e97d353429076db2b61b99939a3322c3b1d9c0b5_2048_01.jpg");
				product.setTags("[Comida, Alimento, Comida para Perros]");
				productRepository.save(product);
			}

			Sale sale = new Sale();
			sale.setUser(customer);
			sale.setDate(new Date());
			sale.setTotalPrice(13800.00);
			saleRepository.save(sale);

			PurchasedProduct purchasedProduct = new PurchasedProduct();
			purchasedProduct.setAmount(3);
			purchasedProduct.setProduct(auxProduct);
			purchasedProduct.setSale(sale);
			purchasedProductRepository.save(purchasedProduct);

			System.out.println("Parametria inicial cargada");
		};
	}
}
