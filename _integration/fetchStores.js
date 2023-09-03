import axios from 'axios'
import fs from 'fs'

const url = 'https://manage.api.gerai.store/api/'
const filePath = '../test/stores.json'

axios.get(url + 'ping').then(data => {
    const jsonData = JSON.stringify(data.data, null, 2);
    fs.writeFile(filePath, jsonData, (error) => {
        if (error) {
            console.error('Error writing JSON file:', error);
        } else {
            console.log('JSON file saved successfully!');
        }
    })
}).catch( error => {
    console.log('error: ', error)
})