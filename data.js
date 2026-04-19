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
      "description": "Common name for Mount Everest, the highest peak in the world."
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
      "description": "Technology company known for its search engine, as well as products like Android, YouTube, and Google Cloud."
    },
    {
      "word": "Microsoft",
      "difficulty": "easy",
      "description": "Technology company known for its software products, including the Windows operating system and Microsoft Office suite."
    },
    {
      "word": "Amazon",
      "difficulty": "easy",
      "description": "E-commerce and cloud computing company known for its online retail platform and Amazon Web Services (AWS)."
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
      "description": "A novel by Herman Melville that follows Captain Ahab's obsessive quest to hunt the elusive white whale, Moby Dick."
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
      "description": "A tragedy by William Shakespeare about Prince Hamlet's quest for revenge against his uncle, who has murdered Hamlet's father."
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
      "description": "A Gothic horror novel by Bram Stoker about Count Dracula's attempt to move from Transylvania to England in order to spread the undead curse."
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
      "description": "A satirical novel by Jonathan Swift detailing Lemuel Gulliver's travels to fantastical lands, including Lilliput and Brobdingnag."
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
      "description": "A novel by George Eliot (Mary Ann Evans) about the lives of residents in the fictional town of Middlemarch, exploring social and political issues."
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
      "description": "William Shakespeare, an English playwright and poet, known for his influential plays and sonnets, including 'Hamlet' and 'Romeo and Juliet.'"
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
      "description": "The entertainment district in Los Angeles known for its film industry, including major studios, theaters, and the iconic Hollywood sign."
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
      "description": "Beethoven is commonly used in Music themed clues."
    },
    {
      "word": "The Beatles",
      "difficulty": "easy",
      "description": "The Beatles is a clueable term relevant to Music."
    },
    {
      "word": "Rock and Roll",
      "difficulty": "easy",
      "description": "Rock and Roll is commonly used in Music themed clues."
    },
    {
      "word": "Mozart",
      "difficulty": "easy",
      "description": "Mozart is a clueable term relevant to Music."
    },
    {
      "word": "Jazz",
      "difficulty": "easy",
      "description": "Jazz is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Hip Hop",
      "difficulty": "easy",
      "description": "Hip Hop fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Opera",
      "difficulty": "easy",
      "description": "Opera fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Elvis Presley",
      "difficulty": "easy",
      "description": "Elvis Presley is commonly used in Music themed clues."
    },
    {
      "word": "Piano",
      "difficulty": "easy",
      "description": "Piano is a clueable term relevant to Music."
    },
    {
      "word": "Violin",
      "difficulty": "easy",
      "description": "Violin fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Michael Jackson",
      "difficulty": "easy",
      "description": "Michael Jackson fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Blues",
      "difficulty": "easy",
      "description": "Blues is a clueable term relevant to Music."
    },
    {
      "word": "The Rolling Stones",
      "difficulty": "easy",
      "description": "The Rolling Stones is commonly used in Music themed clues."
    },
    {
      "word": "Country Music",
      "difficulty": "easy",
      "description": "Country Music is a clueable term relevant to Music."
    },
    {
      "word": "Classical Music",
      "difficulty": "easy",
      "description": "Classical Music fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Reggae",
      "difficulty": "easy",
      "description": "Reggae is a clueable term relevant to Music."
    },
    {
      "word": "Guitar",
      "difficulty": "easy",
      "description": "Guitar is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Choir",
      "difficulty": "easy",
      "description": "Choir fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Broadway Musical",
      "difficulty": "easy",
      "description": "Broadway Musical is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Rap",
      "difficulty": "easy",
      "description": "Rap fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Saxophone",
      "difficulty": "easy",
      "description": "Saxophone is commonly used in Music themed clues."
    },
    {
      "word": "Folk Music",
      "difficulty": "easy",
      "description": "Folk Music fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Salsa",
      "difficulty": "easy",
      "description": "Salsa is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "DJ",
      "difficulty": "easy",
      "description": "DJ is commonly used in Music themed clues."
    },
    {
      "word": "Chopin",
      "difficulty": "easy",
      "description": "Chopin is a clueable term relevant to Music."
    },
    {
      "word": "Acoustic Guitar",
      "difficulty": "easy",
      "description": "Acoustic Guitar is a clueable term relevant to Music."
    },
    {
      "word": "Heavy Metal",
      "difficulty": "easy",
      "description": "Heavy Metal is commonly used in Music themed clues."
    },
    {
      "word": "Electronic Music",
      "difficulty": "easy",
      "description": "Electronic Music fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Opera Singer",
      "difficulty": "easy",
      "description": "Opera Singer is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Woodstock",
      "difficulty": "easy",
      "description": "Woodstock is commonly used in Music themed clues."
    },
    {
      "word": "Concerto",
      "difficulty": "easy",
      "description": "Concerto is commonly used in Music themed clues."
    },
    {
      "word": "Drum Set",
      "difficulty": "easy",
      "description": "Drum Set fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "R&B",
      "difficulty": "easy",
      "description": "R&B is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Baroque Music",
      "difficulty": "easy",
      "description": "Baroque Music is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Trumpet",
      "difficulty": "easy",
      "description": "Trumpet is a clueable term relevant to Music."
    },
    {
      "word": "Synthesizer",
      "difficulty": "easy",
      "description": "Synthesizer fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Festival",
      "difficulty": "easy",
      "description": "Festival fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Marching Band",
      "difficulty": "easy",
      "description": "Marching Band is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Singer-Songwriter",
      "difficulty": "easy",
      "description": "Singer-Songwriter is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Motown",
      "difficulty": "easy",
      "description": "Motown is commonly used in Music themed clues."
    },
    {
      "word": "Orchestra",
      "difficulty": "easy",
      "description": "Orchestra is commonly used in Music themed clues."
    },
    {
      "word": "Grammy Awards",
      "difficulty": "easy",
      "description": "Grammy Awards is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Conducting",
      "difficulty": "easy",
      "description": "Conducting is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Punk Rock",
      "difficulty": "easy",
      "description": "Punk Rock is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Bass Guitar",
      "difficulty": "easy",
      "description": "Bass Guitar fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Songwriting",
      "difficulty": "easy",
      "description": "Songwriting is commonly used in Music themed clues."
    },
    {
      "word": "Keyboard",
      "difficulty": "easy",
      "description": "Keyboard is commonly used in Music themed clues."
    },
    {
      "word": "Rhythm and Blues",
      "difficulty": "easy",
      "description": "Rhythm and Blues is commonly used in Music themed clues."
    },
    {
      "word": "Beyoncé",
      "difficulty": "easy",
      "description": "Beyoncé is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Freddie Mercury",
      "difficulty": "hard",
      "description": "Freddie Mercury is a clueable term relevant to Music."
    },
    {
      "word": "Adele",
      "difficulty": "easy",
      "description": "Adele fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Ed Sheeran",
      "difficulty": "easy",
      "description": "Ed Sheeran is a clueable term relevant to Music."
    },
    {
      "word": "Taylor Swift",
      "difficulty": "easy",
      "description": "Taylor Swift fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Madonna",
      "difficulty": "easy",
      "description": "Madonna fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Queen",
      "difficulty": "easy",
      "description": "Queen is commonly used in Music themed clues."
    },
    {
      "word": "Rolling Stones",
      "difficulty": "easy",
      "description": "Rolling Stones is a clueable term relevant to Music."
    },
    {
      "word": "Lady Gaga",
      "difficulty": "easy",
      "description": "Lady Gaga is commonly used in Music themed clues."
    },
    {
      "word": "Justin Bieber",
      "difficulty": "easy",
      "description": "Justin Bieber is commonly used in Music themed clues."
    },
    {
      "word": "Led Zeppelin",
      "difficulty": "hard",
      "description": "Led Zeppelin fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Pink Floyd",
      "difficulty": "hard",
      "description": "Pink Floyd is commonly used in Music themed clues."
    },
    {
      "word": "Fleetwood Mac",
      "difficulty": "hard",
      "description": "Fleetwood Mac is a clueable term relevant to Music."
    },
    {
      "word": "Red Hot Chili Peppers",
      "difficulty": "hard",
      "description": "Red Hot Chili Peppers is commonly used in Music themed clues."
    },
    {
      "word": "Nine Inch Nails",
      "difficulty": "hard",
      "description": "Nine Inch Nails is commonly used in Music themed clues."
    },
    {
      "word": "The Smashing Pumpkins",
      "difficulty": "hard",
      "description": "The Smashing Pumpkins fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Rage Against the Machine",
      "difficulty": "hard",
      "description": "Rage Against the Machine is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Radiohead",
      "difficulty": "hard",
      "description": "Radiohead is commonly used in Music themed clues."
    },
    {
      "word": "The Cure",
      "difficulty": "hard",
      "description": "The Cure fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Depeche Mode",
      "difficulty": "hard",
      "description": "Depeche Mode is a clueable term relevant to Music."
    },
    {
      "word": "Aretha Franklin",
      "difficulty": "easy",
      "description": "Aretha Franklin is commonly used in Music themed clues."
    },
    {
      "word": "Ariana Grande",
      "difficulty": "easy",
      "description": "Ariana Grande is commonly used in Music themed clues."
    },
    {
      "word": "Bob Dylan",
      "difficulty": "easy",
      "description": "Bob Dylan fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Drake",
      "difficulty": "easy",
      "description": "Drake is a clueable term relevant to Music."
    },
    {
      "word": "Elton John",
      "difficulty": "easy",
      "description": "Elton John fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "John Lennon",
      "difficulty": "easy",
      "description": "John Lennon is a clueable term relevant to Music."
    },
    {
      "word": "Paul McCartney",
      "difficulty": "easy",
      "description": "Paul McCartney fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Rihanna",
      "difficulty": "easy",
      "description": "Rihanna is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Whitney Houston",
      "difficulty": "easy",
      "description": "Whitney Houston is a clueable term relevant to Music."
    },
    {
      "word": "Rolling in the Deep",
      "difficulty": "hard",
      "description": "Rolling in the Deep is a clueable term relevant to Music."
    },
    {
      "word": "Shape of You",
      "difficulty": "easy",
      "description": "Shape of You is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Blinding Lights",
      "difficulty": "hard",
      "description": "Blinding Lights is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Hey Jude",
      "difficulty": "hard",
      "description": "Hey Jude is a clueable term relevant to Music."
    },
    {
      "word": "Someone Like You",
      "difficulty": "hard",
      "description": "Someone Like You fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Uptown Funk",
      "difficulty": "hard",
      "description": "Uptown Funk is commonly used in Music themed clues."
    },
    {
      "word": "U2",
      "difficulty": "hard",
      "description": "U2 is a clueable term relevant to Music."
    },
    {
      "word": "Coldplay",
      "difficulty": "easy",
      "description": "Coldplay is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Nirvana",
      "difficulty": "hard",
      "description": "Nirvana fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "AC/DC",
      "difficulty": "easy",
      "description": "AC/DC is a useful Music reference for fast team guessing rounds."
    },
    {
      "word": "Tyla",
      "difficulty": "easy",
      "description": "Famous female South African singer known for her song Water"
    },
    {
      "word": "Amapiano",
      "difficulty": "hard",
      "description": "South African music genre taken from the word of a musical instrument"
    },
    {
      "word": "Cassper Nyovest",
      "difficulty": "hard",
      "description": "Cassper Nyovest fits the Music category for quick, descriptive gameplay."
    },
    {
      "word": "Black Coffee",
      "difficulty": "easy",
      "description": "South African DJ, record producer and songwriter. Stage name is derived from a hot beverage."
    },
    {
      "word": "AKA",
      "difficulty": "hard",
      "description": "South African rapper, record producer, and businessman that was assasinated in 2023."
    },
    {
      "word": "Cape Town Jazz Festival",
      "difficulty": "easy",
      "description": "Annual music festival showcasing local and international jazz artists."
    },
    {
      "word": "Oppikoppi",
      "difficulty": "hard",
      "description": "Popular music festival held in the Limpopo Province."
    }
  ],
  "Sports": [
    {
      "word": "Football",
      "difficulty": "easy",
      "description": "Football is a clueable term relevant to Sports."
    },
    {
      "word": "Basketball",
      "difficulty": "easy",
      "description": "Basketball is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Soccer",
      "difficulty": "easy",
      "description": "Soccer is commonly used in Sports themed clues."
    },
    {
      "word": "Tennis",
      "difficulty": "easy",
      "description": "Tennis is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Golf",
      "difficulty": "easy",
      "description": "Golf is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Baseball",
      "difficulty": "easy",
      "description": "Baseball fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Swimming",
      "difficulty": "easy",
      "description": "Swimming is commonly used in Sports themed clues."
    },
    {
      "word": "Boxing",
      "difficulty": "easy",
      "description": "Boxing is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Cricket",
      "difficulty": "easy",
      "description": "Cricket is commonly used in Sports themed clues."
    },
    {
      "word": "Rugby",
      "difficulty": "easy",
      "description": "Rugby fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Running",
      "difficulty": "easy",
      "description": "Running is commonly used in Sports themed clues."
    },
    {
      "word": "Volleyball",
      "difficulty": "easy",
      "description": "Volleyball is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Ice Hockey",
      "difficulty": "easy",
      "description": "Ice Hockey is commonly used in Sports themed clues."
    },
    {
      "word": "Table Tennis",
      "difficulty": "easy",
      "description": "Table Tennis is commonly used in Sports themed clues."
    },
    {
      "word": "Athletics",
      "difficulty": "easy",
      "description": "Athletics fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Cycling",
      "difficulty": "easy",
      "description": "Cycling is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Wrestling",
      "difficulty": "easy",
      "description": "Wrestling fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Badminton",
      "difficulty": "easy",
      "description": "Badminton is commonly used in Sports themed clues."
    },
    {
      "word": "Formula 1",
      "difficulty": "easy",
      "description": "Formula 1 is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Martial Arts",
      "difficulty": "easy",
      "description": "Martial Arts is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Gymnastics",
      "difficulty": "easy",
      "description": "Gymnastics is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Surfing",
      "difficulty": "easy",
      "description": "Surfing is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Snowboarding",
      "difficulty": "easy",
      "description": "Snowboarding is a clueable term relevant to Sports."
    },
    {
      "word": "Skateboarding",
      "difficulty": "easy",
      "description": "Skateboarding is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Polo",
      "difficulty": "easy",
      "description": "Polo is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Archery",
      "difficulty": "easy",
      "description": "Archery is commonly used in Sports themed clues."
    },
    {
      "word": "Equestrian",
      "difficulty": "easy",
      "description": "Equestrian is a clueable term relevant to Sports."
    },
    {
      "word": "Sailing",
      "difficulty": "easy",
      "description": "Sailing is a clueable term relevant to Sports."
    },
    {
      "word": "Darts",
      "difficulty": "easy",
      "description": "Darts is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Snooker",
      "difficulty": "easy",
      "description": "Snooker is a clueable term relevant to Sports."
    },
    {
      "word": "Squash",
      "difficulty": "easy",
      "description": "Squash is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Canoeing",
      "difficulty": "easy",
      "description": "Canoeing fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Rowing",
      "difficulty": "easy",
      "description": "Rowing is a clueable term relevant to Sports."
    },
    {
      "word": "Triathlon",
      "difficulty": "easy",
      "description": "Triathlon is a clueable term relevant to Sports."
    },
    {
      "word": "Netball",
      "difficulty": "easy",
      "description": "Netball is commonly used in Sports themed clues."
    },
    {
      "word": "Pentathlon",
      "difficulty": "easy",
      "description": "Pentathlon fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Handball",
      "difficulty": "easy",
      "description": "Handball is a clueable term relevant to Sports."
    },
    {
      "word": "Curling",
      "difficulty": "easy",
      "description": "Curling fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Fencing",
      "difficulty": "easy",
      "description": "Fencing is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Lacrosse",
      "difficulty": "easy",
      "description": "Lacrosse is a clueable term relevant to Sports."
    },
    {
      "word": "Bobsleigh",
      "difficulty": "easy",
      "description": "Bobsleigh is a clueable term relevant to Sports."
    },
    {
      "word": "Powerlifting",
      "difficulty": "easy",
      "description": "Powerlifting fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Mountaineering",
      "difficulty": "easy",
      "description": "Mountaineering is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Figure Skating",
      "difficulty": "easy",
      "description": "Figure Skating fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Biathlon",
      "difficulty": "easy",
      "description": "Biathlon fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Taekwondo",
      "difficulty": "easy",
      "description": "Taekwondo fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Bowling",
      "difficulty": "easy",
      "description": "Bowling is a clueable term relevant to Sports."
    },
    {
      "word": "Water Polo",
      "difficulty": "easy",
      "description": "Water Polo is commonly used in Sports themed clues."
    },
    {
      "word": "Goal",
      "difficulty": "easy",
      "description": "Goal is a clueable term relevant to Sports."
    },
    {
      "word": "Ball",
      "difficulty": "easy",
      "description": "Ball is a clueable term relevant to Sports."
    },
    {
      "word": "Kick",
      "difficulty": "easy",
      "description": "Kick is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Pass",
      "difficulty": "easy",
      "description": "Pass fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Referee",
      "difficulty": "easy",
      "description": "Referee fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Goalkeeper",
      "difficulty": "easy",
      "description": "Goalkeeper is a clueable term relevant to Sports."
    },
    {
      "word": "Red Card",
      "difficulty": "easy",
      "description": "Red Card is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Yellow Card",
      "difficulty": "easy",
      "description": "Yellow Card is a clueable term relevant to Sports."
    },
    {
      "word": "Foul",
      "difficulty": "easy",
      "description": "Foul is commonly used in Sports themed clues."
    },
    {
      "word": "Offside",
      "difficulty": "easy",
      "description": "Offside is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Penalty Kick",
      "difficulty": "easy",
      "description": "Penalty Kick is a clueable term relevant to Sports."
    },
    {
      "word": "Corner Kick",
      "difficulty": "easy",
      "description": "Corner Kick is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Free Kick",
      "difficulty": "easy",
      "description": "Free Kick is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Tackle",
      "difficulty": "easy",
      "description": "Tackle fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Header",
      "difficulty": "easy",
      "description": "Header is commonly used in Sports themed clues."
    },
    {
      "word": "Substitute",
      "difficulty": "easy",
      "description": "Substitute is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Captain",
      "difficulty": "easy",
      "description": "Captain is a clueable term relevant to Sports."
    },
    {
      "word": "World Cup",
      "difficulty": "easy",
      "description": "World Cup is a clueable term relevant to Sports."
    },
    {
      "word": "Champions League",
      "difficulty": "easy",
      "description": "Champions League fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Premier League",
      "difficulty": "easy",
      "description": "Premier League is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "La Liga",
      "difficulty": "easy",
      "description": "La Liga fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Serie A",
      "difficulty": "easy",
      "description": "Serie A is a clueable term relevant to Sports."
    },
    {
      "word": "Bundesliga",
      "difficulty": "easy",
      "description": "Bundesliga is a clueable term relevant to Sports."
    },
    {
      "word": "Messi",
      "difficulty": "easy",
      "description": "Messi is a clueable term relevant to Sports."
    },
    {
      "word": "Ronaldo",
      "difficulty": "easy",
      "description": "Ronaldo is commonly used in Sports themed clues."
    },
    {
      "word": "Neymar",
      "difficulty": "easy",
      "description": "Neymar is a clueable term relevant to Sports."
    },
    {
      "word": "Mbappe",
      "difficulty": "easy",
      "description": "Mbappe is commonly used in Sports themed clues."
    },
    {
      "word": "Zidane",
      "difficulty": "easy",
      "description": "Zidane is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Maradona",
      "difficulty": "easy",
      "description": "Maradona is a clueable term relevant to Sports."
    },
    {
      "word": "Pele",
      "difficulty": "easy",
      "description": "Pele is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Beckenbauer",
      "difficulty": "easy",
      "description": "Beckenbauer is commonly used in Sports themed clues."
    },
    {
      "word": "Wembley Stadium",
      "difficulty": "easy",
      "description": "Wembley Stadium is a clueable term relevant to Sports."
    },
    {
      "word": "Camp Nou",
      "difficulty": "easy",
      "description": "Camp Nou is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Santiago Bernabeu",
      "difficulty": "easy",
      "description": "Santiago Bernabeu is commonly used in Sports themed clues."
    },
    {
      "word": "Old Trafford",
      "difficulty": "easy",
      "description": "Old Trafford is commonly used in Sports themed clues."
    },
    {
      "word": "Anfield",
      "difficulty": "easy",
      "description": "Anfield is a clueable term relevant to Sports."
    },
    {
      "word": "Allianz Arena",
      "difficulty": "easy",
      "description": "Allianz Arena is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "FIFA",
      "difficulty": "easy",
      "description": "FIFA is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "UEFA",
      "difficulty": "easy",
      "description": "UEFA is a clueable term relevant to Sports."
    },
    {
      "word": "Golden Boot",
      "difficulty": "easy",
      "description": "Golden Boot is a clueable term relevant to Sports."
    },
    {
      "word": "Golden Ball",
      "difficulty": "easy",
      "description": "Golden Ball is commonly used in Sports themed clues."
    },
    {
      "word": "Top Scorer",
      "difficulty": "easy",
      "description": "Top Scorer fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Hat-Trick",
      "difficulty": "easy",
      "description": "Hat-Trick is a clueable term relevant to Sports."
    },
    {
      "word": "Own Goal",
      "difficulty": "easy",
      "description": "Own Goal fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Touchdown",
      "difficulty": "easy",
      "description": "Touchdown is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Home Run",
      "difficulty": "easy",
      "description": "Home Run fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Ace",
      "difficulty": "easy",
      "description": "Ace fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Birdie",
      "difficulty": "easy",
      "description": "Birdie is commonly used in Sports themed clues."
    },
    {
      "word": "Forehand",
      "difficulty": "easy",
      "description": "Forehand fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Backhand",
      "difficulty": "easy",
      "description": "Backhand is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Serve",
      "difficulty": "easy",
      "description": "Serve fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Grand Slam",
      "difficulty": "easy",
      "description": "Grand Slam is a clueable term relevant to Sports."
    },
    {
      "word": "Wimbledon",
      "difficulty": "easy",
      "description": "Wimbledon is a clueable term relevant to Sports."
    },
    {
      "word": "Super Bowl",
      "difficulty": "easy",
      "description": "Super Bowl is commonly used in Sports themed clues."
    },
    {
      "word": "World Series",
      "difficulty": "easy",
      "description": "World Series is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Olympics",
      "difficulty": "easy",
      "description": "Olympics is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Tour de France",
      "difficulty": "easy",
      "description": "Tour de France fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "MMA",
      "difficulty": "easy",
      "description": "MMA is a clueable term relevant to Sports."
    },
    {
      "word": "Skiing",
      "difficulty": "easy",
      "description": "Skiing is commonly used in Sports themed clues."
    },
    {
      "word": "High Jump",
      "difficulty": "easy",
      "description": "High Jump is commonly used in Sports themed clues."
    },
    {
      "word": "Long Jump",
      "difficulty": "easy",
      "description": "Long Jump is a clueable term relevant to Sports."
    },
    {
      "word": "Pole Vault",
      "difficulty": "easy",
      "description": "Pole Vault is commonly used in Sports themed clues."
    },
    {
      "word": "Javelin",
      "difficulty": "easy",
      "description": "Javelin fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Shot Put",
      "difficulty": "easy",
      "description": "Shot Put is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Hockey",
      "difficulty": "easy",
      "description": "Hockey is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Karate",
      "difficulty": "easy",
      "description": "Karate fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Diving",
      "difficulty": "easy",
      "description": "Diving is commonly used in Sports themed clues."
    },
    {
      "word": "Michael Jordan",
      "difficulty": "easy",
      "description": "Michael Jordan is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Serena Williams",
      "difficulty": "easy",
      "description": "Serena Williams is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Usain Bolt",
      "difficulty": "easy",
      "description": "Usain Bolt fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Muhammad Ali",
      "difficulty": "easy",
      "description": "Muhammad Ali fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Cristiano Ronaldo",
      "difficulty": "easy",
      "description": "Cristiano Ronaldo is a clueable term relevant to Sports."
    },
    {
      "word": "Lionel Messi",
      "difficulty": "easy",
      "description": "Lionel Messi is a clueable term relevant to Sports."
    },
    {
      "word": "Roger Federer",
      "difficulty": "easy",
      "description": "Roger Federer is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Tiger Woods",
      "difficulty": "easy",
      "description": "Tiger Woods is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "LeBron James",
      "difficulty": "easy",
      "description": "LeBron James fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Michael Phelps",
      "difficulty": "easy",
      "description": "Michael Phelps is commonly used in Sports themed clues."
    },
    {
      "word": "Simone Biles",
      "difficulty": "easy",
      "description": "Simone Biles is a clueable term relevant to Sports."
    },
    {
      "word": "Kobe Bryant",
      "difficulty": "easy",
      "description": "Kobe Bryant is a clueable term relevant to Sports."
    },
    {
      "word": "Wayne Gretzky",
      "difficulty": "easy",
      "description": "Wayne Gretzky is a clueable term relevant to Sports."
    },
    {
      "word": "Mia Hamm",
      "difficulty": "easy",
      "description": "Mia Hamm fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Babe Ruth",
      "difficulty": "easy",
      "description": "Babe Ruth is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Rafael Nadal",
      "difficulty": "easy",
      "description": "Rafael Nadal fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Jackie Joyner-Kersee",
      "difficulty": "easy",
      "description": "Jackie Joyner-Kersee is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Novak Djokovic",
      "difficulty": "easy",
      "description": "Novak Djokovic fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Martina Navratilova",
      "difficulty": "easy",
      "description": "Martina Navratilova is commonly used in Sports themed clues."
    },
    {
      "word": "Diego Maradona",
      "difficulty": "easy",
      "description": "Diego Maradona is commonly used in Sports themed clues."
    },
    {
      "word": "Michael Schumacher",
      "difficulty": "easy",
      "description": "Michael Schumacher is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Sachin Tendulkar",
      "difficulty": "easy",
      "description": "Sachin Tendulkar is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Manny Pacquiao",
      "difficulty": "easy",
      "description": "Manny Pacquiao fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Alex Morgan",
      "difficulty": "easy",
      "description": "Alex Morgan fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "FIFA World Cup",
      "difficulty": "hard",
      "description": "FIFA World Cup fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "NBA Finals",
      "difficulty": "hard",
      "description": "NBA Finals is a clueable term relevant to Sports."
    },
    {
      "word": "Penalty",
      "difficulty": "easy",
      "description": "Penalty fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Striker",
      "difficulty": "easy",
      "description": "Striker is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Midfielder",
      "difficulty": "easy",
      "description": "Midfielder is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Nutmeg",
      "difficulty": "hard",
      "description": "Nutmeg fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Tiki-taka",
      "difficulty": "hard",
      "description": "Tiki-taka fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "False nine",
      "difficulty": "hard",
      "description": "False nine fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Sweeper",
      "difficulty": "hard",
      "description": "Sweeper is a clueable term relevant to Sports."
    },
    {
      "word": "Counter-attack",
      "difficulty": "hard",
      "description": "Counter-attack is commonly used in Sports themed clues."
    },
    {
      "word": "Libero",
      "difficulty": "hard",
      "description": "Libero is commonly used in Sports themed clues."
    },
    {
      "word": "Man marking",
      "difficulty": "hard",
      "description": "Man marking is commonly used in Sports themed clues."
    },
    {
      "word": "Zonal marking",
      "difficulty": "hard",
      "description": "Zonal marking is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Through ball",
      "difficulty": "hard",
      "description": "Through ball fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Decathlon",
      "difficulty": "hard",
      "description": "Decathlon is a clueable term relevant to Sports."
    },
    {
      "word": "The Olympic Games",
      "difficulty": "hard",
      "description": "The Olympic Games is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Bobsledding",
      "difficulty": "hard",
      "description": "Bobsledding is a clueable term relevant to Sports."
    },
    {
      "word": "Windsurfing",
      "difficulty": "hard",
      "description": "Windsurfing is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Jesse Owens",
      "difficulty": "easy",
      "description": "Jesse Owens is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Tom Brady",
      "difficulty": "easy",
      "description": "Tom Brady fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Australian Open",
      "difficulty": "easy",
      "description": "Australian Open fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Champions League Final",
      "difficulty": "easy",
      "description": "Champions League Final is a clueable term relevant to Sports."
    },
    {
      "word": "Defensive Block",
      "difficulty": "hard",
      "description": "Defensive Block is a clueable term relevant to Sports."
    },
    {
      "word": "English Premier League Trophy",
      "difficulty": "hard",
      "description": "English Premier League Trophy is commonly used in Sports themed clues."
    },
    {
      "word": "Formula 1 Grand Prix",
      "difficulty": "hard",
      "description": "Formula 1 Grand Prix is commonly used in Sports themed clues."
    },
    {
      "word": "Formula 1 World Championship",
      "difficulty": "hard",
      "description": "Formula 1 World Championship is commonly used in Sports themed clues."
    },
    {
      "word": "Free Kick Technique",
      "difficulty": "hard",
      "description": "Free Kick Technique is a clueable term relevant to Sports."
    },
    {
      "word": "French Open",
      "difficulty": "easy",
      "description": "French Open is commonly used in Sports themed clues."
    },
    {
      "word": "Golf Masters",
      "difficulty": "easy",
      "description": "Golf Masters fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Ligue 1",
      "difficulty": "easy",
      "description": "Ligue 1 is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "MLB",
      "difficulty": "easy",
      "description": "MLB fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "MVP",
      "difficulty": "easy",
      "description": "MVP fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "NBA",
      "difficulty": "easy",
      "description": "NBA is a clueable term relevant to Sports."
    },
    {
      "word": "NFL",
      "difficulty": "easy",
      "description": "NFL is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Olympic Gold Medal",
      "difficulty": "easy",
      "description": "Olympic Gold Medal fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Penalty Shootout",
      "difficulty": "hard",
      "description": "Penalty Shootout is a clueable term relevant to Sports."
    },
    {
      "word": "Roger Federer vs Rafael Nadal",
      "difficulty": "hard",
      "description": "Roger Federer vs Rafael Nadal is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Summer Olympics Opening Ceremony",
      "difficulty": "hard",
      "description": "Summer Olympics Opening Ceremony is a clueable term relevant to Sports."
    },
    {
      "word": "Super Bowl Halftime Show",
      "difficulty": "hard",
      "description": "Super Bowl Halftime Show fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Super Bowl MVP Performance",
      "difficulty": "hard",
      "description": "Super Bowl MVP Performance fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "US Open",
      "difficulty": "easy",
      "description": "US Open is a clueable term relevant to Sports."
    },
    {
      "word": "Video Assistant Referee",
      "difficulty": "hard",
      "description": "Video Assistant Referee is a clueable term relevant to Sports."
    },
    {
      "word": "Winter Olympics",
      "difficulty": "easy",
      "description": "Winter Olympics is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Winter Olympics Opening Ceremony",
      "difficulty": "hard",
      "description": "Winter Olympics Opening Ceremony is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "World Cup Final",
      "difficulty": "easy",
      "description": "World Cup Final is a clueable term relevant to Sports."
    },
    {
      "word": "Kylian Mbappé",
      "difficulty": "easy",
      "description": "Kylian Mbappé is commonly used in Sports themed clues."
    },
    {
      "word": "Mohamed Salah",
      "difficulty": "easy",
      "description": "Mohamed Salah is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Neymar Jr.",
      "difficulty": "easy",
      "description": "Neymar Jr. is commonly used in Sports themed clues."
    },
    {
      "word": "Zlatan Ibrahimović",
      "difficulty": "easy",
      "description": "Zlatan Ibrahimović is commonly used in Sports themed clues."
    },
    {
      "word": "Nike",
      "difficulty": "easy",
      "description": "Nike fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Manchester United",
      "difficulty": "easy",
      "description": "Manchester United is a clueable term relevant to Sports."
    },
    {
      "word": "Adidas",
      "difficulty": "easy",
      "description": "Adidas is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Real Madrid",
      "difficulty": "easy",
      "description": "Real Madrid is commonly used in Sports themed clues."
    },
    {
      "word": "Barcelona",
      "difficulty": "easy",
      "description": "Barcelona is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Bayern Munich",
      "difficulty": "easy",
      "description": "Bayern Munich is a clueable term relevant to Sports."
    },
    {
      "word": "Liverpool",
      "difficulty": "easy",
      "description": "Liverpool fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Chelsea",
      "difficulty": "easy",
      "description": "Chelsea is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Paris Saint-Germain",
      "difficulty": "easy",
      "description": "Paris Saint-Germain is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Juventus",
      "difficulty": "easy",
      "description": "Juventus fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "AC Milan",
      "difficulty": "easy",
      "description": "AC Milan is a clueable term relevant to Sports."
    },
    {
      "word": "Arsenal",
      "difficulty": "easy",
      "description": "Arsenal is commonly used in Sports themed clues."
    },
    {
      "word": "Sir Alex Ferguson",
      "difficulty": "easy",
      "description": "Sir Alex Ferguson is a useful Sports reference for fast team guessing rounds."
    },
    {
      "word": "Pep Guardiola",
      "difficulty": "hard",
      "description": "Pep Guardiola fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Jurgen Klopp",
      "difficulty": "hard",
      "description": "Jurgen Klopp fits the Sports category for quick, descriptive gameplay."
    },
    {
      "word": "Cole Palmer",
      "difficulty": "hard",
      "description": "Cole Palmer is commonly used in Sports themed clues."
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
      "description": "Star Wars fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "The Matrix",
      "difficulty": "easy",
      "description": "The Matrix is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Friends",
      "difficulty": "easy",
      "description": "Friends is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "The Simpsons",
      "difficulty": "easy",
      "description": "The Simpsons is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Breaking Bad",
      "difficulty": "easy",
      "description": "Breaking Bad fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Game of Thrones",
      "difficulty": "easy",
      "description": "Game of Thrones is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Harry Potter",
      "difficulty": "easy",
      "description": "Harry Potter is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "The Godfather",
      "difficulty": "easy",
      "description": "The Godfather fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "The Avengers",
      "difficulty": "easy",
      "description": "The Avengers fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Avengers: Endgame",
      "difficulty": "hard",
      "description": "Avengers: Endgame is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Lord of the Rings",
      "difficulty": "easy",
      "description": "Lord of the Rings is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Jurassic Park",
      "difficulty": "easy",
      "description": "Jurassic Park is a clueable term relevant to Movies and TV."
    },
    {
      "word": "The Shawshank Redemption",
      "difficulty": "easy",
      "description": "The Shawshank Redemption is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Pulp Fiction",
      "difficulty": "easy",
      "description": "Pulp Fiction fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Back to the Future",
      "difficulty": "easy",
      "description": "Back to the Future is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Star Trek",
      "difficulty": "easy",
      "description": "Star Trek is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "The Office",
      "difficulty": "easy",
      "description": "The Office fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Avatar",
      "difficulty": "easy",
      "description": "Avatar fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Titanic",
      "difficulty": "easy",
      "description": "Titanic is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Inception",
      "difficulty": "easy",
      "description": "Inception fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Stranger Things",
      "difficulty": "easy",
      "description": "Stranger Things is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "The Lion King",
      "difficulty": "easy",
      "description": "The Lion King is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Forrest Gump",
      "difficulty": "easy",
      "description": "Forrest Gump is commonly used in Movies and TV themed clues."
    },
    {
      "word": "The Dark Knight",
      "difficulty": "easy",
      "description": "The Dark Knight fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Toy Story",
      "difficulty": "easy",
      "description": "Toy Story is commonly used in Movies and TV themed clues."
    },
    {
      "word": "The Walking Dead",
      "difficulty": "easy",
      "description": "The Walking Dead is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Frozen",
      "difficulty": "easy",
      "description": "Frozen is commonly used in Movies and TV themed clues."
    },
    {
      "word": "The Big Bang Theory",
      "difficulty": "easy",
      "description": "The Big Bang Theory is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Indiana Jones",
      "difficulty": "easy",
      "description": "Indiana Jones fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "The Sound of Music",
      "difficulty": "easy",
      "description": "The Sound of Music is a clueable term relevant to Movies and TV."
    },
    {
      "word": "The Sopranos",
      "difficulty": "easy",
      "description": "The Sopranos is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "The Terminator",
      "difficulty": "easy",
      "description": "The Terminator is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Mulan",
      "difficulty": "easy",
      "description": "Mulan fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Die Hard",
      "difficulty": "easy",
      "description": "Die Hard is a clueable term relevant to Movies and TV."
    },
    {
      "word": "The Witcher",
      "difficulty": "easy",
      "description": "The Witcher is a clueable term relevant to Movies and TV."
    },
    {
      "word": "The Hunger Games",
      "difficulty": "easy",
      "description": "The Hunger Games is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Mad Men",
      "difficulty": "easy",
      "description": "Mad Men fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "The Princess Bride",
      "difficulty": "easy",
      "description": "The Princess Bride is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Mission: Impossible",
      "difficulty": "easy",
      "description": "Mission: Impossible is commonly used in Movies and TV themed clues."
    },
    {
      "word": "The Twilight Zone",
      "difficulty": "easy",
      "description": "The Twilight Zone is commonly used in Movies and TV themed clues."
    },
    {
      "word": "The Good Place",
      "difficulty": "easy",
      "description": "The Good Place is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "The X-Files",
      "difficulty": "easy",
      "description": "The X-Files is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Avatar: The Last Airbender",
      "difficulty": "easy",
      "description": "Avatar: The Last Airbender is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "The Crown",
      "difficulty": "easy",
      "description": "The Crown is commonly used in Movies and TV themed clues."
    },
    {
      "word": "The Mandalorian",
      "difficulty": "easy",
      "description": "The Mandalorian is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Leonardo DiCaprio",
      "difficulty": "easy",
      "description": "Leonardo DiCaprio is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Actor",
      "difficulty": "easy",
      "description": "Actor fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Director",
      "difficulty": "easy",
      "description": "Director is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Oscar",
      "difficulty": "easy",
      "description": "Oscar is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Red carpet",
      "difficulty": "easy",
      "description": "Red carpet is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Blockbuster",
      "difficulty": "easy",
      "description": "Blockbuster is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Movie",
      "difficulty": "easy",
      "description": "Movie is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Premiere",
      "difficulty": "easy",
      "description": "Premiere is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Screenwriter",
      "difficulty": "easy",
      "description": "Screenwriter fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Studio",
      "difficulty": "easy",
      "description": "Studio is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Sequel",
      "difficulty": "easy",
      "description": "Sequel fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Cinematography",
      "difficulty": "hard",
      "description": "Cinematography is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Method acting",
      "difficulty": "hard",
      "description": "Method acting is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Film noir",
      "difficulty": "hard",
      "description": "Film noir is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Biopic",
      "difficulty": "hard",
      "description": "Biopic is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Cameo",
      "difficulty": "hard",
      "description": "Cameo fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Auteur",
      "difficulty": "hard",
      "description": "Auteur is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Casting couch",
      "difficulty": "hard",
      "description": "Casting couch is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Stunt double",
      "difficulty": "hard",
      "description": "Stunt double is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Box office",
      "difficulty": "hard",
      "description": "Box office fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Green screen",
      "difficulty": "hard",
      "description": "Green screen is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Grey's Anatomy",
      "difficulty": "easy",
      "description": "Grey's Anatomy is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Seinfeld",
      "difficulty": "easy",
      "description": "Seinfeld fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "How I Met Your Mother",
      "difficulty": "easy",
      "description": "How I Met Your Mother is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Twin Peaks",
      "difficulty": "hard",
      "description": "Twin Peaks is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Black Mirror",
      "difficulty": "hard",
      "description": "Black Mirror is a clueable term relevant to Movies and TV."
    },
    {
      "word": "True Detective",
      "difficulty": "hard",
      "description": "True Detective fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "The Handmaid's Tale",
      "difficulty": "hard",
      "description": "The Handmaid's Tale is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Westworld",
      "difficulty": "hard",
      "description": "Westworld is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Better Call Saul",
      "difficulty": "hard",
      "description": "Better Call Saul is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Bradley Cooper",
      "difficulty": "easy",
      "description": "Bradley Cooper fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Daniel Day-Lewis",
      "difficulty": "hard",
      "description": "Daniel Day-Lewis is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Darth Vader",
      "difficulty": "easy",
      "description": "Darth Vader is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Dumbledore",
      "difficulty": "easy",
      "description": "Dumbledore is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Gandalf",
      "difficulty": "easy",
      "description": "Gandalf is commonly used in Movies and TV themed clues."
    },
    {
      "word": "George Clooney",
      "difficulty": "easy",
      "description": "George Clooney is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Hermione Granger",
      "difficulty": "easy",
      "description": "Hermione Granger is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Jennifer Lawrence",
      "difficulty": "easy",
      "description": "Jennifer Lawrence is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Johnny Depp",
      "difficulty": "easy",
      "description": "Johnny Depp is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Katniss Everdeen",
      "difficulty": "easy",
      "description": "Katniss Everdeen is commonly used in Movies and TV themed clues."
    },
    {
      "word": "La La Land",
      "difficulty": "easy",
      "description": "La La Land fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Luke Skywalker",
      "difficulty": "easy",
      "description": "Luke Skywalker fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Meryl Streep",
      "difficulty": "easy",
      "description": "Meryl Streep is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Ryan Gosling",
      "difficulty": "easy",
      "description": "Ryan Gosling fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Twilight",
      "difficulty": "easy",
      "description": "Twilight is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Beam me up, Scotty",
      "difficulty": "hard",
      "description": "Beam me up, Scotty is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Elementary, my dear Watson",
      "difficulty": "hard",
      "description": "Elementary, my dear Watson is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Frankly, my dear, I don't give a damn",
      "difficulty": "hard",
      "description": "Frankly, my dear, I don't give a damn is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Go ahead, make my day",
      "difficulty": "hard",
      "description": "Go ahead, make my day fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Here's Johnny!",
      "difficulty": "hard",
      "description": "Here's Johnny! is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Here's looking at you, kid",
      "difficulty": "hard",
      "description": "Here's looking at you, kid fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "I'll be back",
      "difficulty": "easy",
      "description": "I'll be back fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "May the Force be with you",
      "difficulty": "easy",
      "description": "May the Force be with you is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "May the odds be ever in your favor",
      "difficulty": "hard",
      "description": "May the odds be ever in your favor fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Resistance is futile",
      "difficulty": "hard",
      "description": "Resistance is futile is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Say hello to my little friend",
      "difficulty": "hard",
      "description": "Say hello to my little friend is a clueable term relevant to Movies and TV."
    },
    {
      "word": "To infinity and beyond",
      "difficulty": "easy",
      "description": "To infinity and beyond is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Yippee-ki-yay, motherfucker!",
      "difficulty": "hard",
      "description": "Yippee-ki-yay, motherfucker! is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "You can't handle the truth!",
      "difficulty": "hard",
      "description": "You can't handle the truth! is commonly used in Movies and TV themed clues."
    },
    {
      "word": "Harry Potter Wizarding World",
      "difficulty": "hard",
      "description": "Harry Potter Wizarding World fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Disney Classics",
      "difficulty": "easy",
      "description": "Disney Classics is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Disney Pixar Films",
      "difficulty": "easy",
      "description": "Disney Pixar Films fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Disney Princesses",
      "difficulty": "easy",
      "description": "Disney Princesses fits the Movies and TV category for quick, descriptive gameplay."
    },
    {
      "word": "Marvel Cinematic Universe",
      "difficulty": "hard",
      "description": "Marvel Cinematic Universe is a clueable term relevant to Movies and TV."
    },
    {
      "word": "Pirates of the Caribbean",
      "difficulty": "easy",
      "description": "Pirates of the Caribbean is a useful Movies and TV reference for fast team guessing rounds."
    },
    {
      "word": "Pixar Movies",
      "difficulty": "easy",
      "description": "Pixar Movies is commonly used in Movies and TV themed clues."
    },
    {
      "word": "The Godfather Trilogy",
      "difficulty": "easy",
      "description": "The Godfather Trilogy is a useful Movies and TV reference for fast team guessing rounds."
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
      "description": "Pizza fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Chocolate",
      "difficulty": "easy",
      "description": "Chocolate is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Burger",
      "difficulty": "easy",
      "description": "Burger is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Coffee",
      "difficulty": "easy",
      "description": "Coffee fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Sushi",
      "difficulty": "easy",
      "description": "Sushi is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Ice Cream",
      "difficulty": "easy",
      "description": "Ice Cream fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Pasta",
      "difficulty": "easy",
      "description": "Pasta is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Wine",
      "difficulty": "easy",
      "description": "Wine is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Beer",
      "difficulty": "easy",
      "description": "Beer is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Steak",
      "difficulty": "easy",
      "description": "Steak is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Salad",
      "difficulty": "easy",
      "description": "Salad is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Sandwich",
      "difficulty": "easy",
      "description": "Sandwich is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Cheese",
      "difficulty": "easy",
      "description": "Cheese is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Cupcake",
      "difficulty": "easy",
      "description": "Cupcake is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Tea",
      "difficulty": "easy",
      "description": "Tea is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Cookie",
      "difficulty": "easy",
      "description": "Cookie fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Tacos",
      "difficulty": "easy",
      "description": "Tacos is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Whiskey",
      "difficulty": "easy",
      "description": "Whiskey fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Bread",
      "difficulty": "easy",
      "description": "Bread fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Cocktail",
      "difficulty": "easy",
      "description": "Cocktail fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Smoothie",
      "difficulty": "easy",
      "description": "Smoothie is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Donut",
      "difficulty": "easy",
      "description": "Donut is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Soup",
      "difficulty": "easy",
      "description": "Soup fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Cake",
      "difficulty": "easy",
      "description": "Cake is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Barbecue",
      "difficulty": "easy",
      "description": "Barbecue is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Pancakes",
      "difficulty": "easy",
      "description": "Pancakes is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Ramen",
      "difficulty": "easy",
      "description": "Ramen is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Lobster",
      "difficulty": "easy",
      "description": "Lobster fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Curry",
      "difficulty": "easy",
      "description": "Curry is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Gin",
      "difficulty": "easy",
      "description": "Gin is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Vodka",
      "difficulty": "easy",
      "description": "Vodka is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Caviar",
      "difficulty": "easy",
      "description": "Caviar is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Macaron",
      "difficulty": "easy",
      "description": "Macaron is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Paella",
      "difficulty": "easy",
      "description": "Paella is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Hot Dog",
      "difficulty": "easy",
      "description": "Hot Dog is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Dim Sum",
      "difficulty": "easy",
      "description": "Dim Sum is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Champagne",
      "difficulty": "easy",
      "description": "Champagne fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Margarita",
      "difficulty": "easy",
      "description": "Margarita is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Gourmet",
      "difficulty": "easy",
      "description": "Gourmet fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Milkshake",
      "difficulty": "easy",
      "description": "Milkshake fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Risotto",
      "difficulty": "easy",
      "description": "Risotto is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Pho",
      "difficulty": "easy",
      "description": "Pho fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Nachos",
      "difficulty": "easy",
      "description": "Nachos fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Cider",
      "difficulty": "easy",
      "description": "Cider is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Fondue",
      "difficulty": "easy",
      "description": "Fondue is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Poutine",
      "difficulty": "easy",
      "description": "Poutine is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Tapas",
      "difficulty": "easy",
      "description": "Tapas is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Biscuit",
      "difficulty": "easy",
      "description": "Biscuit fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Eggs Benedict",
      "difficulty": "hard",
      "description": "Eggs Benedict is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Beef Wellington",
      "difficulty": "hard",
      "description": "Beef Wellington is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Lobster Bisque",
      "difficulty": "hard",
      "description": "Lobster Bisque is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Croque Monsieur",
      "difficulty": "hard",
      "description": "Croque Monsieur fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Chicken Parmesan",
      "difficulty": "hard",
      "description": "Chicken Parmesan is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Tiramisu",
      "difficulty": "hard",
      "description": "Tiramisu is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Coq au Vin",
      "difficulty": "hard",
      "description": "Coq au Vin is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Crème Brûlée",
      "difficulty": "hard",
      "description": "Crème Brûlée is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Spaghetti Carbonara",
      "difficulty": "hard",
      "description": "Spaghetti Carbonara is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Banoffee Pie",
      "difficulty": "hard",
      "description": "Banoffee Pie is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Cheeseburger",
      "difficulty": "hard",
      "description": "Cheeseburger is a clueable term relevant to Food and Drink."
    },
    {
      "word": "Coca-Cola",
      "difficulty": "easy",
      "description": "Coca-Cola is a clueable term relevant to Food and Drink."
    },
    {
      "word": "KFC",
      "difficulty": "easy",
      "description": "KFC is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Burger King",
      "difficulty": "easy",
      "description": "Burger King fits the Food and Drink category for quick, descriptive gameplay."
    },
    {
      "word": "Subway",
      "difficulty": "easy",
      "description": "Subway is commonly used in Food and Drink themed clues."
    },
    {
      "word": "Taco Bell",
      "difficulty": "easy",
      "description": "Taco Bell is a useful Food and Drink reference for fast team guessing rounds."
    },
    {
      "word": "Nandos",
      "difficulty": "easy",
      "description": "Internationally known restaurant chain that originated in South Africa. Famous for their chicken."
    },
    {
      "word": "Pizza Hut",
      "difficulty": "easy",
      "description": "Pizza Hut is a useful Food and Drink reference for fast team guessing rounds."
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
      "description": "Elephant is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Rainforest",
      "difficulty": "easy",
      "description": "Rainforest is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Penguin",
      "difficulty": "easy",
      "description": "Penguin is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Mountain",
      "difficulty": "easy",
      "description": "Mountain is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Whale",
      "difficulty": "easy",
      "description": "Whale is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Sunset",
      "difficulty": "easy",
      "description": "Sunset is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Tiger",
      "difficulty": "easy",
      "description": "Tiger is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Savannah",
      "difficulty": "easy",
      "description": "Savannah fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Coral Reef",
      "difficulty": "easy",
      "description": "Coral Reef fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Desert",
      "difficulty": "easy",
      "description": "Desert fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Waterfall",
      "difficulty": "easy",
      "description": "Waterfall is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Polar Bear",
      "difficulty": "easy",
      "description": "Polar Bear is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Orangutan",
      "difficulty": "easy",
      "description": "Orangutan fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Volcano",
      "difficulty": "easy",
      "description": "Volcano is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Forest",
      "difficulty": "easy",
      "description": "Forest fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Giraffe",
      "difficulty": "easy",
      "description": "Giraffe is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Lion",
      "difficulty": "easy",
      "description": "Lion fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Dolphin",
      "difficulty": "easy",
      "description": "Dolphin is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Jungle",
      "difficulty": "easy",
      "description": "Jungle fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Arctic",
      "difficulty": "easy",
      "description": "Arctic is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Humpback Whale",
      "difficulty": "easy",
      "description": "Humpback Whale fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Cheetah",
      "difficulty": "easy",
      "description": "Cheetah is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Sunrise",
      "difficulty": "easy",
      "description": "Sunrise is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Koala",
      "difficulty": "easy",
      "description": "Koala is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Cactus",
      "difficulty": "easy",
      "description": "Cactus fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Ocean",
      "difficulty": "easy",
      "description": "Ocean is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Redwood Tree",
      "difficulty": "easy",
      "description": "Redwood Tree is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Squirrel",
      "difficulty": "easy",
      "description": "Squirrel is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Oasis",
      "difficulty": "easy",
      "description": "Oasis is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Eagle",
      "difficulty": "easy",
      "description": "Eagle fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Butterfly",
      "difficulty": "easy",
      "description": "Butterfly is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Moose",
      "difficulty": "easy",
      "description": "Moose is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Fjord",
      "difficulty": "easy",
      "description": "Fjord is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Komodo Dragon",
      "difficulty": "easy",
      "description": "Komodo Dragon is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Seal",
      "difficulty": "easy",
      "description": "Seal is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Tropical Fish",
      "difficulty": "easy",
      "description": "Tropical Fish is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Monsoon",
      "difficulty": "easy",
      "description": "Monsoon fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Lemur",
      "difficulty": "easy",
      "description": "Lemur is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Bamboo Forest",
      "difficulty": "easy",
      "description": "Bamboo Forest is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Hummingbird",
      "difficulty": "easy",
      "description": "Hummingbird is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Glacier",
      "difficulty": "easy",
      "description": "Glacier is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Antarctica",
      "difficulty": "easy",
      "description": "Antarctica is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Chameleon",
      "difficulty": "easy",
      "description": "Chameleon is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Mangrove",
      "difficulty": "easy",
      "description": "Mangrove fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Seahorse",
      "difficulty": "easy",
      "description": "Seahorse is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Aurora",
      "difficulty": "easy",
      "description": "Aurora is a clueable term relevant to Nature and Wildlife."
    },
    {
      "word": "Octopus",
      "difficulty": "easy",
      "description": "Octopus is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Cat",
      "difficulty": "easy",
      "description": "Cat is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Dog",
      "difficulty": "easy",
      "description": "Dog is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Kangaroo",
      "difficulty": "easy",
      "description": "Kangaroo is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Shark",
      "difficulty": "easy",
      "description": "Shark is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Axolotl",
      "difficulty": "hard",
      "description": "Axolotl is commonly used in Nature and Wildlife themed clues."
    },
    {
      "word": "Platypus",
      "difficulty": "hard",
      "description": "Platypus is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Tasmanian Devil",
      "difficulty": "hard",
      "description": "Tasmanian Devil fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Electric Eel",
      "difficulty": "hard",
      "description": "Electric Eel fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Narwhal",
      "difficulty": "hard",
      "description": "Narwhal fits the Nature and Wildlife category for quick, descriptive gameplay."
    },
    {
      "word": "Emperor Penguin",
      "difficulty": "hard",
      "description": "Emperor Penguin is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Snow Leopard",
      "difficulty": "hard",
      "description": "Snow Leopard is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Great White Shark",
      "difficulty": "hard",
      "description": "Great White Shark is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "African Grey Parrot",
      "difficulty": "hard",
      "description": "African Grey Parrot is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "Okavango Delta",
      "difficulty": "hard",
      "description": "Okavango Delta is a useful Nature and Wildlife reference for fast team guessing rounds."
    },
    {
      "word": "The Amazon Rainforest",
      "difficulty": "hard",
      "description": "The Amazon Rainforest fits the Nature and Wildlife category for quick, descriptive gameplay."
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
      "description": "English is commonly used in Languages themed clues."
    },
    {
      "word": "Spanish",
      "difficulty": "easy",
      "description": "Spanish is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "French",
      "difficulty": "easy",
      "description": "French fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Mandarin",
      "difficulty": "easy",
      "description": "Mandarin is commonly used in Languages themed clues."
    },
    {
      "word": "German",
      "difficulty": "easy",
      "description": "German fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Italian",
      "difficulty": "easy",
      "description": "Italian is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Japanese",
      "difficulty": "easy",
      "description": "Japanese is a clueable term relevant to Languages."
    },
    {
      "word": "Russian",
      "difficulty": "easy",
      "description": "Russian is commonly used in Languages themed clues."
    },
    {
      "word": "Portuguese",
      "difficulty": "easy",
      "description": "Portuguese is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Arabic",
      "difficulty": "easy",
      "description": "Arabic is a clueable term relevant to Languages."
    },
    {
      "word": "Korean",
      "difficulty": "easy",
      "description": "Korean is commonly used in Languages themed clues."
    },
    {
      "word": "Dutch",
      "difficulty": "easy",
      "description": "Dutch is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Swedish",
      "difficulty": "easy",
      "description": "Swedish fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Greek",
      "difficulty": "easy",
      "description": "Greek is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Turkish",
      "difficulty": "easy",
      "description": "Turkish is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Polish",
      "difficulty": "easy",
      "description": "Polish fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Hindi",
      "difficulty": "easy",
      "description": "Hindi is commonly used in Languages themed clues."
    },
    {
      "word": "Thai",
      "difficulty": "easy",
      "description": "Thai fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Finnish",
      "difficulty": "easy",
      "description": "Finnish is a clueable term relevant to Languages."
    },
    {
      "word": "Vietnamese",
      "difficulty": "easy",
      "description": "Vietnamese is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Indonesian",
      "difficulty": "easy",
      "description": "Indonesian fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Hebrew",
      "difficulty": "easy",
      "description": "Hebrew is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Czech",
      "difficulty": "easy",
      "description": "Czech fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Hungarian",
      "difficulty": "easy",
      "description": "Hungarian is commonly used in Languages themed clues."
    },
    {
      "word": "Romanian",
      "difficulty": "easy",
      "description": "Romanian is a clueable term relevant to Languages."
    },
    {
      "word": "Danish",
      "difficulty": "easy",
      "description": "Danish is commonly used in Languages themed clues."
    },
    {
      "word": "Norwegian",
      "difficulty": "easy",
      "description": "Norwegian is a clueable term relevant to Languages."
    },
    {
      "word": "Persian",
      "difficulty": "easy",
      "description": "Persian is commonly used in Languages themed clues."
    },
    {
      "word": "Swahili",
      "difficulty": "easy",
      "description": "Swahili fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Tagalog",
      "difficulty": "easy",
      "description": "Tagalog is a clueable term relevant to Languages."
    },
    {
      "word": "Malay",
      "difficulty": "easy",
      "description": "Malay is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Bengali",
      "difficulty": "easy",
      "description": "Bengali fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Slovak",
      "difficulty": "easy",
      "description": "Slovak is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Lithuanian",
      "difficulty": "easy",
      "description": "Lithuanian is commonly used in Languages themed clues."
    },
    {
      "word": "Latvian",
      "difficulty": "easy",
      "description": "Latvian is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Slovenian",
      "difficulty": "easy",
      "description": "Slovenian is commonly used in Languages themed clues."
    },
    {
      "word": "Croatian",
      "difficulty": "easy",
      "description": "Croatian is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Ukrainian",
      "difficulty": "easy",
      "description": "Ukrainian fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Estonian",
      "difficulty": "easy",
      "description": "Estonian is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Icelandic",
      "difficulty": "easy",
      "description": "Icelandic is commonly used in Languages themed clues."
    },
    {
      "word": "Basque",
      "difficulty": "easy",
      "description": "Basque is commonly used in Languages themed clues."
    },
    {
      "word": "Welsh",
      "difficulty": "easy",
      "description": "Welsh fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Farsi",
      "difficulty": "easy",
      "description": "Farsi is a clueable term relevant to Languages."
    },
    {
      "word": "Yiddish",
      "difficulty": "easy",
      "description": "Yiddish is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Amharic",
      "difficulty": "easy",
      "description": "Amharic fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Zulu",
      "difficulty": "easy",
      "description": "Zulu fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Xhosa",
      "difficulty": "easy",
      "description": "Xhosa is a clueable term relevant to Languages."
    },
    {
      "word": "Kurdish",
      "difficulty": "easy",
      "description": "Kurdish fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Afrikaans",
      "difficulty": "easy",
      "description": "One of South Africa's 11 official languages, often spoken by the white population."
    },
    {
      "word": "Yoruba",
      "difficulty": "easy",
      "description": "Yoruba is commonly used in Languages themed clues."
    },
    {
      "word": "Igbo",
      "difficulty": "easy",
      "description": "Igbo is commonly used in Languages themed clues."
    },
    {
      "word": "Hausa",
      "difficulty": "easy",
      "description": "Hausa is commonly used in Languages themed clues."
    },
    {
      "word": "Somali",
      "difficulty": "hard",
      "description": "Somali fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Shona",
      "difficulty": "easy",
      "description": "Shona is a clueable term relevant to Languages."
    },
    {
      "word": "Tswana",
      "difficulty": "easy",
      "description": "Tswana is commonly used in Languages themed clues."
    },
    {
      "word": "Sesotho",
      "difficulty": "easy",
      "description": "Sesotho is a clueable term relevant to Languages."
    },
    {
      "word": "Kiswahili",
      "difficulty": "hard",
      "description": "Kiswahili is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Latin Alphabet",
      "difficulty": "easy",
      "description": "Latin Alphabet is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Cyrillic Script",
      "difficulty": "easy",
      "description": "Cyrillic Script is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Phonetics",
      "difficulty": "easy",
      "description": "Phonetics is a clueable term relevant to Languages."
    },
    {
      "word": "Dialect",
      "difficulty": "hard",
      "description": "Dialect fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Accents",
      "difficulty": "easy",
      "description": "Accents is a clueable term relevant to Languages."
    },
    {
      "word": "Bilingual",
      "difficulty": "easy",
      "description": "Bilingual is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Interpreter",
      "difficulty": "easy",
      "description": "Interpreter fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Translator",
      "difficulty": "hard",
      "description": "Translator is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Sign Language",
      "difficulty": "easy",
      "description": "Sign Language is a useful Languages reference for fast team guessing rounds."
    },
    {
      "word": "Morse Code",
      "difficulty": "easy",
      "description": "Morse Code is commonly used in Languages themed clues."
    },
    {
      "word": "Loanword",
      "difficulty": "easy",
      "description": "Loanword is a clueable term relevant to Languages."
    },
    {
      "word": "Idiomatic Expression",
      "difficulty": "hard",
      "description": "Idiomatic Expression is commonly used in Languages themed clues."
    },
    {
      "word": "Tongue Twister",
      "difficulty": "easy",
      "description": "Tongue Twister is a clueable term relevant to Languages."
    },
    {
      "word": "Grammar Rule",
      "difficulty": "easy",
      "description": "Grammar Rule fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Verb Conjugation",
      "difficulty": "easy",
      "description": "Verb Conjugation fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Pronunciation",
      "difficulty": "hard",
      "description": "Pronunciation fits the Languages category for quick, descriptive gameplay."
    },
    {
      "word": "Mother Tongue",
      "difficulty": "easy",
      "description": "Mother Tongue is a useful Languages reference for fast team guessing rounds."
    }
  ],
  "Famous Personalities": [
    {
      "word": "Albert Einstein",
      "difficulty": "easy",
      "description": "Albert Einstein fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Nelson Mandela",
      "difficulty": "easy",
      "description": "First South African President and anti-apartheid revolutionary."
    },
    {
      "word": "William Shakespeare",
      "difficulty": "easy",
      "description": "William Shakespeare is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Mahatma Gandhi",
      "difficulty": "easy",
      "description": "Mahatma Gandhi is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Mother Teresa",
      "difficulty": "easy",
      "description": "Mother Teresa fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Martin Luther King Jr.",
      "difficulty": "easy",
      "description": "Martin Luther King Jr. fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Marie Curie",
      "difficulty": "easy",
      "description": "Marie Curie is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Elvis Presley",
      "difficulty": "easy",
      "description": "Elvis Presley is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Michael Jackson",
      "difficulty": "easy",
      "description": "Michael Jackson fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Pablo Picasso",
      "difficulty": "easy",
      "description": "Pablo Picasso is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Cleopatra",
      "difficulty": "easy",
      "description": "Cleopatra is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Wolfgang Amadeus Mozart",
      "difficulty": "easy",
      "description": "Wolfgang Amadeus Mozart fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Charles Darwin",
      "difficulty": "easy",
      "description": "Charles Darwin is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Abraham Lincoln",
      "difficulty": "easy",
      "description": "Abraham Lincoln is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Vincent van Gogh",
      "difficulty": "easy",
      "description": "Vincent van Gogh is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Amelia Earhart",
      "difficulty": "easy",
      "description": "Amelia Earhart fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Steve Jobs",
      "difficulty": "easy",
      "description": "Steve Jobs is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Stephen Hawking",
      "difficulty": "easy",
      "description": "Stephen Hawking is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Oprah Winfrey",
      "difficulty": "easy",
      "description": "Oprah Winfrey fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Leonardo DiCaprio",
      "difficulty": "easy",
      "description": "Leonardo DiCaprio is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Beethoven",
      "difficulty": "easy",
      "description": "Beethoven is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Frida Kahlo",
      "difficulty": "easy",
      "description": "Frida Kahlo fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Alexander the Great",
      "difficulty": "easy",
      "description": "Alexander the Great is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Jane Austen",
      "difficulty": "easy",
      "description": "Jane Austen fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Walt Disney",
      "difficulty": "easy",
      "description": "Walt Disney is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Muhammad Ali",
      "difficulty": "easy",
      "description": "Muhammad Ali is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Marlon Brando",
      "difficulty": "easy",
      "description": "Marlon Brando fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Coco Chanel",
      "difficulty": "easy",
      "description": "Coco Chanel is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Neil Armstrong",
      "difficulty": "easy",
      "description": "Neil Armstrong is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Malala Yousafzai",
      "difficulty": "easy",
      "description": "Malala Yousafzai is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "J.K. Rowling",
      "difficulty": "easy",
      "description": "J.K. Rowling is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "David Bowie",
      "difficulty": "easy",
      "description": "David Bowie is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Diana, Princess of Wales",
      "difficulty": "easy",
      "description": "Diana, Princess of Wales is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Che Guevara",
      "difficulty": "easy",
      "description": "Che Guevara is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Helen Keller",
      "difficulty": "easy",
      "description": "Helen Keller fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Queen Elizabeth II",
      "difficulty": "easy",
      "description": "Queen Elizabeth II is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Salvador Dalí",
      "difficulty": "easy",
      "description": "Salvador Dalí is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Marie Antoinette",
      "difficulty": "easy",
      "description": "Marie Antoinette fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Pele",
      "difficulty": "easy",
      "description": "Pele is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Emily Dickinson",
      "difficulty": "easy",
      "description": "Emily Dickinson fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Napoleon Bonaparte",
      "difficulty": "easy",
      "description": "Napoleon Bonaparte is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Beyoncé",
      "difficulty": "easy",
      "description": "Beyoncé is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "George Orwell",
      "difficulty": "easy",
      "description": "George Orwell is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Stephen Spielberg",
      "difficulty": "easy",
      "description": "Stephen Spielberg is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Audrey Hepburn",
      "difficulty": "easy",
      "description": "Audrey Hepburn fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Pope Francis",
      "difficulty": "easy",
      "description": "Pope Francis is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Brad Pitt",
      "difficulty": "easy",
      "description": "Brad Pitt is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Angelina Jolie",
      "difficulty": "easy",
      "description": "Angelina Jolie is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Tom Cruise",
      "difficulty": "easy",
      "description": "Tom Cruise is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Jennifer Aniston",
      "difficulty": "easy",
      "description": "Jennifer Aniston is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Taylor Swift",
      "difficulty": "easy",
      "description": "Taylor Swift fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Dwayne Johnson",
      "difficulty": "easy",
      "description": "Dwayne Johnson fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Robert Downey Jr.",
      "difficulty": "easy",
      "description": "Robert Downey Jr. is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Scarlett Johansson",
      "difficulty": "easy",
      "description": "Scarlett Johansson fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Benedict Cumberbatch",
      "difficulty": "hard",
      "description": "Benedict Cumberbatch is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Keanu Reeves",
      "difficulty": "hard",
      "description": "Keanu Reeves is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Natalie Portman",
      "difficulty": "hard",
      "description": "Natalie Portman is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Joaquin Phoenix",
      "difficulty": "hard",
      "description": "Joaquin Phoenix is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Charlize Theron",
      "difficulty": "hard",
      "description": "Charlize Theron fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Michael Fassbender",
      "difficulty": "hard",
      "description": "Michael Fassbender fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Cate Blanchett",
      "difficulty": "hard",
      "description": "Cate Blanchett is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Tilda Swinton",
      "difficulty": "hard",
      "description": "Tilda Swinton is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Christoph Waltz",
      "difficulty": "hard",
      "description": "Christoph Waltz is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Saoirse Ronan",
      "difficulty": "hard",
      "description": "Saoirse Ronan is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Madame Curie",
      "difficulty": "easy",
      "description": "Madame Curie is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Voltaire",
      "difficulty": "hard",
      "description": "Voltaire is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Albert Schweitzer",
      "difficulty": "hard",
      "description": "Albert Schweitzer fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Angela Merkel",
      "difficulty": "hard",
      "description": "Angela Merkel fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Aretha Franklin",
      "difficulty": "hard",
      "description": "Aretha Franklin is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Ariana Grande",
      "difficulty": "easy",
      "description": "Ariana Grande is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Bill Gates",
      "difficulty": "easy",
      "description": "Bill Gates is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Bob Dylan",
      "difficulty": "hard",
      "description": "Bob Dylan is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Bradley Cooper",
      "difficulty": "hard",
      "description": "Bradley Cooper is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Daniel Day-Lewis",
      "difficulty": "hard",
      "description": "Daniel Day-Lewis is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Donald Trump",
      "difficulty": "easy",
      "description": "Donald Trump is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Drake",
      "difficulty": "easy",
      "description": "Drake is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Eleanor Roosevelt",
      "difficulty": "easy",
      "description": "Eleanor Roosevelt is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Elton John",
      "difficulty": "easy",
      "description": "Elton John is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "George Clooney",
      "difficulty": "easy",
      "description": "George Clooney is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Hillary Clinton",
      "difficulty": "easy",
      "description": "Hillary Clinton is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Jacinda Ardern",
      "difficulty": "hard",
      "description": "Jacinda Ardern is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Jennifer Lawrence",
      "difficulty": "easy",
      "description": "Jennifer Lawrence is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Jesse Owens",
      "difficulty": "hard",
      "description": "Jesse Owens fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "John Lennon",
      "difficulty": "hard",
      "description": "John Lennon fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Johnny Depp",
      "difficulty": "easy",
      "description": "Johnny Depp is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Mark Zuckerberg",
      "difficulty": "easy",
      "description": "Mark Zuckerberg is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Meryl Streep",
      "difficulty": "hard",
      "description": "Meryl Streep is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Paul McCartney",
      "difficulty": "hard",
      "description": "Paul McCartney fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Rihanna",
      "difficulty": "easy",
      "description": "Rihanna is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Ryan Gosling",
      "difficulty": "easy",
      "description": "Ryan Gosling fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Satoshi Nakamoto",
      "difficulty": "hard",
      "description": "Satoshi Nakamoto is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Simone Biles",
      "difficulty": "hard",
      "description": "Simone Biles fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Tiger Woods",
      "difficulty": "easy",
      "description": "Tiger Woods fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Tom Brady",
      "difficulty": "easy",
      "description": "Tom Brady is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Tom Hanks",
      "difficulty": "easy",
      "description": "Tom Hanks is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Wayne Gretzky",
      "difficulty": "hard",
      "description": "Wayne Gretzky fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Whitney Houston",
      "difficulty": "easy",
      "description": "Whitney Houston is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Winston Churchill",
      "difficulty": "easy",
      "description": "Winston Churchill fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Bruno Mars",
      "difficulty": "easy",
      "description": "Bruno Mars is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Celine Dion",
      "difficulty": "easy",
      "description": "Celine Dion is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Denzel Washington",
      "difficulty": "easy",
      "description": "Denzel Washington is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Emma Stone",
      "difficulty": "easy",
      "description": "Emma Stone is a clueable term relevant to Famous Personalities."
    },
    {
      "word": "Emma Watson",
      "difficulty": "easy",
      "description": "Emma Watson fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Jennifer Lopez",
      "difficulty": "easy",
      "description": "Jennifer Lopez is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Kate Winslet",
      "difficulty": "easy",
      "description": "Kate Winslet fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Katy Perry",
      "difficulty": "easy",
      "description": "Katy Perry is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Kylian Mbappé",
      "difficulty": "easy",
      "description": "Kylian Mbappé is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Mohamed Salah",
      "difficulty": "easy",
      "description": "Mohamed Salah is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Neymar Jr.",
      "difficulty": "easy",
      "description": "Neymar Jr. fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Shakira",
      "difficulty": "easy",
      "description": "Shakira is commonly used in Famous Personalities themed clues."
    },
    {
      "word": "Zlatan Ibrahimović",
      "difficulty": "hard",
      "description": "Zlatan Ibrahimović is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Justin Trudeau",
      "difficulty": "hard",
      "description": "Justin Trudeau fits the Famous Personalities category for quick, descriptive gameplay."
    },
    {
      "word": "Joe Biden",
      "difficulty": "easy",
      "description": "Joe Biden is a useful Famous Personalities reference for fast team guessing rounds."
    },
    {
      "word": "Emmanuel Macron",
      "difficulty": "hard",
      "description": "Emmanuel Macron is a useful Famous Personalities reference for fast team guessing rounds."
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
      "description": "COVID-19 Pandemic is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Climate Change",
      "difficulty": "easy",
      "description": "Climate Change is a clueable term relevant to Current Events."
    },
    {
      "word": "Space Exploration",
      "difficulty": "easy",
      "description": "Space Exploration fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Olympic Games",
      "difficulty": "easy",
      "description": "Olympic Games is a clueable term relevant to Current Events."
    },
    {
      "word": "Presidential Election",
      "difficulty": "easy",
      "description": "Presidential Election is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Global Warming",
      "difficulty": "easy",
      "description": "Global Warming is a clueable term relevant to Current Events."
    },
    {
      "word": "Brexit",
      "difficulty": "easy",
      "description": "Brexit fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Cybersecurity",
      "difficulty": "easy",
      "description": "Cybersecurity is commonly used in Current Events themed clues."
    },
    {
      "word": "Artificial Intelligence",
      "difficulty": "easy",
      "description": "Artificial Intelligence is a clueable term relevant to Current Events."
    },
    {
      "word": "Social Media",
      "difficulty": "easy",
      "description": "Social Media fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Electric Vehicles",
      "difficulty": "easy",
      "description": "Electric Vehicles is commonly used in Current Events themed clues."
    },
    {
      "word": "Mars Rover Mission",
      "difficulty": "easy",
      "description": "Mars Rover Mission is a clueable term relevant to Current Events."
    },
    {
      "word": "Protests",
      "difficulty": "easy",
      "description": "Protests fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Vaccination Campaigns",
      "difficulty": "easy",
      "description": "Vaccination Campaigns is a clueable term relevant to Current Events."
    },
    {
      "word": "Trade Wars",
      "difficulty": "easy",
      "description": "Trade Wars is commonly used in Current Events themed clues."
    },
    {
      "word": "Wildfires",
      "difficulty": "easy",
      "description": "Wildfires is a clueable term relevant to Current Events."
    },
    {
      "word": "Refugee Crisis",
      "difficulty": "easy",
      "description": "Refugee Crisis fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Terrorist Attacks",
      "difficulty": "easy",
      "description": "Terrorist Attacks is a clueable term relevant to Current Events."
    },
    {
      "word": "Space Tourism",
      "difficulty": "easy",
      "description": "Space Tourism is a clueable term relevant to Current Events."
    },
    {
      "word": "Cryptocurrency Boom",
      "difficulty": "easy",
      "description": "Cryptocurrency Boom is commonly used in Current Events themed clues."
    },
    {
      "word": "Healthcare Reform",
      "difficulty": "easy",
      "description": "Healthcare Reform is commonly used in Current Events themed clues."
    },
    {
      "word": "Artificial Meat",
      "difficulty": "easy",
      "description": "Artificial Meat fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Pandemic Response",
      "difficulty": "easy",
      "description": "Pandemic Response is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Environmental Policies",
      "difficulty": "easy",
      "description": "Environmental Policies is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Gig Economy",
      "difficulty": "easy",
      "description": "Gig Economy is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Student Protests",
      "difficulty": "easy",
      "description": "Student Protests fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Rising Inflation",
      "difficulty": "easy",
      "description": "Rising Inflation is a clueable term relevant to Current Events."
    },
    {
      "word": "Homelessness Crisis",
      "difficulty": "easy",
      "description": "Homelessness Crisis is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Online Education",
      "difficulty": "easy",
      "description": "Online Education is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Political Scandals",
      "difficulty": "easy",
      "description": "Political Scandals is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Social Justice Movements",
      "difficulty": "easy",
      "description": "Social Justice Movements is a clueable term relevant to Current Events."
    },
    {
      "word": "Space Race",
      "difficulty": "easy",
      "description": "Space Race fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Economic Stimulus Packages",
      "difficulty": "easy",
      "description": "Economic Stimulus Packages is commonly used in Current Events themed clues."
    },
    {
      "word": "AI Ethics Debate",
      "difficulty": "easy",
      "description": "AI Ethics Debate fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Remote Work Trends",
      "difficulty": "easy",
      "description": "Remote Work Trends is a clueable term relevant to Current Events."
    },
    {
      "word": "Ransomware Attacks",
      "difficulty": "easy",
      "description": "Ransomware Attacks is commonly used in Current Events themed clues."
    },
    {
      "word": "Sustainable Development Goals",
      "difficulty": "easy",
      "description": "Sustainable Development Goals is a clueable term relevant to Current Events."
    },
    {
      "word": "Plastic Pollution",
      "difficulty": "easy",
      "description": "Plastic Pollution is a clueable term relevant to Current Events."
    },
    {
      "word": "Food Security",
      "difficulty": "easy",
      "description": "Food Security is a clueable term relevant to Current Events."
    },
    {
      "word": "Medical Breakthroughs",
      "difficulty": "easy",
      "description": "Medical Breakthroughs fits the Current Events category for quick, descriptive gameplay."
    },
    {
      "word": "Gender Equality Movements",
      "difficulty": "easy",
      "description": "Gender Equality Movements is a clueable term relevant to Current Events."
    },
    {
      "word": "Social Distancing",
      "difficulty": "easy",
      "description": "Social Distancing is a clueable term relevant to Current Events."
    },
    {
      "word": "Renewable Energy Initiatives",
      "difficulty": "easy",
      "description": "Renewable Energy Initiatives is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Remote Voting",
      "difficulty": "easy",
      "description": "Remote Voting is commonly used in Current Events themed clues."
    },
    {
      "word": "Digital Privacy Issues",
      "difficulty": "easy",
      "description": "Digital Privacy Issues is a useful Current Events reference for fast team guessing rounds."
    },
    {
      "word": "Climate Activism",
      "difficulty": "easy",
      "description": "Climate Activism is commonly used in Current Events themed clues."
    },
    {
      "word": "Space Debris",
      "difficulty": "easy",
      "description": "Space Debris is commonly used in Current Events themed clues."
    },
    {
      "word": "Paris Fashion Week",
      "difficulty": "easy",
      "description": "Paris Fashion Week is commonly used in Current Events themed clues."
    },
    {
      "word": "Coachella",
      "difficulty": "easy",
      "description": "Coachella is a clueable term relevant to Current Events."
    },
    {
      "word": "Dubai Shopping Festival",
      "difficulty": "easy",
      "description": "Dubai Shopping Festival is a useful Current Events reference for fast team guessing rounds."
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
      "description": "God is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Buddha",
      "difficulty": "easy",
      "description": "Buddha fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Jesus",
      "difficulty": "easy",
      "description": "Jesus is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Hinduism",
      "difficulty": "easy",
      "description": "Hinduism is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Egyptian Mythology",
      "difficulty": "easy",
      "description": "Egyptian Mythology fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Greek Mythology",
      "difficulty": "easy",
      "description": "Greek Mythology is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Christianity",
      "difficulty": "easy",
      "description": "Christianity is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Islam",
      "difficulty": "easy",
      "description": "Islam is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Shiva",
      "difficulty": "easy",
      "description": "Shiva fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Bible",
      "difficulty": "easy",
      "description": "Bible is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Vishnu",
      "difficulty": "easy",
      "description": "Vishnu is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Odin",
      "difficulty": "easy",
      "description": "Odin is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Mythology",
      "difficulty": "easy",
      "description": "Mythology fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Paganism",
      "difficulty": "easy",
      "description": "Paganism is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Taoism",
      "difficulty": "easy",
      "description": "Taoism is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Myth",
      "difficulty": "easy",
      "description": "Myth fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Ancient Greek Gods",
      "difficulty": "easy",
      "description": "Ancient Greek Gods is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Norse Mythology",
      "difficulty": "easy",
      "description": "Norse Mythology fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Theology",
      "difficulty": "easy",
      "description": "Theology fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Creation Myth",
      "difficulty": "easy",
      "description": "Creation Myth is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Divinity",
      "difficulty": "easy",
      "description": "Divinity is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Pantheon",
      "difficulty": "easy",
      "description": "Pantheon is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Deity",
      "difficulty": "easy",
      "description": "Deity is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Ragnarok",
      "difficulty": "easy",
      "description": "Ragnarok fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Monotheism",
      "difficulty": "easy",
      "description": "Monotheism is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Polytheism",
      "difficulty": "easy",
      "description": "Polytheism is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Hindu Gods",
      "difficulty": "easy",
      "description": "Hindu Gods is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Greek Gods",
      "difficulty": "easy",
      "description": "Greek Gods fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Roman Mythology",
      "difficulty": "easy",
      "description": "Roman Mythology fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Norse Gods",
      "difficulty": "easy",
      "description": "Norse Gods is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Holy",
      "difficulty": "easy",
      "description": "Holy fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Sacred",
      "difficulty": "easy",
      "description": "Sacred fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Religious Text",
      "difficulty": "easy",
      "description": "Religious Text fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Angel",
      "difficulty": "easy",
      "description": "Angel is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Demon",
      "difficulty": "easy",
      "description": "Demon fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Pagan Gods",
      "difficulty": "easy",
      "description": "Pagan Gods is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Heaven",
      "difficulty": "easy",
      "description": "Heaven is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Hell",
      "difficulty": "easy",
      "description": "Hell is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Mythical Creatures",
      "difficulty": "easy",
      "description": "Mythical Creatures is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Religion",
      "difficulty": "easy",
      "description": "Religion is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Mythological Beings",
      "difficulty": "easy",
      "description": "Mythological Beings is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Holy Book",
      "difficulty": "easy",
      "description": "Holy Book fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Prophet",
      "difficulty": "easy",
      "description": "Prophet is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Goddess",
      "difficulty": "easy",
      "description": "Goddess is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Ancient Gods",
      "difficulty": "easy",
      "description": "Ancient Gods fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Divine",
      "difficulty": "easy",
      "description": "Divine is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Zeus",
      "difficulty": "easy",
      "description": "Zeus is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Hercules",
      "difficulty": "easy",
      "description": "Hercules is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Thor",
      "difficulty": "easy",
      "description": "Thor is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Medusa",
      "difficulty": "easy",
      "description": "Medusa is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Minotaur",
      "difficulty": "easy",
      "description": "Minotaur is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Poseidon",
      "difficulty": "easy",
      "description": "Poseidon fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Apollo",
      "difficulty": "easy",
      "description": "Apollo is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Athena",
      "difficulty": "easy",
      "description": "Athena is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Hades",
      "difficulty": "easy",
      "description": "Hades is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Pandora",
      "difficulty": "easy",
      "description": "Pandora fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Prometheus",
      "difficulty": "hard",
      "description": "Prometheus is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Persephone",
      "difficulty": "hard",
      "description": "Persephone is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Charon",
      "difficulty": "hard",
      "description": "Charon is a useful Religion and Mythology reference for fast team guessing rounds."
    },
    {
      "word": "Bifrost Bridge",
      "difficulty": "hard",
      "description": "Bifrost Bridge is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Valkyrie",
      "difficulty": "hard",
      "description": "Valkyrie is commonly used in Religion and Mythology themed clues."
    },
    {
      "word": "Fenrir",
      "difficulty": "hard",
      "description": "Fenrir fits the Religion and Mythology category for quick, descriptive gameplay."
    },
    {
      "word": "Chimera",
      "difficulty": "hard",
      "description": "Chimera is a clueable term relevant to Religion and Mythology."
    },
    {
      "word": "Labyrinth of Crete",
      "difficulty": "hard",
      "description": "Labyrinth of Crete is a useful Religion and Mythology reference for fast team guessing rounds."
    }
  ],
  "Space and Astronomy": [
    {
      "word": "Galaxy",
      "difficulty": "easy",
      "description": "Galaxy is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Black Hole",
      "difficulty": "easy",
      "description": "Black Hole is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Star",
      "difficulty": "easy",
      "description": "Star is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Planet",
      "difficulty": "easy",
      "description": "Planet is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "The Solar System",
      "difficulty": "easy",
      "description": "The Solar System is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Moon",
      "difficulty": "easy",
      "description": "Moon is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Comet",
      "difficulty": "easy",
      "description": "Comet fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Asteroid",
      "difficulty": "easy",
      "description": "Asteroid is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Constellation",
      "difficulty": "easy",
      "description": "Constellation is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Milky Way",
      "difficulty": "easy",
      "description": "Milky Way is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Nebula",
      "difficulty": "easy",
      "description": "Nebula fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Space Station",
      "difficulty": "easy",
      "description": "Space Station is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Supernova",
      "difficulty": "easy",
      "description": "Supernova is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Telescope",
      "difficulty": "easy",
      "description": "Telescope is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Mars",
      "difficulty": "easy",
      "description": "Mars is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Satellite",
      "difficulty": "easy",
      "description": "Satellite is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Exoplanet",
      "difficulty": "easy",
      "description": "Exoplanet is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Big Bang",
      "difficulty": "easy",
      "description": "Big Bang is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Cosmos",
      "difficulty": "easy",
      "description": "Cosmos is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Hubble Space Telescope",
      "difficulty": "easy",
      "description": "Hubble Space Telescope is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Orbit",
      "difficulty": "easy",
      "description": "Orbit is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Spacecraft",
      "difficulty": "easy",
      "description": "Spacecraft is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Rocket",
      "difficulty": "easy",
      "description": "Rocket is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Interstellar",
      "difficulty": "easy",
      "description": "Interstellar is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Gravity",
      "difficulty": "easy",
      "description": "Gravity fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Galactic",
      "difficulty": "easy",
      "description": "Galactic fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Lunar",
      "difficulty": "easy",
      "description": "Lunar is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Milky Way Galaxy",
      "difficulty": "easy",
      "description": "Milky Way Galaxy is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Outer Space",
      "difficulty": "easy",
      "description": "Outer Space is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Astrobiology",
      "difficulty": "easy",
      "description": "Astrobiology is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Black Holes",
      "difficulty": "easy",
      "description": "Black Holes fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Dark Matter",
      "difficulty": "easy",
      "description": "Dark Matter fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Planetary",
      "difficulty": "easy",
      "description": "Planetary is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Space Travel",
      "difficulty": "easy",
      "description": "Space Travel fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Astrophysics",
      "difficulty": "easy",
      "description": "Astrophysics is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Neutron Star",
      "difficulty": "easy",
      "description": "Neutron Star is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Cosmology",
      "difficulty": "easy",
      "description": "Cosmology is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Meteor Shower",
      "difficulty": "easy",
      "description": "Meteor Shower is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Space Telescope",
      "difficulty": "easy",
      "description": "Space Telescope is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Astronaut",
      "difficulty": "easy",
      "description": "Astronaut is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Solar Eclipse",
      "difficulty": "easy",
      "description": "Solar Eclipse is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Orbital",
      "difficulty": "easy",
      "description": "Orbital is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Stellar",
      "difficulty": "easy",
      "description": "Stellar fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Space Mission",
      "difficulty": "easy",
      "description": "Space Mission fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Astronomy",
      "difficulty": "easy",
      "description": "Astronomy is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Space Race",
      "difficulty": "easy",
      "description": "Space Race is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Earth",
      "difficulty": "easy",
      "description": "Earth is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Sun",
      "difficulty": "easy",
      "description": "Sun is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Stars",
      "difficulty": "easy",
      "description": "Stars is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Meteor",
      "difficulty": "easy",
      "description": "Meteor is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "Light Year",
      "difficulty": "hard",
      "description": "Light Year is commonly used in Space and Astronomy themed clues."
    },
    {
      "word": "Red Giant",
      "difficulty": "hard",
      "description": "Red Giant is a useful Space and Astronomy reference for fast team guessing rounds."
    },
    {
      "word": "White Dwarf",
      "difficulty": "hard",
      "description": "White Dwarf is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Event Horizon",
      "difficulty": "hard",
      "description": "Event Horizon is a clueable term relevant to Space and Astronomy."
    },
    {
      "word": "Cosmic Microwave Background",
      "difficulty": "hard",
      "description": "Cosmic Microwave Background fits the Space and Astronomy category for quick, descriptive gameplay."
    },
    {
      "word": "Gravitational Waves",
      "difficulty": "hard",
      "description": "Gravitational Waves is commonly used in Space and Astronomy themed clues."
    }
  ],
  "Inventions and Discoveries": [
    {
      "word": "Electricity",
      "difficulty": "easy",
      "description": "Electricity is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Telephone",
      "difficulty": "easy",
      "description": "Telephone fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Internet",
      "difficulty": "easy",
      "description": "Internet is commonly used in Inventions and Discoveries themed clues."
    },
    {
      "word": "Computer",
      "difficulty": "easy",
      "description": "Computer fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Printing Press",
      "difficulty": "easy",
      "description": "Printing Press is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Penicillin",
      "difficulty": "easy",
      "description": "Penicillin is commonly used in Inventions and Discoveries themed clues."
    },
    {
      "word": "Vaccination",
      "difficulty": "easy",
      "description": "Vaccination is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Airplane",
      "difficulty": "easy",
      "description": "Airplane is commonly used in Inventions and Discoveries themed clues."
    },
    {
      "word": "Radio",
      "difficulty": "easy",
      "description": "Radio is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Television",
      "difficulty": "easy",
      "description": "Television is commonly used in Inventions and Discoveries themed clues."
    },
    {
      "word": "Steam Engine",
      "difficulty": "easy",
      "description": "Steam Engine is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Light Bulb",
      "difficulty": "easy",
      "description": "Light Bulb is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Photography",
      "difficulty": "easy",
      "description": "Photography is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Microscope",
      "difficulty": "easy",
      "description": "Microscope fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Antibiotics",
      "difficulty": "easy",
      "description": "Antibiotics fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Theory of Relativity",
      "difficulty": "easy",
      "description": "Theory of Relativity is commonly used in Inventions and Discoveries themed clues."
    },
    {
      "word": "DNA Double Helix",
      "difficulty": "easy",
      "description": "DNA Double Helix is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Wheel",
      "difficulty": "easy",
      "description": "Wheel is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Satellite",
      "difficulty": "easy",
      "description": "Satellite is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Robotics",
      "difficulty": "easy",
      "description": "Robotics fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Electric Light",
      "difficulty": "easy",
      "description": "Electric Light is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Internet of Things",
      "difficulty": "easy",
      "description": "Internet of Things fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Atomic Theory",
      "difficulty": "easy",
      "description": "Atomic Theory is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Pen",
      "difficulty": "easy",
      "description": "Pen is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Calculator",
      "difficulty": "easy",
      "description": "Calculator is commonly used in Inventions and Discoveries themed clues."
    },
    {
      "word": "Genetics",
      "difficulty": "easy",
      "description": "Genetics is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "X-ray",
      "difficulty": "easy",
      "description": "X-ray fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Helicopter",
      "difficulty": "easy",
      "description": "Helicopter is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Plastic",
      "difficulty": "easy",
      "description": "Plastic fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Submarine",
      "difficulty": "easy",
      "description": "Submarine is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Fiber Optics",
      "difficulty": "easy",
      "description": "Fiber Optics is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Refrigerator",
      "difficulty": "easy",
      "description": "Refrigerator fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Laser",
      "difficulty": "easy",
      "description": "Laser is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Printing",
      "difficulty": "easy",
      "description": "Printing is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Photovoltaic Cell",
      "difficulty": "easy",
      "description": "Photovoltaic Cell is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Nuclear Power",
      "difficulty": "easy",
      "description": "Nuclear Power is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Electric Motor",
      "difficulty": "easy",
      "description": "Electric Motor fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Semiconductor",
      "difficulty": "easy",
      "description": "Semiconductor is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Satnav",
      "difficulty": "easy",
      "description": "Satnav is commonly used in Inventions and Discoveries themed clues."
    },
    {
      "word": "Artificial Heart",
      "difficulty": "easy",
      "description": "Artificial Heart fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Internet Protocol (IP)",
      "difficulty": "easy",
      "description": "Internet Protocol (IP) is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Neutron Bomb",
      "difficulty": "easy",
      "description": "Neutron Bomb is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "MRI",
      "difficulty": "easy",
      "description": "MRI fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Quantum Theory",
      "difficulty": "easy",
      "description": "Quantum Theory fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Nanotechnology",
      "difficulty": "easy",
      "description": "Nanotechnology is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Car",
      "difficulty": "easy",
      "description": "Car fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Camera",
      "difficulty": "easy",
      "description": "Camera is commonly used in Inventions and Discoveries themed clues."
    },
    {
      "word": "Microwave",
      "difficulty": "easy",
      "description": "Microwave is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Thermometer",
      "difficulty": "hard",
      "description": "Thermometer is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Stethoscope",
      "difficulty": "hard",
      "description": "Stethoscope is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Typewriter",
      "difficulty": "hard",
      "description": "Typewriter fits the Inventions and Discoveries category for quick, descriptive gameplay."
    },
    {
      "word": "Sewing Machine",
      "difficulty": "hard",
      "description": "Sewing Machine is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Solar Panel",
      "difficulty": "hard",
      "description": "Solar Panel is a useful Inventions and Discoveries reference for fast team guessing rounds."
    },
    {
      "word": "Barcode",
      "difficulty": "hard",
      "description": "Barcode is a clueable term relevant to Inventions and Discoveries."
    },
    {
      "word": "Transistor",
      "difficulty": "hard",
      "description": "Transistor fits the Inventions and Discoveries category for quick, descriptive gameplay."
    }
  ],
  "Health and Medicine": [
    {
      "word": "Heart",
      "difficulty": "easy",
      "description": "Heart is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Brain",
      "difficulty": "easy",
      "description": "Brain is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Lungs",
      "difficulty": "easy",
      "description": "Lungs fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Bones",
      "difficulty": "easy",
      "description": "Bones is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Blood",
      "difficulty": "easy",
      "description": "Blood is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "DNA",
      "difficulty": "easy",
      "description": "DNA fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Virus",
      "difficulty": "easy",
      "description": "Virus fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Bacteria",
      "difficulty": "easy",
      "description": "Bacteria fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Antibiotics",
      "difficulty": "easy",
      "description": "Antibiotics is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Vaccination",
      "difficulty": "easy",
      "description": "Vaccination fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Cancer",
      "difficulty": "easy",
      "description": "Cancer is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Diabetes",
      "difficulty": "easy",
      "description": "Diabetes is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Obesity",
      "difficulty": "easy",
      "description": "Obesity fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Immune System",
      "difficulty": "easy",
      "description": "Immune System fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Surgery",
      "difficulty": "easy",
      "description": "Surgery is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Anatomy",
      "difficulty": "easy",
      "description": "Anatomy is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Physiology",
      "difficulty": "easy",
      "description": "Physiology fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Mental Health",
      "difficulty": "easy",
      "description": "Mental Health is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Pandemic",
      "difficulty": "easy",
      "description": "Pandemic is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Healthcare",
      "difficulty": "easy",
      "description": "Healthcare is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Stethoscope",
      "difficulty": "easy",
      "description": "Stethoscope is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "X-ray",
      "difficulty": "easy",
      "description": "X-ray fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "MRI",
      "difficulty": "easy",
      "description": "MRI is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Emergency Room",
      "difficulty": "easy",
      "description": "Emergency Room is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Pharmacy",
      "difficulty": "easy",
      "description": "Pharmacy fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Medical Research",
      "difficulty": "easy",
      "description": "Medical Research is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Epidemic",
      "difficulty": "easy",
      "description": "Epidemic is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Public Health",
      "difficulty": "easy",
      "description": "Public Health is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Pulse",
      "difficulty": "easy",
      "description": "Pulse fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Fever",
      "difficulty": "easy",
      "description": "Fever is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Hygiene",
      "difficulty": "easy",
      "description": "Hygiene is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Cholesterol",
      "difficulty": "easy",
      "description": "Cholesterol is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Allergies",
      "difficulty": "easy",
      "description": "Allergies is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Depression",
      "difficulty": "easy",
      "description": "Depression is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Pain",
      "difficulty": "easy",
      "description": "Pain fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Physical Therapy",
      "difficulty": "easy",
      "description": "Physical Therapy fits the Health and Medicine category for quick, descriptive gameplay."
    },
    {
      "word": "Health Insurance",
      "difficulty": "easy",
      "description": "Health Insurance is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Hospice Care",
      "difficulty": "easy",
      "description": "Hospice Care is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Medical Ethics",
      "difficulty": "easy",
      "description": "Medical Ethics is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Nutrition",
      "difficulty": "easy",
      "description": "Nutrition is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Exercise",
      "difficulty": "easy",
      "description": "Exercise is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Disease",
      "difficulty": "easy",
      "description": "Disease is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "First Aid",
      "difficulty": "easy",
      "description": "First Aid is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Therapy",
      "difficulty": "easy",
      "description": "Therapy is a clueable term relevant to Health and Medicine."
    },
    {
      "word": "Epidemiology",
      "difficulty": "easy",
      "description": "Epidemiology is commonly used in Health and Medicine themed clues."
    },
    {
      "word": "Anesthesia",
      "difficulty": "easy",
      "description": "Anesthesia is a useful Health and Medicine reference for fast team guessing rounds."
    },
    {
      "word": "Madame Curie",
      "difficulty": "easy",
      "description": "Madame Curie is a clueable term relevant to Health and Medicine."
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
      "description": "Chess is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Monopoly",
      "difficulty": "easy",
      "description": "Monopoly fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "LEGO",
      "difficulty": "easy",
      "description": "LEGO is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Puzzle",
      "difficulty": "easy",
      "description": "Puzzle is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Dolls",
      "difficulty": "easy",
      "description": "Dolls is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Video Games",
      "difficulty": "easy",
      "description": "Video Games fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Board Game",
      "difficulty": "easy",
      "description": "Board Game is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Action Figures",
      "difficulty": "easy",
      "description": "Action Figures is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Rubik's Cube",
      "difficulty": "easy",
      "description": "Rubik's Cube is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Card Game",
      "difficulty": "easy",
      "description": "Card Game fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Toy Cars",
      "difficulty": "easy",
      "description": "Toy Cars fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Dungeons & Dragons",
      "difficulty": "easy",
      "description": "Dungeons & Dragons fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Lego Bricks",
      "difficulty": "easy",
      "description": "Lego Bricks is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Barbie",
      "difficulty": "easy",
      "description": "Barbie is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Teddy Bear",
      "difficulty": "easy",
      "description": "Teddy Bear is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Nintendo",
      "difficulty": "easy",
      "description": "Nintendo is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "PlayStation",
      "difficulty": "easy",
      "description": "PlayStation fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Xbox",
      "difficulty": "easy",
      "description": "Xbox fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Dungeons and Dragons",
      "difficulty": "easy",
      "description": "Dungeons and Dragons is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Checkers",
      "difficulty": "easy",
      "description": "Checkers fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Jigsaw Puzzle",
      "difficulty": "easy",
      "description": "Jigsaw Puzzle is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Yo-Yo",
      "difficulty": "easy",
      "description": "Yo-Yo fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Trivial Pursuit",
      "difficulty": "easy",
      "description": "Trivial Pursuit is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Hot Wheels",
      "difficulty": "easy",
      "description": "Hot Wheels is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Transformer Toys",
      "difficulty": "easy",
      "description": "Transformer Toys is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Barbie Dolls",
      "difficulty": "easy",
      "description": "Barbie Dolls is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Nintendo Switch",
      "difficulty": "easy",
      "description": "Nintendo Switch is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Play-Doh",
      "difficulty": "easy",
      "description": "Play-Doh is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Fidget Spinner",
      "difficulty": "easy",
      "description": "Fidget Spinner is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Legos",
      "difficulty": "easy",
      "description": "Legos is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Remote Control Cars",
      "difficulty": "easy",
      "description": "Remote Control Cars is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Rubik's Cubes",
      "difficulty": "easy",
      "description": "Rubik's Cubes is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Magic: The Gathering",
      "difficulty": "easy",
      "description": "Magic: The Gathering fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Candy Land",
      "difficulty": "easy",
      "description": "Candy Land is a clueable term relevant to Games and Toys."
    },
    {
      "word": "G.I. Joe",
      "difficulty": "easy",
      "description": "G.I. Joe is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Tamagotchi",
      "difficulty": "easy",
      "description": "Tamagotchi is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Nerf Guns",
      "difficulty": "easy",
      "description": "Nerf Guns is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Lincoln Logs",
      "difficulty": "easy",
      "description": "Lincoln Logs is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Dollhouse",
      "difficulty": "easy",
      "description": "Dollhouse is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Marbles",
      "difficulty": "easy",
      "description": "Marbles is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Sudoku",
      "difficulty": "easy",
      "description": "Sudoku is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Toy Story",
      "difficulty": "easy",
      "description": "Toy Story is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Polly Pocket",
      "difficulty": "easy",
      "description": "Polly Pocket is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Furby",
      "difficulty": "easy",
      "description": "Furby is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Barbie Doll",
      "difficulty": "easy",
      "description": "Barbie Doll is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Remote Control Car",
      "difficulty": "easy",
      "description": "Remote Control Car is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Stuffed Animals",
      "difficulty": "easy",
      "description": "Stuffed Animals fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Matchbox Cars",
      "difficulty": "easy",
      "description": "Matchbox Cars is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Connect Four",
      "difficulty": "easy",
      "description": "Connect Four is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Jenga",
      "difficulty": "easy",
      "description": "Jenga fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Scrabble",
      "difficulty": "hard",
      "description": "Scrabble is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Clue",
      "difficulty": "easy",
      "description": "Clue is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Risk",
      "difficulty": "easy",
      "description": "Risk fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "UNO",
      "difficulty": "easy",
      "description": "UNO is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Twister",
      "difficulty": "hard",
      "description": "Twister is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Operation",
      "difficulty": "easy",
      "description": "Operation is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Nerf Blaster",
      "difficulty": "easy",
      "description": "Nerf Blaster is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "RC Car",
      "difficulty": "easy",
      "description": "RC Car fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Puzzle Box",
      "difficulty": "hard",
      "description": "Puzzle Box is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Beyblade",
      "difficulty": "easy",
      "description": "Beyblade is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Lego Minifigure",
      "difficulty": "hard",
      "description": "Lego Minifigure is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Toy Drone",
      "difficulty": "easy",
      "description": "Toy Drone is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Water Gun",
      "difficulty": "easy",
      "description": "Water Gun is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Action Figure",
      "difficulty": "easy",
      "description": "Action Figure is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Board Game Night",
      "difficulty": "hard",
      "description": "Board Game Night fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Card Deck",
      "difficulty": "easy",
      "description": "Card Deck is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Dice Tower",
      "difficulty": "easy",
      "description": "Dice Tower is commonly used in Games and Toys themed clues."
    },
    {
      "word": "Chess Clock",
      "difficulty": "easy",
      "description": "Chess Clock is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Game Piece",
      "difficulty": "hard",
      "description": "Game Piece is a clueable term relevant to Games and Toys."
    },
    {
      "word": "Claw Machine",
      "difficulty": "easy",
      "description": "Claw Machine fits the Games and Toys category for quick, descriptive gameplay."
    },
    {
      "word": "Bean Bag Toss",
      "difficulty": "easy",
      "description": "Bean Bag Toss is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Foosball Table",
      "difficulty": "easy",
      "description": "Foosball Table is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Air Hockey",
      "difficulty": "hard",
      "description": "Air Hockey is a useful Games and Toys reference for fast team guessing rounds."
    },
    {
      "word": "Pinball",
      "difficulty": "easy",
      "description": "Pinball fits the Games and Toys category for quick, descriptive gameplay."
    }
  ],
  "Books and Authors": [
    {
      "word": "William Shakespeare",
      "difficulty": "easy",
      "description": "William Shakespeare is a clueable term relevant to Books and Authors."
    },
    {
      "word": "Jane Austen",
      "difficulty": "easy",
      "description": "Jane Austen fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "George Orwell",
      "difficulty": "easy",
      "description": "George Orwell is a clueable term relevant to Books and Authors."
    },
    {
      "word": "Charles Dickens",
      "difficulty": "easy",
      "description": "Charles Dickens is a clueable term relevant to Books and Authors."
    },
    {
      "word": "Mark Twain",
      "difficulty": "easy",
      "description": "Mark Twain is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "Agatha Christie",
      "difficulty": "easy",
      "description": "Agatha Christie is commonly used in Books and Authors themed clues."
    },
    {
      "word": "Stephen King",
      "difficulty": "easy",
      "description": "Stephen King is commonly used in Books and Authors themed clues."
    },
    {
      "word": "The Lord of the Rings",
      "difficulty": "easy",
      "description": "The Lord of the Rings fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "To Kill a Mockingbird",
      "difficulty": "easy",
      "description": "To Kill a Mockingbird is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "The Catcher in the Rye",
      "difficulty": "easy",
      "description": "The Catcher in the Rye fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "Alice's Adventures in Wonderland",
      "difficulty": "easy",
      "description": "Alice's Adventures in Wonderland is a clueable term relevant to Books and Authors."
    },
    {
      "word": "The Bible",
      "difficulty": "easy",
      "description": "The Bible is a clueable term relevant to Books and Authors."
    },
    {
      "word": "A Song of Ice and Fire",
      "difficulty": "easy",
      "description": "A Song of Ice and Fire is commonly used in Books and Authors themed clues."
    },
    {
      "word": "The Odyssey",
      "difficulty": "easy",
      "description": "The Odyssey is commonly used in Books and Authors themed clues."
    },
    {
      "word": "The Hobbit",
      "difficulty": "easy",
      "description": "The Hobbit is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "Lord of the Flies",
      "difficulty": "easy",
      "description": "Lord of the Flies is a clueable term relevant to Books and Authors."
    },
    {
      "word": "Pride and Prejudice",
      "difficulty": "easy",
      "description": "Pride and Prejudice fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "The Chronicles of Narnia",
      "difficulty": "easy",
      "description": "The Chronicles of Narnia is a clueable term relevant to Books and Authors."
    },
    {
      "word": "Moby-Dick",
      "difficulty": "easy",
      "description": "Moby-Dick is commonly used in Books and Authors themed clues."
    },
    {
      "word": "1984",
      "difficulty": "easy",
      "description": "1984 is commonly used in Books and Authors themed clues."
    },
    {
      "word": "Brave New World",
      "difficulty": "easy",
      "description": "Brave New World is a clueable term relevant to Books and Authors."
    },
    {
      "word": "The Adventures of Huckleberry Finn",
      "difficulty": "easy",
      "description": "The Adventures of Huckleberry Finn is a clueable term relevant to Books and Authors."
    },
    {
      "word": "Wuthering Heights",
      "difficulty": "easy",
      "description": "Wuthering Heights is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "The Grapes of Wrath",
      "difficulty": "easy",
      "description": "The Grapes of Wrath fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "Frankenstein",
      "difficulty": "easy",
      "description": "Frankenstein fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "Little Women",
      "difficulty": "easy",
      "description": "Little Women is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "Gone with the Wind",
      "difficulty": "easy",
      "description": "Gone with the Wind is commonly used in Books and Authors themed clues."
    },
    {
      "word": "The Count of Monte Cristo",
      "difficulty": "easy",
      "description": "The Count of Monte Cristo fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "The Picture of Dorian Gray",
      "difficulty": "easy",
      "description": "The Picture of Dorian Gray is commonly used in Books and Authors themed clues."
    },
    {
      "word": "Dracula",
      "difficulty": "easy",
      "description": "Dracula is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "One Hundred Years of Solitude",
      "difficulty": "easy",
      "description": "One Hundred Years of Solitude fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "The Kite Runner",
      "difficulty": "easy",
      "description": "The Kite Runner is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "The Girl with the Dragon Tattoo",
      "difficulty": "easy",
      "description": "The Girl with the Dragon Tattoo fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "The Alchemist",
      "difficulty": "easy",
      "description": "The Alchemist fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "The Hitchhiker's Guide to the Galaxy",
      "difficulty": "easy",
      "description": "The Hitchhiker's Guide to the Galaxy fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "The Book Thief",
      "difficulty": "easy",
      "description": "The Book Thief is a clueable term relevant to Books and Authors."
    },
    {
      "word": "War and Peace",
      "difficulty": "easy",
      "description": "War and Peace fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "Les Misérables",
      "difficulty": "easy",
      "description": "Les Misérables is a clueable term relevant to Books and Authors."
    },
    {
      "word": "The Shining",
      "difficulty": "easy",
      "description": "The Shining fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "The Secret Garden",
      "difficulty": "easy",
      "description": "The Secret Garden fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "The Silmarillion",
      "difficulty": "easy",
      "description": "The Silmarillion is commonly used in Books and Authors themed clues."
    },
    {
      "word": "Anna Karenina",
      "difficulty": "easy",
      "description": "Anna Karenina is a clueable term relevant to Books and Authors."
    },
    {
      "word": "The Fault in Our Stars",
      "difficulty": "easy",
      "description": "The Fault in Our Stars is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "The Road",
      "difficulty": "easy",
      "description": "The Road is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "Moby Dick",
      "difficulty": "easy",
      "description": "Moby Dick is a clueable term relevant to Books and Authors."
    },
    {
      "word": "The Da Vinci Code",
      "difficulty": "easy",
      "description": "The Da Vinci Code fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "Lord of the Rings",
      "difficulty": "easy",
      "description": "Lord of the Rings fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "Crime and Punishment",
      "difficulty": "hard",
      "description": "Crime and Punishment is a clueable term relevant to Books and Authors."
    },
    {
      "word": "The Brothers Karamazov",
      "difficulty": "hard",
      "description": "The Brothers Karamazov fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "Love in the Time of Cholera",
      "difficulty": "hard",
      "description": "Love in the Time of Cholera fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "A Tale of Two Cities",
      "difficulty": "hard",
      "description": "A Tale of Two Cities is commonly used in Books and Authors themed clues."
    },
    {
      "word": "Midnight's Children",
      "difficulty": "hard",
      "description": "Midnight's Children fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "Infinite Jest",
      "difficulty": "hard",
      "description": "Infinite Jest is a useful Books and Authors reference for fast team guessing rounds."
    },
    {
      "word": "Jean-Paul Sartre",
      "difficulty": "hard",
      "description": "Jean-Paul Sartre is a clueable term relevant to Books and Authors."
    },
    {
      "word": "Walt Whitman",
      "difficulty": "hard",
      "description": "Walt Whitman fits the Books and Authors category for quick, descriptive gameplay."
    },
    {
      "word": "DC Comics",
      "difficulty": "easy",
      "description": "DC Comics is commonly used in Books and Authors themed clues."
    }
  ],
  "Video Games": [
    {
      "word": "Mario",
      "difficulty": "easy",
      "description": "Mario fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Pac-Man",
      "difficulty": "easy",
      "description": "Pac-Man is a clueable term relevant to Video Games."
    },
    {
      "word": "Fortnite",
      "difficulty": "easy",
      "description": "Fortnite fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "The Legend of Zelda",
      "difficulty": "easy",
      "description": "The Legend of Zelda is a clueable term relevant to Video Games."
    },
    {
      "word": "Minecraft",
      "difficulty": "easy",
      "description": "Minecraft is a clueable term relevant to Video Games."
    },
    {
      "word": "Pokemon",
      "difficulty": "easy",
      "description": "Pokemon is a clueable term relevant to Video Games."
    },
    {
      "word": "Tetris",
      "difficulty": "easy",
      "description": "Tetris is commonly used in Video Games themed clues."
    },
    {
      "word": "Super Mario Bros.",
      "difficulty": "easy",
      "description": "Super Mario Bros. fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Call of Duty",
      "difficulty": "easy",
      "description": "Call of Duty is commonly used in Video Games themed clues."
    },
    {
      "word": "Overwatch",
      "difficulty": "easy",
      "description": "Overwatch is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "World of Warcraft",
      "difficulty": "easy",
      "description": "World of Warcraft fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "FIFA",
      "difficulty": "easy",
      "description": "FIFA fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "League of Legends",
      "difficulty": "easy",
      "description": "League of Legends fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Grand Theft Auto",
      "difficulty": "easy",
      "description": "Grand Theft Auto fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Counter-Strike",
      "difficulty": "easy",
      "description": "Counter-Strike is a clueable term relevant to Video Games."
    },
    {
      "word": "Sonic the Hedgehog",
      "difficulty": "easy",
      "description": "Sonic the Hedgehog is a clueable term relevant to Video Games."
    },
    {
      "word": "Final Fantasy",
      "difficulty": "easy",
      "description": "Final Fantasy is a clueable term relevant to Video Games."
    },
    {
      "word": "Street Fighter",
      "difficulty": "easy",
      "description": "Street Fighter is commonly used in Video Games themed clues."
    },
    {
      "word": "Halo",
      "difficulty": "easy",
      "description": "Halo is a clueable term relevant to Video Games."
    },
    {
      "word": "Doom",
      "difficulty": "easy",
      "description": "Doom is commonly used in Video Games themed clues."
    },
    {
      "word": "Assassin's Creed",
      "difficulty": "easy",
      "description": "Assassin's Creed is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Mortal Kombat",
      "difficulty": "easy",
      "description": "Mortal Kombat is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "The Sims",
      "difficulty": "easy",
      "description": "The Sims fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "StarCraft",
      "difficulty": "easy",
      "description": "StarCraft is a clueable term relevant to Video Games."
    },
    {
      "word": "Half-Life",
      "difficulty": "easy",
      "description": "Half-Life is a clueable term relevant to Video Games."
    },
    {
      "word": "Gears of War",
      "difficulty": "easy",
      "description": "Gears of War is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Portal",
      "difficulty": "easy",
      "description": "Portal is a clueable term relevant to Video Games."
    },
    {
      "word": "Civilization",
      "difficulty": "easy",
      "description": "Civilization is commonly used in Video Games themed clues."
    },
    {
      "word": "The Witcher",
      "difficulty": "easy",
      "description": "The Witcher is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Super Smash Bros.",
      "difficulty": "hard",
      "description": "Super Smash Bros. fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Star Wars Battlefront",
      "difficulty": "hard",
      "description": "Star Wars Battlefront is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "PUBG",
      "difficulty": "easy",
      "description": "PUBG fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "PlayerUnknown's Battlegrounds",
      "difficulty": "hard",
      "description": "PlayerUnknown's Battlegrounds is commonly used in Video Games themed clues."
    },
    {
      "word": "God of War",
      "difficulty": "easy",
      "description": "God of War is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Rocket League",
      "difficulty": "easy",
      "description": "Rocket League is commonly used in Video Games themed clues."
    },
    {
      "word": "World of Tanks",
      "difficulty": "hard",
      "description": "World of Tanks is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Fortnite Save the World",
      "difficulty": "hard",
      "description": "Fortnite Save the World fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Destiny",
      "difficulty": "easy",
      "description": "Destiny fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Warframe",
      "difficulty": "easy",
      "description": "Warframe is a clueable term relevant to Video Games."
    },
    {
      "word": "Fortnite Battle Royale",
      "difficulty": "hard",
      "description": "Fortnite Battle Royale fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Cyberpunk 2077",
      "difficulty": "easy",
      "description": "Cyberpunk 2077 is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Candy Crush Saga",
      "difficulty": "easy",
      "description": "Candy Crush Saga fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Far Cry",
      "difficulty": "easy",
      "description": "Far Cry is commonly used in Video Games themed clues."
    },
    {
      "word": "Animal Crossing",
      "difficulty": "easy",
      "description": "Animal Crossing is commonly used in Video Games themed clues."
    },
    {
      "word": "Borderlands",
      "difficulty": "easy",
      "description": "Borderlands is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Zelda",
      "difficulty": "easy",
      "description": "Zelda is a clueable term relevant to Video Games."
    },
    {
      "word": "Sonic",
      "difficulty": "easy",
      "description": "Sonic fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Pokémon",
      "difficulty": "easy",
      "description": "Pokémon is a clueable term relevant to Video Games."
    },
    {
      "word": "Red Dead Redemption",
      "difficulty": "hard",
      "description": "Red Dead Redemption fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Dark Souls",
      "difficulty": "hard",
      "description": "Dark Souls is a clueable term relevant to Video Games."
    },
    {
      "word": "Bioshock",
      "difficulty": "hard",
      "description": "Bioshock is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Mass Effect",
      "difficulty": "hard",
      "description": "Mass Effect is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Deus Ex",
      "difficulty": "hard",
      "description": "Deus Ex is a clueable term relevant to Video Games."
    },
    {
      "word": "Stardew Valley",
      "difficulty": "hard",
      "description": "Stardew Valley is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "The Last of Us",
      "difficulty": "hard",
      "description": "The Last of Us is a clueable term relevant to Video Games."
    },
    {
      "word": "Animal Crossing: New Horizons",
      "difficulty": "hard",
      "description": "Animal Crossing: New Horizons is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Call of Duty: Warzone",
      "difficulty": "hard",
      "description": "Call of Duty: Warzone fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Grand Theft Auto V",
      "difficulty": "easy",
      "description": "Grand Theft Auto V fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Super Mario Odyssey",
      "difficulty": "hard",
      "description": "Super Mario Odyssey is a clueable term relevant to Video Games."
    },
    {
      "word": "The Legend of Zelda: Breath of the Wild",
      "difficulty": "hard",
      "description": "The Legend of Zelda: Breath of the Wild is commonly used in Video Games themed clues."
    },
    {
      "word": "The Witcher 3: Wild Hunt",
      "difficulty": "hard",
      "description": "The Witcher 3: Wild Hunt is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "The Sims 4",
      "difficulty": "easy",
      "description": "The Sims 4 is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Minecraft Dungeons",
      "difficulty": "easy",
      "description": "Minecraft Dungeons is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Among Us",
      "difficulty": "easy",
      "description": "Among Us is a clueable term relevant to Video Games."
    },
    {
      "word": "Fall Guys",
      "difficulty": "easy",
      "description": "Fall Guys is commonly used in Video Games themed clues."
    },
    {
      "word": "Genshin Impact",
      "difficulty": "easy",
      "description": "Genshin Impact is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Hades",
      "difficulty": "hard",
      "description": "Hades is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Sekiro: Shadows Die Twice",
      "difficulty": "hard",
      "description": "Sekiro: Shadows Die Twice fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Ghost of Tsushima",
      "difficulty": "hard",
      "description": "Ghost of Tsushima fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "CyberConnect2",
      "difficulty": "hard",
      "description": "CyberConnect2 is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Naughty Dog",
      "difficulty": "hard",
      "description": "Naughty Dog is commonly used in Video Games themed clues."
    },
    {
      "word": "Rockstar Games",
      "difficulty": "hard",
      "description": "Rockstar Games is commonly used in Video Games themed clues."
    },
    {
      "word": "Valve Corporation",
      "difficulty": "hard",
      "description": "Valve Corporation is a clueable term relevant to Video Games."
    },
    {
      "word": "Epic Games",
      "difficulty": "hard",
      "description": "Epic Games fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Riot Games",
      "difficulty": "hard",
      "description": "Riot Games is a clueable term relevant to Video Games."
    },
    {
      "word": "Blizzard Entertainment",
      "difficulty": "hard",
      "description": "Blizzard Entertainment fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Electronic Arts",
      "difficulty": "hard",
      "description": "Electronic Arts fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Activision",
      "difficulty": "hard",
      "description": "Activision is commonly used in Video Games themed clues."
    },
    {
      "word": "Bandai Namco Entertainment",
      "difficulty": "hard",
      "description": "Bandai Namco Entertainment fits the Video Games category for quick, descriptive gameplay."
    },
    {
      "word": "Capcom",
      "difficulty": "hard",
      "description": "Capcom is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Konami",
      "difficulty": "hard",
      "description": "Konami is a useful Video Games reference for fast team guessing rounds."
    },
    {
      "word": "Sega",
      "difficulty": "hard",
      "description": "Sega is a clueable term relevant to Video Games."
    },
    {
      "word": "Square Enix",
      "difficulty": "hard",
      "description": "Square Enix is a clueable term relevant to Video Games."
    },
    {
      "word": "Ubisoft",
      "difficulty": "hard",
      "description": "Ubisoft is commonly used in Video Games themed clues."
    },
    {
      "word": "Take-Two Interactive",
      "difficulty": "hard",
      "description": "Take-Two Interactive is a clueable term relevant to Video Games."
    },
    {
      "word": "Warner Bros. Interactive Entertainment",
      "difficulty": "hard",
      "description": "Warner Bros. Interactive Entertainment is commonly used in Video Games themed clues."
    },
    {
      "word": "ZeniMax Media",
      "difficulty": "hard",
      "description": "ZeniMax Media fits the Video Games category for quick, descriptive gameplay."
    }
  ],
  "Cars": [
    {
      "word": "Sedan",
      "difficulty": "easy",
      "description": "Sedan is a clueable term relevant to Cars."
    },
    {
      "word": "Convertible",
      "difficulty": "easy",
      "description": "Convertible is commonly used in Cars themed clues."
    },
    {
      "word": "SUV",
      "difficulty": "easy",
      "description": "SUV is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Coupe",
      "difficulty": "easy",
      "description": "Coupe is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Hatchback",
      "difficulty": "easy",
      "description": "Hatchback is a clueable term relevant to Cars."
    },
    {
      "word": "Engine",
      "difficulty": "easy",
      "description": "Engine fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Transmission",
      "difficulty": "easy",
      "description": "Transmission is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Headlights",
      "difficulty": "easy",
      "description": "Headlights is commonly used in Cars themed clues."
    },
    {
      "word": "Wheels",
      "difficulty": "easy",
      "description": "Wheels is a clueable term relevant to Cars."
    },
    {
      "word": "Steering wheel",
      "difficulty": "easy",
      "description": "Steering wheel fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Differential",
      "difficulty": "hard",
      "description": "Differential is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Carburetor",
      "difficulty": "hard",
      "description": "Carburetor fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Catalytic converter",
      "difficulty": "hard",
      "description": "Catalytic converter is a clueable term relevant to Cars."
    },
    {
      "word": "Torque",
      "difficulty": "hard",
      "description": "Torque fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "RPM",
      "difficulty": "hard",
      "description": "RPM fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Drivetrain",
      "difficulty": "hard",
      "description": "Drivetrain is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Suspension",
      "difficulty": "easy",
      "description": "Suspension fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Chassis",
      "difficulty": "easy",
      "description": "Chassis fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Fuel injection",
      "difficulty": "hard",
      "description": "Fuel injection is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Turbocharger",
      "difficulty": "hard",
      "description": "Turbocharger is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Aston Martin DB11",
      "difficulty": "hard",
      "description": "Aston Martin DB11 is a clueable term relevant to Cars."
    },
    {
      "word": "Audi Q7",
      "difficulty": "hard",
      "description": "Audi Q7 is a clueable term relevant to Cars."
    },
    {
      "word": "Audi R8",
      "difficulty": "easy",
      "description": "Audi R8 is a clueable term relevant to Cars."
    },
    {
      "word": "BMW M3",
      "difficulty": "easy",
      "description": "BMW M3 fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Bugatti Chiron",
      "difficulty": "hard",
      "description": "Bugatti Chiron is a clueable term relevant to Cars."
    },
    {
      "word": "Bugatti Veyron",
      "difficulty": "easy",
      "description": "Bugatti Veyron is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Chevrolet Camaro",
      "difficulty": "hard",
      "description": "Chevrolet Camaro is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Chevrolet Corvette",
      "difficulty": "hard",
      "description": "Chevrolet Corvette is commonly used in Cars themed clues."
    },
    {
      "word": "Ferrari",
      "difficulty": "easy",
      "description": "Ferrari fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Ferrari 458 Italia",
      "difficulty": "hard",
      "description": "Ferrari 458 Italia is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Ford Focus RS",
      "difficulty": "hard",
      "description": "Ford Focus RS fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Ford Mustang",
      "difficulty": "easy",
      "description": "Ford Mustang fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Ford Mustang GT",
      "difficulty": "hard",
      "description": "Ford Mustang GT is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Honda Accord",
      "difficulty": "hard",
      "description": "Honda Accord is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Honda Civic",
      "difficulty": "easy",
      "description": "Honda Civic fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Hyundai Sonata",
      "difficulty": "hard",
      "description": "Hyundai Sonata is a clueable term relevant to Cars."
    },
    {
      "word": "Jeep Grand Cherokee",
      "difficulty": "hard",
      "description": "Jeep Grand Cherokee is commonly used in Cars themed clues."
    },
    {
      "word": "Jeep Wrangler",
      "difficulty": "hard",
      "description": "Jeep Wrangler fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Lamborghini",
      "difficulty": "easy",
      "description": "Lamborghini is a clueable term relevant to Cars."
    },
    {
      "word": "Lamborghini Aventador",
      "difficulty": "hard",
      "description": "Lamborghini Aventador is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Land Rover Discovery",
      "difficulty": "hard",
      "description": "Land Rover Discovery fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Lexus RX",
      "difficulty": "hard",
      "description": "Lexus RX is a clueable term relevant to Cars."
    },
    {
      "word": "Maserati GranTurismo",
      "difficulty": "hard",
      "description": "Maserati GranTurismo is commonly used in Cars themed clues."
    },
    {
      "word": "McLaren",
      "difficulty": "easy",
      "description": "McLaren is a clueable term relevant to Cars."
    },
    {
      "word": "Mercedes-Benz",
      "difficulty": "easy",
      "description": "Mercedes-Benz fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Mercedes-Benz S-Class",
      "difficulty": "hard",
      "description": "Mercedes-Benz S-Class fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Mercedes-Benz GLE",
      "difficulty": "hard",
      "description": "Mercedes-Benz GLE is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Nissan GT-R",
      "difficulty": "easy",
      "description": "Nissan GT-R is commonly used in Cars themed clues."
    },
    {
      "word": "Pagani Huayra",
      "difficulty": "hard",
      "description": "Pagani Huayra is commonly used in Cars themed clues."
    },
    {
      "word": "Porsche 911",
      "difficulty": "easy",
      "description": "Porsche 911 is commonly used in Cars themed clues."
    },
    {
      "word": "Range Rover Evoque",
      "difficulty": "hard",
      "description": "Range Rover Evoque is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Tesla Model S",
      "difficulty": "hard",
      "description": "Tesla Model S is commonly used in Cars themed clues."
    },
    {
      "word": "Tesla Model X",
      "difficulty": "hard",
      "description": "Tesla Model X fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Tesla",
      "difficulty": "easy",
      "description": "Tesla is a clueable term relevant to Cars."
    },
    {
      "word": "Toyota",
      "difficulty": "easy",
      "description": "Toyota fits the Cars category for quick, descriptive gameplay."
    },
    {
      "word": "Toyota Supra",
      "difficulty": "hard",
      "description": "Toyota Supra is a clueable term relevant to Cars."
    },
    {
      "word": "Volkswagen Beetle",
      "difficulty": "hard",
      "description": "Volkswagen Beetle is a useful Cars reference for fast team guessing rounds."
    },
    {
      "word": "Volvo XC60",
      "difficulty": "hard",
      "description": "Volvo XC60 is a clueable term relevant to Cars."
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
      "description": "Streetwear is a clueable term relevant to Fashion."
    },
    {
      "word": "Sneakerhead",
      "difficulty": "easy",
      "description": "Sneakerhead is commonly used in Fashion themed clues."
    },
    {
      "word": "Tailor",
      "difficulty": "easy",
      "description": "Tailor is a clueable term relevant to Fashion."
    },
    {
      "word": "Runway",
      "difficulty": "hard",
      "description": "Runway is commonly used in Fashion themed clues."
    },
    {
      "word": "Lookbook",
      "difficulty": "easy",
      "description": "Lookbook fits the Fashion category for quick, descriptive gameplay."
    },
    {
      "word": "Bomber Jacket",
      "difficulty": "hard",
      "description": "Bomber Jacket is a useful Fashion reference for fast team guessing rounds."
    },
    {
      "word": "Denim Jacket",
      "difficulty": "easy",
      "description": "Denim Jacket is commonly used in Fashion themed clues."
    },
    {
      "word": "Polo Shirt",
      "difficulty": "easy",
      "description": "Polo Shirt is a useful Fashion reference for fast team guessing rounds."
    },
    {
      "word": "Chinos",
      "difficulty": "easy",
      "description": "Chinos is a useful Fashion reference for fast team guessing rounds."
    },
    {
      "word": "Turtleneck",
      "difficulty": "hard",
      "description": "Turtleneck is a clueable term relevant to Fashion."
    },
    {
      "word": "Pleated Skirt",
      "difficulty": "easy",
      "description": "Pleated Skirt is a useful Fashion reference for fast team guessing rounds."
    },
    {
      "word": "Pencil Skirt",
      "difficulty": "easy",
      "description": "Pencil Skirt is commonly used in Fashion themed clues."
    },
    {
      "word": "Maxi Dress",
      "difficulty": "easy",
      "description": "Maxi Dress fits the Fashion category for quick, descriptive gameplay."
    },
    {
      "word": "Cocktail Dress",
      "difficulty": "hard",
      "description": "Cocktail Dress is a useful Fashion reference for fast team guessing rounds."
    },
    {
      "word": "Jumpsuit",
      "difficulty": "easy",
      "description": "Jumpsuit fits the Fashion category for quick, descriptive gameplay."
    },
    {
      "word": "Blazer",
      "difficulty": "easy",
      "description": "Blazer is commonly used in Fashion themed clues."
    },
    {
      "word": "Loafers",
      "difficulty": "easy",
      "description": "Loafers is a useful Fashion reference for fast team guessing rounds."
    },
    {
      "word": "Ankle Boots",
      "difficulty": "hard",
      "description": "Ankle Boots is a useful Fashion reference for fast team guessing rounds."
    },
    {
      "word": "Stiletto",
      "difficulty": "easy",
      "description": "Stiletto is a clueable term relevant to Fashion."
    },
    {
      "word": "Crossbody Bag",
      "difficulty": "easy",
      "description": "Crossbody Bag is commonly used in Fashion themed clues."
    },
    {
      "word": "Tote Bag",
      "difficulty": "easy",
      "description": "Tote Bag is commonly used in Fashion themed clues."
    },
    {
      "word": "Clutch Bag",
      "difficulty": "hard",
      "description": "Clutch Bag is a clueable term relevant to Fashion."
    },
    {
      "word": "Bucket Hat",
      "difficulty": "easy",
      "description": "Bucket Hat is a clueable term relevant to Fashion."
    },
    {
      "word": "Beanie",
      "difficulty": "easy",
      "description": "Beanie is commonly used in Fashion themed clues."
    },
    {
      "word": "Silk Scarf",
      "difficulty": "easy",
      "description": "Silk Scarf is a clueable term relevant to Fashion."
    },
    {
      "word": "Leather Jacket",
      "difficulty": "hard",
      "description": "Leather Jacket fits the Fashion category for quick, descriptive gameplay."
    },
    {
      "word": "Seamstress",
      "difficulty": "easy",
      "description": "Seamstress is a clueable term relevant to Fashion."
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
      "description": "Festival is commonly used in Miscellaneous themed clues."
    },
    {
      "word": "Ceremony",
      "difficulty": "easy",
      "description": "Ceremony is commonly used in Miscellaneous themed clues."
    },
    {
      "word": "Tradition",
      "difficulty": "easy",
      "description": "Tradition fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Innovation",
      "difficulty": "easy",
      "description": "Innovation is a clueable term relevant to Miscellaneous."
    },
    {
      "word": "Debate",
      "difficulty": "hard",
      "description": "Debate is commonly used in Miscellaneous themed clues."
    },
    {
      "word": "Puzzle",
      "difficulty": "easy",
      "description": "Puzzle fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Masterpiece",
      "difficulty": "easy",
      "description": "Masterpiece is a clueable term relevant to Miscellaneous."
    },
    {
      "word": "Landmark",
      "difficulty": "easy",
      "description": "Landmark is a clueable term relevant to Miscellaneous."
    },
    {
      "word": "Milestone",
      "difficulty": "hard",
      "description": "Milestone is a useful Miscellaneous reference for fast team guessing rounds."
    },
    {
      "word": "Breakthrough",
      "difficulty": "easy",
      "description": "Breakthrough fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Negotiation",
      "difficulty": "easy",
      "description": "Negotiation fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Strategy",
      "difficulty": "easy",
      "description": "Strategy is commonly used in Miscellaneous themed clues."
    },
    {
      "word": "Blueprint",
      "difficulty": "hard",
      "description": "Blueprint is a useful Miscellaneous reference for fast team guessing rounds."
    },
    {
      "word": "Prototype",
      "difficulty": "easy",
      "description": "Prototype is commonly used in Miscellaneous themed clues."
    },
    {
      "word": "Headline",
      "difficulty": "easy",
      "description": "Headline is a useful Miscellaneous reference for fast team guessing rounds."
    },
    {
      "word": "Timeline",
      "difficulty": "easy",
      "description": "Timeline is a useful Miscellaneous reference for fast team guessing rounds."
    },
    {
      "word": "Checklist",
      "difficulty": "hard",
      "description": "Checklist fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Goalpost",
      "difficulty": "easy",
      "description": "Goalpost is commonly used in Miscellaneous themed clues."
    },
    {
      "word": "Backstory",
      "difficulty": "easy",
      "description": "Backstory fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Wildcard",
      "difficulty": "easy",
      "description": "Wildcard is a useful Miscellaneous reference for fast team guessing rounds."
    },
    {
      "word": "Countdown",
      "difficulty": "hard",
      "description": "Countdown is commonly used in Miscellaneous themed clues."
    },
    {
      "word": "Crowd",
      "difficulty": "easy",
      "description": "Crowd fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Spotlight",
      "difficulty": "easy",
      "description": "Spotlight is commonly used in Miscellaneous themed clues."
    },
    {
      "word": "Compass",
      "difficulty": "easy",
      "description": "Compass fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Lifeline",
      "difficulty": "hard",
      "description": "Lifeline is a clueable term relevant to Miscellaneous."
    },
    {
      "word": "Mic Drop",
      "difficulty": "easy",
      "description": "Mic Drop is a clueable term relevant to Miscellaneous."
    },
    {
      "word": "Curveball",
      "difficulty": "easy",
      "description": "Curveball fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Highlight Reel",
      "difficulty": "easy",
      "description": "Highlight Reel fits the Miscellaneous category for quick, descriptive gameplay."
    },
    {
      "word": "Fast Track",
      "difficulty": "hard",
      "description": "Fast Track is a clueable term relevant to Miscellaneous."
    },
    {
      "word": "Home Stretch",
      "difficulty": "easy",
      "description": "Home Stretch is a useful Miscellaneous reference for fast team guessing rounds."
    }
  ],
  "Business, Brands, and Companies": [
    {
      "word": "Apple",
      "difficulty": "hard",
      "description": "Apple is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Microsoft",
      "difficulty": "easy",
      "description": "Microsoft is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Google",
      "difficulty": "easy",
      "description": "Google is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Amazon",
      "difficulty": "easy",
      "description": "Amazon is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Meta",
      "difficulty": "hard",
      "description": "Meta is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Tesla",
      "difficulty": "easy",
      "description": "Tesla is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Samsung",
      "difficulty": "easy",
      "description": "Samsung is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Sony",
      "difficulty": "easy",
      "description": "Sony is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Intel",
      "difficulty": "hard",
      "description": "Intel is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Nvidia",
      "difficulty": "easy",
      "description": "Nvidia is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "IBM",
      "difficulty": "easy",
      "description": "IBM is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Oracle",
      "difficulty": "easy",
      "description": "Oracle is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Adobe",
      "difficulty": "hard",
      "description": "Adobe is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Salesforce",
      "difficulty": "hard",
      "description": "Salesforce is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Cisco",
      "difficulty": "hard",
      "description": "Cisco is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Qualcomm",
      "difficulty": "hard",
      "description": "Qualcomm is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "SpaceX",
      "difficulty": "hard",
      "description": "SpaceX is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "OpenAI",
      "difficulty": "hard",
      "description": "OpenAI is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Netflix",
      "difficulty": "easy",
      "description": "Netflix is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Disney",
      "difficulty": "easy",
      "description": "Disney is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Nike",
      "difficulty": "hard",
      "description": "Nike is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Adidas",
      "difficulty": "easy",
      "description": "Adidas is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Puma",
      "difficulty": "easy",
      "description": "Puma is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Coca-Cola",
      "difficulty": "easy",
      "description": "Coca-Cola is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Pepsi",
      "difficulty": "hard",
      "description": "Pepsi is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Starbucks",
      "difficulty": "easy",
      "description": "Starbucks is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "McDonald's",
      "difficulty": "easy",
      "description": "McDonald's is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "KFC",
      "difficulty": "easy",
      "description": "KFC is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Burger King",
      "difficulty": "hard",
      "description": "Burger King is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Subway",
      "difficulty": "easy",
      "description": "Subway is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Domino's",
      "difficulty": "easy",
      "description": "Domino's is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Pizza Hut",
      "difficulty": "easy",
      "description": "Pizza Hut is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Uber",
      "difficulty": "hard",
      "description": "Uber is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Airbnb",
      "difficulty": "easy",
      "description": "Airbnb is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "PayPal",
      "difficulty": "easy",
      "description": "PayPal is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Visa",
      "difficulty": "easy",
      "description": "Visa is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Mastercard",
      "difficulty": "hard",
      "description": "Mastercard is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "American Express",
      "difficulty": "hard",
      "description": "American Express is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "JPMorgan Chase",
      "difficulty": "hard",
      "description": "JPMorgan Chase is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Goldman Sachs",
      "difficulty": "hard",
      "description": "Goldman Sachs is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Morgan Stanley",
      "difficulty": "hard",
      "description": "Morgan Stanley is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "HSBC",
      "difficulty": "hard",
      "description": "HSBC is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Barclays",
      "difficulty": "hard",
      "description": "Barclays is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Shell",
      "difficulty": "easy",
      "description": "Shell is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "BP",
      "difficulty": "hard",
      "description": "BP is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "ExxonMobil",
      "difficulty": "hard",
      "description": "ExxonMobil is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Chevron",
      "difficulty": "easy",
      "description": "Chevron is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "TotalEnergies",
      "difficulty": "hard",
      "description": "TotalEnergies is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Toyota",
      "difficulty": "hard",
      "description": "Toyota is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Volkswagen",
      "difficulty": "easy",
      "description": "Volkswagen is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "BMW",
      "difficulty": "easy",
      "description": "BMW is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Mercedes-Benz",
      "difficulty": "easy",
      "description": "Mercedes-Benz is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Audi",
      "difficulty": "hard",
      "description": "Audi is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Ferrari",
      "difficulty": "easy",
      "description": "Ferrari is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Porsche",
      "difficulty": "easy",
      "description": "Porsche is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Ford",
      "difficulty": "easy",
      "description": "Ford is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "General Motors",
      "difficulty": "hard",
      "description": "General Motors is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Boeing",
      "difficulty": "easy",
      "description": "Boeing is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Airbus",
      "difficulty": "easy",
      "description": "Airbus is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Lockheed Martin",
      "difficulty": "hard",
      "description": "Lockheed Martin is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Siemens",
      "difficulty": "hard",
      "description": "Siemens is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Bosch",
      "difficulty": "easy",
      "description": "Bosch is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "IKEA",
      "difficulty": "easy",
      "description": "IKEA is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Walmart",
      "difficulty": "easy",
      "description": "Walmart is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Costco",
      "difficulty": "hard",
      "description": "Costco is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Target",
      "difficulty": "easy",
      "description": "Target is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "eBay",
      "difficulty": "easy",
      "description": "eBay is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Alibaba",
      "difficulty": "easy",
      "description": "Alibaba is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Tencent",
      "difficulty": "hard",
      "description": "Tencent is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "ByteDance",
      "difficulty": "hard",
      "description": "ByteDance is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "TSMC",
      "difficulty": "hard",
      "description": "TSMC is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "ASML",
      "difficulty": "hard",
      "description": "ASML is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Zara",
      "difficulty": "hard",
      "description": "Zara is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "H&M",
      "difficulty": "easy",
      "description": "H&M is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Uniqlo",
      "difficulty": "easy",
      "description": "Uniqlo is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "LVMH",
      "difficulty": "hard",
      "description": "LVMH is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Gucci",
      "difficulty": "hard",
      "description": "Gucci is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Prada",
      "difficulty": "easy",
      "description": "Prada is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Rolex",
      "difficulty": "easy",
      "description": "Rolex is a recognizable company, brand, or market term used in business clues."
    },
    {
      "word": "Cartier",
      "difficulty": "easy",
      "description": "Cartier is a business-world clue often associated with products, services, or markets."
    },
    {
      "word": "Samsung Electronics",
      "difficulty": "hard",
      "description": "Samsung Electronics is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Shopify",
      "difficulty": "hard",
      "description": "Shopify is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Stripe",
      "difficulty": "hard",
      "description": "Stripe is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "LinkedIn",
      "difficulty": "easy",
      "description": "LinkedIn is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "YouTube",
      "difficulty": "hard",
      "description": "YouTube is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "TikTok",
      "difficulty": "easy",
      "description": "TikTok is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Spotify",
      "difficulty": "easy",
      "description": "Spotify is commonly referenced in finance, tech, retail, or entrepreneurship clues."
    },
    {
      "word": "Snapchat",
      "difficulty": "easy",
      "description": "Snapchat is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Red Bull",
      "difficulty": "hard",
      "description": "Red Bull is linked to global commerce, corporate strategy, or brand culture."
    },
    {
      "word": "Nando's",
      "difficulty": "hard",
      "description": "Nando's is a business-world clue often associated with products, services, or markets."
    }
  ],
  "Politics and Government": [
    {
      "word": "Democracy",
      "difficulty": "hard",
      "description": "Democracy appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Republic",
      "difficulty": "easy",
      "description": "Republic is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Constitution",
      "difficulty": "easy",
      "description": "Constitution is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Parliament",
      "difficulty": "easy",
      "description": "Parliament is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Congress",
      "difficulty": "hard",
      "description": "Congress is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Senate",
      "difficulty": "easy",
      "description": "Senate appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Cabinet",
      "difficulty": "easy",
      "description": "Cabinet is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Prime Minister",
      "difficulty": "easy",
      "description": "Prime Minister is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "President",
      "difficulty": "hard",
      "description": "President appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Vice President",
      "difficulty": "easy",
      "description": "Vice President is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Election",
      "difficulty": "easy",
      "description": "Election is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Ballot Box",
      "difficulty": "easy",
      "description": "Ballot Box is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Referendum",
      "difficulty": "hard",
      "description": "Referendum appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Coalition Government",
      "difficulty": "easy",
      "description": "Coalition Government is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Opposition Party",
      "difficulty": "easy",
      "description": "Opposition Party is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Campaign Trail",
      "difficulty": "easy",
      "description": "Campaign Trail is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Manifesto",
      "difficulty": "hard",
      "description": "Manifesto is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Term Limit",
      "difficulty": "easy",
      "description": "Term Limit appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Supreme Court",
      "difficulty": "easy",
      "description": "Supreme Court appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Separation of Powers",
      "difficulty": "hard",
      "description": "Separation of Powers is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Checks and Balances",
      "difficulty": "hard",
      "description": "Checks and Balances is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Federalism",
      "difficulty": "easy",
      "description": "Federalism is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Monarchy",
      "difficulty": "easy",
      "description": "Monarchy is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Dictatorship",
      "difficulty": "easy",
      "description": "Dictatorship is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Sanctions",
      "difficulty": "hard",
      "description": "Sanctions is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Embargo",
      "difficulty": "easy",
      "description": "Embargo is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Diplomacy",
      "difficulty": "easy",
      "description": "Diplomacy is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Ambassador",
      "difficulty": "easy",
      "description": "Ambassador appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "United Nations",
      "difficulty": "hard",
      "description": "United Nations is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Security Council",
      "difficulty": "easy",
      "description": "Security Council appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "NATO",
      "difficulty": "easy",
      "description": "NATO is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "African Union",
      "difficulty": "easy",
      "description": "African Union appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "BRICS",
      "difficulty": "hard",
      "description": "BRICS is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "G20",
      "difficulty": "easy",
      "description": "G20 is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Summit",
      "difficulty": "easy",
      "description": "Summit is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "State of the Nation",
      "difficulty": "hard",
      "description": "State of the Nation is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Impeachment",
      "difficulty": "hard",
      "description": "Impeachment appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Filibuster",
      "difficulty": "hard",
      "description": "Filibuster is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Gerrymandering",
      "difficulty": "hard",
      "description": "Gerrymandering is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Census",
      "difficulty": "easy",
      "description": "Census is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Public Policy",
      "difficulty": "hard",
      "description": "Public Policy appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Civil Service",
      "difficulty": "easy",
      "description": "Civil Service is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Lobbying",
      "difficulty": "easy",
      "description": "Lobbying is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Whip",
      "difficulty": "easy",
      "description": "Whip is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Municipal Council",
      "difficulty": "hard",
      "description": "Municipal Council is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Mayor",
      "difficulty": "easy",
      "description": "Mayor is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Governor",
      "difficulty": "easy",
      "description": "Governor is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Ministry of Finance",
      "difficulty": "easy",
      "description": "Ministry of Finance appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Treasury",
      "difficulty": "hard",
      "description": "Treasury appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Budget Speech",
      "difficulty": "easy",
      "description": "Budget Speech is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Tax Reform",
      "difficulty": "easy",
      "description": "Tax Reform is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Trade Agreement",
      "difficulty": "easy",
      "description": "Trade Agreement appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Bilateral Talks",
      "difficulty": "hard",
      "description": "Bilateral Talks is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Peace Treaty",
      "difficulty": "easy",
      "description": "Peace Treaty appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Ceasefire",
      "difficulty": "easy",
      "description": "Ceasefire appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Cabinet Reshuffle",
      "difficulty": "hard",
      "description": "Cabinet Reshuffle is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Foreign Minister",
      "difficulty": "hard",
      "description": "Foreign Minister is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Interior Minister",
      "difficulty": "easy",
      "description": "Interior Minister is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Defense Minister",
      "difficulty": "easy",
      "description": "Defense Minister appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Campaign Donation",
      "difficulty": "easy",
      "description": "Campaign Donation appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Polling Station",
      "difficulty": "hard",
      "description": "Polling Station is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Voter Registration",
      "difficulty": "easy",
      "description": "Voter Registration is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Electoral Commission",
      "difficulty": "hard",
      "description": "Electoral Commission appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Exit Poll",
      "difficulty": "easy",
      "description": "Exit Poll is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "By-election",
      "difficulty": "hard",
      "description": "By-election is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Coalition Talks",
      "difficulty": "hard",
      "description": "Coalition Talks appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Minority Government",
      "difficulty": "hard",
      "description": "Minority Government is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Recall Election",
      "difficulty": "hard",
      "description": "Recall Election is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Martial Law",
      "difficulty": "hard",
      "description": "Martial Law appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Human Rights Commission",
      "difficulty": "hard",
      "description": "Human Rights Commission is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Ombudsman",
      "difficulty": "hard",
      "description": "Ombudsman appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "White House",
      "difficulty": "easy",
      "description": "White House appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Downing Street",
      "difficulty": "hard",
      "description": "Downing Street is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "The Kremlin",
      "difficulty": "easy",
      "description": "The Kremlin is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Union Buildings",
      "difficulty": "easy",
      "description": "Union Buildings is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "National Assembly",
      "difficulty": "easy",
      "description": "National Assembly is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "House of Commons",
      "difficulty": "hard",
      "description": "House of Commons is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "European Parliament",
      "difficulty": "easy",
      "description": "European Parliament appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Schengen Area",
      "difficulty": "hard",
      "description": "Schengen Area is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Brexit",
      "difficulty": "easy",
      "description": "Brexit is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Public Protector",
      "difficulty": "hard",
      "description": "Public Protector appears in clues about political processes, civic structures, or diplomacy."
    },
    {
      "word": "Constitutional Court",
      "difficulty": "hard",
      "description": "Constitutional Court is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "National Cabinet",
      "difficulty": "easy",
      "description": "National Cabinet is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Speaker of Parliament",
      "difficulty": "easy",
      "description": "Speaker of Parliament is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Motion of No Confidence",
      "difficulty": "hard",
      "description": "Motion of No Confidence is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Party List",
      "difficulty": "easy",
      "description": "Party List is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Electoral Roll",
      "difficulty": "hard",
      "description": "Electoral Roll is a politics or government clue tied to elections, institutions, or power."
    },
    {
      "word": "Border Policy",
      "difficulty": "easy",
      "description": "Border Policy is commonly used when describing public policy, leadership, or state systems."
    },
    {
      "word": "Public Hearing",
      "difficulty": "hard",
      "description": "Public Hearing is a governance-related clue linked to lawmaking, administration, or authority."
    },
    {
      "word": "Diplomatic Mission",
      "difficulty": "hard",
      "description": "Diplomatic Mission is commonly used when describing public policy, leadership, or state systems."
    }
  ],
  "Household and Everyday Objects": [
    {
      "word": "Sofa",
      "difficulty": "hard",
      "description": "Sofa is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Armchair",
      "difficulty": "easy",
      "description": "Armchair is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Coffee Table",
      "difficulty": "easy",
      "description": "Coffee Table is a practical everyday item found in many homes."
    },
    {
      "word": "Dining Table",
      "difficulty": "easy",
      "description": "Dining Table is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Bedframe",
      "difficulty": "hard",
      "description": "Bedframe is a common household object people use regularly at home."
    },
    {
      "word": "Mattress",
      "difficulty": "easy",
      "description": "Mattress is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Pillow",
      "difficulty": "easy",
      "description": "Pillow is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Blanket",
      "difficulty": "easy",
      "description": "Blanket is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Duvet",
      "difficulty": "hard",
      "description": "Duvet is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Wardrobe",
      "difficulty": "hard",
      "description": "Wardrobe is a common household object people use regularly at home."
    },
    {
      "word": "Hanger",
      "difficulty": "easy",
      "description": "Hanger is a common household object people use regularly at home."
    },
    {
      "word": "Laundry Basket",
      "difficulty": "easy",
      "description": "Laundry Basket is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Iron",
      "difficulty": "hard",
      "description": "Iron is a common household object people use regularly at home."
    },
    {
      "word": "Ironing Board",
      "difficulty": "hard",
      "description": "Ironing Board is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Vacuum Cleaner",
      "difficulty": "easy",
      "description": "Vacuum Cleaner is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Mop",
      "difficulty": "easy",
      "description": "Mop is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Broom",
      "difficulty": "hard",
      "description": "Broom is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Dustpan",
      "difficulty": "easy",
      "description": "Dustpan is a common household object people use regularly at home."
    },
    {
      "word": "Bucket",
      "difficulty": "easy",
      "description": "Bucket is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Dishwasher",
      "difficulty": "easy",
      "description": "Dishwasher is a common household object people use regularly at home."
    },
    {
      "word": "Microwave",
      "difficulty": "hard",
      "description": "Microwave is a common household object people use regularly at home."
    },
    {
      "word": "Toaster",
      "difficulty": "easy",
      "description": "Toaster is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Blender",
      "difficulty": "easy",
      "description": "Blender is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Kettle",
      "difficulty": "easy",
      "description": "Kettle is a common household object people use regularly at home."
    },
    {
      "word": "Pressure Cooker",
      "difficulty": "hard",
      "description": "Pressure Cooker is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Frying Pan",
      "difficulty": "easy",
      "description": "Frying Pan is a common household object people use regularly at home."
    },
    {
      "word": "Saucepan",
      "difficulty": "easy",
      "description": "Saucepan is a practical everyday item found in many homes."
    },
    {
      "word": "Cutting Board",
      "difficulty": "easy",
      "description": "Cutting Board is a practical everyday item found in many homes."
    },
    {
      "word": "Chef's Knife",
      "difficulty": "hard",
      "description": "Chef's Knife is a practical everyday item found in many homes."
    },
    {
      "word": "Peeler",
      "difficulty": "easy",
      "description": "Peeler is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Grater",
      "difficulty": "easy",
      "description": "Grater is a common household object people use regularly at home."
    },
    {
      "word": "Colander",
      "difficulty": "hard",
      "description": "Colander is a practical everyday item found in many homes."
    },
    {
      "word": "Measuring Cup",
      "difficulty": "hard",
      "description": "Measuring Cup is a practical everyday item found in many homes."
    },
    {
      "word": "Tupperware",
      "difficulty": "hard",
      "description": "Tupperware is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Thermos",
      "difficulty": "hard",
      "description": "Thermos is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Water Bottle",
      "difficulty": "easy",
      "description": "Water Bottle is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Mug",
      "difficulty": "hard",
      "description": "Mug is a common household object people use regularly at home."
    },
    {
      "word": "Plate",
      "difficulty": "easy",
      "description": "Plate is a common household object people use regularly at home."
    },
    {
      "word": "Bowl",
      "difficulty": "easy",
      "description": "Bowl is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Fork",
      "difficulty": "easy",
      "description": "Fork is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Spoon",
      "difficulty": "hard",
      "description": "Spoon is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Knife",
      "difficulty": "easy",
      "description": "Knife is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Chopsticks",
      "difficulty": "easy",
      "description": "Chopsticks is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Napkin",
      "difficulty": "easy",
      "description": "Napkin is a common household object people use regularly at home."
    },
    {
      "word": "Trash Can",
      "difficulty": "hard",
      "description": "Trash Can is a practical everyday item found in many homes."
    },
    {
      "word": "Recycling Bin",
      "difficulty": "hard",
      "description": "Recycling Bin is a practical everyday item found in many homes."
    },
    {
      "word": "Light Bulb",
      "difficulty": "easy",
      "description": "Light Bulb is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Extension Cord",
      "difficulty": "hard",
      "description": "Extension Cord is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Power Strip",
      "difficulty": "hard",
      "description": "Power Strip is a practical everyday item found in many homes."
    },
    {
      "word": "Remote Control",
      "difficulty": "easy",
      "description": "Remote Control is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Alarm Clock",
      "difficulty": "easy",
      "description": "Alarm Clock is a practical everyday item found in many homes."
    },
    {
      "word": "Wall Clock",
      "difficulty": "easy",
      "description": "Wall Clock is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Mirror",
      "difficulty": "hard",
      "description": "Mirror is a common household object people use regularly at home."
    },
    {
      "word": "Shower Curtain",
      "difficulty": "hard",
      "description": "Shower Curtain is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Toothbrush",
      "difficulty": "easy",
      "description": "Toothbrush is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Toothpaste",
      "difficulty": "easy",
      "description": "Toothpaste is a common household object people use regularly at home."
    },
    {
      "word": "Dental Floss",
      "difficulty": "hard",
      "description": "Dental Floss is a practical everyday item found in many homes."
    },
    {
      "word": "Hair Dryer",
      "difficulty": "easy",
      "description": "Hair Dryer is a practical everyday item found in many homes."
    },
    {
      "word": "Razor",
      "difficulty": "easy",
      "description": "Razor is a common household object people use regularly at home."
    },
    {
      "word": "Shampoo",
      "difficulty": "easy",
      "description": "Shampoo is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Conditioner",
      "difficulty": "hard",
      "description": "Conditioner is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Soap Bar",
      "difficulty": "easy",
      "description": "Soap Bar is a common household object people use regularly at home."
    },
    {
      "word": "Hand Sanitizer",
      "difficulty": "easy",
      "description": "Hand Sanitizer is a practical everyday item found in many homes."
    },
    {
      "word": "First Aid Kit",
      "difficulty": "easy",
      "description": "First Aid Kit is a common household object people use regularly at home."
    },
    {
      "word": "Bandage",
      "difficulty": "hard",
      "description": "Bandage is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Tape Measure",
      "difficulty": "hard",
      "description": "Tape Measure is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Screwdriver",
      "difficulty": "easy",
      "description": "Screwdriver is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Hammer",
      "difficulty": "easy",
      "description": "Hammer is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Pliers",
      "difficulty": "hard",
      "description": "Pliers is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Wrench",
      "difficulty": "hard",
      "description": "Wrench is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Drill",
      "difficulty": "hard",
      "description": "Drill is a practical everyday item found in many homes."
    },
    {
      "word": "Nail",
      "difficulty": "easy",
      "description": "Nail is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Screw",
      "difficulty": "hard",
      "description": "Screw is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Tape",
      "difficulty": "easy",
      "description": "Tape is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Glue Gun",
      "difficulty": "hard",
      "description": "Glue Gun is a common household object people use regularly at home."
    },
    {
      "word": "Scissors",
      "difficulty": "easy",
      "description": "Scissors is a common household object people use regularly at home."
    },
    {
      "word": "Stapler",
      "difficulty": "hard",
      "description": "Stapler is a common household object people use regularly at home."
    },
    {
      "word": "Paper Clip",
      "difficulty": "easy",
      "description": "Paper Clip is a common household object people use regularly at home."
    },
    {
      "word": "Notebook",
      "difficulty": "easy",
      "description": "Notebook is a practical everyday item found in many homes."
    },
    {
      "word": "Pen",
      "difficulty": "easy",
      "description": "Pen is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Pencil",
      "difficulty": "hard",
      "description": "Pencil is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Eraser",
      "difficulty": "easy",
      "description": "Eraser is a practical everyday item found in many homes."
    },
    {
      "word": "Highlighter",
      "difficulty": "hard",
      "description": "Highlighter is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Backpack",
      "difficulty": "easy",
      "description": "Backpack is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Umbrella",
      "difficulty": "hard",
      "description": "Umbrella is an everyday home item used for cleaning, cooking, comfort, or routine tasks."
    },
    {
      "word": "Keychain",
      "difficulty": "easy",
      "description": "Keychain is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Wallet",
      "difficulty": "easy",
      "description": "Wallet is a familiar object linked to daily life and household routines."
    },
    {
      "word": "Sunglasses",
      "difficulty": "easy",
      "description": "Sunglasses is a common household object people use regularly at home."
    },
    {
      "word": "Reusable Bag",
      "difficulty": "hard",
      "description": "Reusable Bag is a practical everyday item found in many homes."
    },
    {
      "word": "Flashlight",
      "difficulty": "hard",
      "description": "Flashlight is a practical everyday item found in many homes."
    }
  ],
  "Professions and Workplaces": [
    {
      "word": "Doctor",
      "difficulty": "hard",
      "description": "Doctor is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Nurse",
      "difficulty": "easy",
      "description": "Nurse is a role people describe through what the worker does each day."
    },
    {
      "word": "Surgeon",
      "difficulty": "easy",
      "description": "Surgeon is a role people describe through what the worker does each day."
    },
    {
      "word": "Pharmacist",
      "difficulty": "easy",
      "description": "Pharmacist is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Dentist",
      "difficulty": "hard",
      "description": "Dentist is a role people describe through what the worker does each day."
    },
    {
      "word": "Paramedic",
      "difficulty": "easy",
      "description": "Paramedic is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Physiotherapist",
      "difficulty": "hard",
      "description": "Physiotherapist is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Veterinarian",
      "difficulty": "easy",
      "description": "Veterinarian is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Teacher",
      "difficulty": "hard",
      "description": "Teacher is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Principal",
      "difficulty": "easy",
      "description": "Principal is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Professor",
      "difficulty": "easy",
      "description": "Professor is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Lecturer",
      "difficulty": "easy",
      "description": "Lecturer is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Accountant",
      "difficulty": "hard",
      "description": "Accountant is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Auditor",
      "difficulty": "easy",
      "description": "Auditor is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Financial Analyst",
      "difficulty": "hard",
      "description": "Financial Analyst is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Banker",
      "difficulty": "easy",
      "description": "Banker is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Investment Broker",
      "difficulty": "hard",
      "description": "Investment Broker is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Lawyer",
      "difficulty": "easy",
      "description": "Lawyer is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Prosecutor",
      "difficulty": "easy",
      "description": "Prosecutor is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Judge",
      "difficulty": "easy",
      "description": "Judge is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Paralegal",
      "difficulty": "hard",
      "description": "Paralegal is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Police Officer",
      "difficulty": "easy",
      "description": "Police Officer is a role people describe through what the worker does each day."
    },
    {
      "word": "Detective",
      "difficulty": "easy",
      "description": "Detective is a role people describe through what the worker does each day."
    },
    {
      "word": "Firefighter",
      "difficulty": "easy",
      "description": "Firefighter is a role people describe through what the worker does each day."
    },
    {
      "word": "Soldier",
      "difficulty": "hard",
      "description": "Soldier is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Pilot",
      "difficulty": "easy",
      "description": "Pilot is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Flight Attendant",
      "difficulty": "easy",
      "description": "Flight Attendant is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Air Traffic Controller",
      "difficulty": "hard",
      "description": "Air Traffic Controller is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Mechanic",
      "difficulty": "hard",
      "description": "Mechanic is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Electrician",
      "difficulty": "easy",
      "description": "Electrician is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Plumber",
      "difficulty": "easy",
      "description": "Plumber is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Carpenter",
      "difficulty": "easy",
      "description": "Carpenter is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Welder",
      "difficulty": "hard",
      "description": "Welder is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Civil Engineer",
      "difficulty": "hard",
      "description": "Civil Engineer is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Architect",
      "difficulty": "easy",
      "description": "Architect is a role people describe through what the worker does each day."
    },
    {
      "word": "Surveyor",
      "difficulty": "hard",
      "description": "Surveyor is a role people describe through what the worker does each day."
    },
    {
      "word": "Software Engineer",
      "difficulty": "hard",
      "description": "Software Engineer is a role people describe through what the worker does each day."
    },
    {
      "word": "Data Scientist",
      "difficulty": "easy",
      "description": "Data Scientist is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Cybersecurity Analyst",
      "difficulty": "hard",
      "description": "Cybersecurity Analyst is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "UX Designer",
      "difficulty": "hard",
      "description": "UX Designer is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Graphic Designer",
      "difficulty": "hard",
      "description": "Graphic Designer is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Photographer",
      "difficulty": "easy",
      "description": "Photographer is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Journalist",
      "difficulty": "easy",
      "description": "Journalist is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Editor",
      "difficulty": "easy",
      "description": "Editor is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "News Anchor",
      "difficulty": "hard",
      "description": "News Anchor is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Radio Host",
      "difficulty": "easy",
      "description": "Radio Host is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Podcaster",
      "difficulty": "easy",
      "description": "Podcaster is a role people describe through what the worker does each day."
    },
    {
      "word": "Chef",
      "difficulty": "easy",
      "description": "Chef is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Baker",
      "difficulty": "hard",
      "description": "Baker is a role people describe through what the worker does each day."
    },
    {
      "word": "Waiter",
      "difficulty": "easy",
      "description": "Waiter is a role people describe through what the worker does each day."
    },
    {
      "word": "Barista",
      "difficulty": "easy",
      "description": "Barista is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Farmer",
      "difficulty": "easy",
      "description": "Farmer is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Fisherman",
      "difficulty": "hard",
      "description": "Fisherman is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Miner",
      "difficulty": "easy",
      "description": "Miner is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Geologist",
      "difficulty": "hard",
      "description": "Geologist is a role people describe through what the worker does each day."
    },
    {
      "word": "Factory Worker",
      "difficulty": "easy",
      "description": "Factory Worker is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Machine Operator",
      "difficulty": "hard",
      "description": "Machine Operator is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Forklift Driver",
      "difficulty": "easy",
      "description": "Forklift Driver is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Truck Driver",
      "difficulty": "easy",
      "description": "Truck Driver is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Taxi Driver",
      "difficulty": "easy",
      "description": "Taxi Driver is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Bus Driver",
      "difficulty": "hard",
      "description": "Bus Driver is a role people describe through what the worker does each day."
    },
    {
      "word": "Train Conductor",
      "difficulty": "easy",
      "description": "Train Conductor is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Logistician",
      "difficulty": "hard",
      "description": "Logistician is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Warehouse Manager",
      "difficulty": "hard",
      "description": "Warehouse Manager is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Retail Cashier",
      "difficulty": "hard",
      "description": "Retail Cashier is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Store Manager",
      "difficulty": "easy",
      "description": "Store Manager is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Sales Representative",
      "difficulty": "easy",
      "description": "Sales Representative is a role people describe through what the worker does each day."
    },
    {
      "word": "Real Estate Agent",
      "difficulty": "easy",
      "description": "Real Estate Agent is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Insurance Broker",
      "difficulty": "hard",
      "description": "Insurance Broker is a role people describe through what the worker does each day."
    },
    {
      "word": "Social Worker",
      "difficulty": "easy",
      "description": "Social Worker is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Psychologist",
      "difficulty": "easy",
      "description": "Psychologist is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Counsellor",
      "difficulty": "hard",
      "description": "Counsellor is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Therapist",
      "difficulty": "hard",
      "description": "Therapist is a role people describe through what the worker does each day."
    },
    {
      "word": "Event Planner",
      "difficulty": "easy",
      "description": "Event Planner is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Wedding Planner",
      "difficulty": "easy",
      "description": "Wedding Planner is a role people describe through what the worker does each day."
    },
    {
      "word": "Interior Designer",
      "difficulty": "easy",
      "description": "Interior Designer is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Fashion Designer",
      "difficulty": "hard",
      "description": "Fashion Designer is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Actor",
      "difficulty": "easy",
      "description": "Actor is a role people describe through what the worker does each day."
    },
    {
      "word": "Music Producer",
      "difficulty": "easy",
      "description": "Music Producer is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "DJ",
      "difficulty": "easy",
      "description": "DJ is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Choreographer",
      "difficulty": "hard",
      "description": "Choreographer is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Personal Trainer",
      "difficulty": "easy",
      "description": "Personal Trainer is used in clues about careers, occupations, and workplace responsibilities."
    },
    {
      "word": "Coach",
      "difficulty": "easy",
      "description": "Coach is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Referee",
      "difficulty": "hard",
      "description": "Referee is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Scientist",
      "difficulty": "hard",
      "description": "Scientist is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Lab Technician",
      "difficulty": "hard",
      "description": "Lab Technician is a job-related clue tied to specific skills and work environments."
    },
    {
      "word": "Researcher",
      "difficulty": "hard",
      "description": "Researcher is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Museum Curator",
      "difficulty": "hard",
      "description": "Museum Curator is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Librarian",
      "difficulty": "hard",
      "description": "Librarian is a profession or workplace role often clued through duties, tools, or uniforms."
    },
    {
      "word": "Park Ranger",
      "difficulty": "easy",
      "description": "Park Ranger is a role people describe through what the worker does each day."
    }
  ],
  "Travel, Transport, and Aviation": [
    {
      "word": "Passport",
      "difficulty": "hard",
      "description": "Passport is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Visa",
      "difficulty": "easy",
      "description": "Visa is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Boarding Pass",
      "difficulty": "easy",
      "description": "Boarding Pass is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Check-in",
      "difficulty": "hard",
      "description": "Check-in is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Carry-on",
      "difficulty": "hard",
      "description": "Carry-on is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Suitcase",
      "difficulty": "easy",
      "description": "Suitcase is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Itinerary",
      "difficulty": "easy",
      "description": "Itinerary is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Layover",
      "difficulty": "easy",
      "description": "Layover is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Terminal",
      "difficulty": "hard",
      "description": "Terminal appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Gate",
      "difficulty": "easy",
      "description": "Gate is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Runway",
      "difficulty": "easy",
      "description": "Runway appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Air Traffic Control",
      "difficulty": "easy",
      "description": "Air Traffic Control is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Cockpit",
      "difficulty": "hard",
      "description": "Cockpit is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Turbulence",
      "difficulty": "easy",
      "description": "Turbulence is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Jet Lag",
      "difficulty": "easy",
      "description": "Jet Lag is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Black Box",
      "difficulty": "easy",
      "description": "Black Box is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Emergency Exit",
      "difficulty": "hard",
      "description": "Emergency Exit appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Seatbelt Sign",
      "difficulty": "easy",
      "description": "Seatbelt Sign is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Economy Class",
      "difficulty": "easy",
      "description": "Economy Class is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Business Class",
      "difficulty": "easy",
      "description": "Business Class is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "First Class",
      "difficulty": "hard",
      "description": "First Class is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Frequent Flyer",
      "difficulty": "hard",
      "description": "Frequent Flyer is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Customs",
      "difficulty": "easy",
      "description": "Customs is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Immigration",
      "difficulty": "easy",
      "description": "Immigration appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Duty Free",
      "difficulty": "hard",
      "description": "Duty Free is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Car Rental",
      "difficulty": "easy",
      "description": "Car Rental is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Road Trip",
      "difficulty": "easy",
      "description": "Road Trip is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Toll Booth",
      "difficulty": "easy",
      "description": "Toll Booth appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Roundabout",
      "difficulty": "hard",
      "description": "Roundabout is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Traffic Jam",
      "difficulty": "easy",
      "description": "Traffic Jam appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Carpool",
      "difficulty": "easy",
      "description": "Carpool is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "GPS",
      "difficulty": "easy",
      "description": "GPS appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Metro",
      "difficulty": "hard",
      "description": "Metro is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Tram",
      "difficulty": "easy",
      "description": "Tram is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "High-speed Rail",
      "difficulty": "hard",
      "description": "High-speed Rail is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Bullet Train",
      "difficulty": "hard",
      "description": "Bullet Train appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Platform",
      "difficulty": "easy",
      "description": "Platform is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Ticket Inspector",
      "difficulty": "easy",
      "description": "Ticket Inspector is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Ferry",
      "difficulty": "easy",
      "description": "Ferry is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Cruise Ship",
      "difficulty": "hard",
      "description": "Cruise Ship is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Lifeboat",
      "difficulty": "easy",
      "description": "Lifeboat is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Port",
      "difficulty": "easy",
      "description": "Port is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Harbor",
      "difficulty": "easy",
      "description": "Harbor appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Canal",
      "difficulty": "hard",
      "description": "Canal is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Bridge",
      "difficulty": "easy",
      "description": "Bridge is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Tunnel",
      "difficulty": "easy",
      "description": "Tunnel appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Taxi Rank",
      "difficulty": "easy",
      "description": "Taxi Rank is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Ride-share",
      "difficulty": "hard",
      "description": "Ride-share is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "E-hailing",
      "difficulty": "hard",
      "description": "E-hailing is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Bicycle Lane",
      "difficulty": "easy",
      "description": "Bicycle Lane is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Helmet",
      "difficulty": "easy",
      "description": "Helmet is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Scooter",
      "difficulty": "hard",
      "description": "Scooter is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Motorbike",
      "difficulty": "easy",
      "description": "Motorbike is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Caravan",
      "difficulty": "easy",
      "description": "Caravan is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "RV",
      "difficulty": "easy",
      "description": "RV is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Camping Site",
      "difficulty": "hard",
      "description": "Camping Site is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Hostel",
      "difficulty": "easy",
      "description": "Hostel is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Guesthouse",
      "difficulty": "easy",
      "description": "Guesthouse is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Bed and Breakfast",
      "difficulty": "hard",
      "description": "Bed and Breakfast appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Hotel Concierge",
      "difficulty": "hard",
      "description": "Hotel Concierge is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Room Service",
      "difficulty": "easy",
      "description": "Room Service is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Check-out",
      "difficulty": "easy",
      "description": "Check-out is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Travel Insurance",
      "difficulty": "easy",
      "description": "Travel Insurance appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Currency Exchange",
      "difficulty": "hard",
      "description": "Currency Exchange appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Time Zone",
      "difficulty": "easy",
      "description": "Time Zone appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Red-eye Flight",
      "difficulty": "hard",
      "description": "Red-eye Flight is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Stopover",
      "difficulty": "easy",
      "description": "Stopover is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Charter Flight",
      "difficulty": "hard",
      "description": "Charter Flight is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Seaplane",
      "difficulty": "hard",
      "description": "Seaplane appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Helicopter",
      "difficulty": "easy",
      "description": "Helicopter is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Hot Air Balloon",
      "difficulty": "easy",
      "description": "Hot Air Balloon is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Parachute",
      "difficulty": "hard",
      "description": "Parachute is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Border Crossing",
      "difficulty": "easy",
      "description": "Border Crossing is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Embarkation",
      "difficulty": "hard",
      "description": "Embarkation is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Disembarkation",
      "difficulty": "hard",
      "description": "Disembarkation appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Transit Lounge",
      "difficulty": "hard",
      "description": "Transit Lounge is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Window Seat",
      "difficulty": "easy",
      "description": "Window Seat appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Aisle Seat",
      "difficulty": "hard",
      "description": "Aisle Seat is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Overhead Bin",
      "difficulty": "hard",
      "description": "Overhead Bin appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Baggage Claim",
      "difficulty": "hard",
      "description": "Baggage Claim is a travel or transport clue linked to flights, roads, transit, or logistics."
    },
    {
      "word": "Lost Luggage",
      "difficulty": "hard",
      "description": "Lost Luggage appears in clues about airports, journeys, tickets, or movement between places."
    },
    {
      "word": "Travel Adapter",
      "difficulty": "hard",
      "description": "Travel Adapter is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Power Bank",
      "difficulty": "easy",
      "description": "Power Bank is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "City Pass",
      "difficulty": "hard",
      "description": "City Pass is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Tourist Trap",
      "difficulty": "hard",
      "description": "Tourist Trap is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Souvenir Shop",
      "difficulty": "easy",
      "description": "Souvenir Shop is a transport-related term used in travel and mobility contexts."
    },
    {
      "word": "Travel Blog",
      "difficulty": "easy",
      "description": "Travel Blog is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Backpacker Trail",
      "difficulty": "hard",
      "description": "Backpacker Trail is a clueable term connected to tourism, commuting, or aviation."
    },
    {
      "word": "Safari Vehicle",
      "difficulty": "easy",
      "description": "Safari Vehicle is a clueable term connected to tourism, commuting, or aviation."
    }
  ],
  "Internet Culture and Social Media": [
    {
      "word": "Meme",
      "difficulty": "hard",
      "description": "Meme is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Viral Video",
      "difficulty": "easy",
      "description": "Viral Video appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Hashtag",
      "difficulty": "easy",
      "description": "Hashtag is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Trending Topic",
      "difficulty": "easy",
      "description": "Trending Topic is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Influencer",
      "difficulty": "hard",
      "description": "Influencer is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Content Creator",
      "difficulty": "easy",
      "description": "Content Creator appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Livestream",
      "difficulty": "easy",
      "description": "Livestream is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Reaction Video",
      "difficulty": "easy",
      "description": "Reaction Video is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Podcast Clip",
      "difficulty": "hard",
      "description": "Podcast Clip is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Short-form Video",
      "difficulty": "hard",
      "description": "Short-form Video is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Reel",
      "difficulty": "easy",
      "description": "Reel appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Story",
      "difficulty": "easy",
      "description": "Story is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Thread",
      "difficulty": "hard",
      "description": "Thread is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "DM",
      "difficulty": "easy",
      "description": "DM appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Comment Section",
      "difficulty": "easy",
      "description": "Comment Section is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Like Button",
      "difficulty": "easy",
      "description": "Like Button is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Subscribe Button",
      "difficulty": "hard",
      "description": "Subscribe Button is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Notification Bell",
      "difficulty": "easy",
      "description": "Notification Bell is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Algorithm",
      "difficulty": "hard",
      "description": "Algorithm is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "For You Page",
      "difficulty": "hard",
      "description": "For You Page appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Ratioed",
      "difficulty": "hard",
      "description": "Ratioed is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Screenshot",
      "difficulty": "easy",
      "description": "Screenshot appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Screen Recording",
      "difficulty": "easy",
      "description": "Screen Recording appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Clickbait",
      "difficulty": "easy",
      "description": "Clickbait appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Thumbnail",
      "difficulty": "hard",
      "description": "Thumbnail appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Unboxing",
      "difficulty": "easy",
      "description": "Unboxing is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Challenge",
      "difficulty": "easy",
      "description": "Challenge is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Dance Trend",
      "difficulty": "easy",
      "description": "Dance Trend is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "POV",
      "difficulty": "hard",
      "description": "POV is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Life Hack",
      "difficulty": "easy",
      "description": "Life Hack is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Tutorial",
      "difficulty": "easy",
      "description": "Tutorial is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Vlog",
      "difficulty": "easy",
      "description": "Vlog appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "GRWM",
      "difficulty": "hard",
      "description": "GRWM is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Duet",
      "difficulty": "easy",
      "description": "Duet is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Stitch",
      "difficulty": "easy",
      "description": "Stitch is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Filter",
      "difficulty": "easy",
      "description": "Filter appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Face Swap",
      "difficulty": "hard",
      "description": "Face Swap appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "AR Lens",
      "difficulty": "easy",
      "description": "AR Lens is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "GIF",
      "difficulty": "easy",
      "description": "GIF appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Emoji",
      "difficulty": "easy",
      "description": "Emoji appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Sticker Pack",
      "difficulty": "hard",
      "description": "Sticker Pack is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Discord Server",
      "difficulty": "easy",
      "description": "Discord Server is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Subreddit",
      "difficulty": "hard",
      "description": "Subreddit is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "AMA",
      "difficulty": "hard",
      "description": "AMA is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Moderator",
      "difficulty": "hard",
      "description": "Moderator is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Shadowban",
      "difficulty": "hard",
      "description": "Shadowban is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Troll",
      "difficulty": "easy",
      "description": "Troll is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Bot Account",
      "difficulty": "easy",
      "description": "Bot Account is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Fact-check",
      "difficulty": "hard",
      "description": "Fact-check is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Deepfake",
      "difficulty": "hard",
      "description": "Deepfake is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Catfish",
      "difficulty": "hard",
      "description": "Catfish is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Hot Take",
      "difficulty": "easy",
      "description": "Hot Take is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Clapback",
      "difficulty": "hard",
      "description": "Clapback is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Cancel Culture",
      "difficulty": "easy",
      "description": "Cancel Culture is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Stan",
      "difficulty": "easy",
      "description": "Stan appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Fandom",
      "difficulty": "hard",
      "description": "Fandom is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Fan Edit",
      "difficulty": "hard",
      "description": "Fan Edit appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Shipping",
      "difficulty": "easy",
      "description": "Shipping appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Spoiler Alert",
      "difficulty": "easy",
      "description": "Spoiler Alert is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Binge-watch",
      "difficulty": "easy",
      "description": "Binge-watch is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Watch Party",
      "difficulty": "hard",
      "description": "Watch Party appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Stream Sniping",
      "difficulty": "hard",
      "description": "Stream Sniping is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Speedrun Clip",
      "difficulty": "easy",
      "description": "Speedrun Clip is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Esports Highlight",
      "difficulty": "easy",
      "description": "Esports Highlight is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Patch Notes",
      "difficulty": "hard",
      "description": "Patch Notes appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "NFT Avatar",
      "difficulty": "hard",
      "description": "NFT Avatar appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Blue Tick",
      "difficulty": "easy",
      "description": "Blue Tick is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Verification Badge",
      "difficulty": "hard",
      "description": "Verification Badge appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Creator Fund",
      "difficulty": "hard",
      "description": "Creator Fund is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Monetization",
      "difficulty": "hard",
      "description": "Monetization appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Paywall",
      "difficulty": "hard",
      "description": "Paywall is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Newsletter",
      "difficulty": "easy",
      "description": "Newsletter is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Crowdfunding",
      "difficulty": "hard",
      "description": "Crowdfunding is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Patreon",
      "difficulty": "easy",
      "description": "Patreon appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Ko-fi",
      "difficulty": "hard",
      "description": "Ko-fi is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Link in Bio",
      "difficulty": "easy",
      "description": "Link in Bio appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Swipe Up",
      "difficulty": "hard",
      "description": "Swipe Up is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "QR Code",
      "difficulty": "easy",
      "description": "QR Code is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Geotag",
      "difficulty": "easy",
      "description": "Geotag is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Selfie",
      "difficulty": "easy",
      "description": "Selfie is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Ring Light",
      "difficulty": "hard",
      "description": "Ring Light is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Green Screen",
      "difficulty": "easy",
      "description": "Green Screen is a modern online term often used in social media and creator spaces."
    },
    {
      "word": "Webcam",
      "difficulty": "easy",
      "description": "Webcam appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Mic Check",
      "difficulty": "easy",
      "description": "Mic Check is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Lag Spike",
      "difficulty": "hard",
      "description": "Lag Spike is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Ping",
      "difficulty": "easy",
      "description": "Ping appears in clues about viral content, digital communities, or platform behavior."
    },
    {
      "word": "Cloud Backup",
      "difficulty": "easy",
      "description": "Cloud Backup is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Password Manager",
      "difficulty": "easy",
      "description": "Password Manager is an internet-culture clue tied to online trends, creators, or social platforms."
    },
    {
      "word": "Community Guidelines",
      "difficulty": "hard",
      "description": "Community Guidelines is a digital-culture clue linked to memes, streaming, or audience interaction."
    },
    {
      "word": "Mute Button",
      "difficulty": "easy",
      "description": "Mute Button appears in clues about viral content, digital communities, or platform behavior."
    }
  ],
  "Crime, Law, and Justice": [
    {
      "word": "Fingerprint",
      "difficulty": "hard",
      "description": "Fingerprint is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "DNA Evidence",
      "difficulty": "easy",
      "description": "DNA Evidence is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Alibi",
      "difficulty": "easy",
      "description": "Alibi appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Motive",
      "difficulty": "easy",
      "description": "Motive is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Suspect",
      "difficulty": "hard",
      "description": "Suspect appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Witness",
      "difficulty": "easy",
      "description": "Witness appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Testimony",
      "difficulty": "easy",
      "description": "Testimony is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Cross-examination",
      "difficulty": "easy",
      "description": "Cross-examination appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Jury",
      "difficulty": "hard",
      "description": "Jury appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Verdict",
      "difficulty": "easy",
      "description": "Verdict is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Guilty",
      "difficulty": "easy",
      "description": "Guilty is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Not Guilty",
      "difficulty": "easy",
      "description": "Not Guilty appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Mistrial",
      "difficulty": "hard",
      "description": "Mistrial is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Plea Bargain",
      "difficulty": "hard",
      "description": "Plea Bargain is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Bail",
      "difficulty": "easy",
      "description": "Bail appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Parole",
      "difficulty": "easy",
      "description": "Parole appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Probation",
      "difficulty": "hard",
      "description": "Probation is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Sentencing",
      "difficulty": "easy",
      "description": "Sentencing is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Subpoena",
      "difficulty": "easy",
      "description": "Subpoena is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Warrant",
      "difficulty": "easy",
      "description": "Warrant appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Arrest",
      "difficulty": "hard",
      "description": "Arrest is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Handcuffs",
      "difficulty": "easy",
      "description": "Handcuffs is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Mugshot",
      "difficulty": "easy",
      "description": "Mugshot appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Interrogation",
      "difficulty": "easy",
      "description": "Interrogation is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Surveillance",
      "difficulty": "hard",
      "description": "Surveillance is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Wiretap",
      "difficulty": "easy",
      "description": "Wiretap is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Undercover",
      "difficulty": "easy",
      "description": "Undercover is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Sting Operation",
      "difficulty": "easy",
      "description": "Sting Operation appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Crime Scene",
      "difficulty": "hard",
      "description": "Crime Scene appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Forensics",
      "difficulty": "easy",
      "description": "Forensics appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Autopsy",
      "difficulty": "easy",
      "description": "Autopsy is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Homicide",
      "difficulty": "easy",
      "description": "Homicide is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Manslaughter",
      "difficulty": "hard",
      "description": "Manslaughter is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Burglary",
      "difficulty": "easy",
      "description": "Burglary is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Robbery",
      "difficulty": "easy",
      "description": "Robbery appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Pickpocket",
      "difficulty": "easy",
      "description": "Pickpocket is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Fraud",
      "difficulty": "hard",
      "description": "Fraud is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Embezzlement",
      "difficulty": "easy",
      "description": "Embezzlement is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Money Laundering",
      "difficulty": "hard",
      "description": "Money Laundering is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Tax Evasion",
      "difficulty": "easy",
      "description": "Tax Evasion appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Insider Trading",
      "difficulty": "hard",
      "description": "Insider Trading appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Cybercrime",
      "difficulty": "easy",
      "description": "Cybercrime is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Identity Theft",
      "difficulty": "easy",
      "description": "Identity Theft is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Ransomware",
      "difficulty": "easy",
      "description": "Ransomware is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Kidnapping",
      "difficulty": "hard",
      "description": "Kidnapping is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Blackmail",
      "difficulty": "easy",
      "description": "Blackmail appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Extortion",
      "difficulty": "easy",
      "description": "Extortion is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Smuggling",
      "difficulty": "easy",
      "description": "Smuggling appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Poaching",
      "difficulty": "hard",
      "description": "Poaching is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Arson",
      "difficulty": "easy",
      "description": "Arson appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Vandalism",
      "difficulty": "easy",
      "description": "Vandalism appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Trespassing",
      "difficulty": "easy",
      "description": "Trespassing is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Perjury",
      "difficulty": "hard",
      "description": "Perjury is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Obstruction of Justice",
      "difficulty": "hard",
      "description": "Obstruction of Justice is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Contempt of Court",
      "difficulty": "hard",
      "description": "Contempt of Court is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Civil Case",
      "difficulty": "easy",
      "description": "Civil Case appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Class Action",
      "difficulty": "hard",
      "description": "Class Action is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Small Claims Court",
      "difficulty": "easy",
      "description": "Small Claims Court is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Appeal",
      "difficulty": "easy",
      "description": "Appeal appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Habeas Corpus",
      "difficulty": "hard",
      "description": "Habeas Corpus appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Presumption of Innocence",
      "difficulty": "hard",
      "description": "Presumption of Innocence is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Statute of Limitations",
      "difficulty": "hard",
      "description": "Statute of Limitations is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Double Jeopardy",
      "difficulty": "hard",
      "description": "Double Jeopardy is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Judicial Review",
      "difficulty": "hard",
      "description": "Judicial Review is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Public Defender",
      "difficulty": "hard",
      "description": "Public Defender is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "District Attorney",
      "difficulty": "hard",
      "description": "District Attorney is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Defense Attorney",
      "difficulty": "hard",
      "description": "Defense Attorney is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Court Clerk",
      "difficulty": "easy",
      "description": "Court Clerk is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Bailiff",
      "difficulty": "hard",
      "description": "Bailiff is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Prison Warden",
      "difficulty": "easy",
      "description": "Prison Warden is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Solitary Confinement",
      "difficulty": "easy",
      "description": "Solitary Confinement is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Community Service",
      "difficulty": "easy",
      "description": "Community Service is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "House Arrest",
      "difficulty": "hard",
      "description": "House Arrest appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Juvenile Court",
      "difficulty": "hard",
      "description": "Juvenile Court is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Restraining Order",
      "difficulty": "easy",
      "description": "Restraining Order is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Search and Seizure",
      "difficulty": "hard",
      "description": "Search and Seizure appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Human Trafficking",
      "difficulty": "hard",
      "description": "Human Trafficking is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Organized Crime",
      "difficulty": "easy",
      "description": "Organized Crime is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Cartel",
      "difficulty": "easy",
      "description": "Cartel appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Whistleblower",
      "difficulty": "hard",
      "description": "Whistleblower is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Corruption",
      "difficulty": "hard",
      "description": "Corruption is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Bribery",
      "difficulty": "easy",
      "description": "Bribery is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Riot Police",
      "difficulty": "easy",
      "description": "Riot Police appears in clues about crime, evidence, trials, or sentencing."
    },
    {
      "word": "Curfew",
      "difficulty": "easy",
      "description": "Curfew is a legal or criminal-justice term used in courtroom and policing contexts."
    },
    {
      "word": "Case Docket",
      "difficulty": "hard",
      "description": "Case Docket is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Chain of Custody",
      "difficulty": "hard",
      "description": "Chain of Custody is a justice-system clue tied to investigations, courts, or legal outcomes."
    },
    {
      "word": "Cold Case",
      "difficulty": "easy",
      "description": "Cold Case is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Evidence Locker",
      "difficulty": "easy",
      "description": "Evidence Locker is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Acquittal",
      "difficulty": "hard",
      "description": "Acquittal is a law-and-order clue linked to procedures, rights, or enforcement."
    },
    {
      "word": "Conviction",
      "difficulty": "easy",
      "description": "Conviction is a justice-system clue tied to investigations, courts, or legal outcomes."
    }
  ],
  "Africa: People, Places, and Events": [
    {
      "word": "Patrice Lumumba",
      "difficulty": "hard",
      "description": "Patrice Lumumba is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Kwame Nkrumah",
      "difficulty": "easy",
      "description": "Kwame Nkrumah is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Haile Selassie",
      "difficulty": "easy",
      "description": "Haile Selassie is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Julius Nyerere",
      "difficulty": "easy",
      "description": "Julius Nyerere is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Thomas Sankara",
      "difficulty": "hard",
      "description": "Thomas Sankara is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Wangari Maathai",
      "difficulty": "easy",
      "description": "Wangari Maathai is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Kofi Annan",
      "difficulty": "easy",
      "description": "Kofi Annan is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Ellen Johnson Sirleaf",
      "difficulty": "easy",
      "description": "Ellen Johnson Sirleaf appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Paul Kagame",
      "difficulty": "hard",
      "description": "Paul Kagame is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Cyril Ramaphosa",
      "difficulty": "easy",
      "description": "Cyril Ramaphosa is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Fela Kuti",
      "difficulty": "easy",
      "description": "Fela Kuti appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Miriam Makeba",
      "difficulty": "easy",
      "description": "Miriam Makeba is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Youssou Ndour",
      "difficulty": "hard",
      "description": "Youssou Ndour appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Didier Drogba",
      "difficulty": "easy",
      "description": "Didier Drogba is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Sadio Mane",
      "difficulty": "easy",
      "description": "Sadio Mane is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Eliud Kipchoge",
      "difficulty": "hard",
      "description": "Eliud Kipchoge is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Caster Semenya",
      "difficulty": "easy",
      "description": "Caster Semenya is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Siya Kolisi",
      "difficulty": "easy",
      "description": "Siya Kolisi is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Francois Pienaar",
      "difficulty": "easy",
      "description": "Francois Pienaar appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Amina J Mohammed",
      "difficulty": "hard",
      "description": "Amina J Mohammed is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Aliko Dangote",
      "difficulty": "easy",
      "description": "Aliko Dangote appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Ngozi Okonjo-Iweala",
      "difficulty": "hard",
      "description": "Ngozi Okonjo-Iweala is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Trevor Noah",
      "difficulty": "easy",
      "description": "Trevor Noah is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Chinua Achebe",
      "difficulty": "hard",
      "description": "Chinua Achebe is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Ngugi wa Thiongo",
      "difficulty": "hard",
      "description": "Ngugi wa Thiongo is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Nadine Gordimer",
      "difficulty": "easy",
      "description": "Nadine Gordimer appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Bessie Head",
      "difficulty": "hard",
      "description": "Bessie Head appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Chimamanda Ngozi Adichie",
      "difficulty": "hard",
      "description": "Chimamanda Ngozi Adichie is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Wole Soyinka",
      "difficulty": "easy",
      "description": "Wole Soyinka appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Table Mountain",
      "difficulty": "easy",
      "description": "Table Mountain appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Kruger National Park",
      "difficulty": "easy",
      "description": "Kruger National Park is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Victoria Falls",
      "difficulty": "easy",
      "description": "Victoria Falls appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Lake Tanganyika",
      "difficulty": "easy",
      "description": "Lake Tanganyika is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Great Rift Valley",
      "difficulty": "easy",
      "description": "Great Rift Valley is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Atlas Mountains",
      "difficulty": "hard",
      "description": "Atlas Mountains appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Drakensberg",
      "difficulty": "easy",
      "description": "Drakensberg is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Zanzibar",
      "difficulty": "easy",
      "description": "Zanzibar appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Timbuktu",
      "difficulty": "easy",
      "description": "Timbuktu is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Lagos",
      "difficulty": "hard",
      "description": "Lagos is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Cairo",
      "difficulty": "easy",
      "description": "Cairo is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Nairobi",
      "difficulty": "easy",
      "description": "Nairobi appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Johannesburg",
      "difficulty": "easy",
      "description": "Johannesburg is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Cape Town",
      "difficulty": "hard",
      "description": "Cape Town is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Addis Ababa",
      "difficulty": "easy",
      "description": "Addis Ababa is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Kigali",
      "difficulty": "easy",
      "description": "Kigali appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Dakar",
      "difficulty": "easy",
      "description": "Dakar appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Accra",
      "difficulty": "hard",
      "description": "Accra is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Casablanca",
      "difficulty": "easy",
      "description": "Casablanca is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Marrakesh",
      "difficulty": "easy",
      "description": "Marrakesh is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Maputo",
      "difficulty": "easy",
      "description": "Maputo is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Windhoek",
      "difficulty": "hard",
      "description": "Windhoek is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Lusaka",
      "difficulty": "easy",
      "description": "Lusaka appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Harare",
      "difficulty": "easy",
      "description": "Harare is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Gaborone",
      "difficulty": "easy",
      "description": "Gaborone is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Kampala",
      "difficulty": "hard",
      "description": "Kampala is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Dar es Salaam",
      "difficulty": "easy",
      "description": "Dar es Salaam is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Abuja",
      "difficulty": "easy",
      "description": "Abuja appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Alexandria",
      "difficulty": "easy",
      "description": "Alexandria appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Soweto Uprising",
      "difficulty": "hard",
      "description": "Soweto Uprising is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Sharpeville Massacre",
      "difficulty": "hard",
      "description": "Sharpeville Massacre is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "End of Apartheid",
      "difficulty": "easy",
      "description": "End of Apartheid is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Mandela Release",
      "difficulty": "easy",
      "description": "Mandela Release appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Rwandan Genocide",
      "difficulty": "hard",
      "description": "Rwandan Genocide is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Battle of Isandlwana",
      "difficulty": "hard",
      "description": "Battle of Isandlwana is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Africa Cup of Nations",
      "difficulty": "easy",
      "description": "Africa Cup of Nations appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "2010 FIFA World Cup",
      "difficulty": "easy",
      "description": "2010 FIFA World Cup is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Arab Spring Tunisia",
      "difficulty": "hard",
      "description": "Arab Spring Tunisia is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "African Union Summit",
      "difficulty": "hard",
      "description": "African Union Summit appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Great Zimbabwe",
      "difficulty": "hard",
      "description": "Great Zimbabwe appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Benin Bronzes",
      "difficulty": "hard",
      "description": "Benin Bronzes is an Africa-focused clue related to major people, places, or events."
    },
    {
      "word": "Mali Empire",
      "difficulty": "hard",
      "description": "Mali Empire is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Songhai Empire",
      "difficulty": "hard",
      "description": "Songhai Empire is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Kingdom of Axum",
      "difficulty": "hard",
      "description": "Kingdom of Axum is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Ethiopian Highlands",
      "difficulty": "easy",
      "description": "Ethiopian Highlands is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Namib Desert",
      "difficulty": "hard",
      "description": "Namib Desert appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Kalahari Desert",
      "difficulty": "easy",
      "description": "Kalahari Desert is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Nile Delta",
      "difficulty": "easy",
      "description": "Nile Delta appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Congo Basin",
      "difficulty": "hard",
      "description": "Congo Basin appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Lake Malawi",
      "difficulty": "hard",
      "description": "Lake Malawi appears in clues about African history, geography, culture, or sport."
    },
    {
      "word": "Mount Kenya",
      "difficulty": "easy",
      "description": "Mount Kenya is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Mount Elgon",
      "difficulty": "easy",
      "description": "Mount Elgon is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Blyde River Canyon",
      "difficulty": "hard",
      "description": "Blyde River Canyon is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Robben Island",
      "difficulty": "hard",
      "description": "Robben Island is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Constitution Hill",
      "difficulty": "hard",
      "description": "Constitution Hill is connected to African public life, landmarks, or important moments."
    },
    {
      "word": "Sahara Trade Routes",
      "difficulty": "hard",
      "description": "Sahara Trade Routes is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Swahili Coast",
      "difficulty": "hard",
      "description": "Swahili Coast is a recognizable African reference often used in regional knowledge clues."
    },
    {
      "word": "Blue Nile",
      "difficulty": "hard",
      "description": "Blue Nile appears in clues about African history, geography, culture, or sport."
    }
  ]
};

