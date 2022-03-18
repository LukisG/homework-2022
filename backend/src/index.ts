import express from 'express';
import smartyfile from './data/smarty.json';
const app = express();
const port = 3001;

app.get('/', (_req, res) => {
  res.send('<h1>Congratulations 🎉 You got the WCC 2022 backend server running. Good luck with your task 🙌</h1>');
})

/**
 * Example endpoint
 *  consumes: query parameter "name"
 *  returns: a JSON response
 */
app.get('/greeting', (req, res) => {
  res.json({ 'greeting': `Hello, ${req.query.name || 'World'} 👋` });
})

/**
 * TODO: Add your autocompleter endpoint below this component
 */
app.get('/autocomplete', (req, res) => {
  const input = req.query.input;
  const inputlenght = Number(input.length)
  res.header('Access-Control-Allow-Origin', '*')
  const output: ({
    id: string; displayname: string; loctype: string; cid: number; rid: number; ctid: number; lat: number; lng: number; cc: string; country: string; rc: string; cityname: string; timezone: string; utc: string; ap: string; apicode: string; citynameshort: string; cityonly: string; destination_images: { image_jpeg: string; image_webp: string; }; displayType: { type: string; displayName: string; }; entityKey: string; guidebook_count: number; indexId: string; kayakId: string; kayakType: string ; locationname: string; name: string; objectID: string; placeID: string; ptid: string; region: string; searchFormPrimary: string; searchFormSecondary: string; secondary: string; shortdisplayname: string; smartyDisplay: string; airportname?: undefined; isMetroOnly?: undefined;
  } | {
    id 
    : string
    ; displayname: string; loctype: string; cid: number; rid: number; ctid: number; lat: number; lng: number; cc: string; country: string; rc: string; cityname: string; timezone: string; utc: string; airportname: string; ap: string; apicode: string; cityonly: string; destination_images: { image_jpeg: string; image_webp: string; }; displayType: { type: string; displayName: string; }; entityKey: string; indexId: string; isMetroOnly: boolean; kayakId: string; kayakType: string; locationname: string; name: string; objectID: string; placeID: string; ptid: string; region: string; searchFormPrimary: string; searchFormSecondary: string; secondary: string; shortdisplayname: string; smartyDisplay: string; citynameshort?: undefined; guidebook_count?: undefined;
  } | { id: string; displayname: string; loctype: string; cid: number; rid: number; ctid: number; lat: number; lng: number; cc: string; country: string; rc: string; cityname: string; timezone: string; utc: string; ap: string; apicode: string; citynameshort: string; cityonly: string; destination_images: { image_jpeg: string; image_webp: string; }; displayType: { type: string; displayName: string; }; entityKey: string; indexId: string; kayakId: string; kayakType: string; locationname: string; name: string; objectID: string; placeID: string; ptid: string; region: string; searchFormPrimary: string; searchFormSecondary: string; secondary: string; shortdisplayname: string; smartyDisplay: string; guidebook_count?: undefined; airportname?: undefined; isMetroOnly?: undefined; })[] = [];
  // filtering out results based on input gotten from frontend
  smartyfile.forEach(item => item.cityonly.substring(0, inputlenght).toLowerCase() == input  && output.length != 10 ? output.push(item) : [])
  res.json(output);
})

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}.`);
});