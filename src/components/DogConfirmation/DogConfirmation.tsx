import React, { FC } from "react";
import { ViewProps } from "react-native";
import dayjs from "dayjs";

import DogImage from "@/assets/images/test-pup.jpg";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import PawSolidIcon from "@/assets/svg/paw-solid.svg";
import PencilAltIcon from "@/assets/svg/pencil-alt.svg";
import { Avatar, BrandHeader, Button, Container, DogInformation } from "@/components";
import { DATE_FORMATS } from "@/constants";
import { globalStyles } from "@/styles";
import { Dog, DogFormSubmission } from "@/types";

import { styles } from "./styles";

interface DogConfirmationProps extends ViewProps {
    cancelButtonText?: string;
    confirmButtonText?: string;
    dog: Pick<Dog, "birthday" | "breed" | "name" | "profilePicture" | "weightImperial"> &
        Pick<DogFormSubmission, "newProfilePicture">;
    isLoading?: boolean;
    isRemoval?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const DogConfirmation: FC<DogConfirmationProps> = ({
    cancelButtonText = "Go back",
    confirmButtonText = "Looks good",
    dog,
    isLoading = false,
    isRemoval = false,
    onCancel = () => {},
    onConfirm = () => {},
    style
}) => (
    <Container style={style}>
        <Container style={[globalStyles.flexRow, globalStyles.justifyFlexCenter]}>
            <Avatar
                size="xl"
                source={
                    dog?.newProfilePicture?.path
                        ? { uri: dog.newProfilePicture.path }
                        : dog?.profilePicture
                        ? { uri: dog?.profilePicture }
                        : DogImage
                }
            />
        </Container>
        <Container style={styles.dogInfoContainer}>
            <Container style={[globalStyles.flexRow, globalStyles.alignItemsCenter]}>
                <BrandHeader
                    content={[`${isRemoval ? "Goodbye" : "Hello"}, `, `${dog.name}`]}
                    size="2xl"
                />
                <PawSolidIcon {...styles.pawIcon} />
            </Container>
            <DogInformation
                label="Breed"
                size="sm"
                style={styles.dogInfoItem}
                value={dog?.breed?.name}
            />
            <DogInformation
                label="Weight"
                size="sm"
                style={styles.dogInfoItem}
                value={`${dog?.weightImperial} lbs`}
            />
            <DogInformation
                label="Birthday"
                size="sm"
                style={styles.dogInfoItem}
                value={
                    dog?.birthday
                        ? dayjs(dog.birthday).format(DATE_FORMATS.FULL_MONTH_WITH_DAY_AND_YEAR)
                        : undefined
                }
            />
        </Container>
        <Container style={styles.buttonRow}>
            <Button
                icon={
                    <PencilAltIcon
                        {...styles.buttonIcon}
                        {...styles.pencilIcon}
                        style={styles.pencilIcon}
                    />
                }
                disabled={isLoading}
                onPress={onCancel}
                secondary
                text={cancelButtonText}
            />
            <Button
                containerStyle={styles.confirmButton}
                icon={<ArrowRightIcon {...styles.buttonIcon} />}
                disabled={isLoading}
                onPress={onConfirm}
                text={confirmButtonText}
            />
        </Container>
    </Container>
);
