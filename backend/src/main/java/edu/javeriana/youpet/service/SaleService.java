package edu.javeriana.youpet.service;

import java.util.List;

import edu.javeriana.youpet.entity.Sale;

public interface SaleService {
	public Sale putSale(Sale sale);

	public List<Sale> getAllSales();

	public void deleteSale(Integer id);
}
