import { Image } from "react-native-image-crop-picker";

import { kmpwApi } from "@/api";

/**
 * Uploads the passed image
 *
 * /assets/uploads/dogs
 *
 * @param accessToken The user's access token
 * @param image The selected image to upload
 * @returns An external url where the image can be viewed
 */
export const uploadDogImage = (accessToken: string, image: Image) => {
    const formData = new FormData();
    const imageData = {
        uri: image.path,
        type: image.mime,
        name: `dog-image.${image.mime}`
    };

    formData.append("image", imageData);

    return kmpwApi
        .post<{ secure_url: string }>("/assets/uploads/dogs", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            },
            transformRequest: () => formData
        })
        .then(({ data }) => data);
};
