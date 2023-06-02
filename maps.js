/**
       * @license
       * Copyright 2019 Google LLC. All Rights Reserved.
       * SPDX-License-Identifier: Apache-2.0
       */
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      let map, infoWindow;

    

    //   let latit = ''
    //   let longi = ''
      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 14,
        });
        infoWindow = new google.maps.InfoWindow();

        const locationButton = document.createElement("button");

        locationButton.textContent = "Pan to Current Location";
        locationButton.classList.add("custom-map-control-button");
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(
          locationButton
        );
        locationButton.addEventListener("click", () => {
          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                //   latit : position.coords.latitude,
                //   longi : position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                // let vets = nearbyvets(pos.lat,pos.lng)
                // console.log(vets)

                //ADDING NEARBY VETS
                const uluru = { lat: -25.363, lng: 131.044 };
                const marker = new google.maps.Marker({
                    position: uluru,
                    map,
                    title: "Uluru (Ayers Rock)",
                  });
                infoWindow.open(map);
                map.setCenter(pos);
              },
              () => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
      }

      //NEARBYVETS FUNCTION
      function nearbyvets(lat,lng){
        var axios = require('axios');

        var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%${lng}&radius=1500&type=veterinary_care&key=AIzaSyC86SW2YD_iJeEQZPDkN6MhWgPT9roQM68`,
        headers: { }
        };

        axios(config)
        .then(function (response) {
            let send = JSON.stringify(response.data)
            // console.log(send);
            return send;
        })
        .catch(function (error) {
        console.log(error);
        });
      }

      // ADD KEYWORDS TO URL ?? &keyword=cruise&key=

      window.initMap = initMap;