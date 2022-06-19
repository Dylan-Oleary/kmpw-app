import { Breed, SafetyLevel, WeightClass } from "@/types";

export type Dog = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    breed: Breed;
    name: string;
    safetyLevel: SafetyLevel;
    size: DogSize;
    birthday?: Date;
    description?: string;
    heightImperial?: number;
    heightMetric?: number;
    profilePicture?: string;
    weightImperial?: number;
    weightMetric?: number;
};

export type DogSize = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    weightClass: WeightClass;
};

export interface DogFormSubmission {
    id?: string;
    breed: Breed;
    name: string;
    weightImperial: number;
    birthday?: Date;
}

export interface GraphQlDogMutationData {
    birthday?: string;
    breedId: string;
    name: string;
    profilePicture?: string;
    weightImperial: number;
}
