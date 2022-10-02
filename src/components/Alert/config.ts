import { AlertControl } from "@/components";

export const errorAlertDefaultConfig: Omit<AlertControl, "show"> = {
    title: "Oh, no!",
    body: "We couldn't complete your request at the moment. Please try again.",
    theme: "error"
};
