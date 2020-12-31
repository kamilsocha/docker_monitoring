create sequence hibernate_sequence;

alter sequence hibernate_sequence owner to postgres;

create table if not exists ratings
(
	id bigint not null
		constraint ratings_pkey
			primary key,
	movie_id bigint,
	rating double precision,
	user_id bigint
);

alter table ratings owner to postgres;