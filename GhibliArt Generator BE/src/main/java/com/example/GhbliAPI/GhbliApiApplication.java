package com.example.GhbliAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class GhbliApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GhbliApiApplication.class, args);
	}

}
