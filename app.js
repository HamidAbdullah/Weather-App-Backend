import request from "request";
import { getCoordinates } from "./src/utils/geoCoding.js";
import { weatherStackApi } from "./src/utils/weatherStackApi.js";

const address = process.argv[2];
console.log({ address: address });

if (!address) {
    console.log("Please provide an address.");
} else {
    getCoordinates(address, (error, userLocationDetails) => {
        if (!address) {
            console.log("Please Provide The Address. ", address);
            return;
        }
        if (error) {
            console.log(error);
        } else {
            console.log("Coordinates:", userLocationDetails);
            console.log(
                `Your Current Location => ${userLocationDetails.placeName},
            Latitude: ${userLocationDetails?.latitude},
            Longitude: ${userLocationDetails?.longitude}`
            );
        }
        const location = { latitude: userLocationDetails.latitude, longitude: userLocationDetails.longitude };
        weatherStackApi(location, (error, data) => {
            if (error) {
                console.log({ Weather_Stack_Api_Error: error });
                return;
            }

            console.log({
                Weather_Stack_Api_Response: {
                    description: data.description,
                    temperature: `${data.temperature}°F`,
                    feelslike: `${data.feelslike}°F`
                }
            });
        });
    });
}