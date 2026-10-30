// Authored mysteries. Vocabulary entries are references to data.js, not AI output.
const fact = (id, title, text, words, rule, requires = []) => ({ id, title, text, words: words.split('|'), rule, requires });
const lead = (id, name, question, icon, facts) => ({ id, name, question, icon, facts });
const person = (name, role, profile) => ({ name, role, profile });
export const CASES = {
    bank: {
        title: 'The Midnight Transfer', location: 'Cedar Bank', icon: '🏦', focus: 'Stolen credentials · access and money trails',
        intro: 'At 00:10, a payment left Cedar Bank without a valid business reason. Eli’s account approved it, but an account name is not proof of who used it. Identify the organiser, the approval method and the destination account.',
        people: [person('Nandi','Branch manager','Controls payment procedures and shares the secure office.'),person('Eli','IT technician','Maintains the network; the approval account bears his name.'),person('Mira','Senior teller','Uses the shared office desk during closing checks.'),person('Jon','External auditor','Has temporary permission to inspect approval exports.'),person('Sana','Courier','Uses the shared desk for deliveries, with escorted access.'),person('Theo','Security guard','Records access and patrols the building.')],
        methodQuestion: 'How was the payment approved?', methods: ['At a branch terminal','With copied remote credentials','By an automatic malware instruction'],
        destinationQuestion: 'Where did the money go?', destinations: ['A personal account','The charity account','A dormant supplier account'], solution: { suspect: 0, method: 1, destination: 2 },
        hint: 'Separate the account owner from the person who could export it. Then compare the network route with the payee restrictions.',
        reveal: ['Nandi organised the transfer. The office trace and shared-desk record narrow access; the export permissions distinguish her from Mira. Eli owned the account, but that does not make him the operator.','The approval was manual, yet no branch terminal sent it. Those two records together establish copied remote credentials rather than a local approval or automatic malware.','The receiving account was neither personal nor charitable. The supplier ledger and remote-payment restriction identify the dormant supplier account.'],
        leads: [
            lead('access','Access records','Who could prepare the diversion?','🔑',[
                fact('a1','Secure-office trace','Preparation happened inside the secure office before 20:00. Only Nandi, Eli, Mira and Jon entered during that window.','Key Card|Security Guard|Biometric Authentication|Surveillance',{suspect:[0,1,2,3]}),
                fact('a2','Shared-desk record','The organiser used the shared desk. Its signed usage record contains Nandi, Mira and Sana; the others used separate workstations.','Notebook|Receptionist|Fingerprint|Case Docket',{suspect:[0,2,4]}),
                fact('a3','Export permissions','A copied remote approval requires an approval export. Of these suspects, only Nandi and Jon had that permission. Owning an IT account did not grant it.','Password|USB|Encryption|Two-factor Authentication',{all:[{if:{method:1},then:{suspect:[0,3]}},{if:{method:1},then:{destination:[0,2]}}]}),
                fact('a4','Adapter examination','A fresh setup adapter links the organiser to Nandi, Jon or Theo. It rules out Eli, Mira and Sana.','Evidence Bag|Scanner|Forensic Accountant|Chain of Custody',{suspect:[0,3,5]},['n2'])
            ]),
            lead('network','Network trail','Was the account used in person?','💻',[
                fact('n1','Manual approval','The approval needed a person to confirm it. The automatic malware route did not execute. A branch terminal or copied remote credentials remain possible.','Laptop|Mouse|Malware|Cybersecurity',{method:[0,1]}),
                fact('n2','Origin of the session','No branch terminal sent the approval. It came through a remote route, either copied credentials or an automated instruction.','Wi-Fi|Internet|Firewall|Internet Privacy',{method:[1,2]}),
                fact('n3','Remote payee restriction','Copied remote credentials could reach a charity or supplier account. Personal accounts required a separate in-person check.','Email|Banker|Phishing|Financial Analyst',{if:{method:1},then:{destination:[1,2]}}),
                fact('n4','Human confirmation log','The recovered confirmation log independently rules out automatic malware. It records a deliberate approval.','Keyboard|Notification|Operating System|Source Code',{method:[0,1]},['a1'])
            ]),
            lead('money','Money trail','Which account received the payment?','🧾',[
                fact('m1','Beneficiary receipt','The receiving account was not personal. The charity and dormant supplier accounts are the remaining possibilities.','Wallet|Bank Heist|Money Laundering|Fraud',{destination:[1,2]}),
                fact('m2','Registered payee','The receiving account is not the charity account. Its registry leaves a personal or dormant supplier account.','Auditor|Printer|Whistleblower|Small Print',{destination:[0,2]}),
                fact('m3','Supplier access list','If the dormant supplier account was used, its required payee access limits the organiser to Nandi, Eli or Sana.','Accountant|Safe|Insider Trading|Trust Fund',{if:{destination:2},then:{suspect:[0,1,4]}}),
                fact('m4','Supplier payment route','The supplier account accepted only copied remote approvals. This approval channel also blocked the charity payee. Those are independent checks on both the route and destination.','Vault|Download|Cloud Computing|Blockchain',{all:[{if:{destination:2},then:{method:[1]}},{if:{method:1},then:{destination:[0,2]}}]},['n1'])
            ])
        ]
    },
    museum: {
        title: 'The Four-Minute Gallery', location: 'The Bellweather Museum', icon: '🖼️', focus: 'A misleading clock · a replica and a loading trail',
        intro: 'A blackout from 21:00 to 21:04 exposed a replica in place of a valuable painting. The alarm sounded when power returned at 21:05. The gallery wall clock is four minutes slow. Work out who removed the original, when the switch happened and where the canvas was hidden. An alarm time is not necessarily a theft time.',
        people: [person('Mara','Curator','Prepared the gallery and its opening records.'),person('Theo','Gallery guard','Patrolled the gallery during the preparation window.'),person('Lina','Conservator','Works with frames, pigments and restoration equipment.'),person('Jules','Courier','Handles transport and can open approved packing materials.'),person('Ash','Donor','Inspected the frame with staff before the event.'),person('Nova','Photographer','Photographed the preparation and the public opening.')],
        methodQuestion: 'When was the original removed?', methods: ['Before the blackout','During the blackout','After the alarm'],
        destinationQuestion: 'Where is the original?', destinations: ['In the courier van','Inside a restoration crate','In a rooftop cache'], solution: {suspect:2,method:0,destination:1},
        hint: 'Correct the wall-clock time before trusting the discovery time. An unbroken seal can be more useful than a dramatic eyewitness account.',
        reveal: ['Lina had both preparation-window access and access to the pigment bench. Comparing those independent records excludes every other suspect.','The photograph’s wall-clock time of 21:00 is really 21:04, before the 21:05 alarm. The replica was already present, yet the frame never opened during the blackout. The original was removed before the lights failed.','The street exit was not used, and the recovered wrapping excludes a rooftop cache. The original remained inside the restoration crate. The pre-blackout inspection gap corroborates that route.'],
        leads: [
            lead('clock','Timeline','When did the replica actually arrive?','🕰️',[
                fact('t1','Corrected sighting','Nova’s flash photo shows the replica already hanging. The wall clock in the photo reads 21:00; that clock is four minutes slow. The verified alarm log reads 21:05.','Wall Clock|Alarm Clock|Correlation|Latency',{method:[0,1]}),
                fact('t2','Frame pressure sensor','The frame sensor records its seal continuously closed from 21:00 through 21:04. The original cannot be removed without breaking that seal; the alarm sounds at 21:05.','Light Bulb|Battery|Timer Switch|Control Group',{method:[0,2]}),
                fact('t3','Early frame permission','Before the blackout, only Lina and Jules could open the frame without disturbing its preparation seal.','Padlock|Keyhole|Museum Curator|Chain of Custody',{if:{method:0},then:{suspect:[2,3]}}),
                fact('t4','Independent camera record','The independently timed camera shows an uninterrupted, closed frame throughout the blackout. Opening the frame would be visible in that view.','Photographer|Webcam|Pixel|Resolution',{method:[0,2]},['x1'])
            ]),
            lead('workshop','Restoration room','Who had both access and tools?','🎨',[
                fact('x1','Preparation access','Only Mara, Theo, Lina and Nova were in the preparation area during the removal window.','Portrait|Sculpture|Chiaroscuro|Still Life',{suspect:[0,1,2,5]}),
                fact('x2','Pigment-bench trace','The remover used the pigment bench. Only Lina, Jules and Ash used that bench that evening.','Mona Lisa|Mural|Etching|Fresco',{suspect:[2,3,4]}),
                fact('x3','Van loading permission','A removal into the courier van would have required Jules to be responsible: nobody else had access to its sealed compartment.','Courier|Suitcase|Logistician|Warehouse Manager',{if:{destination:0},then:{suspect:[3]}}),
                fact('x4','Floor-mat impression','The removal trace fits Mara, Lina or Ash. Theo, Jules and Nova are excluded by the restoration-room mat.','Doormat|Forensics|Fingerprint|Circumstantial Evidence',{suspect:[0,2,4]},['t1'])
            ]),
            lead('cargo','Packing trail','Did the painting leave the building?','📦',[
                fact('c1','Street-exit seal','The original did not pass through the street exit. It must be in the restoration crate or rooftop cache, not the van.','Gate|Security Camera|Search and Seizure|Admissible Evidence',{destination:[1,2]}),
                fact('c2','Canvas wrapping','The original’s wrapping stayed under cover. The courier van or restoration crate fit; the exposed rooftop cache does not.','Blanket|Umbrella|Silica Gel|Furniture Polish',{destination:[0,1]}),
                fact('c3','Inspection gap','For a removal before the blackout, only the restoration crate had an unchecked route out of the frame area.','Luggage Tag|Packing Cubes|Reasonable Doubt|Case Docket',{if:{method:0},then:{destination:[1]}}),
                fact('c4','Loading-bay weight','The van’s sealed load weight excludes the canvas. A crate or rooftop hiding place remains. The crate seal was already closed before the alarm, ruling out an after-alarm removal into it.','Platform|Hand Luggage|Balance of Probabilities|Burden of Proof',{all:[{destination:[1,2]},{if:{destination:1},then:{method:[0,1]}}]},['t2'])
            ])
        ]
    },
    train: {
        title: 'The Night Train Exchange', location: 'The Meridian sleeper', icon: '🚆', focus: 'A moving train · restricted routes and a hidden parcel',
        intro: 'At the far station, a sealed document parcel was missing from the sleeper. It was last checked during loading. Identify who moved it, how it crossed a locked carriage boundary and where it remains on board.',
        people:[person('Mara','Station courier','Delivered the parcel before departure.'),person('Eli','Ticket inspector','Checks tickets through the passenger carriages.'),person('Jon','Conductor','Holds carriage keys and supervises the journey.'),person('Nova','Platform assistant','Finished loading before the train departed.'),person('Sana','Steward','Moves linen and refreshments between carriages.'),person('Theo','Porter','Handles passengers’ bags and the service hatch.')],
        methodQuestion:'How did the parcel cross the boundary?',methods:['A platform handoff','Across the carriage roof','Through the service hatch'],destinationQuestion:'Where is the parcel?',destinations:['The linen locker','The guard’s van','A rooftop box'],solution:{suspect:4,method:2,destination:0},
        hint:'Treat the train as a map. First establish which routes were physically available while moving, then compare the people allowed to use them.',
        reveal:['The mover was on board and used the uniformed-service route. The service-hatch permission then separates Sana from Jon; the independent check of Jon’s location agrees.','The pressure mat places the exchange at 02:17, between the two station stops. A platform handoff was unavailable. Every roof-access seal remained intact, leaving the service hatch.','The parcel left the guard’s van but never reached an outside rooftop route. The linen locker is the remaining destination; its access record corroborates Sana.'],
        leads:[
            lead('people','Passenger trail','Who remained on board?','🎫',[
                fact('p1','Departure check','The mover stayed on the train after departure. Only Eli, Jon, Sana and Theo did so; Mara and Nova remained at the station.','Train Conductor|Ticket Inspector|Standby Passenger|No-show',{suspect:[1,2,4,5]}),
                fact('p2','Uniformed-service route','The mover used a route assigned to Mara, Jon and Sana. Other suspects had no permission for that route.','Key Card|Cabin Crew|Codeshare|Interline Agreement',{suspect:[0,2,4]}),
                fact('p3','Hatch access','If the service hatch was used, its release could be operated only by Sana or Theo.','Doorstop|Deadbolt|Stud Finder|Allen Key',{if:{method:2},then:{suspect:[4,5]}}),
                fact('p4','Independent ticket check','Eli and Jon were both recorded away from the exchange. The mover was Mara, Nova, Sana or Theo.','Witness|Notebook|Admissible Evidence|Hearsay',{suspect:[0,3,4,5]},['r2'])
            ]),
            lead('route','Carriage route','Which route could work while moving?','🚪',[
                fact('r1','Continuous journey','The parcel’s pressure mat drops at 02:17. Station records show stops at 02:00 and 02:30, with no stop between them. The route plan allows a platform handoff only while stopped at a platform.','Locomotive|Bullet Train|Cruising Altitude|Nautical Mile',{method:[1,2]}),
                fact('r2','Roof seals','Every roof-hatch seal number matches at departure and arrival. The carriage plan confirms that all roof access requires opening one of those hatches.','Combination Lock|Padlock|Chain of Custody|Surveillance',{method:[0,2]}),
                fact('r3','Rooftop-box route','The roof route and rooftop box connect only to each other: a roof transfer must end in that box, and that box can only be reached by a roof transfer.','Luggage Tag|Overhead Bin|Embarkation|Disembarkation',{all:[{if:{destination:2},then:{method:[1]}},{if:{method:1},then:{destination:[2]}}]}),
                fact('r4','Interior scuff check','Interior drag marks were made while the train was moving. They independently exclude a platform handoff, leaving the roof and service-hatch methods.','Flashlight|Screwdriver|Expert Witness|Circumstantial Evidence',{method:[1,2]},['p1'])
            ]),
            lead('parcel','Parcel trail','Which compartment could conceal it?','🧺',[
                fact('d1','Guard’s-van inventory','The parcel left the guard’s van. The linen locker and rooftop box remain possible hiding places.','Suitcase|Lost Luggage|Warehouse Manager|Logistician',{destination:[0,2]}),
                fact('d2','Interior wrapping','The recovered wrapping proves the parcel stayed inside the train. It could be in the linen locker or guard’s van, but not on the roof.','Blanket|Laundry Basket|Silica Gel|Insulation Tape',{destination:[0,1]}),
                fact('d3','Hatch outlet','A service-hatch exchange could feed only the linen locker or guard’s van, never the rooftop box.','Seat Pocket|Carry-on|Transit Lounge|Port Side',{if:{method:2},then:{destination:[0,1]}}),
                fact('d4','Linen-locker keys','The linen-locker key procedure limits its use to Jon or Sana. The guard’s van was separately sealed for opening only by station staff Mara or Nova.','Keychain|Hanger|Case Docket|Legal Precedent',{all:[{if:{destination:0},then:{suspect:[2,4]}},{if:{destination:1},then:{suspect:[0,3]}}]},['r1'])
            ])
        ]
    },
    observatory: {
        title:'The False Signal',location:'Kestrel Observatory',icon:'🔭',focus:'A false discovery · calibration and original records',
        intro:'A spectacular meteor claim was announced, then the original observation record vanished from the archive. The instrument manual explains three possible faults and how each changes what the telescope reports. Find who altered the result, which fault they introduced and where the untouched record was kept.',
        people:[person('Nova','Astronomer','Runs observations and can access the control console.'),person('Iris','Guide','Uses a maintenance desk while preparing visitors’ tours.'),person('Felix','Journalist','Records interviews, not telescope maintenance.'),person('Ash','Engineer','Services the instrument and its calibration panel.'),person('Remy','Research student','Has supervised access to the console and calibration panel.'),person('Kit','Technician','Uses the control console and maintenance desk.')],
        methodQuestion:'What was altered?',methods:['The lens was covered','The calibration profile was reversed','The recorded pixels were edited'],destinationQuestion:'Where is the untouched record?',destinations:['The control server','The public feed','The service laptop'],solution:{suspect:3,method:1,destination:2},
        hint:'Compare two independent checks: whether the stars are visible, and whether the pixels changed. A wrong calibration can misinterpret a perfectly genuine image.',
        reveal:['The console and maintenance-desk records leave Ash or Kit. Calibration-panel permissions identify Ash; Kit’s separate location check corroborates the conclusion.','A covered lens would lose the reference stars, but they are present. Pixel checksums also match, excluding edited images. The calibration profile was reversed, making stationary sensor noise look like a meteor.','The untouched record was neither retained on the control server nor uploaded to the public feed. The service laptop held the original automatic maintenance copy.'],
        leads:[
            lead('staff','Maintenance access','Who could touch the relevant controls?','🛠️',[
                fact('s1','Console sign-in','The alteration required console access held by Nova, Ash, Remy or Kit.','Scientist|Keyboard|Researcher|Lab Technician',{suspect:[0,3,4,5]}),
                fact('s2','Maintenance-desk trace','The responsible person also used the maintenance desk. Only Iris, Ash and Kit did so that evening.','Notebook|Printer|Technical Writer|Case Docket',{suspect:[1,3,5]}),
                fact('s3','Calibration-panel permission','If the calibration profile was reversed, the calibration-panel permission limits the operator to Ash or Remy.','Rainbow|Magnet|Correlation|Hypothesis',{if:{method:1},then:{suspect:[3,4]}}),
                fact('s4','Independent location check','The recorded location excludes Iris and Kit at the alteration time, leaving Nova, Felix, Ash or Remy.','Witness|Video Call|Surveillance|Expert Witness',{suspect:[0,2,3,4]},['i2'])
            ]),
            lead('instrument','Instrument tests','What would each kind of fault change?','🔬',[
                fact('i1','Reference-star check','The instrument manual says a covered lens removes all three reference stars. The saved observation still contains all three stars in their proper positions.','Telescope|Star|Refraction|Control Group',{method:[1,2]}),
                fact('i2','Raw-pixel checksum','The raw image checksum is identical to the sealed calibration copy, bit for bit. The manual states that rewriting even one recorded pixel changes that checksum.','Camera|Hard Drive|Pixel|Scientific Method',{method:[0,1]}),
                fact('i3','Calibration-change signature','A reversed calibration profile with this tool could be authorised only by Nova or Ash. Its local-record route cannot leave the untouched file on the public feed.','Satellite|GPS|Geostationary Orbit|Latency',{all:[{if:{method:1},then:{suspect:[0,3]}},{if:{method:1},then:{destination:[0,2]}}]}),
                fact('i4','Independent reference frame','The independent image recorder shows the reference stars throughout. A covered lens is excluded; a reversed calibration profile or edited pixels remain.','USB|Download|Encryption|Peer Review',{method:[1,2]},['s1'])
            ]),
            lead('archive','Archive trail','Where did the genuine record survive?','💾',[
                fact('o1','Control-server manifest','The untouched record is absent from the control server. The public feed or service laptop must hold it.','Laptop|Upload|Cloud Computing|Cache',{destination:[1,2]}),
                fact('o2','Public-feed receipt','The public feed never received the untouched record. It must be on the control server or service laptop.','Internet|Notification|Bandwidth|Open Source',{destination:[0,2]}),
                fact('o3','Calibration backup','For a reversed calibration profile, the control server’s backup route is read-only. The untouched file can survive only through the public-feed handoff or service laptop.','Battery|Charger|Operating System|Debugging',{if:{method:1},then:{destination:[1,2]}}),
                fact('o4','Laptop custody','A service-laptop original limits responsibility to Nova, Ash or Kit. That laptop’s processing route can produce a lens or calibration fault, but cannot rewrite recorded pixels.','Backpack|Security Guard|Chain of Custody|Cybersecurity',{all:[{if:{destination:2},then:{suspect:[0,3,5]}},{if:{destination:2},then:{method:[0,1]}}]},['i1'])
            ])
        ]
    },
    encore: {
        title:'The Silent Encore',location:'The Sundown Festival',icon:'🎧',focus:'A switched recording · custody, signal and freight',
        intro:'The festival’s unique encore recording cannot be found. The case delivered to the producer plays only silence. Several people signed handover slips, but signing for a case does not prove who opened it. Identify who made the substitution, how they did it and where the original drive was hidden.',
        people:[person('Mira','Singer','Checked the fragile-media table before the show.'),person('Jules','DJ','Joined the final handover and load-out.'),person('Lina','Sound engineer','Checked fragile media and ran the sound desk.'),person('Theo','Stagehand','Loaded cases and can open the drum case.'),person('Ash','Label representative','Attended the final handover and holds backup access.'),person('Kit','Tour manager','Handles fragile media, backup custody and the band’s cases.')],
        methodQuestion:'How was the recording lost?',methods:['The backup drive was switched','The sound desk was muted','The master file was edited'],destinationQuestion:'Where is the original drive?',destinations:['The lighting case','The drum case','The dispatch van'],solution:{suspect:5,method:0,destination:1},
        hint:'A missing recording can come from the wrong device rather than bad sound. Compare the signal checks with the physical handover chain.',
        reveal:['The final handover and fragile-media records intersect at Kit. The backup-custody and drum-case procedures provide an independent route to the same conclusion.','The sound desk remained live, and the master file’s checksum is unchanged. Muting and editing are excluded, leaving a switched backup drive.','The dispatch van’s inventory excludes the original, and the lighting-case scan excludes that container. Kit hid the original in the drum case.'],
        leads:[
            lead('custody','Handover chain','Who handled both the media and load-out?','🤝',[
                fact('h1','Final handover','The responsible person attended the final handover: Jules, Theo, Ash and Kit did; Mira and Lina did not.','Courier|Security Camera|Chain of Custody|Gaffer',{suspect:[1,3,4,5]}),
                fact('h2','Fragile-media trace','The substitution involved the fragile-media table. Only Mira, Lina and Kit used that table.','Headphones|Radio Host|Master Recording|Vinyl',{suspect:[0,2,5]}),
                fact('h3','Backup-custody rule','If the backup drive was switched, its custody rules limit responsibility to Ash or Kit. That sealed backup route could reach the drum case or van, but never the lighting case.','USB|Hard Drive|Royalties|Forensic Accountant',{all:[{if:{method:0},then:{suspect:[4,5]}},{if:{method:0},then:{destination:[1,2]}}]}),
                fact('h4','Independent receipt','The media receipt independently places responsibility among Jules, Ash and Kit, excluding the other three suspects.','Printer|Pen|Ghostwriter|Small Print',{suspect:[1,4,5]},['a2'])
            ]),
            lead('audio','Signal checks','Did sound, file or device fail?','🎚️',[
                fact('a1','Live desk recording','The desk monitor recorded the full live encore, including the vocals and timing clicks. The desk manual says its mute switch would silence that monitor too.','DJ|Keyboard|Synthesizer|Sampling',{method:[0,2]}),
                fact('a2','Master-file checksum','The master file’s checksum matches the sealed pre-show copy exactly. The recording procedure states that editing its contents changes that checksum.','Download|Laptop|Encryption|Source Code',{method:[0,1]}),
                fact('a3','Physical-drive requirement','An original hidden in the drum case requires the drive-switch method. Muting or editing would not remove the physical original into that case.','Trumpet|Guitar|Bass Guitar|Session Musician',{if:{destination:1},then:{method:[0]}}),
                fact('a4','Independent desk monitor','An independent monitor recording shows the desk was never muted. A switched drive or edited file remain possible.','Password|Scanner|Operating System|Open Source',{method:[0,2]},['h1'])
            ]),
            lead('freight','Case inventory','Which container left with the original?','🚚',[
                fact('f1','Van inventory','The dispatch van’s sealed inventory contains no original drive. The lighting case or drum case remains possible.','Luggage Tag|Suitcase|Warehouse Manager|Logistician',{destination:[0,1]}),
                fact('f2','Lighting-case scan','The lighting case was scanned empty of media. The drum case or dispatch van remains possible.','Flashlight|Light Bulb|Dimmer Switch|Lighting Technician',{destination:[1,2]}),
                fact('f3','Backup-trolley route','A switched backup could reach only the lighting case or drum case on the enclosed trolley route, not the dispatch van.','Carry-on|Combination Lock|Embarkation|Disembarkation',{if:{method:0},then:{destination:[0,1]}}),
                fact('f4','Drum-case procedure','If the original is in the drum case, only Theo or Kit could have placed it there under its access procedure.','Keychain|Padlock|Prop Master|Case Docket',{if:{destination:1},then:{suspect:[3,5]}},['a1'])
            ])
        ]
    }
};
export const CASE_IDS = Object.keys(CASES);
export function caseFacts(id) { return CASES[id].leads.flatMap(source => source.facts.map(item => ({ ...item, leadId: source.id }))); }
export function availableFacts(id, found = [], leadId) { return caseFacts(id).filter(item => (!leadId || item.leadId === leadId) && !found.includes(item.id) && item.requires.every(key => found.includes(key))); }
export function matchesRule(theory, rule) {
    if (rule.all) return rule.all.every(item => matchesRule(theory,item));
    if (rule.if) return !Object.entries(rule.if).every(([field,value]) => theory[field] === value) || matchesRule(theory,rule.then);
    return Object.entries(rule).every(([field,values]) => values.includes(theory[field]));
}
export function matchingTheories(id, found = []) {
    const facts = caseFacts(id).filter(item => found.includes(item.id)), result = [];
    for(let suspect=0;suspect<CASES[id].people.length;suspect++)for(let method=0;method<3;method++)for(let destination=0;destination<3;destination++) {
        const theory={suspect,method,destination};if(facts.every(item=>matchesRule(theory,item.rule)))result.push(theory);
    } return result;
}
