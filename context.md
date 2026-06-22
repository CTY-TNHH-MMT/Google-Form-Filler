# Chapter 1: Security and Information Technology

## Why Database Security?
- Most databases provide access spanning several networks and across the world
- Most online transactions involve a database
- Water supplies, electricity grids, and gas and oil production depend on a computer network to thrive
  - Breach could have disastrous impact
- Network intruders are well trained and growing more sophisticated

## A Secure Data Environment
- Multiple layers of security
  - Most effective approach to minimizing risk of data breach
- Example of multiple security layers to protect against malicious e-mail attachments
  - User awareness training
  - Filter on exchange server to remove known malicious attachments
  - Firewall configured to deny certain types of traffic
- Database security
  - Set of established procedures, standards, policies, and tools
  - Protects against theft, misuse, and attacks
  - Deals with permission and access to the data structure
- Common vendor features for database security
  - Database-level access control
  - Database-level authentication
  - Data storage encryption
- Computer security
  - Necessary element of database security
  - Typically defined by the operating system
- Common computer security features
  - Operating system-level access control
  - Operating system-level authentication
  - Application security
  - Hardware and software monitors and logs
- Network security
  - Outermost layer of the database
  - Arguably biggest security concern
  - Set of established procedures, standards, policies, and tools
  - Goal: protect network from theft, misuse, and attacks
- Hardware and software devices used to secure a network
  - Firewalls, antivirus programs, network monitors, intrusion detections systems, proxy servers, and authentication servers

## Database Security Objectives
- Security measures
  - Keep information private from outside viewing
  - Maintain consistency of data
  - Ensure resources remain at a high degree of availability
- Key to achieving effective data security architecture
  - Organization must maintain confidentiality, integrity, and availability of its environment
- Confidentiality requirements
  - Ensure information remains private by limiting authorized access to resources
  - Block unauthorized access to resources
- Confidentiality protected using authentication and access controls
  - State and federal laws may apply to these measures
- Breaches in confidentiality could result in:
  - Stolen identity
  - Exposed business trade secrets
- Integrity
  - Reliable, accurate, and consistent data stored in and retrieved from the database
  - Protected by preventing accidental or deliberate modifications
  - Most difficult item to measure
- Auditing used to compare data with older, backed up versions of the data
- Results of integrity breaches
  - Unreliable data, flawed programs, system failures
- Availability
  - Maintaining accessible network or database resources
  - Business cannot operate without it
- Must identify potential threats to availability
  - Assess threat level
  - Plan appropriate intervention
  - Example of threats: technical failures, natural disasters, intrusions, user-caused harm

## Who Are We Securing Ourselves Against?
- Must understand what poses a threat
  - More threats exist on the inside of a network than on the outside
- Overly restrictive databases are as ineffective as those that give too much access
  - Healthy balance is needed

## Hackers
- Hacker
  - Person who has mastered firmware and software of modern computer systems
  - Person who enjoys exploration and analysis of network security without intent to cause harm
- Cracker
  - Person who breaks into a network to destroy or steal information

## Social Engineers
- People who manipulate others to gain access to systems, unauthorized areas, or confidential information
  - Often build trust with authorized user
  - Use deception and trickery to convince people to break normal security policies
  - Example: asking for a password

## Computer Users
- Network users cause over half of security breaches
- Major contributing factors
  - Lack of education
  - Disregard of policy
- Examples of most common user errors
  - Poor habits (computers unlocked and unattended)
  - Password error (writing passwords on sticky notes)
  - Disregard for company policy (downloading unauthorized software)
  - Opening unknown e-mail attachments
  - Inappropriate disclosure (giving information over the phone to a social engineer)
  - Procrastination (failing to report computer issues in a timely manner)
- Computer-literate users may take risks and find shortcuts to security measures
- Disgruntled employee on a network can abuse access rights and destroy files

## Network and Database Administrators
- Not often viewed as threats to networks they run
  - Room for error exists
  - Their mistakes have consequences for integrity, availability, and reliability of the network
- Dynamic nature of the data environment
  - Can cause new security flaws to be created
  - Network components must be regularly audited
- Common mistake
  - Not removing a user's rights and account credentials

## The Internet
- Two billion Internet users
- 100 million Web sites
- 75% of US residents have Internet access
- Online education and social networking increasing in popularity
- Threats on the Internet continue to increase
- 600,000 viruses on networks today
- Social interactions contribute to growing number of identity thefts
- Web page code purposes
  - To inform browser how to display the content
  - To inform browser how to react to user responses
- Hijacking
  - Web pages rewritten to distribute malicious code or redirect user to attacker's Web site
- Malware
  - Malicious software
  - Written and used by unauthorized intruders
  - Often intended to be harmful and destructive
- Spoofing
  - Fraudulent Web site made to look identical to legitimate Web site
  - Objective: draw in a user to gather personal information (such as a password)
  - Can be easy as registering a domain name that is a slight misspelling of legitimate site (example: Gogle)
- Web browser
  - Application that interfaces client machine to Internet
  - Responsible for sending and receiving user pages
  - Has built-in programming language that can be manipulated
- SQL injection
  - Intruders append malicious code onto a database directed URL
  - Intended to manipulate database into sending confidential information
- HTTP portion of Web address informs browser of protocol used to send request for the Web site
  - Can include form-related data appended to URL
- Domain name server (DNS)
  - Database of domain names and their respective IP addresses
- DNS poisoning
  - Cracker gains control over DNS server
  - Cracker substitutes their site IP address for the legitimate domain name IP address
  - User may be fooled into providing personally identifiable information (PII)
- Browser menu settings can also be manipulated

## Misleading Applications
- Applications designed to deceive users into believing their computer's security has been breached
  - User downloads and purchases fake antivirus tools
  - Tools deliver malware to user's computer
  - User has no knowledge of true security breach

## E-mails
- One of most common forms of communication today
- Biggest threat to network and database environment
  - Simple channel of attack for crackers
  - Most common way malicious code gains access to a business
- Common threats to e-mail
  - Attachments, phishing, HTML code attacks
- Attachments
  - Difficult to identify a fake attachment
  - Crackers use attachment names and file extensions to gain trust
