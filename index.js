const displayStatus = (message) => {
    $('#status').html(message);
  }
  
  const handleApiError = (error) => {
    console.log(error);
    // TODO: politely report this error to the user
  }
  const URL = 'https://trektravel.herokuapp.com/trips';

  const loadTrips = () => {
    displayStatus("loading trips...");

      const tripList = $('#trip-list');
      tripList.empty();
    
      axios.get(URL)
        .then((response) => {
          displayStatus(`Successfully loaded ${response.data.length} trips`);
          response.data.forEach((trip) => {
            tripList.append(`<p><button id = ${trip.id}>${trip.name}</button></p>`);
            
            $(`#${trip.id}`).click(function() {
              $('#status').empty()
              showTripDetails(this.id);
              $("#res-form").empty();
              displayForm(trip.name);
              $('#res-form').submit((event) => {
                event.preventDefault();
                reserveTrip(trip.id);
              });
              
            }
            );
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

  const showTripDetails = (tripId) => {
        $("#trip-details").empty();
  const tripURL = URL + "/" + tripId;
  axios.get(tripURL)
      .then((response) => {
        //append the trip details 
        $("#trip-details").append(
        `<p><b>Name:</b> ${response.data.name}</p>
        <p><b>Continent:</b> ${response.data.continent}</p>
        <p><b>Category:</b> ${response.data.category}</p>
        <p><b>Weeks:</b> ${response.data.weeks}</p>
        <p><b>Cost:</b> $${response.data.cost}</p>
        <p><b>About:</b></p>
        <p>${response.data.about}</p>`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const displayForm = (tripName) => {
    $('#res-form').append(
      `<h3>Reserve a spot on ${tripName}</h3>
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" />
        </div>
        <div>
            <label for="email">Email</label>
            <input type="text" name="email" />
        </div>
        <input type="submit" name="reserve-trip" value="Reserve" />`
    )
  }
  
  const reserveTrip = (tripName) => {
   
   // I will come back to work on this after the interview week :)
    
  }
  
  $(document).ready(() => {
    $('#load-trips').click(loadTrips);
    

  });
  