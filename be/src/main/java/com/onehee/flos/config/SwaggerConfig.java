package com.onehee.flos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.onehee.flos.controller"))
                .paths(PathSelectors.any())
                .build().apiInfo(apiInfo());

    }

    private ApiInfo apiInfo() {
        String description = "flos backend api";
        return new ApiInfoBuilder()
                .title("flos backend api")
                .description(description)
                .version("1.0")
                .build();
    }
}
