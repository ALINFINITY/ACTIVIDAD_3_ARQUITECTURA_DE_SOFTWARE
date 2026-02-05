FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia el JAR generado
COPY target/autores-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto
EXPOSE 8000

# Ejecuta la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]