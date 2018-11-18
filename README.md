<div align="center">

# findyourstars.com

</div>

The code repository for findyourstars.com.
The purpose of this project is to visualize data important in planning stargazing or other astronomy activities. 

Paths of upcoming solar eclipses can be seen on a map along with the location of the International Space Station. Current conditions that affect sky visibility are also available.

# Setup
Install dependencies:
```
npm install
```

Start app:
```
npm start
```

# Stack
Data originates from various sources, and large geoJSON datasets are processed and retrieved from Google cloud. Google cloud HTTP functions provide the backend endpoints and data is stored in Gooogle Cloud Datastore.

The application frontend is build using React and Leaflet. Attribution for data sources can be found within the application.

# Use
The application is deployed at https://findyourstars.com