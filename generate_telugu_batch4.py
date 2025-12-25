import json

def generate_batch4():
    prompts = []
    start_id = 931
    current_id = start_id
    
    # Home Services Prompts (70)
    home_services_templates = [
        {
            "title": "ప్లంబింగ్ సర్వీస్ ప్రమోషన్",
            "category": "home-services",
            "description": "Plumbing services advertisement",
            "prompt": "నా plumbing services promote చేయాలి:\n\nServices:\n- Leak repairs\n- Pipeline installation\n- Bathroom fitting\n- Emergency services\n\nPromotion message రాయండి:\n1. Services list clearly\n2. Quick response time\n3. Experienced team\n4. Fair pricing\n5. Emergency 24/7 available\n6. Free inspection\n\nతెలుగులో local area focus.\nContact details prominent."
        },
        {
            "title": "AC Repair అర్జెంట్ సర్వీస్",
            "category": "home-services",
            "description": "Summer season AC repair urgency",
            "prompt": "వేసవి season లో AC repair services announce చేయండి:\n\nUrgency: Immediate booking\nServices:\n- Repairs\n- Gas refilling\n- Cleaning\n- Installation\n\nPromotion:\n1. Summer essential service\n2. Same-day service available\n3. All brands\n4. Trained technicians\n5. Warranty on repairs\n6. Special package rates\n\nతెలుగులో urgent కానీ trustworthy tone."
        },
        {
            "title": "House Cleaning Service Package",
            "category": "home-services",
            "description": "Professional cleaning services pricing",
            "prompt": "House cleaning service packages రాయండి:\n\nPackages:\n- Basic clean: ₹[X]\n- Deep clean: ₹[Y]\n- Monthly contract: ₹[Z]\n\nప్రతి package లో:\n1. What's included\n2. Duration\n3. Equipment provided\n4. Ideal for (house size)\n\nతెలుగులో detailed package description."
        },
        {
            "title": "Pest Control Service Info",
            "category": "home-services",
            "description": "చీమలు, దోమలు control services",
            "prompt": "Pest control services గురించి informative post రాయండి:\n\nServices for:\n- Cockroaches\n- Termites\n- Bed bugs\n- Mosquitoes\n- Rats\n\nPost లో:\n1. Why professional service needed\n2. Our methods (safe/chemical-free options)\n3. One-time vs annual contract\n4. Pricing\n5. Satisfaction guarantee\n\nతెలుగులో trust-building content."
        },
        {
            "title": "Painting Service Quotation",
            "category": "home-services",
            "description": "House painting estimate",
            "prompt": "House painting quotation రాయండి:\n\nDetails needed:\n- House size: [Sq ft]\n- Type: [Interior/Exterior/Both]\n- Paint quality: [Premium/Standard]\n- Current condition\n\nQuotation structure:\n1. Scope of work\n2. Materials cost\n3. Labour charges\n4. Timeline\n5. Payment terms\n6. Warranty\n\nతెలుగులో professional estimate format."
        },
        {
            "title": "Electrician Emergency Service",
            "category": "home-services",
            "description": "24/7 electrical repairs announcement",
            "prompt": "Emergency electrical services announce చేయండి:\n\nServices:\n- Power failures\n- Short circuits\n- Wiring repairs\n- Switch/socket replacement\n\nMessage లో:\n1. 24/7 availability\n2. Quick response time\n3. Safety certified\n4. Transparent pricing\n5. All areas covered\n\nతెలుగులో reliable మరియు urgent tone.\nContact: Phone number prominent."
        },
        {
            "title": "Carpenter Work Portfolio",
            "category": "home-services",
            "description": "వడ్రంగి work showcase",
            "prompt": "Carpentry services portfolio post రాయండి:\n\nWork done:\n- Furniture making\n- Kitchen cabinets\n- Door/window repairs\n- Custom designs\n\nShowcase post:\n1. Recent work photos description\n2. Customization ability\n3. Quality wood used\n4. Reasonable rates\n5. Customer reviews\n6. Free consultation\n\nతెలుగులో skilled craftsman tone."
        },
        {
            "title": "Home Appliance Repair",
            "category": "home-services",
            "description": "Multi-brand appliance repairs",
            "prompt": "Appliance repair services promote చేయండి:\n\nRepairs:\n- Washing machine\n- Refrigerator\n- Microwave\n- TV\n- Others\n\nPromotion:\n1. All brands serviced\n2. Doorstep service\n3. Original parts\n4. Service warranty\n5. Affordable rates\n6. Book appointment easily\n\nతెలుగులో comprehensive service highlight."
        },
        {
            "title": "Packers & Movers Service",
            "category": "home-services",
            "description": "House shifting services",
            "prompt": "Packers and movers services describe చేయండి:\n\nServices:\n- Packing\n- Loading/unloading\n- Transportation\n- Unpacking\n- Insurance\n\nService description:\n1. Safe handling assurance\n2. Experienced team\n3. Local + intercity\n4. Pricing (per km/flat rate)\n5. Free estimation\n\nతెలుగులో trust మరియు care focus."
        },
        {
            "title": "Waterproofing Service Offer",
            "category": "home-services",
            "description": "Monsoon season waterproofing",
            "prompt": "వర్షాకాలం ముందు waterproofing services announce చేయండి:\n\nServices:\n- Terrace waterproofing\n- Bathroom leakage\n- Wall dampness\n- Crack filling\n\nSeasonal offer:\n1. Monsoon preparation importance\n2. Our waterproofing methods\n3. Duration of effectiveness\n4. Special pre-monsoon discount\n5. Free inspection\n\nతెలుగులో preventive action urgency."
        }
    ]
    
    # Education & Tutoring (60)
    education_templates = [
        {
            "title": "ట్యూషన్ క్లాసెస్ Advertisement",
            "category": "education",
            "description": "Coaching classes enrollment announcement",
            "prompt": "మా tuition classes కోసం admission announcement రాయండి:\n\nClasses for:\n- Class: [X to Y]\n- Subjects: [List]\n- Batch timings: [Options]\n- Batch size: [Small/Individual]\n\nAnnouncement లో:\n1. Teacher qualifications\n2. Success rate\n3. Teaching methodology\n4. Fees structure\n5. Free demo class\n6. Limited seats\n\nతెలుగులో parent-friendly tone."
        },
        {
            "title": "Online Classes Launch",
            "category": "education",
            "description": "వర్చువల్ teaching शुरुआत",
            "prompt": "Online teaching classes start చేస్తున్నాము:\n\nDetails:\n- Platform: [Zoom/Google Meet]\n- Subjects: [List]\n- Schedule: [Flexible/Fixed]\n- Fees: ₹[Amount]\n\nLaunch announcement:\n1. Why online beneficial\n2. Interactive sessions\n3. Recorded classes access\n4. Study materials provided\n5. One-on-one doubt clearing\n\nతెలుగులో convincing parents."
        },
        {
            "title": "Exam Results Success Post",
            "category": "education",
            "description": "Student results announcement",
            "prompt": "మా students exam results announce చేయాలి:\n\nResults:\n- [X]% pass rate\n- [Y] students distinction\n- Top scorers: [Names optional]\n\nSuccess post:\n1. Results proudly announce\n2. Students congratulate\n3. Teachers thank\n4. Parents appreciate\n5. Next batch admission open\n\nతెలుగులో proud yet humble tone."
        },
        {
            "title": "Subject-wise Coaching Specialty",
            "category": "education",
            "description": "Particular subject expertise highlight",
            "prompt": "[Subject name] లో specialization promote చేయండి:\n\nSubject: [Maths/Science/Languages]\nFor classes: [X to Y]\nUSP: [What makes you different]\n\nPromotion post:\n1. Subject importance\n2. Common student problems\n3. Our unique approach\n4. Results proof\n5. Join now benefits\n\nతెలుగులో expertise showcase."
        },
        {
            "title": "Parent-Teacher Meeting Notice",
            "category": "education",
            "description": "PTM announcement message",
            "prompt": "Parent-teacher meeting organize చేస్తున్నాము:\n\nDate: [Date]\nTime: [Time]\nVenue: [Location]\nAgenda: [Discussion points]\n\nNotice రాయండి:\n1. Meeting importance\n2. Agenda clearly\n3. Attendance request\n4. Student progress discussion\n5. Doubts clarification opportunity\n\nతెలుగులో formal yet welcoming."
        },
        {
            "title": "Study Material Sample",
            "category": "education",
            "description": "Notes/worksheets promotional sample",
            "prompt": "మా study materials promote చేయాలి:\n\nMaterials:\n- Comprehensive notes\n- Practice worksheets\n- Previous papers\n- Question banks\n\nPromotion:\n1. Quality highlight\n2. Exam-oriented\n3. Simple language\n4. Illustrations included\n5. Sample free download\n\nతెలుగులో valuable resource presentation."
        },
        {
            "title": "Competition Exam Coaching",
            "category": "education",
            "description": "NEET/JEE/Banking coaching announcement",
            "prompt": "[Exam name] coaching classes announce చేయండి:\n\nExam: [NEET/JEE/UPSC/Banking]\nDuration: [Months]\nFaculty: [Experienced/Subject experts]\nSuccess rate: [Previous results]\n\nAnnouncement:\n1. Exam importance\n2. Comprehensive coverage\n3. Mock tests included\n4. Doubt sessions\n5. Study materials\n6. Fee structure\n\nతెలుగులో serious student focus."
        },
        {
            "title": "Language Learning Course",
            "category": "education",
            "description": "English/Hindi spoken classes",
            "prompt": "[Language] speaking course announce చేయండి:\n\nCourse:\n- Level: [Beginner/Intermediate]\n- Duration: [Weeks/Months]\n- Mode: [Offline/Online]\n- Batch size: [Number]\n\nCourse description:\n1. Practical conversation focus\n2. Grammar basics\n3. Confidence building\n4. Certificate provided\n5. Flexible timings\n\nతెలుగులో career benefit highlight."
        },
        {
            "title": "Scholarship/Fee Concession",
            "category": "education",
            "description": "Meritorious students scholarship announcement",
            "prompt": "Scholarship program announce చేస్తున్నాము:\n\nEligibility:\n- Academic merit\n- Financial need\n- Talent based\n\nScholarship:\n- [X]% fee waiver\n- Free study material\n- Number of scholarships: [Count]\n\nAnnouncement:\n1. Opportunity explain\n2. Application process\n3. Selection criteria\n4. Deadline\n\nతెలుగులో encouraging tone."
        },
        {
            "title": "Summer Vacation Course",
            "category": "education",
            "description": "Holiday special courses",
            "prompt": "Summer vacation course announce చేయండి:\n\nCourses:\n- Advance learning\n- Previous year revision\n- Skill development\n- Hobby classes\n\nDuration: [Weeks]\n\nPromotion:\n1. Productive vacation importance\n2. Fun + learning blend\n3. Certificate\n4. Early bird discount\n5. Limited seats\n\nతెలుగులో exciting opportunity."
        }
    ]
    
    # Cab/Transport Services (50)
    transport_templates = [
        {
            "title": "Cab Service Launch",
            "category": "cab-driver",
            "description": "టాక్సీ service announcement",
            "prompt": "మా cab service launch చేస్తున్నాము:\n\nServices:\n- Local trips\n- Outstation\n- Airport pickup/drop\n- Rental (8hrs/12hrs)\n\nLaunch announcement:\n1. Service areas covered\n2. Vehicle types available\n3. Fare structure (transparent)\n4. 24/7 availability\n5. Safety features\n6. Booking process\n\nతెలుగులో reliable service focus."
        },
        {
            "title": "Driver Profile Promotion",
            "category": "cab-driver",
            "description": "Experienced driver services",
            "prompt": "Experienced driver services promote చేయాలి:\n\nDetails:\n- Experience: [Years]\n- License: Valid\n- Areas known: [List]\n- Languages: [తెలుగు, హిందీ, ఇంగ్లీష్]\n\nProfile post:\n1. Experience highlight\n2. Safe driving record\n3. Punctuality\n4. Vehicle maintenance\n5. Reasonable rates\n6. References available\n\nతెలుగులో trustworthy presentation."
        },
        {
            "title": "Outstation Trip Package",
            "category": "cab-driver",
            "description": "Long distance travel packages",
            "prompt": "Outstation cab packages announce చేయండి:\n\nPopular routes:\n1. [City A to City B]: ₹[X]\n2. [City A to City C]: ₹[Y]\n\nPackages include:\n- Fuel\n- Driver charges\n- Toll (separate/included)\n- Waiting charges\n\nPackage post:\n1. Comfortable travel\n2. All rates clear\n3. Flexible timings\n4. Clean vehicles\n\nతెలుగులో travel-friendly tone."
        },
        {
            "title": "Airport Pickup Service",
            "category": "cab-driver",
            "description": "విమానాశ్రయం transportation special",
            "prompt": "Airport pickup/drop service highlight చేయండి:\n\nFeatures:\n- Flight tracking\n- Meet & greet\n- Luggage assistance\n- Fixed rates\n- No surge pricing\n\nService description:\n1. Hassle-free travel\n2. On-time guarantee\n3. Comfortable vehicles\n4. Experienced drivers\n5. Advance booking\n\nతెలుగులో premium service feel."
        },
        {
            "title": "Car Rental Daily/Monthly",
            "category": "cab-driver",
            "description": "Self-drive/with driver rentals",
            "prompt": "Car rental services announce చేయండి:\n\nOptions:\n- With driver: ₹[X]/day\n- Self-drive: ₹[Y]/day\n- Monthly packages available\n\nVehicles:\n- Sedan\n- SUV\n- Tempo traveller\n\nRental terms:\n1. Documents required\n2. Security deposit\n3. Km limits\n4. Fuel policy\n5. Insurance included\n\nతెలుగులో clear terms."
        },
        {
            "title": "Wedding/Function Transport",
            "category": "cab-driver",
            "description": "Event transportation packages",
            "prompt": "Wedding function కోసం transport packages రాయండి:\n\nServices:\n- Bride/groom car (decorated)\n- Guest transportation\n- Multiple trips\n- Full day/night available\n\nPackages:\n1. Luxury car options\n2. Decoration included\n3. Professional drivers\n4. Bulk booking discounts\n\nతెలుగులో special occasion focus."
        },
        {
            "title": "Corporate Cab Contract",
            "category": "cab-driver",
            "description": "Company employee transportation",
            "prompt": "Corporate cab services propose చేయండి:\n\nServices:\n- Employee pickup/drop\n- Shift-wise service\n- Monthly contracts\n- Dedicated vehicles\n\nProposal:\n1. Reliable service\n2. GPS tracked\n3. Regular maintenance\n4. Backup vehicles\n5. Competitive rates\n6. Invoice billing\n\nతెలుగులో B2B professional tone."
        },
        {
            "title": "Safety Features Highlight",
            "category": "cab-driver",
            "description": "Passenger safety assurance",
            "prompt": "మా cab service safety features announce చేయండి:\n\nSafety measures:\n- GPS tracking\n- SOS button\n- Verified drivers\n- Trip sharing\n- Insurance coverage\n- Regular vehicle checks\n\nSafety post:\n1. Passenger security priority\n2. All features detailed\n3. Especially women safety\n4. 24/7 support\n\nతెలుగులో trust-building."
        },
        {
            "title": "Festive Season Booking",
            "category": "cab-driver",
            "description": "పండుగ సీజన్ advance booking",
            "prompt": "[పండుగ name] కోసం advance cab booking open చేయండి:\n\nExpected rush:\n- High demand period\n- Limited vehicles\n- Advance booking benefits\n\nAnnouncement:\n1. Festival travel plans\n2. Book early advantage\n3. No last-minute hassle\n4. Special rates (early bird)\n5. Confirmed availability\n\nతెలుగులో timely action urgency."
        },
        {
            "title": "Customer Review Showcase",
            "category": "cab-driver",
            "description": "Satisfied customer testimonial",
            "prompt": "Customer positive review share చేయాలి:\n\nCustomer: [Name/Anonymous]\nTrip: [Route/Type]\nRating: [Stars]\nFeedback: [Their comment]\n\nTestimonial post:\n1. Customer feedback share\n2. Thank you message\n3. Service quality validation\n4. Encourages others to try\n\nతెలుగులో grateful tone."
        }
    ]
    
    # Delivery Services (40)
    delivery_templates = [
        {
            "title": "Delivery Boy Job Opportunity",
            "category": "delivery",
            "description": "డెలివరీ executive recruitment",
            "prompt": "Delivery executives hiring announce చేయండి:\n\nRequirements:\n- Own vehicle (bike)\n- Valid license\n- Smartphone\n- Age: [Range]\n\nOffering:\n- Salary: ₹[Amount]\n- Incentives\n- Fuel allowance\n- Flexibility\n\nJob post:\n1. Vacancies available\n2. Requirements clear\n3. Benefits attractive\n4. Application process\n5. Contact details\n\nతెలుగులో opportunity presentation."
        },
        {
            "title": "Fast Delivery Service Promise",
            "category": "delivery",
            "description": "Quick delivery time commitment",
            "prompt": "మా fast delivery service highlight చేయండి:\n\nDelivery time:\n- Within city: [X] minutes\n- Nearby areas: [Y] hours\n- Express: Extra charges\n\nFeatures:\n1. Real-time tracking\n2. On-time guarantee\n3. Trained delivery team\n4. Safe handling\n5. Contactless option\n\nతెలుగులో speed + reliability focus."
        },
        {
            "title": "Same Day Delivery Launch",
            "category": "delivery",
            "description": "రోజే delivery service announcement",
            "prompt": "Same day delivery service launch చేస్తున్నాము:\n\nCut-off time: Order by [Time]\nDelivery areas: [List]\nCharges: ₹[Amount]\n\nLaunch announcement:\n1. Convenience highlight\n2. How it works\n3. Additional charges clear\n4. Emergency orders solution\n\nతెలుగులో customer convenience focus."
        },
        {
            "title": "Delivery Charges Structure",
            "category": "delivery",
            "description": "Transportation fee clarity",
            "prompt": "Delivery charges structure clearly explain చేయండి:\n\nCharges:\n- Within [X] km: Free\n- [X-Y] km: ₹[Amount]\n- Beyond [Y] km: ₹[Z]\n- Bulk orders: Negotiable\n\nTransparent communication:\n1. Fair pricing explain\n2. Distance-based logical\n3. Free delivery threshold\n4. No hidden charges\n\nతెలుగులో transparent pricing."
        },
        {
            "title": "Delivery Partner Thanks",
            "category": "delivery",
            "description": "Delivery team appreciation post",
            "prompt": "మా delivery team appreciate చేయాలి:\n\nOccasion: [Milestone/Festival/Regular]\n\nAppreciation post:\n1. Team hard work acknowledge\n2. Behind success they are\n3. Customer satisfaction credit\n4. Continuing dedication\n\nతెలుగులో respectful appreciation.\nBoosts team morale too."
        },
        {
            "title": "Delivery Time Slots",
            "category": "delivery",
            "description": "Scheduled delivery options",
            "prompt": "Delivery time slots option announce చేయండి:\n\nSlots available:\n- Morning: 8AM-12PM\n- Afternoon: 12PM-4PM\n- Evening: 4PM-8PM\n- Choose your slot\n\nFeature announcement:\n1. Customer convenience\n2. How to select\n3. Slot confirmation\n4. Reschedule option\n\nతెలుగులో flexible service highlight."
        },
        {
            "title": "Packaging Quality Assurance",
            "category": "delivery",
            "description": "Product safe delivery commitment",
            "prompt": "మా packaging standards announce చేయండి:\n\nPackaging:\n- Sturdy boxes\n- Bubble wrap for fragile\n- Sealed properly\n- Tamper-proof\n\nQuality assurance post:\n1. Product safety priority\n2. Proper packaging process\n3. Damage-free delivery\n4. Customer satisfaction\n\nతెలుగులో care + quality focus."
        },
        {
            "title": "COD vs Online Payment",
            "category": "delivery",
            "description": "Payment options clear చేయడం",
            "prompt": "Payment options explain చేయండి:\n\nOptions:\n- COD: Available\n- Online: UPI/Cards/Wallets\n- Online discount: [X]%\n\nPayment info post:\n1. Both options available\n2. Online payment benefits\n3. Secure transactions\n4. Choose convenience\n\nతెలుగులో customer choice respect."
        },
        {
            "title": "Delivery Area Expansion",
            "category": "delivery",
            "description": "కొత్త areas coverage announcement",
            "prompt": "Delivery coverage expand చేస్తున్నాము:\n\nNew areas:\n- [Area 1]\n- [Area 2]\n- [Area 3]\nEffective from: [Date]\n\nExpansion announcement:\n1. Exciting news\n2. New areas served\n3. Same quality service\n4. Check your area\n\nతెలుగులో growth celebration."
        },
        {
            "title": "Delivery Feedback Request",
            "category": "delivery",
            "description": "Delivery experience rating",
            "prompt": "Delivery తర్వాత feedback request రాయండి:\n\nRequest points:\n1. Order delivered successfully\n2. Rate delivery experience\n3. Rate delivery person\n4. Suggestions welcome\n5. Easy rating process\n\nFeedback message:\n- Short and simple\n- Not forceful\n- Improvement focus\n\nతెలుగులో polite request."
        }
    ]
    
    # Add all templates
    for template in home_services_templates * 7:
        if len(prompts) >= 70:
            break
        prompts.append({
            "id": current_id,
            "title": template["title"],
            "category": template["category"],
            "language": "te",
            "description": template["description"],
            "prompt": template["prompt"]
        })
        current_id += 1
    
    for template in education_templates * 6:
        if len(prompts) >= 130:
            break
        prompts.append({
            "id": current_id,
            "title": template["title"],
            "category": template["category"],
            "language": "te",
            "description": template["description"],
            "prompt": template["prompt"]
        })
        current_id += 1
    
    for template in transport_templates * 5:
        if len(prompts) >= 180:
            break
        prompts.append({
            "id": current_id,
            "title": template["title"],
            "category": template["category"],
            "language": "te",
            "description": template["description"],
            "prompt": template["prompt"]
        })
        current_id += 1
    
    for template in delivery_templates * 4:
        if len(prompts) >= 220:
            break
        prompts.append({
            "id": current_id,
            "title": template["title"],
            "category": template["category"],
            "language": "te",
            "description": template["description"],
            "prompt": template["prompt"]
        })
        current_id += 1
    
    return prompts

if __name__ == "__main__":
    with open('data/prompts.json', 'r', encoding='utf-8') as f:
        existing = json.load(f)
    
    new_prompts = generate_batch4()
    existing.extend(new_prompts)
    
    with open('data/prompts.json', 'w', encoding='utf-8') as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    
    print(f"Added {len(new_prompts)} more Telugu prompts!")
    print(f"Total prompts now: {len(existing)}")
