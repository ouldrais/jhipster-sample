package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ResourceTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Resource getResourceSample1() {
        return new Resource().key(1L).id(1L).firstName("firstName1").lastName("lastName1").teamRole("teamRole1");
    }

    public static Resource getResourceSample2() {
        return new Resource().key(2L).id(2L).firstName("firstName2").lastName("lastName2").teamRole("teamRole2");
    }

    public static Resource getResourceRandomSampleGenerator() {
        return new Resource()
            .key(longCount.incrementAndGet())
            .id(longCount.incrementAndGet())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .teamRole(UUID.randomUUID().toString());
    }
}
