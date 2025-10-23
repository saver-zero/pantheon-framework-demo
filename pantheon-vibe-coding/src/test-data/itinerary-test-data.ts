/**
 * Test data for ItineraryDisplay component
 * Contains various scenarios including edge cases for comprehensive testing
 */

import { ItineraryResponse } from '../types';

/**
 * Scenario 1: Complete itinerary with all time periods filled
 * Tests normal case with all periods having data
 */
export const completeItinerary: ItineraryResponse = {
  destination: 'Tokyo, Japan',
  party_info: 'Solo traveler, budget-conscious, interested in culture and food',
  month: 'April',
  days: 3,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Tsukiji Outer Market',
          attraction_description: 'Famous fish market offering fresh seafood and street food',
          what_to_do: [
            'Explore the market stalls',
            'Sample fresh sushi for breakfast',
            'Watch tuna auctions'
          ],
          where_to_eat: 'Sushi Dai or Daiwa Sushi'
        }
      ],
      afternoon: [
        {
          attraction: 'Senso-ji Temple',
          attraction_description: 'Ancient Buddhist temple in Asakusa district',
          what_to_do: [
            'Walk through Kaminarimon Gate',
            'Browse Nakamise shopping street',
            'Visit the main temple hall'
          ],
          where_to_eat: 'Traditional tempura at Daikokuya'
        }
      ],
      evening: [
        {
          attraction: 'Shibuya Crossing',
          attraction_description: 'World-famous scramble crossing and shopping district',
          what_to_do: [
            'Experience the crossing from above at Starbucks',
            'Shop at Shibuya 109',
            'Take photos of the Hachiko statue'
          ],
          where_to_eat: 'Ichiran Ramen for authentic tonkotsu ramen'
        }
      ],
      night: [
        {
          attraction: 'Shinjuku Golden Gai',
          attraction_description: 'Historic district of narrow alleys with tiny bars',
          what_to_do: [
            'Bar hop through the narrow streets',
            'Experience local nightlife culture',
            'Try different Japanese cocktails'
          ],
          where_to_eat: 'Yakitori at Omoide Yokocho'
        }
      ],
      late_night: null
    },
    {
      day: 2,
      morning: [
        {
          attraction: 'Meiji Shrine',
          attraction_description: 'Peaceful Shinto shrine surrounded by forest',
          what_to_do: [
            'Walk through the forest path',
            'Observe traditional wedding ceremonies',
            'Write wishes on ema plaques'
          ],
          where_to_eat: 'Breakfast at Bills Omotesando'
        }
      ],
      afternoon: [
        {
          attraction: 'Harajuku and Takeshita Street',
          attraction_description: 'Youth culture center and trendy shopping street',
          what_to_do: [
            'People watch and street fashion photography',
            'Visit quirky boutiques and vintage stores',
            'Try unique street food'
          ],
          where_to_eat: 'Crepes from Marion Crepes'
        }
      ],
      evening: [
        {
          attraction: 'Odaiba',
          attraction_description: 'Futuristic entertainment and shopping district on Tokyo Bay',
          what_to_do: [
            'Visit TeamLab Borderless digital art museum',
            'See the Rainbow Bridge at sunset',
            'Explore DiverCity Tokyo Plaza'
          ],
          where_to_eat: 'Aqua City food court for variety'
        }
      ],
      night: null,
      late_night: null
    },
    {
      day: 3,
      morning: [
        {
          attraction: 'Tokyo Skytree',
          attraction_description: 'Tallest structure in Japan with observation decks',
          what_to_do: [
            'Visit observation decks for panoramic views',
            'Shop at Solamachi mall',
            'Take photos of city skyline'
          ],
          where_to_eat: 'Breakfast at Sky Restaurant 634'
        }
      ],
      afternoon: [
        {
          attraction: 'Akihabara Electric Town',
          attraction_description: 'Electronics and anime culture district',
          what_to_do: [
            'Browse electronics stores',
            'Visit maid cafes',
            'Explore anime and manga shops'
          ],
          where_to_eat: 'Themed cafe or curry restaurant'
        }
      ],
      evening: [
        {
          attraction: 'Tokyo Station and Imperial Palace',
          attraction_description: 'Historic train station and emperor residence',
          what_to_do: [
            'Admire the brick architecture of Tokyo Station',
            'Walk around Imperial Palace East Gardens',
            'Last-minute souvenir shopping in the station'
          ],
          where_to_eat: 'Ramen Street in Tokyo Station'
        }
      ],
      night: null,
      late_night: null
    }
  ]
};

