import React, { FC, useState } from "react";

import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { Button, Container, Modal } from "@/components";
import { DatePicker } from "@/forms";

import { styles } from "./styles";

export interface IDatePickerModalProps {
    initialDate?: Date;
    isVisible: boolean;
    maximumDate?: Date;
    minimumDate?: Date;
    //TODO: TYPE THIS PROPERLY
    mode?: unknown;
    onConfirm: (date: Date) => void;
    onRequestClose: () => void;
}

export const DatePickerModal: FC<IDatePickerModalProps> = ({
    initialDate = new Date(),
    isVisible = false,
    maximumDate,
    minimumDate,
    mode = "date",
    onConfirm = () => {},
    onRequestClose = () => {}
}) => {
    const [date, setDate] = useState<Date>(initialDate);

    const handleSubmit: () => void = () => onConfirm(date);

    return (
        <Modal isVisible={isVisible} onRequestClose={onRequestClose}>
            <DatePicker
                date={date}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                //@ts-ignore - TODO: TYPE THIS PROPERLY
                mode={mode}
                onDateChange={setDate}
            />
            <Container style={styles.actionsRow}>
                <Button
                    icon={<ArrowRightIcon color={styles.submitIcon.color} />}
                    onPress={handleSubmit}
                    text="Looks good"
                />
            </Container>
        </Modal>
    );
};
