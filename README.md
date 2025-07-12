# Presupuesto Inteligente - Frontend

## Descripción
Presupuesto Inteligente es una aplicación web desarrollada con Angular que ayuda a los usuarios a gestionar sus finanzas personales a través de presupuestos automatizados y personalizados. La aplicación analiza la situación financiera del usuario mediante un cuestionario y genera recomendaciones de distribución del presupuesto con **IA simulada.**

## Características Principales

- **Autenticación de usuarios**: Sistema completo de registro e inicio de sesión
- **Cuestionario paso a paso**: Formulario interactivo para recopilar información financiera
- **Generación de presupuestos**: Algoritmo inteligente para crear presupuestos personalizados
- **Visualización gráfica**: Gráficos y tablas para representar la distribución del presupuesto
- **Diseño responsive**: Funciona en dispositivos móviles y de escritorio
- **Interfaz moderna**: Implementada con Angular Material para una experiencia de usuario consistente

## Tecnologías

- **Angular 20+**: Framework base para el desarrollo frontend
- **Angular Material**: Componentes UI y sistema de diseño
- **Chart.js/ng2-charts**: Visualización de datos
- **RxJS**: Programación reactiva
- **JWT**: Autenticación basada en tokens

## Requisitos Previos

- Node.js (versión recomendada: LTS)
- Angular CLI (instalado globalmente)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/presupuesto-inteligente-frontend.git
cd presupuesto-inteligente-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Revisa y ajusta `src/environments/environment.ts` para desarrollo
   - Configura `src/environments/environment.prod.ts` para producción

4. Iniciar el servidor de desarrollo:
```bash
ng serve
```

5. Navega a `http://localhost:4200/` para ver la aplicación funcionando

## Estructura del Proyecto

La aplicación sigue una arquitectura modular y principios de Clean Code:

- **core/**: Servicios e interceptores esenciales para la aplicación
  - **auth/**: Autenticación y manejo de tokens
  - **interceptors/**: Interceptor JWT para peticiones HTTP
  - **services/**: Servicios centrales como el API service
  
- **shared/**: Componentes y modelos compartidos
  - **models/**: DTOs e interfaces

- **auth/**: Módulos relacionados con la autenticación
  - **login/**: Componente de inicio de sesión
  - **register/**: Componente de registro

- **presupuesto/**: Funcionalidad principal
  - **preguntas/**: Formulario paso a paso para recolección de datos
  - **resultados/**: Visualización de presupuestos generados

## Funcionalidad

1. El usuario se registra o inicia sesión
2. Completa un formulario con información sobre su situación financiera
3. El sistema envía los datos a una API backend que procesa la información
4. Se genera una recomendación de presupuesto adaptada a las necesidades del usuario
5. El usuario puede ver gráficamente cómo distribuir sus ingresos

## Despliegue

Para construir el proyecto para producción:

```bash
ng build --configuration production
```

Los archivos generados estarán en el directorio `dist/`, listos para ser desplegados en cualquier servidor web.

## API Backend

Esta aplicación frontend se comunica con un API REST backend. Asegúrate de configurar correctamente la URL del backend en los archivos de entorno.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un pull request o reporta problemas en la sección de issues del repositorio.

## Licencia

[MIT](LICENSE)

---

Desarrollado con ❤️ por Luis Chinchihualpa
