// https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic

import axios from 'axios'
import fs from 'fs'

// AIzaSyBEZlVVz7FqWgLdHu6FrpfU-3otaEXK3l4

axios
.get('https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic')
// .get('https://maps.app.goo.gl/GMpKhSo3JyYKvZso8')
.then((response) => {
  // Check if the request was successful
    if (response.status === 200) {
        const htmlContent = response.data;

        // Regular expression to find "tel:" links
        const telRegex = /tel:([0-9+-]+)/g;
        const telMatches = htmlContent.match(telRegex);

        if (telMatches) {
            // Extracted telephone numbers
            const telephoneNumbers = telMatches.map((match) =>
                match.replace("tel:", "")
            );

            // Output the telephone numbers
            console.log("Telephone Numbers:");
            console.log(telephoneNumbers);

            const payloadRegex = /"tel:([^"]+?)15 min"/;

            const capturedStrings = [];
            let match;

            // Find all matches in the JSON string
            // jsonString = 
            while ((match = payloadRegex.exec(htmlContent)) !== null) {
                capturedStrings.push(match[1]);
            }

            if (capturedStrings.length > 0) {
                console.log("Captured Strings:");
                console.log(capturedStrings);
            } else {
                console.error("No strings found in the JSON payload.");
            }
        } else {
            console.error("Telephone numbers not found in the HTML content.");
        }
    } else {
        console.error(`Failed to fetch URL: ${shareUrl}`);
    }
})
.catch((error) => {
  console.error("Error:", error);
});

// const jsonString = "[\"tel:0189484982\",null,null,\"0ahUKEwiDj43D5r6BAxX7nGMGHaaKDtwQ_doBCBkoEA\"]],null,null,[null,null,null,null,null,\"5144152677774307775\",\"115044430097448485930\"],null,[[[7,[[\"The Coffee Dock\"],[\"Taman Wetland\"],[\"Seksyen 8\"],[\"40000 Shah Alam\"],[\"Selangor\"]]],[2,[[\"The Coffee Dock, Taman Wetland, Seksyen 8, 40000 Shah Alam, Selangor\"]]],[1,[[\"Taman Wetland, Seksyen 8, 40000 Shah Alam, Selangor\"]]],[4,[[\"Shah Alam, Selangor\"]]]],[\"Seksyen 8\",\"Taman Wetland\",\"Taman Wetland\",\"Shah Alam\",\"40000\",\"Selangor\",\"MY\"],[\"0ahUKEwiDj43D5r6BAxX7nGMGHaaKDtwQqtMBCBUoDA\",[\"6PM33GV8+4M\"],[\"3GV8+4M Shah Alam, Selangor\"],1]],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[[[\"Saturday\",6,[2023,9,23],[[\"5–11 pm\",[[17],[23]]]],0,1],[\"Sunday\",7,[2023,9,24],[[\"5–11 pm\",[[17],[23]]]],0,1],[\"Monday\",1,[2023,9,25],[[\"5–11 pm\",[[17],[23]]]],0,1],[\"Tuesday\",2,[2023,9,26],[[\"5–11 pm\",[[17],[23]]]],0,1,[\"Prophet's Birthday might affect these hours\",\"Prophet's Birthday\",2]],[\"Wednesday\",3,[2023,9,27],[[\"Closed\"]],0,2,[\"Prophet's Birthday might affect these hours\",\"Prophet's Birthday\",2]],[\"Thursday\",4,[2023,9,28],[[\"Closed\"]],0,2],[\"Friday\",5,[2023,9,29],[[\"5–11 pm\",[[17],[23]]]],0,1]],[[\"Saturday\",6,[2023,9,23],[[\"5–11 pm\",[[17],[23]]]],0,1],0,4,null,[\"Closed ⋅ Opens 5 pm\",[[0,6,[null,[4292423717,4294085506]]]]],[\"Closed ⋅ Opens 5 pm\",[[0,6,[null,[4292423717,4294085506]]]]],null,null,[\"Closed\",[[0,6,[null,[4292423717,4294085506]]]]]],6,2,null,null,1],null,1,null,null,[[null,null,3.0928066999999997,101.5166892]]]";

// Define a regular expression to capture all strings within the payload


// axios.get('https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic').then(data => {
//     // console.log('data: ', data._header)
//     let cache = []
//     let filtered = JSON.stringify(data, function(key, value) {
//         if (typeof value === "object" && value !== null) {
//             if (cache.indexOf(value) !== -1) {
//                 // Circular reference found, discard key
//                 return;
//             }
//           // Store value in our collection
//             cache.push(value);
//         }
//         return value;
//     })
//     // console.log(JSON.parse(filtered).status)
//     // console.log(typeof filtered)
//     // const jsonData = JSON.stringify(JSON.parse(filtered).data, null, 2);
//     const jsonData = JSON.parse(filtered).data
//     fs.writeFile('./data.json', jsonData, (error) => {
//         if (error) {
//             console.error('Error writing JSON file:', error);
//         } else {
//             console.log('JSON file saved successfully!');
//         }
//     })
// }).catch( error => {
//     console.log('error: ', error)
// })