/**
 * Scenario 2: Minimal itinerary with many null periods
 * Tests edge case with sparse data and null handling
 */
export const minimalItinerary: ItineraryResponse = {
  destination: 'Kyoto, Japan',
  party_info: 'Family with young children',
  month: 'October',
  days: 2,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Fushimi Inari Shrine',
          attraction_description: 'Famous shrine with thousands of red torii gates',
          what_to_do: [
            'Hike through torii gate tunnels'
          ],
          where_to_eat: 'Local street food near entrance'
        }
      ],
      afternoon: null,
      evening: [
        {
          attraction: 'Gion District',
          attraction_description: 'Historic geisha district',
          what_to_do: [
            'Walk through traditional streets'
          ],
          where_to_eat: 'Family-friendly restaurant'
        }
      ],
      night: null,
      late_night: null
    },
    {
      day: 2,
      morning: null,
      afternoon: [
        {
          attraction: 'Arashiyama Bamboo Grove',
          attraction_description: 'Scenic bamboo forest',
          what_to_do: [
            'Walk through bamboo paths'
          ],
          where_to_eat: 'Cafe near the grove'
        }
      ],
      evening: null,
      night: null,
      late_night: null
    }
  ]
};

/**
 * Scenario 3: Edge case with very long text and many activities
 * Tests layout and text wrapping with extreme content lengths
 */
