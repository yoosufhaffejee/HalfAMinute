const categories = {
  "History": [
    {
      "word": "World War I",
      "difficulty": "easy",
      "description": "First major global conflict, fought from 1914 to 1918."
    },
    {
      "word": "World War II",
      "difficulty": "easy",
      "description": "Global war from 1939 to 1945 involving most countries."
    },
    {
      "word": "American Revolution",
      "difficulty": "easy",
      "description": "War for independence of the American colonies from Britain (1775-1783)."
    },
    {
      "word": "French Revolution",
      "difficulty": "easy",
      "description": "Period of radical social and political change in France (1789-1799)."
    },
    {
      "word": "Roman Empire",
      "difficulty": "easy",
      "description": "Ancient empire centered in Rome, lasting from 27 BC to AD 476."
    },
    {
      "word": "Ancient Egypt",
      "difficulty": "easy",
      "description": "Civilization along the Nile River, known for pyramids and pharaohs."
    },
    {
      "word": "Cold War",
      "difficulty": "easy",
      "description": "Political tension between the USA and USSR from 1947 to 1991."
    },
    {
      "word": "The Renaissance",
      "difficulty": "easy",
      "description": "Period of renewed interest in art and learning in Europe (14th-17th century)."
    },
    {
      "word": "Alexander the Great",
      "difficulty": "easy",
      "description": "Macedonian king who created a vast empire in the 4th century BC."
    },
    {
      "word": "Fall of Constantinople",
      "difficulty": "hard",
      "description": "Ottoman conquest of the Byzantine capital in 1453."
    },
    {
      "word": "Treaty of Versailles",
      "difficulty": "hard",
      "description": "Peace treaty ending World War I, signed in 1919."
    },
    {
      "word": "Ottoman Empire",
      "difficulty": "hard",
      "description": "Empire controlling much of Southeast Europe, Western Asia, and North Africa from 1299 to 1922."
    },
    {
      "word": "Battle of Waterloo",
      "difficulty": "hard",
      "description": "Decisive battle in 1815 that ended Napoleon's rule in France."
    },
    {
      "word": "Crusades",
      "difficulty": "easy",
      "description": "Series of religious wars between Christians and Muslims over the Holy Land."
    },
    {
      "word": "Genghis Khan",
      "difficulty": "easy",
      "description": "Founder of the Mongol Empire, which became the largest contiguous empire in history."
    },
    {
      "word": "Marco Polo",
      "difficulty": "easy",
      "description": "Venetian explorer known for his travels to Asia in the 13th century."
    },
    {
      "word": "Hannibal",
      "difficulty": "hard",
      "description": "Carthaginian general known for leading elephants across the Alps in the Second Punic War."
    },
    {
      "word": "Mongol Empire",
      "difficulty": "hard",
      "description": "Empire founded by Genghis Khan, stretching across Asia and Europe."
    },
    {
      "word": "Magna Carta",
      "difficulty": "hard",
      "description": "1215 document limiting the power of the English king and establishing legal rights."
    },
    {
      "word": "Napoleon Bonaparte",
      "difficulty": "easy",
      "description": "French military leader who became Emperor of France and led numerous campaigns."
    },
    {
      "word": "Soviet Union",
      "difficulty": "easy",
      "description": "Former socialist state in Eastern Europe and Asia, existing from 1922 to 1991."
    },
    {
      "word": "Battle of Gettysburg",
      "difficulty": "hard",
      "description": "Turning point battle of the American Civil War fought in 1863."
    },
    {
      "word": "Sparta",
      "difficulty": "easy",
      "description": "Ancient Greek city-state known for its military strength and discipline."
    },
    {
      "word": "Joan of Arc",
      "difficulty": "easy",
      "description": "French heroine who led troops during the Hundred Years' War and was later canonized as a saint."
    },
    {
      "word": "The Black Plague",
      "difficulty": "easy",
      "description": "Devastating epidemic of bubonic plague that struck Europe in the 14th century."
    },
    {
      "word": "Ancient Greece",
      "difficulty": "easy",
      "description": "Civilization known for its contributions to philosophy, art, and politics, centered in the Aegean region."
    },
    {
      "word": "Vikings",
      "difficulty": "easy",
      "description": "Norse seafarers and warriors from Scandinavia who raided and traded in Europe during the early Middle Ages."
    },
    {
      "word": "Mayflower",
      "difficulty": "easy",
      "description": "Ship that transported the Pilgrims to America in 1620."
    },
    {
      "word": "Titanic",
      "difficulty": "easy",
      "description": "Famous British passenger liner that sank after hitting an iceberg in 1912."
    },
    {
      "word": "Pearl Harbor",
      "difficulty": "easy",
      "description": "Site of the surprise Japanese attack on the US naval base in 1941."
    },
    {
      "word": "Leonardo da Vinci",
      "difficulty": "easy",
      "description": "Italian artist and inventor of the Renaissance, known for works like the Mona Lisa."
    },
    {
      "word": "Alexander Hamilton",
      "difficulty": "hard",
      "description": "Founding Father of the US, first Secretary of the Treasury, and co-author of the Federalist Papers."
    },
    {
      "word": "Sumerians",
      "difficulty": "hard",
      "description": "Early civilization in Mesopotamia known for developing one of the first writing systems."
    },
    {
      "word": "King Tutankhamun",
      "difficulty": "easy",
      "description": "Young Egyptian pharaoh whose nearly intact tomb was discovered in 1922."
    },
    {
      "word": "Medieval Period",
      "difficulty": "easy",
      "description": "Time in European history between the fall of the Roman Empire and the Renaissance."
    },
    {
      "word": "Byzantine Empire",
      "difficulty": "hard",
      "description": "Eastern part of the Roman Empire, continuing from the 4th century AD until 1453."
    },
    {
      "word": "Rosa Parks",
      "difficulty": "easy",
      "description": "Civil rights activist known for refusing to give up her bus seat in 1955."
    },
    {
      "word": "Louis XIV",
      "difficulty": "hard",
      "description": "French king known as the Sun King who ruled for 72 years and centralized royal power."
    },
    {
      "word": "Harlem Renaissance",
      "difficulty": "hard",
      "description": "Cultural movement of the 1920s celebrating African American art and literature."
    },
    {
      "word": "Martin Luther King Jr.",
      "difficulty": "easy",
      "description": "Civil rights leader known for his role in advancing equality and his 'I Have a Dream' speech."
    },
    {
      "word": "Berlin Wall",
      "difficulty": "easy",
      "description": "Barrier dividing East and West Berlin from 1961 to 1989."
    },
    {
      "word": "Emancipation Proclamation",
      "difficulty": "hard",
      "description": "1863 order by President Lincoln freeing slaves in Confederate states."
    },
    {
      "word": "Columbus' First Voyage",
      "difficulty": "easy",
      "description": "1492 journey by Christopher Columbus leading to European awareness of the Americas."
    },
    {
      "word": "Feudalism",
      "difficulty": "hard",
      "description": "Medieval social system where land was exchanged for military service and loyalty."
    },
    {
      "word": "Barack Obama",
      "difficulty": "easy",
      "description": "44th US President and the first African American to hold the office."
    },
    {
      "word": "Nelson Mandela",
      "difficulty": "hard",
      "description": "Anti-apartheid leader and first black president of South Africa."
    },
    {
      "word": "Cleopatra",
      "difficulty": "hard",
      "description": "Last active ruler of ancient Egypt, known for her alliances with Roman leaders."
    },
    {
      "word": "Socrates",
      "difficulty": "hard",
      "description": "Ancient Greek philosopher who developed the Socratic method of questioning."
    },
    {
      "word": "Plato",
      "difficulty": "hard",
      "description": "Greek philosopher and student of Socrates who founded the Academy in Athens."
    },
    {
      "word": "Aristotle",
      "difficulty": "hard",
      "description": "Greek philosopher and student of Plato who made significant contributions to many fields."
    },
    {
      "word": "Confucius",
      "difficulty": "hard",
      "description": "Chinese philosopher known for his teachings on ethics and politics."
    },
    {
      "word": "Albert Camus",
      "difficulty": "hard",
      "description": "French philosopher and writer known for his ideas on absurdism and existentialism."
    },
    {
      "word": "Moon Landing",
      "difficulty": "easy",
      "description": "1969 event where astronauts first walked on the moon."
    },
    {
      "word": "Civil Rights Movement",
      "difficulty": "easy",
      "description": "Effort in the 1950s and 1960s to end racial segregation and discrimination in the US."
    },
    {
      "word": "Fall of Berlin Wall",
      "difficulty": "easy",
      "description": "1989 event marking the end of the division between East and West Berlin."
    },
    {
      "word": "Renaissance",
      "difficulty": "easy",
      "description": "Period of cultural rebirth in Europe, following the Middle Ages."
    },
    {
      "word": "Great Depression",
      "difficulty": "easy",
      "description": "Severe worldwide economic downturn during the 1930s."
    },
    {
      "word": "Signing of the Magna Carta",
      "difficulty": "hard",
      "description": "1215 event where English nobles forced King John to sign a document limiting his power."
    },
    {
      "word": "Battle of Hastings",
      "difficulty": "hard",
      "description": "1066 battle where William the Conqueror defeated King Harold II of England."
    },
    {
      "word": "Cuban Missile Crisis",
      "difficulty": "hard",
      "description": "1962 confrontation between the US and the Soviet Union over missile sites in Cuba."
    },
    {
      "word": "Boston Tea Party",
      "difficulty": "hard",
      "description": "1773 protest against British tax on tea, involving the dumping of tea into Boston Harbor."
    },
    {
      "word": "Spanish Inquisition",
      "difficulty": "hard",
      "description": "Religious court established in Spain to root out heresy in the late 15th century."
    },
    {
      "word": "Storming of the Bastille",
      "difficulty": "hard",
      "description": "1789 event marking the start of the French Revolution with the capture of a fortress."
    },
    {
      "word": "Salem Witch Trials",
      "difficulty": "hard",
      "description": "1692 series of trials in colonial Massachusetts resulting in executions for witchcraft."
    },
    {
      "word": "Berlin Airlift",
      "difficulty": "hard",
      "description": "1948-49 operation to supply West Berlin with essentials during a Soviet blockade."
    },
    {
      "word": "Apollo 11",
      "difficulty": "easy",
      "description": "1969 mission that landed the first humans on the moon."
    },
    {
      "word": "Emperor Nero",
      "difficulty": "hard",
      "description": "Roman emperor known for his tyrannical rule and persecution of Christians."
    },
    {
      "word": "George Washington",
      "difficulty": "easy",
      "description": "First US President and leader of the American Revolutionary forces."
    },
    {
      "word": "Hillary Clinton",
      "difficulty": "easy",
      "description": "Former US Secretary of State and first female presidential candidate from a major party."
    },
    {
      "word": "Jacinda Ardern",
      "difficulty": "easy",
      "description": "Prime Minister of New Zealand known for her leadership style and policies."
    },
    {
      "word": "Julius Caesar",
      "difficulty": "easy",
      "description": "Roman general and dictator who played a key role in the rise of the Roman Empire."
    },
    {
      "word": "Margaret Thatcher",
      "difficulty": "easy",
      "description": "Prime Minister of the UK known for her conservative policies and leadership."
    },
    {
      "word": "Napoleon",
      "difficulty": "easy",
      "description": "French military leader and emperor known for his role in the Napoleonic Wars."
    },
    {
      "word": "Queen Elizabeth I",
      "difficulty": "hard",
      "description": "Queen of England known for her strong leadership during the Elizabethan era."
    },
    {
      "word": "Queen Victoria",
      "difficulty": "easy",
      "description": "Long-reigning British monarch known for the Victorian era."
    },
    {
      "word": "Ulysses S. Grant",
      "difficulty": "easy",
      "description": "18th US President and Union general in the Civil War."
    },
    {
      "word": "Vladimir Putin",
      "difficulty": "easy",
      "description": "Current President of Russia and former Prime Minister."
    },
    {
      "word": "Winston Churchill",
      "difficulty": "easy",
      "description": "British Prime Minister known for his leadership during World War II."
    },
    {
      "word": "The Cold War",
      "difficulty": "hard",
      "description": "Extended period of geopolitical tension between the US and USSR."
    },
    {
      "word": "The Great Depression",
      "difficulty": "easy",
      "description": "Severe global economic downturn during the 1930s."
    },
    {
      "word": "The Industrial Revolution",
      "difficulty": "hard",
      "description": "Period of technological and industrial growth in the 18th and 19th centuries."
    },
    {
      "word": "Apartheid Museum",
      "difficulty": "easy",
      "description": "Museum in Johannesburg that documents South Africa's apartheid history."
    },
    {
      "word": "Desmond Tutu",
      "difficulty": "easy",
      "description": "Renowned archbishop and anti-apartheid activist."
    },
    {
      "word": "Steve Biko",
      "difficulty": "easy",
      "description": "Anti-apartheid activist and founder of the Black Consciousness Movement."
    },
    {
      "word": "Castle of Good Hope",
      "difficulty": "hard",
      "description": "Historical fort in Cape Town."
    },
    {
      "word": "Nelson Mandela Capture Site",
      "difficulty": "hard",
      "description": "Historic site near Howick where Mandela was arrested in 1962."
    }
  ],
  "Geography (Places & Attractions)": [
    {
      "word": "Mount Everest",
      "difficulty": "easy",
      "description": "Tallest mountain"
    },
    {
      "word": "Amazon River",
      "difficulty": "easy",
      "description": "Longest river in South America"
    },
    {
      "word": "Sahara Desert",
      "difficulty": "easy",
      "description": "Hottest and driest desert"
    },
    {
      "word": "Great Barrier Reef",
      "difficulty": "easy",
      "description": "Largest coral reef system"
    },
    {
      "word": "Nile River",
      "difficulty": "easy",
      "description": "Longest river in Africa"
    },
    {
      "word": "Grand Canyon",
      "difficulty": "easy",
      "description": "One of the deepest and longest canyons"
    },
    {
      "word": "Rocky Mountains",
      "difficulty": "easy",
      "description": "Mountain range across western Canada and USA"
    },
    {
      "word": "Himalayas",
      "difficulty": "easy",
      "description": "Mountain range between India, Nepal, Bhutan, and Pakistan"
    },
    {
      "word": "Lake Baikal",
      "difficulty": "hard",
      "description": "World's largest freshwater lake by volume"
    },
    {
      "word": "Andes Mountains",
      "difficulty": "easy",
      "description": "Longest mountain range in South America"
    },
    {
      "word": "Mekong River",
      "difficulty": "hard",
      "description": "Longest river in Southeast Asia"
    },
    {
      "word": "Atacama Desert",
      "difficulty": "hard",
      "description": "Driest non-polar desert"
    },
    {
      "word": "Victoria Falls",
      "difficulty": "easy",
      "description": "One of the largest waterfalls in the world"
    },
    {
      "word": "Gobi Desert",
      "difficulty": "easy",
      "description": "Coldest desert on Earth"
    },
    {
      "word": "Mount Kilimanjaro",
      "difficulty": "easy",
      "description": "Highest peak in Africa"
    },
    {
      "word": "Mediterranean Sea",
      "difficulty": "easy",
      "description": "Warmest sea connecting Europe, Africa, and Asia"
    },
    {
      "word": "Bermuda Triangle",
      "difficulty": "easy",
      "description": "Area of numerous aircraft and ship disappearances"
    },
    {
      "word": "Angel Falls",
      "difficulty": "hard",
      "description": "Highest uninterrupted waterfall in the world"
    },
    {
      "word": "Dead Sea",
      "difficulty": "easy",
      "description": "Saltiest body of water on Earth"
    },
    {
      "word": "Yosemite National Park",
      "difficulty": "easy",
      "description": "National park with granite cliffs and giantsequoia groves"
    },
    {
      "word": "Machu Picchu",
      "difficulty": "easy",
      "description": "Inca citadel in Peru"
    },
    {
      "word": "Antarctica",
      "difficulty": "easy",
      "description": "Coldest continent on Earth"
    },
    {
      "word": "Galapagos Islands",
      "difficulty": "hard",
      "description": "Remote volcanic archipelago with unique species."
    },
    {
      "word": "Patagonia",
      "difficulty": "hard",
      "description": "Region with rugged terrain in southern South America."
    },
    {
      "word": "Amazon Rainforest",
      "difficulty": "easy",
      "description": "Vast tropical forest with diverse wildlife in South America."
    },
    {
      "word": "Niagara Falls",
      "difficulty": "easy",
      "description": "Famous waterfall on the border of the US and Canada."
    },
    {
      "word": "Siberia",
      "difficulty": "easy",
      "description": "Large, cold region in northern Russia."
    },
    {
      "word": "Mount Fuji",
      "difficulty": "easy",
      "description": "Tall, active volcano in Japan."
    },
    {
      "word": "Iceland",
      "difficulty": "easy",
      "description": "Island nation known for geysers and volcanoes."
    },
    {
      "word": "Tasmania",
      "difficulty": "hard",
      "description": "Island state south of Australia with unique wildlife."
    },
    {
      "word": "Borneo",
      "difficulty": "hard",
      "description": "Large island with rainforests in Southeast Asia."
    },
    {
      "word": "K2",
      "difficulty": "hard",
      "description": "Second highest mountain in the world, located in Pakistan."
    },
    {
      "word": "Lake Titicaca",
      "difficulty": "hard",
      "description": "High-altitude lake in the Andes between Peru and Bolivia."
    },
    {
      "word": "Serengeti",
      "difficulty": "easy",
      "description": "Famous national park in Tanzania known for wildlife migrations."
    },
    {
      "word": "Ural Mountains",
      "difficulty": "hard",
      "description": "Mountain range separating Europe and Asia."
    },
    {
      "word": "Red Sea",
      "difficulty": "easy",
      "description": "Sea between northeastern Africa and the Arabian Peninsula."
    },
    {
      "word": "Baltic Sea",
      "difficulty": "easy",
      "description": "Sea located between Northern Europe and Scandinavia."
    },
    {
      "word": "Caspian Sea",
      "difficulty": "hard",
      "description": "Large inland sea between Europe and Asia."
    },
    {
      "word": "Great Plains",
      "difficulty": "easy",
      "description": "Extensive flat region in North America known for agriculture."
    },
    {
      "word": "Cape of Good Hope",
      "difficulty": "easy",
      "description": "Southern tip of Africa, known for its rugged coastline."
    },
    {
      "word": "Balkan Peninsula",
      "difficulty": "hard",
      "description": "Region in southeastern Europe with diverse cultures."
    },
    {
      "word": "Tierra del Fuego",
      "difficulty": "hard",
      "description": "Archipelago at the southern tip of South America."
    },
    {
      "word": "Hokkaido",
      "difficulty": "hard",
      "description": "Northernmost island of Japan known for its cold climate."
    },
    {
      "word": "Lake Victoria",
      "difficulty": "easy",
      "description": "Large lake in East Africa shared by three countries."
    },
    {
      "word": "Scandinavia",
      "difficulty": "easy",
      "description": "Region in Northern Europe including Norway, Sweden, and Denmark."
    },
    {
      "word": "Carpathian Mountains",
      "difficulty": "hard",
      "description": "Mountain range in Eastern Europe."
    },
    {
      "word": "Rock of Gibraltar",
      "difficulty": "easy",
      "description": "Large limestone promontory at the southern tip of Spain."
    },
    {
      "word": "Yucatan Peninsula",
      "difficulty": "hard",
      "description": "Peninsula in southeastern Mexico known for its Mayan ruins."
    },
    {
      "word": "Mountain",
      "difficulty": "easy",
      "description": "Large landform rising prominently above its surroundings."
    },
    {
      "word": "River",
      "difficulty": "easy",
      "description": "Flowing watercourse that usually empties into a sea or ocean."
    },
    {
      "word": "Ocean",
      "difficulty": "easy",
      "description": "Large body of salt water covering most of the Earth's surface."
    },
    {
      "word": "Desert",
      "difficulty": "easy",
      "description": "Arid land with little vegetation and extreme temperatures."
    },
    {
      "word": "Valley",
      "difficulty": "easy",
      "description": "Low area of land between hills or mountains."
    },
    {
      "word": "Island",
      "difficulty": "easy",
      "description": "Land surrounded by water on all sides."
    },
    {
      "word": "Volcano",
      "difficulty": "easy",
      "description": "Mountain with an opening that can erupt with lava and ash."
    },
    {
      "word": "Peninsula",
      "difficulty": "easy",
      "description": "Land surrounded by water on three sides."
    },
    {
      "word": "Plateau",
      "difficulty": "easy",
      "description": "Flat elevated area of land with steep sides."
    },
    {
      "word": "Glacier",
      "difficulty": "easy",
      "description": "Slow-moving mass of ice formed by compacted snow."
    },
    {
      "word": "Equator",
      "difficulty": "hard",
      "description": "Imaginary line dividing the Earth into northern and southern hemispheres."
    },
    {
      "word": "Prime Meridian",
      "difficulty": "hard",
      "description": "Imaginary line dividing the Earth into eastern and western hemispheres."
    },
    {
      "word": "International Date Line",
      "difficulty": "hard",
      "description": "Imaginary line running north-south where the date changes."
    },
    {
      "word": "Tropic of Cancer",
      "difficulty": "hard",
      "description": "Latitudinal line marking the northernmost point of the tropics."
    },
    {
      "word": "Tropic of Capricorn",
      "difficulty": "hard",
      "description": "Latitudinal line marking the southernmost point of the tropics."
    },
    {
      "word": "Isthmus",
      "difficulty": "hard",
      "description": "Narrow strip of land connecting two larger land areas."
    },
    {
      "word": "Archipelago",
      "difficulty": "hard",
      "description": "Group of islands clustered together."
    },
    {
      "word": "Delta",
      "difficulty": "hard",
      "description": "Landform where a river splits into several streams before flowing into a sea."
    },
    {
      "word": "Estuary",
      "difficulty": "hard",
      "description": "Area where a river meets the sea, mixing fresh and saltwater."
    },
    {
      "word": "Atoll",
      "difficulty": "hard",
      "description": "Ring-shaped coral reef surrounding a lagoon."
    },
    {
      "word": "Paris",
      "difficulty": "easy",
      "description": "Capital city of France known for landmarks like the Eiffel Tower."
    },
    {
      "word": "The Great Wall of China",
      "difficulty": "easy",
      "description": "Historic wall stretching across northern China."
    },
    {
      "word": "Brazil",
      "difficulty": "easy",
      "description": "Largest country in South America, known for the Amazon Rainforest."
    },
    {
      "word": "Africa",
      "difficulty": "easy",
      "description": "Second largest continent, home to diverse cultures and wildlife."
    },
    {
      "word": "Statue of Liberty",
      "difficulty": "easy",
      "description": "Famous statue in New York Harbor symbolizing freedom."
    },
    {
      "word": "New York City",
      "difficulty": "easy",
      "description": "Major city in the United States known for landmarks like Times Square."
    },
    {
      "word": "Colosseum",
      "difficulty": "easy",
      "description": "Ancient amphitheater in Rome, Italy, used for gladiatorial games."
    },
    {
      "word": "Japan",
      "difficulty": "easy",
      "description": "Island nation in East Asia known for its culture and technology."
    },
    {
      "word": "Europe",
      "difficulty": "easy",
      "description": "Continent known for its rich history and diverse cultures."
    },
    {
      "word": "Eiffel Tower",
      "difficulty": "easy",
      "description": "Iconic iron tower in Paris, France."
    },
    {
      "word": "Matterhorn",
      "difficulty": "easy",
      "description": "Famous pyramid-shaped mountain in the Alps."
    },
    {
      "word": "China",
      "difficulty": "easy",
      "description": "Large country in East Asia known for its ancient history and Great Wall."
    },
    {
      "word": "Asia",
      "difficulty": "easy",
      "description": "Largest continent, home to many diverse cultures and countries."
    },
    {
      "word": "Golden Gate Bridge",
      "difficulty": "easy",
      "description": "Iconic suspension bridge in San Francisco, USA."
    },
    {
      "word": "Mississippi River",
      "difficulty": "easy",
      "description": "Major river running through the United States from north to south."
    },
    {
      "word": "Lake Superior",
      "difficulty": "easy",
      "description": "Largest of the Great Lakes in North America."
    },
    {
      "word": "Danube River",
      "difficulty": "easy",
      "description": "Major river in Europe flowing through several countries."
    },
    {
      "word": "Kilimanjaro",
      "difficulty": "easy",
      "description": "Tallest mountain in Africa, located in Tanzania."
    },
    {
      "word": "Opera House",
      "difficulty": "easy",
      "description": "Theater building known for performances and architectural design."
    },
    {
      "word": "Colorado River",
      "difficulty": "easy",
      "description": "River flowing through the Grand Canyon in the United States."
    },
    {
      "word": "Lake Tahoe",
      "difficulty": "easy",
      "description": "Large freshwater lake in the Sierra Nevada mountains."
    },
    {
      "word": "Mont Blanc",
      "difficulty": "easy",
      "description": "Highest mountain in the Alps, located in France and Italy."
    },
    {
      "word": "Lake Ontario",
      "difficulty": "easy",
      "description": "One of the Great Lakes, located between the US and Canada."
    },
    {
      "word": "Yangtze River",
      "difficulty": "easy",
      "description": "Longest river in Asia, flowing through China."
    },
    {
      "word": "Mount Vesuvius",
      "difficulty": "easy",
      "description": "Volcano known for the eruption that destroyed Pompeii."
    },
    {
      "word": "Neuschwanstein Castle",
      "difficulty": "easy",
      "description": "Fairy-tale castle in Bavaria, Germany, built by King Ludwig II."
    },
    {
      "word": "Burj Khalifa",
      "difficulty": "easy",
      "description": "Tallest building in the world, located in Dubai, United Arab Emirates."
    },
    {
      "word": "Volga River",
      "difficulty": "easy",
      "description": "Longest river in Europe, flowing through Russia into the Caspian Sea."
    },
    {
      "word": "Lake Michigan",
      "difficulty": "easy",
      "description": "Large freshwater lake located in the United States, bordered by four states."
    },
    {
      "word": "Ben Nevis",
      "difficulty": "easy",
      "description": "Highest peak in the British Isles, located in Scotland."
    },
    {
      "word": "Mount St. Helens",
      "difficulty": "easy",
      "description": "Volcano in Washington State known for its 1980 eruption."
    },
    {
      "word": "Skellig Michael",
      "difficulty": "easy",
      "description": "Rocky island in Ireland famous for its ancient monastery."
    },
    {
      "word": "Ganges River",
      "difficulty": "easy",
      "description": "Sacred river flowing through India, important to Hinduism."
    },
    {
      "word": "Lake Champlain",
      "difficulty": "easy",
      "description": "Large lake located between the U.S. states of Vermont and New York."
    },
    {
      "word": "Petra",
      "difficulty": "easy",
      "description": "Ancient rock-cut city in Jordan, famous for its archaeological sites."
    },
    {
      "word": "Mount McKinley",
      "difficulty": "easy",
      "description": "Highest mountain peak in North America, located in Alaska."
    },
    {
      "word": "Emerald Isle",
      "difficulty": "easy",
      "description": "Nickname for Ireland, known for its lush green landscape."
    },
    {
      "word": "Isle Royale",
      "difficulty": "easy",
      "description": "Remote island in Lake Superior, part of a national park in Michigan."
    },
    {
      "word": "Denver",
      "difficulty": "easy",
      "description": "Capital city of Colorado, known as the Mile-High City."
    },
    {
      "word": "Mauna Kea",
      "difficulty": "easy",
      "description": "Dormant volcano in Hawaii, tallest mountain in the world when measured from base to summit."
    },
    {
      "word": "Forbidden City",
      "difficulty": "easy",
      "description": "Historic palace complex in Beijing, China, once home to emperors."
    },
    {
      "word": "Thames River",
      "difficulty": "easy",
      "description": "Major river flowing through London, England."
    },
    {
      "word": "Lake Powell",
      "difficulty": "easy",
      "description": "Artificial reservoir on the Colorado River, straddling Utah and Arizona."
    },
    {
      "word": "Atlantis",
      "difficulty": "hard",
      "description": "Legendary lost city described by Plato, said to have sunk into the ocean."
    },
    {
      "word": "Big Ben",
      "difficulty": "easy",
      "description": "Famous clock tower at the north end of the Palace of Westminster in London."
    },
    {
      "word": "Pyramids of Giza",
      "difficulty": "easy",
      "description": "Ancient pyramid structures located in Egypt, built as tombs for pharaohs."
    },
    {
      "word": "Taj Mahal",
      "difficulty": "easy",
      "description": "Iconic white marble mausoleum in Agra, India, built by Mughal Emperor Shah Jahan."
    },
    {
      "word": "Mount Rushmore",
      "difficulty": "easy",
      "description": "Monument in South Dakota featuring the carved faces of four U.S. presidents."
    },
    {
      "word": "Christ the Redeemer",
      "difficulty": "hard",
      "description": "Giant statue of Jesus Christ located in Rio de Janeiro, Brazil."
    },
    {
      "word": "Stonehenge",
      "difficulty": "hard",
      "description": "Prehistoric monument consisting of a ring of standing stones in England."
    },
    {
      "word": "Leaning Tower of Pisa",
      "difficulty": "hard",
      "description": "Famous bell tower in Italy known for its unintended tilt."
    },
    {
      "word": "Angkor Wat",
      "difficulty": "hard",
      "description": "Large temple complex in Cambodia, originally constructed as a Hindu temple."
    },
    {
      "word": "Chichen Itza",
      "difficulty": "hard",
      "description": "Ancient Mayan city located in Mexico, known for its pyramid of Kukulkan."
    },
    {
      "word": "Sagrada Familia",
      "difficulty": "hard",
      "description": "Unfinished basilica designed by Antoni Gaudí in Barcelona, Spain."
    },
    {
      "word": "Alhambra Palace",
      "difficulty": "hard",
      "description": "Palace and fortress complex in Granada, Spain, known for its Moorish architecture."
    },
    {
      "word": "Acropolis",
      "difficulty": "hard",
      "description": "Ancient citadel located on a rocky outcrop above Athens, Greece."
    },
    {
      "word": "Alps",
      "difficulty": "easy",
      "description": "Mountain range in Europe, stretching across eight countries."
    },
    {
      "word": "Australia",
      "difficulty": "easy",
      "description": "Country and continent located in the Southern Hemisphere."
    },
    {
      "word": "Canada",
      "difficulty": "easy",
      "description": "Country in North America, known for its vast wilderness and multicultural cities."
    },
    {
      "word": "Chicago",
      "difficulty": "easy",
      "description": "Major city in Illinois, known for its architecture and deep-dish pizza."
    },
    {
      "word": "Denali",
      "difficulty": "hard",
      "description": "Highest peak in North America, located in Alaska."
    },
    {
      "word": "Dubai",
      "difficulty": "easy",
      "description": "City in the United Arab Emirates known for its modern architecture and luxury."
    },
    {
      "word": "Easter Island",
      "difficulty": "easy",
      "description": "Remote island in the Pacific Ocean known for its large stone statues."
    },
    {
      "word": "England",
      "difficulty": "easy",
      "description": "Country that is part of the United Kingdom, known for its rich history and landmarks."
    },
    {
      "word": "Everest",
      "difficulty": "easy",
      "description": "Common name for Mount, the highest peak in the world."
    },
    {
      "word": "Everest Base Camp",
      "difficulty": "hard",
      "description": "Base camp located at the foot of Mount Everest, starting point for climbers."
    },
    {
      "word": "France",
      "difficulty": "easy",
      "description": "Country in Western Europe, known for its cuisine, art, and landmarks like the Eiffel Tower."
    },
    {
      "word": "Galápagos Islands",
      "difficulty": "hard",
      "description": "Archipelago in the Pacific Ocean known for its unique wildlife and biodiversity."
    },
    {
      "word": "Giza Pyramids",
      "difficulty": "easy",
      "description": "Ancient pyramid structures located in Egypt, built as tombs for pharaohs."
    },
    {
      "word": "India",
      "difficulty": "easy",
      "description": "Country in South Asia known for its diverse culture and historical landmarks."
    },
    {
      "word": "Italy",
      "difficulty": "easy",
      "description": "Country in Southern Europe known for its historical sites, cuisine, and art."
    },
    {
      "word": "Lake Erie",
      "difficulty": "hard",
      "description": "One of the Great Lakes in North America, bordered by four states and one province."
    },
    {
      "word": "Lake Huron",
      "difficulty": "easy",
      "description": "One of the Great Lakes, located between the United States and Canada."
    },
    {
      "word": "London",
      "difficulty": "easy",
      "description": "Capital city of the United Kingdom, known for its historical and cultural landmarks."
    },
    {
      "word": "Los Angeles",
      "difficulty": "easy",
      "description": "Major city in California, known for its entertainment industry and beaches."
    },
    {
      "word": "Louvre Museum",
      "difficulty": "hard",
      "description": "World-famous museum in Paris, France, known for housing the Mona Lisa."
    },
    {
      "word": "Mesa Verde",
      "difficulty": "hard",
      "description": "National Park in Colorado known for its well-preserved Ancestral Puebloan cliff dwellings."
    },
    {
      "word": "Miami",
      "difficulty": "easy",
      "description": "City in Florida known for its vibrant culture, nightlife, and beaches."
    },
    {
      "word": "Missouri River",
      "difficulty": "hard",
      "description": "Longest river in North America, flowing through the central United States."
    },
    {
      "word": "Moai Statues",
      "difficulty": "hard",
      "description": "Large stone statues located on Easter Island, created by the Rapa Nui people."
    },
    {
      "word": "North America",
      "difficulty": "easy",
      "description": "Continent comprising the northern part of the Western Hemisphere."
    },
    {
      "word": "Okavango Delta",
      "difficulty": "hard",
      "description": "Seasonal floodplain in Botswana known for its rich wildlife and ecosystems."
    },
    {
      "word": "Parthenon",
      "difficulty": "hard",
      "description": "Ancient temple on the Acropolis of Athens, dedicated to the goddess Athena."
    },
    {
      "word": "Russia",
      "difficulty": "easy",
      "description": "Largest country in the world, located in both Europe and Asia."
    },
    {
      "word": "San Francisco",
      "difficulty": "easy",
      "description": "City in California known for its iconic Golden Gate Bridge and cultural landmarks."
    },
    {
      "word": "Seattle",
      "difficulty": "hard",
      "description": "City in Washington State known for its Space Needle and tech industry."
    },
    {
      "word": "Seine River",
      "difficulty": "easy",
      "description": "Major river flowing through Paris, France, known for its scenic beauty."
    },
    {
      "word": "Sequoia National Park",
      "difficulty": "hard",
      "description": "National park in California, USA, famous for its giant sequoia trees."
    },
    {
      "word": "South America",
      "difficulty": "easy",
      "description": "Continent located in the Western Hemisphere, known for its diverse cultures and landscapes."
    },
    {
      "word": "Spain",
      "difficulty": "easy",
      "description": "Country in Southwestern Europe known for its rich history, diverse regions, and cuisine."
    },
    {
      "word": "Tokyo",
      "difficulty": "easy",
      "description": "Capital city of Japan, known for its bustling urban life and cultural landmarks."
    },
    {
      "word": "Tower Bridge",
      "difficulty": "easy",
      "description": "Iconic suspension bridge in London, England, with a distinctive twin-tower design."
    },
    {
      "word": "Vatican City",
      "difficulty": "hard",
      "description": "Independent city-state enclaved within Rome, Italy, home to the Pope and numerous historical sites."
    },
    {
      "word": "Yukon River",
      "difficulty": "hard",
      "description": "Major river in North America, flowing through Canada and Alaska, known for its rugged wilderness."
    },
    {
      "word": "Amsterdam",
      "difficulty": "easy",
      "description": "Capital city of the Netherlands, known for its canals, museums, and vibrant culture."
    },
    {
      "word": "Athens",
      "difficulty": "easy",
      "description": "Capital city of Greece, famous for its ancient historical sites and contributions to Western civilization."
    },
    {
      "word": "Barcelona",
      "difficulty": "easy",
      "description": "City in Spain known for its unique architecture by Antoni Gaudí and vibrant cultural scene."
    },
    {
      "word": "Berlin",
      "difficulty": "easy",
      "description": "Capital city of Germany, known for its history, cultural institutions, and modern attractions."
    },
    {
      "word": "Cairo",
      "difficulty": "easy",
      "description": "Capital city of Egypt, famous for its historical landmarks such as the Pyramids of Giza."
    },
    {
      "word": "Dubai Marina",
      "difficulty": "easy",
      "description": "Artificial canal city in Dubai, known for its modern skyscrapers and luxury lifestyle."
    },
    {
      "word": "Grand Canyon National Park",
      "difficulty": "hard",
      "description": "National park in Arizona, USA, known for its stunning canyon views and geological formations."
    },
    {
      "word": "Grand Canyon Skywalk",
      "difficulty": "hard",
      "description": "Glass bridge extending over the Grand Canyon, offering panoramic views of the canyon below."
    },
    {
      "word": "Great Lakes",
      "difficulty": "easy",
      "description": "Group of five large lakes in North America, including Superior, Michigan, Huron, Erie, and Ontario."
    },
    {
      "word": "Great Smoky Mountains",
      "difficulty": "hard",
      "description": "Mountain range on the border between North Carolina and Tennessee, known for its misty, forested landscapes."
    },
    {
      "word": "Hollywood Walk of Fame",
      "difficulty": "hard",
      "description": "Sidewalk in Hollywood, Los Angeles, featuring stars embedded with the names of notable celebrities."
    },
    {
      "word": "Iguazu Falls",
      "difficulty": "hard",
      "description": "Large and impressive waterfall system on the border between Argentina and Brazil."
    },
    {
      "word": "Kyoto",
      "difficulty": "hard",
      "description": "City in Japan known for its traditional wooden houses, temples, and historic gardens."
    },
    {
      "word": "Las Vegas Strip",
      "difficulty": "hard",
      "description": "Famous stretch of Las Vegas Boulevard known for its casinos, entertainment, and nightlife."
    },
    {
      "word": "New Orleans",
      "difficulty": "easy",
      "description": "City in Louisiana, USA, known for its vibrant music scene, Creole cuisine, and annual Mardi Gras celebration."
    },
    {
      "word": "Rio de Janeiro",
      "difficulty": "easy",
      "description": "Major city in Brazil known for its beaches, Carnival festival, and the Christ the Redeemer statue."
    },
    {
      "word": "Rome",
      "difficulty": "easy",
      "description": "Capital city of Italy, famous for its ancient ruins, including the Colosseum and the Roman Forum."
    },
    {
      "word": "Santorini",
      "difficulty": "hard",
      "description": "Greek island in the Aegean Sea known for its white-washed buildings and stunning sunsets."
    },
    {
      "word": "Serengeti National Park",
      "difficulty": "hard",
      "description": "National park in Tanzania known for its vast savannas and annual migration of wildebeest and other wildlife."
    },
    {
      "word": "Sydney",
      "difficulty": "easy",
      "description": "City in Australia known for its iconic Opera House and Harbour Bridge."
    },
    {
      "word": "The Acropolis of Athens",
      "difficulty": "hard",
      "description": "Ancient citadel in Athens, Greece, featuring the Parthenon and other historic temples."
    },
    {
      "word": "The Amazon Rainforest",
      "difficulty": "easy",
      "description": "Large tropical rainforest spanning several South American countries, known for its biodiversity."
    },
    {
      "word": "The Arctic Circle",
      "difficulty": "hard",
      "description": "Latitude circle around the Earth, marking the boundary of the polar region in the Northern Hemisphere."
    },
    {
      "word": "The Colosseum",
      "difficulty": "easy",
      "description": "Ancient amphitheater in Rome, Italy, known for its gladiatorial contests and historic architecture."
    },
    {
      "word": "The Eiffel Tower",
      "difficulty": "easy",
      "description": "Iron lattice tower in Paris, France, one of the most recognizable landmarks in the world."
    },
    {
      "word": "The Galapagos Islands",
      "difficulty": "hard",
      "description": "Archipelago in the Pacific Ocean, known for its unique wildlife and Charles Darwin's research."
    },
    {
      "word": "The Grand Canyon",
      "difficulty": "easy",
      "description": "Massive canyon in Arizona, USA, carved by the Colorado River, known for its breathtaking views."
    },
    {
      "word": "The Great Barrier Reef",
      "difficulty": "easy",
      "description": "Largest coral reef system in the world, located off the coast of Queensland, Australia."
    },
    {
      "word": "The Himalayas",
      "difficulty": "easy",
      "description": "Mountain range in Asia, home to the world's highest peaks including Mount Everest."
    },
    {
      "word": "The Inca Trail",
      "difficulty": "hard",
      "description": "Historic trail in Peru leading to the ancient city of Machu Picchu, known for its archaeological significance."
    },
    {
      "word": "The Nile River",
      "difficulty": "easy",
      "description": "Longest river in Africa, flowing through northeastern Africa into the Mediterranean Sea."
    },
    {
      "word": "The Pacific Ocean",
      "difficulty": "easy",
      "description": "Largest and deepest ocean, stretching between Asia/Australia and the Americas."
    },
    {
      "word": "The Pyramids of Giza",
      "difficulty": "easy",
      "description": "Ancient pyramids in Egypt, built as tombs for pharaohs and one of the Seven Wonders of the Ancient World."
    },
    {
      "word": "The Sahara Desert",
      "difficulty": "easy",
      "description": "Largest hot desert in the world, located in North Africa."
    },
    {
      "word": "The Sydney Opera House",
      "difficulty": "hard",
      "description": "Iconic performing arts center in Sydney, Australia, known for its distinctive sail-like design."
    },
    {
      "word": "Times Square",
      "difficulty": "easy",
      "description": "Major commercial and entertainment hub in New York City, known for its bright lights and billboards."
    },
    {
      "word": "Tokyo Tower",
      "difficulty": "hard",
      "description": "Iconic communications and observation tower in Tokyo, Japan, modeled after the Eiffel Tower."
    },
    {
      "word": "Venice",
      "difficulty": "easy",
      "description": "City in Italy known for its canals, historic architecture, and gondola rides."
    },
    {
      "word": "Victoria Harbour",
      "difficulty": "hard",
      "description": "Natural harbor located in Hong Kong, famous for its skyline and nighttime light displays."
    },
    {
      "word": "Victoria Peak",
      "difficulty": "hard",
      "description": "Mountain in Hong Kong offering panoramic views of the city and harbor."
    },
    {
      "word": "Yellowstone National Park",
      "difficulty": "hard",
      "description": "First national park in the world, located in the U.S. states of Wyoming, Montana, and Idaho, known for its geothermal features."
    },
    {
      "word": "The United Nations",
      "difficulty": "hard",
      "description": "International organization headquartered in New York City, promoting global peace and cooperation."
    },
    {
      "word": "The European Union",
      "difficulty": "hard",
      "description": "Political and economic union of European countries, aiming for regional integration and cooperation."
    },
    {
      "word": "Universal Studios",
      "difficulty": "hard",
      "description": "Theme park and entertainment company known for its film-themed attractions and rides."
    },
    {
      "word": "Legoland",
      "difficulty": "hard",
      "description": "Theme park featuring attractions based on the popular LEGO toy bricks."
    },
    {
      "word": "SeaWorld",
      "difficulty": "hard",
      "description": "Theme park and marine zoological park with attractions related to sea life and aquatic shows."
    },
    {
      "word": "Epcot",
      "difficulty": "hard",
      "description": "Theme park in Walt Disney World Resort focused on technology, innovation, and world cultures."
    },
    {
      "word": "Magic Kingdom",
      "difficulty": "hard",
      "description": "Theme park in Walt Disney World Resort featuring classic Disney characters and attractions."
    },
    {
      "word": "Table Mountain",
      "difficulty": "easy",
      "description": "Iconic flat-topped cliff in Cape Town."
    },
    {
      "word": "Robben Island",
      "difficulty": "easy",
      "description": "land area where Nelson Mandela was imprisoned."
    },
    {
      "word": "V&A Waterfront",
      "difficulty": "hard",
      "description": "Popular shopping and entertainment area in Cape Town."
    },
    {
      "word": "Soweto",
      "difficulty": "easy",
      "description": "Famous township near Johannesburg."
    },
    {
      "word": "Sun City",
      "difficulty": "easy",
      "description": "Famous resort and casino near Rustenburg."
    },
    {
      "word": "Addo Elephant National Park",
      "difficulty": "hard",
      "description": "Park in SA, famous for its large elephant population."
    },
    {
      "word": "Blyde River Canyon",
      "difficulty": "hard",
      "description": "One of the largest canyons on Earth, located in Mpumalanga."
    },
    {
      "word": "Tsitsikamma National Park",
      "difficulty": "hard",
      "description": "Coastal reserve on the garden route known for its dramatic scenery."
    },
    {
      "word": "Kirstenbosch Botanical Gardens",
      "difficulty": "hard",
      "description": "Famous nature reserve in Cape Town."
    },
    {
      "word": "St. Lucia Estuary",
      "difficulty": "hard",
      "description": "Place that is home to a large population of hippos and crocodiles in KZN, SA."
    },
    {
      "word": "Kruger National Park",
      "difficulty": "easy",
      "description": "One of Africa's largest game reserves."
    },
    {
      "word": "Drakensberg Mountains",
      "difficulty": "easy",
      "description": "Majestic mountain range in South Africa."
    },
    {
      "word": "Hermanus",
      "difficulty": "easy",
      "description": "Town known for its whale watching."
    },
    {
      "word": "District Six",
      "difficulty": "hard",
      "description": "Former inner-city residential area in Cape Town known for its diverse communities."
    },
    {
      "word": "Kgalagadi Transfrontier Park",
      "difficulty": "hard",
      "description": "Large wildlife preserve spanning South Africa and Botswana."
    },
    {
      "word": "Sani Pass",
      "difficulty": "hard",
      "description": "Mountain pass connecting South Africa to Lesotho."
    },
    {
      "word": "Parys",
      "difficulty": "hard",
      "description": "Small town known for its charming atmosphere."
    },
    {
      "word": "Boulders Beach",
      "difficulty": "easy",
      "description": "Famous for its colony of African penguins."
    },
    {
      "word": "Cape Point",
      "difficulty": "easy",
      "description": "Scenic nature reserve near Cape Town."
    },
    {
      "word": "Garden Route",
      "difficulty": "easy",
      "description": "Popular scenic drive along the coast."
    },
    {
      "word": "Hluhluwe-Imfolozi Park",
      "difficulty": "easy",
      "description": "Oldest proclaimed nature reserve in Africa."
    },
    {
      "word": "Union Buildings",
      "difficulty": "easy",
      "description": "Official seat of the South African government in Pretoria."
    },
    {
      "word": "Freedom Park",
      "difficulty": "easy",
      "description": "Heritage site and memorial in Pretoria."
    }
  ],
  "Science & Technology": [
    {
      "word": "DNA",
      "difficulty": "easy",
      "description": "Molecule containing the genetic instructions for the development and functioning of all living organisms."
    },
    {
      "word": "Quantum Mechanics",
      "difficulty": "easy",
      "description": "Branch of physics dealing with phenomena on very small scales, such as atoms and subatomic particles."
    },
    {
      "word": "Space Exploration",
      "difficulty": "easy",
      "description": "Investigation and discovery of celestial structures beyond Earth's atmosphere using space technology."
    },
    {
      "word": "Solar System",
      "difficulty": "easy",
      "description": "Collection of planets, moons, and other celestial bodies orbiting the Sun."
    },
    {
      "word": "Genetics",
      "difficulty": "easy",
      "description": "Study of heredity and the variation of inherited characteristics."
    },
    {
      "word": "Internet of Things (IoT)",
      "difficulty": "easy",
      "description": "Network of interconnected devices and systems that communicate and exchange data."
    },
    {
      "word": "Climate Change",
      "difficulty": "easy",
      "description": "Long-term alteration in Earth's climate, primarily due to human activities like burning fossil fuels."
    },
    {
      "word": "Nanotechnology",
      "difficulty": "hard",
      "description": "Manipulation of matter on an atomic or molecular scale to create materials with new properties."
    },
    {
      "word": "Robotics",
      "difficulty": "easy",
      "description": "Field of engineering focused on the design and creation of robots for various applications."
    },
    {
      "word": "Blockchain",
      "difficulty": "hard",
      "description": "Digital ledger technology enabling secure, transparent, and decentralized record-keeping."
    },
    {
      "word": "Virtual Reality",
      "difficulty": "easy",
      "description": "Computer-generated environment that simulates a user's physical presence in a virtual space."
    },
    {
      "word": "Cybersecurity",
      "difficulty": "easy",
      "description": "Protection of computer systems and networks from digital attacks, theft, or damage."
    },
    {
      "word": "Biotechnology",
      "difficulty": "hard",
      "description": "Use of living organisms or biological systems to develop or create products and technologies."
    },
    {
      "word": "Electric Vehicles",
      "difficulty": "easy",
      "description": "Vehicles powered by electric motors rather than internal combustion engines."
    },
    {
      "word": "Machine Learning",
      "difficulty": "easy",
      "description": "Subfield of artificial intelligence where algorithms improve through experience and data analysis."
    },
    {
      "word": "3D Printing",
      "difficulty": "easy",
      "description": "Process of creating three-dimensional objects from digital models by layering materials."
    },
    {
      "word": "Renewable Energy",
      "difficulty": "easy",
      "description": "Energy from sources that are naturally replenished, such as solar, wind, and hydropower."
    },
    {
      "word": "CRISPR",
      "difficulty": "hard",
      "description": "Gene-editing technology that allows precise modification of DNA in living organisms."
    },
    {
      "word": "Drones",
      "difficulty": "easy",
      "description": "Unmanned aerial vehicles used for various purposes, including surveillance and delivery."
    },
    {
      "word": "Augmented Reality",
      "difficulty": "easy",
      "description": "Technology that overlays digital information on the real world through devices like smartphones or AR glasses."
    },
    {
      "word": "Quantum Computing",
      "difficulty": "hard",
      "description": "Computing technology utilizing quantum-mechanical phenomena to perform complex calculations."
    },
    {
      "word": "Cloud Computing",
      "difficulty": "easy",
      "description": "Delivery of computing services over the internet, including storage, processing, and software applications."
    },
    {
      "word": "Medical Imaging",
      "difficulty": "hard",
      "description": "Techniques used to create visual representations of the interior of a body for clinical analysis."
    },
    {
      "word": "Artificial Neural Networks",
      "difficulty": "hard",
      "description": "Computational models inspired by the human brain, used to recognize patterns and solve complex problems."
    },
    {
      "word": "Fusion Energy",
      "difficulty": "hard",
      "description": "Energy produced by fusing atomic nuclei, potentially providing a nearly limitless and clean energy source."
    },
    {
      "word": "Smartphones",
      "difficulty": "easy",
      "description": "Mobile devices combining phone functionality with computing capabilities and internet access."
    },
    {
      "word": "Space Telescope",
      "difficulty": "easy",
      "description": "Observatory located in space to observe celestial objects without Earth's atmospheric interference."
    },
    {
      "word": "The Human Genome Project",
      "difficulty": "hard",
      "description": "International research initiative to map and understand all the genes in the human genome."
    },
    {
      "word": "Wireless Technology",
      "difficulty": "easy",
      "description": "Communication technology that transmits data without physical connections, such as Wi-Fi and Bluetooth."
    },
    {
      "word": "Internet",
      "difficulty": "easy",
      "description": "Global network connecting millions of private, public, academic, business, and government networks."
    },
    {
      "word": "Satellite Technology",
      "difficulty": "easy",
      "description": "Use of artificial satellites for communication, navigation, weather monitoring, and other applications."
    },
    {
      "word": "Bioinformatics",
      "difficulty": "hard",
      "description": "Application of computer technology to manage and analyze biological data, such as genetic sequences."
    },
    {
      "word": "Renewable Resources",
      "difficulty": "easy",
      "description": "Natural resources that can be replenished naturally, such as wind, solar, and biomass."
    },
    {
      "word": "Geothermal Energy",
      "difficulty": "hard",
      "description": "Energy derived from the heat stored beneath the Earth's surface, used for electricity and heating."
    },
    {
      "word": "Prosthetics",
      "difficulty": "hard",
      "description": "Artificial devices that replace lost or damaged body parts, such as limbs or joints."
    },
    {
      "word": "Space Junk",
      "difficulty": "easy",
      "description": "Debris from satellites, rockets, and other space missions orbiting Earth, posing risks to space operations."
    },
    {
      "word": "Telecommunications",
      "difficulty": "easy",
      "description": "Transmission of information over distances using various technologies, including phones, internet, and radio."
    },
    {
      "word": "Astronomy",
      "difficulty": "easy",
      "description": "Scientific study of celestial bodies, including stars, planets, comets, and galaxies."
    },
    {
      "word": "Hydroponics",
      "difficulty": "hard",
      "description": "Method of growing plants without soil, using a nutrient-rich water solution instead."
    },
    {
      "word": "Data Science",
      "difficulty": "easy",
      "description": "Field combining statistical analysis, machine learning, and data visualization to extract insights from data."
    },
    {
      "word": "Nuclear Fusion",
      "difficulty": "hard",
      "description": "Process of combining atomic nuclei to release energy, potentially providing a powerful and clean energy source."
    },
    {
      "word": "Cyborgs",
      "difficulty": "hard",
      "description": "Organisms with both biological and artificial components, enhancing or replacing natural functions with technology."
    },
    {
      "word": "Neuroscience",
      "difficulty": "hard",
      "description": "Scientific study of the nervous system and its impact on behavior, cognition, and bodily functions."
    },
    {
      "word": "3D Modeling",
      "difficulty": "easy",
      "description": "Creation of three-dimensional representations of objects using specialized software."
    },
    {
      "word": "Internet Privacy",
      "difficulty": "easy",
      "description": "Protection of personal information and data from unauthorized access and misuse online."
    },
    {
      "word": "Space Tourism",
      "difficulty": "easy",
      "description": "Commercial activity involving travel to space for recreational purposes."
    },
    {
      "word": "Medical Robotics",
      "difficulty": "hard",
      "description": "Use of robotic systems in medical procedures to enhance precision and minimize invasiveness."
    },
    {
      "word": "Gravity",
      "difficulty": "easy",
      "description": "Force that attracts objects with mass towards each other, responsible for keeping planets in orbit."
    },
    {
      "word": "Relativity",
      "difficulty": "hard",
      "description": "Theory proposed by Albert Einstein describing the relationship between space, time, and gravity."
    },
    {
      "word": "Evolution",
      "difficulty": "hard",
      "description": "Biological process through which species undergo changes over time due to natural selection and genetic variation."
    },
    {
      "word": "String Theory",
      "difficulty": "hard",
      "description": "Theoretical framework proposing that fundamental particles are one-dimensional strings rather than point-like objects."
    },
    {
      "word": "Hubble Space Telescope",
      "difficulty": "hard",
      "description": "Space telescope providing detailed images of distant galaxies and cosmic phenomena."
    },
    {
      "word": "Smartphone",
      "difficulty": "easy",
      "description": "Mobile device combining phone functionality with computing capabilities and internet access."
    },
    {
      "word": "Artificial Intelligence",
      "difficulty": "easy",
      "description": "Field of computer science focused on creating systems that can perform tasks requiring human intelligence."
    },
    {
      "word": "Virtual Reality Headset",
      "difficulty": "hard",
      "description": "Device worn on the head that provides immersive virtual experiences by blocking out the real world."
    },
    {
      "word": "Laptop",
      "difficulty": "easy",
      "description": "Portable computer with an integrated screen, keyboard, and battery."
    },
    {
      "word": "Wi-Fi",
      "difficulty": "easy",
      "description": "Wireless technology allowing devices to connect to the internet and communicate over short distances."
    },
    {
      "word": "Bluetooth",
      "difficulty": "easy",
      "description": "Wireless technology used for short-range communication between devices."
    },
    {
      "word": "Tablet",
      "difficulty": "easy",
      "description": "Portable touchscreen device used for computing, media consumption, and internet access."
    },
    {
      "word": "Smartwatch",
      "difficulty": "easy",
      "description": "Wearable device that functions as a watch and provides notifications, fitness tracking, and other features."
    },
    {
      "word": "Drone",
      "difficulty": "easy",
      "description": "Unmanned aerial vehicle used for various purposes, including surveillance and delivery."
    },
    {
      "word": "Internet of Things",
      "difficulty": "hard",
      "description": "Network of interconnected devices embedded with sensors and software to collect and exchange data."
    },
    {
      "word": "Neural Networks",
      "difficulty": "hard",
      "description": "Computational models inspired by the human brain, used to recognize patterns and make decisions based on data."
    },
    {
      "word": "Autonomous Vehicles",
      "difficulty": "hard",
      "description": "Self-driving cars that use sensors, cameras, and artificial intelligence to navigate and operate without human intervention."
    },
    {
      "word": "Cryptocurrency",
      "difficulty": "hard",
      "description": "Digital or virtual currency that uses cryptography for security and operates independently of a central authority."
    },
    {
      "word": "5G Network",
      "difficulty": "easy",
      "description": "Fifth-generation mobile network technology providing faster data speeds, lower latency, and greater connectivity compared to previous generations."
    },
    {
      "word": "Big Bang Theory",
      "difficulty": "easy",
      "description": "Scientific theory explaining the origin of the universe as a rapid expansion from a singularity approximately 13.8 billion years ago."
    },
    {
      "word": "Biometric Authentication",
      "difficulty": "hard",
      "description": "Security process that uses unique biological traits, such as fingerprints or facial recognition, to verify a person's identity."
    },
    {
      "word": "CERN",
      "difficulty": "easy",
      "description": "European Organization for Nuclear Research, known for its Large Hadron Collider and research in particle physics."
    },
    {
      "word": "Fibonacci Sequence",
      "difficulty": "hard",
      "description": "Sequence of numbers where each number is the sum of the two preceding ones, often found in nature and mathematics."
    },
    {
      "word": "Galileo Galilei",
      "difficulty": "easy",
      "description": "Italian astronomer and physicist who made pioneering observations of celestial objects and supported the heliocentric model of the solar system."
    },
    {
      "word": "Guglielmo Marconi",
      "difficulty": "hard",
      "description": "Italian inventor known for his work on long-distance radio transmission and development of wireless telegraphy."
    },
    {
      "word": "Manhattan Project",
      "difficulty": "hard",
      "description": "U.S. research and development project during World War II that produced the first nuclear weapons."
    },
    {
      "word": "Natural Selection",
      "difficulty": "hard",
      "description": "Evolutionary process where organisms better adapted to their environment tend to survive and reproduce more successfully."
    },
    {
      "word": "Neptune",
      "difficulty": "easy",
      "description": "Eighth planet from the Sun, known for its deep blue color and strong winds."
    },
    {
      "word": "Nikola Tesla",
      "difficulty": "easy",
      "description": "Inventor and electrical engineer known for his contributions to alternating current (AC) electrical systems and numerous other innovations."
    },
    {
      "word": "Smart Home Devices",
      "difficulty": "hard",
      "description": "Electronics that connect to the internet and can be controlled remotely, such as smart thermostats, lights, and security systems."
    },
    {
      "word": "Sociology",
      "difficulty": "hard",
      "description": "Study of society, social relationships, and institutions, and how they influence individual and group behavior."
    },
    {
      "word": "Wearable Technology",
      "difficulty": "hard",
      "description": "Devices worn on the body that track health metrics or provide notifications, such as smartwatches and fitness trackers."
    },
    {
      "word": "Apollo 11",
      "difficulty": "easy",
      "description": "NASA mission that landed the first humans on the Moon in 1969, with astronauts Neil Armstrong and Buzz Aldrin."
    },
    {
      "word": "Nobel Prize",
      "difficulty": "easy",
      "description": "Prestigious international awards given annually in several categories, including Physics, Chemistry, Medicine, Literature, and Peace."
    },
    {
      "word": "Apple",
      "difficulty": "easy",
      "description": "Technology company known for its consumer electronics, including iPhones, iPads, and Mac computers."
    },
    {
      "word": "Samsung",
      "difficulty": "easy",
      "description": "South Korean multinational electronics company known for its smartphones, TVs, and other consumer electronics."
    },
    {
      "word": "Google",
      "difficulty": "easy",
      "description": "Technology company known for its search engine, as well as products like Android, YouTube, and Cloud."
    },
    {
      "word": "Microsoft",
      "difficulty": "easy",
      "description": "Technology company known for its software products, including the Windows operating system and Office suite."
    },
    {
      "word": "Amazon",
      "difficulty": "easy",
      "description": "E-commerce and cloud computing company known for its online retail platform and Web Services (AWS)."
    },
    {
      "word": "Vodacom",
      "difficulty": "easy",
      "description": "Major telecommunications company with a red colour."
    },
    {
      "word": "Cell C",
      "difficulty": "easy",
      "description": "South African mobile network operator, that is being acquired."
    },
    {
      "word": "Telkom",
      "difficulty": "easy",
      "description": "SA Telecommunications company providing mobile, fixed line, and internet services."
    },
    {
      "word": "MTN",
      "difficulty": "easy",
      "description": "Telecommunications provider that is known for its yellow colour and slogan 'Everywhere you go'."
    },
    {
      "word": "Eskom",
      "difficulty": "easy",
      "description": "South Africa's primary electricity supplier."
    },
    {
      "word": "Sasol",
      "difficulty": "easy",
      "description": "Leading integrated fuel, energy and chemical company."
    }
  ],
  "Literature": [
    {
      "word": "Romeo and Juliet",
      "difficulty": "easy",
      "description": "A tragic play by William Shakespeare about two young lovers whose deaths ultimately reconcile their feuding families."
    },
    {
      "word": "To Kill a Mockingbird",
      "difficulty": "easy",
      "description": "A novel by Harper Lee that addresses serious issues like racial injustice and moral growth through the eyes of a young girl."
    },
    {
      "word": "Harry Potter",
      "difficulty": "easy",
      "description": "A fantasy book series by J.K. Rowling about a young wizard and his friends as they battle the dark wizard Voldemort."
    },
    {
      "word": "The Great Gatsby",
      "difficulty": "easy",
      "description": "A novel by F. Scott Fitzgerald set in the Roaring Twenties, exploring themes of wealth, love, and the American Dream."
    },
    {
      "word": "Moby Dick",
      "difficulty": "easy",
      "description": "A novel by Herman Melville that follows Captain Ahab's obsessive quest to hunt the elusive white whale,."
    },
    {
      "word": "1984",
      "difficulty": "easy",
      "description": "A dystopian novel by George Orwell depicting a totalitarian regime led by Big Brother, focusing on themes of surveillance and individuality."
    },
    {
      "word": "Pride and Prejudice",
      "difficulty": "easy",
      "description": "A novel by Jane Austen that explores themes of love, class, and social expectations through the lives of the Bennet family."
    },
    {
      "word": "The Lord of the Rings",
      "difficulty": "easy",
      "description": "A fantasy epic by J.R.R. Tolkien about the quest to destroy a powerful ring and defeat the dark lord Sauron."
    },
    {
      "word": "Hamlet",
      "difficulty": "easy",
      "description": "A tragedy by William Shakespeare about Prince 's quest for revenge against his uncle, who has murdered 's father."
    },
    {
      "word": "The Catcher in the Rye",
      "difficulty": "easy",
      "description": "A novel by J.D. Salinger about a teenager named Holden Caulfield who struggles with alienation and the loss of innocence."
    },
    {
      "word": "War and Peace",
      "difficulty": "hard",
      "description": "A historical novel by Leo Tolstoy that interweaves the lives of several aristocratic families against the backdrop of the Napoleonic Wars."
    },
    {
      "word": "Jane Eyre",
      "difficulty": "easy",
      "description": "A novel by Charlotte Brontë about an orphaned girl who overcomes hardships to find love and independence."
    },
    {
      "word": "Frankenstein",
      "difficulty": "easy",
      "description": "A novel by Mary Shelley about a scientist who creates a sentient creature through unorthodox scientific experiments."
    },
    {
      "word": "The Odyssey",
      "difficulty": "easy",
      "description": "An epic poem attributed to Homer, detailing the adventures of Odysseus as he attempts to return home after the Trojan War."
    },
    {
      "word": "Brave New World",
      "difficulty": "easy",
      "description": "A dystopian novel by Aldous Huxley set in a future society driven by technological advances and superficial happiness."
    },
    {
      "word": "Alice's Adventures in Wonderland",
      "difficulty": "easy",
      "description": "A whimsical novel by Lewis Carroll following Alice's adventures in a fantastical world filled with peculiar characters."
    },
    {
      "word": "Dracula",
      "difficulty": "easy",
      "description": "A Gothic horror novel by Bram Stoker about Count 's attempt to move from Transylvania to England in order to spread the undead curse."
    },
    {
      "word": "The Adventures of Huckleberry Finn",
      "difficulty": "easy",
      "description": "A novel by Mark Twain about a young boy's journey down the Mississippi River and his adventures with a runaway slave, Jim."
    },
    {
      "word": "Les Misérables",
      "difficulty": "hard",
      "description": "A novel by Victor Hugo that explores themes of justice, love, and redemption through the lives of various characters in post-revolutionary France."
    },
    {
      "word": "The Iliad",
      "difficulty": "easy",
      "description": "An ancient Greek epic poem attributed to Homer, focusing on the events of the Trojan War and the Greek hero Achilles."
    },
    {
      "word": "The Count of Monte Cristo",
      "difficulty": "easy",
      "description": "A novel by Alexandre Dumas about a man who seeks revenge after being wrongfully imprisoned and discovers a hidden fortune."
    },
    {
      "word": "Don Quixote",
      "difficulty": "hard",
      "description": "A novel by Miguel de Cervantes about a man who, inspired by chivalric romances, becomes a self-styled knight and sets out on a series of misguided adventures."
    },
    {
      "word": "The Hobbit",
      "difficulty": "easy",
      "description": "A fantasy novel by J.R.R. Tolkien about Bilbo Baggins' unexpected adventure with dwarves to reclaim their homeland from a dragon."
    },
    {
      "word": "Gulliver's Travels",
      "difficulty": "easy",
      "description": "A satirical novel by Jonathan Swift detailing Lemuel to fantastical lands, including Lilliput and Brobdingnag."
    },
    {
      "word": "Anna Karenina",
      "difficulty": "hard",
      "description": "A novel by Leo Tolstoy about a woman who struggles with her own desires and societal expectations, leading to tragic consequences."
    },
    {
      "word": "The Picture of Dorian Gray",
      "difficulty": "easy",
      "description": "A novel by Oscar Wilde about a young man who remains eternally youthful while a portrait of him ages and reflects his moral corruption."
    },
    {
      "word": "Wuthering Heights",
      "difficulty": "easy",
      "description": "A novel by Emily Brontë about the tumultuous relationship between Heathcliff and Catherine Earnshaw, set on the Yorkshire moors."
    },
    {
      "word": "The Canterbury Tales",
      "difficulty": "hard",
      "description": "A collection of stories by Geoffrey Chaucer told by a group of pilgrims on their way to Canterbury, exploring various aspects of medieval society."
    },
    {
      "word": "The Brothers Karamazov",
      "difficulty": "hard",
      "description": "A novel by Fyodor Dostoevsky that delves into complex themes of faith, morality, and family dynamics through the lives of the Karamazov brothers."
    },
    {
      "word": "One Hundred Years of Solitude",
      "difficulty": "hard",
      "description": "A novel by Gabriel García Márquez chronicling the Buendía family's multi-generational story in the fictional town of Macondo."
    },
    {
      "word": "The Divine Comedy",
      "difficulty": "hard",
      "description": "An epic poem by Dante Alighieri depicting the author's journey through Hell, Purgatory, and Heaven."
    },
    {
      "word": "The Sun Also Rises",
      "difficulty": "easy",
      "description": "A novel by Ernest Hemingway about a group of expatriates traveling from Paris to Spain, exploring themes of disillusionment and the Lost Generation."
    },
    {
      "word": "The Handmaid's Tale",
      "difficulty": "easy",
      "description": "A dystopian novel by Margaret Atwood set in a totalitarian society where women are subjugated and used for reproductive purposes."
    },
    {
      "word": "The Jungle Book",
      "difficulty": "easy",
      "description": "A collection of stories by Rudyard Kipling featuring Mowgli, a boy raised by wolves, and his adventures in the jungle with various animal characters."
    },
    {
      "word": "Fahrenheit 451",
      "difficulty": "easy",
      "description": "A dystopian novel by Ray Bradbury about a future society where books are banned and 'firemen' burn any that are found."
    },
    {
      "word": "The Wind in the Willows",
      "difficulty": "easy",
      "description": "A novel by Kenneth Grahame about the adventures of Mole, Rat, Badger, and Toad in the English countryside."
    },
    {
      "word": "Crime and Punishment",
      "difficulty": "hard",
      "description": "A novel by Fyodor Dostoevsky about a young man who commits a murder and wrestles with his conscience and guilt."
    },
    {
      "word": "Great Expectations",
      "difficulty": "easy",
      "description": "A novel by Charles Dickens about the growth and personal development of an orphan named Pip, who experiences the highs and lows of life."
    },
    {
      "word": "The Grapes of Wrath",
      "difficulty": "easy",
      "description": "A novel by John Steinbeck about the Joad family's journey from Oklahoma to California during the Great Depression in search of a better life."
    },
    {
      "word": "Gone with the Wind",
      "difficulty": "easy",
      "description": "A novel by Margaret Mitchell set during the American Civil War and Reconstruction era, following the life of Scarlett O'Hara."
    },
    {
      "word": "The Sound and the Fury",
      "difficulty": "hard",
      "description": "A novel by William Faulkner that portrays the decline of the Compson family through the perspectives of various family members."
    },
    {
      "word": "Catch-22",
      "difficulty": "easy",
      "description": "A satirical novel by Joseph Heller about World War II pilots facing contradictory regulations and bureaucratic absurdities."
    },
    {
      "word": "Lord of the Flies",
      "difficulty": "easy",
      "description": "A novel by William Golding about a group of boys stranded on an uninhabited island who struggle to govern themselves and ultimately descend into savagery."
    },
    {
      "word": "The Hunger Games",
      "difficulty": "easy",
      "description": "A dystopian novel by Suzanne Collins about a televised fight to the death among teenagers from a totalitarian society."
    },
    {
      "word": "The Martian Chronicles",
      "difficulty": "hard",
      "description": "A science fiction novel by Ray Bradbury exploring human colonization of Mars and its effects on both humans and the Martian environment."
    },
    {
      "word": "A Tale of Two Cities",
      "difficulty": "easy",
      "description": "A historical novel by Charles Dickens set during the French Revolution, focusing on themes of resurrection and sacrifice."
    },
    {
      "word": "The Scarlet Letter",
      "difficulty": "easy",
      "description": "A novel by Nathaniel Hawthorne about a woman who bears an illegitimate child and is condemned by her Puritan society."
    },
    {
      "word": "Middlemarch",
      "difficulty": "hard",
      "description": "A novel by George Eliot (Mary Ann Evans) about the lives of residents in the fictional town of, exploring social and political issues."
    },
    {
      "word": "Heart of Darkness",
      "difficulty": "hard",
      "description": "A novella by Joseph Conrad that depicts a voyage into the African Congo and examines the effects of imperialism and human nature."
    },
    {
      "word": "Edgar Allan Poe",
      "difficulty": "hard",
      "description": "An American writer known for his dark and macabre tales, including 'The Tell-Tale Heart' and 'The Raven.'"
    },
    {
      "word": "J.K. Rowling",
      "difficulty": "easy",
      "description": "The British author best known for creating the Harry Potter series of books."
    },
    {
      "word": "Maya Angelou",
      "difficulty": "easy",
      "description": "An American poet and memoirist known for her series of autobiographies including 'I Know Why the Caged Bird Sings.'"
    },
    {
      "word": "Pablo Neruda",
      "difficulty": "hard",
      "description": "A Chilean poet known for his passionate and politically charged poetry, including 'Twenty Love Poems and a Song of Despair.'"
    },
    {
      "word": "Rumi",
      "difficulty": "easy",
      "description": "A 13th-century Persian poet and mystic known for his spiritual and philosophical poetry."
    },
    {
      "word": "Sherlock Holmes",
      "difficulty": "easy",
      "description": "A fictional detective created by Sir Arthur Conan Doyle, known for his brilliant deductive reasoning."
    },
    {
      "word": "Walt Whitman",
      "difficulty": "hard",
      "description": "An American poet known for his work 'Leaves of Grass,' which celebrates nature, humanity, and the American experience."
    },
    {
      "word": "Et tu, Brute?",
      "difficulty": "hard",
      "description": "A famous line from Shakespeare's play 'Julius Caesar,' uttered by Caesar as he is being assassinated by Brutus and others."
    }
  ],
  "Art and Culture": [
    {
      "word": "Mona Lisa",
      "difficulty": "easy",
      "description": "A famous portrait painted by Leonardo da Vinci, renowned for its enigmatic smile and detailed depiction of a woman."
    },
    {
      "word": "Michelangelo",
      "difficulty": "easy",
      "description": "An Italian Renaissance artist known for masterpieces like the Sistine Chapel ceiling and the statue of David."
    },
    {
      "word": "Renaissance",
      "difficulty": "easy",
      "description": "A period of great cultural and artistic revival in Europe, spanning from the 14th to the 17th century, marked by advancements in art, science, and literature."
    },
    {
      "word": "Pablo Picasso",
      "difficulty": "easy",
      "description": "A Spanish painter and sculptor who co-founded the Cubist movement and is known for works like 'Guernica' and 'Les Demoiselles d'Avignon.'"
    },
    {
      "word": "Vincent van Gogh",
      "difficulty": "easy",
      "description": "A Dutch post-impressionist painter known for his expressive brushwork and works such as 'Starry Night' and 'Sunflowers.'"
    },
    {
      "word": "Leonardo da Vinci",
      "difficulty": "easy",
      "description": "An Italian polymath of the Renaissance, recognized for his contributions to art, science, and invention, including 'The Last Supper' and 'Mona Lisa.'"
    },
    {
      "word": "Impressionism",
      "difficulty": "easy",
      "description": "An art movement originating in France during the late 19th century, characterized by small, visible brushstrokes and an emphasis on light and color."
    },
    {
      "word": "Sistine Chapel",
      "difficulty": "easy",
      "description": "A chapel in Vatican City renowned for its ceiling painted by Michelangelo, depicting scenes from Genesis, including 'The Creation of Adam.'"
    },
    {
      "word": "Ballet",
      "difficulty": "easy",
      "description": "A highly technical form of dance with origins in the Italian Renaissance courts, characterized by graceful movements and elaborate choreography."
    },
    {
      "word": "Opera",
      "difficulty": "easy",
      "description": "A theatrical art form combining singing, orchestral music, and drama, often staged in elaborate productions."
    },
    {
      "word": "Andy Warhol",
      "difficulty": "easy",
      "description": "An American artist known for his leading role in the Pop Art movement and works like 'Campbell's Soup Cans' and 'Marilyn Diptych.'"
    },
    {
      "word": "Shakespeare",
      "difficulty": "easy",
      "description": "William, an English playwright and poet, known for his influential plays and sonnets, including 'Hamlet' and 'Romeo and Juliet.'."
    },
    {
      "word": "Frida Kahlo",
      "difficulty": "easy",
      "description": "A Mexican painter known for her self-portraits and works reflecting her personal pain and Mexican culture, such as 'The Two Fridas.'"
    },
    {
      "word": "Gothic Architecture",
      "difficulty": "easy",
      "description": "An architectural style prevalent in Europe from the 12th to the 16th century, known for its pointed arches, ribbed vaults, and flying buttresses."
    },
    {
      "word": "Broadway",
      "difficulty": "easy",
      "description": "The theater district in New York City, renowned for its commercial stage productions and musicals."
    },
    {
      "word": "Surrealism",
      "difficulty": "easy",
      "description": "An art movement that sought to release the creative potential of the unconscious mind, often characterized by dream-like and bizarre imagery."
    },
    {
      "word": "The Louvre",
      "difficulty": "easy",
      "description": "The world's largest art museum, located in Paris, France, housing masterpieces like the 'Mona Lisa' and 'Venus de Milo.'"
    },
    {
      "word": "Film Noir",
      "difficulty": "easy",
      "description": "A genre of crime films from the 1940s and 1950s characterized by dark, cynical narratives and a visual style with high-contrast lighting."
    },
    {
      "word": "The Beatles",
      "difficulty": "easy",
      "description": "A British rock band formed in Liverpool in the 1960s, famous for their influential music and cultural impact, including albums like 'Sgt. Pepper's Lonely Hearts Club Band.'"
    },
    {
      "word": "Hip Hop",
      "difficulty": "easy",
      "description": "A cultural movement that includes a musical genre characterized by rhythmic vocal style (rapping), DJing, graffiti art, and breakdancing."
    },
    {
      "word": "Abstract Art",
      "difficulty": "easy",
      "description": "An art style that uses shapes, colors, and forms to create compositions independent of visual references from the world."
    },
    {
      "word": "Theater",
      "difficulty": "easy",
      "description": "A performing art form that involves live actors presenting a story through dialogue, acting, and often music and dance."
    },
    {
      "word": "The Great Gatsby",
      "difficulty": "easy",
      "description": "A novel by F. Scott Fitzgerald set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the character of Jay Gatsby."
    },
    {
      "word": "Cubism",
      "difficulty": "easy",
      "description": "An art movement pioneered by Picasso and Braque, characterized by fragmented objects and multiple viewpoints in a single plane."
    },
    {
      "word": "Broadway Musical",
      "difficulty": "easy",
      "description": "A theatrical production featuring a combination of songs, spoken dialogue, acting, and dance, staged in New York's Broadway district."
    },
    {
      "word": "Rembrandt",
      "difficulty": "easy",
      "description": "A Dutch painter and etcher known for his portraits and use of light and shadow, including works like 'The Night Watch' and 'The Anatomy Lesson.'"
    },
    {
      "word": "Classical Music",
      "difficulty": "easy",
      "description": "A broad term for a tradition of music that spans from the 9th century to the present, including composers like Beethoven and Mozart."
    },
    {
      "word": "Pop Art",
      "difficulty": "easy",
      "description": "An art movement of the 1950s and 1960s that drew inspiration from popular and commercial culture, using imagery from advertising and mass media."
    },
    {
      "word": "Literary Classic",
      "difficulty": "easy",
      "description": "A term for books that have stood the test of time, often considered essential reading for their artistic and cultural value."
    },
    {
      "word": "Rococo",
      "difficulty": "easy",
      "description": "An 18th-century art and design style characterized by ornate details, playful themes, and elaborate decorations, often in pastel colors."
    },
    {
      "word": "Hollywood",
      "difficulty": "easy",
      "description": "The entertainment district in Los Angeles known for its film industry, including major studios, theaters, and the iconic sign."
    },
    {
      "word": "Baroque Music",
      "difficulty": "easy",
      "description": "A style of classical music from the 1600s to the mid-1700s, known for its elaborate ornamentation and expressive melodies, with composers like Bach and Handel."
    },
    {
      "word": "Romeo and Juliet",
      "difficulty": "easy",
      "description": "A tragic play by William Shakespeare about two young lovers from feuding families whose deaths ultimately reconcile their families."
    },
    {
      "word": "Dadaism",
      "difficulty": "easy",
      "description": "An avant-garde art movement of the early 20th century that rejected logic and embraced chaos and absurdity in art."
    },
    {
      "word": "Guggenheim Museum",
      "difficulty": "easy",
      "description": "A renowned art museum with locations in New York and Bilbao, known for its modern and contemporary art collections and distinctive architectural design."
    },
    {
      "word": "Abstract Expressionism",
      "difficulty": "easy",
      "description": "An art movement emphasizing spontaneous, non-representational forms and bold colors, associated with artists like Jackson Pollock and Mark Rothko."
    },
    {
      "word": "The Last Supper",
      "difficulty": "easy",
      "description": "A fresco by Leonardo da Vinci depicting Jesus' final meal with his disciples before his crucifixion, known for its detailed composition and emotional depth."
    },
    {
      "word": "Sculpture",
      "difficulty": "easy",
      "description": "A three-dimensional art form created by shaping materials such as clay, stone, or metal to form artistic objects or figures."
    },
    {
      "word": "Neo-Classicism",
      "difficulty": "easy",
      "description": "An art movement of the late 18th and early 19th centuries that sought to revive the classical style and ideals of ancient Greece and Rome."
    },
    {
      "word": "Modern Dance",
      "difficulty": "easy",
      "description": "A style of dance that emerged in the early 20th century, characterized by a departure from classical ballet techniques and a focus on personal expression."
    },
    {
      "word": "Jazz",
      "difficulty": "easy",
      "description": "A genre of music originating in the early 20th century, characterized by swing rhythms, improvisation, and a blend of African American musical traditions."
    },
    {
      "word": "The Thinker",
      "difficulty": "easy",
      "description": "A bronze sculpture by Auguste Rodin depicting a man deep in thought, often seen as a symbol of intellectual activity and contemplation."
    },
    {
      "word": "Street Art",
      "difficulty": "easy",
      "description": "Art created in public spaces, often involving graffiti, murals, and stenciling, with a focus on social and political commentary."
    },
    {
      "word": "The Alhambra",
      "difficulty": "easy",
      "description": "A palace and fortress complex in Granada, Spain, known for its stunning Islamic architecture and intricate decorative details."
    },
    {
      "word": "Graphic Novel",
      "difficulty": "easy",
      "description": "A book-length work of fiction or non-fiction presented in comic strip format, combining text and illustrations to tell a story."
    },
    {
      "word": "Classical Ballet",
      "difficulty": "easy",
      "description": "A formal dance style with structured techniques and traditional choreography, including ballets like 'Swan Lake' and 'The Nutcracker.'"
    },
    {
      "word": "Folk Music",
      "difficulty": "easy",
      "description": "A genre of music rooted in the traditions and cultures of communities, often featuring acoustic instruments and storytelling lyrics."
    },
    {
      "word": "Romanticism",
      "difficulty": "easy",
      "description": "An artistic, literary, and intellectual movement of the late 18th and early 19th centuries emphasizing emotion, nature, and individualism."
    },
    {
      "word": "Claude Monet",
      "difficulty": "hard",
      "description": "A French painter and a founder of the Impressionist movement, known for his series of paintings depicting water lilies and landscapes."
    },
    {
      "word": "Guernica",
      "difficulty": "hard",
      "description": "A large mural by Pablo Picasso depicting the horrors of war and suffering during the Spanish Civil War, renowned for its powerful anti-war message."
    },
    {
      "word": "Sistine Chapel Ceiling",
      "difficulty": "hard",
      "description": "The ceiling of the Sistine Chapel painted by Michelangelo, featuring scenes from Genesis, including the iconic 'Creation of Adam.'"
    },
    {
      "word": "The Night Watch",
      "difficulty": "hard",
      "description": "A famous painting by Rembrandt depicting a city guard moving out, known for its dramatic use of light and shadow."
    },
    {
      "word": "American Gothic",
      "difficulty": "hard",
      "description": "A painting by Grant Wood depicting a farmer and his daughter in front of a Gothic-style house, often interpreted as a representation of rural American values."
    },
    {
      "word": "The Kiss",
      "difficulty": "hard",
      "description": "A painting by Gustav Klimt, renowned for its elaborate use of gold leaf and its depiction of a couple embracing."
    },
    {
      "word": "The Birth of Venus",
      "difficulty": "hard",
      "description": "A painting by Sandro Botticelli depicting the goddess Venus emerging from the sea, celebrated for its classical beauty and composition."
    },
    {
      "word": "Girl with a Pearl Earring",
      "difficulty": "hard",
      "description": "A portrait by Johannes Vermeer known for its captivating depiction of a girl wearing a pearl earring, often referred to as the 'Mona Lisa of the North.'"
    },
    {
      "word": "The Garden of Earthly Delights",
      "difficulty": "hard",
      "description": "A triptych painting by Hieronymus Bosch, famous for its surreal and fantastical imagery depicting heaven, earth, and hell."
    },
    {
      "word": "The Arnolfini Portrait",
      "difficulty": "hard",
      "description": "A painting by Jan van Eyck depicting a wealthy couple in their home, known for its detailed realism and use of symbolism."
    },
    {
      "word": "The Raft of the Medusa",
      "difficulty": "hard",
      "description": "A painting by Théodore Géricault depicting the aftermath of a shipwreck, known for its dramatic and realistic portrayal of human suffering."
    },
    {
      "word": "Brooklyn Bridge",
      "difficulty": "easy",
      "description": "An iconic suspension structure connecting Manhattan and New York City, known for its architectural design and historical significance."
    },
    {
      "word": "Hieroglyphics",
      "difficulty": "hard",
      "description": "An ancient writing system used by Egyptians, consisting of pictorial symbols representing objects, sounds, or ideas."
    },
    {
      "word": "Tower Bridge",
      "difficulty": "hard",
      "description": "A famous structure in London known for its distinctive twin towers and its ability to lift to allow ships to pass beneath."
    },
    {
      "word": "Bollywood",
      "difficulty": "easy",
      "description": "The Indian film industry based in Mumbai, known for its vibrant musicals and dramatic storytelling."
    },
    {
      "word": "Carnegie Hall",
      "difficulty": "easy",
      "description": "A renowned concert venue in New York City, famous for its acoustics and hosting classical music performances."
    },
    {
      "word": "Disneyland",
      "difficulty": "easy",
      "description": "A theme park created by Walt Disney, known for its attractions based on Disney characters and stories, located in California and other locations."
    },
    {
      "word": "Hollywood Walk of Fame",
      "difficulty": "easy",
      "description": "A sidewalk in Hollywood, California, featuring stars embedded in the pavement to honor celebrities in the entertainment industry."
    },
    {
      "word": "Mardi Gras in New Orleans",
      "difficulty": "hard",
      "description": "An annual festival in New Orleans known for its elaborate parades, costumes, and vibrant celebrations marking the start of Lent."
    },
    {
      "word": "Red Rocks Amphitheatre",
      "difficulty": "hard",
      "description": "A natural amphitheater in Colorado, renowned for its stunning red rock formations and acoustic excellence."
    },
    {
      "word": "Rio Carnival",
      "difficulty": "hard",
      "description": "An annual festival in Rio de Janeiro, Brazil, featuring elaborate parades, samba music, and vibrant costumes."
    },
    {
      "word": "The Louvre Museum",
      "difficulty": "hard",
      "description": "A world-renowned museum in Paris, France, housing thousands of works of art, including the 'Mona Lisa' and 'Venus de Milo.'"
    },
    {
      "word": "Kwaito",
      "difficulty": "hard",
      "description": "South African music genre."
    },
    {
      "word": "Shosholoza",
      "difficulty": "hard",
      "description": "Traditional song associated with South African rail workers."
    },
    {
      "word": "Ladysmith Black Mambazo",
      "difficulty": "hard",
      "description": "World-renowned South African male choral group."
    },
    {
      "word": "Ndebele Art",
      "difficulty": "hard",
      "description": "Vibrant, colorful geometric patterns used in Ndebele culture."
    },
    {
      "word": "Die Antwoord",
      "difficulty": "easy",
      "description": "Controversial South African hip hop group."
    },
    {
      "word": "Zulu Beadwork",
      "difficulty": "hard",
      "description": "Intricate bead designs used in traditional Zulu culture."
    }
  ],
  "Music": [
    {
      "word": "Beethoven",
      "difficulty": "easy",
      "description": "German classical composer of famous symphonies like the Fifth and Ninth."
    },
    {
      "word": "The Beatles",
      "difficulty": "easy",
      "description": "Legendary Liverpool band with John Lennon and Paul McCartney."
    },
    {
      "word": "Rock and Roll",
      "difficulty": "easy",
      "description": "Energetic guitar-driven genre that rose to fame in the 1950s."
    },
    {
      "word": "Mozart",
      "difficulty": "easy",
      "description": "Austrian child-prodigy composer from the classical era."
    },
    {
      "word": "Jazz",
      "difficulty": "easy",
      "description": "Improvisational genre known for swing rhythms and brass solos."
    },
    {
      "word": "Hip Hop",
      "difficulty": "easy",
      "description": "Music culture built around rap, beats, DJing, and street style."
    },
    {
      "word": "Opera",
      "difficulty": "easy",
      "description": "Dramatic stage performance where most dialogue is sung."
    },
    {
      "word": "Elvis Presley",
      "difficulty": "easy",
      "description": "The King of Rock and Roll, known for his iconic stage moves."
    },
    {
      "word": "Piano",
      "difficulty": "easy",
      "description": "Keyboard instrument with black and white keys."
    },
    {
      "word": "Violin",
      "difficulty": "easy",
      "description": "Four-string instrument played with a bow under the chin."
    },
    {
      "word": "Michael Jackson",
      "difficulty": "easy",
      "description": "King of Pop known for Thriller and the moonwalk."
    },
    {
      "word": "Blues",
      "difficulty": "easy",
      "description": "Soulful genre rooted in African American history and 12-bar patterns."
    },
    {
      "word": "The Rolling Stones",
      "difficulty": "easy",
      "description": "Long-running British rock band led by Mick Jagger."
    },
    {
      "word": "Country Music",
      "difficulty": "easy",
      "description": "Storytelling genre linked to Nashville, guitars, and rural themes."
    },
    {
      "word": "Classical Music",
      "difficulty": "easy",
      "description": "Orchestral tradition featuring composers like Mozart and Beethoven."
    },
    {
      "word": "Reggae",
      "difficulty": "easy",
      "description": "Jamaican genre with offbeat rhythm, strongly linked to Bob Marley."
    },
    {
      "word": "Guitar",
      "difficulty": "easy",
      "description": "String instrument usually played by strumming or picking."
    },
    {
      "word": "Choir",
      "difficulty": "easy",
      "description": "Group of singers performing together in harmony."
    },
    {
      "word": "Broadway Musical",
      "difficulty": "easy",
      "description": "Stage show that combines acting, songs, and choreography."
    },
    {
      "word": "Rap",
      "difficulty": "easy",
      "description": "Rhythmic spoken lyrics performed over a beat."
    },
    {
      "word": "Saxophone",
      "difficulty": "easy",
      "description": "Curved wind instrument often associated with jazz solos."
    },
    {
      "word": "Folk Music",
      "difficulty": "easy",
      "description": "Traditional acoustic songs passed down through communities."
    },
    {
      "word": "Salsa",
      "difficulty": "easy",
      "description": "Fast Latin dance music with strong percussion and brass."
    },
    {
      "word": "DJ",
      "difficulty": "easy",
      "description": "Performer who mixes and plays recorded music for a crowd."
    },
    {
      "word": "Chopin",
      "difficulty": "hard",
      "description": "Polish composer famous for expressive solo piano works."
    },
    {
      "word": "Acoustic Guitar",
      "difficulty": "easy",
      "description": "Non-electric guitar with a hollow wooden body."
    },
    {
      "word": "Heavy Metal",
      "difficulty": "easy",
      "description": "Loud rock style with distorted guitars and intense drumming."
    },
    {
      "word": "Electronic Music",
      "difficulty": "easy",
      "description": "Genre created mainly with synths, software, and drum machines."
    },
    {
      "word": "Opera Singer",
      "difficulty": "easy",
      "description": "Classically trained vocalist who projects over an orchestra."
    },
    {
      "word": "Woodstock",
      "difficulty": "hard",
      "description": "Historic 1969 festival associated with the hippie era."
    },
    {
      "word": "Concerto",
      "difficulty": "hard",
      "description": "Classical piece featuring a solo instrument against orchestra."
    },
    {
      "word": "Drum Set",
      "difficulty": "easy",
      "description": "Collection of drums and cymbals played by one drummer."
    },
    {
      "word": "R&B",
      "difficulty": "easy",
      "description": "Rhythm and blues style mixing soulful vocals with groove."
    },
    {
      "word": "Baroque Music",
      "difficulty": "hard",
      "description": "Ornate classical period linked to composers like Bach and Handel."
    },
    {
      "word": "Trumpet",
      "difficulty": "easy",
      "description": "Brass instrument with three valves and a bright tone."
    },
    {
      "word": "Synthesizer",
      "difficulty": "easy",
      "description": "Electronic keyboard used to create synthetic sounds."
    },
    {
      "word": "Festival",
      "difficulty": "easy",
      "description": "Large live event where many artists perform over one or more days."
    },
    {
      "word": "Marching Band",
      "difficulty": "easy",
      "description": "Uniformed band that performs music while marching in formation."
    },
    {
      "word": "Singer-Songwriter",
      "difficulty": "easy",
      "description": "Artist who writes their own songs and performs them."
    },
    {
      "word": "Motown",
      "difficulty": "easy",
      "description": "Detroit record label and soul sound behind many classic hits."
    },
    {
      "word": "Orchestra",
      "difficulty": "easy",
      "description": "Large ensemble of strings, brass, woodwinds, and percussion."
    },
    {
      "word": "Grammy Awards",
      "difficulty": "easy",
      "description": "Major annual awards honoring music recording achievements."
    },
    {
      "word": "Conducting",
      "difficulty": "easy",
      "description": "Leading musicians with baton cues for tempo and dynamics."
    },
    {
      "word": "Punk Rock",
      "difficulty": "easy",
      "description": "Fast, raw rock genre known for rebellious energy."
    },
    {
      "word": "Bass Guitar",
      "difficulty": "easy",
      "description": "Low-pitched guitar that anchors rhythm and groove."
    },
    {
      "word": "Songwriting",
      "difficulty": "easy",
      "description": "Creating lyrics, melody, and structure for a song."
    },
    {
      "word": "Keyboard",
      "difficulty": "easy",
      "description": "Electronic piano-style instrument with many built-in sounds."
    },
    {
      "word": "Rhythm and Blues",
      "difficulty": "easy",
      "description": "Full name of R&B, a groove-focused vocal genre."
    },
    {
      "word": "Beyonce",
      "difficulty": "easy",
      "description": "Global pop and R&B star from Destiny's Child, known for Single Ladies."
    },
    {
      "word": "Freddie Mercury",
      "difficulty": "easy",
      "description": "Queen frontman known for powerful vocals and stage presence."
    },
    {
      "word": "Adele",
      "difficulty": "easy",
      "description": "British singer known for emotional ballads like Hello."
    },
    {
      "word": "Ed Sheeran",
      "difficulty": "easy",
      "description": "British singer-songwriter known for acoustic pop hits."
    },
    {
      "word": "Taylor Swift",
      "difficulty": "easy",
      "description": "Singer-songwriter known for hit eras and autobiographical lyrics."
    },
    {
      "word": "Madonna",
      "difficulty": "easy",
      "description": "Pop icon often called the Queen of Pop."
    },
    {
      "word": "Queen",
      "difficulty": "easy",
      "description": "British rock band behind Bohemian Rhapsody."
    },
    {
      "word": "Rolling Stones",
      "difficulty": "easy",
      "description": "British rock group famous for Satisfaction and decades of touring."
    },
    {
      "word": "Lady Gaga",
      "difficulty": "easy",
      "description": "Pop star known for Poker Face and theatrical fashion."
    },
    {
      "word": "Justin Bieber",
      "difficulty": "easy",
      "description": "Canadian pop singer first discovered through YouTube videos."
    },
    {
      "word": "Led Zeppelin",
      "difficulty": "hard",
      "description": "British hard rock band known for Stairway to Heaven."
    },
    {
      "word": "Pink Floyd",
      "difficulty": "hard",
      "description": "Progressive rock band behind The Dark Side of the Moon."
    },
    {
      "word": "Fleetwood Mac",
      "difficulty": "hard",
      "description": "Rock band known for Rumours and Go Your Own Way."
    },
    {
      "word": "Red Hot Chili Peppers",
      "difficulty": "hard",
      "description": "California band blending funk, rap, and alternative rock."
    },
    {
      "word": "Nine Inch Nails",
      "difficulty": "hard",
      "description": "Industrial rock act led by Trent Reznor."
    },
    {
      "word": "The Smashing Pumpkins",
      "difficulty": "hard",
      "description": "Alternative rock band fronted by Billy Corgan."
    },
    {
      "word": "Rage Against the Machine",
      "difficulty": "hard",
      "description": "Rap-metal band known for political protest songs."
    },
    {
      "word": "Radiohead",
      "difficulty": "hard",
      "description": "Alternative rock band known for Creep and OK Computer."
    },
    {
      "word": "The Cure",
      "difficulty": "hard",
      "description": "British post-punk band with goth and new wave influences."
    },
    {
      "word": "Depeche Mode",
      "difficulty": "hard",
      "description": "Synth-pop band known for moody electronic anthems."
    },
    {
      "word": "Aretha Franklin",
      "difficulty": "easy",
      "description": "Queen of Soul known for the song Respect."
    },
    {
      "word": "Ariana Grande",
      "difficulty": "easy",
      "description": "Pop singer known for her high vocal range."
    },
    {
      "word": "Bob Dylan",
      "difficulty": "easy",
      "description": "Influential folk-rock songwriter and Nobel Prize winner."
    },
    {
      "word": "Drake",
      "difficulty": "easy",
      "description": "Canadian rapper and singer with many chart-topping hits."
    },
    {
      "word": "Elton John",
      "difficulty": "easy",
      "description": "British pianist and singer behind Rocket Man and Tiny Dancer."
    },
    {
      "word": "John Lennon",
      "difficulty": "easy",
      "description": "Beatles member who later sang Imagine as a solo artist."
    },
    {
      "word": "Paul McCartney",
      "difficulty": "easy",
      "description": "Beatles bassist and singer with a major solo career."
    },
    {
      "word": "Rihanna",
      "difficulty": "easy",
      "description": "Barbadian pop star known for Umbrella and Diamonds."
    },
    {
      "word": "Whitney Houston",
      "difficulty": "easy",
      "description": "Powerhouse vocalist known for I Will Always Love You."
    },
    {
      "word": "Rolling in the Deep",
      "difficulty": "easy",
      "description": "Adele hit song with a strong stomp-clap beat."
    },
    {
      "word": "Shape of You",
      "difficulty": "easy",
      "description": "Popular Ed Sheeran dance-pop single."
    },
    {
      "word": "Blinding Lights",
      "difficulty": "easy",
      "description": "The Weeknd hit with an 80s-style synth sound."
    },
    {
      "word": "Hey Jude",
      "difficulty": "easy",
      "description": "Beatles anthem famous for the na-na-na singalong ending."
    },
    {
      "word": "Someone Like You",
      "difficulty": "easy",
      "description": "Adele piano ballad about heartbreak and moving on."
    },
    {
      "word": "Uptown Funk",
      "difficulty": "easy",
      "description": "Bruno Mars and Mark Ronson funk-pop party hit."
    },
    {
      "word": "U2",
      "difficulty": "easy",
      "description": "Irish rock band fronted by Bono."
    },
    {
      "word": "Coldplay",
      "difficulty": "easy",
      "description": "British stadium rock band known for Yellow and Fix You."
    },
    {
      "word": "Nirvana",
      "difficulty": "easy",
      "description": "Seattle grunge band fronted by Kurt Cobain."
    },
    {
      "word": "AC/DC",
      "difficulty": "easy",
      "description": "Australian hard rock band known for Back in Black."
    },
    {
      "word": "Tyla",
      "difficulty": "easy",
      "description": "South African singer known globally for the hit Water."
    },
    {
      "word": "Amapiano",
      "difficulty": "hard",
      "description": "South African house style with log drums and piano grooves."
    },
    {
      "word": "Cassper Nyovest",
      "difficulty": "hard",
      "description": "South African rapper known for major local stadium shows."
    },
    {
      "word": "Black Coffee",
      "difficulty": "easy",
      "description": "South African DJ and producer with global house music success."
    },
    {
      "word": "AKA",
      "difficulty": "hard",
      "description": "South African rapper known for Fela in Versace and All Eyes on Me."
    },
    {
      "word": "Cape Town Jazz Festival",
      "difficulty": "easy",
      "description": "Major annual South African event featuring local and global jazz artists."
    },
    {
      "word": "Oppikoppi",
      "difficulty": "hard",
      "description": "Iconic South African outdoor music festival in Limpopo."
    }
  ],
  "Sports": [
    {
      "word": "Football",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Basketball",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Soccer",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Tennis",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Golf",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Baseball",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Swimming",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Boxing",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Cricket",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Rugby",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Running",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Volleyball",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Ice Hockey",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Table Tennis",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Athletics",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Cycling",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Wrestling",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Badminton",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Formula 1",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Martial Arts",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Gymnastics",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Surfing",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Snowboarding",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Skateboarding",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Polo",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Archery",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Equestrian",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Sailing",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Darts",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Snooker",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Squash",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Canoeing",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Rowing",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Triathlon",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Netball",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Pentathlon",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Handball",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Curling",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Fencing",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Lacrosse",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Bobsleigh",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Powerlifting",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Mountaineering",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Figure Skating",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Biathlon",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Taekwondo",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Bowling",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Water Polo",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Goal",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Ball",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Kick",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Pass",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Referee",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Goalkeeper",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Red Card",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Yellow Card",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Foul",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Offside",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Penalty Kick",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Corner Kick",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Free Kick",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Tackle",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Header",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Substitute",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Captain",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "World Cup",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Champions League",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Premier League",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "La Liga",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Serie A",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Bundesliga",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Messi",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Ronaldo",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Neymar",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Mbappe",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Zidane",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Maradona",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Pele",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Beckenbauer",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Wembley Stadium",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Camp Nou",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Santiago Bernabeu",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Old Trafford",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Anfield",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Allianz Arena",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "FIFA",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "UEFA",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Golden Boot",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Golden Ball",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Top Scorer",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Hat-Trick",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Own Goal",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Touchdown",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Home Run",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Ace",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Birdie",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Forehand",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Backhand",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Serve",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Grand Slam",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Wimbledon",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Super Bowl",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "World Series",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Olympics",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Tour de France",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "MMA",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Skiing",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "High Jump",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Long Jump",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Pole Vault",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Javelin",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Shot Put",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Hockey",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Karate",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Diving",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Michael Jordan",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Serena Williams",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Usain Bolt",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Muhammad Ali",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Cristiano Ronaldo",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Lionel Messi",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Roger Federer",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Tiger Woods",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "LeBron James",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Michael Phelps",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Simone Biles",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Kobe Bryant",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Wayne Gretzky",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Mia Hamm",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Babe Ruth",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Rafael Nadal",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Jackie Joyner-Kersee",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Novak Djokovic",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Martina Navratilova",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Diego Maradona",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Michael Schumacher",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Sachin Tendulkar",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Manny Pacquiao",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Alex Morgan",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "FIFA World Cup",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "NBA Finals",
      "difficulty": "hard",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Penalty",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Striker",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Midfielder",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Nutmeg",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Tiki-taka",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "False nine",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Sweeper",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Counter-attack",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Libero",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Man marking",
      "difficulty": "hard",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Zonal marking",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Through ball",
      "difficulty": "hard",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Decathlon",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "The Olympic Games",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Bobsledding",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Windsurfing",
      "difficulty": "hard",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Jesse Owens",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Tom Brady",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Australian Open",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Champions League Final",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Defensive Block",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "English Premier League Trophy",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Formula 1 Grand Prix",
      "difficulty": "hard",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Formula 1 World Championship",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Free Kick Technique",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "French Open",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Golf Masters",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Ligue 1",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "MLB",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "MVP",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "NBA",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "NFL",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Olympic Gold Medal",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Penalty Shootout",
      "difficulty": "hard",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Roger Federer vs Rafael Nadal",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Summer Olympics Opening Ceremony",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Super Bowl Halftime Show",
      "difficulty": "hard",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Super Bowl MVP Performance",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "US Open",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Video Assistant Referee",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Winter Olympics",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Winter Olympics Opening Ceremony",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "World Cup Final",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Kylian Mbappé",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Mohamed Salah",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Neymar Jr.",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Zlatan Ibrahimović",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Nike",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Manchester United",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Adidas",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Real Madrid",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Barcelona",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Bayern Munich",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Liverpool",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Chelsea",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Paris Saint-Germain",
      "difficulty": "easy",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Juventus",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "AC Milan",
      "difficulty": "easy",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Arsenal",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Sir Alex Ferguson",
      "difficulty": "easy",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Pep Guardiola",
      "difficulty": "hard",
      "description": "Athletics reference; clue with team/event context and a famous moment."
    },
    {
      "word": "Jurgen Klopp",
      "difficulty": "hard",
      "description": "Sports term; start with game type, then scoring or tournament context."
    },
    {
      "word": "Cole Palmer",
      "difficulty": "hard",
      "description": "Sports clue; describe the sport, role, and a defining achievement."
    },
    {
      "word": "Bafana Bafana",
      "difficulty": "easy",
      "description": "Nickname for South Africa's national soccer team."
    },
    {
      "word": "Springboks",
      "difficulty": "easy",
      "description": "South Africa's national rugby team."
    },
    {
      "word": "Mzansi Super League",
      "difficulty": "hard",
      "description": "South Africa's Twenty20 cricket league."
    },
    {
      "word": "Proteas",
      "difficulty": "easy",
      "description": "South Africa's national cricket team."
    }
  ],
  "Movies and TV": [
    {
      "word": "Star Wars",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Matrix",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Friends",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "The Simpsons",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Breaking Bad",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Game of Thrones",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Harry Potter",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Godfather",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "The Avengers",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Avengers: Endgame",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Lord of the Rings",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Jurassic Park",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "The Shawshank Redemption",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Pulp Fiction",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Back to the Future",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Star Trek",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "The Office",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Avatar",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Titanic",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Inception",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Stranger Things",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "The Lion King",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Forrest Gump",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "The Dark Knight",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Toy Story",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "The Walking Dead",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Frozen",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "The Big Bang Theory",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Indiana Jones",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "The Sound of Music",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Sopranos",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "The Terminator",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Mulan",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Die Hard",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Witcher",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Hunger Games",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Mad Men",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Princess Bride",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Mission: Impossible",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "The Twilight Zone",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "The Good Place",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The X-Files",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Avatar: The Last Airbender",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Crown",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Mandalorian",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Leonardo DiCaprio",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Actor",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Director",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Oscar",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Red carpet",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Blockbuster",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Movie",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Premiere",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Screenwriter",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Studio",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Sequel",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Cinematography",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Method acting",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Film noir",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Biopic",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Cameo",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Auteur",
      "difficulty": "hard",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Casting couch",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Stunt double",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Box office",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Green screen",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Grey's Anatomy",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Seinfeld",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "How I Met Your Mother",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Twin Peaks",
      "difficulty": "hard",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Black Mirror",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "True Detective",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "The Handmaid's Tale",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Westworld",
      "difficulty": "hard",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Better Call Saul",
      "difficulty": "hard",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Bradley Cooper",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Daniel Day-Lewis",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Darth Vader",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Dumbledore",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Gandalf",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "George Clooney",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Hermione Granger",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Jennifer Lawrence",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Johnny Depp",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Katniss Everdeen",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "La La Land",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Luke Skywalker",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Meryl Streep",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Ryan Gosling",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Twilight",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Beam me up, Scotty",
      "difficulty": "hard",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Elementary, my dear Watson",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Frankly, my dear, I don't give a damn",
      "difficulty": "hard",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Go ahead, make my day",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Here's Johnny!",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Here's looking at you, kid",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "I'll be back",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "May the Force be with you",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "May the odds be ever in your favor",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Resistance is futile",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Say hello to my little friend",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "To infinity and beyond",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Yippee-ki-yay, motherfucker!",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "You can't handle the truth!",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Harry Potter Wizarding World",
      "difficulty": "hard",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Disney Classics",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Disney Pixar Films",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Disney Princesses",
      "difficulty": "easy",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Marvel Cinematic Universe",
      "difficulty": "hard",
      "description": "Movie/show reference; start with setting, then the central conflict."
    },
    {
      "word": "Pirates of the Caribbean",
      "difficulty": "easy",
      "description": "Film/TV clue; use genre, main character, and iconic scene or line."
    },
    {
      "word": "Pixar Movies",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "The Godfather Trilogy",
      "difficulty": "easy",
      "description": "Screen clue; describe plot setup, franchise, or actor association."
    },
    {
      "word": "Isibaya",
      "difficulty": "hard",
      "description": "Popular South African soap opera."
    },
    {
      "word": "Mzansi Magic",
      "difficulty": "hard",
      "description": "South African television channel."
    },
    {
      "word": "Ster-Kinekor",
      "difficulty": "easy",
      "description": "Major cinema chain."
    },
    {
      "word": "Netflix",
      "difficulty": "easy",
      "description": "Popular streaming platform known for original content and binge-worthy shows."
    },
    {
      "word": "Emmy Awards",
      "difficulty": "easy",
      "description": "Television award ceremony honoring excellence in the TV industry."
    },
    {
      "word": "Sitcom",
      "difficulty": "easy",
      "description": "Comedy show typically set in the same location with the same group of characters."
    },
    {
      "word": "Documentary",
      "difficulty": "easy",
      "description": "Non-fiction film or TV show exploring factual subjects and real events."
    },
    {
      "word": "Bollywood",
      "difficulty": "easy",
      "description": "Indian film industry based in Mumbai known for colorful musical elements."
    },
    {
      "word": "Wes Anderson",
      "difficulty": "hard",
      "description": "American filmmaker known for his distinctive visual style and symmetrical shots."
    },
    {
      "word": "Thriller",
      "difficulty": "easy",
      "description": "Genre characterized by suspense, tension and excitement."
    },
    {
      "word": "HBO",
      "difficulty": "easy",
      "description": "Premium cable network known for high-quality original programming."
    },
    {
      "word": "Costume Designer",
      "difficulty": "hard",
      "description": "Person responsible for creating the attire worn by actors in productions."
    },
    {
      "word": "Anime",
      "difficulty": "easy",
      "description": "Japanese animated productions featuring distinctive artwork and fantastical themes."
    },
    {
      "word": "Plot Twist",
      "difficulty": "easy",
      "description": "Unexpected change in a narrative that surprises the audience and alters the story direction."
    },
    {
      "word": "Cliffhanger",
      "difficulty": "easy",
      "description": "Suspenseful ending designed to leave the audience wanting more."
    },
    {
      "word": "Special Effects",
      "difficulty": "easy",
      "description": "Visual illusions created for film and television to simulate impossible or fantastical scenes."
    },
    {
      "word": "Superhero",
      "difficulty": "easy",
      "description": "Character with extraordinary abilities often featured in comic book adaptations."
    },
    {
      "word": "Product Placement",
      "difficulty": "hard",
      "description": "Promotional technique where branded products appear in film or TV productions."
    },
    {
      "word": "Saturday Night Live",
      "difficulty": "easy",
      "description": "Long-running American sketch comedy and variety show featuring celebrity hosts."
    },
    {
      "word": "Subtitles",
      "difficulty": "easy",
      "description": "Text display of dialogue for foreign language films or for hearing impaired viewers."
    },
    {
      "word": "Disney+",
      "difficulty": "easy",
      "description": "Streaming service featuring Disney, Pixar, Marvel, and Star Wars content."
    },
    {
      "word": "Quentin Tarantino",
      "difficulty": "hard",
      "description": "Director known for non-linear storylines and stylized violence."
    },
    {
      "word": "Binge-watching",
      "difficulty": "easy",
      "description": "Practice of watching multiple episodes of a show in one sitting."
    },
    {
      "word": "Mockumentary",
      "difficulty": "hard",
      "description": "Fictional work presented as a documentary for comedic or satirical purposes."
    },
    {
      "word": "Golden Globes",
      "difficulty": "easy",
      "description": "Award ceremony honoring excellence in both film and television."
    }
  ],
  "Food and Drink": [
    {
      "word": "Pizza",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Chocolate",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Burger",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Coffee",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Sushi",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Ice Cream",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Pasta",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Wine",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Beer",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Steak",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Salad",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Sandwich",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Cheese",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Cupcake",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Tea",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Cookie",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Tacos",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Whiskey",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Bread",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Cocktail",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Smoothie",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Donut",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Soup",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Cake",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Barbecue",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Pancakes",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Ramen",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Lobster",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Curry",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Gin",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Vodka",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Caviar",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Macaron",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Paella",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Hot Dog",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Dim Sum",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Champagne",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Margarita",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Gourmet",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Milkshake",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Risotto",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Pho",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Nachos",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Cider",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Fondue",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Poutine",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Tapas",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Biscuit",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Eggs Benedict",
      "difficulty": "hard",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Beef Wellington",
      "difficulty": "hard",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Lobster Bisque",
      "difficulty": "hard",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Croque Monsieur",
      "difficulty": "hard",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Chicken Parmesan",
      "difficulty": "hard",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Tiramisu",
      "difficulty": "hard",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Coq au Vin",
      "difficulty": "hard",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Crème Brûlée",
      "difficulty": "hard",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Spaghetti Carbonara",
      "difficulty": "hard",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Banoffee Pie",
      "difficulty": "hard",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Cheeseburger",
      "difficulty": "hard",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Coca-Cola",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "KFC",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Burger King",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Subway",
      "difficulty": "easy",
      "description": "Dish/drink clue; start with flavor profile, then origin or occasion."
    },
    {
      "word": "Taco Bell",
      "difficulty": "easy",
      "description": "Culinary reference; use texture, preparation style, or meal type."
    },
    {
      "word": "Nandos",
      "difficulty": "easy",
      "description": "Internationally known restaurant chain that originated in South Africa. Famous for their chicken."
    },
    {
      "word": "Pizza Hut",
      "difficulty": "easy",
      "description": "Food clue; describe taste, ingredients, and how it is served."
    },
    {
      "word": "Biltong",
      "difficulty": "easy",
      "description": "Dried, cured meat snack."
    },
    {
      "word": "Bunny Chow",
      "difficulty": "easy",
      "description": "A hollowed-out loaf of bread filled with curry, originally from Durban."
    },
    {
      "word": "Braai",
      "difficulty": "easy",
      "description": "South African barbecue tradition."
    },
    {
      "word": "Castle Lager",
      "difficulty": "easy",
      "description": "Popular South African beer."
    },
    {
      "word": "Koeksister",
      "difficulty": "easy",
      "description": "Traditional Afrikaner pastry."
    },
    {
      "word": "South African Breweries",
      "difficulty": "easy",
      "description": "Leading beer and beverage company."
    },
    {
      "word": "Boerewors",
      "difficulty": "hard",
      "description": "Traditional South African sausage."
    },
    {
      "word": "Rooibos Tea",
      "difficulty": "hard",
      "description": "Herbal tea indigenous to South Africa."
    },
    {
      "word": "Umqombothi",
      "difficulty": "easy",
      "description": "Traditional South African beer made from sorghum."
    },
    {
      "word": "Chakalaka",
      "difficulty": "easy",
      "description": "Spicy vegetable relish often served with braai."
    },
    {
      "word": "Inkomazi",
      "difficulty": "easy",
      "description": "Traditional fermented milk drink."
    },
    {
      "word": "Mrs. Ball's Chutney",
      "difficulty": "easy",
      "description": "Popular South African condiment."
    },
    {
      "word": "Wimpy",
      "difficulty": "easy",
      "description": "South African fast-food chain famous for its mixed grill breakfast."
    },
    {
      "word": "Amarula",
      "difficulty": "easy",
      "description": "Cream liqueur made from the fruit of the African marula tree."
    },
    {
      "word": "Melktert",
      "difficulty": "easy",
      "description": "Traditional South African milk tart."
    },
    {
      "word": "Pap",
      "difficulty": "easy",
      "description": "Maize porridge, a staple in South African cuisine."
    },
    {
      "word": "Bobotie",
      "difficulty": "easy",
      "description": "Spiced minced meat baked with an egg-based topping."
    },
    {
      "word": "Vetkoek",
      "difficulty": "easy",
      "description": "Deep-fried dough balls often filled with savory or sweet fillings."
    },
    {
      "word": "Gatsbys",
      "difficulty": "hard",
      "description": "Popular, large sandwich from Cape Town."
    },
    {
      "word": "Slap Chips",
      "difficulty": "hard",
      "description": "South African style of thick-cut, vinegar-drenched fries."
    }
  ],
  "Nature and Wildlife": [
    {
      "word": "Elephant",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Rainforest",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Penguin",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Mountain",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Whale",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Sunset",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Tiger",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Savannah",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Coral Reef",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Desert",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Waterfall",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Polar Bear",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Orangutan",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Volcano",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Forest",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Giraffe",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Lion",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Dolphin",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Jungle",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Arctic",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Humpback Whale",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Cheetah",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Sunrise",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Koala",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Cactus",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Ocean",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Redwood Tree",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Squirrel",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Oasis",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Eagle",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Butterfly",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Moose",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Fjord",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Komodo Dragon",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Seal",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Tropical Fish",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Monsoon",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Lemur",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Bamboo Forest",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Hummingbird",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Glacier",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Antarctica",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Chameleon",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Mangrove",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Seahorse",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Aurora",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Octopus",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Cat",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Dog",
      "difficulty": "easy",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Kangaroo",
      "difficulty": "easy",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Shark",
      "difficulty": "easy",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Axolotl",
      "difficulty": "hard",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Platypus",
      "difficulty": "hard",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Tasmanian Devil",
      "difficulty": "hard",
      "description": "Natural-world clue; start with ecosystem, then one unique feature."
    },
    {
      "word": "Electric Eel",
      "difficulty": "hard",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Narwhal",
      "difficulty": "hard",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Emperor Penguin",
      "difficulty": "hard",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Snow Leopard",
      "difficulty": "hard",
      "description": "Wildlife reference; clue by region, diet, and standout trait."
    },
    {
      "word": "Great White Shark",
      "difficulty": "hard",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "African Grey Parrot",
      "difficulty": "hard",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Okavango Delta",
      "difficulty": "hard",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "The Amazon Rainforest",
      "difficulty": "hard",
      "description": "Nature clue; describe habitat, appearance, and behavior."
    },
    {
      "word": "Protea",
      "difficulty": "easy",
      "description": "National flower of South Africa."
    }
  ],
  "Languages": [
    {
      "word": "English",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Spanish",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "French",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Mandarin",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "German",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Italian",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Japanese",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Russian",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Portuguese",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Arabic",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Korean",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Dutch",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Swedish",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Greek",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Turkish",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Polish",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Hindi",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Thai",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Finnish",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Vietnamese",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Indonesian",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Hebrew",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Czech",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Hungarian",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Romanian",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Danish",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Norwegian",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Persian",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Swahili",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Tagalog",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Malay",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Bengali",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Slovak",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Lithuanian",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Latvian",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Slovenian",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Croatian",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Ukrainian",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Estonian",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Icelandic",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Basque",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Welsh",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Farsi",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Yiddish",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Amharic",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Zulu",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Xhosa",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Kurdish",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Afrikaans",
      "difficulty": "easy",
      "description": "One of South Africa's 11 official languages, often spoken by the white population."
    },
    {
      "word": "Yoruba",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Igbo",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Hausa",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Somali",
      "difficulty": "hard",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Shona",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Tswana",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Sesotho",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Kiswahili",
      "difficulty": "hard",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Latin Alphabet",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Cyrillic Script",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Phonetics",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Dialect",
      "difficulty": "hard",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Accents",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Bilingual",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Interpreter",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Translator",
      "difficulty": "hard",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Sign Language",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Morse Code",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Loanword",
      "difficulty": "easy",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Idiomatic Expression",
      "difficulty": "hard",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Tongue Twister",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Grammar Rule",
      "difficulty": "easy",
      "description": "Language clue; describe region, script, and common usage context."
    },
    {
      "word": "Verb Conjugation",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    },
    {
      "word": "Pronunciation",
      "difficulty": "hard",
      "description": "Linguistic reference; clue by where it is spoken and writing style."
    },
    {
      "word": "Mother Tongue",
      "difficulty": "easy",
      "description": "Language term; start with geography and one defining grammar or script trait."
    }
  ],
  "Famous Personalities": [
    {
      "word": "Albert Einstein",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Nelson Mandela",
      "difficulty": "easy",
      "description": "First South African President and anti-apartheid revolutionary."
    },
    {
      "word": "William Shakespeare",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Mahatma Gandhi",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Mother Teresa",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Martin Luther King Jr.",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Marie Curie",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Elvis Presley",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Michael Jackson",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Pablo Picasso",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Cleopatra",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Wolfgang Amadeus Mozart",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Charles Darwin",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Abraham Lincoln",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Vincent van Gogh",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Amelia Earhart",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Steve Jobs",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Stephen Hawking",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Oprah Winfrey",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Leonardo DiCaprio",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Beethoven",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Frida Kahlo",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Alexander the Great",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Jane Austen",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Walt Disney",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Muhammad Ali",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Marlon Brando",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Coco Chanel",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Neil Armstrong",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Malala Yousafzai",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "J.K. Rowling",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "David Bowie",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Diana, Princess of Wales",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Che Guevara",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Helen Keller",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Queen Elizabeth II",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Salvador Dalí",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Marie Antoinette",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Pele",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Emily Dickinson",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Napoleon Bonaparte",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Beyoncé",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "George Orwell",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Stephen Spielberg",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Audrey Hepburn",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Pope Francis",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Brad Pitt",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Angelina Jolie",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Tom Cruise",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Jennifer Aniston",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Taylor Swift",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Dwayne Johnson",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Robert Downey Jr.",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Scarlett Johansson",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Benedict Cumberbatch",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Keanu Reeves",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Natalie Portman",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Joaquin Phoenix",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Charlize Theron",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Michael Fassbender",
      "difficulty": "hard",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Cate Blanchett",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Tilda Swinton",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Christoph Waltz",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Saoirse Ronan",
      "difficulty": "hard",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Madame Curie",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Voltaire",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Albert Schweitzer",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Angela Merkel",
      "difficulty": "hard",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Aretha Franklin",
      "difficulty": "hard",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Ariana Grande",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Bill Gates",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Bob Dylan",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Bradley Cooper",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Daniel Day-Lewis",
      "difficulty": "hard",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Donald Trump",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Drake",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Eleanor Roosevelt",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Elton John",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "George Clooney",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Hillary Clinton",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Jacinda Ardern",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Jennifer Lawrence",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Jesse Owens",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "John Lennon",
      "difficulty": "hard",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Johnny Depp",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Mark Zuckerberg",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Meryl Streep",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Paul McCartney",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Rihanna",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Ryan Gosling",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Satoshi Nakamoto",
      "difficulty": "hard",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Simone Biles",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Tiger Woods",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Tom Brady",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Tom Hanks",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Wayne Gretzky",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Whitney Houston",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Winston Churchill",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Bruno Mars",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Celine Dion",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Denzel Washington",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Emma Stone",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Emma Watson",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Jennifer Lopez",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Kate Winslet",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Katy Perry",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Kylian Mbappé",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Mohamed Salah",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Neymar Jr.",
      "difficulty": "easy",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Shakira",
      "difficulty": "easy",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Zlatan Ibrahimović",
      "difficulty": "hard",
      "description": "Public figure reference; start with profession, then a defining moment."
    },
    {
      "word": "Justin Trudeau",
      "difficulty": "hard",
      "description": "Personality clue; describe field, era, and most recognizable achievement."
    },
    {
      "word": "Joe Biden",
      "difficulty": "easy",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Emmanuel Macron",
      "difficulty": "hard",
      "description": "Famous-person clue; use nationality, role, and legacy."
    },
    {
      "word": "Mangosuthu Buthelezi",
      "difficulty": "hard",
      "description": "Influential Zulu leader and politician."
    }
  ],
  "Current Events": [
    {
      "word": "COVID-19 Pandemic",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Climate Change",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Space Exploration",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Olympic Games",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Presidential Election",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Global Warming",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Brexit",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Cybersecurity",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Artificial Intelligence",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Social Media",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Electric Vehicles",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Mars Rover Mission",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Protests",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Vaccination Campaigns",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Trade Wars",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Wildfires",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Refugee Crisis",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Terrorist Attacks",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Space Tourism",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Cryptocurrency Boom",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Healthcare Reform",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Artificial Meat",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Pandemic Response",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Environmental Policies",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Gig Economy",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Student Protests",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Rising Inflation",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Homelessness Crisis",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Online Education",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Political Scandals",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Social Justice Movements",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Space Race",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Economic Stimulus Packages",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "AI Ethics Debate",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Remote Work Trends",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Ransomware Attacks",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Sustainable Development Goals",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Plastic Pollution",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Food Security",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Medical Breakthroughs",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Gender Equality Movements",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Social Distancing",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Renewable Energy Initiatives",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Remote Voting",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Digital Privacy Issues",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Climate Activism",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Space Debris",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Paris Fashion Week",
      "difficulty": "easy",
      "description": "Current-affairs clue; describe topic area, region, and recent impact."
    },
    {
      "word": "Coachella",
      "difficulty": "easy",
      "description": "Current events reference; clue with timeline and policy or social effect."
    },
    {
      "word": "Dubai Shopping Festival",
      "difficulty": "easy",
      "description": "News-style clue; start with issue type, then who is affected."
    },
    {
      "word": "Rhino Poaching Crisis",
      "difficulty": "hard",
      "description": "Critical conservation issue."
    }
  ],
  "Religion and Mythology": [
    {
      "word": "God",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Buddha",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Jesus",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Hinduism",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Egyptian Mythology",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Greek Mythology",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Christianity",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Islam",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Shiva",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Bible",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Vishnu",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Odin",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Mythology",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Paganism",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Taoism",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Myth",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Ancient Greek Gods",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Norse Mythology",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Theology",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Creation Myth",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Divinity",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Pantheon",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Deity",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Ragnarok",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Monotheism",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Polytheism",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Hindu Gods",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Greek Gods",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Roman Mythology",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Norse Gods",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Holy",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Sacred",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Religious Text",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Angel",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Demon",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Pagan Gods",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Heaven",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Hell",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Mythical Creatures",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Religion",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Mythological Beings",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Holy Book",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Prophet",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Goddess",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Ancient Gods",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Divine",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Zeus",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Hercules",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Thor",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Medusa",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Minotaur",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Poseidon",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Apollo",
      "difficulty": "easy",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Athena",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Hades",
      "difficulty": "easy",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Pandora",
      "difficulty": "easy",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Prometheus",
      "difficulty": "hard",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Persephone",
      "difficulty": "hard",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Charon",
      "difficulty": "hard",
      "description": "Belief-system reference; clue with origin, practices, and key narrative."
    },
    {
      "word": "Bifrost Bridge",
      "difficulty": "hard",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Valkyrie",
      "difficulty": "hard",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Fenrir",
      "difficulty": "hard",
      "description": "Religion/myth clue; describe tradition, figure role, and core symbol or story."
    },
    {
      "word": "Chimera",
      "difficulty": "hard",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    },
    {
      "word": "Labyrinth of Crete",
      "difficulty": "hard",
      "description": "Mythology clue; start with deity/hero role and associated legend."
    }
  ],
  "Space and Astronomy": [
    {
      "word": "Galaxy",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Black Hole",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Star",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Planet",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "The Solar System",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Moon",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Comet",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Asteroid",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Constellation",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Milky Way",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Nebula",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Space Station",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Supernova",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Telescope",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Mars",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Satellite",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Exoplanet",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Big Bang",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Cosmos",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Hubble Space Telescope",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Orbit",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Spacecraft",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Rocket",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Interstellar",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Gravity",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Galactic",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Lunar",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Milky Way Galaxy",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Outer Space",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Astrobiology",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Black Holes",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Dark Matter",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Planetary",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Space Travel",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Astrophysics",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Neutron Star",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Cosmology",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Meteor Shower",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Space Telescope",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Astronaut",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Solar Eclipse",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Orbital",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Stellar",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Space Mission",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Astronomy",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Space Race",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Earth",
      "difficulty": "easy",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Sun",
      "difficulty": "easy",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Stars",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Meteor",
      "difficulty": "easy",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Light Year",
      "difficulty": "hard",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Red Giant",
      "difficulty": "hard",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "White Dwarf",
      "difficulty": "hard",
      "description": "Cosmic term; start with object class and one standout property."
    },
    {
      "word": "Event Horizon",
      "difficulty": "hard",
      "description": "Astronomy reference; clue with size, orbit, or mission relevance."
    },
    {
      "word": "Cosmic Microwave Background",
      "difficulty": "hard",
      "description": "Space clue; describe celestial type, position, and notable characteristic."
    },
    {
      "word": "Gravitational Waves",
      "difficulty": "hard",
      "description": "Cosmic term; start with object class and one standout property."
    }
  ],
  "Inventions and Discoveries": [
    {
      "word": "Electricity",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Telephone",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Internet",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Computer",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Printing Press",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Penicillin",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Vaccination",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Airplane",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Radio",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Television",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Steam Engine",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Light Bulb",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Photography",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Microscope",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Antibiotics",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Theory of Relativity",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "DNA Double Helix",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Wheel",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Satellite",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Robotics",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Electric Light",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Internet of Things",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Atomic Theory",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Pen",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Calculator",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Genetics",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "X-ray",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Helicopter",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Plastic",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Submarine",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Fiber Optics",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Refrigerator",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Laser",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Printing",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Photovoltaic Cell",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Nuclear Power",
      "difficulty": "easy",
      "description": "Invention/discovery clue; describe purpose, inventor era, and practical impact."
    },
    {
      "word": "Electric Motor",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Semiconductor",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Satnav",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Artificial Heart",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Internet Protocol (IP)",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Neutron Bomb",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "MRI",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Quantum Theory",
      "difficulty": "easy",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Nanotechnology",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Car",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Camera",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Microwave",
      "difficulty": "easy",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Thermometer",
      "difficulty": "hard",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Stethoscope",
      "difficulty": "hard",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Typewriter",
      "difficulty": "hard",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Sewing Machine",
      "difficulty": "hard",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Solar Panel",
      "difficulty": "hard",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    },
    {
      "word": "Barcode",
      "difficulty": "hard",
      "description": "Discovery clue; start with field and then its historical significance."
    },
    {
      "word": "Transistor",
      "difficulty": "hard",
      "description": "Innovation reference; clue by what problem it solved and where it is used."
    }
  ],
  "Health and Medicine": [
    {
      "word": "Heart",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Brain",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "Lungs",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Bones",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Blood",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "DNA",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Virus",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "Bacteria",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Antibiotics",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Vaccination",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Cancer",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Diabetes",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Obesity",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Immune System",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Surgery",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "Anatomy",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Physiology",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Mental Health",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Pandemic",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Healthcare",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Stethoscope",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "X-ray",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "MRI",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Emergency Room",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Pharmacy",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Medical Research",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Epidemic",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Public Health",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Pulse",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Fever",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "Hygiene",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Cholesterol",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Allergies",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Depression",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Pain",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "Physical Therapy",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Health Insurance",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Hospice Care",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Medical Ethics",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Nutrition",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Exercise",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "Disease",
      "difficulty": "easy",
      "description": "Medicine term; start with function, then professional or patient use."
    },
    {
      "word": "First Aid",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Therapy",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Epidemiology",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Anesthesia",
      "difficulty": "easy",
      "description": "Medical clue; describe body system, treatment use, or health outcome."
    },
    {
      "word": "Madame Curie",
      "difficulty": "easy",
      "description": "Health reference; clue with symptom area, prevention, or care context."
    },
    {
      "word": "Groote Schuur Hospital",
      "difficulty": "hard",
      "description": "Major teaching hospital in Cape Town."
    },
    {
      "word": "Chris Hani Baragwanath Hospital",
      "difficulty": "hard",
      "description": "One of the largest hospitals in the world, located in Soweto."
    },
    {
      "word": "Netcare",
      "difficulty": "easy",
      "description": "Private healthcare group with numerous hospitals."
    },
    {
      "word": "Mediclinic",
      "difficulty": "hard",
      "description": "Private hospital group with facilities across South Africa."
    },
    {
      "word": "Life Healthcare",
      "difficulty": "hard",
      "description": "Another major private hospital group."
    },
    {
      "word": "Discovery Health",
      "difficulty": "easy",
      "description": "Leading medical aid provider."
    },
    {
      "word": "Bonitas",
      "difficulty": "hard",
      "description": "Major medical aid scheme."
    },
    {
      "word": "Momentum Health",
      "difficulty": "hard",
      "description": "Comprehensive medical aid provider."
    },
    {
      "word": "Medihelp",
      "difficulty": "hard",
      "description": "One of the largest open medical aid schemes."
    },
    {
      "word": "Fedhealth",
      "difficulty": "hard",
      "description": "Established medical aid scheme."
    }
  ],
  "Games and Toys": [
    {
      "word": "Chess",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Monopoly",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "LEGO",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Puzzle",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Dolls",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Video Games",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Board Game",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Action Figures",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Rubik's Cube",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Card Game",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Toy Cars",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Dungeons & Dragons",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Lego Bricks",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Barbie",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Teddy Bear",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Nintendo",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "PlayStation",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Xbox",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Dungeons and Dragons",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Checkers",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Jigsaw Puzzle",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Yo-Yo",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Trivial Pursuit",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Hot Wheels",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Transformer Toys",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Barbie Dolls",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Nintendo Switch",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Play-Doh",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Fidget Spinner",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Legos",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Remote Control Cars",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Rubik's Cubes",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Magic: The Gathering",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Candy Land",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "G.I. Joe",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Tamagotchi",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Nerf Guns",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Lincoln Logs",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Dollhouse",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Marbles",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Sudoku",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Toy Story",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Polly Pocket",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Furby",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Barbie Doll",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Remote Control Car",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Stuffed Animals",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Matchbox Cars",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Connect Four",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Jenga",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Scrabble",
      "difficulty": "hard",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Clue",
      "difficulty": "easy",
      "description": "Classic mystery board game about suspects, rooms, and solving a whodunit."
    },
    {
      "word": "Risk",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "UNO",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Twister",
      "difficulty": "hard",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Operation",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Nerf Blaster",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "RC Car",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Puzzle Box",
      "difficulty": "hard",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Beyblade",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Lego Minifigure",
      "difficulty": "hard",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Toy Drone",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Water Gun",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Action Figure",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Board Game Night",
      "difficulty": "hard",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Card Deck",
      "difficulty": "easy",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Dice Tower",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Chess Clock",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Game Piece",
      "difficulty": "hard",
      "description": "Leisure reference; clue with age group, rules, and objective."
    },
    {
      "word": "Claw Machine",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    },
    {
      "word": "Bean Bag Toss",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Foosball Table",
      "difficulty": "easy",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Air Hockey",
      "difficulty": "hard",
      "description": "Play clue; start with player actions, then pieces or equipment."
    },
    {
      "word": "Pinball",
      "difficulty": "easy",
      "description": "Game/toy clue; describe how it is played and what makes it recognizable."
    }
  ],
  "Books and Authors": [
    {
      "word": "William Shakespeare",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Jane Austen",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "George Orwell",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Charles Dickens",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Mark Twain",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Agatha Christie",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "Stephen King",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "The Lord of the Rings",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "To Kill a Mockingbird",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "The Catcher in the Rye",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Alice's Adventures in Wonderland",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Bible",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "A Song of Ice and Fire",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "The Odyssey",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Hobbit",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Lord of the Flies",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "Pride and Prejudice",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "The Chronicles of Narnia",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "Moby-Dick",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "1984",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Brave New World",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "The Adventures of Huckleberry Finn",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Wuthering Heights",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "The Grapes of Wrath",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Frankenstein",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Little Women",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "Gone with the Wind",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Count of Monte Cristo",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Picture of Dorian Gray",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Dracula",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "One Hundred Years of Solitude",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Kite Runner",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "The Girl with the Dragon Tattoo",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "The Alchemist",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Hitchhiker's Guide to the Galaxy",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Book Thief",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "War and Peace",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "Les Misérables",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "The Shining",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Secret Garden",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "The Silmarillion",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Anna Karenina",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "The Fault in Our Stars",
      "difficulty": "easy",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "The Road",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Moby Dick",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "The Da Vinci Code",
      "difficulty": "easy",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Lord of the Rings",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Crime and Punishment",
      "difficulty": "hard",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "The Brothers Karamazov",
      "difficulty": "hard",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Love in the Time of Cholera",
      "difficulty": "hard",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "A Tale of Two Cities",
      "difficulty": "hard",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Midnight's Children",
      "difficulty": "hard",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    },
    {
      "word": "Infinite Jest",
      "difficulty": "hard",
      "description": "Reading clue; start with genre, then title theme or character journey."
    },
    {
      "word": "Jean-Paul Sartre",
      "difficulty": "hard",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "Walt Whitman",
      "difficulty": "hard",
      "description": "Literary reference; use writer identity and one famous plot point."
    },
    {
      "word": "DC Comics",
      "difficulty": "easy",
      "description": "Books/authors clue; describe author, storyline, and literary significance."
    }
  ],
  "Video Games": [
    {
      "word": "Mario",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Pac-Man",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Fortnite",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "The Legend of Zelda",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Minecraft",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Pokemon",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Tetris",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Super Mario Bros.",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Call of Duty",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Overwatch",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "World of Warcraft",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "FIFA",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "League of Legends",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Grand Theft Auto",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Counter-Strike",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Sonic the Hedgehog",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Final Fantasy",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Street Fighter",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Halo",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Doom",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Assassin's Creed",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Mortal Kombat",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "The Sims",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "StarCraft",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Half-Life",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Gears of War",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Portal",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Civilization",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "The Witcher",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Super Smash Bros.",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Star Wars Battlefront",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "PUBG",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "PlayerUnknown's Battlegrounds",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "God of War",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Rocket League",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "World of Tanks",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Fortnite Save the World",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Destiny",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Warframe",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Fortnite Battle Royale",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Cyberpunk 2077",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Candy Crush Saga",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Far Cry",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Animal Crossing",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Borderlands",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Zelda",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Sonic",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Pokémon",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Red Dead Redemption",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Dark Souls",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Bioshock",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Mass Effect",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Deus Ex",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Stardew Valley",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "The Last of Us",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Animal Crossing: New Horizons",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Call of Duty: Warzone",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Grand Theft Auto V",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Super Mario Odyssey",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "The Legend of Zelda: Breath of the Wild",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "The Witcher 3: Wild Hunt",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "The Sims 4",
      "difficulty": "easy",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Minecraft Dungeons",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Among Us",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Fall Guys",
      "difficulty": "easy",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Genshin Impact",
      "difficulty": "easy",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Hades",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Sekiro: Shadows Die Twice",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Ghost of Tsushima",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "CyberConnect2",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Naughty Dog",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Rockstar Games",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Valve Corporation",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Epic Games",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Riot Games",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Blizzard Entertainment",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Electronic Arts",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    },
    {
      "word": "Activision",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Bandai Namco Entertainment",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Capcom",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Konami",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Sega",
      "difficulty": "hard",
      "description": "Video-game clue; describe platform, gameplay loop, and objective."
    },
    {
      "word": "Square Enix",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Ubisoft",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Take-Two Interactive",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "Warner Bros. Interactive Entertainment",
      "difficulty": "hard",
      "description": "Gaming reference; start with genre and one iconic mechanic."
    },
    {
      "word": "ZeniMax Media",
      "difficulty": "hard",
      "description": "Game title clue; use character, world setting, or mission style."
    }
  ],
  "Cars": [
    {
      "word": "Sedan",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Convertible",
      "difficulty": "easy",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "SUV",
      "difficulty": "easy",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Coupe",
      "difficulty": "easy",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Hatchback",
      "difficulty": "easy",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Engine",
      "difficulty": "easy",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Transmission",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Headlights",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Wheels",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Steering wheel",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Differential",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Carburetor",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Catalytic converter",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Torque",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "RPM",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Drivetrain",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Suspension",
      "difficulty": "easy",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Chassis",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Fuel injection",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Turbocharger",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Aston Martin DB11",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Audi Q7",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Audi R8",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "BMW M3",
      "difficulty": "easy",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Bugatti Chiron",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Bugatti Veyron",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Chevrolet Camaro",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Chevrolet Corvette",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Ferrari",
      "difficulty": "easy",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Ferrari 458 Italia",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Ford Focus RS",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Ford Mustang",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Ford Mustang GT",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Honda Accord",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Honda Civic",
      "difficulty": "easy",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Hyundai Sonata",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Jeep Grand Cherokee",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Jeep Wrangler",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Lamborghini",
      "difficulty": "easy",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Lamborghini Aventador",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Land Rover Discovery",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Lexus RX",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Maserati GranTurismo",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "McLaren",
      "difficulty": "easy",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Mercedes-Benz",
      "difficulty": "easy",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Mercedes-Benz S-Class",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Mercedes-Benz GLE",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Nissan GT-R",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Pagani Huayra",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Porsche 911",
      "difficulty": "easy",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Range Rover Evoque",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Tesla Model S",
      "difficulty": "hard",
      "description": "Automotive clue; describe brand, vehicle type, and performance trait."
    },
    {
      "word": "Tesla Model X",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Tesla",
      "difficulty": "easy",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Toyota",
      "difficulty": "easy",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Toyota Supra",
      "difficulty": "hard",
      "description": "Car clue; start with body style, then speed, utility, or luxury profile."
    },
    {
      "word": "Volkswagen Beetle",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    },
    {
      "word": "Volvo XC60",
      "difficulty": "hard",
      "description": "Motor clue; use manufacturer context and standout design or engine feature."
    }
  ],
  "Fashion": [
    {
      "word": "Dress",
      "difficulty": "easy",
      "description": "One-piece garment for women that covers the body from shoulders to legs."
    },
    {
      "word": "Jeans",
      "difficulty": "easy",
      "description": "Durable trousers made from denim fabric."
    },
    {
      "word": "T-shirt",
      "difficulty": "easy",
      "description": "Short-sleeved casual top usually made of cotton."
    },
    {
      "word": "Sneakers",
      "difficulty": "easy",
      "description": "Comfortable shoes designed for sports or casual wear."
    },
    {
      "word": "Jacket",
      "difficulty": "easy",
      "description": "Outer garment worn on the upper body, usually with sleeves."
    },
    {
      "word": "Hat",
      "difficulty": "easy",
      "description": "Headwear worn for various purposes including protection and fashion."
    },
    {
      "word": "Sunglasses",
      "difficulty": "easy",
      "description": "Eyewear with darkened lenses to protect eyes from sunlight."
    },
    {
      "word": "Scarf",
      "difficulty": "easy",
      "description": "Long piece of cloth worn around the neck for warmth or style."
    },
    {
      "word": "Skirt",
      "difficulty": "easy",
      "description": "Garment worn from the waist down, covering the legs partially or fully."
    },
    {
      "word": "Suit",
      "difficulty": "easy",
      "description": "Formal outfit consisting of trousers and a matching jacket."
    },
    {
      "word": "Haute Couture",
      "difficulty": "hard",
      "description": "High-end fashion created for individual clients by top designers."
    },
    {
      "word": "Little Black Dress",
      "difficulty": "hard",
      "description": "Simple, elegant black dress that is versatile for various occasions."
    },
    {
      "word": "Power Suit",
      "difficulty": "hard",
      "description": "Formal suit designed to convey authority and confidence."
    },
    {
      "word": "Trench Coat",
      "difficulty": "hard",
      "description": "Long, waterproof coat with a belt and often double-breasted."
    },
    {
      "word": "Catwalk",
      "difficulty": "hard",
      "description": "Runway where models showcase clothing during fashion shows."
    },
    {
      "word": "Fashion Week",
      "difficulty": "hard",
      "description": "Event showcasing the latest fashion designs and trends over several days."
    },
    {
      "word": "Street Style",
      "difficulty": "hard",
      "description": "Fashion trends seen in everyday wear on city streets."
    },
    {
      "word": "Capsule Wardrobe",
      "difficulty": "hard",
      "description": "Collection of essential clothing items that can be mixed and matched."
    },
    {
      "word": "Vintage Clothing",
      "difficulty": "hard",
      "description": "Clothing from previous decades, often valued for its style or rarity."
    },
    {
      "word": "Sustainable Fashion",
      "difficulty": "hard",
      "description": "Fashion practices focused on reducing environmental impact and promoting ethical production."
    },
    {
      "word": "Streetwear",
      "difficulty": "hard",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Sneakerhead",
      "difficulty": "easy",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Tailor",
      "difficulty": "easy",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Runway",
      "difficulty": "hard",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Lookbook",
      "difficulty": "easy",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Bomber Jacket",
      "difficulty": "hard",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Denim Jacket",
      "difficulty": "easy",
      "description": "Fashion clue; describe garment type, style context, and how it is worn."
    },
    {
      "word": "Polo Shirt",
      "difficulty": "easy",
      "description": "Fashion clue; describe garment type, style context, and how it is worn."
    },
    {
      "word": "Chinos",
      "difficulty": "easy",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Turtleneck",
      "difficulty": "hard",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Pleated Skirt",
      "difficulty": "easy",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Pencil Skirt",
      "difficulty": "easy",
      "description": "Fashion clue; describe garment type, style context, and how it is worn."
    },
    {
      "word": "Maxi Dress",
      "difficulty": "easy",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Cocktail Dress",
      "difficulty": "hard",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Jumpsuit",
      "difficulty": "easy",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Blazer",
      "difficulty": "easy",
      "description": "Fashion clue; describe garment type, style context, and how it is worn."
    },
    {
      "word": "Loafers",
      "difficulty": "easy",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Ankle Boots",
      "difficulty": "hard",
      "description": "Fashion clue; describe garment type, style context, and how it is worn."
    },
    {
      "word": "Stiletto",
      "difficulty": "easy",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Crossbody Bag",
      "difficulty": "easy",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Tote Bag",
      "difficulty": "easy",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Clutch Bag",
      "difficulty": "hard",
      "description": "Style reference; start with look, occasion, and signature design details."
    },
    {
      "word": "Bucket Hat",
      "difficulty": "easy",
      "description": "Fashion clue; describe garment type, style context, and how it is worn."
    },
    {
      "word": "Beanie",
      "difficulty": "easy",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Silk Scarf",
      "difficulty": "easy",
      "description": "Fashion clue; describe garment type, style context, and how it is worn."
    },
    {
      "word": "Leather Jacket",
      "difficulty": "hard",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    },
    {
      "word": "Seamstress",
      "difficulty": "easy",
      "description": "Clothing clue; use material, fit, and cultural trend association."
    }
  ],
  "Miscellaneous": [
    {
      "word": "Mzansi",
      "difficulty": "easy",
      "description": "Slang term for South Africa."
    },
    {
      "word": "Vuvuzela",
      "difficulty": "easy",
      "description": "Plastic horn popularized during the 2010 FIFA World Cup."
    },
    {
      "word": "Jacaranda Trees",
      "difficulty": "hard",
      "description": "Trees that bloom purple flowers, particularly famous in Pretoria."
    },
    {
      "word": "Braamfontein",
      "difficulty": "hard",
      "description": "Cultural precinct in Johannesburg."
    },
    {
      "word": "Samp and Beans",
      "difficulty": "hard",
      "description": "Traditional South African dish."
    },
    {
      "word": "Sunfoil",
      "difficulty": "easy",
      "description": "Popular cooking oil brand."
    },
    {
      "word": "Ratanga Junction",
      "difficulty": "easy",
      "description": "Former amusement park in Cape Town."
    },
    {
      "word": "Pilanesberg National Park",
      "difficulty": "hard",
      "description": "Game reserve located in North West Province."
    },
    {
      "word": "Klipdrift",
      "difficulty": "hard",
      "description": "Famous South African brandy."
    },
    {
      "word": "Gold Reef City",
      "difficulty": "easy",
      "description": "Amusement park and historical gold mine in Johannesburg."
    },
    {
      "word": "Bo-Kaap",
      "difficulty": "easy",
      "description": "Colorful neighborhood in Cape Town known for its Cape Malay culture."
    },
    {
      "word": "Rand",
      "difficulty": "easy",
      "description": "The currency of South Africa."
    },
    {
      "word": "Minibus Taxis",
      "difficulty": "easy",
      "description": "Common mode of public transport."
    },
    {
      "word": "Cape Malay Cuisine",
      "difficulty": "hard",
      "description": "Unique culinary tradition combining Indonesian, Malaysian, and African influences."
    },
    {
      "word": "SABC",
      "difficulty": "easy",
      "description": "Public broadcaster."
    },
    {
      "word": "Cradle of Humankind",
      "difficulty": "hard",
      "description": "UNESCO World Heritage Site known for its fossil sites."
    },
    {
      "word": "National Arts Festival",
      "difficulty": "hard",
      "description": "Major arts festival held annually in Grahamstown."
    },
    {
      "word": "Hermanus Whale Festival",
      "difficulty": "hard",
      "description": "Annual celebration of whale watching season."
    },
    {
      "word": "Knysna Oyster Festival",
      "difficulty": "hard",
      "description": "Annual event celebrating oysters and seafood."
    },
    {
      "word": "Karoo Lamb",
      "difficulty": "hard",
      "description": "High-quality lamb meat from the Karoo region."
    },
    {
      "word": "Shweshwe Fabric",
      "difficulty": "hard",
      "description": "Traditional printed cotton fabric popular in South African fashion."
    },
    {
      "word": "SANRAL",
      "difficulty": "hard",
      "description": "South African National Roads Agency Limited."
    },
    {
      "word": "Woolworths",
      "difficulty": "easy",
      "description": "High-end South African retail chain."
    },
    {
      "word": "Mr Price",
      "difficulty": "easy",
      "description": "Popular South African retail chain."
    },
    {
      "word": "Pep Stores",
      "difficulty": "easy",
      "description": "Large retail chain."
    },
    {
      "word": "Shoprite",
      "difficulty": "easy",
      "description": "Largest food retailer in Africa."
    },
    {
      "word": "Pick n Pay",
      "difficulty": "easy",
      "description": "Major supermarket chain."
    },
    {
      "word": "Spar",
      "difficulty": "easy",
      "description": "International supermarket franchise with numerous outlets in South Africa."
    },
    {
      "word": "Massmart",
      "difficulty": "hard",
      "description": "Retail group that owns Game, Makro, and Builders Warehouse."
    },
    {
      "word": "Clicks",
      "difficulty": "easy",
      "description": "Leading pharmacy, health, and beauty retailer."
    },
    {
      "word": "Dis-Chem",
      "difficulty": "easy",
      "description": "Prominent pharmaceutical and health retailer."
    },
    {
      "word": "The Foschini Group",
      "difficulty": "hard",
      "description": "Retail group with numerous fashion brands."
    },
    {
      "word": "First National Bank",
      "difficulty": "easy",
      "description": "Major South African bank."
    },
    {
      "word": "Naspers",
      "difficulty": "hard",
      "description": "South African multinational internet and media group."
    },
    {
      "word": "Bidvest",
      "difficulty": "hard",
      "description": "South African services, trading, and distribution company."
    },
    {
      "word": "Sanlam",
      "difficulty": "easy",
      "description": "Leading financial services group."
    },
    {
      "word": "Old Mutual",
      "difficulty": "hard",
      "description": "Major insurance and financial services company."
    },
    {
      "word": "Liberty",
      "difficulty": "easy",
      "description": "Financial services group specializing in life insurance."
    },
    {
      "word": "Hollard",
      "difficulty": "hard",
      "description": "Insurance provider offering a range of products."
    },
    {
      "word": "Santam",
      "difficulty": "hard",
      "description": "South Africa's largest general insurer."
    },
    {
      "word": "Takealot",
      "difficulty": "easy",
      "description": "South Africa's largest online retailer."
    },
    {
      "word": "Festival",
      "difficulty": "hard",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Ceremony",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Tradition",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Innovation",
      "difficulty": "easy",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Debate",
      "difficulty": "hard",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Puzzle",
      "difficulty": "easy",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Masterpiece",
      "difficulty": "easy",
      "description": "Mixed-category clue; use everyday context and distinguishing feature."
    },
    {
      "word": "Landmark",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Milestone",
      "difficulty": "hard",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Breakthrough",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Negotiation",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Strategy",
      "difficulty": "easy",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Blueprint",
      "difficulty": "hard",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Prototype",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Headline",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Timeline",
      "difficulty": "easy",
      "description": "Mixed-category clue; use everyday context and distinguishing feature."
    },
    {
      "word": "Checklist",
      "difficulty": "hard",
      "description": "Mixed-category clue; use everyday context and distinguishing feature."
    },
    {
      "word": "Goalpost",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Backstory",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Wildcard",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Countdown",
      "difficulty": "hard",
      "description": "Mixed-category clue; use everyday context and distinguishing feature."
    },
    {
      "word": "Crowd",
      "difficulty": "easy",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Spotlight",
      "difficulty": "easy",
      "description": "Mixed-category clue; use everyday context and distinguishing feature."
    },
    {
      "word": "Compass",
      "difficulty": "easy",
      "description": "Mixed-category clue; use everyday context and distinguishing feature."
    },
    {
      "word": "Lifeline",
      "difficulty": "hard",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Mic Drop",
      "difficulty": "easy",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Curveball",
      "difficulty": "easy",
      "description": "General clue; describe function, context, and one memorable trait."
    },
    {
      "word": "Highlight Reel",
      "difficulty": "easy",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Fast Track",
      "difficulty": "hard",
      "description": "Broad-topic reference; start with category, then a practical use case."
    },
    {
      "word": "Home Stretch",
      "difficulty": "easy",
      "description": "Mixed-category clue; use everyday context and distinguishing feature."
    }
  ],
  "Business, Brands, and Companies": [
    {
      "word": "Apple",
      "difficulty": "easy",
      "description": "Tech company behind the iPhone, Mac, and App Store ecosystem."
    },
    {
      "word": "Microsoft",
      "difficulty": "easy",
      "description": "Software giant known for Windows, Office, Azure, and Xbox."
    },
    {
      "word": "Google",
      "difficulty": "easy",
      "description": "Search-engine company behind Android, YouTube, and Gmail."
    },
    {
      "word": "Amazon",
      "difficulty": "easy",
      "description": "E-commerce giant also known for AWS cloud services."
    },
    {
      "word": "Meta",
      "difficulty": "easy",
      "description": "Parent company of Facebook, Instagram, WhatsApp, and Threads."
    },
    {
      "word": "Tesla",
      "difficulty": "easy",
      "description": "Electric-car brand led by Elon Musk, known for Model S and Model 3."
    },
    {
      "word": "Samsung",
      "difficulty": "easy",
      "description": "Electronics brand known for Galaxy phones, TVs, and appliances."
    },
    {
      "word": "Sony",
      "difficulty": "easy",
      "description": "Japanese brand behind PlayStation, cameras, and entertainment studios."
    },
    {
      "word": "Intel",
      "difficulty": "easy",
      "description": "Semiconductor company known for PC processors and 'Intel Inside'."
    },
    {
      "word": "Nvidia",
      "difficulty": "easy",
      "description": "Chipmaker famous for GeForce GPUs and AI hardware."
    },
    {
      "word": "IBM",
      "difficulty": "easy",
      "description": "Enterprise-tech company nicknamed 'Big Blue'."
    },
    {
      "word": "Oracle",
      "difficulty": "easy",
      "description": "Enterprise software company known for databases and cloud systems."
    },
    {
      "word": "Adobe",
      "difficulty": "easy",
      "description": "Software company behind Photoshop, Illustrator, and Acrobat PDF."
    },
    {
      "word": "Salesforce",
      "difficulty": "hard",
      "description": "Cloud company known for CRM software used by sales teams."
    },
    {
      "word": "Cisco",
      "difficulty": "hard",
      "description": "Networking company known for routers, switches, and enterprise infrastructure."
    },
    {
      "word": "Qualcomm",
      "difficulty": "hard",
      "description": "Chip company known for Snapdragon mobile processors and wireless tech."
    },
    {
      "word": "SpaceX",
      "difficulty": "hard",
      "description": "Private aerospace company known for Falcon rockets and Starlink."
    },
    {
      "word": "OpenAI",
      "difficulty": "easy",
      "description": "AI company behind ChatGPT and large language models."
    },
    {
      "word": "Netflix",
      "difficulty": "easy",
      "description": "Streaming platform known for movies, series, and original content."
    },
    {
      "word": "Disney",
      "difficulty": "easy",
      "description": "Entertainment company behind Disney, Pixar, Marvel, and Star Wars."
    },
    {
      "word": "Nike",
      "difficulty": "easy",
      "description": "Sportswear brand known for the Swoosh logo and Air Jordan line."
    },
    {
      "word": "Adidas",
      "difficulty": "easy",
      "description": "Sportswear brand recognized by its three-stripe logo."
    },
    {
      "word": "Puma",
      "difficulty": "easy",
      "description": "Sportswear brand named after a big cat, focused on footwear and apparel."
    },
    {
      "word": "Coca-Cola",
      "difficulty": "easy",
      "description": "Global soft-drink company known for its flagship cola."
    },
    {
      "word": "Pepsi",
      "difficulty": "easy",
      "description": "Soft-drink brand that is Coca-Cola's longtime rival."
    },
    {
      "word": "Starbucks",
      "difficulty": "easy",
      "description": "Coffeehouse chain known for espresso drinks and green mermaid logo."
    },
    {
      "word": "McDonald's",
      "difficulty": "easy",
      "description": "Fast-food chain known for burgers, fries, and Golden Arches."
    },
    {
      "word": "KFC",
      "difficulty": "easy",
      "description": "Fast-food chain known for fried chicken and Colonel Sanders."
    },
    {
      "word": "Burger King",
      "difficulty": "easy",
      "description": "Fast-food chain known for the Whopper burger."
    },
    {
      "word": "Subway",
      "difficulty": "easy",
      "description": "Sandwich franchise where customers choose breads, fillings, and toppings."
    },
    {
      "word": "Domino's",
      "difficulty": "easy",
      "description": "Pizza chain known for delivery-focused ordering and app deals."
    },
    {
      "word": "Pizza Hut",
      "difficulty": "easy",
      "description": "Pizza chain known for pan pizzas and dine-in or delivery options."
    },
    {
      "word": "Uber",
      "difficulty": "easy",
      "description": "Ride-hailing app used to book private transport by phone."
    },
    {
      "word": "Airbnb",
      "difficulty": "easy",
      "description": "Platform for booking short-term stays in homes and apartments."
    },
    {
      "word": "PayPal",
      "difficulty": "easy",
      "description": "Digital payments platform used for online purchases and transfers."
    },
    {
      "word": "Visa",
      "difficulty": "easy",
      "description": "Global card-payment network used by banks and merchants."
    },
    {
      "word": "Mastercard",
      "difficulty": "hard",
      "description": "Global card-payment network and Visa competitor."
    },
    {
      "word": "American Express",
      "difficulty": "hard",
      "description": "Payment-card company known for premium cards and rewards."
    },
    {
      "word": "JPMorgan Chase",
      "difficulty": "hard",
      "description": "Major US bank with investment banking and retail banking services."
    },
    {
      "word": "Goldman Sachs",
      "difficulty": "hard",
      "description": "Investment bank known for trading, advisory, and asset management."
    },
    {
      "word": "Morgan Stanley",
      "difficulty": "hard",
      "description": "Investment bank known for wealth management and capital markets."
    },
    {
      "word": "HSBC",
      "difficulty": "hard",
      "description": "International bank with major operations across Europe and Asia."
    },
    {
      "word": "Barclays",
      "difficulty": "hard",
      "description": "UK banking group known for retail and investment banking."
    },
    {
      "word": "Shell",
      "difficulty": "easy",
      "description": "Global energy brand known for fuel stations and shell logo."
    },
    {
      "word": "BP",
      "difficulty": "hard",
      "description": "Energy company formerly called British Petroleum, active in oil and gas."
    },
    {
      "word": "ExxonMobil",
      "difficulty": "hard",
      "description": "Major US oil and gas company formed by Exxon and Mobil merger."
    },
    {
      "word": "Chevron",
      "difficulty": "easy",
      "description": "US energy company active in oil, gas, and fuel retail."
    },
    {
      "word": "TotalEnergies",
      "difficulty": "hard",
      "description": "French energy company expanding from oil into renewables."
    },
    {
      "word": "Toyota",
      "difficulty": "easy",
      "description": "Japanese automaker known for Corolla, Hilux, and hybrid cars."
    },
    {
      "word": "Volkswagen",
      "difficulty": "easy",
      "description": "German automaker known for VW-branded passenger cars."
    },
    {
      "word": "BMW",
      "difficulty": "easy",
      "description": "German luxury-car brand known for sporty sedans and SUVs."
    },
    {
      "word": "Mercedes-Benz",
      "difficulty": "easy",
      "description": "German luxury-car brand recognized by the three-pointed star."
    },
    {
      "word": "Audi",
      "difficulty": "easy",
      "description": "German premium-car brand recognized by four-ring logo."
    },
    {
      "word": "Ferrari",
      "difficulty": "easy",
      "description": "Italian supercar brand known for racing heritage and prancing horse."
    },
    {
      "word": "Porsche",
      "difficulty": "easy",
      "description": "German sports-car brand famous for the 911 model."
    },
    {
      "word": "Ford",
      "difficulty": "easy",
      "description": "US automaker known for the Mustang and F-Series trucks."
    },
    {
      "word": "General Motors",
      "difficulty": "hard",
      "description": "US auto group behind brands like Chevrolet and Cadillac."
    },
    {
      "word": "Boeing",
      "difficulty": "easy",
      "description": "Aerospace company that manufactures commercial and military aircraft."
    },
    {
      "word": "Airbus",
      "difficulty": "easy",
      "description": "European aircraft manufacturer and Boeing's main competitor."
    },
    {
      "word": "Lockheed Martin",
      "difficulty": "hard",
      "description": "Defense contractor known for military aircraft and aerospace systems."
    },
    {
      "word": "Siemens",
      "difficulty": "hard",
      "description": "German engineering company active in industry, energy, and transport tech."
    },
    {
      "word": "Bosch",
      "difficulty": "easy",
      "description": "Engineering brand known for tools, appliances, and automotive parts."
    },
    {
      "word": "IKEA",
      "difficulty": "easy",
      "description": "Furniture retailer known for flat-pack products and self-assembly."
    },
    {
      "word": "Walmart",
      "difficulty": "easy",
      "description": "Large retail chain known for discount pricing and huge stores."
    },
    {
      "word": "Costco",
      "difficulty": "easy",
      "description": "Membership warehouse retailer known for bulk buying."
    },
    {
      "word": "Target",
      "difficulty": "easy",
      "description": "US retail chain recognized by red bullseye branding."
    },
    {
      "word": "eBay",
      "difficulty": "easy",
      "description": "Online marketplace known for auctions and second-hand listings."
    },
    {
      "word": "Alibaba",
      "difficulty": "easy",
      "description": "Chinese e-commerce company serving retail and wholesale markets."
    },
    {
      "word": "Tencent",
      "difficulty": "hard",
      "description": "Chinese tech giant known for WeChat, gaming, and digital services."
    },
    {
      "word": "ByteDance",
      "difficulty": "hard",
      "description": "Tech company that owns TikTok and related content platforms."
    },
    {
      "word": "TSMC",
      "difficulty": "hard",
      "description": "Taiwan semiconductor foundry that manufactures chips for many global brands."
    },
    {
      "word": "ASML",
      "difficulty": "hard",
      "description": "Dutch company making advanced lithography machines for chip production."
    },
    {
      "word": "Zara",
      "difficulty": "easy",
      "description": "Fast-fashion brand known for rapid design-to-store cycles."
    },
    {
      "word": "H&M",
      "difficulty": "easy",
      "description": "Global fast-fashion retailer offering affordable seasonal clothing."
    },
    {
      "word": "Uniqlo",
      "difficulty": "easy",
      "description": "Japanese clothing brand known for minimalist basics and Heattech."
    },
    {
      "word": "LVMH",
      "difficulty": "hard",
      "description": "Luxury group owning brands like Louis Vuitton, Dior, and Moet."
    },
    {
      "word": "Gucci",
      "difficulty": "hard",
      "description": "Italian luxury fashion brand known for handbags and monogram style."
    },
    {
      "word": "Prada",
      "difficulty": "easy",
      "description": "Italian luxury-fashion house known for premium bags and apparel."
    },
    {
      "word": "Rolex",
      "difficulty": "easy",
      "description": "Swiss luxury watch brand associated with status and precision."
    },
    {
      "word": "Cartier",
      "difficulty": "easy",
      "description": "French luxury brand known for jewelry and premium watches."
    },
    {
      "word": "Samsung Electronics",
      "difficulty": "hard",
      "description": "Core Samsung division making phones, TVs, chips, and devices."
    },
    {
      "word": "Shopify",
      "difficulty": "hard",
      "description": "E-commerce platform that helps businesses build online stores."
    },
    {
      "word": "Stripe",
      "difficulty": "hard",
      "description": "Payments infrastructure company used by apps and online businesses."
    },
    {
      "word": "LinkedIn",
      "difficulty": "easy",
      "description": "Professional networking platform used for jobs and career profiles."
    },
    {
      "word": "YouTube",
      "difficulty": "easy",
      "description": "Video platform where users upload, watch, and monetize content."
    },
    {
      "word": "TikTok",
      "difficulty": "easy",
      "description": "Short-video social platform driven by viral trends and creators."
    },
    {
      "word": "Spotify",
      "difficulty": "easy",
      "description": "Music-streaming service with playlists, podcasts, and recommendations."
    },
    {
      "word": "Snapchat",
      "difficulty": "easy",
      "description": "Social app known for disappearing messages and camera filters."
    },
    {
      "word": "Red Bull",
      "difficulty": "easy",
      "description": "Energy-drink brand heavily associated with extreme-sports sponsorships."
    },
    {
      "word": "Nando's",
      "difficulty": "easy",
      "description": "Restaurant chain famous for peri-peri flame-grilled chicken."
    }
  ],
  "Politics and Government": [
    {
      "word": "Democracy",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Republic",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Constitution",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Parliament",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Congress",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Senate",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Cabinet",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Prime Minister",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "President",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Vice President",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Election",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Ballot Box",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Referendum",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Coalition Government",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Opposition Party",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Campaign Trail",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Manifesto",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Term Limit",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Supreme Court",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Separation of Powers",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Checks and Balances",
      "difficulty": "hard",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Federalism",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Monarchy",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Dictatorship",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Sanctions",
      "difficulty": "hard",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Embargo",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Diplomacy",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Ambassador",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "United Nations",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Security Council",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "NATO",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "African Union",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "BRICS",
      "difficulty": "hard",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "G20",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Summit",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "State of the Nation",
      "difficulty": "hard",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Impeachment",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Filibuster",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Gerrymandering",
      "difficulty": "hard",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Census",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Public Policy",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Civil Service",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Lobbying",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Whip",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Municipal Council",
      "difficulty": "hard",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Mayor",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Governor",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Ministry of Finance",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Treasury",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Budget Speech",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Tax Reform",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Trade Agreement",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Bilateral Talks",
      "difficulty": "hard",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Peace Treaty",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Ceasefire",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Cabinet Reshuffle",
      "difficulty": "hard",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Foreign Minister",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Interior Minister",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Defense Minister",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Campaign Donation",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Polling Station",
      "difficulty": "hard",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Voter Registration",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Electoral Commission",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Exit Poll",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "By-election",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Coalition Talks",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Minority Government",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Recall Election",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Martial Law",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Human Rights Commission",
      "difficulty": "hard",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Ombudsman",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "White House",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Downing Street",
      "difficulty": "hard",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "The Kremlin",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Union Buildings",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "National Assembly",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "House of Commons",
      "difficulty": "hard",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "European Parliament",
      "difficulty": "easy",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Schengen Area",
      "difficulty": "hard",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Brexit",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Public Protector",
      "difficulty": "hard",
      "description": "Appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Constitutional Court",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "National Cabinet",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Speaker of Parliament",
      "difficulty": "easy",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Motion of No Confidence",
      "difficulty": "hard",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Party List",
      "difficulty": "easy",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Electoral Roll",
      "difficulty": "hard",
      "description": "A politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Border Policy",
      "difficulty": "easy",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Public Hearing",
      "difficulty": "hard",
      "description": "A governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Diplomatic Mission",
      "difficulty": "hard",
      "description": "Commonly used when describing public policy, leadership, or state systems."
    }
  ],
  "Household and Everyday Objects": [
    {
      "word": "Sofa",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Armchair",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Coffee Table",
      "difficulty": "easy",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Dining Table",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Bedframe",
      "difficulty": "hard",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Mattress",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Pillow",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Blanket",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Duvet",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Wardrobe",
      "difficulty": "hard",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Hanger",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Laundry Basket",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Iron",
      "difficulty": "hard",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Ironing Board",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Vacuum Cleaner",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Mop",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Broom",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Dustpan",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Bucket",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Dishwasher",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Microwave",
      "difficulty": "hard",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Toaster",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Blender",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Kettle",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Pressure Cooker",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Frying Pan",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Saucepan",
      "difficulty": "easy",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Cutting Board",
      "difficulty": "easy",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Chef's Knife",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Peeler",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Grater",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Colander",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Measuring Cup",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Tupperware",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Thermos",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Water Bottle",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Mug",
      "difficulty": "hard",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Plate",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Bowl",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Fork",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Spoon",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Knife",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Chopsticks",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Napkin",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Trash Can",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Recycling Bin",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Light Bulb",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Extension Cord",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Power Strip",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Remote Control",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Alarm Clock",
      "difficulty": "easy",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Wall Clock",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Mirror",
      "difficulty": "hard",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Shower Curtain",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Toothbrush",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Toothpaste",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Dental Floss",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Hair Dryer",
      "difficulty": "easy",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Razor",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Shampoo",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Conditioner",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Soap Bar",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Hand Sanitizer",
      "difficulty": "easy",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "First Aid Kit",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Bandage",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Tape Measure",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Screwdriver",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Hammer",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Pliers",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Wrench",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Drill",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Nail",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Screw",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Tape",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Glue Gun",
      "difficulty": "hard",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Scissors",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Stapler",
      "difficulty": "hard",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Paper Clip",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Notebook",
      "difficulty": "easy",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Pen",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Pencil",
      "difficulty": "hard",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Eraser",
      "difficulty": "easy",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Highlighter",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Backpack",
      "difficulty": "easy",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Umbrella",
      "difficulty": "hard",
      "description": "An everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Keychain",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Wallet",
      "difficulty": "easy",
      "description": "A familiar object linked to daily life and household routines."
    },
    {
      "word": "Sunglasses",
      "difficulty": "easy",
      "description": "A common household object people use regularly at home."
    },
    {
      "word": "Reusable Bag",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    },
    {
      "word": "Flashlight",
      "difficulty": "hard",
      "description": "A practical everyday item found in many homes."
    }
  ],
  "Professions and Workplaces": [
    {
      "word": "Doctor",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Nurse",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Surgeon",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Pharmacist",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Dentist",
      "difficulty": "hard",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Paramedic",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Physiotherapist",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Veterinarian",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Teacher",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Principal",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Professor",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Lecturer",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Accountant",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Auditor",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Financial Analyst",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Banker",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Investment Broker",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Lawyer",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Prosecutor",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Judge",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Paralegal",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Police Officer",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Detective",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Firefighter",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Soldier",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Pilot",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Flight Attendant",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Air Traffic Controller",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Mechanic",
      "difficulty": "hard",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Electrician",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Plumber",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Carpenter",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Welder",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Civil Engineer",
      "difficulty": "hard",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Architect",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Surveyor",
      "difficulty": "hard",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Software Engineer",
      "difficulty": "hard",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Data Scientist",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Cybersecurity Analyst",
      "difficulty": "hard",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "UX Designer",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Graphic Designer",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Photographer",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Journalist",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Editor",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "News Anchor",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Radio Host",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Podcaster",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Chef",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Baker",
      "difficulty": "hard",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Waiter",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Barista",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Farmer",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Fisherman",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Miner",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Geologist",
      "difficulty": "hard",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Factory Worker",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Machine Operator",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Forklift Driver",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Truck Driver",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Taxi Driver",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Bus Driver",
      "difficulty": "hard",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Train Conductor",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Logistician",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Warehouse Manager",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Retail Cashier",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Store Manager",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Sales Representative",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Real Estate Agent",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Insurance Broker",
      "difficulty": "hard",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Social Worker",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Psychologist",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Counsellor",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Therapist",
      "difficulty": "hard",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Event Planner",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Wedding Planner",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Interior Designer",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Fashion Designer",
      "difficulty": "hard",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Actor",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    },
    {
      "word": "Music Producer",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "DJ",
      "difficulty": "easy",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Choreographer",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Personal Trainer",
      "difficulty": "easy",
      "description": "Used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Coach",
      "difficulty": "easy",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Referee",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Scientist",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Lab Technician",
      "difficulty": "hard",
      "description": "A job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Researcher",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Museum Curator",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Librarian",
      "difficulty": "hard",
      "description": "A profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Park Ranger",
      "difficulty": "easy",
      "description": "A role people describe through what the worker does each day."
    }
  ],
  "Travel, Transport, and Aviation": [
    {
      "word": "Passport",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Visa",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Boarding Pass",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Check-in",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Carry-on",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Suitcase",
      "difficulty": "easy",
      "description": "Transport reference; start with mode of movement and passenger/logistics use."
    },
    {
      "word": "Itinerary",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Layover",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Terminal",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Gate",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Runway",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Air Traffic Control",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Cockpit",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Turbulence",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Jet Lag",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Black Box",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Emergency Exit",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Seatbelt Sign",
      "difficulty": "easy",
      "description": "Travel clue; describe where it appears in a journey and what function it serves."
    },
    {
      "word": "Economy Class",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Business Class",
      "difficulty": "easy",
      "description": "Travel clue; describe where it appears in a journey and what function it serves."
    },
    {
      "word": "First Class",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Frequent Flyer",
      "difficulty": "hard",
      "description": "Travel clue; describe where it appears in a journey and what function it serves."
    },
    {
      "word": "Customs",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Immigration",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Duty Free",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Car Rental",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Road Trip",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Toll Booth",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Roundabout",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Traffic Jam",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Carpool",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "GPS",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Metro",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Tram",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "High-speed Rail",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Bullet Train",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Platform",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Ticket Inspector",
      "difficulty": "easy",
      "description": "Travel clue; describe where it appears in a journey and what function it serves."
    },
    {
      "word": "Ferry",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Cruise Ship",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Lifeboat",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Port",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Harbor",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Canal",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Bridge",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Tunnel",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Taxi Rank",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Ride-share",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "E-hailing",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Bicycle Lane",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Helmet",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Scooter",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Motorbike",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Caravan",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "RV",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Camping Site",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Hostel",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Guesthouse",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Bed and Breakfast",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Hotel Concierge",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Room Service",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Check-out",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Travel Insurance",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Currency Exchange",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Time Zone",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Red-eye Flight",
      "difficulty": "hard",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Stopover",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Charter Flight",
      "difficulty": "hard",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    },
    {
      "word": "Seaplane",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Helicopter",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Hot Air Balloon",
      "difficulty": "easy",
      "description": "Travel clue; describe where it appears in a journey and what function it serves."
    },
    {
      "word": "Parachute",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Border Crossing",
      "difficulty": "easy",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Embarkation",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Disembarkation",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Transit Lounge",
      "difficulty": "hard",
      "description": "Transport reference; start with mode of movement and passenger/logistics use."
    },
    {
      "word": "Window Seat",
      "difficulty": "easy",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Aisle Seat",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Overhead Bin",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Baggage Claim",
      "difficulty": "hard",
      "description": "A travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Lost Luggage",
      "difficulty": "hard",
      "description": "Appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Travel Adapter",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Power Bank",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "City Pass",
      "difficulty": "hard",
      "description": "Travel clue; describe where it appears in a journey and what function it serves."
    },
    {
      "word": "Tourist Trap",
      "difficulty": "hard",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Souvenir Shop",
      "difficulty": "easy",
      "description": "A transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Travel Blog",
      "difficulty": "easy",
      "description": "Travel clue; describe where it appears in a journey and what function it serves."
    },
    {
      "word": "Backpacker Trail",
      "difficulty": "hard",
      "description": "Transport reference; start with mode of movement and passenger/logistics use."
    },
    {
      "word": "Safari Vehicle",
      "difficulty": "easy",
      "description": "Aviation/transit clue; use route context, ticketing, or onboard process."
    }
  ],
  "Internet Culture and Social Media": [
    {
      "word": "Meme",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Viral Video",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Hashtag",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Trending Topic",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Influencer",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Content Creator",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Livestream",
      "difficulty": "easy",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Reaction Video",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Podcast Clip",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Short-form Video",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Reel",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Story",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Thread",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "DM",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Comment Section",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Like Button",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Subscribe Button",
      "difficulty": "hard",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Notification Bell",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Algorithm",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "For You Page",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Ratioed",
      "difficulty": "hard",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Screenshot",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Screen Recording",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Clickbait",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Thumbnail",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Unboxing",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Challenge",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Dance Trend",
      "difficulty": "easy",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "POV",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Life Hack",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Tutorial",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Vlog",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "GRWM",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Duet",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Stitch",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Filter",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Face Swap",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "AR Lens",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "GIF",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Emoji",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Sticker Pack",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Discord Server",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Subreddit",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "AMA",
      "difficulty": "hard",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Moderator",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Shadowban",
      "difficulty": "hard",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Troll",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Bot Account",
      "difficulty": "easy",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Fact-check",
      "difficulty": "hard",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Deepfake",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Catfish",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Hot Take",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Clapback",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Cancel Culture",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Stan",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Fandom",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Fan Edit",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Shipping",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Spoiler Alert",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Binge-watch",
      "difficulty": "easy",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Watch Party",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Stream Sniping",
      "difficulty": "hard",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Speedrun Clip",
      "difficulty": "easy",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Esports Highlight",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Patch Notes",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "NFT Avatar",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Blue Tick",
      "difficulty": "easy",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Verification Badge",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Creator Fund",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Monetization",
      "difficulty": "hard",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Paywall",
      "difficulty": "hard",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Newsletter",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Crowdfunding",
      "difficulty": "hard",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Patreon",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Ko-fi",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Link in Bio",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Swipe Up",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "QR Code",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Geotag",
      "difficulty": "easy",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Selfie",
      "difficulty": "easy",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Ring Light",
      "difficulty": "hard",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Green Screen",
      "difficulty": "easy",
      "description": "A modern online term often used in social media and creator spaces."
    },
    {
      "word": "Webcam",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Mic Check",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Lag Spike",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Ping",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Cloud Backup",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Password Manager",
      "difficulty": "easy",
      "description": "An internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Community Guidelines",
      "difficulty": "hard",
      "description": "A digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Mute Button",
      "difficulty": "easy",
      "description": "Appears in clues about viral content, digital communities, or platform behavior."
    }
  ],
  "Crime, Law, and Justice": [
    {
      "word": "Fingerprint",
      "difficulty": "hard",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "DNA Evidence",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Alibi",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Motive",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Suspect",
      "difficulty": "hard",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Witness",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Testimony",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Cross-examination",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Jury",
      "difficulty": "hard",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Verdict",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Guilty",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Not Guilty",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Mistrial",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Plea Bargain",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Bail",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Parole",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Probation",
      "difficulty": "hard",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Sentencing",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Subpoena",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Warrant",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Arrest",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Handcuffs",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Mugshot",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Interrogation",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Surveillance",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Wiretap",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Undercover",
      "difficulty": "easy",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Sting Operation",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Crime Scene",
      "difficulty": "hard",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Forensics",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Autopsy",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Homicide",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Manslaughter",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Burglary",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Robbery",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Pickpocket",
      "difficulty": "easy",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Fraud",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Embezzlement",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Money Laundering",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Tax Evasion",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Insider Trading",
      "difficulty": "hard",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Cybercrime",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Identity Theft",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Ransomware",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Kidnapping",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Blackmail",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Extortion",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Smuggling",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Poaching",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Arson",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Vandalism",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Trespassing",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Perjury",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Obstruction of Justice",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Contempt of Court",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Civil Case",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Class Action",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Small Claims Court",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Appeal",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Habeas Corpus",
      "difficulty": "hard",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Presumption of Innocence",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Statute of Limitations",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Double Jeopardy",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Judicial Review",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Public Defender",
      "difficulty": "hard",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "District Attorney",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Defense Attorney",
      "difficulty": "hard",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Court Clerk",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Bailiff",
      "difficulty": "hard",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Prison Warden",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Solitary Confinement",
      "difficulty": "easy",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Community Service",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "House Arrest",
      "difficulty": "hard",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Juvenile Court",
      "difficulty": "hard",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Restraining Order",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Search and Seizure",
      "difficulty": "hard",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Human Trafficking",
      "difficulty": "hard",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Organized Crime",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Cartel",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Whistleblower",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Corruption",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Bribery",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Riot Police",
      "difficulty": "easy",
      "description": "Appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Curfew",
      "difficulty": "easy",
      "description": "A legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Case Docket",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Chain of Custody",
      "difficulty": "hard",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Cold Case",
      "difficulty": "easy",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Evidence Locker",
      "difficulty": "easy",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Acquittal",
      "difficulty": "hard",
      "description": "A law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Conviction",
      "difficulty": "easy",
      "description": "A justice-system clue tied to investigations, courts, or legal outcomes."
    }
  ],
  "Africa: People, Places, and Events": [
    {
      "word": "Patrice Lumumba",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Kwame Nkrumah",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Haile Selassie",
      "difficulty": "easy",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Julius Nyerere",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Thomas Sankara",
      "difficulty": "hard",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Wangari Maathai",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Kofi Annan",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Ellen Johnson Sirleaf",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Paul Kagame",
      "difficulty": "hard",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Cyril Ramaphosa",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Fela Kuti",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Miriam Makeba",
      "difficulty": "easy",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Youssou Ndour",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Didier Drogba",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Sadio Mane",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Eliud Kipchoge",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Caster Semenya",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Siya Kolisi",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Francois Pienaar",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Amina J Mohammed",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Aliko Dangote",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Ngozi Okonjo-Iweala",
      "difficulty": "hard",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Trevor Noah",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Chinua Achebe",
      "difficulty": "hard",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Ngugi wa Thiongo",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Nadine Gordimer",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Bessie Head",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Chimamanda Ngozi Adichie",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Wole Soyinka",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Table Mountain",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Kruger National Park",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Victoria Falls",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Lake Tanganyika",
      "difficulty": "easy",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Great Rift Valley",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Atlas Mountains",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Drakensberg",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Zanzibar",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Timbuktu",
      "difficulty": "easy",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Lagos",
      "difficulty": "hard",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Cairo",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Nairobi",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Johannesburg",
      "difficulty": "easy",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Cape Town",
      "difficulty": "hard",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Addis Ababa",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Kigali",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Dakar",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Accra",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Casablanca",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Marrakesh",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Maputo",
      "difficulty": "easy",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Windhoek",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Lusaka",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Harare",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Gaborone",
      "difficulty": "easy",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Kampala",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Dar es Salaam",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Abuja",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Alexandria",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Soweto Uprising",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Sharpeville Massacre",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "End of Apartheid",
      "difficulty": "easy",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Mandela Release",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Rwandan Genocide",
      "difficulty": "hard",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Battle of Isandlwana",
      "difficulty": "hard",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Africa Cup of Nations",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "2010 FIFA World Cup",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Arab Spring Tunisia",
      "difficulty": "hard",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "African Union Summit",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Great Zimbabwe",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Benin Bronzes",
      "difficulty": "hard",
      "description": "An Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Mali Empire",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Songhai Empire",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Kingdom of Axum",
      "difficulty": "hard",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Ethiopian Highlands",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Namib Desert",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Kalahari Desert",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Nile Delta",
      "difficulty": "easy",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Congo Basin",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Lake Malawi",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Mount Kenya",
      "difficulty": "easy",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Mount Elgon",
      "difficulty": "easy",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Blyde River Canyon",
      "difficulty": "hard",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Robben Island",
      "difficulty": "hard",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Constitution Hill",
      "difficulty": "hard",
      "description": "Connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Sahara Trade Routes",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Swahili Coast",
      "difficulty": "hard",
      "description": "A recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Blue Nile",
      "difficulty": "hard",
      "description": "Appears in clues about African history, geography, culture, or sport."
    }
  ]
};

const themes = {
  "Wedding Fever": [
    {
      "word": "Bride",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Groom",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Wedding Cake",
      "difficulty": "easy",
      "description": "Wedding clue; describe ceremony role, tradition, or reception use."
    },
    {
      "word": "Bouquet",
      "difficulty": "easy",
      "description": "Wedding clue; describe ceremony role, tradition, or reception use."
    },
    {
      "word": "Honeymoon",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Vows",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Best Man",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Maid of Honor",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Wedding Ring",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Reception",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "First Dance",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Wedding Bells",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Unity Candle",
      "difficulty": "hard",
      "description": "Wedding clue; describe ceremony role, tradition, or reception use."
    },
    {
      "word": "Wedding Planner",
      "difficulty": "hard",
      "description": "Wedding clue; describe ceremony role, tradition, or reception use."
    },
    {
      "word": "Flower Girl",
      "difficulty": "hard",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Ring Bearer",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Tuxedo",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Wedding March",
      "difficulty": "hard",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Bridal Shower",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Bachelor Party",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Bachelorette Party",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Bridesmaid",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Engagement Ring",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Floral Arrangement",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Groomsmen",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Marriage Certificate",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Marriage Vows",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Wedding Dress",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Wedding Venue",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Wedding Vows",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Aisle",
      "difficulty": "hard",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Confetti",
      "difficulty": "easy",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Guest List",
      "difficulty": "easy",
      "description": "Wedding clue; describe ceremony role, tradition, or reception use."
    },
    {
      "word": "Wedding Toast",
      "difficulty": "easy",
      "description": "Wedding clue; describe ceremony role, tradition, or reception use."
    },
    {
      "word": "Reception Hall",
      "difficulty": "hard",
      "description": "Wedding reference; use celebration context and emotional significance."
    },
    {
      "word": "Photo Booth",
      "difficulty": "easy",
      "description": "Wedding clue; describe ceremony role, tradition, or reception use."
    },
    {
      "word": "Wedding Favors",
      "difficulty": "easy",
      "description": "Wedding clue; describe ceremony role, tradition, or reception use."
    },
    {
      "word": "Bridal Veil",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Table Seating",
      "difficulty": "hard",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    },
    {
      "word": "Wedding Car",
      "difficulty": "easy",
      "description": "Marriage-themed clue; start with who uses it and when during the event."
    }
  ],
  "Holiday Time": [
    {
      "word": "Christmas tree",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Santa Claus",
      "difficulty": "easy",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Snowman",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Gifts",
      "difficulty": "easy",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Stockings",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Reindeer",
      "difficulty": "easy",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Sleigh",
      "difficulty": "easy",
      "description": "Holiday term; use celebration context and recognizable custom."
    },
    {
      "word": "Caroling",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Fireplace",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Gingerbread",
      "difficulty": "easy",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Ornament",
      "difficulty": "easy",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Mistletoe",
      "difficulty": "easy",
      "description": "Holiday term; use celebration context and recognizable custom."
    },
    {
      "word": "Eggnog",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "New Year's Eve",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Hanukkah",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Advent calendar",
      "difficulty": "hard",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Kwanzaa",
      "difficulty": "hard",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Yule log",
      "difficulty": "hard",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Boxing Day",
      "difficulty": "hard",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Epiphany",
      "difficulty": "hard",
      "description": "Holiday term; use celebration context and recognizable custom."
    },
    {
      "word": "Menorah",
      "difficulty": "hard",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Dreidel",
      "difficulty": "hard",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Tinsel",
      "difficulty": "hard",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Wassail",
      "difficulty": "hard",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Nutcracker",
      "difficulty": "hard",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Krampus",
      "difficulty": "hard",
      "description": "Holiday term; use celebration context and recognizable custom."
    },
    {
      "word": "Solstice",
      "difficulty": "hard",
      "description": "Holiday term; use celebration context and recognizable custom."
    },
    {
      "word": "Hogmanay",
      "difficulty": "hard",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Black Friday",
      "difficulty": "hard",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Feast of Seven Fishes",
      "difficulty": "hard",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Holiday Market",
      "difficulty": "hard",
      "description": "Holiday term; use celebration context and recognizable custom."
    },
    {
      "word": "Secret Santa",
      "difficulty": "easy",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Family Feast",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Holiday Lights",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Winter Break",
      "difficulty": "hard",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Gift Wrap",
      "difficulty": "easy",
      "description": "Festive reference; start with time of year and family or community use."
    },
    {
      "word": "Snow Globe",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Holiday Travel",
      "difficulty": "easy",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Warm Cocoa",
      "difficulty": "hard",
      "description": "Holiday clue; describe seasonal tradition, decoration, or celebration activity."
    },
    {
      "word": "Festive Playlist",
      "difficulty": "easy",
      "description": "Holiday term; use celebration context and recognizable custom."
    }
  ],
  "Sports Event": [
    {
      "word": "Olympic Games",
      "difficulty": "easy",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "World Cup",
      "difficulty": "easy",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "Super Bowl",
      "difficulty": "easy",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Wimbledon",
      "difficulty": "easy",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Tour de France",
      "difficulty": "easy",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "NBA Finals",
      "difficulty": "easy",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Stanley Cup",
      "difficulty": "easy",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Masters Tournament",
      "difficulty": "easy",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Ryder Cup",
      "difficulty": "easy",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "Kentucky Derby",
      "difficulty": "easy",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "F1 Grand Prix",
      "difficulty": "easy",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "Rugby World Cup",
      "difficulty": "easy",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "MLB World Series",
      "difficulty": "easy",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "UFC Championship",
      "difficulty": "easy",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Cricket World Cup",
      "difficulty": "easy",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "Heisman Trophy",
      "difficulty": "hard",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "The Ashes Series",
      "difficulty": "hard",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "UEFA Champions League",
      "difficulty": "hard",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Copa America",
      "difficulty": "hard",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "La Liga Championship",
      "difficulty": "hard",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Indy 500",
      "difficulty": "hard",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "PGA Championship",
      "difficulty": "hard",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "MotoGP",
      "difficulty": "hard",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "Commonwealth Games",
      "difficulty": "hard",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Davis Cup",
      "difficulty": "hard",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "America's Cup",
      "difficulty": "hard",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "FA Cup Final",
      "difficulty": "hard",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Six Nations Championship",
      "difficulty": "hard",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Belmont Stakes",
      "difficulty": "hard",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Opening Ceremony",
      "difficulty": "hard",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "Penalty Shootout",
      "difficulty": "easy",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Photo Finish",
      "difficulty": "easy",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Extra Time",
      "difficulty": "easy",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Golden Medal",
      "difficulty": "hard",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Team Captain",
      "difficulty": "easy",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Locker Room",
      "difficulty": "easy",
      "description": "Big-match clue; use event scale, format, and audience context."
    },
    {
      "word": "Match Officials",
      "difficulty": "easy",
      "description": "Sports-event clue; describe competition type, participants, and stakes."
    },
    {
      "word": "Crowd Roar",
      "difficulty": "hard",
      "description": "Tournament reference; start with sport and what decides the winner."
    },
    {
      "word": "Victory Lap",
      "difficulty": "easy",
      "description": "Big-match clue; use event scale, format, and audience context."
    }
  ],
  "Summer Vacation": [
    {
      "word": "Beach",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Surfing",
      "difficulty": "easy",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Ice cream",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Sandcastle",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Sunbathing",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Pool party",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Barbecue",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Camping",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Hiking",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Road trip",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Water park",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Fishing",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Snorkeling",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Jet skiing",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Amusement park",
      "difficulty": "easy",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Bonfire Night",
      "difficulty": "hard",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Island Hopping",
      "difficulty": "hard",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Deep-sea Fishing",
      "difficulty": "hard",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Scenic Route",
      "difficulty": "hard",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Guided Tour",
      "difficulty": "hard",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Outdoor Concert",
      "difficulty": "hard",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Nature Trail",
      "difficulty": "hard",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Paddle Boarding",
      "difficulty": "hard",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Paragliding",
      "difficulty": "hard",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Cliff Diving",
      "difficulty": "hard",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Kayaking",
      "difficulty": "hard",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Wildlife Safari",
      "difficulty": "hard",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Scuba Diving",
      "difficulty": "hard",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Mountain Biking",
      "difficulty": "hard",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Hot Air Balloon Ride",
      "difficulty": "hard",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Sunblock",
      "difficulty": "hard",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Flip Flops",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Beach Umbrella",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Resort",
      "difficulty": "easy",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Sightseeing",
      "difficulty": "hard",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Travel Photos",
      "difficulty": "easy",
      "description": "Vacation clue; describe travel/leisure setting and what people do there."
    },
    {
      "word": "Day Trip",
      "difficulty": "easy",
      "description": "Holiday-break clue; use destination, relaxation, or adventure angle."
    },
    {
      "word": "Boat Cruise",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Sunset Picnic",
      "difficulty": "hard",
      "description": "Summer activity reference; start with weather context and typical action."
    },
    {
      "word": "Seaside",
      "difficulty": "easy",
      "description": "Summer activity reference; start with weather context and typical action."
    }
  ],
  "Halloween Party": [
    {
      "word": "Pumpkin",
      "difficulty": "easy",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Ghost",
      "difficulty": "easy",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Witch",
      "difficulty": "easy",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Costume",
      "difficulty": "easy",
      "description": "Outfit worn to dress up as a character for a themed party."
    },
    {
      "word": "Candy",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Jack-o'-lantern",
      "difficulty": "easy",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Haunted house",
      "difficulty": "easy",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Skeleton",
      "difficulty": "easy",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Vampire",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Zombie",
      "difficulty": "easy",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Trick-or-treat",
      "difficulty": "easy",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Black cat",
      "difficulty": "easy",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Spider web",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Bat",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Mask",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Frankenstein's Monster",
      "difficulty": "hard",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Dracula's Castle",
      "difficulty": "hard",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Witch's Brew",
      "difficulty": "hard",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Spooky Stories",
      "difficulty": "hard",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Full Moon Night",
      "difficulty": "hard",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Graveyard Shift",
      "difficulty": "hard",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Poltergeist",
      "difficulty": "hard",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Werewolf Transformation",
      "difficulty": "hard",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Creepy Crawlies",
      "difficulty": "hard",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Phantom of the Opera",
      "difficulty": "hard",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Haunted Forest",
      "difficulty": "hard",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Sleepy Hollow",
      "difficulty": "hard",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Blood Moon",
      "difficulty": "hard",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Scarecrow",
      "difficulty": "hard",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Halloween Parade",
      "difficulty": "hard",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Trick Bucket",
      "difficulty": "hard",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Fog Machine",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Costume Contest",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Candy Corn",
      "difficulty": "easy",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Spooky Playlist",
      "difficulty": "hard",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Face Paint",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Pumpkin Carving",
      "difficulty": "easy",
      "description": "October-themed clue; use decoration, character, or night-time celebration context."
    },
    {
      "word": "Haunted Maze",
      "difficulty": "easy",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    },
    {
      "word": "Ghost Story",
      "difficulty": "hard",
      "description": "Seasonal party reference; start with scary/fun vibe and common tradition."
    },
    {
      "word": "Midnight Party",
      "difficulty": "easy",
      "description": "Halloween clue; describe spooky theme, costume element, or party activity."
    }
  ],
  "Christmas Celebration": [
    {
      "word": "Santa Claus",
      "difficulty": "easy",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Christmas tree",
      "difficulty": "easy",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Snowman",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Gifts",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Stockings",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Reindeer",
      "difficulty": "easy",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Sleigh",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Caroling",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Fireplace",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Gingerbread",
      "difficulty": "easy",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Ornament",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Mistletoe",
      "difficulty": "easy",
      "description": "Christmas clue; describe tradition, decoration, or gift-related context."
    },
    {
      "word": "Eggnog",
      "difficulty": "easy",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "New Year's Eve",
      "difficulty": "easy",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Hanukkah",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Advent Calendar",
      "difficulty": "hard",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Kwanzaa",
      "difficulty": "hard",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Yule Log",
      "difficulty": "hard",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Boxing Day",
      "difficulty": "hard",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Epiphany",
      "difficulty": "hard",
      "description": "Christmas clue; describe tradition, decoration, or gift-related context."
    },
    {
      "word": "Menorah",
      "difficulty": "hard",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Dreidel",
      "difficulty": "hard",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Tinsel",
      "difficulty": "hard",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Wassail",
      "difficulty": "hard",
      "description": "Christmas clue; describe tradition, decoration, or gift-related context."
    },
    {
      "word": "Nutcracker",
      "difficulty": "hard",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Krampus",
      "difficulty": "hard",
      "description": "Christmas clue; describe tradition, decoration, or gift-related context."
    },
    {
      "word": "Solstice",
      "difficulty": "hard",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Hogmanay",
      "difficulty": "hard",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Black Friday",
      "difficulty": "hard",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Feast of Seven Fishes",
      "difficulty": "hard",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Nativity Scene",
      "difficulty": "hard",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Christmas Choir",
      "difficulty": "easy",
      "description": "Christmas clue; describe tradition, decoration, or gift-related context."
    },
    {
      "word": "Candy Cane",
      "difficulty": "easy",
      "description": "Christmas clue; describe tradition, decoration, or gift-related context."
    },
    {
      "word": "Tree Topper",
      "difficulty": "easy",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Christmas Eve",
      "difficulty": "hard",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Gift Exchange",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Festive Sweater",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Holiday Ham",
      "difficulty": "easy",
      "description": "Holiday celebration reference; start with family custom and seasonal timing."
    },
    {
      "word": "Snow Angel",
      "difficulty": "hard",
      "description": "Festive clue; use winter/December context and familiar ritual."
    },
    {
      "word": "Winter Garland",
      "difficulty": "easy",
      "description": "Festive clue; use winter/December context and familiar ritual."
    }
  ],
  "Back to School": [
    {
      "word": "Homework",
      "difficulty": "easy",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Backpack",
      "difficulty": "easy",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Teacher",
      "difficulty": "easy",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Classroom",
      "difficulty": "easy",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Desk",
      "difficulty": "easy",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Notebook",
      "difficulty": "easy",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Pencil",
      "difficulty": "easy",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Textbook",
      "difficulty": "easy",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Lunchbox",
      "difficulty": "easy",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Bus",
      "difficulty": "easy",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Recess",
      "difficulty": "easy",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Blackboard",
      "difficulty": "easy",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Calculator",
      "difficulty": "easy",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Ruler",
      "difficulty": "easy",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "School Bell",
      "difficulty": "easy",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Parent-Teacher Conference",
      "difficulty": "hard",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Science Fair Project",
      "difficulty": "hard",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Field Trip",
      "difficulty": "hard",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Honor Roll",
      "difficulty": "hard",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Extracurricular Activities",
      "difficulty": "hard",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Locker Combination",
      "difficulty": "hard",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Study Group",
      "difficulty": "hard",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Class President",
      "difficulty": "hard",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Graduation Ceremony",
      "difficulty": "hard",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Debate Club",
      "difficulty": "hard",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "School Assembly",
      "difficulty": "hard",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Art Class",
      "difficulty": "hard",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Gymnasium",
      "difficulty": "hard",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "History Lesson",
      "difficulty": "hard",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Report Card",
      "difficulty": "hard",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "Syllabus",
      "difficulty": "hard",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Homeroom",
      "difficulty": "easy",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Attendance Register",
      "difficulty": "easy",
      "description": "School clue; describe classroom use, student role, or academic routine."
    },
    {
      "word": "School Uniform",
      "difficulty": "easy",
      "description": "Back-to-school clue; use subject, schedule, or campus activity context."
    },
    {
      "word": "Detention",
      "difficulty": "hard",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "School Library",
      "difficulty": "easy",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Exam Hall",
      "difficulty": "easy",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Pencil Case",
      "difficulty": "easy",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Study Timetable",
      "difficulty": "hard",
      "description": "Education reference; start with learning context and where it appears in school life."
    },
    {
      "word": "Group Project",
      "difficulty": "easy",
      "description": "Education reference; start with learning context and where it appears in school life."
    }
  ],
  "Music Festival": [
    {
      "word": "Stage",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Band",
      "difficulty": "easy",
      "description": "Concert-festival clue; use audience energy and production elements."
    },
    {
      "word": "Audience",
      "difficulty": "easy",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Microphone",
      "difficulty": "easy",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Guitar",
      "difficulty": "easy",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Drums",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "DJ",
      "difficulty": "easy",
      "description": "Concert-festival clue; use audience energy and production elements."
    },
    {
      "word": "Dance",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Lights",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Ticket",
      "difficulty": "easy",
      "description": "Concert-festival clue; use audience energy and production elements."
    },
    {
      "word": "Camping",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Tent",
      "difficulty": "easy",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Soundcheck",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Setlist",
      "difficulty": "easy",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Encore",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Backstage Pass",
      "difficulty": "hard",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Crowd Surfing",
      "difficulty": "hard",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Headliner",
      "difficulty": "hard",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Festival Wristband",
      "difficulty": "hard",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "VIP Area",
      "difficulty": "hard",
      "description": "Concert-festival clue; use audience energy and production elements."
    },
    {
      "word": "Acoustic Set",
      "difficulty": "hard",
      "description": "Concert-festival clue; use audience energy and production elements."
    },
    {
      "word": "Merchandise Stand",
      "difficulty": "hard",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Mosh Pit",
      "difficulty": "hard",
      "description": "Concert-festival clue; use audience energy and production elements."
    },
    {
      "word": "Opening Act",
      "difficulty": "hard",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Roadies",
      "difficulty": "hard",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Tour Bus",
      "difficulty": "hard",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Sound Engineer",
      "difficulty": "hard",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Festival Grounds",
      "difficulty": "hard",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Food Truck",
      "difficulty": "hard",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Festival Vibes",
      "difficulty": "hard",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Main Stage",
      "difficulty": "hard",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Sound Booth",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Festival Lineup",
      "difficulty": "easy",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Late Night Set",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Warm-up DJ",
      "difficulty": "hard",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Crowd Chant",
      "difficulty": "easy",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Festival Poster",
      "difficulty": "easy",
      "description": "Concert-festival clue; use audience energy and production elements."
    },
    {
      "word": "Bass Drop",
      "difficulty": "easy",
      "description": "Festival clue; describe live-performance setting and crowd experience."
    },
    {
      "word": "Live Mix",
      "difficulty": "hard",
      "description": "Music-event reference; start with stage, sound, or artist lineup context."
    },
    {
      "word": "Encore Song",
      "difficulty": "easy",
      "description": "Concert-festival clue; use audience energy and production elements."
    }
  ],
  "Movie Night": [
    {
      "word": "Popcorn",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Movie",
      "difficulty": "easy",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Ticket",
      "difficulty": "easy",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Director",
      "difficulty": "easy",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Actor",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Theater",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Screen",
      "difficulty": "easy",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Trailer",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Snack",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Seat",
      "difficulty": "easy",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Projector",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Credits",
      "difficulty": "easy",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Scene",
      "difficulty": "easy",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Genre",
      "difficulty": "easy",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Plot",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Cinematic Experience",
      "difficulty": "hard",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Red Carpet Event",
      "difficulty": "hard",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Independent Film",
      "difficulty": "hard",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Blockbuster Hit",
      "difficulty": "hard",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Special Effects",
      "difficulty": "hard",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Box Office",
      "difficulty": "hard",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Movie Marathon",
      "difficulty": "hard",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Midnight Screening",
      "difficulty": "hard",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Dolby Surround Sound",
      "difficulty": "hard",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Film Festival",
      "difficulty": "hard",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Cult Classic",
      "difficulty": "hard",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Behind the Scenes",
      "difficulty": "hard",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Movie Franchise",
      "difficulty": "hard",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Character Development",
      "difficulty": "hard",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Post-Credit Scene",
      "difficulty": "hard",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Cinema Ticket",
      "difficulty": "hard",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Box Office Hit",
      "difficulty": "easy",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Director's Cut",
      "difficulty": "easy",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Opening Scene",
      "difficulty": "easy",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    },
    {
      "word": "Movie Quote",
      "difficulty": "hard",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Film Score",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Rom-com",
      "difficulty": "easy",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Thriller",
      "difficulty": "easy",
      "description": "Screen-time clue; use theater or streaming context and audience behavior."
    },
    {
      "word": "Mid-credit Scene",
      "difficulty": "hard",
      "description": "Movie-night clue; describe cinema/home viewing context and storytelling element."
    },
    {
      "word": "Sequel",
      "difficulty": "easy",
      "description": "Film reference; start with viewing setup, genre mood, or plot role."
    }
  ],
  "Adventure Trip": [
    {
      "word": "Hiking",
      "difficulty": "easy",
      "description": "Outdoor activity involving walking on nature trails."
    },
    {
      "word": "Backpacking",
      "difficulty": "easy",
      "description": "Travel with gear carried in a large pack, often including camping."
    },
    {
      "word": "Camping",
      "difficulty": "easy",
      "description": "Staying outdoors in temporary shelters like tents."
    },
    {
      "word": "Rafting",
      "difficulty": "easy",
      "description": "Navigating turbulent water using an inflatable boat."
    },
    {
      "word": "Climbing",
      "difficulty": "easy",
      "description": "Ascending natural or man-made vertical surfaces."
    },
    {
      "word": "Road Trip",
      "difficulty": "easy",
      "description": "Travel by car with a focus on exploring and sightseeing."
    },
    {
      "word": "Jungle",
      "difficulty": "easy",
      "description": "Dense, tropical forest with diverse plant and animal life."
    },
    {
      "word": "Mountain",
      "difficulty": "easy",
      "description": "Large, elevated landform rising prominently above its surroundings."
    },
    {
      "word": "River",
      "difficulty": "easy",
      "description": "Flowing body of water moving toward a larger water body."
    },
    {
      "word": "Desert",
      "difficulty": "easy",
      "description": "Arid, barren land with very little precipitation and extreme temperatures."
    },
    {
      "word": "Beach",
      "difficulty": "easy",
      "description": "Sandy or pebbly shoreline along a water body."
    },
    {
      "word": "Waterfall",
      "difficulty": "easy",
      "description": "Natural feature where water cascades over a vertical drop."
    },
    {
      "word": "Wildlife",
      "difficulty": "easy",
      "description": "All living organisms in their natural environments."
    },
    {
      "word": "Campfire",
      "difficulty": "easy",
      "description": "Fire made outdoors for warmth and cooking."
    },
    {
      "word": "Trail",
      "difficulty": "easy",
      "description": "Path or track for walking or biking through nature."
    },
    {
      "word": "Expedition",
      "difficulty": "hard",
      "description": "Journey for exploration or research, often in remote areas."
    },
    {
      "word": "Survival Skills",
      "difficulty": "hard",
      "description": "Techniques and knowledge needed for enduring in challenging situations."
    },
    {
      "word": "Orienteering",
      "difficulty": "hard",
      "description": "Sport involving navigation with a map and compass through diverse terrain."
    },
    {
      "word": "Rock Climbing",
      "difficulty": "hard",
      "description": "Activity of scaling natural rock formations or climbing walls."
    },
    {
      "word": "Glacier Hiking",
      "difficulty": "hard",
      "description": "Walking on ice formations using specialized equipment."
    },
    {
      "word": "Desert Safari",
      "difficulty": "hard",
      "description": "Adventure tour in arid regions, often involving off-road driving."
    },
    {
      "word": "River Rafting",
      "difficulty": "hard",
      "description": "Navigating rapids using an inflatable boat, requiring teamwork and skill."
    },
    {
      "word": "Forest Trekking",
      "difficulty": "hard",
      "description": "Extended hike through wooded areas on less defined paths."
    },
    {
      "word": "Mountain Biking",
      "difficulty": "hard",
      "description": "Cycling on rugged, off-road trails with technical challenges."
    },
    {
      "word": "Cave Exploration",
      "difficulty": "hard",
      "description": "Exploring underground spaces with specialized gear."
    },
    {
      "word": "Coastal Walk",
      "difficulty": "hard",
      "description": "Walking along the shoreline, often with scenic views."
    },
    {
      "word": "Off-Road Adventure",
      "difficulty": "hard",
      "description": "Activities on rough, unpaved terrain using vehicles or equipment."
    },
    {
      "word": "High-Altitude Climb",
      "difficulty": "hard",
      "description": "Climbing at great heights, often requiring special acclimatization."
    },
    {
      "word": "Scuba Diving",
      "difficulty": "hard",
      "description": "Underwater diving with self-contained breathing equipment."
    },
    {
      "word": "Paragliding",
      "difficulty": "hard",
      "description": "Flying with a lightweight, free-flying wing in the air."
    },
    {
      "word": "Trail Map",
      "difficulty": "hard",
      "description": "Adventure clue; describe outdoor setting, risk level, and activity style."
    },
    {
      "word": "Compass",
      "difficulty": "easy",
      "description": "Travel-adventure reference; start with terrain and the action people perform."
    },
    {
      "word": "Zipline",
      "difficulty": "easy",
      "description": "Travel-adventure reference; start with terrain and the action people perform."
    },
    {
      "word": "Canyon",
      "difficulty": "easy",
      "description": "Travel-adventure reference; start with terrain and the action people perform."
    },
    {
      "word": "Base Camp",
      "difficulty": "hard",
      "description": "Expedition clue; use destination type, gear, and challenge context."
    },
    {
      "word": "Rope Bridge",
      "difficulty": "easy",
      "description": "Expedition clue; use destination type, gear, and challenge context."
    },
    {
      "word": "Wild Camp",
      "difficulty": "easy",
      "description": "Adventure clue; describe outdoor setting, risk level, and activity style."
    },
    {
      "word": "Hiking Boots",
      "difficulty": "easy",
      "description": "Expedition clue; use destination type, gear, and challenge context."
    },
    {
      "word": "Summit",
      "difficulty": "hard",
      "description": "Adventure clue; describe outdoor setting, risk level, and activity style."
    },
    {
      "word": "Night Safari",
      "difficulty": "easy",
      "description": "After-dark wildlife experience where visitors view animals on guided night tours."
    }
  ]
};
