package com.YEP4510.YEP4510.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTests {
    // Valores artificiais usados exclusivamente nos testes.
    private static final String TEST_SECRET = "a".repeat(32);

    @Test
    void rejectsMissingBlankAndShortSecrets() {
        assertThrows(IllegalArgumentException.class, () -> new JwtUtil(null));
        assertThrows(IllegalArgumentException.class, () -> new JwtUtil(""));
        assertThrows(IllegalArgumentException.class, () -> new JwtUtil(" ".repeat(32)));
        assertThrows(IllegalArgumentException.class, () -> new JwtUtil("a".repeat(31)));
    }

    @Test
    void acceptsTokensSignedWithTheConfiguredSecretAndPreservesClaims() {
        JwtUtil issuer = new JwtUtil(TEST_SECRET);
        JwtUtil verifier = new JwtUtil(TEST_SECRET);
        String token = issuer.generateToken("candidato-teste", "CANDIDATO");
        assertTrue(verifier.validateToken(token));
        assertEquals("candidato-teste", verifier.getLoginFromToken(token));
        assertEquals("CANDIDATO", verifier.getTipoFromToken(token));
    }

    @Test
    void rejectsTokensAfterSecretRotation() {
        String token = new JwtUtil(TEST_SECRET).generateToken("teste", "CANDIDATO");
        assertFalse(new JwtUtil("b".repeat(32)).validateToken(token));
    }

    @Test
    void rejectsExpiredMalformedAndEmptyTokens() {
        JwtUtil verifier = new JwtUtil(TEST_SECRET);
        String expired = Jwts.builder().setSubject("teste")
                .setExpiration(new Date(System.currentTimeMillis() - 60000))
                .signWith(Keys.hmacShaKeyFor(TEST_SECRET.getBytes(StandardCharsets.UTF_8)),
                        SignatureAlgorithm.HS256).compact();
        assertFalse(verifier.validateToken(expired));
        assertFalse(verifier.validateToken("invalido"));
        assertFalse(verifier.validateToken(""));
        assertFalse(verifier.validateToken(null));
    }
}
