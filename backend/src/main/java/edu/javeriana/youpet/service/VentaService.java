package edu.javeriana.youpet.service;

import java.util.List;

import edu.javeriana.youpet.domain.CarritoDTO;
import edu.javeriana.youpet.domain.ProductoDTO;
import edu.javeriana.youpet.domain.VentaDTO;

public interface VentaService {
	
	public List<ProductoDTO> getProductos();
	
	public List<ProductoDTO> filtrarProductosPorNombre(String nombre);
	
	public List<ProductoDTO> filtrarProductosPorMarca(String marca);
	
	public CarritoDTO calcularSubTotal(CarritoDTO carrito);
	
	public void crearVenta(VentaDTO venta);
	
	public List<VentaDTO> getVentas();
	
	public void borrarProducto(Long id);

}
