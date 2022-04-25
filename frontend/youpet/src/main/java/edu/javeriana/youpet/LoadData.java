package edu.javeriana.youpet;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import edu.javeriana.youpet.entity.ProductoEntity;
import edu.javeriana.youpet.entity.UsuarioEntity;
import edu.javeriana.youpet.repository.ProductoRepository;
import edu.javeriana.youpet.repository.UsuarioRepository;

@Configuration
public class LoadData {
	
	
	@Bean
	CommandLineRunner initUsuarios(UsuarioRepository repository) {
		return args -> {
			repository.save(new UsuarioEntity("diana", "12345", Boolean.TRUE));
			System.out.println("Usuario creado");
		};
	}
	
	@Bean
	CommandLineRunner initDatabaseEquipos(ProductoRepository repository) {
		return args -> {
			System.out.println("Cargando Equipos en la Base de Datos");
			
			ProductoEntity producto = new ProductoEntity();
			producto.setNombre("Alimento Para Gato - Felix Fantastic Tiritas Carne");
			producto.setMarca("Felix");
			producto.setDescripcion("Tiritas con carne son Filetes suaves y jugosos de carne "
					+ "marinados en una deliciosa salsa.");
			producto.setTamaño("85gr");
			producto.setPrecio(4600.00);
			producto.setCantidadTotal(20);
			repository.save(producto);
			
			producto = null;
			producto = new ProductoEntity();
			producto.setNombre("Alimento Para Perro - Proplan Sensitive Digestion");
			producto.setMarca("Proplan");
			producto.setDescripcion("Fortalece el sistema inmune, optimiza la buena digestión y "
					+ "ayuda a mantener una piel y pelaje saludable.");
			producto.setTamaño("3,5kg");
			producto.setPrecio(168400.00);
			producto.setCantidadTotal(30);
			repository.save(producto);
			
			for (int i = 1; i <= 5 ; i++) {
				producto = null;
				producto = new ProductoEntity();
				producto.setNombre("Alimento Para Perro " + i);
				producto.setMarca("Dogchaw");
				producto.setDescripcion("Ayuda a mantener una buena digestión.");
				producto.setTamaño("4kg");
				producto.setPrecio(120400.00);
				producto.setCantidadTotal(15+i);
				repository.save(producto);
			}
			
			System.out.println("Productos cargados de manera exitosa");
			
		};
	}
	

}