- Spoofing e-mail address
  - Using a false e-mail address in the “from” and “reply” fields
  - Increases likelihood that user will open the attachment
- Phishing
  - Attempt to obtain PII using spoofed e-mail addresses and URLs
  - Act of trying to fish information out of people
  - May include convincing a user to click a link to a cracker-owned Web site
  - Common technique: fake holiday and birthday card e-mails
- Web-embedded HTML
  - HTML allows email to be formatted like a word procession application
  - Malicious software can be created using scripting language and active content
  - Users do not have to download attachments or click unfamiliar links, only read their e-mail to be attacked

## Instant Messages
- Instant messages
  - Data is not encrypted on either file transfer or peer dialog
  - Provides ideal environment for phishing with spoofed buddy names and redirection techniques

## Tweets
- Twitter.com provides members with blog-like service to update status or activities to family and friends
- Images and links can be included with a tweeted message
- Accounts are falling prey to phishing, spoofing, and redirection techniques

## Malware
- Capable of performing harmful and destructive tasks on victim's computers
- Can be written in many programming languages
- Types of malware
  - Computer viruses
  - Worms
  - Trojans
  - Spyware
  - Adware
  - Bots

## Computer Viruses
- Form of malware designed to spread from one computer to another without detection
- Degree of danger varies:
  - From annoying disturbances to destruction of entire systems
- Characteristics found in malicious code
  - Self-encryption
    - Virus disguises the way it appears to a network
  - Stealth
    - Viruses make changes to the system
    - Need to avoid detection by antivirus programs
    - Intercepts requests from antivirus programs and answers them, instead of the OS
  - Polymorphism
    - Ability to change forms to avoid detection
    - Code changes signature each time it infects a file
  - Residence
    - Virus installs itself directly in computer's main system memory
    - Virus does not need a user to make it active
- Classes of viruses
  - Logic bombs: viruses that corrupt data when certain conditions are met
  - Time bombs: time-delayed viruses
  - Spyware: software that intentionally monitors user's activities
  - Adware: malware used for marketing purposes
- Virus types
  - Boot sector viruses load themselves onto the hard drive's boot sector
  - Macro viruses: attached to or replace a macro in a document
  - File-infected viruses attach themselves to executable file which user must run to activate
  - Multipartite viruses combine characteristics of boot sector virus and file-infected virus

## Worms
- Self-replicating malware
- Do not need users to travel from one computer to another
  - Propagate across networks
- Elements of a worm's travel
  - Find a weak target
  - Take control of the machine
  - Interrogate the machine
  - Test a new target

## Trojan Viruses
- Malware that disguises itself and its harmful code
- Hide within programs such as software updates, games, and movies
- Purpose: gain access to sensitive information, destroy files, or create opportunities for installing bigger threats
- Types of Trojans
  - Remote access and administration Trojan (RAT)
    - Allows attacker to control victim's computer from a remote location
  - Data-sending Trojan
    - Sends information to attacker, usually with key loggers
  - Destructive Trojan
    - Randomly deletes files and corrupts the registry
  - Proxy Trojan
    - Attacker uses victim's IP address to commit cybercrime
  - File transfer protocol (FTP) Trojan
    - Allows attacker to download files from victim's computer

## Bots
- Also known as software robots
- Able to perform automated tasks for an intruder at a remote location
- Used for spamming and launching DoS attacks
- Can be hidden in games and other programs
- Can be e-mailed from one infected machine to another
- Able to disguise themselves, and run in the background
- Many bots controlled together known as a botnet

## Security Architecture: A Never-Ending Cycle
- Creating a security architecture is not an easy task
- Complete security is an unattainable goal
- Techniques used to attack databases developed using same technology used to protect the systems
  - Intruders become more advanced as technology advances
- New intrusions developed constantly
- Process of creating and maintaining security architecture has four phases

## Phase 1: Assessment and Analysis
- Determining an organization's data security needs
  - Identify existing vulnerabilities, threats, and assets
- Security audit
  - Used to identify threats
  - Can be conducted internally or by a third party
- Determine cost of breached or lost asset
  - Security measures should never exceed value of assets they protect
- Questions to ask to guide this phase are listed on Page 25 of the text
- Risk assessment steps
  - List all devices and resources within a database environment
  - Identify vulnerabilities and assets involved with each resource and device
  - Define asset value and cost of damage from the threats
  - Create security measures to counteract the threats
  - Prioritize the security measures

## Phase 2: Design and Modeling
- Create policies and prototype security architecture to fit business needs
- Entire organization should be included in the process
  - Policies must be realistic for user and business needs
- Questions to ask to guide this phase are listed on Page 26 of the text
- Design steps
  - Define needed policies and procedures
  - Identify firmware and software changes to support the policies
  - Create an implementation plan
  - Create baselines to determine success and failure
  - Define a plan for user training and awareness

## Phase 3: Deployment
- Security policies, firmware, and tools put in place
- Test environment usually created first
- Firmware and software purchased and tested
- Questions to guide this phase are listed on Page 26 of the text
- Deployment steps
  - Adjust user awareness training as needed
  - Test firmware and software changes in a controlled simulation environment
  - Deploy changes according to the deployment plan

## Phase 4: Management and Support
- Monitor security system performance
- Reevaluate architecture after any failures or breaches
- Questions to guide this phase are listed on Page 27 of the text
- Management and support steps
  - Monitor performance of security architecture and user security awareness and training
  - Make minor policy revisions as necessary
  - Identify need for a reassessment and initiate the start of the security life cycle

## Global Policies for the Database Environment
- Operational information security
  - Ensures secure operation of an organization
  - Uses reliable policies and procedures
  - Necessary component of maintaining database environment
- Aspects of information security
  - Security policies
  - Change management
  - Update management
  - Disaster recovery plan

## Security Policies
- Security policy objectives
  - Define overall security goal
  - Identify scope of what to secure
  - Define roles and responsibilities of people in the organization
  - Identify specific communication processes
  - Discuss policy enforcement
- Should be created by a committee of invested stakeholders
- Plan for communicating policy should be created

## Update and Upgrade Management
- Update
  - Small change to already installed software or firmware
- Upgrade
  - Replacement for older version of software
