package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class DepartmentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Department getDepartmentSample1() {
        return new Department().key(1L).id(1L).team("team1");
    }

    public static Department getDepartmentSample2() {
        return new Department().key(2L).id(2L).team("team2");
    }

    public static Department getDepartmentRandomSampleGenerator() {
        return new Department().key(longCount.incrementAndGet()).id(longCount.incrementAndGet()).team(UUID.randomUUID().toString());
    }
}
