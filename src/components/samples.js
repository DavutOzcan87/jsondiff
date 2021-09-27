const samples = [
  {
    left: {
      name: "John",
      hasChild: false,
    },
    right: {
      hasChild: true,
      age: 35,
    }
  },
  {
      left:{
          name: "john",
          father:{
              name:"ivan",
              age: 55,
              salary: 3000
          },
          gender: "male"
      },
      right:{
          father:{
            name:"ivan",
            age: 51,
            gender: "male",
            father:{
                name: "raskolnikov",
                age: 120
            }
          }
      }
  },
  {
      left:{
        name:"john",
        children:[
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
      right:{
        name:"john",
        children:[
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