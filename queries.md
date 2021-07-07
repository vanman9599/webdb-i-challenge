# Database Queries



## find all customers with postal code 1010. Returns 3 customers.
SELECT * FROM customers
WHERE postalCode = '1010'

## find the phone number for the supplier with the id 11. Should be (010) 9984510.
SELECT phone  FROM Suppliers
WHERE supplierID = 11

## list orders descending by the order date. The order with date 1997-02-12 should be at the top.
SELECT * FROM Orders
order by orderDate desc

## find all customers that live in London, Madrid, or Brazil. Returns 18 records.
SELECT * FROM customers
where city = 'London'
OR city = 'Madrid' or
country = 'Brazil'

## add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.
insert into customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')

## update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.
update Customers
SET PostalCode = '11122'
WHERE ContactName = 'Bilbo Baggins'

##Stretch

## Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted. Should be 69.

select distinct city from customers

## Find all suppliers who have names longer than 20 characters. Returns 11 records.

SELECT * FROM Suppliers
where length(SupplierName) >20

##Add a query string option to your GET /api/accounts endpoint. The query string may contain limit, sortby and sortdir keys. If these keys are provided, use these values to limit and sort the accounts which are selected from the database. Reference the docs for sorting and limiting in knex.