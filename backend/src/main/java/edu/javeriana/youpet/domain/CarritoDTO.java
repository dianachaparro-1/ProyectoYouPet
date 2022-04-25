package edu.javeriana.youpet.domain;

import java.util.List;

public class CarritoDTO {
	
	private String usuario;
	private List<DetalleDTO> detalle;
	private Double subTotal;

	public CarritoDTO() {
		super();
	}

	public CarritoDTO(String usuario, List<DetalleDTO> detalle) {
		super();
		this.usuario = usuario;
		this.detalle = detalle;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public List<DetalleDTO> getDetalle() {
		return detalle;
	}

	public void setDetalle(List<DetalleDTO> detalle) {
		this.detalle = detalle;
	}

	public Double getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(Double subTotal) {
		this.subTotal = subTotal;
	}

}
