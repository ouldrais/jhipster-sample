package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ResourcePlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ResourcePlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResourcePlanRepository extends JpaRepository<ResourcePlan, Long> {}
