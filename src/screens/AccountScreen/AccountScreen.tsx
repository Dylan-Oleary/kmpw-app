import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { gql, useApolloClient } from "@apollo/client";
import dayjs from "dayjs";

import { USER_DETAILS_FRAGMENT, WEATHER_DETAILS_FRAGMENT } from "@/api";
import {
    AccountActions,
    BrandHeader,
    Container,
    DogInformation,
    FullScreenLoader,
    LocationErrorAlert
} from "@/components";
import { DATE_FORMATS } from "@/constants";
import { formatLocationName } from "@/lib";
import { useLocationSelector, useUserSelector } from "@/redux";
import { User } from "@/types";

import { getContainerStyle, styles } from "./styles";

export const AccountScreen: FC = () => {
    const client = useApolloClient();
    const insets = useSafeAreaInsets();
    const { errors: locationErrors } = useLocationSelector();
    const { id } = useUserSelector();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { createdAt, email, weather } = client.readFragment({
        id: `User:${id}`,
        fragmentName: "UserWithLocation",
        fragment: gql`
            ${USER_DETAILS_FRAGMENT}
            ${WEATHER_DETAILS_FRAGMENT}
            fragment UserWithLocation on User {
                ...UserDetails
                weather {
                    ...WeatherDetails
                }
            }
        `
    }) as User;

    return (
        <FullScreenLoader isLoading={isLoading}>
            <Container style={getContainerStyle(insets)}>
                {locationErrors?.length > 0 && <LocationErrorAlert />}
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <BrandHeader content={["Your ", "account"]} size="2xl" />
                    <Container style={[styles.stack, styles.profileInfoContainer]}>
                        <DogInformation
                            label="Email"
                            size="sm"
                            value={email}
                            style={styles.profileInfo}
                        />
                        <DogInformation
                            label="Member since"
                            size="sm"
                            value={
                                createdAt
                                    ? dayjs(createdAt).format(
                                          DATE_FORMATS.FULL_MONTH_WITH_DAY_AND_YEAR
                                      )
                                    : undefined
                            }
                            style={[styles.profileInfo, styles.profileInfoNthItem]}
                        />
                        <DogInformation
                            label="Location"
                            size="sm"
                            value={
                                weather?.location?.name ? formatLocationName(weather) : undefined
                            }
                            style={[styles.profileInfo, styles.profileInfoNthItem]}
                        />
                        <AccountActions
                            onLogoutConfirm={() => setIsLoading(true)}
                            style={styles.actionsRow}
                        />
                    </Container>
                </ScrollView>
            </Container>
        </FullScreenLoader>
    );
};
