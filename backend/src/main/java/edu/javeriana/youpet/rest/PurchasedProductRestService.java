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

import edu.javeriana.youpet.entity.PurchasedProduct;
import edu.javeriana.youpet.service.PurchasedProductService;

@RestController
@RequestMapping("/purchasedProduct")
public class PurchasedProductRestService {

	@Autowired
	private PurchasedProductService purchasedProductService;

	@PutMapping(value = "/put")
	public PurchasedProduct putPurchasedProduct(@RequestBody PurchasedProduct purchasedProduct) {
		return purchasedProductService.putPurchasedProduct(purchasedProduct);
	}

	@GetMapping(value = "/getAll", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<PurchasedProduct> getAllPurchasedProducts() {
		return purchasedProductService.getAllPurchasedProducts();
	}

	@DeleteMapping(value = "/delete/{id}")
	public void deletePurchasedProduct(@PathVariable Integer id) {
		purchasedProductService.deletePurchasedProduct(id);
	}
}
