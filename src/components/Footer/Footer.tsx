import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";

import UserIcon from "@/assets/svg/user.svg";
import { Button, Container } from "@/components";
import { HomeStackNavigationProp } from "@/navigation";

import { styles } from "./styles";

export const Footer: FC = () => {
    const { navigate } = useNavigation<HomeStackNavigationProp>();

    return (
        <Container style={styles.container}>
            <Button
                containerStyle={styles.button}
                icon={<UserIcon {...styles.userIcon} />}
                //@ts-ignore
                onPress={() => navigate("Account")}
                text="Account"
                textStyle={styles.buttonText}
            />
        </Container>
    );
};
