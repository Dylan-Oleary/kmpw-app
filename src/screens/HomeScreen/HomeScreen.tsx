import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useGetUserQuery } from "@/api";
import DogImage from "@/assets/images/test-pup.jpg";
import {
    BrandHeader,
    Container,
    DogList,
    Footer,
    FullScreenLoader,
    Image,
    LocationErrorAlert,
    RefreshControl,
    Text,
    WeatherBanner
} from "@/components";
import { DogForm } from "@/forms";
import { useAppDispatch } from "@/hooks";
import { getUserGeoLocation } from "@/lib";
import { HomeStackNavigationProp } from "@/navigation";
import { setLocation, setLocationError, useLocationSelector } from "@/redux";
import { screenWidth } from "@/styles";
import { User } from "@/types";

import { getContainerStyle, styles } from "./styles";

export const HomeScreen: FC = () => {
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const { navigate } = useNavigation<HomeStackNavigationProp>();
    const {
        errors: locationErrors,
        location: geolocation,
        requestTimestamp
    } = useLocationSelector();
    const [isInitialDataFetchComplete, setIsInitialDataFetchComplete] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const { loading, prevUser, refetchUser, user } = useGetUserQuery({
        geolocation,
        onCompleted: () => setIsInitialDataFetchComplete(true),
        onError: () => setIsInitialDataFetchComplete(true)
    });

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        getUserGeoLocation()
            .then((response) => dispatch(setLocation(response)))
            .catch((error) => {
                dispatch(setLocationError(error));
                setIsRefreshing(false);
            });
    }, []);

    const userDataToRender = useMemo<User | null>(() => user || prevUser || null, [user, prevUser]);

    useEffect(() => {
        if (geolocation?.latitude && geolocation?.longitude && isInitialDataFetchComplete) {
            refetchUser({ geolocation }).finally(() => setIsRefreshing(false));
        }
    }, [geolocation, requestTimestamp]);

    return (
        <FullScreenLoader
            isLoading={
                !isInitialDataFetchComplete || (locationErrors?.length === 0 && !geolocation)
            }
        >
            <Container style={getContainerStyle(insets)}>
                <WeatherBanner
                    lastUpdatedTimestamp={requestTimestamp}
                    loading={loading || isRefreshing}
                    style={styles.weatherBanner}
                    weather={user?.weather || prevUser?.weather}
                />
                {locationErrors?.length > 0 && <LocationErrorAlert />}
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                    }
                >
                    <Container style={styles.headerContainer}>
                        <BrandHeader content={["Let's get ", "barking."]} size="2xl" />
                        <Text style={styles.headerBodyText}>
                            Check out your pups below and let’s see if the weather is pawsome.
                        </Text>
                    </Container>
                    <Container>
                        <Image aspectRatio={[16, 8]} source={DogImage} width={screenWidth} />
                    </Container>
                    {userDataToRender && (
                        <Container style={styles.contentContainer}>
                            {(userDataToRender?.dogs || []).length > 0 ? (
                                <DogList dogs={userDataToRender?.dogs || []} loading={loading} />
                            ) : (
                                <DogForm
                                    onSubmit={(data) => navigate("ConfirmAddOrEditDog", { data })}
                                />
                            )}
                        </Container>
                    )}
                </ScrollView>
                <Footer />
            </Container>
        </FullScreenLoader>
    );
};
