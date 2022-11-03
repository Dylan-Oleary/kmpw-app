import React, { FC, useState } from "react";
import { ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";

import LogoutIcon from "@/assets/svg/logout.svg";
import TrashOutlineIcon from "@/assets/svg/trash-outline.svg";
import { Button, Container } from "@/components";
import { LogoutModal } from "@/modals";

import { styles } from "./styles";

interface IAccountActionsProps extends ViewProps {
    onLogoutConfirm: () => void;
}

export const AccountActions: FC<IAccountActionsProps> = ({ onLogoutConfirm = () => {}, style }) => {
    const { navigate } = useNavigation();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

    return (
        <Container style={[styles.actionsRow, style]}>
            <Button
                icon={<LogoutIcon {...styles.icon} />}
                onPress={() => setIsLogoutModalOpen(true)}
                secondary
                text="Logout"
            />
            <Button
                containerStyle={styles.actionsRowNthItem}
                icon={<TrashOutlineIcon {...styles.icon} {...styles.deleteAccountIcon} />}
                //@ts-ignore
                onPress={() => navigate("DeleteAccount")}
                text="Delete account"
            />
            <LogoutModal
                isVisible={isLogoutModalOpen}
                onConfirm={onLogoutConfirm}
                onRequestClose={() => setIsLogoutModalOpen(false)}
            />
        </Container>
    );
};
