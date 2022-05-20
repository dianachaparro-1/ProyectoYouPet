package edu.javeriana.youpet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.javeriana.youpet.entity.PurchasedProduct;
import edu.javeriana.youpet.repository.PurchasedProductRepository;
import edu.javeriana.youpet.util.ObjectNotFoundException;

@Service
public class PurchasedProductServiceImpl implements PurchasedProductService {

	@Autowired
	private PurchasedProductRepository purchasedProductRepository;

	@Override
	public PurchasedProduct putPurchasedProduct(PurchasedProduct purchasedProduct) {
		purchasedProductRepository.save(purchasedProduct);
		return purchasedProduct;
	}

	@Override
	public List<PurchasedProduct> getAllPurchasedProducts() {
		return purchasedProductRepository.findAll();
	}	

	@Override
	public void deletePurchasedProduct(Integer id) {
		Optional<PurchasedProduct> purchasedProduct = purchasedProductRepository.findById(id);
		if(purchasedProduct.isPresent()) {
			purchasedProductRepository.delete(purchasedProduct.get());
		} else {
			throw new ObjectNotFoundException(id);
		}
	}
}
