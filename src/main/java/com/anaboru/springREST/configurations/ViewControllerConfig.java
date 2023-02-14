package com.anaboru.springREST.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ViewControllerConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("", "/");
        registry.addViewController("/user").setViewName("user/user-page");
        registry.addViewController("/admin").setViewName("admin/admin-page");
    }
}
