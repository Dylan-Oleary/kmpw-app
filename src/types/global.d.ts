declare module "react-native-config" {
    const config: {
        API_BASE_URL: string;
        API_GRAPHQL_URL: string;
    };
    export default config;
}
declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}
declare module "*.jpg";
