create table products (
id int AUTO_INCREMENT primary key,
name varchar  (250) not null,
description TEXT,
price decimal (10,2) not null,
quantity int not null,
imagen_url varchar (255),
creation_date timestamp default current_timestamp,
actualization_date timestamp default current_timeStamp  on update current_timeStamp,
activo boolean default true);