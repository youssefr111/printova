package com.printova.management.repository.cart;

import com.printova.management.entity.cart.Cart;
import com.printova.management.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByUser(User user);
}
