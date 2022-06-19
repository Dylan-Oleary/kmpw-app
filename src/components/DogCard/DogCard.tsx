import React, { FC, useState } from "react";
import { StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PencilAltIcon from "@/assets/svg/pencil-alt.svg";
import DogImage from "@/assets/images/test-pup.jpg";
import { Avatar, Container, SafetyLevel, Text, TextProps, UpdateActions } from "@/components";
import { getDogAge } from "@/lib";
import { HomeStackNavigationProp } from "@/navigation";
import { Dog } from "@/types";

import { styles } from "./styles";

interface DogCardProps extends TouchableOpacityProps {
    dog: Dog;
}

interface DogInformationProps extends Pick<TextProps, "size"> {
    label: string;
    style?: StyleProp<ViewStyle>;
    value?: string;
}

export const DogCard: FC<DogCardProps> = ({ dog, ...props }) => {
    const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState<boolean>(false);
    const { navigate } = useNavigation<HomeStackNavigationProp>();
    const { birthday, breed, name, safetyLevel, weightImperial } = dog;

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
                        <DogInformation label="Weight" value={`${weightImperial} lbs`} />
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
                    onDeletePress={() => navigate("ConfirmRemoveDog", { dog })}
                    onUpdatePress={() => navigate("AddOrEditDog", { dog })}
                    style={styles.footerContainer}
                />
            ) : (
                <SafetyLevel {...safetyLevel} style={styles.footerContainer} />
            )}
        </TouchableOpacity>
    );
};

export const DogInformation: FC<DogInformationProps> = ({ label, size = "xs", style, value }) => (
    <View style={[styles.infoRowItem, style]}>
        <Text size={size}>{label}</Text>
        <Text size={size} style={styles.infoValue}>
            {value || <>&#8212;</>}
        </Text>
    </View>
);
