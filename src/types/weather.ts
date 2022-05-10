export type Weather = {
    current: {
        condition: {
            code: number;
            text: string;
        };
        feelslike_c: number;
        feelslike_f: number;
        temp_c: number;
        temp_f: number;
    };
    location: {
        name: string;
        region: string;
    };
};
