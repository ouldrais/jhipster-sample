package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TeamPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TeamPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamPlanRepository extends JpaRepository<TeamPlan, Long> {}
