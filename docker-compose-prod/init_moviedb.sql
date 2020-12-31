create sequence hibernate_sequence;

alter sequence hibernate_sequence owner to postgres;

create table if not exists movies
(
	id bigint not null
		constraint movies_pkey
			primary key,
	description varchar(255),
	director varchar(255),
	name varchar(255),
	poster_uri varchar(255)
);

alter table movies owner to postgres;