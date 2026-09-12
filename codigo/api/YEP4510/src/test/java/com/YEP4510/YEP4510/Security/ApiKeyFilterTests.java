package com.YEP4510.YEP4510.Security;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.util.concurrent.atomic.AtomicBoolean;

import static org.junit.jupiter.api.Assertions.*;

class ApiKeyFilterTests {
    private final JwtUtil jwtUtil = new JwtUtil("a".repeat(32));

    private boolean allowed(String method, String path, String token, String suppliedKey,
                            String configuredKey) throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest(method, path);
        if (token != null) request.addHeader("User-Token", "Bearer " + token);
        if (suppliedKey != null) request.addHeader("X-Api-Key", suppliedKey);
        MockHttpServletResponse response = new MockHttpServletResponse();
        AtomicBoolean passed = new AtomicBoolean(false);
        new ApiKeyFilter(configuredKey, jwtUtil).doFilter(request, response,
                (req, res) -> passed.set(true));
        if (!passed.get()) assertEquals(401, response.getStatus());
        return passed.get();
    }

    @Test
    void browserWritesRequireAValidUserToken() throws Exception {
        assertTrue(allowed("POST", "/clube", jwtUtil.generateToken("teste", "OFICIAL"), null, ""));
        assertFalse(allowed("POST", "/clube", null, null, ""));
        assertFalse(allowed("POST", "/clube", "invalido", null, ""));
        assertFalse(allowed("POST", "/clube", null, "", ""));
    }

    @Test
    void preservesConfiguredServerKeyAndPublicEndpoints() throws Exception {
        assertTrue(allowed("POST", "/clube", null, "test-integration", "test-integration"));
        assertFalse(allowed("POST", "/clube", null, "wrong", "test-integration"));
        assertTrue(allowed("POST", "/auth/login", null, null, ""));
        assertTrue(allowed("GET", "/clube", null, null, ""));
        assertTrue(allowed("OPTIONS", "/clube", null, null, ""));
    }
}
