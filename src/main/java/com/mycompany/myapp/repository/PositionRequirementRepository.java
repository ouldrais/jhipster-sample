package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PositionRequirement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PositionRequirement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PositionRequirementRepository extends JpaRepository<PositionRequirement, Long> {}
