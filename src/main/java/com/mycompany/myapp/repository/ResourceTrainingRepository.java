package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ResourceTraining;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ResourceTraining entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResourceTrainingRepository extends JpaRepository<ResourceTraining, Long> {}
