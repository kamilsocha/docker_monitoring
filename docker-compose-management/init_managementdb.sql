create sequence if not exists bootstrapentries_id_seq;

alter sequence bootstrapentries_id_seq owner to postgres;

create sequence if not exists roles_id_seq;

alter sequence roles_id_seq owner to postgres;

create sequence if not exists users_id_seq;

alter sequence users_id_seq owner to postgres;

create table if not exists bootstrapentries
(
	id bigserial not null
		constraint bootstrapentries_pkey
			primary key,
	label integer not null
);

alter table bootstrapentries owner to postgres;

create table if not exists roles
(
	id bigserial not null
		constraint roles_pkey
			primary key,
	name varchar(255)
		constraint uk_ofx66keruapi6vyqpv6f2or37
			unique
);

alter table roles owner to postgres;

create table if not exists users
(
	id bigserial not null
		constraint users_pkey
			primary key,
	email varchar(255)
		constraint uk_6dotkott2kjsp8vw4d0m25fb7
			unique,
	is_active boolean,
	password varchar(255),
	role_id bigint not null
		constraint fkp56c1712k691lhsyewcssf40f
			references roles
);

alter table users owner to postgres;