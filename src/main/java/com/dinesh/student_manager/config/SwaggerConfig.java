package com.dinesh.student_manager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {

    	return new OpenAPI()

    	        .info(new Info()

    	                .title("Student Management REST API")

    	                .description("Spring Boot REST API with JWT Authentication")

    	                .version("1.0")

    	                .contact(new Contact()
    	                        .name("Dinesh")
    	                        .email("dinesh@example.com"))

    	                .license(new License()
    	                        .name("Apache 2.0")))

    	        .addSecurityItem(
    	                new SecurityRequirement()
    	                        .addList("Bearer Authentication"))

    	        .components(
    	                new Components()

    	                        .addSecuritySchemes(
    	                                "Bearer Authentication",

    	                                new SecurityScheme()

    	                                        .name("Authorization")

    	                                        .type(SecurityScheme.Type.HTTP)

    	                                        .scheme("bearer")

    	                                        .bearerFormat("JWT")));
}
}