- Components of an update management policy
  - Patch update procedures
  - Software update procedures
  - OS upgrade procedures
  - Firmware change procedures
- Upgrades should not be applied to a database immediately after release
  - Good practice to wait months or years until stable
- Questions to ask
  - Is the update/upgrade really necessary?
  - What are the possible repercussions of the install?
- Create a test environment to test the upgrade
- Put a recovery and restore plan in place to reverse the upgrade if needed
  - Back up files in case reversal does not work
- Types of updates and upgrades
  - Patch
    - Small program used to fix or update software programs or firmware devices
    - Often created in response to newly discovered vulnerability
  - Software upgrade
  - OS upgrade
    - Most significant and risky upgrade
    - Involves radical changes to both clients and servers

## Backup Management Plan
- Backup
  - Intentional copy of data, files, and system configurations
  - Used to archive and store information
  - Used to replace files after network failure or attack
- Backup management plan
  - Process to ensure safety of network data
- Backup solutions
  - Many available today
  - Choose best fit for data and business goals
- Questions to answer when choosing backup strategy
  - What media should I use?
  - Where will backup be placed?
  - What should be backed up?
  - How often should information be saved?
  - What time of day should backup occur?
  - What type of backup should be completed?

## The Disaster Plan
- Plan developed to ensure quick reinstatement of a network after a human-caused or natural disaster
  - Goal: restore most critical aspects of the business
- Plan should include:
  - Contact information for emergency responders
  - Roles and responsibilities of response staff
  - Location and details of network backups
  - Agreements with national service carriers
  - Communications strategies
  - Contract information for disaster recovery services
- Physical site recovery options
  - Cold site
    - Provides basic necessities for rebuilding a network
  - Warm site
    - Provides basic necessities and hardware and software devices
  - Hot site
    - Exact replica of organization's network
- Shared site agreements distribute cost of maintaining backup site among similar companies

## Summary
- Database security refers to policy, procedure, and design efforts to mitigate threats to a database system
- Effective database security requires confidentiality, integrity, and availability
- Malware can exist in many forms
- Viruses spread from computer to computer without detection
- Worms self-replicate by harnessing power of networks and using power to attack networks
- A Trojan horse is malware that disguises itself
- Bots have ability to perform automated tasks for an attacker at a remote location
  - Difficult to detect
- Security is a continual cycle of assessing a network, designing security policies, deploying security architecture, and testing security performance
- A disaster plan defines steps to reinstate a network after a disaster occurs

# Chapter 2: Database Review

## Database Defined
- Database
  - A collection of data stored on a computer using a database management system (DBMS)
- DBMS
  - Application that allows others to search stored data
  - Goal: provide means to manipulate, analyze, store, and retrieve information
- Example: school library
  - Librarian (on-campus library) or Web site (online library) acts as DBMS

## Database Structure Components
- Method of storing information in a database
  - Depends on database type
- Common components of digital database management applications
  - Tables
  - Keys
  - Queries

## Tables
- Basic unit of storage within a database
- Represents unique and specific data objects
- Composed of vertical columns and horizontal rows
- Column
  - Also known as field
  - Contains a general category of information with similar data types
- Row
  - Also known as record or tuple
  - Holds distinct units of data

## Keys
- Single field or group of fields used to identify an entry in a table
- Used to access or manipulate records or rows within a relational database
- Primary key
  - Field containing a unique label identifying a record or row in a table
  - Each table has a least one primary key
  - Keys should be meaningful to the data being stored
  - Key examples: employee ID number, Social Security number
- Foreign key
  - Field within a table containing a label used to build a relationship between two tables
  - Often refers to a unique entry or primary key in a different table
- Other keys
  - Secondary or alternative key
  - Candidate key
  - Composite key
  - Sort or control key
  - Alternate key

## Queries
- Searches initiated by users to retrieve information from the database
- Consist of sets of variables or keywords formatted in a query language
  - SQL is query language used in this text
- Display information in a report
- Example of SQL query

```sql
SELECT title FROM songs, artists, WHERE songs.artists=groups.ID AND groups. Name= ‘Madonna'
```

## Database Models
- Representation of the way data is stored
- Determines how data is retrieved and manipulated
- Four main database models
  - Flat
  - Relational
  - Hierarchical
  - Network

## Flat Model
- Two-dimensional list of data entries
  - All data within a field are similar
  - All data within a record are related to one another
  - Similar to a sign-in sheet at a doctor's office
- Flat model disadvantages
  - Multiple efforts
  - Redundant data
  - System allows large margin for error
- Entries must be made in exactly the same way or query will not return complete results
- Example: one user might enter “Billy Joel” and “Uptown girl” and another user “Billie Joel” and Up Town girl”

## Hierarchical Model
- Popular in late 1960s and through the 1970s
- Uses tiers and parent-to-child relationships to represent records and relationships
  - Similar in structure to a family tree
- One-to-many approach greatly minimizes redundancy
- Model builds relationships within one stem
  - No direct relationships made across the tree

## Network Model
- Developed as a solution to one-to-many restrictive nature of hierarchical database model
- Treelike structure using tiers and parent-child-like entities to represent relationships
- Parent referred to as a set of which child entities are members
  - Child entities may be members of more than one set
- Advantages of many-to-many relationship
  - Less resource intensive
  - Easier to navigate

## Relational Database
- Common entities are stored within separate tables
  - Tables given unique names
  - Tables use unique key identifiers to build relationships among entities
- Entity
  - Person, place, or thing stored in a database table
  - Has attributes and relationships
    - Attribute: describing characteristic
    - Relationship: defines association between two entities

## Object-Oriented Databases
- Object-oriented database management systems
  - Allow storing and retrieving objects and complex data types
    - CAD files
    - Artificial intelligence objects
    - XML-compatible objects
    - General multimedia (audio and video)
  - Were not widely adopted when released in 1985
  - Used in specialized areas today

## Object-Relational Database
- Introduced in the 1990s
- Relational database with expanded group of data types
- Middle ground between relational and object-oriented database management systems
- Not widely used at this time

## Relationships
- Define association between entities and bind them together
- Relationship types
  - One-to-one (1:1)
    - Most simple relationship
    - Rarely found in a relational database
  - One-to-many (1:N)
    - Entity has a sole relationship with entity that has several relationships
  - Many-to-many (M:N)
    - Entity has one or more partnerships with another entity that also has one or many partnerships

