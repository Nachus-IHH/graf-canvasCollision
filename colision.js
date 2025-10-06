// Declaración de variables
const canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

// Clase Circle
class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.originalColor = color; // Guardamos el color original
        this.text = text;
        this.speed = speed;
        this.dx = (Math.random() < 0.5 ? -1 : 1) * this.speed;
        this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.posX += this.dx;
        this.posY += this.dy;

        // Rebote en bordes del canvas
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.draw(context);
    }

    // Método para detectar colisión con otro círculo
    detectCollision(otherCircle) {
        let dx = this.posX - otherCircle.posX;
        let dy = this.posY - otherCircle.posY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        return distance < this.radius + otherCircle.radius;
    }

    // Método para manejar la colisión
    handleCollision(isColliding) {
        if (isColliding) {
            this.color = "#0000FF"; // Azul durante la colisión
        } else {
            this.color = this.originalColor; // Regresar a color original
        }
    }
}

// Crear un array para almacenar los círculos
let circles = [];

// Función para generar círculos aleatorios
function generateCircles(n) {
    for (let i = 0; i < n; i++) {
        let radius = Math.random() * 30 + 20; // Radio entre 20 y 50
        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;
        let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Color aleatorio
        let speed = Math.random() * 4 + 1; // Velocidad entre 1 y 5
        let text = `C${i + 1}`;
        circles.push(new Circle(x, y, radius, color, text, speed));
    }
}

// Función para animar los círculos y detectar colisiones
function animate() {
    ctx.clearRect(0, 0, window_width, window_height);

    // Detectar colisiones entre todos los pares de círculos
    for (let i = 0; i < circles.length; i++) {
        let circleA = circles[i];
        let isColliding = false;

        for (let j = 0; j < circles.length; j++) {
            if (i !== j) {
                let circleB = circles[j];
                if (circleA.detectCollision(circleB)) {
                    isColliding = true;
                    circleB.handleCollision(true);
                } else {
                    circleB.handleCollision(false);
                }
            }
        }

        circleA.handleCollision(isColliding);
    }

    // Actualizar cada círculo
    circles.forEach(circle => {
        circle.update(ctx);
    });

    requestAnimationFrame(animate);
}

// Generar 15 círculos y comenzar la animación
generateCircles(20);
animate();
