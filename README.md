# Location

```js
const locations = [
  { name: 'Kraków', lat: 50.064651, lon: 19.944981 },
  { name: 'Tokio', lat: 39.758602, lon: -104.997437 },
  { name: 'New York', lat: 55.755825, lon: 37.617298 }
]
```

`Location` is uniquely identified by `lat` and `long` coordinates. That's why we need to pass them to each function dealing with `Location` entity, alternatively, we can choose to use UUID (generated on our side), then it will be possible to add two locations with the same coordinates and it will simplify `Location` operations (find by ID or ID as a key in store).

# Application flow

After you add a new `Location` (action type: `ADD_LOCATION`) saga will catch that and fetch sunrise/sunset information from API.

# Caching

Because sunrise/sunset data is immutable for given geolocation and date - we can cache it, that way going back and forth on calendar days will not trigger re-fetch. In a real-world app, this is either A) not needed B) number of cached items should be limited (memory limit on low-end phones).
