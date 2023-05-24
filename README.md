# acrillodegallo

Repositorio para la asociación de rillo de gallo

## Herramientas de mantenimiento

### Realizar una copia de seguridad

1. Conectarse al servidor:

```bash
ssh forge@206.189.49.82`
```

2. Ejecutar

```bash
wp db export --path=/home/forge/acrillodegallo.es/packages/wordpress --allow-root
```

3. Desde tu máquina local ejecutar `scp`:

```bash
scp forge@206.189.49.82:/home/forge/acrillodegallo.es/acrillodegallo-FECHA_CREADA.sql ~/acrillodegallo-FECHA_CREADA.sql

```

4. Recuperar uploads

```bash
scp -r forge@206.189.49.82:/home/forge/acrillodegallo.es/packages/wordpress/wp-content/uploads uploads

cd packages/wordpress/wp-content
rsync -az forge@206.189.49.82:/home/forge/acrillodegallo.es/packages/wordpress/wp-content/uploads/ uploads
```

### Actualizar la base de datos local (levantada en docker) con los datos de producción

```bash
docker ps

docker exec -i mysql sh -c 'exec mysql -u "wordpress" -p"wp_password" --database=wordpress' < backups/LAST_BACKUP.sql

docker exec -i php sh -c 'wp search-replace "https://wp.acrillodegallo.es" "http://localhost" --allow-root'
```
