# La Granja de Dany 🐮 — Invitación de cumpleaños

Landing page estática (HTML + CSS + JavaScript puro, **sin frameworks**), temática de granja
femenina y tierna, 100% responsiva.

## Cómo abrirla
Abre `index.html` en cualquier navegador (doble clic). No requiere servidor.
> Nota: el mapa de Google y las tipografías se cargan por internet, así que necesitas conexión.

## Estructura
```
granja-de-dany/
├── index.html      → contenido y secciones
├── styles.css      → estilos, paleta y animaciones
├── script.js       → banderines, animales SVG, cuenta regresiva, carrusel, scroll-reveal
└── assets/
    └── hero-invitacion.png   → tu imagen principal
```

## Personalización rápida

**Textos, fecha y lugar** → en `index.html` (busca "Dany", "Sábado 29", "Av. Francisco Morazán").

**Cuenta regresiva** → en `script.js`, línea:
```js
const TARGET = new Date("2026-08-29T10:00:00").getTime();
```
Cambia la fecha/hora del evento.

**Colores** → en `styles.css`, bloque `:root` al inicio (variables `--rosa`, `--naranja`, etc.).

**Tus fotos**
- Copia tus imágenes en la carpeta `assets/`.
- **Galería**: en la sección `<!-- GALERÍA -->` reemplaza los
  `<span class="ph">Tu foto aquí</span>` por `<img src="assets/tu-foto.jpg" alt="..." loading="lazy" />`.
- **Carrusel**: igual, en la sección `<!-- CARRUSEL -->` cambia cada `.ph` por un `<img>`.

**Confirmación de asistencia (WhatsApp)** — el formulario no usa backend ni correo:
al inicio de `script.js` hay un bloque `CONFIGURACIÓN`:
```js
const HOST_WHATSAPP = "520000000000"; // tu número (código país + número, solo dígitos)
```
Cambia `520000000000` por tu número real (ej. México: `52` + 10 dígitos).
Al pulsar "Confirmar por WhatsApp", el sitio valida los campos y abre WhatsApp
en una pestaña nueva con un mensaje prellenado (nombre, teléfono, asistentes,
confirmación y mensaje) dirigido a `HOST_WHATSAPP`. No se envía ningún correo.

**Contacto (footer)** → reemplaza los teléfonos `520000000000` y enlaces de WhatsApp por los reales.

**Ubicación / mapa** → cambia la dirección en el `<iframe>` y en el enlace "Abrir en Google Maps".

## Accesibilidad
Respeta `prefers-reduced-motion` (desactiva animaciones), foco visible por teclado y textos alternativos.
