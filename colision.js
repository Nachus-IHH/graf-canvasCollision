// === CONFIGURACIÓN DEL CANVAS ===
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "#e9e4b0";

// === VARIABLES GLOBALES ===
let zombies = [];
let eliminados = 0;
let horda = 1;
let tiempo = 0;
const maxZombies = 12;

// === CLASE ZOMBIE ===
class Zombie {
    constructor(x, y, tipo, velocidadBase) {
        this.x = x;
        this.y = y;
        this.tipo = tipo;
        this.velocidad = velocidadBase + Math.random() * 1.5;
        this.size = tipo === "mini" ? 20 : 35;
        this.vidas = tipo === "fuerte" ? 2 : 1;
        this.color = this.asignarColor();
    }

    asignarColor() {
        switch (this.tipo) {
            case "fuerte": return "#4b5320"; // verde oscuro
            case "dividido": return "#7cc36f"; // verde claro
            case "mini": return "#b6f29b";
            default: return "#3e8e41"; // normal
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // ojos tipo caricatura
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x - this.size / 4, this.y - this.size / 4, this.size / 5, 0, Math.PI * 2);
        ctx.arc(this.x + this.size / 4, this.y - this.size / 4, this.size / 5, 0, Math.PI * 2);
        ctx.fill();

        // pupilas
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x - this.size / 4, this.y - this.size / 4, this.size / 10, 0, Math.PI * 2);
        ctx.arc(this.x + this.size / 4, this.y - this.size / 4, this.size / 10, 0, Math.PI * 2);
        ctx.fill();

        // boca simple
        ctx.beginPath();
        ctx.moveTo(this.x - this.size / 3, this.y + this.size / 4);
        ctx.lineTo(this.x + this.size / 3, this.y + this.size / 4);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    update() {
        this.y += this.velocidad + horda * 0.2; // aumenta con la horda
        if (this.y - this.size > canvas.height) {
            // Reaparece arriba si cae fuera del lienzo
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    clicDentro(x, y) {
        let dx = this.x - x;
        let dy = this.y - y;
        return Math.sqrt(dx * dx + dy * dy) < this.size;
    }
}

// === FUNCIÓN PARA GENERAR ZOMBIES ===
function generarZombie() {
    const tipos = ["normal", "fuerte", "dividido"];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const x = Math.random() * canvas.width;
    const y = Math.random() * -200; // para que salgan de arriba
    const velocidad = 1 + Math.random() * 2;
    zombies.push(new Zombie(x, y, tipo, velocidad));
}

// === CONTROL DE CLICS ===
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = zombies.length - 1; i >= 0; i--) {
        let z = zombies[i];
        if (z.clicDentro(mouseX, mouseY)) {
            z.vidas--;
            if (z.vidas <= 0) {
                eliminados++;

                // Si es zombie dividido, genera dos mini-zombies
                if (z.tipo === "dividido") {
                    for (let k = 0; k < 2; k++) {
                        zombies.push(new Zombie(z.x + (Math.random() * 30 - 15), z.y, "mini", 2));
                    }
                }

                zombies.splice(i, 1);
                generarZombie(); // mantener cantidad constante
            }
            break;
        }
    }
});

// === ANIMACIÓN PRINCIPAL ===
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    zombies.forEach(z => {
        z.update();
        z.draw(ctx);
    });

    // HUD - Contador
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`💀 Eliminados: ${eliminados}`, canvas.width - 20, 30);
    ctx.fillText(`Horda: ${horda}`, canvas.width - 20, 60);

    // Cada 10 segundos aumenta la horda
    tiempo += 1;
    if (tiempo % (60 * 10) === 0) {
        horda++;
    }

    requestAnimationFrame(animate);
}

// === INICIALIZACIÓN ===
for (let i = 0; i < maxZombies; i++) {
    generarZombie();
}
animate();
