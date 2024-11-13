import request from "request";
import { getCoordinates } from "./src/utils/geoCoding.js";
import { weatherStackApi } from "./src/utils/weatherStackApi.js";

// const address = "Pakistan";
// getCoordinates(address, (error, userLocationDetails) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Coordinates:", userLocationDetails);
//         console.log(
//             `Your Current Location => ${userLocationDetails.placeName},
//              Latitude: ${userLocationDetails?.latitude},
//              Longitude: ${userLocationDetails?.longitude}`
//         );
//     }
// });

const location = { latitude: 37.8367, longitude: -122.4233 };
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