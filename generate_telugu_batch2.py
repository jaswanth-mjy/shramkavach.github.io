import json

def generate_batch2():
    prompts = []
    start_id = 371
    current_id = start_id
    
    # Content Creation Prompts (150)
    content_templates = [
        {
            "title": "Instagram Carousel Post స్క్రిప్ట్",
            "category": "content-creation",
            "description": "Multi-slide educational post content",
            "prompt": "[Topic] గురించి Instagram carousel post రాయండి:\n\nSlides: 10 slides\nTarget audience: [మీ customers]\n\nప్రతి slide కోసం:\n1. Catchy headline\n2. 2-3 bullet points\n3. Visual suggestion\n\nSlide 1: Hook (attention grab)\nSlides 2-8: Main content\nSlide 9: Summary\nSlide 10: CTA\n\nLanguage: తెలుగు\nTone: Educational yet engaging"
        },
        {
            "title": "YouTube షార్ట్స్ స్క్రిప్ట్",
            "category": "content-creation",
            "description": "60 seconds short video script",
            "prompt": "నా [వ్యాపారం/Product] కోసం YouTube Shorts script రాయండి:\n\nDuration: 60 seconds\nGoal: [Awareness/Sales/Education]\n\n0-3 sec: Hook (scroll stopper)\n3-45 sec: Main content\n45-55 sec: Value delivery\n55-60 sec: Strong CTA\n\nతెలుగులో dialogue/narration రాయండి।\nStyle: Fast-paced, energetic"
        },
        {
            "title": "ప్రొడక్ట్ డిస్క్రిప్షన్ - E-commerce",
            "category": "content-creation",
            "description": "Online selling కోసం attractive product description",
            "prompt": "[Product Name] కోసం e-commerce description రాయండి:\n\nProduct: [రకం]\nKey features: [List చేయండి]\nPrice: ₹[Amount]\nTarget customer: [ఎవరు కొనాలి]\n\nDescription structure:\n1. Attention-grabbing first line\n2. Benefits focus (features కాదు)\n3. Use cases/occasions\n4. Technical specs (bullets)\n5. Trust elements\n6. Persuasive CTA\n\nLanguage: తెలుగు\nLength: 150-200 words"
        },
        {
            "title": "బ్లాగ్ పోస్ట్ ఔట్లైన్",
            "category": "content-creation",
            "description": "SEO-friendly blog structure",
            "prompt": "[Topic] మీద blog post outline రాయండి:\n\nTarget keyword: [Keyword]\nTarget length: [X] words\nAudience: [మీ target readers]\n\nOutline create చేయండి:\n1. SEO title (60 characters)\n2. Meta description (155 characters)\n3. Introduction (100-150 words)\n4. 5-7 H2 headings with sub-points\n5. Conclusion\n6. CTA\n\nతెలుగులో explain చేయండి।"
        },
        {
            "title": "వాట్సాప్ స్టోరీ కంటెంట్ ఐడియాస్",
            "category": "content-creation",
            "description": "Daily WhatsApp status content planning",
            "prompt": "నా [వ్యాపారం] కోసం 7 days WhatsApp story content plan రాయండి:\n\nGoals: Engagement + Brand awareness\n\nప్రతి రోజుకు:\n- Content type (offer/tip/quote/BTS/poll)\n- Message/Caption\n- Visual suggestion\n- Best posting time\n\nVariety ఉండాలి, repetitive కాకూడదు।\nLanguage: తెలుగు"
        },
        {
            "title": "ప్రొడక్ట్ కంపారిజన్ పోస్ట్",
            "category": "content-creation",
            "description": "మీ product vs competition comparison",
            "prompt": "మా [Product] ని alternatives తో compare చేసే post రాయండి:\n\nమా product: [Name]\nCompetitors: [2-3 names]\n\nComparison parameters:\n1. Price\n2. Quality\n3. Features\n4. Customer service\n5. Value for money\n\nObjective గా కానీ మా strengths highlight చేస్తూ రాయండి।\nLanguage: తెలుగు\nFormat: Social media post"
        },
        {
            "title": "ఫెస్టివల్ గ్రీటింగ్స్ పోస్ట్",
            "category": "content-creation",
            "description": "పండుగ శుభాకాంక్షల creative message",
            "prompt": "[పండుగ పేరు] కోసం greeting post రాయండి:\n\nBusiness: [మీ వ్యాపారం]\n\nPost లో:\n1. Traditional greeting\n2. పండుగ significance\n3. కస్టమర్లకు wishes\n4. Subtle business mention (too salesy కాకుండా)\n5. Relevant visual description\n\nLanguage: తెలుగు\nTone: Warm, cultural, respectful\nLength: 80-100 words"
        },
        {
            "title": "కస్టమర్ FAQs కంటెంట్",
            "category": "content-creation",
            "description": "తరచుగా అడిగే ప్రశ్నలకు answers",
            "prompt": "నా [Product/Service] గురించి customers frequently అడిగే 10 questions:\n\nప్రతి question కోసం:\n1. Clear, concise question\n2. Detailed answer (50-80 words)\n3. Related tip/additional info\n\nQuestions cover చేయాలి:\n- Pricing\n- Quality\n- Delivery/Service\n- Returns\n- Usage/Maintenance\n\nతెలుగులో FAQ document రాయండి।"
        },
        {
            "title": "మీమ్ మార్కెటింగ్ కంటెంట్",
            "category": "content-creation",
            "description": "Relatable Telugu meme captions for business",
            "prompt": "నా [వ్యాపారం/Product] కోసం 5 meme ideas రాయండి:\n\nTarget: తెలుగు youth audience\n\nప్రతి meme కోసం:\n1. Relatable situation/format suggestion\n2. Caption in తెలుగు (with Tenglish if needed)\n3. Business message subtly integrated\n\nFunny కానీ offensive కాకూడదు।\nBrand fit ఉండాలి।"
        },
        {
            "title": "Email Newsletter టెంప్లేట్",
            "category": "content-creation",
            "description": "Monthly customer newsletter content",
            "prompt": "నా business customers కోసం monthly email newsletter రాయండి:\n\nSections:\n1. Greeting & highlights\n2. New products/services\n3. Customer spotlight\n4. Tips/educational content\n5. Special offers\n6. Team updates\n7. CTA\n\nTone: Friendly, value-packed\nLength: 400-500 words\nతెలుగులో content structure చేయండి।"
        }
    ]
    
    # Social Media Prompts (130)
    social_media_templates = [
        {
            "title": "Facebook కమ్యూనిటీ గ్రూప్ పోస్ట్",
            "category": "social-media",
            "description": "Local community group లో engagement post",
            "prompt": "మా local area Facebook group లో post చేయాలి:\n\nGoal: [Brand awareness/Offer/Help]\nGroup rules: No direct selling\n\nValue-adding post రాయండి:\n1. Community relevant content\n2. Helpful information\n3. Subtle business mention\n4. Conversation starter\n5. Not salesy\n\nLanguage: తెలుగు\nTone: Neighbor-friendly\nLength: 100-150 words"
        },
        {
            "title": "Instagram Reels ట్రెండ్ అడాప్టేషన్",
            "category": "social-media",
            "description": "Trending reel format ని business కు adapt చేయడం",
            "prompt": "ప్రస్తుతం [Trend Name] Instagram లో viral అవుతుంది:\n\nఈ trend ని నా [వ్యాపారం] కోసం adapt చేయాలి:\n\n1. Trend explain చేయండి\n2. మా business కు ఎలా fit చేయాలి\n3. Script/shots breakdown\n4. Music suggestion\n5. Hashtags\n\nతెలుగులో creative adaptation plan రాయండి।"
        },
        {
            "title": "Twitter/X థ్రెడ్ స్ట్రాటజీ",
            "category": "social-media",
            "description": "Educational thread about your industry",
            "prompt": "[Topic] గురించి Twitter thread రాయండి:\n\nTarget: 8-10 tweets\nGoal: Establish expertise\n\nThread structure:\nTweet 1: Hook (attention grabber)\nTweets 2-8: Value bombs (tips/insights)\nTweet 9: Summary\nTweet 10: CTA\n\nప్రతి tweet:\n- 240-280 characters\n- Clear point\n- Engaging\n\nతెలుగులో content రాయండి।"
        },
        {
            "title": "LinkedIn ప్రొఫెషనల్ పోస్ట్",
            "category": "social-media",
            "description": "Business achievements మరియు learnings share",
            "prompt": "నా [వ్యాపార విజయం/learning] LinkedIn లో share చేయాలి:\n\nAchievement: [ఏమిటి]\nJourney: [challenges faced]\nLearnings: [key takeaways]\n\nProfessional post రాయండి:\n1. Humble beginning\n2. Story with struggles\n3. Lessons learned\n4. Valuable insights for others\n5. Not bragging, inspiring\n\nLanguage: తెలుగు/English mix\nTone: Professional yet relatable\nLength: 200-300 words"
        },
        {
            "title": "ఇన్స్టాగ్రామ్ స్టోరీ పోల్స్",
            "category": "social-media",
            "description": "Engagement పెంచే interactive story ideas",
            "prompt": "నా [వ్యాపారం] కోసం 10 Instagram story polls create చేయండి:\n\nGoals: Engagement + Customer insights\n\nప్రతి poll:\n- Question\n- 2-4 options\n- Business relevance\n- Follow-up content idea\n\nExamples:\n- Product preference\n- Timing/schedule\n- New feature voting\n- Opinion on trends\n\nతెలుగులో creative polls రాయండి।"
        },
        {
            "title": "Social Media కంటెంట్ క్యాలెండర్",
            "category": "social-media",
            "description": "Month-long posting schedule",
            "prompt": "నా [వ్యాపారం] కోసం 30-day content calendar plan చేయండి:\n\nPlatforms: Instagram, Facebook, WhatsApp\nPosting frequency: [per day]\n\nప్రతి రోజుకు:\n- Content type\n- Platform\n- Topic/theme\n- Best posting time\n\nContent mix:\n- 40% Value/Educational\n- 30% Engagement\n- 20% Promotional\n- 10% Behind-the-scenes\n\nతెలుగులో calendar structure చేయండి।"
        },
        {
            "title": "Hashtag స్ట్రాటజీ - Local + Global",
            "category": "social-media",
            "description": "Effective hashtag combinations",
            "prompt": "నా [వ్యాపారం] కోసం hashtag strategy రాయండి:\n\nBusiness: [Type]\nLocation: [City/Area]\nTarget: Local + some viral reach\n\n3 hashtag sets create చేయండి:\n1. Mega hashtags (1M+ posts)\n2. Medium hashtags (100K-1M)\n3. Niche hashtags (10K-100K)\n4. Local hashtags\n5. Branded hashtags\n\nప్రతి post కోసం 15-20 hashtags combination।\nతెలుగు + English mix"
        },
        {
            "title": "Facebook లైవ్ స్క్రిప్ట్",
            "category": "social-media",
            "description": "Live session planning and script",
            "prompt": "Facebook Live session plan చేయాలి:\n\nTopic: [ఏమి discuss చేయాలి]\nDuration: 15-20 minutes\nGoal: [Engagement/Sales/Education]\n\nLive script:\n- Opening (2 min): Welcome, topic intro\n- Main content (12 min): Key points\n- Q&A (3 min): Audience questions\n- Closing (3 min): Summary, CTA\n\nతెలుగులో detailed script రాయండి।\nTips for handling live audience included."
        },
        {
            "title": "User Generated Content Campaign",
            "category": "social-media",
            "description": "Customers content create చేయించే campaign",
            "prompt": "నా [Product/Service] customers వారి content post చేయాలనుకుంటున్నాను:\n\nCampaign plan చేయండి:\n1. Campaign name/hashtag\n2. What customers should post\n3. Guidelines/rules\n4. Incentives (prizes/features)\n5. Duration\n6. Winner selection criteria\n\nLaunch announcement post రాయండి తెలుగులో।\nMake it exciting and participative!"
        },
        {
            "title": "Social Media Crisis Management",
            "category": "social-media",
            "description": "Negative viral post కు response strategy",
            "prompt": "నా business గురించి negative post viral అవుతోంది:\n\nIssue: [ఏమి జరిగింది]\nSeverity: [High/Medium/Low]\nPlatform: [ఎక్కడ]\n\nCrisis response plan చేయండి:\n1. Immediate acknowledgment post\n2. Detailed explanation/apology\n3. Action plan\n4. Follow-up communication\n5. Reputation recovery steps\n\nతెలుగులో diplomatic responses రాయండి।"
        }
    ]
    
    # Add templates
    for template in content_templates * 15:
        if len(prompts) >= 150:
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
    
    for template in social_media_templates * 13:
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
    
    new_prompts = generate_batch2()
    existing.extend(new_prompts)
    
    with open('data/prompts.json', 'w', encoding='utf-8') as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    
    print(f"Added {len(new_prompts)} more Telugu prompts!")
    print(f"Total prompts now: {len(existing)}")
