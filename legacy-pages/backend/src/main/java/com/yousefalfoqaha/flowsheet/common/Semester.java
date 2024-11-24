package com.yousefalfoqaha.flowsheet.common;

public enum Semester {
    FIRST(21),
    SECOND(21),
    SUMMER(10);

    private final int creditHourLimit;

    Semester(int creditHourLimit) {
        this.creditHourLimit = creditHourLimit;
    }

    public int getCreditHourLimit() {
        return creditHourLimit;
    }
}
