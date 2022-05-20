package edu.javeriana.youpet.util;

@SuppressWarnings("serial")
public class ObjectNotFoundException extends RuntimeException {
	
	public ObjectNotFoundException(Integer id) {
		super("No se puedo encontrar el producto con el id:" + id);
	}

}
