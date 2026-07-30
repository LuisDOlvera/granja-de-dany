/* =====================================================
   LA GRANJA DE DANY — interacciones
   ===================================================== */
(function () {
    "use strict";

    /* =========== CONFIGURACIÓN (edita aquí) =========== */
    // Número del anfitrión que recibirá la copia por WhatsApp (código país + número, solo dígitos)
    const HOST_WHATSAPP = "525529050483";
    // Número inicial del contador (por si quieres empezar en algo distinto de 0)
    const CONF_BASE = 0;
    // Opcional: endpoint de un contador compartido real (ej. tu backend). Déjalo vacío para usar el navegador.
    const COUNTER_ENDPOINT = ""; // p.ej. "https://api.tu-servicio.com/granja-dany"
    const STORE_KEY = "granja_dany_confirmados";

    /* -------- 0. Música de fondo -------- */
    const music = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");
    if (music && musicBtn) {
        music.volume = 0.5;
        let userMuted = false;

        const updateBtn = () => {
            const playing = !music.paused;
            musicBtn.textContent = playing ? "🔊" : "🔈";
            musicBtn.setAttribute("aria-pressed", String(!playing));
            musicBtn.setAttribute(
                "aria-label",
                playing ? "Silenciar música" : "Activar música",
            );
        };

        const tryPlay = () => {
            if (userMuted) return;
            music.play().then(updateBtn).catch(() => {});
        };

        // Intenta reproducir de inmediato; si el navegador lo bloquea,
        // arranca en la primera interacción del usuario.
        tryPlay();
        ["pointerdown", "keydown", "scroll", "touchstart"].forEach((evt) =>
            window.addEventListener(evt, tryPlay, {
                once: true,
                passive: true,
            }),
        );

        musicBtn.addEventListener("click", () => {
            if (music.paused) {
                userMuted = false;
                tryPlay();
            } else {
                userMuted = true;
                music.pause();
                updateBtn();
            }
        });

        music.addEventListener("play", updateBtn);
        music.addEventListener("pause", updateBtn);
    }

    /* -------- 1. Banderines (colores alternos) -------- */
    const flagColors = ["#EE6FA0", "#F9C332", "#6FBF4A", "#F5820D", "#8FD3F4"];
    const flagsEl = document.getElementById("bunting-flags");
    if (flagsEl) {
        const N = 26;
        for (let i = 0; i < N; i++) {
            const f = document.createElement("span");
            f.className = "flag";
            f.style.background = flagColors[i % flagColors.length];
            f.style.animationDelay = i * 0.12 + "s";
            flagsEl.appendChild(f);
        }
    }

    /* -------- 2. Personajes de granja (SVG inline) -------- */
    const bow = `<g><path d="M50 6 C40 -2 30 2 34 12 C24 8 24 20 34 18 C30 28 42 26 44 16 L50 18 Z" fill="#EE6FA0" stroke="#D14E86" stroke-width="1.5"/><circle cx="47" cy="14" r="3" fill="#D14E86"/></g>`;

    const cow = `
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vaquita">
    <ellipse cx="100" cy="185" rx="60" ry="10" fill="rgba(0,0,0,.08)"/>
    <path d="M55 70 Q40 55 55 48 Q70 50 68 68 Z" fill="#F6E7CE" stroke="#C9A66B" stroke-width="3"/>
    <path d="M145 70 Q160 55 145 48 Q130 50 132 68 Z" fill="#F6E7CE" stroke="#C9A66B" stroke-width="3"/>
    <ellipse cx="100" cy="110" rx="70" ry="66" fill="#fff" stroke="#3a2a1a" stroke-width="4"/>
    <path d="M55 70 Q45 88 62 92 Q70 74 55 70Z" fill="#2c2320"/>
    <path d="M150 130 Q168 120 160 140 Q140 148 150 130Z" fill="#2c2320"/>
    <ellipse cx="100" cy="145" rx="42" ry="34" fill="#FBD9E8" stroke="#E29ABB" stroke-width="4"/>
    <circle cx="86" cy="146" r="6" fill="#D68CAE"/><circle cx="114" cy="146" r="6" fill="#D68CAE"/>
    <ellipse cx="80" cy="100" rx="15" ry="17" fill="#fff" stroke="#3a2a1a" stroke-width="3"/>
    <ellipse cx="120" cy="100" rx="15" ry="17" fill="#fff" stroke="#3a2a1a" stroke-width="3"/>
    <circle cx="82" cy="103" r="7" fill="#3a2a1a"/><circle cx="118" cy="103" r="7" fill="#3a2a1a"/>
    <circle cx="84" cy="101" r="2.4" fill="#fff"/><circle cx="120" cy="101" r="2.4" fill="#fff"/>
    <path d="M66 88 q14 -10 26 -2" stroke="#3a2a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M108 86 q14 -8 26 2" stroke="#3a2a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <g transform="translate(66 30) scale(1.3)">${bow}</g>
  </svg>`;

    const horse = `
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Caballito">
    <ellipse cx="100" cy="185" rx="55" ry="10" fill="rgba(0,0,0,.08)"/>
    <path d="M70 40 Q60 20 80 30 Q78 46 70 50Z" fill="#E7A76B" stroke="#B87333" stroke-width="3"/>
    <path d="M130 40 Q140 20 120 30 Q122 46 130 50Z" fill="#E7A76B" stroke="#B87333" stroke-width="3"/>
    <path d="M60 60 Q50 40 68 44 Q90 30 118 40 Q136 34 132 58 Q150 90 138 130 Q145 150 120 158 L80 158 Q55 150 62 128 Q50 92 60 60Z" fill="#E7A76B" stroke="#B87333" stroke-width="4"/>
    <path d="M100 150 Q80 172 100 180 Q120 172 100 150Z" fill="#F4E3D0" stroke="#D9B98F" stroke-width="3"/>
    <ellipse cx="90" cy="163" rx="4" ry="5" fill="#8a5a33"/><ellipse cx="110" cy="163" rx="4" ry="5" fill="#8a5a33"/>
    <circle cx="82" cy="98" r="11" fill="#fff" stroke="#3a2a1a" stroke-width="3"/>
    <circle cx="118" cy="98" r="11" fill="#fff" stroke="#3a2a1a" stroke-width="3"/>
    <circle cx="83" cy="100" r="6" fill="#3a2a1a"/><circle cx="117" cy="100" r="6" fill="#3a2a1a"/>
    <circle cx="85" cy="98" r="2" fill="#fff"/><circle cx="119" cy="98" r="2" fill="#fff"/>
    <path d="M60 44 Q78 55 70 90 Q60 70 52 78 Q64 58 60 44Z" fill="#F4D98B" stroke="#E0BE5E" stroke-width="2.5"/>
    <path d="M95 30 Q110 40 108 70 Q98 52 92 60 Q100 44 95 30Z" fill="#F4D98B" stroke="#E0BE5E" stroke-width="2.5"/>
    <g transform="translate(118 28) scale(1.1)">${bow}</g>
  </svg>`;

    const chick = `
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pollito">
    <ellipse cx="100" cy="188" rx="42" ry="8" fill="rgba(0,0,0,.08)"/>
    <path d="M100 40 L108 60 L92 60Z" fill="#EF6D3A"/>
    <ellipse cx="100" cy="120" rx="62" ry="58" fill="#F9C332" stroke="#E0A400" stroke-width="4"/>
    <ellipse cx="100" cy="90" rx="40" ry="36" fill="#FCD84E" stroke="#E0A400" stroke-width="3"/>
    <circle cx="86" cy="86" r="9" fill="#fff" stroke="#3a2a1a" stroke-width="2.5"/>
    <circle cx="114" cy="86" r="9" fill="#fff" stroke="#3a2a1a" stroke-width="2.5"/>
    <circle cx="87" cy="88" r="5" fill="#3a2a1a"/><circle cx="115" cy="88" r="5" fill="#3a2a1a"/>
    <path d="M92 100 L108 100 L100 112Z" fill="#EF6D3A"/>
    <circle cx="74" cy="100" r="6" fill="#F7A6C6" opacity=".7"/>
    <circle cx="126" cy="100" r="6" fill="#F7A6C6" opacity=".7"/>
    <path d="M48 120 Q30 128 46 142 Q56 132 60 132Z" fill="#F4B733" stroke="#E0A400" stroke-width="2.5"/>
    <g transform="translate(64 24) scale(1)">${bow}</g>
  </svg>`;

    const setSVG = (id, svg) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = svg;
    };
    setSVG("animal-cow", cow);
    setSVG("animal-horse", horse);
    setSVG("animal-chick", chick);

    /* -------- 3. Cuenta regresiva -------- */
    const TARGET = new Date("2026-08-29T10:10:00").getTime();
    const el = {
        d: document.getElementById("cd-days"),
        h: document.getElementById("cd-hours"),
        m: document.getElementById("cd-mins"),
        s: document.getElementById("cd-secs"),
        done: document.getElementById("cd-done"),
        clock: document.querySelector(".clock"),
    };
    const pad = (n) => String(n).padStart(2, "0");

    function tick() {
        const diff = TARGET - Date.now();
        if (diff <= 0) {
            if (el.clock) el.clock.hidden = true;
            if (el.done) el.done.hidden = false;
            clearInterval(timer);
            return;
        }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        if (el.d) el.d.textContent = pad(d);
        if (el.h) el.h.textContent = pad(h);
        if (el.m) el.m.textContent = pad(m);
        if (el.s) el.s.textContent = pad(s);
    }
    tick();
    const timer = setInterval(tick, 1000);

    /* -------- 4. Carrusel -------- */
    const track = document.getElementById("slider-track");
    const dotsWrap = document.getElementById("slider-dots");
    if (track && dotsWrap) {
        const slides = track.querySelectorAll(".slide");
        let index = 0;
        slides.forEach((_, i) => {
            const b = document.createElement("button");
            b.className = "dot" + (i === 0 ? " is-active" : "");
            b.setAttribute("aria-label", "Ir a la foto " + (i + 1));
            b.addEventListener("click", () => go(i));
            dotsWrap.appendChild(b);
        });
        const dots = dotsWrap.querySelectorAll(".dot");

        function go(i) {
            index = (i + slides.length) % slides.length;
            track.scrollTo({
                left: track.clientWidth * index,
                behavior: "smooth",
            });
            dots.forEach((d, k) =>
                d.classList.toggle("is-active", k === index),
            );
        }
        document
            .getElementById("slide-next")
            .addEventListener("click", () => go(index + 1));
        document
            .getElementById("slide-prev")
            .addEventListener("click", () => go(index - 1));

        let auto = setInterval(() => go(index + 1), 5000);
        const slider = track.closest(".slider");
        slider.addEventListener("mouseenter", () => clearInterval(auto));
        slider.addEventListener("mouseleave", () => {
            auto = setInterval(() => go(index + 1), 5000);
        });
        window.addEventListener("resize", () =>
            track.scrollTo({ left: track.clientWidth * index }),
        );
    }

    /* -------- 5. Contador de confirmaciones -------- */
    const countEl = document.getElementById("conf-count");

    const getLocalCount = () => {
        const n = parseInt(localStorage.getItem(STORE_KEY), 10);
        return Number.isFinite(n) ? n : 0;
    };
    const addLocalCount = (extra) => {
        const total = getLocalCount() + extra;
        try {
            localStorage.setItem(STORE_KEY, String(total));
        } catch (_) {}
        return total;
    };
    const currentTotal = () => CONF_BASE + getLocalCount();

    function animateCount(to) {
        if (!countEl) return;
        const from = parseInt(countEl.dataset.count, 10) || 0;
        countEl.dataset.count = String(to);
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReduced || from === to) {
            countEl.textContent = to;
            return;
        }
        const dur = 900,
            start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        function step(now) {
            const p = Math.min((now - start) / dur, 1);
            countEl.textContent = Math.round(from + (to - from) * ease(p));
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function bumpCounter() {
        const box = countEl && countEl.closest(".counter");
        if (!box) return;
        box.classList.remove("counter--bump");
        void box.offsetWidth; // reinicia la animación
        box.classList.add("counter--bump");
    }

    // Contador compartido opcional (si configuraste un endpoint), si no usa el navegador
    async function loadSharedCount() {
        if (!COUNTER_ENDPOINT) return null;
        try {
            const r = await fetch(COUNTER_ENDPOINT, {
                headers: { Accept: "application/json" },
            });
            if (!r.ok) return null;
            const d = await r.json();
            return typeof d.value === "number" ? d.value : null;
        } catch (_) {
            return null;
        }
    }

    // Anima el contador cuando entra en pantalla
    if (countEl) {
        let counterShown = false;
        const startCounter = async () => {
            if (counterShown) return;
            counterShown = true;
            const shared = await loadSharedCount();
            animateCount(shared !== null ? shared : currentTotal());
        };
        if ("IntersectionObserver" in window) {
            const co = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            startCounter();
                            co.disconnect();
                        }
                    });
                },
                { threshold: 0.4 },
            );
            co.observe(countEl);
        } else {
            startCounter();
        }
    }

    /* -------- 6. Formulario RSVP (Formspree) -------- */
    const form = document.getElementById("rsvp-form");
    if (form) {
        const msg = document.getElementById("form-msg");
        const submit = document.getElementById("rsvp-submit");
        const waBtn = document.getElementById("wa-copy");

        const showMsg = (text, ok) => {
            msg.textContent = text;
            msg.hidden = false;
            msg.classList.remove("form__msg--ok", "form__msg--err");
            msg.classList.add(ok ? "form__msg--ok" : "form__msg--err");
        };

        // Arma el enlace de WhatsApp con los datos del formulario
        const buildWhatsApp = (data) => {
            const asiste = /^S/i.test(data.confirmacion || "");
            const lineas = [
                asiste
                    ? "¡Hola! Confirmo mi asistencia a *La Granja de Dany* 🐮🎉"
                    : "¡Hola! Lamento avisar que *no podré asistir* a La Granja de Dany 😢",
                "",
                "👤 Nombre: " + (data.nombre || "-"),
                "📞 Teléfono: " + (data.telefono || "-"),
                "👨‍👩‍👧 Asistentes: " + (data.asistentes || "-"),
                "✅ Confirmación: " + (data.confirmacion || "-"),
            ];
            if (data.mensaje && data.mensaje.trim())
                lineas.push("💌 Mensaje: " + data.mensaje.trim());
            const texto = encodeURIComponent(lineas.join("\n"));
            return "https://wa.me/" + HOST_WHATSAPP + "?text=" + texto;
        };

        const parseAttendees = (v) => {
            const n = parseInt(v, 10);
            return Number.isFinite(n) ? n : 1;
        };

        // Cierra el flujo tras una confirmación válida: contador + WhatsApp + mensaje
        const finishConfirmation = (data, emailed) => {
            const asiste = /^S/i.test(data.confirmacion || "");

            // Contador: solo suma si la persona SÍ asistirá y no se contó ya en este equipo
            if (asiste && !COUNTER_ENDPOINT) {
                addLocalCount(parseAttendees(data.asistentes));
                animateCount(currentTotal());
                bumpCounter();
            }

            // Botón de copia por WhatsApp
            if (waBtn) {
                waBtn.href = buildWhatsApp(data);
                waBtn.hidden = false;
            }

            const base = asiste
                ? "¡Gracias! Confirmación registrada. 🎉 Nos vemos en la granja."
                : "¡Gracias por avisar! 💛 Te vamos a extrañar.";
            showMsg(
                base +
                    (emailed
                        ? ""
                        : " (modo demo: configura Formspree para recibirla por correo)"),
                true,
            );
        };

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Validación nativa + marcado de campos con error
            form.querySelectorAll(".has-error").forEach((f) =>
                f.classList.remove("has-error"),
            );
            if (!form.checkValidity()) {
                form.querySelectorAll(":invalid").forEach((el) => {
                    const field = el.closest(".field");
                    if (field) field.classList.add("has-error");
                });
                showMsg("Revisa los campos marcados, por favor. 🙏", false);
                const firstInvalid = form.querySelector(":invalid");
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Captura los datos antes de enviar/limpiar
            const fd = new FormData(form);
            const data = Object.fromEntries(fd.entries());

            // Modo demo: si aún no se configuró Formspree, confirma localmente (contador + WhatsApp)
            if (form.action.includes("TU_ID")) {
                finishConfirmation(data, false);
                form.reset();
                return;
            }

            const originalText = submit.textContent;
            submit.disabled = true;
            submit.textContent = "Enviando…";

            try {
                const res = await fetch(form.action, {
                    method: "POST",
                    body: fd,
                    headers: { Accept: "application/json" },
                });
                if (res.ok) {
                    finishConfirmation(data, true);
                    form.reset();
                } else {
                    const err = await res.json().catch(() => ({}));
                    const detail = err.errors
                        ? err.errors.map((x) => x.message).join(", ")
                        : "";
                    showMsg(
                        "Hubo un problema al enviar" +
                            (detail ? ": " + detail : ". Intenta de nuevo."),
                        false,
                    );
                }
            } catch (_) {
                showMsg(
                    "No se pudo enviar. Revisa tu conexión e intenta otra vez.",
                    false,
                );
            } finally {
                submit.disabled = false;
                submit.textContent = originalText;
            }
        });
    }

    /* -------- 7. Scroll reveal -------- */
    const reveals = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
        );
        reveals.forEach((r) => io.observe(r));
    } else {
        reveals.forEach((r) => r.classList.add("is-visible"));
    }
})();