## Database Types
- Database type is determined by data that will be housed in it
- Types of databases
  - Online transaction processing (OLTP)
  - Online analytical processing or decision support system (OLAP/DSS)

## OLTP
- Database created for real-time storage and manipulation of data within an organization
- Created to be used in an active environment
- Optimized to serve thousands of users simultaneously
- Stores data resulting from large volumes of short transactions
- Point of sales (POS) system
  - Meant to handle cash register or sales transactions

## OLAP/DSS
- Stores large volumes of historical data
- Used for report generating and analyzing
- Typically retrieves data from an OLTP
- Data analyzed in a business environment to meet a specific need
- Other names
  - Data warehouse
  - Data repository

## Database Management Systems
- Application that provides means to manipulate, analyze, and query data
- Almost all DBMSs existing today are developed to be used with relational databases
  - Known as Relational Database Management Systems (RDBMSs)
- Focuses of this text
  - Oracle
  - Microsoft SQL
  - MySQL

## Oracle
- RDBMS developed by Oracle Corporation in late 1970s
  - Remains a popular database server
- Advantages
  - Portable
  - Can run on almost any operating system
  - Dominant role in providing business solutions
- Current version addressed in this text
  - Oracle 11g

## MySQL
- RDBMS developed by Sun Microsystems
- Most popular open source database server today
- Advantages
  - Speed
  - Open source (available free of charge)
  - Can be customized
  - Platform independent

## Microsoft SQL
- Often referred to as SQL Server
- RDBMS developed by Microsoft
- Primary query languages
  - T-SQL
  - ANSI SQL
- Advantages
  - Scalability
  - Meets needs of any Windows environment

## Database Similarities
- Read consistency
  - Refers to accuracy and reliability of data within a database
  - Depends on database ability to process and commit transactions in a timely manner
  - Applies the following locking mechanisms:
    - Transactions
    - Concurrency
    - Locks
    - Commit
    - Undo

## Query Management
- Steps taken by a database management application to process a user query
- Retrieving
- Parsing
  - Analyzing query construction for correct syntax and semantics
- Optimizing
  - Process of locating most efficient way to retrieve requested data
- Queries can be processed individually or in parallel

## Oracle Architecture

### The Instance and the Database
- Instance
  - Refers to the background processes and structured memory used during interaction with a database
  - To create, user must connect to a database and establish a session
- Database portion of an Oracle server
  - Holds database files that environment needs to run Oracle database
- Files help configure the instance, process SQL executions, and ensure alert and recovery from software and hardware failure

### The Physical Structure
- Varies depending on operating system on which Oracle is installed
- Files required with every Oracle install
  - Datafile, control file, and redo log
  - Files interact with OS
  - Transparent to the user
- Datafile
  - Contains actual database data and holds information for all logical structures in the database
- Control file
  - Contains location and credentialing information of other files
  - Database will not run if control file fails
- Redo log
  - Contains information about all changes made to database data
  - Can be used to restore lost data
  - Good practice to make a duplicate copy of this file

### The Memory Structure
- Main memory and cache
  - Quickest accessible storage in any system
- In Oracle, nearly everything happens from main memory
  - Oracle can reliably service many users concurrently
- Query caching
  - Queries cached into buffer area to increase speed of future query returns
- Oracle memory structure divided into two parts
  - System Global Area and Process Global Area
- System Global Area (SGA)
  - Central storage area for all shared data and processes
  - Holds control data for one single instance in Oracle
  - Oracle 11g uses dynamic SGA
- Process Global Area (PGA)
  - Central storage area for background and server processes
  - Allocates space for each individual background process
  - Content varies depending on Oracle configuration

### The Processes
- Process
  - Instruction set executed by OS to complete a task
- Tasks required to complete an instance in Oracle
  - User runs application tool to request connection to Oracle server (user process)
  - Server handles user's request and runs process to create instance and complete the connection (server process)
- Server processes can be shared or dedicated

## MySQL Architecture
- Developed for multiplatform use
  - Solaris, Linux, Windows
- Architecture components common to these operating systems
  - Database connection manager
  - Query engine
  - Transaction manager
  - Storage engine

### Database Connection Manager
- Manages connections to the MySQL server
  - Virtually any client may connect
- Methods for clients to connect via the connection management layer
  - Application programming interfaces (APIs)
    - Many programming languages are supported
    - Clients using ODBC, Java, .net are supported
  - TCP/IP is most common type of connection
- Thread
  - Execution running independently from other processes

### Query Engine
- Architecture component that optimizes and manages queries and SQL statements
- Built to use resources efficiently
- Query steps
  - User initiates query
  - Query request received by MySQL server
  - Query parser creates treelike structure of extracted SQL statements
  - Data definition language provides access
- Memory cache stores recently requested queries

### Transaction Manager
- MySQL transaction
  - Group of MySQL queries treated as a single process
- Transaction manager maintains concurrency throughout the database
  - Ensures simultaneous data handling will not corrupt data
- Types of database environments
  - Transactional
  - Nontransactional

### Storage Management
- MySQL stores data files in secondary storage
  - Dynamically traversing files is too slow
- Storage management
  - Process of storing and retrieving data throughout the database
  - Most work takes place within main memory
  - Three-tiered process uses resource manager, buffer manager, and storage manager

### The Storage Engine
- Components that read and write data to and from the database
- Customization options available
  - Administrators can choose which storage engines to use for certain tables or applications
- Storage engines available in MySQL
  - MyISAM, InnoDB, Memory, Archive, Federated, Comma-separated values, Black Hole Engine, The Falcon Engine

## Microsoft SQL Server Architecture

### Architecture and Engines
- Clients connect to the server using the Tabular Data Stream
- Main components of SQL Server DBMS architecture
  - The relational engine
    - Responsible for query processing and data retrieval
  - The storage engine
    - Manages files, memory, recovery, logging, and transactions

### The Physical Structure
- Three different types of files store data
  - Primary data files
  - Secondary data files
  - Log files
- Each installation of SQL server
  - Has at least one primary file and one log file
