package edu.javeriana.youpet.service;

import java.util.List;

import edu.javeriana.youpet.entity.PurchasedProduct;

public interface PurchasedProductService {
	public PurchasedProduct putPurchasedProduct(PurchasedProduct purchasedProduct);

	public List<PurchasedProduct> getAllPurchasedProducts();

	public void deletePurchasedProduct(Integer id);
}
