import React from 'react';
import {
  Building2,
  Compass,
  Users,
  Landmark,
  Globe,
  Layers,
  Cpu,
  Handshake,
  Target,
  TrendingUp,
  Leaf,
  HeartHandshake,
  Newspaper,
  LineChart,
  ShieldAlert,
  MapPin,
  HeartPulse,
  GraduationCap,
  Award,
  Gift,
  Share2,
  Mail,
  LucideIcon,
} from 'lucide-react';
import { CompanyProfile, asString } from '../lib/companyData';

export interface FieldDefinition {
  key: string;
  label: string;
  type?: 'text' | 'url' | 'video' | 'rating' | 'list' | 'badge' | 'paragraph';
  value?: any;
}

export interface IntelligenceSection {
  id: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  description: string;
  fields: FieldDefinition[];
}

export function buildIntelligenceSections(profile: CompanyProfile = {}): IntelligenceSection[] {
  const getVal = (k: string, fallback: string = 'Not Available') => {
    const v = profile[k];
    if (v === undefined || v === null || v === '') return fallback;
    return v;
  };

  const sections: IntelligenceSection[] = [
    // 1. Company Identity
    {
      id: 'company-identity',
      title: 'Company Identity',
      shortTitle: 'Identity',
      icon: Building2,
      description: 'Foundational corporate attributes, official name, and incorporation details',
      fields: [
        { key: 'name', label: 'Legal Entity Name', value: getVal('name') },
        { key: 'short_name', label: 'Brand Name / Ticker', value: getVal('short_name') },
        { key: 'category', label: 'Industry Category', value: getVal('category') },
        { key: 'nature_of_company', label: 'Company Structure', value: getVal('nature_of_company') },
        { key: 'incorporation_year', label: 'Founded In', value: getVal('incorporation_year') },
        { key: 'company_maturity', label: 'Maturity Stage', value: getVal('company_maturity') },
      ],
    },
    // 2. Overview & Vision
    {
      id: 'overview-vision',
      title: 'Overview & Vision',
      shortTitle: 'Overview',
      icon: Compass,
      description: 'Strategic purpose, core enterprise mission, and guiding institutional values',
      fields: [
        { key: 'overview_text', label: 'Executive Summary', type: 'paragraph', value: getVal('overview_text') },
        { key: 'vision_statement', label: 'Vision Statement', type: 'paragraph', value: getVal('vision_statement') },
        { key: 'mission_statement', label: 'Mission Statement', type: 'paragraph', value: getVal('mission_statement') },
        { key: 'core_values', label: 'Core Principles & Values', type: 'list', value: getVal('core_values') },
        { key: 'history_timeline', label: 'Milestones & History', type: 'list', value: getVal('history_timeline') },
        { key: 'mission_clarity', label: 'Mission Alignment Score', value: getVal('mission_clarity') },
      ],
    },
    // 3. Leadership
    {
      id: 'leadership',
      title: 'Leadership',
      shortTitle: 'Leadership',
      icon: Users,
      description: 'Executive officers, key decision-makers, and governance structure',
      fields: [
        { key: 'ceo_name', label: 'Chief Executive Officer (CEO)', value: getVal('ceo_name') },
        { key: 'ceo_linkedin_url', label: 'CEO LinkedIn Profile', type: 'url', value: getVal('ceo_linkedin_url') },
        { key: 'key_leaders', label: 'Executive Management Team', type: 'list', value: getVal('key_leaders') },
        { key: 'board_members', label: 'Board of Directors', type: 'list', value: getVal('board_members') },
        { key: 'decision_maker_access', label: 'Executive Accessibility', value: getVal('decision_maker_access') },
        { key: 'warm_intro_pathways', label: 'Alumni & Outreach Pathways', type: 'list', value: getVal('warm_intro_pathways') },
      ],
    },
    // 4. Funding & Financials
    {
      id: 'funding-financials',
      title: 'Funding & Financials',
      shortTitle: 'Financials',
      icon: Landmark,
      description: 'Fiscal performance, revenue distribution, capitalization, and investor backing',
      fields: [
        { key: 'annual_revenue', label: 'Annual Revenue', value: getVal('annual_revenue') },
        { key: 'annual_profit', label: 'Net Profit / Margin', value: getVal('annual_profit') },
        { key: 'revenue_mix', label: 'Revenue Streams Breakdown', value: getVal('revenue_mix') },
        { key: 'valuation', label: 'Enterprise Market Cap / Valuation', value: getVal('valuation') },
        { key: 'yoy_growth_rate', label: 'YoY Growth Rate', value: getVal('yoy_growth_rate') },
        { key: 'profitability_status', label: 'Profitability Status', value: getVal('profitability_status') },
        { key: 'key_investors', label: 'Key Institutional Investors', type: 'list', value: getVal('key_investors') },
        { key: 'recent_funding_rounds', label: 'Capitalization Structure', value: getVal('recent_funding_rounds') },
        { key: 'total_capital_raised', label: 'Total Capital Raised', value: getVal('total_capital_raised') },
        { key: 'burn_rate', label: 'Cash Flow / Burn Rate', value: getVal('burn_rate') },
        { key: 'runway_months', label: 'Capital Runway', value: getVal('runway_months') },
        { key: 'burn_multiplier', label: 'Burn Multiplier', value: getVal('burn_multiplier') },
      ],
    },
    // 5. Global Presence
    {
      id: 'global-presence',
      title: 'Global Presence',
      shortTitle: 'Presence',
      icon: Globe,
      description: 'Geographic footprint, worldwide office networks, and regional operations',
      fields: [
        { key: 'headquarters_address', label: 'Global Headquarters', value: getVal('headquarters_address') },
        { key: 'operating_countries', label: 'Operating Jurisdictions', type: 'list', value: getVal('operating_countries') },
        { key: 'office_count', label: 'Global Offices Count', value: getVal('office_count') },
        { key: 'office_locations', label: 'Major Delivery Centers', type: 'list', value: getVal('office_locations') },
        { key: 'global_exposure', label: 'Global Project Exposure', value: getVal('global_exposure') },
      ],
    },
    // 6. Products & Services
    {
      id: 'products-services',
      title: 'Products & Services',
      shortTitle: 'Products',
      icon: Layers,
      description: 'Core client offerings, industrial focus segments, and platform capabilities',
      fields: [
        { key: 'offerings_description', label: 'Core Solutions & Capabilities', type: 'list', value: getVal('offerings_description') },
        { key: 'focus_sectors', label: 'Target Industry Sectors', type: 'list', value: getVal('focus_sectors') },
        { key: 'pain_points_addressed', label: 'Client Pain Points Addressed', type: 'list', value: getVal('pain_points_addressed') },
        { key: 'top_customers', label: 'Key Customer Segments', type: 'list', value: getVal('top_customers') },
        { key: 'product_pipeline', label: 'Emerging Product Pipeline', type: 'list', value: getVal('product_pipeline') },
        { key: 'innovation_roadmap', label: 'R&D Innovation Roadmap', type: 'list', value: getVal('innovation_roadmap') },
      ],
    },
    // 7. Technology Stack
    {
      id: 'technology-stack',
      title: 'Technology Stack',
      shortTitle: 'Tech Stack',
      icon: Cpu,
      description: 'Underlying tools, cloud ecosystems, developer platforms, and AI maturity',
      fields: [
        { key: 'tech_stack', label: 'Primary Tech Stack & Tools', type: 'list', value: getVal('tech_stack') },
        { key: 'ai_ml_adoption_level', label: 'AI/ML Maturity & Adoption', type: 'paragraph', value: getVal('ai_ml_adoption_level') },
        { key: 'technology_partners', label: 'Strategic Tech Alliances', type: 'list', value: getVal('technology_partners') },
        { key: 'intellectual_property', label: 'Intellectual Property & Patents', type: 'paragraph', value: getVal('intellectual_property') },
        { key: 'r_and_d_investment', label: 'Annual R&D Commitment', value: getVal('r_and_d_investment') },
        { key: 'cybersecurity_posture', label: 'Security Certifications & Posture', type: 'list', value: getVal('cybersecurity_posture') },
        { key: 'tech_adoption_rating', label: 'Innovation Benchmarking', value: getVal('tech_adoption_rating') },
      ],
    },
    // 8. Partnerships & Ecosystem
    {
      id: 'partnerships-ecosystem',
      title: 'Partnerships & Ecosystem',
      shortTitle: 'Partnerships',
      icon: Handshake,
      description: 'Vendor networks, platform tiering, and strategic business alliances',
      fields: [
        { key: 'partnership_ecosystem', label: 'Ecosystem Alliances', type: 'list', value: getVal('partnership_ecosystem') },
        { key: 'technology_partners', label: 'Tier-1 Solution Partners', type: 'list', value: getVal('technology_partners') },
        { key: 'strategic_priorities', label: 'Strategic Ecosystem Priorities', type: 'list', value: getVal('strategic_priorities') },
        { key: 'industry_associations', label: 'Global Industry Forums', type: 'list', value: getVal('industry_associations') },
      ],
    },
    // 9. Competitive Landscape
    {
      id: 'competitive-landscape',
      title: 'Competitive Landscape',
      shortTitle: 'Competitors',
      icon: Target,
      description: 'Market peers, competitive moats, market differentiators, and challenges',
      fields: [
        { key: 'key_competitors', label: 'Direct Enterprise Competitors', type: 'list', value: getVal('key_competitors') },
        { key: 'competitive_advantages', label: 'Competitive Moats & Strengths', type: 'list', value: getVal('competitive_advantages') },
        { key: 'benchmark_vs_peers', label: 'Performance vs Peer Group', type: 'paragraph', value: getVal('benchmark_vs_peers') },
        { key: 'weaknesses_gaps', label: 'Identified Vulnerabilities & Gaps', type: 'list', value: getVal('weaknesses_gaps') },
        { key: 'key_challenges_needs', label: 'Macro Challenges & Headwinds', type: 'list', value: getVal('key_challenges_needs') },
      ],
    },
    // 10. Market Opportunity
    {
      id: 'market-opportunity',
      title: 'Market Opportunity',
      shortTitle: 'Market TAM',
      icon: TrendingUp,
      description: 'Addressable market size, serviceable segments, and forward growth targets',
      fields: [
        { key: 'tam', label: 'Total Addressable Market (TAM)', value: getVal('tam') },
        { key: 'sam', label: 'Serviceable Addressable Market (SAM)', value: getVal('sam') },
        { key: 'som', label: 'Serviceable Obtainable Market (SOM)', value: getVal('som') },
        { key: 'market_share_percentage', label: 'Current Global Market Share', value: getVal('market_share_percentage') },
        { key: 'future_projections', label: 'Mid-term Financial Horizon', value: getVal('future_projections') },
        { key: 'strategic_priorities', label: 'Expansion Priorities', type: 'list', value: getVal('strategic_priorities') },
      ],
    },
    // 11. Core Value Proposition & ESG
    {
      id: 'core-value-proposition-esg',
      title: 'Core Value Proposition & ESG',
      shortTitle: 'Value & ESG',
      icon: Leaf,
      description: 'Differentiating client value alongside corporate sustainability commitments',
      fields: [
        { key: 'core_value_proposition', label: 'Core Value Proposition', type: 'paragraph', value: getVal('core_value_proposition') },
        { key: 'unique_differentiators', label: 'Distinctive Differentiators', type: 'list', value: getVal('unique_differentiators') },
        { key: 'esg_ratings', label: 'ESG Frameworks & Commitments', type: 'list', value: getVal('esg_ratings') },
        { key: 'carbon_footprint', label: 'Net-Zero & Carbon Neutrality', value: getVal('carbon_footprint') },
        { key: 'ethical_sourcing', label: 'Supply Chain Sourcing Standards', value: getVal('ethical_sourcing') },
        { key: 'sustainability_csr', label: 'Corporate Social Responsibility', value: getVal('sustainability_csr') },
      ],
    },
    // 12. Culture & Work Life
    {
      id: 'culture-work-life',
      title: 'Culture & Work Life',
      shortTitle: 'Culture',
      icon: HeartHandshake,
      description: 'Internal atmosphere, managerial quality, psychological safety, and ethics',
      fields: [
        { key: 'work_culture_summary', label: 'Cultural Dynamics', type: 'list', value: getVal('work_culture_summary') },
        { key: 'manager_quality', label: 'People Management & Mentorship', value: getVal('manager_quality') },
        { key: 'psychological_safety', label: 'Psychological Safety Index', value: getVal('psychological_safety') },
        { key: 'feedback_culture', label: 'Performance Feedback Cadence', value: getVal('feedback_culture') },
        { key: 'diversity_metrics', label: 'Diversity & Demographic Balance', value: getVal('diversity_metrics') },
        { key: 'diversity_inclusion_score', label: 'DEI Leadership Initiatives', value: getVal('diversity_inclusion_score') },
        { key: 'ethical_standards', label: 'Governance & Ethical Conduct', value: getVal('ethical_standards') },
        { key: 'burnout_risk', label: 'Work-Life Balance & Burnout Risk', value: getVal('burnout_risk') },
        { key: 'layoff_history', label: 'Workforce Stability Track Record', value: getVal('layoff_history') },
        { key: 'crisis_behavior', label: 'Crisis Management Stance', value: getVal('crisis_behavior') },
      ],
    },
    // 13. Recent News & Milestones
    {
      id: 'recent-news-milestones',
      title: 'Recent News & Milestones',
      shortTitle: 'News',
      icon: Newspaper,
      description: 'Press releases, major industry acquisitions, case studies, and enterprise wins',
      fields: [
        { key: 'recent_news', label: 'Latest Strategic Announcements', type: 'list', value: getVal('recent_news') },
        { key: 'case_studies', label: 'Flagship Enterprise Transformations', type: 'list', value: getVal('case_studies') },
        { key: 'history_timeline', label: 'Innovation Breakthroughs', type: 'list', value: getVal('history_timeline') },
        { key: 'awards_recognitions', label: 'Recent Industry Recognitions', type: 'list', value: getVal('awards_recognitions') },
      ],
    },
    // 14. Sales & Customer Metrics
    {
      id: 'sales-customer-metrics',
      title: 'Sales & Customer Metrics',
      shortTitle: 'Metrics',
      icon: LineChart,
      description: 'Go-to-market motions, client concentration, and customer health indicators',
      fields: [
        { key: 'sales_motion', label: 'Primary Sales Motion', value: getVal('sales_motion') },
        { key: 'go_to_market_strategy', label: 'Go-To-Market Channel Strategy', type: 'list', value: getVal('go_to_market_strategy') },
        { key: 'customer_acquisition_cost', label: 'Enterprise CAC Estimate', value: getVal('customer_acquisition_cost') },
        { key: 'customer_lifetime_value', label: 'Enterprise Customer LTV', value: getVal('customer_lifetime_value') },
        { key: 'cac_ltv_ratio', label: 'LTV to CAC Ratio', value: getVal('cac_ltv_ratio') },
        { key: 'churn_rate', label: 'Annual Client Retention / Churn Rate', value: getVal('churn_rate') },
        { key: 'net_promoter_score', label: 'Net Promoter Score (NPS)', value: getVal('net_promoter_score') },
        { key: 'customer_concentration_risk', label: 'Account Concentration Risk', value: getVal('customer_concentration_risk') },
      ],
    },
    // 15. Risk & Compliance
    {
      id: 'risk-compliance',
      title: 'Risk & Compliance',
      shortTitle: 'Compliance',
      icon: ShieldAlert,
      description: 'Statutory compliance, legal audits, geopolitical threats, and supplier risks',
      fields: [
        { key: 'regulatory_status', label: 'Compliance & Audit Standards', type: 'list', value: getVal('regulatory_status') },
        { key: 'legal_issues', label: 'Litigation & Legal Scrutiny', type: 'paragraph', value: getVal('legal_issues') },
        { key: 'macro_risks', label: 'Macroeconomic Sensitivity', type: 'list', value: getVal('macro_risks') },
        { key: 'geopolitical_risks', label: 'Geopolitical & Cross-Border Risks', type: 'list', value: getVal('geopolitical_risks') },
        { key: 'supply_chain_dependencies', label: 'Operational Dependencies', type: 'list', value: getVal('supply_chain_dependencies') },
      ],
    },
    // 16. Work Location & Commute
    {
      id: 'work-location-commute',
      title: 'Work Location & Commute',
      shortTitle: 'Location',
      icon: MapPin,
      description: 'Hybrid work model, weekly office rhythm, commute hubs, and transit access',
      fields: [
        { key: 'remote_policy_details', label: 'Remote / In-Office Hybrid Split', value: getVal('remote_policy_details') },
        { key: 'flexibility_level', label: 'Schedule Flexibility Level', value: getVal('flexibility_level') },
        { key: 'typical_hours', label: 'Standard Working Hours', value: getVal('typical_hours') },
        { key: 'overtime_expectations', label: 'Project Overtime Expectations', value: getVal('overtime_expectations') },
        { key: 'weekend_work', label: 'Weekend Work Frequency', value: getVal('weekend_work') },
        { key: 'location_centrality', label: 'Office Zone Centrality', value: getVal('location_centrality') },
        { key: 'office_zone_type', label: 'Commercial Zone Classification', value: getVal('office_zone_type') },
        { key: 'public_transport_access', label: 'Public Transit Accessibility', type: 'list', value: getVal('public_transport_access') },
        { key: 'cab_policy', label: 'Transportation & Cab Policy', value: getVal('cab_policy') },
        { key: 'airport_commute_time', label: 'Transit Time to Airport', value: getVal('airport_commute_time') },
      ],
    },
    // 17. Safety & Wellbeing
    {
      id: 'safety-wellbeing',
      title: 'Safety & Wellbeing',
      shortTitle: 'Wellbeing',
      icon: HeartPulse,
      description: 'Campus emergency readiness, night transport security, and wellness infrastructure',
      fields: [
        { key: 'area_safety', label: 'Premises Security Assessment', value: getVal('area_safety') },
        { key: 'safety_policies', label: 'Late-Night Transit & Campus Safety', type: 'list', value: getVal('safety_policies') },
        { key: 'infrastructure_safety', label: 'Facility Access Control & Fire Codes', value: getVal('infrastructure_safety') },
        { key: 'emergency_preparedness', label: 'Emergency & Medical Protocols', value: getVal('emergency_preparedness') },
        { key: 'health_support', label: 'Mental Wellness & Counseling Support', type: 'list', value: getVal('health_support') },
        { key: 'family_health_insurance', label: 'Dependent Health Coverage', value: getVal('family_health_insurance') },
      ],
    },
    // 18. Career Growth & Learning
    {
      id: 'career-growth-learning',
      title: 'Career Growth & Learning',
      shortTitle: 'Growth',
      icon: GraduationCap,
      description: 'Mentorship tracks, certification sponsorship, internal mobility, and career paths',
      fields: [
        { key: 'training_spend', label: 'Annual Training Budget per Head', value: getVal('training_spend') },
        { key: 'onboarding_quality', label: 'New-Hire Onboarding Experience', value: getVal('onboarding_quality') },
        { key: 'learning_culture', label: 'Internal Academies & Certifications', type: 'list', value: getVal('learning_culture') },
        { key: 'mentorship_availability', label: 'Formal Mentorship Programs', type: 'list', value: getVal('mentorship_availability') },
        { key: 'internal_mobility', label: 'Internal Project Mobility Index', value: getVal('internal_mobility') },
        { key: 'promotion_clarity', label: 'Promotion Ladder & Review Cycles', value: getVal('promotion_clarity') },
        { key: 'tools_access', label: 'Enterprise Tool & Lab Access', value: getVal('tools_access') },
        { key: 'role_clarity', label: 'Role & Responsibility Clarity', value: getVal('role_clarity') },
        { key: 'early_ownership', label: 'Early-Career Project Ownership', value: getVal('early_ownership') },
        { key: 'work_impact', label: 'Client Revenue & Business Impact', value: getVal('work_impact') },
        { key: 'execution_thinking_balance', label: 'Execution vs Strategic Thinking', value: getVal('execution_thinking_balance') },
        { key: 'cross_functional_exposure', label: 'Cross-Domain Exposure', type: 'list', value: getVal('cross_functional_exposure') },
        { key: 'skill_relevance', label: 'Industry Market Skill Longevity', value: getVal('skill_relevance') },
        { key: 'exit_opportunities', label: 'Alumni Transition Destinations', type: 'list', value: getVal('exit_opportunities') },
      ],
    },
    // 19. Brand & Reputation
    {
      id: 'brand-reputation',
      title: 'Brand & Reputation',
      shortTitle: 'Reputation',
      icon: Award,
      description: 'Industry standing, Fortune/Forbes ratings, awards, and enterprise sentiment',
      fields: [
        { key: 'brand_value', label: 'Global Brand Standing', value: getVal('brand_value') },
        { key: 'brand_sentiment_score', label: 'Corporate Sentiment Score', value: getVal('brand_sentiment_score') },
        { key: 'awards_recognitions', label: 'Prestigious Global Honors', type: 'list', value: getVal('awards_recognitions') },
        { key: 'customer_testimonials', label: 'Signature Client Proof Points', type: 'list', value: getVal('customer_testimonials') },
        { key: 'event_participation', label: 'Flagship Technology Conferences', type: 'list', value: getVal('event_participation') },
        { key: 'website_quality', label: 'Corporate Portal & UX Audit', value: getVal('website_quality') },
      ],
    },
    // 20. Compensation & Benefits
    {
      id: 'compensation-benefits',
      title: 'Compensation & Benefits',
      shortTitle: 'Benefits',
      icon: Gift,
      description: 'Employee welfare packages, equity grants, insurance, and leave entitlements',
      fields: [
        { key: 'fixed_vs_variable_pay', label: 'Fixed vs Variable Pay Structure', value: getVal('fixed_vs_variable_pay') },
        { key: 'bonus_predictability', label: 'Annual Bonus Predictability', value: getVal('bonus_predictability') },
        { key: 'esops_incentives', label: 'Equity Grants & Stock Incentives', type: 'list', value: getVal('esops_incentives') },
        { key: 'leave_policy', label: 'Paid Leave & Sabbatical Policy', type: 'list', value: getVal('leave_policy') },
        { key: 'family_health_insurance', label: 'Comprehensive Family Insurance', value: getVal('family_health_insurance') },
        { key: 'relocation_support', label: 'Relocation & Onboarding Allowances', type: 'list', value: getVal('relocation_support') },
        { key: 'lifestyle_benefits', label: 'Wellness, Meals & Lifestyle Perks', type: 'list', value: getVal('lifestyle_benefits') },
      ],
    },
    // 21. Digital Presence & Ratings
    {
      id: 'digital-presence-ratings',
      title: 'Digital Presence & Ratings',
      shortTitle: 'Ratings',
      icon: Share2,
      description: 'Verified employee reviews, media reach, and official social portals',
      fields: [
        { key: 'glassdoor_rating', label: 'Glassdoor Verified Rating', type: 'rating', value: getVal('glassdoor_rating') },
        { key: 'indeed_rating', label: 'Indeed Employee Score', type: 'rating', value: getVal('indeed_rating') },
        { key: 'google_rating', label: 'Google Business Rating', type: 'rating', value: getVal('google_rating') },
        { key: 'social_media_followers', label: 'LinkedIn Community Size', value: getVal('social_media_followers') ? `${Number(getVal('social_media_followers')).toLocaleString()} followers` : 'Not Available' },
        { key: 'website_traffic_rank', label: 'Global Web Traffic Rank', value: getVal('website_traffic_rank') },
        { key: 'website_url', label: 'Corporate Homepage', type: 'url', value: getVal('website_url') },
        { key: 'linkedin_url', label: 'LinkedIn Profile', type: 'url', value: getVal('linkedin_url') },
        { key: 'twitter_handle', label: 'X / Twitter Profile', value: getVal('twitter_handle') },
        { key: 'marketing_video_url', label: 'Official Media / YouTube Channel', type: 'video', value: getVal('marketing_video_url') },
      ],
    },
    // 22. Contact Information
    {
      id: 'contact-information',
      title: 'Contact Information',
      shortTitle: 'Contact',
      icon: Mail,
      description: 'Official corporate channels, campus recruitment queries, and headquarters contact',
      fields: [
        { key: 'primary_contact_email', label: 'Corporate Inquiry Email', value: getVal('primary_contact_email') },
        { key: 'contact_person_name', label: 'Campus Liaison / POC', value: getVal('contact_person_name') },
        { key: 'contact_person_title', label: 'Liaison Title', value: getVal('contact_person_title') },
        { key: 'contact_person_email', label: 'Campus POC Email', value: getVal('contact_person_email') },
        { key: 'contact_person_phone', label: 'Campus POC Phone', value: getVal('contact_person_phone') },
        { key: 'headquarters_address', label: 'Corporate Postal Address', value: getVal('headquarters_address') },
      ],
    },
  ];

  return sections;
}
