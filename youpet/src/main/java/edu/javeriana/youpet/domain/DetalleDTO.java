package edu.javeriana.youpet.domain;

public class DetalleDTO {
	
	private ProductoDTO producto;
	private Integer cantidad;
	
	public DetalleDTO() {
		super();
	}

	public DetalleDTO(ProductoDTO producto, Integer cantidad) {
		super();
		this.producto = producto;
		this.cantidad = cantidad;
	}

	public ProductoDTO getProducto() {
		return producto;
	}
	
	public void setProducto(ProductoDTO producto) {
		this.producto = producto;
	}
	
	public Integer getCantidad() {
		return cantidad;
	}
	
	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

}
