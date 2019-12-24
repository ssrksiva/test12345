package com.siva.upsc.web.rest.upscController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class upscController {
	@GetMapping("/test")
	public String getNews() {
		return "test";
	}
}