- Filegroups used to organize database into logical units of resources
  - Primary filegroup
  - User-defined filegroup

### Memory Management
- SQL Server can dynamically allocate its own memory
  - No need for administrator intervention
  - Balances main memory use between database processes and storing and retrieving data
- Virtual memory
  - Technique for extending memory availability
  - Units of storage from different memory devices appear as a single block of storage
  - Fixed units of storage referred to as pages

### Buffer Management
- Buffer manager accesses data pages and updates the database
- Buffer pool (buffer cache)
  - Area in which data pages are stored
  - Minimizes need to read and write from hard disk file
- Steps to retrieve data after query processing
  - Buffer manager accesses database files from hard disk and places in buffer cache pages
  - Data read from the cache
  - Page considered dirty if changes made to data while in buffer cache

### Threads and Processes
- Threads and fibers used to perform several tasks simultaneously
  - Threads handled by the operating system and allocated one per CPU
  - Fibers handled by the server and allocated one per user command
- Worker processes
  - Pools of either threads or fibers for all user connections
  - Number of threads or fibers within one worker process available depends on network size

## Summary
- A database allows others to search, analyze, and manipulate stored data
- Data is stored within a database using a table structure
- Several types of keys are used to reference data
- Query languages provide users a way to retrieve and manipulate data from a database
  - SQL is most common query language
- General query processing steps
  - Parsing, optimization, execution of SQL statements
- Different database models describe how data is stored within a database
  - Flat, hierarchical, network, and relational
- One-to-many relationships are most common relationships formed between tables in a relational database
- Most common DBMSs include Oracle, MySQL, and Microsoft SQL Server
- Read consistency and query management are important aspects of a DBMS

# Chapter 3: Database Installation 1 — MySQL

## Preinstallation Preparation
- MySQL
  - Reliable open-source application
  - Most popular open-source database application used today
  - Can be customized to fit almost any business or personal environment
- Preinstallation considerations for the administrator
  - Distribution formats, MySQL versions, supporting platforms, and technical support lines

## Choosing a Distribution Format
- MySQL can be installed in different ways
  - Simple prepackaged executions
  - Custom downloads
- Two main installation formats
  - Source code installation
    - Allows users to download actual MySQL source code to change, customize, and compile as desired
    - Compiling can take up to 60 minutes
  - Binary code installation
    - Binary files ready for installation without compiling
- Considerations for using source code distribution format
  - Software programming expertise is necessary for customization
  - Removing unneeded default features of a specific version of MySQL can improve efficiency
  - Additional steps and long compiling times needed
  - Detailed documentation must be created for any customization
- Considerations for using binary distribution format
  - Easy to install, requires less time and expertise
  - Cannot be customized and compilers cannot be changed
- Consider alternatives before deciding to use source code distribution installations
  - Several different versions of MySQL exist
  - Third party vendors distribute their own versions with customized features for specific environments and operating systems

## Choosing a Version of MySQL
- Identifying most stable MySQL release available
  - Important to success of database application implementation
- Four main phases of maturity for a MySQL release
  - General availability
  - Release candidate
  - Beta
  - Alpha
- Milestone model: new approach to phase and release cycle introduced in 2008
  - Allows for more frequent releases with fewer changes in each
  - Version numbers use a specific naming scheme with a suffix after the version number
- Example: MySQL 5.5.0-m2
  - First 5 indicates the version number
  - Second 5 indicates the release level and indicates number of major changes added
  - Third number indicates number of smaller changes that have been tested and released
- Suffix indicates how stable the application is

## Supported Platforms
- Compatible operating system platforms
  - AIX, BSDi, eComStation, FreeBSD, HPUX, i5/OS, Linux, Mac OS X, Microsoft Windows, NetBSD, Novell NetWare, OpenBSD, OpenSolaris, OS/2 Warp, QNX, IRIX, Solaris, Symbian, SunOS, SCO OpenServer, SCO, UNIXWare, Sanos, and Tru64
- More details available on MySQL's Web site
  - Community and enterprise edition information URLs found on Page 83 of the text

## Locating Help
- MySQLAB
  - Paid support service offered by Sun Microsystems
  - Connects users and administrators:
    - For questions, consultations, and training
- Most resources for MySQL can be found free online
  - MySQL manual, MySQL forums, mailing lists, bloggers, Twitter, bug alerts
  - URLs can be found on Pages 83-84 of the text

## Downloading MySQL
- Official download site: http://dev.mysql.com/downloads
  - Contains all available versions, editions, and distribution formats of MySQL
- Community Edition
  - Most popular open source edition
- Enterprise Edition
  - Provides additional assistance for monitoring and analyzing database server performance
  - Includes support, training, and consultation
  - Recommended for large organizations
- Steps to verify file integrity after download and before installation
  - MD5 checksum
    - Match hexadecimal codes
  - GnuPG
    - Uses digital signatures

## Installation
- This section provides steps for installing MySQL
  - Windows- and UNIX-based machines
- Steps listed are for installing:
  - Binary distribution formation
  - MySQL 5.5 Community Edition

## Installing on Windows
- MySQL is available for virtually all Windows Operating Systems active today
  - 32-bit and 64-bit versions are supported
- Installing MySQL on Windows using an installer package
  - Three different binary packages available
    - The Essentials Package
    - The Complete Package
    - The Noinstall Archive

### Adding a MySQL Port in Windows Vista
1. Click Control Panel on the Windows Start menu
2. Click Security
3. Click Windows Firewall
4. Click Allow program through Windows Firewall
5. Click Add Port
6. Provide a descriptive name in the Name text field
7. Provide a port in the Port Number text field (the suggested port is 3306)
8. Click TCP Protocol
9. Click the Change Scope option to limit access
   - Suggested for security reasons
10. Click OK to confirm your choices

### Adding a MySQL Port in Windows 7
1. Click Control Panel found in the Start menu of Microsoft Windows
2. Click System and Security
3. Click Windows Firewall
4. Click Advanced settings on the left pane
5. In the Windows Firewall with Advanced Security dialog box in the left pane, click Inbound Rules
   - In the far-right pane, click New Rule
