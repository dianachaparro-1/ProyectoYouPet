package edu.javeriana.youpet.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.javeriana.youpet.domain.CarritoDTO;
import edu.javeriana.youpet.domain.ProductoDTO;
import edu.javeriana.youpet.domain.VentaDTO;
import edu.javeriana.youpet.service.VentaService;

@RestController
@RequestMapping("/venta")
public class VentaRestService {
	
	@Autowired
	private VentaService ventaService;
	
	@GetMapping(value = "/productos", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<ProductoDTO> getProductos() {
		
		return ventaService.getProductos();
	}
	
	@GetMapping(value = "/filtrar/nombre/{nombre}")
	public List<ProductoDTO> filtrarProductosPorNombre(@PathVariable String nombre) {
		
		return ventaService.filtrarProductosPorNombre(nombre);
	}
	
	@GetMapping(value = "/filtrar/marca/{marca}")
	public List<ProductoDTO> filtrarProductosPorMarca(@PathVariable String marca) {
		
		return ventaService.filtrarProductosPorMarca(marca);
	}
	
	@GetMapping(value = "/calcular/subtotal")
	public CarritoDTO calcularSubTotal(@RequestBody CarritoDTO carrito) {
		
		return ventaService.calcularSubTotal(carrito);
	}
	
	@PostMapping(value = "/crear")
	public void crearVenta(@RequestBody VentaDTO venta) {
		ventaService.crearVenta(venta);
	}
	
	@GetMapping(value = "/ventasRegistradas", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<VentaDTO> getVentas() {
		
		return ventaService.getVentas();
	}
	
	@DeleteMapping(value = "/eliminar/producto/{id}")
	public void borrarProducto(@PathVariable Long id) {
		ventaService.borrarProducto(id);
	}

}
