package edu.javeriana.youpet.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.javeriana.youpet.entity.Sale;
import edu.javeriana.youpet.service.SaleService;

@RestController
@RequestMapping("/sale")
public class SaleRestService {

	@Autowired
	private SaleService saleService;

	@PutMapping(value = "/put")
	public Sale putSale(@RequestBody Sale sale) {
		return saleService.putSale(sale);
	}

	@GetMapping(value = "/getAll", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<Sale> getAllSales() {
		return saleService.getAllSales();
	}

	@DeleteMapping(value = "/delete/{id}")
	public void deleteSale(@PathVariable Integer id) {
		saleService.deleteSale(id);
	}
}