6. Click Port from the New Inbound Rule Wizard dialog box and click Next
7. Apply the rule to TCP
8. Specify the port in the Port Number text field (the suggested port is 3306)
9. Click Next
10. Click Allow the connection it is secure
    - This is only compatible with Windows Vista and later versions of Windows
11. Click Next
12. Add the list of allowed user connections and exceptions (if applicable)
13. Add the list of allowed computer connections and exceptions (if applicable)
14. Click Next
15. Select whether computers will be connecting to the server from within the domain, a private location, public location, or all locations
    - Public setting not recommended unless necessary
16. Provide a descriptive name in the Name text field
17. Click Finish to confirm your choices and add the port

### Installation Instructions
1. Locate the downloaded file. Unzip if necessary
2. Double-click Microsoft Windows Installer (MSI) file to execute
3. Security warning may appear to confirm system request is approved and intentional
4. Click Run to begin installation
5. First window encountered will provide a general overview of MySQL server release
6. Click Next to continue
7. Three installation types: typical, complete, and custom
8. Select Typical or Complete and click Next, then Install
9. Custom installation screen lists components available for installation
10. Click icon to the left of the feature name to change the way features are installed
11. Highlight component name and click Change to change the directory to which client program is installed
    - Type new directory in Folder Name field
    - Or use Look In List arrow to choose from drop down menu
    - Click OK
12. Click Next on the Setup Wizard
    - Advances to the verification screen
13. Click Install to begin the installation

## Installing on UNIX
- Several different variations of UNIX-based server package formats
  - Instructions are essentially the same
  - Binary distribution should be used if possible
- Next section provides instructions for installing binary packages for UNIX-based systems

### Installing UNIX Binary Distributions
- MySQL downloads are often combined into platform-based formats
  - Especially true for UNIX-based operating systems

### Installing Tar.gz
1. Create users and groups
   - Default user “mysql” and default group “mysql” will be automatically created if users and groups are not created
   - Execute the following commands:

   ```bash
   groupadd mysql  #Creates a group “mysql”
   useradd –g mysql mysql #Creates a user “mysql” and places
   #that user in
   #the group “mysql”
   ```
2. Change the directory where MySQL database files are to be extracted and use tar utility to unzip and unpack the distribution file
   - Execute the following commands:

   ```bash
   cd/usr/local #Changes the directory
   tar xvfz /tmp/mysql-pathname.tar.gz #Unpacks the files
   ```
   - “pathname” would be the actual file and pathname of the file
   - For Solaris machines, tar would be replaced with gtar
3. Place files in appropriate directory
   - Execute the following commands:

   ```bash
   ln –s /usr/local/version /usr/local/mysql
   ```
   - Version would be replaced with the subdirectory name created by tar
4. Grant privileges and tables, change ownership of data files and programs

   ```bash
   cd/usr/local/mysql
   ./scripts/mysql_install_db
   chown –R mysql /usr/local/mysql
   chgrp –R mysql /usr/local/mysql
   ```

### Installing Linux Binary Distributions Using RPM
- MySQL using RPM packaging
  - Fast and simple way to install MySQL on a UNIX-based machine
  - Suggested for installing MySQL on Linux operating systems
- Two categories of RPM packages
  - Platform specific
  - Non-platform specific

#### Installing RPM
1. Create users and groups
   - Default user “mysql” and default group “mysql” will be automatically created if users and groups are not created
   - Execute the following commands:

   ```bash
   groupadd mysql  #Creates a group “mysql”
   useradd –g mysql mysql #Creates a user “mysql” and places
   #that user in
   #the group “mysql”
   ```
2. Ensure no other packages of MySQL are on the system
   - Execute the following commands:

   ```bash
   rpm -qa # This will list all rpm files installed on the system
   ```
3. Install the client and server packages for database connectivity and use
   - Execute the following commands:

   ```bash
   rmp –i MySQL – server- VERSION.glibc23.i386.rpm
   rmp –i MySQL –client- VERSION.glibc23.i386.rpm
   ```
4. Test configuration by running:

   ```bash
   MySQL –u root
   ```

## Configuration
- MySQL must be configured after installation
- Windows configuration aspects
  - Identify server type and role
  - Allocate resources for storage engines and server
  - Identify root password and set file ownership properties
- Central configuration file used to configure MySQL on startup

### Configuring MySQL on Windows
- MySQL Server Instance Configuration Wizard
  - Creates custom configuration file (my.ini) after installation
  - Wizard prompts user to begin initial server configuration
- First choice: configuration types
  - Detailed configuration
  - Standard configuration

#### Standard Configuration Using the Windows Configuration Wizard
1. Check Configure the MySQL Server now on confirmation window at end of MySQL installation
2. Click Finish to complete installation
3. Select Standard Configuration and click Next
4. Configuration Wizard automatically creates a service called MySQL that launches with start of machine
   - Users can change service name or disable the service from starting up with the machine
   - Check Install as Windows Service and Launch the MySQL Server automatically, click Next
5. Create user password for the root user, deny remote access, and disable anonymous accounts
   - Once security options are in place, click Next
6. Confirmation screen allows user to save options to the configuration file
7. Click Finish on the confirmation screen

#### Detailed Configuration Using the Windows Configuration Wizard
1. Check Configure the MySQL Server now on the confirmation window at the end of the installation of MySQL
   - Click Finish to complete this installation
2. Select Detailed Configuration and click Next to continue
3. Choose one of three server configuration types
   - Developer, server, and dedicated
   - Choose Dedicated MySQL Server Machine and click Next
4. Choose the way the database will be used
   - Three options: multifunctional, transactional, and non-transactional
   - Select Transactional Database Only and click Next to continue
5. InnoDB tablespace information
   - Stored in a file called ibdata1
   - Screen allows user to move files to a different location
   - Leave default and click Next
6. Set maximum number of concurrent connections in the msqld
   - Select Manual Setting and enter number of connections
   - Click Next
7. Change the port in which TCP/IP connects to MySQL
   - Click Strict Mode
   - Check Enable TCP/IP Networking
   - Click Next
8. Set default character set within MySQL
   - Determines type of characters used globally in databases and tables
   - Select Standard Character Set and click Next
9. Click Install as Windows Service and Launch MySQL Server automatically
   - Click Next
