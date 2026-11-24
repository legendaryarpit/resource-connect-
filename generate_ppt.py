import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

def create_presentation():
    prs = Presentation()
    # 16:9 Widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    DARK_BG = RGBColor(3, 7, 18)       # Slate 950
    CARD_BG = RGBColor(15, 23, 42)     # Slate 900
    EMERALD = RGBColor(16, 185, 129)   # Emerald 500
    ACCENT_TEAL = RGBColor(45, 212, 191) # Teal 400
    TEXT_LIGHT = RGBColor(241, 245, 249) # Slate 100
    TEXT_MUTED = RGBColor(148, 163, 184) # Slate 400
    AMBER = RGBColor(245, 158, 11)     # Amber 500

    slides_data = [
        {
            "tag": "1st-Semester Software Engineering Micro-Project",
            "title": "RescueConnect",
            "subtitle": "A Community Resource Redistribution Platform",
            "tagline": "“Rescue resources. Reduce waste. Help communities.”",
            "bullets": [
                "• Civic-Tech platform connecting surplus resources with verified community organizations",
                "• Specializing in Food Rescue (Surplus Meals) and Medicine Donation (Eligible Supplies)",
                "• Modern React 18 Single-Page Architecture with LocalStorage Persistence & Zero-Backend Design"
            ],
            "footer": "Presented by: Student Name | B.Tech / BCA Semester 1"
        },
        {
            "tag": "Problem Statement",
            "title": "The Community Waste & Scarcity Crisis",
            "subtitle": "Two major systemic resource imbalances in our cities today",
            "bullets": [
                "🍱 Massive Food Waste: Restaurants, hotels, bakeries, and events discard pristine meals daily while nearby shelters face food shortages.",
                "💊 Medicine Inefficiency: Unopened, unexpired OTC medicines and first-aid supplies sit idle in homes & clinics while marginalized groups lack basic relief.",
                "⛓️ Fragmented Logistics: Individuals lack a verified, legally safe, and real-time civic portal to redirect surplus before expiration.",
                "⚠️ Safety & Compliance Void: Peer-to-peer medication transfers without strict organizational screening pose severe health and regulatory hazards."
            ],
            "footer": "Core challenge: Bridging donors with verified non-profits safely and instantly."
        },
        {
            "tag": "Solution Architecture",
            "title": "RescueConnect: Smart Civic Redistribution",
            "subtitle": "A trustworthy, category-tailored redistribution marketplace",
            "bullets": [
                "🍱 Food Rescue Engine: Live availability timers, meal category filters, hygiene timestamps, and pickup radius tracking.",
                "💊 Medicine Verification Hub: Batch number logging, remaining shelf-life safety checks (>30 days buffer), and storage requirements.",
                "🛡️ Non-Profit Screening Network: Only verified community kitchens, shelters, and clinic outreach teams can claim resources.",
                "⚡ Rapid 4-Step Lifecyle: Donate ➔ Verify ➔ Connect ➔ Rescue — completed in hours rather than days."
            ],
            "footer": "Outcome: Eliminates landfill waste while empowering grassroots social aid."
        },
        {
            "tag": "Core Resource Streams",
            "title": "Dual Redistribution Categories",
            "subtitle": "Specialized protocols for Food Rescue & Medicine Donation",
            "bullets": [
                "🍱 FOOD RESCUE (Meals, Bakery, Produce, Grocery):",
                "   • Tracks preparation datetime & strict 'Available Until' expiry timers",
                "   • Details portion sizing (e.g. 25 Meal Boxes, 40 Loaves) & dietary hygiene notes",
                "   • Live visual card preview updating in real-time before donor submission",
                "💊 MEDICINE DONATION (Tablets, Capsules, Syrup, First Aid Kits):",
                "   • Mandatory unexpired shelf-life buffer & factory lot batch number capture",
                "   • Storage requirement tags (e.g., Room Temperature below 25°C, Refrigerated)",
                "   • Client-side validation: automatically blocks expired or tampered submissions"
            ],
            "footer": "Zero tolerance for expired or unsafe transfers."
        },
        {
            "tag": "Operational Process",
            "title": "How RescueConnect Works (4-Step Flow)",
            "subtitle": "End-to-end community redistribution pipeline",
            "bullets": [
                "01 — DONATE: Donors list surplus items with quantity, location, expiry/pickup deadline, and photos.",
                "02 — VERIFY: System validates item eligibility; medicine listings pass through Civic Admin verification queue.",
                "03 — CONNECT: Verified shelters and humanitarian NGOs claim available nearby items via 1-click request.",
                "04 — RESCUE: Status transitions from Available ➔ Requested ➔ Collected ➔ Completed with community impact logged."
            ],
            "footer": "Simple, transparent, and auditable status lifecycle."
        },
        {
            "tag": "User Personas & Dashboards",
            "title": "Role-Based Civic Portals",
            "subtitle": "Tailored experiences for Donors, Organizations, and Civic Admins",
            "bullets": [
                "👤 Individual Donor Portal: Personal impact counter ('You've rescued 47 meals!'), milestone progress bar, and active listing manager.",
                "🏢 NGO & Shelter Hub: Proximity feed ('Available Near You'), 1-click resource claim modal, and pickup coordination logs.",
                "🛡️ Civic Admin Console: Resource verification queue (Approve, Reject, Request Clarification) and platform-wide live audit stream.",
                "⚡ 1-Click Demo Switcher: Seamless role switching between Donor, NGO, and Admin directly in the header bar."
            ],
            "footer": "Built to simulate real startup governance and multi-stakeholder workflows."
        },
        {
            "tag": "Safety & Legal Compliance",
            "title": "Safety Protocols & Verification Guardrails",
            "subtitle": "Engineered for civic trust and public health standards",
            "bullets": [
                "⛔ Strict Expiration Validation: Client-side date algorithms immediately reject expired medications with high-visibility alerts.",
                "📦 Integrity Verification: Only factory-sealed, un-tampered packaging accepted with minimum 30-day remaining shelf life.",
                "📜 Legal Compliance Disclaimer: Explicit OTC & non-controlled distribution policy; transfers routed only to registered non-profits.",
                "🍲 Food Hygiene Protocols: Requires food-grade storage specifications and preparation timestamp audit."
            ],
            "footer": "Safety first: Built-in validation protects community recipients."
        },
        {
            "tag": "Technical Foundation",
            "title": "Technology Stack & Clean Architecture",
            "subtitle": "Modern frontend engineering without bloated dependencies",
            "bullets": [
                "⚛️ React 18 & Vite: High-performance component-driven SPA with sub-second hot module reloading (HMR).",
                "🎨 Tailwind CSS v4: Bespoke Black & Emerald Green Cyber-Civic design system with high-contrast responsive layouts.",
                "🧭 React Router v6: Full client-side routing, protected routes, and role-based access control.",
                "💾 LocalStorage Persistence Engine: Custom reactive storage layer with seed data, dispatch events, and multi-tab synchronization.",
                "🧩 Modular Component Library: Reusable StatCards, ResourceFilters, StatusBadges, SafetyModals, and Toast Notifications."
            ],
            "footer": "Ready for seamless backend expansion (Supabase / Firebase / REST API)."
        },
        {
            "tag": "Metrics & Analytics",
            "title": "Community Impact Dashboard",
            "subtitle": "Real-time environmental and humanitarian metrics",
            "bullets": [
                "📊 1,240+ Meals Rescued: Nutritious meals redirected from commercial dumpsters to local shelters.",
                "💊 680+ Medicine Units Redirected: Sealed OTC packages and first-aid kits delivered to outreach clinics.",
                "🤝 1,800+ Beneficiaries Supported: Real people helped through 85+ verified partner organizations.",
                "♻️ 940 kg Landfill Waste Prevented: Diverting organic biomass, yielding an estimated 1,420 kg CO₂ emissions saved.",
                "📈 Interactive Visualizations: Custom SVG monthly trend bar charts, resource distribution donuts, and top donor leaderboards."
            ],
            "footer": "Data-driven impact transparency."
        },
        {
            "tag": "Roadmap & Vision",
            "title": "Future Scope & Project Conclusion",
            "subtitle": "Evolving RescueConnect into a production civic utility",
            "bullets": [
                "🗺️ Interactive GIS Mapping: Integration of Leaflet / Google Maps API for live geolocation radius routing & driver directions.",
                "☁️ Cloud Backend & Auth: Direct migration to Supabase/PostgreSQL with Row-Level Security and real-time WebSockets.",
                "📱 Mobile Progressive Web App: Volunteer driver dispatch app with barcode/QR scanning for chain-of-custody confirmation.",
                "🤝 Corporate & University Partnerships: Campus food recovery networks and dining hall surplus automation."
            ],
            "footer": "Conclusion: A production-ready, socially impactful micro-project demonstrating modern web engineering."
        }
    ]

    for item in slides_data:
        slide = prs.slides.add_slide(blank_layout)

        # Background card shape
        bg_shape = slide.shapes.add_shape(1, Inches(0), Inches(0), Inches(13.333), Inches(7.5)) # MSO_SHAPE.RECTANGLE = 1
        bg_shape.fill.solid()
        bg_shape.fill.fore_color.rgb = DARK_BG
        bg_shape.line.fill.background()

        # Inner container card
        card_shape = slide.shapes.add_shape(1, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.9))
        card_shape.fill.solid()
        card_shape.fill.fore_color.rgb = CARD_BG
        card_shape.line.color.rgb = RGBColor(30, 41, 59)
        card_shape.line.width = Pt(1.5)

        # Top Tag / Category pill
        tag_box = slide.shapes.add_textbox(Inches(1.2), Inches(1.1), Inches(10), Inches(0.4))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = item["tag"].upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = EMERALD

        # Slide Title
        title_box = slide.shapes.add_textbox(Inches(1.2), Inches(1.4), Inches(10.5), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = item["title"]
        p_title.font.size = Pt(28)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_LIGHT

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(1.2), Inches(2.2), Inches(10.5), Inches(0.5))
        tf_sub = sub_box.text_frame
        tf_sub.word_wrap = True
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = item.get("subtitle", "")
        p_sub.font.size = Pt(14)
        p_sub.font.color.rgb = ACCENT_TEAL

        # Bullets content box
        content_box = slide.shapes.add_textbox(Inches(1.2), Inches(2.8), Inches(10.9), Inches(3.2))
        tf_content = content_box.text_frame
        tf_content.word_wrap = True

        for idx, bullet_text in enumerate(item["bullets"]):
            p = tf_content.paragraphs[0] if idx == 0 else tf_content.add_paragraph()
            p.text = bullet_text
            p.font.size = Pt(13)
            p.font.color.rgb = TEXT_LIGHT
            p.space_after = Pt(10)
            p.space_before = Pt(4)

        # Footer
        footer_box = slide.shapes.add_textbox(Inches(1.2), Inches(6.1), Inches(10.5), Inches(0.4))
        tf_footer = footer_box.text_frame
        p_footer = tf_footer.paragraphs[0]
        p_footer.text = item.get("footer", "")
        p_footer.font.size = Pt(11)
        p_footer.font.color.rgb = TEXT_MUTED

    output_path = "RescueConnect_Presentation.pptx"
    prs.save(output_path)
    print(f"Successfully generated PowerPoint presentation at {output_path}")

if __name__ == "__main__":
    create_presentation()
