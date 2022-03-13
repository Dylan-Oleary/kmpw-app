const ACTIVE_OPACITY = 0.45;
const BASE_REM = 16;

const colors = {
    black: "#000000",
    brand1: "#0E3634",
    brand2: "#144643",
    brand3: "#185754",
    brand4: "#257A76",
    brand5: "#2FA19B",
    gray1: "#6B7280",
    gray2: "#ADB2B9",
    gray3: "#F2F2F2",
    gray4: "#F6F6F6",
    gray5: "#F7F7F7",
    textDark: "#454343",
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
    12: BASE_REM * 3
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
    BASE_REM,
    colors,
    spacing,
    typography
};
