import { DogSize } from "@/types";

export type Breed = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    breedGroup: BreedGroup;
    name: string;
    size: DogSize;
    heightImperialAvg: number;
    heightImperialMax: number;
    heightImperialMin: number;
    heightMetricAvg: number;
    heightMetricMax: number;
    heightMetricMin: number;
    lifeSpanAvg: number;
    lifeSpanMax: number;
    lifeSpanMin: number;
    weightImperialAvg: number;
    weightImperialMax: number;
    weightImperialMin: number;
    countryCode?: string;
    description?: string;
    origin?: string;
    wikipediaUrl?: string;
};

export type BreedGroup = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    name: string;
    description?: string;
};
