import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// PDF Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  riskBand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#DC2626',
    textAlign: 'center',
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#374151',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 5,
  },
  paragraph: {
    marginBottom: 8,
    lineHeight: 1.5,
    color: '#4B5563',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    width: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  listText: {
    flex: 1,
    lineHeight: 1.4,
    color: '#4B5563',
  },
  weekPlan: {
    flexDirection: 'row',
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
  },
  weekNumber: {
    width: 60,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  weekContent: {
    flex: 1,
    color: '#374151',
  },
  toolBox: {
    backgroundColor: '#EFF6FF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  disclaimer: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 35,
    right: 35,
    textAlign: 'center',
    fontSize: 8,
    color: '#9CA3AF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  centeredText: {
    textAlign: 'center',
    marginVertical: 30,
  },
  jobInfo: {
    fontSize: 14,
    marginBottom: 10,
    color: '#6B7280',
  },
  boldText: {
    fontWeight: 'bold',
  },
  beforeExample: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#DC2626',
  },
  afterExample: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#059669',
  },
})

export interface PDFData {
  jobTitle: string
  industry: string
  riskLow: number
  riskHigh: number
  exposure: number
  insights: string[]
  generatedAt: string
}

// Function that creates the Document element directly
export const createAIResiliencePlan = (data: PDFData) => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>AI-Resilience Plan</Text>
        <Text style={styles.subtitle}>Personalized Strategy Report</Text>
        <Text style={styles.subtitle}>Generated on {data.generatedAt}</Text>
      </View>

      <View style={styles.centeredText}>
        <Text style={styles.jobInfo}>
          {data.jobTitle} • {data.industry}
        </Text>
        <Text style={styles.riskBand}>
          3-Year Disruption Risk: {data.riskLow}%–{data.riskHigh}%
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.paragraph}>
          Based on your role analysis, your position has a {data.riskLow}%–{data.riskHigh}% 
          probability of experiencing significant automation disruption within 3 years. 
          This assessment considers task automation potential and industry adoption patterns.
        </Text>
        <Text style={styles.paragraph}>
          This personalized plan provides a strategic 90-day roadmap to build AI resilience, 
          enhance your human-edge capabilities, and position yourself as a valuable 
          contributor in an AI-enhanced workplace.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Insights</Text>
        {data.insights.map((insight, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>{index + 1}.</Text>
            <Text style={styles.listText}>{insight}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Week 1-4 Workflow Refactor */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Phase 1: Workflow Refactor (Weeks 1-4)</Text>
      
      <View style={styles.weekPlan}>
        <Text style={styles.weekNumber}>Week 1</Text>
        <Text style={styles.weekContent}>
          Complete workflow audit: Document every task you perform and time spent. 
          Identify repetitive, rule-based activities that could be enhanced with AI tools.
        </Text>
      </View>

      <View style={styles.weekPlan}>
        <Text style={styles.weekNumber}>Week 2</Text>
        <Text style={styles.weekContent}>
          Research and test 3 AI tools specific to your role. Focus on tools that 
          enhance rather than replace your core skills.
        </Text>
      </View>

      <View style={styles.weekPlan}>
        <Text style={styles.weekNumber}>Week 3</Text>
        <Text style={styles.weekContent}>
          Implement one AI tool into your daily workflow. Measure time savings and 
          quality improvements. Document best practices.
        </Text>
      </View>

      <View style={styles.weekPlan}>
        <Text style={styles.weekNumber}>Week 4</Text>
        <Text style={styles.weekContent}>
          Create standard operating procedures (SOPs) for human-AI collaboration. 
          Train colleagues on effective AI integration.
        </Text>
      </View>

      <View style={styles.toolBox}>
        <Text style={styles.sectionTitle}>Recommended AI Tools</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Primary: ChatGPT Plus or Claude Pro for strategic thinking and content creation
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Productivity: Notion AI for documentation, Grammarly for writing enhancement
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Analysis: Excel Copilot or Google Sheets AI for data analysis
          </Text>
        </View>
      </View>
    </Page>

    {/* Phase 2: Human-Edge Development */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Phase 2: Human-Edge Development (Weeks 5-8)</Text>

      <Text style={styles.paragraph}>
        Focus on developing uniquely human capabilities that complement AI tools 
        and provide sustainable competitive advantages.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Creative Problem-Solving Practice</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Daily: Spend 30 minutes on creative challenges outside your domain</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Weekly: Lead one brainstorming session using human-centered design thinking</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Monthly: Attend cross-functional workshops to build diverse thinking patterns</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emotional Intelligence Enhancement</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Practice active listening in every meeting—summarize what others say before responding</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Develop empathy mapping skills for understanding user/client needs</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Learn to facilitate difficult conversations and conflict resolution</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Strategic Relationship Building</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Connect with 2 new industry contacts weekly through LinkedIn and events</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Become a go-to resource by sharing valuable insights and introductions</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Join or create a professional community around AI adoption in your industry</Text>
        </View>
      </View>
    </Page>

    {/* Phase 3: Strategic Positioning */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Phase 3: Strategic Positioning (Weeks 9-12)</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Become an AI-Savvy Leader</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Volunteer to lead AI adoption initiatives in your organization
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Create training materials for colleagues on human-AI collaboration
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Speak at industry events about successful AI integration strategies
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio Development</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Document 3 successful projects showing human-AI collaboration
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Create case studies with measurable outcomes and lessons learned
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Build a personal brand around thoughtful AI adoption and human-centered innovation
          </Text>
        </View>
      </View>
    </Page>

    {/* Resume & LinkedIn Optimization */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Resume & LinkedIn Optimization</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Before & After Examples</Text>
        
        <View style={styles.toolBox}>
          <Text style={styles.beforeExample}>❌ Before:</Text>
          <Text style={styles.paragraph}>
            "Managed social media accounts and created content for marketing campaigns"
          </Text>
        </View>

        <View style={styles.toolBox}>
          <Text style={styles.afterExample}>✅ After:</Text>
          <Text style={styles.paragraph}>
            "Architected AI-enhanced content strategy, increasing engagement 40% while reducing production time 60% through strategic human-AI collaboration and creative prompt engineering"
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Power Phrases to Include</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>"Human-AI collaboration specialist"</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>"Led cross-functional AI adoption initiatives"</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>"Developed innovative workflows combining human creativity with AI efficiency"</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>"Trained teams on ethical AI integration and best practices"</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LinkedIn Strategy</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Share weekly insights about AI adoption in your industry</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Comment thoughtfully on AI-related posts from industry leaders</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Create original content showcasing human-AI collaboration success stories</Text>
        </View>
      </View>
    </Page>

    {/* 90-Day Action Plan */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>90-Day Milestone Tracker</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Week 1-2 Deliverables</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Complete comprehensive workflow audit with time-tracking</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Identify and test 3 AI tools relevant to your role</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Set up accounts and complete tutorials for chosen tools</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Month 1 Goals</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Integrate one AI tool into daily workflow with measurable results</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Create SOPs for human-AI collaboration in your role</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Schedule regular creative problem-solving practice sessions</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Month 2 Targets</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Lead training session for colleagues on AI integration</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Establish 5+ new strategic professional relationships</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Document first successful human-AI collaboration case study</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Month 3 Objectives</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Update resume and LinkedIn with AI-enhanced accomplishments</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Volunteer for or propose AI adoption project at work</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>☐</Text>
          <Text style={styles.listText}>Publish thought leadership content about AI in your industry</Text>
        </View>
      </View>
    </Page>

    {/* Interview Preparation */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Interview Preparation Scripts</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common AI-Related Interview Questions</Text>
        
        <View style={styles.toolBox}>
          <Text style={styles.boldText}>Q: "How do you see AI impacting your role?"</Text>
          <Text style={styles.paragraph}>
            Sample Answer: "I view AI as a powerful amplifier for human creativity and strategic thinking. 
            In my experience integrating AI tools like [specific tool], I've found that AI handles routine 
            tasks efficiently, freeing me to focus on complex problem-solving, relationship building, 
            and innovative solutions that require human insight. The key is thoughtful human-AI collaboration 
            where each contributes their strengths."
          </Text>
        </View>

        <View style={styles.toolBox}>
          <Text style={styles.boldText}>Q: "Tell me about a time you used AI in your work."</Text>
          <Text style={styles.paragraph}>
            Framework: "I implemented [AI tool] to [specific task/challenge]. The human element I contributed 
            was [strategic thinking/creativity/relationship management]. This resulted in [measurable outcome]. 
            The experience taught me that successful AI integration requires [insight about human oversight/ethics/strategic direction]."
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Positioning Yourself as AI-Ready</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Emphasize your ability to work alongside AI, not in competition with it</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Highlight uniquely human skills: emotional intelligence, creative problem-solving, strategic thinking</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Share specific examples of human-AI collaboration successes</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Demonstrate continuous learning mindset about emerging technologies</Text>
        </View>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.sectionTitle}>Important Disclaimer</Text>
        <Text>
          This assessment is an informational estimate of task automation exposure based on current 
          technology and adoption patterns. It is not a prediction of individual job loss or a guarantee 
          of future employment outcomes. Actual impact will vary significantly based on employer decisions, 
          regulatory changes, economic factors, and the emergence of new human-AI collaborative roles.
        </Text>
        <Text style={styles.paragraph}>
          Use this plan as a starting point for proactive career development and skill building. 
          The strategies outlined here are designed to enhance your value and adaptability in an 
          AI-enhanced workplace, regardless of specific automation timelines.
        </Text>
      </View>

      <Text style={styles.footer}>
        Generated by willaitakemyjobquiz.com • 7-day refund guarantee
      </Text>
    </Page>
  </Document>
)

// Legacy export for backward compatibility
export const AIResiliencePlan = createAIResiliencePlan