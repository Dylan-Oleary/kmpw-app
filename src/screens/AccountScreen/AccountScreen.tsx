import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BrandHeader, Button, Container } from "@/components";
import { DeleteAccountModal, LogoutModal } from "@/modals";

import { getContainerStyle, styles } from "./styles";

export const AccountScreen: FC = () => {
    const insets = useSafeAreaInsets();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState<boolean>(false);

    return (
        <Container style={getContainerStyle(insets)}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <BrandHeader content={["Account"]} size="2xl" />
                <Container style={styles.actionsRow}>
                    <Button onPress={() => setIsLogoutModalOpen(true)} text="Logout" />
                    <Button
                        containerStyle={styles.buttonRowItem}
                        onPress={() => setIsDeleteAccountModalOpen(true)}
                        text="Delete Account"
                    />
                </Container>
            </ScrollView>
            <LogoutModal
                isVisible={isLogoutModalOpen}
                onRequestClose={() => setIsLogoutModalOpen(false)}
            />
            <DeleteAccountModal
                isVisible={isDeleteAccountModalOpen}
                onRequestClose={() => setIsDeleteAccountModalOpen(false)}
            />
        </Container>
    );
};
