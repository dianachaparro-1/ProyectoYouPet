package edu.javeriana.youpet.domain;

import java.util.Date;

public class VentaDTO {
	
	private Long id;
	private CarritoDTO carrito;
	private Date fecha;
	private Integer metodoPago;
	private Double total;
	
	public VentaDTO() {
		super();
	}

	public VentaDTO(CarritoDTO carrito, Integer metodoPago, Double total) {
		super();
		this.carrito = carrito;
		this.metodoPago = metodoPago;
		this.total = total;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public CarritoDTO getCarrito() {
		return carrito;
	}
	
	public void setCarrito(CarritoDTO carrito) {
		this.carrito = carrito;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Integer getMetodoPago() {
		return metodoPago;
	}
	
	public void setMetodoPago(Integer metodoPago) {
		this.metodoPago = metodoPago;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

}
