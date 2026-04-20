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
      "description": "A family of team sports in which the object is to get the ball over a goal line, into a goal, or between goalposts using merely the body."
    },
    {
      "word": "Basketball",
      "difficulty": "easy",
      "description": "A team sport in which two teams of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through a hoop at..."
    },
    {
      "word": "Soccer",
      "difficulty": "easy",
      "description": "Association football, more commonly known as just football or soccer, is a team sport played between two teams of 11 players who almost exclusively use their feet to propel a ba..."
    },
    {
      "word": "Tennis",
      "difficulty": "easy",
      "description": "A racket sport that is played either individually against a single opponent or between two teams of two players each ."
    },
    {
      "word": "Golf",
      "difficulty": "easy",
      "description": "A club-and-ball sport in which players use various clubs to hit a ball into a series of holes on a course in as few strokes as possible."
    },
    {
      "word": "Baseball",
      "difficulty": "easy",
      "description": "A bat-and-ball sport played between two teams of nine players each, taking turns batting and fielding."
    },
    {
      "word": "Swimming",
      "difficulty": "easy",
      "description": "The self-propulsion of a person through water, usually for recreation, sport, exercise, or survival."
    },
    {
      "word": "Boxing",
      "difficulty": "easy",
      "description": "A combat sport and martial art."
    },
    {
      "word": "Cricket",
      "difficulty": "easy",
      "description": "A bat-and-ball game that is played between two teams of eleven players on a field, at the centre of which is a 22-yard pitch with a wicket at each end, each comprising two bails..."
    },
    {
      "word": "Rugby",
      "difficulty": "easy",
      "description": "The former quadrennial world championship of rugby sevens, a variant of rugby union."
    },
    {
      "word": "Running",
      "difficulty": "easy",
      "description": "A method of terrestrial locomotion by which humans and other animals move quickly on foot."
    },
    {
      "word": "Volleyball",
      "difficulty": "easy",
      "description": "A team sport in which two teams of six players are separated by a net."
    },
    {
      "word": "Ice Hockey",
      "difficulty": "easy",
      "description": "Ice hockey, known simply as hockey in North America and parts of Europe, is a team sport played on ice skates, usually on an ice skating rink with lines and markings specific to..."
    },
    {
      "word": "Table Tennis",
      "difficulty": "easy",
      "description": "A racket sport derived from tennis but distinguished by its playing surface being atop a stationary table, rather than the court on which players stand."
    },
    {
      "word": "Athletics",
      "difficulty": "easy",
      "description": "Sport in Latvia includes basketball, football, ice hockey, athletics , rugby, tennis, cycling, and others."
    },
    {
      "word": "Cycling",
      "difficulty": "easy",
      "description": "Cycling, also known as bicycling or biking, is the activity of riding a bicycle or other types of pedal-driven human-powered vehicles such as balance bikes, unicycles, tricycles..."
    },
    {
      "word": "Wrestling",
      "difficulty": "easy",
      "description": "A martial art, combat sport, and form of entertainment that involves grappling with an opponent and striving to obtain a position of advantage through different throws or techni..."
    },
    {
      "word": "Badminton",
      "difficulty": "easy",
      "description": "A racquet sport played using racquets to hit a shuttlecock across a net."
    },
    {
      "word": "Formula 1",
      "difficulty": "easy",
      "description": "The highest class of worldwide racing for open-wheel, single-seater formula racing cars run by Formula One Group and sanctioned by the Fédération Internationale de l'Automobile ."
    },
    {
      "word": "Martial Arts",
      "difficulty": "easy",
      "description": "A codified systems and traditions of combat."
    },
    {
      "word": "Gymnastics",
      "difficulty": "easy",
      "description": "A group of sport that includes physical exercises requiring balance, strength, flexibility, agility, coordination, artistry and endurance."
    },
    {
      "word": "Surfing",
      "difficulty": "easy",
      "description": "A surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards..."
    },
    {
      "word": "Snowboarding",
      "difficulty": "easy",
      "description": "A recreational and competitive activity that involves descending a snow-covered surface while standing on a snowboard with bindings securing the rider's feet to the board."
    },
    {
      "word": "Skateboarding",
      "difficulty": "easy",
      "description": "An action sport that involves riding and performing tricks using a skateboard, as well as a recreational activity, an art form, an entertainment industry job, and a method of tr..."
    },
    {
      "word": "Polo",
      "difficulty": "easy",
      "description": "A stick and ball game that is played on horseback as a traditional field sport."
    },
    {
      "word": "Archery",
      "difficulty": "easy",
      "description": "The sport, practice, or skill of using a bow to shoot arrows."
    },
    {
      "word": "Equestrian",
      "difficulty": "easy",
      "description": "Qatar competed at the 2016 Summer Olympics in Rio de Janeiro, Brazil, from 5 to 21 August 2016."
    },
    {
      "word": "Sailing",
      "difficulty": "easy",
      "description": "Sailing employs the wind—acting on sails, wing sails or kites—to propel a craft on the surface of the water, on ice or on land over a chosen course, which is often part of a lar..."
    },
    {
      "word": "Darts",
      "difficulty": "easy",
      "description": "A competitive sport in which two or more players bare-handedly throw small sharp-pointed projectiles known as darts at a round target known as a dartboard."
    },
    {
      "word": "Snooker",
      "difficulty": "easy",
      "description": "A cue sport played on a rectangular billiards table covered with a green cloth called baize, with six pockets: one at each corner and one in the middle of each long side."
    },
    {
      "word": "Squash",
      "difficulty": "easy",
      "description": "The Williams Ephs are the varsity intercollegiate athletic programs of Williams College in Williamstown, Massachusetts."
    },
    {
      "word": "Canoeing",
      "difficulty": "easy",
      "description": "An activity which involves paddling a canoe with a single-bladed paddle."
    },
    {
      "word": "Rowing",
      "difficulty": "easy",
      "description": "The act of propelling a human-powered watercraft using the sweeping motions of oars to displace water and generate reactional propulsion."
    },
    {
      "word": "Triathlon",
      "difficulty": "easy",
      "description": "A triathlon is an endurance multisport race consisting of swimming, cycling, and running over various distances."
    },
    {
      "word": "Netball",
      "difficulty": "easy",
      "description": "A ball sport played on a rectangular court by two teams of seven players."
    },
    {
      "word": "Pentathlon",
      "difficulty": "easy",
      "description": "A pentathlon is a contest featuring five events."
    },
    {
      "word": "Handball",
      "difficulty": "easy",
      "description": "A team sport in which two teams of seven players each pass a ball using their hands with the aim of throwing it into the goal of the opposing team."
    },
    {
      "word": "Curling",
      "difficulty": "easy",
      "description": "A sport in which players slide stones on a sheet of ice towards a target area that is segmented into four concentric circles."
    },
    {
      "word": "Fencing",
      "difficulty": "easy",
      "description": "A combat sport that features sword fighting."
    },
    {
      "word": "Lacrosse",
      "difficulty": "easy",
      "description": "A contact team sport played with a lacrosse stick and a lacrosse ball."
    },
    {
      "word": "Bobsleigh",
      "difficulty": "easy",
      "description": "Bobsleigh or bobsled is a winter sport in which individual athletes or teams of two to four athletes make timed speed runs down narrow, twisting, banked, iced tracks in a gravit..."
    },
    {
      "word": "Powerlifting",
      "difficulty": "easy",
      "description": "A competitive strength sport that consists of three attempts at maximal weight on three lifts: squat, bench press, and deadlift."
    },
    {
      "word": "Mountaineering",
      "difficulty": "easy",
      "description": "A set of outdoor activities that involves ascending mountains."
    },
    {
      "word": "Figure Skating",
      "difficulty": "easy",
      "description": "A sport in which individuals, pairs, or groups perform jumps, spins, and dance moves on ice."
    },
    {
      "word": "Biathlon",
      "difficulty": "easy",
      "description": "A winter sport that combines cross-country skiing and rifle shooting."
    },
    {
      "word": "Taekwondo",
      "difficulty": "easy",
      "description": "A Korean martial art and combat sport involving primarily kicking techniques and punching."
    },
    {
      "word": "Bowling",
      "difficulty": "easy",
      "description": "A target sport and recreational activity in which a player rolls a ball toward pins or another target."
    },
    {
      "word": "Water Polo",
      "difficulty": "easy",
      "description": "A competitive team sport played in water between two teams of seven players each."
    },
    {
      "word": "Goal",
      "difficulty": "easy",
      "description": "A goal or objective is an idea of the future or desired result that a person or a group of people envision, plan, and commit to achieve."
    },
    {
      "word": "Ball",
      "difficulty": "easy",
      "description": "A ball is a round object with several uses."
    },
    {
      "word": "Kick",
      "difficulty": "easy",
      "description": "A kick is a physical strike using the leg, in unison usually with an area of the knee or lower using the foot, heel, tibia , ball of the foot, blade of the foot, toes or knee."
    },
    {
      "word": "Pass",
      "difficulty": "easy",
      "description": "A team sport in which two teams of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through a hoop at..."
    },
    {
      "word": "Referee",
      "difficulty": "easy",
      "description": "A referee is an official, in a variety of sports and competition, responsible for enforcing the rules of the sport, including sportsmanship decisions such as ejection."
    },
    {
      "word": "Goalkeeper",
      "difficulty": "easy",
      "description": "In many team sports that involve scoring goals, the goalkeeper is a designated player charged with directly preventing the opposing team from scoring by blocking or intercepting..."
    },
    {
      "word": "Red Card",
      "difficulty": "easy",
      "description": "Penalty cards are used in many sports as a means of warning, reprimanding or penalising a player, coach or team official."
    },
    {
      "word": "Yellow Card",
      "difficulty": "easy",
      "description": "Penalty cards are used in many sports as a means of warning, reprimanding or penalising a player, coach or team official."
    },
    {
      "word": "Foul",
      "difficulty": "easy",
      "description": "A basketball that is played by teams of student-athletes at universities and colleges."
    },
    {
      "word": "Offside",
      "difficulty": "easy",
      "description": "A scaled-down variant of association football played between two teams of five players each on a court smaller than a football pitch."
    },
    {
      "word": "Penalty Kick",
      "difficulty": "easy",
      "description": "A penalty shot or penalty kick is a play used in several sports whereby a goal is attempted during untimed play."
    },
    {
      "word": "Corner Kick",
      "difficulty": "easy",
      "description": "The Sheffield Rules was a code of football devised and played in the English city of Sheffield between 1858 and 1877."
    },
    {
      "word": "Free Kick",
      "difficulty": "easy",
      "description": "A scaled-down variant of association football played between two teams of five players each on a court smaller than a football pitch."
    },
    {
      "word": "Tackle",
      "difficulty": "easy",
      "description": "The Lehigh Mountain Hawks are the athletic teams representing Lehigh University in Bethlehem, Pennsylvania."
    },
    {
      "word": "Header",
      "difficulty": "easy",
      "description": "A baseball that is played by student-athletes at institutions of higher education."
    },
    {
      "word": "Substitute",
      "difficulty": "easy",
      "description": "Penalty cards are used in many sports as a means of warning, reprimanding or penalising a player, coach or team official."
    },
    {
      "word": "Captain",
      "difficulty": "easy",
      "description": "A title, an appellative for the commanding officer of a military unit; the supreme leader or highest rank officer of a navy ship, merchant ship, aeroplane, spacecraft, or other..."
    },
    {
      "word": "World Cup",
      "difficulty": "easy",
      "description": "A world cup is a global sporting competition in which the participant entities – usually international teams or individuals representing their countries – compete for the title..."
    },
    {
      "word": "Champions League",
      "difficulty": "easy",
      "description": "The UEFA Champions League, commonly known as the Champions League, is an annual club association football competition organised by the Union of European Football Associations th..."
    },
    {
      "word": "Premier League",
      "difficulty": "easy",
      "description": "The Premier League is a professional association football league in England and the highest level of the English football league system."
    },
    {
      "word": "La Liga",
      "difficulty": "easy",
      "description": "The Campeonato Nacional de Liga de Primera División, commonly known as the Primera División or La Liga, and officially known as LaLiga EA Sports for sponsorship reasons, is a pr..."
    },
    {
      "word": "Serie A",
      "difficulty": "easy",
      "description": "The Serie A, officially known as Serie A Enilive in Italy and Serie A Made in Italy abroad for sponsorship reasons, is a professional association football league in Italy and th..."
    },
    {
      "word": "Bundesliga",
      "difficulty": "easy",
      "description": "The Bundesliga, sometimes referred to as the Fußball-Bundesliga or 1."
    },
    {
      "word": "Messi",
      "difficulty": "easy",
      "description": "Lionel Andrés \"Leo\" Messi is an Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team."
    },
    {
      "word": "Ronaldo",
      "difficulty": "easy",
      "description": "A Portuguese given name equivalent to the English Ronald."
    },
    {
      "word": "Neymar",
      "difficulty": "easy",
      "description": "Neymar da Silva Santos Júnior, simply known as Neymar Júnior or mononymously as Neymar, is a Brazilian professional footballer who plays as an attacking midfielder or a forward..."
    },
    {
      "word": "Mbappe",
      "difficulty": "easy",
      "description": "Kylian Mbappé Lottin is a French professional footballer who plays as a forward for La Liga club Real Madrid and captains the France national team."
    },
    {
      "word": "Zidane",
      "difficulty": "easy",
      "description": "The 2006 FIFA World Cup final was the final match of the 2006 World Cup, the 18th edition of FIFA's competition for national football teams."
    },
    {
      "word": "Maradona",
      "difficulty": "easy",
      "description": "Diego Armando Maradona was an Argentine professional football player and manager."
    },
    {
      "word": "Pele",
      "difficulty": "easy",
      "description": "Edson Arantes do Nascimento, better known by his nickname Pelé, was a Brazilian professional footballer who played as a forward."
    },
    {
      "word": "Beckenbauer",
      "difficulty": "easy",
      "description": "Franz Anton Beckenbauer was a German professional football player, manager, and official."
    },
    {
      "word": "Wembley Stadium",
      "difficulty": "easy",
      "description": "Wembley Stadium, currently branded as Wembley Stadium connected by EE for sponsorship reasons, is an association football stadium in Wembley, London, England."
    },
    {
      "word": "Camp Nou",
      "difficulty": "easy",
      "description": "Camp Nou, officially Spotify Camp Nou for sponsorship reasons, and often referred to in English as the Nou Camp, is a stadium in Barcelona and the home of La Liga club FC Barcel..."
    },
    {
      "word": "Santiago Bernabeu",
      "difficulty": "easy",
      "description": "Santiago Bernabéu de Yeste was a Spanish football player, coach, and administrator who played for Real Madrid as a forward, later serving as the club's manager and then president."
    },
    {
      "word": "Old Trafford",
      "difficulty": "easy",
      "description": "A football stadium in the Old Trafford area of Greater Manchester, England."
    },
    {
      "word": "Anfield",
      "difficulty": "easy",
      "description": "A football stadium in the area of Anfield, Liverpool, England, which has been the home of Liverpool F.C."
    },
    {
      "word": "Allianz Arena",
      "difficulty": "easy",
      "description": "A football stadium in Munich, Germany, with a 70,000 seating capacity for international matches and 75,000 for domestic matches."
    },
    {
      "word": "FIFA",
      "difficulty": "easy",
      "description": "The Fédération Internationale de Football Association is an international self-regulatory governing body of association football, beach soccer, and futsal."
    },
    {
      "word": "UEFA",
      "difficulty": "easy",
      "description": "The Union of European Football Associations is the governing body of football in Europe, uniting 55 national associations and overseeing the promotion, regulation and developmen..."
    },
    {
      "word": "Golden Boot",
      "difficulty": "easy",
      "description": "Rachel Ann Daly is an English professional footballer who plays predominantly as a striker for Aston Villa in the FA Women's Super League."
    },
    {
      "word": "Golden Ball",
      "difficulty": "easy",
      "description": "The FIFA Futsal World Cup is an international futsal competition contested by the senior men's national teams of the member associations of FIFA, the sport's global governing body."
    },
    {
      "word": "Top Scorer",
      "difficulty": "easy",
      "description": "The UEFA European Football Championship, less formally the European Championship and informally the Euro or Euros, is the primary association football tournament organised by th..."
    },
    {
      "word": "Hat-Trick",
      "difficulty": "easy",
      "description": "A hat-trick or hat trick is the achievement of a generally positive feat three times in a match, or another achievement based on the number three."
    },
    {
      "word": "Own Goal",
      "difficulty": "easy",
      "description": "An own goal occurs in sports when a player performs actions that result in scoring points for the opposition, such as when a footballer puts a ball into their own net."
    },
    {
      "word": "Touchdown",
      "difficulty": "easy",
      "description": "A touchdown is a scoring play in gridiron football."
    },
    {
      "word": "Home Run",
      "difficulty": "easy",
      "description": "In baseball, a home run is scored when the ball is hit in such a way that the batter is able to circle the bases and reach home plate safely in one play without any errors being..."
    },
    {
      "word": "Ace",
      "difficulty": "easy",
      "description": "An ace is a playing card, die or domino with a single pip."
    },
    {
      "word": "Birdie",
      "difficulty": "easy",
      "description": "A New Zealand professional golfer who plays on the European Tour, PGA Tour and PGA Tour of Australasia."
    },
    {
      "word": "Forehand",
      "difficulty": "easy",
      "description": "The forehand is a shot used in most racket sports, such as tennis, table tennis and pickleball, where the palm of the hand precedes the back of the hand when swinging the racket."
    },
    {
      "word": "Backhand",
      "difficulty": "easy",
      "description": "The backhand is a shot used in most racket sports, such as tennis, table tennis and pickleball, where the back of the hand precedes the palm when swinging the racket."
    },
    {
      "word": "Serve",
      "difficulty": "easy",
      "description": "A sport of European origin, primarily played in the German-speaking nations of Austria, Germany and Switzerland, as well as in Brazil."
    },
    {
      "word": "Grand Slam",
      "difficulty": "easy",
      "description": "An American former professional tennis player and coach."
    },
    {
      "word": "Wimbledon",
      "difficulty": "easy",
      "description": "Sport in Latvia includes basketball, football, ice hockey, athletics , rugby, tennis, cycling, and others."
    },
    {
      "word": "Super Bowl",
      "difficulty": "easy",
      "description": "The Super Bowl is the annual league championship game of the National Football League of the United States."
    },
    {
      "word": "World Series",
      "difficulty": "easy",
      "description": "The World Series is the annual championship series of Major League Baseball , a professional baseball league in North America, and has been contested since 1903 between the cham..."
    },
    {
      "word": "Olympics",
      "difficulty": "easy",
      "description": "The modern Olympic Games are the world's preeminent international sporting events."
    },
    {
      "word": "Tour de France",
      "difficulty": "easy",
      "description": "The Tour de France is an annual men's multiple-stage road cycling race held primarily in France."
    },
    {
      "word": "MMA",
      "difficulty": "easy",
      "description": "A full-contact combat sport based on striking and grappling, incorporating techniques from various combat sports from around the world."
    },
    {
      "word": "Skiing",
      "difficulty": "easy",
      "description": "The use of skis to glide on snow for basic transport, a recreational activity, or a competitive winter sport."
    },
    {
      "word": "High Jump",
      "difficulty": "easy",
      "description": "The high jump is a track and field event in which competitors must jump unaided over a horizontal bar placed at measured heights without dislodging it."
    },
    {
      "word": "Long Jump",
      "difficulty": "easy",
      "description": "The long jump is a track and field event in which athletes combine speed, strength and agility in an attempt to leap as far as possible from a takeoff point."
    },
    {
      "word": "Pole Vault",
      "difficulty": "easy",
      "description": "Pole vaulting, also known as pole jumping, is a track and field event in which an athlete uses a long and flexible pole, usually made from fiberglass or carbon fiber, as an aid..."
    },
    {
      "word": "Javelin",
      "difficulty": "easy",
      "description": "A javelin is a light spear designed primarily to be thrown, historically as a ranged weapon."
    },
    {
      "word": "Shot Put",
      "difficulty": "easy",
      "description": "The shot put is a track and field event involving \"putting\" a heavy spherical ball—the shot—as far as possible."
    },
    {
      "word": "Hockey",
      "difficulty": "easy",
      "description": "A family of stick sports where two opposing teams use hockey sticks to propel a ball or disk into a goal."
    },
    {
      "word": "Karate",
      "difficulty": "easy",
      "description": "Karate , also karate-do , is a martial art developed in the Ryukyu Kingdom."
    },
    {
      "word": "Diving",
      "difficulty": "easy",
      "description": "The Michigan Wolverines comprise 27 varsity sports teams at the University of Michigan, including 13 men's teams and 14 women's teams."
    },
    {
      "word": "Michael Jordan",
      "difficulty": "easy",
      "description": "Michael Jeffrey Jordan, also known by his initials MJ, is an American businessman and retired professional basketball player who is a minority owner of the Charlotte Hornets of..."
    },
    {
      "word": "Serena Williams",
      "difficulty": "easy",
      "description": "Serena Jameka Williams is an American former professional tennis player."
    },
    {
      "word": "Usain Bolt",
      "difficulty": "easy",
      "description": "Usain St. Leo Bolt is a Jamaican retired sprinter."
    },
    {
      "word": "Muhammad Ali",
      "difficulty": "easy",
      "description": "An American professional boxer and activist."
    },
    {
      "word": "Cristiano Ronaldo",
      "difficulty": "easy",
      "description": "Cristiano Ronaldo dos Santos Aveiro, nicknamed CR7, is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club Al-Nassr and the P..."
    },
    {
      "word": "Lionel Messi",
      "difficulty": "easy",
      "description": "Lionel Andrés \"Leo\" Messi is an Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team."
    },
    {
      "word": "Roger Federer",
      "difficulty": "easy",
      "description": "A Swiss former professional tennis player."
    },
    {
      "word": "Tiger Woods",
      "difficulty": "easy",
      "description": "Eldrick Tont \"Tiger\" Woods is an American professional golfer."
    },
    {
      "word": "LeBron James",
      "difficulty": "easy",
      "description": "LeBron Raymone James is an American professional basketball player for the Los Angeles Lakers of the National Basketball Association ."
    },
    {
      "word": "Michael Phelps",
      "difficulty": "easy",
      "description": "Michael Fred Phelps II is an American former competitive swimmer."
    },
    {
      "word": "Simone Biles",
      "difficulty": "easy",
      "description": "Simone Arianne Biles Owens is an American artistic gymnast."
    },
    {
      "word": "Kobe Bryant",
      "difficulty": "easy",
      "description": "Kobe Bean Bryant was an American professional basketball player."
    },
    {
      "word": "Wayne Gretzky",
      "difficulty": "easy",
      "description": "Wayne Douglas Gretzky is a Canadian former professional ice hockey player and former head coach."
    },
    {
      "word": "Mia Hamm",
      "difficulty": "easy",
      "description": "Mariel Margaret \"Mia\" Hamm is an American former professional soccer player, two-time Olympic gold medalist and two-time FIFA Women's World Cup champion."
    },
    {
      "word": "Babe Ruth",
      "difficulty": "easy",
      "description": "George Herman \"Babe\" Ruth was an American professional baseball player whose career in Major League Baseball spanned 22 seasons, from 1914 through 1935."
    },
    {
      "word": "Rafael Nadal",
      "difficulty": "easy",
      "description": "Rafael \"Rafa\" Nadal Parera, 1st Marquess of Llevant de Mallorca is a Spanish former professional tennis player."
    },
    {
      "word": "Jackie Joyner-Kersee",
      "difficulty": "easy",
      "description": "Jacqueline Joyner-Kersee, née Joyner, is an American former track and field athlete who competed in both the heptathlon and long jump."
    },
    {
      "word": "Novak Djokovic",
      "difficulty": "easy",
      "description": "A Serbian professional tennis player."
    },
    {
      "word": "Martina Navratilova",
      "difficulty": "easy",
      "description": "A Czech-American former professional tennis player."
    },
    {
      "word": "Diego Maradona",
      "difficulty": "easy",
      "description": "Diego Armando Maradona was an Argentine professional football player and manager."
    },
    {
      "word": "Michael Schumacher",
      "difficulty": "easy",
      "description": "A German former racing driver who competed in Formula One from 1991 to 2006 and from 2010 to 2012."
    },
    {
      "word": "Sachin Tendulkar",
      "difficulty": "easy",
      "description": "Sachin Ramesh Tendulkar is an Indian former international cricketer who captained the Indian national team."
    },
    {
      "word": "Manny Pacquiao",
      "difficulty": "easy",
      "description": "Emmanuel Dapidran Pacquiao Sr."
    },
    {
      "word": "Alex Morgan",
      "difficulty": "easy",
      "description": "The United States women's national soccer team represents the United States in international women's soccer."
    },
    {
      "word": "FIFA World Cup",
      "difficulty": "hard",
      "description": "The FIFA World Cup, often called the World Cup, is an international association football competition among the senior men's national teams of the members of the Fédération Inter..."
    },
    {
      "word": "NBA Finals",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Penalty",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Striker",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Midfielder",
      "difficulty": "easy",
      "description": "In association football, a midfielder takes an outfield position primarily in the middle of the pitch."
    },
    {
      "word": "Nutmeg",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Tiki-taka",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "False nine",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Sweeper",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Counter-attack",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Libero",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Man marking",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Zonal marking",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Through ball",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Decathlon",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "The Olympic Games",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Bobsledding",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Windsurfing",
      "difficulty": "hard",
      "description": "A wind-propelled water sport that is a combination of sailing and surfing."
    },
    {
      "word": "Jesse Owens",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Tom Brady",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Australian Open",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Champions League Final",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Defensive Block",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "English Premier League Trophy",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Formula 1 Grand Prix",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Formula 1 World Championship",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Free Kick Technique",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "French Open",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Golf Masters",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Ligue 1",
      "difficulty": "easy",
      "description": "Ligue 1, officially known as Ligue 1 McDonald's for sponsorship reasons, is a professional association football league in France and the highest level of the French football lea..."
    },
    {
      "word": "MLB",
      "difficulty": "easy",
      "description": "A professional baseball league in North America composed of 30 teams, divided equally between the National League and the American League , with 29 in the United States and 1 in..."
    },
    {
      "word": "MVP",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "NBA",
      "difficulty": "easy",
      "description": "The National Basketball Association is a professional basketball league in North America composed of 30 teams."
    },
    {
      "word": "NFL",
      "difficulty": "easy",
      "description": "The National Football League is a professional American football league in the United States."
    },
    {
      "word": "Olympic Gold Medal",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Penalty Shootout",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Roger Federer vs Rafael Nadal",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Summer Olympics Opening Ceremony",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Super Bowl Halftime Show",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Super Bowl MVP Performance",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "US Open",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Video Assistant Referee",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Winter Olympics",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Winter Olympics Opening Ceremony",
      "difficulty": "hard",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "World Cup Final",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Kylian Mbappé",
      "difficulty": "easy",
      "description": "Kylian Mbappé Lottin is a French professional footballer who plays as a forward for La Liga club Real Madrid and captains the France national team."
    },
    {
      "word": "Mohamed Salah",
      "difficulty": "easy",
      "description": "Mohamed Salah Hamed Mahrous Ghaly is an Egyptian professional footballer who plays as a right winger or right midfielder for Premier League club Liverpool and captains the Egypt..."
    },
    {
      "word": "Neymar Jr.",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Zlatan Ibrahimović",
      "difficulty": "easy",
      "description": "A Swedish former professional footballer who played as a striker."
    },
    {
      "word": "Nike",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Manchester United",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Adidas",
      "difficulty": "easy",
      "description": "Adidas AG is a German multinational athletic apparel and footwear corporation headquartered in Herzogenaurach, Germany."
    },
    {
      "word": "Real Madrid",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Barcelona",
      "difficulty": "easy",
      "description": "A city on the northeastern coast of Spain."
    },
    {
      "word": "Bayern Munich",
      "difficulty": "easy",
      "description": "Fußball-Club Bayern München e."
    },
    {
      "word": "Liverpool",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Chelsea",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Paris Saint-Germain",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "Juventus",
      "difficulty": "easy",
      "description": "A well-known sport or sporting term, usually clued by rules, equipment, or scoring."
    },
    {
      "word": "AC Milan",
      "difficulty": "easy",
      "description": "Associazione Calcio Milan, commonly referred to as Milan or AC Milan mainly outside of Italy, is an Italian professional football club based in Milan, Lombardy."
    },
    {
      "word": "Arsenal",
      "difficulty": "easy",
      "description": "An arsenal is a place where arms and ammunition are made, maintained and repaired, stored, or issued, in any combination, whether privately or publicly owned."
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
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Matrix",
      "difficulty": "easy",
      "description": "A 1999 science fiction action film written and directed by the Wachowskis."
    },
    {
      "word": "Friends",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Simpsons",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Breaking Bad",
      "difficulty": "easy",
      "description": "An American neo-Western crime drama television series created and produced by Vince Gilligan for AMC."
    },
    {
      "word": "Game of Thrones",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Harry Potter",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Godfather",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Avengers",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Avengers: Endgame",
      "difficulty": "hard",
      "description": "A 2019 American superhero film based on the Marvel Comics superhero team the Avengers."
    },
    {
      "word": "Lord of the Rings",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Jurassic Park",
      "difficulty": "easy",
      "description": "A 1993 American science fiction adventure film directed by Steven Spielberg and written by Michael Crichton and David Koepp, based on Crichton's 1990 novel."
    },
    {
      "word": "The Shawshank Redemption",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Pulp Fiction",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Back to the Future",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Star Trek",
      "difficulty": "easy",
      "description": "An American science fiction media franchise created by Gene Roddenberry, which began with the series of the same name and became a worldwide pop culture phenomenon."
    },
    {
      "word": "The Office",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Avatar",
      "difficulty": "easy",
      "description": "A concept within Hinduism that in Sanskrit literally means 'descent'."
    },
    {
      "word": "Titanic",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Inception",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Stranger Things",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Lion King",
      "difficulty": "easy",
      "description": "A 1994 American animated musical drama film directed by Roger Allers and Rob Minkoff, produced by Don Hahn, and written by Irene Mecchi, Jonathan Roberts, and Linda Woolverton."
    },
    {
      "word": "Forrest Gump",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Dark Knight",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Toy Story",
      "difficulty": "easy",
      "description": "A 1995 American animated adventure comedy film produced by Pixar Animation Studios for Walt Disney Pictures."
    },
    {
      "word": "The Walking Dead",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Frozen",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Big Bang Theory",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Indiana Jones",
      "difficulty": "easy",
      "description": "An American media franchise consisting of five films and a prequel television series, along with games, comics, and tie-in novels."
    },
    {
      "word": "The Sound of Music",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Sopranos",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Terminator",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Mulan",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Die Hard",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Witcher",
      "difficulty": "easy",
      "description": "A series of nine fantasy novels and 15 short stories by Polish author Andrzej Sapkowski."
    },
    {
      "word": "The Hunger Games",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Mad Men",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Princess Bride",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Mission: Impossible",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Twilight Zone",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Good Place",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The X-Files",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Avatar: The Last Airbender",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Crown",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Mandalorian",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Leonardo DiCaprio",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Actor",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Director",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Oscar",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Red carpet",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Blockbuster",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Movie",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Premiere",
      "difficulty": "easy",
      "description": "A premiere, also spelled première, is the debut of a work, i.e."
    },
    {
      "word": "Screenwriter",
      "difficulty": "easy",
      "description": "A screenwriter is a person who practices the craft of writing for visual mass media, known as screenwriting."
    },
    {
      "word": "Studio",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Sequel",
      "difficulty": "easy",
      "description": "A sequel is a work of literature, film, theatre, television, music, or video game that continues the story of, or expands upon, some earlier work."
    },
    {
      "word": "Cinematography",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Method acting",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Film noir",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Biopic",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Cameo",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Auteur",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Casting couch",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Stunt double",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Box office",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Green screen",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Grey's Anatomy",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Seinfeld",
      "difficulty": "easy",
      "description": "An American television sitcom created by Larry David and Jerry Seinfeld."
    },
    {
      "word": "How I Met Your Mother",
      "difficulty": "easy",
      "description": "An American sitcom created by Craig Thomas and Carter Bays for CBS."
    },
    {
      "word": "Twin Peaks",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Black Mirror",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "True Detective",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Handmaid's Tale",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Westworld",
      "difficulty": "hard",
      "description": "An American science fiction dystopia media franchise that began with the 1973 film Westworld, written and directed by Michael Crichton."
    },
    {
      "word": "Better Call Saul",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Bradley Cooper",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Daniel Day-Lewis",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Darth Vader",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Dumbledore",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Gandalf",
      "difficulty": "easy",
      "description": "Gandalf, in longer form Gandalf the Grey and later Gandalf the White, is a protagonist in J."
    },
    {
      "word": "George Clooney",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Hermione Granger",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Jennifer Lawrence",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Johnny Depp",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Katniss Everdeen",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "La La Land",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Luke Skywalker",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Meryl Streep",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Ryan Gosling",
      "difficulty": "easy",
      "description": "Ryan Thomas Gosling is a Canadian actor."
    },
    {
      "word": "Twilight",
      "difficulty": "easy",
      "description": "A daylight illumination produced by diffuse sky radiation when the Sun is below the horizon as sunlight from the upper atmosphere is scattered in a way that illuminates both the..."
    },
    {
      "word": "Beam me up, Scotty",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Elementary, my dear Watson",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Frankly, my dear, I don't give a damn",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Go ahead, make my day",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Here's Johnny!",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Here's looking at you, kid",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "I'll be back",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "May the Force be with you",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "May the odds be ever in your favor",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Resistance is futile",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Say hello to my little friend",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "To infinity and beyond",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Yippee-ki-yay, motherfucker!",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "You can't handle the truth!",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Harry Potter Wizarding World",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Disney Classics",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Disney Pixar Films",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Disney Princesses",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Marvel Cinematic Universe",
      "difficulty": "hard",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Pirates of the Caribbean",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "Pixar Movies",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
    },
    {
      "word": "The Godfather Trilogy",
      "difficulty": "easy",
      "description": "A notable film or TV reference, usually clued by plot, characters, or iconic scenes."
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
      "description": "An Italian dish typically consisting of a flat base of leavened wheat-based dough topped with tomato, cheese, and other ingredients, baked at a high temperature, traditionally i..."
    },
    {
      "word": "Chocolate",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Burger",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Coffee",
      "difficulty": "easy",
      "description": "A beverage brewed from roasted, ground coffee beans."
    },
    {
      "word": "Sushi",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Ice Cream",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Pasta",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Wine",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Beer",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Steak",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Salad",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Sandwich",
      "difficulty": "easy",
      "description": "A sandwich is a dish typically consisting variously of meat, cheese, sauces, and vegetables used as a filling between slices of bread, or placed atop a slice of bread; or, more..."
    },
    {
      "word": "Cheese",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Cupcake",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Tea",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Cookie",
      "difficulty": "easy",
      "description": "A cookie is a sweet biscuit with high sugar and fat content."
    },
    {
      "word": "Tacos",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Whiskey",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Bread",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Cocktail",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Smoothie",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Donut",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Soup",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Cake",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Barbecue",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Pancakes",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Ramen",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Lobster",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Curry",
      "difficulty": "easy",
      "description": "A dish with a spicy sauce, initially in Indian cuisine, then modified by interchange with the Portuguese, followed by the British, and eventually thoroughly internationalised."
    },
    {
      "word": "Gin",
      "difficulty": "easy",
      "description": "A distilled alcoholic drink flavoured with juniper berries and other botanical ingredients."
    },
    {
      "word": "Vodka",
      "difficulty": "easy",
      "description": "A clear distilled alcoholic beverage."
    },
    {
      "word": "Caviar",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Macaron",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Paella",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Hot Dog",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Dim Sum",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Champagne",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Margarita",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Gourmet",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Milkshake",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Risotto",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Pho",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Nachos",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Cider",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Fondue",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Poutine",
      "difficulty": "easy",
      "description": "A dish of French fries and cheese curds topped with a hot brown beef and chicken stock gravy."
    },
    {
      "word": "Tapas",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Biscuit",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Eggs Benedict",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Beef Wellington",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Lobster Bisque",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Croque Monsieur",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Chicken Parmesan",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Tiramisu",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Coq au Vin",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Crème Brûlée",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Spaghetti Carbonara",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Banoffee Pie",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Cheeseburger",
      "difficulty": "hard",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Coca-Cola",
      "difficulty": "easy",
      "description": "Coca-Cola, or Coke, is a cola soft drink manufactured by the Coca-Cola Company."
    },
    {
      "word": "KFC",
      "difficulty": "easy",
      "description": "KFC Corporation, doing business as KFC, is an American multinational fast food restaurant chain specializing in Southern fried chicken and chicken sandwiches."
    },
    {
      "word": "Burger King",
      "difficulty": "easy",
      "description": "Burger King Corporation is an American fast food chain of hamburger fast food restaurants, headquartered in Miami-Dade County, Florida."
    },
    {
      "word": "Subway",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Taco Bell",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
    },
    {
      "word": "Nandos",
      "difficulty": "easy",
      "description": "Internationally known restaurant chain that originated in South Africa. Famous for their chicken."
    },
    {
      "word": "Pizza Hut",
      "difficulty": "easy",
      "description": "A common food or drink item, often clued by ingredients, taste, or preparation style."
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
      "description": "Elephants are the largest living land animals."
    },
    {
      "word": "Rainforest",
      "difficulty": "easy",
      "description": "Rainforests are forests characterized by a closed and continuous tree canopy, moisture-dependent vegetation, the presence of epiphytes and lianas and the absence of wildfire."
    },
    {
      "word": "Penguin",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Mountain",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Whale",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Sunset",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Tiger",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Savannah",
      "difficulty": "easy",
      "description": "A savanna or savannah is a mixed woodland-grassland biome and ecosystem characterised by the trees being sufficiently widely spaced so that the canopy does not close."
    },
    {
      "word": "Coral Reef",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Desert",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Waterfall",
      "difficulty": "easy",
      "description": "A waterfall is any point in a river or stream where water flows over a vertical drop or a series of steep drops."
    },
    {
      "word": "Polar Bear",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Orangutan",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Volcano",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Forest",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Giraffe",
      "difficulty": "easy",
      "description": "Giraffes are large African hoofed mammals."
    },
    {
      "word": "Lion",
      "difficulty": "easy",
      "description": "The lion is a large cat of the genus Panthera, currently ranging only in Sub-Saharan Africa and India."
    },
    {
      "word": "Dolphin",
      "difficulty": "easy",
      "description": "A dolphin is any one of the 40 extant species of aquatic mammal from the cetacean families Delphinidae, Platanistidae, Iniidae, Pontoporiidae, and the probably extinct Lipotidae."
    },
    {
      "word": "Jungle",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Arctic",
      "difficulty": "easy",
      "description": "The Arctic is the polar region of Earth that surrounds the North Pole, lying north of the Arctic Circle."
    },
    {
      "word": "Humpback Whale",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Cheetah",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Sunrise",
      "difficulty": "easy",
      "description": "The moment when the upper rim of the Sun appears on the horizon in the morning, at the start of the Sun path."
    },
    {
      "word": "Koala",
      "difficulty": "easy",
      "description": "The koala, sometimes inaccurately called the koala bear, is an arboreal herbivorous marsupial native to Australia."
    },
    {
      "word": "Cactus",
      "difficulty": "easy",
      "description": "A cactus is a member of the plant family Cactaceae, a family of the order Caryophyllales comprising about 127 genera with some 1,750 known species."
    },
    {
      "word": "Ocean",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Redwood Tree",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Squirrel",
      "difficulty": "easy",
      "description": "Squirrels are members of the family Sciuridae, a family that includes small or medium-sized rodents."
    },
    {
      "word": "Oasis",
      "difficulty": "easy",
      "description": "In ecology, an oasis is a fertile area of a desert or semi-desert environment that sustains plant life and provides habitat for animals."
    },
    {
      "word": "Eagle",
      "difficulty": "easy",
      "description": "A nature or wildlife term often clued by habitat, appearance, or behavior."
    },
    {
      "word": "Butterfly",
      "difficulty": "easy",
      "description": "Butterflies are winged insects from the lepidopteran superfamily Papilionoidea, characterised by large, often brightly coloured wings that often fold together when at rest, and..."
    },
    {
      "word": "Moose",
      "difficulty": "easy",
      "description": "The moose or elk is the world's tallest, largest and heaviest extant species of deer and the only extant species in the genus Alces."
    },
    {
      "word": "Fjord",
      "difficulty": "easy",
      "description": "In physical geography, a fjord is a long, narrow sea inlet with steep sides or cliffs in a valley created by a former glacier, which has since become inundated with water."
    },
    {
      "word": "Komodo Dragon",
      "difficulty": "easy",
      "description": "The Komodo dragon, also known as the Komodo monitor, is a large reptile of the monitor lizard family Varanidae that is endemic to the Indonesian islands of Komodo, Rinca, Flores..."
    },
    {
      "word": "Seal",
      "difficulty": "easy",
      "description": "The Marine Mammal Protection Act was the first act of the United States Congress to call specifically for an ecosystem approach to wildlife management."
    },
    {
      "word": "Tropical Fish",
      "difficulty": "easy",
      "description": "A fish found in aquatic tropical environments around the world."
    },
    {
      "word": "Monsoon",
      "difficulty": "easy",
      "description": "A monsoon is traditionally a seasonal reversing wind accompanied by corresponding changes in precipitation but is now used to describe seasonal changes in atmospheric circulatio..."
    },
    {
      "word": "Lemur",
      "difficulty": "easy",
      "description": "Lemurs are wet-nosed primates of the superfamily Lemuroidea, divided into eight families and consisting of 15 genera and around 100 extant species."
    },
    {
      "word": "Bamboo Forest",
      "difficulty": "easy",
      "description": "The wildlife of Rwanda comprising its flora and fauna, in prehistoric times, consisted of montane forest in one third the territory of present-day Rwanda."
    },
    {
      "word": "Hummingbird",
      "difficulty": "easy",
      "description": "Hummingbirds are birds native to the Americas and comprise the biological family Trochilidae."
    },
    {
      "word": "Glacier",
      "difficulty": "easy",
      "description": "A glacier is a persistent body of natural ice, a form of rock, that is constantly moving under its own weight."
    },
    {
      "word": "Antarctica",
      "difficulty": "easy",
      "description": "A Earth's southernmost and least-populated continent."
    },
    {
      "word": "Chameleon",
      "difficulty": "easy",
      "description": "Chameleons or chamaeleons are a distinctive and highly specialized clade of Old World lizards with 200 species described as of June 2015."
    },
    {
      "word": "Mangrove",
      "difficulty": "easy",
      "description": "A mangrove is a shrub or tree that grows mainly in coastal saline or brackish water."
    },
    {
      "word": "Seahorse",
      "difficulty": "easy",
      "description": "A seahorse is any of 46 species of small marine bony fish in the genus Hippocampus."
    },
    {
      "word": "Aurora",
      "difficulty": "easy",
      "description": "An aurora is a natural light display in Earth’s upper atmosphere caused by charged particles from the Sun colliding with atoms in the atmosphere."
    },
    {
      "word": "Octopus",
      "difficulty": "easy",
      "description": "An octopus is a soft-bodied, eight-limbed mollusc of the order Octopoda."
    },
    {
      "word": "Cat",
      "difficulty": "easy",
      "description": "The cat, also called domestic cat and house cat, is a small carnivorous mammal."
    },
    {
      "word": "Dog",
      "difficulty": "easy",
      "description": "The dog is a domesticated descendant of wolves."
    },
    {
      "word": "Kangaroo",
      "difficulty": "easy",
      "description": "Kangaroos are marsupials from the subfamily Macropodinae."
    },
    {
      "word": "Shark",
      "difficulty": "easy",
      "description": "Sharks are a group of elasmobranch cartilaginous fishes characterized by a ribless endoskeleton, dermal denticles, five to seven gill slits on each side, and pectoral fins that..."
    },
    {
      "word": "Axolotl",
      "difficulty": "hard",
      "description": "The axolotl is a species of mole salamander."
    },
    {
      "word": "Platypus",
      "difficulty": "hard",
      "description": "The platypus, sometimes referred to as the duck-billed platypus, is a semiaquatic, egg-laying mammal endemic to eastern Australia, including Tasmania."
    },
    {
      "word": "Tasmanian Devil",
      "difficulty": "hard",
      "description": "The Tasmanian devil is a carnivorous marsupial of the family Dasyuridae."
    },
    {
      "word": "Electric Eel",
      "difficulty": "hard",
      "description": "The electric eels are a genus, Electrophorus, of neotropical freshwater fish from South America in the family Gymnotidae, of which they are the only members of the subfamily Ele..."
    },
    {
      "word": "Narwhal",
      "difficulty": "hard",
      "description": "The narwhal is a species of toothed whale native to the Arctic."
    },
    {
      "word": "Emperor Penguin",
      "difficulty": "hard",
      "description": "The emperor penguin is the tallest and heaviest of all living penguin species and lives exclusively in Antarctica."
    },
    {
      "word": "Snow Leopard",
      "difficulty": "hard",
      "description": "The snow leopard is a species of large cat in the genus Panthera of the family Felidae."
    },
    {
      "word": "Great White Shark",
      "difficulty": "hard",
      "description": "The great white shark, also known as the white shark, white pointer, or great white, is a large shark."
    },
    {
      "word": "African Grey Parrot",
      "difficulty": "hard",
      "description": "The grey parrot, also known as the Congo grey parrot, is an African parrot in the family Psittacidae."
    },
    {
      "word": "Okavango Delta",
      "difficulty": "hard",
      "description": "The Okavango Delta or Okavango Grassland is a vast inland delta in Botswana formed where the Okavango River reaches a tectonic trough at an elevation of 930–1,000 m in the centr..."
    },
    {
      "word": "The Amazon Rainforest",
      "difficulty": "hard",
      "description": "The wildlife of Brazil comprises all naturally occurring animals, plants, and fungi in Brazil, which is the most biodiverse country in the world."
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
      "description": "The attempt to represent the text of one language in the writing system of another."
    },
    {
      "word": "Spanish",
      "difficulty": "easy",
      "description": "In linguistics, mutual intelligibility is a relationship between different but related language varieties in which speakers of the different varieties can readily understand eac..."
    },
    {
      "word": "French",
      "difficulty": "easy",
      "description": "The attempt to represent the text of one language in the writing system of another."
    },
    {
      "word": "Mandarin",
      "difficulty": "easy",
      "description": "Xiang or Hsiang, also known as Hunanese, is a group of linguistically similar and historically related Sinitic languages, spoken mainly in Hunan province but also in northern Gu..."
    },
    {
      "word": "German",
      "difficulty": "easy",
      "description": "In linguistics, romanization or romanisation is the conversion of text from a different writing system to the Roman script, or a system for doing so."
    },
    {
      "word": "Italian",
      "difficulty": "easy",
      "description": "Somali is an Afroasiatic language belonging to the Cushitic branch."
    },
    {
      "word": "Japanese",
      "difficulty": "easy",
      "description": "In linguistics, romanization or romanisation is the conversion of text from a different writing system to the Roman script, or a system for doing so."
    },
    {
      "word": "Russian",
      "difficulty": "easy",
      "description": "The attempt to represent the text of one language in the writing system of another."
    },
    {
      "word": "Portuguese",
      "difficulty": "easy",
      "description": "In linguistics, and particularly phonology, stress or accent is the relative emphasis or prominence given to a certain syllable in a word or to a certain word in a phrase or sen..."
    },
    {
      "word": "Arabic",
      "difficulty": "easy",
      "description": "A Central Semitic language of the Afroasiatic language family spoken primarily in the Arab world."
    },
    {
      "word": "Korean",
      "difficulty": "easy",
      "description": "In linguistics, romanization or romanisation is the conversion of text from a different writing system to the Roman script, or a system for doing so."
    },
    {
      "word": "Dutch",
      "difficulty": "easy",
      "description": "In linguistics, mutual intelligibility is a relationship between different but related language varieties in which speakers of the different varieties can readily understand eac..."
    },
    {
      "word": "Swedish",
      "difficulty": "easy",
      "description": "An alpha privative or, rarely, privative a is the prefix a- or an- that is used in Indo-European languages such as Sanskrit and Greek and in words borrowed therefrom to express..."
    },
    {
      "word": "Greek",
      "difficulty": "easy",
      "description": "The attempt to represent the text of one language in the writing system of another."
    },
    {
      "word": "Turkish",
      "difficulty": "easy",
      "description": "In linguistics, mutual intelligibility is a relationship between different but related language varieties in which speakers of the different varieties can readily understand eac..."
    },
    {
      "word": "Polish",
      "difficulty": "easy",
      "description": "In linguistics, mutual intelligibility is a relationship between different but related language varieties in which speakers of the different varieties can readily understand eac..."
    },
    {
      "word": "Hindi",
      "difficulty": "easy",
      "description": "Modern Standard Hindi, commonly referred to as Hindi, is an Indo-Aryan language written in the Devanagari script."
    },
    {
      "word": "Thai",
      "difficulty": "easy",
      "description": "In linguistics, romanization or romanisation is the conversion of text from a different writing system to the Roman script, or a system for doing so."
    },
    {
      "word": "Finnish",
      "difficulty": "easy",
      "description": "In phonetics and phonology, gemination, or consonant lengthening, is an articulation of a consonant for a longer period of time than that of a singleton consonant."
    },
    {
      "word": "Vietnamese",
      "difficulty": "easy",
      "description": "An Austroasiatic language primarily spoken in Vietnam where it is the official language."
    },
    {
      "word": "Indonesian",
      "difficulty": "easy",
      "description": "The Austronesian languages are a language family widely spoken throughout Maritime Southeast Asia, parts of Mainland Southeast Asia, Madagascar, the islands of the Pacific Ocean..."
    },
    {
      "word": "Hebrew",
      "difficulty": "easy",
      "description": "A Northwest Semitic language within the Afroasiatic language family."
    },
    {
      "word": "Czech",
      "difficulty": "easy",
      "description": "Serbian is the standard variety of the Serbo-Croatian language, mainly used by Serbs."
    },
    {
      "word": "Hungarian",
      "difficulty": "easy",
      "description": "Croatian is the standard variety of the Serbo-Croatian language mainly used by Croats."
    },
    {
      "word": "Romanian",
      "difficulty": "easy",
      "description": "In linguistics, mutual intelligibility is a relationship between different but related language varieties in which speakers of the different varieties can readily understand eac..."
    },
    {
      "word": "Danish",
      "difficulty": "easy",
      "description": "In linguistics, mutual intelligibility is a relationship between different but related language varieties in which speakers of the different varieties can readily understand eac..."
    },
    {
      "word": "Norwegian",
      "difficulty": "easy",
      "description": "In linguistics, mutual intelligibility is a relationship between different but related language varieties in which speakers of the different varieties can readily understand eac..."
    },
    {
      "word": "Persian",
      "difficulty": "easy",
      "description": "In linguistics, romanization or romanisation is the conversion of text from a different writing system to the Roman script, or a system for doing so."
    },
    {
      "word": "Swahili",
      "difficulty": "easy",
      "description": "Swahili, also known as Kiswahili, is a Bantu language originally spoken by the Swahili people, who are found primarily in Tanzania, Kenya, and Mozambique."
    },
    {
      "word": "Tagalog",
      "difficulty": "easy",
      "description": "Some 130 to 195 languages are spoken in the Philippines, depending on the method of classification."
    },
    {
      "word": "Malay",
      "difficulty": "easy",
      "description": "Tsat, also known as Utsat, Utset, Hainan Cham, or Huihui, is an Austronesian language spoken by 4,500 Utsul people in the Huihui and Huixin villages near the city of Sanya in Ha..."
    },
    {
      "word": "Bengali",
      "difficulty": "easy",
      "description": "Bengali, also known by its endonym Bangla, is a classical Indo-Aryan language primarily spoken by the Bengali people, native to the Bengal region in South Asia, spread across Ba..."
    },
    {
      "word": "Slovak",
      "difficulty": "easy",
      "description": "Slovak, is a West Slavic language of the Czech–Slovak group, written in Latin script."
    },
    {
      "word": "Lithuanian",
      "difficulty": "easy",
      "description": "The Balto-Slavic languages form a branch of the Indo-European family of languages, traditionally comprising the Baltic and Slavic languages."
    },
    {
      "word": "Latvian",
      "difficulty": "easy",
      "description": "The Balto-Slavic languages form a branch of the Indo-European family of languages, traditionally comprising the Baltic and Slavic languages."
    },
    {
      "word": "Slovenian",
      "difficulty": "easy",
      "description": "Serbo-Croatian, also known as Bosnian-Croatian-Montenegrin-Serbian , is a Western South Slavic language and the primary language of Serbia, Croatia, Bosnia and Herzegovina, and..."
    },
    {
      "word": "Croatian",
      "difficulty": "easy",
      "description": "Serbian is the standard variety of the Serbo-Croatian language, mainly used by Serbs."
    },
    {
      "word": "Ukrainian",
      "difficulty": "easy",
      "description": "In linguistics, romanization or romanisation is the conversion of text from a different writing system to the Roman script, or a system for doing so."
    },
    {
      "word": "Estonian",
      "difficulty": "easy",
      "description": "In phonetics and phonology, gemination, or consonant lengthening, is an articulation of a consonant for a longer period of time than that of a singleton consonant."
    },
    {
      "word": "Icelandic",
      "difficulty": "easy",
      "description": "Thorn or þorn is a letter in the Old English, Old Norse, Old Swedish and modern Icelandic alphabets, as well as modern transliterations of the Gothic alphabet, Middle Scots, and..."
    },
    {
      "word": "Basque",
      "difficulty": "easy",
      "description": "Sibilants are fricative and affricate consonants of higher amplitude and pitch."
    },
    {
      "word": "Welsh",
      "difficulty": "easy",
      "description": "In linguistics, lenition is a sound change that alters consonants, making them \"weaker\" in some way."
    },
    {
      "word": "Farsi",
      "difficulty": "easy",
      "description": "Persian, also known by its endonym Farsi, is a Western Iranian language belonging to the Iranian branch of the Indo-Iranian subdivision of the Indo-European languages."
    },
    {
      "word": "Yiddish",
      "difficulty": "easy",
      "description": "Yiddish, historically Judeo-German or Jewish German, is a West Germanic language historically spoken by Ashkenazi Jews."
    },
    {
      "word": "Amharic",
      "difficulty": "easy",
      "description": "An Ethio-Semitic language, which is a subgrouping within the Semitic branch of the Afroasiatic languages."
    },
    {
      "word": "Zulu",
      "difficulty": "easy",
      "description": "The Bantu languages are a language family, or a branch of the proposed Niger-Congo language family, containing about 600 languages that are spoken by the Bantu peoples of Centra..."
    },
    {
      "word": "Xhosa",
      "difficulty": "easy",
      "description": "Xhosa, formerly spelled Xosa and also known by its local name isiXhosa, is a Bantu language, indigenous to Southern Africa and one of the official languages of South Africa and..."
    },
    {
      "word": "Kurdish",
      "difficulty": "easy",
      "description": "Kurmanji, also termed Northern Kurdish, is the northernmost of the Kurdish languages, spoken predominantly in southeast Turkey, northwest and northeast Iran, northern Iraq, nort..."
    },
    {
      "word": "Afrikaans",
      "difficulty": "easy",
      "description": "One of South Africa's 11 official languages, often spoken by the white population."
    },
    {
      "word": "Yoruba",
      "difficulty": "easy",
      "description": "An Atlantic–Congo language that is spoken in West Africa, primarily in South West Nigeria, Benin, and parts of Togo."
    },
    {
      "word": "Igbo",
      "difficulty": "easy",
      "description": "The principal native language of the Igbo people, an ethnicity in the Southeastern part of Nigeria."
    },
    {
      "word": "Hausa",
      "difficulty": "easy",
      "description": "Bade is a West Chadic language spoken by the Bade people in Yobe State and Jigawa State, Nigeria."
    },
    {
      "word": "Somali",
      "difficulty": "hard",
      "description": "An Afroasiatic language belonging to the Cushitic branch."
    },
    {
      "word": "Shona",
      "difficulty": "easy",
      "description": "Sibilants are fricative and affricate consonants of higher amplitude and pitch."
    },
    {
      "word": "Tswana",
      "difficulty": "easy",
      "description": "The Bantu languages are a language family, or a branch of the proposed Niger-Congo language family, containing about 600 languages that are spoken by the Bantu peoples of Centra..."
    },
    {
      "word": "Sesotho",
      "difficulty": "easy",
      "description": "Sotho, also known as Sesotho, Southern Sotho, or Sesotho sa Borwa, is a Southern Bantu language spoken in Lesotho, as its national language, and South Africa, where it is an off..."
    },
    {
      "word": "Kiswahili",
      "difficulty": "hard",
      "description": "Swahili, also known as Kiswahili, is a Bantu language originally spoken by the Swahili people, who are found primarily in Tanzania, Kenya, and Mozambique."
    },
    {
      "word": "Latin Alphabet",
      "difficulty": "easy",
      "description": "The Latin alphabet is the set of letters used by the ancient Romans to write Classical Latin, later augmented with lower-case letters to write Medieval Latin, and continued in a..."
    },
    {
      "word": "Cyrillic Script",
      "difficulty": "easy",
      "description": "The Cyrillic script is a writing system used for various languages across Eurasia."
    },
    {
      "word": "Phonetics",
      "difficulty": "easy",
      "description": "A branch of linguistics that mainly concerns the articulation and perception of speech sounds."
    },
    {
      "word": "Dialect",
      "difficulty": "hard",
      "description": "A dialect is a variety of language spoken by a particular group of people."
    },
    {
      "word": "Accents",
      "difficulty": "easy",
      "description": "A homophone is a word that is pronounced the same as another word but differs in meaning or in spelling."
    },
    {
      "word": "Bilingual",
      "difficulty": "easy",
      "description": "The use of more than one language, either by an individual speaker or by a group of speakers."
    },
    {
      "word": "Interpreter",
      "difficulty": "easy",
      "description": "Interpretation is translation from a spoken or signed language into another language, usually in real time to facilitate live communication."
    },
    {
      "word": "Translator",
      "difficulty": "hard",
      "description": "Translation in the field of language is the communication of the meaning of a source-language text by means of an equivalent target-language text."
    },
    {
      "word": "Sign Language",
      "difficulty": "easy",
      "description": "Sign languages are languages that use the visual-manual modality to convey meaning, instead of spoken words."
    },
    {
      "word": "Morse Code",
      "difficulty": "easy",
      "description": "A telecommunications method which encodes text characters as standardized sequences of two different signal durations, called dots and dashes, or dits and dahs."
    },
    {
      "word": "Loanword",
      "difficulty": "easy",
      "description": "A loanword is a word at least partly assimilated from one language into another language, through the process of borrowing."
    },
    {
      "word": "Idiomatic Expression",
      "difficulty": "hard",
      "description": "An idiom is a phrase or expression that largely or exclusively carries a figurative or non-literal meaning, rather than making any literal sense."
    },
    {
      "word": "Tongue Twister",
      "difficulty": "easy",
      "description": "A characterised by the presence of \"true-subapical\" retroflex consonants and multiple rhotic consonants."
    },
    {
      "word": "Grammar Rule",
      "difficulty": "easy",
      "description": "A genderless language is a natural or constructed language that has no distinctions of grammatical gender—that is, no categories requiring morphological agreement between nouns..."
    },
    {
      "word": "Verb Conjugation",
      "difficulty": "easy",
      "description": "In linguistics, conjugation is the creation of derived forms of a verb from its principal parts by inflection."
    },
    {
      "word": "Pronunciation",
      "difficulty": "hard",
      "description": "The way in which a word or a language is spoken."
    },
    {
      "word": "Mother Tongue",
      "difficulty": "easy",
      "description": "Gujari also spelt Gurjari, Gojri, Gujri, Gojari, or Gurjar is a Central Indo-Aryan language belonging to the Indo-Iranian subdivision of the Indo-European languages, spoken by m..."
    }
  ],
  "Famous Personalities": [
    {
      "word": "Albert Einstein",
      "difficulty": "easy",
      "description": "A German-born theoretical physicist best known for developing the theory of relativity."
    },
    {
      "word": "Nelson Mandela",
      "difficulty": "easy",
      "description": "First South African President and anti-apartheid revolutionary."
    },
    {
      "word": "William Shakespeare",
      "difficulty": "easy",
      "description": "An English playwright, poet and actor."
    },
    {
      "word": "Mahatma Gandhi",
      "difficulty": "easy",
      "description": "Mohandas Karamchand Gandhi was an Indian lawyer, anti-colonial nationalist and political ethicist who employed nonviolent resistance to lead the successful campaign for India's..."
    },
    {
      "word": "Mother Teresa",
      "difficulty": "easy",
      "description": "Mary Teresa Bojaxhiu, better known as Mother Teresa or Saint Mother Teresa, was an Albanian-Indian Catholic nun, founder of the Missionaries of Charity and a Catholic saint."
    },
    {
      "word": "Martin Luther King Jr.",
      "difficulty": "easy",
      "description": "Martin Luther King Jr."
    },
    {
      "word": "Marie Curie",
      "difficulty": "easy",
      "description": "Maria Salomea Skłodowska Curie, better known as Marie Curie, was a Polish and naturalised-French physicist and chemist."
    },
    {
      "word": "Elvis Presley",
      "difficulty": "easy",
      "description": "Elvis Aaron Presley, often known simply as Elvis, was an American singer and actor."
    },
    {
      "word": "Michael Jackson",
      "difficulty": "easy",
      "description": "Michael Joseph Jackson was an American singer, songwriter, dancer, and philanthropist."
    },
    {
      "word": "Pablo Picasso",
      "difficulty": "easy",
      "description": "Pablo Ruiz Picasso was a Spanish painter, sculptor, printmaker, ceramicist, and theatre designer who spent most of his adult life in France."
    },
    {
      "word": "Cleopatra",
      "difficulty": "easy",
      "description": "Cleopatra VII Thea Philopator was Queen of the Ptolemaic Kingdom of Egypt from 51 to 30 BC, and the last active Hellenistic pharaoh."
    },
    {
      "word": "Wolfgang Amadeus Mozart",
      "difficulty": "easy",
      "description": "A Classical composer and musician."
    },
    {
      "word": "Charles Darwin",
      "difficulty": "easy",
      "description": "Charles Robert Darwin was an English naturalist, geologist, and biologist, widely known for his contributions to evolutionary biology."
    },
    {
      "word": "Abraham Lincoln",
      "difficulty": "easy",
      "description": "The 16th president of the United States, serving from 1861 until his assassination in 1865."
    },
    {
      "word": "Vincent van Gogh",
      "difficulty": "easy",
      "description": "Vincent Willem van Gogh was a Dutch Post-Impressionist painter who is among the most famous and influential figures in the history of Western art."
    },
    {
      "word": "Amelia Earhart",
      "difficulty": "easy",
      "description": "Amelia Mary Earhart was an American aviator and aviation pioneer who became one of the most celebrated figures of early flight."
    },
    {
      "word": "Steve Jobs",
      "difficulty": "easy",
      "description": "Steven Paul Jobs was an American businessman, inventor, and investor."
    },
    {
      "word": "Stephen Hawking",
      "difficulty": "easy",
      "description": "Stephen William Hawking was an English theoretical astrophysicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology at the University..."
    },
    {
      "word": "Oprah Winfrey",
      "difficulty": "easy",
      "description": "Oprah Gail Winfrey is an American talk show host, television producer, actress, author, and media proprietor."
    },
    {
      "word": "Leonardo DiCaprio",
      "difficulty": "easy",
      "description": "Jean-Pierre Léaud, ComM is a French actor best known for being an important figure of the French New Wave and his portrayal of Antoine Doinel in a series of films by François Tr..."
    },
    {
      "word": "Beethoven",
      "difficulty": "easy",
      "description": "A German composer and pianist."
    },
    {
      "word": "Frida Kahlo",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Alexander the Great",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Jane Austen",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Walt Disney",
      "difficulty": "easy",
      "description": "Walter Elias Disney was an American animator, film producer, voice actor, and entrepreneur."
    },
    {
      "word": "Muhammad Ali",
      "difficulty": "easy",
      "description": "An American professional boxer and activist."
    },
    {
      "word": "Marlon Brando",
      "difficulty": "easy",
      "description": "Marlon Brando Jr. was an American actor."
    },
    {
      "word": "Coco Chanel",
      "difficulty": "easy",
      "description": "Gabrielle Bonheur \"Coco\" Chanel was a French fashion designer and businesswoman."
    },
    {
      "word": "Neil Armstrong",
      "difficulty": "easy",
      "description": "Neil Alden Armstrong was an American astronaut and aeronautical engineer who, as the commander of the 1969 Apollo 11 mission, became the first person to walk on the Moon."
    },
    {
      "word": "Malala Yousafzai",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "J.K. Rowling",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "David Bowie",
      "difficulty": "easy",
      "description": "David Robert Jones, known as David Bowie, was an English singer, songwriter and actor."
    },
    {
      "word": "Diana, Princess of Wales",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Che Guevara",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Helen Keller",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Queen Elizabeth II",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Salvador Dalí",
      "difficulty": "easy",
      "description": "Salvador Domingo Felipe Jacinto Dalí i Domènech, Marquess of Dalí de Púbol, known as Salvador Dalí, was a Spanish surrealist artist renowned for his technical skill, precise dra..."
    },
    {
      "word": "Marie Antoinette",
      "difficulty": "easy",
      "description": "A Queen of France as the wife of Louis XVI from 10 May 1774 until the abolition of the monarchy in 1792."
    },
    {
      "word": "Pele",
      "difficulty": "easy",
      "description": "Edson Arantes do Nascimento, better known by his nickname Pelé, was a Brazilian professional footballer who played as a forward."
    },
    {
      "word": "Emily Dickinson",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Napoleon Bonaparte",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Beyoncé",
      "difficulty": "easy",
      "description": "Beyoncé Giselle Knowles-Carter is an American singer, songwriter, actress, and businesswoman."
    },
    {
      "word": "George Orwell",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Stephen Spielberg",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Audrey Hepburn",
      "difficulty": "easy",
      "description": "Audrey Kathleen Hepburn was a British actress and humanitarian."
    },
    {
      "word": "Pope Francis",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Brad Pitt",
      "difficulty": "easy",
      "description": "William Bradley Pitt is an American actor and film producer."
    },
    {
      "word": "Angelina Jolie",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Tom Cruise",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Jennifer Aniston",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Taylor Swift",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Dwayne Johnson",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Robert Downey Jr.",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Scarlett Johansson",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Benedict Cumberbatch",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Keanu Reeves",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Natalie Portman",
      "difficulty": "hard",
      "description": "Natalie Hershlag, known professionally as Natalie Portman, is an actress, film producer and director with dual Israeli and American citizenship."
    },
    {
      "word": "Joaquin Phoenix",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Charlize Theron",
      "difficulty": "hard",
      "description": "A South African and American actress and producer."
    },
    {
      "word": "Michael Fassbender",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Cate Blanchett",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Tilda Swinton",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Christoph Waltz",
      "difficulty": "hard",
      "description": "An Austrian and German actor."
    },
    {
      "word": "Saoirse Ronan",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Madame Curie",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Voltaire",
      "difficulty": "hard",
      "description": "François-Marie Arouet, known by his pen name Voltaire, was a French Enlightenment writer, philosopher , satirist, and historian."
    },
    {
      "word": "Albert Schweitzer",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Angela Merkel",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Aretha Franklin",
      "difficulty": "hard",
      "description": "Aretha Louise Franklin was an American singer, songwriter and pianist."
    },
    {
      "word": "Ariana Grande",
      "difficulty": "easy",
      "description": "Ariana Grande-Butera is an American singer, songwriter, and actress."
    },
    {
      "word": "Bill Gates",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Bob Dylan",
      "difficulty": "hard",
      "description": "An American singer-songwriter."
    },
    {
      "word": "Bradley Cooper",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Daniel Day-Lewis",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Donald Trump",
      "difficulty": "easy",
      "description": "Donald John Trump is an American politician, media personality, and businessman who is the 47th president of the United States."
    },
    {
      "word": "Drake",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Eleanor Roosevelt",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Elton John",
      "difficulty": "easy",
      "description": "Sir Elton Hercules John is a British singer, songwriter and pianist."
    },
    {
      "word": "George Clooney",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Hillary Clinton",
      "difficulty": "easy",
      "description": "Hillary Diane Rodham Clinton is an American politician, lawyer, and diplomat."
    },
    {
      "word": "Jacinda Ardern",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Jennifer Lawrence",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Jesse Owens",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "John Lennon",
      "difficulty": "hard",
      "description": "John Winston Ono Lennon was an English musician and activist."
    },
    {
      "word": "Johnny Depp",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Mark Zuckerberg",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Meryl Streep",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Paul McCartney",
      "difficulty": "hard",
      "description": "Sir James Paul McCartney is an English musician."
    },
    {
      "word": "Rihanna",
      "difficulty": "easy",
      "description": "Robyn Rihanna Fenty is a Barbadian singer, businesswoman, and actress."
    },
    {
      "word": "Ryan Gosling",
      "difficulty": "easy",
      "description": "Ryan Thomas Gosling is a Canadian actor."
    },
    {
      "word": "Satoshi Nakamoto",
      "difficulty": "hard",
      "description": "The name used by the presumed pseudonymous person or persons who developed bitcoin, authored the bitcoin white paper, and created and deployed bitcoin's original reference imple..."
    },
    {
      "word": "Simone Biles",
      "difficulty": "hard",
      "description": "Simone Arianne Biles Owens is an American artistic gymnast."
    },
    {
      "word": "Tiger Woods",
      "difficulty": "easy",
      "description": "Eldrick Tont \"Tiger\" Woods is an American professional golfer."
    },
    {
      "word": "Tom Brady",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Tom Hanks",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Wayne Gretzky",
      "difficulty": "hard",
      "description": "Wayne Douglas Gretzky is a Canadian former professional ice hockey player and former head coach."
    },
    {
      "word": "Whitney Houston",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Winston Churchill",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Bruno Mars",
      "difficulty": "easy",
      "description": "Peter Gene Hernandez, known professionally as Bruno Mars, is an American singer-songwriter, record producer and dancer."
    },
    {
      "word": "Celine Dion",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Denzel Washington",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Emma Stone",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Emma Watson",
      "difficulty": "easy",
      "description": "Emma Charlotte Duerre Watson is an English actress."
    },
    {
      "word": "Jennifer Lopez",
      "difficulty": "easy",
      "description": "Jennifer Lynn Lopez is an American singer, songwriter, actress, dancer, and businesswoman."
    },
    {
      "word": "Kate Winslet",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Katy Perry",
      "difficulty": "easy",
      "description": "Katheryn Elizabeth Hudson, known professionally as Katy Perry, is an American singer, songwriter, and television personality."
    },
    {
      "word": "Kylian Mbappé",
      "difficulty": "easy",
      "description": "Kylian Mbappé Lottin is a French professional footballer who plays as a forward for La Liga club Real Madrid and captains the France national team."
    },
    {
      "word": "Mohamed Salah",
      "difficulty": "easy",
      "description": "Mohamed Salah Hamed Mahrous Ghaly is an Egyptian professional footballer who plays as a right winger or right midfielder for Premier League club Liverpool and captains the Egypt..."
    },
    {
      "word": "Neymar Jr.",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Shakira",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Zlatan Ibrahimović",
      "difficulty": "hard",
      "description": "A Swedish former professional footballer who played as a striker."
    },
    {
      "word": "Justin Trudeau",
      "difficulty": "hard",
      "description": "Justin Pierre James Trudeau is a Canadian politician who served as the 23rd prime minister of Canada from 2015 to 2025."
    },
    {
      "word": "Joe Biden",
      "difficulty": "easy",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
    },
    {
      "word": "Emmanuel Macron",
      "difficulty": "hard",
      "description": "A notable public figure often clued by field, nationality, or signature achievement."
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
      "description": "The global COVID-19 pandemic, caused by severe acute respiratory syndrome coronavirus 2 , began with an outbreak in Wuhan, China, in December 2019."
    },
    {
      "word": "Climate Change",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Space Exploration",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Olympic Games",
      "difficulty": "easy",
      "description": "The modern Olympic Games are the world's preeminent international sporting events."
    },
    {
      "word": "Presidential Election",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Global Warming",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Brexit",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Cybersecurity",
      "difficulty": "easy",
      "description": "A subdiscipline within the field of information security."
    },
    {
      "word": "Artificial Intelligence",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Social Media",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Electric Vehicles",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Mars Rover Mission",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Protests",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Vaccination Campaigns",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Trade Wars",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Wildfires",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Refugee Crisis",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Terrorist Attacks",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Space Tourism",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Cryptocurrency Boom",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Healthcare Reform",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Artificial Meat",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Pandemic Response",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Environmental Policies",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Gig Economy",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Student Protests",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Rising Inflation",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Homelessness Crisis",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Online Education",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Political Scandals",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Social Justice Movements",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Space Race",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Economic Stimulus Packages",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "AI Ethics Debate",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Remote Work Trends",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Ransomware Attacks",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Sustainable Development Goals",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Plastic Pollution",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Food Security",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Medical Breakthroughs",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Gender Equality Movements",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Social Distancing",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Renewable Energy Initiatives",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Remote Voting",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Digital Privacy Issues",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Climate Activism",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Space Debris",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Paris Fashion Week",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
    },
    {
      "word": "Coachella",
      "difficulty": "easy",
      "description": "An annual music and arts festival held at the Empire Polo Club in Indio, California, in the Coachella Valley in the Colorado Desert."
    },
    {
      "word": "Dubai Shopping Festival",
      "difficulty": "easy",
      "description": "A contemporary issue or event often clued by headlines and global impact."
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
      "description": "In monotheistic religious belief systems, God is usually viewed as the supreme being, creator, and principal object of faith."
    },
    {
      "word": "Buddha",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Jesus",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Hinduism",
      "difficulty": "easy",
      "description": "An umbrella term for a range of Indian religious and spiritual traditions that are unified by adherence to the concept of dharma, a cosmic order maintained by its followers thro..."
    },
    {
      "word": "Egyptian Mythology",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Greek Mythology",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Christianity",
      "difficulty": "easy",
      "description": "An Abrahamic monotheistic religion, which states that Jesus is the Son of God and rose from the dead after his crucifixion, whose coming as the messiah was prophesied in the Old..."
    },
    {
      "word": "Islam",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Shiva",
      "difficulty": "easy",
      "description": "Shiva, also known as Mahadeva and Hara, is one of the principal deities of Hinduism."
    },
    {
      "word": "Bible",
      "difficulty": "easy",
      "description": "The Bible is a collection of religious texts that are central to Christianity and Judaism, and esteemed in other Abrahamic religions such as Islam."
    },
    {
      "word": "Vishnu",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Odin",
      "difficulty": "easy",
      "description": "A widely revered god in Norse mythology and Germanic paganism."
    },
    {
      "word": "Mythology",
      "difficulty": "easy",
      "description": "A genre of folklore consisting primarily of narratives that play a fundamental role in a society."
    },
    {
      "word": "Paganism",
      "difficulty": "easy",
      "description": "In early Christianity, paganism collectively referred to the diverse religious practices of all people who were polytheists."
    },
    {
      "word": "Taoism",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Myth",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Ancient Greek Gods",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Norse Mythology",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Theology",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Creation Myth",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Divinity",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Pantheon",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Deity",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Ragnarok",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Monotheism",
      "difficulty": "easy",
      "description": "The belief in only one deity, or God."
    },
    {
      "word": "Polytheism",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Hindu Gods",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Greek Gods",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Roman Mythology",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Norse Gods",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Holy",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Sacred",
      "difficulty": "easy",
      "description": "Sacred describes something that is dedicated or set apart for the service or worship of a deity; is considered worthy of spiritual respect or devotion; or inspires awe or revere..."
    },
    {
      "word": "Religious Text",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Angel",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Demon",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Pagan Gods",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Heaven",
      "difficulty": "easy",
      "description": "Heaven, or the Heavens, is a common religious cosmological or supernatural place where beings such as deities, angels, souls, saints, or venerated ancestors are said to originat..."
    },
    {
      "word": "Hell",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Mythical Creatures",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Religion",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Mythological Beings",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Holy Book",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Prophet",
      "difficulty": "easy",
      "description": "In religion, a prophet or prophetess is an individual who is regarded as being in contact with a divine being and is said to be a conduit for that being, serving as an intermedi..."
    },
    {
      "word": "Goddess",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Ancient Gods",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Divine",
      "difficulty": "easy",
      "description": "Divinity refers to the quality, presence, or nature of that which is divine—a term that, before the rise of monotheism, evoked a broad and dynamic field of sacred power."
    },
    {
      "word": "Zeus",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Hercules",
      "difficulty": "easy",
      "description": "The Roman equivalent of the Greek divine hero Heracles, son of Jupiter and the mortal Alcmena."
    },
    {
      "word": "Thor",
      "difficulty": "easy",
      "description": "A prominent god in Germanic paganism."
    },
    {
      "word": "Medusa",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Minotaur",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Poseidon",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Apollo",
      "difficulty": "easy",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Athena",
      "difficulty": "easy",
      "description": "Athena or Athene, often given the epithet Pallas, is an ancient Greek goddess associated with wisdom, warfare, and handicraft who was later syncretised with the Roman goddess Mi..."
    },
    {
      "word": "Hades",
      "difficulty": "easy",
      "description": "Hades, in the ancient Greek religion and mythology, is the god of the dead and riches and the King of the underworld, with which his name became synonymous."
    },
    {
      "word": "Pandora",
      "difficulty": "easy",
      "description": "In Greek mythology, Pandora was the first human woman created by Hephaestus on the instructions of Zeus."
    },
    {
      "word": "Prometheus",
      "difficulty": "hard",
      "description": "In Greek mythology, Prometheus is a Titan responsible for creating or aiding humanity in its earliest days."
    },
    {
      "word": "Persephone",
      "difficulty": "hard",
      "description": "In ancient Greek mythology and religion, Persephone, also called Kore or Cora, is the daughter of Zeus and Demeter."
    },
    {
      "word": "Charon",
      "difficulty": "hard",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Bifrost Bridge",
      "difficulty": "hard",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Valkyrie",
      "difficulty": "hard",
      "description": "In Norse mythology, a valkyrie is one of a host of female figures who guide souls of the dead to the god Odin's hall Valhalla."
    },
    {
      "word": "Fenrir",
      "difficulty": "hard",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Chimera",
      "difficulty": "hard",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    },
    {
      "word": "Labyrinth of Crete",
      "difficulty": "hard",
      "description": "A religion or mythology term often clued by beliefs, stories, or symbols."
    }
  ],
  "Space and Astronomy": [
    {
      "word": "Galaxy",
      "difficulty": "easy",
      "description": "A galaxy is a system of stars, stellar remnants, interstellar gas, dust, and dark matter bound together by gravity."
    },
    {
      "word": "Black Hole",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Star",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Planet",
      "difficulty": "easy",
      "description": "A planet is a large, rounded astronomical body that is generally required to be in orbit around a star, stellar remnant, or brown dwarf, and is not one itself."
    },
    {
      "word": "The Solar System",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Moon",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Comet",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Asteroid",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Constellation",
      "difficulty": "easy",
      "description": "A constellation is an area on the celestial sphere in which a group of visible stars forms a perceived pattern or outline, typically representing an animal, mythological subject..."
    },
    {
      "word": "Milky Way",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Nebula",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Space Station",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Supernova",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Telescope",
      "difficulty": "easy",
      "description": "A telescope is a device used to observe distant objects by their emission, absorption, or reflection of electromagnetic radiation."
    },
    {
      "word": "Mars",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Satellite",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Exoplanet",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Big Bang",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Cosmos",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Hubble Space Telescope",
      "difficulty": "easy",
      "description": "The Hubble Space Telescope is a space telescope that was launched into low Earth orbit in 1990 and remains in operation."
    },
    {
      "word": "Orbit",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Spacecraft",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Rocket",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Interstellar",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Gravity",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Galactic",
      "difficulty": "easy",
      "description": "An American funk band from New Orleans, Louisiana."
    },
    {
      "word": "Lunar",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Milky Way Galaxy",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Outer Space",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Astrobiology",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Black Holes",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Dark Matter",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Planetary",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Space Travel",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Astrophysics",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Neutron Star",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Cosmology",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Meteor Shower",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Space Telescope",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Astronaut",
      "difficulty": "easy",
      "description": "An astronaut is a person trained, equipped, and deployed by a human spaceflight program to serve as a commander or crew member of a spacecraft."
    },
    {
      "word": "Solar Eclipse",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Orbital",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Stellar",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Space Mission",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Astronomy",
      "difficulty": "easy",
      "description": "A natural science that studies celestial objects and the phenomena that occur in the cosmos."
    },
    {
      "word": "Space Race",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Earth",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Sun",
      "difficulty": "easy",
      "description": "The Sun is the star located at the centre of the Solar System."
    },
    {
      "word": "Stars",
      "difficulty": "easy",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Meteor",
      "difficulty": "easy",
      "description": "A meteor, known colloquially as a shooting star, is a glowing streak of a small body going through Earth's atmosphere, after being heated to incandescence by collisions with air..."
    },
    {
      "word": "Light Year",
      "difficulty": "hard",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Red Giant",
      "difficulty": "hard",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "White Dwarf",
      "difficulty": "hard",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Event Horizon",
      "difficulty": "hard",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Cosmic Microwave Background",
      "difficulty": "hard",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    },
    {
      "word": "Gravitational Waves",
      "difficulty": "hard",
      "description": "A space-related term often clued by planets, stars, missions, or cosmic phenomena."
    }
  ],
  "Inventions and Discoveries": [
    {
      "word": "Electricity",
      "difficulty": "easy",
      "description": "The set of physical phenomena associated with the presence and motion of matter possessing an electric charge."
    },
    {
      "word": "Telephone",
      "difficulty": "easy",
      "description": "A telephone, commonly shortened to phone, is a telecommunications device that enables two or more users to conduct a conversation when they are too far apart to be easily heard..."
    },
    {
      "word": "Internet",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Computer",
      "difficulty": "easy",
      "description": "A computer is a machine that can be programmed to automatically carry out sequences of arithmetic or logical operations ."
    },
    {
      "word": "Printing Press",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Penicillin",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Vaccination",
      "difficulty": "easy",
      "description": "The administration of a vaccine to help the immune system develop immunity from a disease."
    },
    {
      "word": "Airplane",
      "difficulty": "easy",
      "description": "An airplane, or aeroplane, informally plane, is a fixed-wing aircraft that is propelled forward by thrust from a jet engine, propeller, or rocket engine."
    },
    {
      "word": "Radio",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Television",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Steam Engine",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Light Bulb",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Photography",
      "difficulty": "easy",
      "description": "The art, application, and practice of creating images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material..."
    },
    {
      "word": "Microscope",
      "difficulty": "easy",
      "description": "A microscope is a laboratory instrument used to examine objects that are too small to be seen by the naked eye."
    },
    {
      "word": "Antibiotics",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Theory of Relativity",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "DNA Double Helix",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Wheel",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Satellite",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Robotics",
      "difficulty": "easy",
      "description": "The interdisciplinary study and practice of the design, construction, operation, and use of robots."
    },
    {
      "word": "Electric Light",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Internet of Things",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Atomic Theory",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Pen",
      "difficulty": "easy",
      "description": "A pen is a common writing instrument that applies ink to a surface, typically paper, for writing or drawing."
    },
    {
      "word": "Calculator",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Genetics",
      "difficulty": "easy",
      "description": "The study of genes, genetic variation, and heredity in organisms."
    },
    {
      "word": "X-ray",
      "difficulty": "easy",
      "description": "An X-ray is a form of high-energy electromagnetic radiation with a wavelength shorter than those of ultraviolet rays and longer than those of gamma rays."
    },
    {
      "word": "Helicopter",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Plastic",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Submarine",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Fiber Optics",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Refrigerator",
      "difficulty": "easy",
      "description": "A refrigerator, commonly shortened to fridge, is a commercial and home appliance consisting of a thermally insulated compartment and a heat pump that transfers heat from its ins..."
    },
    {
      "word": "Laser",
      "difficulty": "easy",
      "description": "A laser is a device that emits light through a process of optical amplification based on the stimulated emission of electromagnetic radiation."
    },
    {
      "word": "Printing",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Photovoltaic Cell",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Nuclear Power",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Electric Motor",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Semiconductor",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Satnav",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Artificial Heart",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Internet Protocol (IP)",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Neutron Bomb",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "MRI",
      "difficulty": "easy",
      "description": "A medical imaging technique used in radiology to generate pictures of the anatomy and the physiological processes inside the body."
    },
    {
      "word": "Quantum Theory",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Nanotechnology",
      "difficulty": "easy",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Car",
      "difficulty": "easy",
      "description": "A car, or an automobile, is a motor vehicle with wheels."
    },
    {
      "word": "Camera",
      "difficulty": "easy",
      "description": "A camera is an instrument used to capture and store images and videos, either digitally via an electronic image sensor, or chemically via a light-sensitive material such as phot..."
    },
    {
      "word": "Microwave",
      "difficulty": "easy",
      "description": "A form of electromagnetic radiation with wavelengths shorter than other radio waves but longer than infrared waves."
    },
    {
      "word": "Thermometer",
      "difficulty": "hard",
      "description": "An invention or discovery often clued by function, inventor, or scientific impact."
    },
    {
      "word": "Stethoscope",
      "difficulty": "hard",
      "description": "The stethoscope is a medical device for auscultation, or listening to internal sounds of an animal or human body."
    },
    {
      "word": "Typewriter",
      "difficulty": "hard",
      "description": "A typewriter is a mechanical or electromechanical machine for typing characters."
    },
    {
      "word": "Sewing Machine",
      "difficulty": "hard",
      "description": "A sewing machine is a machine used to sew fabric and materials together with thread."
    },
    {
      "word": "Solar Panel",
      "difficulty": "hard",
      "description": "In the 19th century, it was observed that the sunlight striking certain materials generates detectable electric current – the photoelectric effect."
    },
    {
      "word": "Barcode",
      "difficulty": "hard",
      "description": "A barcode or bar code is a method of representing data in a visual, machine-readable symbolic form."
    },
    {
      "word": "Transistor",
      "difficulty": "hard",
      "description": "A transistor is a semiconductor device used to amplify or switch electrical signals and power."
    }
  ],
  "Health and Medicine": [
    {
      "word": "Heart",
      "difficulty": "easy",
      "description": "The heart is a muscular organ found in humans and other animals."
    },
    {
      "word": "Brain",
      "difficulty": "easy",
      "description": "The brain is an organ that serves as the center of the nervous system in all vertebrate and most invertebrate animals."
    },
    {
      "word": "Lungs",
      "difficulty": "easy",
      "description": "The lungs are the primary organs of the respiratory system in many animals, including humans."
    },
    {
      "word": "Bones",
      "difficulty": "easy",
      "description": "A bone is a rigid organ that constitutes part of the skeleton in most vertebrate animals."
    },
    {
      "word": "Blood",
      "difficulty": "easy",
      "description": "A body fluid in the circulatory system of humans and other vertebrates that delivers necessary substances such as nutrients and oxygen to the cells of the body, and transports m..."
    },
    {
      "word": "DNA",
      "difficulty": "easy",
      "description": "Deoxyribonucleic acid is a polymer composed of two polynucleotide chains that coil around each other to form a double helix."
    },
    {
      "word": "Virus",
      "difficulty": "easy",
      "description": "A virus is a submicroscopic infectious agent that replicates only inside the living cells of an organism."
    },
    {
      "word": "Bacteria",
      "difficulty": "easy",
      "description": "A ubiquitous, mostly free-living organisms often consisting of one biological cell."
    },
    {
      "word": "Antibiotics",
      "difficulty": "easy",
      "description": "The history of medicine is both a study of medicine throughout history as well as a multidisciplinary field of study that seeks to explore and understand medical practices, both..."
    },
    {
      "word": "Vaccination",
      "difficulty": "easy",
      "description": "The administration of a vaccine to help the immune system develop immunity from a disease."
    },
    {
      "word": "Cancer",
      "difficulty": "easy",
      "description": "A group of diseases involving uncontrolled cell growth typically resulting in tumors with the potential to invade or spread to other parts of the body."
    },
    {
      "word": "Diabetes",
      "difficulty": "easy",
      "description": "Diabetes mellitus, commonly known as diabetes, is a group of common endocrine diseases characterized by sustained high blood sugar levels."
    },
    {
      "word": "Obesity",
      "difficulty": "easy",
      "description": "A medical condition, considered a disease by multiple organizations, in which excess body fat has accumulated to such an extent that it can have negative effects on health."
    },
    {
      "word": "Immune System",
      "difficulty": "easy",
      "description": "The immune system is a network of biological systems that protects an organism from diseases."
    },
    {
      "word": "Surgery",
      "difficulty": "easy",
      "description": "A medical specialty that uses manual and instrumental techniques to diagnose or treat pathological conditions, to alter bodily functions, to reconstruct or alter aesthetics and..."
    },
    {
      "word": "Anatomy",
      "difficulty": "easy",
      "description": "The branch of morphology concerned with the study of the internal and external structure of organisms and their parts."
    },
    {
      "word": "Physiology",
      "difficulty": "easy",
      "description": "The scientific study of functions and mechanisms in a living system."
    },
    {
      "word": "Mental Health",
      "difficulty": "easy",
      "description": "Mental health encompasses emotional, psychological, and social well-being, influencing cognition, perception, and behavior."
    },
    {
      "word": "Pandemic",
      "difficulty": "easy",
      "description": "A pandemic is an epidemic of an infectious disease that has a sudden increase in cases and spreads across a large region, for instance multiple continents or worldwide, affectin..."
    },
    {
      "word": "Healthcare",
      "difficulty": "easy",
      "description": "Health care, or healthcare, is the improvement or maintenance of health via the prevention, diagnosis, treatment, amelioration or cure of disease, illness, injury, and other phy..."
    },
    {
      "word": "Stethoscope",
      "difficulty": "easy",
      "description": "The stethoscope is a medical device for auscultation, or listening to internal sounds of an animal or human body."
    },
    {
      "word": "X-ray",
      "difficulty": "easy",
      "description": "An X-ray is a form of high-energy electromagnetic radiation with a wavelength shorter than those of ultraviolet rays and longer than those of gamma rays."
    },
    {
      "word": "MRI",
      "difficulty": "easy",
      "description": "A medical imaging technique used in radiology to generate pictures of the anatomy and the physiological processes inside the body."
    },
    {
      "word": "Emergency Room",
      "difficulty": "easy",
      "description": "An emergency department , also known as an emergency room , accident and emergency , or casualty, is a medical treatment facility specializing in emergency medicine, the acute c..."
    },
    {
      "word": "Pharmacy",
      "difficulty": "easy",
      "description": "The science and practice of discovering, producing, preparing, dispensing, reviewing and monitoring medications, aiming to ensure the safe, effective, and affordable use of medi..."
    },
    {
      "word": "Medical Research",
      "difficulty": "easy",
      "description": "Medical research, also known as health research, refers to the process of using scientific methods with the aim to produce knowledge about human diseases, the prevention and tre..."
    },
    {
      "word": "Epidemic",
      "difficulty": "easy",
      "description": "An epidemic is the rapid spread of disease to a large number of hosts in a given population within a short period of time."
    },
    {
      "word": "Public Health",
      "difficulty": "easy",
      "description": "The history of medicine is both a study of medicine throughout history as well as a multidisciplinary field of study that seeks to explore and understand medical practices, both..."
    },
    {
      "word": "Pulse",
      "difficulty": "easy",
      "description": "In medicine, pulse is the rhythmic expansion and contraction of an artery in response to the cardiac cycle ."
    },
    {
      "word": "Fever",
      "difficulty": "easy",
      "description": "Fever or pyrexia in humans is a symptom of an anti-infection defense mechanism that appears with body temperature exceeding the normal range caused by an increase in the body's..."
    },
    {
      "word": "Hygiene",
      "difficulty": "easy",
      "description": "A set of practices performed to preserve health."
    },
    {
      "word": "Cholesterol",
      "difficulty": "easy",
      "description": "The principal sterol of all animals, distributed in body tissues, especially the brain and spinal cord, and in animal fats and oils."
    },
    {
      "word": "Allergies",
      "difficulty": "easy",
      "description": "An allergy is an exaggerated immune response where the body mistakenly identifies an ordinarily harmless allergen as a threat."
    },
    {
      "word": "Depression",
      "difficulty": "easy",
      "description": "The branch of medicine concerned with the prevention, management, diagnosis, and treatment of disease, disorder, and injury in non-human animals."
    },
    {
      "word": "Pain",
      "difficulty": "easy",
      "description": "A distressing sensation often caused by intense or damaging stimuli."
    },
    {
      "word": "Physical Therapy",
      "difficulty": "easy",
      "description": "Physical therapy , also known as physiotherapy, is a healthcare profession, as well as the care provided by physical therapists."
    },
    {
      "word": "Health Insurance",
      "difficulty": "easy",
      "description": "Health insurance or medical insurance is a type of insurance that covers the whole or a part of the risk of a person incurring medical expenses."
    },
    {
      "word": "Hospice Care",
      "difficulty": "easy",
      "description": "Nursing in Japan did not develop as an occupation until the end of the nineteenth century."
    },
    {
      "word": "Medical Ethics",
      "difficulty": "easy",
      "description": "An applied branch of ethics which analyzes the practice of clinical medicine and related scientific research."
    },
    {
      "word": "Nutrition",
      "difficulty": "easy",
      "description": "The biochemical and physiological process by which an organism uses food and water to support its life."
    },
    {
      "word": "Exercise",
      "difficulty": "easy",
      "description": "Exercise or working out is physical activity that enhances or maintains fitness and overall health."
    },
    {
      "word": "Disease",
      "difficulty": "easy",
      "description": "A disease is a particular abnormal condition that adversely affects the structure or function of all or part of an organism and is not immediately due to any external injury."
    },
    {
      "word": "First Aid",
      "difficulty": "easy",
      "description": "The first and immediate assistance given to any person with a medical emergency, with care provided to preserve life, prevent the condition from worsening, or to promote recover..."
    },
    {
      "word": "Therapy",
      "difficulty": "easy",
      "description": "A therapy or medical treatment is the attempted remediation of a health problem, usually following a medical diagnosis."
    },
    {
      "word": "Epidemiology",
      "difficulty": "easy",
      "description": "The study and analysis of the distribution, patterns and determinants of health and disease conditions in a defined population, and application of this knowledge to prevent dise..."
    },
    {
      "word": "Anesthesia",
      "difficulty": "easy",
      "description": "Anesthesia or anaesthesia is a state of controlled, temporary loss of sensation or awareness that is induced for medical or veterinary purposes."
    },
    {
      "word": "Madame Curie",
      "difficulty": "easy",
      "description": "This is a timeline of women in science, spanning from ancient history up to the 21st century."
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
      "description": "A board game for two players, played on a square board consisting of 64 squares arranged in an 8×8 grid."
    },
    {
      "word": "Monopoly",
      "difficulty": "easy",
      "description": "A monopoly is a market in which one person or company is the only supplier of a particular good or service."
    },
    {
      "word": "LEGO",
      "difficulty": "easy",
      "description": "A brand of plastic construction toys manufactured by the Lego Group, a privately held company based in Billund, Denmark."
    },
    {
      "word": "Puzzle",
      "difficulty": "easy",
      "description": "A puzzle is a game, problem, or toy that tests a person's ingenuity or knowledge."
    },
    {
      "word": "Dolls",
      "difficulty": "easy",
      "description": "A doll is a model typically of a human or humanoid character, often used as a toy for children."
    },
    {
      "word": "Video Games",
      "difficulty": "easy",
      "description": "An electronic game is a game that uses electronics to create an interactive system with which a player can play."
    },
    {
      "word": "Board Game",
      "difficulty": "easy",
      "description": "A board game is a type of tabletop game that involves small objects that are placed and moved in particular ways on a specially designed patterned game board, potentially includ..."
    },
    {
      "word": "Action Figures",
      "difficulty": "easy",
      "description": "An action figure is a poseable character model figure made most commonly of plastic, and often based upon characters from a film, comic book, military, video game, television pr..."
    },
    {
      "word": "Rubik's Cube",
      "difficulty": "easy",
      "description": "The Rubik's Cube is a 3D combination puzzle invented in 1974 by Hungarian sculptor and professor of architecture Ernő Rubik."
    },
    {
      "word": "Card Game",
      "difficulty": "easy",
      "description": "A card game is any game that uses cards as the primary device with which the game is played, whether the cards are of a traditional design or specifically created for the game ."
    },
    {
      "word": "Toy Cars",
      "difficulty": "easy",
      "description": "An American rock band from Asbury Park, New Jersey."
    },
    {
      "word": "Dungeons & Dragons",
      "difficulty": "easy",
      "description": "A fantasy tabletop role-playing game originally created and designed by Gary Gygax and Dave Arneson."
    },
    {
      "word": "Lego Bricks",
      "difficulty": "easy",
      "description": "A brand of plastic construction toys manufactured by the Lego Group, a privately held company based in Billund, Denmark."
    },
    {
      "word": "Barbie",
      "difficulty": "easy",
      "description": "A fashion doll franchise created by American businesswoman Ruth Handler, manufactured by American toy and entertainment company Mattel and introduced on March 9, 1959."
    },
    {
      "word": "Teddy Bear",
      "difficulty": "easy",
      "description": "A teddy bear, or simply a teddy, is a stuffed toy in the form of a bear."
    },
    {
      "word": "Nintendo",
      "difficulty": "easy",
      "description": "Nintendo Co., Ltd. is a Japanese multinational video game company headquartered in Kyoto."
    },
    {
      "word": "PlayStation",
      "difficulty": "easy",
      "description": "A video gaming brand owned and produced by Sony Interactive Entertainment , a subsidiary of Japanese conglomerate Sony."
    },
    {
      "word": "Xbox",
      "difficulty": "easy",
      "description": "A video gaming brand that consists of four main home video game console lines, as well as applications, the streaming service Xbox Cloud Gaming, and online services such as the..."
    },
    {
      "word": "Dungeons and Dragons",
      "difficulty": "easy",
      "description": "A fantasy tabletop role-playing game originally created and designed by Gary Gygax and Dave Arneson."
    },
    {
      "word": "Checkers",
      "difficulty": "easy",
      "description": "Checkers, also known as draughts, is a group of strategy board games for two players which involve forward movements of uniform game pieces and mandatory captures by jumping ove..."
    },
    {
      "word": "Jigsaw Puzzle",
      "difficulty": "easy",
      "description": "An American game company, based in San Francisco, California."
    },
    {
      "word": "Yo-Yo",
      "difficulty": "easy",
      "description": "Bop It, stylized as bop it!"
    },
    {
      "word": "Trivial Pursuit",
      "difficulty": "easy",
      "description": "A Canadian board game in which winning is determined by a player's ability to answer trivia and popular culture questions."
    },
    {
      "word": "Hot Wheels",
      "difficulty": "easy",
      "description": "An American media franchise and brand of scale model cars invented by Elliot Handler and introduced by his company Mattel on May 18, 1968."
    },
    {
      "word": "Transformer Toys",
      "difficulty": "easy",
      "description": "A mecha media franchise produced by American toy company Hasbro and Japanese toy company Takara Tomy."
    },
    {
      "word": "Barbie Dolls",
      "difficulty": "easy",
      "description": "Girls' toys and games, as opposed to boys' toys and games, are toys and games specifically targeted at girls by the toy industry."
    },
    {
      "word": "Nintendo Switch",
      "difficulty": "easy",
      "description": "The Nintendo Switch is a video game console developed by Nintendo and released worldwide in most regions on March 3, 2017."
    },
    {
      "word": "Play-Doh",
      "difficulty": "easy",
      "description": "Play-Doh, also known as Play-Dough, is a modeling compound for young children to make arts and crafts projects."
    },
    {
      "word": "Fidget Spinner",
      "difficulty": "easy",
      "description": "A fidget spinner or hand spinner is a fidget toy composed of a central ball bearing and two or more weighted lobes that rotate around the central axis when spun."
    },
    {
      "word": "Legos",
      "difficulty": "easy",
      "description": "A brand of plastic construction toys manufactured by the Lego Group, a privately held company based in Billund, Denmark."
    },
    {
      "word": "Remote Control Cars",
      "difficulty": "easy",
      "description": "In the game show Minute to Win It aired on ABS-CBN, Most of the time, celebrities are invited to play in the show."
    },
    {
      "word": "Rubik's Cubes",
      "difficulty": "easy",
      "description": "The Rubik's Cube is a 3D combination puzzle invented in 1974 by Hungarian sculptor and professor of architecture Ernő Rubik."
    },
    {
      "word": "Magic: The Gathering",
      "difficulty": "easy",
      "description": "A collectible, tabletop, and digital collectible card game created by Richard Garfield."
    },
    {
      "word": "Candy Land",
      "difficulty": "easy",
      "description": "A simple racing board game created by Eleanor Abbott and published by Milton Bradley in 1949."
    },
    {
      "word": "G.I. Joe",
      "difficulty": "easy",
      "description": "An American media franchise and a line of action figures owned and produced by the toy company Hasbro."
    },
    {
      "word": "Tamagotchi",
      "difficulty": "easy",
      "description": "A brand of handheld digital pets marketed since 1996 by Japanese toymaker Bandai, a division of Bandai Namco Holdings."
    },
    {
      "word": "Nerf Guns",
      "difficulty": "easy",
      "description": "A Nerf Blaster or Nerf Gun is a toy gun made by Hasbro that fires foam darts, arrows, discs, or foam balls."
    },
    {
      "word": "Lincoln Logs",
      "difficulty": "easy",
      "description": "An American construction toy for children, consisting of square-notched miniature lightweight logs used to build small forts and buildings."
    },
    {
      "word": "Dollhouse",
      "difficulty": "easy",
      "description": "A dollhouse or doll's house is a toy house made in miniature."
    },
    {
      "word": "Marbles",
      "difficulty": "easy",
      "description": "A marble is a small spherical object often made from glass, clay, steel, plastic, or agate."
    },
    {
      "word": "Sudoku",
      "difficulty": "easy",
      "description": "A logic-based, combinatorial number-placement puzzle."
    },
    {
      "word": "Toy Story",
      "difficulty": "easy",
      "description": "A 1995 American animated adventure comedy film produced by Pixar Animation Studios for Walt Disney Pictures."
    },
    {
      "word": "Polly Pocket",
      "difficulty": "easy",
      "description": "A toy line of inch-tall dolls and accessories sold by Mattel."
    },
    {
      "word": "Furby",
      "difficulty": "easy",
      "description": "An American electronic robotic toy created by Tiger Electronics – a subsidiary of Hasbro."
    },
    {
      "word": "Barbie Doll",
      "difficulty": "easy",
      "description": "A fashion doll franchise created by American businesswoman Ruth Handler, manufactured by American toy and entertainment company Mattel and introduced on March 9, 1959."
    },
    {
      "word": "Remote Control Car",
      "difficulty": "easy",
      "description": "An American toy manufacturer."
    },
    {
      "word": "Stuffed Animals",
      "difficulty": "easy",
      "description": "A stuffed toy is a toy with an outer fabric sewn from a textile and stuffed with flexible material."
    },
    {
      "word": "Matchbox Cars",
      "difficulty": "easy",
      "description": "The National Toy Hall of Fame is a U.S."
    },
    {
      "word": "Connect Four",
      "difficulty": "easy",
      "description": "A game in which the players choose a color and then take turns dropping colored tokens into a six-row, seven-column vertically suspended grid."
    },
    {
      "word": "Jenga",
      "difficulty": "easy",
      "description": "A game of physical skill created by British board game designer and author Leslie Scott and marketed by Hasbro."
    },
    {
      "word": "Scrabble",
      "difficulty": "hard",
      "description": "A word game in which two to four players score points by placing tiles, each bearing a single letter, onto a game board divided into a 15×15 grid of squares."
    },
    {
      "word": "Clue",
      "difficulty": "easy",
      "description": "Classic mystery board game about suspects, rooms, and solving a whodunit."
    },
    {
      "word": "Risk",
      "difficulty": "easy",
      "description": "The possibility of something bad happening, comprising a level of uncertainty about the effects and implications of an activity, particularly negative and undesirable consequences."
    },
    {
      "word": "UNO",
      "difficulty": "easy",
      "description": "Slime is a toy product manufactured by Mattel, sold in a plastic trash can and introduced in February 1976."
    },
    {
      "word": "Twister",
      "difficulty": "hard",
      "description": "A game of physical skill produced by Milton Bradley Company and Winning Moves Games USA."
    },
    {
      "word": "Operation",
      "difficulty": "easy",
      "description": "A battery-operated game of physical skill that tests players' hand-eye coordination and fine motor skills."
    },
    {
      "word": "Nerf Blaster",
      "difficulty": "easy",
      "description": "A Nerf Blaster or Nerf Gun is a toy gun made by Hasbro that fires foam darts, arrows, discs, or foam balls."
    },
    {
      "word": "RC Car",
      "difficulty": "easy",
      "description": "Radio-controlled cars, or RC cars for short, are miniature vehicles controlled via radio."
    },
    {
      "word": "Puzzle Box",
      "difficulty": "hard",
      "description": "A puzzle is a game, problem, or toy that tests a person's ingenuity or knowledge."
    },
    {
      "word": "Beyblade",
      "difficulty": "easy",
      "description": "A battling spinning top toyline and multimedia franchise developed by the Japanese toy company Takara."
    },
    {
      "word": "Lego Minifigure",
      "difficulty": "hard",
      "description": "A Lego minifigure, often simply referred to as a Lego figure or a minifig, is a small plastic articulated figurine made of special Lego bricks produced by Danish building toy ma..."
    },
    {
      "word": "Toy Drone",
      "difficulty": "easy",
      "description": "The 2016 Toronto Blue Jays season was the 40th season of the franchise in Major League Baseball, and the 27th full season of play at Rogers Centre."
    },
    {
      "word": "Water Gun",
      "difficulty": "easy",
      "description": "The National Toy Hall of Fame is a U.S."
    },
    {
      "word": "Action Figure",
      "difficulty": "easy",
      "description": "An action figure is a poseable character model figure made most commonly of plastic, and often based upon characters from a film, comic book, military, video game, television pr..."
    },
    {
      "word": "Board Game Night",
      "difficulty": "hard",
      "description": "Toys for Bob, Inc. is an American video game developer based in Novato, California."
    },
    {
      "word": "Card Deck",
      "difficulty": "easy",
      "description": "Empire Builder is a railroad board game originally published by Mayfair Games in 1982 that underwent several editions and eventually branched out into international and fantasti..."
    },
    {
      "word": "Dice Tower",
      "difficulty": "easy",
      "description": "Tom Vasel, born ca. 1976, is a podcaster, designer and reviewer of board games, and hosted The Dice Tower podcast from 2003-2022, which has more than 300,000 subscribers."
    },
    {
      "word": "Chess Clock",
      "difficulty": "easy",
      "description": "A two- or four-player intuitive strategy game designed by Mirko Marchesi and published by Gigamic Games."
    },
    {
      "word": "Game Piece",
      "difficulty": "hard",
      "description": "Slime is a toy product manufactured by Mattel, sold in a plastic trash can and introduced in February 1976."
    },
    {
      "word": "Claw Machine",
      "difficulty": "easy",
      "description": "Toy Story is a 1995 platform game published by Disney Interactive for the Sega Genesis, Super Nintendo Entertainment System, Game Boy, and Microsoft Windows."
    },
    {
      "word": "Bean Bag Toss",
      "difficulty": "easy",
      "description": "A lawn game popular in North America in which players or teams take turns throwing fabric bean bags at an inclined board with a hole in its far end."
    },
    {
      "word": "Foosball Table",
      "difficulty": "easy",
      "description": "The Wii is Nintendo's fifth home video game console, released during the seventh generation of video games."
    },
    {
      "word": "Air Hockey",
      "difficulty": "hard",
      "description": "A tabletop sport where two opposing players try to score goals against each other on a low-friction table using two hand-held discs and a lightweight plastic puck."
    },
    {
      "word": "Pinball",
      "difficulty": "easy",
      "description": "Pinball games are a family of games in which a ball is propelled into a specially designed table where it bounces off various obstacles, scoring points either en-route or when i..."
    }
  ],
  "Books and Authors": [
    {
      "word": "William Shakespeare",
      "difficulty": "easy",
      "description": "An English playwright, poet and actor."
    },
    {
      "word": "Jane Austen",
      "difficulty": "easy",
      "description": "The debut novel by English author Jane Austen, appearing in 1811."
    },
    {
      "word": "George Orwell",
      "difficulty": "easy",
      "description": "A dystopian speculative fiction novel by the English writer George Orwell."
    },
    {
      "word": "Charles Dickens",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Mark Twain",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Agatha Christie",
      "difficulty": "easy",
      "description": "Dame Agatha Mary Clarissa Mallowan, Lady Mallowan, usually known by her first married name, Agatha Christie, was an English author known for her 66 detective novels and 14 short..."
    },
    {
      "word": "Stephen King",
      "difficulty": "easy",
      "description": "Stephen Edwin King is an American author."
    },
    {
      "word": "The Lord of the Rings",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "To Kill a Mockingbird",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Catcher in the Rye",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Alice's Adventures in Wonderland",
      "difficulty": "easy",
      "description": "An 1865 English children's novel by Lewis Carroll, a mathematics don at the University of Oxford."
    },
    {
      "word": "The Bible",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "A Song of Ice and Fire",
      "difficulty": "easy",
      "description": "A series of high fantasy novels by the American author George R."
    },
    {
      "word": "The Odyssey",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Hobbit",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Lord of the Flies",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Pride and Prejudice",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Chronicles of Narnia",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Moby-Dick",
      "difficulty": "easy",
      "description": "Moby-Dick; or, The Whale is an 1851 epic novel by American writer Herman Melville."
    },
    {
      "word": "1984",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Brave New World",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Adventures of Huckleberry Finn",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Wuthering Heights",
      "difficulty": "easy",
      "description": "The only novel by the English author Emily Brontë, initially published in 1847 under her pen name \"Ellis Bell\"."
    },
    {
      "word": "The Grapes of Wrath",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Frankenstein",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Little Women",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Gone with the Wind",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Count of Monte Cristo",
      "difficulty": "easy",
      "description": "An adventure novel by the French writer Alexandre Dumas."
    },
    {
      "word": "The Picture of Dorian Gray",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Dracula",
      "difficulty": "easy",
      "description": "An 1897 Gothic horror novel by Irish author Bram Stoker."
    },
    {
      "word": "One Hundred Years of Solitude",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Kite Runner",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Girl with the Dragon Tattoo",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Alchemist",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Hitchhiker's Guide to the Galaxy",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Book Thief",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "War and Peace",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Les Misérables",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Shining",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Secret Garden",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Silmarillion",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Anna Karenina",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Fault in Our Stars",
      "difficulty": "easy",
      "description": "A novel by John Green."
    },
    {
      "word": "The Road",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Moby Dick",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Da Vinci Code",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Lord of the Rings",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Crime and Punishment",
      "difficulty": "hard",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "The Brothers Karamazov",
      "difficulty": "hard",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Love in the Time of Cholera",
      "difficulty": "hard",
      "description": "A novel written in Spanish by Colombian Nobel Prize–winning author Gabriel García Márquez and published in 1985."
    },
    {
      "word": "A Tale of Two Cities",
      "difficulty": "hard",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Midnight's Children",
      "difficulty": "hard",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Infinite Jest",
      "difficulty": "hard",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "Jean-Paul Sartre",
      "difficulty": "hard",
      "description": "Jean-Paul Charles Aymard Sartre was a French philosopher, playwright, novelist, screenwriter, political activist, biographer, and literary critic, considered a leading figure in..."
    },
    {
      "word": "Walt Whitman",
      "difficulty": "hard",
      "description": "A literature term often clued by author, story, or famous characters."
    },
    {
      "word": "DC Comics",
      "difficulty": "easy",
      "description": "A literature term often clued by author, story, or famous characters."
    }
  ],
  "Video Games": [
    {
      "word": "Mario",
      "difficulty": "easy",
      "description": "Nintendo plumber hero who rescues a princess from Bowser."
    },
    {
      "word": "Pac-Man",
      "difficulty": "easy",
      "description": "Arcade maze classic about eating pellets while avoiding ghosts."
    },
    {
      "word": "Fortnite",
      "difficulty": "easy",
      "description": "Online shooter known for building mechanics and live seasonal events."
    },
    {
      "word": "The Legend of Zelda",
      "difficulty": "easy",
      "description": "Fantasy adventure franchise featuring Link, Hyrule, and the Triforce."
    },
    {
      "word": "Minecraft",
      "difficulty": "easy",
      "description": "Block-based sandbox where players mine, craft, and survive."
    },
    {
      "word": "Pokemon",
      "difficulty": "easy",
      "description": "Creature-collecting RPG series with trainers and evolutions."
    },
    {
      "word": "Tetris",
      "difficulty": "easy",
      "description": "Puzzle title about clearing lines with falling shapes."
    },
    {
      "word": "Super Mario Bros.",
      "difficulty": "easy",
      "description": "NES-era side-scrolling platform adventure with pipes and power-ups."
    },
    {
      "word": "Call of Duty",
      "difficulty": "easy",
      "description": "Military first-person shooter franchise with yearly releases."
    },
    {
      "word": "Overwatch",
      "difficulty": "easy",
      "description": "Hero shooter focused on team roles and objective control."
    },
    {
      "word": "World of Warcraft",
      "difficulty": "easy",
      "description": "Long-running online role-playing game set in Azeroth."
    },
    {
      "word": "FIFA",
      "difficulty": "easy",
      "description": "Annual football simulation series now branded as EA Sports FC."
    },
    {
      "word": "League of Legends",
      "difficulty": "easy",
      "description": "MOBA where teams fight to destroy the enemy Nexus."
    },
    {
      "word": "Grand Theft Auto",
      "difficulty": "easy",
      "description": "Open-world crime franchise known for satirical city settings."
    },
    {
      "word": "Counter-Strike",
      "difficulty": "easy",
      "description": "Tactical shooter centered on terrorists versus counter-terrorists."
    },
    {
      "word": "Sonic the Hedgehog",
      "difficulty": "easy",
      "description": "Fast blue mascot platform franchise from Sega."
    },
    {
      "word": "Final Fantasy",
      "difficulty": "easy",
      "description": "JRPG series with summons, crystals, and epic storytelling."
    },
    {
      "word": "Street Fighter",
      "difficulty": "easy",
      "description": "Arcade fighting series known for Hadouken and tournament play."
    },
    {
      "word": "Halo",
      "difficulty": "easy",
      "description": "Sci-fi shooter starring Master Chief against alien forces."
    },
    {
      "word": "Doom",
      "difficulty": "easy",
      "description": "Fast demon-blasting shooter with iconic heavy-metal energy."
    },
    {
      "word": "Assassin's Creed",
      "difficulty": "easy",
      "description": "Historical stealth-action series about Assassins and Templars."
    },
    {
      "word": "Mortal Kombat",
      "difficulty": "easy",
      "description": "Fighting franchise famous for brutal finishing moves."
    },
    {
      "word": "The Sims",
      "difficulty": "easy",
      "description": "Life simulation title about managing virtual homes and people."
    },
    {
      "word": "StarCraft",
      "difficulty": "easy",
      "description": "Real-time strategy series with Terran, Protoss, and Zerg."
    },
    {
      "word": "Half-Life",
      "difficulty": "easy",
      "description": "Story-driven shooter featuring scientist Gordon Freeman."
    },
    {
      "word": "Gears of War",
      "difficulty": "easy",
      "description": "Cover-based shooter known for chainsaw rifles."
    },
    {
      "word": "Portal",
      "difficulty": "easy",
      "description": "Puzzle title using linked teleportation gates and physics."
    },
    {
      "word": "Civilization",
      "difficulty": "easy",
      "description": "Turn-based empire builder spanning ancient to modern eras."
    },
    {
      "word": "The Witcher",
      "difficulty": "easy",
      "description": "Dark fantasy RPG franchise starring monster hunter Geralt."
    },
    {
      "word": "Super Smash Bros.",
      "difficulty": "hard",
      "description": "Nintendo crossover fighter featuring characters from many franchises."
    },
    {
      "word": "Star Wars Battlefront",
      "difficulty": "hard",
      "description": "Shooter series set across major battles in the Star Wars universe."
    },
    {
      "word": "PUBG",
      "difficulty": "easy",
      "description": "Battle royale where one survivor remains from a large lobby."
    },
    {
      "word": "PlayerUnknown's Battlegrounds",
      "difficulty": "hard",
      "description": "Full title of the battle royale commonly shortened to PUBG."
    },
    {
      "word": "God of War",
      "difficulty": "easy",
      "description": "Action franchise centered on Kratos and mythological conflicts."
    },
    {
      "word": "Rocket League",
      "difficulty": "easy",
      "description": "Competitive soccer played with rocket-powered cars."
    },
    {
      "word": "World of Tanks",
      "difficulty": "hard",
      "description": "Online armored combat game focused on team tank battles."
    },
    {
      "word": "Fortnite Save the World",
      "difficulty": "hard",
      "description": "Co-op mode about defending objectives from AI husks."
    },
    {
      "word": "Destiny",
      "difficulty": "easy",
      "description": "Shared-world shooter with Guardians, loot, and raids."
    },
    {
      "word": "Warframe",
      "difficulty": "easy",
      "description": "Free looter-shooter featuring space ninjas called Tenno."
    },
    {
      "word": "Fortnite Battle Royale",
      "difficulty": "hard",
      "description": "Main PvP mode where a storm circle closes over time."
    },
    {
      "word": "Cyberpunk 2077",
      "difficulty": "easy",
      "description": "Open-world RPG set in neon-lit Night City."
    },
    {
      "word": "Candy Crush Saga",
      "difficulty": "easy",
      "description": "Mobile match-three puzzle game with colorful sweets."
    },
    {
      "word": "Far Cry",
      "difficulty": "easy",
      "description": "Open-world shooter franchise set in unstable remote regions."
    },
    {
      "word": "Animal Crossing",
      "difficulty": "easy",
      "description": "Relaxed life sim about village routines, fishing, and decorating."
    },
    {
      "word": "Borderlands",
      "difficulty": "easy",
      "description": "Looter-shooter series with cel-shaded visuals and wild humor."
    },
    {
      "word": "Zelda",
      "difficulty": "easy",
      "description": "Princess associated with Hyrule's royal bloodline."
    },
    {
      "word": "Sonic",
      "difficulty": "easy",
      "description": "Blue speedster mascot known for rings and loops."
    },
    {
      "word": "Pokémon",
      "difficulty": "easy",
      "description": "Global monster-collecting franchise with gyms and evolutions."
    },
    {
      "word": "Red Dead Redemption",
      "difficulty": "hard",
      "description": "Open-world western series by the GTA developers."
    },
    {
      "word": "Dark Souls",
      "difficulty": "hard",
      "description": "Challenging action RPG known for stamina combat and bonfires."
    },
    {
      "word": "Bioshock",
      "difficulty": "hard",
      "description": "Atmospheric shooter set in the fallen underwater city Rapture."
    },
    {
      "word": "Mass Effect",
      "difficulty": "hard",
      "description": "Sci-fi RPG series led by Commander Shepard."
    },
    {
      "word": "Deus Ex",
      "difficulty": "hard",
      "description": "Cyberpunk immersive sim focused on augmentations and choice."
    },
    {
      "word": "Stardew Valley",
      "difficulty": "hard",
      "description": "Indie farming sim with crops, mining, and town friendships."
    },
    {
      "word": "The Last of Us",
      "difficulty": "hard",
      "description": "Narrative survival game centered on Joel and Ellie."
    },
    {
      "word": "Animal Crossing: New Horizons",
      "difficulty": "hard",
      "description": "Island-life installment released on Nintendo Switch."
    },
    {
      "word": "Call of Duty: Warzone",
      "difficulty": "hard",
      "description": "Free battle royale tied to Activision's military shooter series."
    },
    {
      "word": "Grand Theft Auto V",
      "difficulty": "easy",
      "description": "Mainline entry set in Los Santos with three protagonists."
    },
    {
      "word": "Super Mario Odyssey",
      "difficulty": "hard",
      "description": "3D platform adventure introducing Cappy possession mechanics."
    },
    {
      "word": "The Legend of Zelda: Breath of the Wild",
      "difficulty": "hard",
      "description": "Open-world Hyrule adventure built around chemistry and freedom."
    },
    {
      "word": "The Witcher 3: Wild Hunt",
      "difficulty": "hard",
      "description": "Acclaimed RPG quest to find Ciri before spectral riders."
    },
    {
      "word": "The Sims 4",
      "difficulty": "easy",
      "description": "Life simulation installment with expanded build mode tools."
    },
    {
      "word": "Minecraft Dungeons",
      "difficulty": "easy",
      "description": "Dungeon crawler spin-off from Mojang's block universe."
    },
    {
      "word": "Among Us",
      "difficulty": "easy",
      "description": "Social deduction title with crewmates and impostors."
    },
    {
      "word": "Fall Guys",
      "difficulty": "easy",
      "description": "Party platformer of chaotic obstacle rounds."
    },
    {
      "word": "Genshin Impact",
      "difficulty": "easy",
      "description": "Open-world gacha RPG set in Teyvat."
    },
    {
      "word": "Hades",
      "difficulty": "hard",
      "description": "Roguelike where Zagreus repeatedly attempts to escape the underworld."
    },
    {
      "word": "Sekiro: Shadows Die Twice",
      "difficulty": "hard",
      "description": "Sword-focused action title with posture breaks and parries."
    },
    {
      "word": "Ghost of Tsushima",
      "difficulty": "hard",
      "description": "Samurai open-world adventure during a Mongol invasion."
    },
    {
      "word": "CyberConnect2",
      "difficulty": "hard",
      "description": "Japanese studio known for anime-based action adaptations."
    },
    {
      "word": "Naughty Dog",
      "difficulty": "hard",
      "description": "PlayStation studio behind Uncharted and Joel and Ellie."
    },
    {
      "word": "Rockstar Games",
      "difficulty": "hard",
      "description": "Developer/publisher behind GTA and Red Dead series."
    },
    {
      "word": "Valve Corporation",
      "difficulty": "hard",
      "description": "Studio behind Steam, Gordon Freeman, and Aperture Science."
    },
    {
      "word": "Epic Games",
      "difficulty": "hard",
      "description": "Company behind Unreal Engine and a major battle royale hit."
    },
    {
      "word": "Riot Games",
      "difficulty": "hard",
      "description": "Developer of League of Legends and Valorant."
    },
    {
      "word": "Blizzard Entertainment",
      "difficulty": "hard",
      "description": "Studio behind Warcraft, Diablo, and hero-shooter franchises."
    },
    {
      "word": "Electronic Arts",
      "difficulty": "hard",
      "description": "Large publisher commonly known as EA."
    },
    {
      "word": "Activision",
      "difficulty": "hard",
      "description": "Publisher strongly associated with yearly military shooters."
    },
    {
      "word": "Bandai Namco Entertainment",
      "difficulty": "hard",
      "description": "Japanese publisher tied to Tekken and anime licenses."
    },
    {
      "word": "Capcom",
      "difficulty": "hard",
      "description": "Japanese creator of Resident Evil and Street Fighter."
    },
    {
      "word": "Konami",
      "difficulty": "hard",
      "description": "Company behind Metal Gear and classic football titles."
    },
    {
      "word": "Sega",
      "difficulty": "hard",
      "description": "Japanese company known for Sonic and arcade roots."
    },
    {
      "word": "Square Enix",
      "difficulty": "hard",
      "description": "Publisher behind Final Fantasy and Dragon Quest."
    },
    {
      "word": "Ubisoft",
      "difficulty": "hard",
      "description": "Publisher of Assassin's Creed, Far Cry, and Rainbow Six."
    },
    {
      "word": "Take-Two Interactive",
      "difficulty": "hard",
      "description": "Parent company of Rockstar and 2K labels."
    },
    {
      "word": "Warner Bros. Interactive Entertainment",
      "difficulty": "hard",
      "description": "Publisher of many Batman and LEGO licensed titles."
    },
    {
      "word": "ZeniMax Media",
      "difficulty": "hard",
      "description": "Parent group linked to Bethesda and id Software."
    }
  ],
  "Cars": [
    {
      "word": "Sedan",
      "difficulty": "easy",
      "description": "Four-door passenger car with a separate trunk."
    },
    {
      "word": "Convertible",
      "difficulty": "easy",
      "description": "Car with a folding roof for open-air driving."
    },
    {
      "word": "SUV",
      "difficulty": "easy",
      "description": "Taller family vehicle with high ground clearance and big cabin space."
    },
    {
      "word": "Coupe",
      "difficulty": "easy",
      "description": "Usually a two-door body style with a sporty roofline."
    },
    {
      "word": "Hatchback",
      "difficulty": "easy",
      "description": "Compact body style with a rear door that lifts with the window."
    },
    {
      "word": "Engine",
      "difficulty": "easy",
      "description": "Power unit under the hood that drives the vehicle."
    },
    {
      "word": "Transmission",
      "difficulty": "easy",
      "description": "Gear system that sends power from the motor to the wheels."
    },
    {
      "word": "Headlights",
      "difficulty": "easy",
      "description": "Front lamps used to see the road at night."
    },
    {
      "word": "Wheels",
      "difficulty": "easy",
      "description": "Round parts with tires that roll on the road."
    },
    {
      "word": "Steering wheel",
      "difficulty": "easy",
      "description": "Round control in front of the driver used to turn left or right."
    },
    {
      "word": "Differential",
      "difficulty": "hard",
      "description": "Axle component that lets left and right sides rotate at different speeds."
    },
    {
      "word": "Carburetor",
      "difficulty": "hard",
      "description": "Older device that mixed fuel and air before modern injection systems."
    },
    {
      "word": "Catalytic converter",
      "difficulty": "hard",
      "description": "Exhaust component that cuts harmful emissions."
    },
    {
      "word": "Torque",
      "difficulty": "hard",
      "description": "Twisting force that helps with pulling power and acceleration."
    },
    {
      "word": "RPM",
      "difficulty": "hard",
      "description": "Measure of how many revolutions the motor makes per minute."
    },
    {
      "word": "Drivetrain",
      "difficulty": "hard",
      "description": "Set of parts that carries power from the motor to the road."
    },
    {
      "word": "Suspension",
      "difficulty": "easy",
      "description": "Springs and dampers that smooth bumps and control handling."
    },
    {
      "word": "Chassis",
      "difficulty": "easy",
      "description": "Main structural frame that everything else mounts to."
    },
    {
      "word": "Fuel injection",
      "difficulty": "hard",
      "description": "System that sprays fuel precisely into the motor."
    },
    {
      "word": "Turbocharger",
      "difficulty": "hard",
      "description": "Exhaust-driven compressor that forces extra air for more power."
    },
    {
      "word": "Aston Martin DB11",
      "difficulty": "hard",
      "description": "British grand tourer often linked with James Bond style."
    },
    {
      "word": "Audi Q7",
      "difficulty": "hard",
      "description": "Large German luxury family SUV with optional third-row seating."
    },
    {
      "word": "Audi R8",
      "difficulty": "easy",
      "description": "German mid-engine supercar known for its V10 soundtrack."
    },
    {
      "word": "BMW M3",
      "difficulty": "easy",
      "description": "High-performance German sports sedan from a famous M division."
    },
    {
      "word": "Bugatti Chiron",
      "difficulty": "hard",
      "description": "French hypercar famous for extreme speed and luxury."
    },
    {
      "word": "Bugatti Veyron",
      "difficulty": "easy",
      "description": "Hypercar that broke records by exceeding 400 km/h."
    },
    {
      "word": "Chevrolet Camaro",
      "difficulty": "hard",
      "description": "American muscle coupe that rivals the Mustang."
    },
    {
      "word": "Chevrolet Corvette",
      "difficulty": "hard",
      "description": "Iconic American two-seat sports machine."
    },
    {
      "word": "Ferrari",
      "difficulty": "easy",
      "description": "Italian marque famous for red supercars and Formula 1 heritage."
    },
    {
      "word": "Ferrari 458 Italia",
      "difficulty": "hard",
      "description": "V8 Italian exotic from the early 2010s."
    },
    {
      "word": "Ford Focus RS",
      "difficulty": "hard",
      "description": "All-wheel-drive hot hatch with rally-inspired performance."
    },
    {
      "word": "Ford Mustang",
      "difficulty": "easy",
      "description": "Classic American pony car often associated with V8 power."
    },
    {
      "word": "Ford Mustang GT",
      "difficulty": "hard",
      "description": "V8 performance trim of a famous American pony car."
    },
    {
      "word": "Honda Accord",
      "difficulty": "hard",
      "description": "Well-known midsize Japanese family sedan."
    },
    {
      "word": "Honda Civic",
      "difficulty": "easy",
      "description": "Popular compact Japanese model often used as a first car."
    },
    {
      "word": "Hyundai Sonata",
      "difficulty": "hard",
      "description": "Korean midsize sedan focused on comfort and value."
    },
    {
      "word": "Jeep Grand Cherokee",
      "difficulty": "hard",
      "description": "Midsize American SUV with both luxury and off-road trims."
    },
    {
      "word": "Jeep Wrangler",
      "difficulty": "hard",
      "description": "Boxy off-road icon with removable roof and doors."
    },
    {
      "word": "Lamborghini",
      "difficulty": "easy",
      "description": "Italian brand known for wedge-shaped exotic supercars."
    },
    {
      "word": "Lamborghini Aventador",
      "difficulty": "hard",
      "description": "Flagship Italian V12 supercar with scissor doors."
    },
    {
      "word": "Land Rover Discovery",
      "difficulty": "hard",
      "description": "British family SUV designed for rough trails and long trips."
    },
    {
      "word": "Lexus RX",
      "difficulty": "hard",
      "description": "Luxury Japanese crossover that helped popularize premium SUVs."
    },
    {
      "word": "Maserati GranTurismo",
      "difficulty": "hard",
      "description": "Italian grand tourer with an elegant shape and sporty note."
    },
    {
      "word": "McLaren",
      "difficulty": "easy",
      "description": "British supercar and Formula 1 constructor based in Woking."
    },
    {
      "word": "Mercedes-Benz",
      "difficulty": "easy",
      "description": "German luxury manufacturer represented by a three-pointed star."
    },
    {
      "word": "Mercedes-Benz S-Class",
      "difficulty": "hard",
      "description": "Flagship German luxury sedan known for pioneering tech."
    },
    {
      "word": "Mercedes-Benz GLE",
      "difficulty": "hard",
      "description": "Midsize premium SUV from the three-pointed-star brand."
    },
    {
      "word": "Nissan GT-R",
      "difficulty": "easy",
      "description": "Japanese performance icon nicknamed Godzilla."
    },
    {
      "word": "Pagani Huayra",
      "difficulty": "hard",
      "description": "Hand-built Italian hypercar known for active aerodynamic parts."
    },
    {
      "word": "Porsche 911",
      "difficulty": "easy",
      "description": "Rear-engine German sports model with a timeless silhouette."
    },
    {
      "word": "Range Rover Evoque",
      "difficulty": "hard",
      "description": "Compact premium British SUV with fashion-forward styling."
    },
    {
      "word": "Tesla Model S",
      "difficulty": "hard",
      "description": "Long-range electric luxury sedan with very quick acceleration."
    },
    {
      "word": "Tesla Model X",
      "difficulty": "hard",
      "description": "Electric family SUV famous for falcon-wing rear doors."
    },
    {
      "word": "Tesla",
      "difficulty": "easy",
      "description": "EV company led by Elon Musk."
    },
    {
      "word": "Toyota",
      "difficulty": "easy",
      "description": "Japanese automaker widely known for reliability and hybrids."
    },
    {
      "word": "Toyota Supra",
      "difficulty": "hard",
      "description": "Japanese performance coupe made famous by tuning culture."
    },
    {
      "word": "Volkswagen Beetle",
      "difficulty": "hard",
      "description": "Rounded German classic often called the Bug."
    },
    {
      "word": "Volvo XC60",
      "difficulty": "hard",
      "description": "Swedish midsize SUV known for safety-focused design."
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
      "description": "Casual fashion style influenced by skate and hip-hop culture."
    },
    {
      "word": "Sneakerhead",
      "difficulty": "easy",
      "description": "Enthusiast who collects and follows limited-edition shoes."
    },
    {
      "word": "Tailor",
      "difficulty": "easy",
      "description": "Skilled worker who alters or custom-makes clothing."
    },
    {
      "word": "Runway",
      "difficulty": "hard",
      "description": "Long stage where models present new collections."
    },
    {
      "word": "Lookbook",
      "difficulty": "easy",
      "description": "Styled photo set showing outfit combinations."
    },
    {
      "word": "Bomber Jacket",
      "difficulty": "hard",
      "description": "Waist-length zip jacket with ribbed cuffs and hem."
    },
    {
      "word": "Denim Jacket",
      "difficulty": "easy",
      "description": "Casual outerwear made from sturdy denim fabric."
    },
    {
      "word": "Polo Shirt",
      "difficulty": "easy",
      "description": "Collared short-sleeve knit top with front buttons."
    },
    {
      "word": "Chinos",
      "difficulty": "easy",
      "description": "Cotton trousers seen as smarter than jeans."
    },
    {
      "word": "Turtleneck",
      "difficulty": "hard",
      "description": "Top with a high collar that covers the neck."
    },
    {
      "word": "Pleated Skirt",
      "difficulty": "easy",
      "description": "Skirt made with repeated folded fabric sections."
    },
    {
      "word": "Pencil Skirt",
      "difficulty": "easy",
      "description": "Slim straight skirt that fits close to the body."
    },
    {
      "word": "Maxi Dress",
      "difficulty": "easy",
      "description": "Long dress that reaches the ankles or floor."
    },
    {
      "word": "Cocktail Dress",
      "difficulty": "hard",
      "description": "Semi-formal dress worn at evening social events."
    },
    {
      "word": "Jumpsuit",
      "difficulty": "easy",
      "description": "A jumpsuit is a one-piece garment with sleeves and legs and typically without integral coverings for feet, hands or head."
    },
    {
      "word": "Blazer",
      "difficulty": "easy",
      "description": "Structured jacket used for smart casual or formal outfits."
    },
    {
      "word": "Loafers",
      "difficulty": "easy",
      "description": "Slip-on shoes with no laces."
    },
    {
      "word": "Ankle Boots",
      "difficulty": "hard",
      "description": "Boots that end around the ankle."
    },
    {
      "word": "Stiletto",
      "difficulty": "easy",
      "description": "Shoe with a very thin high heel."
    },
    {
      "word": "Crossbody Bag",
      "difficulty": "easy",
      "description": "Bag worn across the torso using a long strap."
    },
    {
      "word": "Tote Bag",
      "difficulty": "easy",
      "description": "Large carry bag with open top and handles."
    },
    {
      "word": "Clutch Bag",
      "difficulty": "hard",
      "description": "Small hand-held purse, often used for evenings."
    },
    {
      "word": "Bucket Hat",
      "difficulty": "easy",
      "description": "Soft hat with a downward sloping brim."
    },
    {
      "word": "Beanie",
      "difficulty": "easy",
      "description": "Close-fitting knitted cap worn in cooler weather."
    },
    {
      "word": "Silk Scarf",
      "difficulty": "easy",
      "description": "Smooth lightweight scarf made from silk fabric."
    },
    {
      "word": "Leather Jacket",
      "difficulty": "hard",
      "description": "Outerwear made from treated hide, often linked to biker style."
    },
    {
      "word": "Seamstress",
      "difficulty": "easy",
      "description": "Person who sews garments professionally."
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
      "description": "A festival is an event celebrated by a community and centering on some characteristics aspect or aspects of that community and its religion or cultures."
    },
    {
      "word": "Ceremony",
      "difficulty": "easy",
      "description": "A ceremony is a unified ritualistic event with a purpose, usually consisting of a number of artistic components, performed on a special occasion."
    },
    {
      "word": "Tradition",
      "difficulty": "easy",
      "description": "A tradition is a system of beliefs or behaviors passed down within a group of people or society with symbolic meaning or special significance with origins in the past."
    },
    {
      "word": "Innovation",
      "difficulty": "easy",
      "description": "The practical implementation of ideas that result in the creation or improvements of goods or services."
    },
    {
      "word": "Debate",
      "difficulty": "hard",
      "description": "Formal discussion where opposing sides argue viewpoints."
    },
    {
      "word": "Puzzle",
      "difficulty": "easy",
      "description": "A puzzle is a game, problem, or toy that tests a person's ingenuity or knowledge."
    },
    {
      "word": "Masterpiece",
      "difficulty": "easy",
      "description": "A masterpiece, magnum opus, or chef-d'œuvre is a creation that has been given much critical praise, especially one that is considered the greatest work of a person's career or a..."
    },
    {
      "word": "Landmark",
      "difficulty": "easy",
      "description": "Important place or event recognized for significance."
    },
    {
      "word": "Milestone",
      "difficulty": "hard",
      "description": "Major stage or achievement point in progress."
    },
    {
      "word": "Breakthrough",
      "difficulty": "easy",
      "description": "Sudden major advance in science, tech, or effort."
    },
    {
      "word": "Negotiation",
      "difficulty": "easy",
      "description": "A dialogue between two or more parties to resolve points of difference, gain an advantage for an individual or collective, or craft outcomes to satisfy various interests."
    },
    {
      "word": "Strategy",
      "difficulty": "easy",
      "description": "Planned approach for reaching a specific goal."
    },
    {
      "word": "Blueprint",
      "difficulty": "hard",
      "description": "Detailed plan or design before execution."
    },
    {
      "word": "Prototype",
      "difficulty": "easy",
      "description": "Early test version of a product or idea."
    },
    {
      "word": "Headline",
      "difficulty": "easy",
      "description": "Short title summarizing the main news story."
    },
    {
      "word": "Timeline",
      "difficulty": "easy",
      "description": "Chronological sequence of events over time."
    },
    {
      "word": "Checklist",
      "difficulty": "hard",
      "description": "List of tasks or items to be confirmed."
    },
    {
      "word": "Goalpost",
      "difficulty": "easy",
      "description": "Target frame at end of a football or rugby field."
    },
    {
      "word": "Backstory",
      "difficulty": "easy",
      "description": "Background information explaining how things got here."
    },
    {
      "word": "Wildcard",
      "difficulty": "easy",
      "description": "Unpredictable factor that can change the result."
    },
    {
      "word": "Countdown",
      "difficulty": "hard",
      "description": "Backward counting to a launch or deadline."
    },
    {
      "word": "Crowd",
      "difficulty": "easy",
      "description": "Large group of people gathered together."
    },
    {
      "word": "Spotlight",
      "difficulty": "easy",
      "description": "Focused beam of stage light or center of attention."
    },
    {
      "word": "Compass",
      "difficulty": "easy",
      "description": "Navigation tool pointing toward north and other directions."
    },
    {
      "word": "Lifeline",
      "difficulty": "hard",
      "description": "Rescue rope or figurative source of critical support."
    },
    {
      "word": "Mic Drop",
      "difficulty": "easy",
      "description": "Dramatic gesture signaling a final, confident statement."
    },
    {
      "word": "Curveball",
      "difficulty": "easy",
      "description": "Unexpected twist; also a baseball pitch that bends."
    },
    {
      "word": "Highlight Reel",
      "difficulty": "easy",
      "description": "Compilation of the best moments from an event."
    },
    {
      "word": "Fast Track",
      "difficulty": "hard",
      "description": "Accelerated route to finish something sooner."
    },
    {
      "word": "Home Stretch",
      "difficulty": "easy",
      "description": "Final phase before reaching the finish."
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
      "description": "System where citizens choose leaders through voting."
    },
    {
      "word": "Republic",
      "difficulty": "easy",
      "description": "State led by elected representatives rather than a monarch."
    },
    {
      "word": "Constitution",
      "difficulty": "easy",
      "description": "Highest legal framework defining state powers and rights."
    },
    {
      "word": "Parliament",
      "difficulty": "easy",
      "description": "Elected lawmaking body in many countries."
    },
    {
      "word": "Congress",
      "difficulty": "hard",
      "description": "Legislative branch term commonly used in the United States."
    },
    {
      "word": "Senate",
      "difficulty": "easy",
      "description": "Upper chamber in many bicameral legislatures."
    },
    {
      "word": "Cabinet",
      "difficulty": "easy",
      "description": "Group of senior ministers serving the head of government."
    },
    {
      "word": "Prime Minister",
      "difficulty": "easy",
      "description": "Head of government in a parliamentary system."
    },
    {
      "word": "President",
      "difficulty": "hard",
      "description": "Elected national leader in many republics."
    },
    {
      "word": "Vice President",
      "difficulty": "easy",
      "description": "Deputy national leader who can assume top office."
    },
    {
      "word": "Election",
      "difficulty": "easy",
      "description": "Formal vote used to choose public office holders."
    },
    {
      "word": "Ballot Box",
      "difficulty": "easy",
      "description": "Container where paper votes are cast."
    },
    {
      "word": "Referendum",
      "difficulty": "hard",
      "description": "Direct public vote on a specific issue."
    },
    {
      "word": "Coalition Government",
      "difficulty": "easy",
      "description": "Administration formed by two or more parties."
    },
    {
      "word": "Opposition Party",
      "difficulty": "easy",
      "description": "Party that challenges and scrutinizes the ruling side."
    },
    {
      "word": "Campaign Trail",
      "difficulty": "easy",
      "description": "Series of rallies and stops during an election run."
    },
    {
      "word": "Manifesto",
      "difficulty": "hard",
      "description": "Published list of policies and promises from a party."
    },
    {
      "word": "Term Limit",
      "difficulty": "easy",
      "description": "Rule capping how long someone may hold office."
    },
    {
      "word": "Supreme Court",
      "difficulty": "easy",
      "description": "Highest court in a country's judicial system."
    },
    {
      "word": "Separation of Powers",
      "difficulty": "hard",
      "description": "Principle dividing authority across branches of state."
    },
    {
      "word": "Checks and Balances",
      "difficulty": "hard",
      "description": "System where branches restrain each other's power."
    },
    {
      "word": "Federalism",
      "difficulty": "easy",
      "description": "Power shared between national and regional governments."
    },
    {
      "word": "Monarchy",
      "difficulty": "easy",
      "description": "System led by a king or queen."
    },
    {
      "word": "Dictatorship",
      "difficulty": "easy",
      "description": "Rule by one leader with little or no opposition."
    },
    {
      "word": "Sanctions",
      "difficulty": "hard",
      "description": "Economic or political penalties used to apply pressure."
    },
    {
      "word": "Embargo",
      "difficulty": "easy",
      "description": "Official ban on trade with a country or goods."
    },
    {
      "word": "Diplomacy",
      "difficulty": "easy",
      "description": "Managing international relations through negotiation."
    },
    {
      "word": "Ambassador",
      "difficulty": "easy",
      "description": "Top diplomatic representative sent to another state."
    },
    {
      "word": "United Nations",
      "difficulty": "hard",
      "description": "Global organization created to promote peace and cooperation."
    },
    {
      "word": "Security Council",
      "difficulty": "easy",
      "description": "UN body responsible for international peace and security decisions."
    },
    {
      "word": "NATO",
      "difficulty": "easy",
      "description": "Military alliance linking North America and Europe."
    },
    {
      "word": "African Union",
      "difficulty": "easy",
      "description": "Continental organization of African states."
    },
    {
      "word": "BRICS",
      "difficulty": "hard",
      "description": "Bloc of major emerging economies including Brazil, India, China, and South Africa."
    },
    {
      "word": "G20",
      "difficulty": "easy",
      "description": "Forum of major economies coordinating global policy issues."
    },
    {
      "word": "Summit",
      "difficulty": "easy",
      "description": "High-level meeting between national leaders."
    },
    {
      "word": "State of the Nation",
      "difficulty": "hard",
      "description": "Major national address on government priorities."
    },
    {
      "word": "Impeachment",
      "difficulty": "hard",
      "description": "Formal process to remove a top official for misconduct."
    },
    {
      "word": "Filibuster",
      "difficulty": "hard",
      "description": "Extended debate tactic used to delay a legislative vote."
    },
    {
      "word": "Gerrymandering",
      "difficulty": "hard",
      "description": "Manipulating electoral boundaries to favor a party."
    },
    {
      "word": "Census",
      "difficulty": "easy",
      "description": "Official population count used for planning and representation."
    },
    {
      "word": "Public Policy",
      "difficulty": "hard",
      "description": "Government strategy for addressing public issues."
    },
    {
      "word": "Civil Service",
      "difficulty": "easy",
      "description": "Permanent non-elected workforce running government departments."
    },
    {
      "word": "Lobbying",
      "difficulty": "easy",
      "description": "Attempting to influence lawmakers or policy decisions."
    },
    {
      "word": "Whip",
      "difficulty": "easy",
      "description": "Party official who enforces voting discipline."
    },
    {
      "word": "Municipal Council",
      "difficulty": "hard",
      "description": "Elected local body governing city or town matters."
    },
    {
      "word": "Mayor",
      "difficulty": "easy",
      "description": "Elected head of a city government."
    },
    {
      "word": "Governor",
      "difficulty": "easy",
      "description": "Head of a state, province, or region."
    },
    {
      "word": "Ministry of Finance",
      "difficulty": "easy",
      "description": "Government department handling taxation and national budget."
    },
    {
      "word": "Treasury",
      "difficulty": "hard",
      "description": "Public institution that manages state money and debt."
    },
    {
      "word": "Budget Speech",
      "difficulty": "easy",
      "description": "Official presentation of government spending and revenue plans."
    },
    {
      "word": "Tax Reform",
      "difficulty": "easy",
      "description": "Major change to tax rules, rates, or structure."
    },
    {
      "word": "Trade Agreement",
      "difficulty": "easy",
      "description": "Treaty setting terms for commerce between countries."
    },
    {
      "word": "Bilateral Talks",
      "difficulty": "hard",
      "description": "Formal negotiations between two countries."
    },
    {
      "word": "Peace Treaty",
      "difficulty": "easy",
      "description": "Agreement that formally ends a conflict."
    },
    {
      "word": "Ceasefire",
      "difficulty": "easy",
      "description": "Agreement between sides to stop fighting."
    },
    {
      "word": "Cabinet Reshuffle",
      "difficulty": "hard",
      "description": "Leader's reallocation of ministerial posts."
    },
    {
      "word": "Foreign Minister",
      "difficulty": "hard",
      "description": "Cabinet member responsible for foreign relations."
    },
    {
      "word": "Interior Minister",
      "difficulty": "easy",
      "description": "Minister overseeing domestic security and internal affairs."
    },
    {
      "word": "Defense Minister",
      "difficulty": "easy",
      "description": "Cabinet official in charge of military policy."
    },
    {
      "word": "Campaign Donation",
      "difficulty": "easy",
      "description": "Financial contribution made to an election campaign."
    },
    {
      "word": "Polling Station",
      "difficulty": "hard",
      "description": "Place where voters cast ballots."
    },
    {
      "word": "Voter Registration",
      "difficulty": "easy",
      "description": "Process of adding eligible citizens to voting records."
    },
    {
      "word": "Electoral Commission",
      "difficulty": "hard",
      "description": "Independent body that administers and supervises elections."
    },
    {
      "word": "Exit Poll",
      "difficulty": "easy",
      "description": "Survey of voters conducted right after voting."
    },
    {
      "word": "By-election",
      "difficulty": "hard",
      "description": "Vote held to fill a seat vacated between general elections."
    },
    {
      "word": "Coalition Talks",
      "difficulty": "hard",
      "description": "Negotiations between parties to form a joint government."
    },
    {
      "word": "Minority Government",
      "difficulty": "hard",
      "description": "Government formed without holding most seats in parliament."
    },
    {
      "word": "Recall Election",
      "difficulty": "hard",
      "description": "Vote to remove an official before their term ends."
    },
    {
      "word": "Martial Law",
      "difficulty": "hard",
      "description": "Temporary military control replacing normal civil authority."
    },
    {
      "word": "Human Rights Commission",
      "difficulty": "hard",
      "description": "Body that investigates and promotes rights protections."
    },
    {
      "word": "Ombudsman",
      "difficulty": "hard",
      "description": "Independent official handling complaints against public bodies."
    },
    {
      "word": "White House",
      "difficulty": "easy",
      "description": "Official residence and office of the US president."
    },
    {
      "word": "Downing Street",
      "difficulty": "hard",
      "description": "London street containing the UK prime minister's official residence."
    },
    {
      "word": "The Kremlin",
      "difficulty": "easy",
      "description": "Moscow complex associated with Russian state leadership."
    },
    {
      "word": "Union Buildings",
      "difficulty": "easy",
      "description": "Pretoria complex housing South Africa's presidency and national offices."
    },
    {
      "word": "National Assembly",
      "difficulty": "easy",
      "description": "Main elected legislative chamber in many countries."
    },
    {
      "word": "House of Commons",
      "difficulty": "hard",
      "description": "Elected lower chamber of the UK parliament."
    },
    {
      "word": "European Parliament",
      "difficulty": "easy",
      "description": "Directly elected legislature of the European Union."
    },
    {
      "word": "Schengen Area",
      "difficulty": "hard",
      "description": "European zone with passport-free movement between members."
    },
    {
      "word": "Brexit",
      "difficulty": "easy",
      "description": "United Kingdom's withdrawal from the European Union."
    },
    {
      "word": "Public Protector",
      "difficulty": "hard",
      "description": "South African watchdog office investigating state misconduct complaints."
    },
    {
      "word": "Constitutional Court",
      "difficulty": "hard",
      "description": "Highest court for constitutional interpretation and disputes."
    },
    {
      "word": "National Cabinet",
      "difficulty": "easy",
      "description": "Top intergovernmental forum coordinating national decisions."
    },
    {
      "word": "Speaker of Parliament",
      "difficulty": "easy",
      "description": "Presiding officer who manages parliamentary proceedings."
    },
    {
      "word": "Motion of No Confidence",
      "difficulty": "hard",
      "description": "Vote declaring parliament no longer supports a leader."
    },
    {
      "word": "Party List",
      "difficulty": "easy",
      "description": "Ordered candidate list used in proportional representation elections."
    },
    {
      "word": "Electoral Roll",
      "difficulty": "hard",
      "description": "Official register of eligible voters."
    },
    {
      "word": "Border Policy",
      "difficulty": "easy",
      "description": "Government rules on migration, entry controls, and border security."
    },
    {
      "word": "Public Hearing",
      "difficulty": "hard",
      "description": "Official forum where public input is heard on policy matters."
    },
    {
      "word": "Diplomatic Mission",
      "difficulty": "hard",
      "description": "Embassy or consulate representing a country abroad."
    }
  ],
  "Household and Everyday Objects": [
    {
      "word": "Sofa",
      "difficulty": "hard",
      "description": "Padded seating for multiple people in a living room."
    },
    {
      "word": "Armchair",
      "difficulty": "easy",
      "description": "Furniture refers to objects intended to support various human activities such as seating, eating , storing items, working, and sleeping."
    },
    {
      "word": "Coffee Table",
      "difficulty": "easy",
      "description": "Low table usually placed in front of a couch."
    },
    {
      "word": "Dining Table",
      "difficulty": "easy",
      "description": "A French journalist, publicist and author who specialized in housework and home economics."
    },
    {
      "word": "Bedframe",
      "difficulty": "hard",
      "description": "Support structure that holds a mattress off the floor."
    },
    {
      "word": "Mattress",
      "difficulty": "easy",
      "description": "Padded sleeping surface placed on a bed."
    },
    {
      "word": "Pillow",
      "difficulty": "easy",
      "description": "A pillow is a soft fabric cushion used to support the head or body."
    },
    {
      "word": "Blanket",
      "difficulty": "easy",
      "description": "Fabric layer used for warmth while sleeping."
    },
    {
      "word": "Duvet",
      "difficulty": "hard",
      "description": "A duvet, usually called a comforter or quilt in American English, and a doona in Australian English, is a type of bedding consisting of a soft flat bag filled with down, feather..."
    },
    {
      "word": "Wardrobe",
      "difficulty": "hard",
      "description": "Tall cabinet or closet used to store clothing."
    },
    {
      "word": "Hanger",
      "difficulty": "easy",
      "description": "Hooked frame used to hang clothing neatly."
    },
    {
      "word": "Laundry Basket",
      "difficulty": "easy",
      "description": "This is the List of words having different meanings in British and American English: A–L."
    },
    {
      "word": "Iron",
      "difficulty": "hard",
      "description": "Heated appliance used to remove wrinkles from clothes."
    },
    {
      "word": "Ironing Board",
      "difficulty": "hard",
      "description": "The United States provided many inventions in the time from the Colonial Period to the Gilded Age, which were achieved by inventors who were either native-born or naturalized ci..."
    },
    {
      "word": "Vacuum Cleaner",
      "difficulty": "easy",
      "description": "A vacuum cleaner, also known simply as a vacuum, is a device that uses suction, and often agitation, in order to remove dirt and other debris from carpets, hard floors, and othe..."
    },
    {
      "word": "Mop",
      "difficulty": "easy",
      "description": "Floor-cleaning tool used with water."
    },
    {
      "word": "Broom",
      "difficulty": "hard",
      "description": "Long-handled brush used for sweeping."
    },
    {
      "word": "Dustpan",
      "difficulty": "easy",
      "description": "Tray used to collect dirt after sweeping."
    },
    {
      "word": "Bucket",
      "difficulty": "easy",
      "description": "A bucket is typically a watertight, vertical cylinder or truncated cone or square, with an open top and a flat bottom that is attached to a semicircular carrying handle called t..."
    },
    {
      "word": "Dishwasher",
      "difficulty": "easy",
      "description": "Machine that automatically washes dishes."
    },
    {
      "word": "Microwave",
      "difficulty": "hard",
      "description": "Kitchen appliance that heats food quickly."
    },
    {
      "word": "Toaster",
      "difficulty": "easy",
      "description": "Appliance that browns bread slices."
    },
    {
      "word": "Blender",
      "difficulty": "easy",
      "description": "A blender is a kitchen and laboratory appliance used to mix, crush, purée or emulsify food and other substances."
    },
    {
      "word": "Kettle",
      "difficulty": "easy",
      "description": "Vessel or appliance used to boil water."
    },
    {
      "word": "Pressure Cooker",
      "difficulty": "hard",
      "description": "Sealed pot that cooks food faster under pressure."
    },
    {
      "word": "Frying Pan",
      "difficulty": "easy",
      "description": "Shallow pan used for frying or sauteing."
    },
    {
      "word": "Saucepan",
      "difficulty": "easy",
      "description": "Deeper handled pot for boiling or sauces."
    },
    {
      "word": "Cutting Board",
      "difficulty": "easy",
      "description": "Board used for chopping food on a counter."
    },
    {
      "word": "Chef's Knife",
      "difficulty": "hard",
      "description": "All-purpose kitchen knife for slicing and chopping."
    },
    {
      "word": "Peeler",
      "difficulty": "easy",
      "description": "A peeler is a kitchen tool, a distinct type of kitchen knife, consisting of a metal blade with a slot with a sharp edge attached to a handle, used to remove the outer layer of s..."
    },
    {
      "word": "Grater",
      "difficulty": "easy",
      "description": "Tool with sharp holes for shredding food."
    },
    {
      "word": "Colander",
      "difficulty": "hard",
      "description": "Perforated bowl used to drain pasta or rinse produce."
    },
    {
      "word": "Measuring Cup",
      "difficulty": "hard",
      "description": "Cup marked with units for accurate ingredient volumes."
    },
    {
      "word": "Tupperware",
      "difficulty": "hard",
      "description": "An American company that manufactures and internationally distributes preparation, storage, and serving containers for the kitchen and home."
    },
    {
      "word": "Thermos",
      "difficulty": "hard",
      "description": "Insulated flask that keeps drinks hot or cold."
    },
    {
      "word": "Water Bottle",
      "difficulty": "easy",
      "description": "Portable container used for drinking water."
    },
    {
      "word": "Mug",
      "difficulty": "hard",
      "description": "Handled cup commonly used for coffee or tea."
    },
    {
      "word": "Plate",
      "difficulty": "easy",
      "description": "Flat dish used to serve meals."
    },
    {
      "word": "Bowl",
      "difficulty": "easy",
      "description": "A bowl is a typically round dish or container generally used for preparing, serving, storing, or consuming food."
    },
    {
      "word": "Fork",
      "difficulty": "easy",
      "description": "In cutlery or kitchenware, a fork is a utensil, now usually made of metal, whose long handle terminates in a head that branches into several narrow and often slightly curved tin..."
    },
    {
      "word": "Spoon",
      "difficulty": "hard",
      "description": "Utensil with rounded bowl for scooping food."
    },
    {
      "word": "Knife",
      "difficulty": "easy",
      "description": "Bladed utensil used for cutting food."
    },
    {
      "word": "Chopsticks",
      "difficulty": "easy",
      "description": "A shaped pairs of equal-length sticks that have been used as kitchen and eating utensils in most countries of East Asia for over three millennia."
    },
    {
      "word": "Napkin",
      "difficulty": "easy",
      "description": "Cloth or paper used to wipe hands and mouth."
    },
    {
      "word": "Trash Can",
      "difficulty": "hard",
      "description": "Container for regular household waste."
    },
    {
      "word": "Recycling Bin",
      "difficulty": "hard",
      "description": "Container for paper, plastic, and other recyclables."
    },
    {
      "word": "Light Bulb",
      "difficulty": "easy",
      "description": "Replaceable lamp component that emits light."
    },
    {
      "word": "Extension Cord",
      "difficulty": "hard",
      "description": "Cable used to extend electrical outlet reach."
    },
    {
      "word": "Power Strip",
      "difficulty": "hard",
      "description": "Device that provides multiple plugs from one outlet."
    },
    {
      "word": "Remote Control",
      "difficulty": "easy",
      "description": "A vibrator, sometimes described as a massager, is a sex toy that is used on the body to produce pleasurable sexual stimulation."
    },
    {
      "word": "Alarm Clock",
      "difficulty": "easy",
      "description": "Clock that sounds at a preset wake-up time."
    },
    {
      "word": "Wall Clock",
      "difficulty": "easy",
      "description": "The John Deere House and Shop is located in the unincorporated village of Grand Detour, Illinois, near the Lee County city of Dixon."
    },
    {
      "word": "Mirror",
      "difficulty": "hard",
      "description": "Reflective surface used to view your appearance."
    },
    {
      "word": "Shower Curtain",
      "difficulty": "hard",
      "description": "The term \"home front\" covers the activities of the civilians in a nation at war."
    },
    {
      "word": "Toothbrush",
      "difficulty": "easy",
      "description": "Bristled tool used to clean teeth."
    },
    {
      "word": "Toothpaste",
      "difficulty": "easy",
      "description": "Paste applied to a toothbrush for cleaning teeth."
    },
    {
      "word": "Dental Floss",
      "difficulty": "hard",
      "description": "Thin thread used to clean between teeth."
    },
    {
      "word": "Hair Dryer",
      "difficulty": "easy",
      "description": "Appliance that blows warm air to dry hair."
    },
    {
      "word": "Razor",
      "difficulty": "easy",
      "description": "Blade tool used for shaving."
    },
    {
      "word": "Shampoo",
      "difficulty": "easy",
      "description": "A hair care product, typically in the form of a viscous liquid, that is formulated to be used for cleaning hair."
    },
    {
      "word": "Conditioner",
      "difficulty": "hard",
      "description": "Hair product applied after shampoo to soften and smooth."
    },
    {
      "word": "Soap Bar",
      "difficulty": "easy",
      "description": "Solid cleanser used for washing skin."
    },
    {
      "word": "Hand Sanitizer",
      "difficulty": "easy",
      "description": "Alcohol-based gel used to disinfect hands."
    },
    {
      "word": "First Aid Kit",
      "difficulty": "easy",
      "description": "Box with basic medical supplies for minor injuries."
    },
    {
      "word": "Bandage",
      "difficulty": "hard",
      "description": "A bandage is a piece of material used either to support a medical device such as a dressing or splint, or on its own to provide support for the movement of a part of the body."
    },
    {
      "word": "Tape Measure",
      "difficulty": "hard",
      "description": "The skill of making items from wood, and includes cabinetry, furniture making, wood carving, joinery, carpentry, and woodturning."
    },
    {
      "word": "Screwdriver",
      "difficulty": "easy",
      "description": "A screwdriver is a tool, manual or powered, used for turning screws."
    },
    {
      "word": "Hammer",
      "difficulty": "easy",
      "description": "Tool used to drive or remove nails."
    },
    {
      "word": "Pliers",
      "difficulty": "hard",
      "description": "A hand tool used to hold objects firmly, possibly developed from tongs used to handle hot metal in Bronze Age Europe."
    },
    {
      "word": "Wrench",
      "difficulty": "hard",
      "description": "A wrench or spanner is a tool used to provide grip and mechanical advantage in applying torque to turn objects—usually rotary fasteners, such as nuts and bolts—or keep them from..."
    },
    {
      "word": "Drill",
      "difficulty": "hard",
      "description": "Powered tool for making holes and driving screws."
    },
    {
      "word": "Nail",
      "difficulty": "easy",
      "description": "A nail is a protective plate characteristically found at the tip of the digits of almost all primates, corresponding to the claws in other tetrapod animals."
    },
    {
      "word": "Screw",
      "difficulty": "hard",
      "description": "A screw is an externally helical threaded fastener capable of being tightened or released by a twisting force to the head."
    },
    {
      "word": "Tape",
      "difficulty": "easy",
      "description": "Sewing is the craft of fastening or attaching objects using stitches made with needle and thread."
    },
    {
      "word": "Glue Gun",
      "difficulty": "hard",
      "description": "Heated tool that dispenses hot adhesive."
    },
    {
      "word": "Scissors",
      "difficulty": "easy",
      "description": "Two-blade hand tool used for cutting."
    },
    {
      "word": "Stapler",
      "difficulty": "hard",
      "description": "Device that fastens papers with metal staples."
    },
    {
      "word": "Paper Clip",
      "difficulty": "easy",
      "description": "Small bent wire used to hold pages together."
    },
    {
      "word": "Notebook",
      "difficulty": "easy",
      "description": "Bound pages used for taking notes."
    },
    {
      "word": "Pen",
      "difficulty": "easy",
      "description": "A pen is a common writing instrument that applies ink to a surface, typically paper, for writing or drawing."
    },
    {
      "word": "Pencil",
      "difficulty": "hard",
      "description": "A pencil is a writing or drawing implement with a solid pigment core in a protective casing that reduces the risk of core breakage and keeps it from marking the user's hand."
    },
    {
      "word": "Eraser",
      "difficulty": "easy",
      "description": "Rubber tool used to remove pencil marks."
    },
    {
      "word": "Highlighter",
      "difficulty": "hard",
      "description": "Bright marker used to emphasize text."
    },
    {
      "word": "Backpack",
      "difficulty": "easy",
      "description": "Bag carried on shoulders and worn on the back."
    },
    {
      "word": "Umbrella",
      "difficulty": "hard",
      "description": "Foldable canopy used for rain or sun protection."
    },
    {
      "word": "Keychain",
      "difficulty": "easy",
      "description": "A keychain, also called a key chain or keyring, is a small ring or chain of metal to which several keys or fobs can be attached."
    },
    {
      "word": "Wallet",
      "difficulty": "easy",
      "description": "A wallet is a flat case or pouch, often used to carry small personal items such as physical currency, debit cards, and credit cards; identification documents such as driving lic..."
    },
    {
      "word": "Sunglasses",
      "difficulty": "easy",
      "description": "Tinted eyewear that reduces glare from sunlight."
    },
    {
      "word": "Reusable Bag",
      "difficulty": "hard",
      "description": "Durable shopping bag designed for repeated use."
    },
    {
      "word": "Flashlight",
      "difficulty": "hard",
      "description": "Portable battery-powered handheld light."
    }
  ],
  "Professions and Workplaces": [
    {
      "word": "Doctor",
      "difficulty": "hard",
      "description": "Bullying in the medical profession is common, particularly of student or trainee physicians."
    },
    {
      "word": "Nurse",
      "difficulty": "easy",
      "description": "Healthcare professional who cares for patients and assists treatment."
    },
    {
      "word": "Surgeon",
      "difficulty": "easy",
      "description": "Medical specialist who performs operations."
    },
    {
      "word": "Pharmacist",
      "difficulty": "easy",
      "description": "Professional who dispenses medicine and advises on prescriptions."
    },
    {
      "word": "Dentist",
      "difficulty": "hard",
      "description": "Clinician who treats teeth, gums, and oral health."
    },
    {
      "word": "Paramedic",
      "difficulty": "easy",
      "description": "Emergency responder providing medical care before hospital arrival."
    },
    {
      "word": "Physiotherapist",
      "difficulty": "hard",
      "description": "Physical therapy , also known as physiotherapy, is a healthcare profession, as well as the care provided by physical therapists."
    },
    {
      "word": "Veterinarian",
      "difficulty": "easy",
      "description": "A veterinarian or veterinary surgeon is a medical professional who practices veterinary medicine."
    },
    {
      "word": "Teacher",
      "difficulty": "hard",
      "description": "A teacher, also called a schoolteacher or formally an educator, is a person who helps students to acquire knowledge, competence, or virtue, via the practice of teaching."
    },
    {
      "word": "Principal",
      "difficulty": "easy",
      "description": "The feminisation of the workplace is the feminisation, or the shift in gender roles and sex roles and the incorporation of women into a group or a profession once dominated by m..."
    },
    {
      "word": "Professor",
      "difficulty": "easy",
      "description": "An academic rank at universities and other post-secondary education and research institutions in most countries."
    },
    {
      "word": "Lecturer",
      "difficulty": "easy",
      "description": "An academic rank within many universities, though the meaning of the term varies somewhat from country to country."
    },
    {
      "word": "Accountant",
      "difficulty": "hard",
      "description": "An accountant is a practitioner of accounting or accountancy."
    },
    {
      "word": "Auditor",
      "difficulty": "easy",
      "description": "An auditor is a person or a firm appointed by a company to execute an audit."
    },
    {
      "word": "Financial Analyst",
      "difficulty": "hard",
      "description": "A financial analyst is a professional undertaking financial analysis for external or internal clients as a core feature of the job."
    },
    {
      "word": "Banker",
      "difficulty": "easy",
      "description": "Professional handling accounts, loans, and financial services."
    },
    {
      "word": "Investment Broker",
      "difficulty": "hard",
      "description": "A stockbroker is an individual or company that buys and sells stocks and other investments for a financial market participant in return for a commission, markup, or fee."
    },
    {
      "word": "Lawyer",
      "difficulty": "easy",
      "description": "A lawyer is a person who is qualified to offer advice about the law, draft legal documents, or represent individuals in legal matters."
    },
    {
      "word": "Prosecutor",
      "difficulty": "easy",
      "description": "A prosecutor is a legal representative of the prosecution in states with either the adversarial system, which is adopted in common law, or inquisitorial system, which is adopted..."
    },
    {
      "word": "Judge",
      "difficulty": "easy",
      "description": "A judge is a person who presides over court proceedings, either alone or as a part of a judicial panel."
    },
    {
      "word": "Paralegal",
      "difficulty": "hard",
      "description": "A paralegal, also known as a legal assistant or paralegal specialist, is a legal professional who performs tasks that require knowledge of legal concepts but not the full expert..."
    },
    {
      "word": "Police Officer",
      "difficulty": "easy",
      "description": "Law-enforcement worker who maintains public safety."
    },
    {
      "word": "Detective",
      "difficulty": "easy",
      "description": "Investigator who gathers evidence to solve crimes."
    },
    {
      "word": "Firefighter",
      "difficulty": "easy",
      "description": "Emergency responder who extinguishes fires and rescues people."
    },
    {
      "word": "Soldier",
      "difficulty": "hard",
      "description": "A soldier is a person who is a member of an army."
    },
    {
      "word": "Pilot",
      "difficulty": "easy",
      "description": "Professional trained to fly aircraft."
    },
    {
      "word": "Flight Attendant",
      "difficulty": "easy",
      "description": "Cabin crew member responsible for passenger safety and service."
    },
    {
      "word": "Air Traffic Controller",
      "difficulty": "hard",
      "description": "An air traffic controller is a person responsible for the coordination of air traffic within controlled airspace."
    },
    {
      "word": "Mechanic",
      "difficulty": "hard",
      "description": "Technician who repairs and maintains vehicles or machines."
    },
    {
      "word": "Electrician",
      "difficulty": "easy",
      "description": "An electrician is a tradesperson specializing in electrical wiring of buildings, transmission lines, stationary machines, and related equipment."
    },
    {
      "word": "Plumber",
      "difficulty": "easy",
      "description": "A plumber is a tradesperson who specializes in installing and maintaining systems used for potable water, hot-water production, sewage and drainage in plumbing systems."
    },
    {
      "word": "Carpenter",
      "difficulty": "easy",
      "description": "A skilled trade and a craft in which the primary work performed is the cutting, shaping and installation of building materials during the construction of buildings, ships, timbe..."
    },
    {
      "word": "Welder",
      "difficulty": "hard",
      "description": "A welder is a person or equipment that fuses materials together."
    },
    {
      "word": "Civil Engineer",
      "difficulty": "hard",
      "description": "Engineer designing roads, bridges, and public infrastructure."
    },
    {
      "word": "Architect",
      "difficulty": "easy",
      "description": "Professional who designs buildings and built environments."
    },
    {
      "word": "Surveyor",
      "difficulty": "hard",
      "description": "Specialist who measures land boundaries and elevations."
    },
    {
      "word": "Software Engineer",
      "difficulty": "hard",
      "description": "Developer who designs and builds software systems."
    },
    {
      "word": "Data Scientist",
      "difficulty": "easy",
      "description": "A white-collar worker is a person who performs knowledge-based, aptitude-based, managerial, or administrative work generally performed in an office or similar setting."
    },
    {
      "word": "Cybersecurity Analyst",
      "difficulty": "hard",
      "description": "Security specialist protecting systems from digital attacks."
    },
    {
      "word": "UX Designer",
      "difficulty": "hard",
      "description": "A communication of technical subject matter such as engineering, science, or technology content."
    },
    {
      "word": "Graphic Designer",
      "difficulty": "hard",
      "description": "A graphic designer is a practitioner who follows the discipline of graphic design, either within companies or organizations or independently."
    },
    {
      "word": "Photographer",
      "difficulty": "easy",
      "description": "Professional who captures still images."
    },
    {
      "word": "Journalist",
      "difficulty": "easy",
      "description": "Reporter who gathers, verifies, and publishes news."
    },
    {
      "word": "Editor",
      "difficulty": "easy",
      "description": "Person who revises and prepares content for publication."
    },
    {
      "word": "News Anchor",
      "difficulty": "hard",
      "description": "A news presenter – also known as a newsreader, newscaster, anchorman or anchorwoman, news anchor or simply an anchor – is a person who presents news during a news program on TV..."
    },
    {
      "word": "Radio Host",
      "difficulty": "easy",
      "description": "On-air presenter who leads radio programs."
    },
    {
      "word": "Podcaster",
      "difficulty": "easy",
      "description": "Creator who produces and publishes podcast episodes."
    },
    {
      "word": "Chef",
      "difficulty": "easy",
      "description": "Head cook managing menu and kitchen operations."
    },
    {
      "word": "Baker",
      "difficulty": "hard",
      "description": "Professional who makes bread, cakes, and pastries."
    },
    {
      "word": "Waiter",
      "difficulty": "easy",
      "description": "Restaurant staff member serving food and taking orders."
    },
    {
      "word": "Barista",
      "difficulty": "easy",
      "description": "A barista is a person, usually a coffeehouse employee, who prepares and serves espresso-based coffee drinks and other beverages."
    },
    {
      "word": "Farmer",
      "difficulty": "easy",
      "description": "A farmer is a person engaged in agriculture, raising living organisms for food or raw materials."
    },
    {
      "word": "Fisherman",
      "difficulty": "hard",
      "description": "A fisherman or fisher is someone who captures fish and other animals from a body of water, or gathers shellfish."
    },
    {
      "word": "Miner",
      "difficulty": "easy",
      "description": "A miner is a person who extracts ore, coal, chalk, clay, or other minerals from the earth through mining."
    },
    {
      "word": "Geologist",
      "difficulty": "hard",
      "description": "Scientist studying rocks, minerals, and earth processes."
    },
    {
      "word": "Factory Worker",
      "difficulty": "easy",
      "description": "Production employee working on manufacturing lines."
    },
    {
      "word": "Machine Operator",
      "difficulty": "hard",
      "description": "This is a list of obsolete occupations."
    },
    {
      "word": "Forklift Driver",
      "difficulty": "easy",
      "description": "Operator who moves pallets using a forklift."
    },
    {
      "word": "Truck Driver",
      "difficulty": "easy",
      "description": "The gender pay gap in the United States is a measure comparing the earnings of men and women in the workforce."
    },
    {
      "word": "Taxi Driver",
      "difficulty": "easy",
      "description": "A 1976 American neo-noir psychological drama film directed by Martin Scorsese and written by Paul Schrader."
    },
    {
      "word": "Bus Driver",
      "difficulty": "hard",
      "description": "Professional transporting passengers on fixed routes."
    },
    {
      "word": "Train Conductor",
      "difficulty": "easy",
      "description": "A conductor, guard, or travelling ticket examiner, is a member of a train crew responsible for operational and safety duties."
    },
    {
      "word": "Logistician",
      "difficulty": "hard",
      "description": "The part of supply chain management that deals with the efficient forward and reverse flow of goods, services, and related information from the point of origin to the point of c..."
    },
    {
      "word": "Warehouse Manager",
      "difficulty": "hard",
      "description": "A centralized and governed by the Ministry of Education, Religious Affairs, and Sports at all grade levels throughout elementary, middle school, and high school."
    },
    {
      "word": "Retail Cashier",
      "difficulty": "hard",
      "description": "A dead-end job is a job where there is little or no chance of career development and advancement into a better position."
    },
    {
      "word": "Store Manager",
      "difficulty": "easy",
      "description": "A retail manager is the person ultimately responsible for the day-to-day operations of a retail store."
    },
    {
      "word": "Sales Representative",
      "difficulty": "easy",
      "description": "Worker who sells products or services to clients."
    },
    {
      "word": "Real Estate Agent",
      "difficulty": "easy",
      "description": "Licensed professional helping people buy or sell property."
    },
    {
      "word": "Insurance Broker",
      "difficulty": "hard",
      "description": "Adviser who compares and arranges insurance policies."
    },
    {
      "word": "Social Worker",
      "difficulty": "easy",
      "description": "An academic discipline and practice-based profession concerned with meeting the basic needs of individuals, families, groups, communities, and society as a whole to enhance thei..."
    },
    {
      "word": "Psychologist",
      "difficulty": "easy",
      "description": "A psychologist is a professional who practices psychology and studies mental states, perceptual, cognitive, emotional, and social processes and behavior."
    },
    {
      "word": "Counsellor",
      "difficulty": "hard",
      "description": "Vocational rehabilitation, often abbreviated as VR or voc rehab, is a process which enables persons with functional, psychological, developmental, cognitive, and emotional disab..."
    },
    {
      "word": "Therapist",
      "difficulty": "hard",
      "description": "Professional who provides mental or physical therapy."
    },
    {
      "word": "Event Planner",
      "difficulty": "easy",
      "description": "Organizer coordinating venues, vendors, and event schedules."
    },
    {
      "word": "Wedding Planner",
      "difficulty": "easy",
      "description": "Specialist coordinating ceremony and reception details."
    },
    {
      "word": "Interior Designer",
      "difficulty": "easy",
      "description": "The art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space."
    },
    {
      "word": "Fashion Designer",
      "difficulty": "hard",
      "description": "Creator who designs clothing styles and collections."
    },
    {
      "word": "Actor",
      "difficulty": "easy",
      "description": "Performer portraying characters on stage or screen."
    },
    {
      "word": "Music Producer",
      "difficulty": "easy",
      "description": "Person overseeing recording sessions and sound direction."
    },
    {
      "word": "DJ",
      "difficulty": "easy",
      "description": "A disc jockey, more commonly abbreviated as DJ, is a person who plays recorded music for an audience."
    },
    {
      "word": "Choreographer",
      "difficulty": "hard",
      "description": "The art of designing sequences of movements of physical bodies in which motion or form or both are specified."
    },
    {
      "word": "Personal Trainer",
      "difficulty": "easy",
      "description": "Fitness coach creating workout programs for clients."
    },
    {
      "word": "Coach",
      "difficulty": "easy",
      "description": "A paramedic is a healthcare professional trained in the medical model, whose main role has historically been to respond to emergency calls for medical help outside of a hospital."
    },
    {
      "word": "Referee",
      "difficulty": "hard",
      "description": "A referee is an official, in a variety of sports and competition, responsible for enforcing the rules of the sport, including sportsmanship decisions such as ejection."
    },
    {
      "word": "Scientist",
      "difficulty": "hard",
      "description": "A scientist is an expert who conducts scientific research to advance knowledge in science."
    },
    {
      "word": "Lab Technician",
      "difficulty": "hard",
      "description": "General Hospital is the longest-running American television serial drama, airing on ABC since April 1, 1963."
    },
    {
      "word": "Researcher",
      "difficulty": "hard",
      "description": "A creative and systematic work undertaken to increase the stock of knowledge."
    },
    {
      "word": "Museum Curator",
      "difficulty": "hard",
      "description": "An aspect of the history of archaeology and the topic of women in science more generally."
    },
    {
      "word": "Librarian",
      "difficulty": "hard",
      "description": "A librarian is a person who professionally works with information management."
    },
    {
      "word": "Park Ranger",
      "difficulty": "easy",
      "description": "Official who protects parks and helps visitors."
    }
  ],
  "Travel, Transport, and Aviation": [
    {
      "word": "Passport",
      "difficulty": "hard",
      "description": "Government booklet proving identity and nationality for international travel."
    },
    {
      "word": "Visa",
      "difficulty": "easy",
      "description": "Official permission from a country allowing entry."
    },
    {
      "word": "Boarding Pass",
      "difficulty": "easy",
      "description": "Travel document showing seat and gate before a flight."
    },
    {
      "word": "Check-in",
      "difficulty": "hard",
      "description": "Process of registering arrival at airport or accommodation."
    },
    {
      "word": "Carry-on",
      "difficulty": "hard",
      "description": "Bag you keep with you in the cabin, not in checked hold."
    },
    {
      "word": "Suitcase",
      "difficulty": "easy",
      "description": "Portable case used to pack clothes and travel items."
    },
    {
      "word": "Itinerary",
      "difficulty": "easy",
      "description": "Planned schedule of routes, bookings, and activities."
    },
    {
      "word": "Layover",
      "difficulty": "easy",
      "description": "Wait time between two connecting flights."
    },
    {
      "word": "Terminal",
      "difficulty": "hard",
      "description": "Airport building where departures and arrivals are processed."
    },
    {
      "word": "Gate",
      "difficulty": "easy",
      "description": "Numbered departure point where passengers board."
    },
    {
      "word": "Runway",
      "difficulty": "easy",
      "description": "Long strip used by aircraft for takeoff and landing."
    },
    {
      "word": "Air Traffic Control",
      "difficulty": "easy",
      "description": "Ground service guiding aircraft in airspace and on taxiways."
    },
    {
      "word": "Cockpit",
      "difficulty": "hard",
      "description": "Pilot control area at the front of an aircraft."
    },
    {
      "word": "Turbulence",
      "difficulty": "easy",
      "description": "Unstable air that causes a plane to shake."
    },
    {
      "word": "Jet Lag",
      "difficulty": "easy",
      "description": "Body-clock disruption after crossing multiple time zones."
    },
    {
      "word": "Black Box",
      "difficulty": "easy",
      "description": "Flight recorder storing cockpit audio and flight data."
    },
    {
      "word": "Emergency Exit",
      "difficulty": "hard",
      "description": "Marked route or door used for rapid evacuation."
    },
    {
      "word": "Seatbelt Sign",
      "difficulty": "easy",
      "description": "Cabin light telling passengers to buckle up."
    },
    {
      "word": "Economy Class",
      "difficulty": "easy",
      "description": "Standard lower-cost seating section on an airline."
    },
    {
      "word": "Business Class",
      "difficulty": "easy",
      "description": "Premium cabin with larger seats and extra service."
    },
    {
      "word": "First Class",
      "difficulty": "hard",
      "description": "Highest-luxury seating category on many flights."
    },
    {
      "word": "Frequent Flyer",
      "difficulty": "hard",
      "description": "Loyal traveler earning miles and airline rewards."
    },
    {
      "word": "Customs",
      "difficulty": "easy",
      "description": "Border checkpoint for declarations, duties, and inspected goods."
    },
    {
      "word": "Immigration",
      "difficulty": "easy",
      "description": "Passport-control process for entering another country."
    },
    {
      "word": "Duty Free",
      "difficulty": "hard",
      "description": "Airport shopping where certain taxes are not charged."
    },
    {
      "word": "Car Rental",
      "difficulty": "easy",
      "description": "Hiring a vehicle for temporary use while traveling."
    },
    {
      "word": "Road Trip",
      "difficulty": "easy",
      "description": "Long-distance journey mainly done by car."
    },
    {
      "word": "Toll Booth",
      "difficulty": "easy",
      "description": "Roadside point where drivers pay toll fees."
    },
    {
      "word": "Roundabout",
      "difficulty": "hard",
      "description": "Circular road junction where traffic exits by chosen turn."
    },
    {
      "word": "Traffic Jam",
      "difficulty": "easy",
      "description": "Heavy congestion causing very slow road movement."
    },
    {
      "word": "Carpool",
      "difficulty": "easy",
      "description": "Shared ride where multiple people use one vehicle."
    },
    {
      "word": "GPS",
      "difficulty": "easy",
      "description": "Satellite navigation used for route directions."
    },
    {
      "word": "Metro",
      "difficulty": "hard",
      "description": "Urban rapid-transit rail system, often underground."
    },
    {
      "word": "Tram",
      "difficulty": "easy",
      "description": "Street-running rail vehicle used in many cities."
    },
    {
      "word": "High-speed Rail",
      "difficulty": "hard",
      "description": "Fast intercity train service on dedicated tracks."
    },
    {
      "word": "Bullet Train",
      "difficulty": "hard",
      "description": "Very fast train, famously associated with Japan."
    },
    {
      "word": "Platform",
      "difficulty": "easy",
      "description": "Station edge area where passengers board trains."
    },
    {
      "word": "Ticket Inspector",
      "difficulty": "easy",
      "description": "Staff member who checks passengers' travel tickets."
    },
    {
      "word": "Ferry",
      "difficulty": "easy",
      "description": "Boat that transports people or vehicles across water."
    },
    {
      "word": "Cruise Ship",
      "difficulty": "hard",
      "description": "Large leisure passenger vessel with onboard amenities."
    },
    {
      "word": "Lifeboat",
      "difficulty": "easy",
      "description": "Emergency rescue boat carried by larger vessels."
    },
    {
      "word": "Port",
      "difficulty": "easy",
      "description": "Harbor facility where ships dock and load cargo."
    },
    {
      "word": "Harbor",
      "difficulty": "easy",
      "description": "Sheltered coastal water area for anchoring vessels."
    },
    {
      "word": "Canal",
      "difficulty": "hard",
      "description": "Artificial waterway connecting rivers, lakes, or seas."
    },
    {
      "word": "Bridge",
      "difficulty": "easy",
      "description": "Structure carrying road or rail over an obstacle."
    },
    {
      "word": "Tunnel",
      "difficulty": "easy",
      "description": "Underground or underwater passage for transport."
    },
    {
      "word": "Taxi Rank",
      "difficulty": "easy",
      "description": "Designated area where taxis queue for passengers."
    },
    {
      "word": "Ride-share",
      "difficulty": "hard",
      "description": "App-based shared or private passenger ride service."
    },
    {
      "word": "E-hailing",
      "difficulty": "hard",
      "description": "Requesting transport through a mobile app."
    },
    {
      "word": "Bicycle Lane",
      "difficulty": "easy",
      "description": "Road lane reserved specifically for cyclists."
    },
    {
      "word": "Helmet",
      "difficulty": "easy",
      "description": "Protective headgear used while riding."
    },
    {
      "word": "Scooter",
      "difficulty": "hard",
      "description": "Small two-wheeled transport, manual or electric."
    },
    {
      "word": "Motorbike",
      "difficulty": "easy",
      "description": "Two-wheeled vehicle powered by an engine."
    },
    {
      "word": "Caravan",
      "difficulty": "easy",
      "description": "Towable trailer used for camping and road travel."
    },
    {
      "word": "RV",
      "difficulty": "easy",
      "description": "Motorhome combining transport and living space."
    },
    {
      "word": "Camping Site",
      "difficulty": "hard",
      "description": "Designated area where travelers pitch tents or park caravans."
    },
    {
      "word": "Hostel",
      "difficulty": "easy",
      "description": "Budget accommodation with shared rooms and facilities."
    },
    {
      "word": "Guesthouse",
      "difficulty": "easy",
      "description": "Small lodging property, often family-run."
    },
    {
      "word": "Bed and Breakfast",
      "difficulty": "hard",
      "description": "Small accommodation that includes breakfast."
    },
    {
      "word": "Hotel Concierge",
      "difficulty": "hard",
      "description": "Hotel staff member arranging bookings, transport, and recommendations."
    },
    {
      "word": "Room Service",
      "difficulty": "easy",
      "description": "Hotel meal or service delivered directly to room."
    },
    {
      "word": "Check-out",
      "difficulty": "easy",
      "description": "Process of leaving accommodation and settling bill."
    },
    {
      "word": "Travel Insurance",
      "difficulty": "easy",
      "description": "Policy covering cancellations, medical issues, and trip risks."
    },
    {
      "word": "Currency Exchange",
      "difficulty": "hard",
      "description": "Converting one country's money into another's."
    },
    {
      "word": "Time Zone",
      "difficulty": "easy",
      "description": "Regional standard time offset from UTC."
    },
    {
      "word": "Red-eye Flight",
      "difficulty": "hard",
      "description": "Overnight flight that arrives early morning."
    },
    {
      "word": "Stopover",
      "difficulty": "easy",
      "description": "Planned break in a journey between two long segments."
    },
    {
      "word": "Charter Flight",
      "difficulty": "hard",
      "description": "Flight hired privately for a group or special route."
    },
    {
      "word": "Seaplane",
      "difficulty": "hard",
      "description": "Aircraft designed to take off from and land on water."
    },
    {
      "word": "Helicopter",
      "difficulty": "easy",
      "description": "Rotor aircraft capable of vertical takeoff and landing."
    },
    {
      "word": "Hot Air Balloon",
      "difficulty": "easy",
      "description": "Basket aircraft lifted by heated air."
    },
    {
      "word": "Parachute",
      "difficulty": "hard",
      "description": "Fabric canopy that slows descent from height."
    },
    {
      "word": "Border Crossing",
      "difficulty": "easy",
      "description": "Official point where travelers move between countries."
    },
    {
      "word": "Embarkation",
      "difficulty": "hard",
      "description": "Act of boarding a ship, plane, or train."
    },
    {
      "word": "Disembarkation",
      "difficulty": "hard",
      "description": "Act of leaving a ship, plane, or train."
    },
    {
      "word": "Transit Lounge",
      "difficulty": "hard",
      "description": "Airport waiting area for connecting passengers."
    },
    {
      "word": "Window Seat",
      "difficulty": "easy",
      "description": "Seat positioned next to the window."
    },
    {
      "word": "Aisle Seat",
      "difficulty": "hard",
      "description": "Seat located beside the cabin walkway."
    },
    {
      "word": "Overhead Bin",
      "difficulty": "hard",
      "description": "Storage compartment above airline seats for cabin bags."
    },
    {
      "word": "Baggage Claim",
      "difficulty": "hard",
      "description": "Airport area where checked luggage is collected."
    },
    {
      "word": "Lost Luggage",
      "difficulty": "hard",
      "description": "Checked bag that does not arrive with its owner."
    },
    {
      "word": "Travel Adapter",
      "difficulty": "hard",
      "description": "Plug converter for different foreign power sockets."
    },
    {
      "word": "Power Bank",
      "difficulty": "easy",
      "description": "Portable battery used to charge devices."
    },
    {
      "word": "City Pass",
      "difficulty": "hard",
      "description": "Bundle ticket giving entry to multiple attractions."
    },
    {
      "word": "Tourist Trap",
      "difficulty": "hard",
      "description": "Overpriced attraction targeted mainly at visitors."
    },
    {
      "word": "Souvenir Shop",
      "difficulty": "easy",
      "description": "Store selling keepsakes from a destination."
    },
    {
      "word": "Travel Blog",
      "difficulty": "easy",
      "description": "Online journal sharing trip experiences and tips."
    },
    {
      "word": "Backpacker Trail",
      "difficulty": "hard",
      "description": "Popular route followed by budget long-term travelers."
    },
    {
      "word": "Safari Vehicle",
      "difficulty": "easy",
      "description": "Open or modified 4x4 used for wildlife viewing drives."
    }
  ],
  "Internet Culture and Social Media": [
    {
      "word": "Meme",
      "difficulty": "hard",
      "description": "Joke image or video format repeatedly remixed with new captions."
    },
    {
      "word": "Viral Video",
      "difficulty": "easy",
      "description": "Clip that spreads very quickly across social platforms."
    },
    {
      "word": "Hashtag",
      "difficulty": "easy",
      "description": "Keyword with a hash symbol used to group posts."
    },
    {
      "word": "Trending Topic",
      "difficulty": "easy",
      "description": "Subject suddenly receiving high post volume online."
    },
    {
      "word": "Influencer",
      "difficulty": "hard",
      "description": "Online personality whose audience can affect buying choices."
    },
    {
      "word": "Content Creator",
      "difficulty": "easy",
      "description": "Person who regularly makes videos, posts, or streams."
    },
    {
      "word": "Livestream",
      "difficulty": "easy",
      "description": "Real-time video broadcast over the internet."
    },
    {
      "word": "Reaction Video",
      "difficulty": "easy",
      "description": "Clip where someone records their response to other content."
    },
    {
      "word": "Podcast Clip",
      "difficulty": "hard",
      "description": "Short highlight cut from a longer podcast episode."
    },
    {
      "word": "Short-form Video",
      "difficulty": "hard",
      "description": "Brief vertical video format built for quick scrolling."
    },
    {
      "word": "Reel",
      "difficulty": "easy",
      "description": "Instagram's short-video format."
    },
    {
      "word": "Story",
      "difficulty": "easy",
      "description": "Temporary post that usually disappears after 24 hours."
    },
    {
      "word": "Thread",
      "difficulty": "hard",
      "description": "Series of connected posts on one topic."
    },
    {
      "word": "DM",
      "difficulty": "easy",
      "description": "Private direct message sent between users."
    },
    {
      "word": "Comment Section",
      "difficulty": "easy",
      "description": "Area where viewers leave replies under a post."
    },
    {
      "word": "Like Button",
      "difficulty": "easy",
      "description": "Icon used to show quick approval of content."
    },
    {
      "word": "Subscribe Button",
      "difficulty": "hard",
      "description": "Control used to follow a channel for future uploads."
    },
    {
      "word": "Notification Bell",
      "difficulty": "easy",
      "description": "Toggle that alerts followers when new content appears."
    },
    {
      "word": "Algorithm",
      "difficulty": "hard",
      "description": "Ranking system that decides which posts users see first."
    },
    {
      "word": "For You Page",
      "difficulty": "hard",
      "description": "Personalized feed of recommended short videos."
    },
    {
      "word": "Ratioed",
      "difficulty": "hard",
      "description": "When a reply gets far more engagement than the original post."
    },
    {
      "word": "Screenshot",
      "difficulty": "easy",
      "description": "Still image capture of what is on a screen."
    },
    {
      "word": "Screen Recording",
      "difficulty": "easy",
      "description": "Video capture of actions happening on a device screen."
    },
    {
      "word": "Clickbait",
      "difficulty": "easy",
      "description": "Misleading title or image designed to force clicks."
    },
    {
      "word": "Thumbnail",
      "difficulty": "hard",
      "description": "Preview image shown before opening a video."
    },
    {
      "word": "Unboxing",
      "difficulty": "easy",
      "description": "Video showing first opening of a new product."
    },
    {
      "word": "Challenge",
      "difficulty": "easy",
      "description": "Trend where many users copy the same task."
    },
    {
      "word": "Dance Trend",
      "difficulty": "easy",
      "description": "Viral choreography repeatedly copied by users."
    },
    {
      "word": "POV",
      "difficulty": "hard",
      "description": "Video style framed as the viewer's perspective."
    },
    {
      "word": "Life Hack",
      "difficulty": "easy",
      "description": "Quick tip claiming an easier way to do something."
    },
    {
      "word": "Tutorial",
      "difficulty": "easy",
      "description": "Step-by-step instructional content."
    },
    {
      "word": "Vlog",
      "difficulty": "easy",
      "description": "Video diary showing daily life or travel."
    },
    {
      "word": "GRWM",
      "difficulty": "hard",
      "description": "Abbreviation for get ready with me."
    },
    {
      "word": "Duet",
      "difficulty": "easy",
      "description": "Split-screen response format to another creator's clip."
    },
    {
      "word": "Stitch",
      "difficulty": "easy",
      "description": "Feature that inserts part of another clip before your response."
    },
    {
      "word": "Filter",
      "difficulty": "easy",
      "description": "Camera effect that changes color or adds visuals."
    },
    {
      "word": "Face Swap",
      "difficulty": "hard",
      "description": "Effect that exchanges faces between people in media."
    },
    {
      "word": "AR Lens",
      "difficulty": "easy",
      "description": "Augmented-reality overlay used in camera apps."
    },
    {
      "word": "GIF",
      "difficulty": "easy",
      "description": "Short looping animation often used in chats and replies."
    },
    {
      "word": "Emoji",
      "difficulty": "easy",
      "description": "Small pictogram used in digital messages."
    },
    {
      "word": "Sticker Pack",
      "difficulty": "hard",
      "description": "Bundle of graphical stickers used in chat apps."
    },
    {
      "word": "Discord Server",
      "difficulty": "easy",
      "description": "Community space with channels inside Discord."
    },
    {
      "word": "Subreddit",
      "difficulty": "hard",
      "description": "Topic-specific community within Reddit."
    },
    {
      "word": "AMA",
      "difficulty": "hard",
      "description": "Ask Me Anything public Q and A session."
    },
    {
      "word": "Moderator",
      "difficulty": "hard",
      "description": "User who enforces rules in an online community."
    },
    {
      "word": "Shadowban",
      "difficulty": "hard",
      "description": "Hidden restriction that reduces account visibility."
    },
    {
      "word": "Troll",
      "difficulty": "easy",
      "description": "Person posting provocative comments to start arguments."
    },
    {
      "word": "Bot Account",
      "difficulty": "easy",
      "description": "Automated profile posting scripted activity."
    },
    {
      "word": "Fact-check",
      "difficulty": "hard",
      "description": "Verifying whether a claim is accurate."
    },
    {
      "word": "Deepfake",
      "difficulty": "hard",
      "description": "AI-generated media that imitates a real person."
    },
    {
      "word": "Catfish",
      "difficulty": "hard",
      "description": "Person using a fake identity to deceive online."
    },
    {
      "word": "Hot Take",
      "difficulty": "easy",
      "description": "Provocative opinion posted for quick reactions."
    },
    {
      "word": "Clapback",
      "difficulty": "hard",
      "description": "Sharp comeback reply on social media."
    },
    {
      "word": "Cancel Culture",
      "difficulty": "easy",
      "description": "Public push to withdraw support after controversy."
    },
    {
      "word": "Stan",
      "difficulty": "easy",
      "description": "Extremely devoted fan of a celebrity or creator."
    },
    {
      "word": "Fandom",
      "difficulty": "hard",
      "description": "Community of fans around a shared interest."
    },
    {
      "word": "Fan Edit",
      "difficulty": "hard",
      "description": "Remix or montage made by supporters."
    },
    {
      "word": "Shipping",
      "difficulty": "easy",
      "description": "Supporting a romantic pairing between characters or people."
    },
    {
      "word": "Spoiler Alert",
      "difficulty": "easy",
      "description": "Warning that major plot details are about to be revealed."
    },
    {
      "word": "Binge-watch",
      "difficulty": "easy",
      "description": "Watching many episodes in one sitting."
    },
    {
      "word": "Watch Party",
      "difficulty": "hard",
      "description": "Synchronized group viewing session online."
    },
    {
      "word": "Stream Sniping",
      "difficulty": "hard",
      "description": "Using a live broadcast to target a streamer in-game."
    },
    {
      "word": "Speedrun Clip",
      "difficulty": "easy",
      "description": "Highlight from an attempt to finish a game very fast."
    },
    {
      "word": "Esports Highlight",
      "difficulty": "easy",
      "description": "Top moment from a professional gaming match."
    },
    {
      "word": "Patch Notes",
      "difficulty": "hard",
      "description": "Official list of changes released after an update."
    },
    {
      "word": "NFT Avatar",
      "difficulty": "hard",
      "description": "Profile picture linked to blockchain collectible art."
    },
    {
      "word": "Blue Tick",
      "difficulty": "easy",
      "description": "Visual mark showing an account is verified."
    },
    {
      "word": "Verification Badge",
      "difficulty": "hard",
      "description": "Platform symbol confirming account authenticity."
    },
    {
      "word": "Creator Fund",
      "difficulty": "hard",
      "description": "Program that pays creators based on content performance."
    },
    {
      "word": "Monetization",
      "difficulty": "hard",
      "description": "Process of turning content into income."
    },
    {
      "word": "Paywall",
      "difficulty": "hard",
      "description": "Content barrier that requires payment or subscription."
    },
    {
      "word": "Newsletter",
      "difficulty": "easy",
      "description": "Regular email update sent to subscribers."
    },
    {
      "word": "Crowdfunding",
      "difficulty": "hard",
      "description": "Raising project money from many supporters online."
    },
    {
      "word": "Patreon",
      "difficulty": "easy",
      "description": "Membership platform where fans fund creators monthly."
    },
    {
      "word": "Ko-fi",
      "difficulty": "hard",
      "description": "Platform for small one-off donations to creators."
    },
    {
      "word": "Link in Bio",
      "difficulty": "easy",
      "description": "Profile direction that points followers to an external page."
    },
    {
      "word": "Swipe Up",
      "difficulty": "hard",
      "description": "Story gesture that opens a linked page."
    },
    {
      "word": "QR Code",
      "difficulty": "easy",
      "description": "Scannable square code that opens information or links."
    },
    {
      "word": "Geotag",
      "difficulty": "easy",
      "description": "Location marker attached to a post or image."
    },
    {
      "word": "Selfie",
      "difficulty": "easy",
      "description": "Self-taken photo, usually with a phone front camera."
    },
    {
      "word": "Ring Light",
      "difficulty": "hard",
      "description": "Circular light used for even face lighting on camera."
    },
    {
      "word": "Green Screen",
      "difficulty": "easy",
      "description": "Backdrop effect that replaces the background visually."
    },
    {
      "word": "Webcam",
      "difficulty": "easy",
      "description": "Small camera used for streaming and video calls."
    },
    {
      "word": "Mic Check",
      "difficulty": "easy",
      "description": "Quick test to confirm microphone audio is working."
    },
    {
      "word": "Lag Spike",
      "difficulty": "hard",
      "description": "Sudden short burst of network delay during online use."
    },
    {
      "word": "Ping",
      "difficulty": "easy",
      "description": "Latency measurement showing network response time."
    },
    {
      "word": "Cloud Backup",
      "difficulty": "easy",
      "description": "Saving files to remote servers for recovery later."
    },
    {
      "word": "Password Manager",
      "difficulty": "easy",
      "description": "Tool that stores and autofills secure login credentials."
    },
    {
      "word": "Community Guidelines",
      "difficulty": "hard",
      "description": "Platform rules users must follow to avoid penalties."
    },
    {
      "word": "Mute Button",
      "difficulty": "easy",
      "description": "Control that silences microphone or speaker audio."
    }
  ],
  "Crime, Law, and Justice": [
    {
      "word": "Fingerprint",
      "difficulty": "hard",
      "description": "Unique ridge pattern used to identify a person."
    },
    {
      "word": "DNA Evidence",
      "difficulty": "easy",
      "description": "Biological material used to match a person to an investigation."
    },
    {
      "word": "Alibi",
      "difficulty": "easy",
      "description": "Claim that someone was elsewhere when an offense happened."
    },
    {
      "word": "Motive",
      "difficulty": "easy",
      "description": "Reason someone might commit an offense."
    },
    {
      "word": "Suspect",
      "difficulty": "hard",
      "description": "Person believed by investigators to be involved."
    },
    {
      "word": "Witness",
      "difficulty": "easy",
      "description": "Person who saw or heard events and gives an account."
    },
    {
      "word": "Testimony",
      "difficulty": "easy",
      "description": "Statement given under oath in court."
    },
    {
      "word": "Cross-examination",
      "difficulty": "easy",
      "description": "Questioning of a witness by the opposing lawyer."
    },
    {
      "word": "Jury",
      "difficulty": "hard",
      "description": "Group of citizens who decide facts in a trial."
    },
    {
      "word": "Verdict",
      "difficulty": "easy",
      "description": "Final decision reached by a judge or jury."
    },
    {
      "word": "Guilty",
      "difficulty": "easy",
      "description": "Finding that the accused committed the offense."
    },
    {
      "word": "Not Guilty",
      "difficulty": "easy",
      "description": "Finding that charges were not proven beyond reasonable doubt."
    },
    {
      "word": "Mistrial",
      "difficulty": "hard",
      "description": "Trial canceled as invalid and restarted later."
    },
    {
      "word": "Plea Bargain",
      "difficulty": "hard",
      "description": "Deal where a lesser admission leads to reduced punishment."
    },
    {
      "word": "Bail",
      "difficulty": "easy",
      "description": "Money or security paid for release before trial."
    },
    {
      "word": "Parole",
      "difficulty": "easy",
      "description": "Early release from prison under supervision conditions."
    },
    {
      "word": "Probation",
      "difficulty": "hard",
      "description": "Court-ordered supervision instead of serving full jail time."
    },
    {
      "word": "Sentencing",
      "difficulty": "easy",
      "description": "Stage where punishment is set after conviction."
    },
    {
      "word": "Subpoena",
      "difficulty": "easy",
      "description": "Official order requiring attendance or document production."
    },
    {
      "word": "Warrant",
      "difficulty": "easy",
      "description": "Judge-approved order to arrest someone or search property."
    },
    {
      "word": "Arrest",
      "difficulty": "hard",
      "description": "Taking a person into legal custody."
    },
    {
      "word": "Handcuffs",
      "difficulty": "easy",
      "description": "Metal restraints used on a detainee's wrists."
    },
    {
      "word": "Mugshot",
      "difficulty": "easy",
      "description": "Booking photograph taken after detention."
    },
    {
      "word": "Interrogation",
      "difficulty": "easy",
      "description": "Formal police questioning aimed at getting information."
    },
    {
      "word": "Surveillance",
      "difficulty": "hard",
      "description": "Monitoring people or locations to gather intelligence."
    },
    {
      "word": "Wiretap",
      "difficulty": "easy",
      "description": "Intercepting communications under legal authorization."
    },
    {
      "word": "Undercover",
      "difficulty": "easy",
      "description": "Officer operating in disguise inside a target group."
    },
    {
      "word": "Sting Operation",
      "difficulty": "easy",
      "description": "Planned trap where police pose and catch offenders in the act."
    },
    {
      "word": "Crime Scene",
      "difficulty": "hard",
      "description": "Location where an offense occurred and evidence is collected."
    },
    {
      "word": "Forensics",
      "difficulty": "easy",
      "description": "Scientific testing of traces like blood, prints, fibers, and DNA."
    },
    {
      "word": "Autopsy",
      "difficulty": "easy",
      "description": "Medical examination of a body to determine cause of death."
    },
    {
      "word": "Homicide",
      "difficulty": "easy",
      "description": "Killing of one person by another."
    },
    {
      "word": "Manslaughter",
      "difficulty": "hard",
      "description": "Unlawful killing without full premeditated intent."
    },
    {
      "word": "Burglary",
      "difficulty": "easy",
      "description": "Illegal entry into property to steal or commit another offense."
    },
    {
      "word": "Robbery",
      "difficulty": "easy",
      "description": "Taking property from a person using force or threats."
    },
    {
      "word": "Pickpocket",
      "difficulty": "easy",
      "description": "Thief who steals from pockets or bags unnoticed."
    },
    {
      "word": "Fraud",
      "difficulty": "hard",
      "description": "Deception used to gain money or advantage."
    },
    {
      "word": "Embezzlement",
      "difficulty": "easy",
      "description": "Stealing funds that were entrusted to your care."
    },
    {
      "word": "Money Laundering",
      "difficulty": "hard",
      "description": "Making illegally obtained money appear legitimate."
    },
    {
      "word": "Tax Evasion",
      "difficulty": "easy",
      "description": "Illegally avoiding required tax payments."
    },
    {
      "word": "Insider Trading",
      "difficulty": "hard",
      "description": "Buying or selling shares using confidential market information."
    },
    {
      "word": "Cybercrime",
      "difficulty": "easy",
      "description": "Illegal activity carried out through computers and networks."
    },
    {
      "word": "Identity Theft",
      "difficulty": "easy",
      "description": "Using another person's personal details for fraud."
    },
    {
      "word": "Ransomware",
      "difficulty": "easy",
      "description": "Malware that locks files until payment is demanded."
    },
    {
      "word": "Kidnapping",
      "difficulty": "hard",
      "description": "Abducting and holding a person against their will."
    },
    {
      "word": "Blackmail",
      "difficulty": "easy",
      "description": "Threatening exposure of secrets to force compliance."
    },
    {
      "word": "Extortion",
      "difficulty": "easy",
      "description": "Forcing payment or action through threats."
    },
    {
      "word": "Smuggling",
      "difficulty": "easy",
      "description": "Moving banned goods or people across borders secretly."
    },
    {
      "word": "Poaching",
      "difficulty": "hard",
      "description": "Illegal hunting of protected animals."
    },
    {
      "word": "Arson",
      "difficulty": "easy",
      "description": "Deliberately setting property on fire."
    },
    {
      "word": "Vandalism",
      "difficulty": "easy",
      "description": "Intentional damage to public or private property."
    },
    {
      "word": "Trespassing",
      "difficulty": "easy",
      "description": "Entering land or buildings without permission."
    },
    {
      "word": "Perjury",
      "difficulty": "hard",
      "description": "Lying under oath during legal proceedings."
    },
    {
      "word": "Obstruction of Justice",
      "difficulty": "hard",
      "description": "Interfering with an investigation or court process."
    },
    {
      "word": "Contempt of Court",
      "difficulty": "hard",
      "description": "Disobeying or disrespecting the authority of a court."
    },
    {
      "word": "Civil Case",
      "difficulty": "easy",
      "description": "Non-criminal dispute between people or organizations."
    },
    {
      "word": "Class Action",
      "difficulty": "hard",
      "description": "Single lawsuit representing many people with similar claims."
    },
    {
      "word": "Small Claims Court",
      "difficulty": "easy",
      "description": "Court that handles low-value disputes with simpler procedure."
    },
    {
      "word": "Appeal",
      "difficulty": "easy",
      "description": "Request for a higher court to review a decision."
    },
    {
      "word": "Habeas Corpus",
      "difficulty": "hard",
      "description": "Legal right to challenge unlawful detention."
    },
    {
      "word": "Presumption of Innocence",
      "difficulty": "hard",
      "description": "Principle that an accused person is innocent until proven guilty."
    },
    {
      "word": "Statute of Limitations",
      "difficulty": "hard",
      "description": "Time limit for bringing legal action."
    },
    {
      "word": "Double Jeopardy",
      "difficulty": "hard",
      "description": "Rule against being tried twice for the same offense."
    },
    {
      "word": "Judicial Review",
      "difficulty": "hard",
      "description": "Court power to assess laws or state actions against constitutional rules."
    },
    {
      "word": "Public Defender",
      "difficulty": "hard",
      "description": "State-funded lawyer for someone who cannot afford one."
    },
    {
      "word": "District Attorney",
      "difficulty": "hard",
      "description": "Chief local prosecutor representing the state."
    },
    {
      "word": "Defense Attorney",
      "difficulty": "hard",
      "description": "Lawyer who represents an accused person."
    },
    {
      "word": "Court Clerk",
      "difficulty": "easy",
      "description": "Official who manages court files and records."
    },
    {
      "word": "Bailiff",
      "difficulty": "hard",
      "description": "Court officer responsible for security and order."
    },
    {
      "word": "Prison Warden",
      "difficulty": "easy",
      "description": "Person who runs a correctional facility."
    },
    {
      "word": "Solitary Confinement",
      "difficulty": "easy",
      "description": "Holding an inmate alone in an isolation cell."
    },
    {
      "word": "Community Service",
      "difficulty": "easy",
      "description": "Unpaid work ordered by a court as punishment."
    },
    {
      "word": "House Arrest",
      "difficulty": "hard",
      "description": "Serving a sentence at home under strict restrictions."
    },
    {
      "word": "Juvenile Court",
      "difficulty": "hard",
      "description": "Court division handling cases involving minors."
    },
    {
      "word": "Restraining Order",
      "difficulty": "easy",
      "description": "Court order requiring someone to stay away from another person."
    },
    {
      "word": "Search and Seizure",
      "difficulty": "hard",
      "description": "Legal process to inspect property and take evidence."
    },
    {
      "word": "Human Trafficking",
      "difficulty": "hard",
      "description": "Exploitation of people through force, coercion, or deception."
    },
    {
      "word": "Organized Crime",
      "difficulty": "easy",
      "description": "Coordinated illegal activity run by structured groups."
    },
    {
      "word": "Cartel",
      "difficulty": "easy",
      "description": "Powerful criminal network controlling illegal trade."
    },
    {
      "word": "Whistleblower",
      "difficulty": "hard",
      "description": "Insider who exposes wrongdoing to authorities or the public."
    },
    {
      "word": "Corruption",
      "difficulty": "hard",
      "description": "Abuse of entrusted power for personal gain."
    },
    {
      "word": "Bribery",
      "difficulty": "easy",
      "description": "Offering money or favors to influence decisions."
    },
    {
      "word": "Riot Police",
      "difficulty": "easy",
      "description": "Specialized unit trained for crowd control during unrest."
    },
    {
      "word": "Curfew",
      "difficulty": "easy",
      "description": "Rule requiring people to stay indoors during set hours."
    },
    {
      "word": "Case Docket",
      "difficulty": "hard",
      "description": "Official schedule and record of court filings."
    },
    {
      "word": "Chain of Custody",
      "difficulty": "hard",
      "description": "Documented history of who handled evidence and when."
    },
    {
      "word": "Cold Case",
      "difficulty": "easy",
      "description": "Unsolved investigation with no active leads."
    },
    {
      "word": "Evidence Locker",
      "difficulty": "easy",
      "description": "Secure storage area for collected case items."
    },
    {
      "word": "Acquittal",
      "difficulty": "hard",
      "description": "Outcome where the accused is cleared of charges."
    },
    {
      "word": "Conviction",
      "difficulty": "easy",
      "description": "Outcome where the accused is found guilty by the court."
    }
  ],
  "Africa: People, Places, and Events": [
    {
      "word": "Patrice Lumumba",
      "difficulty": "hard",
      "description": "First prime minister of independent Congo, assassinated in 1961."
    },
    {
      "word": "Kwame Nkrumah",
      "difficulty": "easy",
      "description": "Ghana's first leader after independence and a pan-African voice."
    },
    {
      "word": "Haile Selassie",
      "difficulty": "easy",
      "description": "Ethiopian emperor linked with modernization and Rastafari symbolism."
    },
    {
      "word": "Julius Nyerere",
      "difficulty": "easy",
      "description": "Founding leader of Tanzania known for ujamaa socialism."
    },
    {
      "word": "Thomas Sankara",
      "difficulty": "hard",
      "description": "Burkina Faso revolutionary president known for anti-corruption reforms."
    },
    {
      "word": "Wangari Maathai",
      "difficulty": "easy",
      "description": "Kenyan environmentalist who founded the Green Belt Movement."
    },
    {
      "word": "Kofi Annan",
      "difficulty": "easy",
      "description": "Ghanaian diplomat who served as UN Secretary-General."
    },
    {
      "word": "Ellen Johnson Sirleaf",
      "difficulty": "easy",
      "description": "Liberia's first elected female head of state."
    },
    {
      "word": "Paul Kagame",
      "difficulty": "hard",
      "description": "Rwandan president associated with post-1994 rebuilding."
    },
    {
      "word": "Cyril Ramaphosa",
      "difficulty": "easy",
      "description": "South African president and former labor-union figure."
    },
    {
      "word": "Fela Kuti",
      "difficulty": "easy",
      "description": "Nigerian pioneer of Afrobeat and outspoken political musician."
    },
    {
      "word": "Miriam Makeba",
      "difficulty": "easy",
      "description": "South African singer known globally as Mama Africa."
    },
    {
      "word": "Youssou Ndour",
      "difficulty": "hard",
      "description": "Senegalese singer famous for the hit song 7 Seconds."
    },
    {
      "word": "Didier Drogba",
      "difficulty": "easy",
      "description": "Ivory Coast striker best known for his Chelsea career."
    },
    {
      "word": "Sadio Mane",
      "difficulty": "easy",
      "description": "Senegalese forward who starred for Liverpool and Bayern."
    },
    {
      "word": "Eliud Kipchoge",
      "difficulty": "hard",
      "description": "Kenyan marathon legend who ran a sub-two-hour exhibition race."
    },
    {
      "word": "Caster Semenya",
      "difficulty": "easy",
      "description": "South African Olympic middle-distance champion."
    },
    {
      "word": "Siya Kolisi",
      "difficulty": "easy",
      "description": "Springbok captain who lifted the 2019 Rugby World Cup."
    },
    {
      "word": "Francois Pienaar",
      "difficulty": "easy",
      "description": "South African rugby captain during the 1995 World Cup win."
    },
    {
      "word": "Amina J Mohammed",
      "difficulty": "hard",
      "description": "Nigerian diplomat serving as UN Deputy Secretary-General."
    },
    {
      "word": "Aliko Dangote",
      "difficulty": "easy",
      "description": "Nigerian business magnate known for cement and manufacturing."
    },
    {
      "word": "Ngozi Okonjo-Iweala",
      "difficulty": "hard",
      "description": "Nigerian economist who became WTO Director-General."
    },
    {
      "word": "Trevor Noah",
      "difficulty": "easy",
      "description": "South African comedian and former host of The Daily Show."
    },
    {
      "word": "Chinua Achebe",
      "difficulty": "hard",
      "description": "Nigerian author of Things Fall Apart."
    },
    {
      "word": "Ngugi wa Thiongo",
      "difficulty": "hard",
      "description": "Kenyan novelist and critic known for decolonial literature."
    },
    {
      "word": "Nadine Gordimer",
      "difficulty": "easy",
      "description": "South African Nobel Prize-winning novelist."
    },
    {
      "word": "Bessie Head",
      "difficulty": "hard",
      "description": "Writer based in Botswana, known for A Question of Power."
    },
    {
      "word": "Chimamanda Ngozi Adichie",
      "difficulty": "hard",
      "description": "Nigerian author of Americanah and Half of a Yellow Sun."
    },
    {
      "word": "Wole Soyinka",
      "difficulty": "easy",
      "description": "Nigerian playwright and first African Nobel laureate in literature."
    },
    {
      "word": "Table Mountain",
      "difficulty": "easy",
      "description": "Flat-topped mountain overlooking Cape Town."
    },
    {
      "word": "Kruger National Park",
      "difficulty": "easy",
      "description": "Major South African safari reserve with the Big Five."
    },
    {
      "word": "Victoria Falls",
      "difficulty": "easy",
      "description": "Huge waterfall on the border of Zambia and Zimbabwe."
    },
    {
      "word": "Lake Tanganyika",
      "difficulty": "easy",
      "description": "Very deep East African Great Lake shared by four countries."
    },
    {
      "word": "Great Rift Valley",
      "difficulty": "easy",
      "description": "Massive geological valley system stretching through East Africa."
    },
    {
      "word": "Atlas Mountains",
      "difficulty": "hard",
      "description": "Mountain range across Morocco, Algeria, and Tunisia."
    },
    {
      "word": "Drakensberg",
      "difficulty": "easy",
      "description": "High escarpment range along eastern South Africa and Lesotho."
    },
    {
      "word": "Zanzibar",
      "difficulty": "easy",
      "description": "Tanzanian island archipelago known for spice trade and Stone Town."
    },
    {
      "word": "Timbuktu",
      "difficulty": "easy",
      "description": "Historic city in Mali linked to Saharan trade and manuscripts."
    },
    {
      "word": "Lagos",
      "difficulty": "hard",
      "description": "Nigeria's biggest city and a major business hub."
    },
    {
      "word": "Cairo",
      "difficulty": "easy",
      "description": "Egypt's capital near the Nile and the pyramids."
    },
    {
      "word": "Nairobi",
      "difficulty": "easy",
      "description": "Capital of Kenya and major East African business center."
    },
    {
      "word": "Johannesburg",
      "difficulty": "easy",
      "description": "South Africa's largest city, built on gold-mining history."
    },
    {
      "word": "Cape Town",
      "difficulty": "hard",
      "description": "South African coastal city between ocean and a flat-topped mountain."
    },
    {
      "word": "Addis Ababa",
      "difficulty": "easy",
      "description": "Ethiopian capital and home of the African Union headquarters."
    },
    {
      "word": "Kigali",
      "difficulty": "easy",
      "description": "Capital of Rwanda, known for cleanliness and rapid development."
    },
    {
      "word": "Dakar",
      "difficulty": "easy",
      "description": "Senegal's Atlantic capital on the Cape Verde Peninsula."
    },
    {
      "word": "Accra",
      "difficulty": "hard",
      "description": "Capital city of Ghana on the Gulf of Guinea."
    },
    {
      "word": "Casablanca",
      "difficulty": "easy",
      "description": "Morocco's largest city and financial center on the Atlantic coast."
    },
    {
      "word": "Marrakesh",
      "difficulty": "easy",
      "description": "Moroccan city known for medina markets and red walls."
    },
    {
      "word": "Maputo",
      "difficulty": "easy",
      "description": "Capital and main port city of Mozambique."
    },
    {
      "word": "Windhoek",
      "difficulty": "hard",
      "description": "Capital city of Namibia in the central highlands."
    },
    {
      "word": "Lusaka",
      "difficulty": "easy",
      "description": "Capital of Zambia and national political center."
    },
    {
      "word": "Harare",
      "difficulty": "easy",
      "description": "Capital and largest city of Zimbabwe."
    },
    {
      "word": "Gaborone",
      "difficulty": "easy",
      "description": "Capital of Botswana near the South African border."
    },
    {
      "word": "Kampala",
      "difficulty": "hard",
      "description": "Ugandan capital traditionally described as built on seven hills."
    },
    {
      "word": "Dar es Salaam",
      "difficulty": "easy",
      "description": "Tanzania's major commercial port city on the Indian Ocean."
    },
    {
      "word": "Abuja",
      "difficulty": "easy",
      "description": "Planned capital city in central Nigeria."
    },
    {
      "word": "Alexandria",
      "difficulty": "easy",
      "description": "Major Egyptian Mediterranean city founded in the Hellenistic era."
    },
    {
      "word": "Soweto Uprising",
      "difficulty": "hard",
      "description": "1976 student protest against apartheid language policy in schools."
    },
    {
      "word": "Sharpeville Massacre",
      "difficulty": "hard",
      "description": "1960 police shooting of anti-pass-law protesters in South Africa."
    },
    {
      "word": "End of Apartheid",
      "difficulty": "easy",
      "description": "South Africa's transition to multiracial democracy in the early 1990s."
    },
    {
      "word": "Mandela Release",
      "difficulty": "easy",
      "description": "Nelson Mandela freed in 1990 after 27 years in prison."
    },
    {
      "word": "Rwandan Genocide",
      "difficulty": "hard",
      "description": "1994 mass killings targeting Tutsi and moderate Hutu communities."
    },
    {
      "word": "Battle of Isandlwana",
      "difficulty": "hard",
      "description": "Major 1879 Zulu victory over British imperial forces."
    },
    {
      "word": "Africa Cup of Nations",
      "difficulty": "easy",
      "description": "Top continental football tournament for African national teams."
    },
    {
      "word": "2010 FIFA World Cup",
      "difficulty": "easy",
      "description": "First men's World Cup hosted on African soil, held in South Africa."
    },
    {
      "word": "Arab Spring Tunisia",
      "difficulty": "hard",
      "description": "Uprising in Tunisia that helped ignite wider regional protests."
    },
    {
      "word": "African Union Summit",
      "difficulty": "hard",
      "description": "Meeting of heads of state from AU member nations."
    },
    {
      "word": "Great Zimbabwe",
      "difficulty": "hard",
      "description": "Ancient stone-ruin city from a medieval Shona kingdom."
    },
    {
      "word": "Benin Bronzes",
      "difficulty": "hard",
      "description": "Historic plaques and sculptures taken from the Benin Kingdom."
    },
    {
      "word": "Mali Empire",
      "difficulty": "hard",
      "description": "Powerful medieval West African empire linked with Mansa Musa."
    },
    {
      "word": "Songhai Empire",
      "difficulty": "hard",
      "description": "Major West African empire centered on Gao after Mali."
    },
    {
      "word": "Kingdom of Axum",
      "difficulty": "hard",
      "description": "Ancient Horn of Africa state tied to early Christianity."
    },
    {
      "word": "Ethiopian Highlands",
      "difficulty": "easy",
      "description": "High-elevation region often called the roof of East Africa."
    },
    {
      "word": "Namib Desert",
      "difficulty": "hard",
      "description": "Coastal desert famous for towering red dunes."
    },
    {
      "word": "Kalahari Desert",
      "difficulty": "easy",
      "description": "Large semi-arid desert basin in southern Africa."
    },
    {
      "word": "Nile Delta",
      "difficulty": "easy",
      "description": "Fertile fan-shaped region where the Nile meets the Mediterranean."
    },
    {
      "word": "Congo Basin",
      "difficulty": "hard",
      "description": "Vast central African rainforest system around a major river."
    },
    {
      "word": "Lake Malawi",
      "difficulty": "hard",
      "description": "Long freshwater lake famous for colorful cichlid species."
    },
    {
      "word": "Mount Kenya",
      "difficulty": "easy",
      "description": "Africa's second-highest mountain peak."
    },
    {
      "word": "Mount Elgon",
      "difficulty": "easy",
      "description": "Extinct volcano straddling the Kenya-Uganda border."
    },
    {
      "word": "Blyde River Canyon",
      "difficulty": "hard",
      "description": "Large green canyon in Mpumalanga, South Africa."
    },
    {
      "word": "Robben Island",
      "difficulty": "hard",
      "description": "Prison island where Nelson Mandela was incarcerated."
    },
    {
      "word": "Constitution Hill",
      "difficulty": "hard",
      "description": "Johannesburg site of South Africa's Constitutional Court."
    },
    {
      "word": "Sahara Trade Routes",
      "difficulty": "hard",
      "description": "Historic caravan networks moving salt, gold, and goods across the desert."
    },
    {
      "word": "Swahili Coast",
      "difficulty": "hard",
      "description": "East African coastal culture shaped by Indian Ocean trade."
    },
    {
      "word": "Blue Nile",
      "difficulty": "hard",
      "description": "Ethiopian tributary providing much of the Nile's flow."
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
      "description": "After-dark wildlife experience where visitors view animals on guided evening tours."
    }
  ]
};
