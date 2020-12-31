create sequence hibernate_sequence;

alter sequence hibernate_sequence owner to postgres;

create table if not exists users
(
    id bigint not null
        constraint users_pkey
            primary key,
    first_name varchar(255),
	last_name varchar(255),
	email varchar(255),
	role varchar(255)
);

alter table users owner to postgres;
