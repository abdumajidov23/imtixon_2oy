DROP DATABASE IF EXISTS imtixon;
CREATE DATABASE imtixon;

USE imtixon;

CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255)  
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author INT,  
    category ENUM('Fiction', 'Non-fiction', 'Science', 'History', 'Biography'),
    price DECIMAL(10, 2),  
    stock_quantity INT,
    publication_year INT  
);

CREATE TABLE payment_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    month VARCHAR(20),
    percent INT  
);

CREATE TABLE contract (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,  
    customer_id INT,
    credit_amount DECIMAL(10, 2),  
    given_date DATETIME,
    expire_date DATETIME,
    initial_payment DECIMAL(10, 2),  
    total_price DECIMAL(10, 2),  
    payment_plan_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_plan_id) REFERENCES payment_plan(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id BIGINT,  
    payment_amount DECIMAL(10, 2),  
    payment_date DATETIME,  
    payment_type ENUM('Credit', 'Debit', 'Cash'),
    FOREIGN KEY (contract_id) REFERENCES contract(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO customer (name, phone, email, address) VALUES
('John Doe', '123456789', 'john.doe@example.com', '101 Main St'),  
('Jane Smith', '987654321', 'jane.smith@example.com', '102 Elm St');  

INSERT INTO books (title, author, category, price, stock_quantity, publication_year) VALUES
('The Great Gatsby', 1, 'Fiction', 19.99, 50, 1925),
('A Brief History of Time', 2, 'Science', 15.99, 30, 1988);

INSERT INTO payment_plan (month, percent) VALUES
('1 month', 10),
('3 months', 30),
('6 months', 60);

INSERT INTO contract (book_id, customer_id, credit_amount, given_date, expire_date, initial_payment, total_price, payment_plan_id) VALUES
(1, 1, 1000.00, '2024-08-01 10:00:00', '2025-08-01 10:00:00', 200.00, 1200.00, 1),
(1, 1, 1000.00, '2024-01-01 10:00:00', '2024-07-01 10:00:00', 200.00, 1200.00, 1),
(2, 2, 500.00, '2024-08-02 10:00:00', '2025-08-02 10:00:00', 100.00, 600.00, 2);

INSERT INTO payment (contract_id, payment_amount, payment_date, payment_type) VALUES
(1, 200.00, '2024-08-01 10:00:00', 'Credit'),
(1, 200.00, '2024-07-03 10:00:00', 'Credit'),
(2, 100.00, '2024-08-02 10:00:00', 'Debit');

SELECT * FROM books;
SELECT * FROM customer;
SELECT * FROM payment_plan;

SELECT 
    c.id AS contract_id,
    b.title AS book_title,
    b.author AS book_author,
    c.credit_amount AS credit_amount,
    c.given_date AS purchase_date,
    c.expire_date AS expiry_date,
    c.initial_payment AS initial_payment,
    c.total_price AS total_price,
    pp.month AS payment_plan
FROM 
    contract c
JOIN 
    books b ON c.book_id = b.id
JOIN 
    payment_plan pp ON c.payment_plan_id = pp.id
WHERE 
    c.given_date BETWEEN '2024-08-01 00:00:00' AND '2024-08-31 23:59:59';

SELECT 
    c.id AS contract_id,
    cu.name AS customer_name,
    cu.address AS customer_address,
    b.title AS product_title,
    c.total_price AS amount_due,
    DATEDIFF(CURRENT_DATE, c.expire_date) AS days_overdue
FROM 
    contract c
JOIN 
    customer cu ON c.customer_id = cu.id
JOIN 
    books b ON c.book_id = b.id
WHERE 
    c.expire_date < CURRENT_DATE;

DESCRIBE books;
