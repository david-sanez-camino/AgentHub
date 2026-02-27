package com.agenthub.service;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${jwt.secret}") private String secret;
    @Value("${jwt.espiration}") private Long expiration;

    public String extractUsername(String token){
        return exctractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        return resolver.apply(Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody());
    }

    public Boolean validateToken(String token, UserDetails ud){
        Date exp = extractClaim(token, Claims::getExpiration);
        return extractUsername(token).equals(ud.getUsername()) && !exp.before(new Date());
    }

    public String generateToken(String email) {
        return Jwts.builder().setSubject(email).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + expiration)).signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private Key getSgnKey() { 
        return Keys.hmacShaKeyFor(secret.getBytes()); 
    }
}