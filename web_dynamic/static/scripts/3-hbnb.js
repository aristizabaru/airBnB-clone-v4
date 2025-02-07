/*
JavaScript script (static/scripts/3-hbnb.js):

    Based on 2-hbnb.js
    Request http://0.0.0.0:5001/api/v1/places_search/:
        Description of this endpoint here. If this endpoint is not available, you will have to add it to the API (you can work all together for creating this endpoint)
        Send a POST request with Content-Type: application/json and an empty dictionary in the body - cURL version: curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}'
        Loop into the result of the request and create an ARTICLE tag representing a Place in the SECTION.places. (you can remove the Owner tag in the place description)
*/

const HOST = '0.0.0.0';
const END_POINT = `http://${HOST}:5001/api/v1/status/`;
const PLACES_END_POINT = `http://${HOST}:5001/api/v1/places_search/`;
const amenityData = {};

$(document).ready(() => {
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenityData[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityData[$(this).attr('data-name')];
    }
    const amenintyKeys = Object.keys(amenityData);
    $('.amenities h4').text(amenintyKeys.sort().join(', '));
  });
  statusAPI();
  fetchPlaces();
});

const statusAPI = () => {
  $.get(END_POINT, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
};

const fetchPlaces = () => {
  $.ajax({
    url: PLACES_END_POINT,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      for (const item of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${item.name}</h2>`,
        `<div class="price_by_night">$${item.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${item.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${item.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${item.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${item.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
};
