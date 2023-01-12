# Rest-API-MongoDB

Rest-API skapat med MongoDB och Express.
Full CRUD-funktionalitet

Servern startas med npm start
# TeaTime-API :tea:




## :bulb: Används på följande vis :

| Metod        | Endpoint           | Beskrivning  |
| ------------- |-------------| -----|
| GET |/Localhost:3000/teas| Hämtar alla tillgängliga produkter. |
| POST|/Localhost:3000/teas| Lagrar en ny produkt.|
| PUT|/Localhost:3000/teas/ID| Uppdaterar produkt med angivet ID. |
| DELETE |/Localhost:3000/teas/ID| Raderar produkt med angivet ID. |


## :envelope: Ett objekt skickas med följande struktur: 

```

{
  "name": "English Breakfast",
  "type": "Black",
  "price": "50",
  "amount": "12"
}

  ```
  
 ## :mailbox_with_mail: Ett objekt returneras med följande struktur: 

```

  {
    "_id": "63c018b1cfcc837e4f00104d",
    "name": "English Breakfast",
    "type": "Black",
    "price": 50,
    "amount": 12,
    "__v": 0
  }
