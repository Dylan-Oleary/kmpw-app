import React, { FC, useState } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { useDeleteDogMutation } from "@/api/graphql/mutations/useDeleteDogMutation";
import DogImage from "@/assets/images/test-pup.jpg";
import PencilAltIcon from "@/assets/svg/pencil-alt.svg";
import { Avatar, Container, SafetyLevel, Text, UpdateActions } from "@/components";
import { getDogAge } from "@/lib";
import { Dog } from "@/types";

import { styles } from "./styles";

interface IDogCardProps extends TouchableOpacityProps {
    dog: Dog;
}

interface IDogInformationProps {
    label: string;
    value?: string;
}

export const DogCard: FC<IDogCardProps> = ({ dog, ...props }) => {
    const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState<boolean>(false);
    const { birthday, breed, id, name, safetyLevel, weightMetric } = dog;
    const { deleteDog } = useDeleteDogMutation(id);

    const onLongPress = () => {
        if (isUpdateMenuOpen) return;

        setIsUpdateMenuOpen(true);
    };

    return (
        <TouchableOpacity
            activeOpacity={isUpdateMenuOpen ? 1 : 0.85}
            onLongPress={onLongPress}
            {...props}
        >
            <Container style={styles.infoContainer}>
                <TouchableOpacity
                    onPress={() => setIsUpdateMenuOpen(!isUpdateMenuOpen)}
                    style={styles.editIconContainer}
                >
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
            {isUpdateMenuOpen ? (
                <UpdateActions
                    onExitPress={() => setIsUpdateMenuOpen(false)}
                    onDeletePress={deleteDog}
                    onUpdatePress={() => true}
                    style={styles.footerContainer}
                />
            ) : (
                <SafetyLevel {...safetyLevel} style={styles.footerContainer} />
            )}
        </TouchableOpacity>
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
