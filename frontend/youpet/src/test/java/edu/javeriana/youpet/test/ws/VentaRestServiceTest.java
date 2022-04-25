package edu.javeriana.youpet.test.ws;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.TestPropertySource;

import edu.javeriana.youpet.YouPetApplication;
import edu.javeriana.youpet.domain.CarritoDTO;
import edu.javeriana.youpet.domain.DetalleDTO;
import edu.javeriana.youpet.domain.ProductoDTO;
import edu.javeriana.youpet.domain.VentaDTO;
import edu.javeriana.youpet.entity.ProductoEntity;
import edu.javeriana.youpet.entity.UsuarioEntity;
import edu.javeriana.youpet.repository.ProductoRepository;
import edu.javeriana.youpet.repository.UsuarioRepository;
import edu.javeriana.youpet.service.VentaServiceImpl;
import io.restassured.RestAssured;

@SpringBootTest(classes = {YouPetApplication.class}, webEnvironment = WebEnvironment.DEFINED_PORT)
@TestPropertySource("classpath:test.properties")
public class VentaRestServiceTest {
	
	private final String VENTA_SERVICE = "/venta";
	
	@Value("${ws.url}")
	private String urlMain;
	
	@Value("${authentication.basic.username}")
	private String username;
	
	@Value("${authentication.basic.password}")
	private String password;
	
	@Value("${test.marca.1}")
	private String marca1;
	
	@Value("${test.nombre.1}")
	private String nombre1;
	
	@Autowired
	private ProductoRepository productoRep;
	
	@Autowired
	private UsuarioRepository usuarioRep;
	
	@Autowired
	private VentaServiceImpl ventaImpl;
	
	@Test
	public void getProductosTest(){
		RestAssured
			.given()
			.log()
			.all()
			.contentType("application/json")
			.and()
			.when()
			.get(this.urlMain + VENTA_SERVICE + "/productos")
			.then()
			.log()
			.all()
			.statusCode(HttpStatus.OK.value());
	}
	
	@Test
	public void filtrarProductosPorNombreTest(){
		RestAssured
			.given()
			.log()
			.all()
			.contentType("application/json")
			.and()
			.pathParam("nombre", nombre1)
			.when()
			.get(this.urlMain + VENTA_SERVICE + "/filtrar/nombre/{nombre}")
			.then()
			.log()
			.all()
			.statusCode(HttpStatus.OK.value());
	}
	
	@Test
	public void filtrarProductosPorMarcaTest(){
		RestAssured
			.given()
			.log()
			.all()
			.contentType("application/json")
			.and()
			.pathParam("marca", marca1)
			.when()
			.get(this.urlMain + VENTA_SERVICE + "/filtrar/marca/{marca}")
			.then()
			.log()
			.all()
			.statusCode(HttpStatus.OK.value());
	}
	
	@Test
	public void calcularSubTotalTest(){
		
		CarritoDTO carrito = crearCarrito();
		
		RestAssured
			.given()
			.log()
			.all()
			.contentType("application/json")
			.and()
			.body(carrito)
			.when()
			.get(this.urlMain + VENTA_SERVICE + "/calcular/subtotal")
			.then()
			.log()
			.all()
			.statusCode(HttpStatus.OK.value());
	}
	
	@Test
	public void crearVentaTest(){
		
		CarritoDTO carrito = crearCarrito();
		
		VentaDTO venta = new VentaDTO(carrito, 1, carrito.getSubTotal());
		
		RestAssured
			.given()
			.log()
			.all()
			.contentType("application/json")
			.and()
			.body(venta)
			.when()
			.post(this.urlMain + VENTA_SERVICE + "/crear")
			.then()
			.log()
			.all()
			.statusCode(HttpStatus.OK.value());
	}
	
	@Test
	public void getVentasTest(){
		
		crearVentaTest();
		
		RestAssured
			.given()
			.log()
			.all()
			.contentType("application/json")
			.and()
			.when()
			.get(this.urlMain + VENTA_SERVICE + "/ventasRegistradas")
			.then()
			.log()
			.all()
			.statusCode(HttpStatus.OK.value());
	}
	
	@Test
	public void borrarProductoTest(){
		RestAssured
			.given()
			.log()
			.all()
			.contentType("application/json")
			.and()
			.pathParam("id", 8)
			.when()
			.delete(this.urlMain + VENTA_SERVICE + "/eliminar/producto/{id}")
			.then()
			.log()
			.all()
			.statusCode(HttpStatus.OK.value());
		
		getProductosTest();
	}
	
	public CarritoDTO crearCarrito(){
		
		CarritoDTO carrito = new CarritoDTO();
		
		UsuarioEntity usuarioEntity = usuarioRep.findByUsername(username);
		
		String usuario = usuarioEntity.getUsername();
		
		List<ProductoEntity> product = productoRep.findByMarca("felix");
		
		List<ProductoDTO> productos = ventaImpl.convertirAdtoList(product);
		
		ProductoDTO producto1 = productos.get(0);

		DetalleDTO d1 = new DetalleDTO(producto1, 3);
		
		List<DetalleDTO> detalles = new ArrayList<>();
		
		detalles.add(d1);
		
		carrito.setUsuario(usuario);
		carrito.setDetalle(detalles);
		
		carrito = ventaImpl.calcularSubTotal(carrito);
		
		return carrito;
	}


}
