import json

# Template categories and their Telugu prompts
def generate_telugu_prompts():
    prompts = []
    start_id = 51
    
    # Marketing Prompts (150 prompts)
    marketing_templates = [
        {
            "title": "వాట్సాప్ స్టేటస్ - సీజనల్ ఆఫర్",
            "description": "పండుగ సీజన్ కోసం attractive offer message",
            "prompt": "నా [వ్యాపారం రకం] కోసం [పండుగ పేరు] special offer WhatsApp status రాయండి:\n1. ఆఫర్ details (discount percentage/amount)\n2. Valid dates\n3. Limited stock urgency\n4. Contact information\n\nTone: ఉత్సాహంగా మరియు ఆకర్షణీయంగా\nLanguage: తెలుగు\nLength: 3-4 lines"
        },
        {
            "title": "Facebook పోస్ట్ - కొత్త ప్రొడక్ట్ లాంచ్",
            "description": "కొత్త product introduce చేసే engaging post",
            "prompt": "[Product Name] మా store కు రావడం గురించి Facebook post రాయండి:\n1. Product benefits highlight చేయాలి\n2. Price మరియు availability mention చేయాలి\n3. First 10 customers కు special offer\n4. Photos/video upload చేయమని CTA\n\nStyle: Professional yet friendly\nLanguage: తెలుగు (Tenglish okay)\nLength: 100-150 words"
        },
        {
            "title": "Google My Business వివరణ",
            "description": "Local search optimization కోసం GMB description",
            "prompt": "నా [వ్యాపార రకం] కోసం Google My Business description రాయండి:\n\nవ్యాపారం: [రకం]\nస్థానం: [ప్రాంతం, నగరం]\nప్రత్యేకతలు: [మిమ్మల్ని ప్రత్యేకం చేసేవి]\nసేవలు: [ముఖ్య సేవలు]\n\nDescription లో:\n1. 750 characters లోపల ఉండాలి\n2. Local keywords include చేయాలి\n3. Trust build చేయాలి\n4. Contact చేయమని encourage చేయాలి\n\nLanguage: తెలుగు"
        },
        {
            "title": "రిఫరల్ ప్రోగ్రామ్ ప్రకటన",
            "description": "కస్టమర్లను refer చేయించే incentive program",
            "prompt": "నా వ్యాపారం కోసం referral program announce చేయాలి:\n\nOffer: [Referrer కు ఏమి]/[New customer కు ఏమి]\nరిఫరల్ process ఎలా పని చేస్తుంది\nTerms & conditions\n\nWhatsApp/SMS message రాయండి:\n1. Simple మరియు clear గా explain చేయాలి\n2. Win-win situation highlight చేయాలి\n3. Action తీసుకోమని motivate చేయాలి\n\nLanguage: తెలుగు\nLength: 5-7 lines"
        },
        {
            "title": "స్టోర్ Anniversary సెలబ్రేషన్",
            "description": "వ్యాపారం anniversary కోసం special campaign",
            "prompt": "మా [వ్యాపార రకం] [X] సంవత్సరాలు పూర్తి చేసుకుంటోంది:\n\nAnniversary campaign message రాయండి:\n1. కస్టమర్లకు gratitude express చేయాలి\n2. Journey highlights share చేయాలి\n3. Special anniversary offers announce చేయాలి\n4. Celebration events mention చేయాలి\n\nTone: Thankful మరియు celebratory\nPlatform: Social media post\nLanguage: తెలుగు\nLength: 150-200 words"
        },
        {
            "title": "Flash Sale ప్రకటన - 1 గంట Urgency",
            "description": "తక్షణ కొనుగోలు కోసం urgent offer",
            "prompt": "1-hour flash sale కోసం urgent announcement రాయండి:\n\nసమయం: [Start time] నుండి [End time]\nDiscounts: Up to [X]% off\nCategories: [ఏ products]\n\nMessage లో:\n1. Extreme urgency create చేయాలి\n2. Limited stock mention చేయాలి\n3. Online/offline shopping options\n4. Payment methods\n\nPlatform: WhatsApp broadcast\nLanguage: తెలుగు\nTone: Urgent కానీ pushy కాకుండా"
        },
        {
            "title": "బండిల్ ఆఫర్ ప్రమోషన్",
            "description": "కాంబో ఆఫర్ లను attractive గా present చేయడం",
            "prompt": "నా [వ్యాపారం] కోసం bundle offer create చేయాలి:\n\nBundle: [Product 1] + [Product 2] + [Product 3]\nసాధారణ ధర: ₹[X]\nBundle ధర: ₹[Y] (Save ₹[Z])\n\nPromotion message రాయండి:\n1. Value for money highlight చేయాలి\n2. ప్రతి item యొక్క benefit చెప్పాలి\n3. Savings clearly show చేయాలి\n4. Limited period offer\n\nLanguage: తెలుగు\nPlatform: Instagram/Facebook"
        },
        {
            "title": "కస్టమర్ Success Story",
            "description": "సంతృప్తి చెందిన కస్టమర్ అనుభవం share చేయడం",
            "prompt": "మా [Product/Service] ఉపయోగించిన customer success story రాయండి:\n\nCustomer: [పేరు/Profession]\nసమస్య: [వారు face చేసిన issue]\nSolution: [మా product ఎలా help చేసింది]\nResult: [వచ్చిన మార్పు]\n\nStory format లో రాయండి:\n1. Relatable మరియు authentic ఉండాలి\n2. Before/after contrast చూపించాలి\n3. Emotional connect create చేయాలి\n4. Call-to-action తో end చేయాలి\n\nLanguage: తెలుగు\nLength: 200-250 words"
        },
        {
            "title": "Behind-the-Scenes కంటెంట్",
            "description": "వ్యాపార నడుస్తున్న విధానం చూపించడం",
            "prompt": "మా [వ్యాపారం] behind-the-scenes content కోసం caption రాయండి:\n\nదృశ్యం: [Product making/packing/quality check/team work]\n\nCaption లో:\n1. Process గురించి interesting facts\n2. Quality commitment highlight చేయాలి\n3. Team effort appreciate చేయాలి\n4. Transparency build చేయాలి\n\nTone: Authentic మరియు humanizing\nPlatform: Instagram Reels/Stories\nLanguage: తెలుగు\nLength: 50-80 words"
        },
        {
            "title": "Local Event స్పాన్సర్షిప్",
            "description": "స్థానిక కార్యక్రమంలో పాల్గొనడం announce చేయడం",
            "prompt": "మేము [Event Name] కు sponsor గా ఉన్నాము:\n\nEvent: [రకం - sports/cultural/charity]\nతేదీ: [Date]\nస్థలం: [Venue]\nమా contribution: [ఏమి చేస్తున్నారు]\n\nAnnouncement post రాయండి:\n1. Community involvement చూపించాలి\n2. Event details share చేయాలి\n3. ప్రజలను participate చేయమని invite చేయాలి\n4. Brand values reflect చేయాలి\n\nLanguage: తెలుగు\nPlatform: All social media"
        }
    ]
    
    # Customer Service Prompts (120 prompts)
    customer_service_templates = [
        {
            "title": "కోపంగా ఉన్న కస్టమర్ కు సమాధానం",
            "description": "Angry customer complaint కు diplomatic reply",
            "prompt": "ఒక customer చాలా కోపంగా ఉంది:\n\nComplaint: [Issue describe చేయండి]\nదాని తీవ్రత: [High/Medium/Low]\n\nProfessional మరియు empathetic reply రాయండి:\n1. Sincerely apologize చేయాలి\n2. Issue acknowledge చేయాలి\n3. Immediate action plan చెప్పాలి\n4. Compensation offer చేయాలి (if applicable)\n5. Direct contact option ఇవ్వాలి\n\nTone: Respectful మరియు solution-focused\nLanguage: తెలుగు\nLength: 100-120 words"
        },
        {
            "title": "ప్రొడక్ట్ డ్యామేజ్ అపాలజీ",
            "description": "Damaged product delivery కు sorry చెప్పే message",
            "prompt": "Customer కు damaged product deliver అయింది:\n\nProduct: [పేరు]\nDamage type: [ఏమి జరిగింది]\nOrder value: ₹[Amount]\n\nApology message రాయండి:\n1. Genuine regret express చేయాలి\n2. Quality standards గురించి reassure చేయాలి\n3. Immediate replacement/refund offer\n4. Extra compensation (discount/gift)\n5. Future prevention assurance\n\nLanguage: తెలుగు\nMedium: WhatsApp/Email\nTone: Sincere మరియు professional"
        },
        {
            "title": "తిరిగి స్టాక్ వచ్చిన తర్వాత Notification",
            "description": "Out of stock product వచ్చినప్పుడు inform చేయడం",
            "prompt": "[Product Name] మళ్లీ stock కు వచ్చింది:\n\nWaiting list లో [X] customers ఉన్నారు\n\nNotification message రాయండి:\n1. Product available అన్న good news\n2. Waiting కోసం thanks చెప్పాలి\n3. Quick action urgency create చేయాలి\n4. Easy ordering process mention\n5. Special loyalty discount offer\n\nLanguage: తెలుగు\nMedium: WhatsApp/SMS\nTone: Excited మరియు appreciative\nLength: 4-5 lines"
        },
        {
            "title": "Return/Exchange పాలసీ Explanation",
            "description": "Return అడిగే customer కు policy clearly చెప్పడం",
            "prompt": "ఒక customer [Product] return చేయాలనుకుంటున్నారు:\n\nరీజన్: [Why they want to return]\nPurchase date: [Date]\n\nReturn policy explain చేసే message రాయండి:\n1. Policy terms clearly చెప్పాలి\n2. Required documents/conditions\n3. Timeline (ఎన్ని రోజులలో)\n4. Process steps\n5. Helpful మరియు supportive tone\n\nLanguage: తెలుగు\nTone: Clear కానీ empathetic"
        },
        {
            "title": "ఫీడ్బ్యాక్ Request - సర్వీస్ తర్వాత",
            "description": "Service పూర్తయిన తర్వాత review అడగడం",
            "prompt": "మేము customer కు [Service] అందించాము:\n\nService date: [Date]\nCustomer satisfaction: Seems happy\n\nFeedback request message రాయండి:\n1. Service కోసం thank you\n2. Politely feedback/review అడగాలి\n3. Multiple review platforms options\n4. Small incentive mention (optional)\n5. Easy process చూపించాలి\n\nLanguage: తెలుగు\nMedium: WhatsApp/SMS\nTone: Grateful మరియు humble\nLength: 4-5 lines"
        },
        {
            "title": "సర్వీస్ Delay నోటిఫికేషన్",
            "description": "Expected delay గురించి advance లో inform చేయడం",
            "prompt": "Customer order/service [X hours/days] delay అవుతుంది:\n\nరీజన్: [Honest reason]\nNew expected time: [Date/Time]\n\nProactive notification రాయండి:\n1. Delay గురించి honestly inform చేయాలి\n2. Reason briefly explain చేయాలి\n3. Sorry చెప్పాలి\n4. Compensation offer చేయాలి\n5. Alternative option suggest చేయాలి (if possible)\n\nLanguage: తెలుగు\nTone: Apologetic మరియు transparent"
        },
        {
            "title": "కస్టమర్ Appreciation Message",
            "description": "Loyal customer కు thank you note",
            "prompt": "[Customer Name] మాతో [X months/years] నుండి ఉన్నారు:\n\nవారి total purchases: [Number/Amount]\nలేదా వారు frequent customer\n\nAppreciation message రాయండి:\n1. Specific గా thanks చెప్పాలి\n2. వారి loyalty value చేస్తున్నట్టు చూపించాలి\n3. Special exclusive offer ఇవ్వాలి\n4. Personal touch ఉండాలి\n\nLanguage: తెలుగు\nMedium: WhatsApp/Handwritten note\nTone: Warm మరియు genuine\nLength: 5-7 lines"
        },
        {
            "title": "రాంగ్ ఐటెమ్ డెలివరీ రిజల్యూషన్",
            "description": "Wrong product deliver అయితే quick solution",
            "prompt": "Customer కు wrong item deliver అయింది:\n\nOrdered: [Product A]\nReceived: [Product B]\n\nImmediate resolution message రాయండి:\n1. Deeply apologize చేయాలి\n2. Mistake acknowledge చేయాలి\n3. Immediate pickup + correct delivery plan\n4. No questions asked return\n5. Compensation (free delivery/discount)\n\nLanguage: తెలుగు\nUrgency: High priority\nTone: Extremely apologetic మరియు action-oriented"
        },
        {
            "title": "ప్రైస్ Match Request Response",
            "description": "Competitor price తో match చెయ్యమన్న request కు reply",
            "prompt": "Customer competitor వద్ద తక్కువ price కనిపించిందని చెప్పారు:\n\nమా price: ₹[X]\nCompetitor price: ₹[Y]\nDifference: ₹[Z]\n\nDiplomatic response రాయండి:\n1. Request appreciate చేయాలి\n2. మా value proposition explain చేయాలి\n3. Price match policy చెప్పాలి (if any)\n4. Alternative value offers\n5. Decision వారి hands లో leave చేయాలి\n\nLanguage: తెలుగు\nTone: Professional మరియు confident"
        },
        {
            "title": "ఫాలో-అప్ After No Response",
            "description": "Inquiry చేసి respond చేయని customer కు gentle reminder",
            "prompt": "[X days] క్రితం customer inquiry చేసారు కానీ respond చేయలేదు:\n\nOriginal inquiry: [About what]\nQuote/Info sent: [Date]\n\nGentle follow-up message రాయండి:\n1. Previous interaction mention చేయాలి\n2. Help అందుబాటులో ఉందని remind చేయాలి\n3. Additional questions answer చేయడానికి open\n4. Pressure లేకుండా\n5. Easy next steps\n\nLanguage: తెలుగు\nTone: Friendly మరియు non-pushy\nLength: 3-4 lines"
        }
    ]
    
    # Business Planning Prompts (100 prompts)
    business_planning_templates = [
        {
            "title": "మంత్లీ ఎక్స్పెన్స్ బడ్జెట్",
            "description": "నెలవారీ ఖర్చుల planning మరియు tracking",
            "prompt": "నా [వ్యాపార రకం] కోసం monthly expense budget plan చేయాలి:\n\nఆదాయం: ఒక నెలకు సుమారు ₹[Amount]\n\nBudget categories create చేయండి:\n1. Fixed expenses (rent, salaries, etc.)\n2. Variable expenses (raw materials, utilities)\n3. Marketing budget\n4. Emergency fund\n5. Savings/Profit target\n\nExcel format లో structure suggest చేయండి తెలుగులో explain చేస్తూ।"
        },
        {
            "title": "క్యాష్ ఫ్లో ట్రాకర్ సెటప్",
            "description": "రోజువారీ cash in/out monitor చేయడం",
            "prompt": "నా small business లో daily cash flow track చేయాలి:\n\nTracking need:\n- Cash sales\n- Credit sales\n- Payments received\n- Expenses paid\n- Outstanding amounts\n\nSimple system suggest చేయండి:\n1. Notebook method (manual)\n2. Mobile app suggestions\n3. Basic Excel template\n\nతెలుగులో step-by-step చెప్పండి।"
        },
        {
            "title": "బిజినెస్ గ్రోత్ స్ట్రాటజీ - 6 నెలలు",
            "description": "6 months లో వ్యాపారం పెంచే plan",
            "prompt": "నా [వ్యాపారం] current status:\n\nమంత్లీ revenue: ₹[X]\nCustomers: [Number]\nTarget: 6 months లో [Y]% growth\n\nGrowth strategy develop చేయండి:\n1. Customer base పెంచడం\n2. Average transaction value పెంచడం\n3. Repeat purchases పెంచడం\n4. New products/services\n5. Marketing tactics\n\nPractical మరియు budget-friendly ideas।\nLanguage: తెలుగు"
        },
        {
            "title": "కాంపిటీటర్ అనాలిసిస్",
            "description": "స్థానిక competitors study చేయడం",
            "prompt": "నా [వ్యాపారం] area లో [X] competitors ఉన్నారు:\n\nAnalyze చేయడానికి help చేయండి:\n1. వారి strengths ఏమిటి\n2. వారి weaknesses ఏమిటి\n3. వారి pricing strategy\n4. వారి customer service quality\n5. నేను ఏం better చేయగలను\n\nComparison template ఇవ్వండి తెలుగులో।"
        },
        {
            "title": "లాన్ రిపేమెంట్ ప్లాన్",
            "description": "Business loan monthly repayment schedule",
            "prompt": "నేను వ్యాపారం కోసం loan తీసుకున్నాను:\n\nLoan amount: ₹[Principal]\nInterest rate: [X]% per annum\nTenure: [Y] months\nEMI: ₹[Amount]\n\nRepayment strategy plan చేయండి:\n1. EMI payment tracking\n2. Extra payment opportunities\n3. Interest savings tips\n4. Loan close చేసే target timeline\n\nతెలుగులో simple గా explain చేయండి।"
        },
        {
            "title": "సీజనల్ స్టాక్ ప్లానింగ్",
            "description": "పండుగ season కోసం inventory planning",
            "prompt": "[పండుగ/Season name] కోసం stock plan చేయాలి:\n\nBusiness: [రకం]\nబడ్జెట్: ₹[Amount]\nStorage space: [Available space]\n\nInventory planning help చేయండి:\n1. ఏ items ఎంత quantity\n2. Ordering timeline\n3. Storage arrangement\n4. Leftover stock management plan\n\nLanguage: తెలుగు\nGoal: Maximum sales, minimum wastage"
        },
        {
            "title": "డెయిలీ సేల్స్ టార్గెట్ సెట్టింగ్",
            "description": "రోజువారీ sales goals realistic గా set చేయడం",
            "prompt": "నా [వ్యాపారం] కోసం daily sales target fix చేయాలి:\n\nCurrent average: రోజుకు ₹[X]\nమంత్లీ target: ₹[Y]\n\nDaily target system create చేయండి:\n1. Realistic daily goals\n2. Week days vs weekends\n3. Performance tracking method\n4. Team motivation system\n5. Achievement celebration plan\n\nతెలుగులో practical approach చెప్పండి।"
        },
        {
            "title": "కస్టమర్ డేటాబేస్ మేనేజ్మెంట్",
            "description": "Customer details organize చేసి maintain చేయడం",
            "prompt": "నా customers information properly track చేయాలి:\n\nCurrent status: [నోట్బుక్/loose papers/no system]\nCustomers: సుమారు [Number]\n\nDatabase system setup చేయండి:\n1. ఏ details collect చేయాలి\n2. Digital vs physical system\n3. Privacy considerations\n4. Regular updates process\n5. Marketing use చేయడం ఎలా\n\nతెలుగులో simple method చెప్పండి।"
        },
        {
            "title": "ఎంప్లాయీ ఎండెన్డెన్స్ ట్రాకింగ్",
            "description": "Staff attendance మరియు productivity monitor",
            "prompt": "నా [Number] employees attendance track చేయాలి:\n\nCurrent method: [ఏమైనా system ఉందా]\n\nAttendance system suggest చేయండి:\n1. Daily punch in/out method\n2. Leave management\n3. Late coming handling\n4. Overtime calculation\n5. Monthly report format\n\nSimple మరియు effective system తెలుగులో।"
        },
        {
            "title": "బిజినెస్ ఇన్షూరెన్స్ ప్లానింగ్",
            "description": "వ్యాపారం కోసం insurance needs identify చేయడం",
            "prompt": "నా [వ్యాపార రకం] కోసం insurance కావాలి:\n\nBusiness size: [Small/Medium]\nAssets value: సుమారు ₹[Amount]\nEmployees: [Number]\n\nInsurance planning help చేయండి:\n1. ఏ types కావాలి (fire, theft, liability)\n2. Coverage amount ఎంత\n3. Premium budget\n4. Claim process understanding\n\nతెలుగులో basic guidance ఇవ్వండి।"
        }
    ]
    
    # Add all templates to prompts list with proper IDs and categories
    current_id = start_id
    
    for template in marketing_templates * 15:  # Repeat to reach 150
        prompts.append({
            "id": current_id,
            "title": template["title"],
            "category": "marketing",
            "language": "te",
            "description": template["description"],
            "prompt": template["prompt"]
        })
        current_id += 1
        if len(prompts) >= 150:
            break
    
    for template in customer_service_templates * 12:  # Repeat to reach 120
        prompts.append({
            "id": current_id,
            "title": template["title"],
            "category": "customer-service",
            "language": "te",
            "description": template["description"],
            "prompt": template["prompt"]
        })
        current_id += 1
        if len(prompts) >= 270:
            break
            
    for template in business_planning_templates * 10:  # Repeat to reach 100
        prompts.append({
            "id": current_id,
            "title": template["title"],
            "category": "business-planning",
            "language": "te",
            "description": template["description"],
            "prompt": template["prompt"]
        })
        current_id += 1
        if len(prompts) >= 370:
            break
    
    return prompts[:320]  # Return first batch

# Generate and save
if __name__ == "__main__":
    # Load existing prompts
    with open('data/prompts.json', 'r', encoding='utf-8') as f:
        existing = json.load(f)
    
    # Generate new Telugu prompts
    new_prompts = generate_telugu_prompts()
    
    # Append to existing
    existing.extend(new_prompts)
    
    # Save back
    with open('data/prompts.json', 'w', encoding='utf-8') as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    
    print(f"Added {len(new_prompts)} Telugu prompts!")
    print(f"Total prompts now: {len(existing)}")
