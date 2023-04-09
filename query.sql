create type status_condition as enum ('new', 'secondhand');
create table categories(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  photo varchar(255),
  background_color varchar(255)
);

CREATE TABLE products (
    id varchar(255) primary key,
    product_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price numeric(15) NOT NULL,
    color VARCHAR(100) NOT NULL,
    size VARCHAR(100) NOT NULL,
    stock INT NOT NULL,
    id_category INT REFERENCES categories ON DELETE CASCADE,
    foreign key (id_category) REFERENCES categories(id),
    id_seller varchar(255) REFERENCES sellers ON DELETE CASCADE,
    foreign key (id_seller) REFERENCES sellers(id),
    photo varchar(255) NOT NULL,
    condition status_condition not null,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

insert into products values(DEFAULT, 'Baju Koko', 50000, 'red', 'XL', 10,'Baju Murah kualitas Bagus', 4);

create table customers (
  id varchar(255) primary key,
  name varchar(255) NOT NULL,
  email varchar(100) NOT NULL unique,
  password text NOT NULL,
  phone varchar(255),
  address text,
  birth_date date,
  gender gender_user,
  role varchar(100) NOT NULL DEFAULT('customer'),
  photo varchar(255) DEFAULT('photodefault.jpg')
);

create table sellers (
  id varchar(255) primary key,
  name varchar(255) NOT NULL,
  email varchar(100) NOT NULL unique,
  password text NOT NULL,
  store_name varchar(255) NOT NULL,
  description text,
  role varchar(100) NOT NULL DEFAULT('seller'),
  phone varchar(255),
  address text,
  photo varchar(255) DEFAULT('photodefault.jpg')
);

create table feedbacks (
  id varchar(255) primary key,
  message text,
  rating int,
  id_product varchar(255) REFERENCES products ON DELETE CASCADE,
  foreign key (id_product) REFERENCES products(id)
);

-- Status Transaction ('cancel, 'unpaid', 'packing', 'delivering' ,'receiving')
CREATE TYPE status_order AS ENUM ('canceled','request cancel', 'unpaid', 'packing', 'sending', 'cancel', 'completed');

ALTER TYPE status_transaction ADD VALUE 'unpaid' AFTER 'cancel';
ALTER TYPE status_order ADD VALUE 'request cancel' AFTER 'canceled';
DROP TYPE admin_level1;

create table orders (
  id varchar(255) primary key,
  id_product varchar(255) REFERENCES products ON DELETE CASCADE,
  foreign key (id_product) REFERENCES products(id),
  price numeric(15) not NULL,
  id_shipping_address varchar(255) REFERENCES shipping_address ON DELETE CASCADE,
  foreign key (id_shipping_address) REFERENCES shipping_address(id),
  id_customer varchar(255) REFERENCES customers ON DELETE CASCADE,
  foreign key (id_customer) REFERENCES customers(id),
  quantity int,
  status status_order DEFAULT 'unpaid', 
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


create table shipping_address (
  id varchar(255) primary key,
  as_address varchar(255) NOT NULL,
  recipent_name varchar(255) NOT NULL,
  recipent_phone varchar(255) NOT NULL,
  address text NOT NULL,
  postal_code int NOT NULL,
  city_or_subdistrict varchar(255) NOT NULL,
  id_customer varchar(255) REFERENCES customers ON DELETE CASCADE,
  foreign key (id_customer) REFERENCES customers(id), 
  status int,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table transactions (
  id varchar(255) primary key,
  id_seller varchar(255) NOT NULL,
  store_name varchar(255) NOT NULL,
  id_customer varchar(255) NOT NULL,
  customer_name varchar(255) NOT NULL,
  id_product varchar(255) NOT NULL,
  product_name varchar(255) NOT NULL,
  product_size varchar(255) NOT NULL,
  product_color varchar(255) NOT NULL,
  product_price numeric(15) NOT NULL,
  id_order varchar(255) NOT NULL,
  total_price numeric(15) NOT NULL,
  status status_order default 'completed', 
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO transactions VALUES (DEFAULT, 3, 3000, 'Jakarta', 'packing');

create table carts (
  id varchar(255) primary key,
  id_customer varchar(255) REFERENCES customers ON DELETE CASCADE,
  FOREIGN KEY (id_customer) REFERENCES customers(id),
  id_product varchar(255) REFERENCES products ON DELETE CASCADE,
  FOREIGN KEY (id_product) REFERENCES products(id),
  quantity int,
  size varchar(100),
  color varchar(100)
);


INSERT INTO seller VALUES (DEFAULT,
'Muhamad Ilham Darmawan',
'ilham@gmail.com',
crypt('password', gen_salt('bf')),
'JL. Pondok Salak',
17,
'ilhamphoto.jpg'
);

insert into categories values(DEFAULT, 'Jacket'),(DEFAULT, 'Shoes');

 SELECT products.*,categories.name as name_category, sellers.name as name_seller 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id_category 
      INNER JOIN sellers ON products.id_seller = sellers.id_seller LIMIT 1 OFFSET 1;
  