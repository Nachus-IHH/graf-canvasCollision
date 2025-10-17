# Detección de Colisiones en Animaciones 2D (API Canvas)

## Datos generales
**Materia**: Graficación
**Tema**: Detección de colisiones
**Profesor**: Luis Alejandro Santana Valadez
**Alumno**: Hernández Hernández Ignacio
**Fecha**: 06/10/2025

## Descripción
Este proyecto implementa una **simulación de múltiples círculos en movimiento** dentro de un entorno 2D, utilizando **JavaScript** y la **API Canvas de HTML5**.  
Cada círculo se desplaza de manera independiente con una velocidad y dirección aleatorias, rebotando en los bordes del lienzo y **detectando colisiones con otros círculos**.

El programa aplica los principios de la **Programación Orientada a Objetos (POO)** para estructurar el comportamiento de cada círculo, la animación continua y la detección de colisiones mediante el **cálculo de distancia entre centros**.

Durante las colisiones:
- Los círculos **cambian temporalmente de color a azul** (`#0000FF`), simulando un “flash” visual.  
- **Rebotan** entre sí invirtiendo su dirección de movimiento en el eje de impacto.  
- Luego, **regresan a su color original**.
