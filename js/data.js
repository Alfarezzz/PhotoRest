/**
 * ============================================================================
 * PhotoRest - Static Dataset (72 Curated Pins)
 * 
 * 12 pins per category x 6 categories = 72 pins.
 * Divisible by 4, 3, 2, and 1 columns for a 100% full, zero-gap uniform grid!
 * ============================================================================
 */

const DEFAULT_PINS = [
    {
        "author":  "Kelan",
        "title":  "Elden Ring Landscape Art",
        "category":  "explore",
        "description":  "Stunning atmospheric open-world concept art.",
        "id":  "explore-1",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/Elden.jpg",
        "likes":  42
    },
    {
        "author":  "Kelan",
        "title":  "Ada Wong Resident Evil Art",
        "category":  "explore",
        "description":  "Iconic character portrait from Resident Evil.",
        "id":  "explore-2",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/ada.jpg",
        "likes":  58
    },
    {
        "author":  "Square Fan",
        "title":  "Final Fantasy IX Castle Scene",
        "category":  "explore",
        "description":  "Nostalgic Alexandria castle fantasy artwork.",
        "id":  "explore-3",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/ff9.jpg",
        "likes":  39
    },
    {
        "author":  "Enro Art",
        "title":  "Enro Studio Character Concept",
        "category":  "explore",
        "description":  "Original anime character illustration and line art.",
        "id":  "explore-4",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/Enro.jpg",
        "likes":  45
    },
    {
        "author":  "Joker",
        "title":  "Persona 5 Phantom Vibe",
        "category":  "explore",
        "description":  "Stylized red and black aesthetic composition.",
        "id":  "explore-5",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/persona.jpg",
        "likes":  64
    },
    {
        "author":  "Edmund Vibe",
        "title":  "The Binding of Isaac Fanart",
        "category":  "explore",
        "description":  "Dark cute roguelike video game illustration.",
        "id":  "explore-6",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/isaac.webp",
        "likes":  29
    },
    {
        "author":  "Doggo",
        "title":  "Wholesome Dog Meme",
        "category":  "explore",
        "description":  "Classic funny wholesome puppy expression.",
        "id":  "explore-7",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/meme.jpg",
        "likes":  74
    },
    {
        "author":  "Analog Lens",
        "title":  "Vintage Camera \u0026 Journal",
        "category":  "explore",
        "description":  "Classic flatlay of analog photography tools.",
        "id":  "explore-8",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/camera.jpg",
        "likes":  19
    },
    {
        "author":  "Kanto Studio",
        "title":  "Psyduck Anime Icon",
        "category":  "explore",
        "description":  "Classic confused Psyduck pokemon render.",
        "id":  "explore-9",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/Psyduck.JPG",
        "likes":  83
    },
    {
        "author":  "Kelan",
        "title":  "SMK Memories \u0026 Moments",
        "category":  "explore",
        "description":  "Real high school friendship archive and memories.",
        "id":  "explore-10",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/IMG-20220411-WA0079.jpg",
        "likes":  99
    },
    {
        "author":  "StreetKicks",
        "title":  "Neon Wave Sneaker Art",
        "category":  "explore",
        "description":  "Contemporary footwear design and palette.",
        "id":  "explore-11",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes25.jpg",
        "likes":  47
    },
    {
        "author":  "Sea Nomad",
        "title":  "Tropical Coastal Panorama",
        "category":  "explore",
        "description":  "Turquoise horizon and gentle tidal foam.",
        "id":  "explore-12",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach20.jpg",
        "likes":  62
    },
    {
        "author":  "Chef Hiro",
        "title":  "Spicy Ramen Noodles",
        "category":  "food",
        "description":  "Rich pork broth ramen with soft egg and nori.",
        "id":  "food-1",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/ramen.jpg",
        "likes":  38
    },
    {
        "author":  "Luigi Kitchen",
        "title":  "Authentic Italian Pizza",
        "category":  "food",
        "description":  "Wood-fired artisanal pizza with fresh basil.",
        "id":  "food-2",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/pizza.jpg",
        "likes":  45
    },
    {
        "author":  "BiteCraft",
        "title":  "Gourmet Angus Burger",
        "category":  "food",
        "description":  "Juicy double patty burger with melting cheddar.",
        "id":  "food-3",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/burger.jpg",
        "likes":  61
    },
    {
        "author":  "Tokyo Raw",
        "title":  "Fresh Salmon Nigiri Sushi",
        "category":  "food",
        "description":  "Freshly prepared artisan sushi selection.",
        "id":  "food-4",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/sushi.jpg",
        "likes":  52
    },
    {
        "author":  "Nusantara Taste",
        "title":  "Traditional Beef Rendang",
        "category":  "food",
        "description":  "Slow-cooked aromatic caramelized beef.",
        "id":  "food-5",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/rendang.jpg",
        "likes":  83
    },
    {
        "author":  "Mang Ujang",
        "title":  "Steaming Bakso Urat",
        "category":  "food",
        "description":  "Savory meatball soup with glass noodles.",
        "id":  "food-6",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/bakso.jpg",
        "likes":  31
    },
    {
        "author":  "FryDay",
        "title":  "Crispy French Fries",
        "category":  "food",
        "description":  "Golden seasoned french fries with dipping sauce.",
        "id":  "food-7",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/kentang.jpg",
        "likes":  24
    },
    {
        "author":  "Sweet Tooth",
        "title":  "Sweet Choco Glazed Donut",
        "category":  "food",
        "description":  "Fluffy brioche donuts with dark chocolate ganache.",
        "id":  "food-8",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/donat.jpg",
        "likes":  44
    },
    {
        "author":  "Dimsum House",
        "title":  "Classic Dimsum Siomay",
        "category":  "food",
        "description":  "Steamed shrimp dumplings in bamboo basket.",
        "id":  "food-9",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/dimsum.jpg",
        "likes":  37
    },
    {
        "author":  "Bella Cucina",
        "title":  "Creamy Carbonara Pasta",
        "category":  "food",
        "description":  "Traditional Italian pasta with parmigiano.",
        "id":  "food-10",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/pasta.jpg",
        "likes":  49
    },
    {
        "author":  "Wok King",
        "title":  "Indonesian Fried Rice (Nasgor)",
        "category":  "food",
        "description":  "Smoky wok-tossed fried rice with sunny side up.",
        "id":  "food-11",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/nasgor.jpg",
        "likes":  70
    },
    {
        "author":  "Martabak 88",
        "title":  "Sweet Martabak Manis",
        "category":  "food",
        "description":  "Thick buttery pancake filled with chocolate \u0026 cheese.",
        "id":  "food-12",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/food/martabak2.jpg",
        "likes":  58
    },
    {
        "author":  "Island Hopper",
        "title":  "Clear Aqua Tropic Bay",
        "category":  "beach",
        "description":  "Crystal turquoise water under bright tropical skies.",
        "id":  "beach-1",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach1.jpg",
        "likes":  90
    },
    {
        "author":  "Surf Life",
        "title":  "Golden Sunset Wave Breaker",
        "category":  "beach",
        "description":  "Gentle waves crashing during warm golden hour.",
        "id":  "beach-2",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach2.jpg",
        "likes":  71
    },
    {
        "author":  "Coast Explorer",
        "title":  "Emerald Hidden Lagoon",
        "category":  "beach",
        "description":  "Secluded sandy shore surrounded by limestone cliffs.",
        "id":  "beach-3",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach3.jpg",
        "likes":  64
    },
    {
        "author":  "Wanderlust",
        "title":  "Palms \u0026 White Sandy Coast",
        "category":  "beach",
        "description":  "Lush green palms leaning over pure white sand.",
        "id":  "beach-4",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach4.jpg",
        "likes":  85
    },
    {
        "author":  "Ocean View",
        "title":  "Azure Deep Sea Horizons",
        "category":  "beach",
        "description":  "Peaceful panoramic view of the infinite blue horizon.",
        "id":  "beach-5",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach5.jpg",
        "likes":  43
    },
    {
        "author":  "Sandy Footprints",
        "title":  "Sunset Shoreline Breeze",
        "category":  "beach",
        "description":  "Warm pastel sunset reflecting on wet tidal sand.",
        "id":  "beach-6",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach6.jpg",
        "likes":  57
    },
    {
        "author":  "Reef Runner",
        "title":  "Tropical Reef Paradise",
        "category":  "beach",
        "description":  "Vibrant coral colors visible through clear shoreline.",
        "id":  "beach-7",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach7.jpg",
        "likes":  76
    },
    {
        "author":  "Dawn Patrol",
        "title":  "Misty Morning Coastline",
        "category":  "beach",
        "description":  "Calm morning mist over rocky ocean shoreline.",
        "id":  "beach-8",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach8.jpg",
        "likes":  39
    },
    {
        "author":  "Sun Chaser",
        "title":  "Sunny Coral Beach",
        "category":  "beach",
        "description":  "Bright midday sunshine illuminating coastal waters.",
        "id":  "beach-9",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach13.jpg",
        "likes":  62
    },
    {
        "author":  "Breeze Co.",
        "title":  "Paradise Island Shore",
        "category":  "beach",
        "description":  "Idyllic island getaway with calm turquoise waves.",
        "id":  "beach-10",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach10.jpg",
        "likes":  88
    },
    {
        "author":  "Wild Coast",
        "title":  "Dramatic Coastal Cliffs",
        "category":  "beach",
        "description":  "Towering ocean cliffs overlooking raging surf.",
        "id":  "beach-11",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach11.jpg",
        "likes":  51
    },
    {
        "author":  "Dusk Dreamer",
        "title":  "Pink Pastel Dusk Beach",
        "category":  "beach",
        "description":  "Soft purple and pink twilight reflections.",
        "id":  "beach-12",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/beach/beach12.jpg",
        "likes":  94
    },
    {
        "author":  "Wildlife Lens",
        "title":  "Curious Golden Fox",
        "category":  "animal",
        "description":  "Close-up portrait of a wild red fox in nature.",
        "id":  "animal-1",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/fox.jpg",
        "likes":  73
    },
    {
        "author":  "Savanna Walk",
        "title":  "Majestic Bengal Tiger",
        "category":  "animal",
        "description":  "King of the jungle overlooking golden grass.",
        "id":  "animal-2",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/macan.jpg",
        "likes":  112
    },
    {
        "author":  "Feline Friends",
        "title":  "Playful Fluffy Kitten",
        "category":  "animal",
        "description":  "Fluffy domestic kitten looking with curious eyes.",
        "id":  "animal-3",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/cat.jpg",
        "likes":  86
    },
    {
        "author":  "Avian Quest",
        "title":  "Tropical Songbird",
        "category":  "animal",
        "description":  "Vivid wild bird perched gracefully on woodland branch.",
        "id":  "animal-4",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/burung.jpg",
        "likes":  67
    },
    {
        "author":  "Forest Path",
        "title":  "Gentle White Bunny",
        "category":  "animal",
        "description":  "Cute rabbit grazing quietly in the morning meadow.",
        "id":  "animal-5",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/kelinci.jpg",
        "likes":  59
    },
    {
        "author":  "Wild North",
        "title":  "Wild Forest Brown Bear",
        "category":  "animal",
        "description":  "Powerful grizzly bear roaming the mountain streams.",
        "id":  "animal-6",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/bear.jpg",
        "likes":  95
    },
    {
        "author":  "Bamboo Grove",
        "title":  "Cute Giant Panda",
        "category":  "animal",
        "description":  "Peaceful giant panda enjoying fresh green bamboo.",
        "id":  "animal-7",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/panda.jpg",
        "likes":  120
    },
    {
        "author":  "Outback Lens",
        "title":  "Sleepy Australian Koala",
        "category":  "animal",
        "description":  "Adorable koala resting peacefully on eucalyptus tree.",
        "id":  "animal-8",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/koala.jpg",
        "likes":  84
    },
    {
        "author":  "Safari Safari",
        "title":  "Tall Savanna Giraffe",
        "category":  "animal",
        "description":  "Graceful giraffe reaching for high acacia leaves.",
        "id":  "animal-9",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/jerapah.jpg",
        "likes":  77
    },
    {
        "author":  "Puppy Love",
        "title":  "Loyal Golden Puppy",
        "category":  "animal",
        "description":  "Happy dog playing freely on a sunny day.",
        "id":  "animal-10",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/anjing.jpg",
        "likes":  104
    },
    {
        "author":  "Wildlife Quest",
        "title":  "Majestic Wild Elephant",
        "category":  "animal",
        "description":  "Gentle giant walking through the dense rain forest.",
        "id":  "animal-11",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/gajah.jpg",
        "likes":  89
    },
    {
        "author":  "Deep Nature",
        "title":  "Ancient Galapagos Tortoise",
        "category":  "animal",
        "description":  "Calm tortoise wandering along the coastal sanctuary.",
        "id":  "animal-12",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/animal/kura.jpg",
        "likes":  68
    },
    {
        "author":  "Sneaker Lab",
        "title":  "Retro Chunky Runner",
        "category":  "shoes",
        "description":  "Vintage 90s inspired colorway with layered soles.",
        "id":  "shoes-1",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes1.jpg",
        "likes":  48
    },
    {
        "author":  "Court Kicks",
        "title":  "High-Top Basketball Classic",
        "category":  "shoes",
        "description":  "Iconic leather high-top silhouette in bold colors.",
        "id":  "shoes-2",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes2.jpg",
        "likes":  92
    },
    {
        "author":  "Clean Step",
        "title":  "Minimalist White Leather Sneaker",
        "category":  "shoes",
        "description":  "Monochrome daily sneaker with premium stitching.",
        "id":  "shoes-3",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes3.jpg",
        "likes":  65
    },
    {
        "author":  "Athletic Pace",
        "title":  "Modern Lightweight Runner",
        "category":  "shoes",
        "description":  "Breathable knit upper with responsive foam cushion.",
        "id":  "shoes-4",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes4.jpg",
        "likes":  55
    },
    {
        "author":  "Urban Flex",
        "title":  "Streetwear Platform Sneaker",
        "category":  "shoes",
        "description":  "Edgy street sneaker with oversized rubber outsole.",
        "id":  "shoes-5",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes5.jpg",
        "likes":  74
    },
    {
        "author":  "Cyber Kicks",
        "title":  "Futuristic Techwear Sneaker",
        "category":  "shoes",
        "description":  "Strapped aerodynamic design with reflective accents.",
        "id":  "shoes-6",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes6.jpg",
        "likes":  83
    },
    {
        "author":  "Nordic Trail",
        "title":  "Earth-Tone Suede Runner",
        "category":  "shoes",
        "description":  "Olive and sand textured suede walking sneaker.",
        "id":  "shoes-7",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes7.jpg",
        "likes":  39
    },
    {
        "author":  "Volt Style",
        "title":  "Vibrant Neon Low-Top",
        "category":  "shoes",
        "description":  "Electric accent colorway on breathable canvas.",
        "id":  "shoes-8",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes8.jpg",
        "likes":  61
    },
    {
        "author":  "Craftsman",
        "title":  "Artisan Leather Oxford",
        "category":  "shoes",
        "description":  "Handcrafted formal leather brogue with polished finish.",
        "id":  "shoes-9",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes9.jpg",
        "likes":  42
    },
    {
        "author":  "Summit Gear",
        "title":  "Trail Trekking Boot",
        "category":  "shoes",
        "description":  "Waterproof rugged outdoor boot with grip lugs.",
        "id":  "shoes-10",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes10.jpg",
        "likes":  53
    },
    {
        "author":  "Pastel Walk",
        "title":  "Pastel Lifestyle Sneaker",
        "category":  "shoes",
        "description":  "Soft candy tone lifestyle shoe for casual outfits.",
        "id":  "shoes-11",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes11.jpg",
        "likes":  67
    },
    {
        "author":  "Pro Athlete",
        "title":  "Sport Performance Trainer",
        "category":  "shoes",
        "description":  "High-traction gym sneaker with carbon plate.",
        "id":  "shoes-12",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/shoes/shoes12.jpg",
        "likes":  49
    },
    {
        "author":  "Classic Auto",
        "title":  "Vintage Scarlet Roadster",
        "category":  "car",
        "description":  "Timeless 1960s convertible sports car.",
        "id":  "car-1",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car1.jpg",
        "likes":  84
    },
    {
        "author":  "Speed Form",
        "title":  "Matte Black Hypercar",
        "category":  "car",
        "description":  "Carbon fiber aerodynamics with twin-turbo performance.",
        "id":  "car-2",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car2.jpg",
        "likes":  125
    },
    {
        "author":  "EV Mobility",
        "title":  "Urban Electric Hatchback",
        "category":  "car",
        "description":  "Sleek compact city electric vehicle.",
        "id":  "car-3",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car3.jpg",
        "likes":  46
    },
    {
        "author":  "V8 Rumble",
        "title":  "Retro Muscle Beast",
        "category":  "car",
        "description":  "American classic muscle car with wide stance.",
        "id":  "car-4",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car4.jpg",
        "likes":  99
    },
    {
        "author":  "Prestige Drive",
        "title":  "Luxury Grand Tourer",
        "category":  "car",
        "description":  "Smooth metallic finish on handcrafted luxury coupe.",
        "id":  "car-5",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car5.jpg",
        "likes":  78
    },
    {
        "author":  "Overland Expedition",
        "title":  "Off-Road Desert 4x4",
        "category":  "car",
        "description":  "Lifted suspension vehicle tackling rugged sand dunes.",
        "id":  "car-6",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car6.jpg",
        "likes":  63
    },
    {
        "author":  "JDM Culture",
        "title":  "Midnight Drift Tuner",
        "category":  "car",
        "description":  "Custom widebody sports coupe under street lamps.",
        "id":  "car-7",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car7.jpg",
        "likes":  110
    },
    {
        "author":  "Aero Works",
        "title":  "Sleek Aerodynamic Supercar",
        "category":  "car",
        "description":  "Futuristic concept curves engineered for high speed.",
        "id":  "car-8",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car8.jpg",
        "likes":  91
    },
    {
        "author":  "Euro Heritage",
        "title":  "Classic European Coupe",
        "category":  "car",
        "description":  "Clean lines and silver paint on vintage luxury coupe.",
        "id":  "car-9",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car9.jpg",
        "likes":  57
    },
    {
        "author":  "Executive Ride",
        "title":  "Modern Luxury Sedan",
        "category":  "car",
        "description":  "Refined executive sedan with intelligent headlights.",
        "id":  "car-10",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car21.jpg",
        "likes":  52
    },
    {
        "author":  "Apex Racing",
        "title":  "Track-Ready Racecar",
        "category":  "car",
        "description":  "Stripped interior and GT rear wing for circuit laps.",
        "id":  "car-11",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car22.jpg",
        "likes":  87
    },
    {
        "author":  "Road Trip Club",
        "title":  "Golden Sunset Highway Cruiser",
        "category":  "car",
        "description":  "Cruising along the coastal freeway during sunset.",
        "id":  "car-12",
        "authorAvatar":  "images/perfil.png",
        "image":  "images/car/car23.jpg",
        "likes":  73
    }
];
