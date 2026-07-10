# Publicación y entrega de ANSA Seguridad Privada

Este archivo reúne lo que debe completarse cuando se confirme el dominio y se publique el sitio. No contiene contraseñas ni credenciales.

## 1. Confirmar URL final

El proyecto usa temporalmente `https://www.ansaseguridad.com.mx/` en `robots.txt` y `sitemap.xml` porque coincide con el dominio del correo empresarial. Antes de publicar, confirmar si la URL final será:

- `https://www.ansaseguridad.com.mx/`
- `https://ansaseguridad.com.mx/`
- una URL de Google Sites
- otro dominio

Elegir una sola versión principal y redirigir las demás hacia ella mediante redirección 301.

## 2. Activar canonical y Open Graph

En el `<head>` de cada archivo HTML existen comentarios marcados como `PUBLICACIÓN`.

Al confirmar el dominio:

1. Agregar un `<link rel="canonical">` distinto en cada página.
2. Agregar `og:url` con la misma URL canónica.
3. Cambiar `og:image` y `twitter:image` a una URL absoluta, por ejemplo:

   `https://www.ansaseguridad.com.mx/img/og-ansa-seguridad.jpg`

## 3. Sitemap y robots

- Confirmar el dominio de todas las URLs de `sitemap.xml`.
- Confirmar la línea `Sitemap:` de `robots.txt`.
- Subir ambos archivos en la raíz pública del sitio.
- No incluir `404.html` en el sitemap.

## 4. Google Search Console

1. Crear una propiedad de dominio.
2. Verificarla mediante el registro DNS indicado por Google.
3. Enviar `https://DOMINIO/sitemap.xml`.
4. Inspeccionar portada, servicios, contacto y empleo.
5. Solicitar indexación después de que las URLs canónicas funcionen.

## 5. Google Business Profile y Maps

- Confirmar que el nombre, dirección y teléfono coincidan exactamente con el sitio.
- Vincular el dominio publicado.
- Revisar horario de atención, área de servicio, categoría y fotografías.
- No crear perfiles duplicados.

## 6. Si se utiliza Google Sites

Google Sites administra parte de la publicación y puede limitar archivos personalizados en la raíz, encabezados, redirecciones y una página 404 propia. Verificar antes de elegirlo como alojamiento definitivo que permita conservar:

- los archivos HTML, CSS y JavaScript del proyecto;
- `robots.txt` y `sitemap.xml`;
- metadatos Open Graph y JSON-LD;
- una respuesta HTTP 404 real;
- conexión del dominio personalizado.

Si esas opciones no están disponibles, conviene alojar este proyecto estático en un servicio que permita controlar todos los archivos y conectar ahí el dominio. Evitar incrustar la web completa dentro de Google Sites porque puede perjudicar navegación, medición e indexación.

## 7. Analítica

No se dejó un identificador falso de Google Analytics. Cuando la empresa cree su propiedad:

1. Añadir el identificador real `G-XXXXXXXXXX`.
2. Definir eventos para clic en WhatsApp, teléfono, correo y envío exitoso.
3. Actualizar el aviso de privacidad.
4. Implementar el consentimiento requerido antes de activar cookies no esenciales.

## 8. Formularios

- Confirmar que `https://formspree.io/f/mjgddpvk` pertenece a la cuenta que recibirá los prospectos.
- Hacer un envío autorizado desde cada página.
- Confirmar recepción, asunto, remitente y respuesta de error.
- Revisar el Google Form de empleo y su cuenta propietaria.
- Confirmar que el aviso de privacidad fue revisado por la empresa.

## 9. Página 404

El archivo `404.html` ya existe. El alojamiento debe configurarse para mostrarlo y responder con código HTTP `404`, no con `200`.

## 10. Redes sociales

Solo se mantiene Facebook porque es la única URL confirmada. Agregar Instagram y LinkedIn únicamente cuando la empresa entregue sus enlaces oficiales.

## 11. Entrega formal

- Entregar un respaldo comprimido del proyecto publicado.
- Registrar dominio, hosting, Formspree, Google Forms, Search Console y Analytics a nombre del cliente.
- Entregar accesos mediante un gestor seguro, no dentro del código.
- Documentar fecha de publicación, periodo de garantía y alcance de mantenimiento.
- Guardar capturas de escritorio y móvil como evidencia de aceptación.
