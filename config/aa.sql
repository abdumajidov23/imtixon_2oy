DROP DATABASE IF EXISTS imtixon2;
CREATE DATABASE imtixon2;

USE imtixon2;

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


-- 
INSERT INTO customer (name, phone, email, address) VALUES
('Rahimov Shokir', '998901234567', 'shokir.rahimov@example.com', 'Tashkent, Uzbekistan'),
('Akramov Jamshid', '998902345678', 'jamshid.akramov@example.com', 'Samarkand, Uzbekistan');

INSERT INTO books (title, author, category, price, stock_quantity, publication_year) VALUES
('Velosiped yo’li', 1, 'Fiction', 320000, 10, 2023),
('O’zbekiston tarixi', 2, 'History', 250000, 5, 2021);

INSERT INTO payment_plan (month, percent) VALUES
('1 oy', 10),
('3 oy', 30);

INSERT INTO contract (book_id, customer_id, credit_amount, given_date, expire_date, initial_payment, total_price, payment_plan_id) VALUES
(1, 1, 320000, '2024-01-10', '2024-08-10', 100000, 320000, 1),
(2, 2, 250000, '2024-03-15', '2024-06-15', 50000, 250000, 2);

INSERT INTO payment (contract_id, payment_amount, payment_date, payment_type) VALUES
(1, 100000, '2024-01-15', 'Credit'),
(1, 100000, '2024-02-10', 'Cash'),
(2, 50000, '2024-03-20', 'Debit');


-- Xaridorlar
INSERT INTO customer (name, phone, email, address) VALUES
('Rahimov Shokir', '998901234567', 'shokir.rahimov@example.com', 'Tashkent, Uzbekistan'),
('Akramov Jamshid', '998902345678', 'jamshid.akramov@example.com', 'Samarkand, Uzbekistan'),
('Saidov Ali', '998903456789', 'ali.saidov@example.com', 'Bukhara, Uzbekistan'),
('Gapparov Otabek', '998904567890', 'otabek.gapparov@example.com', 'Andijan, Uzbekistan'),
('Djavohirov Davron', '998905678901', 'davron.djavohirov@example.com', 'Fergana, Uzbekistan'),
('Tashkentov Timur', '998906789012', 'timur.tashkentov@example.com', 'Namangan, Uzbekistan'),
('Karimova Munira', '998907890123', 'munira.karimova@example.com', 'Jizzakh, Uzbekistan'),
('Mamatov Rustam', '998908901234', 'rustam.mamatov@example.com', 'Nukus, Uzbekistan'),
('Mirzaeva Madina', '998909012345', 'madina.mirzaeva@example.com', 'Kokand, Uzbekistan'),
('Aliyev Umid', '998910123456', 'umid.aliyev@example.com', 'Termez, Uzbekistan');

-- Kitoblar
INSERT INTO books (title, author, category, price, stock_quantity, publication_year) VALUES
('Velosiped yo’li', 1, 'Fiction', 320000, 10, 2023),
('O’zbekiston tarixi', 2, 'History', 250000, 5, 2021),
('Kimyo Asoslari', 3, 'Science', 150000, 15, 2022),
('Falsafa', 4, 'Non-fiction', 180000, 20, 2020),
('Jahon Adabiyoti', 5, 'Biography', 220000, 8, 2019),
('Matematika Kirish', 6, 'Science', 170000, 12, 2023),
('Yoshlar uchun Hikoyalar', 7, 'Fiction', 200000, 25, 2021),
('Dasturlash Asoslari', 8, 'Non-fiction', 240000, 7, 2022),
('Geografiya', 9, 'Science', 130000, 18, 2020),
('Tarixiy Musiqa', 10, 'History', 210000, 6, 2023);

-- To'lov rejalari
INSERT INTO payment_plan (month, percent) VALUES
('1 oy', 10),
('3 oy', 30),
('6 oy', 50);

-- Shartnomalar
INSERT INTO contract (book_id, customer_id, credit_amount, given_date, expire_date, initial_payment, total_price, payment_plan_id) VALUES
(1, 1, 320000, '2024-01-10', '2024-08-10', 100000, 320000, 1),
(2, 2, 250000, '2024-03-15', '2024-06-15', 50000, 250000, 2),
(3, 3, 150000, '2024-02-01', '2024-08-01', 50000, 150000, 3),
(4, 4, 180000, '2024-04-05', '2024-10-05', 60000, 180000, 1),
(5, 5, 220000, '2024-05-10', '2024-11-10', 70000, 220000, 2),
(6, 6, 170000, '2024-06-20', '2024-12-20', 60000, 170000, 3),
(7, 7, 200000, '2024-07-01', '2025-01-01', 80000, 200000, 1),
(8, 8, 240000, '2024-08-15', '2025-02-15', 90000, 240000, 2),
(9, 9, 130000, '2024-09-10', '2025-03-10', 40000, 130000, 3),
(10, 10, 210000, '2024-10-01', '2025-04-01', 50000, 210000, 1);

-- To'lovlar
INSERT INTO payment (contract_id, payment_amount, payment_date, payment_type) VALUES
(1, 100000, '2024-01-15', 'Credit'),
(1, 100000, '2024-02-10', 'Cash'),
(2, 50000, '2024-03-20', 'Debit'),
(3, 50000, '2024-02-15', 'Cash'),
(4, 60000, '2024-04-15', 'Credit'),
(5, 70000, '2024-05-20', 'Cash'),
(6, 60000, '2024-06-25', 'Debit'),
(7, 80000, '2024-07-15', 'Credit'),
(8, 90000, '2024-08-20', 'Cash'),
(9, 40000, '2024-09-15', 'Debit'),
(10, 50000, '2024-10-10', 'Credit');


-- Berilgan vaqt oralig’ida sotilgan mahsulotlar ro’yxati
SELECT 
    b.title AS book_title,
    c.name AS customer_name,
    co.id AS contract_id,
    p.total_paid AS payment_amount,
    p.payment_date AS payment_date
FROM 
    contract co
JOIN 
    books b ON co.book_id = b.id
JOIN 
    customer c ON co.customer_id = c.id
LEFT JOIN 
    (
        SELECT 
            contract_id,
            SUM(payment_amount) AS total_paid
        FROM 
            payment
        GROUP BY 
            contract_id
    ) p ON co.id = p.contract_id
WHERE 
    p.payment_date BETWEEN '2024-07-01' AND '2024-07-31'
    AND (co.total_price - COALESCE(p.total_paid, 0)) > 0;


-- Joriy sanada to’lov muddati o’tib ketgan barcha xaridorlar ro’yxatini chiqarish
SELECT 
    c.name AS customer_name,
    b.title AS book_title,
    co.id AS contract_id,
    (co.total_price - COALESCE(p.total_paid, 0)) AS remaining_amount,
    DATEDIFF(CURDATE(), co.expire_date) AS overdue_days
FROM 
    contract co
JOIN 
    customer c ON co.customer_id = c.id
JOIN 
    books b ON co.book_id = b.id
LEFT JOIN 
    (
        SELECT 
            contract_id,
            SUM(payment_amount) AS total_paid
        FROM 
            payment
        GROUP BY 
            contract_id
    ) p ON co.id = p.contract_id
WHERE 
    co.expire_date < CURDATE() AND 
    (co.total_price - COALESCE(p.total_paid, 0)) > 0;
