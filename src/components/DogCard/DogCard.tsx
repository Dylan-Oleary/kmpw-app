import React, { FC } from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";

import DogImage from "../../assets/images/test-pup.jpg";
import PencilAltIcon from "../../assets/svg/pencil-alt.svg";
import { Container } from "../index";
import { styles } from "./styles";
import { Text } from "../Text";
import { Avatar } from "../Avatar";
import { SafetyLevel } from "../SafetyLevel";

interface IDogCardProps extends ViewProps {}

export const DogCard: FC<IDogCardProps> = ({ ...props }) => {
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
                        <View style={styles.infoRowItem}>
                            <Text size="xs" style={styles.infoLabel}>
                                Name
                            </Text>
                            <Text size="xs" style={styles.infoValue}>
                                Roxanne
                            </Text>
                        </View>
                        <View style={styles.infoRowItem}>
                            <Text size="xs" style={styles.infoLabel}>
                                Weight
                            </Text>
                            <Text size="xs" style={styles.infoValue}>
                                56 lbs
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.infoRow, styles.nthInfoRow]}>
                        <View style={styles.infoRowItem}>
                            <Text size="xs" style={styles.infoLabel}>
                                Breed
                            </Text>
                            <Text size="xs" style={styles.infoValue}>
                                Lab
                            </Text>
                        </View>
                        <View style={styles.infoRowItem}>
                            <Text size="xs" style={styles.infoLabel}>
                                Age
                            </Text>
                            <Text size="xs" style={styles.infoValue}>
                                21 (3 Human)
                            </Text>
                        </View>
                    </View>
                </View>
            </Container>
            <SafetyLevel safetyLevel={{ message: "Good to go!", level: 1 }} />
        </Container>
    );
};