export const edgeCaseItinerary: ItineraryResponse = {
  destination: 'Paris, France - The City of Light and Love',
  party_info: 'Couple celebrating 25th wedding anniversary, love art, history, fine dining, and romantic experiences. Medium budget with some splurge opportunities for special moments.',
  month: 'September',
  days: 1,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Musee du Louvre - The World\'s Largest Art Museum',
          attraction_description: 'The Louvre is the world\'s most visited museum, housing an extraordinary collection of art and artifacts spanning from ancient civilizations to the 19th century. Its iconic glass pyramid entrance leads to miles of galleries featuring masterpieces including the Mona Lisa, Venus de Milo, and Winged Victory of Samothrace. The palace itself is a historic monument and a central landmark of Paris.',
          what_to_do: [
            'Arrive early to beat the crowds and see the Mona Lisa without massive lines',
            'Explore the Egyptian Antiquities section with mummies and artifacts',
            'Visit the Greek and Roman sculpture galleries including Venus de Milo',
            'Walk through the opulent Napoleon III Apartments',
            'See the Crown Jewels in the Apollo Gallery',
            'Admire French paintings from the 17th-19th centuries',
            'Take photos in the glass pyramid courtyard',
            'Browse the museum shop for art books and souvenirs'
          ],
          where_to_eat: 'Cafe Marly overlooking the pyramid for elegant brunch with museum views, or Le Fumoir for classic French bistro fare'
        }
      ],
      afternoon: [
        {
          attraction: 'Sainte-Chapelle and Notre-Dame Area',
          attraction_description: 'Sainte-Chapelle is a royal chapel in the Gothic style, renowned for its magnificent stained glass windows that create a kaleidoscope of colors when sunlight streams through. Built in the 13th century to house Christ\'s Crown of Thorns, it represents the pinnacle of Rayonnant Gothic architecture.',
          what_to_do: [
            'Marvel at the stunning 15-meter-high stained glass windows depicting biblical scenes',
            'Visit on a sunny day for the best light through the windows',
            'Learn about the chapel\'s history as a royal reliquary',
            'Walk around Ile de la Cite island',
            'View Notre-Dame Cathedral exterior (currently under restoration)',
            'Browse the bouquinistes (book sellers) along the Seine',
            'Cross Pont Neuf, Paris\'s oldest bridge'
          ],
          where_to_eat: 'Berthillon for the best ice cream in Paris, or Au Vieux Paris d\'Arcole for traditional French cuisine in a charming historic setting'
        }
      ],
      evening: [
        {
          attraction: 'Seine River Dinner Cruise with Eiffel Tower Views',
          attraction_description: 'A romantic dinner cruise along the Seine River offers a unique perspective of Paris\'s illuminated monuments while enjoying fine French cuisine. The route passes by iconic landmarks including the Eiffel Tower, Notre-Dame, Musee d\'Orsay, and numerous historic bridges, all beautifully lit against the night sky.',
          what_to_do: [
            'Board your reserved dinner cruise boat near the Eiffel Tower',
            'Enjoy a multi-course gourmet French meal',
            'Watch Paris\'s monuments illuminate as dusk falls',
            'See the Eiffel Tower sparkle on the hour',
            'Toast to your anniversary with champagne',
            'Take romantic photos from the boat deck',
            'Listen to live music or commentary about the sights'
          ],
          where_to_eat: 'Included in the Seine River dinner cruise experience - typically featuring French classics like foie gras, duck confit, and creme brulee'
        }
      ],
      night: [
        {
          attraction: 'Trocadero and Eiffel Tower at Night',
          attraction_description: 'The Trocadero Gardens offer the best views of the illuminated Eiffel Tower, especially during the hourly light show when thousands of sparkling lights dance across the iron structure for five magical minutes.',
          what_to_do: [
            'Walk to Trocadero after your dinner cruise',
            'Watch the Eiffel Tower sparkle at the top of the hour',
            'Take anniversary photos with the tower as backdrop',
            'Enjoy street performers and vendors in the plaza'
          ],
          where_to_eat: 'Champagne bar at the top of Eiffel Tower for a nightcap, or Cafe de l\'Homme at Trocadero for drinks with spectacular views'
        }
      ],
      late_night: [
        {
          attraction: 'Montmartre Evening Stroll',
          attraction_description: 'The artistic hilltop neighborhood of Montmartre takes on a romantic atmosphere at night, with its cobblestone streets, intimate bistros, and the glowing white dome of Sacre-Coeur Basilica overlooking the city.',
          what_to_do: [
            'Ride the funicular or climb the steps to Sacre-Coeur',
            'Enjoy panoramic views of Paris at night from the basilica steps',
            'Walk through Place du Tertre where artists still paint',
            'Find the Wall of Love with "I love you" in 311 languages'
          ],
          where_to_eat: 'La Maison Rose for late dessert and wine, or Le Consulat for a romantic nightcap in a historic cafe frequented by artists like Picasso and Modigliani'
        }
      ]
    }
  ]
};

/**
 * Scenario 4: Single day trip with selective time periods
 * Tests realistic family-friendly scenario with appropriate null periods
 */
export const familyDayTrip: ItineraryResponse = {
  destination: 'San Diego',
  party_info: 'Family with 2 kids ages 5 and 8',
  month: 'July',
  days: 1,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'San Diego Zoo',
          attraction_description: 'World-famous zoo with diverse animal exhibits',
          what_to_do: [
            'Visit the pandas',
            'Ride the Skyfari aerial tram',
            'See the gorilla habitat'
          ],
          where_to_eat: 'Albert\'s Restaurant inside the zoo'
        }
      ],
      afternoon: [
        {
          attraction: 'Balboa Park',
          attraction_description: 'Large urban park with museums and gardens',
          what_to_do: [
            'Play at the playground',
            'Visit the Natural History Museum',
            'Walk through the gardens'
          ],
          where_to_eat: 'Panama 66 for casual outdoor dining'
        }
      ],
      evening: [
        {
          attraction: 'La Jolla Cove',
          attraction_description: 'Scenic coastal area with sea lions and beaches',
          what_to_do: [
            'Watch sea lions',
            'Play at the beach',
            'Walk along the coastal path'
          ],
          where_to_eat: 'Duke\'s La Jolla for sunset dinner'
        }
      ],
      night: null,
      late_night: null
    }
  ]
};

/**
 * All test scenarios for easy access
 */
export const testScenarios = {
  complete: completeItinerary,
  minimal: minimalItinerary,
  edgeCase: edgeCaseItinerary,
  familyDayTrip: familyDayTrip
};
