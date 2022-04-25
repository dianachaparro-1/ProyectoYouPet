package edu.javeriana.youpet.util;

@SuppressWarnings("serial")
public class ProductoNotFoundException extends RuntimeException {
	
	public ProductoNotFoundException(Long id) {
		super("No se puedo encontrar el producto con el id:" + id);
	}

}
