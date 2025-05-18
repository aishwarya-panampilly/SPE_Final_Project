package com.planner.auth.controller;

import com.planner.auth.model.User;
import com.planner.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Allow cross-origin requests
public class AuthController {
//hello again helpppppp crying
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        String confirmPassword = payload.get("confirmPassword");

        if (!password.equals(confirmPassword)) {
            return "Passwords do not match";
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);

        boolean success = authService.register(user);
        return success ? "User registered successfully" : "Username already exists";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        boolean authenticated = authService.authenticate(user.getUsername(), user.getPassword());
        return authenticated ? "Login successful" : "Invalid credentials";
    }
}