10. Put security options in place and click Next
11. Click Execute to save options to configurations
12. Click Finish

### Configuring MySQL on UNIX
- Configuration file for UNIX-based machines
  - Named my.cnf
- Data directory and file permissions need to be created to prepare MySQL for startup

#### Using a Configuration Script
- Script called mysql_install_db
  - Automatically creates basic file directory and grant tables for user permissions
  - Can run script manually

```bash
For binary:
CD /usr/local/sysql
/scripts/mysql_install_db

For source installations:
CD /usr/local/sysql-5.5.1
scripts/mysql_install_db
```

- View the data directory

```bash
Ls –la /path/to/datadir/mysql
```

## Setting Passwords
- Server prompts user to complete other tasks
- All initial accounts are set up without passwords
  - mysqladmin is a program that changes the root password
  - Configuration script mysql_install-db sets up five different user accounts
  - Anonymous accounts do not require usernames or passwords

## Additional Security Suggestions
- Passwords
  - Left blank by default
  - Root passwords allow execution of every command available in MySQL
- Should be changed and replaced with strong passwords
  - Never store passwords in plain text format
- Default root usernames can be easy to find online
  - Change usernames of root passwords to provide additional security

## Account Access and User Privileges
- Follow principle of least privileges:
  - To ensure protection of sensitive data
- Do not share root access
- Remove or disable all anonymous accounts on the system

## Network Connection Administration
- Database administrators often overlook network connections when creating security plan
- Best practices for protecting network connections
  - Disable remote access
  - Do not leave your ports wide open
  - Use IP addresses to restrict access to the database
  - Encrypt your connection to the server using SSH or SSL

## Summary
- Prior to installing MySQL, administrator must select distribution format, version, and edition of MySQL
- There are two different ways to install MySQL:
  - Using its prepackaged binary files
  - Installing and compiling the source code manually
- Help with MySQL comes in many different forms
  - MySQL's Web site
  - Forums, bloggers, Twitter, mailing lists
- Different versions of MySQL are available at different stages of its development
- Windows installation packages use wizards to install and configure MySQL
- UNIX-based servers offer several different platform-dependent installation packages
- MySQL can configure a machine to be either a developer machine, a server machine, or a dedicated MySQL server machine
- Database administrators should use best practices when protecting network connections

# Chapter 4: Database Installation 2 — Microsoft SQL Server

## Planning for a Microsoft SQL Server Installation
- Microsoft SQL Server
  - Significant database enterprise solution
  - Has improved scalability and performance
  - Easy to use and low cost
- Installation of Microsoft SQL Server
  - Simple as any other Microsoft application installation
  - Administrators must make several decisions
  - Understanding requirements, available versions, and available features necessary to design an effective solution

## Meeting the Requirements
- Hardware requirements for SQL Server 2008
  - Processor type
  - Processor speed: 1.4 GHz (64 bit) 1.0 GHz (32-bit)
  - Hard drive storage: 350 MB
  - Main memory storage: 512 MB RAM
- Suggested not to run on machines with only the minimum requirements
  - Microsoft recommends at least 2.0 GHz processors and 2 GB RAM to function properly
- Appropriate hard drive space depends on organization's current and future needs
- Size of the database differs depending on which features are installed

## Supported Platforms
- Not all editions of SQL Server 2008 support the same operating systems
- Deciding on the most appropriate operating system a critical choice
  - Determines available features
  - Mistake can damage system performance and scalability
- 64-bit versions of SQL should be used:
  - To fully leverage capability of 64-bit OS

## Operating System Requirements
- Operating systems compatible with Microsoft SQL Server 2008
  - Windows Server 2008
  - Windows Server 2003
  - Windows 7
  - Windows Vista
  - Windows XP

## Other Software Prerequisites
- Software required to enable installation of 32-bit and 64-bit Microsoft SQL Server editions
- General software
  - .NET Framework 3.5 SP11
  - Microsoft Windows Installer 4.5 or later
  - Internet Explorer 6 SP1 or later
  - Latest version of PowerShell
  - Microsoft Data Access Components (MDAC) 2.8 SP1 or later
- Network software
  - Shared Memory
  - TCP/IP
  - Named Pipes
  - Virtual Interface Adapter Via Protocols

## Network Resource Requirements
- Network design and architecture
  - Play large role in reliability and efficiency of client-server environment
- Changes to network's hardware and software:
  - May be necessary with implementation of SQL Server
- Test environment to ensure it can handle data traffic
  - Test network cards, switches, cables, and other devices

## Making the Difficult Decisions
- Customization
  - One of SQL Server's greatest selling points
  - Software includes many customization options
  - Available features vary with different editions of SQL Server
- Important decisions
  - Choosing an edition
  - Choosing features
  - Licensing options

## Choosing an Edition
- Different editions developed to meet specific needs
- Available editions
  - SQL Server Express Edition
  - Compact 3.5
  - Workgroup Edition
  - Web Edition
  - Developer Edition
  - Standard Edition
  - Enterprise Edition

## SQL Server Features and Components
- Microsoft SQL Server includes several features administrators can include or exclude from an installation
- Modular packaging goal
  - Provide customizable, lightweight server with environment-specific capabilities
- Server tools
  - Fundamental tools available with an installation of Server 2008
- Database Engine Services
  - Heart of SQL Server database
  - Responsible for data storage, retrieval, manipulation, and security
  - Two subcomponents: Replication and Full Text Search
- Reporting Services (SSRS)
  - Provides different ways to present and deliver data
- Analysis Services (SSAS)
  - Provides online analytical processing (OLAP) and data mining
  - Designed for fast, frequent processing of data and queries
- Integrated Services (SSiS)
  - Joins and normalizes data from different sources
- Management tools
  - SQL Server Configuration Manager
    - Used to configure installation
  - SQL Server Management Studio
    - Administrative interface to SQL Server database
  - Business Intelligence Development Studio
    - Application development environment
  - Client Tools Connectivity
    - Enables communication between client and server
  - Server Profiler
    - Provides graphical user interface

## Licensing Options
- Express and Compact editions are free for download
- More available features come with higher licensing costs
- Three specific terms of licensing
  - Per Processor Licensing
  - Per Server Plus Device Client Access License (CAL)
  - Per User Plus Device CAL
