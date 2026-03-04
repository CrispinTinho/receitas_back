CREATE TABLE usuario (
id serial primary key,
nome varchar(255),
senha varchar(255),
ativo boolean default true,
criado_em timestamp default current_timestamp
);

CREATE TABLE receita (
id serial primary key,
nome varchar(255),
ingredientes text,
instrucoes text not null,
tempo-preparo_minutos text not null,
usuarios_id integer not null references usuario(id) on delete cascade
);