const themes = {
  "Wedding Fever": [
    {
      "word": "Bride",
      "difficulty": "easy",
      "description": "Bride is a clueable term relevant to Wedding Fever."
    },
    {
      "word": "Groom",
      "difficulty": "easy",
      "description": "Groom is a clueable term relevant to Wedding Fever."
    },
    {
      "word": "Wedding Cake",
      "difficulty": "easy",
      "description": "Wedding Cake fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Bouquet",
      "difficulty": "easy",
      "description": "Bouquet fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Honeymoon",
      "difficulty": "easy",
      "description": "Honeymoon fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Vows",
      "difficulty": "easy",
      "description": "Vows is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Best Man",
      "difficulty": "easy",
      "description": "Best Man is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Maid of Honor",
      "difficulty": "easy",
      "description": "Maid of Honor fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Wedding Ring",
      "difficulty": "easy",
      "description": "Wedding Ring fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Reception",
      "difficulty": "easy",
      "description": "Reception is a clueable term relevant to Wedding Fever."
    },
    {
      "word": "First Dance",
      "difficulty": "hard",
      "description": "First Dance is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Wedding Bells",
      "difficulty": "hard",
      "description": "Wedding Bells is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Unity Candle",
      "difficulty": "hard",
      "description": "Unity Candle is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Wedding Planner",
      "difficulty": "hard",
      "description": "Wedding Planner is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Flower Girl",
      "difficulty": "hard",
      "description": "Flower Girl is a clueable term relevant to Wedding Fever."
    },
    {
      "word": "Ring Bearer",
      "difficulty": "hard",
      "description": "Ring Bearer is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Tuxedo",
      "difficulty": "hard",
      "description": "Tuxedo is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Wedding March",
      "difficulty": "hard",
      "description": "Wedding March fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Bridal Shower",
      "difficulty": "hard",
      "description": "Bridal Shower is a clueable term relevant to Wedding Fever."
    },
    {
      "word": "Bachelor Party",
      "difficulty": "hard",
      "description": "Bachelor Party fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Bachelorette Party",
      "difficulty": "easy",
      "description": "Bachelorette Party is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Bridesmaid",
      "difficulty": "easy",
      "description": "Bridesmaid is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Engagement Ring",
      "difficulty": "easy",
      "description": "Engagement Ring is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Floral Arrangement",
      "difficulty": "hard",
      "description": "Floral Arrangement is a clueable term relevant to Wedding Fever."
    },
    {
      "word": "Groomsmen",
      "difficulty": "easy",
      "description": "Groomsmen is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Marriage Certificate",
      "difficulty": "easy",
      "description": "Marriage Certificate is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Marriage Vows",
      "difficulty": "hard",
      "description": "Marriage Vows is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Wedding Dress",
      "difficulty": "easy",
      "description": "Wedding Dress fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Wedding Venue",
      "difficulty": "easy",
      "description": "Wedding Venue fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Wedding Vows",
      "difficulty": "easy",
      "description": "Wedding Vows is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Aisle",
      "difficulty": "hard",
      "description": "Aisle fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Confetti",
      "difficulty": "easy",
      "description": "Confetti is a clueable term relevant to Wedding Fever."
    },
    {
      "word": "Guest List",
      "difficulty": "easy",
      "description": "Guest List is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Wedding Toast",
      "difficulty": "easy",
      "description": "Wedding Toast fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Reception Hall",
      "difficulty": "hard",
      "description": "Reception Hall is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Photo Booth",
      "difficulty": "easy",
      "description": "Photo Booth is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Wedding Favors",
      "difficulty": "easy",
      "description": "Wedding Favors fits the Wedding Fever category for quick, descriptive gameplay."
    },
    {
      "word": "Bridal Veil",
      "difficulty": "easy",
      "description": "Bridal Veil is commonly used in Wedding Fever themed clues."
    },
    {
      "word": "Table Seating",
      "difficulty": "hard",
      "description": "Table Seating is a useful Wedding Fever reference for fast team guessing rounds."
    },
    {
      "word": "Wedding Car",
      "difficulty": "easy",
      "description": "Wedding Car is a clueable term relevant to Wedding Fever."
    }
  ],
  "Holiday Time": [
    {
      "word": "Christmas tree",
      "difficulty": "easy",
      "description": "Christmas tree fits the Holiday Time category for quick, descriptive gameplay."
    },
    {
      "word": "Santa Claus",
      "difficulty": "easy",
      "description": "Santa Claus is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Snowman",
      "difficulty": "easy",
      "description": "Snowman fits the Holiday Time category for quick, descriptive gameplay."
    },
    {
      "word": "Gifts",
      "difficulty": "easy",
      "description": "Gifts is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Stockings",
      "difficulty": "easy",
      "description": "Stockings is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Reindeer",
      "difficulty": "easy",
      "description": "Reindeer is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Sleigh",
      "difficulty": "easy",
      "description": "Sleigh is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Caroling",
      "difficulty": "easy",
      "description": "Caroling is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Fireplace",
      "difficulty": "easy",
      "description": "Fireplace is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Gingerbread",
      "difficulty": "easy",
      "description": "Gingerbread is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Ornament",
      "difficulty": "easy",
      "description": "Ornament is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Mistletoe",
      "difficulty": "easy",
      "description": "Mistletoe is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Eggnog",
      "difficulty": "easy",
      "description": "Eggnog is a clueable term relevant to Holiday Time."
    },
    {
      "word": "New Year's Eve",
      "difficulty": "easy",
      "description": "New Year's Eve is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Hanukkah",
      "difficulty": "easy",
      "description": "Hanukkah is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Advent calendar",
      "difficulty": "hard",
      "description": "Advent calendar is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Kwanzaa",
      "difficulty": "hard",
      "description": "Kwanzaa is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Yule log",
      "difficulty": "hard",
      "description": "Yule log is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Boxing Day",
      "difficulty": "hard",
      "description": "Boxing Day is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Epiphany",
      "difficulty": "hard",
      "description": "Epiphany fits the Holiday Time category for quick, descriptive gameplay."
    },
    {
      "word": "Menorah",
      "difficulty": "hard",
      "description": "Menorah is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Dreidel",
      "difficulty": "hard",
      "description": "Dreidel fits the Holiday Time category for quick, descriptive gameplay."
    },
    {
      "word": "Tinsel",
      "difficulty": "hard",
      "description": "Tinsel is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Wassail",
      "difficulty": "hard",
      "description": "Wassail is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Nutcracker",
      "difficulty": "hard",
      "description": "Nutcracker is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Krampus",
      "difficulty": "hard",
      "description": "Krampus is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Solstice",
      "difficulty": "hard",
      "description": "Solstice is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Hogmanay",
      "difficulty": "hard",
      "description": "Hogmanay is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Black Friday",
      "difficulty": "hard",
      "description": "Black Friday fits the Holiday Time category for quick, descriptive gameplay."
    },
    {
      "word": "Feast of Seven Fishes",
      "difficulty": "hard",
      "description": "Feast of Seven Fishes is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Holiday Market",
      "difficulty": "hard",
      "description": "Holiday Market fits the Holiday Time category for quick, descriptive gameplay."
    },
    {
      "word": "Secret Santa",
      "difficulty": "easy",
      "description": "Secret Santa fits the Holiday Time category for quick, descriptive gameplay."
    },
    {
      "word": "Family Feast",
      "difficulty": "easy",
      "description": "Family Feast is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Holiday Lights",
      "difficulty": "easy",
      "description": "Holiday Lights is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Winter Break",
      "difficulty": "hard",
      "description": "Winter Break is a useful Holiday Time reference for fast team guessing rounds."
    },
    {
      "word": "Gift Wrap",
      "difficulty": "easy",
      "description": "Gift Wrap fits the Holiday Time category for quick, descriptive gameplay."
    },
    {
      "word": "Snow Globe",
      "difficulty": "easy",
      "description": "Snow Globe is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Holiday Travel",
      "difficulty": "easy",
      "description": "Holiday Travel is a clueable term relevant to Holiday Time."
    },
    {
      "word": "Warm Cocoa",
      "difficulty": "hard",
      "description": "Warm Cocoa is commonly used in Holiday Time themed clues."
    },
    {
      "word": "Festive Playlist",
      "difficulty": "easy",
      "description": "Festive Playlist is commonly used in Holiday Time themed clues."
    }
  ],
  "Sports Event": [
    {
      "word": "Olympic Games",
      "difficulty": "easy",
      "description": "Olympic Games fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "World Cup",
      "difficulty": "easy",
      "description": "World Cup is commonly used in Sports Event themed clues."
    },
    {
      "word": "Super Bowl",
      "difficulty": "easy",
      "description": "Super Bowl is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "Wimbledon",
      "difficulty": "easy",
      "description": "Wimbledon is commonly used in Sports Event themed clues."
    },
    {
      "word": "Tour de France",
      "difficulty": "easy",
      "description": "Tour de France is commonly used in Sports Event themed clues."
    },
    {
      "word": "NBA Finals",
      "difficulty": "easy",
      "description": "NBA Finals fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "Stanley Cup",
      "difficulty": "easy",
      "description": "Stanley Cup is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "Masters Tournament",
      "difficulty": "easy",
      "description": "Masters Tournament is commonly used in Sports Event themed clues."
    },
    {
      "word": "Ryder Cup",
      "difficulty": "easy",
      "description": "Ryder Cup is commonly used in Sports Event themed clues."
    },
    {
      "word": "Kentucky Derby",
      "difficulty": "easy",
      "description": "Kentucky Derby is a clueable term relevant to Sports Event."
    },
    {
      "word": "F1 Grand Prix",
      "difficulty": "easy",
      "description": "F1 Grand Prix fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "Rugby World Cup",
      "difficulty": "easy",
      "description": "Rugby World Cup is commonly used in Sports Event themed clues."
    },
    {
      "word": "MLB World Series",
      "difficulty": "easy",
      "description": "MLB World Series fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "UFC Championship",
      "difficulty": "easy",
      "description": "UFC Championship fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "Cricket World Cup",
      "difficulty": "easy",
      "description": "Cricket World Cup fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "Heisman Trophy",
      "difficulty": "hard",
      "description": "Heisman Trophy is a clueable term relevant to Sports Event."
    },
    {
      "word": "The Ashes Series",
      "difficulty": "hard",
      "description": "The Ashes Series is a clueable term relevant to Sports Event."
    },
    {
      "word": "UEFA Champions League",
      "difficulty": "hard",
      "description": "UEFA Champions League is a clueable term relevant to Sports Event."
    },
    {
      "word": "Copa America",
      "difficulty": "hard",
      "description": "Copa America is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "La Liga Championship",
      "difficulty": "hard",
      "description": "La Liga Championship is commonly used in Sports Event themed clues."
    },
    {
      "word": "Indy 500",
      "difficulty": "hard",
      "description": "Indy 500 is commonly used in Sports Event themed clues."
    },
    {
      "word": "PGA Championship",
      "difficulty": "hard",
      "description": "PGA Championship is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "MotoGP",
      "difficulty": "hard",
      "description": "MotoGP is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "Commonwealth Games",
      "difficulty": "hard",
      "description": "Commonwealth Games is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "Davis Cup",
      "difficulty": "hard",
      "description": "Davis Cup fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "America's Cup",
      "difficulty": "hard",
      "description": "America's Cup fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "FA Cup Final",
      "difficulty": "hard",
      "description": "FA Cup Final is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "Six Nations Championship",
      "difficulty": "hard",
      "description": "Six Nations Championship is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "Belmont Stakes",
      "difficulty": "hard",
      "description": "Belmont Stakes is commonly used in Sports Event themed clues."
    },
    {
      "word": "Opening Ceremony",
      "difficulty": "hard",
      "description": "Opening Ceremony is a clueable term relevant to Sports Event."
    },
    {
      "word": "Penalty Shootout",
      "difficulty": "easy",
      "description": "Penalty Shootout fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "Photo Finish",
      "difficulty": "easy",
      "description": "Photo Finish is commonly used in Sports Event themed clues."
    },
    {
      "word": "Extra Time",
      "difficulty": "easy",
      "description": "Extra Time is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "Golden Medal",
      "difficulty": "hard",
      "description": "Golden Medal is commonly used in Sports Event themed clues."
    },
    {
      "word": "Team Captain",
      "difficulty": "easy",
      "description": "Team Captain is a useful Sports Event reference for fast team guessing rounds."
    },
    {
      "word": "Locker Room",
      "difficulty": "easy",
      "description": "Locker Room is a clueable term relevant to Sports Event."
    },
    {
      "word": "Match Officials",
      "difficulty": "easy",
      "description": "Match Officials is commonly used in Sports Event themed clues."
    },
    {
      "word": "Crowd Roar",
      "difficulty": "hard",
      "description": "Crowd Roar fits the Sports Event category for quick, descriptive gameplay."
    },
    {
      "word": "Victory Lap",
      "difficulty": "easy",
      "description": "Victory Lap is commonly used in Sports Event themed clues."
    }
  ],
  "Summer Vacation": [
    {
      "word": "Beach",
      "difficulty": "easy",
      "description": "Beach is a clueable term relevant to Summer Vacation."
    },
    {
      "word": "Surfing",
      "difficulty": "easy",
      "description": "Surfing is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Ice cream",
      "difficulty": "easy",
      "description": "Ice cream fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Sandcastle",
      "difficulty": "easy",
      "description": "Sandcastle is a clueable term relevant to Summer Vacation."
    },
    {
      "word": "Sunbathing",
      "difficulty": "easy",
      "description": "Sunbathing fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Pool party",
      "difficulty": "easy",
      "description": "Pool party fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Barbecue",
      "difficulty": "easy",
      "description": "Barbecue is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Camping",
      "difficulty": "easy",
      "description": "Camping is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Hiking",
      "difficulty": "easy",
      "description": "Hiking is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Road trip",
      "difficulty": "easy",
      "description": "Road trip is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Water park",
      "difficulty": "easy",
      "description": "Water park is a clueable term relevant to Summer Vacation."
    },
    {
      "word": "Fishing",
      "difficulty": "easy",
      "description": "Fishing is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Snorkeling",
      "difficulty": "easy",
      "description": "Snorkeling is a clueable term relevant to Summer Vacation."
    },
    {
      "word": "Jet skiing",
      "difficulty": "easy",
      "description": "Jet skiing is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Amusement park",
      "difficulty": "easy",
      "description": "Amusement park is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Bonfire Night",
      "difficulty": "hard",
      "description": "Bonfire Night is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Island Hopping",
      "difficulty": "hard",
      "description": "Island Hopping is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Deep-sea Fishing",
      "difficulty": "hard",
      "description": "Deep-sea Fishing fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Scenic Route",
      "difficulty": "hard",
      "description": "Scenic Route fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Guided Tour",
      "difficulty": "hard",
      "description": "Guided Tour fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Outdoor Concert",
      "difficulty": "hard",
      "description": "Outdoor Concert is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Nature Trail",
      "difficulty": "hard",
      "description": "Nature Trail is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Paddle Boarding",
      "difficulty": "hard",
      "description": "Paddle Boarding is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Paragliding",
      "difficulty": "hard",
      "description": "Paragliding is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Cliff Diving",
      "difficulty": "hard",
      "description": "Cliff Diving fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Kayaking",
      "difficulty": "hard",
      "description": "Kayaking is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Wildlife Safari",
      "difficulty": "hard",
      "description": "Wildlife Safari fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Scuba Diving",
      "difficulty": "hard",
      "description": "Scuba Diving fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Mountain Biking",
      "difficulty": "hard",
      "description": "Mountain Biking is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Hot Air Balloon Ride",
      "difficulty": "hard",
      "description": "Hot Air Balloon Ride fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Sunblock",
      "difficulty": "hard",
      "description": "Sunblock is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Flip Flops",
      "difficulty": "easy",
      "description": "Flip Flops is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Beach Umbrella",
      "difficulty": "easy",
      "description": "Beach Umbrella is a useful Summer Vacation reference for fast team guessing rounds."
    },
    {
      "word": "Resort",
      "difficulty": "easy",
      "description": "Resort fits the Summer Vacation category for quick, descriptive gameplay."
    },
    {
      "word": "Sightseeing",
      "difficulty": "hard",
      "description": "Sightseeing is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Travel Photos",
      "difficulty": "easy",
      "description": "Travel Photos is a clueable term relevant to Summer Vacation."
    },
    {
      "word": "Day Trip",
      "difficulty": "easy",
      "description": "Day Trip is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Boat Cruise",
      "difficulty": "easy",
      "description": "Boat Cruise is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Sunset Picnic",
      "difficulty": "hard",
      "description": "Sunset Picnic is commonly used in Summer Vacation themed clues."
    },
    {
      "word": "Seaside",
      "difficulty": "easy",
      "description": "Seaside is a clueable term relevant to Summer Vacation."
    }
  ],
  "Halloween Party": [
    {
      "word": "Pumpkin",
      "difficulty": "easy",
      "description": "Pumpkin is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Ghost",
      "difficulty": "easy",
      "description": "Ghost is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Witch",
      "difficulty": "easy",
      "description": "Witch is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Costume",
      "difficulty": "easy",
      "description": "Costume is a useful Halloween Party reference for fast team guessing rounds."
    },
    {
      "word": "Candy",
      "difficulty": "easy",
      "description": "Candy fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Jack-o'-lantern",
      "difficulty": "easy",
      "description": "Jack-o'-lantern is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Haunted house",
      "difficulty": "easy",
      "description": "Haunted house is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Skeleton",
      "difficulty": "easy",
      "description": "Skeleton is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Vampire",
      "difficulty": "easy",
      "description": "Vampire is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Zombie",
      "difficulty": "easy",
      "description": "Zombie is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Trick-or-treat",
      "difficulty": "easy",
      "description": "Trick-or-treat is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Black cat",
      "difficulty": "easy",
      "description": "Black cat is a useful Halloween Party reference for fast team guessing rounds."
    },
    {
      "word": "Spider web",
      "difficulty": "easy",
      "description": "Spider web is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Bat",
      "difficulty": "easy",
      "description": "Bat is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Mask",
      "difficulty": "easy",
      "description": "Mask is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Frankenstein's Monster",
      "difficulty": "hard",
      "description": "Frankenstein's Monster fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Dracula's Castle",
      "difficulty": "hard",
      "description": "Dracula's Castle is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Witch's Brew",
      "difficulty": "hard",
      "description": "Witch's Brew fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Spooky Stories",
      "difficulty": "hard",
      "description": "Spooky Stories is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Full Moon Night",
      "difficulty": "hard",
      "description": "Full Moon Night fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Graveyard Shift",
      "difficulty": "hard",
      "description": "Graveyard Shift fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Poltergeist",
      "difficulty": "hard",
      "description": "Poltergeist fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Werewolf Transformation",
      "difficulty": "hard",
      "description": "Werewolf Transformation fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Creepy Crawlies",
      "difficulty": "hard",
      "description": "Creepy Crawlies is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Phantom of the Opera",
      "difficulty": "hard",
      "description": "Phantom of the Opera fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Haunted Forest",
      "difficulty": "hard",
      "description": "Haunted Forest is a useful Halloween Party reference for fast team guessing rounds."
    },
    {
      "word": "Sleepy Hollow",
      "difficulty": "hard",
      "description": "Sleepy Hollow fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Blood Moon",
      "difficulty": "hard",
      "description": "Blood Moon is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Scarecrow",
      "difficulty": "hard",
      "description": "Scarecrow is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Halloween Parade",
      "difficulty": "hard",
      "description": "Halloween Parade is a useful Halloween Party reference for fast team guessing rounds."
    },
    {
      "word": "Trick Bucket",
      "difficulty": "hard",
      "description": "Trick Bucket is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Fog Machine",
      "difficulty": "easy",
      "description": "Fog Machine is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Costume Contest",
      "difficulty": "easy",
      "description": "Costume Contest is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Candy Corn",
      "difficulty": "easy",
      "description": "Candy Corn is a useful Halloween Party reference for fast team guessing rounds."
    },
    {
      "word": "Spooky Playlist",
      "difficulty": "hard",
      "description": "Spooky Playlist fits the Halloween Party category for quick, descriptive gameplay."
    },
    {
      "word": "Face Paint",
      "difficulty": "easy",
      "description": "Face Paint is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Pumpkin Carving",
      "difficulty": "easy",
      "description": "Pumpkin Carving is commonly used in Halloween Party themed clues."
    },
    {
      "word": "Haunted Maze",
      "difficulty": "easy",
      "description": "Haunted Maze is a useful Halloween Party reference for fast team guessing rounds."
    },
    {
      "word": "Ghost Story",
      "difficulty": "hard",
      "description": "Ghost Story is a clueable term relevant to Halloween Party."
    },
    {
      "word": "Midnight Party",
      "difficulty": "easy",
      "description": "Midnight Party is a clueable term relevant to Halloween Party."
    }
  ],
  "Christmas Celebration": [
    {
      "word": "Santa Claus",
      "difficulty": "easy",
      "description": "Santa Claus is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Christmas tree",
      "difficulty": "easy",
      "description": "Christmas tree is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Snowman",
      "difficulty": "easy",
      "description": "Snowman fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Gifts",
      "difficulty": "easy",
      "description": "Gifts fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Stockings",
      "difficulty": "easy",
      "description": "Stockings fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Reindeer",
      "difficulty": "easy",
      "description": "Reindeer is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Sleigh",
      "difficulty": "easy",
      "description": "Sleigh fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Caroling",
      "difficulty": "easy",
      "description": "Caroling is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Fireplace",
      "difficulty": "easy",
      "description": "Fireplace is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Gingerbread",
      "difficulty": "easy",
      "description": "Gingerbread fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Ornament",
      "difficulty": "easy",
      "description": "Ornament fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Mistletoe",
      "difficulty": "easy",
      "description": "Mistletoe is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Eggnog",
      "difficulty": "easy",
      "description": "Eggnog is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "New Year's Eve",
      "difficulty": "easy",
      "description": "New Year's Eve is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Hanukkah",
      "difficulty": "easy",
      "description": "Hanukkah is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Advent Calendar",
      "difficulty": "hard",
      "description": "Advent Calendar is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Kwanzaa",
      "difficulty": "hard",
      "description": "Kwanzaa is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Yule Log",
      "difficulty": "hard",
      "description": "Yule Log is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Boxing Day",
      "difficulty": "hard",
      "description": "Boxing Day is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Epiphany",
      "difficulty": "hard",
      "description": "Epiphany is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Menorah",
      "difficulty": "hard",
      "description": "Menorah is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Dreidel",
      "difficulty": "hard",
      "description": "Dreidel fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Tinsel",
      "difficulty": "hard",
      "description": "Tinsel is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Wassail",
      "difficulty": "hard",
      "description": "Wassail is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Nutcracker",
      "difficulty": "hard",
      "description": "Nutcracker is a clueable term relevant to Christmas Celebration."
    },
    {
      "word": "Krampus",
      "difficulty": "hard",
      "description": "Krampus is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Solstice",
      "difficulty": "hard",
      "description": "Solstice fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Hogmanay",
      "difficulty": "hard",
      "description": "Hogmanay is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Black Friday",
      "difficulty": "hard",
      "description": "Black Friday is a clueable term relevant to Christmas Celebration."
    },
    {
      "word": "Feast of Seven Fishes",
      "difficulty": "hard",
      "description": "Feast of Seven Fishes fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Nativity Scene",
      "difficulty": "hard",
      "description": "Nativity Scene is a clueable term relevant to Christmas Celebration."
    },
    {
      "word": "Christmas Choir",
      "difficulty": "easy",
      "description": "Christmas Choir is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Candy Cane",
      "difficulty": "easy",
      "description": "Candy Cane is a clueable term relevant to Christmas Celebration."
    },
    {
      "word": "Tree Topper",
      "difficulty": "easy",
      "description": "Tree Topper fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Christmas Eve",
      "difficulty": "hard",
      "description": "Christmas Eve is a useful Christmas Celebration reference for fast team guessing rounds."
    },
    {
      "word": "Gift Exchange",
      "difficulty": "easy",
      "description": "Gift Exchange fits the Christmas Celebration category for quick, descriptive gameplay."
    },
    {
      "word": "Festive Sweater",
      "difficulty": "easy",
      "description": "Festive Sweater is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Holiday Ham",
      "difficulty": "easy",
      "description": "Holiday Ham is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Snow Angel",
      "difficulty": "hard",
      "description": "Snow Angel is commonly used in Christmas Celebration themed clues."
    },
    {
      "word": "Winter Garland",
      "difficulty": "easy",
      "description": "Winter Garland is commonly used in Christmas Celebration themed clues."
    }
  ],
  "Back to School": [
    {
      "word": "Homework",
      "difficulty": "easy",
      "description": "Homework is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Backpack",
      "difficulty": "easy",
      "description": "Backpack is a clueable term relevant to Back to School."
    },
    {
      "word": "Teacher",
      "difficulty": "easy",
      "description": "Teacher is commonly used in Back to School themed clues."
    },
    {
      "word": "Classroom",
      "difficulty": "easy",
      "description": "Classroom is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Desk",
      "difficulty": "easy",
      "description": "Desk is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Notebook",
      "difficulty": "easy",
      "description": "Notebook is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Pencil",
      "difficulty": "easy",
      "description": "Pencil fits the Back to School category for quick, descriptive gameplay."
    },
    {
      "word": "Textbook",
      "difficulty": "easy",
      "description": "Textbook is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Lunchbox",
      "difficulty": "easy",
      "description": "Lunchbox fits the Back to School category for quick, descriptive gameplay."
    },
    {
      "word": "Bus",
      "difficulty": "easy",
      "description": "Bus is commonly used in Back to School themed clues."
    },
    {
      "word": "Recess",
      "difficulty": "easy",
      "description": "Recess fits the Back to School category for quick, descriptive gameplay."
    },
    {
      "word": "Blackboard",
      "difficulty": "easy",
      "description": "Blackboard fits the Back to School category for quick, descriptive gameplay."
    },
    {
      "word": "Calculator",
      "difficulty": "easy",
      "description": "Calculator is commonly used in Back to School themed clues."
    },
    {
      "word": "Ruler",
      "difficulty": "easy",
      "description": "Ruler is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "School Bell",
      "difficulty": "easy",
      "description": "School Bell is a clueable term relevant to Back to School."
    },
    {
      "word": "Parent-Teacher Conference",
      "difficulty": "hard",
      "description": "Parent-Teacher Conference is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Science Fair Project",
      "difficulty": "hard",
      "description": "Science Fair Project is a clueable term relevant to Back to School."
    },
    {
      "word": "Field Trip",
      "difficulty": "hard",
      "description": "Field Trip is commonly used in Back to School themed clues."
    },
    {
      "word": "Honor Roll",
      "difficulty": "hard",
      "description": "Honor Roll is a clueable term relevant to Back to School."
    },
    {
      "word": "Extracurricular Activities",
      "difficulty": "hard",
      "description": "Extracurricular Activities is commonly used in Back to School themed clues."
    },
    {
      "word": "Locker Combination",
      "difficulty": "hard",
      "description": "Locker Combination is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Study Group",
      "difficulty": "hard",
      "description": "Study Group is commonly used in Back to School themed clues."
    },
    {
      "word": "Class President",
      "difficulty": "hard",
      "description": "Class President is commonly used in Back to School themed clues."
    },
    {
      "word": "Graduation Ceremony",
      "difficulty": "hard",
      "description": "Graduation Ceremony is a clueable term relevant to Back to School."
    },
    {
      "word": "Debate Club",
      "difficulty": "hard",
      "description": "Debate Club is a clueable term relevant to Back to School."
    },
    {
      "word": "School Assembly",
      "difficulty": "hard",
      "description": "School Assembly is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Art Class",
      "difficulty": "hard",
      "description": "Art Class is a clueable term relevant to Back to School."
    },
    {
      "word": "Gymnasium",
      "difficulty": "hard",
      "description": "Gymnasium is a clueable term relevant to Back to School."
    },
    {
      "word": "History Lesson",
      "difficulty": "hard",
      "description": "History Lesson is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Report Card",
      "difficulty": "hard",
      "description": "Report Card fits the Back to School category for quick, descriptive gameplay."
    },
    {
      "word": "Syllabus",
      "difficulty": "hard",
      "description": "Syllabus is commonly used in Back to School themed clues."
    },
    {
      "word": "Homeroom",
      "difficulty": "easy",
      "description": "Homeroom is commonly used in Back to School themed clues."
    },
    {
      "word": "Attendance Register",
      "difficulty": "easy",
      "description": "Attendance Register is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "School Uniform",
      "difficulty": "easy",
      "description": "School Uniform is commonly used in Back to School themed clues."
    },
    {
      "word": "Detention",
      "difficulty": "hard",
      "description": "Detention is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "School Library",
      "difficulty": "easy",
      "description": "School Library is commonly used in Back to School themed clues."
    },
    {
      "word": "Exam Hall",
      "difficulty": "easy",
      "description": "Exam Hall fits the Back to School category for quick, descriptive gameplay."
    },
    {
      "word": "Pencil Case",
      "difficulty": "easy",
      "description": "Pencil Case is a useful Back to School reference for fast team guessing rounds."
    },
    {
      "word": "Study Timetable",
      "difficulty": "hard",
      "description": "Study Timetable is a clueable term relevant to Back to School."
    },
    {
      "word": "Group Project",
      "difficulty": "easy",
      "description": "Group Project is a clueable term relevant to Back to School."
    }
  ],
  "Music Festival": [
    {
      "word": "Stage",
      "difficulty": "easy",
      "description": "Stage is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Band",
      "difficulty": "easy",
      "description": "Band fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "Audience",
      "difficulty": "easy",
      "description": "Audience fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "Microphone",
      "difficulty": "easy",
      "description": "Microphone is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Guitar",
      "difficulty": "easy",
      "description": "Guitar is commonly used in Music Festival themed clues."
    },
    {
      "word": "Drums",
      "difficulty": "easy",
      "description": "Drums fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "DJ",
      "difficulty": "easy",
      "description": "DJ is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Dance",
      "difficulty": "easy",
      "description": "Dance is a clueable term relevant to Music Festival."
    },
    {
      "word": "Lights",
      "difficulty": "easy",
      "description": "Lights is a clueable term relevant to Music Festival."
    },
    {
      "word": "Ticket",
      "difficulty": "easy",
      "description": "Ticket is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Camping",
      "difficulty": "easy",
      "description": "Camping fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "Tent",
      "difficulty": "easy",
      "description": "Tent is a clueable term relevant to Music Festival."
    },
    {
      "word": "Soundcheck",
      "difficulty": "easy",
      "description": "Soundcheck is commonly used in Music Festival themed clues."
    },
    {
      "word": "Setlist",
      "difficulty": "easy",
      "description": "Setlist is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Encore",
      "difficulty": "easy",
      "description": "Encore is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Backstage Pass",
      "difficulty": "hard",
      "description": "Backstage Pass is a clueable term relevant to Music Festival."
    },
    {
      "word": "Crowd Surfing",
      "difficulty": "hard",
      "description": "Crowd Surfing is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Headliner",
      "difficulty": "hard",
      "description": "Headliner is a clueable term relevant to Music Festival."
    },
    {
      "word": "Festival Wristband",
      "difficulty": "hard",
      "description": "Festival Wristband is a clueable term relevant to Music Festival."
    },
    {
      "word": "VIP Area",
      "difficulty": "hard",
      "description": "VIP Area fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "Acoustic Set",
      "difficulty": "hard",
      "description": "Acoustic Set is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Merchandise Stand",
      "difficulty": "hard",
      "description": "Merchandise Stand is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Mosh Pit",
      "difficulty": "hard",
      "description": "Mosh Pit is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Opening Act",
      "difficulty": "hard",
      "description": "Opening Act is a clueable term relevant to Music Festival."
    },
    {
      "word": "Roadies",
      "difficulty": "hard",
      "description": "Roadies fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "Tour Bus",
      "difficulty": "hard",
      "description": "Tour Bus is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Sound Engineer",
      "difficulty": "hard",
      "description": "Sound Engineer is commonly used in Music Festival themed clues."
    },
    {
      "word": "Festival Grounds",
      "difficulty": "hard",
      "description": "Festival Grounds is commonly used in Music Festival themed clues."
    },
    {
      "word": "Food Truck",
      "difficulty": "hard",
      "description": "Food Truck is commonly used in Music Festival themed clues."
    },
    {
      "word": "Festival Vibes",
      "difficulty": "hard",
      "description": "Festival Vibes is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Main Stage",
      "difficulty": "hard",
      "description": "Main Stage is commonly used in Music Festival themed clues."
    },
    {
      "word": "Sound Booth",
      "difficulty": "easy",
      "description": "Sound Booth is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Festival Lineup",
      "difficulty": "easy",
      "description": "Festival Lineup fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "Late Night Set",
      "difficulty": "easy",
      "description": "Late Night Set fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "Warm-up DJ",
      "difficulty": "hard",
      "description": "Warm-up DJ is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Crowd Chant",
      "difficulty": "easy",
      "description": "Crowd Chant is a useful Music Festival reference for fast team guessing rounds."
    },
    {
      "word": "Festival Poster",
      "difficulty": "easy",
      "description": "Festival Poster is a clueable term relevant to Music Festival."
    },
    {
      "word": "Bass Drop",
      "difficulty": "easy",
      "description": "Bass Drop is a clueable term relevant to Music Festival."
    },
    {
      "word": "Live Mix",
      "difficulty": "hard",
      "description": "Live Mix fits the Music Festival category for quick, descriptive gameplay."
    },
    {
      "word": "Encore Song",
      "difficulty": "easy",
      "description": "Encore Song fits the Music Festival category for quick, descriptive gameplay."
    }
  ],
  "Movie Night": [
    {
      "word": "Popcorn",
      "difficulty": "easy",
      "description": "Popcorn is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Movie",
      "difficulty": "easy",
      "description": "Movie fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Ticket",
      "difficulty": "easy",
      "description": "Ticket fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Director",
      "difficulty": "easy",
      "description": "Director is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Actor",
      "difficulty": "easy",
      "description": "Actor is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Theater",
      "difficulty": "easy",
      "description": "Theater is commonly used in Movie Night themed clues."
    },
    {
      "word": "Screen",
      "difficulty": "easy",
      "description": "Screen fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Trailer",
      "difficulty": "easy",
      "description": "Trailer is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Snack",
      "difficulty": "easy",
      "description": "Snack is a clueable term relevant to Movie Night."
    },
    {
      "word": "Seat",
      "difficulty": "easy",
      "description": "Seat is commonly used in Movie Night themed clues."
    },
    {
      "word": "Projector",
      "difficulty": "easy",
      "description": "Projector is a clueable term relevant to Movie Night."
    },
    {
      "word": "Credits",
      "difficulty": "easy",
      "description": "Credits is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Scene",
      "difficulty": "easy",
      "description": "Scene fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Genre",
      "difficulty": "easy",
      "description": "Genre is commonly used in Movie Night themed clues."
    },
    {
      "word": "Plot",
      "difficulty": "easy",
      "description": "Plot is commonly used in Movie Night themed clues."
    },
    {
      "word": "Cinematic Experience",
      "difficulty": "hard",
      "description": "Cinematic Experience is commonly used in Movie Night themed clues."
    },
    {
      "word": "Red Carpet Event",
      "difficulty": "hard",
      "description": "Red Carpet Event is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Independent Film",
      "difficulty": "hard",
      "description": "Independent Film fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Blockbuster Hit",
      "difficulty": "hard",
      "description": "Blockbuster Hit fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Special Effects",
      "difficulty": "hard",
      "description": "Special Effects fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Box Office",
      "difficulty": "hard",
      "description": "Box Office is commonly used in Movie Night themed clues."
    },
    {
      "word": "Movie Marathon",
      "difficulty": "hard",
      "description": "Movie Marathon fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Midnight Screening",
      "difficulty": "hard",
      "description": "Midnight Screening is a clueable term relevant to Movie Night."
    },
    {
      "word": "Dolby Surround Sound",
      "difficulty": "hard",
      "description": "Dolby Surround Sound is commonly used in Movie Night themed clues."
    },
    {
      "word": "Film Festival",
      "difficulty": "hard",
      "description": "Film Festival is commonly used in Movie Night themed clues."
    },
    {
      "word": "Cult Classic",
      "difficulty": "hard",
      "description": "Cult Classic is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Behind the Scenes",
      "difficulty": "hard",
      "description": "Behind the Scenes is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Movie Franchise",
      "difficulty": "hard",
      "description": "Movie Franchise fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Character Development",
      "difficulty": "hard",
      "description": "Character Development is a clueable term relevant to Movie Night."
    },
    {
      "word": "Post-Credit Scene",
      "difficulty": "hard",
      "description": "Post-Credit Scene fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Cinema Ticket",
      "difficulty": "hard",
      "description": "Cinema Ticket is commonly used in Movie Night themed clues."
    },
    {
      "word": "Box Office Hit",
      "difficulty": "easy",
      "description": "Box Office Hit is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Director's Cut",
      "difficulty": "easy",
      "description": "Director's Cut fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Opening Scene",
      "difficulty": "easy",
      "description": "Opening Scene fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Movie Quote",
      "difficulty": "hard",
      "description": "Movie Quote is a clueable term relevant to Movie Night."
    },
    {
      "word": "Film Score",
      "difficulty": "easy",
      "description": "Film Score is a clueable term relevant to Movie Night."
    },
    {
      "word": "Rom-com",
      "difficulty": "easy",
      "description": "Rom-com is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Thriller",
      "difficulty": "easy",
      "description": "Thriller is a useful Movie Night reference for fast team guessing rounds."
    },
    {
      "word": "Mid-credit Scene",
      "difficulty": "hard",
      "description": "Mid-credit Scene fits the Movie Night category for quick, descriptive gameplay."
    },
    {
      "word": "Sequel",
      "difficulty": "easy",
      "description": "Sequel is a useful Movie Night reference for fast team guessing rounds."
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
      "description": "Trail Map is a clueable term relevant to Adventure Trip."
    },
    {
      "word": "Compass",
      "difficulty": "easy",
      "description": "Compass is commonly used in Adventure Trip themed clues."
    },
    {
      "word": "Zipline",
      "difficulty": "easy",
      "description": "Zipline fits the Adventure Trip category for quick, descriptive gameplay."
    },
    {
      "word": "Canyon",
      "difficulty": "easy",
      "description": "Canyon fits the Adventure Trip category for quick, descriptive gameplay."
    },
    {
      "word": "Base Camp",
      "difficulty": "hard",
      "description": "Base Camp is a useful Adventure Trip reference for fast team guessing rounds."
    },
    {
      "word": "Rope Bridge",
      "difficulty": "easy",
      "description": "Rope Bridge is a useful Adventure Trip reference for fast team guessing rounds."
    },
    {
      "word": "Wild Camp",
      "difficulty": "easy",
      "description": "Wild Camp fits the Adventure Trip category for quick, descriptive gameplay."
    },
    {
      "word": "Hiking Boots",
      "difficulty": "easy",
      "description": "Hiking Boots fits the Adventure Trip category for quick, descriptive gameplay."
    },
    {
      "word": "Summit",
      "difficulty": "hard",
      "description": "Summit is a useful Adventure Trip reference for fast team guessing rounds."
    },
    {
      "word": "Night Safari",
      "difficulty": "easy",
      "description": "Night Safari is commonly used in Adventure Trip themed clues."
    }
  ]
};
