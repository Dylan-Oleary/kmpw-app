import React, { FC } from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";

import DogImage from "@/assets/images/test-pup.jpg";
import PencilAltIcon from "@/assets/svg/pencil-alt.svg";
import { Avatar, Container, SafetyLevel, Text } from "@/components";
import { getDogAge } from "@/lib";
import { Dog } from "@/types";

import { styles } from "./styles";

interface IDogCardProps extends ViewProps {
    dog: Dog;
}

interface IDogInformationProps {
    label: string;
    value?: string;
}

export const DogCard: FC<IDogCardProps> = ({ dog, ...props }) => {
    const { birthday, breed, name, safetyLevel, weightMetric } = dog;

    return (
        <Container {...props}>
            <Container style={styles.infoContainer}>
                <TouchableOpacity style={styles.editIconContainer}>
                    <PencilAltIcon color={styles.editIcon.color} />
                </TouchableOpacity>
                <View style={styles.dogImageColumn}>
                    <Avatar source={DogImage} />
                </View>
                <View style={styles.dogInfoContainer}>
                    <View style={styles.infoRow}>
                        <DogInformation label="Name" value={name} />
                        <DogInformation label="Weight" value={`${weightMetric} lbs`} />
                    </View>
                    <View style={[styles.infoRow, styles.nthInfoRow]}>
                        <DogInformation label="Breed" value={breed?.name} />
                        <DogInformation label="Age" value={getDogAge(birthday)} />
                    </View>
                </View>
            </Container>
            <SafetyLevel {...safetyLevel} />
        </Container>
    );
};

export const DogInformation: FC<IDogInformationProps> = ({ label, value }) => (
    <View style={styles.infoRowItem}>
        <Text size="xs" style={styles.infoLabel}>
            {label}
        </Text>
        <Text size="xs" style={styles.infoValue}>
            {value || <>&#8212;</>}
        </Text>
    </View>
);
