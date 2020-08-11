-- Deploy fresh database tables
-- order matters if tables depend on each other

\i '/docker-entrypoint-initdb.d/tables/photo.sql'
\i '/docker-entrypoint-initdb.d/seed/seed.sql'