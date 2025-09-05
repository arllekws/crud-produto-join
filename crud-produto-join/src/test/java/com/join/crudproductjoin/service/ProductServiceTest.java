package com.join.crudproductjoin.service;

import com.join.crudproductjoin.model.Product;
import com.join.crudproductjoin.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class ProductServiceTest {

    @Test
    void create_deveRetornarProdutoSalvoComId() {
        ProductRepository repo = Mockito.mock(ProductRepository.class);
        ProductService service = new ProductService(repo);

        Product toSave = new Product(null, "Café", new BigDecimal("10.50"), 5, "Pacote 500g");
        Product saved  = new Product(1L, "Café", new BigDecimal("10.50"), 5, "Pacote 500g");

        Mockito.when(repo.save(any(Product.class))).thenReturn(saved);

        Product result = service.create(toSave);

        assertNotNull(result.getId());
        assertEquals("Café", result.getName());
    }

    @Test
    void create_deveLancarExcecaoQuandoNomeForNulo() {
        ProductRepository repo = Mockito.mock(ProductRepository.class);
        ProductService service = new ProductService(repo);

        Product toSave = new Product(null, null, new BigDecimal("10.50"), 5, "Pacote 500g");

        assertThrows(Exception.class, () -> {
            service.create(toSave);
        });
    }
}
