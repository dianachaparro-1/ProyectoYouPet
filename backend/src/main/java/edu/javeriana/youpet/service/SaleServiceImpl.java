package edu.javeriana.youpet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.javeriana.youpet.entity.Sale;
import edu.javeriana.youpet.repository.SaleRepository;
import edu.javeriana.youpet.util.ObjectNotFoundException;

@Service
public class SaleServiceImpl implements SaleService {

	@Autowired
	private SaleRepository saleRepository;

	@Override
	public Sale putSale(Sale sale) {
		saleRepository.save(sale);
		return sale;
	}

	@Override
	public List<Sale> getAllSales() {
		return saleRepository.findAll();
	}	

	@Override
	public void deleteSale(Integer id) {
		Optional<Sale> sale = saleRepository.findById(id);
		if(sale.isPresent()) {
			saleRepository.delete(sale.get());
		} else {
			throw new ObjectNotFoundException(id);
		}
	}
}
