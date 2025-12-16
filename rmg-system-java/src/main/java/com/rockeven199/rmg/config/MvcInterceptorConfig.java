package com.rockeven199.rmg.config;

import com.rockeven199.rmg.Interceptor.JWTInterceptors;
import com.rockeven199.rmg.Interceptor.RedisInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcInterceptorConfig implements WebMvcConfigurer {
//    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new JWTInterceptors())
                .addPathPatterns("/controlCenter/*")
                .addPathPatterns("/purchase/*")
                .addPathPatterns("/employee/*")
                .addPathPatterns("/resource/*")
                .addPathPatterns("/suppliers/*")
                .addPathPatterns("/Support/*")
                .addPathPatterns("/user/*")
                .excludePathPatterns("/base/*")
                .excludePathPatterns("/login/*");
        registry.addInterceptor(new RedisInterceptor());
    }
}
