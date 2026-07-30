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

**Confirmación de asistencia (Formspree)** — el formulario ya está listo, solo falta conectarlo:
1. Crea una cuenta gratis en https://formspree.io y un nuevo formulario.
2. Copia tu endpoint (se ve así: `https://formspree.io/f/abcdwxyz`).
3. En `index.html`, busca `action="https://formspree.io/f/TU_ID"` y reemplaza `TU_ID`
   por el tuyo. ¡Eso es todo!
   - Las confirmaciones te llegarán por correo (el que registraste en Formspree).
   - El formulario se envía sin recargar la página y muestra un mensaje de "¡Gracias!".
   - Si dejas `TU_ID` sin cambiar, el sitio avisará que falta configurarlo.

**Copia por WhatsApp** — al inicio de `script.js` hay un bloque `CONFIGURACIÓN`:
```js
const HOST_WHATSAPP = "520000000000"; // tu número (código país + número, solo dígitos)
```
Tras confirmar, aparece un botón verde que abre WhatsApp con un mensaje
prellenado (nombre, teléfono, asistentes, confirmación y mensaje) hacia `HOST_WHATSAPP`.
Cambia `520000000000` por tu número real (ej. México: `52` + 10 dígitos).

**Contacto (footer)** → reemplaza los teléfonos `520000000000` y enlaces de WhatsApp por los reales.

**Ubicación / mapa** → cambia la dirección en el `<iframe>` y en el enlace "Abrir en Google Maps".

## Accesibilidad
Respeta `prefers-reduced-motion` (desactiva animaciones), foco visible por teclado y textos alternativos.
