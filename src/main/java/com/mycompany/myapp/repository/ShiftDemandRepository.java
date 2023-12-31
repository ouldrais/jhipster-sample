package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ShiftDemand;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ShiftDemand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShiftDemandRepository extends JpaRepository<ShiftDemand, Long> {}
