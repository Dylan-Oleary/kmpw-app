declare module "react-native-dotenv" {
    export const API_BASE_URL: string;
    export const API_GRAPHQL_URL: string;
}
declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    import { API_GRAPHQL_URL } from "react-native-dotenv";
    const content: React.FC<SvgProps>;
    export default content;
}
declare module "*.jpg";
