const samples = [
  {
    left: {
      "id": 9298,
      "uid": "0e5e81da-c572-4976-9284-286499122d46",
      "password": "O4ZDHr5kQI",
      "first_name": "Christian",
      "last_name": "Brown",
      "username": "christian.brown",
      "email": "christian.brown@email.com",
      "avatar": "https://robohash.org/cummollitiavoluptatem.png?size=300x300&set=set1",
      "gender": "Genderqueer",
      "phone_number": "+672 (820) 407-8902",
      "social_insurance_number": "934165911",
      "date_of_birth": "1989-03-26",
      "employment": {
        "title": "International Planner",
        "key_skill": "Leadership"
      },
      "address": {
        "city": "New Dorastad",
        "street_name": "Demetria Drive",
        "street_address": "3794 Johnston Mission",
        "zip_code": "17041-8453",
        "state": "New Hampshire",
        "country": "United States",
        "coordinates": {
          "lat": -65.90259764891053,
          "lng": -7.320898733292381
        }
      },
      "credit_card": {
        "cc_number": "4297-9247-0317-6672"
      },
      "subscription": {
        "plan": "Bronze",
        "status": "Idle",
        "payment_method": "Google Pay",
        "term": "Payment in advance"
      }
    },
    right: {
      "id": 5093,
      "uid": "92e1e881-6e72-47e3-943c-5f27c93a7af1",
      "password": "2XDpCL53xj",
      "first_name": "Brittny",
      "last_name": "Huel",
      "username": "brittny.huel",
      "email": "brittny.huel@email.com",
      "avatar": "https://robohash.org/voluptatesquiamodi.png?size=300x300&set=set1",
      "gender": "Male",
      "phone_number": "+597 379-873-7392 x48512",
      "social_insurance_number": "453371783",
      "date_of_birth": "1986-07-07",
      "employment": {
        "title": "Direct Healthcare Developer",
        "key_skill": "Technical savvy"
      },
      "address": {
        "city": "North Zella",
        "street_name": "Wolf Parkways",
        "street_address": "60936 Andrea Ranch",
        "zip_code": "26133-3454",
        "state": "Vermont",
        "country": "United States",
        "coordinates": {
          "lat": 58.254415216736874,
          "lng": -56.417864643361526
        }
      },
      "credit_card": {
        "cc_number": "5529-2531-8607-5541"
      },
      "subscription": {
        "plan": "Silver",
        "status": "Pending",
        "payment_method": "Credit card",
        "term": "Monthly"
      }
    }
  },
  {
    left: {
      name: "john",
      father: {
        name: "ivan",
        age: 55,
        salary: 3000
      },
      gender: "male"
    },
    right: {
      father: {
        name: "ivan",
        age: 51,
        gender: "male",
        father: {
          name: "raskolnikov",
          age: 120
        }
      }
    }
  },
  {
    left: {
      name: "john",
      children: [
        {
          name: "adam",
          age: 11
        },
        {
          name: "ave",
          gender: "female"
        }
      ]
    },
    right: {
      name: "john",
      children: [
        {
          name: "adam"
        },
        {
          name: "ave",
          gender: "female",
          age: 9
        },
        {
          name: "moses",
          gender: "male"
        }
      ]
    }
  }
];


export { samples }