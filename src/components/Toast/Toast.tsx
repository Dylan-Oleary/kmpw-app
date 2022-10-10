import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { ToastOptions, ToastProps } from "react-native-toast-notifications/lib/typescript/toast";

import CheckCircleIcon from "@/assets/svg/check-circle.svg";
import CloseIcon from "@/assets/svg/close.svg";
import ExclamationTriangleIcon from "@/assets/svg/exclamation-triangle.svg";
import InfoCircleIcon from "@/assets/svg/info-circle.svg";
import { Container, Text } from "@/components";
import { theme } from "@/constants";

import { getToastStyles } from "./styles";

export const getToastProviderOptions: (insets: EdgeInsets) => ToastOptions = ({ bottom = 0 }) => {
    const offset = Platform.select({
        android: theme.spacing[2],
        ios: bottom > 0 ? bottom : theme.spacing[2]
    });

    return {
        animationType: "slide-in",
        offset,
        renderToast: (options: ToastProps) => <Toast {...options} />,
        swipeEnabled: true
    };
};

export const Toast: FC<ToastProps> = ({ duration = 5000, id, message = "", type = "normal" }) => {
    const toast = useToast();
    const toastStyles = useMemo(() => getToastStyles(type), [type]);
    const toastIcon = useMemo(() => {
        switch (type) {
            case "danger":
                return <ExclamationTriangleIcon {...toastStyles.icon} {...toastStyles.iconTheme} />;
            case "success":
                return <CheckCircleIcon {...toastStyles.icon} {...toastStyles.iconTheme} />;
            case "warning":
                return <ExclamationTriangleIcon {...toastStyles.icon} {...toastStyles.iconTheme} />;
            case "normal":
            default:
                return <InfoCircleIcon {...toastStyles.icon} {...toastStyles.iconTheme} />;
        }
    }, [type]);
    const closeToast = useCallback(() => toast.hide(id), [id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            closeToast();
        }, duration);

        return () => {
            clearTimeout(timeout);
        };
    }, [id]);

    return (
        <Container style={toastStyles.container}>
            <Container style={[toastStyles.leftBorder, toastStyles.leftBorderTheme]} />
            <Container style={toastStyles.messageContainer}>
                {toastIcon}
                <Text size="sm" style={toastStyles.messageText}>
                    {message}
                </Text>
                <TouchableOpacity onPress={() => closeToast()}>
                    <CloseIcon {...toastStyles.closeIcon} />
                </TouchableOpacity>
            </Container>
        </Container>
    );
};
