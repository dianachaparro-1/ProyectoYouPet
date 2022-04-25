package edu.javeriana.youpet.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.javeriana.youpet.domain.CarritoDTO;
import edu.javeriana.youpet.domain.DetalleDTO;
import edu.javeriana.youpet.domain.ProductoDTO;
import edu.javeriana.youpet.domain.VentaDTO;
import edu.javeriana.youpet.entity.ProductoEntity;
import edu.javeriana.youpet.entity.VentaEntity;
import edu.javeriana.youpet.repository.ProductoRepository;
import edu.javeriana.youpet.repository.VentaRepository;
import edu.javeriana.youpet.util.ProductoNotFoundException;

@Service
public class VentaServiceImpl implements VentaService {
	
	@Autowired
	private ProductoRepository productoRep;
	
	@Autowired
	private VentaRepository ventaRep;
	
	
	@Override
	public List<ProductoDTO> getProductos() {
		
		List<ProductoDTO> productos = convertirAdtoList(productoRep.findAll());
		
		return productos;
	}
	
	@Override
	public List<ProductoDTO> filtrarProductosPorNombre(String nombre) {
		
		List<ProductoDTO> productos = convertirAdtoList(productoRep.findByNombre(nombre));
		
		return productos;
	}
	
	@Override
	public List<ProductoDTO> filtrarProductosPorMarca(String marca) {
		
		List<ProductoDTO> productos = convertirAdtoList(productoRep.findByMarca(marca));
		
		return productos;
	}
	
	public List<ProductoDTO> convertirAdtoList(List<ProductoEntity> productosEntity) {

		List<ProductoDTO> productos = new ArrayList<>();
		ModelMapper mapper = new ModelMapper();
		
		for (ProductoEntity producto : productosEntity) {
			productos.add(mapper.map(producto, ProductoDTO.class));
		}
		
		return productos;
	}
	
	@Override
	public CarritoDTO calcularSubTotal(CarritoDTO carrito) {
		
		Double subTotal = 0.00;
		
		for (int i = 0; i < carrito.getDetalle().size(); i++) {
			
			DetalleDTO detalle = new DetalleDTO();
			
			detalle = carrito.getDetalle().get(i);
			
			subTotal = subTotal + (detalle.getProducto().getPrecio() * detalle.getCantidad());
		}
		
		carrito.setSubTotal(subTotal);
		
		return carrito;
		
	}
	
	@Override
	public void crearVenta(VentaDTO ventadto) {
		
		VentaEntity ventaEntity = new VentaEntity();
		
		ventaEntity.setUsername(ventadto.getCarrito().getUsuario());
		ventaEntity.setMetodoPago(ventadto.getMetodoPago());
		ventaEntity.setFecha(new Date());
		CarritoDTO carrito = calcularSubTotal(ventadto.getCarrito());
		ventaEntity.setTotal(carrito.getSubTotal());
		
		actualizarInventario(ventadto.getCarrito());
		
		ventaRep.save(ventaEntity);
	}
	
	@Override
	public List<VentaDTO> getVentas() {
		
		List<VentaDTO> ventas = convertirAdtoVentaList(ventaRep.findAll());
		
		return ventas;
	}
	
	public List<VentaDTO> convertirAdtoVentaList(List<VentaEntity> ventasEntity) {
		
		List<VentaDTO> ventas = new ArrayList<>();
		
		VentaEntity entity = new VentaEntity();
		
		for (int i = 0; i < ventasEntity.size(); i++) {
			
			entity = ventasEntity.get(i);
			
			VentaDTO venta = new VentaDTO();
			venta.setId(entity.getId());
			venta.setFecha(entity.getFecha());
			venta.setMetodoPago(entity.getMetodoPago());
			venta.setTotal(entity.getTotal());
			
			ventas.add(venta);
		}
		
		return ventas;
	}
	
	public void actualizarInventario(CarritoDTO carrito) {
		
		DetalleDTO detalle = new DetalleDTO();
		
		for (int i = 0; i < carrito.getDetalle().size(); i++) {
			
			detalle = carrito.getDetalle().get(i);
			
			Long id = detalle.getProducto().getId();
			
			ProductoEntity producto = productoRep.getById(id);
			
			if(producto != null) {
				
				producto.setCantidadTotal(producto.getCantidadTotal() - detalle.getCantidad());
				
				productoRep.save(producto);
			} else {
				throw new ProductoNotFoundException(id);
			}	
		}
	}
	
	@Override
	public void borrarProducto(Long id) {
		
		Optional<ProductoEntity> producto = productoRep.findById(id);

		if (producto.isPresent()) {
			productoRep.delete(producto.get());
		} else {
			throw new ProductoNotFoundException(id);
		}
	}

}
