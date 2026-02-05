// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "FETCH_GEMINI") {
        (async () => {
            try {
                const systemPrompt = `You are an automated Google Form filling assistant.

Your task is to answer EACH question strictly based on the provided user profile.

CRITICAL RULES (MUST FOLLOW):
1. You MUST answer EVERY question.
2. For multiple-choice or checkbox questions:
   - ONLY choose from the EXACT option text provided.
   - DO NOT rephrase, shorten, or modify option text.
3. For text input questions:
   - Provide a SHORT, relevant answer derived from the profile.
4. Always try to find the BEST matching information in the profile, even if the match is indirect.
5. If NO clear information exists for an option-based question:
   - Choose the MOST reasonable option.
6. NEVER invent personal information.
7. NEVER leave any question unanswered.
8. NEVER return explanations, comments, or markdown.
9. NEVER return placeholders such as MANUAL_REVIEW.
10. Output MUST be a SINGLE valid JSON object.
11. Use the provided question ID EXACTLY as the JSON key.
12. Values MUST be strings.

OUTPUT FORMAT (STRICT):
{"q_0":"answer text","q_1":"Exact Option Text","q_2":"another answer"}
`;

                const userContent = `User Profile Information: ${request.profile}
You are an expert lecturer in IAP301 Policy Development in Information Assurance. Your role is to teach, summarize, and answer questions based solely on the provided lecture content from four files (Lect02.pptx, Lect03.pptx.pdf, Lect04.pptx.pdf, Lect05.pptx.pdf). Do not add external knowledge or assumptions. Use chain-of-thought reasoning: first recall relevant sections, then analyze, then respond clearly.
### CRITICAL FALLBACK RULE - WHEN INFORMATION IS NOT FOUND IN LECTURE SLIDES

When answering ANY question (especially multiple-choice quiz questions, discussion posts, assignments, or explanations):

1. PRIORITY 1 – ALWAYS FIRST: Search ONLY within the lecture slide content provided in this prompt (Lectures 2, 3, 4, 5).  
   - If the answer or relevant concept is clearly present in the slides → use it 100%. Quote exact text if possible.  
   - Do NOT invent or assume anything beyond the slides.

2. PRIORITY 2 – ONLY IF NOT FOUND IN SLIDES:  
   If the specific concept, term, definition, or correct answer is NOT present or NOT clearly explained in the lecture slides, then:  
   → Immediately switch to the standard textbook for this course:  
      "Security Policies and Implementation Issues" (by Robert Johnson or the official IAP301 textbook / Jones & Bartlett Learning series).  

   Use standard, widely-accepted knowledge from this textbook or equivalent authoritative sources in information assurance / security policy courses (e.g., CIW Security Professional, EC-Council materials, or NIST/COBIT-aligned content commonly used in IAP301).  

   In this case:  
   - State clearly: "This information is not explicitly covered in the provided lecture slides. Falling back to standard textbook knowledge from 'Security Policies and Implementation Issues' / IAP301 course materials:"  
   - Then provide the accurate textbook-based answer.  
   - Do NOT mix slide content with textbook content unless clearly separated.

### Core Lecture Content (Context):
#### File 1: Lect05 (User Policies)
- Reasons for governing users with policies
- Regular and privileged users
- Acceptable use policy (AUP) and privileged-level access agreement (PAA)
- Security awareness policy (SAP)
- Differences between public and private user domain policies
■ Computer Users
■ Metcalfe law
- Protecting an organization's computers and network
- Managing passwords
- Managing software licenses
- Managing intellectual property
- E-mail etiquette
- Level of privacy an individual should expect when using an organization's computer or network
- Noncompliance consequences
* Acknowledgement of the risk associated with elevated access in the event the credentials are breached or abused
* Promise to only use the access granted for approved organization business
* Promise not to attempt to “hack” or breach security
* Promise to protect any output from these credentials such as reports, logs, files, and downloads
Helping employees really ‘get’ company policy Defining responsibilities and roles for instilling security awareness among all personnel granted access to information resources Educating administrators and users at all levels on the safe and responsible use and handling of information
• Employees
• System administrators
• Security personnel
• Contractors
• Auditors or guests and general public
Each user requires different levels of access to applications and information within the organization
Users require information from different systems across the organization to do their jobs
The data coming from different systems often has different security controls
The different role each user has within the organization can create security challenges
- Chief Financial Officer (CFO)
- Chief Operations Officer (COO)
- Security manager
- IT manager
- Marketing and sales manager
- Unit manager
- Materials manager
- Purchasing manager
- Inventory manager
- Other Users
- Direct Managers
- Human Resources
- Security Administrators
- Senior Management
- Legal Department
- Law Enforcement
• Responsible for governance and compliance requirements, and funding and policy support
• Responsible for security management, planning, and implementation; also risk management and contingency planning
• Responsible for broad training in security planning, system and application security management, risk management, and contingency planning
• Responsible for broad training in security planning, system and application security management, risk management, and contingency planning
• Responsible for ensuring the legality of policies
• Responsible for basic security
• Public organizations must follow Sarbanes Oxley Compliance (SOX), Health Insurance Portability and Accountability Act (HIPPA), and other compliance laws
• Private organizations are often smaller and easier to control from a user standpoint
• Private organizations may not follow public-compliance laws
• Private organizations may follow public-compliance laws depending on their governance requirements
• Public organizations may be small in size and thus have similar control over their user populations
People that use computers have different skill levels, thus have different perceptions on information security
Social engineering can occur at any time within any organization
Human mistakes often occur and can lead to security breaches
One of the most significant threats come from within an organization from an “Insider”
Applications have weaknesses that are not known and these weaknesses can be exploited by users either knowingly or unknowingly
Security awareness training can remove this weakest link in the security chain
Users don't appreciate the business reasons behind the policies
Users don't buy into the policies
Users know the policies won't be enforced
Users are lazy
Users' desire to violate policies outweighs their perception of the risks involved

#### File 2: Lect03 (Policies, Standards, Procedures, and Guidelines)
Defines how an organization performs and conducts business functions and transactions with a desired outcome.
An established method implemented organization-wide.
Steps required to implement a process.
A parameter within which a policy, standard, or procedure is suggested.
- Creating security policy
- Changing security policy
- Maintaining security
* Security policies provide vital support to security professionals, yet few organizations take the time to create decent policies
* Many organizations just download examples from the web and cut and paste as they see fit.
* But this create problems later on ie: Vulnerabilities.
• short as possible
• relevant to the audience
• aligned to the needs of the business
• aligned to the legislation and regulatory frameworks in which you operate
• should add value to the employee and the overall outcomes and behaviors you are looking to promote
• HealthCare w/7000 devices
• Incomplete Inventory
• No easy way to classify assets
• Health Insurance Portability and Accountability Act (HIPPA)
• Used NIST SP 800-53 to establish the framework
• State of Tennessee
• Used ISO/IEC 17799 (27002)
• Policies and frameworks covered all information asset owned, leased, or controlled by the State of Tennessee
• Verizon Inc.
• The network stopped working and the financial markets stopped operating as well
• 85% of network was privately held
• Used National Infrastructure Protection Plan (NIPP) framework
* Your policies need to be highly visible if they are to be effective.
* To spread the word, you might use:
* Presentations
* Videos
* Panel discussions
* Guest speakers
* Road shows
* Summits
* Question/answer forums
* Newsletters
* The typical information security policy may have the following headings:
* Document Control
* Document Location
* Revision History
* Approvals
* Distribution
* Document History
- Enquiries
- Introduction and Purpose
- Scope
- Your Responsibilities
- Our Responsibilities
- Where to find more information
- Equal Opportunities Impact Assessment
The Policy Change Control Board should include representation from the following functional areas of the organization and include (in random order):
• Security
• Compliance Management
• Auditing
• Human Resources
• Legal
• Project Management
• Functional Management
* Each member is responsible for reviewing and approving or rejecting changes to the policies, reflecting alignment to business objectives in their sphere of influence.
* Each functional area oversees policies pertaining to their respective areas of responsibility, while they also play a role in the approval of policy changes that effect the organization as a whole.
Possible Members come from functional areas of the organization and include (in random order):
* Security
* Compliance Management
* Auditing
- Human Resources (HRs)
- Leadership from the key information business units
- Project Managers (PMs)
- The roles for each member would be to approve changes to the policies, reflecting alignment to business objectives
- Each functional area oversee policies pertaining to their perspective area of responsibility, while they also play a role in the approval of policy changes that effect the organization as a whole
- Policies must align with the business model or objective to be effective
- External factors: Regulatory and governmental initiatives
- Internal factors: Culture, support, and funding

#### File 3: Lect04 (Information Systems Security Policy Framework)
Choosing the framework that works in your organization is not easy
• The one selected will be based on the organizational type, risk, and view from top management
A simplified security policy framework domain model
• Federal Information Security Management act of 2002 (FISMA)
• Committee of Sponsoring Organizations (COSO)
• Control Objectives for Information and related Technology (COBIT) (public organization only as this is for SOX 404)
Frameworks are flexible and allow an organization to adopt constructs that fit their overall governance and compliance planning requirements
* IT security controls are a function of IT infrastructure that an organization has in its control and the regulatory and business objectives that need to be controlled
* You can have too many IT security controls, impeding the organization from operating at optimal capacity, thus reducing its revenue potential
* Organizations often combine elements of different frameworks in order to ensure that selected controls offer maximum benefit.
• Identifies and assesses BU risk
• Mitigates and reduces BU risk
• Follows policies
• Follows risk management program
• Creates a business risk strategy
• Identifies and assesses enterprise risk
• Mitigates and reduces enterprise risk
• Aligns policies
• Creates risk management program
• Oversees risk functions
• Identifies trends and opportunity for change
• Oversees enterprise risk committees
• Oversees enterprise risk functions
• Provides guidance to key stakeholders
• Provides opinion of design and effectiveness of risk program
• Facilitates risk discussion with executive leadership and board
• Provides input on risk strategy
* Generic IT security controls as a function of a business model
* Deploy a layered security approach
* Use SOD approach
- This applies to transactions within the domain of responsibility
* Conduct security awareness training annually
* Apply the 3 lines of defense model
* First line: The business unit
* Second line: The risk management team
* Third line: Use independent auditors
• A discipline formally bringing together risk and compliance
• GRC best practices
• ISO 27000 series
• COBIT
• Follows common risk methodologies
• Defines risk in terms of business threats
• Applies flexible frameworks to satisfy multiple compliance regulations
• Eliminates redundant controls, policies, and efforts
• Proactively enforces policy
• GRC focuses on technology, a series of tools and centralized policies
• ERM focuses on value delivery, takes a broad look at risk based on the adoption driven by the organizations leadership, and shifts the discussion from what the organization should spend to how the organization spends money, in mitigating risk.
* Using a risk management approach to framework implementation reducing the highest risk to the organization
* The ISACA COBIT framework for SOX 404 requirements for publically traded organizations
* Aligning the organization's security policy with business objectives and regulatory requirements
* The use of a best practice methodology will best be answered based on organizational requirements and governmental regulations
• Responsible for governance and compliance requirements, funding, and policy support
• Responsible for policy creation, reporting, funding, and support
• Responsible for data stewardship, owners of the data
* System Administrators/Application Administrators
* Responsible for custodianship of the data, maintaining the quality of the data, and executing the policies and procedures pertaining to the data, like backup, versioning, updating, downloading, and database administration
* Security Administrator
* Responsible for granting access and assess threats to the data, IA program
* Implementing a governance framework can allow the organization to identify and mitigate risks in an orderly fashion
* This can be a cost reduction move for organizations as they can easily respond to audit requests
* A well-defined governance and compliance framework provides a structured approach
* It can provide a common language
* It is also a best-practice model for organizations of all shapes and sizes
* Controls and risks become measurable with a framework. Thus, organizations that have a governance and compliance framework can operate more efficiently
* If you can measure the organization against a fixed set of standards and controls you have won
Using layered security provides redundancy of layers, so if one fails to catch the risk, another layer should. Thus, the more layers the better the chance that a risk will be mitigated. However, one must remember that cost and restrictions are also present with each layer deployed
These SOD duties fall within each individual domain and applying SOD can and will reduce both fraud and human errors

#### File 4: Lect02 (Risk Mitigation and Policy Implementation)
- Business challenges in each IT domain
- Risk mitigation in seven IT domains
- Organizational hurdles to policy implementation
- Policy implementation issues related to humans in the workplace
- Executive management
* Each of the seven IT domains have different types of risks associated with them, and policy creation seeks to reduce or mitigate these risks.
* Each policy created for the seven IT domains must address as many risks in that domain as possible.
Security policies template
https://www.sans.org/security-resources/policies/
• Unclear purpose
• Doubt
• Insufficient support
• Organizational baggage
• Lack of incentives
• Lack of candor
• Low tolerance for bad news
• Unmanageable complexity
* Unclear purpose happens when a policy's business value hasn't been clearly delineated.
* It's important to demonstrate how policies will reduce risk.
* It's equally important to demonstrate how the policies were derived in a way that kept the business cost and impact low
* Doubt occurs when there is disagreement about the need for change.
* Change is perceived as a distraction from the core business.
* You need to convince the executive that the benefits outweigh disruption.
* Doubt may also be a factor if an organization has had several false starts.
* Even when the message and benefits are clear, it is also a matter of credibility with the executive.
* Most leaders don't like surprises and want to know they are not alone in their support for an idea.
* To avoid surprises, be sure to articulate any pushback you are getting from other leaders.
* This will allow the executive to be an advocate and sway his or her peers.
* When problems are encountered, be sure to anticipate where your support will emerge or evaporate.
* Organizational baggage refers to how the organization executes based on past unsuccessful efforts.
* Unlike doubt, which is a personal credibility issue, this category focuses on the organization's ability to execute.
* If an organization has problems implementing policies of any kind, security policies won't likely be any different.
* Organizations that reorganize frequently fall within this category.
* Lack of organizational incentives refers to the inability to motivate behavior.
* Value is only derived from policies when they are enforced.
* An organization must have the will and process to reward adherence.
* The organization must have a low or zero tolerance for security policy violations.
* Lack of candor refers to not having open, candid conversations.
* In the case of policies, you need to be clear what can and cannot be achieved.
* You need to listen and explain how the business's input was considered and adopted or rejected.
* Executives need a sense that they were part of a process and not just the recipients of the result.
* Low tolerance for bad news refers to how executives react to missteps.
* You can count on an error in judgment at some point in implementing security policies.
* You need to prepare executives for the inevitable.
* You also need to gauge how they will react.
* Unmanageable complexity refers to how complex and realistic the project is.
* The ability of the organization to support the security polices will be an important topic of conversation.
Security Policy implementation can expect executive management support
Business objectives identified align with compliance laws or regulations required to conduct business
Data supporting policy implementation aligned with business objectives
Security Policy implementation can expect to fail without executive management support
Business objectives identified do not align with compliance laws or regulations required to conduct business, or are unclear and have insufficient support from leadership
Data supporting policy implementation not aligned with business objectives
• Division of labor: who is responsible for what?
• Span of control: how much responsibility does one individual have?
- Hierarchical
- Flat
- Management structure is cross-functional and more open to employee input.
- Dialogue and communications between employees may occur across organizational functions.
- Employees tend to be more open and communicative.
- Employees tend to be more creative and involved in business decisions.
- Employees are not as constrained within their role or function and can see and interact across the organization more freely.
- Departments are separated by function, creating multiple functional silos.
- Business decision-making performed at the executive management level.
- Dialogue and communications is more top-down.
- Employees tend to be less communicative and more isolated within their business functions.
- Employees find it difficult to offer additional creativity or input to business decisions.
- Employees are constrained within their roles and cannot interact outside of their business functions without going through a chain of command.
* Each organization has many different types of personal traits, each affecting the organization in its attempt to implement a policy in the workplace.
* The most common workplace personality types include:
* Commanders
* Attackers
* Performers
* Analyticals
* Drifters
* Pleasers
* Avoiders
* Achievers
* Commanders are demanding and not tactful.
* They come across at best as impolite, at worst rude and abrupt.
* They are forceful in an attempt to achieve stated goals.
* They can break through barriers that have prevented past success.
* Drifters are uncomfortable with structure and deadlines.
* They may have great soft skills but might not follow up and take a more laid-back attitude toward work assignments.
* What they lack in discipline may be offset by their creativity and thinking out of the box.
* Drifters are often at odds with Commanders.
* Attackers may seem angry or even hostile toward ideas and others on the team.
* They are critical of others' ideas and are egotistical.
* Although their biting attacks other team members can be disruptive, they can also take on very unpopular tasks.
* Pleasers are very kind and thoughtful to others.
* They want everyone to “feel good” and will put their own self-interest aside for the good of the whole.
* They may shy away from enforcing rules that offend others, but they promote the concept of collaboration and teamwork.
* Performers like to be on center stage.
* They like to entertain and be the center of attention.
* They develop over time a wit and charm to capture people's attention.
* They may not be the highest producer and may be in the habit of self-promotion.
* They are often excellent public speakers and can establish new relationships important to the business.
* Avoiders like to fly under the radar and be in the background.
* They tend not to take chances or do anything that brings attention on them.
* They will do precisely what’s asked of them but not much more.
* However, they are very dependable and their work quality is consistent.
* Analyticals like structure and deadlines.
* They measure their success in precise terms of the number of widgets produced in a given time at a given quality level.
* They tend to be obsessed with precision and attention to detail.
* They may not be the best at understanding human dynamics, so working with customers and emotions may be a problem.
* They are very comfortable with lots of information and have the ability to analyze issues and evaluate different types of risk.
* Achievers are very result oriented.
* They may have several traits of the other personality types.
* For example, they may be self-confident but not at the expense of others.
* They genuinely want the best result and may seek different ways to achieve it.
* Achievers can make good leaders.

#### Lecture 2. Risk Mitigation and Business Support Processes
Learning Objective
Analyze how security policies help mitigate risks and support business processes in various domains in the information technology (IT) infrastructure.
Key Concepts
Business challenges in each IT domain
Risk mitigation in seven IT domains
Organizational hurdles to policy implementation
Policy implementation issues related to humans in the workplace
Executive management
Risk Mitigation and the Role of Security Policies
Each of the seven IT domains have different types of risks associated with them, and policy creation seeks to reduce or mitigate these risks.
Each policy created for the seven IT domains must address as many risks in that domain as possible.
A Sample of Security Policies
Security policies template
https://www.sans.org/security-resources/policies/
Seven Domains of a Typical IT Infrastructure
Switch
Policy Failure Issues
The most common reasons that policy implementation efforts fail to get senior management support are:
Unclear purpose
Doubt
Insufficient support
Organizational baggage
Lack of incentives
Lack of candor
Low tolerance for bad news
Unmanageable complexity
Unclear Purpose
Unclear purpose happens when a policy’s business value hasn’t been clearly delineated.
It’s important to demonstrate how policies will reduce risk.
It’s equally important to demonstrate how the policies were derived in a way that kept the business cost and impact low
Doubt
Doubt occurs when there is disagreement about the need for change.
Change is perceived as a distraction from the core business.
You need to convince the executive that the benefits outweigh disruption.
Doubt may also be a factor if an organization has had several false starts.
Even when the message and benefits are clear, it is also a matter of credibility with the executive.
Insufficient Support
Most leaders doesn’t like surprises and want to know they are not alone in their support for an idea.
To avoid surprises, be sure to articulate any pushback you are getting from other leaders.
This will allow the executive to be an advocate and sway his or her peers.
When problems are encountered, be sure to anticipate where your support will emerge or evaporate.
Organizational Baggage
Organizational baggage refers to how the organization executes based on past unsuccessful efforts.
Unlike doubt, which is a personal credibility issue, this category focuses on the organization’s ability to execute.
If an organization has problems implementing policies of any kind, security policies won’t likely be any different.
Organizations that reorganize frequently fall within this category.
Lack of Incentives
Lack of organizational incentives refers to the inability to motivate behavior.
Value is only derived from policies when they are enforced.
An organization must have the will and process to reward adherence.
The organization must have a low or zero tolerance for security policy violations.
Lack of Candor
Lack of candor refers to not having open, candid conversations.
In the case of policies, you need to be clear what can and cannot be achieved.
You need to listen and explain how the business’s input was considered and adopted or rejected.
Executives need a sense that they were part of a process and not just the recipients of the result.
Low Tolerance for Bad News
Low tolerance for bad news refers to how executives react to missteps.
You can count on an error in judgment at some point in implementing security policies.
You need to prepare executives for the inevitable.
You also need to gauge how they will react.
Unmanageable Complexity
Unmanageable complexity refers to how complex and realistic the project is.
The ability of the organization to support the security polices will be an important topic of conversation.
Relevance of Executive Management Support
Data supporting policy implementation aligned with business objectives
Business objectives identified align with compliance laws or regulations required to conduct business
Security Policy implementation can expect executive management support
Lack of Executive Management Support
Data supporting policy implementation not aligned with business objectives
Business objectives identified do not align with compliance laws or regulations required to conduct business, or are unclear and have insufficient support from leadership
Security Policy implementation can expect to fail without executive management support
Organizational Issues
Two important organizational issues that affect the implementation of security policies are:
Division of labor: who is responsible for what?
Span of control: how much responsibility does one individual have?
Hierarchical
Flat
Flat Organizations
Management structure is cross-functional and more open to employee input.
Dialogue and communications between employees may occur across organizational functions.
Employees tend to be more open and communicative.
Employees tend to be more creative and involved in business decisions.
Employees are not as constrained within their role or function and can see and interact across the organization more freely.
Hierarchical Organizations
Departments are separated by function, creating multiple functional silos.
Business decision-making performed at the executive management level.
Dialogue and communications is more top-down.
Employees tend to be less communicative and more isolated within their business functions.
Employees find it difficult to offer additional creativity or input to business decisions.
Employees are constrained within their roles and cannot interact outside of their business functions without going through a chain of command.
Policy Implementation Steps
Step One: Create Urgency
Step Two: Form a Powerful Coalition
Step Four: Communicate the Vision
Step Three: Create a Vision for Change
Step Five: Remove Obstacles
Step Six: Create Short-Term Wins
Step Seven: Build on the Change
Step Eight: Anchor the Changes in Corporate Culture
Adapted from “Kotter’s Eight-Step Change Model.”
Build Support for Policy
Implement Security Policy
Transition
From Informal to Formal
Implementation
Tasks
Informal Discussions
Formal Implementation Project
Policy Implementation Issues
Each organization has many different types of personal traits, each affecting the organization in its attempt to implement a policy in the workplace.
The most common workplace personality types include:
Commanders
Attackers
Performers
Analyticals
Drifters
Pleasers
Avoiders
Achievers
Commanders
Commanders are demanding and not tactful.
They come across at best as impolite, at worst rude and abrupt.
They are forceful in an attempt to achieve stated goals.
They can break through barriers that have prevented past success.
Drifters
Drifters are uncomfortable with structure and deadlines.
They may have great soft skills but might not follow up and take a more laid-back attitude toward work assignments.
What they lack in discipline may be offset by their creativity and thinking out of the box.
Drifters are often at odds with Commanders.
Attackers
Attackers may seem angry or even hostile toward ideas and others on the team.
They are critical of others’ ideas and are egotistical.
Although their biting attacks other team members can be disruptive, they can also take on very unpopular tasks.
Pleasers
Pleasers are very kind and thoughtful to others.
They want everyone to “feel good” and will put their own self-interest aside for the good of the whole.
They may shy away from enforcing rules that offend others, but they promote the concept of collaboration and teamwork.
Performers
Performers like to be on center stage.
They like to entertain and be the center of attention.
They develop over time a wit and charm to capture people’s attention.
They may not be the highest producer and may be in the habit of self-promotion.
They are often excellent public speakers and can establish new relationships important to the business.
Avoiders
Avoiders like to fly under the radar and be in the background.
They tend not to take chances or do anything that brings attention on them.
They will do precisely what’s asked of them but not much more.
However, they are very dependable and their work quality is consistent.
Analyticals
Analyticals like structure and deadlines.
They measure their success in precise terms of the number of widgets produced in a given time at a given quality level.
They tend to be obsessed with precision and attention to detail.
They may not be the best at understanding human dynamics, so working with customers and emotions may be a problem.
They are very comfortable with lots of information and have the ability to analyze issues and evaluate different types of risk.
Achievers
Achievers are very result oriented.
They may have several traits of the other personality types.
For example, they may be self-confident but not at the expense of others.
They genuinely want the best result and may seek different ways to achieve it.
Achievers can make good leaders.

#### Lecture 1. Information Assurance Policy Management
Learning Objective
Identify the role of an information systems security (ISS) policy framework in overcoming business challenges.
Key Concepts

ISS and information assurance in organizations
ISS policies and their importance in organizations
Four information security controls
Business drivers that create the need for ISS policy framework
U.S. compliancy laws and industry standards

Security policies

Why do organization need security policies?
Information System Security
Information Assurance
Information Governance
Importance of Governance
Importance of Policies

Exercise
Within an assigned group, identify an appropriate policy, standard, procedure, and guideline for a specific security issue:
• Group 1: Employee access to Facebook.
• Group 2: Employee use of flash drives.
• Group 3: Non-employee use of company resources.
Process for Creating a Policy Framework (Generic)
Business recognizes a need for a new policy to be developed.
Collect documents relating to the new policy.
Analyze existing policies for overlap and coverage.
Develop case study relating to the new policy.
Examine existing frameworks for policies that can be used.
Implement new policy and add to policy change control board process.

Purpose and mission for policy
Responsibilities for enforcing policy
Compliance issues covered by new policy
Scope of policy coverage

Exercise

Within an assigned group, identify the steps needed to develop and implement a security policy for a specific type of organization:
Group 1: Four-Dentist Dental Practice
Group 2: Ten-Person Money Management Firm
Group 3: Multinational IT Consulting Firm

Exercise

Within an assigned group, search the Internet and find a job description or job announcement for a specific corporate security officer:
Group 1: Risk Manager
Group 2: Security Manager
Group 3: Chief Information Security Officer

EXPLORE: RATIONALE
Organizational Policy Development and Importance
Policy = Business Requirement on Actions or Processes Performed
Frameworks
• Policy
• Standard
• Procedure
• Guideline
Threats to Systems
Controls on Systems
Summary
In this presentation, the following were covered:
• Four information security controls
• Components of information security governance
• Process for creating a policy framework
• Importance of security policy in an organization

### Few-Shot Examples for In-Context Learning:
Example 1:
User: What is AUP?
Thought: Recall from File 1: AUP covers protecting computers/network, passwords, licenses, IP, email etiquette, privacy, noncompliance.
Response: Acceptable Use Policy (AUP) defines rules for using organizational resources, including protecting computers and networks, managing passwords, software licenses, intellectual property, email etiquette, expected privacy levels, and consequences for noncompliance.

Example 2:
User: Explain SOD.
Thought: From File 3: SOD involves layered security for redundancy, domain responsibility to reduce fraud/errors.
Response: Separation of Duties (SOD) is a control using layered security for redundancy (more layers mitigate risks better, but consider costs). It applies to domains of responsibility to reduce fraud and human errors.

Example 3:
User: Differences between GRC and ERM.
Thought: From File 3: Similarities - define risks as threats, flexible frameworks, eliminate redundancies, enforce policy. Differences - GRC tech-focused/tools, ERM value/risk broad/leadership-driven.
Response: Similarities: Define risk as business threats, use flexible frameworks for compliance, eliminate redundant controls/policies/efforts, proactively enforce policy. Differences: GRC focuses on technology/tools/centralized policies; ERM on value delivery, broad risk view driven by leadership, shifting spend discussions in risk mitigation.

---

Form to Fill:
${JSON.stringify(request.questions, null, 2)}

Please analyze the profile and provide the best matching answer for each question ID.
Return ONLY the JSON object with answers.`;

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${request.apiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: "user",
                                parts: [
                                    { text: systemPrompt },
                                    { text: userContent }
                                ]
                            }
                        ],
                        generationConfig: {
                            response_mime_type: "application/json"
                        }
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Gemini API HTTP Error:", response.status, response.statusText);
                    console.error("Response body:", errorText);
                    throw new Error(`Gemini API Error ${response.status}: ${response.statusText}. Details: ${errorText}`);
                }

                const data = await response.json();
                
                // Better error handling for response structure
                if (!data.candidates || data.candidates.length === 0) {
                    console.error("Gemini Error: No candidates in response", data);
                    throw new Error("Gemini returned no candidates. Check API key and quota.");
                }
                
                if (!data.candidates[0].content || !data.candidates[0].content.parts) {
                    console.error("Gemini Error: Invalid response structure", data);
                    throw new Error("Gemini returned unexpected response structure.");
                }
                
                const content = data.candidates[0].content.parts[0].text;
                
                console.log("🔍 Raw Gemini response:", content);
                
                // Validate JSON response
                try {
                    // Try to extract JSON if wrapped in markdown
                    let jsonStr = content;
                    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                    if (jsonMatch) {
                        jsonStr = jsonMatch[1];
                    }
                    
                    const parsedData = JSON.parse(jsonStr);
                    console.log("✅ Parsed Gemini answers:", parsedData);
                    sendResponse({ success: true, data: parsedData });
                } catch (jsonError) {
                    console.error("❌ JSON Parse Error:", jsonError, "Content:", content);
                    throw new Error(`Gemini response is not valid JSON: ${content}`);
                }

            } catch (error) {
                console.error("❌ Background Fetch Error:", error.message);
                console.error("Full error:", error);
                sendResponse({ 
                    success: false, 
                    error: error.message || "Unknown error occurred"
                });
            }
        })();
        return true;
    }
});