- Types of CALs
  - SQL CAL, Workgroup CAL

## Locating Help
- Contracts can be formed to provide help in many different areas
- Help resources
  - SQL Server books online
  - Web sites
  - The Microsoft Online Books
  - Microsoft SQL release notes
  - Microsoft SQL forums
  - Bloggers
  - Twitter

## Installation
- Installation may begin after:
  - User obtains desired copy of Microsoft SQL Server
  - Hardware and software requirements are met
  - Desired edition and features have been selected
- If prerequisites have not been met:
  - SQL Server will require updates before installation

### The Server Installation Center

- Planning page provides planning resources and tools
  - Hardware and software requirements
  - Security documentation
  - Online release notes
  - System configuration checker
  - Install upgrade advisor
  - Online installation help
  - How to get started with SQL Server 2008 failover clustering
- Installation page links
  - New SQL Server stand-alone installation or add features to an existing installation
  - New SQL Server failover cluster installation
  - Add node to an SQL Server failover cluster
  - Upgrade for SQL Server 2000 or 2005
  - Search for product updates
- Maintenance page links
  - Edition upgrade
  - Repair
  - Remove node to an SQL Server failover cluster
- Tools page
  - System configuration checker
  - Installed SQL Server features discovery report
  - Upgrade integration services package
- Resources page
  - Books Online
  - TechCenter
  - Developer Center
  - Product Evaluation Web site
  - License Agreement
  - Register your copy of SQL Server 2008 Express
  - Microsoft Privacy Statement
  - Community
  - CodePlex samples Web site
- Advanced page
  - Install-based configuration file
  - Advanced cluster preparation
  - Advanced cluster completion
- Options Page
  - Specify which edition architecture of SQL Server to install
  - Specify installation media root directory if not using CD for installation

### Step-by-Step Installation
- Steps in this section intended for installing the Enterprise Edition of Microsoft SQL Server 2008

1. Insert CD and double-click setup executable file
2. Planning page of SQL Server installation center will appear
   - Click Installation on left to bring up Installation page
3. Click New SQL Server standalone installation or add features to an existing installation
   - Click OK
4. Installation Wizard will install SQL Server prerequisites software if needed
   - Click Next to install prerequisites
5. Configuration checker will provide details about the system state of the computer
   - Click Next
6. Enter the product key
   - Use drop down list to specify edition if using a free edition
   - Click Next
7. Accept the license terms
   - Click Next
8. Select features and components to customize your installation
9. Specify whether to use a default instance or a custom named instance and instance directory
   - Click Next
10. Disk Space Requirements Window calculates the required disk space for specified features
11. Some services will require a username and password
    - Specify login accounts
    - Change names by clicking Account Name and Password fields
12. Set security mode to Windows Authentication (recommended) or Mixed Mode Authentication
    - Add system administrator account by clicking Add Current User
    - Click OK
13. Specify users or accounts that will have administrator privileges for Analysis Services
    - At least one system administrator must be specified
    - Click Add Current User
    - Click Add or Remove to add or remove accounts from the list of system administrators
    - Click OK, then Next
14. Specify the kind of Reporting Services installation to create
    - Three choices: Native Mode, SharePoint Integrated Mode, and Not Configured
15. Set options in the Error and Usage Reporting window
    - Click Send Windows and SQL Server Error Reports to Microsoft or your corporate report server
    - Click Next
16. System configuration checker will run again to validate the configuration
17. Click Install on the Ready to Install window
18. Click Close on the Complete window

## Additional Security Considerations for SQL Server 2008
- Microsoft SQL Server popularity continues to increase
  - Security attacks also increasing
- Security steps prior to installation
  - Security must be addressed promptly
  - Designers should plan security strategy

### Security Steps Prior to Installation
- Best practices for SQL Server security
  - Place servers behind firewalls and locked doors
  - Use multiple internal and external firewalls, create subnets, and require strict authentication
  - Isolate database servers from public networks and eliminate all connections to unnecessary segments of the network
  - Use a very selective strategy when deciding which users to give permission to access the database
  - Configure ports on a computer, and on an individual basis
    - Avoid group range exceptions whenever possible
    - Never leave ports open and unmanaged
  - Choose servers for your SQL Server installation that use an NTFS file system
    - Provides extra security through encryption and access control list permission implementation
  - Encrypt your connection to the server using SSH or SSL

### During Installation
- Apply policy-based management
  - Manage it centrally
- Use encryption and auditing services
  - Transparent data encryption (TDE) enables encryption and backups without affecting the user
  - Enhanced auditing features allow tracking data access and data modification
- Apply passwords to services individually and uniquely
- Choose Windows authentication over Mixed authentication
  - Avoids passwords being sent over the network
- Strictly enforce a strong password policy
- Change default usernames whenever possible
  - Change usernames of root passwords

### After Installation
- Never store passwords in plain text format files
  - Use strong encryption techniques
- Use a multilayered approach to access
  - Create specific roles at server, application, and database layers
- Run services under separate Windows accounts that are local or have minimum rights
- Apply principle of least privilege when creating accounts
- Keep security updates and patches current
- Configure auditing services to enable login auditing at both OS and SQL Server level
  - Review logs frequently
- Disable all guest accounts
- Group database users on a different global group if possible
- Use error logs and ensure their security
- Never use the administrative account to run the database service engine
  - Use an account having the least privilege possible
- Ensure all file and disk shares on the SQL Server computer are read-only whenever possible

## Summary
- Microsoft SQL Server offers flexible installations
  - Several decisions must be made during planning phase
- Supported in Windows XP, 2003 Server, Vista, 2008 Server, and Windows 7
  - Supported platforms depend on edition
- There are software prerequisites for installing Microsoft SQL Server
- Seven different editions include Express, Compact, Workgroup, Web, Developer, Standard, and Enterprise
- Optional server tools include Database Engine Services, Reporting Services, Analysis Services, and Integrated Services
- Optional management tools include Configuration Manager, Server Management Studio, Business Intelligence Development Studio, Client Tools Connectivity, and Server Profiler
- Three different licensing options are available
- There are several resources that offer help
- Prior to installation, security should be considered