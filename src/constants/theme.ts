const ACTIVE_OPACITY = 0.45;
const DISABLED_OPACITY = 0.7;
const BASE_REM = 16;

const colors = {
    black: "#000000",
    brand1: "#0E3634",
    brand2: "#144643",
    brand3: "#185754",
    brand4: "#257A76",
    brand5: "#2FA19B",
    error1: "#FEE2E2",
    error2: "#FCA5A5",
    error3: "#EF4444",
    error4: "#B91C1C",
    error5: "#991B1B",
    gray1: "#6B7280",
    gray2: "#ADB2B9",
    gray3: "#F2F2F2",
    gray4: "#F6F6F6",
    gray5: "#F7F7F7",
    info1: "#DBEAFE",
    info2: "#93C5FD",
    info3: "#3B82F6",
    info4: "#1D4ED8",
    info5: "#1E40AF",
    success1: "#D1FAE5",
    success2: "#6EE7B7",
    success3: "#10B981",
    success4: "#047857",
    success5: "#065f46",
    textDark: "#454343",
    warning1: "#FEF9C3",
    warning2: "#FDE047",
    warning3: "#EAB308",
    warning4: "#A16207",
    warning5: "#854D0E",
    white: "#FFF"
};

const spacing = {
    0: 0,
    1: BASE_REM * 0.25,
    2: BASE_REM * 0.5,
    3: BASE_REM * 0.75,
    4: BASE_REM,
    5: BASE_REM * 1.25,
    6: BASE_REM * 1.5,
    7: BASE_REM * 1.75,
    8: BASE_REM * 2,
    9: BASE_REM * 2.25,
    10: BASE_REM * 2.5,
    11: BASE_REM * 2.75,
    12: BASE_REM * 3,
    13: BASE_REM * 3.25,
    14: BASE_REM * 3.5,
    15: BASE_REM * 3.75,
    16: BASE_REM * 4
};

const typography = {
    base: {
        fontSize: BASE_REM,
        lineHeight: BASE_REM * 1.5
    },
    xxs: {
        fontSize: BASE_REM * 0.5,
        lineHeight: BASE_REM
    },
    xs: {
        fontSize: BASE_REM * 0.75,
        lineHeight: BASE_REM
    },
    sm: {
        fontSize: BASE_REM * 0.875,
        lineHeight: BASE_REM * 1.25
    },
    lg: {
        fontSize: BASE_REM * 1.125,
        lineHeight: BASE_REM * 1.75
    },
    xl: {
        fontSize: BASE_REM * 1.25,
        lineHeight: BASE_REM * 1.75
    },
    "2xl": {
        fontSize: BASE_REM * 1.5,
        lineHeight: BASE_REM * 2
    },
    "3xl": {
        fontSize: BASE_REM * 1.875,
        lineHeight: BASE_REM * 2.25
    },
    "4xl": {
        fontSize: BASE_REM * 2.25,
        lineHeight: BASE_REM * 2.5
    }
};

export const theme = {
    ACTIVE_OPACITY,
    DISABLED_OPACITY,
    BASE_REM,
    colors,
    spacing,
    typography
};
