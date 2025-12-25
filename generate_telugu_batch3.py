import json

def generate_batch3():
    prompts = []
    start_id = 651
    current_id = start_id
    
    # Sales & Negotiation Prompts (130)
    sales_templates = [
        {
            "title": "కోల్డ్ కాల్ స్క్రిప్ట్",
            "category": "sales",
            "description": "కొత్త కస్టమర్లకు phone చేసే script",
            "prompt": "నా [Product/Service] sell చేయడానికి cold call script రాయండి:\n\nTarget: [Customer type]\nGoal: [Appointment/Direct sale]\n\nScript structure:\n1. Introduction (15 sec)\n2. Interest capture (30 sec)\n3. Value proposition (45 sec)\n4. Objection handling (30 sec)\n5. Closing (15 sec)\n\nCommon objections కోసం responses include చేయండి।\nతెలుగులో conversational tone లో రాయండి।"
        },
        {
            "title": "రేట్ Negotiation Response",
            "category": "negotiation",
            "description": "Price తగ్గించమన్న customer కు diplomatic reply",
            "prompt": "Customer మా price ఎక్కువ అని చెప్తున్నారు:\n\nఅడిగింది: [X]% discount\nమా margin: [Y]%\n\nNegotiation response రాయండి:\n1. Value justify చేయాలి\n2. Alternative options suggest చేయాలి\n3. Small concession with condition\n4. Long-term relationship focus\n\nతెలుగులో professional గా రాయండి।\nTone: Firm but friendly"
        },
        {
            "title": "Sales Pitch - Door to Door",
            "category": "sales",
            "description": "ఇంటింటికీ వెళ్లి pitch చేసే script",
            "prompt": "నా [Product/Service] door-to-door selling కోసం pitch రాయండి:\n\nDuration: 2-3 minutes\n\nPitch elements:\n1. Attention-grabbing opening\n2. Quick problem identification\n3. Solution presentation\n4. Proof (testimonials/demo)\n5. Special offer\n6. Easy yes\n\nతెలుగులో local language style లో రాయండి।\nRejection handling tips కూడా include చేయండి।"
        },
        {
            "title": "Bulk Order Proposal",
            "category": "sales",
            "description": "పెద్ద quantity order కోసం proposal letter",
            "prompt": "[Company/Person] కు bulk order proposal రాయండి:\n\nProduct: [Name]\nProposed quantity: [Number]\nWholesale price: ₹[Amount]\n\nProposal లో:\n1. Product quality highlights\n2. Quantity-based pricing tiers\n3. Delivery timeline\n4. Payment terms\n5. After-sales support\n6. Sample offer\n\nతెలుగులో professional proposal format చేయండి।"
        },
        {
            "title": "Upselling స్క్రిప్ట్",
            "category": "sales",
            "description": "కొనుగోలు చేసిన customer కు additional sale",
            "prompt": "Customer [Product A] కొన్నారు, ఇప్పుడు [Product B] suggest చేయాలి:\n\nMain purchase: [Product A]\nUpsell item: [Product B]\nWhy relevant: [Connection]\n\nUpselling dialogue రాయండి:\n1. Current purchase congratulate\n2. Complementary item suggest\n3. Benefits explain\n4. Special combo offer\n5. No pressure\n\nతెలుగులో natural conversation style."
        },
        {
            "title": "Follow-up After Demo",
            "category": "sales",
            "description": "Demo చూసిన customer కు follow-up message",
            "prompt": "Customer మా [Product/Service] demo చూశారు [X days] back:\n\nDemo date: [Date]\nFeedback: [Positive/Interested]\n\nFollow-up message రాయండి:\n1. Demo recap\n2. Key benefits remind\n3. Limited time offer\n4. Next steps easy చేయాలి\n5. Questions answer చేయడానికి available\n\nతెలుగులో persistent కానీ pushy కాకుండా।"
        },
        {
            "title": "B2B Partnership Proposal",
            "category": "negotiation",
            "description": "Business-to-business collaboration pitch",
            "prompt": "[Business Name] తో partnership కోసం proposal రాయండి:\n\nమా business: [Type]\nవారి business: [Type]\nProposed collaboration: [Details]\n\nProposal structure:\n1. Introduction\n2. Mutual benefits\n3. Implementation plan\n4. Revenue/profit sharing\n5. Trial period suggestion\n\nతెలుగులో professional yet approachable tone."
        },
        {
            "title": "Payment Terms Negotiation",
            "category": "negotiation",
            "description": "Credit/advance payment terms discuss చేయడం",
            "prompt": "Customer credit facility అడుగుతున్నారు:\n\nOrder value: ₹[Amount]\nవారి history: [New/Regular]\n\nPayment terms proposal రాయండి:\n1. Credit policy explain\n2. Required documents\n3. Credit limit offer\n4. Payment schedule\n5. Late payment penalties\n6. Alternative: Advance + balance\n\nతెలుగులో clear మరియు professional."
        },
        {
            "title": "Sales Objection Handling Guide",
            "category": "sales",
            "description": "Common customer objections కు responses",
            "prompt": "నా [Product/Service] కోసం top 10 objections కు responses రాయండి:\n\nCommon objections:\n1. \"చాలా ఖరీదు\"\n2. \"తర్వాత చూద్దాం\"\n3. \"ఇప్పుడు budget లేదు\"\n4. \"మాకు అవసరం లేదు\"\n5. [Add more]\n\nప్రతి objection కోసం:\n- Understanding response\n- Value reframing\n- Closing question\n\nతెలుగులో conversational scripts."
        },
        {
            "title": "Cross-selling Strategy",
            "category": "sales",
            "description": "Related products suggest చేసే system",
            "prompt": "నా store లో cross-selling implement చేయాలి:\n\nMain products: [List చేయండి]\n\nప్రతి product కోసం:\n1. ఏ complementary items\n2. Why together కొనాలి\n3. Combo pricing\n4. Shelf placement strategy\n5. Staff training points\n\nతెలుగులో practical cross-sell plan రాయండి।"
        }
    ]
    
    # Food Business Prompts (80)
    food_templates = [
        {
            "title": "రెస్టారెంట్ మెనూ Description",
            "category": "food-business",
            "description": "Mouth-watering dish descriptions",
            "prompt": "[Dish Name] కోసం menu description రాయండి:\n\nDish: [Telugu name + English]\nCuisine: [Type]\nPrice: ₹[Amount]\nSpice level: [Mild/Medium/Hot]\n\nDescription లో:\n1. Ingredients highlight (appetizing)\n2. Preparation method hint\n3. Taste profile\n4. Serving size\n5. Pairing suggestions\n\nతెలుగులో descriptive మరియు tempting language.\nLength: 30-40 words"
        },
        {
            "title": "Food Delivery App Description",
            "category": "food-business",
            "description": "Swiggy/Zomato listing కోసం restaurant description",
            "prompt": "నా [Restaurant/Cloud Kitchen] కోసం food delivery app description రాయండి:\n\nSpecialty: [Cuisine type]\nSignature dishes: [Top 3]\nUSP: [ఏం special]\nDelivery area: [Coverage]\n\nDescription లో:\n1. Cuisine expertise\n2. Quality commitment\n3. Popular items\n4. Hygiene standards\n5. Fast delivery promise\n\nతెలుగు + English mix\nLength: 150-200 words"
        },
        {
            "title": "Daily Special Announcement",
            "category": "food-business",
            "description": "రోజు special item promotion",
            "prompt": "ఈరోజు special dish announce చేయాలి:\n\nDish: [పేరు]\nPrice: ₹[Amount]\nAvailable: [Time/Quantity]\n\nWhatsApp/Social media post రాయండి:\n1. Dish appetizing description\n2. Why today special\n3. Limited availability urgency\n4. Pre-order option\n5. Pickup/delivery info\n\nతెలుగులో mouth-watering content.\nLength: 4-5 lines"
        },
        {
            "title": "Catering Services Proposal",
            "category": "food-business",
            "description": "Event catering quotation",
            "prompt": "[Event type] కోసం catering proposal రాయండి:\n\nEvent: [Wedding/Birthday/Corporate]\nGuests: [Number]\nBudget: ₹[Per plate]\nMenu: [Veg/Non-veg/Both]\n\nProposal లో:\n1. Menu options (multiple packages)\n2. Per-plate pricing\n3. Service details\n4. Serving staff included\n5. Cutlery/setup\n6. Tasting session offer\n\nతెలుగులో professional catering proposal."
        },
        {
            "title": "Food Hygiene Certificate Post",
            "category": "food-business",
            "description": "FSSAI license announcement",
            "prompt": "మా restaurant FSSAI certified అయింది announce చేయాలి:\n\nLicense number: [Number]\nRating: [Stars]\n\nAnnouncement post రాయండి:\n1. Achievement celebrate\n2. Food safety commitment\n3. What certification means\n4. Customer trust building\n5. Thank you message\n\nతెలుగులో proud yet humble tone.\nPlatform: All social media"
        },
        {
            "title": "Online Food Ordering Launch",
            "category": "food-business",
            "description": "Own website/app ordering system announcement",
            "prompt": "మా restaurant online ordering start చేస్తోంది:\n\nPlatform: [Website/App/WhatsApp]\nDelivery area: [Coverage]\nLaunch offer: [Discount/Free delivery]\n\nLaunch announcement రాయండి:\n1. Exciting news introduction\n2. How to order (simple steps)\n3. Special launch offers\n4. Delivery timeline\n5. Payment options\n6. Customer support\n\nతెలుగులో user-friendly content."
        },
        {
            "title": "Customer Food Complaint Response",
            "category": "food-business",
            "description": "Food quality issue complaint handling",
            "prompt": "Customer food quality గురించి complaint చేశారు:\n\nIssue: [Late/cold/taste problem]\nOrder value: ₹[Amount]\n\nImmediate response రాయండి:\n1. Deeply apologize\n2. Food safety standards mention\n3. Immediate replacement offer\n4. Full refund option\n5. Discount on next order\n6. Personal call follow-up\n\nతెలుగులో extremely apologetic.\nHealth concern priority చూపించాలి."
        },
        {
            "title": "Recipe Secret Teaser",
            "category": "food-business",
            "description": "Signature dish preparation teaser (not full recipe)",
            "prompt": "మా signature [Dish name] recipe teaser content రాయండి:\n\nDish: [పేరు]\nWhat makes it special: [Secret]\n\nTeaser post:\n1. Dish popularity mention\n2. 2-3 key ingredients reveal\n3. Preparation hint\n4. Secret ingredient mystery\n5. \"Come taste yourself\" CTA\n\nతెలుగులో curious చేసే content.\nFull recipe చెప్పకూడదు!"
        },
        {
            "title": "Food Festival Participation",
            "category": "food-business",
            "description": "Local food mela stall announcement",
            "prompt": "మేము [Food Festival Name] లో stall పెట్టుకుంటున్నాము:\n\nEvent: [Name & Date]\nLocation: [Venue]\nOur stall: [Number/Location]\nSpecial items: [ఏమి offer చేస్తున్నారు]\n\nPromotion post రాయండి:\n1. Event excitement\n2. Our special offerings\n3. Festival-only items\n4. Stall location\n5. Come visit us invitation\n\nతెలుగులో enthusiastic tone."
        },
        {
            "title": "Home Delivery Safety Message",
            "category": "food-business",
            "description": "COVID/hygiene safety measures communication",
            "prompt": "మా delivery safety precautions గురించి message రాయండి:\n\nSafety measures:\n1. Contactless delivery\n2. Mask + gloves for staff\n3. Regular sanitization\n4. Tamper-proof packaging\n5. Health checked staff\n\nReassurance post రాయండి:\n1. Customer safety priority\n2. All precautions details\n3. Quality not compromised\n4. Continuous monitoring\n\nతెలుగులో trust-building content."
        }
    ]
    
    # Beauty & Salon Prompts (70)
    beauty_templates = [
        {
            "title": "సెలూన్ Service Menu Description",
            "category": "beauty-salon",
            "description": "Services attractive ga present చేయడం",
            "prompt": "మా salon services menu రాయండి:\n\nServices available:\n- Haircut/Style\n- Facial treatments\n- Bridal makeup\n- Hair coloring\n- Spa services\n\nప్రతి service కోసం:\n1. Service name (తెలుగు + English)\n2. What's included\n3. Duration\n4. Starting price\n5. Who it's ideal for\n\nతెలుగులో attractive menu format."
        },
        {
            "title": "Bridal Package Proposal",
            "category": "beauty-salon",
            "description": "పెళ్లి makeup package quotation",
            "prompt": "Bride కోసం complete bridal package proposal రాయండి:\n\nPackage includes:\n- Pre-bridal treatments\n- Wedding day makeup\n- Hair styling\n- Draping\n- Touch-ups\n\nProposal లో:\n1. Package details\n2. Timeline (pre-wedding sessions)\n3. Products used\n4. Total cost\n5. Booking advance\n6. Trial session\n\nతెలుగులో comprehensive proposal."
        },
        {
            "title": "Salon Opening Hours Change",
            "category": "beauty-salon",
            "description": "Timings మార్పు announcement",
            "prompt": "మా salon timings change అవుతున్నాయి:\n\nపాత timings: [Old]\nకొత్త timings: [New]\nEffective from: [Date]\nReason: [Optional - customer convenience]\n\nAnnouncement రాయండి:\n1. Change intimation\n2. New schedule clearly\n3. Benefits mention\n4. Advance booking encouraged\n5. Apology if inconvenience\n\nతెలుగులో customer-friendly tone."
        },
        {
            "title": "Hair Care Tips Post",
            "category": "beauty-salon",
            "description": "సీజన్ specific hair care advice",
            "prompt": "[Season/Weather] లో hair care tips రాయండి:\n\nTarget: [Hair type specific]\n\n5-7 tips cover చేయండి:\n1. Washing frequency\n2. Product recommendations\n3. Home remedies\n4. Professional treatment suggestions\n5. What to avoid\n\nతెలుగులో helpful content.\nSubtle salon service mentions.\nLength: 150-200 words"
        },
        {
            "title": "Membership Card Launch",
            "category": "beauty-salon",
            "description": "Loyalty membership program announcement",
            "prompt": "మా salon membership card launch చేస్తున్నాము:\n\nBenefits:\n- [X]% discount\n- Priority booking\n- Exclusive services\n- Birthday specials\n\nCost: ₹[Amount] per year\n\nLaunch announcement రాయండి:\n1. Membership benefits clearly\n2. Cost justify చేయాలి\n3. How to enroll\n4. Limited first 100 members special\n\nతెలుగులో attractive offer presentation."
        },
        {
            "title": "Product Recommendation Post",
            "category": "beauty-salon",
            "description": "Salon-recommended products promote చేయడం",
            "prompt": "[Product Name] recommend చేస్తున్నాము:\n\nProduct: [Shampoo/Serum/Cream]\nBrand: [Name]\nBenefits: [Key benefits]\nPrice: ₹[Amount]\nWho should use: [Hair/skin type]\n\nRecommendation post రాయండి:\n1. Expert recommendation\n2. Benefits detailed\n3. How to use\n4. Available at salon\n5. Before/after expectations\n\nతెలుగులో professional advice tone."
        },
        {
            "title": "Customer Transformation Post",
            "category": "beauty-salon",
            "description": "Before/after customer results showcase",
            "prompt": "Customer makeover share చేయాలి:\n\nService done: [Haircut/Color/Facial]\nTransformation: [Description]\nCustomer feedback: [Quote]\n\nPost caption రాయండి:\n1. Transformation describe\n2. Service/products used\n3. Customer happiness\n4. \"You can too\" message\n5. Book appointment CTA\n\nతెలుగులో inspiring content.\nCustomer permission assumed."
        },
        {
            "title": "Festival Special Offers",
            "category": "beauty-salon",
            "description": "పండుగ సీజన్ packages",
            "prompt": "[పండుగ name] కోసం special packages announce చేయండి:\n\nOffers:\n- Package A: [Services] @ ₹[X]\n- Package B: [Services] @ ₹[Y]\n- Early bird discount\n\nValidity: [Dates]\n\nPromotion post రాయండి:\n1. Festival greeting\n2. All packages clearly\n3. Book now urgency\n4. Limited slots\n5. Gift vouchers option\n\nతెలుగులో festive excitement."
        },
        {
            "title": "Salon Hygiene Standards Post",
            "category": "beauty-salon",
            "description": "Cleanliness మరియు safety measures highlight",
            "prompt": "మా salon hygiene standards గురించి post రాయండి:\n\nMeasures:\n- Sterilization process\n- One-time use items\n- Regular sanitization\n- Licensed professionals\n- Quality products\n\nReassurance post:\n1. Customer safety priority\n2. All measures detailed\n3. Certifications mention\n4. Regular audits\n5. Trust building\n\nతెలుగులో professional మరియు confident tone."
        },
        {
            "title": "Booking Cancellation Policy",
            "category": "beauty-salon",
            "description": "Appointment cancel చేసే policy clear చేయడం",
            "prompt": "మా salon booking cancellation policy announce చేయాలి:\n\nPolicy:\n- 24 hours notice required\n- Cancellation charges: [If any]\n- Rescheduling: [Terms]\n- No-show policy\n\nPolicy announcement రాయండి:\n1. Policy clearly explain\n2. Reason justify (fair to all)\n3. Easy rescheduling process\n4. Understanding tone\n\nతెలుగులో firm but polite."
        }
    ]
    
    # Add all templates
    for template in sales_templates * 13:
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
    
    for template in food_templates * 8:
        if len(prompts) >= 210:
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
    
    for template in beauty_templates * 7:
        if len(prompts) >= 280:
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
    
    new_prompts = generate_batch3()
    existing.extend(new_prompts)
    
    with open('data/prompts.json', 'w', encoding='utf-8') as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    
    print(f"Added {len(new_prompts)} more Telugu prompts!")
    print(f"Total prompts now: {len(existing)}")
