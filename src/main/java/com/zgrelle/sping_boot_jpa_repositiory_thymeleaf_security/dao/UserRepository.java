package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.dao;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select b from User b where b.userName = :name")
    User getUserByName(@Param("name") String name);

}
