# 📦 CRUD de Produtos - Fullstack

Este projeto é um **CRUD de Produtos** desenvolvido como aplicação **fullstack**, unindo:

- **Backend:** Java 17 + Spring Boot + H2 Database + JPA + Swagger
- **Frontend:** React + Vite + TypeScript

---

## 🚀 Funcionalidades

- Criar, listar, atualizar e excluir produtos.
- Estrutura de produto com os campos:
  - `id`
  - `nome`
  - `preço`
  - `quantidade`
  - `descrição`
- Banco de dados em memória (**H2**).
- Paginação na listagem de produtos.
- Validações básicas no cadastro.
- Documentação automática com **Swagger UI**.
- Teste unitário básico.

---

## 🗂️ Estrutura do Projeto


### Modelagem de dados: 

<img width="2561" height="3840" alt="Image" src="https://github.com/user-attachments/assets/f2675a5e-23c9-49fd-8066-90f66cd257d9" />
---

## ⚙️ Backend ( Java + Spring Boot)

### 📌 Tecnologias
- Java 17
- Spring Boot 3
- Spring Data JPA
- H2 Database
- Spring Validation
- Swagger (springdoc-openapi)

### ▶️ Como rodar o backend

1. Acesse a pasta do backend:
   ```bash
   cd crud-produto-join
2. Rode o projeto com Maven:
   ```bash
   ./mvnw spring-boot:run

3. O servidor subirá em:
    ```bash
    http://localhost:8080

## 📌 Endpoints da API

A API oferece os seguintes endpoints para manipulação de produtos:

| Método  | Endpoint            | Descrição                          | Exemplo de Uso |
|---------|---------------------|------------------------------------|----------------|
| **GET** | `/products`         | Lista paginada de produtos         | `GET http://localhost:8080/products?page=0&size=10` |
| **GET** | `/products/{id}`    | Busca um produto pelo **ID**       | `GET http://localhost:8080/products/1` |
| **POST**| `/products`         | Cria um novo produto               | `POST http://localhost:8080/products` |
| **PUT** | `/products/{id}`    | Atualiza um produto existente      | `PUT http://localhost:8080/products/1` |
| **DELETE** | `/products/{id}` | Exclui um produto pelo **ID**      | `DELETE http://localhost:8080/products/1` |

---

### 📥 Exemplo de Requisição (POST)
```json
{
  "name": "Café",
  "price": 12.50,
  "quantity": 10,
  "description": "Pacote 500g"
  
} 
```
### 📥 Exemplo de Resposta (POST)
```
```json
{
  "id": 1,
  "name": "Café",
  "price": 12.50,
  "quantity": 10,
  "description": "Pacote 500g"
}

```

### Acesse o banco H2 em:
``` bash
http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:testdb

Usuário: sa

Senha: (em branco)

```

### Documentação Swagger
``` bash
http://localhost:8080/swagger-ui.html
```
<img width="1492" height="738" alt="Image" src="https://github.com/user-attachments/assets/d99c5f95-9140-483d-aa0c-752b202e60ff" />

## 🖥️ Front-End (React)

### 📌 Tecnologias
- React
- TypeScript
- Axios (Para requisições HTTP)
- Vite
- CSS Modules

# Como rodar o frontend

## 1. Acesse a pasta do frontend:

```bash
cd crud-produto-join
```

## 2. Instale as dependências:
```bash
npm install
```

## 3. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

## 4. O app estará disponível em:
```bash
http://localhost:5173
```

# 🧪 Testes

### O backend possui um teste unitário simples para validar a criação de produtos

```bash
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
```

# 📖 Diferenciais Implementados

- [x] Paginação na listagem
- [x] Validações básicas
- [x] Documentação básica com Swagger
- [x] Teste unitário de criação de produto

# Como executar o projeto completo 

### 1. Suba o backend (Spring Boot).

### 2. Suba o frontend (React).

### 3. Acesse o frontend em 👉 http://localhost:5173


### 4. Interaja com o CRUD de produtos consumindo a API do backend.