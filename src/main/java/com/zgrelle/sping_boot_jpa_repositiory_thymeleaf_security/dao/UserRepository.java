package com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.dao;

import com.zgrelle.sping_boot_jpa_repositiory_thymeleaf_security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

//    @Query("select b from User b where b.userName = :name")
//    User getUserByName(@Param("name") String name);
      User findUserByEmail(String email);

}
