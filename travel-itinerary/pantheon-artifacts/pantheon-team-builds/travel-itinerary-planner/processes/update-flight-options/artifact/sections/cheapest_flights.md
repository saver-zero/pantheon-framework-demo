## Cheapest Flight Options

{% for flight in flights %}
### Option {{ loop.index }}: {{ flight.airline }} - ${{ flight.price }}

**Airline**: {{ flight.airline }}

**Flight Number**: {{ flight.flight_number }}

**Price**: ${{ flight.price }} ({{ flight.currency }})

**Departure**: {{ flight.departure_time }} from {{ flight.departure_airport }}

**Arrival**: {{ flight.arrival_time }} at {{ flight.arrival_airport }}

**Duration**: {{ flight.duration }}

**Stops**: {{ flight.stops }}
{% if flight.layover_airports %}**Layover Airports**: {{ flight.layover_airports }}{% endif %}
**Source**: [{{ flight.source_website }}]({{ flight.source_url }})

---
{% endfor %}