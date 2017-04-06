--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: book; Type: TABLE; Schema: public; Owner: libraryadmin; Tablespace: 
--

CREATE TABLE book (
    id integer NOT NULL,
    author character varying(255) NOT NULL,
    description text,
    imageurl text,
    isbn bigint,
    numberofpages integer,
    publicationdate character varying(255),
    publisher character varying(255),
    subtitle character varying(255),
    title character varying(255) NOT NULL
);


ALTER TABLE public.book OWNER TO libraryadmin;

--
-- Name: book_gen; Type: SEQUENCE; Schema: public; Owner: libraryadmin
--

CREATE SEQUENCE book_gen
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_gen OWNER TO libraryadmin;

--
-- Name: copy; Type: TABLE; Schema: public; Owner: libraryadmin; Tablespace: 
--

CREATE TABLE copy (
    id integer NOT NULL,
    status integer DEFAULT 0,
    book_id integer NOT NULL,
    library_id integer NOT NULL
);


ALTER TABLE public.copy OWNER TO libraryadmin;

--
-- Name: copy_gen; Type: SEQUENCE; Schema: public; Owner: libraryadmin
--

CREATE SEQUENCE copy_gen
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.copy_gen OWNER TO libraryadmin;

--
-- Name: databasechangelog; Type: TABLE; Schema: public; Owner: libraryadmin; Tablespace: 
--

CREATE TABLE databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255)
);


ALTER TABLE public.databasechangelog OWNER TO libraryadmin;

--
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: libraryadmin; Tablespace: 
--

CREATE TABLE databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE public.databasechangeloglock OWNER TO libraryadmin;

--
-- Name: library; Type: TABLE; Schema: public; Owner: libraryadmin; Tablespace: 
--

CREATE TABLE library (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE public.library OWNER TO libraryadmin;

--
-- Name: library_gen; Type: SEQUENCE; Schema: public; Owner: libraryadmin
--

CREATE SEQUENCE library_gen
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.library_gen OWNER TO libraryadmin;

--
-- Name: loan; Type: TABLE; Schema: public; Owner: libraryadmin; Tablespace: 
--

CREATE TABLE loan (
    id integer NOT NULL,
    end_date date,
    start_date date NOT NULL,
    copy_id integer,
    user_id integer
);


ALTER TABLE public.loan OWNER TO libraryadmin;

--
-- Name: loan_gen; Type: SEQUENCE; Schema: public; Owner: libraryadmin
--

CREATE SEQUENCE loan_gen
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loan_gen OWNER TO libraryadmin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: libraryadmin; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO libraryadmin;

--
-- Name: users_gen; Type: SEQUENCE; Schema: public; Owner: libraryadmin
--

CREATE SEQUENCE users_gen
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_gen OWNER TO libraryadmin;

--
-- Name: waitinglist; Type: TABLE; Schema: public; Owner: libraryadmin; Tablespace: 
--

CREATE TABLE waitinglist (
    id integer NOT NULL,
    end_date character varying(255) NOT NULL,
    start_date character varying(255) NOT NULL,
    book_id integer,
    library_id integer,
    user_id integer
);


ALTER TABLE public.waitinglist OWNER TO libraryadmin;

--
-- Name: waitinglist_gen; Type: SEQUENCE; Schema: public; Owner: libraryadmin
--

CREATE SEQUENCE waitinglist_gen
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.waitinglist_gen OWNER TO libraryadmin;

--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: libraryadmin
--

COPY book (id, author, description, imageurl, isbn, numberofpages, publicationdate, publisher, subtitle, title) FROM stdin;
1	Peter Thiel,Blake Masters	WHAT VALUABLE COMPANY IS NOBODY BUILDING? The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won't make a search engine. If you are copying these guys, you aren't learning from them. It's easier to copy a model than to make something new: doing what we already know how to do takes the world from 1 to n, adding more of something familiar. Every new creation goes from 0 to 1. This book is about how to get there. 'Peter Thiel has built multiple breakthrough companies, and Zero to One shows how.' ELON MUSK, CEO of SpaceX and Tesla 'This book delivers completely new and refreshing ideas on how to create value in the world.' MARK ZUCKERBERG, CEO of Facebook 'When a risk taker writes a book, read it. In the case of Peter Thiel, read it twice. Or, to be safe, three times. This is a classic.' NASSIM NICHOLAS TALEB, author of The Black Swan	http://books.google.com.br/books/content?id=rMFtnQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780753555194	224	2014-09-15	Virgin Books	Notes on Start Ups, Or How to Build the Future	Zero to One
2	Pramod J. Sadalage,Martin Fowler	The definitive introduction to NoSQL, the breakthrough performance and scalability solution for cloud-based database applications * *Co-authored by the legendary Martin Fowler: does for NoSQL what he did for UML in his classic UML Distilled *Presents realistic use cases and clear explanations of frequently misunderstood concepts, so developers and architects can make the most of NoSQL *Shows how NoSQL can be integrated with existing infrastructure and used to enable the cloud transition. NoSQL technologies are well-suited for many new applications where traditional RDBMSes often don't perform or scale well - including systems requiring large-scale indexing, serving pages on high-traffic websites, and heavy-duty streaming media delivery. In NoSQL Distilled, renowned software expert Martin Fowler and Thoughtworks database consultant Pramod J. Sadalage demystify NoSQL, succinctly explore the architectural and design issues associated with implementing it, and offer realistic use cases. Modeled after UML Distilled Fowler's international best-seller, NoSQL Distilled, covers all this and more: * *Evaluating which enterprise applications NoSQL is (and isn't) appropriate for. *Understanding the architectural tradeoffs associated with deploying NoSQL. *Comparing leading NoSQL offerings such as MongoDB, CouchDB, Cassandra, Riak, and Neo4J. *Integrating NoSQL with legacy systems. *Managing performance, reliability, availability, and recoverability. *Overcoming widespread misconceptions about NoSQL and its tradeoffs. *Understanding how NoSQL can support the transition to cloud-based systems. *Using NoSQL in agile development environments. *Applying NoSQL in search/retrieval, metadata management, text analysis, social networking, business intelligence, and financial services applications. *Understanding NoSQL query languages, including Object Query MDX, and XQuery and more	http://books.google.com.br/books/content?id=tYhsAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321826626	164	2012	Pearson Education	A Brief Guide to the Emerging World of Polyglot Persistence	NoSQL Distilled
3	Matt Wynne,Aslak Hellesoy	Written by the creator of Cucumber and one of its most experienced users and contributors, "The Cucumber Book" is an authoritative guide that will give readers all the knowledge they need to start using Cucumber with confidence.	http://books.google.com.br/books/content?id=oMswygAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356807	313	2012	\N	Behaviour-Driven Development for Testers and Developers	The Cucumber Book
4	Jeff Gothelf,Josh Seiden	User experience (UX) design has traditionally been a deliverables-based practice, with wireframes, site maps, flow diagrams, and mockups. But in today’s web-driven reality, orchestrating the entire design from the get-go no longer works. This hands-on book demonstrates Lean UX, a deeply collaborative and cross-functional process that lets you strip away heavy deliverables in favor of building shared understanding with the rest of the product team. Lean UX is the evolution of product design; refined through the real-world experiences of companies large and small, these practices and principles help you maintain daily, continuous engagement with your teammates, rather than work in isolation. This book shows you how to use Lean UX on your own projects. Get a tactical understanding of Lean UX—and how it changes the way teams work together Frame a vision of the problem you’re solving and focus your team on the right outcomes Bring the designer’s tool kit to the rest of your product team Break down the silos created by job titles and learn to trust your teammates Improve the quality and productivity of your teams, and focus on validated experiences as opposed to deliverables/documents Learn how Lean UX integrates with Agile UX	http://books.google.com.br/books/content?id=7TDQ4WZ1BHoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449311650	130	2013-03-15	"O'Reilly Media, Inc."	Applying Lean Principles to Improve User Experience	Lean UX
5	Jeff Patton,Peter Economy	User story mapping is a valuable tool for software development, once you understand why and how to use it. This insightful book examines how this often misunderstood technique can help your team stay focused on users and their needs without getting lost in the enthusiasm for individual product features. Author Jeff Patton shows you how changeable story maps enable your team to hold better conversations about the project throughout the development process. Your team will learn to come away with a shared understanding of what you’re attempting to build and why. Get a high-level view of story mapping, with an exercise to learn key concepts quickly Understand how stories really work, and how they come to life in Agile and Lean projects Dive into a story’s lifecycle, starting with opportunities and moving deeper into discovery Prepare your stories, pay attention while they’re built, and learn from those you convert to working software	http://books.google.com.br/books/content?id=W8b-oAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491904909	276	2014-09-15	Oreilly & Associates Incorporated	Discover the Whole Story, Build the Right Product	User Story Mapping
6	Adam Shostack	The only security book to be chosen as a Dr. Dobbs Jolt Award Finalist since Bruce Schneier's Secrets and Lies and Applied Cryptography! Adam Shostack is responsible for security development lifecycle threat modeling at Microsoft and is one of a handful of threat modeling experts in the world. Now, he is sharing his considerable expertise into this unique book. With pages of specific actionable advice, he details how to build better security into the design of systems, software, or services from the outset. You'll explore various threat modeling approaches, find out how to test your designs against threats, and learn effective ways to address threats that have been validated at Microsoft and other top companies. Systems security managers, you'll find tools and a framework for structured thinking about what can go wrong. Software developers, you'll appreciate the jargon-free and accessible introduction to this essential skill. Security professionals, you'll learn to discern changing threats and discover the easiest ways to adopt a structured approach to threat modeling. Provides a unique how-to for security and software developers who need to design secure products and systems and test their designs Explains how to threat model and explores various threat modeling approaches, such as asset-centric, attacker-centric and software-centric Provides effective approaches and techniques that have been proven at Microsoft and elsewhere Offers actionable how-to advice not tied to any specific software, operating system, or programming language Authored by a Microsoft professional who is one of the most prominent threat modeling experts in the world As more software is delivered on the Internet or operates on Internet-connected devices, the design of secure software is absolutely critical. Make sure you're ready with Threat Modeling: Designing for Security.	http://books.google.com.br/books/content?id=asPDAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781118809990	624	2014-02-17	John Wiley & Sons	Designing for Security	Threat Modeling
7	Eric Freeman,Elisabeth Freeman,Kathy Sierra,Bert Bates	Provides design patterns to help with software development using the Java programming language.	http://books.google.com.br/books/content?id=LjJcCnNf92kC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596007126	638	2004-10-25	"O'Reilly Media, Inc."	\N	Head First Design Patterns
659	Pablo Neruda	\N	\N	\N	\N	\N	Francisco Alves	\N	Incitação ao Nixonicídio e Louvor da Revolução Chilena
8	Guy Kawasaki,Peg Fitzpatrick	"A bottom-up strategy [intended] to produce a focused, thorough, and compelling presence on the most popular social-media platforms ... [guiding] you through steps to build your foundation, amass your digital assets, optimize your profile, attract more followers, and effectively integrate social media and blogging"--Amazon.com.	http://books.google.com.br/books/content?id=SbHFoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781591848073	208	2014-12-04	Portfolio	Power Tips for Power Users	The Art of Social Media
9	Jez Humble,Joanne Molesky,Barry O'Reilly	How well does your organization respond to changing market conditions, customer needs, and emerging technologies when building software-based products? This practical guide presents Lean and Agile principles and patterns to help you move fast at scale—and demonstrates why and how to apply these methodologies throughout your organization, rather than with just one department or team. Through case studies, you’ll learn how successful enterprises have rethought everything from governance and financial management to systems architecture and organizational culture in the pursuit of radically improved performance. Adopting Lean will take time and commitment, but it’s vital for harnessing the cultural and technical forces that are accelerating the rate of innovation. Discover how Lean focuses on people and teamwork at every level, in contrast to traditional management practices Approach problem-solving experimentally, by exploring solutions, testing assumptions, and getting feedback from real users Lead and manage large-scale programs in a way that empowers employees, increases the speed and quality of delivery, and lowers costs Learn how to implement ideas from the DevOps and Lean Startup movements even in complex, regulated environments	http://books.google.com.br/books/content?id=ZGNLngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449368425	317	2015-01-03	Oreilly & Associates Incorporated	Adopting Continuous Delivery, DevOps, and Lean Startup at Scale	Lean Enterprise
10	Paul Scherz,Simon Monk	The revised, corrected, and up-to-date reboot of a comprehensive classic!	http://books.google.com.br/books/content?id=bU0OkMwFeWIC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780071771337	1014	2013-01-31	McGraw Hill Professional	\N	Practical Electronics for Inventors, Third Edition
11	Alicia Gibb	A guide to designing and manufacturing open source hardware covers such topics as creating derivatives of existing projects, using source files, moving from prototype to commercial production, and writing documentation for other hardware hackers.	http://books.google.com.br/books/content?id=vTPBnAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321906045	368	2014-12-07	Pearson Education	DIY Manufacturing for Hackers and Makers	Building Open Source Hardware
12	Drew Neil	Vim is a fast and efficient text editor that will make you a faster and more efficient developer. It's available on almost every OS--if you master the techniques in this book, you'll never need another text editor. Practical Vim shows you 120 vim recipes so you can quickly learn the editor's core functionality and tackle your trickiest editing and writing tasks. Vim, like its classic ancestor vi, is a serious tool for programmers, web developers, and sysadmins. No other text editor comes close to Vim for speed and efficiency; it runs on almost every system imaginable and supports most coding and markup languages. Learn how to edit text the "Vim way:" complete a series of repetitive changes with The Dot Formula, using one keystroke to strike the target, followed by one keystroke to execute the change. Automate complex tasks by recording your keystrokes as a macro. Run the same command on a selection of lines, or a set of files. Discover the "very magic" switch, which makes Vim's regular expression syntax more like Perl's. Build complex patterns by iterating on your search history. Search inside multiple files, then run Vim's substitute command on the result set for a project-wide search and replace. All without installing a single plugin! You'll learn how to navigate text documents as fast as the eye moves--with only a few keystrokes. Jump from a method call to its definition with a single command. Use Vim's jumplist, so that you can always follow the breadcrumb trail back to the file you were working on before. Discover a multilingual spell-checker that does what it's told. Practical Vim will show you new ways to work with Vim more efficiently, whether you're a beginner or an intermediate Vim user. All this, without having to touch the mouse. What You Need: Vim version 7	http://books.google.com.br/books/content?id=DlTYuQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356982	311	2012	\N	Edit Text at the Speed of Thought	Practical Vim
13	Shyam Seshadri,Brad Green	A step-by-step guide to the AngularJS meta-framework covers from the basics to advanced concepts, including directives and controllers, form validation and stats, working with filters, unit testing, and guidelines and best practices.	http://books.google.com.br/books/content?id=2BqloAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491901946	282	2014-09-26	Oreilly & Associates Incorporated	Enhanced Productivity with Structured Web Apps	AngularJS: Up and Running
14	Allen Downey	"How to think like a computer scientist"--Cover.	http://books.google.com.br/books/content?id=1mZtP9H6OMQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449330729	277	2012-08-13	"O'Reilly Media, Inc."	\N	Think Python
15	Adam Freeman	AngularJS is the leading framework for building dynamic JavaScript applications that take advantage of the capabilities of modern browsers and devices. AngularJS, which is maintained by Google, brings the power of the Model-View-Controller (MVC) pattern to the client, providing the foundation for complex and rich web apps. It allows you to build applications that are smaller, faster, and with a lighter resource footprint than ever before. Best-selling author Adam Freeman explains how to get the most from AngularJS. He begins by describing the MVC pattern and the many benefits that can be gained from separating your logic and presentation code. He then shows how you can use AngularJS's features within in your projects to produce professional-quality results. Starting from the nuts-and-bolts and building up to the most advanced and sophisticated features AngularJS is carefully unwrapped, going in-depth to give you the knowledge you need. Each topic is covered clearly and concisely and is packed with the details you need to learn to be truly effective. The most important features are given a no-nonsense in-depth treatment and chapters include common problems and details of how to avoid them. What you’ll learn Gain a solid architectural understanding of the MVC Pattern to separate logic, data and presentation code. Learn how to create rich and dynamic web apps using AngularJS Understand how each feature works and why it is important Understand how to extend HTML with declarative syntax Learn how to extend and customize AngularJS Learn how to test, refine, and deploy your AngularJS projects Who this book is for This book is ideal for web developers who have a working knowledge of JavaScript, HTML and CSS. The book is platform agnostic and a range of browsers will be presented and discussed throughout the examples. Table of ContentsPart 1 - Getting Started 1. Getting Ready 2. Your First AngularJS App 3. Putting AngularJS in Context 4. HTML and CSS Primer 5. Javascript Primer 6. SportsStore: A Real Application 7. SportsStore: Navigation and Checkout 8. SportsStore: Administration Part 2 - Working with AngularJS 9. The Anatomy of an AngularJS App 10. Using Binding and Template Directives 11. Using Element and Event Directives 12. Working with Forms 13. Using Controllers and Scopes 14. Using Filters 15. Creating Custom Directives 16. Creating Complex Directives 17. Advanced Custom Directive Features Part 3 - AngularJS Modules and Services 18. Working with Modules and Services 19. Services for Global Objects, Errors and Expressions 20. Services for Ajax and Promises 21. Services for REST 22. Services for Views 23. Services for Animation and Touch 24. Services for Provision and Injection 25. Services for Testing	http://books.google.com.br/books/content?id=g1bKngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781430264484	688	2014-03-26	Apress	\N	Pro AngularJS
235	Lucas Krause	This book goes into great detail on all of the Microservice Architecture patterns including\n\n\n    Monolithic Architecture\n\n    Microservice Architecture\n\n    Service Discovery\n\n    Gateway / Proxy API\n\n    Orchestrated API\n\n    Service Registration\n\n    CQRS and Event Sourcing\n\n    Bulk Heads\n\n    Circuit Breaker\n\n    Message Broker\n\n\n\nThe most important thing about Microservices is when and how to apply a pattern, along with explaining what choices you must make and why. Every system is different so it is vital to understand a lot of basics before designing and developing your own Microservices.\n\n\n\nFrom Monolithic to Microservice\n\n\nThe basics here are how to decompose a Monolithic system into a Microservice and this book shows exactly how this process is completed.\n\nService Oriented Architecture to Microservice\n\n\nA more common need is to migrate your system from a SOA based architecture to Microservices, there are many advantages and the process is not as straightforward as you would expect.\n\n\nNew Microservices\n\n\nIf you want to build a brand-new system and leverage the power of Microservices this book outlines the pitfalls, strategies and tactics needs to make this work for you. It is not as easy as it would seem and you will understand why after reading this book.\n\n\n\nMicroservice Technologies\n\n\nYou'll learn about what technologies you need to use and understand for successful Microservices.\n\n\n    Virtualization\n\n    Containers (Docker and Rocket)\n\n    Databases\n\n    Security (JSON Web Tokens)\n\n    Logging\n\n    Exceptions\n\n    Caching\n\n    Timeouts\n\n    Scalability (CAP, Cube)\n\n    Platform as a Service (PaaS)\n\n    Cloud architecture\n\n    Technology agnostic\n\n\n\nWhy Microservices? Isn't this just the latest buzz word?\n\n\nWhile Microservices may be a recent trend and is gaining traction across the industry as a silver-bullet. It is not a silver-bullet.\nIn this book you will learn important reasons why you cannot treat Microservices or any technology or technique as a silver-bullet. There are\ntradeoffs and advnatages to every architectural decision, you will understand the details by reading this book. Most importantly you will understand\nhow Microservices is what SOA had promised and never delivered.\n\n\n\nAuthor: Lucas Krause\n\n\nLucas has been in the technology industry as a consultant, contractor, architect, engineer, and manager and understands and has used Microservices successfully to solve his client problems.\n\n\n\nPhilosophy of Microservices\n\n\nYou'll learn about what the philosophy of Microservices is and why this is important. It is critical to understand the philosophy as that is what makes Microservices work at so many other companies and solutions.\n\n\nIf you are looking to gain an understanding of Microservices along with the patterns and application around the process to implementing them than, this is the book for you!\n\n\n\nReady to learn about Microservices? Let's go!\n\n\n\nWant To Be brought up to speed on the latest innovations and techniques with Microservices?\n\nWant to Understand Why Microservices?\n\nWhat Makes Microservices so Special?\n\nWhat are the potential pitfalls?\n\nWhy Are Microservices so popular?\n\nHow do I make my projects successful?	http://ecx.images-amazon.com/images/I/51-fG8s6NJL._SX331_BO1,204,203,200_.jpg	\N	126	04/07/2015	\N	Patterns and Applications	Microservices
16	Kathy Sierra,Bert Bates	An interactive guide to the fundamentals of the Java programming language utilizes icons, cartoons, and numerous other visual aids to introduce the features and functions of Java and to teach the principles of designing and writing Java programs.	http://books.google.com.br/books/content?id=uIVJiAPlBq0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596009205	688	2005-02-09	"O'Reilly Media, Inc."		Head First Java
17	Kent Beck	Write clean code that works with the help of this groundbreaking software method. Example-driven teaching is the basis of Beck's step-by-step instruction that will have readers using TDD to further their projects.	http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321146533	220	2003	Addison-Wesley Professional	By Example	Test-driven Development
18	Alan Shalloway,Scott L. Bain,Amir Kolsky	Agile has become today's dominant software development paradigm, but agile methods remain difficult to measure and improve. Essential Skills for the Agile Developer fills this gap from the bottom up, teaching proven techniques for assessing and optimizing both individual and team agile practices. Written by four principals of Net Objectives--one of the world's leading agile training and consulting firms--this book reflects their unsurpassed experience helping organizations transition to agile. It focuses on the specific actions and insights that can deliver the greatest design and programming improvements with economical investment. The authors reveal key factors associated with successful agile projects and offer practical ways to measure them. Through actual examples, they address principles, attitudes, habits, technical practices, and design considerations--and above all, show how to bring all these together to deliver higher-value software. Using the authors' techniques, managers and teams can optimize the whole organization and the whole product across its entire lifecycle. Essential Skills for the Agile Developer shows how to Perform programming by intention Separate use from construction Consider testability before writing code Avoid over- and under-design Succeed with Acceptance Test Driven Development (ATDD) Minimize complexity and rework Use encapsulation more effectively and systematically Know when and how to use inheritance Prepare for change more successfully Perform continuous integration more successfully Master powerful best practices for design and refactoring	http://books.google.com.br/books/content?id=pUhsAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321543738	234	2010-12-15	Pearson Education	A Guide to Better Programming and Design	Essential Skills for the Agile Developer
19	Dave Logan,John King,Halee Fischer-Wright	It's a fact of life: birds flock, fish school, people "tribe." Every company, indeed every organization, is a tribe, or if it's large enough, a network of tribes—groups of 20 to 150 people in which everyone knows everyone else, or at least knows of everyone else. Tribes are more powerful than teams, companies, or even CEOs, and yet their key leverage points have not been mapped—until now. In Tribal Leadership, Dave Logan, John King, and Halee Fischer-Wright show leaders how to assess their organization's tribal culture on a scale from one to five and then implement specific tools to elevate the stage to the next. The result is unprecedented success. In a rigorous eight-year study of approximately 24,000 people in over two dozen corporations, Logan, King, and Fischer-Wright refine and define a common theme: the success of a company depends on its tribes, the strength of its tribes is determined by the tribal culture, and a thriving corporate culture can be established by an effective tribal leader. Tribal Leadership will show leaders how to employ their companies' tribes to maximize productivity and profit: the authors' research, backed up with interviews ranging from Brian France (CEO of NASCAR) to "Dilbert" creator Scott Adams, shows that over three quarters of the organizations they've studied have tribal cultures that are merely adequate, no better than the third of five tribal stages. Leaders, managers, and organizations that fail to understand, motivate, and grow their tribes will find it impossible to succeed in an increasingly fragmented world of business. The often counterintuitive findings of Tribal Leadership will help leaders at today's major corporations, small businesses, and nonprofits learn how to take the people in their organization from adequate to outstanding, to discover the secrets that have led the highest-level tribes (like the team at Apple that designed the iPod) to remarkable heights, and to find new ways to succeed where others have failed.	http://books.google.com.br/books/content?id=pwP3lgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780061251306	320	2008-01-22	HarperBusiness	Leveraging Natural Groups to Build a Thriving Organization	Tribal Leadership
20	Robert C. Martin,Micah Martin	Comprehensive, pragmatic tutorial on Agile development for C# programmers from one of the founding fathers of Agile programming.	http://books.google.com.br/books/content?id=x4tQAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780131857254	732	2007	Prentice-Hall PTR	\N	Agile Principles, Patterns, and Practices in C#
21	Jon Skeet	A guide to the key topics of C# covers lambda expressions, LINQ, generics, nullable types, iterators, and extension methods.	http://books.google.com.br/books/content?id=PfyHkQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781617291340	582	2013-08-28	Manning Publications	\N	C# in Depth
22	Rachel Davies,Liz Sedley	"Agile Coaching" is all about working with people to create great teams. Readers learn how to build a team that produces great software and has fun doing it. The authors share their personal coaching stories, giving insights into what works and what to avoid.	http://books.google.com.br/books/content?id=1JVWPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356432	221	2009	\N	\N	Agile Coaching
23	Gojko Adzic	Describes a method of effectively specifying, testing, and delivering software, covering such topics as documentation, process patterns, and automation, along with case studies from a variety of firms.	http://books.google.com.br/books/content?id=5F5PYgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781617290084	270	2011	Manning Publications	How Successful Teams Deliver the Right Software	Specification by Example
24	Jim Webber,Savas Parastatidis,Ian Robinson	REST continues to gain momentum as the best method for building web services, leaving many web architects to consider whether and how to include this approach in their SOA and SOAP-dominated world. This book offers a down-to-earth explanation of REST, with techniques and examples that show you how to design and implement integration solutions using the REST architectural style. Explore several web communications approaches, and discover what makes REST different Walk through the pros and cons of the RESTful approach Learn how the underlying architecture of the Web can drastically simplify programming built on top of it View REST in the context of cloud computing and the Semantic Web Understand how hypermedia serves as a model for computers to process data	http://books.google.com.br/books/content?id=5CjJcil4UfMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596805821	428	2010-09-17	"O'Reilly Media, Inc."	Hypermedia and Systems Architecture	REST in Practice
77	Roberto Bolaño	La novela narra la busqueda de la poetisa mexicana Cesarea Tinajero, por parte de dos jovenes poetas fundadores de un movimiento de poesia llamado los real visceralistas, el chileno Arturo Belano y el mexicano Ulises Lima.	http://books.google.com.ec/books/content?id=r60fmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780307476111	609	2010	Vintage Books	\N	Los detectives salvajes
713	Zhang Pengpeng	\N	http://pictures.abebooks.com/isbn/9787561909973-us.jpg	\N	95	2002	\N	\N	Three Sinogram Verses Using Radicals
25	Roman Pichler	A comprehensive, expert guide to Scrum-based agile project ownership and management: roles, techniques, practices, and intangibles * *An indispensable resource for Scrum 'product owners,' the pivotal players in Scrum projects - and for all stakeholders who interact with them. *Covers product vision, exploration, user stories, use cases, planning poker, release planning, and much more. *Responds to one of the most crucial challenges in making agile work in the enterprise: finding and training the right product owner. In Scrum projects, the product owner plays a pivotal role, but until recently, few have been trained in the unique skills, techniques, and attitudes they need to succeed in this role. That's why courses on Scrum product ownership are soaring in popularity - and it's why this book is so important. Agile Product Management with Scrum is the first book to define and describe the role of agile product ownership in a systematic and comprehensive way. It covers a broad range of agile practices from the product owner's perspective, including product vision, exploration, user stories, use cases, 'planning poker,' sprints, release planning, portfolio management, and more. Drawing on extensive experience helping organizations succeed with Scrum, top agile consultant Roman Pichler gets down to the brass tacks: saving time and money while improving both quality and agility. He also addresses critical upstream processes and 'fuzzy front end' that organizations must get right if they are to adopt Scrum across the enterprise. This practical book is an indispensable resource for everyone who plays the role of product owner, or anticipates doing so. It will also be extremely useful to all stakeholders who interact with product owners - which is to say, the entire Scrum project team.	http://books.google.com.br/books/content?id=QZDNPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321605788	133	2010	Addison-Wesley Professional	Creating Products that Customers Love	Agile Product Management with Scrum
26	Brett King	\N	http://books.google.com.br/books/content?id=qW2IkgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781118632499	400	2013-02-11	Wiley	\N	Bank 3.0: Why Banking Is No Longer Somewhere You Go But Something You Do (Custom Edition)
27	Saul Greenberg,Sheelagh Carpendale,Bill Buxton,Nicolai Marquardt	In Sketching User Experiences: The Workbook, you will learn, through step-by-step instructions and exercises, various sketching methods that will let you express your design ideas about user experiences across time. Collectively, these methods will be your sketching repertoire: a toolkit where you can choose the method most appropriate for developing your ideas, which will help you cultivate a culture of experience-based design and critique in your workplace. Features standalone modules detailing methods and exercises for practitioners who want to learn and develop their sketching skills Extremely practical, with illustrated examples detailing all steps on how to do a method Excellent for individual learning, for classrooms, and for a team that wants to develop a culture of design practice Perfect complement to Buxton's Sketching User Experience or any UX text	http://books.google.com.br/books/content?id=c-RAUXk3gbkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780123819598	262	2012-01	Elsevier	\N	Sketching User Experiences
28	Steve Krug	Offers observations and solutions to fundamental Web design problems, as well as a new chapter about mobile Web design.	http://books.google.com.br/books/content?id=qahpAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321965516	200	2014	Pearson Education	A Common Sense Approach to Web Usability	Don't Make Me Think, Revisited
29	Douglas Crockford	Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.	http://ecx.images-amazon.com/images/I/518QVtPWA7L._SX379_BO1,204,203,200_.jpg	\N	176	05/2008	O'Reilly Media	\N	JavaScript - The Good Parts
30	Edward de Bono	Six Thinking Hats is a self-help book by Edward de Bono which describes a tool for group discussion and individual thinking involving six colored hats. "Six Thinking Hats" and the associated idea parallel thinking provide a means for groups to plan thinking processes in a detailed and cohesive way, and in doing so to think together more effectively.	http://t2.gstatic.com/images?q=tbn:ANd9GcRYmSOxKfpgKMENbGGUcKR0hadjXq5eChejm0aA3Ubdxcq0HmJa	\N	207	1985	Little, Brown and Company	\N	Six Thinking Hats
31	Jeff Knupp	The "Writing Idiomatic Python" book is finally here! Chock full of code samples, you'll learn the "Pythonic" way to accomplish common tasks. Each idiom comes with a detailed description, example code showing the "wrong" way to do it, and code for the idiomatic, "Pythonic" alternative. *This version of the book is for Python 2.7.3+. There is also a Python 3.3+ version available.* "Writing Idiomatic Python" contains the most common and important Python idioms in a format that maximizes identification and understanding. Each idiom is presented as a recommendation to write some commonly used piece of code. It is followed by an explanation of why the idiom is important. It also contains two code samples: the "Harmful" way to write it and the "Idiomatic" way. * The "Harmful" way helps you identify the idiom in your own code. * The "Idiomatic" way shows you how to easily translate that code into idiomatic Python. This book is perfect for you: * If you're coming to Python from another programming language * If you're learning Python as a first programming language * If you're looking to increase the readability, maintainability, and correctness of your Python code What is "Idiomatic" Python? Every programming language has its own idioms. Programming language idioms are nothing more than the generally accepted way of writing a certain piece of code. Consistently writing idiomatic code has a number of important benefits: * Others can read and understand your code easily * Others can maintain and enhance your code with minimal effort * Your code will contain fewer bugs * Your code will teach others to write correct code without any effort on your part	data:image/webp;base64,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	\N	88	February 6, 2013	CreateSpace Independent Publishing Platform	\N	Writting Idiomatic Python
32	Frederick P. Brooks Jr.	Few books on software project management have been as influential and timeless as The Mythical Man-Month. With a blend of software engineering facts and thought-provoking opinions, Fred Brooks offers insight for anyone managing complex projects. These essays draw from his experience as project manager for the IBM System/360 computer family and then for OS/360, its massive software system. Now, 20 years after the initial publication of his book, Brooks has revisited his original ideas and added new thoughts and advice, both for readers already familiar with his work and for readers discovering it for the first time.	http://ecx.images-amazon.com/images/I/51XnDL5KC%2BL._SX334_BO1,204,203,200_.jpg	\N	336	08/1995	Addison-Wesley Professional	Essays on Software Engineering	The Mythical Man-Month
58	Jonathan Fetter-Vorm	Em 1942, temendo que os nazistas estivessem perto de construir uma bomba atômica, os Estados Unidos iniciaram o ultrassecreto Projeto Manhattan, que reuniria militares e cientistas para a criação da arma mais letal de todos os tempos. É esse episódio que o ilustrador e escritor americano Jonathan Fetter-Vorm narra em Trinity, livro em quadrinhos dirigido a jovens e adultos. De maneira informativa, interessante e dramática, ele apresenta desde as pesquisas científicas com o átomo no século XIX até as trágicas destruições de Hiroshima e Nagasaki, em 1945. Trinity é uma introdução fundamental a um dos eventos centrais da história e também às questões políticas, éticas e ecológicas provocadas pela corrida nuclear.	http://ecx.images-amazon.com/images/I/A1YRSWOt3uL.jpg	\N	\N	01/01/2014	Três Estrelas	A História da Primeira Bomba Atômica	Trinity
33	Gerald M. Weinberg	If you are a consultant, ever use one, or want to be one, this book will show you how to succeed. With wit, charm, humor, and wisdom, Gerald M. Weinberg shows you exactly how to become a more effective consultant. He reveals specific techniques and strategies that really work. Through the use of vividly memorable rules, laws, and principles -- such as The Law of Raspberry Jam, The Potato Chip Principle, and Lessons from the Farm -- the author shows you how to -- price and market your services -- avoid traps and find alternative approaches -- keep ahead of your clients -- create a special "consultant's survival kit" -- trade improvement for perfection -- negotiate in difficult situations -- measure your effectiveness -- be yourself You will also find straightforward advice on marketing your services, including how to -- find clients -- get needed exposure -- set just-right fees -- gain trust The Secrets of Consulting -- techniques, strategies, and first-hand experiences -- all that you'll need to set up, run, and be successful at your own consulting business.	http://books.google.com.br/books/content?id=dse2q-xhTLIC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780932633019	228	1985-01-01	Dorset House	A Guide to Giving & Getting Advice Successfully	The Secrets of Consulting
34	Kerry Patterson,Joseph Grenny,Ron McMillan,Al Switzler,David Maxfield	Hold anyone accountable. Master performance discussions. Get RESULTS. Broken promises, missed deadlines, poor behavior--they don't just make others' lives miserable; they can sap up to 50 percent of organizational performance and account for the vast majority of divorces. Crucial Accountability offers the tools for improving relationships in the workplace and in life and for resolving all these problems--permanently. PRAISE FOR CRUCIAL ACCOUNTABILITY: "Revolutionary ideas ... opportunities for breakthrough ..." -- Stephen R. Covey, author of The 7 Habits of Highly Effective People "Unleash the true potential of a relationship or organization and move it to the next level." -- Ken Blanchard, coauthor of The One Minute Manager "The most recommended and most effective resource in my library." -- Stacey Allerton Firth, Vice President, Human Resources, Ford of Canada "Brilliant strategies for those difficult discussions at home and in the workplace." -- Soledad O’Brien, CNN news anchor and producer "This book is the real deal.... Read it, underline it, learn from it. It's a gem." -- Mike Murray, VP Human Resources and Administration (retired), Microsoft	http://books.google.com.br/books/content?id=bQhSkDdQ_AMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780071829311	336	2013-05-24	McGraw-Hill Professional	\N	Crucial Accountability: Tools for Resolving Violated Expectations, Broken Commitments, and Bad Behavior, Second Edition ( Paperback)
35	Kerry Patterson,Joseph Grenny,Ron McMillan,Al Switzler	The New York Times and Washington Post bestseller that changed the way millions communicate “[Crucial Conversations] draws our attention to those defining moments that literally shape our lives, our relationships, and our world. . . . This book deserves to take its place as one of the key thought leadership contributions of our time.” —from the Foreword by Stephen R. Covey, author of The 7 Habits of Highly Effective People “The quality of your life comes out of the quality of your dialogues and conversations. Here’s how to instantly uplift your crucial conversations.” —Mark Victor Hansen, cocreator of the #1 New York Times bestselling series Chicken Soup for the Soul® The first edition of Crucial Conversations exploded onto the scene and revolutionized the way millions of people communicate when stakes are high. This new edition gives you the tools to: Prepare for high-stakes situations Transform anger and hurt feelings into powerful dialogue Make it safe to talk about almost anything Be persuasive, not abrasive	http://books.google.com.br/books/content?id=VhkQpRH9D9gC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780071772204	288	2011-09-16	McGraw Hill Professional	\N	Crucial Conversations Tools for Talking When Stakes Are High, Second Edition
36	David Sherwin	Have you ever struggled to complete a design project on time? Or felt that having a tight deadline stifled your capacity for maximum creativity? If so, then this book is for you. Within these pages, you'll find 80 creative challenges that will help you achieve a breadth of stronger design solutions, in various media, within any set time period. Exercises range from creating a typeface in an hour to designing a paper robot in an afternoon to designing web pages and other interactive experiences. Each exercise includes compelling visual solutions from other designers and background stories to help you increase your capacity to innovate. Creative Workshop also includes useful brainstorming techniques and wisdom from some of today's top designers. By road-testing these techniques as you attempt each challenge, you'll find new and more effective ways to solve tough design problems and bring your solutions to vibrant life.	http://books.google.com.br/books/content?id=mTSNYmfEIykC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781600617973	231	2010-11-24	HOW Books	80 Challenges to Sharpen Your Design Skills	Creative Workshop
37	Steve Krug	Spells out an approach to usability testing that anyone can easily apply to his or her own website, application or other product, in a book that explains how to test any design, keep one's focus on finding the most important problems and fix the problems one finds using the author's "the least you can do" approach. Original.	http://books.google.com.br/books/content?id=VzbimAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321657299	161	2010-01	New Riders Pub	The Do-it-yourself Guide to Finding and Fixing Usability Problems	Rocket Surgery Made Easy
38	Tim Brown	The myth of innovation is that brilliant ideas leap fully formed from the minds of geniuses. The reality is that most innovations come from a process of rigorous examination through which great ideas are identified and developed before being realized as new offerings and capabilities. This book introduces the idea of design thinking‚ the collaborative process by which the designer′s sensibilities and methods are employed to match people′s needs not only with what is technically feasible and a viable business strategy. In short‚ design thinking converts need into demand. It′s a human−centered approach to problem solving that helps people and organizations become more innovative and more creative. Design thinking is not just applicable to so−called creative industries or people who work in the design field. It′s a methodology that has been used by organizations such as Kaiser Permanente to icnrease the quality of patient care by re−examining the ways that their nurses manage shift change‚ or Kraft to rethink supply chain management. This is not a book by designers for designers; this is a book for creative leaders seeking to infuse design thinking into every level of an organization‚ product‚ or service to drive new alternatives for business and society.	http://books.google.com.br/books/content?id=FGfglgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780061766084	272	2009-09-29	HarperBusiness	How Design Thinking Transforms Organizations and Inspires Innovation	Change by Design
39	Addy Osmani	An introduction to writing code with JavaScript using classical and modern design patterns, including modules, observers, facades, and mediators.	http://books.google.com.br/books/content?id=JYPEgK-1bZoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449331818	235	2012-08-20	"O'Reilly Media, Inc."	\N	Learning JavaScript Design Patterns
40	Paola Prandini	A biografia do poeta simbolista negro Cruz e Sousa, conhecido como o “Cisne Negro”, retrata a trajetória de um dos mais importantes escritores brasileiros. Resgatando momentos como a infância em Santa Catarina, a dedicação à literatura e a luta pela abolição da escravatura, o livro destaca sua produção como poeta vanguardista e traz dados sobre peças e filmes inspirados no autor. Esta obra faz parte da Coleção Retratos do Brasil Negro, coordenada por Vera Lúcia Benedito, mestre e doutora em Sociologia/Estudos Urbanos pela Michigan State University (EUA) e pesquisadora e consultora da Secretaria de Estado da Cultura de São Paulo. O objetivo da Coleção é abordar a vida e a obra de figuras fundamentais da cultura, da política e da militância negra.	http://books.google.com.br/books/content?id=6w6exscAmrEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788587478658	\N	2011-11-07	Selo Negro	Retratos do Brasil Negro	CRUZ E SOUSA
41	Cidinha da Silva	\N	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=8871656&qld=90&l=370&a=-1	9788567544007	162	2013	\N	\N	Racismo no Brasil e afetos correlatos
42	ANIL HEMRAJANI	'Desenvolvimento ágil em Java com Spring, Hibermate e Eclipse' é um livro sobre tecnologias robustas e métodos eficientes que ajudará o programador a trazer simplicidade de volta ao mundo do desenvolvimento corporativo em Java. As três tecnologias abordadas, Spring Framework, Hibernate e Eclipse, permitem reduzir significativamente a complexidade desse tipo de desenvolvimento. Além disso, são compatíveis com os POJOs (Plain Old Java Objects - 'velhos e simples' objetos Java) em contêineres, em vez dos pesados objetos remotos que os contêineres EJB exigem. Este livro também aborda o uso de ferramentas como Ant, Junit e a biblioteca de tags JSP, além de introduzir outros assuntos, como depuração baseada em GUI, monitoramento usando o JMX, agendamento de tarefas, envio de e-mail e muito mais. E, finalmente, a Extreme Programming (XP), o Agile Model Driven Development (AMDD) e a refatoração são métodos que podem acelerar os projetos de desenvolvimento de software ao mesmo tempo em que reduzem a quantidade de requisitos de programação e de design; portanto, esses assuntos também são discutidos no livro.	http://isuba.s8.com.br/produtos/01/00/item/6827/4/6827405G1.jpg	9788576051275	320	\N	\N	E ECLIPSE	DESENVOLVIMENTO AGIL EM JAVA COM SPRING, HIBERNAT
43	Paulo Caroli (Edição)	\N	http://cdn.shopify.com/s/files/1/0155/7645/products/thoughtworks-antologia-featured_large.png?v=1416319002	\N	292	11/2014	Casa do Código	Histórias de aprendizado e inovação	Thoughtworks Antologia Brasil
44	Aurelio Marinho Jargas	As Expressões Regulares podem ser utilizadas em diversos aplicativos, como editores de textos, leitores de e-mail e linguagens de programação, no UNIX, Linux, Windows e Mac. Qualquer usuário de computador pode usufruir dos seus benefícios. Profissionais que manipulam texto e dados economizarão horas de serviço braçal: escritores, revisores, tradutores, programadores e administradores de sistema.	http://www.piazinho.com.br/ed3/capa-300.jpg	\N	208	2009	Novatec	Uma Abordagem Divertida	Expressões Regulares
45	Martin Fowler	Refactoring is about improving the design of existing code. It is the process of changing a software system in such a way that it does not alter the external behavior of the code, yet improves its internal structure. With refactoring you can even take a bad design and rework it into a good one. This book offers a thorough discussion of the principles of refactoring, including where to spot opportunities for refactoring, and how to set up the required tests. There is also a catalog of more than 40 proven refactorings with details as to when and why to use the refactoring, step by step instructions for implementing it, and an example illustrating how it works The book is written using Java as its principle language, but the ideas are applicable to any OO language.	http://ecx.images-amazon.com/images/I/512-aYxS4ML._SX385_.jpg	\N	464	28 de junho de 1999	Addison-Wesley Professional	Improving the Design of Existing Code	Refactoring
46	Danilo Sato	Entregar software em produção é um processo que tem se tornado cada vez mais difícil no departamento de TI de diversas empresas. Ciclos longos de teste e divisões entre as equipes de desenvolvimento e de operações são alguns dos fatores que contribuem para este problema. Mesmo equipes ágeis que produzem software entregável ao final de cada iteração sofrem para chegar em produção quando encontram estas barreiras.	http://cdn.shopify.com/s/files/1/0155/7645/products/devops-featured_large.png?v=1411489207	\N	248	10/2013	Casa do Código	Entrega de software confiável e automatizada	DevOps na prática
47	Marc Lamont Hill	Este livro vem preencher uma lacuna no debate teórico sobre duas questões primordiais envolvendo a temática da identidade cultural. A primeira, que se refere ao multiculturalismo crítico, ao qual o autor articula uma proposta de pedagogia crítica inspirada no hip-hop. A segunda, que remete a identidade cultural à luta pelo reconhecimento das culturas dos povos historicamente prejudicados, como tem sustentado o filósofo frankfurtiano, Axel Honneth. A ideia central de Hill é conhecer a cultura e os problemas da comunidade trazidos pelos alunos em sala de aula e com eles compartilhar suas angústias, respeitando os seus modos de ser e de se expressar.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=8258565&qld=90&l=370&a=-1	\N	272	2014	Vozes	Pedagogia Hip-Hop e As Políticas de Identidade	Batidas, Rimas e Vida Escolar
48	Diego Balbino, Paola Prandini	\N	http://2.bp.blogspot.com/-V5KWlBCHNHE/VWyOYSAVGgI/AAAAAAAAAnw/7_ll2bN4E48/s1600/carolinas.jpg	\N	\N	\N	\N	Retratos inspirados em Carolina Maria de Jesus	Carolinas
49	Andrew Hunt,David Thomas	What others in the trenches say about The Pragmatic Programmer... “The cool thing about this book is that it’s great for keeping the programming process fresh. The book helps you to continue to grow and clearly comes from people who have been there.” —Kent Beck, author of Extreme Programming Explained: Embrace Change “I found this book to be a great mix of solid advice and wonderful analogies!” —Martin Fowler, author of Refactoring and UML Distilled “I would buy a copy, read it twice, then tell all my colleagues to run out and grab a copy. This is a book I would never loan because I would worry about it being lost.” —Kevin Ruland, Management Science, MSG-Logistics “The wisdom and practical experience of the authors is obvious. The topics presented are relevant and useful.... By far its greatest strength for me has been the outstanding analogies—tracer bullets, broken windows, and the fabulous helicopter-based explanation of the need for orthogonality, especially in a crisis situation. I have little doubt that this book will eventually become an excellent source of useful information for journeymen programmers and expert mentors alike.” —John Lakos, author of Large-Scale C++ Software Design “This is the sort of book I will buy a dozen copies of when it comes out so I can give it to my clients.” —Eric Vought, Software Engineer “Most modern books on software development fail to cover the basics of what makes a great software developer, instead spending their time on syntax or technology where in reality the greatest leverage possible for any software team is in having talented developers who really know their craft well. An excellent book.” —Pete McBreen, Independent Consultant “Since reading this book, I have implemented many of the practical suggestions and tips it contains. Across the board, they have saved my company time and money while helping me get my job done quicker! This should be a desktop reference for everyone who works with code for a living.” —Jared Richardson, Senior Software Developer, iRenaissance, Inc. “I would like to see this issued to every new employee at my company....” —Chris Cleeland, Senior Software Engineer, Object Computing, Inc. “If I’m putting together a project, it’s the authors of this book that I want. . . . And failing that I’d settle for people who’ve read their book.” —Ward Cunningham Straight from the programming trenches, The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users. It covers topics ranging from personal responsibility and career development to architectural techniques for keeping your code flexible and easy to adapt and reuse. Read this book, and you'll learn how to Fight software rot; Avoid the trap of duplicating knowledge; Write flexible, dynamic, and adaptable code; Avoid programming by coincidence; Bullet-proof your code with contracts, assertions, and exceptions; Capture real requirements; Test ruthlessly and effectively; Delight your users; Build teams of pragmatic programmers; and Make your developments more precise with automation. Written as a series of self-contained sections and filled with entertaining anecdotes, thoughtful examples, and interesting analogies, The Pragmatic Programmer illustrates the best practices and major pitfalls of many different aspects of software development. Whether you're a new coder, an experienced programmer, or a manager responsible for software projects, use these lessons daily, and you'll quickly see improvements in personal productivity, accuracy, and job satisfaction. You'll learn skills and develop habits and attitudes that form the foundation for long-term success in your career. You'll become a Pragmatic Programmer.	http://books.google.com.br/books/content?id=5wBQEp6ruIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780132119177	352	1999-10-20	Addison-Wesley Professional	From Journeyman to Master	The Pragmatic Programmer
59	Martin Fowler,Rebecca Parsons	Martin Fowler's breakthrough practitioner-oriented book on Domain Specific Languages - will do for DSLs what Fowler did for refactoring! * *Fowler's highly anticipated introduction to DSLs: a category-defining book by one of the software world's most influential authors. *Two books in one: a concise narrative that introduces DSLs, and a larger reference that shows how to plan and develop them. *Helps software professionals reduce the cost and complexity of building DSLs - so they can take full advantage of them. Domain Specific Languages (DSLs) offer immense promise for software engineers who need better, faster ways to solve problems of specific types, or in specific areas or industries. DSLs have been around for several years, and have begun to grow in popularity. Now, Martin Fowler - one of the world's most influential software engineering authors - has written the first practitioner-oriented book about them. Fowler's legendary book, Refactoring, made software refactoring a crucial tool for software engineers worldwide; this book will do the same for DSLs. Fowler has designed Domain Specific Languages as two books in one. The first --a narrative designed to be read from 'cover to cover' - offers a concise introduction to DSLs, how they are implemented, and what are useful for. Next, Fowler thoroughly introduces today's most effective techniques for building DSLs. Fowler covers both 'external' and 'internal' DSLs, a well as alternative computational models, code generation, common parser topics, and much more. He provides extensive Java and C# examples throughout, as well as selected Ruby examples for concepts that can best be explained using a dynamic language. Together, both sections enable readers to make wellinformed choices about whether to use a DSL in their work, and which techniques to employ in order to build DSLs more quickly and cost-effectively.	http://books.google.com.ec/books/content?id=7lLHmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321712943	597	2011	Addison-Wesley Professional	\N	Domain-specific Languages
50	Steve Freeman,Nat Pryce	Foreword by Kent Beck "The authors of this book have led a revolution in the craft of programming by controlling the environment in which software grows." --Ward Cunningham "At last, a book suffused with code that exposes the deep symbiosis between TDD and OOD. This one's a keeper." --Robert C. Martin "If you want to be an expert in the state of the art in TDD, you need to understand the ideas in this book."--Michael Feathers Test-Driven Development (TDD) is now an established technique for delivering better software faster. TDD is based on a simple idea: Write tests for your code before you write the code itself. However, this "simple" idea takes skill and judgment to do well. Now there's a practical guide to TDD that takes you beyond the basic concepts. Drawing on a decade of experience building real-world systems, two TDD pioneers show how to let tests guide your development and "grow" software that is coherent, reliable, and maintainable. Steve Freeman and Nat Pryce describe the processes they use, the design principles they strive to achieve, and some of the tools that help them get the job done. Through an extended worked example, you'll learn how TDD works at multiple levels, using tests to drive the features and the object-oriented structure of the code, and using Mock Objects to discover and then describe relationships between objects. Along the way, the book systematically addresses challenges that development teams encounter with TDD--from integrating TDD into your processes to testing your most difficult features. Coverage includes * Implementing TDD effectively: getting started, and maintaining your momentum throughout the project * Creating cleaner, more expressive, more sustainable code * Using tests to stay relentlessly focused on sustaining quality * Understanding how TDD, Mock Objects, and Object-Oriented Design come together in the context of a real software development project * Using Mock Objects to guide object-oriented designs * Succeeding where TDD is difficult: managing complex test data, and testing persistence and concurrency	http://books.google.com.br/books/content?id=vkb7mAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321503626	358	2010	Addison-Wesley Professional	\N	Growing Object-oriented Software, Guided by Tests
51	fes	\N	\N	\N	\N	\N	\N	\N	JES
52	Adam Tornhill	Inspired by forensic psychology methods, this book teaches strategies to predict the future of your codebase, assess refactoring direction, and understand how your team influences the design. With its unique blend of forensic psychology and code analysis, it arms you with the strategies you need, no matter what programming language you use.	http://books.google.com.br/books/content?id=vFjRrQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781680500387	190	2015-02-25	\N	Use Forensic Techniques to Arrest Defects, Bottlenecks, and Bad Design in Your Programs	Your Code As a Crime Scene
53	Thomas Piketty	The main driver of inequality--returns on capital that exceed the rate of economic growth--is again threatening to generate extreme discontent and undermine democratic values. Thomas Piketty's findings in this ambitious, original, rigorous work will transform debate and set the agenda for the next generation of thought about wealth and inequality.	http://books.google.com.br/books/content?id=iv0HngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780674430006	695	2014-04-15	Harvard University Press	\N	Capital in the Twenty-First Century
54	Aurelio Marinho Jargas	As Expressões Regulares podem ser utilizadas em diversos aplicativos, como editores de textos, leitores de e-mail e linguagens de programação, no UNIX, Linux, Windows e Mac. Qualquer usuário de computador pode usufruir dos seus benefícios. Profissionais que manipulam texto e dados economizarão horas de serviço braçal: escritores, revisores, tradutores, programadores e administradores de sistema.	http://www.piazinho.com.br/ed3/capa-300.jpg	\N	208	Dec 31, 1969	Novatec	Uma Abordagem Divertida	Expressões Regulares
55	Vinícius Manhães Teles	Extreme Programming (XP) é um processo de desenvolvimento que possibilita a criação de software de alta qualidade, de maneira ágil, econômica e flexível. Vem sendo adotado com enorme sucesso na Europa, nos Estados Unidos e, mais recentemente, no Brasil. Cada vez mais as empresas convivem com ambientes de negócios que requerem mudanças frequentes em seus processos, as quais afetam os projetos de software. Os processos de desenvolvimento tradicionais são caracterizados por uma grande quantidade de atividades e artefatos que buscam proteger o software contra mudanças, o que faz pouco ou nenhum sentido, visto que os projetos devem se adaptar a tais mudanças, em vez de evitá-las. O XP concentra os esforços da equipe de desenvolvimento em atividades que geram resultados rapidamente na forma de software intensamente testado e alinhado às necessidades de seus usuários. Além disso, simplifica e organiza o trabalho combinando técnicas comprovadamente eficazes e eliminando atividades redundantes. Por fim, reduz o risco dos projetos, desenvolvendo software de forma iterativa e reavaliando permanentemente as prioridades dos usuários. Este livro apresenta o XP de forma didática e prática, com base na experiência do autor que o utilizou em projetos reais. As explicações combinam teoria, exemplos, ilustrações e metáforas que facilitam a compreensão dos conceitos e fornecem um caminho seguro para que o leitor incorpore o XP ao seu dia a dia. Destina-se a profissionais da área de informática, gerentes e diretores de tecnologia da informação, bem como a estudantes e professores universitários.	http://books.google.com.br/books/content?id=s7i1BAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788575224007	328	2014-10-07	Novatec Editora	Aprenda como encantar seus usuários desenvolvendo software com agilidade e alta qualidade	Extreme Programming - 2ª Edição
56	Michael Margolis	Want to create devices that interact with the physical world? This cookbook is perfect for anyone who wants to experiment with the popular Arduino microcontroller and programming environment. You’ll find more than 200 tips and techniques for building a variety of objects and prototypes such as toys, detectors, robots, and interactive clothing that can sense and respond to touch, sound, position, heat, and light. You don’t need to have mastered Arduino or programming to get started. Updated for the Arduino 1.0 release, the recipes in this second edition include practical examples and guidance to help you begin, expand, and enhance your projects right away—whether you’re an artist, designer, hobbyist, student, or engineer. Get up to speed on the Arduino board and essential software concepts quickly Learn basic techniques for reading digital and analog signals Use Arduino with a variety of popular input devices and sensors Drive visual displays, generate sound, and control several types of motors Interact with devices that use remote controls, including TVs and appliances Learn techniques for handling time delays and time measurement Apply advanced coding and memory handling techniques	http://books.google.com.br/books/content?id=nxE245VgtsUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449321208	724	2011-12-12	"O'Reilly Media, Inc."	\N	Arduino Cookbook
57	Jez Humble, David Farley	Entregar uma nova versão de software para usuários costuma ser um processo cansativo, arriscado e demorado. Mas por meio da automação dos processos de compilação, implantação e teste, e da colaboração otimizada entre desenvolvedores, testadores e a equipe de operações, times de entrega podem lançar mudanças em questão de horas - algumas vezes, em minutos. \n\nNeste livro, Jez Humble e David Farley apresentam os princípios, as práticas e as técnicas de ponta que tornam possível uma entrega rápida e de alta qualidade, independentemente do tamanho do projeto ou da complexidade de seu código.	http://www.grupoa.com.br/uploads/imagensTitulo/20130814120536_HUMBLE_Entrega_Continua_M.jpg	\N	496	2014	Grupo A	Como Entregar Software De Forma Rápida e Confiável	Entrega Contínua
60	Gregor Hohpe,Bobby Woolf	Utilizing years of practical experience, seasoned experts Gregor Hohpe and Bobby Woolf show how asynchronous messaging has proven to be the best strategy for enterprise integration success. However, building and deploying messaging solutions presents a number of problems for developers. 'Enterprise Integration Patterns' provides an invaluable catalog of sixty-five patterns, with real-world solutions that demonstrate the formidable of messaging and help you to design effective messaging solutions for your enterprise. The authors also include examples covering a variety of different integration technologies, such as JMS, MSMQ, TIBCO ActiveEnterprise, Microsoft BizTalk, SOAP, and XSL. A case study describing a bond trading system illustrates the patterns in practice, and the book offers a look at emerging standards, as well as insights into what the future of enterprise integration might hold.	http://books.google.com.ec/books/content?id=bUlsAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321200686	683	2004-01	Addison-Wesley Professional	Designing, Building, and Deploying Messaging Solutions	Enterprise Integration Patterns
61	Jez Humble,David Farley	The step-by-step guide to going live with new software releases faster - reducing risk and delivering more value sooner! * *Fast, simple, repeatable techniques for deploying working code to production in hours or days, not months! *Crafting custom processes that get developers from idea to value faster than ever. *Best practices for everything from source code control to dependency management and in-production tracing. *Common obstacles to rapid release - and pragmatic solutions. In too many organizations, build, testing, and deployment processes can take six months or more. That's simply far too long for today's businesses. But it doesn't have to be that way. It's possible to deploy working code to production in hours or days after development work is complete - and Go Live presents comprehensive processes and techniques for doing so. Written by two of the world's most experienced software project leaders, this book demonstrates how to dramatically increase speed while reducing risk and improving code quality at the same time. The authors cover all facets of build, testing, and deployment, including: configuration management, source code control, release planning, auditing, compliance, integration, build automation, and more. They introduce a wide range of advanced techniques, including inproduction monitoring and tracing, dependency management, and the effective use of virtualization. For each area, they explain the issues, show how to mitigate the risks, and present best practices. Throughout, Go Live focuses on powerful opportunities for individual improvement, clearly and simply explaining skills and techniques so they can be used every day on real projects. With this book's help, any development organization can move from idea to release faster -- and deliver far more value, far more rapidly.	http://books.google.com.ec/books/content?id=9CAxmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321601919	463	2010	Addison-Wesley Professional	Reliable Software Releases Through Build, Test, and Deployment Automation	Continuous Delivery
62	William Faulkner	Returning home to Jefferson, Mississippi, at the end of the First World War, young Bayard Sartoris grieves the loss of his twin brother, John. Despite the stabilizing influence of his marriage to the lovely Narcissa Benbow, young Bayard’s recklessness grows as the days pass, and hastens the destruction of the Sartoris family, who are still living under the shadow of Bayard’s deceased, heroic great-grandfather. A story of a decaying family confronting the debilitating effects of war, Sartoris is a commentary on social class and family conditions in the post-war world of the American South. William Faulkner’s third novel, Sartoris was published in 1929 and was the first novel he set in fictitious Yoknapatawpha County. It introduces many of the memorable characters found in his later books The Hamlet, The Town and The Mansion, including the Snopes family. HarperPerennial Classics brings great works of literature to life in digital form, upholding the highest standards in ebook production and celebrating reading in all its forms. Look for more titles in the HarperPerennial Classics collection to build your digital library.	http://books.google.com.ec/books/content?id=QBQOqGkW6Y4C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781443421164	320	2013-01-01	Harper Collins	\N	Sartoris
63	Marijn Haverbeke	Provides information and examples on writing JavaScript code, covering such topics as syntax, control, data, regular expressions, and scripting.	http://books.google.com.ec/books/content?id=9U5I_tskq9MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781593272821	224	2011	No Starch Press	A Modern Introduction to Programming	Eloquent JavaScript
64	Tom DeMarco,Timothy R. Lister	The legendary 'anti-Dilbert' book on managing software projects by focusing on people - now fully updated for today's projects and methodologies * *Combines humor and wisdom to deliver timeless, practical advice every software manager and developer can use *Updated and reorganized, with seven brand-new chapters *Now addresses leadership, generational differences, distributed and diverse teams, managing risk, holding effective meetings, and using email the right way For this third edition, the authors have added six new chapters and updated the text throughout, bringing it in line with today's development environments and challenges. For example, the book now discusses pathologies of leadership that hadn't previously been judged to be pathological; an evolving culture of meetings; hybrid teams made up of people from seemingly incompatible generations; and a growing awareness that some of our most common tools are more like anchors than propellers. Anyone who needs to manage a software project or software organization will find invaluable advice throughout the book.	http://books.google.com.ec/books/content?id=DVlsAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321934116	249	2013	Pearson Education	Productive Projects and Teams	Peopleware
65	Kent Beck,Cynthia Andres	An updated look at the roots, philosophies, stories, and myths associated with Extreme Programming (XP).	http://books.google.com.ec/books/content?id=32RGBAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321278654	189	2005	Pearson Education	Embrace Change	Extreme Programming Explained
66	Edward De Bono	A leading authority on lateral thinking streamlines the decision-making process by identifying the central aspects of problem-solving and, by using real-life scenarios, describes how to focus thinking on each aspect individually, then link them into a productive progression.	http://books.google.com.ec/books/content?id=0lNmQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780316177917	207	1985	Back Bay Books	\N	Six Thinking Hats
67	Robert B. Cialdini, PhD	Influence, the classic book on persuasion, explains the psychology of why people say "yes"—and how to apply these understandings. Dr. Robert Cialdini is the seminal expert in the rapidly expanding field of influence and persuasion. His thirty-five years of rigorous, evidence-based research along with a three-year program of study on what moves people to change behavior has resulted in this highly acclaimed book. You'll learn the six universal principles, how to use them to become a skilled persuader—and how to defend yourself against them. Perfect for people in all walks of life, the principles of Influence will move you toward profound personal change and act as a driving force for your success. Some images that appeared in the print edition of this book are unavailable in the electronic edition due to rights reasons.	http://books.google.com.ec/books/content?id=5dfv0HJ1TEoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780061899874	336	2009-06-02	Harper Collins	\N	Influence
68	Carlos de la Torre,Steve Striffler	Encompassing Amazonian rainforests, Andean peaks, coastal lowlands, and the Galápagos Islands, Ecuador’s geography is notably diverse. So too are its history, culture, and politics, all of which are examined from many perspectives in The Ecuador Reader. Spanning the years before the arrival of the Spanish in the early 1500s to the present, this rich anthology addresses colonialism, independence, the nation’s integration into the world economy, and its tumultuous twentieth century. Interspersed among forty-eight written selections are more than three dozen images. The voices and creations of Ecuadorian politicians, writers, artists, scholars, activists, and journalists fill the Reader, from José María Velasco Ibarra, the nation’s ultimate populist and five-time president, to Pancho Jaime, a political satirist; from Julio Jaramillo, a popular twentieth-century singer, to anonymous indigenous women artists who produced ceramics in the 1500s; and from the poems of Afro-Ecuadorians, to the fiction of the vanguardist Pablo Palacio, to a recipe for traditional Quiteño-style shrimp. The Reader includes an interview with Nina Pacari, the first indigenous woman elected to Ecuador’s national assembly, and a reflection on how to balance tourism with the protection of the Galápagos Islands’ magnificent ecosystem. Complementing selections by Ecuadorians, many never published in English, are samples of some of the best writing on Ecuador by outsiders, including an account of how an indigenous group with non-Inca origins came to see themselves as definitively Incan, an exploration of the fascination with the Andes from the 1700s to the present, chronicles of the less-than-exemplary behavior of U.S. corporations in Ecuador, an examination of Ecuadorians’ overseas migration, and a look at the controversy surrounding the selection of the first black Miss Ecuador.	http://books.google.com.ec/books/content?id=exgotgc72V0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780822390114	450	2009-01-01	Duke University Press	History, Culture, Politics	The Ecuador Reader
69	Alan Shalloway,Scott Bain,Ken Pugh,Amir Kolsky	Agile has become today’s dominant software development paradigm, but agile methods remain difficult to measure and improve. Essential Skills for the Agile Developer fills this gap from the bottom up, teaching proven techniques for assessing and optimizing both individual and team agile practices. Written by four principals of Net Objectives—one of the world’s leading agile training and consulting firms—this book reflects their unsurpassed experience helping organizations transition to agile. It focuses on the specific actions and insights that can deliver the greatest design and programming improvements with economical investment. The authors reveal key factors associated with successful agile projects and offer practical ways to measure them. Through actual examples, they address principles, attitudes, habits, technical practices, and design considerations—and above all, show how to bring all these together to deliver higher-value software. Using the authors’ techniques, managers and teams can optimize the whole organization and the whole product across its entire lifecycle. Essential Skills for the Agile Developer shows how to Perform programming by intention Separate use from construction Consider testability before writing code Avoid over- and under-design Succeed with Acceptance Test Driven Development (ATDD) Minimize complexity and rework Use encapsulation more effectively and systematically Know when and how to use inheritance Prepare for change more successfully Perform continuous integration more successfully Master powerful best practices for design and refactoring	http://books.google.com.ec/books/content?id=8l2MkoHr_nYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321700438	272	2011-08-18	Addison-Wesley Professional	A Guide to Better Programming and Design	Essential Skills for the Agile Developer
70	Michael T. Nygard	Provides information on ways to effectively design and release an application.	http://books.google.com.ec/books/content?id=md4uNwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780978739218	350	2007	\N	Design and Deploy Production-ready Software	Release It!
71	Carlos Blé Jurado	"TDD es una técnica de desarrollo que se lleva aplicando durante años con gran éxito en lugares como EEUU y Reino Unido, sin embargo, la ausencia de información en español sobre la misma ha supuesto un freno para su difusión en los países hispano-parlantes... Diseño Ágil con TDD nos enseñará a: Escribir tests que aumenten la fiabilidad del código. Escribir tests de aceptación que nos ayudarán a centrarnos, específicamente, en el problema a resolver. Mejorar nuestros diseños para hacerlos más simples y flexibles. Escribir código fácil de mantener. Con TDD, los test son documentación viva y actualizada de nuestro código, la mejor documentación posible. Encajar TDD dentro del paradigma ágil y relacionarlo con otras técnicas como la integración continua" -- Contracubierta.	http://books.google.com.ec/books/content?id=iuoGAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781445264714	296	2010	Lulu.com	\N	Diseño Ágil con TDD
72	Jhumpa Lahiri	SHORTLISTED FOR THE MAN BOOKER PRIZE 2013. From Subhash's earliest memories, at every point, his brother was there. In the suburban streets of Calcutta where they wandered before dusk and in the hyacinth-strewn ponds where they played for hours on end, Udayan was always in his older brother's sight. So close in age, they were inseparable in childhood and yet, as the years pass - as U.S tanks roll into Vietnam and riots sweep across India - their brotherly bond can do nothing to forestall the tragedy that will upend their lives. Udayan - charismatic and impulsive - finds himself drawn to the Naxalite movement, a rebellion waged to eradicate inequity and poverty. He will give everything, risk all, for what he believes, and in doing so will transform the futures of those dearest to him: his newly married, pregnant wife, his brother and their parents. For all of them, the repercussions of his actions will reverberate across continents and seep through the generations that follow. Epic in its canvas and intimate in its portrayal of lives undone and forged anew, The Lowland is a deeply felt novel of family ties that entangle and fray in ways unforeseen and unrevealed, of ties that ineluctably define who we are. With all the hallmarks of Jhumpa Lahiri's achingly poignant, exquisitely empathetic story-telling, this is her most devastating work of fiction to date.	http://ecx.images-amazon.com/images/I/81MPOK4ypgL.jpg	9781408828113	339	2013	A&C Black	\N	The Lowland
73	Laura Lemay,Charles L. Perkins,Michael Morrison	Presents the basics of object-oriented programming, provides tutorials for Java applets and applications, and details the Java API	images\\no-image.png	9781575211831	1247	1996	Sams	\N	Teach yourself Java in 21 days
74	Noam Chomsky	On Anarchism provides the reasoning behind Noam Chomsky's fearless lifelong questioning of the legitimacy of entrenched power. In these essays, Chomsky redeems one of the most maligned ideologies, anarchism, and places it at the foundation of his political thinking. Chomsky's anarchism is distinctly optimistic and egalitarian. Moreover, it is a living, evolving tradition that is situated in a historical lineage; Chomsky's anarchism emphasizes the power of collective, rather than individualist, action. The collection includes a revealing new introduction by journalist Nathan Schneider, who documented the Occupy movement for Harper's and The Nation, and who places Chomsky's ideas in the contemporary political moment. On Anarchism will be essential reading for a new generation of activists who are at the forefront of a resurgence of interest in anarchism—and for anyone who struggles with what can be done to create a more just world.	http://books.google.com.ec/books/content?id=T3MRBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781595589101	128	2013-11-05	New Press, The	\N	On Anarchism
75	James Dashner	"Thomas y sus amigos descansan después de escapar del Laberinto. Por fin sienten que están a salvo. Pero unos gritos desquiciados los despiertan y los enfrentan a una realidad aún más aterradora que la anterior. Para sobrevivir, deberán emprender una travesía en la que cada desafío los enfrentará a nuevos peligros: calor ardiente, destrucción, un aire irrespirable. Cada paso es una sorpresa en una caminata casi apocalíptica. Lo que quedó del mundo es un páramo, a través del cual deberán peregrinar hacia la esperanza (o quién sabe-- ). Emplazados, perseguidos, rodeados de locura, enfermedad y muerte; amenazados por cuerpos con llagas, devastados por la Llamarada; sin poder confiar en los adultos delirantes, hambrientos y violentos, que los acechan a cada paso. Pero para Thomás lo peor será descubrir que lo poco que él creía auténtico en su nueva vida podría ser también la trampa."-- Back cover.	http://books.google.com.ec/books/content?id=qFoHngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9789876123549	391	2011	Vergara & Riba	prueba de fuego	Maze runner
76	James Dashner	Read the first book in the #1 New York Times bestselling Maze Runner series, perfect for fans of The Hunger Games and Divergent. The Maze Runner, and its sequel The Maze Runner: The Scorch Trials, are now major motion pictures featuring the star of MTV's Teen Wolf, Dylan O’Brien; Kaya Scodelario; Aml Ameen; Will Poulter; and Thomas Brodie-Sangster! Also look for James Dashner’s newest novels, The Eye of Minds and The Rule of Thoughts, the first two books in the Mortality Doctrine series. If you ain’t scared, you ain’t human. When Thomas wakes up in the lift, the only thing he can remember is his name. He’s surrounded by strangers—boys whose memories are also gone. Nice to meet ya, shank. Welcome to the Glade. Outside the towering stone walls that surround the Glade is a limitless, ever-changing maze. It’s the only way out—and no one’s ever made it through alive. Everything is going to change. Then a girl arrives. The first girl ever. And the message she delivers is terrifying. Remember. Survive. Run. Praise for the Maze Runner series: A #1 New York Times Bestselling Series A USA Today Bestseller A Kirkus Reviews Best Teen Book of the Year An ALA-YASLA Best Fiction for Young Adults Book An ALA-YALSA Quick Pick "[A] mysterious survival saga that passionate fans describe as a fusion of Lord of the Flies, The Hunger Games, and Lost."—EW.com “Wonderful action writing—fast-paced…but smart and well observed.”—Newsday “[A] nail-biting must-read.”—Seventeen.com “Breathless, cinematic action.”—Publishers Weekly “Heart pounding to the very last moment.”—Kirkus Reviews “Exclamation-worthy.”—Romantic Times [STAR] “James Dashner’s illuminating prequel [The Kill Order] will thrill fans of this Maze Runner [series] and prove just as exciting for readers new to the series.”—Shelf Awareness, Starred "Take a deep breath before you start any James Dashner book."-Deseret News From the Hardcover edition.	http://books.google.com.ec/books/content?id=6gfDfhmmHxMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780375893773	400	2009-10-06	Delacorte Press	\N	The Maze Runner (Maze Runner, Book One)
88	Santiago Garcés	\N	http://books.google.com.ec/books/content?id=aPYCOwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788430551347	178	2005	SUSAETA	\N	Atlas ilustrado de fotografía digital
78	Joshua Bloch	Are you looking for a deeper understanding of the Java™ programming language so that you can write code that is clearer, more correct, more robust, and more reusable? Look no further! Effective Java™, Second Edition, brings together seventy-eight indispensable programmer’s rules of thumb: working, best-practice solutions for the programming challenges you encounter every day. This highly anticipated new edition of the classic, Jolt Award-winning work has been thoroughly updated to cover Java SE 5 and Java SE 6 features introduced since the first edition. Bloch explores new design patterns and language idioms, showing you how to make the most of features ranging from generics to enums, annotations to autoboxing. Each chapter in the book consists of several “items” presented in the form of a short, standalone essay that provides specific advice, insight into Java platform subtleties, and outstanding code examples. The comprehensive descriptions and explanations for each item illuminate what to do, what not to do, and why. Highlights include: New coverage of generics, enums, annotations, autoboxing, the for-each loop, varargs, concurrency utilities, and much more Updated techniques and best practices on classic topics, including objects, classes, libraries, methods, and serialization How to avoid the traps and pitfalls of commonly misunderstood subtleties of the language Focus on the language and its most fundamental libraries: java.lang, java.util, and, to a lesser extent, java.util.concurrent and java.io Simply put, Effective Java™, Second Edition, presents the most practical, authoritative guidelines available for writing efficient, well-designed programs.	http://books.google.com.ec/books/content?id=YRoNBQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321356680	346	2008-05-28	Fonenix inc		Effective Java, 2nd Edition
79	Ben Fountain	Nineteen-year-old Billy Lynn is home from Iraq. And he's a hero. Billy and the rest of Bravo Company were filmed defeating Iraqi insurgents in a ferocious firefight. Now Bravo's three minutes of extreme bravery is a YouTube sensation and the Bush Administration has sent them on a nationwide Victory Tour. During the final hours of the tour Billy will mix with the rich and powerful, endure the politics and praise of his fellow Americans - and fall in love. He'll face hard truths about life and death, family and friendship, honour and duty. Tomorrow he must go back to war.	http://books.google.com.ec/books/content?id=TT6wuQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780857864529	320	2012	Canongate Books	\N	Billy Lynn's Long Halftime Walk
80	Leonard Richardson,Sam Ruby	Shows how to use the REST architectural style to create web sites that can be used by computers as well as machines, providing basic rules for using REST and real-life examples of such Web services.	http://books.google.com.ec/books/content?id=RQVu5YN59loC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596529260	419	2007-05-08	"O'Reilly Media, Inc."	\N	RESTful Web Services
81	Peter Thiel,Blake Masters	The billionaire Silicon Valley entrepreneur behind such companies as PayPal and Facebook outlines an innovative theory and formula for building the companies of the future by creating and monopolizing new markets instead of competing in old ones. 200,000 first printing.	http://books.google.com.ec/books/content?id=Owc2nQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780804139298	210	2014-09-16	Crown Business	Notes on Startups, Or How to Build the Future	Zero to One
82	Brett King	The first edition of BANK 2.0—#1 on Amazon's bestseller list for banking and finance in the US, UK, Germany, France, and Japan for over 18 months—took the financial world by storm and became synonymous with disruptive customer behaviour, technology shift, and new banking models. In BANK 3.0, Brett King brings the story up to date with the latest trends redefining financial services and payments—from the global scramble for dominance of the mobile wallet and the expectations created by tablet computing to the operationalising of the cloud, the explosion of social media, and the rise of the de-banked consumer, who doesn't need a bank at all. BANK 3.0 shows that the gap between customers and financial services players is rapidly widening, leaving massive opportunities for new, non-bank competitors to totally disrupt the industry. "On the Web and on Mobile, the customer isn't king—he's dictator. Highly impatient, skeptical, cynical. Brett King understands deeply what drives this new hard-nosed customer. Banking professionals would do well to heed his advice." Gerry McGovern, author of Killer Web Content	http://books.google.com.ec/books/content?id=QUAtNQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781118589632	396	2012-12-26	Wiley	Why Banking Is No Longer Somewhere You Go But Something You Do	Bank 3.0
83	Sam Newman	Over the past 10 years, distributed systems have become more fine-grained. From the large multi-million line long monolithic applications, we are now seeing the benefits of smaller self-contained services. Rather than heavy-weight, hard to change Service Oriented Architectures, we are now seeing systems consisting of collaborating microservices. Easier to change, deploy, and if required retire, organizations which are in the right position to take advantage of them are yielding significant benefits.This book takes an holistic view of the things you need to be cognizant of in order to pull this off. It covers just enough understanding of technology, architecture, operations and organization to show you how to move towards finer-grained systems.	http://books.google.com.ec/books/content?id=1uUDoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491950357	259	2015-02-17	Oreilly & Associates Incorporated	\N	Building Microservices
84	Naomi Klein	In this groundbreaking alternative history of the most dominant ideology of our time, Milton Friedman's free-market economic revolution, Naomi Klein challenges the popular myth of this movement's peaceful global victory. From Chile in 1973 to Iraq today, Klein shows how Friedman and his followers have repeatedly harnessed terrible shocks and violence to implement their radical policies. As John Gray wrote in The Guardian, "There are very few books that really help us understand the present. The Shock Doctrine is one of those books."	http://books.google.com.ec/books/content?id=ci8dmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780312427993	720	2008-06-24	Picador	The Rise of Disaster Capitalism	The Shock Doctrine
85	Michael Lopp	The humor and insights in the 2nd Edition of Managing Humans are drawn from Michael Lopp's management experiences at Apple, Netscape, Symantec, and Borland, among others. This book is full of stories based on companies in the Silicon Valley where people have been known to yell at each other and occasionally throw chairs. It is a place full of dysfunctional bright people who are in an incredible hurry to find the next big thing so they can strike it rich and then do it all over again. Among these people are managers, a strange breed of people who, through a mystical organizational ritual, have been given power over the future and bank accounts of many others. Whether you're an aspiring manager, a current manager, or just wondering what the heck a manager does all day, there is a story in this book that will speak to you—and help you survive and prosper amongst the general craziness. Lopp's straight-from-the-hip style is unlike any other writer on management. He pulls no punches and tells stories he probably shouldn't. But they are massively instructive and cut to the heart of the matter whether it's dealing with your boss, handling a slacker, hiring top guns, or seeing a knotty project through to completion. This second editions expands on the management essentials. It will explain why we hate meetings, but must have them, it carefully documents the right way to have a 1-on-1, and it documents the perils of not listening to your team. Writing code is easy. Managing humans is not. You need a book to help you do it, and this is it. What you’ll learn How to lead geeks How to handle conflict How to hire well How to motivate employees How to manage your boss How to say no How to handle stressed people freaking out How to improve your social IQ How to run a meeting well And much more Who this book is for This book is designed for managers and would-be managers staring at the role of a manager wondering why they would ever leave the safe world of bits and bytes for the messy world of managing humans. The book covers handling conflict, managing wildly differing personality types, infusing innovation into insane product schedules, and figuring out how to build a lasting and useful engineering culture. Table of ContentsSection 1: The Management Quiver 1. Don't Be a Prick 2. Managers Are Not Evil 3. The Rands Test 4. How to Run a Meeting 5. The Twinge 6. The Update, The Vent, and the Disaster 7. The Monday Freakout 8. Lost in Translation 9. Agenda Detection 10. Mandate Dissection 11. Information Starvation 12. Subtlety, Subterfuge, and Silence 13. Managementese 14. Fred Hates It 15. DNA 16. An Engineering Mindset 17. Three Superpowers 18. Saying No Part 2: The Process is the Product 19. 1.0 20. How to Start 21. Taking Time to Think 22. The Soak 23. Managing Malcolm Events 24. Capturing Context 25. Trickle Theory 26. When the Sky Falls 27. Hacking is Important Part 3: Versions of You 28. Bored People Quit 29. Bellwethers 30. The Ninety Day Interview 31. Managing Nerds 32. NADD 33. A Nerd in a Cave 34. Meeting Creatures 35. Incrementalists and Completionists 36. Organics and Mechanics 37. Inwards, Outwards, and Holistics 38. Free Electrons 39. Rules for the Reorg 40. An Unexpected Connection 41. Avoiding the Fez 42. A Glimpse and a Hook 43. Nailing the Phone Screen 44. Your Resignation Checklist Glossary	http://books.google.com.ec/books/content?id=-VLNVRTnTF8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781430243144	292	2012-06-27	Apress	Biting and Humorous Tales of a Software Engineering Manager	Managing Humans
86	Howard Zinn	Presents the history of the United States from the point of view of those who were exploited in the name of American progress.	http://books.google.com.ec/books/content?id=3sbVlgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780060838652	729	2005-08-02	Harper Perennial Modern Classics	\N	A People's History of the United States
87	Susan Scott	Shows how to make the most of conversations by communicating clearly and forcefully, offering advice on how to overcome barriers to meaningful conversation, confront tough issues, and leverage new skills for frictionless debate.	http://books.google.com.ec/books/content?id=yOfndmcKSzMC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780425193372	287	2004-01-01	Penguin	Achieving Success at Work & in Life, One Conversation at a Time	Fierce Conversations
89	Eric Evans	Describes ways to incorporate domain modeling into software development.	http://books.google.com.ec/books/content?id=xColAAPGubgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321125217	529	2004	Addison-Wesley Professional	Tackling Complexity in the Heart of Software	Domain-driven Design
90	Vaughn Vernon	“For software developers of all experience levels looking to improve their results, and design and implement domain-driven enterprise applications consistently with the best current state of professional practice, Implementing Domain-Driven Design will impart a treasure trove of knowledge hard won within the DDD and enterprise application architecture communities over the last couple decades.” –Randy Stafford, Architect At-Large, Oracle Coherence Product Development “This book is a must-read for anybody looking to put DDD into practice.” –Udi Dahan, Founder of NServiceBus Implementing Domain-Driven Design presents a top-down approach to understanding domain-driven design (DDD) in a way that fluently connects strategic patterns to fundamental tactical programming tools. Vaughn Vernon couples guided approaches to implementation with modern architectures, highlighting the importance and value of focusing on the business domain while balancing technical considerations. Building on Eric Evans' seminal book, Domain-Driven Design, the author presents practical DDD techniques through examples from familiar domains. Each principle is backed up by realistic Java examples–all applicable to C# developers–and all content is tied together by a single case study: the delivery of a large-scale Scrum-based SaaS system for a multitenant environment. The author takes you far beyond “DDD-lite” approaches that embrace DDD solely as a technical toolset, and shows you how to fully leverage DDD's “strategic design patterns” using Bounded Context, Context Maps, and the Ubiquitous Language. Using these techniques and examples, you can reduce time to market and improve quality, as you build software that is more flexible, more scalable, and more tightly aligned to business goals. Coverage includes Getting started the right way with DDD, so you can rapidly gain value from it Using DDD within diverse architectures, including Hexagonal, SOA, REST, CQRS, Event-Driven, and Fabric/Grid-Based Appropriately designing and applying Entities–and learning when to use Value Objects instead Mastering DDD's powerful new Domain Events technique Designing Repositories for ORM, NoSQL, and other databases	http://books.google.com.ec/books/content?id=aVJsAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321834577	612	2013	Pearson Education	\N	Implementing Domain-Driven Design
91	Robert C. Martin	An extremely pragmatic method for writing better code from the start, and ultimately producing more robust applications.	http://books.google.com.ec/books/content?id=dwSfGQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780132350884	431	2009	Pearson Education	A Handbook of Agile Software Craftsmanship	Clean Code
92	José María Arguedas	La pequeña antología que conforma este volumen tiene un sentido didáctico y no aspira a dar una selección de lo mejor del autor sino a informar sobre su actividad como escritor y etnólogo al servicio de su pueblo y enraizado en su cultura. Está pensada para servir de herramienta a quieres comienzan a penetrar en el mundo de la literatura y quieren profundizar en el aprendizaje de la realidad peruana. Entrega textos completos, atractivos para el lector que comienza a captar con mayor intensidad la vida, tanto en su forma individual como socialmente. Incluye también una bibliografía básica, que será útil para aquellos que deseen ampliar sus lecturas.	http://www.libreriasur.com.pe/foto/muestraPortada.php?id=9789972699375&size=big	\N	100	2011	Horizonte	Agua - Warma Kuyay - Los Escoleros - Oda al jet - ¿Que es el folklore? - No soy un aculturado	Breve Antología Didactica
93	Ana Lucía Herrera Aguirre, Blanca Diego Vicente, et. al	La Universidad Politécnica Salesiana y su Carrera de Comunicación Social apuesta a la constante reflexión académica, al debate conceptual, a la investigación docente y a la generación de conocimientos que permitan a la comunidad universitaria y a la sociedad, transformar pautas culturales que, infortunadamente, reproducen estereotipos aún vigentes en los medios de comunicación y en la cotidianidad. Desde esta perspectiva, somos la primera carrera en el país en contar con la cátedra optativa Comunicación, Género y Derechos Humanos, un espacio para la reflexión en el que los y las futuras profesionales de la comunicación exploran las prácticas patriarcales y machistas que persisten.\n\nConjuntamente con la Corporación Humanas y la Universidad Andina Simón Bolivar, la Carrera de Comunicación Social de la Universidad Politécnica Salesiana, presenta al público en general y entregan a la comunidad académica del país este texto que recoge las reflexiones y aportes de varios especialistas del tema.	http://www.bligoo.com/media/users/21/1064061/images/public/272141/Los_derechos_de_las_mujeres_en_la_mira.jpg?v=1425776140161	\N	151	2014	humanas ecuador	Observatorio de Sentencias Judiciales y de Medios 2013-2014	Los derechos de las mujeres en la mira
94	Jonathan Rasmusson	Looks at the principles of agile software development, covering such topics as project inception, estimation, iteration management, unit testing, refactoring, test-driven development, and continuous integration.	http://books.google.com.ec/books/content?id=KjmXSQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356586	258	2010	\N	How Agile Masters Deliver Great Software	The Agile Samurai
95	Rafa Ku,Marek Rogoziński,Marek Rogozi Ski	A practical tutorial that covers the difficult design, implementation, and management of search solutions.Mastering ElasticSearch is aimed at to intermediate users who want to extend their knowledge about ElasticSearch. The topics that are described in the book are detailed, but we assume that you already know the basics, like the query DSL or data indexing. Advanced users will also find this book useful, as the examples are getting deep into the internals where it is needed.	http://books.google.com.ec/books/content?id=EEBbngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781783281435	386	2013-08	Packt Pub Limited	\N	Mastering ElasticSearch
96	Jeff Knupp	The "Writing Idiomatic Python" book is finally here! Chock full of code samples, you'll learn the "Pythonic" way to accomplish common tasks. Each idiom comes with a detailed description, example code showing the "wrong" way to do it, and code for the idiomatic, "Pythonic" alternative. *This version of the book is for Python 2.7.3+. There is also a Python 3.3+ version available.* "Writing Idiomatic Python" contains the most common and important Python idioms in a format that maximizes identification and understanding. Each idiom is presented as a recommendation to write some commonly used piece of code. It is followed by an explanation of why the idiom is important. It also contains two code samples: the "Harmful" way to write it and the "Idiomatic" way. * The "Harmful" way helps you identify the idiom in your own code. * The "Idiomatic" way shows you how to easily translate that code into idiomatic Python. This book is perfect for you: * If you're coming to Python from another programming language * If you're learning Python as a first programming language * If you're looking to increase the readability, maintainability, and correctness of your Python code What is "Idiomatic" Python? Every programming language has its own idioms. Programming language idioms are nothing more than the generally accepted way of writing a certain piece of code. Consistently writing idiomatic code has a number of important benefits: * Others can read and understand your code easily * Others can maintain and enhance your code with minimal effort * Your code will contain fewer bugs * Your code will teach others to write correct code without any effort on your part	http://ecx.images-amazon.com/images/I/41brHoUIAiL._SX384_BO1,204,203,200_.jpg	\N	80	2015	\N	For Python 2.7.3+	Writing Idiomatic Python
97	Mark Lutz	Updated for both Python 3.4 and 2.7, this convenient pocket guide is the perfect on-the-job quick reference. You’ll find concise, need-to-know information on Python types and statements, special method names, built-in functions and exceptions, commonly used standard library modules, and other prominent Python tools. The handy index lets you pinpoint exactly what you need.\n\nWritten by Mark Lutz—widely recognized as the world’s leading Python trainer—Python Pocket Reference is an ideal companion to O’Reilly’s classic Python tutorials, Learning Python and Programming Python, also written by Mark.\n\nThis fifth edition covers:\n\n    Built-in object types, including numbers, lists, dictionaries, and more\n    Statements and syntax for creating and processing objects\n    Functions and modules for structuring and reusing code\n    Python’s object-oriented programming tools\n    Built-in functions, exceptions, and attributes\n    Special operator overloading methods\n    Widely used standard library modules and extensions\n    Command-line options and development tools\n    Python idioms and hints\n    The Python SQL Database API	data:image/jpeg;base64,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	\N	\N	\N	O'Reilly	Python in your pocket	Python Pocket Reference
98	JOSEPH R. MORGAN	Este guia prático de apoio para o aprendizado do idioma espanhol, contém muitas frases correntes e amplo vocabulário. São mais de 1.200 expressões e frases, além de um vocabulário de mais de 2.000 palavras que vão ajudar o leitor a entender e a se comunicar de forma correta na língua espanhola. Seja no trabalho, no estudo ou em viagem, o 'Guia de Expressões Idiomáticas - Português-Espanhol', do professor Joseph R. Morgan, será um instrumento bastante útil. Ele facilita a comunicação entre as pessoas e auxilia na compreensão dos mais variados tipos de texto. E, ainda tem a facilidade de manuseio e a localização das palavras como outro ponto positivo deste manual.	images\\no-image.png	9788586234613	186	\N	\N	\N	EXPRESSOES IDIOMATICAS PORTUGUES/ESPANHOL
99	Paulo Caroli	Ao trabalhar em um projeto, você não quer desperdiçar tempo, dinheiro, nem esforço construindo um produto que não vai atender às suas expectativas ou de seu cliente. Para isso, é preciso validar as hipóteses de negócio e viabilizar possíveis passos de criação com o time todo.  Neste livro, Paulo Caroli compartilha a receita da técnica Direto ao Ponto: uma sequência de atividades rápidas e efetivas para entender e planejar a criação de produtos enxutos, baseadas no conceito de produto mínimo viável.	http://cdn.shopify.com/s/files/1/0155/7645/products/direto-ao-ponto-featured_large.png?v=1440069044	\N	148	08/2015	Casa do Código	Criando produtos de forma enxuta	Direto ao ponto
100	Apostolos Doxiadis,Christos H. Papadimitriou	Recounts, in graphic novel format, the life of Bertrand Russell, mathematician and philospher, and his life-long struggle to achieve perfect logic and ultimate truth.	http://books.google.com.br/books/content?id=sBpkPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781596914520	347	2009-09-29	Bloomsbury Pub Plc USA	An Epic Search for Truth	Logicomix
101	Firoze Manji,Bill Fletcher Jr	'In this unique collection of essays contemporary thinkers from across Africa and internationally commemorate the anniversary of Amilcar Cabral's assasination. They reflect on the legacy of this extraordinary individual and his relevance to contemporary struggles for self-determination and emancipation."--bookcover.	http://books.google.com.br/books/content?id=mf_cnQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9782869785557	520	2013-10	Codesria Conseil Pour Le Developpement de La Reche	The Legacy of Amilcar Cabral	Claim No Easy Victories
102	Humble, Jez; Farley, Dave	\N	\N	\N	\N	\N	Bookman	Como Entregar Software de Forma Rápida e Confiável	Entrega Contínua
103	Jez Humble,David Farley	Entregar uma nova versão de software para usuários costuma ser um processo cansativo, arriscado e demorado. Mas por meio da automação dos processos de compilação, implantação e teste, e da colaboração otimizada entre desenvolvedores, testadores e a equipe de operações, times de entrega podem lançar mudanças em questão de horas – algumas vezes, em minutos. Neste livro, Jez Humble e David Farley apresentam os princípios, as práticas e as técnicas de ponta que tornam possível uma entrega rápida e de alta qualidade, independentemente do tamanho do projeto ou da complexidade de seu código.	http://books.google.com.br/books/content?id=CB04AgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788582601044	486	2014-01-01	Bookman Editora	Como Entregar Software	Entrega Contínua
104	Bradesco Dental	\N	\N	\N	\N	\N	\N		Manual do Beneficiário Dental
105	Bradesco Saúde	São Paulo Capital e Grande SP	\N	\N	\N	\N	Bradesco Saúde	Seguros de Pequenos Grupos (SPG) - Rede Nacional	Lista de Referência - Bradesco Saúde
106	Bradesco Dental	Sao Paulo	\N	\N	\N	\N	\N	Rede UNNA	Lista de Referência - Bradesco Dental
107	W3C Escritório Brasil	\N	\N	\N	\N	\N	\N	\N	manual dos dados abertos: governo
108	Vários colaboradores	\N	\N	\N	\N	\N	\N	\N	manual dos dados abertos: desenvolvedores
109	Palagummi Sainath	In this thoroughly researched study of the poorest of the poor, we get to see how they manage, what sustains them, and the efforts, often ludicrous, to do something for them.	http://books.google.com.br/books/content?id=lTEsxsIJInsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780140259841	470	1996	Penguin Books India	Stories from India's Poorest Districts	Everybody Loves a Good Drought
110	Doug Stephens	Traditional retail is becoming increasingly volatile and challenged as a business model. Brick-and-mortar has shifted to online, while online is shifting into pop-up storefronts. Virtual stores in subway platforms and airports are offering new levels of convenience for harried commuters. High Street and Main Street are becoming the stuff of nostalgia. The Big Box is losing ground to new models that attract consumers through their most-trusted assistant—the smartphone. What’s next? What’s the future for you—a retailer—who is witnessing a tsunami of change and not knowing if this means grasping ahold of new opportunity or being swept away? The Retail Revival answers these questions by looking into the not-so-distant retail past and by looking forward into a future that will continue to redefine retail and its enormous effect on society and our economies. Massive demographic and economic shifts, as well as historic levels of technological and media disruption, are turning this once predictable industry—where “average” was king—into a sea of turbulent change, leaving consumer behavior permanently altered. Doug Stephens, internationally renowned consumer futurist, examines the key seismic shifts in the market that have even companies like Walmart and Procter & Gamble scrambling to cope, and explores the current and future trends that will completely change the way we shop. The Retail Revival provides no-nonsense clarity on the realities of a completely new retail marketplace— realities that are driving many industry executives to despair. But the future need not be dark. Stephens offers hope and guidance for any businesses eager to capitalize on these historic shifts and thrive. Entertaining and thought-provoking, The Retail Revival makes sense of a brave new era of consumer behavior in which everything we thought we knew about retail is being completely reimagined. Praise for The Retail Revival “It doesn’t matter what type of retail you do—if you sell something, somewhere, you need to read Doug Stephens’ The Retail Revival. Packed with powerful insights on the changing retail environment and what good retailers should be thinking about now, The Retail Revival is easy to read, well-organized and provides essential food for thought.” — Gregg Saretsky, President and CEO, WestJet “This book captures in sharp detail the deep and unprecedented changes driving new consumer behaviors and values. More importantly, it offers clear guidance to brands and retailers seeking to adapt and evolve to meet entirely new market imperatives for success.” —John Gerzema, Author of Spend Shift and The Athena Doctrine “The Retail Revival is a critical read for all marketing professionals who are trying to figure out what’s next in retail… Doug Stephens does a great job of explaining why retail has evolved the way it has, and the book serves as an important, trusted guide to where it’s headed next. ” —Joe Lampertius SVP, Shopper Marketing, Momentum Worldwide and Owner, La Spezia Flavor Market “Doug Stephens has proven his right to the moniker ‘Retail Prophet.’ With careful analysis and ample examples, the author makes a compelling case for retailers to adapt, change and consequently revive their connection with consumers. Stephens presents actionable recommendations with optimism and enthusiasm—just the spoonful of sugar we need to face the necessary changes ahead.” —Kit Yarrow, Ph.D., Consumer Psychologist; Professor, Golden Gate University; Co-Author, Gen BuY: How Tweens, Teens and Twenty-Somethings are Revolutionizing Retail “Doug Stephens doesn’t just tell you why retail is in the doldrums, he tells you why retail is a major signpost for the larger troubles of our culture and provides a compelling, inspiring vision for a future of retail—and business, and society.” —Eric Garland, author of Future Inc.: How Businesses Can Anticipate and Profit from What’s Next	http://books.google.com.br/books/content?id=XyA_TU19g48C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781118489673	250	2013-03-11	John Wiley & Sons	Reimagining Business for the New Age of Consumerism	The Retail Revival
111	Charles Duhigg	Lista dos mais vendidos da Veja Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. Parou de fumar, correu uma maratona e foi promovida. Em um laboratório, neurologistas descobriram que os padrões dentro do cérebro dela – ou seja, seus hábitos – foram modificados de maneira fundamental para que todas essas mudanças ocorressem. Há duas décadas pesquisando ao lado de psicólogos, sociólogos e publicitários, cientistas do cérebro começaram finalmente a entender como os hábitos funcionam – e, mais importante, como podem ser transformados. Com base na leitura de centenas de artigos acadêmicos, entrevistas com mais de trezentos cientistas e executivos, além de pesquisas realizadas em dezenas de empresas, o repórter investigativo do New York Times Charles Duhigg elabora, em O poder do hábito, um argumento animador: a chave para se exercitar regularmente, perder peso, educar bem os filhos, se tornar uma pessoa mais produtiva, criar empresas revolucionárias e ter sucesso é entender como os hábitos funcionam. Transformá-los pode gerar bilhões e significar a diferença entre fracasso e sucesso, vida e morte.	http://books.google.com.br/books/content?id=k0j8IgiMKoMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788539004256	408	2012-10-01	Editora Objetiva	Por que fazemos o que fazemos na vida e nos negócios	O poder do hábito
112	Varios Autores	\N	\N	\N	\N	\N	\N	Histórias de aprendizado e inovação	Antologia Brasil
113	Armando Fox,David A. Patterson	\N	images\\no-image.png	9780984881277	\N	2015-03-01	\N	Uma Abordagem Ágil Usando Computação em Nuvem	Construindo Software como Serviço
114	Daron Acemoğlu,James A. Robinson	An award-winning professor of economics at MIT and a Harvard University political scientist and economist evaluate the reasons that some nations are poor while others succeed, outlining provocative perspectives that support theories about the importance of institutions.	http://books.google.com.br/books/content?id=ErKvvTKBrbYC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780307719218	529	2012	Crown Business	The Origins of Power, Prosperity, and Poverty	Why Nations Fail
115	CLAYTON M. CHRISTENSEN,LAURA PRADES VEIGA	Este livro pretende assumir a posição de que grandes empresas fracassam exatamente porque fazem tudo certo e demonstrar por que boas empresas, mesmo mantendo sua antena competitiva ligada, ouvindo os clientes e investindo agressivamente em novas tecnologias, perderam sua liderança no mercado quando se confrontaram com mudanças tecnológicas de ruptura e incrementais na estrutura do mercado. Usando as lições de sucesso e fracasso de companhias líderes, 'O Dilema da Inovação' apresenta um conjunto de regras para capitalizar o fenômeno da inovação de ruptura/incremental. Estes princípios visam a determinar quando é certo não ouvir os clientes, quando investir no desenvolvimento de produtos com menor desempenho que prometem margens menores e quando buscar mercados menores às custas daqueles aparentemente maiores e mais lucrativos.	images\\no-image.png	9788576801283	304	\N	\N	\N	O DILEMA DA INOVAÇAO
116	ROBERT C. MARTIN	Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Perdem-se a cada ano horas incontáveis e recursos importantes devido a um código mal escrito. O especialista em software, Robert C. Martin, apresenta um paradigma com 'Código limpo - Habilidades Práticas do Agile Software.' O leitor poderá aprender a ler códigos e descobrir o que está correto e errado neles. 'Código limpo' está divido em três partes. Na primeira há diversos capítulos que descrevem os princípios, padrões e práticas para criar um código limpo. A segunda parte consiste em diversos casos de estudo de complexidade cada vez maior. Cada um é um exercício para limpar um código - transformar o código base que possui alguns problemas em melhores e mais eficientes. A terceira parte é a compensação - um único capítulo com uma lista de heurísticas e 'odores' reunidos durante a criação dos estudos de caso.	images\\no-image.png	9788576082675	440	\N	\N	\N	CODIGO LIMPO
117	Jez Humble,David Farley	Winner of the 2011 Jolt Excellence Award! Getting software released to users is often a painful, risky, and time-consuming process. This groundbreaking new book sets out the principles and technical practices that enable rapid, incremental delivery of high quality, valuable new functionality to users. Through automation of the build, deployment, and testing process, and improved collaboration between developers, testers, and operations, delivery teams can get changes released in a matter of hours— sometimes even minutes–no matter what the size of a project or the complexity of its code base. Jez Humble and David Farley begin by presenting the foundations of a rapid, reliable, low-risk delivery process. Next, they introduce the “deployment pipeline,” an automated process for managing all changes, from check-in to release. Finally, they discuss the “ecosystem” needed to support continuous delivery, from infrastructure, data and configuration management to governance. The authors introduce state-of-the-art techniques, including automated infrastructure management and data migration, and the use of virtualization. For each, they review key issues, identify best practices, and demonstrate how to mitigate risks. Coverage includes • Automating all facets of building, integrating, testing, and deploying software • Implementing deployment pipelines at team and organizational levels • Improving collaboration between developers, testers, and operations • Developing features incrementally on large and distributed teams • Implementing an effective configuration management strategy • Automating acceptance testing, from analysis to implementation • Testing capacity and other non-functional requirements • Implementing continuous deployment and zero-downtime releases • Managing infrastructure, data, components and dependencies • Navigating risk management, compliance, and auditing Whether you’re a developer, systems administrator, tester, or manager, this book will help your organization move from idea to release faster than ever—so you can deliver value to your business rapidly and reliably.	http://books.google.com.br/books/content?id=6ADDuzere-YC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321670229	512	2010-07-27	Pearson Education	Reliable Software Releases through Build, Test, and Deployment Automation (Adobe Reader)	Continuous Delivery
118	Roy Singham,Martin Fowler,Rebecca J. Parsons,Neal Ford,Jeff Bay	ThoughtWorks is a well-known global consulting firm; ThoughtWorkers are leaders in areas of design, architecture, SOA, testing, and agile methodologies. This collection of essays brings together contributions from well-known ThoughtWorkers such as Martin Fowler, along with other authors you may not know yet. While ThoughtWorks is perhaps best known for their work in the Agile community, this anthology confronts issues throughout the software development life cycle. From technology issues that transcend methodology, to issues of realizing business value from applications, you'll find it here.	http://books.google.com.br/books/content?id=o4FXLgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356142	223	2008	\N	Essays on Software Technology and Innovation	The Thoughtworks Anthology
119	Jason Fried,David Heinemeier Hansson	"Jason Fried and David Heinemeier Hansson, co-founders of software company 37signals, follow a simpler-is-better philosophy. This extends from writing software used in microblogging phenomenon Twitter - to building a business and managing a career. he company has a million users and a payroll of eight. Their point of difference is pared down simplicity: they make products that are shockingly easy to use. The advice contained in ReWork aimed at small businesses is equally no-nonsense and inspired: spend less money, hire fewer people, work fewer hours, have fewer meetings, and perhaps most surprisingly offer fewer features. Essentially do less than the competition. hey focus on what really matters. Employees are fresh, energised and forced to avoid distractions. With short, to-the-point chapters, ReWork draws together what 37signals has learned in the trenches while building a hugely successful company that not only has loyal customers, it has raving fans. Inspirational, motivational and simple, ReWork will be the post-recession business book of the year."	http://books.google.com.br/books/content?id=ClszWsFKluoC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780091929787	279	2010	Random House	Change the Way You Work Forever	ReWork
120	Diego Balbino, Paola Prandini	\N	http://2.bp.blogspot.com/-V5KWlBCHNHE/VWyOYSAVGgI/AAAAAAAAAnw/7_ll2bN4E48/s1600/carolinas.jpg	\N	\N	\N	\N	Retratos inspirados em Carolina Maria de Jesus	Carolinas
121	Paulo Caroli (Edição)	\N	https://cdn.shopify.com/s/files/1/0155/7645/products/thoughtworks-antologia-featured_large.png	\N	292	11/2014	Casa do Código	Histórias de aprendizado e inovação	Thoughtworks Antologia Brasil
162	Eric Freeman,Elisabeth Freeman,Andreza Gonçalves,Marcelo Soares,Pedro Cesar de Conti	Esta obra tem o intuito de apresentar padrões de projetos, procurando responder a perguntar como - quais são os padrões que realmente importam; quando e por que devem ser usados; como aplicá-los em seus próprios projetos; quando não usá-los (como evitar a febre dos padrões); quais são os princípios de design da programação orientada a objetos em que os padrões se baseiam.	http://ecx.images-amazon.com/images/I/51-UxkpndnL._SX367_BO1,204,203,200_.jpg	9788576081746	478	2009	\N	padrões e projetos	Use a cabeça
290	Ali Abunimah	Ali Abunimah provides an effective strategy for advancing the struggle for a just, single-state solution in Palestine.	http://books.google.com.ec/books/content?id=w0kaBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781608463244	224	2014-03-25	Haymarket Books	\N	The Battle for Justice in Palestine
122	ROBERT C. MARTIN	Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Perdem-se a cada ano horas incontáveis e recursos importantes devido a um código mal escrito. O especialista em software, Robert C. Martin, apresenta um paradigma com 'Código limpo - Habilidades Práticas do Agile Software.' O leitor poderá aprender a ler códigos e descobrir o que está correto e errado neles. 'Código limpo' está divido em três partes. Na primeira há diversos capítulos que descrevem os princípios, padrões e práticas para criar um código limpo. A segunda parte consiste em diversos casos de estudo de complexidade cada vez maior. Cada um é um exercício para limpar um código - transformar o código base que possui alguns problemas em melhores e mais eficientes. A terceira parte é a compensação - um único capítulo com uma lista de heurísticas e 'odores' reunidos durante a criação dos estudos de caso.	http://www.altabooks.com.br/images/product/15/3D_Codigo_Limpo.jpg	\N	440	\N	alta books	Habilidades Práticas do Ágile Software	CODIGO LIMPO
123	Armando Fox,David A. Patterson	\N	http://ecx.images-amazon.com/images/I/51gmK4Or%2BrL._SX258_BO1,204,203,200_.jpg	\N	\N	2015-03-01	\N	Uma Abordagem Ágil Usando Computação em Nuvem	Construindo Software como Serviço
124	Vários colaboradores	\N	http://www.w3c.br/pub/Noticias/W3CBrasilLancaManualDadosAbertosDesenvolvedores/manualDadosAbertosDesen.png	\N	\N	\N	\N	\N	manual dos dados abertos: desenvolvedores
125	Vários autores	\N	https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Manual_Dados_Abertos.pdf/page1-422px-Manual_Dados_Abertos.pdf.jpg	\N	\N	\N	\N	\N	manual dos dados abertos: governo
126	CLAYTON M. CHRISTENSEN,LAURA PRADES VEIGA	Este livro pretende assumir a posição de que grandes empresas fracassam exatamente porque fazem tudo certo e demonstrar por que boas empresas, mesmo mantendo sua antena competitiva ligada, ouvindo os clientes e investindo agressivamente em novas tecnologias, perderam sua liderança no mercado quando se confrontaram com mudanças tecnológicas de ruptura e incrementais na estrutura do mercado. Usando as lições de sucesso e fracasso de companhias líderes, 'O Dilema da Inovação' apresenta um conjunto de regras para capitalizar o fenômeno da inovação de ruptura/incremental. Estes princípios visam a determinar quando é certo não ouvir os clientes, quando investir no desenvolvimento de produtos com menor desempenho que prometem margens menores e quando buscar mercados menores às custas daqueles aparentemente maiores e mais lucrativos.	http://ecx.images-amazon.com/images/I/41NrTb9UliL._SX322_BO1,204,203,200_.jpg	\N	304	\N	\N	\N	O DILEMA DA INOVAÇAO
127	Robert B. Cialdini PhD	Influence, the classic book on persuasion, explains the psychology of why people say "yes"—and how to apply these understandings. Dr. Robert Cialdini is the seminal expert in the rapidly expanding field of influence and persuasion. His thirty-five years of rigorous, evidence-based research along with a three-year program of study on what moves people to change behavior has resulted in this highly acclaimed book.\n\nYou'll learn the six universal principles, how to use them to become a skilled persuader—and how to defend yourself against them. Perfect for people in all walks of life, the principles of Influence will move you toward profound personal change and act as a driving force for your success.	http://d1b14unh5d6w7g.cloudfront.net/0688128165.01.S001.LXXXXXXX.jpg?Expires=1445968663&Signature=B0H+au9A5SB/SBiDQTkt3SMYbeBsovrbEhErG9mq4Rr7aM4zD7Supr/crrO7Bg1MkBmxQTJL8uTlfKZUJMtu7gvG9GX4TtaJByLutKkgzE8zqnHUYeRb/fWLdWKIZ85STr89XeFOD/YjDmpX0fVXzY6ECAkPtvVZK8lYH8V3iRw=&Key-Pair-Id=APKAIUO27P366FGALUMQ	\N	281	June 2, 2009	HarperCollins e-books; Revised edition (May 28, 2009)	The Psychology of Persuasion	Influence
128	Robert B. Cialdini	\N	http://ecx.images-amazon.com/images/I/512-B-1yXuL._SX331_BO1,204,203,200_.jpg	\N	\N	\N	\N	\N	Influence: The Psychology of Persuasion, Revised Edition
129	Daniel O'Malley	\N	http://ecx.images-amazon.com/images/I/81WQ33uXXsL._SL1500_.jpg	\N	497	\N	\N	\N	The Rook
130	Sergios Theodoridis	\N	http://i43.tower.com/images/mm100385619/pattern-recognition-third-edition-sergios-theodoridis-hardcover-cover-art.jpg	\N	\N	\N	\N	\N	Pattern Recognition, Third Edition (Hardcover)
131	Daniel Kahneman	Sinopse\n\nDe forma envolvente, o autor revela quando podemos ou não confiar em nossa intuição!\n\nNesta obra, o autor nos leva a uma viagem pela mente humana e explica as duas formas de pensar: uma é rápida, intuitiva e emocional; a outra, mais lenta, deliberativa e lógica. Kahneman expõe as capacidades extraordinárias - e também os defeitos e vícios do pensamento rápido e revela o peso das impressões intuitivas nas nossas decisões. Comportamentos tais como a aversão à perda, o excesso de confiança no momento de escolhas estratégicas, a dificuldade de prever o que vai nos fazer felizes no futuro e os desafios de identificar corretamente os riscos no trabalho e em casa só podem ser compreendidos se soubermos como as duas formas de pensar moldam nossos julgamentos.	http://img.submarino.com.br/produtos/01/00/item/111458/2/111458225_1GG.jpg	\N	\N	\N	624	\N	Rápido e Devagar: Duas Formas de Pensar
132	Paulo Caroli	\N	http://cdn.shopify.com/s/files/1/0155/7645/products/direto-ao-ponto-featured_large.png?v=1440069044	\N	\N	\N	\N	\N	Direto ao Ponto: Criando produtos de forma enxuta
133	Jez Humble, Joanne Molesky, Barry O'Reilly	\N	http://akamaicovers.oreilly.com/images/0636920030355/cat.gif	\N	\N	\N	\N	\N	Lean Enterprise: How High Performance Organizations Innovate at Scale
134	David Beazley,Brian K. Jones	If you need help writing programs in Python 3, or want to update older Python 2 code, this book is just the ticket. Packed with practical recipes written and tested with Python 3.3, this unique cookbook is for experienced Python programmers who want to focus on modern tools and idioms. Inside, you’ll find complete recipes for more than a dozen topics, covering the core Python language as well as tasks common to a wide variety of application domains. Each recipe contains code samples you can use in your projects right away, along with a discussion about how and why the solution works. Topics include: Data Structures and AlgorithmsStrings and TextNumbers, Dates, and TimesIterators and GeneratorsFiles and I/OData Encoding and ProcessingFunctionsClasses and ObjectsMetaprogrammingModules and PackagesNetwork and Web ProgrammingConcurrencyUtility Scripting and System AdministrationTesting, Debugging, and ExceptionsC Extensions	http://books.google.com.br/books/content?id=6yMNBQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449340377	706	2013-06-01	O'Reilly Media; 3 edition (June 1, 2013)	3rd Edition	Python Cookbook
204	Lynn Beighley	Presents an instructional guide to SQL which uses humor and simple images to cover such topics as the structure of relational databases, simple and complex queries, creating multiple tables, and protecting important table data.	http://books.google.com.ec/books/content?id=ZO6MF9Ja1zoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596526849	571	2007-08-28	"O'Reilly Media, Inc."	Your Brain on SQL -- A Learner's Guide	Head First SQL
291	Osvaldo León	\N	images\\no-image.png	9789978995532	310	2013	\N	movimientos convergentes en comunicación	Democratizar la palabra
135	Lisa Crispin,Janet Gregory	Janet Gregory and Lisa Crispin pioneered the agile testing discipline with their previous work, Agile Testing. Now, in More Agile Testing, they reflect on all they've learned since. They address crucial emerging issues, share evolved agile practices, and cover key issues agile testers have asked to learn more about. Packed with new examples from real teams, this insightful guide offers detailed information about adapting agile testing for your environment; learning from experience and continually improving your test processes; scaling agile testing across teams; and overcoming the pitfalls of automated testing. You'll find brand-new coverage of agile testing for the enterprise, distributed teams, mobile/embedded systems, regulated environments, data warehouse/BI systems, and DevOps practices. You'll come away understanding • How to clarify testing activities within the team • Ways to collaborate with business experts to identify valuable features and deliver the right capabilities • How to design automated tests for superior reliability and easier maintenance • How agile team members can improve and expand their testing skills • How to plan “just enough,” balancing small increments with larger feature sets and the entire system • How to use testing to identify and mitigate risks associated with your current agile processes and to prevent defects • How to address challenges within your product or organizational context • How to perform exploratory testing using “personas” and “tours” • Exploratory testing approaches that engage the whole team, using test charters with session- and thread-based techniques • How to bring new agile testers up to speed quickly–without overwhelming them Janet Gregory is founder of DragonFire Inc., an agile quality process consultancy and training firm. Her passion is helping teams build quality systems. For almost fifteen years, she has worked as a coach and tester, introducing agile practices into companies of all sizes and helping users and testers understand their agile roles. She is a frequent speaker at agile and testing software conferences, and is a major contributor to the agile testing community. Lisa Crispin, an experienced agile testing practitioner and coach, regularly leads conference workshops on agile testing and contributes frequently to agile software publications. She enjoys collaborating as part of an awesome agile team to produce quality software. Since 1982, she has worked in a variety of roles on software teams, in a wide range of industries. She joined her first agile team in 2000 and continually learns from other teams and practitioners.	http://books.google.com.br/books/content?id=AYAhBQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321967053	544	2014-10-06	Pearson Education	Learning Journeys for the Whole Team	More Agile Testing
136	Eric Ries	Outlines a revisionist approach to management while arguing against common perceptions about the inevitability of startup failures, explaining the importance of providing genuinely needed products and services as well as organizing a business that can adapt to continuous customer feedback.	http://books.google.com.br/books/content?id=r9x-OXdzpPcC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780307887894	320	2011	Crown Books	How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses	The Lean Startup
137	Eustáquio Rangel de Oliveira Jr.	Este livro é um guia para o conhecimento e aprendizagem da linguagem Ruby. Contém dicas que ajudarão o leitor a fazer desde simples scripts para rodar em terminais em modo texto até aplicações gráficas multiplataforma com acesso a vários bancos de dados. Dentre os assuntos abordados, destacam-se - criação de scripts; desenvolvimento de aplicações gráficas; acesso a diversos bancos de dados; uso de threads; Ruby na web.	http://books.google.com.br/books/content?id=rimKvq_oOpkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788574522616	235	2006	Brasport	conhecendo a linguagem	Ruby
138	Ari Lerner	Ready to master AngularJS? What if you could master the entire framework - with solid foundations - in less time without beating your head against a wall? Imagine how quickly you could work if you knew the best practices and the best tools? Stop wasting your time searching and have everything you need to be productive in one, well-organized place, with complete examples to get your project up without needing to resort to endless hours of research.	http://books.google.com.br/books/content?id=I7UpnwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780991344604	624	2013-12	Fullstack IO	\N	Ng-Book - the Complete Book on Angularjs
139	Lisa Crispin,Janet Gregory	Get past the myths of testing in agile environments - and implement agile testing the RIGHT way. * * For everyone concerned with agile testing: developers, testers, managers, customers, and other stakeholders. * Covers every key issue: Values, practices, organizational and cultural challenges, collaboration, metrics, infrastructure, documentation, tools, and more. * By two of the world's most experienced agile testing practitioners and consultants. Software testing has always been crucial, but it may be even more crucial in agile environments that rely heavily on repeated iterations of software capable of passing tests. There are, however, many myths associated with testing in agile environments. This book helps agile team members overcome those myths -- and implement testing that truly maximizes software quality and value. Long-time agile testers Lisa Crispin and Janet Gregory offer powerful insights for three large, diverse groups of readers: experienced testers who are new to agile; members of newly-created agile teams who aren't sure how to perform testing or work with testers; and test/QA managers whose development teams are implementing agile. Readers will learn specific agile testing practices and techniques that can mean the difference between success and failure; discover how to transition 'traditional' test teams to agile; and learn how to integrate testers smoothly into agile teams. Drawing on extensive experience, the authors illuminate topics ranging from culture to test planning to automated tools. They cover every form of testing: business-facing tests, technology-facing tests, exploratory tests, context-driven and scenario tests, load, stability, and endurance tests, and more. Using this book's techniques, readers can improve the effectiveness and reduce the risks of any agile project or initiative.	http://books.google.com.br/books/content?id=R2DImAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321534460	533	2009	Pearson Education	A Practical Guide for Testers and Agile Teams	Agile Testing
140	ERIC RIES,CARLOS SZLAK	Eric Ries criou uma abordagem de administração que tem por objetivo transformar a maneira pela qual os novos produtos são criados, desenvolvidos e lançados. 'A Startup Enxuta' procura ensinar empreendedores, administradores e líderes empresariais a serem mais bem-sucedidos na condução de seus negócios sem, contudo, desperdiçar tempo e recursos. Na esteira da economia mundial, a inovação pode ser considerada essencial para estimular o crescimento econômico, e o processo criado em 'A Startup Enxuta' foi desenvolvida para que se possa evitar dinâmicas de atualidade. Eric descreve o plano para que cada um possa executar os princípios fundamentais da startup enxuta em qualquer projeto.	https://skoob.s3.amazonaws.com/livros/233484/A_STARTUP_ENXUTA_1335471114B.jpg	9788581780047	224	2012-04-16	\N	\N	A STARTUP ENXUTA
141	Mike Cohn	Goes beyond the strategy of just enough planning and estimating, and shows readers how to make agile practices truly work organizationally.	http://books.google.com.br/books/content?id=j0eFmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780131479418	330	2006	Prentice-Hall PTR	\N	Agile Estimating and Planning
163	Martin Fowler	Em 'Refatoração', o mentor da tecnologia de objetos Martin Fowler abre novos caminhos, desmitificando práticas importantes e demonstrando como os desenvolvedores de software podem tornar reais os benefícios significativos deste novo processo. O autor demonstra que, com treinamento apropriado, um desenhista de sistemas experiente pode pegar um projeto ruim e retrabalhá-lo num código robusto e bem projetado. Além de discutir as várias técnicas da refatoração, Fowler fornece um catálogo detalhado de mais de 70 refatorações verificadas, com indicadores úteis que ensinam quando aplicá-las; instruções passo a passo para aplicar cada refatoração e um exemplo que mostra como a refatoração funciona. Os exemplos ilustrativos estão escritos em Java, mas as idéias são aplicáveis a qualquer linguagem orientada a objetos.	http://books.google.com.br/books/content?id=zPdb4QJKBtkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788536303956	365	2004	Bookman	\N	Refatoração: Aperfeiçoamento e Projeto
292	Osvaldo Cairó,Osvaldo Cairo Battistutti,Silvia Guardati Buemo	\N	images\\no-image.png	9789701002582	423	1993	\N	\N	Estructuras de datos
142	Robert C. Martin	Written by a software developer for software developers, this book is a unique collection of the latest software development methods. The author incudes OOD, UML, Design Patterns, Agile and XP methods with a detailed description of a complete software design for reusable programs in C++ and Java. Using a practical, problem-solving approach, it shows how to develop an object-oriented application -- from the early stages of analysis, through the low-level design and into the implementation. Walks readers through the designer's thoughts — showing the errors, blind alleys, and creative insights that occur throughout the software design process. Covers: Statics and Dynamics; Principles of Class Design; Complexity Management; Principles of Package Design; Analysis and Design; Patterns and Paradigm Crossings. Explains the principles of OOD, one by one, and then demonstrates them with numerous examples, completely worked-through designs, and case studies. Covers traps, pitfalls, and work arounds in the application of C++ and OOD and then shows how Agile methods can be used. Discusses the methods for designing and developing big software in detail. Features a three-chapter, in-depth, single case study of a building security system. For Software Engineers, Programmers, and Analysts who want to understand how to design object oriented software with state of the art methods.	http://books.google.com.br/books/content?id=0HYhAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780135974445	529	2003	Prentice Hall	Principles, Patterns, and Practices	Agile Software Development
143	Sam Ruby,David Thomas,David Heinemeier Hansson	Provides information on creating Web-based applications with Rails 4 and Ruby 2, covering such topics as HTTP authentication, validation and unit testing, cart creation, Ajax, caching, migrations, and plugins.	http://books.google.com.br/books/content?id=ymiqnAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781937785567	434	2013	\N	\N	Agile Web Development with Rails 4
144	Robert C. Martin	Presents practical advice on the disciplines, techniques, tools, and practices of computer programming and how to approach software development with a sense of pride, honor, and self-respect.	http://books.google.com.br/books/content?id=VQlvAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780137081073	210	2011	Pearson Education	A Code of Conduct for Professional Programmers	The Clean Coder
145	Michael Fogus,Chris Houser	Summary The Joy of Clojure, Second Edition is a deep look at the Clojure language. Fully updated for Clojure 1.6, this new edition goes beyond just syntax to show you the "why" of Clojure and how to write fluent Clojure code. You'll learn functional and declarative approaches to programming and will master the techniques that make Clojure so elegant and efficient. Purchase of the print book includes a free eBook in PDF, Kindle, and ePub formats from Manning Publications. About the Technology The Clojure programming language is a dialect of Lisp that runs on the Java Virtual Machine and JavaScript runtimes. It is a functional programming language that offers great performance, expressive power, and stability by design. It gives you built-in concurrency and the predictable precision of immutable and persistent data structures. And it's really, really fast. The instant you see long blocks of Java or Ruby dissolve into a few lines of Clojure, you'll know why the authors of this book call it a "joyful language." It's no wonder that enterprises like Staples are betting their infrastructure on Clojure. About the Book The Joy of Clojure, Second Edition is a deep account of the Clojure language. Fully updated for Clojure 1.6, this new edition goes beyond the syntax to show you how to write fluent Clojure code. You'll learn functional and declarative approaches to programming and will master techniques that make Clojure elegant and efficient. The book shows you how to solve hard problems related to concurrency, interoperability, and performance, and how great it can be to think in the Clojure way. Appropriate for readers with some experience using Clojure or common Lisp. What's Inside Build web apps using ClojureScript Master functional programming techniques Simplify concurrency Covers Clojure 1.6 About the Authors Michael Fogus and Chris Houser are contributors to the Clojure and ClojureScript programming languages and the authors of various Clojure libraries and language features. Table of Contents PART 1 FOUNDATIONS Clojure philosophy Drinking from the Clojure fire hose Dipping your toes in the pool PART 2 DATA TYPES On scalars Collection types PART 3 FUNCTIONAL PROGRAMMING Being lazy and set in your ways Functional programming PART 4 LARGE-SCALE DESIGN Macros Combining data and code Mutation and concurrency Parallelism PART 5 HOST SYMBIOSIS Java.next Why ClojureScript? PART 6 TANGENTIAL CONSIDERATIONS Data-oriented programming Performance Thinking programs Clojure changes the way you think	http://books.google.com.br/books/content?id=sfTXmgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781617291418	477	2013-06-26	Manning Publications	\N	The Joy of Clojure
146	Paul M. Duvall,Steve Matyas,Andrew Glover	Shows how the practice of Continuous Integration (CI) benefits software development by improving quality and reducing risk.	http://books.google.com.br/books/content?id=MA8QmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321336385	283	2007	Addison-Wesley Professional	Improving Software Quality and Reducing Risk	Continuous Integration
147	Chas Emerick,Brian Carper,Christophe Grand	Describes the fundamentals of Clojure, covering such topics as data structures, concurrency, macros, multimethods, JVM, REPL-oriented programming, and relational databases.	http://books.google.com.br/books/content?id=nZTvSa4KqfQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449394707	607	2012-04-12	"O'Reilly Media, Inc."	\N	Clojure Programming
148	Russ Olsen	Presents information on writing Ruby code, covering such topics as control structures, strings, expressions, building methods, classes, and domain specific languages.	http://books.google.com.br/books/content?id=ozhJmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321584106	413	2011	Addison-Wesley Professional	\N	Eloquent Ruby
149	Mark Pilgrim	Provides information on the elements on HTML, offers code examples, and describes how to build accessible markup.	http://books.google.com.br/books/content?id=uuGbAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780596806026	205	2010-08-13	"O'Reilly Media, Inc."	Up and Running	HTML5
150	Alistair Croll,Benjamin Yoskovitz	Offers six sample business models and thirty case studies to help build and monetize a business.	http://books.google.com.br/books/content?id=VJS5qQWOKUIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449335670	409	2013-04-15	"O'Reilly Media, Inc."	Use Data to Build a Better Startup Faster	Lean Analytics
151	Andrew Hunt	Provides information on ways to "refactor" one's brain to develop better cognitive skills.	http://books.google.com.br/books/content?id=Pq3_PAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356050	271	2008	Pragmatic Bookshelf	Refactor Your Wetware	Pragmatic Thinking and Learning
152	Spencer Krum,William Van Hevelingen,Ben Kero,James Turnbull,Jeffrey McCune	Offers information on the installation, use, and development using the configuration managmenet software.	http://books.google.com.br/books/content?id=VfBZAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781430260400	332	2013-12-09	Apress	\N	Pro Puppet
203	Russel Jurney	\N	\N	\N	\N	\N	\N	Building Data Analytics Applications with Hadoop	Agile Data Science
205	Tom White	Counsels programmers and administrators for big and small organizations on how to work with large-scale application datasets using Apache Hadoop, discussing its capacity for storing and processing large amounts of data while demonstrating best practices for building reliable and scalable distributed systems. Original.	http://books.google.com.ec/books/content?id=azmxoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491901632	756	2015-04-10	Oreilly & Associates Incorporated	\N	Hadoop: The Definitive Guide
734	J. R. R. Tolkien	Senhor dos Anéis! Precisa dizer mais alguma coisa?	https://upload.wikimedia.org/wikipedia/pt/thumb/5/56/Asduastorres.jpg/225px-Asduastorres.jpg	\N	\N	2009	Martins Fontes	\N	O Senhor dos Anéis - As Duas Torres
153	James Turnbull	Competent system administrators know their success hinges upon being able to perform often tedious tasks with rigor and punctuality. Such metrics are often achieved only by instituting a considerable degree of automation, something that has become even more crucial as IT environments continue to scale both in terms of size and complexity. One of the most powerful system administration tools to be released is Puppet, a solution capable of automating nearly every aspect of a system administrator’s job, from user management, to software installation, to even configuring server services such as FTP and LDAP. Pulling Strings with Puppet: Configuration Management Made Easy is the first book to introduce the powerful Puppet system administration tool. Author James Turnbull will guide you through Puppet’s key features, showing you how to install and configure the software, create automated Puppet tasks, known as recipes, and even create reporting solutions and extend Puppet further to your own needs. A bonus chapter is included covering the Facter library, which makes it a breeze to automate the retrieval of server configuration details such as IP and MAC addresses. What you’ll learn Properly install and configure Puppet in order to begin immediately maximizing its capabilities Create reporting solutions to more easily monitor automated outcomes Extend Puppet to perform tasks that are capable of suiting your organization’s specific needs Use Facter to query server operating systems for key data such as IP addresses, server names, and MAC addresses Who this book is for Ruby developers and system administrators. Table of Contents Introducing Puppet Installing and Running Puppet Speaking Puppet Using Puppet Reporting on Puppet Advanced Puppet Extending Puppet	http://books.google.com.br/books/content?id=BqThxxKBZt4C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781590599785	192	2008-01-29	Springer	Configuration Management Made Easy	Pulling Strings with Puppet
154	John Resig,Bear Bibeault	In Secrets of the JavaScript Ninja, JavaScript expert John Resig reveals the inside know-how of the elite JavaScript programmers. Written to be accessible to JavaScript developers with intermediate-level skills. This book takes readers on a journey towards mastering modern JavaScript development in three phases: design, construction, and maintenance. It first establishes a base of strong, advanced JavaScript knowledge. The book then teaches readers how to construct a JavaScript library. It examines all the numerous tasks JavaScript libraries have to tackle and provides practical solutions and development strategies. It then presents the various maintenance techniques required to keep their code running well into the future. With Secrets of the JavaScript Ninja readers will gain the knowledge and Ninja-like skills to build their own JavaScript libraries, or to understand how to use any modern JavaScript library available. What's inside: Introduction Testing and debugging Functions Closures Function prototypes Timers Regular expressions With statements Code evaluation Strategies for cross-browser code CSS Selector Engine DOM modification Attributes and CSS Events Ajax Animation Performance	http://books.google.com.br/books/content?id=ab8CPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781933988696	370	2013	Manning Publications	\N	Secrets of the JavaScript Ninja
155	Daniel Kahneman	A psychologist draws on years of research to introduce his "machinery of the mind" model on human decision making to reveal the faults and capabilities of intuitive versus logical thinking.	http://books.google.com.br/books/content?id=SHvzzuCnuv8C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780374275631	499	2011-10-25	Macmillan	\N	Thinking, Fast and Slow
156	Kent Beck,Martin Fowler	A guide to XP leads the developer, project manager, and team leader through the software development planning process, offering real world examples and tips for reacting to changing environments quickly and efficiently.	http://books.google.com.br/books/content?id=u13hVoYVZa8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780201710915	139	2001	Addison-Wesley Professional	\N	Planning Extreme Programming
157	Sandi Metz	Take Ruby development to the next level: leverage Ruby's full power to write more maintainable, manageable, and pleasing applications * *Master object-oriented Ruby techniques for building applications that are as easy to maintain and upgrade as they were to write! *Discover concrete solutions for common issues associated with poorly designed, hard-to-change Ruby applications. *Solves painful problems now facing many of the world's 1+ million Ruby developers, including programmers at all levels of experience. Years after the initial release of Ruby on Rails, the chickens are coming home to roost. Suddenly, anyone could write a web application -- and it seems like everyone did. The web is now awash in Ruby applications that were easy to write but are now virtually impossible to change, extend, or grow. This book solves that problem by teaching developers real-world object oriented design techniques specifically focused on Ruby. Writing for more than 1,000,000 Ruby developers at all levels of experience, Sandi Metz shares knowledge and concrete solutions for creating more extensible, more maintainable applications - and for fixing many of the poorly designed applications they must now manage. The first book to focus squarely on object-oriented Ruby application design, Practical Object Oriented Design in Ruby will guide developers to superior outcomes, even if their previous experience has been strictly limited to 'procedural' techniques. Metz distills a lifetime of conversations about object-oriented design and many years of whiteboard drawings into a set of specific Ruby practices and patterns that lead to more manageable and pleasing code. Novice Ruby programmers will find specific 'rules to live by'; intermediate Ruby programmers will find valuable principles they can flexibly interpret and apply; and advanced Ruby programmers will find a common language they can use to lead development and guide their colleagues.	http://books.google.com.br/books/content?id=rk9sAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321721334	247	2012	Pearson Education	An Agile Primer	Practical Object-oriented Design in Ruby
158	James Shore,Shane Warden	For those considering Extreme Programming, this book provides no-nonsense advice on agile planning, development, delivery, and management taken from the authors' many years of experience. While plenty of books address the what and why of agile development, very few offer the information users can apply directly.	http://books.google.com.br/books/content?id=2q6bAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596527679	409	2008-01-21	"O'Reilly Media, Inc."	\N	The Art of Agile Development
159	David Flanagan,Yukihiro Matsumoto	A guide to Ruby programming covers such topics as datatypes and objects, expressions, classes and modules, control structures, and the Ruby platform.	http://books.google.com.br/books/content?id=rbY5mz-_VdQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596516178	429	2008-01-25	"O'Reilly Media, Inc."	\N	The Ruby Programming Language
160	Mike Cohn	"Offers a requirements process that saves time, eliminates rework, and leads directly to better software. A great way to build software that meets users' needs is to begin with 'user stories': simple, clear, brief descriptions of functionality that will be valuable to real users. ... [the author] provides you with a front-to-back blueprint for writing these user stories and weaving them into your development lifecycle. You'll learn what makes a great user story, and what makes a bad one. You'll discover practical ways to gather user stories, even when you can't speak with your users. Then, once you've compiled your user stories, [the author] shows how to organize them, prioritize them, and use them for planning, management, and testing"--Back cover.	http://books.google.com.br/books/content?id=SvIwuX4SVigC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321205681	268	2004	Addison-Wesley Professional	For Agile Software Development	User Stories Applied
161	Gabriella Coleman	Examines the rise of the global collective of hackers, pranksters and tech activists that make up the group known as “Anonymous” who played large roles in the Arab Spring and Occupy Wall Street movements.	http://books.google.com.br/books/content?id=MIjWngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781781685839	452	2014	Verso Books	The Many Faces of Anonymous	Hacker, Hoaxer, Whistleblower, Spy
206	Daniel Blair	\N	\N	\N	\N	\N	\N	Unleash the power of Banana Pi and use it for home automation, games, and various practical applications	Learning Banana Pi
164	MARC NAGER,CLINT NELSEN,FRANCK NOUYRIGAT,GUILHERME SARKIS	Startup Weekend - a organização por trás dos eventos de 54 horas onde desenvolvedores, designers, marqueteiros e entusiastas se reúnem para trocar ideias, formar equipes, construir projetos e criar startups - gerou uma iniciativa global em empreendedorismo. Em um fim de semana, os participantes mergulham de cabeça na cultura empresarial e, em alguns casos, saem com um empreendimento de sucesso nas mãos. Através de uma ênfase em networking baseado em ações, participantes dos eventos Startup Weekend testemunham pessoas botando a mão na massa e experimentam uma forma de baixo risco para construir relacionamentos de negócios. Eles recebem uma educação experiencial com o benefício de contexto, prazos e feedback instantâneo. Este livro contém as melhores práticas, lições aprendidas e exemplos capacitantes extraídos destes eventos para indivíduos e pequenas organizações seguirem à medida que começam negócios. Há conselhos passo a passo para implementação, como - Aprender a ter faro para o talento em 60 segundos; Obter uma cartilha sobre estruturas organizacionais flexíveis; Aprender a produzir um produto, no mínimo, viável, capaz de mover o negócio para o mercado mais rapidamente; Compreender as consequências para o desenvolvimento de uma startup como empreendedores e fundadores e começar a fazer muito mais, ainda mais rápido; Adotar o modelo de negócios startup - aprender, adaptar e permanecer enxuto. Cada uma dessas crenças-chave em destaque foi testada pelo Startup Weekend e produziu resultados eficazes.	http://img.fnac.com.br/Imagens/Produtos/339-629849-0-5-startup-weekend-como-levar-uma-empresa-do-conceito-a-criacao-em-54-horas.jpg	9788576087700	200	\N	\N	DO CONCEITO A CRIAÇAO EM 54 HORAS	STARTUP WEEKEND - COMO LEVAR UMA EMPRESA
165	José Finocchio Junior	Com o objetivo de desafiar visões pré-estabelecidas e colocar em xeque metodologias convencionais sobre o gerenciamento de projetos, José Finocchio Junior apresenta neste livro um modelo totalmente inovador e adaptado à realidade das empresas e até mesmo ao próprio modo de funcionamento da mente humana.O Project Model Canvas não é mais um “novo” jeito de gerenciar projetos com planilhas do Excel ou documentos do Word. Dê adeus a tudo isso! Como o próprio autor afirma, seu modelo é uma adaptação do aclamado método canvas, criado pelos autores Osterwalder e Pigneur para o efetivo controle de seus projetos em apenas uma única folha e um bloquinho de post-it.Contudo, o autor vai além das teorizações ao incluir em seu método conceitos práticos da neurociência para ajudar o leitor a redefinir seu modelo mental, a pensar e a executar um projeto da maneira simples e sem burocracias, como ele realmente deve ser.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4967937&qld=90&l=370&a=-1	\N	\N	2013	Elsevier - Campus	\N	Project Model Canvas - Gerenciamento de Projetos Sem Burocracia
166	Douglas Crockford	\N	http://shop.oreilly.com/product/9780596517748.do	\N	153	May 2008	O'Reilly Media	Unearthing the Excellence in JavaScript	JavaScript: The Good Parts
167	Michael Strauss	"Value Creation in Travel Distribution" provides a comprehensive introduction to the world's most rapidly growing industry. It covers the history of the industry and provides an introduction to the management and operation of its three principal segments: transportation, distribution and technology.In the text, emphasis is placed on introducing concepts about travel as an industry and exposing readers to various industry practices. This book presents an insightful discussion of the travel industry's significant strengths, weaknesses, threats and opportunities. Topics include but are not limited to mobile booking, ancillary revenue, virtual meetings, social-media and location dependent services. It exposes the reader to how current trends in telecommunication, technology, digital media and ecology can influence the travel industry as a whole. The author shows some details of possible future developments, namely evolution and revolution, and draws a final conclusion.	http://books.google.com.br/books/content?id=RAu-cQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780557612468	116	2010-09	Lulu.com	\N	Value Creation in Travel Distribution
168	Steven Haines	First book to address and assess performance of enterprise Java-based applications using the new Java EE 5\n\nPresents Java EE 5 Performance Management as a proven methodology, featuring a set of common problems that have been observed in real-world customer environments\n\nPresents "wait-based" performance tuning methodology, the most efficient Java EE 5 tuning methodology, but one previously neglected in the Java EE 5 space	http://ecx.images-amazon.com/images/I/51sxDTM017L._SX376_BO1,204,203,200_.jpg	\N	424	May 8, 2006	Apress	\N	ProJava EE 5 Performance Management and Optimization
169	Deitel & Deitel	\N	http://ecx.images-amazon.com/images/I/51Yf1z-QlNL._SX373_BO1,204,203,200_.jpg	\N	1130	1998	Prentice Hall	\N	C++ How to Program, Second Edition
170	Brian Goetz,Tim Peierls	Provides information on building concurrent applications using Java.	http://books.google.com.br/books/content?id=6LpQAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321349606	403	2006	Addison-Wesley Professional	\N	Java concurrency in practice
171	Bill Watterson	"Watterson re-created the thoughts and feelings of a six-year-old with uncanny accuracy ... Calvin and Hobbes was, simply, the best comic strip." --Charles Solomon, Los Angeles Times Many moons ago, the magic of Calvin and Hobbes first appeared on the funny pages and the world was introduced to a wondrous pair of friends -- a boy and his tiger, who brought new life to the comics page. To celebrate the tenth anniversary of this distinguished partnership, Bill Watterson prepared this special book, sharing his thoughts on cartooning and creating Calvin and Hobbes, illustrated throughout with favorite black-and-white and color cartoons.	http://books.google.com.br/books/content?id=fwWOngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780836204384	208	1995-09-01	Andrews McMeel Publishing	\N	The Calvin and Hobbes Tenth Anniversary Book
172	Don Tapscott,Anthony D. Williams	Explores the phenomenon of mass collaboration demonstrated by MySpace, Second Life, and the Human Genome Project, sharing success stories and describing how businesses can use such open source strategies effectively.	http://books.google.com.br/books/content?id=-WUhErZgmpoC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781591841388	324	2006	Penguin	How Mass Collaboration Changes Everything	Wikinomics
173	Oscar Pilagallo	Este livro tem por intuito apresentar a história do jornalismo em São Paulo. Pretende abarcar dos primórdios da imprensa no Estado, em 1823, às transformações do início do século XXI, com a expansão da internet. Busca ainda descrever e contextualizar a criação e a trajetória de jornais, revistas e outras plataformas. Tem por objetivo analisar as relações entre jornalismo e poder político no Brasil, a partir da experiência paulista, como a Proclamação da República, o suicídio de Vargas, o golpe de 1964, a redemocratização, a queda de Collor e os governos FHC e Lula.	images\\no-image.png	9788565339018	367	2011-01-01	Traes Estrelas	jornalismo e poder de D. Pedro a Dilma	História da imprensa paulista
207	Jeremy Blum	\N	\N	\N	\N	\N	\N	Tools and Techniques for Engineering Wizardry	Exploring Arduino
174	Gilberto Freyre	Freyre apresenta a importância da casa-grande na formação sociocultural brasileira, assim como a da senzala na complementação da primeira. Além disso, Casa-Grande & Senzala enfatiza a formação da sociedade brasileira no contexto da miscigenação entre os brancos, principalmente portugueses, dos negros das várias nações africanas e dos diferentes indígenas que habitavam o Brasil.\n\nNa opinião de Freyre, a própria arquitetura da casa-grande expressaria o modo de organização social e política do Brasil, o patriarcalismo. Tal estrutura seria capaz de incorporar os vários elementos que comporiam a propriedade fundiária do Brasil Colônia. Do mesmo modo, o patriarca proprietário da terra considerado dono de tudo que nela se encontrasse: escravos, parentes, filhos, esposa, amantes, padres, políticos. Este domínio se estabeleceu incorporando tais elementos e não de excluindo-os. O padrão se expressa na casa-grande que é capaz de abrigar desde escravos até os filhos do patriarca e suas respectivas famílias.\n\nFreyre também desmistifica a noção de determinação racial na formação de um povo, no que dá maior importância àqueles culturais e ambientais. Com isso refuta a ideia de que no Brasil se teria uma raça inferior devido à miscigenação. Antes, aponta para os elementos positivos da formação cultural brasileira oriundos desta miscigenação entre culturas tão distintas.	http://www.institutomillenium.org.br/wp-content/uploads/2009/11/livrograndesenzala.jpg	\N	727	2006	Global Editora	\N	Casa-Grande & Senzala
175	SERGIO GUIMARAES,PAULO FREIRE	No diálogo com Sérgio Guimarães, Paulo Freire recorda a sua vida como educador - os momentos que marcaram a aplicação de seu Método no Recife, no pré-64, a prisão e o exílio. A obra procura revelar o degredo como possibilidade de auto-reflexão, do repensar atitudes e propostas; experiência que ampliou sua concepção do processo pedagógico.	images\\no-image.png	9788577531875	160	\N	\N	NINGUEM FAZ O MUNDO SO	DIALOGANDO COM A PROPRIA HISTORIA
176	Paulo Freire	Escrita quando o autor se encontrava no exílio, a obra reflete a maturação e a autocrítica, sendo o primeiro texto a refletir sobre suas experiências pedagógicas. Paulo Freire não deixa dúvidas quanto à concepção de educação: defende ardorosamente a pedagogia conscientizadora como força de mudança e libertação.	http://www.bestwriting.com.br/imagens/produtos//zoom/ECPDL1653_zoom.JPG	\N	189	Abril/2011	Paz e Terra	\N	Educação como prática da liberdade
177	PAULO FREIRE	Em 'Pedagogia da Esperança', escrito em 1992, Paulo Freire faz uma reflexão sobre 'Pedagogia do Oprimido', publicado em 1968, durante o seu exílio no Chile. Nesse reencontro, analisa suas experiências pedagógicas em quase três décadas nos mais diferentes países. Um relato elaborado com cientificidade, humildade e coerência, que recusa o determinismo e mostra a história humana como um feixe de possibilidades. O livro conta ainda com a colaboração de Ana Maria Araújo Freire, através das notas explicativas, e prefácio de Leonardo Boff.	http://www.piratininga.org.br/images//Lpedagogia_esperanca.jpg	9788577531776	336	\N	\N	\N	PEDAGOGIA DA ESPERANÇA
178	Paulo Freire	Pedagogia do Oprimido é um dos mais conhecidos trabalhos do educador e filósofo brasileiro Paulo Freire. O livro propõe uma pedagogia com uma nova forma de relacionamento entre professor, estudante, e sociedade.\n\nDedicado aos que são referidos como "os oprimidos" e baseado em sua própria experiência ajudando adultos a aprender a ler e escrever, Freire inclui uma detalhada análise de classes marxista em sua exploração da relação entre os que ele chama de "colonizador" e "colonizado." O livro continua popular entre educadores no mundo inteiro e é um dos fundamentos da pedagogia crítica.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=3461626&qld=90&l=370&a=-1	\N	253	Junho/2012	Paz e Terra	\N	Pedagogia do Oprimido
179	Steven D. Levitt,Stephen J. Dubner	Which is more dangerous, a gun or a swimming pool? What do schoolteachers and sumo wrestlers have in common? Why do drug dealers still live with their moms? How much do parents really matter? What kind of impact did Roe v. Wade have on violent crime? These may not sound like typical questions for an economist to ask--but Levitt is not a typical economist. He studies the stuff and riddles of everyday life--from cheating and crime to sports and child rearing--and his conclusions regularly turn the conventional wisdom on its head. The authors show that economics is, at root, the study of incentives--how people get what they want, or need, especially when other people want or need the same thing. In this book, they set out to explore the hidden side of everything. If morality represents how we would like the world to work, then economics represents how it actually does work. -- From publisher description.	http://addicted2success.com/wp-content/uploads/2015/08/Freakonomics.jpg	9780061242700	320	2006	Harper Collins	A Rogue Economist Explores the Hidden Side of Everything	Freakonomics
180	Euclides da Cunha	\N	http://statics.livrariacultura.net.br/products/capas_lg/310/392310.jpg	9788501055910	596	2000	Record	\N	Os sertões
181	ROBERTO POMPEU DE TOLEDO	O leitor é convidado, capítulo a capítulo, a conhecer momentos cruciais da trajetória de São Paulo. O destino da cidade, ao longo dos três primeiros séculos de existência, foi de isolamento e de solidão. Em 1872, quando os primeiros sinais de prosperidade começavam a visitá-la, por obra da riqueza trazida pelo café, ainda assim a população de pouco mais de 30 mil habitantes a situava numa rabeira com relação às demais capitais brasileiras. Em 1890, já tinha dobrado de tamanho. O momento em que finalmente engrena e começa a virar a São Paulo que se conhece é súbito como uma explosão - na passagem do século XIX para o XX, quando se transformou num aglomerado de gente vinda de diferentes partes do mundo.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4051434&qld=90&l=370&a=-1	9788539001033	600	\N	Objetiva	\N	A CAPITAL DA SOLIDAO
182	Darcy Ribeiro	Por que o Brasil ainda não deu certo? Quando chegou ao exílio no Uruguai, em abril de 1964, Darcy Ribeiro queria responder a essa pergunta na forma de um livro-painel sobre a formação do povo brasileiro e sobre as configurações que ele foi tomando ao longo dos séculos. A resposta veio com este que é o seu livro mais ambicioso, fruto de trinta anos de estudo - uma tentativa de tornar compreensível, por meio de uma explanação histórico-antropológica, como os brasileiros se vieram fazendo a si mesmos para serem o que hoje somos. Uma nova Roma, lavada em sangue negro e sangue índio, destinada a criar uma esplêndida civilização, mestiça e tropical.	http://imagens.socialistamorena.com.br/wp-content/uploads/2015/07/opovobrasileiro.jpg	9788535907810	435	2008-05-01	\N	a formação e o sentido do Brasil	O povo brasileiro
183	Laszlo Book	Trata-se de um livro que fala das formas que o Google desenvolveu para gestão de pessoas, principalmente.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9081775&qld=90&l=370&a=-1	\N	342	2015	Sextante	O que o Google faz de diferente para ser uma das empresas mais criativas e bem-sucedidas do mundo	Um novo jeito de trabalhar (Work Rules)
312	Chimamanda Ngozi Adichie	This is the haunting tale of an Africa and an adolescence undergoing tremendous changes, by a young Nigerian writer.	http://books.google.co.za/books/content?id=42V_yQeJsscC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780007189885	324	2005-01	HarperCollins UK	A Novel	Purple Hibiscus
184	Danilo Sato	Entregar software em produção é um processo que tem se tornado cada vez mais difícil no departamento de TI de diversas empresas. Ciclos longos de teste e divisões entre as equipes de desenvolvimento e de operações são alguns\ndos fatores que contribuem para este problema. Mesmo equipes ágeis que produzem software entregável ao final de cada iteração sofrem para chegar em produção quando encontram estas barreiras.\nDevOps é um movimento cultural e profissional que está tentando quebrar essas barreiras. Com o foco em automação, colaboração, compartilhamento de ferramentas e de conhecimento, DevOps está mostrando que desenvolvedores e engenheiros de sistema têm muito o que aprender uns com os outros.\nNeste livro, Danilo Sato mostra como implementar práticas de DevOps e Entrega Contínua para aumentar a frequência de deploys na sua empresa, ao mesmo tempo aumentando a estabilidade e robustez do sistema em produção. Você vai aprender como automatizar o build e deploy de uma aplicação web, como automatizar o gerenciamento da infraestrutura, como monitorar o sistema em produção, como evoluir a arquitetura e migrá-la para a nuvem, além de conhecer diversas ferramentas que você pode aplicar no seu trabalho.	http://cdn.shopify.com/s/files/1/0155/7645/products/devops-featured_large.png?v=1411489207	\N	246	10/2013	Casa do Código	Na prática: entrega de software confiável e automatizada	DevOps
185	Watts S. Humphrey	Leaders of software-development projects face many challenges. First, you must produce a quality product on schedule and on budget. Second, you must foster and encourage a cohesive, motivated, and smoothly operating team. And third, you must maintain a clear and consistent focus on short- and long-term goals, while exemplifying quality standards and showing confidence and enthusiasm for your team and its efforts. Most importantly, as a leader, you need to feel and act responsible for your team and everything that it does.\nAccomplishing all these goals in a way that is rewarding for the leader and the team—while producing the results that management wants—is the motivation behind the Team Software Process (TSP). Developed by renowned quality expert Watts S. Humphrey, TSP is a set of new practices and team concepts that helps developers take the CMM and CMMI Capability Maturity Models to the next level. Not only does TSP help make software more secure, it results in an average production gain of 68 percent per project. Because of their quality, timeliness, and security, TSP-produced products can be ten to hundreds of times better than other hardware or software. \nIn this essential guide to TSP, Humphrey uses his vast industry experience to show leaders precisely how to lead teams of software engineers trained in the Personal Software Process (PSP). He explores all aspects of effective leadership and teamwork, including building the right team for the job, the TSP launch process, following the process to produce a quality product, project reviews, and capitalizing on both the leader's and team's capabilities. Humphrey also illuminates the differences between an ineffective leader and a superb one with the objective of helping you understand, anticipate, and correct the most common leadership failings before they undermine the team.\nAn extensive set of appendices provides additional detail on TSP team roles and shows you how to use an organization's communication and command networks to achieve team objectives.\nWhether you are a new or an experienced team leader, TSP: Leading a Development Team provides invaluable examples, guidelines, and suggestions on how to handle the many issues you and your team face together.	http://ecx.images-amazon.com/images/I/41s7i9R5zVL._SX305_BO1,204,203,200_.jpg	\N	307	September/2005	Adison Wesley	Leading a Development Team	TSP
186	Steve McConnell	Widely considered one of the best practical guides to programming, Steve McConnell’s original CODE COMPLETE has been helping developers write better software for more than a decade. Now this classic book has been fully updated and revised with leading-edge practices—and hundreds of new code samples—illustrating the art and science of software construction. Capturing the body of knowledge available from research, academia, and everyday commercial practice, McConnell synthesizes the most effective techniques and must-know principles into clear, pragmatic guidance. No matter what your experience level, development environment, or project size, this book will inform and stimulate your thinking—and help you build the highest quality code.	http://blogs.msdn.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-17-44-metablogapi/2352.9780735619678f_5F00_6D939405.jpg	\N	960	June 19, 2004	Microsoft Press	A practical handbook of software construction	Code Complete
187	Thomas H. Cormen ... [et al]	Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study. The algorithms are described in English and in a pseudocode designed to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.\n\nThe first edition became a widely used text in universities worldwide as well as the standard reference for professionals. The second edition featured new chapters on the role of algorithms, probabilistic analysis and randomized algorithms, and linear programming. The third edition has been revised and updated throughout. It includes two completely new chapters, on van Emde Boas trees and multithreaded algorithms, substantial additions to the chapter on recurrence (now called “Divide-and-Conquer”), and an appendix on matrices. It features improved treatment of dynamic programming and greedy algorithms and a new notion of edge-based flow in the material on flow networks. Many new exercises and problems have been added for this edition. As of the third edition, this textbook is published exclusively by the MIT Press.	http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-introduction-to-algorithms-sma-5503-fall-2005/6-046jf05.jpg	\N	1180	2005	MIT Press	Second Edition	Introduction to Algorithms
188	Laura Klein	Creating a great user experience doesn’t have to be a lengthy or expensive process. This hands-on book shows you how to use Lean UX techniques to do it faster and smarter. You’ll learn how to tighten the iteration loop, get more customer feedback, reduce the time it takes to get great products to market, and build something your customers will truly love. User Experience expert Laura Klein gets you right to work with specific tips on how to make design and research quick, flexible, and measurable enough to work in a Lean environment. Rather than bog you down with a high-level discussion of Lean UX, UX for Lean Startups offers a series of standalone chapters that let you concentrate on those areas most important to your startup. The advice Laura Klein provides in this book comes from more than 15 years of working with startups and building great user experiences.	http://books.google.com.ec/books/content?id=8vHHMQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449334918	350	2013-04-15	O'Reilly Media, Incorporated	Faster, Smarter User Experience Research and Design	UX for Lean Startups
189	Jon Duckett	Provides information on how to make more interactive, engaging, and usable Web pages with JavaScript and jQuery, covering core programming concepts in both and such techniques as animation, form validation, and interactive galleries.	http://books.google.com.ec/books/content?id=LpctBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781118531648	640	2014-06-30	John Wiley & Sons	Interactive Front-End Web Development	JavaScript and JQuery
190	Martin L. Abbot	\N	\N	\N	584	\N	\N	\N	The Art of Scalability
191	David Scott Bernstein	\N	\N	\N	\N	\N	\N	Nine Practices to Extend the Life (and Value) of your software	Beyond Legacy Code
192	Kerry Patterson,Joseph Grenny,Ron McMillan,Al Switzler	The New York Times and Washington Post bestseller that changed the way millions communicate “[Crucial Conversations] draws our attention to those defining moments that literally shape our lives, our relationships, and our world. . . . This book deserves to take its place as one of the key thought leadership contributions of our time.” —from the Foreword by Stephen R. Covey, author of The 7 Habits of Highly Effective People “The quality of your life comes out of the quality of your dialogues and conversations. Here’s how to instantly uplift your crucial conversations.” —Mark Victor Hansen, cocreator of the #1 New York Times bestselling series Chicken Soup for the Soul® The first edition of Crucial Conversations exploded onto the scene and revolutionized the way millions of people communicate when stakes are high. This new edition gives you the tools to: Prepare for high-stakes situations Transform anger and hurt feelings into powerful dialogue Make it safe to talk about almost anything Be persuasive, not abrasive	http://books.google.com.ec/books/content?id=SDXVHRSFVMoC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780071771320	288	2011-08-19	McGraw Hill Professional	\N	Crucial Conversations Tools for Talking When Stakes Are High, Second Edition
193	Jonas Löwgren	\N	\N	\N	\N	\N	\N	A Design Perspective on Information Technology	Thoughtful Interaction Design
194	Cem Kaner,James Bach,Bret Pettichord	Decades of software testing experience condensed into the most important lessons learned. The world's leading software testing experts lend you their wisdom and years of experience to help you avoid the most common mistakes in testing software. Each lesson is an assertion related to software testing, followed by an explanation or example that shows you the how, when, and why of the testing lesson. More than just tips, tricks, and pitfalls to avoid, Lessons Learned in Software Testing speeds you through the critical testing phase of the software development project without the extensive trial and error it normally takes to do so. The ultimate resource for software testers and developers at every level of expertise, this guidebook features: * Over 200 lessons gleaned from over 30 years of combined testing experience * Tips, tricks, and common pitfalls to avoid by simply reading the book rather than finding out the hard way * Lessons for all key topic areas, including test design, test management, testing strategies, and bug reporting * Explanations and examples of each testing trouble spot help illustrate each lesson's assertion	http://books.google.com.ec/books/content?id=SsYl9RU-zGgC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780471081128	320	2001-12-31	Wiley	A Context-Driven Approach	Lessons Learned in Software Testing
195	Jon Duckett	Presents information on using HTML and CSS to create Web pages, covering such topics as lists, links, images, tables, forms, color, layout, and video and audio.	http://books.google.com.ec/books/content?id=aGjaBTbT0o0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781118008188	512	2011-11-08	John Wiley & Sons	Design and Build Websites	HTML and CSS
196	Jakob Nielsen	Executive Summary. What is usability. Generations of user interfaces. The usability engineering lifecycle. Usability heuristics. Usability testing. Usability assessment methods beyond testing. Interface standards. International user interfaces. Future developments. Exercises. Bibliography. Author index. Subject index.	http://books.google.com.ec/books/content?id=95As2OF67f0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780125184069	362	1994	Morgan Kaufmann	\N	Usability Engineering
197	Ron Jeffries	You need to get value from your software project. You need it "free, now, and perfect." We can't get you there, but we can help you get to "cheaper, sooner, and better." This book leads you from the desire for value down to the specific activities that help good Agile projects deliver better software sooner, and at a lower cost. Using simple sketches and a few words, the author invites you to follow his path of learning and understanding from a half century of software development and from his engagement with Agile methods from their very beginning. The book describes software development, starting from our natural desire to get something of value. Each topic is described with a picture and a few paragraphs. You're invited to think about each topic; to take it in. You'll think about how each step into the process leads to the next. You'll begin to see why Agile methods ask for what they do, and you'll learn why a shallow implementation of Agile can lead to only limited improvement. This is not a detailed map, nor a step-by-step set of instructions for building the perfect project. There is no map or instructions that will do that for you. You need to build your own project, making it a bit more perfect every day. To do that effectively, you need to build up an understanding of the whole process. This book points out the milestones on your journey of understanding the nature of software development done well. It takes you to a location, describes it briefly, and leaves you to explore and fill in your own understanding. What You Need: You'll need your Standard Issue Brain, a bit of curiosity, and a desire to build your own understanding rather than have someone else's detailed ideas poured into your head.	http://books.google.com.ec/books/content?id=qvvsoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781941222379	150	2015-02-25	\N	Keep It Simple, Make It Valuable, Build It Piece by Piece	The Nature of Software Development
198	Dale Carnegie	Provides suggestions for successfully dealing with people both in social and business situations	http://books.google.com.ec/books/content?id=D7TznQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780671027032	260	1998-10-01	Gallery	\N	How to Win Friends and Influence People
199	Michael J. Kavis	\N	\N	\N	\N	\N	\N	Design Decisions for Cloud Computing	Architecting the Cloud
200	Dawn Griffiths	"Head First Statistics" brings a typically difficult subject to life, teaching readers everything they want and need to know about statistics through engaging, interactive, and thought-provoking material, full of puzzles, stories, quizzes, visual aids, and real-world examples.	http://books.google.com.ec/books/content?id=XzVb4Yz6DBcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596527587	677	2008-08-26	O'Reilly Germany	\N	Head First Statistics
201	Jeffrey Liker,Gary L. Convis	From the bestselling author of "The Toyota Way," the missing link to sustainable lean successa four-step leadership model that aligns company culture with lean processes	http://books.google.com.ec/books/content?id=iO9ZF-JyEBEC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780071780780	280	2011-11-07	McGraw Hill Professional	\N	The Toyota Way to Lean Leadership: Achieving and Sustaining Excellence Through Leadership Development
202	Michael Milton	A guide for data managers and analyzers shares guidelines for identifying patterns, predicting future outcomes, and presenting findings to others; drawing on current research in cognitive science and learning theory while covering such additional topics as assessing data quality, handling ambiguous information, and organizing data within market groups. Original.	http://books.google.com.ec/books/content?id=KqSKipJfxMwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596153939	445	2009-07-24	"O'Reilly Media, Inc."	A Learner's Guide to Big Numbers, Statistics, and Good Decisions	Head First Data Analysis
208	A. Rényi	The founder of Hungary's Probability Theory School, A. Rényi made significant contributions to virtually every area of mathematics. This introductory text is the product of his extensive teaching experience and is geared toward readers who wish to learn the basics of probability theory, as well as those who wish to attain a thorough knowledge in the field.\nBased on the author's lectures at the University of Budapest, this text requires no preliminary knowledge of probability theory. Readers should, however, be familiar with other branches of mathematics, including a thorough understanding of the elements of the differential and integral calculus and the theory of real and complex functions. These well-chosen problems and exercises illustrate the algebras of events, discrete random variables, characteristic functions, and limit theorems. The text concludes with an extensive appendix that introduces information theory.	http://ecx.images-amazon.com/images/I/51hmCvQKstL._SX322_BO1,204,203,200_.jpg	\N	666	2007	Dover	\N	Probability Theory
209	Douglas C. Montgomery	Now in its 6th edition, this bestselling professional reference has helped over 100,000 engineers and scientists with the success of their experiments. Douglas Montgomery arms readers with the most effective approach for learning how to design, conduct, and analyze experiments that optimize performance in products and processes. He shows how to use statistically designed experiments to obtain information for characterization and optimization of systems, improve manufacturing processes, and design and develop new processes and products. You will also learn how to evaluate material alternatives in product design, improve the field performance, reliability, and manufacturing aspects of products, and conduct experiments effectively and efficiently. Discover how to improve the quality and efficiency of working systems with this highly-acclaimed book. This 6th Edition: Places a strong focus on the use of the computer, providing output from two software products: Minitab and DesignExpert. Presents timely, new examples as well as expanded coverage on adding runs to a fractional factorial to de-alias effects. Includes detailed discussions on how computers are currently used in the analysis and design of experiments. Offers new material on a number of important topics, including follow-up experimentation and split-plot design. Focuses even more sharply on factorial and fractional factorial design.	http://books.google.com.br/books/content?id=-WyoQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780471487357	660	2004-12-27	Wiley	\N	Design and Analysis of Experiments
210	Carlos Daniel Mimoso Paulino,Maria Antónia Amaral Turkman,Bento Murteira	\N	http://thumbs.buscape.com.br/livros/estatistica-bayesiana-carlos-daniel-paulino-m-antonia-amaral-turkman-bento-murteira-9723110431_200x200-PU758f1403_1.jpg	9789723110432	446	2003	\N	\N	Estatística bayesiana
211	Alan Cooper,Robert Reimann,Dave Cronin	While the ideas and principles in the original book remain as relevant as ever, the examples in "About Face 3" are updated to reflect the evolution of the Web. Interaction Design professionals are constantly seeking to ensure that software and software-enabled products are developed with the end-user's goals in mind, that is, to make them more powerful and enjoyable for people who use them. "About Face 3" ensures that these objectives are met with the utmost ease and efficiency. Alan Cooper (Palo Alto, CA) has spent a decade making high-tech products easier to use and less expensive to build - a practice known as "Interaction Design." Cooper is now the leader in this growing field.	http://books.google.com.br/books/content?id=0gdRAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780470084113	610	2007	Wiley	the essentials of interaction design	About face 3
212	Rúbian Coutinho Corrêa	Esta Cartilha, elaborada pela Comissão Permanente de Promotores da\nViolência Doméstica e Familiar contra a Mulher, é um marco no combate aos\ncrimes previstos na Lei nO 11.340/2006 (Lei Maria da Penha), a iniciativa legislativa\nque se tomou um paradigma mundial na repressão a esse tipo de violência.\nFruto das contribuições dos Ministérios Públicos Estaduais, com a\ncompetente organização da promotora de Justiça Rúbian Corrêa Coutinho, e sob a\ncoordenação da também competente e dedicada promotora de Justiça Lindinalva\nRodrigues Dalla Costa, coordenadora da COPEVID, do CNPG, esta publicação\ntorna-se, desde logo, leitura obrigatória para os membros do Ministério Público,\ndelegados de polícia, operadores do Direito e para as próprias vitimas de violência\ndoméstica.\nMais do que possibilitar o entendimento do problema, esta Cartilha traz\nricas informações para quem busca o auxilio do Estado diante das agressões\nsofridas, além de ser uma importante ferramenta para aqueles que atuam na\npersecução penal contra os autores desse tipo de violência.\nTemos, em suma, uma publicação abrangente, ainda que materialmente\ncompacta, de vários aspectos imprescindiveis para o enfrentamento de um tipo de\ncrime que só recentemente vem merecendo maior atenção em nosso Pais.	\N	\N	86	2011		Uma Construção Coletiva	O Enfrentamento à Violência Doméstica e Familiar Contra a Mulher
213	Luciano Ramalho	A simplicidade de Python permite que você se torne produtivo rapidamente, porém isso muitas vezes significa que você não estará usando tudo que ela tem a oferecer. Com este guia prático, você aprenderá a escrever um código Python eficiente e idiomático aproveitando seus melhores recursos – alguns deles, pouco conhecidos. O autor Luciano Ramalho apresenta os recursos essenciais da linguagem e bibliotecas de Python mostrando como você pode tornar o seu código mais conciso, mais rápido e mais legível ao mesmo tempo. Muitos programadores experientes tentam dobrar o Python para que ele se enquadre em padrões aprendidos com outras linguagens e jamais descobrem os recursos do Python que estão além de sua experiência. Com este livro, esses programadores Python aprenderão a ser totalmente proficientes em Python 3. Este livro inclui: • O modelo de dados do Python: entenda como os métodos especiais são o segredo para o comportamento consistente dos objetos. • Estruturas de dados: tire total proveito dos tipos embutidos e entenda a dualidade entre texto e bytes na era do Unicode. • Funções como objetos: veja as funções Python como objetos de primeira classe e entenda como isso afeta alguns padrões de projeto populares. • Técnicas de orientação a objetos: crie classes após dominar referências, mutabilidade, interfaces, sobrecarga de operadores e herança múltipla. • Controle de fluxo: tire proveito de gerenciadores de contexto, geradores, corrotinas e concorrência com os pacotes concurrent.futures e asyncio. • Metaprogramação: entenda como funcionam propriedades, descritores de atributos, decoradores de classe e metaclasses.	http://books.google.com.br/books/content?id=XqbfCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788575224625	800	2015-11-05	Novatec Editora	Programação clara, concisa e eficaz	Python fluente
233	Terrence Ryan	New technologies are popping up every day. Convincing co-workers to adopt them is the hard part. Adobe software evangelist Ryan breaks down the patterns and types of resistance technologists face in many organizations.	http://books.google.com.br/books/content?id=wdX7RAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356609	136	2010	\N	Why People on Your Team Don't Act on Good Ideas, and how to Convince Them They Should	Driving Technical Change
214	Marcos Brizeno	Desenvolvimento de software é uma profissão muito jovem. Entre meados de 1940 (com o computador de Alan Turing) e a década de 2010, são meros 70 anos de história. Para a humanidade, isso não é nada. A maioria da população ainda viveu boa parte de sua vida sem a influência de um computador no seu dia a dia. Tudo é muito novo e muda muito rápido. Ainda não temos um conhecimento aprofundado e difundido do que dá certo e do que não dá.\n\nPadrões de projeto são uma tentativa de estabelecer uma coletânea destes conhecimentos.\n\nIdealmente, essas coletâneas se tornarão um recurso para programadores identificarem o problema com o qual estão lidando, e aplicarem uma solução que é conhecida e "garantida". Nesse cenário, ainda falta uma coisa para que possamos usar esse conhecimento de forma segura: como caminhar da situação atual até a solução do padrão, sem introduzir problemas.\n\nEste livro apresenta exemplos práticos em Ruby para seguir essa jornada de forma responsável. Marcos Brizeno apresenta claramente todos os passos para refatorar o código sem causar problemas para os testes automatizados (e, portanto, em seu programa), e chegar a uma implementação de um padrão de projeto conhecido.	http://s8.postimg.org/u4a7ffud1/Amazon_Refatoracao_Ruby_large.jpg	\N	\N	\N	Casa do Código	Um guia em Ruby	Refatorando com padrões de projeto
215	John Z. Sonmez	Summary Soft Skills: The software developer's life manual is a unique guide, offering techniques and practices for a more satisfying life as a professional software developer. In it, developer and life coach John Sonmez addresses a wide range of important "soft" topics, from career and productivity to personal finance and investing, and even fitness and relationships, all from a developer-centric viewpoint. Forewords by Robert C. Martin (Uncle Bob) and Scott Hanselman. Purchase of the print book includes a free eBook in PDF, Kindle, and ePub formats from Manning Publications. About the Book For most software developers, coding is the fun part. The hard bits are dealing with clients, peers, and managers, staying productive, achieving financial security, keeping yourself in shape, and finding true love. This book is here to help. Soft Skills: The software developer's life manual is a guide to a well-rounded, satisfying life as a technology professional. In it, developer and life coach John Sonmez offers advice to developers on important "soft" subjects like career and productivity, personal finance and investing, and even fitness and relationships. Arranged as a collection of 71 short chapters, this fun-to-read book invites you to dip in wherever you like. A Taking Action section at the end of each chapter shows you how to get quick results. Soft Skills will help make you a better programmer, a more valuable employee, and a happier, healthier person. What's Inside Boost your career by building a personal brand John's secret ten-step process for learning quickly Fitness advice to turn your geekiness to your advantage Unique strategies for investment and early retirement About the Author John Sonmez is a developer, teacher, and life coach who helps technical professionals boost their careers and live a more fulfilled life. Table of Contents Why this book is unlike any book you've ever read SECTION 1: CAREER Getting started with a "BANG!": Don't do what everyone else does Thinking about the future: What are your goals? People skills: You need them more than you think Hacking the interview Employment options: Enumerate your choices What kind of software developer are you? Not all companies are equal Climbing the corporate ladder Being a professional Freedom: How to quit your job Freelancing: Going out on your own Creating your first product Do you want to start a startup? Working remotely survival strategies Fake it till you make it Resumes are BORING—Let's fix that Don't get religious about technology SECTION 2: MARKETING YOURSELF Marketing basics for code monkeys Building a brand that gets you noticed Creating a wildly successful blog Your primary goal: Add value to others #UsingSocialNetworks Speaking, presenting, and training: Speak geek Writing books and articles that attract a following Don't be afraid to look like an idiot SECTION 3: LEARNING Learning how to learn: How to teach yourself My 10-step process Steps 1-6: Do these once Steps 7-10: Repeat these Looking for mentors: Finding your Yoda Taking on an apprentice: Being Yoda Teaching: Learn you want? Teach you must. Do you need a degree or can you "wing it?" Finding gaps in your knowledge SECTION 4: PRODUCTIVITY It all starts with focus My personal productivity plan Pomodoro Technique My quota system: How I get way more done than I should Holding yourself accountable Multitasking dos and don'ts Burnout: I've got the cure! How you're wasting your time The importance of having a routine Developing habits: Brushing your code Breaking things down: How to eat an elephant The value of hard work and why you keep avoiding it Any action is better than no action SECTION 5: FINANCIAL What are you going to do with your paycheck? How to negotiate your salary Options: Where all the fun is Bits and bytes of real estate investing Do you really understand your retirement plan? The danger of debt: SSDs are expensive Bonus: How I retired at 33 SECTION 6: FITNESS Why you need to hack your health Setting your fitness criteria Thermodynamics, calories, and you Motivation: Getting your butt out of the chair How to gain muscle: Nerds can have bulging biceps How to get hash-table abs Starting RunningProgram.exe Standing desks and other hacks Tech gear for fitness: Geeking out SECTION 7: SPIRIT How the mind influences the body Having the right mental attitude: Rebooting Building a positive self-image: Programming your brain Love and relationships: Computers can't hold your hand My personal success book list Facing failure head-on Parting words	http://books.google.com.ec/books/content?id=aEzVoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781617292392	504	2014-12-29	Manning Publications	The Software Developer's Life Manual	Soft Skills
216	Mike Wilson	Build an application from backend to browser with Node.js, and kick open the doors to real-time event programming. With this hands-on book, you’ll learn how to create a social network application similar to LinkedIn and Facebook, but with a real-time twist. And you’ll build it with just one programming language: JavaScript. If you’re an experienced web developer unfamiliar with JavaScript, the book’s first section introduces you to the project’s core technologies: Node.js, Backbone.js, and the MongoDB data store. You’ll then launch into the project—a highly responsive, highly scalable application—guided by clear explanations and lots of code examples. Learn about key modules in Node.js for building real-time apps Use the Backbone.js framework to write clean browser code, and maintain better data integration with MongoDB Structure project files as a foundation for code that will arrive later Create user accounts and learn how to secure the data Use Backbone.js templates to build the application’s UIs, and integrate access control with Node.js Develop a contact list to help users link to and track other accounts Use Socket.io to create real-time chat functionality Extend your UIs to give users up-to-the-minute information	http://books.google.com.br/books/content?id=FD2ld2178EkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449337391	188	2012-12-24	"O'Reilly Media, Inc."	\N	Building Node Applications with MongoDB and Backbone
217	Brad Green,Shyam Seshadri	Methods for building rich browser-based applications have grown organically over time, leaving JavaScript developers who are new to the process with no structure to follow. This book introduces AngularJS, the open-source JavaScript framework that uses the Model–View–Controller (MVC) pattern to organize your application. Written by two engineers who worked on the AngularJS project at Google, this book shows you how a few conventions can result in dramatically smaller and more expressively and readable code. You’ll learn how easy it is to adopt the "Zen of AngularJS." With AngularJS, you’ll learn how to: Separate responsibilities with MVC for maximum flexibility Use declarative programming for the user interface, and imperative programming for business logic Eliminate the marshalling boilerplate in data binding to make MVC effortless Extend HTML syntax Use dependency injection for refactoring, testability, and designing apps for multiple environments Gain structural support for switching views and deep linking	http://books.google.com.br/books/content?id=-PvAMgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449344856	120	2013-03-15	O'Reilly Media, Incorporated	\N	AngularJS
218	Martin Fowler,Kent Beck	Users can dramatically improve the design, performance, and manageability of object-oriented code without altering its interfaces or behavior. "Refactoring" shows users exactly how to spot the best opportunities for refactoring and exactly how to do it, step by step.	http://books.google.com.br/books/content?id=1MsETFPD3I0C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780201485677	431	1999	Edward Elgar Publishing	Improving the Design of Existing Code	Refactoring
219	W. Richard Stevens	Bestselling UNIX author Stevens offers application and system programmers his professional, experienced-based guidance on using the system call interface with C. Since good examples are the key to a book like this, a simple shell program is developed in the first chapter and then expanded throughout the book to demonstrate the principles.	http://books.google.com.br/books/content?id=ksxQAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780201563177	744	1992-01	Addison-Wesley Professional	\N	Advanced Programming in the UNIX Environment
220	Ramez Elmasri,Shamkant B. Navathe	Reunindo teoria e exemplos práticos com as mais modernas tecnologias, este livro introduz os conceitos fundamentais necessários para projetar, usar e implementar os sistemas de banco de dados e suas aplicações. De fácil compreensão, o texto aborda a modelagem e o projeto de banco de dados, suas linguagens e as funcionalidades dos sistemas de gerenciamento de banco de dados e as técnicas de implementação desses sistemas. Entre as características desta edição - Organização adaptável às necessidades dos estudantes; Abordagem para a modelagem de dados que inclui o modelo ER e a UML; SQL avançada com material sobre técnicas de programação; Exemplos que permitem ao leitor comparar as diferentes abordagens que usam a mesma aplicação; Segurança, bancos de dados móveis, GIS e gerenciamento de dados Genoma; XML e bancos de dados para a Internet; Data mining. 'Sistemas de banco de dados' destina-se a estudantes de graduação, pós-graduação ou a usuários familiarizados com programação e conceitos de estruturação de dados e organização básica de computadores.	http://www.pearsonhighered.com/elmasri_br/images/elmasri_4ed.jpg	9788588639171	724	2005	\N	\N	Sistemas de banco de dados
221	SIMON S. HAYKIN	As redes neurais artificiais têm raízes em disciplinas como neurociência, matemática, estatística, física, ciência da computação e engenharia. Suas aplicações podem ser encontradas em campos tão diversos quanto modelagem, análise de séries temporais, reconhecimento de padrões, processamento de sinais e controle. Este livro fornece as bases para o entendimento das redes neurais, reconhecendo a natureza multidisciplinar do tema. O material é acompanhado de exemplos, experimentos computacionais, problemas no final de cada capítulo e bibliografia. Conta ainda com duas páginas de apoio na Web.	http://books.google.com.br/books/content?id=lBp0X5qfyjUC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788573077186	900	2001	Bookman	\N	Redes Neurais - 2ed.
234	Chancellor Williams	\N	\N	\N	384	\N	\N	Great issues of a race from 4500 B.C. to 2000 A.D.	The Destruction Of Black Civilization
313	尹斌庸,佳岑,欧阳毅	\N	http://books.google.co.za/books/content?id=bveyrQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9787800527104	214	1999	\N	\N	歇后语100
222	Bill Dudney	"The flip–side of Patterns, AntiPatterns provide developers with formal descriptions of common development gaffes that can derail a project along with practical guidelines on how to avoid them. In this book, the authors present dozens of Java AntiPatterns that tackle many of Java′s biggest trouble spots for programming with EJB, JSP, Servlets, and more. Each AntiPattern is documented with real–world examples, code, and refactored (or escape–route) solutions, and the book uses UML (where appropriate) to diagram improved solutions. All code examples from the book are available to the reader on the book′s companion Web site."	http://books.google.com.br/books/content?id=g_F-z16b_o4C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780471146155	602	2003	John Wiley & Sons	\N	J2EE AntiPatterns
223	Myles Downey	"A book about achieving actual results for individuals, teams, and orgnizations"--Back cover.	http://books.google.com.br/books/content?id=zifwAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781587991721	223	2003	Cengage Learning	Lessons from the Coaches' Coach	Effective Coaching
224	Luciano Ramalho	Python’s simplicity lets you become productive quickly, but this often means you aren’t using everything it has to offer. With this hands-on guide, you’ll learn how to write effective, idiomatic Python code by leveraging its best—and possibly most neglected—features. Author Luciano Ramalho takes you through Python’s core language features and libraries, and shows you how to make your code shorter, faster, and more readable at the same time. Many experienced programmers try to bend Python to fit patterns they learned from other languages, and never discover Python features outside of their experience. With this book, those Python programmers will thoroughly learn how to become proficient in Python 3. This book covers: Python data model: understand how special methods are the key to the consistent behavior of objects Data structures: take full advantage of built-in types, and understand the text vs bytes duality in the Unicode age Functions as objects: view Python functions as first-class objects, and understand how this affects popular design patterns Object-oriented idioms: build classes by learning about references, mutability, interfaces, operator overloading, and multiple inheritance Control flow: leverage context managers, generators, coroutines, and concurrency with the concurrent.futures and asyncio packages Metaprogramming: understand how properties, attribute descriptors, class decorators, and metaclasses work	http://books.google.com.br/books/content?id=kgrXoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491946008	770	2015-06-25	O'Reilly Media	\N	Fluent Python
225	André Gravatá e Daniel Ianae	Presente do próprio autor André Gravatá para a Nati Menhem que o doou para o Grupo Educação da ThoughtWorks	\N	\N	192	05/10/2015	Movimento Entusiasmo	\N	Mistérios da Educação
226	Ken Orr	\N	http://www.abebooks.com/servlet/BookDetailsPL?bi=17642207890&searchurl=isbn%3D9780932633026	\N	\N	\N	\N	\N	Becoming a Technical Leader
227	Jeanne Liedtka,Tim Ogilvie	Outlines the popular business trend through which abstract ideas are developed into practical applications for maximum growth, sharing coverage of its mindset, techniques and vocabulary to reveal how design thinking can address a range of problems and become a core component of successful business practice.	http://books.google.com.br/books/content?id=HIxh2_ExnXMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780231158381	227	2011	Columbia University Press	A Design Thinking Tool Kit for Managers	Designing for Growth
228	Roger L. Martin	Most companies today have innovation envy. Many make genuine efforts to be innovative: they spend on R&D, bring in creative designers, hire innovation consultants; but they still get disappointing results. Roger Martin argues that to innovate and win, companies need 'design thinking'.	http://books.google.com.br/books/content?id=CvpAgm8dQQkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781422177808	191	2009-01-01	Harvard Business Press	Why Design Thinking is the Next Competitive Advantage	The Design of Business
229	Jenifer Tidwell	Users demand applications that are well behaved, good-looking, and easy to use. Your clients or managers demand originality and a short time to market. The good news? UI technology has evolved into a set of best practices and reusable ideas for a wide range of interactive applications today. AndDesigning Interfacesis a bestseller because it's one of the few reliable resources available to guide you. This book captures UI best practices as design patterns -- solutions to common design problems, tailored to the situation at hand. The updated edition now includes patterns for mobile apps, social networks, and search interfaces, as well as web applications and desktop software. Each pattern contains examples in full color, and practical advice that you can put to use immediately. Design engaging and usable interfaces with more confidence and less guesswork Learn key design concepts that are often misunderstood, such as affordances, visual hierarchy, navigational distance, and the use of color Get recommendations for using specific UI patterns, along with alternatives, and warnings on when not to use them Learn concrete UI ideas that you can mix and recombine as you see fit Experienced designers can useDesigning Interfacesas a sourcebook of ideas. Novice designers will find a roadmap to the world of interface and interaction design, with enough guidance to start using these patterns right away.	http://books.google.com.br/books/content?id=FLabAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449379704	547	2010-12-22	"O'Reilly Media, Inc."	\N	Designing Interfaces
230	Caio Prado Júnior	'História Econômica do Brasil' procura auxiliar no entendimento das características estruturais da sociedade brasileira, dos dilemas que herdou do passado e dos possíveis caminhos de sua superação.	http://statics.livrariacultura.net.br/products/capas_lg/482/55482.jpg	\N	366	\N	Editora Brasiliense	\N	História Econômica do Brasil
231	Patrick Kua	A book for Tech Leads, from Tech Leads. Discover how more than 35 Tech Leads find the delicate balance between the technical and non-technical worlds. Discover the challenges a Tech Lead faces and how to overcome them. You may be surprised by the lessons they have to share.	http://books.google.com.br/books/content?id=ZlJ3rgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781505817485	282	2015-04-15	CreateSpace	From Novices to Practitioners	Talking with Tech Leads
232	Gayle Laakmann McDowell,Jackie Bavaro	How many pizzas are delivered in Manhattan? How do you design an alarm clock for the blind? What is your favorite piece of software and why? How would you launch a video rental service in India? This book will teach you how to answer these questions and more. Cracking the PM Interview is a comprehensive book about landing a product management role in a startup or bigger tech company. Learn how the ambiguously-named "PM" (product manager / program manager) role varies across companies, what experience you need, how to make your existing experience translate, what a great PM resume and cover letter look like, and finally, how to master the interview: estimation questions, behavioral questions, case questions, product questions, technical questions, and the super important "pitch."	http://books.google.com.br/books/content?id=vFr9nQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780984782819	366	2013-12	\N	How to Land a Project Manager Job in Technology	Cracking the PM Interview
236	Chancellor Williams	The Destruction of Black Civilization took Chancellor Williams sixteen years of research and field study to compile. The book, which was to serve as a reinterpretation of the history of the African race, was intended to be ""a general rebellion against the subtle message from even the most 'liberal' white authors (and their Negro disciples): 'You belong to a race of nobodies. You have no worthwhile history to point to with pride.'"" The book was written at a time when many black students, educators, and scholars were starting to piece together the connection between the way their history was taught and the way they were perceived by others and by themselves. They began to question assumptions made about their history and took it upon themselves to create a new body of historical research. The book is premised on the question: ""If the Blacks were among the very first builders of civilization and their land the birthplace of civilization, what has happened to them that has left them since then, at the bottom of world society, precisely what happened? The Caucasian answer is simple and well-known: The Blacks have always been at the bottom."" Williams instead contends that many elements—nature, imperialism, and stolen legacies— have aided in the destruction of the black civilization. The Destruction of Black Civilization is revelatory and revolutionary because it offers a new approach to the research, teaching, and study of African history by shifting the main focus from the history of Arabs and Europeans in Africa to the Africans themselves, offering instead ""a history of blacks that is a history of blacks. Because only from history can we learn what our strengths were and, especially, in what particular aspect we are weak and vulnerable. Our history can then become at once the foundation and guiding light for united efforts in serious[ly] planning what we should be about now."" It was part of the evolution of the black revolution that took place in the 1970s, as the focus shifted from politics to matters of the mind.	http://ecx.images-amazon.com/images/I/51ot5RqI4PL._SY344_BO1,204,203,200_.jpg	\N	384	\N		Great issues of a race from 4500 B.C. to 2000 A.D.	The Destruction Of Black Civilization
237	Toby Segaran	Provides information on building Web 2.0 applications that have the capability to mine data created by Internet applications.	http://books.google.com.br/books/content?id=uDnNAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780596529321	334	2007-08-16	Tang Kinh Cac	Building Smart Web 2.0 Applications	Programming Collective Intelligence
238	Gojko Adzic	Bridging the Communication Gap is a book about improving communication between customers, business analysts, developers and testers on software projects, especially by using specification by example and agile acceptance testing. These two key emerging software development practices can significantly improve the chances of success of a software project. They ensure that all project participants speak the same language, and build a shared and consistent understanding of the domain. This leads to better specifications, flushes out incorrect assumptions and ensures that functional gaps are discovered before the development starts. With these practices in place you can build software that is genuinely fit for purpose.	http://books.google.com.br/books/content?id=pCcqAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780955683619	284	2009-01	Lulu.com	Specification by Example and Agile Acceptance Testing	Bridging the Communication Gap
239	Marcel Popescu	Test-driven design can be daunting at first. This book presents a moderately complex task - write a program that can read a mathematical expression like 2 + 3 * 5 and return its result. The author explains each step with both tests and production code until the program can handle decimal numbers, multiple levels of parentheses and even symbols (like in x + 3). This is a code-heavy, hands-on book; just reading it without writing the code yourself might not provide the full benefit.	http://ecx.images-amazon.com/images/I/41nfBBhW5cL._SX331_BO1,204,203,200_.jpg	\N	106	2011/10/13	\N	Evaluating an Expression	TDD by example
240	Betty Friedan,Anna Quindlen,Gail Collins	Views the distorted image of women that prevailed from the end of the Second World War through the early sixties and relects upon changes.	http://books.google.com.br/books/content?id=vU-FAAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780393346787	592	2013-09-03	W. W. Norton & Company	\N	The Feminine Mystique (50th Anniversary Edition)
241	Gene Kim,Kevin Behr,George Spafford	Bill is an IT manager at Parts Unlimited. It's Tuesday morning and on his drive into the office, Bill gets a call from the CEO. The company's new IT initiative, code named Phoenix Project, is critical to the future of Parts Unlimited, but the project is massively over budget and very late. The CEO wants Bill to report directly to him and fix the mess in ninety days or else Bill's entire department will be outsourced. With the help of a prospective board member and his mysterious philosophy of The Three Ways, Bill starts to see that IT work has more in common with manufacturing plant work than he ever imagined. With the clock ticking, Bill must organize work flow, streamline interdepartmental communications, and effectively serve the other business functions at Parts Unlimited. In a fast-paced and entertaining style, three luminaries of the DevOps movement deliver a story that anyone who works in IT will recognize. Readers will not only learn how to improve their own IT organizations, they'll never view IT the same way again.	http://books.google.com.br/books/content?id=D_77CAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780988262508	384	2014-10-15	IT Revolution	A Novel About IT, DevOps, and Helping Your Business Win	The Phoenix Project
242	David Allen	Based on the premise that productivity is directly proportional to one's ability to handle tasks in a relaxed manner, the author offers strategies for self-management that minimize stress and enhance one's focus and efficiency. Original.	http://books.google.com.br/books/content?id=yaKUoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780143126560	352	2015-03	Penguin Paperbacks	The Art of Stress-Free Productivity	Getting Things Done
243	Malcolm Gladwell	The Tipping Point is the biography of an idea, and the idea is quite simple: that many of the problems we face - from murder to teenage delinquency to traffic jams - behave like epidemics. They aren't linear phenomena in the sense that they steadily and predictably change according to the level of effort brought to bear against them. They are capable of sudden and dramatic changes in direction. Years of well-intentioned intervention may have no impact at all, yet the right intervention - at just the right time - can start a cascade of change.	http://books.google.com.br/books/content?id=GqepQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780316679077	280	2001	Lb Books	How Little Things Can Make a Big Difference	The Tipping Point
259	Steve Krug	O livro trata sobre a usabilidade na Web com informações e conselhos práticos, tanto para novatos quanto para veteranos. Neste livro, Steve Krug adiciona munição essencial para aqueles cujos chefes, clientes, investidores e gerentes de marketing insistem em fazer a coisa errada. 'Não me Faça Pensar!' abrirá a mente (e a carteira) do chefe para investir em usabilidade na Web.	images\\no-image.png	9788576081180	127	2006	\N	uma abordagem de bom senso à usabilidade na web	Não me faça pensar!
309	Noah J. Goldstein,Steve J. Martin,Robert C. Cialdini	Basado en las investigaciones desarrolladas a lo largo de más de seis décadas en el campo de la psicología de la persuasión,¡Sí! propone 50 prácticos consejos donde la persuasión y la influencia son las claves para conseguir los objetivos. Los autores presentan un abanico de herramientas persuasivas fáciles de implementar, que exigen muy poco esfuerzo o coste adicional, que aportan enormes dividendos y, sobre todo, fundamentales para poder resistirse a las influencias en el proceso de toma de decisiones.	http://books.google.com.ec/books/content?id=3senAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788483560815	256	2007-01	LID Editorial	\N	Si! (Yes!)
244	Chris Anderson	What happens when there is almost unlimited choice? When everything becomes available to everyone? And when the combined value of the millions of items that only sell in small quantities equals or even exceeds the value of a handful of best-sellers? In this ground-breaking book, Chris Anderson shows that the future of business does not lie in hits - the high-volume end of a traditional demand curve - but in what used to be regarded as misses - the endlessly long tail of that same curve. As our world is transformed by the Internet and the near infinite choice it offers consumers, so traditional business models are being overturned and new truths revealed about what consumers want and how they want to get it. Chris Anderson first explored the Long Tail in an article in Wired magazine that has become one of the most influential business essays of our time. Now, in this eagerly anticipated book, he takes a closer look at the new economics of the Internet age, showing where business is going and exploring the huge opportunities that exist: for new producers, new e-tailers, and new tastemakers. He demonstrates how long tail economics apply to industries ranging from the toy business to advertising to kitchen appliances. He sets down the rules for operating in a long tail economy. And he provides a glimpse of a future that's already here.	http://books.google.com.br/books/content?id=gc4e1uC5pScC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781844138517	244	2007	Random House	How Endless Choice is Creating Unlimited Demand	The Long Tail
245	MICHAEL R. LEGAULT	Na era do imediatismo, louvam-se quem toma decisões rápidas, num piscar de olhos. Agir sem pensar, no entanto, tornou-se uma regra perigosa, como mostra Michael R. LeGault nesta obra instigante. Em 'Think! - Por que não tomar decisões num piscar de olhos' o autor afirma a importância da reflexão na tomada de decisões e demonstra o quanto ações impensadas e sem reflexão são maléficas. Ao contrário do que prega Malcom Gladwell em seu Blink, Le Gault defende em Think que não se tomem decisões sem conhecimento factual ou análise crítica.	images\\no-image.png	9788576841692	368	\N	\N	PISCAR DE OLHOS	THINK! - POR QUE NAO TOMAR DECISOES NUM
246	W. Chan Kim,Renée Mauborgne	Apresenta o conceito de oceano azul, o espaço do mercado desconhecido, e esboça suas principais características. Avalia as consequências do lucro e crescimento, e discute porque sua criação é um imperativo crescente para empresas no futuro. Inclui exemplos de empresas da Europa, Ásia e Estados Unidos.	http://books.google.com.br/books/content?id=epSNS14fA4wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788535215243	241	2005	Elsevier Brasil	\N	A Estratégia Do Oceano Azul
247	Paul Butcher	Offers information on how to exploit the parallel architectures in a computer's GPU to improve code performance, scalability, and resilience.	http://books.google.com.br/books/content?id=RgNCngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781937785659	300	2014-07-10	Pragmatic Bookshelf	When Threads Unravel	Seven Concurrency Models in Seven Weeks
248	Don Tapscott,ANTHONY D. WILLIAMS	Today, encyclopedias, jetliners, operating systems, mutual funds, and many other items are being created by teams numbering in the thousands or even millions. While some leaders fear the heaving growth of these massive online communities, 'Wikinomics' proves this fear is folly. Smart firms can harness collective capability and genius to spur innovation, growth, and success. A guide to one of the most profound changes of our time, 'Wikinomics' challenges our most deeply-rooted assumptions about business and will prove indispensable to anyone who wants to understand competitiveness in the twenty- first century.	http://books.google.com.br/books/content?id=IIqtOwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781591842316	\N	2008-01-30	\N	\N	Wikinomics
249	Chip Heath; Dan Heath	\N	\N	\N	322	\N	\N	\N	Made to Stick: Why Some Ideas Survive and Others Die
250	Amy Shuen	With case studies that demonstrate what Web 2.0 is and how it works in different business situations, this book illustrates how todays Web technologies and uses are changing the way companies communicate, interact, and make money.	http://books.google.com.br/books/content?id=u5vZmgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780596529963	243	2008-06-11	"O'Reilly Media, Inc."	A Strategy Guide	Web 2.0
251	CHARLES DUHIGG,RAFAEL MANTOVANI	Segundo o autor, a chave para se exercitar regularmente, perder peso, educar os filhos, tornar-se mais produtivo, criar empresas revolucionárias e alcançar o sucesso é entender como os hábitos funcionam. Ele procura mostrar que, ao dominar esta ciência, todos podem transformar suas empresas e suas vidas.	images\\no-image.png	9788539004119	408	\N	\N	\N	O PODER DO HABITO
252	Asa Briggs,Peter Burke,Maria Carmelita Pádua Dias	Esta obra apresenta uma análise dos meios de comunicação, destacando os contextos sociais e culturais em que emergem e se desenvolvem, além de traçar a história das diferentes mídias e das linguagens que elas criam para a civilização ocidental - da invenção da prensa gráfica à Internet.	https://reticenciajornalistica.files.wordpress.com/2011/09/historia-social-da-midia.jpg	9788571107717	375	2004	\N	de Gutenberg à Internet	Uma história social da mídia
253	Leander Kahney	Neste livro, que pretende ser uma biografia sobre Steve Jobs e, ao mesmo tempo, um guia sobre liderança, o autor busca mostrar os princípios que guiaram Jobs ao lançar produtos, ao atrair compradores e ao administrar a sua empresa.	http://books.google.com.br/books/content?id=70vqOv05j30C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788522009770	263	2008	Agir Editora	\N	A Cabeça de Steves Jobs
254	Jeff Sutherland	Reveals how the software industry's "scrum" management process can be practically applied to other fields to incrementally increase productivity and quality, citing successful examples while outlining key strategies in problem solving and team optimization. 75,000 first printing.	http://books.google.com.br/books/content?id=JySmngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780385346450	248	2014-09-30	Crown Business	The Art of Doing Twice the Work in Half the Time	Scrum
255	Walter Isaacson,STEVE JOBS,Denise Guimarães Bottmann,Berilo Vargas,Pedro Maia Soares	Este livro, baseado em mais de quarenta entrevistas com Steve Jobs - e entrevistas com familiares, amigos, colegas, adversários e concorrentes -, narra a vida deste empresário, cuja paixão pela perfeição e cuja energia contribuíram para seis indústrias - a computação pessoal, o cinema de animação, a música, a telefonia celular, a computação em tablet e a edição digital.	http://ecx.images-amazon.com/images/I/81VStYnDGrL.jpg	9788535919714	607	2011	\N	a biografia	Steve Jobs
256	Pierre Weil	\N	\N	\N	287	\N	\N	\N	O Corpo Fala
257	Jim Sterne; Anthony Piore	\N	\N	\N	300	\N	\N	\N	E-mail Marketing
258	AVINASH KAUSHIK	Escrito por um profissional da área, este livro vai além dos conceitos e das definições para desafiar o pensamento dominante sobre o campo e fornecer um guia prático para implementar uma estratégia web analítica bem-sucedida. Aprenda os prós e os contras	images\\no-image.png	9788576081784	440	\N	\N	\N	WEB ANALITICA
896	Fons J. R. van de Vijver	\N	https://images-na.ssl-images-amazon.com/images/I/41IE4eU62wL._SX327_BO1,204,203,200_.jpg	\N	200	1997	SAGE Publications, Inc	\N	Methods and Data Analysis for Cross-Cultural Research
260	David B. Yoffie,Mary Kwak	A century-old strategy holds the secret to toppling corporate giants. 'In a world where advantage increasingly depends upon movement rather than position, "Judo Strategy" drills home the ultimate principle of strategy: maximize impact while minimizing effort. This is easy to say but difficult to accomplish. The authors provide pragmatic techniques and examples to help make this principle come alive. Don't enter the market without this book' - John Hagel, Author, "Net Gain and Net Worth", and Chief Strategy Officer, 12 Entrepreneuring, Inc. Why do some companies succeed in defeating stronger rivals, while others fail? This is a question that, sooner or later, all ambitious competitors must face.Whether you're a tiny start-up taking on industry giants or a giant moving into markets dominated by powerful incumbents, the basic problem remains the same: How do you compete with opponents who have size, strength, and history on their side? The answer lies in a simple but powerful lesson: Rather than oppose strength to strength, successful challengers use their opponents' size and power to bring them down. This is the message at the heart of "Judo Strategy". Based on extensive research by Harvard Business School professor David Yoffie and research associate Mary Kwak, "Judo Strategy" introduces a groundbreaking approach to competition that shows companies how to win against imposing odds. Using vivid examples from companies ranging from Wal-Mart and Charles Schwab to Juniper Networks and Palm Computing, the authors demonstrate how managers can translate the core principles of judo - a martial art that prizes skill not size - into a winning business strategy.By mastering movement, managers learn to seize the lead and make the most of their initial advantage. By maintaining balance, they can successfully engage with opponents and respond to rivals' attacks. And finally, by exploiting leverage, managers can transform their competitors' strengths into strategic liabilities. This book will help any company - large or small, new or old, virtual or physical - become a more effective competitor. In addition to developing the concept of judo strategy, it presents a defensive primer - in the form of "sumo strategy" - for companies facing judo attacks.Packed with the insights of world-class managers and strategists, "Judo Strategy" does double duty: it can help you become a giant-killer, while also teaching you to protect your hard-fought position from challengers in the wings.		9781578512539	239	2001	Harvard Business Press	Turning Your Competitors' Strength to Your Advantage	Judo Strategy
261	Daniel Domscheit-Berg	Neste livro, Domscheit-Berg procura relatar os bastidores do site WikiLeaks, desde seu primeiro encontro com Assange em 2007. A obra pretende revelar a evolução do site, os aspectos financeiros, as tensões internas da organização, entre outros aspectos. O autor ainda deve contar os motivos que o fizeram acabar com a parceria com Assange.	images\\no-image.png	9788535245462	267	2011	\N	a história do site mais controverso dos últimos tempos escrita pelo seu ex-porta-voz	Os bastidores do WikiLeaks
262	Andy Weir	\N	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=8164096&qld=90&l=370&a=-1	\N	\N	\N	Editora Arqueiro	Uma missão a Marte. Um terrível acidente. A luta de um homem pela sobrevivência	Perdido em Marte
263	Luke Wroblewski	Guide to web design optimized for mobile devices, in order to deliver the mobile web experience users want. Argues companies should create websites and applications for mobile devices first, and for desktops/laptop computers second, if at all.	http://static.lukew.com/gfx-mobilefirst2_2x.png	9781937557027	130	2011	Ingram	\N	Mobile First
264	Addison Wesley	\N	\N	\N	\N	\N	\N	Reliable Software Releases through Build, Test, and Deployment Automation	Continuous Delivery
265	Edgar H. Schein	"With the emphasis on teamwork in contemporary society, Schein's model has the potential to improve the collaborative process. A theoretical book based on Schein's extensive teaching and consulting, this is a useful, important resource. Summing up: essential; four stars." --M. Bonner, University of Maryland University College (Choice)Helping is a fundamental human activity, but it can also be a frustrating one. All too often, to our bewilderment, our sincere offers of help are resented, resisted, or refused -- and we often react the same way when people try to help us. Why is it so difficult to provide or accept help? How can we make the whole process easier? Many different words are used for helping: assisting, aiding, advising, caregiving, coaching, consulting, counseling, guiding, mentoring, supporting, teaching, and many more. In this seminal book on the topic, corporate culture and organizational development guru Ed Schein analyzes the social and psychological dynamics common to all types of helping relationships, explains why help is often not helpful, and shows what any would-be helpers must do to ensure that their assistance is both welcomed and genuinely useful.The moment of asking for and offering help is a delicate and complex one, fraught with inequities and ambiguities. Schein helps us navigate that moment so we avoid potential pitfalls, mitigate power imbalances, and establish a solid foundation of trust. He identifies three roles a helper can play, explaining which one is nearly always the best starting point if we are to provide truly effective help. So that readers can determine exactly what kind of help is needed, he describes an inquiry process that puts the helper and the client on an equal footing, encouraging the client to open up and engage and giving the helper much better information to work with. And he shows how these techniques can be applied to teamwork and to organizational leadership.Illustrated with examples from many types of relationships -- husbands and wives, doctors and patients, consultants and clients -- Helping is a concise, definitive analysis of what it takes to establish successful, mutually satisfying helping relationships.	http://books.google.com.br/books/content?id=-fqLuAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781576758632	167	2009	Berrett-Koehler Pub	How to Offer, Give, and Receive Help	Helping
266	Jurgen Appelo	How software practitioners can become great Agile leaders: simple rules from real-world practice * *Succeed with Agile by mastering eight crucial leadership skills: activating people, empowering teams, aligning results, organizing structure, enforcing discipline, manipulating context, acquiring knowledge, and measuring performance. *Work more effectively with knowledge workers, while managing risk, uncertainty, and change. *The newest book in Mike Cohn's best-selling Signature Series. In Management 3.0, top Agile manager Jurgen Appelo shows managers how to lead Agile adoption and Agile projects more effectively, while also helping their colleagues develop as leaders in Agile environments. Appelo combines the 'what,' 'why,' and 'how' of agile leadership, presenting background, examples, and powerful, proven techniques. Appelo identifies the eight most crucial agile leadership skills, explaining in detail why they matter and how to develop them - both in yourself and in your colleagues. You'll discover powerful ways to activate people, empower teams, align results, organize structure, enforce discipline, manipulate context, acquire knowledge, and measure performance. Management 3.0 will help aspiring managers and leaders: * *Define their teams' boundaries and constraints, so they can self-organize more effectively. *Anticipate issues teams won't or can't resolve on their own. *Give teams the feed and caring they need, and let them grow on their own. *Sow the seeds for a culture of craftsmanship. *Successfully manage risks and uncertainty in fast-changing projects and environments.	http://books.google.com.br/books/content?id=2X4hBQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321712479	413	2011-01	Pearson Education	Leading Agile Developers, Developing Agile Leaders	Management 3.0
267	Karl Mathias & Sean P. Kane	Um ótimo livro para iniciante em Docker.	http://novatec.com.br/figuras/capas/9788575224731.gif	\N	240	Janeiro-2016	Novatec	Usando Contêiner em produção	Primeiros Passos com Docker
268	Chimamanda Ngozi Adichie	\N	http://www.companhiadasletras.com.br/images/livros/13925_g.jpg	\N	64	\N	Companhia das Letras	\N	Sejamos Todos Feministas
269	Chimamanda Ngozi Adichie	\N	http://www.companhiadasletras.com.br/images/livros/13925_g.jpg	\N	64	\N	Companhia das Letras	\N	Sejamos Todos Feministas
270	Kent Beck	\N	http://www.grupoa.com.br/uploads/imagensTitulo/fotoAmpliada_1583.jpg	\N	165	\N	Bookman	Acolha as mudanças	Programação eXtrema explicada (XP)
271	Galeano, Eduardo	\N	\N	\N	\N	\N	\N	\N	As Veias Abertas da América Latina
272	FREDERICK P. BROOKS JUNIOR,CESAR BROD	'O Mítico homem-mês' foi a obra literária que expôs as peculiaridades da indústria de software. Nesta edição, o autor traz uma obra com pensamentos sobre o tema e uma retrospectiva sobre as principais mudanças ocorridas desde o lançamento da primeira edição do livro, em 1975.	https://www.solivros.com.br/images/9788535234879.jpg	9788535234879	328	\N	Campus & Elsiever	ENSAIOS SOBRE ENGENHARIA DE SOFTWARE	O MITICO HOMEM-MES
273	David H. Maister	This comprehensive text offers a wealth of common-sense ideas on the managerial problems of professional service firms, from marketing and business development to multinational strategies, and from human resource policies to profit improvement	http://books.google.com.br/books/content?id=xRAhO-RzV5oC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780684834313	376	1993	Free Press	\N	Managing the professional service firm
311	Simon Richmond,Lonely Planet,Stuart Butler,Paul Clammer,Mary Fitzpatrick	Presents a guide to the continent, offering maps, advice on visas, border crossings, travel routes, activities, accommodations, restaurants, and discussing the history, politics, culture, and environment of the region.	http://books.google.co.za/books/content?id=tYijPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781741798968	1124	2013	\N	\N	Africa
897	Cloves Carneiro Jr, Rida Al Barazi	\N	https://s3.amazonaws.com/static.novatec.com.br/capas/9788575222652.jpg	\N	\N	2011	\N	\N	Rails 3 Básico
274	L. David Marquet	'David Marquet is the kind of leader who comes around only once in a generation ... his ideas and lessons are invaluable' Simon Sinek, author of Start With Why Captain David Marquet was used to giving orders. In the high-stress environment of the USS Santa Fe, a nuclear-powered submarine, it was crucial his men did their job well. But the ship was dogged by poor morale, poor performance and the worst retention in the fleet. One day, Marquet unknowingly gave an impossible order, and his crew tried to follow it anyway. He realized he was leading in a culture of followers, and they were all in danger unless they fundamentally changed the way they did things. Marquet took matters into his own hands and pushed for leadership at every level. Before long, his crew became fully engaged and the Santa Fe skyrocketed from worst t first in the fleet. No matter your business or position, you can apply Marquet's approach to create a workplace where everyone takes responsibility for their actions, people are healthier and happier - and everyone is a leader.	http://books.google.com.br/books/content?id=TVb4sgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780241250945	240	2015-10-08	Portfolio (Hardcover)	A True Story of Building Leaders by Breaking the Rules	Turn the Ship Around!
275	Marshall B. Rosenberg	Manual prático e didático que apresenta metodologia criada pelo autor, voltada para aprimorar os relacionamentos interpessoais e diminuir a violência no mundo. Aplicável em centenas de situações que exigem clareza na comunicação: em fábricas, escolas, comunidades carentes e até em graves conflitos políticos.	http://books.google.com.br/books/content?id=2HGf_-uVBEQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788571838260	285	2006-04-18	Editora Agora	Tecnicas para aprimorar relacionamentos pessoais e profissionais	COMUNICACAO NAO-VIOLENTA
276	Dale Carnegie	\N	http://www.extra-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=6543483	\N	264	2012	Companhia Editora Nacional	O guia clássico e definitivo para relacionar-se com as pessoas	Como fazer amigos e influenciar pessoas
277	Kerry Patterson, Joseph Grenny, Ron McMillan, Al Switzler	\N	http://geral.leya.com.br/fotos/produtos/250_9788580445640_confrontosdecisivos.jpg	\N	280	\N	Leya	Solucione problemas difíceis e melhore definitivamente seu desempenho nos relacionamentos pessoais e no trabalho	Confrontos Decisivos
278	Bob Gower	\N	http://ecx.images-amazon.com/images/I/41sFeolto1L._SX331_BO1,204,203,200_.jpg	\N	235	2013	Rally Software Development Corp.	A Leader's Guide to Harnessing Complexity	Agile Business
279	Douglas W. Hubbard	The invaluable companion to the new edition of the bestselling How to Measure Anything This companion workbook to the new edition of the insightful and eloquent How to Measure Anything walks readers through sample problems and exercises in which they can master and apply the methods discussed in the book. The book explains practical methods for measuring a variety of intangibles, including approaches to measuring customer satisfaction, organizational flexibility, technology risk, technology ROI, and other problems in business, government, and not-for-profits. Companion to the revision of the bestselling How to Measure Anything Provides chapter-by-chapter exercises Written by industry leader Douglas Hubbard Written by recognized expert Douglas Hubbard?creator of Applied Information Economics?How to Measure Anything Workbook illustrates how the author has used his approach across various industries and how any problem, no matter how difficult, ill defined, or uncertain can lend itself to measurement using proven methods.	http://books.google.com.br/books/content?id=pwTXAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781118752364	160	2014-03-17	John Wiley & Sons	Finding the Value of Intangibles in Business	How to Measure Anything Workbook
280	Frederic Laloux,Ken Wilber	The way we manage organizations seems increasingly out of date. Survey after survey shows that a majority of employees feel disengaged from their companies. The epidemic of organizational disillusionment goes way beyond Corporate America-teachers, doctors, and nurses are leaving their professions in record numbers because the way we run schools and hospitals kills their vocation. Government agencies and nonprofits have a noble purpose, but working for these entities often feels soulless and lifeless just the same. All these organizations suffer from power games played at the top and powerlessness at lower levels, from infighting and bureaucracy, from endless meetings and a seemingly never-ending succession of change and cost-cutting programs. Deep inside, we long for soulful workplaces, for authenticity, community, passion, and purpose. The solution, according to many progressive scholars, lies with more enlightened management. But reality shows that this is not enough. In most cases, the system beats the individual-when managers or leaders go through an inner transformation, they end up leaving their organizations because they no longer feel like putting up with a place that is inhospitable to the deeper longings of their soul. We need more enlightened leaders, but we need something more: enlightened organizational structures and practices. But is there even such a thing? Can we conceive of enlightened organizations? In this groundbreaking book, the author shows that every time humanity has shifted to a new stage of consciousness in the past, it has invented a whole new way to structure and run organizations, each time bringing extraordinary breakthroughs in collaboration. A new shift in consciousness is currently underway. Could it help us invent a radically more soulful and purposeful way to run our businesses and nonprofits, schools and hospitals? The pioneering organizations researched for this book have already "cracked the code." Their founders have fundamentally questioned every aspect of management and have come up with entirely new organizational methods. Even though they operate in very different industries and geographies and did not know of each other's experiments, the structures and practices they have developed are remarkably similar. It's hard not to get excited about this finding: a new organizational model seems to be emerging, and it promises a soulful revolution in the workplace. "Reinventing Organizations" describes in practical detail how organizations large and small can operate in this new paradigm. Leaders, founders, coaches, and consultants will find this work a joyful handbook, full of insights, examples, and inspiring stories.	http://books.google.com.br/books/content?id=HAKengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9782960133509	360	2014	Lightning Source Incorporated	A Guide to Creating Organizations Inspired by the Next Stage of Human Consciousness	Reinventing Organizations
281	Timothy Ferriss	An edition expanded with more than 100 pages of new content offers a blueprint for a better life, whether one's dream is escaping the rat race, experiencing high-end world travel, earning a monthly five-figure income with zero management or just living more and working less.	http://books.google.com.br/books/content?id=7ayVcWQJ89YC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780307465351	396	2009	Crown	Escape 9-5, Live Anywhere, and Join the New Rich	The 4-hour Workweek
282	Fernando Morais	\N	https://descomplicaissoaqui.files.wordpress.com/2013/08/corac3a7c3b5es-sujos.jpg	\N	349	2000	Companhia das Letras	\N	Corações Sujos
283	Beck	\N	http://books.google.com.ec/books/content?id=Pq3_i9bykA0C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788131715956	240	2003-09-01	Pearson Education India	\N	Test Driven Development: By Example
284	Douglas Crockford	Describes the reliable features of JavaScript, covering such topics as syntax, objects, functions, arrays, regular expressions, inheritance, and methods.	http://books.google.com.ec/books/content?id=F9ybAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780596517748	153	2008-05-08	"O'Reilly Media, Inc."	The Good Parts	JavaScript
285	Grady Booch	The long-awaited revision of THE book on learning proper OO analysis and design, from UML founder Grady Booch is back!	http://books.google.com.ec/books/content?id=3NQgAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780201895513	691	2007	Addison-Wesley Professional	\N	Object-oriented Analysis and Design with Applications
286	Yedidyah Langsam,Moshe J. Augenstein,Aaron M. Tanenbaum	Explica los fundamentos sobre estructuras de datos, usando los lenguajes de programacin̤ C y C++. Se analizan los aspectos y problemas que pueden ocurrir conforme los algoritmos se transforman en programas.	http://books.google.com.ec/books/content?id=P2m2AAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9789688807989	671	1997	\N	\N	Estructuras de datos con C y C++
287	Roger Fisher,Daniel Shapiro	Co-authored by the writer of Getting to Yes and a Harvard psychologist, a guide to understanding how emotions can be used as a tool during a negotiating process explains how readers can interact more productively by getting in touch with feelings and by setting a positive tone. Reprint. 75,000 first printing.	http://books.google.com.ec/books/content?id=XMPxjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780143037781	244	2006	Penguin Paperbacks	Using Emotions as You Negotiate	Beyond Reason
288	Osvaldo León,Sally Burch,Eduardo Tamayo G.	\N	images\\no-image.png	9789978442715	163	2005	\N	\N	Communication in Movement
289	Jared R. Richardson,William Atwill Gwaltney	Short of hauling it from their garages to the curb with their SUVs, most folks do not have a clue about getting their new-born product on the street. Experienced practitioners Richardson and Gwaltney give inside information on the practicalities of managing a development project, whether from the aforesaid garage or from the largest cube farm in th.	http://books.google.com.ec/books/content?id=ka1QAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780974514048	198	2005	\N	A Practical Guide to Successful Software Projects	Ship It!
345	Evita Beziudenhout	\N	\N	\N	127	October 2009	\N	cookbook	Evita's bossie sikelela
293	Arnold Robbins	It's simple: you need to know how to work with the bash shell if you want to get to the heart of Mac OS X, Linux, and other Unix systems. Updated for the most recent version of bash, this concise little book puts all of the essential information about bash at your fingertips. You'll quickly find answers to annoying questions that always come up when you're writing shell scripts -- What characters do you need to quote? How do you get variable substitution to do exactly what you want? How do you use arrays? -- and much more. If you're a user or programmer of any Unix variant, or if you're using bash on Windows, you'll find this pocket reference indispensable. This book covers: Invoking the Shell Syntax Functions Variables Arithmetic Expressions Command History Programmable Completion Job Control Shell Options Command Execution Coprocesses Restricted Shells Built-in Commands	http://books.google.com.ec/books/content?id=KrGbAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449387884	124	2010-05-04	"O'Reilly Media, Inc."	\N	Bash Pocket Reference
294	Marc Becker	\N	\N	\N	\N	\N	\N	\N	Indians and Leftists in the Making of Ecuador's Modern Indigenous Movements
295	Frederick Brooks	\N	\N	\N	\N	\N	\N	\N	El Mítico Hombre-Mes
296	Arundhati Roy	With anger and compassion, Roy exposes the sordid underbelly and dark inhumanity of capitalism in India and around the globe.	http://books.google.com.ec/books/content?id=pEsaBQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781608463855	230	2014-05-06	Haymarket Books	A Ghost Story	Capitalism
297	Mikael Krogerus,Roman Tschäppeler,Jenny Piening	Offers fifty different strategies and models for making better choices and decisions, including explanations and guidance for applying such models as the Rubber Band Model, the Personal Performance Model, and the Pareto Principle.	http://books.google.com.ec/books/content?id=h8CfDrhcKLYC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780393079616	176	2012-01-30	W. W. Norton & Company	\N	The Decision Book: 50 Models for Strategic Thinking
298	TWers	When you hit a rough spot in software development, it's nice to know that someone has been there before. The domain experts at ThoughtWorks share what they've learned in this anthology, bringing together the best field-tested insights in IT and software development. You'll benefit from their experience in areas from testing to information visualization, from object oriented to functional programming, from incremental development to driving innovation in delivery. You'll find yourself referring to this collection of solved problems whenever you need an expert's insight. This new collection of essays from the experts at ThoughtWorks offers practical insight and advice on a range of challenges faced daily by software developers and IT professionals. It covers a broad spectrum of software development topics, from tuning agile methodologies to hard-core language geekery. This anthology captures the wide-ranging intellect and diversity of ThoughtWorks, reflected through practical and timely topics. In it, you'll find from-the-trenches advice on topics such as continuous integration, testing, and improving the software delivery process. See how people use functional programming techniques in object-oriented languages, modern Java web applications, and deal with current problems in JavaScript development. Scan an overview of the most interesting programming languages today and the current state of information visualization. And it's all field-tested insight, because it comes from the practical perspective of ThoughtWorks experts. Each essay focuses on extending your skills and enlarging your toolkit. And each is drawn from practical experience gained in the field. You'll benefit from this book if you are involved in developing, deploying, or testing software, either as a manager or developer.	http://books.google.com.ec/books/content?id=0hRvMAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781937785000	248	2012	\N	More Essays on Software Technology and Innovation	The ThoughtWorks Anthology, Volume 2
299	Tom DeMarco,Timothy R. Lister	Any software project that's worth starting will be vulnerable to risk. Since greater risks bring greater rewards, a company that runs away from risk will soon find itself lagging behind its more adventurous competition. By ignoring the threat of negative outcomes---in the name of positive thinking or a Can-Do attitude---software managers drive their organizations into the ground. In Waltzing with Bears, Tom DeMarco and Timothy Lister---the best-selling authors of Peopleware---show readers how to identify and embrace worthwhile risks. Developers are then set free to push the limits. You'll find that risk management makes aggressive risk-taking possible; protects management from getting blindsided; provides minimum-cost downside protection; reveals invisible transfers of responsibility; isolates the failure of a subproject---readers are taught to identify the most common risks faced by software projects: schedule flaws; requirements inflation; turnover; specification breakdown; and under-performance. Packed with provocative insights, real-world examples, and project-saving tips, Waltzing with Bears is your guide to mitigating the risks---before they turn into problems.	http://books.google.com.ec/books/content?id=u8HHzng8bHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780932633606	196	2003-01-01	Dorset House	Managing Risk on Software Projects	Waltzing with Bears
300	Andrew Hunt	\N	\N	\N	\N	\N	\N	\N	The Pragmatic Programmer: From Journeyman to Master
301	Enrique Lopez Albujar	\N	\N	\N	\N	\N	\N	\N	Matalache
302	Javier Fuentes Leon	\N	\N	\N	\N	\N	\N	\N	Contra Corriente - DVD
303	Nelly Valbuena	\N	\N	\N	\N	\N	\N		El hombre que atrapó al Cangrejo - DVD
304	G. Garcia Marquez	\N	\N	\N	\N	\N	\N	\N	Cronica de una muerte anunciada
305	Andy Weir	\N	\N	\N	\N	\N	\N	\N	Perdido em Marte
306	G. Garcia Marquez	\N	\N	\N	\N	\N	\N	\N	Cien años de Soledad
307	Allen B. Downey	If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3. Through exercises in each chapter, you’ll try out programming concepts as you learn them. Think Python is ideal for students at the high school or college level, as well as self-learners, home-schooled students, and professionals who need to learn programming basics. Beginners just getting their feet wet will learn how to start with Python in a browser. Start with the basics, including language syntax and semantics Get a clear definition of each programming concept Learn about values, variables, statements, functions, and data structures in a logical progression Discover how to work with files and databases Understand objects, methods, and object-oriented programming Use debugging techniques to fix syntax, runtime, and semantic errors Explore interface design, data structures, and GUI-based programs through case studies	http://books.google.com.ec/books/content?id=lq4cswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491939369	292	2015-12-15	O'Reilly Media	How to Think Like a Computer Scientist	Think Python
308	Brett D. McLaughlin	Tired of reading object-oriented analysis and design books that only make sense after you're an expert? Try our Head First book. This witty and entertaining tutorial shows you how to analyze, design, and write great software that makes your boss happy, and your customers satisfied. You'll learn to solve real problems, regardless of their size and complexity, by applying good design principles and practices.	images\\no-image.png	9788184042214	648	2006-01-01	\N	\N	Head First Object Oriented Analysis & Design
310	Andrew Hunt, David Thomas	\N	http://ecx.images-amazon.com/images/I/41BKx1AxQWL._SX396_BO1,204,203,200_.jpg	\N	352	30/10/1999	Addison-Wesley	From journeyman to master	The Pragmatic Programmer
346	D S Malik	\N	\N	\N	1560	2009	\N	C++ Programmimg	International edition
314	Matthew D. Firestone,Adam Karlin	A guide to traveling in Botswana and Namibia that provides information on the region's history, people, culture, wildlife, historical sites, popular landmarks, activities, and cuisine.	http://books.google.co.za/books/content?id=EgCSa3qJCoUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781741049220	424	2010	Lonely Planet	\N	Botswana & Namibia
315	Ndongo Samba Sylla	The engaging and wide-ranging discussions published here explore contemporary political realities in Africa through a 'social movement' lens.Detailing the nuances of social movement politics in 12 West African countries during the 2010-2013 period, they present a chronicle of the socio-political struggles that have taken place in the region. In so doing, this volume answers key questions related to these movements. What logic drives them? What forms do they take? What has been their political impact? Can we speak of a resurgence of social movements? If so, are these a response to the crisis of 'representative democracy'? Did they give rise to new forms of expression and democratic participation? What challenges do they bring?Discontent vis-à-vis liberalism in its political and economic dimensions seems to be the trigger of the numerous popular uprisings and protests that occur in the region. In spite of their ambiguities and limitations, these struggles currently seek to remove a double disconnect: that between citizens and the 'representatives' and that between the economy and society, between what capital wants and what the people aspire to.Ndongo Samba Sylla, the editor of this volume, is a Senegalese economist, programme and research manager at the West Africa Office of the Rosa Luxemburg Foundation. Author of The Fair Trade Scandal. Marketing poverty to benefit the Rich (translated from French by Pluto Press 2014), he is the editor of “Rethinking Development” (Rosa Luxemburg Foundation 2014). His recent research work deals with the history of the word 'democracy'. Contributing authors:Ibrahim Abdullah - Souley Adji - Kojo Opoku Aidoo - Francis Akindès - Alpha Amadou Bano Barry - Fernando Leonardo Cardoso - Lila Chouli - Modou Diome - Moussa Fofana - Cláudio Alves Furtado - George Klay Kieh Jr - Claus-Dieter König - Severin Yao Kouamé - Fodé Mane - Issa N'Diaye - Zekeria Ould Ahmed Salem - Ndongo Samba Sylla	http://books.google.co.za/books/content?id=qKPvoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781499324754	488	2014	CreateSpace	Social Movements in West Africa	Liberalism and Its Discontents
316	Douglas R. Hofstadter	An original, endlessly thought-provoking, and controversial look at the nature of consciousness and identity argues that the key to understanding selves and consciousness is the "strange loop," a special kind of abstract feedback loop inhabiting our brains.	http://books.google.co.za/books/content?id=SStFwf1H6j4C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780465030781	412	2007	Basic Books	\N	I Am a Strange Loop
317	Jacob Dlamini	Challenging the stereotype that black people who lived under South African apartheid have no happy memories of the past, this examination into nostalgia carves out a path away from the archetypical musings. Even though apartheid itself had no virtue, the author, himself a young black man who spent his childhood under apartheid, insists that it was not a vast moral desert in the lives of those living in townships. In this deep meditation on the experiences of those who lived through apartheid, it points out that despite the poverty and crime, there was still art, literature, music, and morals that, when combined, determined the shape of black life during that era of repression.	http://books.google.co.za/books/content?id=iFjJm8SuGLIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781770097551	169	2009	Jacana Media	\N	Native Nostalgia
318	Raimond Gaita	'People have often asked me how I survived my childhood reasonably sane. They think it was because my father and Hora loved me deeply and that I never doubted it. But as much as, perhaps more than that, it was the fact that I came to see the world in the light that my fatherâ€TMs goodness cast upon it.' Raimond Gaita In 1998, Raimond Gaitaâ€TMs Romulus, My Father was first publishedâ€”the story of his father who came to Australia from Europe with his young wife Christine and their four-year-old son after the end of the Second World War. In the isolated landscape of country Victoria, Christine succumbed to mental illness, and a series of tragedies befell the family. Described as â€ ̃a profound meditation on love and death, madness and truth, judgment and compassionâ€TM, Romulus, My Father became an instant classic. Now, thirteen years later, and four years after the release of the film, Raimond Gaita has put together this collection in which he reflects on the writing of the book, the making of the film, his relationship to the desolate beauty of the central Victorian landscape, the philosophies that underpinned his fatherâ€TMs relationship to the world and, most movingly, the presence and absence of his mother and his unassuaged longing for her.	http://books.google.co.za/books/content?id=HYo-vfuU1KUC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781921758782	224	2011-08-29	Text Publishing	\N	After Romulus
319	John Freeman	Hari Kunzru travels to Chernobyl, Detroit, and Japan to investigate the phenomenon of disaster tourism. Policeman-turned-detective-turned-writer A Yi describes life as a provincial gumshoe in China. Physician Siddhartha Mukherjee visits a government hospital in New Delhi, where he meets Madha Sengupta, at the end of his life and on the frontiers of medicine. Robert Macfarlane explores the limestone world beneath the Peak District. And Haruki Murakami revisits his walk to Kobe in the aftermath of the 1995 earthquake. In this issue--which includes poems by Charles Simic and Ellen Bryant Voigt, a story by Miroslav Penkov, and non-fiction by David Searcy, Teju Cole, and Hector Abad--GRANTA presents a panoramic view of our shared landscape and investigates our motivations for exploring it. “One’s destination is never a place,” Henry Miller wrote, “but a new way of seeing things.”	http://books.google.co.za/books/content?id=qqHxkwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781905881697	255	2013	Granta Books (UK)	Travel	Granta 124
320	Peter Derichs	\N	images\\no-image.png	9780620416436	256	2008	\N	\N	Kruger National Park
321	Chris Abani	Part Inferno and part Paradise Lost, Song for Night is the story of a West African boy soldier's lyrical, terrifying, yet beautiful journey through the nightmare landscape of a brutal war in search of his lost platoon. The reader is led by the voiceless protagonist who, as part of a landmine-clearing platoon, had his vocal chords cut - a move to keep these children from screaming when blown up, and thereby distracting the other minesweepers. The book is written in a ghostly voice, with each chapter headed by a line of the unique sign language these children have invented. The book is unlike anything else ever written about an African war.	http://books.google.co.za/books/content?id=kr7VCpX2yI8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781921372094	144	2008	Scribe Publications	\N	Song for Night
322	J. M. Coetzee	For decades the Magistrate has been a loyal servant of the Empire, running the affairs of a tiny frontier settlement and ignoring the impending war with the barbarians. When interrogation experts arrive, however, he witnesses the Empire's cruel and unjust treatment of prisoners of war. Jolted into sympathy for their victims, he commits a quixotic act of rebellion that brands him an enemy of the state. J. M. Coetzee's prize-winning novel is a startling allegory of the war between opressor and opressed. The Magistrate is not simply a man living through a crisis of conscience in an obscure place in remote times; his situation is that of all men living in unbearable complicity with regimes that ignore justice and decency. -- from http://www.powells.com (August 28, 2014).	http://books.google.co.za/books/content?id=zB9fQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780143116929	180	2010	Penguin Group USA	\N	Waiting for the Barbarians
323	R. Glenn Hubbard,William Duggan	Proposes a model of economic assistance to developing countries that concentrates on creating a strong business sector, rather than continuing the current practice of funding governments and local non-governmental organizations in an effort to end poverty.	http://books.google.co.za/books/content?id=wIbGAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780231145626	212	2009-09-05	Columbia University Press	Hard Truths About Ending Poverty	The Aid Trap
324	Suzanne Collins	In a future North America, where the rulers of Panem maintain control through an annual televised survival competition pitting young people from each of the twelve districts against one another, sixteen-year-old Katniss's skills are put to the test when she voluntarily takes her younger sister's place.	http://books.google.co.za/books/content?id=hlb_sM1AN0gC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780439023528	374	2008	Scholastic Inc.	\N	The Hunger Games
325	Martin Fowler	This volume is a handbook for enterprise system developers, guiding them through the intricacies and lessons learned in enterprise application development. It provides proven solutions to the everyday problems facing information systems developers.	http://books.google.co.za/books/content?id=FyWZt5DdvFkC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321127426	533	2003	Addison-Wesley Professional	\N	Patterns of Enterprise Application Architecture
326	Richard Hundhausen	Provides information on software development using Scrum practices along with Visual Studio 2012.	http://books.google.co.za/books/content?id=awy0NAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780735657984	353	2012	\N	\N	Professional Scrum Development with Microsoft Visual Studio 2012
327	Lindsay Ratcliffe,Marc McNeill	Deliver products that are technically feasible, profitable and desirable with techniques for integrating design process with agile methods * *Demonstrates how design practitioners can successfully integrate into and collaborate with an Agile project team. *Both a how-to-guidebook and a toolkit of tips and techniques for developing compelling customers experiences in an agile framework. *Foreword by Martin Fowler, one of the original authors of the Agile Manifesto. This is the missing book on Agile and design. It provides user-experience designers with tools, techniques and a framework for integrating their design principles into the Agile project framwork. With this book designers will be able to deliver timely customer experiences, profitable, technically feasible and desirable by the end consumer. The book is divided into two parts. Part one provides background information, theory, context, anecdotes, examples about agile and various design disciplines and part two provides designers with quick reference tools and techniques.	http://books.google.co.za/books/content?id=M1aQZwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321804815	309	2012	New Riders Pub	A Digital Designer's Guide to Agile, Lean, and Continuous	Agile Experience Design
328	scott hanselman	\N	\N	\N	404	\N	\N	\N	professional F# 2.0
329	Patricia Cornwell	\N	\N	\N	533	\N	\N	\N	the scarpeter factor
330	James Joyce	\N	\N	\N	763	\N	\N		Ulysses
331	Kristina Halvorson,Melissa Rach	Describes the value of content strategy, discusses how to audit and analyze content, and looks at ways to maintain content over time.	http://books.google.co.za/books/content?id=F486kgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321808301	197	2012	New Riders Pub	\N	Content Strategy for the Web
332	Chinua Achebe	Ezeulu, headstrong chief priest of the god Ulu, is worshipped by the six villages of Umuaro. But he is beginning to find his authority increasingly under threat - from his rivals in the tribe, from those in the white government and even from his own family. Yet he still feels he must be untouchable - surely he is an arrow in the bow of his God? Armed with this belief, he is prepared to lead his people, even if it means destruction and annihilation. Yet the people will not be so easily dominated. Spare and powerful, Arrow of God is an unforgettable portrayal of the loss of faith, and the struggle between tradition and change. Continuing the epic saga of the community in Things Fall Apart, it is the second volume of Achebe's African trilogy, and is followed by No Longer at Ease.	http://books.google.co.za/books/content?id=L_kNQAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780141191560	240	2010-01-01	Penguin Modern Classics	\N	Arrow of God
333	Jonathan Kingdon	The Kingdon Field Guide to African Mammals is the standard identification guide to all African land mammals. This new pocket guide is an adaptation of the original into a standard field-guide format. The greatly condensed text focuses on essential information such as identification and distribution, while the author's superb illustrations have been rearranged into an easy-to-use plate format and placed opposite the text. Complex and more obscure groups like the bats and certain rodent families are summarised by genera. This is a practical, lightweight guide, ideal for use in the field and more suitable than the original for the lay person and tourist on safari. "Excellent, comprehensive field guide so you can tell your puku from your lechwe." BBC Wildlife	http://books.google.co.za/books/content?id=X_tmHAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780713669817	272	2004	Christopher Helm Publishers, Incorporated	\N	The Kingdon Pocket Guide to African Mammals
334	Charles Dickens	\N	\N	\N	367	1859	\N	\N	A tale of 2 cities
335	Jassy Mackenzie	THRILLER	\N	\N	254	2008	\N	\N	My Brothers keeper
336	Kimberley A. Bobo,Jackie Kendall,Steve Max	\N	images\\no-image.png	9780984275212	401	2010-01-01	\N	Midwest Academy Manual for Activists	Organizing for Social Change
337	Frank Chikane	\N	\N	\N	271	march 2012	\N	The removal of Thabo Mbeki	Eight days in September
338	Ndongo Samba Sylla	From the single party model to "representative democracy", from structural adjustment policies to reforms on enhancing "competitiveness" and improving the "business environment", almost all fashionable political and economic models have been experimented on the African continent. Yet, they all clearly failed, as attested by the majority of socio-economic indicators in the areas of nutrition, health, education, employment, etc. According to UN forecasts, Africa will account for a quarter of the world's population by 2050. If Africa is still unable to adequately address the problems faced by its billion inhabitants, how will it do it when its population doubles? Beyond the critique of neo-liberalism, there is therefore a pressing need to reflect about alternatives that will help Africa back out of this dead-end and find its own path. This is the perspective adopted by this book edited by Ndongo Samba Sylla, which compiles contributions of experts on Africa's development issues. Can democracy help to achieve the changes that Africans aspire to? If yes, under what conditions? Otherwise, what is the alternative? How can Africa break with neo-colonial practices that prevent its political, economic and cultural emancipation? What role is there for women in these processes? In view of the paralysis and treason of elites, can social movements be harbingers of the much-awaited radical shifts? What contribution could the private media bring in implementing people-centred alternatives? Rethinking Development attempts to provide answers to these essential questions.	http://books.google.co.za/books/content?id=e0wFoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781493713240	184	2014-03-03	CreateSpace	\N	Rethinking Development
339	David Plotkin	\N	\N	\N	441	2003	\N	how to do everything with	microsoft office
340	Brett King	\N	\N	\N	267	2012	\N	the innovator,rogues and strategies	Breaking banks
341	Gwendolyn Hallsmith,Bernard Lietaer	The power of local currencies	http://books.google.co.za/books/content?id=Kt70AgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780865716674	288	2011-06-28	New Society Publishers	Growing Local Economies with Local Currencies	Creating Wealth
342	Deon Meyer	\N	\N	\N	394	2000	\N	the past is never dead	Dead at day break
343	Andrew Hunt	\N	\N	\N	321	\N	David Thomas	from journeyman to master	the pragmatic programmer
344	Reader's digest association	\N	\N	\N	543	\N	\N	Illustrate guide to southern africa	Reader's Digest
347	Neal Ford,Matthew J. McCullough,Nathaniel T. Schutta	The first practical, patterns-based guide to creating technical presentations that are powerful, effective - and never, ever boring! * *Time-tested patterns and concrete solutions that can bring life and RESULTS to any technical presentation, no matter how complex or challenging the material. *Organized to use the standard 'Patterns' format thousands of software developers, architects, and other technical professionals already know and love. *Companion website demonstrates many key patterns at work. There are plenty of books on making better presentations, but many focus on theory, not practice - and few address the unique challenges of making a great technical presentation. For thousands of technical presenters, Presentation Patterns offers a far better solution. It brings together concrete solutions any technical professional can use to create compelling, engaging, successful presentations, no matter how complex or difficult their material. This book is organized to follow the classic 'patterns' format that has already helped thousands of software developers and architects master best practices for becoming more effective in their fields. The authors identify and illuminate more than 50 patterns for creating high-impact technical presentations. Each is introduced with a memorable name, defined, and motivated. Readers learn where it is applicable, the consequences of applying it, and specific step-by-step mechanics for utilizing it. The authors also present a series of anti-patterns: clichés, fallacies, and major design mistakes - all of them easy to avoid, once presenters know how. Many of this book's patterns are linked to a companion website, presentationpatterns.com, where the authors show them at work. The solutions in this book are designed to work even for presenters with no visual talent, no design training, no presentation experience, and no budget!	http://books.google.co.za/books/content?id=8CafpwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321820808	265	2012	Addison-Wesley Professional	Techniques for Crafting Better Presentations	Presentation Patterns
348	Greil Marcus	\N	\N	\N	286	1997	Bob Dylan	At the gross roads	It's a rolling stone
349	Bill Buxton	\N	\N	\N	443	May 8 2015	\N	getting the design right and the right design	Sketching user experience
350	T. Coraghessan Boyle	Mungo Park, based on a real-life African explorer, and Ned Rise, a scoundrel, pimp, thief, and cheat, travel about Africa and meet up with a varied assortment of characters--native and colonial, antic and dangerous	http://books.google.co.za/books/content?id=bL6tQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780140065503	437	1981	Penguin (Non-Classics)	\N	Water Music
351	Kenneth Newman	\N	\N	\N	510	1993	\N	Expanded edition	Birds of Southern Africa
352	Hannah Saint C.A. Nanyanzi	\N	images\\no-image.png	9789970906307	333	2012	\N	\N	Eliyeena's Sorbonne
353	Nelson Demille	\N	\N	\N	677	2008	Dan Brown	a true master	The gate house
354	Sarah Waters	\N	\N	\N	469	March 2007	\N	Daily telegram	Tipping the velvet
355	Ronald Kasrils,Ronnie Kasrils	This insider's account of the workings of Umkhonto weSizwe, during the underground years, is a modern-day story of intrigue and cunning in the fight against apartheid. The author begins by describing his involvement with the South African Communist Party and the underground resistance within South Africa in the 1950s and early 1960s.	images\\no-image.png	9781431407958	355	2014-01-23	\N	From Undercover Struggle to Freedom	Armed and Dangerous: 4th Edition
356	Oliver Sacks	\N	\N	\N	337	1998	\N	Memories of a chemical boyhood	Uncle Tungsten
357	China Intercontinental press	\N	\N	\N	159	\N	\N	That's	Urbanatomy
358	Jean Dominique Bauby	\N	\N	\N	141	2002	\N	finacial times	The diving bell and the butterfly
359	Atul Gawande	\N	\N	\N	269	\N	\N	A surgeon notes on an imperfect science	Complications
360	Andre Neuman	\N	\N	\N	223	\N	\N	The magazine of new writting	Medicine
361	Friedrich von Kirchhoff	\N	\N	\N	91	1976	\N	\N	Two ravens came tapping
362	Gerbrand Bakker	WINNER OF THE INDEPENDENT FOREIGN FICTION PRIZE 2013 A Dutch woman rents a remote farm in rural Wales. She says her name is Emilie. She is a lecturer doing some research, and sets about making the farmhouse more homely. When she arrives there are ten geese living in the garden but one by one they disappear. Perhaps it's the work of a local fox. She has fled from an unbearable situation having recently confessed to an affair with one of her students. In Amsterdam, her stunned husband forms a strange partnership with a detective who agrees to help him trace her. They board the ferry to Hull on Christmas Eve. Back on the farm, a young man out walking with his dog injures himself and stays the night, then ends up staying longer. Yet something is deeply wrong. Does he know what he is getting himself into? And what will happen when her husband and the policeman arrive? Gerbrand Bakker has made the territories of isolation, inner turmoil and the solace offered by the natural world his own. The Detour is a deeply moving new novel, shot through with longing and the quiet tragedy of everyday lives.	http://books.google.co.za/books/content?id=V4reB9wa5QAC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781846555442	230	2012	Random House	\N	The Detour
363	Michael Power	\N	\N	\N	167	1973	\N	Shadow game	Morden classic
364	Bessie head	\N	\N	\N	122	1969	\N	\N	Maru
365	Kenneth Newman	\N	\N	\N	103	1992	\N	Idiots bird watch	Beating about the bush
366	Megan Voysey-Braig	Giving voice to the countless female victims of crime and homicide in South Africa, this disturbingly frank yet sensitively rendered tale is the harrowing account of a middle-aged woman who is attacked, raped, and murdered in her home by armed intruders. Drawing overdue attention to South Africa’s overwhelming history of violence against women, this revealing story is a beautiful, jarringly unfiltered account of an unimaginably cruel reality. Narrated with a cultural authenticity that is quintessentially South African and infused with an air of impossible hope and optimism, this literary journey delivers compelling insight that illuminates both the light and dark elements of human nature.	http://books.google.co.za/books/content?id=jnpdPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781770096394	230	2008	Jacana Media	\N	Till We Can Keep an Animal
367	ALFRED V. AHO,Ravi Sethi,monica S. Lam	Desde a publicação da primeira edição deste livro, em 1986, o mundo das linguagens de programação mudou significativamente. Hoje, as arquiteturas de computador oferecem diversos recursos dos quais o projetista de compilador pode tirar proveito, bem como novos problemas de compilação. É desse novo cenário que trata esta obra. Conhecido no mundo todo como o 'livro do dragão'. 'Compiladores' está completamente revisado e atualizado, apresentando as últimas novidades na área para professores, estudantes e pesquisadores. Com uma abordagem completa do projeto de compiladores, o livro mantém a estrutura prática e didática que a tornou referência absoluta e enfatiza a aplicação da tecnologis de compiladores para uma ampla gama de problemas no projeto e desenvolvimento de software. Dentre as principais novidades desta segubda edição, destacam-se quatro novos capítulos que tratam de ambientes de execução, paralelismo de instrução, otimização de paralelismos e localidade e análise interprocedimental. Destaca-se também um site de apoio.	http://ecx.images-amazon.com/images/I/51KNiYzPePL._SX366_BO1,204,203,200_.jpg	9788588639249	634	2008	\N	princípios, técnicas e ferramentas	Compiladores
368	Hunter S Thompson	\N	\N	\N	299	March 21 1988	\N	Tales of shame and degradation in the 80's	Generation of swine
369	Andre carl van der merwe	\N	\N	\N	314	\N	\N	\N	A moffie a novel
370	Patrick McGrath	\N	\N	\N	165	2001	\N	An uttery original,shimmering sensual vision	Sheila kohler cracks
371	Greenwood Guide	We have personally visited and chosen each place to stay for its exceptional character and genuine friendliness. These are the places that we ourselves would choose to return to on holiday.--Cover.	http://books.google.co.za/books/content?id=lJY5LgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780955116025	310	2012-06-01	\N	\N	The Greenwood Guide to South Africa
372	Andre Brink	\N	\N	\N	2002	222	\N	A novel in three parts	Other lives
373	Kwame Nkrumah	\N	\N	\N	280	\N	\N	The last stage of imperialism	Neo-Colonialism
374	Corporate research foundation	\N	\N	\N	211	2006	\N	Information,communication technology and electronics	Top ICT companies in SouthAfrica
375	Hilda Twongyeirwe	\N	\N	\N	226	2012	Ellen Banda Aaku	The rains	Summonings
376	Minette Walters	\N	\N	\N	398	2008	\N	A beautiful place to die	Malla Nunn
377	Deon Meyer,K. L. Seegers	Emma Le Roux hires a personal security expert when her believed-dead brother is named as a suspect in the murders of five people, a situation that pits her against political tensions, corruption and life-threatening violence. By the author of Heart of the Hunter. Reprint.	http://books.google.co.za/books/content?id=_uQCbhvm1CYC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780802145062	556	2010-09	Grove Press	\N	Blood Safari
378	Stieg Larsson	\N	\N	\N	724	2011	\N	\N	The girl who played with fire
379	Allan Cooper	\N	\N	\N	\N	\N	\N	Africa	Animals of the world
380	Gavin Hoole	\N	\N	\N	135	2004	Cheryl Smith	Really easy step by step	Computer book
381	Sights and sounds issue	\N	\N	\N	227	2013	\N	Live out loud	The sense of collection
382	Brett McLaughlin,Gary Pollice,David West	Provides information on analyzing, designing, and writing object-oriented software.	http://books.google.com.ec/books/content?id=-QpmamSKl_EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596008673	600	2006-11-27	"O'Reilly Media, Inc."	A Brain Friendly Guide to OOA&D	Head First Object-Oriented Analysis and Design
383	DR Myles E. Munroe	\N	\N	\N	416	2014	\N	Dream book 2014	Map4life
384	Sefi Atta	\N	\N	\N	336	2006	\N	\N	Everything good will come
385	Robyn Keene Young	\N	\N	\N	176	\N	\N	Behind the scenes in the Africa bush	Back seat safari
386	J M Coetzee	\N	\N	\N	\N	1998	\N	A Memoir	Boyhood
387	Andile Mngxitama	\N	\N	\N	90	2013	\N	\N	Fools of Melville
388	Willemien de Villiers	\N	\N	\N	211	2003	\N	\N	Kitchen Casualties
389	Michael Jacoby Brown	\N	\N	\N	393	2006	\N	A personal guide to creating groups that can solve problems and change the world	Building power community organisations
390	Pamela Jooste	\N	\N	\N	349	21 October 1970	\N	\N	Dance with a poor man's daughter
391	Paul Weinberg	\N	\N	\N	127	\N	\N	Moving Spirit	Spirituality in Southern Africa
392	Ray Evans	\N	\N	\N	157	1984	\N	\N	Drawing and painting buildings
393	Ken Saro Wiwa	\N	\N	\N	180	2013	\N	\N	Silence would be  treason
394	Henri Charriere	\N	\N	\N	559	1970	\N	\N	Papilion
395	Nik Rabinowitz	\N	\N	\N	125	2012	Mandy Wiener	South Africa the long walk to a free ride	The Youngsters
396	Chinua Achebe	\N	\N	\N	153	1960	\N	\N	No longer at ease
397	Mukoma wa Ngugi	\N	\N	\N	165	2009	\N	\N	Nairobi heat
398	J. M. Coetzee	A young English biographer is working on a book about the late writer, John Coetzee. He embarks on a series of interviews with people who were important to him. It completes the majestic trilogy of fictionalised memoir begun with "Boyhood" and "Youth."	http://books.google.co.za/books/content?id=nVu5Ik8Se_8C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781846553189	266	2009	Random House	Scenes from Provincial Life	Summertime
399	Kgebetli Moele	Kgebetli Moele's raw, beautiful prose exposes a world in which humor and despair exist in equal measures, a world where the need to succeed, to strike it rich, brings out the best and the worst of human nature. Room 207 takes the reader to a Jo'burg that is the very heart of South Africa, to a room in which six young men struggle to make their dreams come true in the 'dream city'. Set in a block of dilapidated apartments in Hillbrow, an inner-city neighborhood in Johannesburg, this novel tells the story of six young men who will do anything—including hustling and conning anyone they can—to survive. Painting an engrossing portrait of the friends, it shows the hopelessness and despair of a group stuck in their position in life, having to compromise themselves to make a living and reach for their dreams.	http://books.google.co.za/books/content?id=GTGsAAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780795702341	238	2006	Nb Pub Limited	\N	Room 207
400	Chimamanda Ngozi Adichie	\N	\N	\N	254	1992	\N	The view from Africa	Granta the magazine of new writting
401	Charles Kennedy	\N	\N	\N	246	\N	\N	Global Developments	Getting better
402	Ivan Vladislavic	\N	\N	\N	205	6 November 1983	\N	Joburg and what - what	Portrait with key
403	Dambisa Moyo	\N	\N	\N	188	2009	\N	Why aid is not working and how there is a better way for Africa	Dead Aid
404	William Blum	\N	\N	\N	308	September 19 2001	\N	A guide to the worlds only superpower	Rogue State
405	Mary Karr	\N	\N	\N	320	1996	\N	A memoir	The liars club
406	Billy Kahora	\N	\N	\N	135	2008	\N	Kwani?	The true story of  David Munyakei
407	Jeanette Winterson	In 1985 Jeanette Winterson's first novel, Oranges Are Not the Only Fruit, was published. It was Jeanette's version of the story of a terraced house in Accrington, an adopted child, and the thwarted giantess Mrs Winterson. It was a cover story, a painful past written over and repainted. It was a story of survival. This book is that story's the silent twin. It is full of hurt and humour and a fierce love of life. It is about the pursuit of happiness, about lessons in love, the search for a mother and a journey into madness and out again. It is generous, honest and true.	http://books.google.co.za/books/content?id=I-RYAa22dV4C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780099556091	230	2012	Random House	\N	Why be Happy when You Could be Normal?
408	Robertson Davies	\N	\N	\N	310	1972	\N	Trilogy is one of the splendid literary	The Manticore
409	Nurrudin Farah	\N	\N	\N	298	1999	\N	A novel	Secrets
452	Fabio Geda	I read somewhere that the decision to emigrate comes from a need to breathe. The hope of a better life is stronger than any other feeling. My mother decided it was better to know I was in danger far from her; but on the way to a different future, than to know I was in danger near her; but stuck in the same old fear. At the age of ten, Enaiatollah Akbari was left alone to fend for himself. This is the heartbreaking, unforgettable story of his journey from Afghanistan to Italy in an attempt to find a safe place to live.	http://books.google.co.za/books/content?id=Kuh6W7SWfQ8C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780099555452	224	2012-06	Random House	The True Story of Enaiatollah Akbari	In the Sea There Are Crocodiles
410	John Sandford	Returning to her luxurious home in an exclusive Minneapolis suburb, a wealthy widow is horrified to discover blood everywhere - and her student daughter missing. Instantly she suspects the involvement of the weird Goth crowd her daughter was hanging around with. With no sign of the widow's daughter, dead or alive, a second Goth is found slashed to death. But it's only when a third turns up dead that Luca Davenport is reluctantly dragged into the case. But for all Davenport's expertise, the clues don't seem to add up. And then there's the young Goth who keeps appearing and disappearing. Who is she? Where does she come from - and, more importantly, where does she vanish to? Why does Davenport suspect that there's something else going on here? Something very, very bad indeed . . .	http://books.google.co.za/books/content?id=5-DyNwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781847392053	438	2009	Pocket Books	\N	Phantom Prey
411	Ranulph Fiennes	The world's greatest explorer, Ranulph Fiennes writes about the people who have inspired him - from explorers to policemen, soldiers to freedom fighters.	http://books.google.co.za/books/content?id=zupPuAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781444722468	292	2012-09-01	\N	Extraordinary Courage, Exceptional People	My Heroes
412	Milan Kundera	A story of irrenconcilable love and infidelities -- Cover.	http://books.google.co.za/books/content?id=xpa8QgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780571135394	314	1984	Faber & Faber	\N	The Unbearable Lightness of Being
413	Justin Fox	I've been craving the road for some time, writes Justin Fox odd words for this most seasoned of travel writers. But there is more to it: Restless, anxious about an uneventful slide into my late 30s... And thus begins ten thousand kilometers around the edge of the Republic. Hugging the comforts which distance offers agitated souls, he bears east from Cape Town. This is fatherland, and for Justin his father s land, which the famous architect Revel Fox has marked as much as he had shaped his son s own identity. Justin tarries at outposts and towns; he skips entire cities to favor the off-beat treasures of characters fashioned less by convention than by their own battles against nature or circumstance. Back home his dad is fighting cancer. Having travelled with acute observation he reports like a novelist, stringing together scenes, pictures, communities and characters to form a totality of what South Africa is today as seen from its margins: a sad, exciting clash of histories and stories.	http://books.google.co.za/books/content?id=E9yxcQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781415200582	316	2010	Random House Struik	Scouting the Edge of South Africa	The Marginal Safari
414	Lewis Nkosi	\N	\N	\N	184	1986	\N	Fine,passionate, youthful writting	Matting Birds
415	Michael Streissguth	The legendary concert and the live album that came from it, now a part of the folklore of American music, is examined in depth, with an eye toward dispelling myths and placing the event in the larger context of both Cash's career and the music of the time. 60,000 first printing.	http://books.google.co.za/books/content?id=lWuQVTvoPn8C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780306814532	191	2005-07	Palabra	The Making of a Masterpiece	Johnny Cash at Folsom Prison
416	Margie Orford	\N	images\\no-image.png	9781868423958	349	2011-01-01	Jonathan Ball Publishers	\N	Gallows Hill
417	Kevin Bloom	\N	images\\no-image.png	9781770101609	228	2009	\N	\N	Ways of Staying
418	Lonely planet publication	\N	\N	\N	776	September 1997	\N	Lonely planet	Southern Africa
419	James Bainbridge	This multi-country guide to increasingly popular South Africa, Lesotho, and Swaziland includes such special features as a full-color wildlife overview and in-depth coverage of the music of South Africa. color photos; 131 maps.	http://books.google.co.za/books/content?id=IAvwMgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781741048902	684	2009	\N	\N	South Africa, Lesotho & Swaziland
420	Michael Lewis	\N	\N	\N	298	1989	\N	Two cities,true greed	Liars poker
421	Rachel Zadok	\N	\N	\N	327	2005	\N	\N	Gem squash tokoloshe
422	Mike Nichol	\N	\N	\N	289	2006	Joanne Hichens	\N	Out to score
423	Scott W. Ambler,Scott J. Ambler,Pramodkumar J. Sadalage	"This comprehensive guide and reference helps you overcome the practical obstacles to refactoring real-world databases by covering every fundamental concept underlying database refactoring. Using start-to-finish examples, the authors walk you through refactoring simple standalone database applications as well as sophisticated multi-application scenarios. You'll master every task involved in refactoring database schemas, and discover best practices for deploying refactorings in even the most complex production environments."--Jacket.	http://books.google.co.za/books/content?id=uj6emAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321774514	384	2006	Addison-Wesley Professional	Evolutionary Database Design	Refactoring Databases
424	Deon Meyer	\N	\N	\N	487	2011	\N	Everything leaves a trace	Trackers
425	Perfect Hlongwane	This unique collection of stories offers a biting portrait of inner-city Jo'burg (Johannesburg), a place where dreams come to die. Written by first-time author Perfect Hlongwane, Jozi is a series of interlinked stories centering around an eclectic ensemble of characters, conjuring a city both familiar and surprising. With its vein of painful self-examination, evocative sense of place, and unflinching exploration of the rawer aspects of Jo'burg living, the book brings to mind the impact of cult literary figures like Dambudzo Marechere and Phaswane Mpe.	http://books.google.co.za/books/content?id=4u6MoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781869142094	96	2013	\N	\N	Jozi
426	Phaswane Mpe	\N	\N	\N	124	2001	\N	\N	Welcome to our Hillbrow
427	Claire Tomalin	\N	\N	\N	465	November 2003	\N	\N	Samuel pepsy the unequalled self
428	Breyten Breytenbach	\N	\N	\N	197	1999	\N	\N	Dog Heart
429	J. M. Coetzee	David Lurie, a middle-aged divorcee lecturing at the Technical University of Cape Town, has an impulsive affair with a student. When the passion sours and he is denounced, he resigns and retreats to his daughter Lucy's isolated smallholding. For a time, he finds calm in the routine of farm life, but the balance of power in the country is shifting. When he and Lucy become victims of a savage and disturbing attack, all the faultlines in their relationship are revealed.	http://books.google.co.za/books/content?id=1gYDsAMvIHQC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780099563129	224	2011-08-01	Random House	\N	Disgrace
500	André Gravatá e Daniel Ianae	\N	http://payload443.cargocollective.com/1/0/17422/11176919/IMG_2149-copy_670.jpg	\N	191	\N	Movimento Educação	\N	Mistérios da educação
526	Roger S. Pressman	Este livro tem o objetivo de servir como guia para a disciplina de engenharia de software, ainda em fase de maturação. Esta edição foi revista para enfatizar os processos e práticas de engenharia de software a fim de continuar o seu propósito de servir como guia para o profissional da indústria e de oferecer uma introdução para o estudante.	images\\no-image.png	9788586804571	720	2006	\N	\N	Engenharia de software
430	Paul Theroux	Paul Theroux sets off for Cape Town from Cairo -- the hard way. Travelling across bush and desert, down rivers and across lakes, and through country after country, Theroux visits some of the most beautiful landscapes on earth, and some of the most dangerous. It is a journey of discovery and of rediscovery -- of the unknown and the unexpected, but also of people and places he knew as a young and optimistic teacher forty years before. Safari in Swahili simply means "journey", and this is the ultimate safari. It is Theroux in his element -- a trip where chance encounter is everything, where departure and arrival times are an irrelevance, and where contentment can be found balancing on the top of a truck in the middle of nowhere.	http://books.google.co.za/books/content?id=VCfYpQBUt64C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780140281118	494	2003	Penguin UK	Overland from Cairo to Cape Town	Dark Star Safari
431	J R Ackerley	\N	\N	\N	157	1971	Pengiun group	An unusual storey of friendship and love	We think the world of you
432	Marguerite Duras	\N	\N	\N	123	1986	An imprint of harper collins	\N	The Lover
433	John Pomfret	A first-hand account of the remarkable transformation of China over the past forty years as seen through the life of an award-winning journalist and his four Chinese classmates As a twenty-year-old exchange student from Stanford University, John Pomfret spent a year at Nanjing University in China. His fellow classmates were among those who survived the twin tragedies of Mao's rule-the Great Leap Forward and the Cultural Revolution-and whose success in government and private industry today are shaping China's future. Pomfret went on to a career in journalism, spending the bulk of his time in China. After attending the twentieth reunion of his class, he decided to reacquaint himself with some of his classmates. Chinese Lessons is their story and his own. Beginning with Pomfret's first days in China, Chinese Lessons takes us back to the often torturous paths that brought together the Nanjing University History Class of 1982. One classmate's father was killed during the Cultural Revolution for the crime of being an intellectual; another classmate labored in the fields for years rather than agree to a Party-arranged marriage; a third was forced to publicly denounce and humiliate her father. As we watch Pomfret and his classmates begin to make their lives as adults, we see as never before the human cost and triumph of China's transition from near-feudal communism to first-world capitalism.	http://books.google.co.za/books/content?id=qSQrmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780805086645	336	2007-07-24	Holt Paperbacks	Five Classmates and the Story of the New China	Chinese Lessons
434	Arnette Wikes & Nicholas Nkosi	\N	\N	\N	350	1990	\N	Anything you need to speak and write	Complete Zulu
435	Gerald M. Weinberg	\N	\N	\N	284	1986	Dorset house plubishing	An organic problem solving	Becoming a technical leader
436	Mitchell Zuckoff	On May 13, 1945, twenty-four American servicemen and WACs boarded a transport plane for a sightseeing trip over “Shangri-La,” a beautiful and mysterious valley deep within the jungle-covered mountains of Dutch New Guinea. Unlike the peaceful Tibetan monks of James Hilton’s bestselling novel Lost Horizon, this Shangri-La was home to spear-carrying tribesmen, warriors rumored to be cannibals. But the pleasure tour became an unforgettable battle for survival when the plane crashed. Miraculously, three passengers pulled through. Margaret Hastings, barefoot and burned, had no choice but to wear her dead best friend’s shoes. John McCollom, grieving the death of his twin brother also aboard the plane, masked his grief with stoicism. Kenneth Decker, too, was severely burned and suffered a gaping head wound. Emotionally devastated, badly injured, and vulnerable to the hidden dangers of the jungle, the trio faced certain death unless they left the crash site. Caught between man-eating headhunters and enemy Japanese, the wounded passengers endured a harrowing hike down the mountainside—a journey into the unknown that would lead them straight into a primitive tribe of superstitious natives who had never before seen a white man—or woman. Drawn from interviews, declassified U.S. Army documents, personal photos and mementos, a survivor’s diary, a rescuer’s journal, and original film footage, Lost in Shangri-La recounts this incredible true-life adventure for the first time. Mitchell Zuckoff reveals how the determined trio—dehydrated, sick, and in pain—traversed the dense jungle to find help; how a brave band of paratroopers risked their own lives to save the survivors; and how a cowboy colonel attempted a previously untested rescue mission to get them out. By trekking into the New Guinea jungle, visiting remote villages, and rediscovering the crash site, Zuckoff also captures the contemporary natives’ remembrances of the long-ago day when strange creatures fell from the sky. A riveting work of narrative nonfiction that vividly brings to life an odyssey at times terrifying, enlightening, and comic, Lost in Shangri-La is a thrill ride from beginning to end.	http://books.google.co.za/books/content?id=3S5OpwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780061988356	432	2012-04-24	Harper Perennial	A True Story of Survival, Adventure, and the Most Incredible Rescue Mission of World War II	Lost in Shangri-La
437	Yiyun Li	A debut collection of short fiction by a Chinese-American author focuses on the role of fate in the lives of characters living both in China and in the United States, in such works as "Immortality," about a young man who finds a calling because of his resemblance to the dictator, and "Extra" in which a middle-aged woman befriends a young boy who has become an outcast in his rural school. Reader's Guide included. Reprint. 25,000 first printing.	http://books.google.co.za/books/content?id=9HedwMKS_PMC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780812973334	219	2006	Random House Incorporated	Stories	A Thousand Years of Good Prayers
438	Michelle Moran	While the tensions rise between the royalty and the people, Madame Tussaud is requested to tutor the King's sister in wax sculpting and must find a way for her family to survive the coming revolution. Reprint.	http://books.google.co.za/books/content?id=dkp8_mJfWWgC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780307588661	462	2011-12	Random House Digital, Inc.	A Novel of the French Revolution	Madame Tussaud
439	Richard Ford	\N	\N	\N	451	1944	little brown limited	\N	Independence Day
440	Johnny Steinberg	\N	\N	\N	259	2002	Jonathan ball publishers	\N	Midlands
441	Gil Courtemanche	\N	\N	\N	257	2003	cannogate book ltd	A heart of darkness for today	A Sunday in a pool in kigali
442	Sarah Vowell	\N	\N	\N	197	2002	\N	Droll,intelligent and persuasive	The partly cloudy patriot
443	Hilda Twongyeirwe	\N	\N	\N	188	2011	\N	\N	World of our own and other stories
444	Eusebius Mckaiser	\N	\N	\N	209	2012	\N	Debating race,sexuality and other uncomfortable South African topics	A bantu in my bathroom
445	Terry Bell	\N	\N	\N	385	2003	Verso	South Africa apartheid and truth	Unfinished Business
446	Billy Collins	Offers a collection of witty, emotional, and direct poems by the popular and critically acclaimed poet, including selections from his four previous collections and new works such as "Man Listening to a Disc," about headphones.	http://books.google.co.za/books/content?id=kdzOR4LI17gC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780375755194	171	2001	Random House Incorporated	New and Selected Poems	Sailing Alone Around the Room
447	Bryan Burrough,John Helyar	The battle for the control of RJR Nabisco in the Autumn of 1988, which became the largest and most dramatic corporate takeover in American history, sent shock-waves through the international business world and became a symbol of the greed, excess and egotism of the eighties. Barbarians at the Gate recounts this two-month battle with breathtaking pace and flair, and transports back to the Wall Street empire before it crumbled, through the boardroom doors, into the midnight meetings, the betrayals, the deal makers and publicity flaks, into a world where - as Nabisco CEO Ross Johnson put it - 'a few million dollars are lost in the sands of time'. Twenty years on, the world is once again recovering from a period of financial extravagance and irresponsibility. This revised edition brings the ultimate business thriller up to date for a new generation of readers.	http://books.google.co.za/books/content?id=wDKpRWgo59EC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780099545835	557	2010	Random House	The Fall of RJR Nabisco	Barbarians at the Gate
448	Mike Nicol	\N	\N	\N	333	2011	Umuzi	Run as fast as you can	Black Heart
449	Melvin Leiman	"A welcome construction of a materialist explanation fior the persistence of racism." Journal of Economic Literature --	http://books.google.co.za/books/content?id=rkwHih5WG9sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781608460663	421	2010	Haymarket Books	\N	The Political Economy of Racism
450	Mike Nicol	\N	\N	\N	318	2010	Umuzi	Assume nothing	Killer Country
451	Sarah Lotz	\N	\N	\N	277	2010	Penguin Group	\N	Tooth and nailed
453	Sade Adeniran	\N	images\\no-image.png	9789784894357	\N	2009	\N	\N	Imagine This
454	Riaan Manser	In a world first, almost incredibly, Riaan Manser rode a bicycle right around the continent of Africa. It took him two years, two months and fifteen days. He rode 36 500 kilometres through 34 different countries. In this book he tells the story of this epic journey. It is a story of blood, sweat, toil and tears. It is a story of triumph and occasional disaster. Of nights out under the stars, of searing heat and rain, of endless miles of Africa and of pressing on and never surrendering whatever the odds. Mostly however it is the story of one mans courage and determination to escape the mundane and see the continent he loves and feels so much a part of. It is the story of the human warmth he encounters, and occasionally human wrath and hostility as he crosses troubled countries and borders. Riaan Manser was born in 1973 in Pretoria. He grew up in Zululand and attended John Ross College in Richards Bay. After studying Human Resource Management he took a job in the medical industry. He has been a lifesaver, a surfer and a rugby player. When he took his bicycle to ride around Africa it was as a commitment to do something entirely extraordinary with his life. He is now an author and motivational speaker -- and is looking for his next adventure.	http://books.google.co.za/books/content?id=trEMPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781868423514	705	2009-06-01	Jonathan Ball Pub	\N	Around Africa on My Bicycle
455	Mark Bernstein	Tinderbox is a hypertext software tool for making, analyzing, and sharing notes.	http://books.google.co.za/books/content?id=nk3unQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781884511462	241	2006	Lulu.com	\N	The Tinderbox Way
456	Chris Wadman	Teddington is a man on the make and, after inadvertently delivering a busload of opposition politicians to Harares chief psychiatric facility, he is rewarded with a farm by top war veteran Hitler Jesus. Not far away at The William Westward Childrens Home, the director and his ginger-haired sidekick struggle to feed and clothe the multitude of orphans until they chance upon, of all things, a moth exporting business. When Teddingtons farm can no longer support his spiralling ambitions, he turns his attentions to the well-run and now prosperous orphanage. Enter bogus goblin-catcher and con-man extraordinaire Cuthbert Kambazuma. Does he have the power to keep Teddington and the Green Bombers at bay, or will the orphanage fall into their rapacious hands? Chris Wadman has written a novel of startling originality. In the best tradition of political satire, he combines humour and tragedy, and introduces a cast of characters that run riot across the near lunacy of the Zimbabwean landscape.	http://books.google.co.za/books/content?id=QeJGLwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781868424603	299	2012	Jonathan Ball Publishers	\N	The Unlikely Genius of Doctor Cuthbert Kambazuma
457	Mark Gevisser	This title is a story about home and exile. It is a story, too, of political intrigue; of a revolutionary movement struggling first to defeat and then to seduce a powerful and callous enemy.	http://books.google.co.za/books/content?id=BMYXYAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781868423507	892	2007	Palgrave MacMillan	The Dream Deferred	Thabo Mbeki
458	Isabel Wilkerson	Presents an epic history that covers the period from the end of World War I through the 1970s, chronicling the decades-long migration of African Americans from the South to the North and West through the stories of three individuals and their families.	http://books.google.co.za/books/content?id=JLAVmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780679763888	622	2011	Random House Digital, Inc.	The Epic Story of America's Great Migration	The Warmth of Other Suns
459	Donald Worster	\N	\N	\N	404	1977	Press syndicate	A history of ecological ideas	Natures economy
460	Mikki van Zyl	\N	\N	\N	368	2005	Kwela books	Shaping Sexuality	Performing queer
461	Anton Harber	"Ask most people about Diepsloot and they will talk of vigilante justice, political unrest, poverty and unemployment, a scene of recent political protests and xenophobic violence, a haven for criminals and undocumented foreigners in the middle of one of the country's wealthiest areas. Diepsloot is a microcosm - a post-apartheid settlement with about 250 000 crammed into five square miles, with more than its fair share of youth, foreigners and unemployed - a way of understanding the politics of this country on the ground, a place which presents so many of the questions facing this country. Why are people still living under these conditions? Why are the local politicians tearing each other apart? How do people survive? Do they still believe in democracy? This title takes you inside, walking the streets, meeting the people, probing the bitter local political battles, and asking what and area like Diepsloot portends for the future of South Africa. These are the stories not being told, these are the voices not being heard and these are the insights you can't get from parliament or Luthuli House"--Bookseller's website.	http://books.google.co.za/books/content?id=k_hyuQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781868424214	231	2011	Jonathan Ball Publishers	\N	Diepsloot
462	Gerald Garner	\N	\N	\N	288	2012	double g media	Space and places	Joburg Map
463	Mary and Tom Poppendieck	\N	\N	\N	276	July 2017	\N	from concept to cash	Implementing lean software development
464	Daryl Collins	In this work, the authors report on the yearlong 'financial diaries' of villagers and slum dwellers in Bangladesh, India, and South Africa. The stories of these families are often surprising and inspiring.	http://books.google.co.za/books/content?id=KcUcmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780691141480	283	2009	\N	How the World's Poor Live on $2 a Day	Portfolios of the Poor
465	Bryan Rostron	A cautionary tale about organized crime in modern South Africa, this thrilling mystery introduces unassuming archivist Macaulay Vogel, who is examining a recently discovered cache of old police archives. Sorting out the documents, Vogel is jolted when he comes upon a surveillance file about himself. It’s a terrible shock: he doesn’t recognize this person at all. Had he suffered a memory loss in his youth? Had someone stolen his identity? To find some answers, he seeks out old friends: a lover, former comrades, and even his nemesis, Boschard, an eerie former security policeman. At the same time Vogel is making his rounds, there are signs of growing racial anger over the excavation of a mysterious accumulation of bones in the center of Cape Town, which might be a secret human burial pit. Amidst the personal and civic confusion, Vogel begins to crack, despairing of his lapsed hopes and the lost love of a woman named Marda.	http://books.google.co.za/books/content?id=hRSw6MFGDb8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781770096486	186	2009	Jacana Media	A Novel	Black Petals
466	Malla Nunn	\N	\N	\N	392	2010	Picador Africa	\N	Let the dead lie
601	William Stallings	Nesta edição, William Stallings apresenta os fundamentos do processador e do design de computadores abordando questões relacionadas à memória, à E/S e a sistemas paralelos e trazendo exemplos que auxiliam nas escolhas necessárias durante a implementação de um sistema operacional.	images\\no-image.png	9788576055648	624	2010	\N	\N	Arquitetura e organização de computadores
467	Rebecca Skloot	In 1951, a young woman from Baltimore died of cancer. Her death changed medical science for ever. Her name was Henrietta Lacks, but scientists know her as HeLa. She was a poor Southern tobacco farmer whose cancer cells - taken without her knowledge - became one of the most important tools in medicine. The first 'immortal' human tissue grown in culture, HeLa cells were vital for developing the polio vaccine; uncovered secrets of cancer, viruses, and the effects of the atom bomb; helped lead to important advances like in vitro fertilization, cloning, and gene mapping; and have been bought and sold by the billions. Yet Henrietta herself remains virtually unknown, buried in an unmarked grave. Now Rebecca Skloot takes us on an extraordinary journey in search of Henrietta's story, from the 'coloured' ward of Johns Hopkins Hospital in the 1950s to East Baltimore today, where her children and grandchildren live, and struggle with the legacy of her cells. Full of warmth and questing intelligence, astonishing in scope and impossible to put down, The Immortal Life of Henrietta Lacks captures the beauty and drama of scientific discovery, as well as its human consequences.	images\\no-image.png	9780230750210	384	2010-04	\N	\N	The Immortal Life of Henrietta Lacks
468	Harlan Coben	\N	\N	\N	387	2012	Great Britain	Three people a chance to put things right	Stay Close
469	Chris Marais & Julienne du Toit	\N	\N	\N	224	2006	Struik publishers	Journey through Namibia	A drink of dry land
470	Ken Keable,Z. Pallo Jordan	The history of the antiapartheid movement brings up images of boycotts and public campaigns in the UK, but another story went on behind the scenes, in secret. This is the story of the foreign volunteers and their activities in South Africa, how they acted in defiance of the apartheid government and its police on the instructions of the African National Congress (ANC). From the transportation of weapons to the passage of ANC fighters into South Africa, this account describes the many risks taken by the volunteers—many of whom were young communists, Trotskyists, or independent socialists who traveled from the UK, Ireland, the Netherlands, and the United States—to join the cause.	http://books.google.co.za/books/content?id=WLwkKQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780850366556	348	2012	\N	The Secret War Against Apartheid	London Recruits
471	David Flanagan	A revised and updated edition offers comprehensive coverage of ECMAScript 5 (the new JavaScript language standard) and also the new APIs introduced in HTML5, with chapters on functions and classes completely rewritten and updated to match current best practices and a new chapter on language extensions and subsets. Original.	http://books.google.com.ec/books/content?id=4RChxt67lvwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596805524	1078	2011-04-25	"O'Reilly Media, Inc."	The Definitive Guide	JavaScript
472	Allan G. Johnson	This brief book is a groundbreaking tool for students and non-students alike to examine systems of privilege and difference in our society. Written in an accessible, conversational style, Johnson links theory with engaging examples in ways that enable readers to see the underlying nature and consequences of privilege and their connection to it. This extraordinarily successful book has been used across the country, both inside and outside the classroom, to shed light on issues of power and privilege. Allan Johnson has worked on issues of social inequality since receiving his Ph.D. in sociology from the University of Michigan in 1972. He has more than thirty years of teaching experience and is a frequent speaker on college and university campuses. Johnson has earned a reputation for writing that is exceptionally clear and explanations of complex ideas that are accessible to a broad audience.	http://books.google.com.ec/books/content?id=4XMpAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780072874891	184	2006	McGraw-Hill Humanities/Social Sciences/Languages	\N	Privilege, power, and difference
473	Karl Duuna	Cyber-criminals have your web applications in their crosshairs. They search for and exploit common security mistakes in your web application to steal user data. Learn how you can secure your Node.js applications, database and web server to avoid these security holes. Discover the primary attack vectors against web applications, and implement security best practices and effective countermeasures. Coding securely will make you a stronger web developer and analyst, and you'll protect your users. Bake security into your code from the start. See how to protect your Node.js applications at every point in the software development life cycle, from setting up the application environment to configuring the database and adding new functionality. You'll follow application security best practices and analyze common coding errors in applications as you work through the real-world scenarios in this book. Protect your database calls from database injection attacks and learn how to securely handle user authentication within your application. Configure your servers securely and build in proper access controls to protect both the web application and all the users using the service. Defend your application from denial of service attacks. Understand how malicious actors target coding flaws and lapses in programming logic to break in to web applications to steal information and disrupt operations. Work through examples illustrating security methods in Node.js. Learn defenses to protect user data flowing in and out of the application. By the end of the book, you'll understand the world of web application security, how to avoid building web applications that attackers consider an easy target, and how to increase your value as a programmer. What You Need: In this book we will be using mainly Node.js. The book covers the basics of JavaScript and Node.js. Since most Web applications have some kind of a database backend, examples in this book work with some of the more popular databases, including MySQL, MongoDB, and Redis.	http://books.google.com.ec/books/content?id=AofssgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781680500851	200	2016-01-07	Pragmatic Bookshelf	Keep Attackers Out and Users Happy	Secure Your Node.js Web Application
474	Daniel H. Pink	Challenges popular misconceptions to reveal what actually motivates people and how to harness that knowledge to promote personal and professional fulfillment.	http://books.google.com.ec/books/content?id=gfG6jwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781594484803	260	2011-04	Penguin	The Surprising Truth about what Motivates Us	Drive
475	Lyssa Adkins	The complete, practical guide to coaching agile teams: everything agile coaches, ScrumMasters, and project managers need to know! * *Deeply understand and fully master the role of the agile coach in helping teams produce truly remarkable products. *Move from 'command-and-control' project management to effective leadership for exceptional performance. *Practical tools and techniques that reflect Lyssa Adkins' immense experience as an agile coach, trainer, and project leader. More and more ScrumMasters and project managers are being asked to coach agile teams. But it's a challenging role. It requires new skills - as well as a subtle understanding of when to step in and when to step back. In Coaching Agile Teams, Lyssa Adkins gives agile coaches the insights they need to guide teams to extraordinary performance in a re-energized work environment. Adkins explains what works and what doesn't, offers practical action items, and demonstrates how to adapt skills from professional coaching and mentoring to the field of agile project management. Coverage includes: * *Migrating from 'command-and-control' project management to agile coaching. *Moving from agile team member or project leader to coach. *Understanding what it takes to be a great agile coach. *Creating an environment where high performance can emerge. *Changing your leadership style as your team evolves. *Staying actively engaged without dominating your team and stunting its growth.	http://books.google.com.ec/books/content?id=fgxzRAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321637703	315	2010	Addison-Wesley Professional	A Companion for ScrumMasters, Agile Coaches, and Project Managers in Transition	Coaching Agile Teams
476	Julian Assange,Jacob Appelbaum,Andy Müller-Maguhn,Jérémie Zimmermann	Visionary WikiLeaks founder Julian Assange brings together a small group of cutting-edge thinkers and activists to discuss whether electronic communications will emancipate or enslave. Among the topics addressed are: Do Facebook and Google constitute 'the greatest surveillance machine that ever existed,' perpetually tracking people's locations, contacts and lives? Far from being victims of that surveillance, are most people willing collaborators? Are there legitimate forms of surveillance? And does anyone have the ability to resist this tide?	http://books.google.com.ec/books/content?id=Ne-XMwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781939293008	186	2012	Or Books	Freedom and the Future of the Internet	Cypherpunks
477	Peter M. Senge	A pioneer in learning organizations offers five disciplines that reveal the link between far-flung causes and immediate effects and that can save organizations from becoming "learning disabled," helping them learn better and faster, in a revised edition of the best-selling business classic. Simultaneous. 20,000 first printing.	http://books.google.com.ec/books/content?id=Z1JAmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780385517256	445	2006	Crown Pub	The Art and Practice of the Learning Organization	The Fifth Discipline
478	Tom Rath	An updated version of the StrengthsFinder program developed by Gallup experts to help readers discover their distinct talents and strengths and how they can be translated into personal and career successes.	http://books.google.com.ec/books/content?id=gttDCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781595620156	175	2007-02-01	Simon and Schuster	\N	StrengthsFinder 2.0
479	Susan Fowler	Using recent studies in psychology, offers a proven model and action plan to help business leaders motivate their employees without depending on a system of external rewards but rather on one that will satisfy workers' needs for autonomy and competence.	http://books.google.com.ec/books/content?id=pQ1OngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781626561823	216	2014-09-30	Berrett-Koehler Pub	The New Science of Leading, Energizing, and Engaging	Why Motivating People Doesn't Work ... and What Does
480	Jay McGavren	Head First Ruby uses an engaging, active approach to learning that goes beyond dry, abstract explanations and reference manuals. This Head First guide teaches you the Ruby language in a concrete way that gets your neurons zapping and helps you become a Ruby rock star. You'll enter at Ruby's language basics and work through progressively advanced Ruby features such as blocks, objects, methods, classes, and regular expressions. As your Ruby skills grow, you'll tackle deep topics such as exception handling, modules, mixins, and metaprogramming.	http://books.google.com.ec/books/content?id=uqLyoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449372651	500	2015-04-25	O'Reilly Media	\N	Head First Ruby
481	Aaron Swartz	In his too-short life, Aaron Swartz reshaped the Internet and questioned our assumptions about intellectual property. His tragic suicide in 2013 at the age of 26 after being aggressively prosecuted for copyright infringement shocked the world. Here, for the first time in print, is revealed the quintessential Aaron Swartz: besides being a technical genius and a passionate activist, he was also an insightful, compelling and cutting essayist. He wrote thoughtfully and humorously about intellectual property, copyright and the architecture of the Internet.	http://books.google.com.ec/books/content?id=__HGoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781620970669	256	2015-09-01	The New Press	The Writings of Aaron Swartz	The Boy Who Could Change the World
482	Chapman, Ann Handley,Chapman, C.C.	"Acompanhei o trabalho de Ann e C.C. com profundo interesse por quase cinco anos, aprendendo com eles enquanto pavimentavam o caminho para uma nova forma de fazer marketing. Eles devem ter mais de mil posts em blogs, centenas de vídeos e dúzias de artigos compartilhados. Agora, em um só lugar, você pode acessar seus maiores sucessos" – David Meerman Scott, autor do best-seller As Novas Regras do Marketing e de Relações Públicas e Real-Time Marketing & PR. Para divulgar seus negócios, atingir novos clientes e criar uma fidelidade duradoura, você precisa de um elemento indispensável: CONTEÚDO. Seja através de pequenos tweets, que permitem a você criar relações no Twitter, postagens em blog que dão aos leitores conselhos importantes, e-books ou memorandos que chamam a atenção (sem serem entediantes), vídeos que mostram o lado humano de sua empresa, webinários interativos que proporcionam uma experiência de aprendizado valiosa, ou de podcasts que podem ser baixados e ouvidos na hora (e muito mais!)... Agora, mais do que nunca, o conteúdo faz as regras! Hoje, você tem uma oportunidade sem precedentes de criar um tesouro composto por conteúdo gratuito, fácil de usar e quase infinitamente personalizável, que conta a história de seu produto ou do seu negócio e o coloca como o especialista com quem as pessoas querem fechar negócio. Ann Handley e C. C. Chapman, escritores, oradores e líderes de pensamento em marketing de clientes como Coca-Cola, HBO e Verizon FiOS, mostram como utilizar todas as ferramentas existentes hoje para criar conteúdo que realmente converse com seu público. Eles mostram como: • Entender por que você está criando conteúdo – chegando ao centro de sua mensagem em uma linguagem prática e fácil de entender, definindo os objetivos de sua estratégia de conteúdo. • Explorar novas maneiras de integrar as palavras de busca ao seu conteúdo sem parecer algo forçado (ou técnico demais). • Escrever de maneira a comunicar seu serviço, produto ou mensagem de forma poderosa em diversas mídias Web. • Desenvolver um cronograma de publicação que permita a você criar diferentes tipos de conteúdo de uma vez. Com exemplos de empresas que usam o conteúdo de maneira eficaz e numa variedade de atividades, além de explicações fascinantes de como você pode abordar sua própria estratégia de conteúdo, Regras de Conteúdo é o guia essencial para você criar sua história, encontrar o equilíbrio entre humor e humanidade em seu conteúdo e construir um portfólio de valor que promoverá resultados a longo prazo. Como uma empresa supera o “papo-corporativo” e se torna uma criadora de conteúdo na web? De que modo você sabe o que dizer? Como pode criar histórias, vídeos e posts de blog que as pessoas irão adorar? Como pode cultivar fãs e aumentar sua devoção? Como pode energizar o seu negócio? Como sabe que está funcionando? Blogs, YouTube, Facebook, Twitter e outras plataformas online estão dando a empresas, como a sua, uma enorme oportunidade de se comunicar diretamente com seus atuais ou potenciais clientes. Sorte sua, pois em vez de fazer a divulgação de sua empresa ou de sua marca somente do jeito tradicional (incomodando as pessoas com propagandas, enchendo caixas de e-mail ou interrompendo jantares com uma ligação), agora você tem uma oportunidade gigantesca e sem precedentes. Crie um conteúdo bom e os clientes virão até você. Crie um conteúdo realmente bom e os clientes compartilharão e espalharão sua mensagem por você. Mais do que nunca, o conteúdo é o rei! O conteúdo é essencial! É claro que, como a maioria das coisas na vida, esta sorte (a oportunidade de fazer com que seus clientes contem a sua história por você) tem um porém. O conteúdo pode ser essencial, mas seu conteúdo online deve ser o tipo certo de conteúdo: focado no cliente. Autêntico. Atraente. Divertido. Surpreendente. Valioso. Interessante. Em outras palavras, você deve conquistar a atenção das pessoas.	http://books.google.com.br/books/content?id=TpCPAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788576087250	312	2012-08-21	Alta Books Editora		Regras de Conteúdo: Como Criar Excelentes Blogs, Podcasts, Vídeos, E-books, Webinários (e Muito Mais) que Atraiam Clientes e Impulsionem Seu Negócio
483	Geoffrey A. Moore	The bible for bringing cutting-edge products to larger markets—now revised and updated with new insights into the realities of high-tech marketing In Crossing the Chasm, Geoffrey A. Moore shows that in the Technology Adoption Life Cycle—which begins with innovators and moves to early adopters, early majority, late majority, and laggards—there is a vast chasm between the early adopters and the early majority. While early adopters are willing to sacrifice for the advantage of being first, the early majority waits until they know that the technology actually offers improvements in productivity. The challenge for innovators and marketers is to narrow this chasm and ultimately accelerate adoption across every segment. This third edition brings Moore's classic work up to date with dozens of new examples of successes and failures, new strategies for marketing in the digital world, and Moore's most current insights and findings. He also includes two new appendices, the first connecting the ideas in Crossing the Chasm to work subsequently published in his Inside the Tornado, and the second presenting his recent groundbreaking work for technology adoption models for high-tech consumer markets.	http://books.google.com.br/books/content?id=AqhCnQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780062292988	288	2014-01-28	HarperBusiness	Marketing and Selling Disruptive Products to Mainstream Customers	Crossing the Chasm, 3rd Edition
484	Jo-Ellan Dimitrius, Mark Mazzarella	\N	http://www.buscadaexcelencia.com.br/wp-content/uploads/2012/10/051.jpg	\N	321	2000	Alegro	Como entender e prever o comportamento humano	Decifrar pessoas
485	Robin Williams	\N	http://cdn.slidesharecdn.com/ss_thumbnails/designparaquemnodesigner-robinwilliams-130414211032-phpapp01-thumbnail-4.jpg?cb=1365974032	\N	138	1995	Callis Editora	Noções básicas de planejamento visual	Design para quem não é designer
486	David J. Anderson	"Kanban is becoming a popular way to visualize and limit work-in-progress in software development and information technology work. Teams around the world are adding Kanban around their existing processes to catalyze cultural change and deliver better business agility. David J. Anderson pioneered the Kanban Method. Hear how this happened and what you can do to succeed using Kanban."--Publisher's website.	http://books.google.com.br/books/content?id=RJ0VUkfUWZkC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780984521401	261	2010	Blue Hole Press	Successful Evolutionary Change for Your Technology Business	Kanban
524	MARCOS SERAFIM DE ANDRADE	Este livro apresenta diversas ferramentas de edição de fotografia e recursos para fazer seleções, retocar imagens, criar pinturas, além de uma variedade de aprimoramentos que o Photoshop CS5 pode oferecer. Detalham-se recursos para editar fotografias digitais, criar ou mesclar imagens e aplicar diversos efeitos por meio de filtros. Também apresenta ferramentas para alterar brilho, contraste e cores; preparar fotos para serem utilizadas por softwares de paginação ou de ilustração digital; além de outras utilidades para designers e produtores gráficos.	http://books.google.com.br/books/content?id=0Q_UkvxR0S8C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788539600472	506	\N	Senac	\N	Adobe Photoshop CS5
487	Daniel S. Vacanti	"When will it be done?" That is probably the first question your customers ask you once you start working on something for them. Think about how many times you have been asked that question. How many times have you ever actually been right? We can debate all we want whether this is a fair question to ask given the tremendous amount of uncertainty in knowledge work, but the truth of the matter is that our customers are going to inquire about completion time whether we like it or not. Which means we need to come up with an accurate way to answer them. The problem is that the forecasting tools that we currently utilize have made us ill-equipped to provide accurate answers to reasonable customer questions. Until now. Topics Include Why managing for flow is the best strategy for predictability-including an introduction to Little's Law and its implications for flow. A definition of the basic metrics of flow and how to properly visualize those metrics in analytics like Cumulative Flow Diagrams and Scatterplots. Why your process policies are the potentially the biggest reason that you are unpredictable.	http://books.google.com.br/books/content?id=wvceswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780986436338	314	2015-03-04	\N	An Introduction	Actionable Agile Metrics for Predictability
488	Helen	Este foi um presente da Helen (vocalista do grupo).\nAlém do grupo Poesia Samba Soul[1], a Helen participa do projeto Vegearte[2], um dos projetos do Instituto Favela da Paz[3]. Nos conhecemos no Impact Hub[4], durante a inception do Pixelated[5], onde a Helen e a sua equipe preparou deliciosos lanches para a nossa inception.\n[1] http://poesiasambasoul.com.br/\n[2] https://projetovegearte.wordpress.com/\n[3] https://faveladapaz.wordpress.com\n[4] http://saopaulo.impacthub.com.br/	http://poesiasambasoul.com.br/wp-content/uploads/2014/05/midia-indoor-tecnologia-caixa-embalagem-cd-dvd-computador-dado-digital-disco-filme-multimidia-bloco-pc-armazenamento-video-capa-1271082414329_615x470.jpg	\N	\N	\N	\N	\N	DVD Poesia Samba Soul 25 Anos Ao Vivo
489	Marc Stickdorn; Jakob Schneider	Pertence a Kelly Maia - maia.kell@gmail.com	http://loja.grupoa.com.br/uploads/imagensTitulo/20140702021553_STICKDORN_Isto_Design_Thinking_Servicos_M.jpg	\N	380	2014	Bookman	Fundamentos, Ferramentas, Casos	Isto é Design Thinking de Serviços
490	Ken Robinson	Neste livro, Ken Robinson procura oferecer uma visão sobre o que é criatividade no mundo educacional e dos negócios. Ele argumenta que pessoas e empresas no mundo todo lidam com problemas originados na escola e nas universidades e que muitas pessoas param de estudar sem ter um conhecimento verdadeiro das suas capacidades criativas. 'Libertando o poder criativo' tem como objetivo mostrar como e por que a maioria das pessoas perde a criatividade ao longo da vida escolar. E ao discutir o que pode ser feito para resolver o problema aborda, entre outras coisas, questões como os problemas encontrados no sistema educacional, o tipo de inteligência necessária para o sucesso acadêmico e profissional e como as pessoas podem resgatar e desenvolver o potencial criativo e inovador.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4292191&qld=90&l=370&a=-1	9788565482158	304	\N	\N	\N	Libertando O Poder Criativo
491	Jonacuff	Kelly Maia - maia.kell@gmail.com	http://ecx.images-amazon.com/images/I/519OcSeSGGL._SX331_BO1,204,203,200_.jpg	\N	\N	\N	\N	\N	start
492	DAVE GRAY,SUNNI BROWN,JAMES MACANUFO	Este livro inclui mais de 80 jogos para ajudar o leitor a derrubar as barreiras, comunicar-se melhor e gerar novas ideias, intuições e estratégias. Os autores identificaram ferramentas e técnicas de alguns profissionais cujas equipes colaboram e fazem grandes coisas acontecerem.\n\nKelly Maia maia.kell@gmail.com	http://ecx.images-amazon.com/images/I/51ZvqtqpLDL._SX379_BO1,204,203,200_.jpg	9788576086093	284	\N	\N	PARA MUDAR, INOVAR E QUEBRAR REGRAS	GAMESTORMING - JOGOS CORPORATIVOS
493	SOLANGE MUGLIA WECHSLER,DENISE BRAGOTTO,ZULA GARCIA GIGLIO	Ser criativo é uma exigência da sociedade para se obter sucesso em várias esferas da vida - no dia-a-dia, na empresa, na escola. Resultado do processo criativo, a inovação constitui um diferencial necessário para o crescimento de organizações e pessoas. Este livro abre um leque de olhares sobre esses dois fenômenos, em seus aspectos teóricos e práticos. O leitor encontrará reflexões, pesquisas e experiências criativas relacionadas à educação, às artes, ao trabalho e à psicologia, entre outros.\n\nKelly Maia  = maia.kell@gmail.com	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=2653829&qld=90&l=370&a=-1	9788530808860	206	2009	\N	\N	Da criatividade à inovação
494	Paulo Leminski	Ao conciliar a rigidez da construção formal e o mais genuíno coloquialismo, o autor praticou ao longo de sua vida um jogo de gato e rato com leitores e críticos. Se por um lado tinha pleno conhecimento do que se produzira de melhor na poesia - do Ocidente e do Oriente -, por outro parecia comprazer--se em mostrar um 'à vontade' que não raro beirava o improviso, dando um nó na cabeça dos mais conservadores. Pura artimanha de um poeta consciente e dotado das melhores ferramentas para escrever versos. Este volume percorre a trajetória poética completa do autor curitibano, mestre do verso lapidar e da astúcia.	http://img.saraivaconteudo.com.br/Clipart/images/Capa_toda_poesia(3).jpg	9788535922233	421	2013	\N	\N	Toda poesia
495	NELSON BARRIZZELLI,RUBENS DA COSTA SANTOS	Os recursos da Tecnologia da Informação (TI), sem dúvida alguma melhoram o desempenho das empresas, tornando-as mais competitivas. Esse livro aponta alguns caminhos sobre como essa melhoria pode acontecer e diversos setores da economia. Destinado a executivos e empresários interessados em conhecer mais de perto os recursos de conectividade disponíveis no mercado, apresenta como pressuposto básico o reconhecimento da importância das relações entre as empresas de uma mesma cadeia produtiva, e tem como objetivo fazer com que os executivos que tomam decisões compreendam os benefícios da ampliação da conectividade entre os elos dessa cadeia produtiva. O livro apresenta a executivos e empresários de diferentes setores da economia as vantagens de se construir um cenário de conectividade que inclua todos os elos da cadeia produtiva, com resultados significativos para os negócios.\n\nKelly Maia - maia.kell@gmail.com	http://shopfacil.vteximg.com.br/arquivos/ids/675755-1000-1000/Livro---Lucratividade-Pela-Inovacao_0.jpg	9788535217902	282	2006	\N	como eliminar ineficiências nos seus negócios e na cadeia de valor	Lucratividade pela inovação
496	JILL GEISLER	\N	http://funflyship.com.br/wp-content/uploads/imgext/foto-2015-08-25-23-18-55-779876053333282-funflyship.jpg	9788575429600	240	2013-08-15	\N	\N	COMO SE TORNAR UM OTIMO CHEFE
497	Fabbio Zugman	\N	http://thumbs.buscape.com.br/livros/empreendedores-esquecidos-um-guia-para-medicos-advogados-contadores-arquitetos-psicologos-e-ou-zugman-fabio-853524560x_200x200-PU6e7a8a50_1.jpg	\N	\N	\N	\N	\N	Empreendedores Esquecidos
498	Me Parió Revolução	Trata-se de um livro de poemas que se dispõe a ser arma e escudo na luta da população negra pela sua sobrevivência, contra o seu genocídio e a favor da esperança. É também um livro que destaca o sofrimento de nós que permanecemos, apesar das cabulas, candelárias e outras tantas chacinas (como a de Osasco/Guarulhos) incapazes de comover aos tantos cidadãos e cidadãs “de bem” deste nosso país.\nMas a obra chama a atenção também para o revolucionário gesto feminino de parir em um país com amplo histórico de tentativas de eliminação do nosso povo (desde a esterilização de mulheres até os assassinatos e o nosso superencarceramento). Nós que séculos antes abortávamos, praticávamos infanticídio para não gerarmos lucro ao sinhozim, agora pensamos mil vezes e oscilamos entre direito ao aborto e ao parir - ambos a contragosto dos patrões e do patriarcado -, rindo do paradoxo das “minorias”, em meio a um projeto de país que se queria todo branco até o ano limite de 2012.\nE, se não somos minorias, é exatamente porque “nas barrigas das meninas/ inda o sol ainda/ brilha – rancoroso carnaval”, é porque seguimos repondo os ricardos, os rivaldos, os soldados... a ira e a lira...\nPois que Zero a zero é, assim, uma obra que se propõe a ser pedagógica e, nesse sentido, recupera a função comunitária que a arte teve e ainda tem em sociedades não capitalistas. Além disso, sua própria aparência (fino, frágil, de capa com pouca gramatura) de pronto nos sugere estarmos diante de um panfleto. E sim, é um livro para ser panfletado. Para circular, para ser baixado e lido.\nPor fim, vale dizer que os poemas nos revelam também homenagens a nossos mortos, na medida em que toda semelhança com a realidade não é pura ficção: os nomes citados na obra existiram, existem nas nossas memórias. Eram amigos, parentes, vizinhos.\nAssim, além de cuidar da memória dos nossos, Zero a zero, com sua dureza macia, ilumina nossas ideias e direciona nossas lutas:\nZero a zero	http://www.geledes.org.br/wp-content/uploads/2016/04/c27f34_98aeca9272c04782a3033d13c08c65bc-150x150.jpg	\N	\N	\N	\N	15 poemas contra o genocídio da população negra.	Zero a zero
499	Me Parió Revolução	Trata-se de um livro de poemas que se dispõe a ser arma e escudo na luta da população negra pela sua sobrevivência, contra o seu genocídio e a favor da esperança. É também um livro que destaca o sofrimento de nós que permanecemos, apesar das cabulas, candelárias e outras tantas chacinas (como a de Osasco/Guarulhos) incapazes de comover aos tantos cidadãos e cidadãs “de bem” deste nosso país. Mas a obra chama a atenção também para o revolucionário gesto feminino de parir em um país com amplo histórico de tentativas de eliminação do nosso povo (desde a esterilização de mulheres até os assassinatos e o nosso superencarceramento). Nós que séculos antes abortávamos, praticávamos infanticídio para não gerarmos lucro ao sinhozim, agora pensamos mil vezes e oscilamos entre direito ao aborto e ao parir - ambos a contragosto dos patrões e do patriarcado -, rindo do paradoxo das “minorias”, em meio a um projeto de país que se queria todo branco até o ano limite de 2012. E, se não somos minorias, é exatamente porque “nas barrigas das meninas/ inda o sol ainda/ brilha – rancoroso carnaval”, é porque seguimos repondo os ricardos, os rivaldos, os soldados... a ira e a lira... Pois que Zero a zero é, assim, uma obra que se propõe a ser pedagógica e, nesse sentido, recupera a função comunitária que a arte teve e ainda tem em sociedades não capitalistas. Além disso, sua própria aparência (fino, frágil, de capa com pouca gramatura) de pronto nos sugere estarmos diante de um panfleto. E sim, é um livro para ser panfletado. Para circular, para ser baixado e lido. Por fim, vale dizer que os poemas nos revelam também homenagens a nossos mortos, na medida em que toda semelhança com a realidade não é pura ficção: os nomes citados na obra existiram, existem nas nossas memórias. Eram amigos, parentes, vizinhos. Assim, além de cuidar da memória dos nossos, Zero a zero, com sua dureza macia, ilumina nossas ideias e direciona nossas lutas: Zero a zero	http://www.geledes.org.br/wp-content/uploads/2016/04/c27f34_98aeca9272c04782a3033d13c08c65bc-150x150.jpg	\N	\N	\N	\N	15 poemas contra o genocídio da população negra.	Zero a zero
501	Danilo Sato	Entregar software em produção é um processo que tem se tornado cada vez mais difícil no departamento de TI de diversas empresas. Ciclos longos de teste e divisões entre as equipes de desenvolvimento e de operações são alguns dos fatores que contribuem para este problema. Mesmo equipes ágeis que produzem software entregável ao final de cada iteração sofrem para chegar em produção quando encontram estas barreiras.\nDevOps é um movimento cultural e profissional que está tentando quebrar essas barreiras. Com o foco em automação, colaboração, compartilhamento de ferramentas e de conhecimento, DevOps está mostrando que desenvolvedores e engenheiros de sistema têm muito o que aprender uns com os outros.\nNeste livro, mostramos como implementar práticas de DevOps e Entrega Contínua para aumentar a frequência de deploys na sua empresa, ao mesmo tempo aumentando a estabilidade e robustez do sistema em produção. Você vai aprender como automatizar o build e deploy de uma aplicação web, como automatizar o gerenciamento da infraestrutura, como monitorar o sistema em produção, como evoluir a arquitetura e migrá-la para a nuvem, além de conhecer diversas ferramentas que você pode aplicar no seu trabalho.	https://cdn.shopify.com/s/files/1/0155/7645/products/devops-featured_large.png?v=1411489207	\N	257	April 16, 2014	Casa do Código	\N	DevOps na prática
502	Ken Collier	How to bring new agility to data warehousing, deliver valuable BI features earlier, and dramatically reduce project risk • •Agile techniques for meeting customer needs, deadlines, budgets, quality expectations, and ROI goals. •How to continuously deliver production-ready BI capabilities that deliver real value to users. •By Dr. Kenneth Collier, one of the world's most experienced data warehousing consultants. •For every technical and business professional involved in data warehousing projects. Data warehousing projects often fail to meet user needs, delivery deadlines, budget constraints, quality requirements, and/or ROI goals. The root causes of these failures can be mitigated, managed, or even prevented by a development process that exposes features and capabilities to users early, and effectively adapts to their feedback. In Agile Analytics, one of the world's leading data warehouse experts shows how to make this happen. Drawing on his experience with dozens of data warehouse projects, Dr. Kenneth Collier shows how to continuously deliver customer-valued features that are of superior quality and are 'production ready.' Technical and business professionals will learn how to consistently deliver BI systems that are more tightly aligned with business requirements - thereby dramatically reducing the risk of project failure.	http://books.google.com.br/books/content?id=YMR3HynGQjUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321504814	329	2012	Addison-Wesley	A Value-driven Approach to Business Intelligence and Data Warehousing	Agile Analytics
503	A. L. ANDERSON,RYAN BENEDETTI	\N	http://akamaicovers.oreilly.com/images/9780596521561/lrg.jpg	9788576084488	528	\N	\N	\N	USE A CABEÇA! - REDE DE COMPUTADORES
504	Kathy Sierra,Bert Bates	'Use a cabeça! - Java' é uma experiência de aprendizado em programação orientada a objetos (OO) e Java. Projetado de acordo com princípios de aprendizado mentalmente amigáveis, este livro procura mostrar desde aspectos considerados básicos da linguagem a tópicos avançados que incluem segmentos, soquetes de rede e programação distribuída. Alguns conteúdos - A linguagem Java; Desenvolvimento orientado a objetos; Criação, teste e implantação de aplicativos; Uso da biblioteca do API Java; Manipulação de exceções; Uso de vários segmentos; Programação de GUI com o Swing; Rede com RMI e soquetes; Conjuntos e tipos genéricos.	images\\no-image.png	9788576081739	470	2007	\N	Java	Use a cabeça!
505	Paulo Freire	\N	http://ecx.images-amazon.com/images/I/71GStuZDaLL.jpg	\N	\N	\N	\N	\N	Pedagogia do Oprimido
506	Paulo Freire	Neste livro, Paulo Freire procura apresentar uma reflexão sobre a relação entre educadores e educandos, elaborando propostas de práticas pedagógicas, orientadas por uma ética universal, que visam a desenvolver a autonomia, a capacidade crítica e a valorização da cultura e conhecimentos empíricos de uns e outros. Criando os fundamentos para a implementação e consolidação desse diálogo político-pedagógico e sintetizando diferentes questões para a formação dos educadores e para uma prática educativo-progressiva, Paulo Freire estabelece relações e condições para a tarefa da educação.	http://mlb-s1-p.mlstatic.com/pedagogia-da-autonomia-novo-280401-MLB20322314136_062015-O.jpg	9788577531639	143	2004	\N	\N	Pedagogia da autonomia
507	Eduardo Galeano	\N	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=3095353&qld=90&l=370&a=-1	\N	\N	\N	\N	\N	As veias abertas da America Latina
508	Pietra Diwan	No mundo moderno temos o dever de ser belos, magros, ter cabelos lisos e parecer 'naturais' diante do espelho, de nós mesmos, diante dos outros. E, para conquistar mais saúde, juventude e beleza, os caminhos científicos e industriais não cessam de se multiplicar. O Brasil atualmente é o segundo país no mundo em número de cirurgias plásticas, só perde para os Estados Unidos. Homens e mulheres em busca da perfeição corporal são cortados, costurados, espetados por agulhas, queimados por raios laser, besuntados e massageados com cremes. No entanto, essa busca por se construir o 'super-homem' e perseguir uma suposta perfeição já levou diversas nações a atitudes extremadas. Assim, evoluir a cada geração, se superar, ser saudável, ser belo, ser forte. A democratização da beleza, para alguns; ou a vulgarização dos corpos, para outros; todas essas afirmativas estão contidas na concepção de eugenia. Com status de disciplina científica, a eugenia pretendeu implantar um método de seleção humana baseado em premissas biológicas. E isso através da ciência que sempre se dizia neutra e analítica. Em 'Raça pura - uma história da eugenia no Brasil e no mundo', Pietra Diwan - experiente historiadora e pesquisadora do tema - abre a 'caixa preta' da eugenia e desata os nós da rede de relações que compõe a empreitada, seus adeptos, incentivadores e financiadores. Como um país tão miscigenado pôde investir na eugenia, uma idéia que paradoxalmente vai de encontro com a formação racial do Brasil? Quão eugenista é a nossa história? Com narrativa leve e envolvente, a autora mostra como o eugenismo constitui (e é constituído) de uma história que envolveu disputas entre médicos e políticos, entre profissionais de saúde, e entre estes e a Igreja, o Estado e a indústria.	http://books.google.com.br/books/content?id=c-Jv9YxS96QC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788572443722	158	2007	Editora Contexto	uma história da eugenia no Brasil e no mundo	Raça pura
509	Lilia M. Schwarcz e Heloisa M. Starling	\N	http://statics.livrariacultura.net.br/products/capas_lg/002/42876002.jpg	\N	\N	\N	\N	Uma biografia	Brasil
510	James Petras,Henry Veltmeyer	Recent changes in the global economy have brought about a massively devastating pillage of resources in the developing world by multinational corporations, as well as states with energy and food security concerns. These developments have also brought about a major change in the form taken by imperialism (actions taken by the state to advance the interests of the dominant capitalist class). Extractive Imperialism in the Americas explores the changing face of US imperialism in the regional context of the Americas, a major stage of this system in crisis.	http://books.google.com.ec/books/content?id=ycmvoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781608464944	321	2016-03-01	Studies in Critical Social Science	Capitalism's New Frontier	Extractive Imperialism in the Americas
511	Frantz Fanon	Los textos políticos de Frantz Fanon reunidos en este volumen, abarcan el periodo más activo de su vida -de 1952 a 1961, fecha de su muerte-. Reagrupados por orden cronológico, estos escritos se han organizado en cinco partes, que hablan del colonizado, el racismo y la cultura de Argelia, de la liberación de África y de la unidad africana.	http://books.google.com.br/books/content?id=-KgTAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9789681664299	319	2001	Fondo de Cultura Economica USA	\N	Los condenados de la tierra
512	Ailton Krenak e Sergio Cohn	Ailton Krenak é um dos maiores líderes políticos e intelectuais surgidos durante o grande despertar dos povos indígenas no Brasil, ocorrido a partir do final dos anos 1970. A sua atuação tem sido fundamental para a luta pelos direitos indígenas e a criação de iniciativas como a União das Nações Indígenas e a Aliança dos Povos da Floresta. Ailton é um pensador acurado e original das relações entre as culturas ameríndias e a sociedade brasileira, criando reflexões provocativas e de largo alcance, como as presentes nas entrevistas e depoimentos contidos nesse volume da Coleção Encontros.	http://d3vdsoeghm4gc3.cloudfront.net/Custom/Content/Products/51/84/518449_ailton-krenak-colecao-encontros-691018_M1.jpg	\N	\N	\N	\N	Encontros	Ailton Krenak
513	Sheila Heen e Douglas Stone	Recebemos feedback todos os dias, de amigos, familiares, chefes e até estranhos. Sabemos que ele é essencial para o desenvolvimento profissional e para manter as relações saudáveis, mas nós frequentemente o rejeitamos. Queremos aprender e crescer, mas também buscamos ser aceitos e respeitados. Obrigado pelo feedback aborda essa tensão diretamente. Douglas Stone e Sheila Heen argumentam que, embora o mundo dos negócios gaste bilhões de dólares todo ano ensinando às pessoas como dar feedback de modo mais efetivo, estamos operando no polo errado: o mais inteligente é educar os receptores — tanto no trabalho quanto nas relações pessoais. São eles, afinal, que interpretam o que estão ouvindo e decidem se e como mudar. De maneira bem-humorada e lúcida, os autores nos ensinam a aceitar a enxurrada de comentários, avaliações e conselhos não solicitados com interesse e leveza e nos ajudam a aprender efetivamente com qualquer pessoa. Este livro está destinado a se tornar um clássico no mundo da liderança, comportamento organizacional e educação.	http://d3vdsoeghm4gc3.cloudfront.net/Custom/Content/Products/56/92/569277_obrigado-pelo-feedback-714304_l1_635881875205952000.jpg	\N	\N	\N	\N	a Ciência e a Arte de Receber Bem o Retorno de Chefes, Colegas, Familiares e Amigos	Obrigado Pelo Feedback
514	Kim Moody	A thorough collection of inspiring and informed essays on applied Marxist theory and the future of labor unions.	http://books.google.com.br/books/content?id=DUoaBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781608463268	326	2014-04-29	Haymarket Books	Essays on Working-Class Organization and Strategy in the United States	In Solidarity
515	Sandra Almada	\N	http://iacom.s8.com.br/produtos/01/00/item/6971/1/6971100G1.jpg	\N	\N	\N	Selo Negro Edições	Retratos do Brasil Negro	Abdias Nacimento
516	BRENÉ BROWN	\N	http://statics.livrariacultura.net.br/products/capas_lg/849/42140849.jpg	\N	206	2013	SEXTANTE	Como aceitar a própria vulnerabilidade, vencer a vergonha e ousar ser quem você é pode levá-lo a uma vida mais plena	A CORAGEM DE SER IMPERFEITO
517	Maria Aparecida Da Silva Bento, Marly De Jesus  Silveira, Simone Gibran Nogueira	O racismo institucional, a pertença religiosa, a literatura, os processos de exclusão de crianças e adolescentes quilombolas e a complexidade do corpo negro são temas tratados nesta publicação de forma articulada, com a dimensão identitária das relações raciais, por diferentes autoras e autores, por meio de relatos de experiências profissionais, estudos teóricos e ensaio. O objetivo é focalizar a complexidade da identidade racial de brancos e negros, afetada diretamente pelo sistema de relações raciais vigente, em que a desigualdade e a exclusão racial são agudas, e brancos e negros são colocados em lugares simbólicos e concretos extremamente diferentes, não raro antagônicos, muitas vezes vendo a si próprios e ao outro de maneira distorcida, o que favorece o tensionamento entre os grupos, bem como a permanência do quadro das desigualdades. A compreensão da dimensão subjetiva e de seus meandros pode propiciar uma leitura mais profunda do contexto racial em que estão inseridos os diferentes grupos, criando condições para a construção de uma sociedade mais igualitária e democrática.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=8381313&qld=90&l=430&a=-1	\N	\N	\N	\N	Contribuições Para A Psicologia Social No Brasil	Identidade, Branquitude e Negritude
518	Susan Cain,Ana Carolina Bento Ribeiro	Com argumentos que buscam ser cativantes, uma extensa pesquisa e repleto de histórias reais, 'O poder dos quietos' mostra como os tímidos e introvertidos são subvalorizados, e como pode-se perder com isso. Partindo da ascensão do Ideal da Extroversão no século XX, Susan Cain questiona os valores dominantes no mundo empresarial moderno, no qual a colaboração forçada pode bloquear o caminho da inovação e no qual o potencial de liderança dos introvertidos é frequentemente negligenciado. A autora apresenta histórias de introvertidos de sucesso e procura oferecer conselhos sobre como os tímidos podem tirar vantagem das suas características.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4055432&qld=90&l=430&a=-1	9788522013265	334	2012	\N	\N	O poder dos quietos
519	Miguel Nicolelis	\N	http://www.companhiadasletras.com.br/images/livros/12715_gg.jpg	\N	\N	\N	\N	A nova neurociência que une máquina e cérebro - e como ela pode mudar nossas vidas	Muito além do nosso eu
520	Fernando Morais	\N	http://www.companhiadasletras.com.br/images/livros/12822_gg.jpg	\N	\N	\N	\N	A história dos agentes secretos infiltrados por Cuba em organizações de extrema direita dos Estados Unidos	Os últimos soldados da guerra fria
521	Rob Orsini	\N	\N	\N	\N	\N	O'Reilly	Recipes for Rapid Web Development in Ruby	Rails Cookbook
522	MAURICIO SAMY SILVA	Este livro, na primeira parte, apresenta a biblioteca e um estudo da sintaxe e emprego dos seletores e comandos 'jQuery', desenvolvendo scripts de exemplo para cada um deles, que podem ser examinados ao vivo em arquivos disponíveis para download no site do livro. Na segunda parte, são desenvolvidos vários scripts de emprego real, todos comentados e disponíveis para download.	http://books.google.com.br/books/content?id=VafU5WLalwwC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788575221785	432	\N	Novatec Editora	\N	JQUERY - A BIBLIOTECA DO PROGRAMADOR JAVASCRIPT
523	Katherine Sierra,Bert Bates	The Best Fully Integrated Study System Available--Written by the Lead Developers of Exam 310-065 With hundreds of practice questions and hands-on exercises, SCJP Sun Certified Programmer for Java 6 Study Guide covers what you need to know--and shows you how to prepare--for this challenging exam. 100% complete coverage of all official objectives for exam 310-065 Exam Objective Highlights in every chapter point out certification objectives to ensure you're focused on passing the exam Exam Watch sections in every chapter highlight key exam topics covered Simulated exam questions match the format, tone, topics, and difficulty of the real exam Covers all SCJP exam topics, including: Declarations and Access Control · Object Orientation · Assignments · Operators · Flow Control, Exceptions, and Assertions · Strings, I/O, Formatting, and Parsing · Generics and Collections · Inner Classes · Threads · Development CD-ROM includes: Complete MasterExam practice testing engine, featuring: Two full practice exams; Detailed answers with explanations; Score Report performance assessment tool Electronic book for studying on the go Bonus coverage of the SCJD exam included! Bonus downloadable MasterExam practice test with free online registration.	http://books.google.com.br/books/content?id=i_VOjgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780071591065	851	2008-06-24	Mcgraw-hill	Exam 310-065	SCJP Sun Certified Programmer for Java 6 Study Guide : Exam 310-065
525	Elisabeth Freeman,Eric Freeman	Tired of reading HTML books that only make sense after you're an expert? Then it's about time you picked up "Head First HTML with CSS & XHTML and really learned HTML. You want to learn HTML so you can finally create those Web pages you've always wanted, so you can communicate more effectively with friends, family, fans and fanatic customers. You also want to do it right so you can actually maintain and expand your Web pages over time, and so your Web pages work in all the browsers and mobile devices out there. Oh, and if you've never heard of CSS, that's okay - we won't tell anyone you're still partying like it's 1999 - but if you're going to create Web pages in the 21st century then you'll want to know and understand CSS. Learn the real secrets of creating Web pages, and why everything your boss told you about HTML tables is probably wrong (and what to do instead). Most importantly, hold your own with your co-worker (and impress cocktail party guests) when he casually mentions how his HTML is now strict, and his CSS is in an external style sheet. With "Head First HTML with CSS & XHTML, you'll avoid the embarrassment of thinking Web-safe colors still matter, and the foolishness of slipping a font tag into your pages. Best of all, you'll learn HTML and CSS in a way that won't put you to sleep. If you've read a Head First book, you know what to expect: a visually-rich format designed for the way your brain works. Using the latest research in neurobiology, cognitive science, and learning theory, this book will load HTML, CSS, and XHTML into your brain in a way that sticks. So what are you waiting for? Leave those other dusty books behind and come join us in Webville.Your tour is about to begin. "Elegant design is at the core of every chapter here, each concept conveyed with equal doses of pragmatism and wit." --Ken Goldstein, Executive Vice President, Disney Online "This book is a thoroughly modern introduction to forward-looking practices in web page markup and presentation." --Danny Goodman, author of "Dynamic HTML: The Definitive Guide "What used to be a long trial and error learning process has now been reduced neatly into an engaging paperback." --Mike Davidson, CEO, Newsvine, Inc. "I love "Head First HTML with CSS & XHTML--it teaches you everything you need to learn in a 'fun coated' format!" --Sally Applin, UI Designer and Artist "I haven't had as much fun reading a book (other than Harry Potter) in years. And your book finally helped me break out of my hapless so-last-century way of creating web pages." --Professor David M. Arnow, Department of Computer and Information Science, Brooklyn College "If you've ever had a family member who wanted you to design a website for them, buy them Head First HTML with CSS and XHTML. If you've ever asked a family member to design you a web site, buy this book. If you've ever bought an HTML book and ended up using it to level your desk, or for kindling on a cold winter day, buy this book. This is the book you've been waiting for. This is the learning system you've been waiting for." --Warren Kelly, Blogcritics.org	http://books.google.com.br/books/content?id=7sDQPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781600330049	504	2005-12	Oreilly & Associates Incorporated	\N	Head First HTML with CSS and XHTML
602	Wagner Bill	\N	http://books.google.com.br/books/content?id=jJ6NNF3aSssC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788131754979	352	2010-09-01	Pearson Education India	\N	Effective C# (Covers C# 4.0): 50 Specific Ways To Improve Your C#, 2/E
527	Ricardo Semler	Semler turned his family's business, the aging Semco corporation of Brazil, into the most revolutionary business success story of our time. By eliminating uneeded layers of management and allowing employees unprecedented democracy in the workplace, he created a company that challenged the old ways and blazed a path to success in an uncertain economy.	http://books.google.com.br/books/content?id=zzm8lLrTq6sC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780712678865	316	2001	Random House	The Success Story Behind the World's Most Unusual Workplace	Maverick!
528	Michael Bolin	None of the JavaScript libraries today has a more impressive track record than Google Closure, the tool suite used for Gmail, Google Docs, and Google Maps.Closure: The Definitive Guidehas precisely what you need to get started with these tools, including valuable information not available publicly anywhere else. Written by Michael Bolin -- a former Google engineer who made many contributions to Closure -- this guide explains the library's design and offers code examples that illustrate best practices. You'll also learn how to minify your JavaScript code with the compiler, and learn why the combination of the library and the compiler is what sets this toolkit apart from other JavaScript libraries. Discover several ways to use the compiler as part of your build process Learn about Closure type expressions, primitives, and common utilities Understand how classes and class-based-inheritance are emulated in Closure Get the best performance from Closure by learning about event management Learn the life-cycle of a UI component Get best practices for using Closure Templates Test and debug your JavaScript code	http://books.google.com.br/books/content?id=u7CbAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449381875	564	2010-09-15	"O'Reilly Media, Inc."	The Definitive Guide	Closure
529	James A. Highsmith,Jim Highsmith	The best-practice guide to managing projects in agile environments - updated with new techniques for larger projects * *Extensively revised and updated to reflect the lessons and experiences of the past five years. *Updates Jim Highsmith's indispensable APM Framework to offer complete guidance on portfolio governance, project management, iteration management, and technical practices. *Presents new metrics demonstrating the value of agile methods, plus expanded advice on when they will and won't work. Project management must move faster, become more flexible, and become far more responsive to customers. Agile Project Management (APM) makes this possible, offering principles and practices that help project managers to catch up with the realities of modern product development. World-renowned agile pioneer Jim Highsmith has thoroughly updated his classic guide to APM, extending and refining it to support even the largest projects and organizations. Writing for project leaders, managers, and executives at all levels, Highsmith integrates the best project management, manufacturing, and software development practices into an overall framework designed to support unprecedented speed and mobility. Among the many topics added in this new edition: incorporating agile values, scaling agile projects, release planning, portfolio governance, and enhancing organizational agility. Project and business leaders will especially appreciate Highsmith's new coverage of promoting agility through performance measurements based on value, quality, and constraints. Agile Project Management, 2/e, also presents recent metrics demonstrating the true benefits of agile methods, as well as expanded advice on when agile methods will work in project management, and when they won't.	http://books.google.com.br/books/content?id=BcWPmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321658395	392	2010	Addison-Wesley Professional	Creating Innovative Products	Agile Project Management
530	David A. Vise,Mark Malseed	'Google - A história do negócio de mídia e tecnologia de maior sucesso dos nossos tempos' traz a biografia da empresa que revolucionou o acesso à informação e transformou-se em ferramenta indispensável para qualquer pesquisa na Internet. Da afinidade inte	images\\no-image.png	9788532521491	349	2007	\N	a história do negócio de mídia e tecnologia de maior sucesso dos nossos tempos	Google
531	Eric Sink	Eric.Weblog() has 50,000 regular users; consistently included on the list of the most popular feeds in bloglines.com Sink founded a company that was named to the Inc 500 Book explains tough topics like marketing and hiring, in terms that programmers understand—all sprinkled with a touch of humor	http://books.google.com.br/books/content?id=h5IQuengOGIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781430201434	320	2006-12-20	Apress	\N	Eric Sink on the Business of Software
532	Yuri Marx P. Gomes	Neste livro, você vai encontrar o que há no mundo do desenvolvimento Java para a Web. Terá acesso a uma aplicação completa em JSF (criado visualmente com o novo Netbeans 6). Verá como utilizar os padrões de projeto mais utilizados do mercado (Facades e DAOs) para a Web, com exemplos do mundo real. Você vai ver na prática como utilizar o Spring para controlar o ciclo de vida de seus objetos, totalmente integrado a uma aplicação JSF e ao mecanismo de persistência padrão do mundo Java, o JPA (implementado via Hibernate). Poderá utilizar algumas das principais classes utilitárias do Spring. Para completar, o livro abrange a nova API de persistência padrão do Java, o JPA (Java Persistence API), implementado pelo Hibernate.	images\\no-image.png	9788573936575	175	2008	\N	de universitários a desenvolvedores	Java na Web com JSF, Spring, Hibernate e Netbeans 6
533	JESSICA LIVINGSTON	O livro é composto de entrevistas com as pessoas que imaginaram, desenvolveram e levaram ao mercado alguns dos produtos mais badalados de nosso cotidiano.	http://books.google.com.br/books/content?id=VAzAWo_YFc0C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788522009947	288	\N	Agir Editora	FIREFOX E LYCOS CONTAM COMO NASCERAM SUAS EMPRESAS	STARTUP - FUNDADORES DA APPLE, DO YAHOO!, HOTMAIL,
534	Luciana Moreira Ronconi	\N	\N	\N	\N	\N	Senac	\N	Access 200
535	JASON PRICE	Guia oficial da Oracle Press, este livro mostra como escrever instruções SQL e programas PL/SQL de alto desempenho e com recursos avançados. Escrita por Jason Price, a obra aborda os últimos recursos e ferramentas SQL, técnicas de otimização de desempenho, consultas avançadas, suporte à Java e XML.	images\\no-image.png	9788577803354	684	\N	Bookman	\N	Oracle Database 11G SQL: Domine SQL e PL/SQL no banco de dados Oracle
536	Paolo Perrotta	Provides information on metaprogramming concepts to help write productive Ruby code.	http://books.google.com.br/books/content?id=86YGQQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356470	261	2010-01	\N	Program Like the Ruby Pros	Metaprogramming Ruby
537	Roger S. Pressman	Esta obra busca ser um guia para a disciplina de engenharia em maturação. Contém 32 capítulos que foram estruturados em cinco partes - Processo de Software, Modelagem, Gestão da Qualidade, Gerenciamento de Projetos de Software e Tópicos Avançados.	images\\no-image.png	9788563308337	780	2011	McGraw Hill Brasil	\N	Engenharia de Software
538	David Flanagan,Joao Eduardo Nobrega Tortello	Esta obra procura fornecer uma descrição da linguagem JavaScript básica e das APIs JavaScript definidas pelos navegadores Web. Abrange ECMAScript 5 e HTML5 e traz capítulos que documentam jQuery e JavaScript do lado do servidor.	images\\no-image.png	9788565837194	1080	\N	\N	\N	Javascript - O Guia Definitivo
539	Wallace Wang	\N	https://cache.skoob.com.br/local/images//1OGTl20yTsDb3jbYLTYcCQDAPqU=/202x312/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/68209/VISUAL_BASIC_6_1260758187B.jpg	\N	568	1999	Editora Campus	\N	Série para Dummies: Visual Basic 6
540	Ed Burnette	\N	\N	\N	\N	\N	O'reilly	Pocket Guide	Eclipse IDE
541	Ian Sommerville	Antigamente o software era destinado principalmente a mainframes, e os computadores pessoais ainda não eram tão populares como hoje. Jamais se imaginou o quanto eles invadiriam a vida das pessoas nem quanto eles mudariam o mundo. A capacidade de os engenheiros de software criarem sistemas grandes e complexos certamente aumentou na era da computação pessoal. Nos últimos anos, os avanços mais importantes na engenharia de software foram o aparecimento da UML como padrão para a descrição de sistemas orientados a objetos e o desenvolvimento de métodos ágeis, como a extreme programming. 'Engenharia de Software' procura capacitar o profissional a se aprofundar em todos os conceitos, métodos e processos relacionados a essa área de conhecimento, incluindo especificação, projeto, desenvolvimento, verificação, validação e gerenciamento. Seções mais detalhadas, abordagem ampliada de antigos e novos conceitos e novos exercícios permitem a professores e alunos, e também a engenheiros de software, uma melhor escolha das técnicas e métodos que constituirão sua estratégia de desenvolvimento.	images\\no-image.png	9788588639287	552	2008	\N	\N	Engenharia de software
542	Bryan Basham,Kathy Sierra,Bert Bates	Opens with a chapter discussing the details of the SCWCD certification exam and process, then offers an overview of web applications as well as the servlet and JSP technologies, and, finally, covers each of the exam's thirteen objectives. Original. (All Users)	http://books.google.com.br/books/content?id=HwBEBrMIh5IC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596005405	854	2004	"O'Reilly Media, Inc."	Passing the Sun Certified Web Component Developer Exam	Head First Servlets and JSP
543	Lorin Hochstein	\N	\N	\N	\N	\N	O'Reilly	Atuomating Configuration Management and Deployment The Easy Way	Ansible Up & Running
544	Obie Fernandez, Matt Bauer, David A. Black, Trotter Cashion, Matt Pelletier, Jodi Showers	\N	\N	\N	\N	\N	\N	\N	The Rails Way
545	JON SKEET,ANGELO GIUSEPPE MEIRA COSTA	Esta obra apresenta conceitos de C#, tais como as expressões lambda e a tipificação implícita, que visam tornar a linguagem flexível. Usando a Consulta Integrada à Linguagem (LINQ, na sigla em inglês) o leitor pode interagir com dados, diretamente do C#. Abordando o domínio destas funcionalidades, a obra tem por objetivo tornar o leitor um desenvolvedor C#. Sumário - Parte 1 - Preparando-se para a Jornada; Capítulo 1 - A Face da Mudança do Desenvolvimento em C#; Capítulo 2 - Fundamentos Centrais - Construindo sobre o C# 1; Parte 2 - O C# 2 - Resolvendo os Problemas do C# 1; Capítulo 3 - Tipificação Parametrizada com os Genéricos; Capítulo 4 - Dizendo Nada com os Tipos Anuláveis; Capítulo 5 - Delegados com Rastreamento Rápido; Capítulo 6 - Implementando Iteradores do Jeito Fácil; Capítulo 7 - Concluindo o C# 2 - As Funcionalidades Finais; Parte 3 - O C# 3 - Revolucionando a Forma como nós Codificamos; Capítulo 8 - Cortando o Supérfluo com um Compilador Inteligente; Capítulo 9 - Expressões Lambda e Árvores de Expressões; Capítulo 10 - Métodos de Extensão; Capítulo 11 - As Expressões de Consulta e o LINQ para Objetos; Capítulo 12 - O LINQ além das coleções; Capítulo 13 - Código Elegante na Nova Era; Apêndice e Índice Remissivo.	images\\no-image.png	9788573939132	616	\N	\N	\N	DOMINANDO C# A FUNDO
546	Brian Abbs/Ingrid Freebairn	\N	\N	\N	\N	\N	Longman	Student's book	Studying Strategies
547	Nicholas S. Williams	The comprehensive Wrox guide for creating Java web applications for the enterprise This guide shows Java software developers and software engineers how to build complex web applications in an enterprise environment. You'll begin with an introduction to the Java Enterprise Edition and the basic web application, then set up a development application server environment, learn about the tools used in the development process, and explore numerous Java technologies and practices. The book covers industry-standard tools and technologies, specific technologies, and underlying programming concepts. Java is an essential programming language used worldwide for both Android app development and enterprise-level corporate solutions As a step-by-step guide or a general reference, this book provides an all-in-one Java development solution Explains Java Enterprise Edition 7 and the basic web application, how to set up a development application server environment, which tools are needed during the development process, and how to apply various Java technologies Covers new language features in Java 8, such as Lambda Expressions, and the new Java 8 Date & Time API introduced as part of JSR 310, replacing the legacy Date and Calendar APIs Demonstrates the new, fully-duplex WebSocket web connection technology and its support in Java EE 7, allowing the reader to create rich, truly interactive web applications that can push updated data to the client automatically Instructs the reader in the configuration and use of Log4j 2.0, Spring Framework 4 (including Spring Web MVC), Hibernate Validator, RabbitMQ, Hibernate ORM, Spring Data, Hibernate Search, and Spring Security Covers application logging, JSR 340 Servlet API 3.1, JSR 245 JavaServer Pages (JSP) 2.3 (including custom tag libraries), JSR 341 Expression Language 3.0, JSR 356 WebSocket API 1.0, JSR 303/349 Bean Validation 1.1, JSR 317/338 Java Persistence API (JPA) 2.1, full-text searching with JPA, RESTful and SOAP web services, Advanced Message Queuing Protocol (AMQP), and OAuth Professional Java for Web Applications is the complete Wrox guide for software developers who are familiar with Java and who are ready to build high-level enterprise Java web applications.	http://books.google.com.br/books/content?id=cHr0AgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781118909317	936	2014-02-21	John Wiley & Sons	\N	Professional Java for Web Applications
548	Griffiths, Dawn,Griffiths, David	Você sempre desejou que houvesse uma maneira mais fácil de aprender C? Use a Cabeça! C é uma experiência de aprendizado completa que te ensina a criar programas na linguagem C. Este livro ajuda a aprender C através de um método único que vai além da sintaxe e dos manuais práticos para te auxiliar a ser um grande programador. Você aprenderá tópicos importantes, como o básico da linguagem, ponteiros, matemática com ponteiros e gerenciamento de memória dinâmica. E, com tópicos avançados, tais como multithread e programação de redes, Use a Cabeça! C pode ser usado como livro didático acessível para um curso em nível de faculdade. Além disso, este livro inclui exercícios de laboratório: projetos com o objetivo de melhorar sua aptidão, testar suas novas habilidades e aumentar sua autoconfiança. Você irá além do básico da linguagem e aprenderá a usar o compilador, a ferramenta make e o armazenamento de arquivos para resolver problemas reais.	http://books.google.com.br/books/content?id=63e6BAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788576087946	628	\N	Alta Books Editora		Use a Cabeça! C
549	Nathaniel T. Schutta; Ryan Asleson	\N	https://images-na.ssl-images-amazon.com/images/I/51Qa5n9dFuL._SX376_BO1,204,203,200_.jpg	\N	336	2006	Apress	\N	Pro Ajax and Java Frameworks
550	Harold F. Tipton and Kevin Henry	\N	\N	\N	\N	\N	Auerbach	\N	Official (ISC) Guide to edit CISSP CBK
603	Ronald J. Tocci,Neal S. Widmer,Gregory L. Moss	Por meio de uma linguagem que procura ser clara, repleta de exemplos resolvidos, questões para revisão e problemas/exercícios, este livro aborda temas como a programação de PLDs e a introdução às linguagens de descrição de hardware, inclusive VHDL, sem deixar de lado tópicos tradicionais, abordando o uso de megafunções e blocos de construção fundamentais.	images\\no-image.png	9788576059226	840	\N	\N	\N	Sistemas Digitais - Principios E Aplicaçoes
660	Alan Gates	This guide is an ideal learning tool and reference for Apache Pig, the programming language that helps programmers describe and run large data projects on Hadoop. With Pig, they can analyze data without having to create a full-fledged application--making it easy for them to experiment with new data sets.	http://books.google.com.br/books/content?id=RG-v6qUktSYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449302641	203	2011-10-06	"O'Reilly Media, Inc."	\N	Programming Pig
551	STEVEN JOHNSON,MARIA LUIZA X. DE A. BORGES	Nesta obra, Steven Johnson procura responder de onde vêm as boas ideias. O autor descarta o senso comum de que criadores já nascem geniais e, isolados em seus estúdios ou laboratórios, concebem as grandes descobertas. E dedica a sua pesquisa inicialmente à biologia, chegando à conclusão de que a evolução depende, mais do que de ambientes propícios para a sobrevivência, de meios em que espécies diferentes entrem em contato. No campo das ideias não é diferente. Traçando a história por trás de quase duzentas descobertas e invenções, o autor procura comprovar que um ambiente conectado, em que intuições circulam livremente, é mais propício para o surgimento de grandes invenções. Johnson nos mostra, criando paralelos, os sete padrões considerados fundamentais dos processos de inovação desenvolvidos pelo homem e pela natureza - as descobertas que surgem a partir de outras descobertas; as redes em que informações se chocam constantemente; as intuições lentamente construídas; as intuições acidentais; o aprendizado a partir dos erros; as invenções de uma área que encontram aplicação em outra; os processos generalizados de sedimentação do saber.	http://books.google.com.br/books/content?id=zQwi_U5qMp0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788537806845	260	\N	Zahar	\N	De onde v�m as boas ideias
552	Fábio Ramon	\N	https://livralivro.com.br/uploads/book/img/973/8585184973.jpg	9788585184971	144	2001	\N	Java 2	Guia de consulta rápida
553	Rosa Maria Zaia Borges,Augusto Jobim do Amaral,Gustavo Oliveira de Lima Pereira	“[...] Por um lado, temos a violência explícita de ataques terroristas [...], com grande reverberação social e difu­são midiática [...]. Por outro lado, todavia, temos tam­bém o terrorismo subterrâneo, um ‘estado de terror’ que corresponde necessariamente à parte mais obscura do benjaminiano ‘estado de exceção’ em que vivemos. [...] O que se passa, porém, é que tal lógica de terror nem ao menos tem sido percebida na sua significação, quanto mais dissecada em seus constituintes reais. O que se pôde lá defender e se deve no presente espaço reafirmar e ressaltar é que esse trabalho interpretativo de extrema urgência necessita ser assumido com a má­xima solidez em nosso ‘pacífico’ Brasil, pois se trata da possibilidade de alcançar os alicerces de muitos aconte­cimentos de violência naturalizada que nos devastam e que vão de temas aplicados como a segurança pública a temáticas teóricas de fundo, como a concepção de sociedade que temos e que temos o direito de desejar e construir” (Prefácio de Ricardo Timm de Souza).	http://books.google.com.br/books/content?id=ru0uBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788539704873	156	2014	EDIPUCRS		DIREITOS HUMANOS E TERRORISMO
554	Cay Horstmann	'Big Java' é o mais completo texto sobre o assunto. Oferece referências que são muito importantes no estudo de tecnologias avançadas de Java, programação para Internet, acesso a bases de dados e muitas outras áreas da ciência da computação. A primeira parte do texto estimula o leitor a pensar como um solucionador de problemas e fornece as ferramentas para o projeto de programas eficazes. A segunda parte e os apêndices aprofundam-se nos conceitos avançados.	http://books.google.com.br/books/content?id=waot5HkIn5MC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788536303451	1125	2004	Bookman	\N	Big Java
555	KATHY SIERRA,BRIAN BASHAN	Com este livro, 'Use a Cabeça! Servlets & JSP' você vai interagir com os servlets e JSPs de uma maneira que o ajudará a aprender rápida e completamente e, o mais importante, será capaz de usar aquilo que aprender. Aprenda a escrever servlets e JSPs, o que	https://marcosvidolin.files.wordpress.com/2010/06/head-first-servlets-and-jsp-passing-the-sun-certified-web-component-developer-exam.jpg	9788576080855	556	\N	\N	\N	USE A CABEÇA! SERVLETS E JSP
556	Ilona Bray, J.D.	\N	http://pictures.abebooks.com/isbn/9781413309218-us-300.jpg	\N	\N	\N	Nolo	\N	U.S Immigration Made Easy
557	Paul Emmerich	If you play World of Warcraft, chances are you know what Deadly Boss Mods is: it's the most widely downloaded modification available for World of Warcraft, considered required software for many professional raid guilds, and arguably the most popular modern video game mod in history. Paul Emmerich, the author of Deadly Boss Mods, will take you from novice to elite with his approachable, up-to-date guide to building add-ons for the most popular video game in history. Using the powerful Lua scripting language and XML, you'll learn how to build and update powerful mods that can fundamentally remake your World of Warcraft experience and introduce you to the field of professional software development. Beginning Lua with World of Warcraft Add-ons teaches you the essentials of Lua and XML using exciting code examples that you can run and apply immediately. You'll gain competence in Lua specifics like tables and metatables and the imperative nature of Lua as a scripting language. More advanced techniques like file persistence, error handling, and script debugging are made clear as you learn everything within the familiar, exciting context of making tools that work in Azeroth. You'll not only learn all about the World of Warcraft application programming interface and programming, and gain coding skills that will make all your online friends think you're a coding god, but also gain hands-on Lua scripting experience that could translate into an exciting job in the video game industry! What you’ll learn See how to program Lua using basic and advanced techniques applicable to WoW and video game coding. Explore the unique design, modeling, and workflow constraints of video game mod makers from one of its most successful practitioners. Become the coolest character on your server–with tools and scripts that will make your friends gasp. Who this book is for This book is for World of Warcraft players, developers, and mod makers who want to learn how to program add-ons in Lua and XML, either to learn Lua or to improve their game experience. Working coders who don't know Lua and want to learn about this exciting, popular scripting language will also benefit. The advanced material in this book will also be useful to those with World of Warcraft addon programming experience, so prior programming experience is an advantage, but not a requirement. Table of Contents Getting Started Lua Basics Using the WoW API to Create a "Hello, World" Mod Working with Game Events Using XML and Frames Advanced Lua Using Advanced Lua to Extend the Texas Hold’em Poker Add-on Building a Poker Game Client with Add-on Communication Using the Combat Log to Build a Cooldown Monitor Using Libraries Working with Secure Templates Macros Tips, Tricks, and Optimization Other Uses for Lua	http://books.google.com.br/books/content?id=tFZyUCoZe7EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781430223719	512	2009-07-29	Apress	\N	Beginning Lua with World of Warcraft Add-ons
558	Diego Balbino	\N	\N	\N	\N	\N	\N	Retratos inspirados em Carolina Maria de Jesus	Carolinas
559	Carla Lisbôa Grespan	\N	http://thumbs.buscape.com.br/livros/mulheres-no-octogono-performatividades-de-corpos-de-generos-e-de-sexualidades-carlas-lisboa-grespan-8581928978_200x200-PU6ec1c601_1.jpg	\N	131	2015	APPRIS EDITORA	Performatividades de Corpos, de Gêneros e de Sexualidades	Mulheres no Octógono
560	Steve Krug	Web-usability expert Steve Krug updates his classic guide to designing intuitive navigation for the ideal user experience.	http://books.google.com.br/books/content?id=-PNSAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321344755	201	2006	New Riders Publishing	A Common Sense Approach to Web Usability	Don't Make Me Think!
561	Elisabeth Freeman & Eric Freeman	\N	\N	\N	\N	\N	\N	\N	USE A CABEÇA! - HTML com CSS & XHTML
562	Alexey Antônio Villas Bôas	\N	\N	\N	\N	\N	\N	\N	Uma introdução à teoria de bases de grobner para álgebras associativas
563	Patricia Knebel	\N	\N	\N	\N	\N	\N	Como a tecnologia está transformando as empresas	A Reinvenção da TI
564	Jeffrey Palermo; Ben Scheirman; Jimmy Bogard	\N	http://novatec.com.br/figuras/capas/9788575222218.gif	\N	432	2010	Novatec	\N	Asp.net MVC em ação
604	Eduardo Perez	\N	\N	\N	\N	\N	zero hora	Informática	Help - Sistema de Consultoria Interativa
565	Rob Harrop,Jan Machacek	Spring—the open source Java–based framework—allows you to build lighter, better performing applications. Written by Spring insiders Rob Harrop and Jan Machacek, Pro Spring is the only book endorsed by Rod Johnson, founder of the Spring Framework. At over 800 pages, this is by far the most comprehensive book available and thoroughly explores the power of Spring. You’ll learn Spring basics and core topics, as well as share the authors’ insights and real–world experience with remoting, mail integration, hibernate, and EJB. From the foreword: “Rob's enthusiasm for Spring—and technology in general—is infectious. He has a wide range of industry experience and a refreshingly practical, common sense approach to applying it. All those qualities come out in this book. It’s evident on nearly every page that it reflects in–depth experience with Spring and J2EE as a whole. Rob is not only an author and open source developer—he is an application developer, like his readers. I firmly believe that the best writing on software development comes out of experience in the trenches, so this is my kind of book. If you’re new to Spring, this book will help you understand its core concepts and the background in areas such as transaction management and O/R mapping that underpins them. If you’re already using Spring, you will learn about features you haven’t yet seen and hopefully, gain a deeper understanding of those features youre already using.” —Rod Johnson, Founder of the Spring Framework	http://books.google.com.br/books/content?id=nIdRAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781590594612	832	2005-01-31	Apress	\N	Pro Spring
566	Paulo Blauth Menezes	\N	http://www.inf.ufrgs.br/site/wp-content/uploads/2014/07/livros16.jpg	9788524106910	258	2005	\N	\N	Matemática discreta para computação e informática
567	Carlos Vainer	Na esteira dos recentes protestos que abalaram o país, a Boitempo lança Cidades rebeldes: Passe Livre e as manifestações que tomaram as ruas do Brasil. Trata-se do primeiro livro impresso inspirado nos megaprotestos que ficaram conhecidos como as Jornadas de Junho [2013], além de ser o principal esforço intelectual até o momento de analisar as causas e consequências desse acontecimento marcante para a democracia brasileira. Escrito e editado no calor da hora, em junho e julho, Cidades rebeldes é um livro de intervenção, que traz perspectivas variadas sobre as manifestações, a questão urbana, a democracia e a mídia, entre outros temas.	https://cache.skoob.com.br/local/images//wDiEWeyxHI4smWp8jMUTrMTR19A=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/339620/CIDADES_REBELDES_1376257747B.jpg	\N	2013	2013		Passe Livre e as manifestações que tomaram as ruas do Brasil	Cidades Rebeldes
568	Hal Edwin Fulton	New edition that comes at a time when Ruby's new applications and frameworks such as Rails gain rapid success.	http://books.google.com.br/books/content?id=qbKtQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780672328848	839	2007	Addison-Wesley Professional	\N	The Ruby Way
569	Débora Dalbosco Dell'Aglio,Sílvia H. Koller,Maria Angela Mattar Yunes	O que faz certas pessoas resistirem, lutarem sem perder a dignidade, capacidade de serem saudáveis? A prática profissional em contextos de pobreza e marginalidade faz surgir a necessidade de reflexões teóricas que denunciem o compromisso da psicologia com a classe dominante. Por isso, o livro é instigador da evolução da psicologia como ciência e profissão.	http://www.casadopsicologo.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/i/file_135_32.jpg	9788580400472	289	2011	\N	interfaces do risco à protec̦ão	Resiliência e psicologia positiva
570	David Chelimsky,Dave Astels	Behaviour Driven Development is about writing software that matters. It is an approach to agile software development that takes cues from Test Driven Development, Domain Driven Design, and Acceptance Test Driven Planning. RSpec and Cucumber are the leading Behaviour Driven Development tools in Ruby. RSpec supports Test Driven Development in Ruby through the BDD lens, keeping your focus on design and documentation while also supporting thorough testing and quick fault isolation. Cucumber, RSpec's steadfast companion, supports Acceptance Test Driven Planning with business-facing, executable requirements documentation that helps to ensure that you are writing relevant software targeted at real business needs. The RSpec Book will introduce you to RSpec, Cucumber, and a number of other tools that make up the Ruby BDD family. Replete with tutorials and practical examples, the RSpec Book will help you get your BDD on, taking you from executable requirements to working software that is clean, well tested, well documented, flexible and highly maintainable.	http://books.google.com.br/books/content?id=0rxoPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781934356371	420	2010	\N	Behaviour Driven Development with RSpec, Cucumber, and Friends	The RSpec Book
571	Conselho Estadual de Defesa dos Direitos da Criança e do Adolescente	\N	\N	\N	\N	13/07/1990	\N	\N	Estatuto da Criança e do Adolescente
572	James Denton	If you are an OpenStack-based cloud operator with experience in OpenStack Compute and nova-network but are new to Neutron networking, then this book is for you. Some networking experience is recommended, and a physical network infrastructure is required to provide connectivity to instances and other network resources configured in the book.	http://books.google.com.br/books/content?id=iXrKBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781783983315	300	2014-10-10	Packt Publishing Ltd	\N	Learning OpenStack Networking (Neutron)
573	Steve Jackson, S. John Ross, Daniel U. Thibault	\N	\N	\N	\N	\N	\N	\N	Magic
574	Stieg Larsson,Paulo Neves	Em 1966, Harriet Vanger, jovem herdeira de um império industrial, some sem deixar vestígios. No dia de seu desaparecimento, fechara-se o acesso à ilha onde ela e diversos membros de sua extensa família se encontravam. Desde então, a cada ano, Henrik Vanger, o velho patriarca do clã, recebe uma flor emoldurada - o mesmo presente que Harriet lhe dava, até desaparecer. Henrik está convencido de que ela foi assassinada, e que um Vanger a matou. Quase quarenta anos depois, o industrial contrata o jornalista Mikael Blomkvist para conduzir uma investigação particular. Mikael, que acabara de ser condenado por difamação contra o financista Wennerström, preocupa-se com a crise de credibilidade que atinge sua revista, a Millennium. Henrik lhe oferece proteção se o jornalista consentir em investigar o assassinato de Harriet. Mikael descobre que suas inquirições não são bem-vindas pela família Vanger, e que muitos querem vê-lo pelas costas. Com o auxílio de Lisbeth Salander, que conta com uma mente infatigável para a busca de dados, ele percebe que a trilha de segredos e perversidades do clã industrial recua até muito antes do desaparecimento ou morte de Harriet.	http://books.google.com.br/books/content?id=b-qvwUvv1aYC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788535913248	522	2008	Editora Companhia das Letras	\N	Os homens que não amavam as mulheres
605	Mary Wollstonecraft Shelley	Dr. Victor Frankenstein makes a scientific breakthrough by creating a living man from the assembled parts of deceased humans. But the doctor soon learns that his astounding accomplishment in the advancement of science and medcine produces consequences he did not anticipate.	https://www.traca.com.br/capas/850/850943.jpg	9781612930114	182	2011-07	\N	\N	Frankenstein
575	W. JASON GILMORE	O livro começa com uma descrição geral das capacidades do PHP, iniciando com uma análise do processo de instalação e configuração nas plataformas Windows e Linux. A seguir, devota capítulos aos conceitos básicos do PHP, incluindo variáveis, tipos de dados, funções, manipulação de string, orientação a objeto, e interação do usuário. O livro também explica conceitos chaves como PEAR, gerenciamento de sessão, a ferramenta de modelagem Smarty, Web services, e PDO. O leitor também encontrará um capítulo devotado a criar sites Web em múltiplos idiomas, e um capítulo que mostra ao leitor como criar sites usando a popular Zend Framework. O autor então introduz características chaves do MySQL, começando guiando o leitor pelo processo de instalação e configuração do MySQL. A seguir, o leitor poderá aprender sobre as ferramentas de armazenamento e tipos de dados do MySQL, utilidades de administração, características de segurança, e facilidades de importação/exportação de dados. O autor também irá introduzir o leitor a diversas características avançadas como triggers, procedimentos armazenados, e visualizações. No caminho, o leitor terá uma percepção da habilidade do PHP de se comunicar com o MySQL, e aprender como criar e executar consultas, realizar buscas, e executar outras tarefas chaves do banco de dados de dentro do seu site.	https://cache.skoob.com.br/local/images//AXHdHRcnreWPdrpuMUFcOTd9n1c=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/57362/DOMINANDO_PHP_E_MYSQ_L_DO_INICIANTE_AO_P_1256698213B.jpg	9788576083023	800	2008	\N	\N	DOMINANDO PHP E MYSQL DO INICIANTE AO PROFISSIONAL
576	Graeme Rocher,Jeff Scott Brown	The rise of Ruby on Rails has signified a huge shift in how we build web applications today; it is a fantastic framework with a growing community. There is, however, space for another such framework that integrates seamlessly with Java. Thousands of companies have invested in Java, and these same companies are losing out on the benefits of a Rails–like framework. Enter Grails. Grails is not just a Rails clone. It aims to provide a Rails–like environment that is more familiar to Java developers and employs idioms that Java developers are comfortable using, making the adjustment in mentality to a dynamic framework less of a jump. The concepts within Grails, like interceptors, tag libs, and Groovy Server Pages (GSP), make those in the Java community feel right at home. Grails' foundation is on solid open source technologies such as Spring, Hibernate, and SiteMesh, which gives it even more potential in the Java space: Spring provides powerful inversion of control and MVC, Hibernate brings a stable, mature object relational mapping technology with the ability to integrate with legacy systems, and SiteMesh handles flexible layout control and page decoration. Grails complements these with additional features that take advantage of the coding–by–convention paradigm such as dynamic tag libraries, Grails object relational mapping, Groovy Server Pages, and scaffolding. Graeme Rocher, Grails lead and founder, and Jeff Brown bring you completely up–to–date with their authoritative and fully comprehensive guide to the Grails framework. You'll get to know all the core features, services, and Grails extensions via plug–ins, and understand the roles that Groovy and Grails are playing in the changing Web.	http://books.google.com.br/books/content?id=Ddwyg3ADVCEC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781590599952	648	2009-05-14	Springer	\N	The Definitive Guide to Grails
577	Jake Nickell	\N	http://www2.alibris-static.com/threadless-ten-years-of-t-shirts-from-the-worlds-most-inspiring-online-design-community/isbn/9780810996106_l.jpg	\N	224	2010	BIS Publishers BV	Ten years of t-shirts from the world's most inspiring online design community	Threadless
578	Jeffrey Zeldman	The ultimate resource for standards-based Web design, updated and enhanced for current and future browsers.	http://books.google.com.br/books/content?id=ZCPWYFoWaMIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321385550	410	2007	Peachpit Press	\N	Designing with Web Standards
579	Jason Burby,Shane Atchison	Provides information on developing a Web analytics strategy to help make strategic business decisions, plan a website, develop effective marketing, and create a culture of analysis within an organization.	http://books.google.com.br/books/content?id=ZOxSAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780470124741	256	2007-05-29	Sybex	using data to make smart business decisions	Actionable web analytics
580	Carlos Alberto Heuser	'Projeto de Banco de Dados' aborda as duas primeiras etapas do ciclo de vida de um banco de dados- modelagem conceitual e projeto lógico. Sumário - Introdução; Abordagem entidade-relacionamento; Construindo modelos ER; Abordagem relacional; Transformações entre modelos; Engenharia reversa e normalização; Soluções de exercícios selecionados.	images\\no-image.png	9788577803828	282	2009	\N	\N	Projeto de banco de dados : Volume 4 da Série Livros didáticos informática UFRGS
581	Paul Dix	The first complete guide to building highly-scalable, Rubybased service architectures that can operate in the cloud or with legacy systems * *Shows how to leverage the benefits of Ruby and Rails in SOA environments, and overcome the obstacles that have limited their use until now. *Demonstrates emerging best practices for design and create services in Ruby, and consuming these and other services from within Rails. *Introduces powerful non-Rails frameworks that make Ruby-based service implementation easy and fast. As existing Ruby on Rails deployments grow, and adoption expands into larger environments, developers need far better ways to interface with heterogeneous systems. They also need to scale more effectively: both to handle higher volumes of requests, and to support larger teams and code bases. Now, applying recent advances, Paul Dix introduces a powerful services-based design approach for overcoming all these challenges. Using his techniques, readers can leverage the full benefits of Ruby and Rails while overcoming obstacles that formerly limited their use in service-based environments. Dix presents new best practices for designing and creating services in Ruby, and consuming services from within Rails. Writing for web application and infrastructure developers and managers, he shows how to make the most of today's Ruby libraries for building and consuming RESTful web services. The book contains extensive downloadable code examples created with Ruby, Rails, and several open source libraries, including ActiveRecord, DataMapper, Sinatra, Hpricot, Nokogiri, and Typhoeus.	http://books.google.com.br/books/content?id=TL4iQwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321659361	297	2010	Addison-Wesley Professional	\N	Service-oriented Design with Ruby and Rails
582	David Sawyer McFarlan	\N	\N	\N	\N	\N	\N	the missing manual	CSS
583	Martin Fowler	Uma resposta aos desafios enfrentados pelos profissionais que trabalham com o desenvolvimento de aplicações corporativas. Fowler reuniu um grupo de colaboradores para resumir mais de 40 soluções recorrentes em aplicações.	http://books.google.com.br/books/content?id=vpHqYZcmeKsC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788536306384	493	2006	Bookman	\N	Padrões de Arquitetura de Aplicações Corporativas
584	Jeff McAffer,Jean-Michel Lemieux,Chris Aniszczyk	The definitive guide to Eclipse rich client development - fully revised to reflect Eclipse 3.5's major enhancements * *Hands-on, practical, and thorough: builds on the highly-successful First Edition that is already the industry's #1 source of information on rich client Eclipse development. *Covers Eclipse 3.5's improvements for designing, coding, and packaging RCP applications - information too new to appear in any other book! *Includes extensive real-world, non-trivial working code examples. Eclipse is more than a state-of-the-art IDE: together with the Eclipse RCP plug-ins, it's an outstanding foundation for any desktop application, from media players to enterprise software front-ends. What's more, the new Eclipse 3.5 offers even more powerful capabilities for designing, coding, and packaging rich client applications. In Eclipse Rich Client Platform, Second Edition, leaders of the Eclipse RCP project show exactly how to leverage these capabilities for rapid, efficient, cross-platform desktop development. Building on their highly praised First Edition, the authors walk step-by-step through developing a fully-featured, branded RCP application. They introduce a wide range of techniques, including developing pluggable and dynamically extensible systems; using third party code libraries; and packaging applications for diverse environments. Readers will build a complete prototype, refine and refactor it, customize user interfaces, add Help and Update features, then build, brand, and ship finished software. Along the way, the authors cover each key RCP-related technology, including Equinox, SWT, and JFace to OSGi; and demonstrate best-practice solutions to the unique challenges of Eclipse RCP development. Hands-on, pragmatic, and comprehensive, this book offers the real-world, nontrivial code examples working developers need - as well as 'deep dives' into key technical areas that can make all the difference in building successful applications.	http://books.google.com.br/books/content?id=otFKPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321603784	518	2010	Addison-Wesley Professional	\N	Eclipse Rich Client Platform
585	Amcham Brasil	\N	\N	\N	\N	2015	Amcham	\N	Amcham Brasil: Yearbook 2015
586	Allen B. Tucker,Robert E. Noonan	Este texto enfatiza um tratamento das questões do projeto de linguagem de programação, oferecendo a professores e alunos uma mistura de experiências fundamentadas em explicações e implementações. Cada capítulo inicia com a apresentação dos principais fundamentos, paradigmas e tópicos das linguagens, provendo uma abordagem dos princípios de projeto de linguagens, permitindo flexibilização na escolha de quais tópicos enfatizar. Inclui tratamento de quatro paradigmas da programação - programação imperativa, orientada a objetos, funcional e lógica - incorporando algumas linguagens como Perl e Python. Tópicos que incluem manipulação de eventos, concorrência e ajuste.	http://loja.grupoa.com.br/imgproduct/3245.aspx	9788577260447	599	2009	\N	princípios e paradigmas	Linguagens de programação
587	Eduardo Bezerra	\N	images\\no-image.png	9788535210323	286	2003	\N	\N	Princípios de análise e projeto de sistemas com UML
588	Steve McConnell	Features the best practices in the art and science of constructing software--topics include design, applying good techniques to construction, eliminating errors, planning, managing construction activities, and relating personal character to superior software. Original. (Intermediate)	https://cache.skoob.com.br/local/images//uFC8i_ioqlESuVu5LDkZ_jM7g2M=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/8756/CODE_COMPLETE_1232413452B.jpg	\N	\N	2004	Microsoft Press	\N	Code Complete
589	Kevin Loney	\N	\N	\N	\N	\N	Oracle Press	Master the Revolutionary Features of Oracle Database 10g	Oracle Database 10g - The complete Reference
590	Brian Marick	Provides information on the basics of the Ruby scripting language and how to create scripts using test-driven design.	http://books.google.com.br/books/content?id=1vKBQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780977616619	301	2006	Pragmatic Bookshelf	For Teams, Testers, and You	Everyday Scripting with Ruby
591	Obie Fernandez	Provides information on the capabilities and subsystems of Rails for the design and development of production-quality software.	http://books.google.com.br/books/content?id=vfZmmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321601667	708	2011	Addison-Wesley Professional	\N	The Rails 3 Way
592	Matthew Russell	Set to coincide with the release of Dojo 1.0, this handbook explains in depth the new set of libraries which can make the lives of Web developers much simpler.	http://books.google.com.br/books/content?id=bkCbAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780596516482	451	2008-12-08	"O'Reilly Media, Inc."	The Definitive Guide	Dojo
593	Babi Souza	Toda mulher já se sentiu insegura na hora de sair sozinha na rua. O risco de ser abordada, perseguida ou assediada é uma realidade. Mas, um dia, uma moça chamada Babi Souza teve uma ideia simples e revolucionária: da próxima vez em que você estiver sozinha, olhe para os lados. Pode ter outra mulher andando na mesma direção. Por que não vão juntas?\nLogo, o movimento Vamos Juntas? conquistou moças em todo o Brasil, se tornando um símbolo de união feminina e feminismo, na defesa por direitos iguais entre homens e mulheres. Aos poucos, muitas mulheres mudaram sua forma de enxergar o dia a dia e a moça ao lado. \nAlém de dados sobre o feminismo, que mostram como ainda há tanto a ser conquistado, este guia traz relatos de mulheres que aprenderam, junto ao Vamos Juntas?, a enxergar companheiras umas nas outras. A se unir, ao invés de rivalizar.	http://movimentovamosjuntas.com.br/images/stories/virtuemart/product/livro_vamos_juntas.jpg	\N	129	2016	Galera	O guia da sororidade para todas	Vamos Juntas?
594	Osho	\N	http://thumbs.buscape.com.br/livros/zen-sua-historia-e-seus-ensinamentos-osho-8531608546_200x200-PU6e74fd96_1.jpg	\N	144	2004	Cultrix	Sua história e seus ensinamentos	Zen
595	Joan Preppernau e Joyce Cox	\N	http://media.orelhadelivro.com.br/products/windows-7-passo-a-passo-1418772474.184x273.jpg	\N	542	2010	Bookman	\N	Passo a Passo Windows 7
596	Stuart Halloway, Justin Gehtland	\N	\N	\N	310	2007	Editora Ciência Moderna	\N	Rails para Desenvolvedores Java
597	Martin Fowler	'UML essencial' descreve a maioria dos tipos de diagramas UML, sua utilização e a notação básica envolvida na criação. Esses diagramas incluem classes, seqüência, objeto, pacote, instalação, casos de uso, máquina de estados, atividades, comunicação, estruturas compostas, componentes, visão geral da interação e diagramas de temporização. Os exemplos são claros e as explicações chegam ao fundamento lógico do projeto.	http://books.google.com.br/books/content?id=1rWK_0ginbcC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788536304540	160	2005	Bookman	\N	UML Essencial: Um Breve Guia para Linguagem Padrao
598	ISAAC ASIMOV,FABIO FERNANDES	A humanidade vive o seu momento mais próspero. Há mais de dez mil anos um império reina absoluto sobre todos os mundos habitados. Ninguém acredita que esse tempo luminoso possa ter fim. Ninguém, exceto Hari Seldon, o criador de uma ciência revolucionária capaz de prever o futuro da raça humana. Seldon antevê a chegada de uma era de trevas jamais vista e inevitável. Apenas ele pode minimizar os estragos; garantir que o homem se reerga o mais rápido possível. Para isso, tem um plano, que deverá ser executado através dos séculos pelos membros da Fundação.	data:image/jpeg;base64,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	9788576570660	240	\N	\N	\N	FUNDAÇAO
599	Angelo Volpi Neto	\N	\N	\N	\N	\N	Aduaneiras	\N	A Vida em Bits
600	Hébert Coelho	\N	http://cdn.shopify.com/s/files/1/0155/7645/products/jsf-eficaz-socialmedia_large.png?v=1411490421	\N	189	2013	Casa do Código	As melhores práticas para o desenvolvedor Java	JSF Eficaz
606	Walace Soares	O livro mostra a trajetória de uma aplicação web por meio dessa nova tecnologia. Ele apresenta os conceitos básicos, estrutura de programação JavaScript, comandos, principais funções e formas de interação com o browser. XML, API DOM e manipulação de páginas web são assuntos tratados em detalhes, assim como o CSS (Cascading Stylesheet) ou folhas de estilo, pois permitem a interação direta com o usuário, alterando elementos da página de forma dinâmica. Possui vários exemplos de utilização do AJAX, desde os mais simples até os mais complexos, que utilizam JavaScript orientado a objetos e técnicas modernas de programação.	http://conteudo.imasters.com.br/15325/8.jpg	9788536501109	238	2006	\N	guia prático	AJAX (Asynchronous JavaScript And XML)
607	Andrew S. Tanenbaum,ALBERT S. WOODHULL	O texto introdutório sobre sistemas operacionais foi atualizado para refletir os avanços do MINIX 3, agora mais simples, mais confiável e mais completo. Nesta edição, foram adicionados e aprofundados aspectos relacionados à segurança e confiabilidade em sistemas de computação. Oferecendo um ótimo equilíbrio entre teoria e prática, este livro continua sendo a melhor fonte para todos que buscam entender como os sistemas operacionais funcionam.	http://books.google.com.br/books/content?id=Kw_Sd4dJcMMC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788577800575	990	2006	Bookman	\N	Sistemas Operacionais: Projetjos e Implementação
608	Isaac Asimov	O Império Galático está à beira do colapso. Ainda assim, numa tentativa ousada, o General Bel Riose decide lançar um ataque contra a Fundação. Mas será que a ofensiva desesperada irá impedir o destino profetizado há séculos por Hari Seldon? E quem seria, afinal, o Mulo? Este é o segundo livro da Trilogia da Fundação, vencedora do prêmio Hugo como a melhor série de ficção científica de todos os tempos.	http://www.sollusdistribuidora.com.br/admin/upload/imgGD_9788576570677.jpg	\N	248	2009	Aleph	(Trilogia da Fundação #2)	Fundação e Império
609	James Whitehead II, Bryan McLemore, Matthew Orlando	Wow is more than an acronym...\n.. it's what you'll say when you see how many ways you can tweak the interface after you read this book. If you're new to programming, we'll teach you the basics of Lua and XML and walk you through writing your first addon. If you already have some original addons in your arsenal, jump right into Parts III and IV and work with templates, function hooking, custom graphics, state headers, and more.	http://thumbs.buscape.com.br/livros/programming-world-of-warcraft-addons-james-whitehead-0470229810_200x200-PU3e684d85_1.jpg	\N	1020	2008	Wiley	A Guide and Reference for Creating WoW Addons	World of Warcraft Programming
610	Rubens Thiago de Oliveira	A linguagem de programação PL/SQL do Oracle 9i estende a linguagem SQL-padrão. É a linguagem básica para criar programas complexos e poderosos, não só no banco de dados, mas também em diversas ferramentas Oracle. \n\nEste Guia de Consulta Rápida contém uma referência completa da linguagem PL/SQL, incluindo as recentes implementações acrescentadas à linguagem, como herança em Orientação a Objetos, criação de novos tipos definidos pelo usuário, novos recursos de Java e Dynamic SQL e as recentes adequações ao padrão SQL99 (ou SQL3). É indicado tanto para programadores quanto para analistas e administradores de banco de dados. \n\nIndispensável para quem quer obter o máximo proveito da linguagem PL/SQL, sem perder tempo consultando volumosos manuais. Prático para carregar e consultar.	http://novatec.com.br/figuras/capas/8575220322.jpg	\N	128	2002	novatec	Guia de Consulta Rápida	Oracle 9i SQL
611	Ted Husted, Cedric Dumoulin, George Franciscus, David Winterfeldt	\N	\N	\N	604	2004	Editora Ciência Moderna	\N	Struts em Ação
612	Joshua Ferris	This wickedly funny, big-hearted novel about life in the office signals the arrival of a gloriously talented new writer. The characters in Then We Came to the End cope with a business downturn in the time-honored way: through gossip, secret romance, elaborate pranks, and increasingly frequent coffee breaks. By day they compete for the best office furniture left behind and try to make sense of the mysterious pro-bono ad campaign that is their only remaining "work."	http://books.google.com.br/books/content?id=b9WUmwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780316016384	400	2007-03-01	Little, Brown	A Novel	Then We Came to the End
613	MARCELO GASPAR,THIERRY GOMEZ,ZAILTON MIRANDA	Este livro aborda as boas práticas para a solução dos problemas que surgem diariamente em um departamento de TI. Em 'T.I. - Mudar e Inovar', o entendimento dos conceitos do gerenciamento de serviços dessa tecnologia é facilitado pela leitura de uma história fictícia sobre a vida profissional e familiar de um gerente de TI. O livro ainda fornece dicas para ser um líder multiplicador.	http://books.google.com.br/books/content?id=TXJesLVC_sUC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788598694702	328	\N	Senac	\N	T.i. - Mudar E Inovar - Resolvendo Conflitos
614	Edson J. R. Lobo	Tão importante quanto o desenvolvimento de um software, uma modelagem bem feita organiza a sua implementação, reduz problemas futuros em seu funcionamento, eleva a consistência das informações e aumenta o nível geral de qualidade de um sistema. Para aqueles que desejam alcançar esse patamar de profissionalismo em seus sistemas, esta leitura pode ser considerada imprescindível, visto que abrange estes e outros assuntos: - Método e processos no MIDDS - Método Iterativo e Documentado de Desenvolvimento de Software - Modelagem de software com UML - Tipos e funcionalidade de diagramas - Arquitetura de software - Model-View-Controller - Arquitetura em 3 Camadas - Análise de requisitos - MDA (Model Driven Architecture)	http://books.google.com.br/books/content?id=QMkSI0jtLV8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788578730369	\N	\N	Universo dos Livros Editora	\N	Guia prático de engenharia de software
615	Isaac Asimov	A surpreendente continuação da Trilogia da Fundação! Após quinhentos anos, o plano de Hari Seldon parece seguir seu objetivo sem maiores problemas. De fato, a Fundação agora é a capital de um império que domina metade dos mundos conhecidos. Existe, no entanto, quem duvide da calmaria e do bom encaminhamento do plano, a ponto de acreditar que a Segunda Fundação está viva e que, secretamente, ainda controla o destino de todos. A Trilogia da Fundação, obra máxima de Isaac Asimov, foi eleita, em 1966, a melhor série de ficção científica de fantasia de todos os tempos. Na década de 1980, o autor ampliou seu rico universo ficcional desdobrando sua saga em outros quatro volumes. 'Limites da Fundação', o primeiro deles, inaugura a nova fase da série.	http://www.sollusdistribuidora.com.br/admin/upload/imgGD_9788576571339.jpg	\N	408	2012	Aleph	(Extensão da série Fundação #1)	Limites da Fundação
627	Mário Quintana	Nesta obra, o leitor poderá encontrar temas como - infância, lembranças, cenas cotidianas, o mundo dos objetos que cercam as pessoas, meditações sobre o tempo e a poesia, Deus, desejo, morte. Nela se apresentam desde temas considerados grandiosos ou graves até situações comuns ou observações que privilegiam os aspectos marginais das coisas e da realidade.	http://books.google.com.br/books/content?id=VC26cLkBhOwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788525042033	413	1994	Globo Livros	\N	Caderno H
616	Estelle Weyl	Construa sites e aplicativos arrojados para todas as plataformas móveis (e não móveis) adicionando o HTML5 e o CSS3 ao seu kit de ferramentas de desenvolvimento. Com este livro prático, você aprenderá a desenvolver aplicativos web que, além de funcionar no iOS, Android, Blackberry e Windows Phone, também tenham um bom desempenho e forneçam uma boa experiência de usuário.\n\nCom os vários exemplos de código e marcação, você aprenderá as práticas recomendadas no uso de recursos HTML5, entre eles os novos formulários web, SVG, Canvas, localStorage e APIs relacionadas. Também fará um estudo aprofundado de CSS3 e descobrirá como projetar aplicativos tanto para monitores grandes quanto para telas minúsculas.	http://akamaicovers.oreilly.com/images/0636920021711/cat.gif	\N	518	07/2014	O'Reilly	Usando o que há de mais moderno atualmente	Mobile HTML5
617	Flávia Jobstraibizer	\N	\N	\N	\N	2010	Digerati Books	Desenvolva soluções completas para sistemas de informação e aplicações web	Criação de Bancos de Dados em MySQL
618	Aderson Bastos, Emerson Rios, Ricardo Cristalli, Trayahú Moreira	\N	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4891142&qld=90&l=430&a=-1	\N	262	2007	Martins Fontes	\N	Base de conhecimento em teste de software
619	Eldon Alameda	This book provides intermediate Rails users with an essential learning aid to take them to higher level, teaching them countless real world techniques via a series of practical project-based chapters. Each chapter takes the reader through the complete process of building up a full-functional Rails web application. Projects taught in the book include a blog, a REST-based task manager, an online IT help desk, a web comic (including image upload facilities,) Wiki, and much more. Techniques learned include speeding up development with plugins, engines and Ruby Gems, styling with CSS libraries, and adding dynamism using Ajax.	http://books.google.com.br/books/content?id=a8vXdlNNBuQC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781590597811	621	2007-10-29	Springer	\N	Practical Rails Projects
620	Amaury Ribeiro Jr.	OS PIRATAS DA POLÍTICA BRASILEIRA NO CARIBE DOS PARAÍSOS FISCAIS E OS BASTIDORES DE UMA ERA DE PRIVATIZAÇÕES Prepare-se, leitor, porque este, infelizmente, não é um livro qualquer. A PRIVATARIA TUCANA nos traz, de maneira chocante e até decepcionante, a dura realidade dos bastidores da política e do empresariado brasileiro, em conluio para roubar dinheiro público. Faz uma denúncia vigorosa do que foi a chamada Era das Privatizações, instaurada pelo governo de Fernando Henrique Cardoso e por seu então Ministro do Planejamento, José Serra. Nomes imprevistos, até agora blindados pela aura da honestidade, surgirão manchados pela imprevista descoberta de seus malfeitos. Amaury Ribeiro Jr. faz um trabalho investigativo que começa de maneira assustadora, quando leva um tiro ao fazer reportagem sobre o narcotráfico e assassinato de adolescentes, na periferia de Brasília. Depois do trauma sofrido, refugia-se em Minas e começa a investigar uma rede de espionagem estimulada pelo ex-governador paulista José Serra, para desacreditar seu rival no PSDB, o ex-governador mineiro Aécio Neves. Ao puxar o fi o da meada, mergulha num novelo de proporções espantosas.	http://books.google.com.br/books/content?id=BebE0eAUu58C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788561501990	343	2014-09-11	Geração Editorial	\N	Privataria Tucana, A
621	Andre Noel	Programação é um processo criativo, é uma arte. E isso é muito bom, pois, se fosse algo mecânico, nós já teríamos sido substituídos por máquinas. Por outro lado, é muito ruim quando você precisa dar manutenção em código de algum programador que abusa dessa criatividade. Então você aprende a lógica de programação, aprende sobre estruturas de dados, aprende linguagens de programação, aprende técnicas, tecnologias, etc., mas vai ser conhecido eternamente como o “rapaz do computador”. Pior do que explicar o que você faz para a sua mãe é explicar aos amigos dela (ainda mais porque ela já contou para todo mundo que você trabalha “consertando computadores”). Neste livro você vai encontrar histórias sobre o dia a dia agitado de um programador.	http://books.google.com.br/books/content?id=jC33AwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788575223208	136	2014-07-11	Novatec Editora	/* coleção de tirinhas e outras histórias */	Vida de Programador
622	PABLO DALL'OGLIO	O PHP é uma das linguagens mais utilizadas no mundo. Sua popularidade se deve à facilidade em criar aplicações dinâmicas com suporte à maioria dos bancos de dados existentes e ao conjunto de funções que, por meio de uma estrutura flexível de programação, permitem desde a criação de simples portais até complexas aplicações de negócio. O uso da orientação a objetos juntamente com o emprego de boas práticas de programação nos possibilita manter um ritmo sustentável no desenvolvimento de aplicações. O foco deste livro é demonstrar como se dá a construção de uma aplicação totalmente orientada a objetos. Para isso, os autores implementam alguns padrões de projeto (design patterns) e algumas técnicas de mapeamento objeto-relacional, além de criarem vários componentes para que você possa criar complexas aplicações de negócio com PHP.	http://books.google.com.br/books/content?id=mlVfh5l3a6MC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788575221372	576	\N	Novatec Editora	\N	PHP - PROGRAMANDO COM ORIENTAÇAO A OBJETOS
623	JARON LANIER,CRISTINA YAMAGAMI	O livro discute os problemas técnicos e culturais que podem resultar de um design digital pouco ponderado e nos alerta que nossos mercados financeiros e sites como a Wikipédia, o Facebook e o Twitter estão elevando a 'sabedoria' das multidões e os algoritmos de computador acima da inteligência e da capacidade de julgamento das pessoas. Lanier também nos mostra como a paranoia antigoverno dos anos 1960 influenciou o design do mundo on-line e permitiu a agressividade e a trivialização do discurso on-line; como o compartilhamento de arquivos está matando a classe média artística; como uma crença em um 'arrebatamento' tecnológico motiva alguns dos tecnólogos mais influentes do mundo; e por que uma nova tecnologia humanista é necessária. Este livro representa uma profunda defesa dos seres humanos por um autor mais do que qualificado a discorrer sobre como a tecnologia interage com a nossa cultura.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=3048899&a=-1&qld=90&l=190	9788502101739	248	\N	\N	UM MANIFESTO	GADGET - VOCE NAO E UM APLICATIVO
624	Bretrand de Jouvenel	"Quanto mais consideramos o assunto, mais evidente se torna que, na prática, a redistribuição está muito mais longe de ser uma redistribuição da renda disponível do mais rico para o mais pobre, como imaginávamos, do que uma redistribuição de poder do indivíduo para o Estado."	https://www.traca.com.br/capas/167/167119.jpg	\N	110	1996	Editora Ortiz	\N	A ética da Redistribuição
625	Isaac Asimov	\N	https://cache.skoob.com.br/local/images//LX0gi4I4EkrqXcWvj644xUlDoZo=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/27769/SEGUNDA_FUNDACAO_1347573548B.jpg	\N	\N	\N	Aleph	\N	Segunda Fundação (Trilogia da Fundação #3)
626	Alessandro Amadeu da Fonseca	\N	https://images-na.ssl-images-amazon.com/images/I/512Bk92wKBL._SX323_BO1,204,203,200_.jpg	\N	173	2011	Impressão Régia	\N	Investment Structures in Brazil: Taxation for Non Resident Investors in Equity and Financial Capital Markets Transactions
628	Kathy Sierra,Bert Bates	A Complete Study System for OCA/OCP Exams 1Z0-803 and 1Z0-804 Prepare for the OCA/OCP Java SE 7 Programmer I and II exams with this exclusive Oracle Press guide. Chapters feature challenging exercises, a certification summary, a two-minute drill, and a self-test to reinforce the topics presented. This authoritative resource helps you pass these exams and also serves as an essential, on-the-job reference. Get complete coverage of all objectives for exams 1Z0-803 and 1Z0-804, including: Declarations and access control Object orientation Assignments Operators Strings and arrays Flow control and exceptions Assertions and Java 7 exceptions String processing, data formatting, and resource bundles I/O and NIO Advanced OO and design patterns Generics and collections Inner classes Threads Concurrency Java Database Connectivity (JDBC) Electronic content includes: 500+ practice exam questions Test engine that provides practice exams and customized quizzes by chapter or by exam objective Bonus content for the Java 5, Java 6, and OCP 6 Upgrade exams PDF copy of the book	http://books.google.com.br/books/content?id=S5_1oQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780071772006	888	2014-10-13	McGraw-Hill Osborne Media	\N	OCA/OCP Java SE 7 Programmer I & II Study Guide (Exams 1Z0-803 & 1Z0-804)
629	José Saramago	Um motorista parado no sinal se descobre subitamente cego. É o primeiro caso de uma 'treva branca' que logo se espalha incontrolavelmente. Resguardados em quarentena, os cegos se perceberão reduzidos à essência humana, numa verdadeira viagem às trevas.'O Ensaio sobre a cegueira' é a fantasia de um autor que nos faz lembrar 'a responsabilidade de ter olhos quando os outros os perderam'. José Saramago nos dá, aqui, uma imagem aterradora e comovente de tempos sombrios, à beira de um novo milênio, impondo-se à companhia dos maiores visionários modernos, como Franz Kafka e Elias Canetti.	http://books.google.com.br/books/content?id=n5UcpiMmC7gC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788571644953	310	1995	Editora Companhia das Letras	romance	Ensaio sobre a cegueira
630	Ari Jaaksi, Juha-Markus Aalto, Ari Aalto, Kimmo Vättö, Derek Colema	Written by four experienced Nokia Telecommunications software developers, this is a practical book about object-based and component-based software development. The book concentrates the most important issues in real-life software development, such as the development process itself, software architecture, the development of user interfaces, data management, and the development of large commercial software products. The book exemplifies the presented practices by using the Unified Modeling Language (UML).	https://images-na.ssl-images-amazon.com/images/I/51i9REBDotL._SX346_BO1,204,203,200_.jpg	\N	303	1999	Cambridge	Industry-Proven Approaches with UML (SIGS: Managing Object Technology)	Tried and True Object Development
631	Martin Claret	A literatura alemã divide-se em antes e depois de Os Sofrimentos do Jovem Werther, que chega às livrarias brasileiras nesta nova e brilhante tradução de Marcelo Backes.Ao escrever Werther, em 1774, Johann Wolfgang Goethe alcançava sua primeira obra de sucesso e, de quebra, dava início à prosa moderna na Alemanha. Werther não é, simplesmente, um romance em cartas assim como Nova Heloísa de Rousseau ou Pamela de Richardson. Esta que é uma das mais célebres obras de Goethe é o romance de uma alma, uma história interior. Dilacerante, arrebatada é a história de uma paixão literalmente devastadora. Com enorme repercussão quando do seu lançamento, Werther foi um testemunho de como a literatura tinha poder de agir na sociedade. Não foram poucos os suicídios atribuídos ao romance. Johann Wolfang von Goethe nasceu em Frankfurt em 1749 e morreu em Weimar em 1832. Poeta, romancista, dramaturgo, crítico, estadista, tornou-se um dos maiores vultos do pensamento alemão, tendo influenciado várias gerações. Em 1775, a convite do Duque Carlos Augusto, foi administrador de Weimar, onde destacou-se brilhantemente como administrador, financista e estadista. Deixou vasta obra, onde se destacam, entre outras, Werther, Ifigênia, Elegias Romanas (poesia), Fausto, Teoria das Cores, Viagem à Itália, Poesia e Verdade.	https://cache.skoob.com.br/local/images//bhI-s9vpVXhT9xJhjBzJdE0EcjY=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/1138/OS_SOFRIMENTOS_DO_JOVEM_WERTHER_1231847123B.jpg	\N	128	2003	\N	(A Obra-prima de Cada Autor #51)	Os Sofrimentos do Jovem Werther
632	FIODOR DOSTOIEVSKI,MARIA APARECIDA BOTELHO PEREIRA SOARES	Este livro introduz as idéias de moral e política que o escritor mais tarde abordaria nas obras-primas 'Crime e castigo' e 'Os irmãos Karamazóv'. Sua idéia de 'homem subterrâneo' legou à ficção européia moderna um dos seus principais arquétipos, encontrado também em Kafka, Hesse, Camus e Sartre - o anti-herói morbidamente obcecado com a sua própria impotência de lidar com a realidade que o cerca.	images\\no-image.png	9788525417176	160	\N	\N	\N	NOTAS DO SUBSOLO (LIVRO DE BOLSO)
633	Gabriel García Márquez	Acaso sea 'Crónica de una muerte anunciada' la obra más 'realista' de Gabriel García Márquez, pues se basa en un hecho histórico acontecido en la tierra natal de escritor. Cuando empieza la novela, ya se saber que los hermanos Vicario van a matara a Santiago Nasar - de hecho ya le han matado- para vengar el honor ultrajado de su hermana Ángela, pero el relato termina precisamente en el momento en que Santiago Nasar. El tiempo cíclico, tan utilizado por García Márquez en sus obras, reaparece aquí minuciosamente descompuesto en cada uno de sus momentos, reconstruido prolija y exactamente por el narrador, que va dando cuenta de lo que sucedió mucho tiempo atrás, que avanza y retrocede en su relato y hasta llega mucho tiempo después para contar el destino de los supervivientes.	http://books.google.com.br/books/content?id=JKQIAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9789871138012	137	2003	\N	\N	Crónica de una muerte anunciada
634	Diane Ackerman	Describes the evolution, behavior, habitats, and threats to whales, penguins, crocodilians, and bats	http://books.google.com.br/books/content?id=_Ma4yylHY8YC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780679742265	249	1992	Vintage	And Other Adventures Among Bats, Penguins, Crocodilians, and Whales	The Moon by Whale Light
635	Luiz Eduardo Soares, André Batista, Rodrigo Pimentel	\N	https://upload.wikimedia.org/wikipedia/pt/0/00/Elite_da_tropa_livro.jpg	\N	314	2005	Objetiva	\N	Elite da Tropa
636	Ana Paula Lazzareti de Souza, Silvia H. Koller	\N	\N	\N	\N	\N	\N	Manual de capacitação para educadores	Direitos Humanos, Prevenção à violência contra crianças e adolescentes e mediação de conflitos
637	Agatha Cristie	\N	\N	\N	\N	\N	lpm pocket	\N	Assassinato na casa do pastor
638	A. S. Neill	\N	\N	\N	\N	1967	\N	\N	Liberdade Sem Medo
639	Paola Prandini	Nascido numa época em que a escravidão ainda existia no Brasil, Cruz e Sousa (1861-1898) é considerado um dos maiores escritores brasileiros. Precursor do simbolismo no país, produziu poemas em prosa e verso, atuou como jornalista e conviveu de perto com grandes intelectuais. Porém, por trazer na pele o fato incontestável de que era negro, o poeta enfrentou dificuldades para sobreviver e acabou morrendo de tuberculose. A mulher e os filhos tiveram o mesmo destino. Este livro narra a vida e a obra de Cruz e Sousa, analisando sua produção literária, seu engajamento a favor da abolição e o legado de uma existência marcada pelo preconceito.	images\\no-image.png	9788587478481	135	2011	\N	\N	Cruz e Sousa
640	Domenico De Masi	Domenico De Masi expôs suas idéias sobre a sociedade e o trabalho em diversos livros destinados aos amantes da Sociologia. Atento ao crescente interesse de um público mais amplo em seus conceitos e sua visão do futuro, De Masi elabora neste livro os temas da sociedade pós-industrial, do desenvolvimento sem emprego, da globalização, da criatividade e do tempo livre. Insatisfeito com o modelo social centrado na idolatria do trabalho, ele propõe um novo modelo baseado na simultaneidade entre trabalho, estudo e lazer, no qual os indivíduos são educados a privilegiar a satisfação de necessidades radicais, como a introspecção, a amizade, o amor, as atividades lúdicas e a convivência.	images\\no-image.png	9788586796456	328	2000	\N	entrevista a Maria Serena Palieri ; [tradução Léa Manzi]	O ócio criativo
641	Gilleanes T. A. Guedes	\N	http://novatec.com.br/figuras/capas/9788575221495.gif	\N	320	2004	Novatec	\N	Uml - Uma Abordagem Pratica
642	Giulio Di Meo	\N	http://thumbs.buscape.com.br/T100x100/__2.53236-ca9bf5c.jpg	\N	\N	\N	\N	Retratos de Gerações em Lutas	MST, 30 Anos
643	Ian Sommerville	\N	http://books.google.com.br/books/content?id=PINkPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9783827370013	711	2001	\N	\N	Software Engineering
644	Vania Maria da Costa Borgerth	A Lei Sarbanes-Oxley foi editada com o objetivo de restaurar o equilíbrio dos mercados por meio de mecanismos que assegurem a responsabilidade da alta administração de uma empresa sobre a confiabilidade da informação por ela fornecida. Este livro discute as principais inovações dessa lei, tanto no aspecto da qualidade da informação quanto em relação à responsabilidade dos administradores. A obra também poderá servir de base para que empresas brasileiras sejam alertadas sobre a importância de disseminar valores éticos na cultura empresarial e também como estímulo para a formação de futuros profissionais preocupados tanto com a capacidade de gerar valor para as empresas como com gerar empresas socialmente responsáveis.	images\\no-image.png	9788522105663	95	2007	\N	entendendo a lei Sarbanes-Oxley : um caminho para a informação transparente	SOX
645	Christopher Vogler	O livro 'A jornada do escritor', de Christopher Vogler, busca enumerar ao leitor todas as etapas de construção de personagens e situações necessários para se escrever uma boa história. Para isso, o autor usa estruturas míticas bastante conhecidas como base para o seu roteiro de escrita. O livro é dividido em três seções. A primeira descreve cada uma das personagens que são essenciais para qualquer tipo de história. A segunda propõe estágios ou situações primárias para que a narrativa tenha boa fluência até o final. Por fim, o epílogo faz um resumo da viagem e os apêndices usam 'A jornada do escritor' para analisar roteiros de filmes de sucesso como 'Titanic', 'Guerra nas estrelas' e 'Pulp Fiction - Tempo de violência'. Christopher Vogler propõe ao leitor que crie novos caminhos para a sua própria jornada de escritor. Com este objetivo, ao fim de cada capítulo há uma seção com perguntas para o pleno entendimento e aplicação dos conceitos utilizados por Vogler, a fim de que o escritor seja bem-sucedido em sua viagem que é escrever.	images\\no-image.png	9788520917640	446	2006	\N	estruturas míticas para escritores	A jornada do escritor
646	Mário de Andrade	\N	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4257714&a=-1&qld=90&l=190	9788573440645	126	1997	\N	o herói sem nenhum caráter	Macunaíma
647	Cynthia Heald	\N	http://d.gr-assets.com/books/1388522160l/135556.jpg	\N	100	2005	NavPress	\N	Becoming a Woman of Prayer
648	Mohamad Ahmed Abou Fares	\N	\N	\N	\N	\N	\N	\N	Condição da mulher na religião muçulmana
649	Ludwig von Mises	Em 'As seis lições', Ludwig von Mises explica aspectos da economia e tem por objetivo proporcionar uma leitura de fácil compreensão.	http://books.google.com.br/books/content?id=HvWimwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788562816017	106	1979	Instituto Ludwig von Mises	\N	As Seis Lições
650	Friedrich W. Nietzsche	\N	https://cache.skoob.com.br/local/images//o6fqUhnMNJPmkpPTZIeNiR1oe40=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/265484/ASSIM_FALAVA_ZARATUSTRA__1370181652B.jpg	\N	272	1999	Martin Claret	\N	Assim Falava Zaratustra
651	Edgard B. Damiani	\N	https://cache.skoob.com.br/local/images//atKVGrqFKCa7MIh5yOPyjfPg5ms=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/371/JAVASCRIPT__GUIA_DE_CONSULTA_RAPIDA_1228884540B.jpg	\N	152	\N	\N	\N	Javascript - Guia De Consulta Rapida
652	Roberto Freire	\N	\N	\N	238	\N	\N	\N	Ame e dê Vexame
653	Klaus Pohl,Chris Rupp	In practice, requirements engineering tasks become more and more complex. In order to ensure a high level of knowledge and training, the International Requirements Engineering Board (IREB) worked out the training concept “Certified Professional for Requirements Engineering”, which defines a requirements engineer’s practical skills on different training levels. The book covers the different subjects of the curriculum for the “Certified Professional for Requirements Engineering” (CPRE) defined by the International Requirements Engineering Board (IREB). It supports its readers in preparing for the test to achieve the “Foundation Level” of the CPRE.	http://books.google.com.br/books/content?id=GbsiTwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781933952819	163	2011	\N	A Study Guide for the Certified Professional for Requirements Engineering Exam - Foundation Level - IREB Compliant	Requirements Engineering Fundamentals
654	SATSVARUOA DASA GOSWAMI	A biografia do grande mestre da autorrealização na era moderna, sua divina graça A.C. Bhaktivedanta Swami Prabhupada.	https://www.traca.com.br/capas/880/880471.jpg	\N	308	1995	Board book	UM SANTO NO SECULO XX	PRABHUPADA
655	Burrhus Frederic Skinner	A fictional outline of a modern utopia.	http://books.google.com.br/books/content?id=w0M4Iy6_gtkC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780024115119	301	1976-01-01	MacMillan	\N	Walden Two
656	Doris Lessing	This is Doris Lessing's follow-up to the first part of her autobiography, Under My Skin. Here, we move into the heyday of her career, sparked off by the international success of her first novel in 1950. She went on to forge a unique role for herself in British literary and political life.	http://books.google.com.br/books/content?id=cPeQFF4EK50C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780006388890	369	1998	HarperCollins UK	Volume Two of My Autobiography, 1949-1962	Walking in the Shade
657	Daniela Haetinger, Maria Elena Pereira Johannpeter	\N	\N	\N	\N	\N	\N	10 anos de voluntariado juvenil e ações transformadoras	Tribos nas trilhas da cidadania
658	Paulo Spurgeon De Paula,Carmen Filgueiras,Joanna Filguerias	Em 32 lições, são apresentadas passo a passo diversas situações de conversação com exemplos da vida real. Expressões populares, temas de gramática e exercícios de pronúncia. Apresenta inúmeros exercícios com respostas e acompanha um CD de áudio com os diálogos do livro.	http://www.livrosilimitados.com/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/9/7/9788578440527.jpg	9788578440527	359	2010	\N	Conversation and Grammar	Learning Portuguese
661	Christian Bauer,Gavin King,Gary Gregory	Persistence—the ability of data to outlive an instance of a program—is central to modern applications. Hibernate, the most popular provider of the Java Persistence standard, offers automatic and transparent object/relational mapping, making it a snap to work with SQL databases in Java applications. Java Persistence with Hibernate, Second Edition explores Hibernate by developing an application that ties together hundreds of individual examples. It digs into the rich programming model of Hibernate, working through mappings, queries, fetching strategies, transactions, conversations, caching, and more and provides a well-illustrated discussion of best practices in database design and optimization techniques. This revised edition covers Hibernate 5 in detail along with the Java Persistence 2.1 standard (JSR 338) and all examples have been updated for the latest Hibernate and Java EE specification versions. Purchase of the print book comes with an offer of a free PDF eBook from Manning. Also available is all code from the book.	http://books.google.com.br/books/content?id=EWVnnAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781617290459	600	2015-05-01	Manning Publications	\N	Java Persistence with Hibernate
662	OOna Castro e Pedro Mizukami	\N	https://sebodomessias.com.br/imagens/produtos/114/1142939_438.jpg	\N	205	2013	Folio Digital	\N	Brasil pirata, Brasil original
663	Sem autor	\N	https://cache.skoob.com.br/local/images//LPPRXQZ69E84ljZHxJ4OvxCPTYI=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/121909/COMO_CONSTRUIR_UMA_IMAGEM_POSITIVA_1286233975B.jpg	9788577680108	47	2007	\N	\N	Como construir uma imagem positiva
664	Simão Sirineo Toscani, Rômulo Silva de Oliveira, Alexandre da Silva Carissimi	\N	\N	\N	247	2003	Sagra Luzzato	Série Livros didáticos	Sistemas Operacionais e Programação Concorrente
665	Kurt Beyer	The career of computer visionary Grace Murray Hopper, whose innovative work inprogramming laid the foundations for the user-friendliness of today's personal computers thatsparked the information age.	http://books.google.com.br/books/content?id=u8pXpwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780262517263	389	2012-02	MIT Press (MA)	\N	Grace Hopper and the Invention of the Information Age
666	Adam Griffith, BJørn-Erik Hartsfvang, Stuart J. Stuple	\N	\N	\N	\N	\N	\N	\N	GURPS for Dummies
667	Karl Marx,Samuel Moore,Edward Aveling,Friedrich Engels	Hailed by Friedrich Engels as "the bible of the working class," this 1867 classic of political economics changed the course of history. Thirty years in the making, Capital, Volume I was the first installment of Karl Marx's three-part Das Kapital and the only volume published during his lifetime. Marx declared that society is evolving from crude, unbalanced economic systems toward a utopian state — specifically, communism. His critiques of private property and class struggles aroused tremendous interest and exercised an influence that resonates to this day. Marx offers a penetrating analysis of capitalism's inner workings, examining commodities, value, money, and other factors related to the system's historic origins and contemporary functions. These considerations form the framework for his conclusion: the system cannot be reformed and must be overthrown by a revolution, resulting in a socialist society in which production serves the needs of every individual rather than generating profits for the few.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4821997&a=-1&qld=90&l=190	9780486138350	880	2012-06-08	Courier Corporation	A Critique of Political Economy	Capital, Volume One
668	Stephen King	\N	https://images-na.ssl-images-amazon.com/images/I/51ZHUlLf9PL._SX346_BO1,204,203,200_.jpg	\N	\N	\N	Francisco Alves	\N	Dança Macabra
669	Martin Hierro, Jose Fernandez	\N	http://mlb-s1-p.mlstatic.com/martin-hierro-odisea-de-un-argentino-en-argentina-199801-MLB20424808566_092015-F.jpg	\N	140	2004	libros del Zorzal	\N	Odisea de un argentino en Argentina
670	Desconhecido	\N	\N	\N	\N	\N	\N	Roteiros de sonhos pelas capitais e destinos exóticos de norte a sul	Viagem Ilustrada - Argentina e Chile
671	Tracy Kidder	A portrait of infectious disease expert Dr. Paul Farmer follows the efforts of this unconventional Harvard physician to understand the world's great health, economic, and social problems and to bring healing to humankind.	http://books.google.com.br/books/content?id=p6IQ74ID_voC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780812980554	332	2009	Random House Incorporated	\N	Mountains Beyond Mountains
672	Anna Quindlen	\N	\N	\N	\N	\N	\N	\N	Black and Blue
673	Albert Sydney Hornby,Sally Wehmeier	A revised edition of the dictionary for learners of English. Updated to include many terms connected with the Internet and electronic communication, over 4500 words and meanings are new to this edition. The dictionary offers coverage of both British and American English, and colloquial as well as formal English. All information is authenticated by the British National Corpus and the Corpus of American English. There are explanations of common symbols (for example, @), and notes on interesting word origins.	http://books.google.com.br/books/content?id=QY6tQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780194315852	1539	2003	Oxford University	\N	Oxford Advanced Learner's Dictionary of Current English
674	Frédéric Bastiat	\N	\N	\N	\N	\N	\N	\N	O que se vê e o que não se vê
675	DAVID FLANAGAN,YUKIHIRO MATSUM	'A Linguagem de Programação Ruby' é um guia sobre Ruby, com abordagem das versões 1.8 e 1.9 da linguagem. Escrito para programadores experientes que ainda não conhecem o Ruby, e também para programadores Ruby que queiram desafiar seu entendimento e expandir seu conhecimento da linguagem.	images\\no-image.png	9788576082408	400	\N	\N	\N	A LINGUAGEM DE PROGRAMAÇAO RUBY
676	STECK, JOSE FRANCISCO	\N	https://sebodomessias.com.br/imagens/produtos/31/317134_998.jpg	\N	174	1958	EDIOURO	\N	DESENHO A MAO LIVRE
677	Lu Lanlan	\N	\N	\N	219	\N	BLCUP	\N	Chinese for Leisure Life
678	Peter Drucker	\N	http://books.google.com.br/books/content?id=UGAY85jYeFcC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788522101191	229	1999	Cengage Learning Editores	\N	Sociedade Pós-Capitalista
679	Daniel Defoe	Um marinheiro náufrago numa ilha deserta é a receita óbvia para a criação de uma exótica e emocionante aventura de apelo universal. Mas Robinson Crusoé, a novela clássica deste tema, está longe de ser apenas uma romântica aventura. Esta edição publicada pela coleção L&PM Pocket é a versão completa da novela de Defoe.	images\\no-image.png	9788525405180	339	1997	\N	\N	As Aventuras de robinson crusoe versão integral
680	Tina Zang	\N	http://ecx.images-amazon.com/images/I/519dNq0gjfL._AC_US160_.jpg	\N	144	2011	Langescheidt	\N	Wenn Ramborol Erwacht
681	Comitê Gestor da Internet no Brasil	\N	\N	\N	\N	2011	\N	\N	Manual de dados abertos: Desenvolvedores
682	Ivan Illich	\N	\N	\N	187	1973	Vozes	Educação e tempo presente	Sociedade sem escolas
683	Editora Abril	\N	https://skoob.s3.amazonaws.com/livros/236307/A_BIBLIA_DO_OFFICE_2010_1335714101B.jpg	\N	\N	\N	Editora Abril	\N	A bíblia do Office 2010
684	Douglas Adams	Com mais de 15 milhões de exemplares vendidos em todo o mundo e uma galeria interminável de fãs, a série que traz o inglês Arthur Dent e o extraterrestre Ford Prefect como protagonistas de loucas aventuras espaciais ganha mais um episódio eletrizante.\n\nDepois de viajar pelo Universo, ver o aniquilamento da Terra, participar de guerras interestelares e conhecer as mais extraordinárias criaturas, Arthur está de volta ao seu planeta. Tudo parece igual, mas ele descobre que algo muito estranho aconteceu na sua ausência. Curioso com o fato e apaixonado por uma garota tão estranha quanto o que quer que tenha acontecido, ele parte em busca de uma explicação.	http://pictures.abebooks.com/isbn/9788599296974-us.jpg	\N	142	2010	Sextante	(O Mochileiro das Galáxias #4)	Até Mais, e Obrigado Pelos Peixes!
685	Desconhecido	\N	\N	\N	\N	\N	\N	Movimentos de protesto que tomaram as ruas	Occupy
686	Vidiadhar Surajprasad Naipaul	A Turn in the South is a reflective journey by V. S. Naipaul in the late 1980s through the American South. Naipaul writes of his encounters with politicians, rednecks, farmers, writers, ordinary men and women, both black and white, with the insight and originality we expect from one of our best travel writers. Fascinating and poetic, this is a remarkable book on race, culture and country. 'Naipaul's writing is supple and fluid, meticulously crafted, adventurous and quick to surprise. And, as usual, there's the freshness and originality of his way of looking at things . . . a fine book by a fine man, and one to be read with great enjoyment: a book of style, sagacity and wit' Sunday Times 'A tissue of brilliantly recorded hearsay, of intense listening by a man with a remarkable ear' New York Times Review of Books	http://books.google.com.br/books/content?id=1JV3Szc9TCQC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780330487184	307	2003-01-01	Pan Macmillan	\N	A Turn in the South
687	Mahatma Gandhi	Portrays the life of Gandhi, describes the development of his nonviolent political protest movement, and discusses his religious beliefs	http://books.google.com.br/books/content?id=VsMLYjEsyaEC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780807059098	528	1957	Beacon Press	The Story of My Experiments with Truth	An Autobiography
688	2010	Após as loucas aventuras vividas com seus estranhos amigos em O guia do mochileiro das galáxias e O restaurante no fim do universo, Arthur Dent ficou cinco anos abandonado na Terra Pré-Histórica. Mesmo depois de tanto tempo, ele ainda acordava todas as manhãs com um grito de horror por estar preso àquela monótona e assustadora rotina.\nTalvez Arthur até preferisse continuar isolado em sua caverna escura, úmida e fedorenta a encarar a próxima aventura para a qual seria forçosamente arrastado: salvar o Universo dos temíveis robôs xenófobos do planeta Krikkit.\nEste é o terceiro volume da "trilogia de quatro livros" de Douglas Adams, um dos mais cultuados escritores de ficção científica de todos os tempos. Seu humor corrosivo e sua habilidade em criar situações improváveis tornam seus livros indispensáveis para qualquer um que tenha capacidade de debochar de si mesmo. Usando o planeta Krikkit como paródia da nossa sociedade e das guerras raciais, Adams cria uma história divertida, inteligente e repleta dos mais inusitados significados sobre a vida, o universo e tudo mais.\nA missão dos protagonistas deste livro é de deter os inimigos e dar um fim à batalha genocida. Mas é claro que tudo dá mais errado do que o provável, e nossos heróis vão passar por maus momentos no meio desse fogo cruzado.	https://cache.skoob.com.br/local/images//DXM35FtyKCGDBsch1RZ3GMgFEik=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/315/A_VIDAN_O_UNIVERSO_E_TUDO_MAIS_1416944227315SK1416944227B.jpg	\N	160	2010	Arqueiro	(O Mochileiro das Galáxias #3)	A Vida, o Universo e Tudo Mais
689	Christopher Paolini	\N	\N	\N	\N	\N	Rocco	\N	Eldest
690	H.G. Wells	\N	\N	\N	\N	1987	\N	\N	The Invisible Man
691	George R.R. Martiin	\N	https://images-na.ssl-images-amazon.com/images/I/51zfq5scxcL._SX298_BO1,204,203,200_.jpg	\N	\N	\N	Bantam Books	\N	A Feast for Crows
692	Paul J. Deitel	\N	http://books.google.com.br/books/content?id=is2J44U4DpsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9789702605188	1325	2004	Pearson Educación	\N	Cómo programar en Java
693	DOUGLAS ADAMS,MARCIA HELOISA AMARANTE GONÇALVES	Os anos mais conturbados como um viajante solitário já haviam passado. Arthur Dent se resignara à nova condição e se acostumara à vida pacata e relativamente feliz como Fazedor de Sanduíches em Lamuella. Conquistara até um certo prestígio junto aos habitantes locais e fazia disso um bom argumento para continuar por lá. Ao mesmo tempo, Ford Prefect via-se num conflito profissional ocasionado pela repentina venda do Guia do mochileiro das galáxias para outra editora. Sem compreender o funcionamento do novo Guia - que passara a se 'comportar' de forma estranha - e não gostando de seu novo cargo como crítico de restaurantes, Ford se mete em roubadas para não sair prejudicado (e para obter algum lucro). Em outro ponto do Universo, Tricia McMillan havia feito fama intergaláctica como repórter e levava uma rotina razoavelmente satisfatória, até um pequeno planeta chamado Rupert ser descoberto e tudo começar a dar estranhamente errado em sua vida. Espalhados pelos cantos da Galáxia, Arthur, Ford e Tricia iam tocando suas vidas da melhor forma que podiam, mas tudo se complica novamente quando eles se reencontram. Tentando manter a sanidade e salvar a si mesmos, eles acabam assistindo juntos ao inevitável destino da Terra.	http://www.livrariadoengenheiro.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/i/livro-praticamente-inofensiva-.jpg	9788599296615	208	\N	\N	\N	PRATICAMENTE INOFENSIVA
694	J. K. Rowling,Mary GrandPré	Rescued from the outrageous neglect of his aunt and uncle, a young boy with a great destiny proves his worth while attending Hogwarts School for Witchcraft and Wizardry.	http://books.google.com.br/books/content?id=fo4rzdaHDAwC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780590353427	309	1998	Scholastic Paperbacks	\N	Harry Potter and the Sorcerer's Stone
695	Christopher Paolini	\N	http://3.bp.blogspot.com/-uydcZEjIbsQ/Tc1sgTnL28I/AAAAAAAAAbQ/JxJMcFfBod4/s1600/brisingr.jpg	\N	694	2008	Rocco Jovens Leitores	\N	Brisingr
709	E. L. James	When Anastasia Steele, a young literature student, interviews wealthy young entrepreneur Christian Grey for her campus magazine, their initial meeting introduces Anastasia to an exciting new world that will change them both forever.	http://books.google.com.br/books/content?id=MMhpS90HrukC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780345803481	514	2012	Vintage	\N	Fifty Shades of Grey
711	George R. R. Martin	The second book in the A Song of Ice and Fire trilogy. Sansa Stark is trapped in marriage to the feeble Lannister boy, child of incest, who is King Joffrey. In the North the Starks prepare for battle with the Lannisters.	http://books.google.com.br/books/content?id=R7Wp_JlmFIQC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780006479895	741	2003-01-01	HarperCollins UK	\N	A Clash of Kings
696	Michael Palin	Brazil is one of the four new global super powers with its vast natural resources and burgeoning industries. Half a continent in size and a potent mix of races, religions and cultures, of unexplored wildernesses and bustling modern cities, it is also one of the few countries Michael Palin has never fully travelled. With the next Olympics to be held in Rio in 2016 and the World Cup in Brazil in 2014, international attention will be on the country as never before. Michael Palin's timely book and series take a closer look at a remarkable new force on the world scene. From the Venezuelan border and the forests of the Lost World, where he encounters the Yanomami tribe and their ongoing territorial war with the gold miners, Michael Palin explores this vast and disparate nation in his inimitable way. He journeys into the heart of the Amazon rainforest. He travels down the north-east coast to meet the descendants of African slaves with their vibrant culture of rituals, festivals and music. He visits the shanty towns of Rio and the beaches of Copacabana and Ipanema. He goes to Sao Paolo, where the rich commute by helicopter. He travels south to meet German and Japanese communities, meets supermodels in the making and wealthy gauchos in the Pantanal before ending his journey at the spectacular Iguaçu Falls.	http://books.google.com.br/books/content?id=hJRtNAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781780220864	274	2013-09-10	Phoenix	\N	Brazil
697	Douglas Adams	O que você pretende fazer quando chegar ao Restaurante no Fim do Universo? Devorar o suculento bife de um boi que se oferece como jantar ou apenas se embriagar com a poderosa Dinamite Pangaláctica, assistindo de camarote ao momento em que tudo se acaba numa explosão total?\n\nA continuação das incríveis aventuras de Arthur Dent e seus quatro amigos através da Galáxia começa a bordo da nave Coração de Ouro, rumo ao restaurante mais próximo. Mal sabem eles que farão uma viagem no tempo, cujo desfecho será simplesmente incrível. \n\nO segundo livro da série de Douglas Adams, que começou com o surpreendente O guia do mochileiro das galáxias, mostra os cinco amigos vivendo as mais inesperadas confusões numa história cheia de sátira, ironia e bom humor. \n\nCom seu estilo inteligente e sagaz, Douglas Adams prende o leitor a cada página numa maravilhosa aventura de ficção científica combinada ao mais fino humor britânico, que conquistou fãs no mundo inteiro. Uma verdadeira viagem, em qualquer um dos mais improváveis sentidos.	https://cache.skoob.com.br/local/images//85m_jYiMgYBYmkIoSGwQ5apJ908=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/220/O_RESTAURANTE_NO_FIM_DO_UNIVERSO_1371225725B.jpg	\N	176	2010	Arqueiro	(O Mochileiro das Galáxias #2)	O Restaurante no Fim do Universo
698	Peter Hintereder	\N	images\\no-image.png	9783797311993	192	2010	\N	\N	Perfil da Alemanha
699	J.R.R. Tolkein	\N	http://thumbs.buscape.com.br/livros/o-senhor-dos-aneis-o-retorno-do-rei-j-r-r-tolkien-8533613393_200x200-PU6e780cbb_1.jpg	\N	\N	1994	Martins Fontes	\N	O Senhor dos Anéis: o Retorno do Rei
700	desconhecido	\N	\N	\N	\N	\N	PubliFolha	\N	São Francisco O Guia da Cidade
701	Ricardo Semler	In The Seven-Day Weekend, Semler explains how he transformed a small family business into a highly profitable manufacturing, services and high-tech powerhouse - 40 times larger - while watching his favorite movies or relaxing with his son in the middle of the business day. Praise for The Seven-Day Weekend'Are there real-life lessons to be learned? The answer is yes-Pragmatic, inspirational and intriguing advice' The Times'Ricardo Semler is our kind of capitalist.' Guardian'In this book, Ricardo Semler tells how Semco, Latin America's fastest growing company, uses a revolutionary way of working to run a profit making company with a work force who love their jobs.' The Sunday Times'The Seven-Day Weekend challenges conventional approaches to work. It sparks ideas that can be applied to one's own business [and] will certainly encourage managers to look very carefully at their management practices.' Rocco Forte, Management TodayPraise for Ricardo Semler's Maverick!'Semco takes workplace democracy to previously unimagined frontiers' The Times'His egalitarian approach works like a dream' Today	http://books.google.com.br/books/content?id=LP439HlcgwAC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780099425236	276	2003	Random House	A Better Way to Work in the 21st Century	The Seven-day Weekend
702	Sandra Bao, Bridget Gleeson	\N	\N	\N	\N	\N	Lonely Planet	\N	Guia da cidade - Buenos Aires
703	Martin Fowler, Kendall Scott	\N	\N	\N	170	2000	Bookman	Um breve guia para a linguagem-padrão de modelagem de objetos	UML Essencial
704	Vanito Ianium Vieira Cá	\N	\N	\N	\N	\N	\N	Terra de um homem só	Sakuri
705	Robert E.B. Lucas	This Handbook summarizes the state of thinking and presents new evidence on various links between international migration and economic development, with particular reference to lower-income countries. The connections between trade, aid and migration ar	http://books.google.com.br/books/content?id=di2lBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781782548072	488	2014-12-31	Edward Elgar Publishing		International Handbook on Migration and Economic Development
706	James Oroc	A journey from Burning Man to the Akashic Field that suggest how 5-MeO-DMT triggers the human capacity for higher knowledge through direct contact with the zero-point field • Examines Bufo alvarius toad venom, which contains the potent natural psychedelic 5-MeO-DMT, and explores its entheogenic use • Proposes a new connection between the findings of modern physics and the knowledge held by shamans and religious sages for millennia The venom from Bufo alvarius, an unusual toad found in the Sonoran desert, contains 5-MeO-DMT, a potent natural chemical similar in effect to the more common entheogen DMT. The venom can be dried into a powder, which some researchers speculate was used ceremonially by Amerindian shamans. When smoked it prompts an instantaneous break with the physical world that causes out-of-body experiences completely removed from the conventional dimensions of reality. In Tryptamine Palace, James Oroc shares his personal experiences with 5-MeODMT, which led to a complete transformation of his understanding of himself and of the very fabric of reality. Driven to comprehend the transformational properties of this substance, Oroc combined extensive studies of physics and philosophy with the epiphanies he gained from his time at Burning Man. He discovered that ingesting tryptamines unlocked a fundamental human capacity for higher knowledge through direct contact with the zero-point field of modern physics, known to the ancients as the Akashic Field. In the quantum world of nonlocal interactions, the line between the physical and the mental dissolves. 5-MeO-DMT, Oroc argues, can act as a means to awaken the remarkable capacities of the human soul as well as restore experiential mystical spirituality to Western civilization.	http://books.google.com.br/books/content?id=CPQBmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781594772993	384	2009-05-21	Park Street Press	5-MeO-DMT and the Sonoran Desert Toad	Tryptamine Palace
707	Paulo Roberto dos Santos pinto	\N	\N	\N	240	\N	Ministério do Trabalho	Legislação Base	Autorização de Trabalho Estrangeiro
708	Sun Xinxin	\N	\N	\N	\N	2005	\N	\N	Telephone Chinese
710	James Joyce	\N	\N	\N	252	Penguin Books	\N	\N	A Portrait of the Artist as a Young Man
712	Regis St. Louis	\N	\N	\N	\N	\N	Lonely Planet	\N	Brazil
714	Roman Krznaric	O desejo por um trabalho gratificante é uma das grandes aspirações da nossa era e este livro inspirador revela como podemos realizar este objetivo. Ele explora as contradições que enfrentamos para ter dinheiro e status e ao mesmo tempo fazer algo significativo e em sintonia com nossos talentos. Recorrendo à sociologia, psicologia, história e filosofia, Roman Krznaric escreve um guia prático e inovador para nos ajudar a seguir um rumo nesse labirinto de opções, superar o medo da mudança e encontrar uma carreira que nos fará prosperar.	http://images1.folha.com.br/livraria/images/c/2/1185180-250x250.png	\N	181	2012	objetiva	\N	Como encontrar o trabalho da sua vida
715	Abril Coleções	\N	\N	\N	173	Abril, 2010	Abril Coleções	Grécia	Cozinha do Mundo
716	George R. R. Martin	THE BOOK BEHIND THE SECOND SEASON OF GAME OF THRONES, AN ORIGINAL SERIES NOW ON HBO. In this eagerly awaited sequel to "A Game of Thrones, " George R. R. Martin has created a work of unsurpassed vision, power, and imagination. "A Clash of Kings" transports us to a world of revelry and revenge, wizardry and warfare unlike any you have ever experienced. A CLASH OF KINGS A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns. Six factions struggle for control of a divided land and the Iron Throne of the Seven Kingdoms, preparing to stake their claims through tempest, turmoil, and war. It is a tale in which brother plots against brother and the dead rise to walk in the night. Here a princess masquerades as an orphan boy; a knight of the mind prepares a poison for a treacherous sorceress; and wild men descend from the Mountains of the Moon to ravage the countryside. Against a backdrop of incest and fratricide, alchemy and murder, victory may go to the men and women possessed of the coldest steel...and the coldest hearts. For when kings clash, the whole land trembles."	http://books.google.com.br/books/content?id=zlwlTfBeiSoC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780007447831	752	2011	HarperCollins UK	\N	A Clash of Kings
717	desconhecido	\N	\N	\N	\N	\N	\N	\N	Como Viver Melhor e Ser Feliz
718	Flávio Carrança, Rosane da Silva Borges	\N	\N	\N	190	2004	Imprensa Oficial	O negro no jornalimo Brasileiro	Espelho Infiel
719	J. R. R. TOLKIEN	O Silmarillion, publicado agora, quatro anos após o falecimento do seu autor, é um relato dos Dias Antigos, a Primeira Era do Mundo. O Silmarillion, no entanto, são lendas derivadas de um passado muito mais remoto, quando Morgoth, o primeiro Senhor do Escuro, habitava a Terra-média, e os altos- elfos guerrearam com ele pela recuperação das Silmarils.Mas O Silmarillion não relata apenas os eventos de uma época muito anterior àquela de O Senhor dos Anéis, em todos os pontos essenciais de sua concepção, ele também é, de longe, a obra mais antiga. Na realidade, embora na época não se chamasse O Silmarillion, ele já existia meio século atrás. Em cadernos vellhíssimos, que remontam a 1917, podem ser lidas as versões iniciais das histórias mais importantes da mitologia.	http://www.livrariamachadodeassis.com.br/capas/658/9788533611658.jpg	\N	470	1999	\N	\N	O SILMARILLION
720	George R. R. Martin	\N	\N	\N	\N	\N	Bantam Books	\N	A Dance with Dragons
721	Thomas H. Davenport	\N	\N	\N	\N	\N	Futura	Por que só a tecnologia não basta para o sucesso na era da informação	Ecologia da Informação
722	Gertrud Goudswaard	Der zuverlässige Begleiter für den internationalen Business-Alltag! Hier erhalten Sie alle wichtigen Redewendungen und zahlreiche Beispieltexte für professionelle Geschäftskontakte auf Englisch. Jetzt in der einmaligen Best of-Edition!.	http://books.google.com.br/books/content?id=Wq__iTJw8YgC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9783448099461	251	2009	Haufe-Lexware	\N	Business English
723	Luke Hohmann	A unique and fun approach to identifying the innovative product customers want and need.	http://books.google.com.br/books/content?id=Vb3pAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321437297	159	2007	Addison-Wesley Professional	Creating Breakthrough Products Through Collaborative Play	Innovation Games
724	Jack Scholes	\N	https://images-na.ssl-images-amazon.com/images/I/41gAfK6x0RL._SX289_BO1,204,203,200_.jpg	\N	152	2008	Disal	Common, everyday words and phrases in Brazilian Portuguese	Break the Branch? Quebrar o Galho
725	Sarina Singh,Joe Bindloss	Supplies tips on sightseeing in India and surveys the hotels, restaurants, transportation, and attractions in the cities of India.	http://books.google.com.br/books/content?id=T7ZHUhSEleYC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781741043082	1236	2007	Lonely Planet	\N	India
726	NAZARETHE FONSECA	Kara Ramos é uma jovem restauradora, determinada e espirituosa, que aceita o desafio de reformar um casarão abandonado na cidade de São Luís, no Maranhão. Porém, o que ela jamais poderia imaginar era encontrar adormecida no sótão uma criatura com mais de 300 anos, sedenta de sangue e vingança. Agora que despertou, o vampiro Jan Kmam irá até as últimas consequências para se vingar de seus inimigos. Para tanto, não hesitará em envolver Kara em seu mundo de sombras e sedução.	images\\no-image.png	9788576570806	416	\N	\N	\N	ALMA E SANGUE, V.1 - O DESPERTAR DO VAMPIRO
727	Roxanne E. Miller	For the first time, provides the business analysis sector with over 2,000 probing questions to elicit nonfunctional software requirements	http://books.google.com.br/books/content?id=9WpYPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781595980670	327	2009	Mavenmark Press	Probing Questions to Bring Nonfunctional Requirements Into Focus; Proven Techniques to Get the Right Stakeholder Involvement	The Quest for Software Requirements
728	Helga Kansy	\N	\N	\N	\N	\N	Haufe	\N	Small Talk English
729	Desconhecido	\N	http://www.aolifo.de/images/product_images/popup_images/90_0_3385.jpg	\N	210	\N	\N	\N	Chinese Humorous Stories
730	Sam Welman	\N	https://images-na.ssl-images-amazon.com/images/I/51H5QWC99GL._SX363_BO1,204,203,200_.jpg	\N	224	1985	\N	\N	Abraham Lincoln
731	Stephenie Meyer	Now in the trade paperback edition: New Bonus Chapter and Reading Group Guide, including Stephenie Meyer's Annotated Playlist for the book. Melanie Stryder refuses to fade away. The earth has been invaded by a species that take over the minds of human hosts while leaving their bodies intact. Wanderer, the invading "soul" who has been given Melanie's body, didn't expect to find its former tenant refusing to relinquish possession of her mind. As Melanie fills Wanderer's thoughts with visions of Jared, a human who still lives in hiding, Wanderer begins to yearn for a man she's never met. Reluctant allies, Wanderer and Melanie set off to search for the man they both love. Featuring one of the most unusual love triangles in literature, THE HOST is a riveting and unforgettable novel about the persistence of love and the essence of what it means to be human.	http://books.google.com.br/books/content?id=vbYTNgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780316068055	656	2010-04-13	Back Bay Books	A Novel	The Host
732	J.R.R. Tolkein	\N	\N	\N	\N	\N	\N	\N	Senhor dos anéis
733	George R. R. Martin	\N	\N	\N	\N	\N	\N	A Song of Ice and Fire, Book 1	A Game of Throne
735	David S. Landes	Este oportuno livro narra a fascinante história da riqueza e da pobreza, a trajetória de vencedores e perdedores, a ascensão e queda de nações. O autor tenta compreender como as culturas do mundo atingiram ou retardaram o sucesso econômico e militar.	http://books.google.com.br/books/content?id=aaT0T4JrSPkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788535203745	760	2003	Elsevier Brasil	\N	Riqueza e pobreza das nações: por que algumas são tão ricas e outras tão pobres
736	Natalia Viana	\N	\N	\N	\N	2007	\N	Assassinatos Políticos no Brasil Hoje	Plantados No Chão
737	Andrés Ramirez	\N	\N	\N	\N	\N	UNHCR Acnur	\N	Refúgio, Migrações e Cidadania
738	Clive Oxenden	\N	https://images-na.ssl-images-amazon.com/images/I/51KbfDVGrPL._SX395_BO1,204,203,200_.jpg	\N	150	2011	Oxford University		New English File. Advanced A Multipack
739	A. Conan Doyle	\N	\N	\N	\N	\N	Tempo Cultural	\N	Aventuras de Sherlock Holmes
740	Vera Daisy Barcellos; Zoravia Bettiol; Dorvalina Elvira Pinto Fialho; Irene Santos; Cidinha da Silva	\N	\N	\N	\N	2010	\N	memória fotográfica das colônias africanas de Porto Alegre	Colonos e quilombolas
741	OLIVER BOWDEN,ANA CAROLINA MESQUITA	Traído pelas famílias que governam as cidades-estado italianas, um jovem embarca em uma jornada épica em busca de vingança. Para erradicar a corrupção e restaurar a honra de sua família, ele irá aprender a Arte dos Assassinos. Ao longo do caminho, Ezio terá de contar com a sabedoria de mentores, como Leonardo da Vinci e Nicolau Maquiavel, sabendo que sua sobrevivência depende inteiramente de sua perícia e habilidade.	images\\no-image.png	9788501091338	378	\N	\N	\N	ASSASSIN'S CREED - RENASCENÇA
742	George R.R. Martin	\N	\N	\N	1177	2011	Bantam Books	\N	A Storm of Swords
743	IEDA VECCHIONI CARVALHO,ANTONIO EUGENIO V. MARIANI PASSOS,SUZANA BARROS CORRÊA SARAIVA	O objetivo deste livro é apresentar e analisar as práticas de recrutamento e seleção de pessoas como processo responsável por prover as competências necessárias para a construção da eficácia e da eficiência organizacional.	images\\no-image.png	9788522506743	128	\N	\N	\N	RECRUTAMENTO E SELEÇAO POR COMPETENCIAS
744	Edward Capriolo,Dean Wampler,Jason Rutherglen	Need to move a relational database application to Hadoop? This comprehensive guide introduces you to Apache Hive, Hadoop’s data warehouse infrastructure. You’ll quickly learn how to use Hive’s SQL dialect—HiveQL—to summarize, query, and analyze large datasets stored in Hadoop’s distributed filesystem. This example-driven guide shows you how to set up and configure Hive in your environment, provides a detailed overview of Hadoop and MapReduce, and demonstrates how Hive works within the Hadoop ecosystem. You’ll also find real-world case studies that describe how companies have used Hive to solve unique problems involving petabytes of data. Use Hive to create, alter, and drop databases, tables, views, functions, and indexes Customize data formats and storage options, from files to external databases Load and extract data from tables—and use queries, grouping, filtering, joining, and other conventional query methods Gain best practices for creating user defined functions (UDFs) Learn Hive patterns you should use and anti-patterns you should avoid Integrate Hive with other data processing programs Use storage handlers for NoSQL databases and other datastores Learn the pros and cons of running Hive on Amazon’s Elastic MapReduce	http://books.google.com.br/books/content?id=n8FffirFaQIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781449326975	350	2012-09-19	"O'Reilly Media, Inc."	\N	Programming Hive
745	J.R.R. Tolkien	\N	\N	\N	\N	\N	\N	As duas Torres	O Senhor dos Anéis
746	Hiroaki Samura	\N	\N	\N	\N	\N	\N	A lâmina do imortal 05	Blade
747	J. R. R. Tolkien	\N	\N	\N	\N	\N	lmfe	\N	O Senhor dos Anéis a Sociedade do Anel
748	Martin Grondin	"For the first time ever, LOLcat bible brings the good news to your feline friends in their native LOLSpeak"--P. [4] of cover.	http://books.google.com.br/books/content?id=AQQZRv7S1lQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781569757345	128	2010-01-01	Ulysses Press	In the Beginnin Ceiling Cat Maded the Skiez an Da Erfs N Stuffs	LOLcat Bible
749	Andrew S. Tanenbaum	'Redes de computadores' foi atualizado para refletir as tecnologias mais novas e mais importantes de redes, com ênfase especial em redes sem fio, incluindo 802.11, Bluetooth, comunicação sem fio de banda larga, redes ad hoc, i-mode e WAP. Porém, as redes fixas não foram ignoradas com cobertura de ADSL, Internet via cabo, Ethernet de gigabit, redes não-hierárquicas, NAT e MPLS.	http://books.google.com.br/books/content?id=0tjB8FbV590C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788535211856	945	2003	Elsevier Brasil	\N	Redes de computadores
750	Normanda Araújo de Morais, Lucas Neiva-Silva, Sílvia Helena Koller	\N	\N	\N	528	2010	Casa do Psicólogo	Crianças e adolescentes em situação de rua	Endereço Desconhecido
751	Dra. Joanne Stone, Dr. Keith Eddleman, Mary Duenwald	\N	\N	\N	\N	2009	Alta Books	\N	Gravidez Para Leigos
752	Aristeu de Oliveira	\N	\N	\N	\N	\N	Atlas	\N	Cálculos Trabalhistas
753	MORGAN, JOSEPH R.	Aqui você encontra o que jamais encontrou nos dicionários inglês-português: mais de 3.100 expressões idiomáticas rigorosamente atualizadas. corretamente usadas na vida diária.	http://mlb-s1-p.mlstatic.com/809021-MLB20683330865_042016-Y.jpg	\N	222	1920	CLIO	INGLÊS/ PORTUGUÊS	ver capa ampliada EXPRESSÕES IDIOMÁTICAS
754	Dave Gray,Sunni Brown,James Macanufo	Presents eighty games to help business teams develop creative solutions to problems and ideas for new products and processes.	http://books.google.com.br/books/content?id=3OCbAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780596804176	266	2010-07-19	"O'Reilly Media, Inc."	A Playbook for Innovators, Rulebreakers, and Changemakers	Gamestorming
755	Roberto S.	\N	http://www.portaldoslivreiros.com.br/imagens/34230/memorias-da-sociedade-brasileira-de-computaco-fretegratis-911211-MLB20481884441_112015-F%20(1).jpg	\N	\N	\N	\N	\N	Memórias das Sociedade Brasileira de Computação
756	PAULO BLAUTH MENEZES	Apresenta os principais conceitos e resultados de linguagens formais e autômatos sem descuidar do desenvolvimento do raciocínio nem dos aspectos matemático-formais. Atende as diretrizes curriculares do MEC.	images\\no-image.png	9788577807659	256	2002	Bookman	\N	Linguagens Formais e Autômatos: Volume 3 da Série Livros Didáticos Informática UFRGS
757	Evi Nemeth, Garth Snyder, Trent Hein	\N	http://4.bp.blogspot.com/-tlB5DU2m4Ao/UJMJUqHOMTI/AAAAAAAAK_4/e46TT6NUHUU/s1600/manual-completo-do-linux.jpeg	\N	630	2004	Pearson Makron Books	Guia do administrador	Manual Completo do Linux
758	Vladimir Illitch Ulianov	\N	\N	\N	\N	\N	Editora Pradense	\N	Lênin Cartas do Exílio
759	David Astels	* *A practical complimentary book to Kent Beck's Test-Driven Development *Ensures robust, bug-free software by advocating testing before coding *Key points are illuminated by examples in Java	http://books.google.com.br/books/content?id=6awpwcRKpa4C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780131016491	562	2003	Prentice Hall	A Practical Guide	Test-driven Development
760	Alexandre Assaf Neto	A obra tem por objetivo introduzir técnicas de análise econômico-financeira, envolvendo estudos sobre a rentabilidade, formulações analíticas de desempenho, viabilidade econômica e financeira de um negócio, estrutura de liquidez e análise dinâmica do capital de giro. Destaque ainda deve ser dado ao estudo da metodologia de apuração do valor econômico agregado, e à metodologia de análise de bancos. Dividido em cinco partes, o livro aborda a análise de balanços de empresas comerciais, industriais, de serviços e bancos comerciais e múltiplos.	images\\no-image.png	9788522457076	319	2010	\N	um enfoque economico-financeiro	Estrutura e analise de balanços
761	ALEXANDER ELDER	Que regras devem ser seguidas para que um operador obtenha sucesso? Que métodos devem ser adotados? Como o capital deve ser distribuído para operações no mercado? As respostas para essas, entre outras perguntas sobre como se tornar um operador bem-sucedido, são encontradas no livro do especialista Alexander Elder. O autor monta uma verdadeira cartilha na qual apresenta seus mais recentes conceitos sobre operações financeiras. Uma obra destinada a iniciantes, mas com informações de grande valor para os mais experientes operadores. Indo além da análise técnica, o livro transmite aos leitores as regras básicas de gestão de dinheiro, fundamentais para a sobrevivência e o sucesso de um operador, e mostra como estruturar uma conta de investimentos. O autor convida o leitor a visitar sua sala de negociações e traça um panorama de suas operações mais recentes. Alçado sobre mais de 20 anos de experiência em operações, o livro dá o pontapé inicial para que o leitor domine uma nova forma de operar tanto em ações, quanto em futuros, opções e câmbio.	http://books.google.com.br/books/content?id=J-Kaypx4ZkEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788535218985	340	\N	Elsevier Brasil	\N	Aprenda a Operar No Mercado de Ações
762	Clive Oxenden, Christina Latham-Koenig	\N	\N	\N	\N	\N	\N	\N	New English File - Advanced Student's Book
763	Desconhecido	'Occupy - movimentos de protesto que tomaram as ruas' reúne artigos de pensadores do momento da política global em que a voz das ruas passa a fazer parte do cenário com ocupações e greves, derrubando até ditaduras. Apresentam-se nos textos alguns consensos, como a certeza do declínio geral do capitalismo; a percepção de uma nova solidariedade social; e a análise da ausência de uma definição estratégica dos movimentos de ocupação.	http://books.google.com.br/books/content?id=cSYTUjMdZYMC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788575592168	87	2012	Boitempo Editorial	movimentos de protesto que tomaram as ruas	Occupy
764	JOSE CARLOS ASSIS DORNELAS	Esta obra traz conceitos teóricos, discussão acadêmica e reflexão acerca do tema, a fim de colocar o leitor em condições de praticar a construção de seu negócio e análise das oportunidades de maneira crítica e prática. Um plano de negócios pode ser elaborado como produto final do estudo. O livro traz três novos estudos de caso que se somam a três já existentes na edição anterior e que foram atualizados.	images\\no-image.png	9788535247589	280	\N	\N	TRANSFORMANDO IDEIAS EM NEGOCIOS	EMPREENDEDORISMO
765	Steve McConnell	Steve McConnell capta, nesta obra, a essência do conhecimento acadêmico, da pesquisa e da prática comercial cotidiana, sintetizando as técnicas mais eficientes e os princípios mais conhecidos da construção de software em orientações claras e pragmáticas. Independentemente do nível de experiência do leitor, do ambiente de desenvolvimento ou do tamanho do projeto, este livro instruirá e estimulará sua forma de pensar, auxiliando-o a construir códigos da mais alta qualidade.	images\\no-image.png	9788536305042	928	2004	\N	um guia prático para a construção de software	Code complete
766	MICHAEL LEWIS,IVO KORYTOWSKI	Para entender as causas da crise econômica e seus desdobramentos, Michael Lewis embarcou para a Europa, onde foi examinar de perto a situação enfrentada em alguns países. Nesta obra, ele conversa com políticos considerados conhecidos e poderosos, financistas visionários, acadêmicos notáveis e também com figuras menos ilustres porém igualmente surpreendentes. Na Grécia, Lewis visitou um monge que descobriu como explorar o capitalismo grego para salvar seu mosteiro falido. Na Islândia, falou com o primeiro-ministro e investigou como pescadores deixaram seu ofício e foram se meter em operações cambiais milionárias. Na Irlanda, conversou com o professor de economia que foi o primeiro a alertar sobre o perigo da bolha imobiliária local. Na Alemanha, teve acesso ao gabinete do vice-ministro das Finanças e procurou entender como os alemães, que ignoraram a oferta de crédito fácil e que são tão avessos ao risco, usaram seu dinheiro para permitir que estrangeiros cometessem loucuras. De volta para casa, o autor conversou com Arnold Schwarzenegger para saber como ele enfrentou a politicagem que praticamente o impediu de governar e em que momento percebeu que administrava um estado falido. Em sua conclusão, procura chamar atenção para o descontrole da sociedade americana e o crescente sacrifício dos interesses de longo prazo por recompensas imediatas.	images\\no-image.png	9788575427408	224	\N	\N	NOVO TERCEIRO MUNDO	BUMERANGUE - UMA VIAGEM PELA ECONOMIA DO
767	Rizzatto Nunes	\N	\N	\N	\N	2011	Editora Saraiva	\N	Manual de Introdução ao Estudo do Direito
768	GUSTAVO CERBASI	Mais um livro da coleção Expo Money. O objetivo principal deste livro é ajudar o leitor a ter maior consciência sobre suas escolhas financeiras, incluindo sua rotina de gastos básicos e gastos eventuais, seu uso do crédito, seus investimentos e escolhas de bem-estar e segurança. Ao longo da leitura, você encontrará orientações para consumir mais, privar-se menos, aproveitar melhor suas oportunidades de crédito, equilibrar suas dívidas, selecionar produtos financeiros para sua segurança, investir com correção, segurança e disciplina e equilibrar suas decisões financeiras para uma vida com mais realizações.	http://books.google.com.br/books/content?id=vH4U49MeT38C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788535257830	208	2009-05-28	Elsevier Brasil	INTELIGÊNCIA FINANCEIRA PESSOAL NA PRÁTICA	Como Organizar sua Vida Financeira
769	Stve McConnell	\N	\N	\N	\N	2004	Microsoft	A practical handbook of software construction	Code complete
770	Justin G. Longenecker,CARLOS W. MOORE,J. WILLIAM PETTY,LESLIE E. PALICH	Por meio de abordagem com instruções e orientações úteis este livro-texto incorpora, passo a passo, teorias e práticas mais utilizadas para iniciar, liderar e administrar pequenas empresas. Também conta com questões para discussão e exercícios que facilitam o aprendizado e estimulam a reflexão sobre os conceitos abordados.	images\\no-image.png	9788522105502	498	2007	\N	\N	Administração de pequenas empresas
771	Desconhecido	\N	\N	\N	\N	\N	\N	\N	Manual de Frascati
772	Angel Flores	\N	\N	\N	\N	\N	Dover	A Beginner's Dual-Language Book	First Spanish Readers
788	JOSE LUIZ MEINBERG,ALFREDO BRAVO,CLAUDIO GOLDBERG,FRANCIS MARTINS	A proposta deste livro é, muito mais do que discutir técnicas de vendas, abordar as premissas necessárias para se desenvolver e implementar uma gestão estratégica de vendas que logre êxito quanto a resultados. Este livro compõe as Publicações FGV Management, programa de educação continuada da Fundação Getulio Vargas (FGV).	images\\no-image.png	9788522509928	168	\N	\N	\N	GESTAO ESTRATEGICA DE VENDAS
773	EQUIPE DE PROFESSORES FEA/USP	Esta obra busca apresentar a Contabilidade como instrumento de administração. O livro parte de uma visão de conjunto dos relatórios emanados pela Contabilidade, buscando detalhar a análise sobre os lançamentos originários. Os autores buscam expor os significados da função controladora da Contabilidade e das peças contábeis. Traz em apêndices explicações sobre a correção monetária do balanço e análise de demonstrações contábeis.	images\\no-image.png	9788522458158	352	\N	\N	ATUALIZADA COM AS LEIS No 11.638/07 E No 11.941/09	CONTABILIDADE INTRODUTORIA - TEXTO
774	Don Tapscott	Segundo a obra, a colaboração tradicional - em salas de reuniões, teleconferências e centros de convenções - vem sendo sistematicamente superada por colaborações em escala astronômica. Enquanto alguns executivos temem o crescimento exponencial dessas enormes comunidades online, 'Wikinomics' busca provar que tal medo é pura insensatez. Empresas inteligentes podem explorar competência e genialidade do coletivo para estimular inovação, crescimento e sucesso. Baseado em um projeto de pesquisa de US$ 9 milhões liderado pelo renomado autor Don Tapscott, 'Wikinomics' objetiva mostrar que multidões de pessoas podem participar da economia como nunca aconteceu antes. Através da colaboração em massa, os indivíduos criam uma gama de bens e serviços gratuitos e de código aberto que qualquer um pode utilizar ou modificar. Assim, produzem novos programas de TV, sequenciam o genoma humano, remixam suas músicas favoritas, elaboram softwares, descobrem curas para doenças, editam textos, inventam novos cosméticos e até constroem motocicletas.	http://books.google.com.br/books/content?id=VAcJmzjJF74C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788520919972	367	2007	Singular Digital	como a colaboração em massa pode mudar o seu negócio	Wikinomics
775	Carlos Alberto Júlio	\N	http://www.carlosjulio.com.br/wp-content/uploads/2011/03/cedro-capa11-214x300.jpg	\N	\N	2011	Virgiliae	Uma revolução em curso: defina seu papel, as oportunidades e as possibilidades do Brasil neste novo mundo	A Economia do Cedro
776	Steven D. Levitt,Stephen J. Dubner,AFONSO CELSO DA CUNHA SERRA	Baseado em pesquisas de Steven Levitt, 'Superfreakonomics' objetiva fazer com que os leitores reflitam sobre o modo de pensar diferentes questões, como - o que é mais perigoso - dirigir ou andar a pé bêbado?; por que os homens-bomba deveriam ter seguro de vida?; por que os indianos não usam camisinha?.	images\\no-image.png	9788535237283	247	2010	\N	o lado oculto do dia a dia	Superfreakonomics
777	N. Gregory Mankiw	Sumário - 1. Dez Princípios de Economia; 2. Pensando como um Economista; 3. Interdependência e Ganhos Comerciais; 4. As Forças de Mercado da Oferta e da Demanda; 5. Elasticidade e sua Aplicação; 6. Oferta, Demanda e Políticas do Governo; 7. Consumidores, Produtores e Eficiência dos Mercados; 8. Aplicação - Os Custos da Tributação; 9. Aplicação; Comércio Internacional; 10. Externalidades; 11. Bens Públicos e Recursos Comuns; 12. O Projeto de Sistema Tributário; 13. Os Custos de Produção; 14. Empresas em Mercados Competitivos; 15. Monopólio; 16. Composição Monopolística; 17. Oligopólio; 18. Os Mercados de Fatores de Produção; 19. Ganhos e Discriminação; 20. Desigualdade de Renda e Pobreza; 21. A Teoria da Escolha do Consumidor; 22. Fronteiras da Microeconomia.	images\\no-image.png	9788522107094	502	2010	\N	\N	Princípios de microeconomia
778	Emma Eberlein O. F. Lima ... (et al.)	Specially the Red book is full of new grammars that make the learner ready for the last book. This book totally satisfies the A2 level. I liked this book and I think It will help you to learn portuguese in the most standard way.	https://03fcd67fd51850d3ba6b-6cb392df11a341bce8c76b1898d0c030.ssl.cf3.rackcdn.com/large/9788/5125/9788512545707.jpg	\N	169	2013	E.P.U.	Curso Básico de Português para Esrtangeiros	Novo Avenida Brasil2
779	Desconhecido	\N	\N	\N	\N	\N	Abril	Táticas e Estratégias	Spellfire - O poder da Magia
780	James M. Reeve	'Fundamentos de Contabilidade - princípios' é utilizado para ensinar várias gerações de executivos. A obra apresenta a contabilidade aos alunos por meio de ampla variedade de métodos. Contempla os complementos para as adaptações necessárias à realidade contábil e tributária do Brasil. As adaptações foram feitas dentro da metodologia original do livro e têm como foco, principalmente, as diferenças da legislação tributária entre o Brasil e os Estados Unidos, bem como o fato de as práticas contábeis brasileiras estarem alinhadas com as internacionais, ainda não totalmente harmonizadas às práticas contábeis dos Estados Unidos. Os conceitos são seguidos de exemplos, acompanhados de modelos ilustrativos e casos. Além disso, todos os capítulos apresentam uma série extensiva de exercícios dos mais variados formatos, o que permite o aprendizado dos princípios de contabilidade.	http://books.google.com.br/books/content?id=uQ6vCvwu4-oC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788522106929	349	\N	Cengage Learning Editores	\N	Fundamentos de Contabilidade: princípios
781	Tercio Sampaio Ferraz Jr.	\N	http://mlb-d1-p.mlstatic.com/direito-en-livros-universitarios-852101-MLB20283403201_042015-Y.jpg	\N	346	1987	Atlas	Técnica, Decisão, Dominação	Introdução ao Estudo do Direito
782	BRIAN GREENE	Traduzindo o pensamento físico-matemático para o plano da lógica visual, Greene mostra como a teoria das supercordas pode compatibilizar os dois pilares antagônicos da física moderna - a relatividade geral e a mecânica quântica - e levar a uma compreensão final sobre a estrutura e o funcionamento do universo.	http://books.google.com.br/books/content?id=PxOywbsi8jYC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788535900989	592	1999	\N	SUPERCORDAS, DIMENSOES OCULTAS E A BUSCA	UNIVERSO ELEGANTE, O
783	K. C. Cole	\N	http://thumbs.buscape.com.br/livros/o-universo-e-a-xicara-de-cha-k-c-cole-8501073830_200x200-PU6e4665f7_1.jpg	\N	\N	2006	Record	A matemática da verdade e da beleza	O Universo e a Xícara de Chá
784	Steve Mockus,Funnel Inc.	Using real signs from around the world, presents a day in the life of the stick character used to illustrate all sorts of perils, including falling off a cliff, slipping on a wet floor, and improperly operating a forklift.	http://books.google.com.br/books/content?id=EdAOqq3-qyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781452111544	140	2012-09-12	Chronicle Books	\N	Stick Man's Really Bad Day
785	Domênico De Masi	A maior parte das criações humanas é obra não de gênios individuais, mas de grupos e de coletividades nos quais cooperam personalidades concretas e personalidades fantasiosas, motivadas por um líder carismático, por uma meta compartilhada. Hoje, mais do q	http://d19qz1cqidnnhq.cloudfront.net/imagens/capas/_90bd3474ef444aae345a3f82d5e027fd1b2e3a8f.jpg	9788575420928	795	2003	\N	\N	Criatividade e grupos criativos
786	A.C. Bhaktivendanta Swami Pravhupãda	\N	\N	\N	\N	\N	\N	\N	A Ciência da Autorealização
787	Benjamin Graham	\N	\N	\N	\N	2007	671	Um guia prático de como ganhar dinheiro na bolsa	O investidor inteligente
789	Jeff Jarvis	\N	\N	\N	\N	2009	Harper Business	\N	What Would Google Do?
790	Lawrence J. Gitman,ALLAN VIDIGAL HASTINGS	Em sintonia com as tendências no ramo da educação, esta edição traz as seções 'Em sua vida pessoal', que mostra como os estudantes podem utilizar os tópicos apresentados nos capítulos em seu dia a dia, e 'Exemplo de finanças pessoais', que demonstra como aplicar os conceitos, as ferramentas e as técnicas da administração financeira nas decisões financeiras pessoais. Outra novidade desta edição são os apêndices brasileiros, que complementam os principais tópicos tratados no livro, conferindo-lhes um caráter nacional. Entre outros assuntos, esses apêndices abordam o impacto da Lei Sarbanes-Oxley para as empresas brasileiras, os impactos da transição da contabilidade brasileira para o padrão IFRS e os aspectos de tributação das pessoas jurídicas no Brasil.	http://funflyship.com.br/wp-content/uploads/imgext/foto-2015-07-09-03-59-11-344952227547765-funflyship.jpg	9788576053323	775	2010	\N	\N	Principios de administração financeira
791	IDALBERTO CHIAVENATO	Esta obra pretende avaliar e discutir as condições favoráveis para o pequeno e médio empreendedor abrir o próprio negócio ou alavancá-lo, bem como impulsionar o crescimento a longo prazo. O livro busca oferecer orientações, tais como- quais são as decisões iniciais e básicas para começar um negócio ou alavancar um empreendimento atual; como planejar o negócio, organizá-lo e montar estratégias; como obter financiamentos e pessoal; como assegurar a viabilidade, a competitividade e a sustentabilidade em um mercado em constante transformação e como manter a lucratividade a curto prazo e o crescimento a longo prazo.	images\\no-image.png	9788520432778	332	\N	\N	EMPREENDEDOR	EMPREENDEDORISMO - DANDO ASAS AO ESPIRITO
792	Gustavo Franco	\N	http://cdn.wp.clicrbs.com.br/mundodosnegocios/files/2016/04/F%C3%B3rum-da-Liberdade.jpg	\N	307	2016	Fórum da Liberdade	\N	Serie Pensamentos Liberais
793	Afonso Fleury e Maria Tereza Leme Fleury	\N	\N	\N	\N	\N	\N	\N	Aprendizagem e Inovação Organizacional
794	Jerri L. Ledford	\N	\N	\N	\N	\N	\N	Otimização para Mecanismos de Busca	SEO
795	Catherine Whitney	\N	http://images.americanas.io/produtos/01/00/item/7356/6/7356643GG.jpg	\N	\N	2009	Best business	Monte seu próprio negócio, conquiste sua liberdade, seja um vencedor	A Grande Ideia
796	Vermont Life Magazine	Each writer takes a month in this stunning new book capturing the changing beauty of Vermont's incomparable countryside. Every lover of Vermont will relish this portfolio of over 100 full-color photographs accompanied by poetry and prose that add insight and meaning to the visual experience.Authors include Chris Bohjalian, David Budbill, Galway Kinnell, Reeve Lindbergh, Howard Frank Mosher, Noel Perrin, Katherine Patterson, Castle Freeman, Julia Alvarez, and others.	http://books.google.com.br/books/content?id=KKNoAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781931389075	112	2004-10-01	\N	\N	The Twelve Seasons Of Vermont
797	Gláucia Roberta Rocha Fernandes,Telma de Lurdes São Bento Ferreira,Vera Lúcia Ramos	'Muito prazer - Fale o português do Brasil' é um curso de português para estrangeiros que tem como objetivo capacitar o leitor, de qualquer nacionalidade, a aprender o português falado no Brasil e a comunicar-se. Com abordagem para o ensino e o aprendizado do português, deve combinar características das abordagens de ensino de língua estrangeira. Além disso, o material visa apresentar o léxico e a gramática para uma boa comunicação em português por meio de atividades, que apresentam a linguagem em uso na comunicação dos brasileiros. O livro traz as respostas no final.	images\\no-image.png	9788578440053	468	2008	\N	fale o português do Brasil	Muito Prazer
798	Marcus Hearn	\N	\N	\N	\N	\N	BBC	\N	Doctor Who - The Fault
799	Robert W. Sebesta	Robert Sebesta oferece nesta obra as ferramentas necessárias para uma avaliação crítica das linguagens de programação existentes e futuras. Conceitos fundamentais, itens de projetos de várias construções e exame de escolhas em algumas das linguagens mais usadas, comparando-as com as possíves alternativas, fazem parte do texto.	http://books.google.com.br/books/content?id=b0tcn_uPLoAC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788536301716	638	2003	Bookman	\N	Conceitos de Linguagens de Programacao
800	CARMEN NUNES,ROSSANNA PRADO,LETICIA NUNES	\N	http://www2.al.rs.gov.br/biblioteca/Portals/biblioteca/img/Autores%20ALRS/Of%C3%ADcios%20antigos%20de%20porto%20alegre%20-%20Capa.jpg	9788591248803	102	\N	\N	\N	OFICIOS ANTIGOS DE PORTO ALEGRE
801	GEORGES DUBY,PHILIPPE ARIES	Organizada por Antoine Prost e Gerard Vincent, a coleção 'História da Vida Privada' é composta por cinco volumes que fazem uma análise do cotidiano ao longo da História Universal. Em períodos históricos, os volumes estão divididos em - 'V.1 - Do Império Romano ao Ano Mil'; 'V.2 - Da Europa Feudal à Renascença'; 'V.3 - Da Renascença ao Século das Luzes'; 'V.4 - Da Revolução Francesa a Primeira Guerra'; 'V.5 - Da Primeira Guerra a Nossos Dias'.	images\\no-image.png	9788535914511	\N	\N	\N	\N	CAIXA HISTORIA DA VIDA PRIVADA, 5 VOLUMES
802	Antônio Arnot Crespo	\N	\N	\N	\N	1996	Editora Saraiva	\N	Matemática Comercial e Financeira Fácil
803	Umberto Eco	\N	\N	\N	\N	1977	Editora Perspectiva	\N	Como se Faz uma Tese
804	Ministerio do Trabalho e Emprego	\N	\N	\N	100	2009	Ministerio do Trabalho e Emprego	\N	Inclusão das Pessoas com Deficiência no Mercado de Trabalho
805	Luísa F. Habigzang & Sílvia H. Koller	\N	http://www.casadopsicologo.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/n/interven_o_psicologia_para_crian_as_e_adolescentes_vitimas.jpg	\N	125	2011	Casa do pSICÓLOGO	Manual de capacitação profissional	Intervenção psicológica para crianças e adolescentes vitimas de violência sexual
806	David Folkenflik	The news media is in the middle of a revolution. Old certainties have been shoved aside by new entities such as WikiLeaks and Gawker, Politico and the Huffington Post. But where, in all this digital innovation, is the future of great journalism? Is there a difference between an opinion column and a blog, a reporter and a social networker? Who curates the news, or should it be streamed unimpeded by editorial influence? Expanding on Andrew Rossi's riveting film ("Slate"), David Folkenflik has convened some of the smartest media savants to talk about the present and the future of news. Behind all the debate is the presence of the New York Times, and the inside story of its attempt to navigate the new world, embracing the immediacy of the web without straying from a commitment to accurate reporting and analysis that provides the paper with its own definition of what it is there to showcase: all the news that's fit to print."	http://books.google.com.br/books/content?id=3ufxR8u_TFQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781610390774	188	2011	PublicAffairs	Inside the New York Times and the Future of Journalism	Page One
823	Alistair Cockburn	This guide will help readers learn how to employ the significant power of use cases to their software development efforts. It provides a practical methodology, presenting key use case concepts.	http://books.google.com/books/content?id=VKJQAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780201702255	270	2001	Addison-Wesley Professional	\N	Writing Effective Use Cases
807	Lucas Carlson, Leonard Richardson	Why spend time on coding problems that others have already solved when you could be making real progress on your Ruby project? This updated cookbook provides more than 350 recipes for solving common problems, on topics ranging from basic data structures, classes, and objects, to web development, distributed programming, and multithreading.\n\nRevised for Ruby 2.1, each recipe includes a discussion on why and how the solution works. You’ll find recipes suitable for all skill levels, from Ruby newbies to experts who need an occasional reference. With Ruby Cookbook, you’ll not only save time, but keep your brain percolating with new ideas as well.	http://akamaicovers.oreilly.com/images/0636920032236/lrg.jpg	\N	961	2015-03-10	O'Reilly	Recipes for Object-Oriented Scripting	Ruby Cookbook, 2nd Edition
808	Mary Poppendieck,Tom Poppendieck	* * A clear path for more rapid and less expensive development of robust software applications *Lean techniques have already achieved great success in other industries including auto manufacturing, healthcare, and construction *Lean principles help organizations achieve a competitive advantage by fostering higher performance	http://books.google.com.br/books/content?id=UalKAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780321150783	203	2003	Addison-Wesley Professional	An Agile Toolkit	Lean Software Development
809	Neal Ford	Presents advice on time-saving techniques and includes productivity tools for effective software development.	http://books.google.com.br/books/content?id=8kebAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780596519780	206	2008-12-08	"O'Reilly Media, Inc."	\N	The Productive Programmer
810	Marianne Nishihata	História de um japonês que lutou na Segunda Guerra Mundial pelo Brasil, ou seja, contra o Japão. Ele se apaixona por uma carioca, mas o romance é considerado proibido. Antes de ir para o combate, ele diz que prefere morrer na guerra do que não ficar com ela. Os dois trocam cartas durante o conflito e essas correspondências estão reproduzidas no livro.		\N	319	2015	Planeta	\N	Amor Entre Guerras
811	Joaquim Torres	\N	https://cdn.shopify.com/s/files/1/0155/7645/products/Amazon-Gestao-Produtos_large.jpg?v=1445365475	\N	\N	\N	Casa do Código	Como aumentar as chances de sucesso do seu software	Gestão de produtos de software
812	Sharon Smith	A socialist perspective on women's oppression and liberation, exploring the connection between women's rights and equality for all.	http://books.google.com.br/books/content?id=BZaFCgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781608461806	260	2015-03-17	Haymarket Books	Marxism, Feminism, and Women's Liberation	Women and Socialism
813	Paulo Caroli	Ao trabalhar em um projeto, você não quer desperdiçar tempo, dinheiro, nem esforço construindo um produto que não vai atender às suas expectativas ou de seu cliente. Para isso, é preciso validar as hipóteses de negócio e viabilizar possíveis passos de criação com o time todo. Neste livro, Paulo Caroli compartilha a receita da técnica Direto ao Ponto: uma sequência de atividades rápidas e efetivas para entender e planejar a criação de produtos enxutos, baseadas no conceito de produto mínimo viável.	https://cdn.shopify.com/s/files/1/0155/7645/products/eBook-Direto-ao-Ponto_large.jpg?v=1464960251	\N	148	08/2015	Casa do Código	\N	Direto ao ponto: Criando produtos de forma enxuta
814	Stephen King	\N	\N	\N	\N	\N	\N	\N	The drawing of the Three
815	FLAVIO GOMES DA SILVA LISBOA	O maior esforço do desenvolvimento de sistemas não está na criação, mas na manutenção. As aplicações tornam-se cada vez mais complexas, e os requisitos dos clientes alteram-se várias vezes, antes de o projeto estar concluído. É preciso uma estrutura que permita a reutilização de código-fonte e o desenvolvimento simultâneo de partes do sistema, além de desvincular a aplicação do banco de dados, de forma que este possa ser trocado com o menor impacto possível. 'Zend Framework' vem ao encontro desses problemas com a proposta de criar uma arquitetura flexível que permite o desenvolvimento de aplicações web MVC em PHP 5 com código reutilizável e mais fácil de manter, permitindo que os desenvolvedores concentrem-se nas regras de negócio do cliente. Este livro descreve passo a passo os fundamentos do framework por meio da criação de uma aplicação web completa.	http://books.google.com/books/content?id=KknweHja7pkC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788575221587	184	2008-01-01	Novatec Editora	DESENVOLVENDO EM PHP 5 ORIENTADO A OBJETOS COM MVC	ZEND FRAMEWORK
816	Grady Booch,James Rumbaugh,Ivar Jacobson	Há quase dez anos, a Unified Modeling Language (UML) é o padrão para visualizar, especificar, construir e documentar os artefatos de um sistema de software. A UML 2.0 vem para assegurar a contínua popularidade e viabilidade da linguagem. Sua simplicidade e expressividade permitem que os usuários modelem tudo, desde sistemas empresariais de informação, passando por aplicações distribuídas baseadas na Web e chegando a sistemas embutidos de tempo real. Nesta nova edição totalmente revista, os criadores da linguagem fornecem um tutorial dos aspectos centrais da UML. Começando com um modelo conceitual da UML, o livro aplica progressivamente a linguagem a uma série de problemas de modelagem cada vez mais complexos usando diversos domínios de aplicação. A abordagem em tópicos e recheada de exemplos que fez da primeira edição um recurso indispensável continua a mesma. Entretanto, o conteúdo foi totalmente revisto e reflete a mudanças na notação e no uso exigido pela UML 2.0. Ganchos - Nova edição de um best-seller já adotado por várias universidades. Os autores são os criadores da UML. Boa margem operacional.	http://books.google.com/books/content?id=ddWqxcDKGF8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788535217841	474	2006	Elsevier Brasil	guia do usuário	UML
817	P. Fernando Bastos de Ávila	\N	\N	\N	\N	\N	\N	\N	Pequena enciclopédia de moral e civismo
818	Thomas L. Friedman	'O mundo é plano' é uma análise da globalização e seus êxitos e opositores. Quando, daqui a vinte anos, os historiadores se debruçarem sobre a história do mundo e chegarem ao capítulo 'ano 2000 a março de 2004', que fatos destacarão como os mais important	http://books.google.com/books/content?id=Z_eQp4GyLzYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788573028638	557	2006	Editora Objetiva	\N	Mundo É Plano, O
819	Carlos Drummond de Andrade	\N	\N	\N	\N	\N	\N	\N	Nova Reunião, 23 livros de poesia 2
820	Ian Rankin	\N	\N	\N	\N	\N	\N	\N	The Hanging Garden
821	Greg Smith,Ahmed Sidky	Many books discuss Agile from a theoretical or academic perspective. Becoming Agile takes a different approach and focuses on explaining Agile from a case-study perspective. Agile principles are discussed, explained, and then demonstrated in the context of a case study that flows throughout the book. The case study is based on a mixture of the author's real-world experiences. Becoming Agile also focuses on the importance of adapting Agile principles to the realities of your environment. In the early days of Agile, there was a general belief that Agile had to be used in all phases of a project, and that it had to be used in its purest form. Over the last few years, reputable Agile authorities have begun questioning this belief: We're finding that the best deployments of Agile are customized to the realities of a given company. Becoming Agile discusses the cultural realities of deploying Agile and how to deal with the needs of executives, managers, and the development team during migration. The author discusses employee motivation and establishing incentives that reward support of Agile techniques. Purchase of the print book comes with an offer of a free PDF, ePub, and Kindle eBook from Manning. Also available is all code from the book. Praise for Becoming Agile... "This is much more than just a book about Agile. This is a roadmap. A very detailed roadmap that takes you from the initial "is Agile right for me?" stage through completion and delivery of your pilot project and beyond." -Charlie Griefer, Senior Software Engineer, Amcom Technology "...a must read for those of us who have come from years of waterfall and attempts at changes to "traditional" methodologies or processes... clear, concise and has plenty of example scenarios that many individuals and corporations would identify with." -Jamie Phillips, Senior Software Engineer, Picis Inc "This book is quite unique. It is written in a form of a 5-day training course. I am usually not a fan of such a writing style, but I think that Becoming Agile is an exception. It's about a software process and as such requires a lot of case studies, group exercises (or at least what a book format allows), and therefore the training course style is perfect to facilitate learning." -Vladimir Pasman, Cocoacast.com "Becoming Agile in an Imperfect World offers a different and useful look at Agile methods. Reminding us that becoming agile is more of a mindset adjustment than a process change, Sidky and Smith use a case study to share their insights and tools throughout the book, including the unique Sidky Agile Measurement Index (SAMI)." -Sanjiv Augustine, President, LitheSpeed LLC and author of Managing Agile Projects "The authors emphasise that the aim should be to create a customised agile development process that is tailored to the needs of the organisation...Instead of aiming for "agile perfection", one should aim at reaching the right level of agility for one's organisation. Excellent advice!" -Kailash Awati, Eight to Late "The book totally inspired me. A lot of my readings on Agile from back in the day were very theoretical and high level at the same time. But Becoming Agile helps take you to the next level by going beyond the theory and into the nitty gritty practicality of employing the Agile approach. So it was very energizing having the game plan laid out in front of you, as well as the hurdles you'll encounter and how to overcome them." -Tariq Ahmed, author of Flex 3 in Action	http://books.google.com/books/content?id=3snaGgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781933988252	380	2009	Manning Publications	--in an Imperfect World	Becoming Agile
822	Ken Schwaber	Using real-world examples, discusses how to manage the change involved when businesses adopt the Scrum model.	http://books.google.com/books/content?id=NA-WHQO7QDMC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780735623378	152	2007	"O'Reilly Media, Inc."	\N	The Enterprise and Scrum
861	W3C Brasil	\N	http://brasil.estadao.com.br/blogs/vencer-limites/wp-content/uploads/sites/189/2016/06/CARTILHA-01.jpg	\N	36	\N	W3C Brasil, nic.br, cgi.br	Fascículo II	Cartilha Acessibilidade na Web
824	Laurie Williams,Robert R. Kessler	Written as instruction for pair programming newbies, with practical improvement tips for those experienced with the concept, this guide explores the operational aspects and unique fundamentals of pair programming; information such as furniture set-up, pair rotation, and weeding out bad pairs.	http://books.google.com/books/content?id=LRQhdlrKNE8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780201745764	265	2003	Addison-Wesley Professional	\N	Pair Programming Illuminated
825	Simson Garfinkel	Use of the Internet is expanding beyond anyone's expectations. As corporations, government offices, and ordinary citizens begin to rely on the information highway to conduct business, they are realizing how important it is to protect their communications -- both to keep them a secret from prying eyes and to ensure that they are not altered during transmission. Encryption, which until recently was an esoteric field of interest only to spies, the military, and a few academics, provides a mechanism for doing this. PGP, which stands for Pretty Good Privacy, is a free and widely available encryption program that lets you protect files and electronic mail. Written by Phil Zimmermann and released in 1991, PGP works on virtually every platform and has become very popular both in the U.S. and abroad. Because it uses state-of-the-art public key cryptography, PGP can be used to authenticate messages, as well as keep them secret. With PGP, you can digitally "sign" a message when you send it. By checking the digital signature at the other end, the recipient can be sure that the message was not changed during transmission and that the message actually came from you. PGP offers a popular alternative to U.S. government initiatives like the Clipper Chip because, unlike Clipper, it does not allow the government or any other outside agency access to your secret keys. PGP: Pretty Good Privacy by Simson Garfinkel is both a readable technical user's guide and a fascinating behind-the-scenes look at cryptography and privacy. Part I, "PGP Overview," introduces PGP and the cryptography that underlies it. Part II, "Cryptography History and Policy," describes the history of PGP -- its personalities, legal battles, and other intrigues; it also provides background on the battles over public key cryptography patents and the U.S. government export restrictions, and other aspects of the ongoing public debates about privacy and free speech. Part III, "Using PGP," describes how to use PGP: protecting files and email, creating and using keys, signing messages, certifying and distributing keys, and using key servers. Part IV, "Appendices," describes how to obtain PGP from Internet sites, how to install it on PCs, UNIX systems, and the Macintosh, and other background information. The book also contains a glossary, a bibliography, and a handy reference card that summarizes all of the PGP commands, environment variables, and configuration variables.	http://books.google.com/books/content?id=cSe_0OnZqjAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781565920989	393	1995	"O'Reilly Media, Inc."	\N	PGP: Pretty Good Privacy
826	Souza, Roberto de Mello e	Trata-se de uma narrativa do cotidiano da guerra no front italiano, entre 1944 e 1945, feita por um cabo da Força Expedicionária Brasileira - FEB -, comandante de um pelotão de desarmamento de minas terrestres. O desafio deste soldado era desarmar a famosa Mina R, tenebroso artefato de morte alemão, que nunca havia sido desarmado. A narrativa mescla o dia a dia no front com as muitas etapas vividas pelo cabo, no processo de vencer a Mina R. O texto vem seguido de um apêndice com quatro críticas elogiosas - de Bóris Schnaiderman, de Berta Waldman, Giuseppe Carlo Rossi (especialista italiano em língua e literatura portuguesa e brasileira) e Manuel da Costa Pinto, todos unânimes no reconhecimento das qualidades literárias de 'Mina R'.	http://statics.livrariacultura.net.br/products/capas_lg/277/42138277.jpg	\N	236	2013	Ouro Sobre Azul	\N	Mina R
827	Ron Jeffries,Ann Anderson,Chet Hendrickson	Extreme programming. The circle of life. On-site customer. User stories. Acceptance tests. Sidebar: Acceptance test samples. Story estimation. Interlude: Sense of completion. Small releases. Customer defines release. Interation planning. Quick design session. Programming. Sidebar: Code Quality. Pair programming. Unit tests. Sidebar: xUnit. Test first, by intention. Releasing changes. Do or do not. Experience improves estimates. Resources, scope, quality, time. Steering. Steering the interation. steering the release. Handling defects. Sidebar: Advanced Issue: Defect databases; Advanced practice: Tests as database. Conclusion. Bonus tracks: We'll try. How to estimate anything. Infrastructure. It's chet's fault. Balancing hopes and fears. Testing improves code. XPer tries Java. A Java perspective. A true story. Estmates and promises. Everything that could possibly break.	http://books.google.com/books/content?id=5ZuPjdO8LLoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780201708424	265	2001	Addison-Wesley Professional	\N	Extreme Programming Installed
828	Doug Wallace,Isobel Raggett,Joel Aufgang	Allowing readers to tailor cutting-edge best practices from software development to achieve success in Web development is the goal of this comprehensive guide. The book details a proven process that helps readers deliver Web projects on time, within budget, and with fewer defects.	http://books.google.com/books/content?id=BGMk5f4tMHUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780201794274	168	2003	Addison-Wesley Professional	\N	Extreme Programming for Web Projects
829	James W. Newkirk, Robert C. Martin	Extreme Programming (XP) is a lightweight methodology that enables small teams of developers to achieve breakthrough productivity and software quality, even when faced with rapidly changing or unclear requirements. In this new book, top object-oriented consultants James Newkirk and Robert Martin walk through an entire XP project, chronicling the adoption of XP by a team that has never used it before. Along the way, they show how to overcome the obstacles facing XP adopters, and present realistic XP best practices virtually any development organization can benefit from. The case study in this book is real, driven by the needs of a real customer. The artifacts, code, user stories, and anecdotes are all real, drawn from videotaped meetings throughout the project's development process. The result: an exceptionally true-to-life narrative, complete with mistakes and false starts, and reflecting the ebb and flow of a real project. For organizations considering XP, this may be the most realistic and useful guide ever produced. For project managers, developers, software engineers, XP customers, and upper-level managers.	https://images-na.ssl-images-amazon.com/images/I/51XNSAXVAPL._SX376_BO1,204,203,200_.jpg	\N	224	2001	Addison-Wesley Professional	\N	Extreme Programming in Practice
830	Giancarlo Succi,Michele Marchesi	Extreme Programming (XP) is a flexible programming discipline that emphasizes constant integration, frequent small releases, co Extreme Programming (XP) is a flexible programming discipline that emphasizes constant integration, frequent small releases, continual customer feedback, and a teamwork approach. With considerable fanfare, XP has taken the mainstream of software engineering by storm. It has been adopted by an increasing number of development organizations worldwide. At the first annual Conference on Extreme Programming and Flexible Processes in Software Engineering, held in Italy in June of 2000, leading theorists and practitioners came together to share principles, techniques, tools, best practices for XP, and other flexible methodologies. Extreme Programming Examined gathers the 33 most insightful papers from this conference into one volume. With contributions by Kent Beck, Martin Fowler, Ward Cunningham, Ron Jeffries, and other visionaries in the field, these papers together represent the state-of-the-art in XP methodology as well as a glimpse at the future of XP. Individual articles are organized into cohesive categories that allow the reader to learn and apply this ma	http://books.google.com/books/content?id=O0wuZfH_brEC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780201710403	569	2001	Addison-Wesley Professional	\N	Extreme Programming Examined
831	J K Rowling	"This special edition of "Harry Potter and the Chamber of Secrets" has a gorgeous new cover illustration by Kazu Kibuishi. Inside is the full text of the original novel, with decorations by Mary GrandPre. " The Dursleys were so mean and hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he s packing his bags, Harry receives a warning from a strange, impish creature named Dobby who says that if Harry Potter returns to Hogwarts, disaster will strike. And strike it does. For in Harry s second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockhart, a spirit named Moaning Myrtle who haunts the girls bathroom, and the unwanted attentions of Ron Weasley s younger sister, Ginny. But each of these seem minor annoyances when the real trouble begins, and someone or something starts turning Hogwarts students to stone. Could it be Draco Malfoy, a more poisonous rival than ever? Could it possibly be Hagrid, whose mysterious past is finally told? Or could it be the one everyone at Hogwarts most suspects Harry Potter himself! "	https://d39ttiideeq0ys.cloudfront.net/assets/images/book/large/9780/5455/9780545582926.jpg	\N	341	27 Aug 2013	Scholastic	\N	Harry Potter and the Chamber of Secrets
832	Juliano Niederauer	Desenvolvendo Websites com PHP apresenta técnicas de programação fundamentais para o desenvolvimento de sites dinâmicos e interativos. Você aprenderá a desenvolver sites com uma linguagem utilizada em mais de 10 milhões de sites no mundo inteiro. O livro abrange desde noções básicas de programação até a criação e manutenção de bancos de dados, mostrando como são feitas inclusões, exclusões, alterações e consultas a tabelas de uma base de dados. O autor apresenta diversos exemplos de programas para facilitar a compreensão da linguagem. Nesta obra, você irá encontrar os seguintes tópicos: O que é PHP e quais são suas características; Conceitos básicos e avançados de programação em PHP; Como manipular diversos tipos de dados com o PHP; Criação de programas orientados a objetos (OOP); Comandos PHP em conjunto com tags HTML; Utilização de includes para aumentar o dinamismo de seu site; Como tratar os dados enviados por um formulário HTML; Utilidade das variáveis de ambiente no PHP; Criação de banco de dados em MySQL, PostgreSQL ou SQLite; Comandos SQL para acessar o banco de dados via PHP; Como criar um sistema de username/password para seu site; Utilização de cookies e sessões; Leitura e gravação de dados em arquivos-texto; Como enviar e-mails pelo PHP.	images\\no-image.png	9788575222348	304	2011-03-10	Novatec Editora	Aprenda a criar Websites dinâmicos e interativos com PHP e bancos de dados	Desenvolvendo Websites com PHP - 2ª Edição
833	Roberto G. A. Veiga	As interfaces gráficas de usuário, como o KDE e o Gnome, mesmo tendo evoluído muito nos últimos anos e contribuído inegavelmente para a popularização do Linux, não diminuíram a importância da linha de comando para os usuários deste sistema operacional. O Linux, como típico sistema Unix-like, oferece um vasto conjunto de comandos, conjunto este que cresce a cada dia. \n\nEste guia aborda mais de 250 comandos do Linux (entre comandos internos do Bash e programas utilitários), descrevendo-os, demonstrando suas sintaxes e apresentando suas opções e demais argumentos de linha de comando, de forma bastante completa. \n\nIndispensável para profissionais que desejam obter o máximo de proveito dos recursos do Linux. \n\nPrático para carregar e consultar a qualquer momento, no trabalho ou em casa.	https://s3.amazonaws.com/static.novatec.com.br/capas-ampliadas/capa-ampliada-8575220608.jpg	\N	144	2004	NOVATEC	Guia de Consulta Rápida	Comandos do Linux
834	Juliano Niederauer	•\tPHP é uma linguagem de scripting, gratuita e com código-fonte aberto, utilizada para a criação de páginas dinâmicas na Web. É executada no servidor e pode ser embutida na HTML, além de suportar a maioria dos bancos de dados atuais, como MySQL, PostgreSQL, InterBase, Oracle e SQL Server. \n•\tEste guia descreve a linguagem PHP, versão 5, apresentando sua sintaxe básica e ensinando a utilizar constantes, variáveis, operadores, estruturas de controle, entre outros recursos. Além disso, a maior parte do guia consiste em uma referência das funções do PHP, divididas em seções de fácil identificação, como Arrays, Data/Hora, Diretórios, FTP, HTTP, Imagens, Matemática, PDF, Sessões, Strings, Variáveis e XML. \n•\tIndispensável para quem quer obter o máximo proveito dos recursos do PHP, sem perder tempo consultando volumosos manuais. \n•\tPrático para carregar e consultar a qualquer momento, no trabalho ou em casa.	https://s3.amazonaws.com/static.novatec.com.br/capas-ampliadas/capa-ampliada-9788575221488.jpg	\N	144	2008	NOVATEC	Guia de consulta rápida	PHP 5
835	Rubens Prates	\N	https://s3.amazonaws.com/static.novatec.com.br/capas-ampliadas/capa-ampliada-8585184752.jpg	\N	128	2000	NOVATEC	Guia de Consulta Rápida	ASP
836	J. K. Rowling	Harry Potter is a wizard. He is in his second year at Hogwarts School of Witchcraft and Wizardry. Little does he know that this year will be just as eventful as the last… 'Harry Potter and the Chamber of Secrets is as good as its predecessor … Hogwarts is a creation of genius.' The Times Literary Supplement. All the Harry Potter titles are now available in large print. This best-selling series has sold over 100 million copies around the world.	http://books.google.com/books/content?id=QHLZrQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780747560722	506	2002	Bloomsbury UK	\N	Harry Potter and the Chamber of Secrets
837	Dale Carnegie	\N	\N	\N	\N	\N	Editora Nacional	\N	Como fazer amigos e influenciar pessoas
838	Douglas Adams	\N	https://upload.wikimedia.org/wikipedia/en/thumb/5/53/The_Salmon_of_Doubt_Macmillan_front.jpg/220px-The_Salmon_of_Doubt_Macmillan_front.jpg	\N	\N	\N	\N	\N	The Salmon of Doubt
839	Douglas Adams	For Dirk Gently, private detective, a simple search for a missing cat uncovers a bewildered ghost, a secret time traveller, and a devastating secret that threatens the future of humanity.	http://books.google.com/books/content?id=Qrz5A0KlidcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780671746728	320	1991-06-01	Simon and Schuster	\N	Dirk Gently's Holistic Detective Agency
840	Douglas Adams	When a passenger check-in desk shoots through the roof of a terminal at Heathrow Airport in flames, Dirk Gently investigates the cosmic forces at play	http://books.google.com/books/content?id=h7pjdEPBeGUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780671742515	320	1991-02-15	Simon and Schuster	\N	Long Dark Tea-Time of the Soul
863	Glynn Christian	\N	http://statics.livrariacultura.net.br/products/capas_lg/752/30364752.jpg	\N	\N	\N	Gutenberg	\N	Como cozinhar SEM receita
894	Kerry Patterson,Ron McMillan	Existen momentos claves en los que una palabra o un gesto nos pueden acercar o alejar irremisiblemente de nuestros objetivos. Conversaciones críticas le ofrece las herramientas para dirigir las conversaciones más difíciles e importantes, decir lo que pien	http://books.google.com/books/content?id=IewWPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788495787392	288	2004	Ediciones Urano	claves para el éxito cuando la situación es crítica	Conversaciones cruciales
841	Maria Yedda Leite Linhares,Ciro Flamarion Santana Cardoso	História Geral do Brasil, um clássico da historiografia nacional, nesta sexta edição atualizada, introduz novas contribuições originais de seus autores, resultados de suas pesquisas e teses acadêmicas, e um novo capítulo, que apresenta uma visão de conjunto da década de 1984-1994, dominada pela abertura democrática, pela participação popular e pelo fortalecimento das aspirações de mudança social. Destinado ao público universitário, pelo seu caráter sintético e polêmico, dirige-se também ao público culto em geral. Despojado de formalismo acadêmico, este livro apresenta uma visão dos grandes marcos políticos do país, compatibilizando-os com os sistemas sócio-econômicos, suas características fundamentais e suas crises. Dividido em três partes -- a Colônia, o Brasil independente e o Brasil atual --, reúne ensaios notáveis de um elenco de historiadores Maria Yedda Linhares (Organizadora), Ciro Flamarion Cardoso, Francisco Carlos Teixeira da Silva, Hamilton de Mattos Monteiro, João Luís Fragoso e Sonia Regina de Mendonça.	http://books.google.com/books/content?id=VRh7AAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9788535200447	445	2000	\N	\N	História geral do Brasil
842	Joe Sacco	\N	http://4.bp.blogspot.com/-LjStG7O4qWc/Tp08-ZsrMoI/AAAAAAAABM0/9NMdpniycys/s1600/Gorazde+1+-+hollweg-guiga.blogspot.com.jpg	\N	\N	\N	\N	A guerra na Bósnia Oriental	Área de Segurança Gorazde
843	Mark L. Knapp; Judith A. Hall	Desde a primeira publicação nos Estados Unidos, em 1972, o livro vem sendo utilizado por estudiosos e também em salas de aula, abrangendo grande variedade de interesses acadêmicos nas áreas de comunicação, orientação, psicologia, etologia, desenvolvimento infantil e relações familiares, educação, linguística, fala e ciência da fala. Isso não surpreende, uma vez que o material utilizado provém da pesquisa conduzida por estudiosos dessas mesmas áreas. Entender a comunicação não-verbal é na verdade uma empreitada multidisciplinar. O fato de um dos autores representar a área de comunicação e o outro de psicologia social apenas reforça a integração existente nesses setores.	http://fnac.vteximg.com.br/arquivos/ids/372754-400-400/160-355524-0-5-comunicacao-nao-verbal-na-interacao-humana.jpg	\N	492	1999	JSN Editora LTDA.	\N	Comunicação não-verbal na interação humana
844	Durval de Noronha Goyos,Goyos Júnior Goyos Jr.	\N	https://d19qz1cqidnnhq.cloudfront.net/imagens/capas/de6b2577045afa85f16bb068b1d3b74451375448.jpg	9788585548247	678	2003	\N		Dicionário Jurídico Noronha
845	Kief Morris	This book explains how to take advantage of technologies like cloud, virtualization, and configuration automation to manage IT infrastructure using tools and practices from software development. These technologies have decoupled infrastructure from the underlying hardware, turning it into data and code. "Infrastructure as Code" has emerged alongside the DevOps movement as a label for approaches that merge concepts like source control systems, Test Driven Development (TDD) and Continuous Integration (CI) with infrastructure management. Virtualization and cloud make it easy to rapidly expand the size of infrastructure, but the habits and practices we used in the past with hardware-based infrastructure don't keep up. Teams end up with hundreds of servers, all a bit different, and find themselves unable to fully automate their infrastructure. The book will go through the challenges and problems created by all these wonderful new tools, and the principles and mindset changes that a team needs to make to use them effectively. It describes patterns, practices, and ideas that have been adopted from software develpment, especially Agile concepts, and brought into the IT Ops world as part of the DevOps movement. These ways of working have been proven in many organizations, including well known names like Netflix, Amazon, and Etsy, and also in more established organizations including publishers, banks, and even the British government.	http://books.google.com/books/content?id=kOnurQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491924358	362	2016-06-21	O'Reilly Media	Managing Servers in the Cloud	Infrastructure As Code
846	Dafydd Stuttard,Marcus Pinto	Provides information on how to discover security flaws in Web applications to defend against hackers.	http://books.google.com/books/content?id=jN6cDprdnd0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781118026472	878	2011-09-27	John Wiley & Sons	Finding and Exploiting Security Flaws	The Web Application Hacker's Handbook
847	Oded Goldreich	\N	\N	\N	797	\N	\N	Volume 11 basic application	Foundation of Cryptography
848	Jeff Laskowski	Security is one of the most difficult areas in today’s IT industry. The reason being; the speed at which security methods are developing is considerably slower than the methods of hacking. One of the ways to tackle this is to implement Agile IT Security. Agile IT security methodology is based on proven software development practices. It takes the best works from Agile Software Development (Scrum, OpenUp, Lean) and applies it to security implementations. This book combines the Agile software development practices with IT security. It teaches you how to deal with the ever-increasing threat to IT security and helps you build robust security with lesser costs than most other methods of security. It is designed to teach the fundamental methodologies of an agile approach to IT security. Its intent is to compare traditional IT security implementation approaches to new agile methodologies. Written by a senior IT specialist at IBM, you can rest assured of the usability of these methods directly in your organization. This book will teach IT Security professionals the concepts and principles that IT development has been using for years to help minimize risk and work more efficiently. The book will take you through various scenarios and aspects of security issues and teach you how to implement security and overcome hurdles during your implementation. It begins by identifying risks in IT security and showing how Agile principles can be used to tackle them. It then moves to developing security policies and identifying your organization's assets. The last section teaches you how you can overcome real-world issues in implementing Agile security in your organization including dealing with your colleagues. What you will learn from this book : Understand the various modern-day security risks and concerns and how Agile IT security is useful in dealing with these risks Learn Agile principles like pairwise, refactoring, collective ownership, collaboration, track project divergence and velocity rates Develop security policies and articulate security value and take steps to ensure your employees’ security awareness Identify your organization’s high value assets and apply risk-driven security Employ Lean implementation principles like eliminating waste, amplified learning, late decisions and fast deliveries Learn what teams in your organization can help you with security, and tie up with them Learn how to overcome Agile barriers and fears and train your security professionals Learn Agile team success factors and Agile risk success factors Approach The book is a tutorial that goes from basic to professional level for Agile IT security. It begins by assuming little knowledge of agile security. Readers should hold a good knowledge of security methods and agile development. Who this book is written for The book is targeted at IT security managers, directors, and architects. It is useful for anyone responsible for the deployment of IT security countermeasures. Security people with a strong knowledge of agile software development will find this book to be a good review of agile concepts.	http://books.google.com/books/content?id=m60aAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781849685702	120	2011-11-22	Packt Publishing Ltd	\N	Agile It Security Implementation Methodology
849	Oded Goldreich	Cryptography is concerned with the conceptualization, definition and construction of computing systems that address security concerns. This book presents a rigorous and systematic treatment of the foundational issues: defining cryptographic tasks and solving new cryptographic problems using existing tools. It focuses on the basic mathematical tools: computational difficulty (one-way functions), pseudorandomness and zero-knowledge proofs. Rather than describing ad-hoc approaches, this book emphasizes the clarification of fundamental concepts and the demonstration of the feasibility of solving cryptographic problems. It is suitable for use in a graduate course on cryptography and as a reference book for experts.	http://books.google.com/books/content?id=UQnJjgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780521035361	396	2007-01-18	Cambridge University Press	\N	Foundations of Cryptography: Volume 1, Basic Tools
850	Viktor Farcic	This book is about different techniques that help us architect software in a better and more efficient way with microservices packed as immutable containers, tested and deployed continuously to servers that are automatically provisioned with configuration management tools. It's about fast, reliable and continuous deployments with zero-downtime and ability to roll-back. It's about scaling to any number of servers, design of self-healing systems capable of recuperation from both hardware and software failures and about centralized logging and monitoring of the cluster.In other words, this book envelops the whole microservices development and deployment lifecycle using some of the latest and greatest practices and tools. We'll use Docker, Kubernetes, Ansible, Ubuntu, Docker Swarm and Docker Compose, Consul, etcd, Registrator, confd, and so on. We'll go through many practices and even more tools. Finally, while there will be a lot of theory, this is a hands-on book. You won't be able to complete it by reading it in a metro on a way to work. You'll have to read this book while in front of the computer and get your hands dirty.	http://books.google.com/books/content?id=zPCRjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781523917440	414	2016-02-06	Createspace Independent Publishing Platform	Automating the Continuous Deployment Pipeline With Containerized Microservices	The Devops 2.0 Toolkit
851	Georgia Weidman	\N	\N	\N	495	\N	\N	A hands on introduction to Hacking	Penetration Testing
852	Henrik Kniberg,Mattias Skarin	Scrum and Kanban are two flavours of Agile software development - two deceptively simple but surprisingly powerful approaches to software development. So how do they relate to each other? The purpose of this book is to clear up the fog, so you can figure out how Kanban and Scrum might be useful in your environment. Part I illustrates the similarities and differences between Kanban and Scrum, comparing for understanding, not for judgement. There is no such thing as a good or bad tool - just good or bad decisions about when and how to use which tool. This book includes: - Kanban and Scrum in a nutshell - Comparison of Kanban and Scrum and other Agile methods - Practical examples and pitfalls - Cartoons and diagrams illustrating day-to-day work - Detailed case study of a Kanban implementation within a Scrum organization Part II is a case study illustrating how a Scrum-based development organization implemented Kanban in their operations and support teams.	http://books.google.com/books/content?id=Hx1KAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780557138326	120	2010	Lulu.com	\N	Kanban and Scrum - Making the Most of Both
853	Kent Beck	From best-selling author Kent Beck comes one of the most important books since the release of the GOF's Design Patterns!	http://books.google.com/books/content?id=i40hAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321413093	157	2008-01	Addison-Wesley Professional	\N	Implementation Patterns
854	Henrik Kniberg	\N	\N	\N	169	\N	\N	how we do scrum	2nd edition Scrum and XP FROM THE TRENCHES
855	Michal Zalewski	Modern web applications are built on a tangle of technologies that have been developed over time and then haphazardly pieced together. Every piece of the web application stack, from HTTP requests to browser-side scripts, comes with important yet subtle security consequences. To keep users safe, it is essential for developers to confidently navigate this landscape. In The Tangled Web, Michal Zalewski, one of the world's top browser security experts, offers a compelling narrative that explains exactly how browsers work and why they're fundamentally insecure. Rather than dispense simplistic advice on vulnerabilities, Zalewski examines the entire browser security model, revealing weak points and providing crucial information for shoring up web application security. You'll learn how to: * Perform common but surprisingly complex tasks such as URL parsing and HTML sanitization * Use modern security features like Strict Transport Security, Content Security Policy, and Cross-Origin Resource Sharing * Leverage many variants of the same-origin policy to safely compartmentalize complex web applications and protect user credentials in case of XSS bugs * Build mashups and embed gadgets without getting stung by the tricky frame navigation policy * Embed or host user-supplied content without running into the trap of content sniffing For quick reference, "Security Engineering Cheat Sheets" at the end of each chapter offer ready solutions to problems you're most likely to encounter. With coverage extending as far as planned HTML5 features, The Tangled Web will help you create secure web applications that stand the test of time.	http://books.google.com/books/content?id=NU3wOk2jzWsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781593273880	320	2012	No Starch Press	A Guide to Securing Modern Web Applications	The Tangled Web
856	Ross Anderson	This reference guide to creating high quality security software covers the complete suite of security applications referred to as end2end security. It illustrates basic concepts of security engineering through real-world examples.	http://books.google.com/books/content?id=ILaY4jBWXfcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780470068526	1040	2008-04-14	John Wiley & Sons	A Guide to Building Dependable Distributed Systems	Security Engineering
857	Harold Abelson	\N	\N	\N	657	\N	\N	second edition	Structure and interpretation of computer programs
858	David Flanagan	Português:\n\nEsse livro foi meu primeiro contato com Javascript, e posso dizer que aprendi muito sobre como ele funciona (coisas como sintaxe, closures, variable hoisting, objeto global, etc.). O livro foi escrito para Javascript 1.5, e aborda tanto a API padrão quanto para browsers.\n\nNão se assuste com o tamanho do livro. As seções são bem separadas, e grande parte do final é composta de documentação das APIs padrão e da DOM. Hoje uso ele principalmente como referência.\n\nEnglish:\n\nMy first contact with Javascript was with this book, and I can say for sure that I learned a lot about how Javascript works (such as syntax, closures, variable hoisting, global object, etc.). This book was written for version 1.5 and explains both the default and DOM APIs.\n\nDon't be scared by the books huge size. The sections are well separated, and a great portion of the book is composed of API documentation. Today I mostly use this book as a reference.	http://akamaicovers.oreilly.com/images/9780596805531/lrg.jpg	\N	994	August 2016	O'Reilly	The Definitive Guide	JavaScript
859	Pedrinho A. Guareschi	Para aqueles indignados e generosos que querem mudar o mundo, a fim de que seja mais humano e justo para todos, este livro de Pedrinho Guareschi é um roteiro precioso e certeiro.\nEle vai logo ao cerne das questões. Sua linguagem é direta e por todos compreensível. Especialmente nos adverte e instrui sobre os caminhos ilusórios. E nos fornece todos os tijolinhos com os quais se constrói coletiva e historicamente o tipo de sociedade que se apresenta melhor, mais humana e integradora.\nO livro termina como devia terminar: mostrando-nos a imprescindível presença da utopia como luz nas mentes e calor nos corações.	http://www.mundojovem.com.br/arquivos/produtos/188_249/livro_sociologia_critica_521.jpg	\N	156	\N	ediPUCRS	Alternativas de mudança	SOCIOLOGIA CRÍTICA
860	Jeremy Keith	\N	http://www.awwwards.com/awards/images/2012/08/responsive-web-design-books-transparency%20(2).png	\N	\N	\N	\N	\N	Responsive Web Design
862	Paulo Caroli	\N	\N	\N	188	2015	Casa do Código	Criando produtos de forma enxuta	Direto ao Ponto
864	Cassio de Sousa Antonio	Pro React teaches you how to successfully structure increasingly complex front-end applications and interfaces. This book explores the React library in depth, as well as detailing additional tools and libraries in the React ecosystem, enabling you to create complete, complex applications. You will learn how to use React completely, and learn best practices for creating interfaces in a composable way. You will also cover additional tools and libraries in the React ecosystem (such as React Router and Flux architecture). Each topic is covered clearly and concisely and is packed with the details you need to learn to be truly effective. The most important features are given no-nonsense, in-depth treatment, and every chapter details common problems and how to avoid them. If you already have experience creating front-end apps using jQuery or perhaps other JavaScript frameworks, but need to solve the increasingly common problem of structuring complex front-end applications, then this book is for you. Start working with React like a pro - add Pro React to your library today.	http://books.google.com/books/content?id=uSwWswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781484212615	297	2015-12-24	Apress	\N	Pro React
865	Dr. Abhay Bang	Journey in search of health for the people	\N	\N	28	\N	\N	Journey in search of health for the people	Sevagram to Shodhgram
866	Gojko Adzic	A practical guide to impact mapping, a simple yet incredibly effective method for collaborative strategic planning that helps organizations make an impact with software.	http://books.google.com/books/content?id=6tNoMwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780955683640	86	2012-10-01	Provoking Thoughts	Making a Big Impact with Software Products and Projects	Impact Mapping
867	Chris Hefley	\N	https://media.licdn.com/mpr/mpr/shrinknp_800_800/AAEAAQAAAAAAAAQrAAAAJGNlZGEyNWEzLWMyMTMtNGRlNy1iYTVhLWViNTM5MThiMzIxNg.png	\N	27	\N	\N	How to get started in 5 steps	Kanban Roadmap
868	Sal Freudenberg, Katherine Kirk	e Inclusive Collaboration campaign - co-founded by Dr. Sallyann Freudenberg and Katherine Kirk - aims to promote, embrace and celebrate neurodiversity in tech. This short book contains a set of experiments to help teams, divisions and companies think about how to escape the mediocrity of monoculture, and truly benefit from the incredible...	https://s3.amazonaws.com/titlepages.leanpub.com/theinclusivecollaborationexperiments/hero?1474896590	\N	70	2016	Leanpub	A short book of activities about working with all kinds of minds	The inclusive collaboration experiments
898	Dobre & Xhafa (editors)	With coverage of the components for intelligently collecting data, resource and data management issues, fault tolerance, data security, monitoring and controlling big data, and applications for pervasive context-aware processing, this timely, comprehensive book provides the state-of-the-art technological solutions necessary for the development of next-generation pervasive data systems	https://images-na.ssl-images-amazon.com/images/I/51-aVRv2PAL._SX404_BO1,204,203,200_.jpg	\N	\N	2016	\N	Next Generation Platforms for Intelligent Data Collection	Pervasive Computing, 1st Edition
869	Maria Luiza Marcelino	Maria Luiza MArcelino é uma mulher determinada, forte, segura, simpática e muito caridosa. Començou sua vida de trabalho muito cedo, com cinco anos já tinha muitas responsabilidades ajudando sua mãe con deveres de casa. Quando completou dez anos foi trabalhar na casa dos outros para complementar a renda e assim ajudar a cuidae dos quatro irmãos. Se casou aos vinte anos e se separou aos trinta e oito, hoje mãe de dois filhos continua sua jornada de trabalho, com fé e foco de uma grande guerreira que não se deixa abater.	https://dl.dropboxusercontent.com/u/16618482/Libros/IMG_20161122_145923992.jpg	\N	66	2015	\N	Lamento de um povo Negro	Quilombola
870	Jeffrey K Liker, Karyn Ross		https://images-na.ssl-images-amazon.com/images/I/51C-D1xfh-L._SX329_BO1,204,203,200_.jpg	\N	448	20/09/2016	Mc Graw Hill	Lean Transformation in Service Organizations	The Toyota Way to Service Excellence
871	Donald A. Norman	An expanded edition of the author's pioneering classic on the application of cognitive science to design explains how to depend less on hidden controls, arbitrary functions and user memory while making functions more visible so that consumers are naturally guided to correct controls. Original.	http://books.google.com/books/content?id=ScxrlwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780465050659	347	2013	Basic Books (AZ)	\N	The Design of Everyday Things
872	Kent Beck	Este livro tem o intuito de ilustrar com exemplos práticos e reais como codificar e executar testes automatizados. Pretende apresentar o TDD é de modo simples e abordar respostas a problemas e dúvidas.	images\\no-image.png	9788577807246	240	2010	\N	\N	TDD Desenvolvimento Guiado por Testes
873	Don Jones,Jeffery Hicks,Richard Siddaway	Summary PowerShell in Depth, Second Edition is the go-to reference for administrators working with Windows PowerShell. Every major technique, technology, and tactic is carefully explained and demonstrated, providing a hands-on guide to almost everything an admin would do in the shell. Written by three experienced authors and PowerShell MVPs, this is the PowerShell book you'll keep next to your monitor—not on your bookshelf! Purchase of the print book includes a free eBook in PDF, Kindle, and ePub formats from Manning Publications. About the Book A Windows admin using PowerShell every day may not have the time to search the net every time he or she hits a snag. Wouldn't it be great to have a team of seasoned PowerShell experts ready to answer even the toughest questions? That's what you get with this book. PowerShell in Depth, Second Edition is the go-to reference for administrators working with Windows PowerShell. Every major technique, technology, and tactic is carefully explained and demonstrated, providing a hands-on guide to almost everything an admin would do in the shell. Written by PowerShell MVPs Don Jones, Jeffrey Hicks, and Richard Siddaway, each valuable technique was developed and thoroughly tested, so you'll be able to consistently write production-quality, maintainable scripts while saving hours of time and effort. This book assumes you know the basics of PowerShell. What's Inside Automating tasks Packaging and deploying scripts Introduction to Desired State Configuration PowerShell security Covers PowerShell version 3 and later About the Authors Don Jones, Jeffery Hicks, and Richard Siddaway are Microsoft MVPs, trainers, and administrators. Collectively, they've authored nearly three dozen books on PowerShell and Windows administration. Table of Contents PART 1 POWERSHELL FUNDAMENTALS Introduction PowerShell hosts Using the PowerShell help system The basics of PowerShell syntax Working with PSSnapins and modules Operators Working with objects The PowerShell pipeline Formatting PART 2 POWERSHELL MANAGEMENT PowerShell Remoting Background jobs and scheduling Working with credentials Regular expressions Working with HTML and XML data PSDrives and PSProviders Variables, arrays, hash tables, and script blocks PowerShell security Advanced PowerShell syntax PART 3 POWERSHELL SCRIPTING AND AUTOMATION PowerShell's scripting language Basic scripts and functions Creating objects for output Scope PowerShell workflows Advanced syntax for scripts and functions Script modules and manifest modules Custom formatting views Custom type extensions Data language and internationalization Writing help Error handling techniques Debugging tools and techniques Functions that work like cmdlets Tips and tricks for creating reports PART 4 ADVANCED POWERSHELL Working with the Component Object Model (COM) Working with .NET Framework objects Accessing databases Proxy functions Building a GUI WMI and CIM Working with the web Desired State Configuration	http://books.google.com/books/content?id=rnJ0oAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781617292187	744	2014-11-06	Manning Publications	\N	Powershell in Depth
874	David A. Black	\N	https://www.safaribooksonline.com/library/cover/9781617291692/360h/	\N	506	2014	Manning	Second Edition	The Well-Grounded Rubyist
893	Mihaly Csikszentmihalyi	\N	http://www.casasbahia-imagens.com.br/livros/AdministracaoNegocios/RecursosHumanosCarreira/276421/5427947/Gestao-Qualificada-a-Conexao-entre-Felicidade-e-Negocio-276421.jpg	\N	179	2004	bookman	a conexão entre felicidade e negócio	Gestão Qualificada
895	samuel bowles and hebert gintis	Schooling in Capitalist America: Educational Reform and the Contradictions of Economic Life is a 1976 book by Marxist economists Samuel Bowles and Herbert Gintis. Widely considered a groundbreaking work in sociology of education,[citation needed] it argues the "correspondence principle" explains how the internal organization of schools corresponds to the internal organisation of the capitalist workforce in its structures, norms, and values. For example, the authors assert the hierarchy system in schools reflects the structure of the labour market, with the head teacher as the managing director, pupils fall lower down in the hierarchy. Wearing uniforms and discipline are promoted among students from working class, as it would be in the workplace for lower levels employees. Education provides knowledge of how to interact in the workplace and gives direct preparation for entry into the labour market.	https://images-na.ssl-images-amazon.com/images/I/51t8Rs7n5UL._SX345_BO1,204,203,200_.jpg	\N	340	1976	haymarket	educational reform and the contradictions of economic life	Schooling in Capitalist America
899	David Bell	\N	http://d3vdsoeghm4gc3.cloudfront.net/Custom/Content/Products/62/46/624630_localizacao-ainda-e-tudo-venda-mais-usando-a-influencia-do-mundo-real-sobre-os-habitos-de-compra-na-internet-743747_m1_636141075117826000.jpg	\N	\N	\N	\N	Venda mais usando a influência do mundo real sobre os hábitos de compra na internet	Localização (ainda) é tudo
875	Peter J. Jones	If you're an experienced Ruby programmer, Effective Ruby will help you harness Ruby's full power to write more robust, efficient, maintainable, and well-performing code. Drawing on nearly a decade of Ruby experience, Peter J. Jones brings together 48 Ruby best practices, expert tips, and shortcuts—all supported by realistic code examples. Jones offers practical advice for each major area of Ruby development, from modules to memory to metaprogramming. Throughout, he uncovers little-known idioms, quirks, pitfalls, and intricacies that powerfully impact code behavior and performance. Each item contains specific, actionable, clearly organized guidelines; careful advice; detailed technical arguments; and illuminating code examples. When multiple options exist, Jones shows you how to choose the one that will work best in your situation. Effective Ruby will help you systematically improve your code—not by blindly following rules, but by thoroughly understanding Ruby programming techniques. Key features of this concise guide include How to avoid pitfalls associated with Ruby's sometimes surprising idiosyncrasies What you should know about inheritance hierarchies to successfully use Rails (and other large frameworks) How to use misunderstood methods to do amazingly useful things with collections Better ways to use exceptions to improve code reliability Powerful metaprogramming approaches (and techniques to avoid) Practical, efficient testing solutions, including MiniTest Unit and Spec Testing How to reliably manage RubyGem dependencies How to make the most of Ruby's memory management and profiling tools How to improve code efficiency by understanding the Ruby interpreter's internals	http://books.google.com/books/content?id=pzd_BAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780133846973	211	2014-09-01	Pearson Education	48 Specific Ways to Write Better Ruby	Effective Ruby
876	David Thomas,Chad Fowler,Andrew Hunt	Summary: Ruby 1.9 was a major release of the language: it introduced multinationalization, new block syntax and scoping rules, a new, faster, virtual machine, and hundreds of new methods in dozens of new classes and modules. Ruby 2.0 is less radical--it has keyword arguments, a new regexp engine, and some library changes. This book describes it all. The first quarter of the book is a tutorial introduction that gets you up to speed with the Ruby language and the most important classes and libraries. Download and play with the hundreds of code samples as your experiment with the language. The second section looks at real-world Ruby, covering the Ruby environment, how to package, document, and distribute code, and how to work with encodings. The third part of the book is more advanced. In it, you'll find a full description of the language, an explanation of duck typing, and a detailed description of the Ruby object model and metaprogramming. The book ends with a reference section: comprehensive and detailed documentation of Ruby's libraries. You'll find descriptions and examples of more than 1,300 methods in 58 built-in classes and modules, along with brief descriptions of 97 standard libraries. Ruby makes your programming more productive; it makes coding fun again. And this book will get you up to speed with the very latest Ruby, quickly and enjoyably.	http://books.google.com/books/content?id=2LulngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781937785499	863	2013	\N	The Pragmatic Programmers' Guide	Programming Ruby 1.9 & 2.0
877	Obie Fernandez,Kevin Faustino	The "Bible" for Rails Development: Now Fully Updated for Rails 4.1 "When I read The Rails Way for the first time, I felt like I truly understood Rails for the first time." --From the Foreword by Steve Klabnik Ruby on Rails 4 is leaner, tighter, and even more valuable to professional web developers. More than ever, it helps you focus on what matters most: delivering business value via clean and maintainable code. The Rails(tm) 4 Way is the only comprehensive, authoritative guide to delivering production-quality code with Rails 4. Kevin Faustino joins pioneering Rails developer Obie Fernandez to illuminate the entire Rails 4 API, including its most powerful and modern idioms, design approaches, and libraries. They present extensive new and updated content on security, performance, caching, Haml, RSpec, Ajax, the Asset Pipeline, and more. Through detailed code examples, you'll dive deep into the Rails 4 code base, discover why Rails is designed as it is, and learn how to make it do exactly what you want. Proven in dozens of production systems, this book's techniques will maximize your productivity and help you build more successful solutions. You'll want to keep this guide by your computer--you'll refer to it constantly. This guide will help you Build powerful, scalable REST-compliant APIs Program complex program flows using Action Controller Represent models, relationships, CRUD operations, searches, validation, callbacks, and more Smoothly evolve application database schema via Migrations Apply advanced Active Record techniques: single-table inheritance, polymorphic models, and more Create visual elements with Action View and partials Optimize performance and scalability with view caching Master the highly productive Haml HTML templating engine Make the most of Rails' approach to session management Secure your systems with Rails 4's improved authentication and authorization Resist SQL Injection, XSS, XSRF, and other attacks Extend Rails with popular gems and plugins, and learn to write your own Integrate email services with Action Mailer Use Ajax via Rails 4 support for unobtrusive JavaScript Improve responsiveness with background processing Leverage Asset Pipeline to simplify development, improve perceived performance, and reduce server burdens Accelerate implementation and promote maintainability with RSpec	http://books.google.com/books/content?id=FRKpAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780321944276	814	2014-01-30	Pearson Education	\N	The Rails 4 Way
878	Márcia Tiburi	\N	http://www.record.com.br/exibe_thumb_novidades.asp?arquivo=colecao_fEBH9r.png&w=144	\N	196	2016	Editora Record	Reflexões sobre o Cotidiano Autoritário Brasileiro	Como conversar com um Fascista
879	Davi Kopenawa,Bruce Albert	\N	http://statics.livrariacultura.net.br/products/capas_lg/659/42987659.jpg	9788535926200	\N	2015	\N	palavras de um xamã yanomami	A queda do céu
880	Susan Faludi	Examines the current trend in antifeminism in America to reveal biases against women in film, science, law, and politics, explaining how women have lost ground in their quest for equal rights.	http://books.google.com/books/content?id=GfDa1cdeHT0C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780307345424	575	1991	Broadway Books	The Undeclared War Against American Women	Backlash
881	Paulo Freire	\N	http://statics.livrariacultura.net.br/products/capas_lg/274/22589274.jpg	\N	256	2016	Paz & Terra	\N	Pedagogia do Oprimido
882	Paulo Freire	\N	http://statics.livrariacultura.net.br/products/capas_lg/274/22589274.jpg	\N	256	2016	Paz & Terra	\N	Pedagogia do Oprimido
883	J. -D. Nasio	\N	https://www.lectio.com.br/upload/1/zahar/capas/1180g.jpg	\N	176	\N	Jorge Zahar Editor	\N	Como Trabalha um Psicanalista
884	Dulce Magalhães	\N	http://img.loja.editorasaraiva.com.br/128358-500-0.jpg	\N	116	\N	Editora Saraiva		Manual da disciplina para indisciplinados
885	Howard Gardner, Mihaly Csikszentmihalyi, Willian Damon	\N	http://ecx.images-amazon.com/images/I/41fZCAd7KOL.SL720.jpg	\N	293	2004	Artmed	Quando a excelência e a ética se encontram	Trabalho Qualificado
886	Urie Bronfenbrenner	\N	http://loja.grupoa.com.br/uploads/imagensTitulo/20110803105449_BRONFENBRENNER_Bioecologia_Desenvolvimento_Humano_G.jpg	\N	310	\N	Artmed	Tornando os seres humanos mais humanos	Bioecologia do Desenvolvimento Humano
887	CLAUDIA BITENCOURT,CRISTIANE FROEHLICH,DEBORA AZEVEDO	Esta obra pretende apresentar cinco abordagens (trilhas) para o tema competências (estratégia, pessoas, processos, relações e concepção) e casos brasileiros e internacionais de empresas/instituições reconhecidas em seus segmentos.	https://www.traca.com.br/capas/870/870939.jpg	9788540702042	278	2013	Bookman	\N	Na Trilha das Competências: Caminhos Possíveis no Cenário das Organizações
888	Willian Poundstone	\N	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4099564&qld=90&l=430&a=-1	\N	291	\N	ZAHAR	Questões impossíveis e enigmas lógicos insanos usados nas entrevistas das maiores empresas do mundo	Você é inteligente o bastante para trabalhar no Google?
889	Lou Marinoff	\N	http://www.extra-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=2551260	\N	380	\N	Record	A filosofia aplicada ao cotidiano	Mais Platão, Menos Prozac
890	DAVID BOHM,RITA DE CASSIA GOMES	Esta obra aborda o processo criativo, onde o autor trata de sua considerada importância para a ciência, a arte e a vida em geral. Ao longo do ensaio, ele reflete sobre o que pode incitar a mente e procura compreender o contraste entre o pensamento mecânico e o pensamento criativo.	http://mlb-s2-p.mlstatic.com/sobre-a-criatividade-david-bohm-205001-MLB20263214776_032015-F.jpg	9788539301256	142	\N	UNESP	\N	SOBRE A CRIATIVIDADE
891	Dave Ulrich, Wayne Brockbank, Jon Younger, Mike Ulrich	\N	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=6488631&a=-1&qld=90&l=190	\N	277	\N	Bookman	\N	Competências globais do RH
892	Didier Retour, Thierry Picq, Christian Defélix, Roberto Ruas e colaboradores	\N	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=3529520&qld=90&l=430&a=-1	\N	190	Setembro de 2009	bookman	no limiar da estratégia	Competências Coletivas
900	Chimamanda Ngozi Adichie	O que significa ser feminista no século XXI? Por que o feminismo é essencial para libertar homens e mulheres? Eis as questões que estão no cerne de Sejamos todos feministas, ensaio da premiada autora de Americanah e Meio sol amarelo. "A questão de gênero é importante em qualquer canto do mundo. É importante que comecemos a planejar e sonhar um mundo diferente. Um mundo mais justo. Um mundo de homens mais felizes e mulheres mais felizes, mais autênticos consigo mesmos. E é assim que devemos começar: precisamos criar nossas filhas de uma maneira diferente. Também precisamos criar nossos filhos de uma maneira diferente. "Chimamanda Ngozi Adichie ainda se lembra exatamente da primeira vez em que a chamaram de feminista. Foi durante uma discussão com seu amigo de infância Okoloma. "Não era um elogio. Percebi pelo tom da voz dele; era como se dissesse: 'Você apoia o terrorismo!'". Apesar do tom de desaprovação de Okoloma, Adichie abraçou o termo e — em resposta àqueles que lhe diziam que feministas são infelizes porque nunca se casaram, que são "anti-africanas", que odeiam homens e maquiagem — começou a se intitular uma "feminista feliz e africana que não odeia homens, e que gosta de usar batom e salto alto para si mesma, e não para os homens". Neste ensaio agudo, sagaz e revelador, Adichie parte de sua experiência pessoal de mulher e nigeriana para pensar o que ainda precisa ser feito de modo que as meninas não anulem mais sua personalidade para ser como esperam que sejam, e os meninos se sintam livres para crescer sem ter que se enquadrar nos estereótipos de masculinidade.	http://books.google.com/books/content?id=dvWnBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9788543801728	50	2014-09-26	Companhia das Letras	\N	Sejamos todos feministas
901	Angela Davis	Mulheres, raça e classe, de Angela Davis, é uma obra fundamental para se entender as nuances das opressões. Começar o livro tratando da escravidão e de seus efeitos, da forma pela qual a mulher negra foi desumanizada, nos dá a dimensão da impossibilidade de se pensar um projeto de nação que desconsidere a centralidade da questão racial, já que as sociedades escravocratas foram fundadas no racismo. Além disso, a autora mostra a necessidade da não hierarquização das opressões, ou seja, o quanto é preciso considerar a intersecção de raça, classe e gênero para possibilitar um novo modelo de sociedade.	http://img.travessa.com.br/livro/BA/23/238f05f9-11f2-4313-949c-2887250c2cd6.jpg	\N	244	1944	Boitempo	Mulher, Raça e Classe	Angela Davis -  Mulher, Raça e Classe
902	tom engelhardt	In 1964, a book entitled The Invisible Government shocked Americans with its revelations of a growing world of intelligence agencies playing fast and loose around the planet, a secret government lodged inside the one they knew that even the president didn't fully control. Almost half a century later, everything about that "invisible government" has grown vastly larger, more disturbing, and far more visible. In his new book, Tom Engelhardt takes in something new under the sun: what is no longer, as in the 1960s, a national security state, but a global security one, fighting secret wars that have turned the president into an assassin-in-chief. This is a powerful survey of a democracy of the wealthy that your grandparents wouldn't have recognized.	https://images-na.ssl-images-amazon.com/images/I/51akj9SCvPL._SX324_BO1,204,203,200_.jpg	\N	174	2014	hymarketbook	Surveillance, secret wars, and a global security state in a single-superpower world	Shadow Government
903	Philip Kotler,Hermawan Kartajaya,Iwan Setiawan	O novo modelo de marketing - Marketing 3.0 - trata os clientes não como meros clientes, mas como os seres complexos e multifacetados. Estes, por sua vez, estão escolhendo produtos e serviços que satisfaçam suas necessidades de participação, criatividade, comunidade e idealismo. Neste livro, Philip Kotler mostra porque o futuro do marketing está em criar produtos, serviços e empresas que inspirem, incluam e reflitam os valores de seus consumidores-alvo. Ele também explica o futuro do marketing e porque a maioria de seus profissionais está presa ao passado.	http://www.abcconsultores.com.br/wp-content/uploads/2012/06/1.-Philip-Kotler-Marketing-3.0.jpg	9788535238693	215	2010	Campus	as forças que estão definindo o novo marketing centrado no ser humano	Marketing 3.0
904	Michel Chevalier; Gérald Mazzalovo	O livro apresenta de forma didática o conceito de marca como contrato entre empresas e consumidores, analisam a sua dimensão sígnica e sua função simbólica, os motivos pelos quais elas são acusadas de todas as mazelas do capitalismo, oferecendo ferramentas úteis para o gerenciamento da identidade das marcas.	http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=1913833&qld=90&l=430&a=-1	\N	351	2007	Panda Books	Marcas como fator de progresso	PRÓ LOGO
905	Al Anderson,Ryan Benedetti	A guide to computer networking covers such topics as planning network layouts, packet analysis, routing protocols, the domain name system, wireless networking, and security.	http://books.google.com/books/content?id=sg7Xi0j1-eoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780596521554	500	2009-06-11	"O'Reilly Media, Inc."	\N	Head First Networking
906	Christopher Duffy	\N	https://s3.amazonaws.com/static.novatec.com.br/capas-ampliadas/capa-ampliada-9788575225059.jpg	\N	304	2016	Novatec	\N	Aprendendo Pentest com Python
907	Paulo Caroli	\N	\N	\N	\N	\N	\N	\N	Direto ao Ponto
908	Andy Oram,John Viega	In this thought-provoking anthology, today's security experts describe bold and extraordinary methods used to secure computer systems in the face of ever-increasing threats. Beautiful Security features a collection of essays and insightful analyses by leaders such as Ben Edelman, Grant Geyer, John McManus, and a dozen others who have found unusual solutions for writing secure code, designing secure applications, addressing modern challenges such as wireless security and Internet vulnerabilities, and much more. Among the book's wide-ranging topics, you'll learn how new and more aggressive security measures work -- and where they will lead us. Topics include: Rewiring the expectations and assumptions of organizations regarding security Security as a design requirement Evolution and new projects in Web of Trust Legal sanctions to enforce security precautions An encryption/hash system for protecting user data The criminal economy for stolen information Detecting attacks through context Go beyond the headlines, hype, and hearsay. With Beautiful Security, you'll delve into the techniques, technology, ethics, and laws at the center of the biggest revolution in the history of network security. It's a useful and far-reaching discussion you can't afford to miss.	http://books.google.com/books/content?id=Z96bAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780596527488	281	2009-04-24	"O'Reilly Media, Inc."	Leading Security Experts Explain How They Think	Beautiful Security
934	Travis Bradberry,Jean Greaves	Presents a step-by-step guide for increasing emotional intelligence through four core principles: self-awareness, self-management, social awareness, and relationsip management.	http://books.google.com/books/content?id=JAP8B7R67K0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780974320625	255	2009	TalentSmart	\N	Emotional Intelligence 2.0
909	Dmitri Sotnikov	Modern web applications deserve modern tools. Harness the JVM's rich infrastructure while taking advantage of the expressive power and brisk performance of a modern functional language. Exploit Clojure's unique advantages for web development. Step by step, apply the fundamentals of programming in Clojure to build real-world, professional web applications. This edition features new libraries, tools, and best practices, and focuses on developing modern single-page applications. Stop developing web apps with yesterday's tools. Today, developers are increasingly adopting Clojure as a web-development platform. See for yourself what makes Clojure so desirable, as you create a series of web apps of growing complexity, exhibiting the full process of web development using a modern functional language. Journey through all the steps in developing a rich Picture Gallery web application--from conception to packaging and deployment. You'll work hands-on with Clojure and build real-world, professional web apps. This fully updated second edition reveals the changes in the rapidly evolving Clojure ecosystem. Get up to speed on the many new libraries, tools, and best practices. Gain expertise in the popular Ring/Compojure stack using the Luminus framework. Learn how Clojure works with databases and speeds development of RESTful services. See why ClojureScript is rapidly becoming a popular front-end platform, and use ClojureScript with the popular Reagent library to build single-page applications. This book is for you, whether you're already familiar with Clojure or if you're completely new to the language. What You Need: The latest JVM, Clojure 1.6+, and the Leiningen build tool, as well as an editor such as Emacs, IntelliJ, Eclipse, Light Table, or VI.	http://books.google.com/books/content?id=jzvRsgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781680500820	250	2016-07-24	\N	Build Bulletproof Web Apps with Less Code	Web Development with Clojure
910	Roxane Gay	A collection of essays spanning politics, criticism, and feminism from one of the most-watched young cultural observers of her generation, Roxane Gay.\n\n“Pink is my favorite color. I used to say my favorite color was black to be cool, but it is pink—all shades of pink. If I have an accessory, it is probably pink. I read Vogue, and I’m not doing it ironically, though it might seem that way. I once live-tweeted the September issue.”\n\nIn these funny and insightful essays, Roxane Gay takes us through the journey of her evolution as a woman (Sweet Valley High) of color (The Help) while also taking readers on a ride through culture of the last few years (Girls, Django in Chains) and commenting on the state of feminism today (abortion, Chris Brown). The portrait that emerges is not only one of an incredibly insightful woman continually growing to understand herself and our society, but also one of our culture.\n\nBad Feminist is a sharp, funny, and spot-on look at the ways in which the culture we consume becomes who we are, and an inspiring call-to-arms of all the ways we still need to do better.	https://images-na.ssl-images-amazon.com/images/I/41wmScO2UaL._SX331_BO1,204,203,200_.jpg	\N	320	2014	\N	\N	Bad Feminist
911	Dominik Hauser	Write testable and maintainable code to develop highly-functional iOS appsAbout This Book* Learn test-driven principles to help you build apps with fewer bugs and better designs* Become more efficient while working with Swift to move on to your next project faster!* Implement all of the principles of test-driven development (TDD) in to your daily programming workflowWho This Book Is ForMy reader have already done some application development with Swift. They follow the changes in each new Swift version. They also follow a few Swift developers on Twitter or Tumblr and read blog post from famous Swift bloggers. My reader have already heard about Test-Driven Development (TDD) but haven't done really much about it. But they have heard/read that TDD can help to write better code but they don't really know why.What you will learn* Implement TDD in Swift application development* Find bugs before you enter the code using the TDD approach* Use TDD to build models, view controllers, and views* Test network code with asynchronous tests and stubs* Write code that is a joy to read and to maintain* Develop functional tests to ensure the app works as planned* Employ continuous integration to make testing and deployment easierIn DetailTest-driven development (TDD) is a proven way to find software bugs early. Writing tests before your code improves the structure and maintainability of your apps. In combination with the improved syntax of Swift 3, there is no excuse or writing bad code.This book will help you understand the process of TDD and how it impacts your apps written in Swift. Through a practical, real-world example app, you'll start seeing how to implement TDD in context. You will begin with an overview of the TDD workflow and then deep dive into unit testing concepts and code cycles. We will showcase how functional tests work, which will help you improve the user interface. Finally, you will learn about continuous integration using the new user management feature in Xcode Server.	http://books.google.com/books/content?id=8c9hvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781787129078	246	2016-10-31	\N	\N	Test-Driven IOS Development with Swift 3 - Second Edition
912	Roger Fisher,William Ury,Bruce Patton	"Since it was first published in 1981 Getting to Yes has become a central book in the Business Canon: the key text on the psychology of negotiation. Its message of "principled negotiations"--finding acceptable compromise by determining which needs are fixed and which are flexible for negotiating parties--has influenced generations of businesspeople, lawyers, educators and anyone who has sought to achieve a win-win situation in arriving at an agreement. It has sold over 8 million copies worldwide in 30 languages, and since it was first published by Penguin in 1991 (a reissue of the original addition with Bruce Patton as additional coauthor) has sold over 2.5 million copies--which places it as the #10 bestselling title overall in Penguin Books, and #3 bestselling nonfiction title overall. We have recently relicensed the rights to Getting to Yes, and will be doing a new revised edition--a 30th anniversary of the original publication and 20th of the Penguin edition. The authors will be bringing the book up to date with new material and a assessment of the legacy and achievement of Getting to Yes after three decades"--	http://books.google.com/books/content?id=HImmNAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780143118756	204	2011	Penguin Paperbacks	Negotiating Agreement Without Giving in	Getting to Yes
913	Susan Cain	Demonstrates how introverted people are misunderstood and undervalued in today's culture, charting the rise of extrovert ideology while sharing anecdotal examples to counsel readers on how to use introvert talents to adapt to various situations and empower introverted children. Reprint. 150,000 first printing.	http://books.google.com/books/content?id=uNMjeFMorPgC&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780307352156	352	2013	Broadway Books	The Power of Introverts in a World that Can't Stop Talking	Quiet
914	Joel Grus	This is a first-principles-based, practical introduction to the fundamentals of data science aimed at the mathematically-comfortable reader with some programming skills. The book covers: The important parts of Python to know The important parts of Math / Probability / Statistics to know The basics of data science How commonly-used data science techniques work (learning by implementing them) What is Map-Reduce and how to do it in Python Other applications such as NLP, Network Analysis, and more	http://books.google.com/books/content?id=7iLNrQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491901427	330	2015-04-25	O'Reilly Media	\N	Data Science from Scratch
935	Jake Knapp,John Zeratsky,Braden Kowitz	From three design partners at Google Ventures, a unique five-day process--called the sprint--for solving tough problems using design, prototyping, and testing ideas with customers.	http://books.google.com/books/content?id=ICSpCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781501121746	288	2016-03-08	Simon and Schuster	How to Solve Big Problems and Test New Ideas in Just Five Days	Sprint
915	Jonathan Rasmusson	This book is for everyone who needs to test the web. As a tester, you’ll automate your tests. As a developer, you’ll build more robust solutions. And as a team, you’ll gain a vocabulary and a means to coordinate how to write and organize automated tests for the web. Follow the testing pyramid and level up your skills in user interface testing, integration testing, and unit testing. Your new skills will free you up to do other, more important things while letting the computer do the one thing it’s really good at: quickly running thousands of repetitive tasks.	https://imagery.pragprog.com/products/459/jrtest.jpg?1467925103	\N	234	2016	\N	A Begginner's Guide to Automating Tests	The Way of the Web Tester
916	Peter W. Singer,Allan Friedman	An authoritative, single-volume introduction to cybersecurity addresses topics ranging from phishing and electrical-grid takedowns to cybercrime and online freedom, sharing illustrative anecdotes to explain how cyberspace security works and what everyday people can do to protect themselves. Simultaneous.	http://books.google.com/books/content?id=9VDSAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9780199918119	224	2014	Oxford University Press	What Everyone Needs to Know	Cybersecurity
917	Paul Mason	The two hundred-year story of the global working class and its many struggles for justice.	http://books.google.com/books/content?id=rKrTo_Am_VEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781608460700	305	2010	Haymarket Books	How the Working Class Went Global	Live Working Or Die Fighting
918	Howard Podeswa	The Business Analyst (BA) plays an important role as liaison between business stakeholders and the technical team (software developers, vendors, etc.), ensuring that business needs are reflected in any software solution. Despite the importance of the job, there is currently no book specifically designed as a comprehensive reference manual for the working BA. The Business Analyst’s Handbook solves this problem by providing a useful compendium of tools, tables, lists, and templates that BAs can use on-the-job to carry out their tasks. For example, you might be preparing for an interview session and use the book’s checklist of interviewees to verify whether there is appropriate coverage of business stakeholders. Or you might be asked to review some diagrams and refer to the Glossaries of Symbols (organized by diagram type) for guidance. Or you may be asked to prepare textual requirements documentation and refer to the Business Requirement template for a list of artifacts and table of contents. Whatever your BA needs, the Business Analyst’s Handbook places the necessary information right at your fingertips.	http://books.google.com/books/content?id=3fEzPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781598635652	411	2008	Muska/Lipman	\N	The Business Analyst's Handbook
919	John Earley	The Lean Book of Leanprovides a succinct overview of the concepts of Lean, explains them in everyday terms, and shows how the general principles can be applied in any business or personal situation. Disengaging the concept of Lean from any particular industry or sector, this book brings Lean out of the factory to help you apply it anywhere, anytime. You'll learn the major points and ideas along with practical tips and hints, and find additional insight in the illustrative examples. Lean is all about achieving the desired outcome with the minimum amount of fuss and effort, and this book practises what it preaches — concise enough to be read in a couple of sittings, it nonetheless delivers a wealth of information distilled into the essential bits you need to know.	https://images-na.ssl-images-amazon.com/images/I/518t16eBtmL._SX317_BO1,204,203,200_.jpg	\N	254	2016	\N	A concise guide to lean management for life and business	The Lean Book of Lean
920	Douglas W. Hubbard	Presents advice on making profitable business decisions, describing how to use statistical methods to measure certain aspects of a business that are difficult to quantify, including such things as customer satisfaction, organizational flexibility, and technology risk.	http://books.google.com/books/content?id=EAPXAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781118539279	432	2014-03-17	John Wiley & Sons	Finding the Value of Intangibles in Business	How to Measure Anything
921	Lucas Carlson	Platform-as-a-Service (PaaS) is gaining serious traction among web and mobile developers, but as new PaaS providers emerge and existing vendors upgrade their features, it’s hard to keep track of what PaaS has to offer.	http://t2.gstatic.com/images?q=tbn:ANd9GcRYlA3r1XswFpSk9sMwsNpQ_j3QNqrtW9HN8iogyfJUDBU9H7gA	\N	125	2014	\N	A practical guide to coding for platform-as-a-service	Programming for PaaS
922	Karl Matthias,Sean P. Kane	Quickly learn how to use Docker and containers in general to create packaged images for easy management, testing, and deployment of software. This practical guide lets you hit the ground running by demonstrating how Docker allows developers to package their application with all of its dependencies and to test and then ship the exact same bundle to production. You’ll also learn how Docker enables operations engineers to help the development team quickly iterate on their software. Learn Docker’s philosophy, design, and intent Use your own custom software to build Docker images Launch Docker images as running containers Explore advanced Docker concepts and topics Get valuable references to related tools in the Docker ecosystem	http://books.google.com/books/content?id=6BUMogEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491917572	214	2015-06-25	O'Reilly Media	\N	Docker: Up and Running
923	Kuhnke	\N	images\\no-image.png	9780857087041	192	2016-07-01	Capstone	\N	Body Language
924	bell hooks	A genuine feminist politics always brings us from bondage to freedom, from lovelessness to loving....There can be no love without justice.—from the chapter "To Love Again: The Heart of Feminism"\n\nIn this engaging and provocative volume, bell hooks introduces a popular theory of feminism rooted in common sense and the wisdom of experience. Hers is a vision of a beloved community that appeals to all those committed to equality, mutual respect, and justice.\n\nhooks applies her critical analysis to the most contentious and challenging issues facing feminists today, including reproductive rights, violence, race, class, and work. With her customary insight and unsparing honesty, hooks calls for a feminism free from divisive barriers but rich with rigorous debate. In language both eye-opening and optimistic, hooks encourages us to demand alternatives to patriarchal, racist, and homophobic culture, and to imagine a different future.\n\nhooks speaks to all those in search of true liberation, asking readers to take look at feminism in a new light, to see that it touches all lives. Issuing an invitation to participate fully in feminist movement and to benefit fully from it, hooks shows that feminism—far from being an outdated concept or one limited to an intellectual elite--is indeed for everybody.	http://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408309112i/22481283._UY200_.jpg	\N	123	2015	\N	passionate politics	Feminism is for everybody
925	Venkat Subramaniam	Debunk the myth that JavaScript is not easily testable. Whether you use Node.js, Express, MongoDB, jQuery, AngularJS, or directly manipulate the DOM, you can test-drive JavaScript. Learn the craft of writing meaningful, deterministic automated tests with Karma, Mocha, and Chai. Test asynchronous JavaScript, decouple and properly mock out dependencies, measure code coverage, and create lightweight modular designs of both server-side and client-side code. Your investment in writing tests will pay high dividends as you create code that's predictable and cost-effective to change. Design and code JavaScript applications with automated tests. Writing meaningful tests is a skill that takes learning, some unlearning, and a lot of practice, and with this book, you'll hone that skill. Fire up the editor and get hands-on through practical exercises for effective automated testing and designing maintainable, modular code. Start by learning when and why to do manual testing vs. automated verification. Focus tests on the important things, like the pre-conditions, the invariants, complex logic, and gnarly edge cases. Then begin to design asynchronous functions using automated tests. Carefully decouple and mock out intricate dependencies such as the DOM, geolocation API, file and database access, and Ajax calls to remote servers. Step by step, test code that uses Node.js, Express, MongoDB, jQuery, and AngularJS. Know when and how to use tools such as Chai, Istanbul, Karma, Mocha, Protractor, and Sinon. Create tests with minimum effort and run them fast without having to spin up web servers or manually edit HTML pages to run in browsers. Then explore end-to-end testing to ensure all parts are wired and working well together. Don't just imagine creating testable code, write it. What You Need: A computer with a text editor and your favorite browser. The book provides instructions to install the necessary automated testing-related tools.	http://books.google.com/books/content?id=2sR5jwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781680501742	200	2016-10	\N	Rapid, Confident, Maintainable Code	Test-Driving JavaScript Applications
926	Michael Wilkinson	Thoroughly revised and updated, Michael Wilkinson’s 2nd edition of The Secrets of Facilitation delivers a clear vision of facilitation excellence and reveals the specific techniques effective facilitators use to produce consistent, repeatable results with groups. Wilkinson, a leading Certified Master Facilitator, has trained thousands of managers, mediators, analysts, and consultants around the world to apply the power of SMART (Structured Meeting And Relating Techniques) facilitation to achieve amazing results with teams and task forces. He shows how anyone can use these proven group techniques in conflict resolution, consulting, managing, presenting, teaching, planning, selling, and other professional as well as personal situations.\n\nThis 2nd edition includes new chapters that highlight timely topics such as: facilitating virtual meetings; facilitating very large groups; facilitating conferences; and building an internal facilitator capability. The book also offers new cross-cultural examples and an ancillary website with forms, checklists and a sample facilitator guide.	http://www.leadstrat.com/wp-content/uploads/2012/10/SOF2-book-cover.jpg	\N	454	2012	\N	The SMART guide to getting results with groups	The Secrets of Facilitation
927	TIM BROWN	Este livro procura introduzir a ideia de 'Design Thinking', um processo colaborativo que tenta utilizar a sensibilidade e a técnica criativa para suprir as necessidades das pessoas não só com o que é tecnicamente visível, mas com uma estratégia de negócios viável. É uma abordagem centrada no aspecto humano destinada a resolver problemas e ajudar pessoas e organizações a serem inovadoras e criativas. Esta obra é indicada para os líderes que estão em busca de alternativas, tanto funcional quanto financeiramente, para os negócios e para a sociedade.	images\\no-image.png	9788535238624	272	\N	\N	DECRETAR O FIM DAS VELHAS IDEIAS	DESIGN THINKING - UMA METODOLOGIA PODEROSA PARA
928	Glenn Greenwald	In May 2013, Glenn Greenwald set out for Hong Kong to meet an anonymous source who claimed to have astonishing evidence of pervasive government spying and insisted on communicating only through heavily encrypted channels. That source turned out to be the twenty-nine-year-old NSA contractor Edward Snowden, and his revelations about the agency's widespread, systemic overreach proved to be some of the most explosive and consequential news in recent history, triggering a fierce debate over national security and information privacy.\nNow Greenwald fits all the pieces together, recounting his high-intensity eleven-day trip to Hong Kong, examining the broader implications of the surveillance detailed in his reporting for The Guardian, and revealing fresh information on the NSA's unprecedented abuse of power with documents from the Snowden archive. Fearless and incisive, No Place to Hide has already sparked outrage around the globe and been hailed by voices across the political spectrum as an essential contribution to our understanding of the U.S. surveillance state.	https://images-na.ssl-images-amazon.com/images/I/71mTf2b8N3L.jpg	\N	\N	\N	\N	\N	No Place to Hide: Edward Snowden, the NSA, and the U.S. Surveillance State
929	Charles Duhigg	Identifies the neurological processes behind behaviors, explaining how self-control and success are largely driven by habits and providing guidelines for achieving personal goals and overall well-being by adjusting specific habits.	http://books.google.com/books/content?id=RtWDngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780812981605	383	2014	Random House Incorporated	Why We Do What We Do in Life and Business	The Power of Habit
930	Alexander Osterwalder,Yves Pigneur,Gregory Bernarda,Alan Smith	The authors of the international bestseller Business Model Generation explain how to create value propositions customers can’t resist Value Proposition Design helps you tackle a core challenge of every business — creating compelling products and services customers want to buy. This practical book, paired with its online companion, will teach you the processes and tools you need to succeed. Using the same stunning visual format as the authors’ global bestseller, Business Model Generation, this sequel explains how to use the “Value Proposition Canvas” a practical tool to design, test, create, and manage products and services customers actually want. Value Proposition Design is for anyone who has been frustrated by business meetings based on endless conversations, hunches and intuitions, expensive new product launches that blew up, or simply disappointed by the failure of a good idea. The book will help you understand the patterns of great value propositions, get closer to customers, and avoid wasting time with ideas that won’t work. You’ll learn the simple but comprehensive process of designing and testing value propositions, taking the guesswork out of creating products and services that perfectly match customers’ needs and desires. Practical exercises, illustrations and tools help you immediately improve your product, service, or new business idea. In addition the book gives you exclusive access to an online companion on Strategyzer.com. You will be able to complete interactive exercises, assess your work, learn from peers, and download pdfs, checklists, and more. Value Proposition Design complements and perfectly integrates with the ”Business Model Canvas” from Business Model Generation, a tool embraced by startups and large corporations such as MasterCard, 3M, Coca Cola, GE, Fujitsu, LEGO, Colgate-Palmolive, and many more. Value Proposition Design gives you a proven methodology for success, with value propositions that sell, embedded in profitable business models.	http://books.google.com/books/content?id=LCmtBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781118968055	320	2014-10-20	John Wiley & Sons	How to Create Products and Services Customers Want	Value Proposition Design
931	Robert M. Pirsig	\N	\N	\N	417	1974	Vintage	40th Anniversary Edition	Zen & The art of motorcycle maintanance
932	Francis Fukuyama	The most important book about the history and future of politics since The End of History.	http://books.google.com/books/content?id=RQ_rQwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781846684371	672	2015-09-17	Faber & Faber	From the Industrial Revolution to the Globalisatin of Democracy	Political Order and Political Decay
933	Douglas R. Hofstadter	A scientist and mathematician explores the mystery and complexity of human thought processes from an interdisciplinary point of view	http://books.google.com/books/content?id=lic72KLZq-0C&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780465026562	800	1999	Basic Books (AZ)	An Eternal Golden Braid	Gödel, Escher, Bach. Anniversary Edition
936	Jeanne W. Ross,Peter Weill,David Robertson	Enterprise architecture defines a firm’s needs for standardized tasks, job roles, systems, infrastructure, and data in core business processes. Thus, it helps a company to articulate how it will compete in a digital economy and it guides managers’ daily decisions to realize their vision of success. This book clearly explains enterprise architecture’s vital role in enabling—or constraining—the execution of business strategy. The book provides clear frameworks, thoughtful case examples, and a proven-effective structured process for designing and implementing effective enterprise architectures.	http://books.google.com/books/content?id=ng3AbVQlEncC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	9781591398394	234	2006	Harvard Business Press	Creating a Foundation for Business Execution	Enterprise Architecture as Strategy
937	Foster Provost,Tom Fawcett	Introduces fundamental concepts of data science necessary for extracting useful information from data mining techniques, including envisioning the problem, applying data science techniques, and deploying results to improve decision making.	http://books.google.com/books/content?id=_1b4nAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781449361327	384	2013	Oreilly & Associates Incorporated	\N	Data Science for Business
938	Antonio Carlos Valença, Hermano Perreli de Moura	\N	http://www.valencaeassociados.com.br/images/tac3.jpg	\N	\N	\N	\N	Sete leituras inovadoras e complementares de um mesmo projeto	Teoria da Ação Comunicativa Sistêmica em Gestão de Projetos
939	Antonio Carlos Valença, Hermano Perrelli de Moura	\N	http://www.valencaeassociados.com.br/images/tac2.jpg	\N	\N	\N	\N	Experimento de aprendizagem-na-ação numa comunidade reflexiva de prática	Teoria da Ação Comunicativa Sistêmica em Gestão de Projetos
940	Hugh Taylor, Angela Yochem, Les Philips, Frank Martinez	Going beyond SOA, enterprises can gain even greater agility by implementing event-driven architectures (EDAs) that automatically detect and react to significant business events. However, EDA planning and deployment is complex, and even experienced SOA architects and developers need expert guidance. In Event-Driven Architecture, four leading IT innovators present both the theory of EDA and practical, step-by-step guidance to implementing it successfully.\n\n \n\nThe authors first establish a thorough and workable definition of EDA and explore how EDA can help solve many of today’s most difficult business and IT challenges. You’ll learn how EDAs work, what they can do today, and what they might be able to do as they mature. You’ll learn how to determine whether an EDA approach makes sense in your environment and how to overcome the difficult interoperability and integration issues associated with successful deployment. Finally, the authors present chapter-length case studies demonstrating how both full and partial EDA implementations can deliver exceptional business value.	http://ecx.images-amazon.com/images/I/41gQ1Aomf7L._SX258_BO1,204,203,200_.jpg	\N	308	2009	\N	How SOA Enables the Real-Time Enterprise	Event-Driven Architecture
941	K. Chandy,W. Schulte	How to implement effective event-processing solutions Business people and IT professionals understand well the benefits of corporate agility and fast response to emerging threats and opportunities. However, many people are less familiar with the techniques now available to help accomplish those aspirations. Event processing has emerged as the key enabler for situation awareness and a set of guiding principles for systems that can adapt quickly to shifts in company and market conditions. Written by experts in the field, this prescriptive guide explains how to use event processing in the design of business processes and the systems that support them. Event Processing: Designing IT Systems for Agile Companies covers: The role of event processing in enabling business dashboards and situation awareness Types of event-processing applications and their costs and benefits How event-driven architecture (EDA) complements conventional request-driven SOA How to implement event processing without disrupting existing applications	http://books.google.com/books/content?id=h-4pmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780071633505	256	2009-09-24	Mcgraw-hill	Designing IT Systems for Agile Companies	Event Processing: Designing IT Systems for Agile Companies : Designing IT Systems for Agile Companies
942	Michael J. Kavis	\N	http://books.google.com/books/content?id=gQxzAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781118617618	224	2014-01-28	John Wiley & Sons	Design Decisions for Cloud Computing Service Models (SaaS, PaaS, and IaaS)	Architecting the Cloud
943	Stephen Wunker,David Farber,Jessica Wattman	Successful innovation doesn’t begin with a brainstorming session—it starts with the customer. So in an age of unlimited data, why do more than 50% of new products fail to meet expectations? The truth is that we need to stop asking customers what they want . . . and start examining what they need. First popularized by Clayton Christensen, the Jobs to be Done theory argues that people purchase products and services to solve a specific problem. They’re not buying ice cream, for example, but celebration, bonding, and indulgence. The concept is so simple (and can remake how companies approach their markets)—and yet many have lacked a way to put it into practice. This book answers that need. Its groundbreaking Jobs Roadmap guides you through the innovation process, revealing how to: • Gather valuable customer insights • Turn those insights into new product ideas • Test and iterate until you find success Follow the steps in Jobs to Be Done, and you’ll arrive at solutions that are both original and profitable.	http://books.google.com/books/content?id=4AH1jwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9780814438039	224	2016-11-15	\N	A Roadmap for Customer-Centered Innovation	Jobs to Be Done
944	Paris Buttfield-Addison,Jon Manning,Tim Nugent	Get a thorough, hands-on exploration of Apple's Swift programming language. With this practical guide, you'll learn how to write Swift code and examine why this language works the way it does. You’ll build three complete apps, all tightly linked together: an iOS note-taking app, its OS X counterpart that uses iCloud to sync data, and an app for the Apple Watch that makes the user’s data available at a moment’s notice. This book also explains how Swift works in the wider world, including how to use your apps with open-source frameworks, how to use extensions to help your app play nicely with other apps, and how to take the language beyond Apple’s domain with open-source Swift tools. Get started with Swift today and quickly learn how you can build on its foundations.	http://books.google.com/books/content?id=J7d1awEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api	9781491940747	350	2016-02-25	O'Reilly Media	\N	Learning Swift
945	Antonio Carlos Valença, Hermano Perrelli de Moura	\N	http://www.valencaeassociados.com.br/images/tac1.jpg	\N	\N	\N	\N	Estudo de caso da recuperação do futebol do Nordeste do Brasil	Teoria de Ação Comunicativa Sistêmica em Gestão de Projetos
946	Valença & Associados	\N	http://mlb-s2-p.mlstatic.com/284901-MLB20438161257_102015-Y.jpg	\N	\N	\N	\N	25 aplicações práticas	Pensamento Sistêmico
947	Angela Davia	Mais importante obra de Angela Davis, "Mulheres, raça e classe" traça um poderoso panorama histórico e crítico das imbricações entre a luta anticapitalista, a luta feminista, a luta antirracista e a luta antiescravagista, passando pelos dilemas contemporâneos da mulher. O livro é considerado um clássico sobre a interseccionalidade de gênero, raça e classe.\n\nA perspectiva adotada por Davis realça o mérito do livro: desloca olhares viciados sobre o tema em tela e atribui centralidade ao papel das mulheres negras na luta contra as explorações que se perpetuam no presente, reelaborando-se. O reexame operado pela escrita dessa ativista mundialmente conhecida é indispensável para a compreensão da realidade do nosso país, pois reforça a práxis do feminismo negro brasileiro, segundo o qual a inobservância do lugar das mulheres negras nas ideias e projetos que pensaram e pensam o Brasil vem adiando diagnósticos mais precisos sobre desigualdade, discriminação, pobreza, entre outras variáveis. Grande parte da nossa tradição teórica e política (Gilberto Freyre e Sérgio Buarque de Holanda, para ficarmos em poucos exemplos) insiste em confinar as questões aqui tratadas por Davis na esfera privada, como se apenas desta proviesse sua solução.\n\nA iniciativa da Boitempo de traduzir esta obra, ainda não publicada no Brasil, desponta como uma inestimável contribuição para disseminar as ideias imprescindíveis de Angela Davis (sabemos o quanto ela vem sendo estudada e difundida pelo feminismo negro e por setores da academia) e oferecer, assim, angulações e perspectivas pouco ou nada exploradas pelos empreendimentos voltados à compreensão da nossa intrincada realidade. Como aconselha Bobbio, para não sermos induzidos a crer que a história, a cada ciclo, recomeça do zero, é preciso ter paciência e saber escutar as lições dos clássicos. Em tempos sombrios, esse conselho soa como urgência política.	http://statics.livrariacultura.net.br/products/capas_lg/256/46335256.jpg	\N	248	2016	Boitempo	\N	Mulheres, Raça e Classe
948	Jim Kalbach	Customers who have inconsistent, broken experiences with products and services are understandably frustrated. But it’s worse when people inside these companies can’t pinpoint the problem because they’re too focused on business processes. This practical book shows your company how to use alignment diagrams to turn valuable customer observations into actionable insight. With this unique tool, you can visually map your existing customer experience and envision future solutions.\n\nProduct and brand managers, marketing specialists, and business owners will learn how experience diagramming can help determine where business goals and customer perspectives intersect. Once you’re armed with this data, you can provide users with real value.\n\nMapping Experiences is divided into three parts:\n\n-Understand the underlying principles of diagramming, and discover how these diagrams can inform strategy\n-Learn how to create diagrams with the four iterative modes in the mapping process: setting up a mapping initiative, investigating the evidence, visualizing the process, and using diagrams in workshops and experiments\n-See key diagrams in action, including service blueprints, customer journey maps, experience maps, mental models, and spatial maps and ecosystem models	https://images-na.ssl-images-amazon.com/images/I/51qcGQQPRbL._SY402_BO1,204,203,200_.jpg	\N	384	2016	O'Reilly	\N	Mapping Experiences: A Complete Guide to Creating Value through Journeys, Blueprints, and Diagrams
\.


--
-- Name: book_gen; Type: SEQUENCE SET; Schema: public; Owner: libraryadmin
--

SELECT pg_catalog.setval('book_gen', 948, true);


--
-- Data for Name: copy; Type: TABLE DATA; Schema: public; Owner: libraryadmin
--

COPY copy (id, status, book_id, library_id) FROM stdin;
100	0	88	1
36	0	36	2
983	0	529	4
992	0	218	4
58	0	55	2
1001	0	218	4
94	0	82	1
80	0	25	1
106	0	92	1
98	0	86	1
1010	0	855	4
975	1	838	5
199	0	166	3
176	0	146	6
1019	0	860	2
33	1	33	2
250	0	212	2
38	1	38	2
76	0	67	1
267	0	226	1
73	1	27	1
71	0	11	1
114	0	96	1
44	0	44	2
200	1	167	2
221	0	186	5
79	1	22	1
75	1	66	1
1034	0	874	5
150	0	126	5
1052	0	890	2
93	0	81	1
1026	0	867	1
138	1	117	5
239	0	202	1
1061	1	899	2
54	1	4	2
55	1	52	2
49	0	49	2
1043	1	506	2
37	0	37	2
59	0	56	2
1067	1	192	6
68	0	61	1
123	0	103	5
194	0	162	6
166	0	140	6
167	0	141	6
1076	1	910	1
161	0	3	6
139	0	83	5
1085	0	917	1
579	0	482	5
116	0	98	2
96	0	84	1
179	0	149	6
63	0	59	1
285	0	234	2
197	1	164	3
237	1	201	1
240	1	203	1
229	1	193	1
254	1	160	1
212	1	178	5
227	1	191	1
271	1	50	2
67	1	16	1
111	1	17	1
246	1	208	5
211	1	177	5
244	1	139	1
152	1	128	5
157	1	133	5
97	1	85	1
105	1	91	1
121	1	101	4
99	1	87	1
145	1	121	5
109	1	94	1
155	1	131	5
102	1	28	1
61	1	17	3
51	1	50	2
70	1	63	1
62	0	58	2
74	1	65	1
90	0	78	1
101	1	89	1
1094	1	924	1
34	0	34	2
1112	0	939	2
1103	1	150	1
1121	0	947	5
117	0	99	2
66	1	4	1
108	0	5	1
39	1	39	2
1086	1	918	1
252	1	214	2
230	1	194	1
976	0	839	5
170	0	83	6
245	0	207	1
1095	0	9	1
251	0	213	5
233	0	197	1
270	1	135	2
373	0	91	1
293	0	240	2
294	0	241	5
1104	0	931	4
1002	0	17	4
222	0	187	5
269	0	227	2
371	1	50	1
322	0	213	2
1113	0	940	1
1122	0	948	5
358	0	296	1
268	1	78	2
42	1	42	2
238	0	34	1
223	0	135	1
323	0	267	3
277	0	228	2
325	1	269	2
218	0	183	5
1011	1	9	4
324	0	268	2
302	0	249	5
272	1	23	2
1027	0	868	1
372	0	23	1
334	0	276	5
1044	0	506	2
330	0	272	3
382	0	312	4
1053	0	891	2
1035	1	875	5
46	0	46	2
290	1	238	2
344	0	218	1
1062	0	900	5
280	0	230	2
287	0	94	2
338	0	279	5
335	1	277	2
984	1	9	4
291	1	24	2
312	0	258	5
318	1	264	2
339	0	280	5
295	1	242	5
359	0	297	1
336	0	148	2
319	0	4	5
384	0	314	4
399	0	328	4
437	0	362	4
1068	0	905	3
276	1	139	2
232	1	196	1
274	1	61	2
309	1	256	5
60	1	57	2
340	1	281	5
263	1	192	5
317	1	263	2
217	1	83	6
224	1	188	1
231	1	195	1
345	1	284	1
377	1	7	1
347	1	286	1
442	1	367	3
349	1	63	1
278	1	9	2
343	1	9	1
253	1	215	1
389	1	65	4
307	1	254	5
362	1	300	1
275	1	90	2
289	1	237	2
329	1	151	2
228	1	192	1
281	1	231	2
283	1	233	2
286	1	235	2
292	1	239	2
333	1	275	5
326	1	270	3
310	1	38	5
45	1	45	2
234	1	198	1
993	1	9	4
557	1	17	1
264	0	223	5
320	1	265	5
1077	1	911	1
284	1	70	2
241	0	204	1
328	0	271	5
977	0	840	5
1003	0	853	4
381	0	311	4
1012	0	850	4
383	0	313	4
546	0	464	4
1020	0	861	3
575	0	142	1
985	1	91	4
1028	0	869	2
1036	0	876	5
1045	0	883	2
563	0	475	1
1054	0	892	2
379	0	309	1
554	0	471	1
607	1	506	2
571	0	480	1
602	0	192	3
587	0	490	2
1063	1	901	2
597	0	500	2
994	0	848	4
716	0	601	3
641	0	533	3
374	1	8	1
458	1	382	1
459	1	9	4
397	1	326	4
553	1	101	4
555	1	472	1
556	1	218	1
567	1	478	1
568	1	94	1
583	1	486	2
564	1	476	1
562	1	241	1
581	1	484	5
423	1	27	4
603	1	61	3
604	1	503	3
600	1	502	5
376	1	307	1
531	1	449	4
614	1	513	2
578	1	9	5
558	0	473	1
1087	0	502	1
1078	1	912	1
1096	0	925	1
1105	0	932	4
1114	0	941	1
1069	1	906	3
681	0	569	3
978	0	841	5
573	0	481	1
598	0	501	3
566	1	478	1
561	0	474	1
621	1	266	2
580	0	483	5
589	0	492	2
986	1	266	3
995	0	849	4
1004	0	52	4
1013	0	856	4
653	0	544	3
654	0	545	3
718	0	603	3
1021	1	862	5
703	0	220	3
635	0	531	3
659	0	549	3
738	0	623	3
627	0	524	3
606	0	505	2
831	1	712	3
705	0	591	3
657	0	548	3
1037	0	877	5
565	1	477	1
632	1	182	3
658	1	61	3
652	1	543	3
569	1	94	1
619	1	91	2
656	1	547	3
651	1	502	3
633	1	529	3
574	1	266	1
1046	0	884	2
1055	0	893	2
560	1	151	1
622	1	519	2
308	0	255	5
1070	0	9	2
620	1	518	2
599	0	237	2
1079	0	913	1
802	0	685	3
1088	1	919	1
1097	0	926	1
1106	0	933	4
605	1	504	2
1115	0	942	1
979	0	842	5
1005	0	52	4
996	1	89	4
801	0	684	3
1047	0	885	2
559	0	9	1
1056	1	894	1
255	1	216	5
1064	0	902	2
1014	1	61	4
191	1	160	6
601	1	502	5
1022	1	863	3
987	1	845	4
1080	0	241	1
1089	1	920	1
1038	1	878	2
1107	0	934	1
1116	0	943	1
1029	0	157	2
1071	1	845	2
405	0	332	4
1098	1	927	2
866	0	746	3
887	0	766	3
664	0	553	3
647	0	540	3
497	0	417	4
452	0	376	4
496	0	416	4
455	0	379	4
630	0	527	3
209	0	175	5
665	0	554	3
577	0	33	1
850	0	730	3
550	0	468	4
856	0	736	3
807	0	690	3
756	0	641	3
872	0	751	3
700	0	587	3
852	0	732	3
518	0	436	4
549	0	467	4
214	0	180	5
836	0	255	3
486	0	408	4
847	0	727	3
213	0	179	5
265	0	224	5
910	0	789	3
883	0	762	3
785	0	668	3
414	0	341	4
765	0	650	3
667	0	198	3
449	0	373	4
899	0	778	3
786	0	669	3
149	0	125	5
733	0	618	3
825	0	706	3
706	0	592	3
838	0	718	3
541	0	459	4
805	0	688	3
815	0	697	3
774	0	659	3
833	0	714	3
714	0	599	3
523	0	441	4
537	0	455	4
839	0	719	3
882	0	761	3
834	0	715	3
526	0	444	4
508	0	426	4
489	0	411	4
662	0	552	3
178	0	148	6
471	0	394	4
357	0	295	1
812	0	694	3
465	0	388	4
827	0	708	3
479	0	401	4
861	0	741	3
640	0	535	3
504	0	423	4
512	0	430	4
816	0	698	3
900	0	779	3
779	0	663	3
288	0	236	2
524	0	442	4
817	0	699	3
1099	0	928	1
1108	0	935	1
408	0	335	4
168	0	142	6
135	0	114	5
997	0	89	4
131	0	110	5
89	0	2	1
160	0	23	6
57	0	54	2
84	0	73	1
644	0	537	3
505	0	424	4
1117	0	944	1
763	0	648	3
110	0	95	1
1015	0	423	4
296	0	243	5
686	0	573	3
610	1	509	2
428	0	353	4
684	0	571	3
1006	1	17	4
146	0	122	5
118	1	33	3
119	1	100	3
104	0	15	1
35	1	35	2
848	0	728	3
43	1	43	2
82	1	71	1
752	0	637	3
594	0	497	2
424	0	349	4
196	1	136	3
704	0	590	3
1065	0	903	5
193	0	61	6
282	1	232	2
1030	0	870	2
1039	0	879	2
1048	0	886	2
256	0	217	5
1057	0	895	2
590	1	493	2
588	1	491	2
172	0	144	6
695	1	582	3
112	1	12	1
1072	0	907	6
1090	0	921	1
1081	1	914	1
988	0	83	4
120	1	61	3
927	0	804	3
655	0	546	3
853	0	733	3
466	0	389	4
243	0	206	1
617	0	516	5
674	0	562	3
672	0	560	3
64	0	60	1
478	0	400	4
777	0	580	3
582	0	485	5
198	0	165	5
629	0	526	3
163	0	137	6
413	0	340	4
898	0	777	3
315	0	261	5
533	0	451	4
796	0	679	3
72	0	64	1
624	0	521	3
186	0	156	6
177	0	147	6
626	0	523	3
843	0	723	3
823	0	704	3
841	0	721	3
480	0	402	4
727	0	612	3
886	0	765	3
781	0	665	3
696	0	583	3
297	0	244	5
419	0	345	4
314	0	260	5
938	0	52	4
444	0	369	4
391	0	320	4
893	0	772	3
689	0	576	3
400	0	329	4
636	0	532	3
473	0	396	4
819	0	701	3
595	0	498	2
426	0	351	4
47	0	47	2
412	0	339	4
741	0	626	3
813	0	695	3
83	0	72	1
851	0	731	3
304	0	251	5
361	0	299	1
125	0	105	5
77	0	68	1
140	0	118	5
687	0	574	3
474	0	101	4
153	0	129	5
806	0	689	3
631	0	528	3
56	0	53	2
182	0	152	6
355	0	293	1
729	0	614	3
261	0	222	5
348	0	287	1
868	0	747	3
891	0	770	3
332	0	274	5
880	0	759	3
468	0	391	4
730	0	615	3
800	0	683	3
484	0	406	4
189	0	158	6
712	0	59	3
404	0	231	4
507	0	315	4
596	0	499	2
547	0	465	4
485	0	407	4
226	0	190	1
500	0	338	4
879	0	758	3
723	0	608	3
515	0	433	4
91	0	79	1
642	0	536	3
737	0	622	3
770	0	655	3
433	0	358	4
540	0	458	4
303	0	250	5
543	0	461	4
782	0	666	3
365	0	302	1
869	0	748	3
532	0	450	4
165	0	139	6
748	0	633	3
837	0	717	3
897	0	776	3
719	0	604	3
536	0	454	4
570	0	479	1
401	0	330	4
462	0	385	4
301	0	248	5
461	0	384	4
789	0	672	3
499	0	419	4
181	0	151	6
593	0	496	2
498	0	418	4
661	0	551	3
367	0	21	1
822	0	703	3
392	0	321	4
896	0	775	3
429	0	354	4
519	0	437	4
846	0	726	3
432	0	357	4
690	0	577	3
673	0	561	3
931	0	807	2
625	0	522	3
694	0	581	3
863	0	743	3
818	0	700	3
107	0	93	1
820	0	702	3
679	0	567	3
493	0	413	4
530	0	448	4
775	0	660	3
889	0	768	3
435	0	360	4
759	0	644	3
258	0	219	5
398	0	327	4
215	0	181	5
65	0	3	1
366	0	303	1
440	0	365	4
421	0	347	4
164	0	138	6
701	0	588	3
736	0	621	3
875	0	754	3
279	0	229	2
443	0	368	4
892	0	771	3
804	0	687	3
758	0	643	3
755	0	640	3
638	0	533	3
416	0	141	4
692	0	579	3
427	0	352	4
739	0	624	3
803	0	686	3
158	0	134	6
113	0	13	1
184	0	154	6
403	0	229	4
494	0	414	4
535	0	453	4
728	0	613	3
456	0	380	4
928	0	805	3
353	0	291	1
722	0	607	3
646	0	539	3
202	0	168	5
865	0	745	3
266	0	225	5
725	0	610	3
195	0	163	6
809	0	692	3
483	0	405	4
707	0	593	3
881	0	760	3
551	0	469	4
903	0	782	3
683	0	16	3
855	0	735	3
877	0	756	3
542	0	460	4
470	0	393	4
876	0	755	3
685	0	572	3
693	0	580	3
370	0	306	1
175	0	89	6
48	0	48	2
821	0	253	3
732	0	617	3
699	0	586	3
313	0	259	5
204	0	170	5
162	0	136	6
356	0	294	1
585	0	488	5
871	0	750	3
514	0	432	4
762	0	647	3
623	0	520	2
751	0	636	3
828	0	709	3
454	0	378	4
180	0	150	6
127	0	41	5
390	0	319	4
628	0	525	3
439	0	364	4
669	0	557	3
675	0	563	3
670	0	558	3
709	0	595	3
438	0	363	4
185	0	155	6
697	0	584	3
487	0	409	4
795	0	678	3
363	0	24	1
341	0	282	5
811	0	693	3
409	0	336	4
676	0	564	3
446	0	371	4
434	0	359	4
717	0	602	3
710	0	596	3
842	0	722	3
799	0	682	3
691	0	578	3
767	0	652	3
702	0	589	3
205	0	171	5
639	0	534	3
750	0	635	3
447	0	372	4
187	0	157	6
351	0	289	1
386	0	316	4
249	0	211	5
126	0	106	5
534	0	452	4
511	0	429	4
430	0	355	4
844	0	724	3
835	0	716	3
506	0	425	4
520	0	438	4
378	0	308	1
721	0	606	3
369	0	305	1
742	0	627	3
724	0	609	3
788	0	671	3
457	0	381	4
849	0	729	3
826	0	707	3
764	0	649	3
545	1	463	4
475	0	397	4
492	1	410	4
708	1	594	3
939	1	810	5
417	1	343	4
396	0	325	4
643	0	224	3
216	0	182	5
300	1	247	5
609	0	508	2
316	0	262	2
576	1	192	1
464	0	387	4
352	0	290	1
395	0	324	4
735	0	620	3
477	0	399	4
660	0	550	3
586	0	489	2
513	0	431	4
845	0	725	3
406	0	333	4
460	0	383	4
529	0	447	4
203	0	169	5
441	0	366	4
385	0	315	4
591	0	494	2
552	0	470	4
393	0	322	4
81	0	70	1
219	0	184	5
778	0	662	3
521	0	439	4
502	0	421	4
450	0	374	4
715	0	600	3
481	0	403	4
192	0	161	6
734	0	619	3
794	0	677	3
350	0	288	1
235	0	199	1
394	0	323	4
387	0	317	4
248	0	210	5
862	0	742	3
501	0	420	4
207	0	173	5
418	0	344	4
509	0	427	4
463	0	386	4
488	0	410	4
159	0	135	6
354	0	292	1
41	0	41	2
713	0	598	3
830	0	711	3
840	0	720	3
769	0	654	3
720	0	605	3
698	0	585	3
904	0	783	3
539	0	457	4
467	0	390	4
402	0	331	4
171	0	91	6
648	0	541	3
380	0	310	3
247	0	209	5
311	0	257	5
517	0	435	4
410	0	337	4
242	0	205	1
858	0	738	3
766	0	651	3
190	0	159	6
680	0	568	3
342	0	283	1
854	0	734	3
663	0	16	3
525	0	443	4
115	0	97	1
148	0	124	5
888	0	767	3
236	0	200	1
208	0	174	5
678	0	566	3
810	0	86	3
857	0	737	3
368	0	304	1
174	0	33	6
451	0	375	4
407	0	334	4
257	0	218	5
613	0	512	2
92	0	80	1
528	0	446	4
650	0	542	3
726	0	611	3
814	0	696	3
754	0	639	3
544	0	462	4
791	0	674	3
677	0	565	3
929	0	806	2
666	0	555	3
890	0	769	3
793	0	676	3
682	0	570	3
206	0	172	5
608	0	507	2
364	0	301	1
86	0	75	1
768	0	653	3
860	0	740	3
572	0	136	1
912	0	790	3
743	0	628	3
780	0	664	3
760	0	645	3
225	0	189	1
906	0	785	3
829	0	710	3
495	0	415	4
611	0	510	1
671	0	559	3
895	0	774	3
618	0	517	2
894	0	773	3
422	0	348	4
327	0	50	5
909	0	788	3
790	0	673	3
469	0	392	4
124	0	104	5
905	0	784	3
510	0	428	4
425	0	350	4
415	0	342	4
747	0	632	3
771	0	656	3
220	0	185	5
482	0	404	4
259	0	220	5
924	0	658	3
864	0	744	3
522	0	440	4
746	0	631	3
645	0	538	3
431	0	356	4
797	0	680	3
901	0	780	3
87	0	76	1
169	0	143	6
388	0	318	4
884	0	763	3
824	0	705	3
476	0	398	4
776	0	661	3
472	0	395	4
649	0	523	3
147	0	123	5
902	0	781	3
873	0	752	3
634	0	530	3
859	0	739	3
210	0	176	5
911	0	246	3
787	0	670	3
503	0	422	4
173	0	145	6
375	0	10	1
867	0	2	3
784	0	41	3
592	0	495	2
753	0	638	3
448	0	273	4
491	0	411	4
907	0	786	3
757	0	642	3
783	0	667	3
773	0	658	3
527	0	445	4
436	0	361	4
420	0	346	4
926	0	803	3
808	0	691	3
668	0	556	3
792	1	675	3
584	0	487	2
731	0	616	3
516	1	434	4
306	0	253	5
360	0	298	1
490	0	412	4
798	0	681	3
874	0	753	3
711	0	597	3
183	0	153	6
445	0	370	4
411	0	338	4
260	0	221	5
832	0	713	3
908	0	787	3
749	0	634	3
88	0	77	1
772	0	657	3
548	0	466	4
538	0	456	4
925	0	802	3
612	0	511	2
740	0	625	3
616	0	515	2
615	0	514	5
144	0	120	5
453	0	377	4
188	0	17	6
78	0	69	1
132	0	111	5
130	0	109	5
40	0	40	2
688	0	575	3
885	0	764	3
69	1	62	1
930	1	61	2
935	1	17	3
936	1	23	3
937	1	809	3
932	1	83	2
637	1	533	3
305	1	252	5
262	1	136	5
337	1	278	5
156	1	132	5
980	1	70	4
299	0	246	5
298	0	245	5
141	0	119	5
201	1	78	5
998	0	850	4
1007	0	423	4
1016	0	857	4
1040	0	880	2
1049	0	887	2
933	1	808	2
273	1	91	2
1031	1	871	2
1058	0	896	2
321	0	266	2
1066	0	904	5
989	1	845	4
331	1	273	5
1073	0	908	1
1091	1	922	1
103	1	90	1
1100	0	929	1
1082	1	845	1
1109	0	936	1
1118	0	22	1
95	1	83	1
154	0	130	5
1023	1	864	2
981	0	843	5
990	0	846	4
1008	0	52	4
1017	0	858	5
1024	0	865	1
1050	0	888	2
1032	1	872	2
1059	0	897	2
1041	1	881	2
1074	0	909	1
1092	0	145	1
1101	0	754	1
1083	1	915	1
1110	0	937	1
1119	0	945	2
999	0	851	4
745	0	630	3
870	0	749	3
878	0	757	3
957	1	65	5
982	0	844	5
991	0	847	4
761	0	646	3
1000	0	852	4
1009	0	854	4
940	1	811	3
934	1	89	2
744	1	629	3
943	1	813	2
974	1	83	3
1033	0	873	5
1042	0	882	2
1051	0	889	2
942	1	9	3
1018	0	859	5
950	1	158	3
1060	0	898	2
973	0	837	3
1075	1	238	1
1084	0	916	1
1025	0	866	1
1093	0	923	1
1102	0	930	1
1120	0	946	2
1111	0	938	2
921	0	799	3
969	0	833	3
958	0	142	5
914	0	792	3
949	0	818	3
918	0	796	3
956	0	824	5
970	0	834	3
919	0	797	3
946	0	815	3
965	0	830	5
915	0	793	3
923	0	801	3
952	0	820	3
954	0	822	5
913	0	791	3
966	0	156	5
941	0	812	5
971	0	835	3
959	0	55	5
967	0	831	3
961	0	826	5
951	0	819	3
964	0	829	5
968	0	832	3
922	0	800	3
947	0	816	3
955	0	823	5
948	0	817	3
960	0	825	5
945	0	580	3
920	0	798	3
944	0	814	3
916	0	794	3
963	0	828	5
972	0	836	3
917	0	795	3
962	0	827	5
953	0	821	5
\.


--
-- Name: copy_gen; Type: SEQUENCE SET; Schema: public; Owner: libraryadmin
--

SELECT pg_catalog.setval('copy_gen', 1122, true);


--
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: public; Owner: libraryadmin
--

COPY databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels) FROM stdin;
1457123372258-1	eferreir (generated)	changelog.groovy	2016-03-07 08:43:43.031155	1	EXECUTED	7:ff292245049a0df7200a3a4d418bbf81	dropColumn		\N	3.4.2	\N	\N
1457123372258-2	eferreir (generated)	changelog.groovy	2016-03-07 08:43:43.079796	2	EXECUTED	7:0cae31944c8f299820ff1c168007db73	addDefaultValue		\N	3.4.2	\N	\N
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: libraryadmin
--

COPY databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
\.


--
-- Data for Name: library; Type: TABLE DATA; Schema: public; Owner: libraryadmin
--

COPY library (id, name, slug) FROM stdin;
1	Quito	quito
2	Belo Horizonte	bh
3	Porto Alegre	poa
4	Johannesburg	jozi
5	São Paulo	sp
6	Recife	rec
\.


--
-- Name: library_gen; Type: SEQUENCE SET; Schema: public; Owner: libraryadmin
--

SELECT pg_catalog.setval('library_gen', 6, true);


--
-- Data for Name: loan; Type: TABLE DATA; Schema: public; Owner: libraryadmin
--

COPY loan (id, end_date, start_date, copy_id, user_id) FROM stdin;
62	2015-10-20	2015-10-20	100	6
63	2015-10-20	2015-10-20	76	6
64	2015-10-20	2015-10-20	79	6
66	\N	2015-10-22	118	65
67	\N	2015-10-22	119	65
8	2015-10-14	2015-10-14	46	15
9	2015-10-14	2015-10-14	46	15
10	2015-10-14	2015-10-14	35	16
12	2015-10-14	2015-10-14	36	14
14	2015-10-14	2015-10-14	34	14
13	2015-10-14	2015-10-14	36	14
70	2015-10-23	2015-10-23	121	194
110	2015-12-16	2015-11-27	105	366
73	2015-10-27	2015-10-27	61	262
74	2015-10-27	2015-10-27	61	273
21	2015-10-14	2015-10-14	60	51
75	2015-10-27	2015-10-27	61	273
23	2015-10-15	2015-10-15	54	53
26	2015-10-15	2015-10-15	37	1
25	2015-10-15	2015-10-15	39	1
24	2015-10-15	2015-10-15	38	1
27	2015-10-15	2015-10-15	58	3
76	2015-10-27	2015-10-27	44	3
30	\N	2015-10-15	35	79
32	\N	2015-10-16	43	97
33	2015-10-16	2015-10-16	70	9
36	2015-10-16	2015-10-16	100	10
37	2015-10-16	2015-10-16	79	10
38	2015-10-16	2015-10-16	105	6
39	2015-10-16	2015-10-16	94	10
40	2015-10-16	2015-10-16	79	10
41	2015-10-16	2015-10-16	80	10
42	2015-10-16	2015-10-16	79	6
43	2015-10-16	2015-10-16	80	6
44	2015-10-16	2015-10-16	79	6
45	2015-10-16	2015-10-16	80	6
46	2015-10-16	2015-10-16	82	6
47	2015-10-16	2015-10-16	80	6
50	2015-10-16	2015-10-16	94	7
48	2015-10-16	2015-10-16	80	6
49	2015-10-16	2015-10-16	106	6
54	2015-10-19	2015-10-19	79	135
55	2015-10-19	2015-10-19	98	175
57	2015-10-19	2015-10-19	108	179
58	2015-10-19	2015-10-19	80	182
59	\N	2015-10-19	82	188
35	2015-10-20	2015-10-16	84	10
61	2015-10-20	2015-10-20	98	10
79	\N	2015-10-28	196	271
80	\N	2015-10-28	197	271
81	2015-10-28	2015-10-28	61	285
82	2015-11-03	2015-11-03	45	70
83	2015-11-05	2015-11-05	61	301
84	2015-11-06	2015-11-06	199	254
87	2015-11-09	2015-11-09	176	306
89	2015-11-12	2015-11-12	170	306
34	2015-11-13	2015-10-16	67	9
51	2015-11-16	2015-10-16	110	131
53	2015-11-16	2015-10-16	112	131
52	2015-11-16	2015-10-16	111	131
93	2015-11-16	2015-11-16	237	182
96	\N	2015-11-16	237	135
92	2015-11-16	2015-11-16	239	131
100	\N	2015-11-16	240	346
90	2015-11-17	2015-11-13	54	66
105	2015-11-19	2015-11-19	250	279
109	2015-11-27	2015-11-25	111	366
111	\N	2015-11-30	229	132
97	2015-11-30	2015-11-16	80	345
101	2015-12-01	2015-11-17	245	177
115	\N	2015-12-01	254	10
86	2015-12-02	2015-11-09	45	194
117	\N	2015-12-07	212	361
121	\N	2015-12-08	227	390
1	2015-12-09	2015-10-14	49	1
120	2015-12-10	2015-12-07	267	389
108	2015-12-11	2015-11-24	252	58
123	\N	2015-12-11	271	42
104	2015-12-11	2015-11-19	54	58
129	2015-12-14	2015-12-14	71	135
130	2015-12-14	2015-12-14	114	425
131	\N	2015-12-14	67	425
132	\N	2015-12-14	111	425
107	2015-12-15	2015-11-23	233	191
65	2015-12-16	2015-10-21	117	197
137	\N	2015-12-17	246	253
118	2015-12-17	2015-12-07	221	387
133	2015-12-18	2015-12-15	275	64
31	2015-12-23	2015-10-15	55	42
138	2015-12-23	2015-12-18	114	428
85	2016-01-04	2015-11-06	150	304
150	\N	2016-01-04	211	386
151	\N	2016-01-04	244	486
134	2016-01-04	2015-12-16	105	428
119	2016-01-05	2015-12-07	33	63
149	2016-01-07	2016-01-04	155	304
28	2016-01-07	2015-10-15	46	15
69	2016-01-07	2015-10-22	62	70
144	2016-01-07	2015-12-29	289	422
139	2016-01-07	2015-12-23	117	422
126	2016-01-07	2015-12-12	274	58
143	2016-01-07	2015-12-24	284	57
142	2016-01-07	2015-12-24	55	57
157	2016-01-08	2016-01-08	59	12
158	\N	2016-01-08	152	540
159	2016-01-08	2016-01-08	79	10
94	2016-01-11	2015-11-16	230	338
152	2016-01-11	2016-01-05	294	383
161	\N	2016-01-12	230	6
116	2016-01-12	2015-12-07	138	383
148	2016-01-12	2015-12-30	276	423
162	\N	2016-01-13	276	501
145	2016-01-13	2015-12-30	283	470
165	2016-01-14	2016-01-14	290	423
166	2016-01-14	2016-01-14	290	423
170	2016-01-21	2016-01-21	98	583
172	2016-01-25	2016-01-25	59	423
163	2016-01-25	2016-01-13	284	2
164	2016-01-26	2016-01-14	222	558
146	2016-01-26	2015-12-30	269	66
147	2016-01-26	2015-12-30	37	66
91	2016-01-28	2015-11-13	102	9
178	\N	2016-01-28	232	9
177	2016-01-29	2016-01-28	325	1
179	\N	2016-01-29	274	620
171	2016-02-04	2016-01-22	322	4
127	2016-02-04	2015-12-14	272	420
153	2016-02-10	2016-01-05	295	304
77	2016-02-15	2015-10-27	60	279
124	2016-02-22	2015-12-11	268	74
122	2016-02-23	2015-12-11	278	73
88	2016-03-03	2015-11-10	200	68
99	2016-03-23	2015-11-16	228	131
102	2016-03-30	2015-11-18	238	131
140	2016-04-06	2015-12-24	45	90
95	2016-04-12	2015-11-16	223	75
56	2016-04-12	2015-10-19	109	177
175	2016-04-13	2016-01-27	323	600
128	2016-05-04	2015-12-14	270	423
176	2016-06-13	2016-01-27	324	79
154	2016-06-15	2016-01-07	275	64
173	2016-06-27	2016-01-26	54	66
174	2016-06-27	2016-01-26	284	66
113	2016-07-04	2015-11-30	101	345
112	2016-07-04	2015-11-30	68	345
98	2016-07-18	2015-11-16	234	131
135	2016-07-25	2015-12-16	49	197
155	2016-08-05	2016-01-07	46	422
68	2016-10-19	2015-10-22	120	65
60	2016-09-09	2015-10-20	34	193
72	2016-09-23	2015-10-26	123	221
167	2016-10-27	2016-01-18	33	84
103	2016-12-12	2015-11-18	239	191
160	2016-12-22	2016-01-11	55	547
106	2017-01-13	2015-11-20	172	357
114	2016-02-02	2015-12-01	80	177
182	2016-02-10	2016-02-03	302	304
183	2016-02-10	2016-02-03	309	304
187	\N	2016-02-10	309	646
188	\N	2016-02-12	157	253
184	2016-02-15	2016-02-05	39	423
169	2016-02-15	2016-01-19	291	423
197	2016-02-29	2016-02-26	277	681
186	2016-02-29	2016-02-10	322	348
185	2016-03-02	2016-02-10	155	304
198	2016-03-03	2016-03-03	194	700
199	2016-03-03	2016-03-03	166	700
201	2016-03-04	2016-03-04	166	700
202	2016-03-04	2016-03-04	166	700
203	2016-03-04	2016-03-04	167	700
190	2016-03-07	2016-02-15	60	423
204	\N	2016-03-07	60	423
205	2016-03-07	2016-03-07	51	423
156	2016-03-08	2016-01-07	317	58
206	2016-03-08	2016-03-07	51	423
209	\N	2016-03-10	340	758
210	\N	2016-03-10	263	758
192	2016-03-10	2016-02-23	289	57
196	2016-03-14	2016-02-25	145	679
213	\N	2016-03-15	317	70
214	\N	2016-03-15	217	767
217	\N	2016-03-22	97	325
218	2016-03-22	2016-03-22	161	700
219	\N	2016-03-22	105	389
222	\N	2016-03-23	224	7
224	\N	2016-03-23	231	849
225	\N	2016-03-23	374	849
231	\N	2016-03-24	345	580
232	\N	2016-03-24	377	580
233	\N	2016-03-24	347	859
200	2016-03-29	2016-03-03	139	558
226	2016-03-30	2016-03-23	376	850
193	2016-03-30	2016-02-24	330	48
238	2016-03-31	2016-03-31	121	775
239	2016-03-31	2016-03-31	382	775
240	\N	2016-03-31	442	860
241	\N	2016-03-31	458	690
243	\N	2016-04-01	459	774
242	2016-04-01	2016-04-01	381	534
245	2016-04-01	2016-04-01	66	891
246	2016-04-01	2016-04-01	102	891
207	2016-04-05	2016-03-09	70	485
250	2016-04-06	2016-04-06	397	775
251	\N	2016-04-06	397	775
252	\N	2016-04-06	121	775
253	\N	2016-04-06	553	775
254	\N	2016-04-06	349	865
256	2016-04-06	2016-04-06	383	907
237	2016-04-06	2016-03-30	93	75
141	2016-04-06	2015-12-24	252	90
257	\N	2016-04-06	99	315
258	2016-04-11	2016-04-11	546	915
249	2016-04-11	2016-04-04	73	650
259	\N	2016-04-12	278	14
234	2016-04-12	2016-03-28	343	177
260	\N	2016-04-12	343	177
263	\N	2016-04-12	555	923
228	2016-04-12	2016-03-23	98	485
265	\N	2016-04-12	556	486
268	2016-04-13	2016-04-12	228	773
270	2016-04-13	2016-04-13	579	940
272	2016-04-14	2016-04-14	74	900
273	2016-04-14	2016-04-14	575	900
276	2016-04-15	2016-04-15	575	900
278	2016-04-15	2016-04-15	74	900
244	2016-04-18	2016-04-01	116	57
211	2016-04-18	2016-03-10	200	57
280	\N	2016-04-18	567	353
195	2016-04-19	2016-02-25	150	679
284	\N	2016-04-20	568	865
216	2016-04-25	2016-03-17	117	772
288	\N	2016-04-26	583	73
286	2016-04-26	2016-04-25	287	772
191	2016-04-27	2016-02-22	329	74
289	\N	2016-04-28	564	132
290	\N	2016-04-28	562	135
269	2016-04-29	2016-04-12	241	485
271	2016-04-29	2016-04-13	96	485
227	2016-04-29	2016-03-23	371	485
180	2016-04-29	2016-01-29	90	485
189	2016-05-03	2016-02-15	281	57
292	2016-05-05	2016-05-05	179	1021
267	2016-05-06	2016-04-12	75	75
221	2016-05-06	2016-03-22	344	809
248	2016-05-06	2016-04-01	102	891
247	2016-05-06	2016-04-01	233	891
300	2016-05-06	2016-05-06	358	1027
302	\N	2016-05-06	253	366
303	2016-05-10	2016-05-10	63	182
304	\N	2016-05-10	581	249
305	\N	2016-05-11	69	182
285	2016-05-19	2016-04-22	252	488
310	2016-05-20	2016-05-20	188	207
235	2016-05-23	2016-03-28	268	12
194	2016-05-23	2016-02-25	78	428
311	\N	2016-05-24	423	1083
312	2016-05-24	2016-05-24	423	1083
314	\N	2016-05-24	145	631
315	\N	2016-05-24	109	1085
281	2016-05-25	2016-04-18	359	75
318	2016-05-26	2016-05-26	100	75
287	2016-05-30	2016-04-25	323	986
323	\N	2016-05-30	603	254
261	2016-05-30	2016-04-12	574	177
262	2016-05-30	2016-04-12	563	177
274	2016-05-30	2016-04-14	372	177
324	\N	2016-05-31	155	500
325	\N	2016-05-31	604	558
230	2016-06-02	2016-03-24	379	856
328	\N	2016-06-06	389	1114
327	2016-06-06	2016-06-06	389	1114
320	2016-06-06	2016-05-30	554	1089
319	2016-06-06	2016-05-30	245	1089
295	2016-06-08	2016-05-06	76	75
296	2016-06-08	2016-05-06	573	75
333	\N	2016-06-10	600	1021
266	2016-06-10	2016-04-12	571	37
334	\N	2016-06-10	307	1021
299	2016-06-10	2016-05-06	98	1027
321	2016-06-13	2016-05-30	270	57
335	\N	2016-06-14	362	485
336	\N	2016-06-14	556	485
306	2016-06-20	2016-05-11	45	91
313	2016-06-22	2016-05-24	602	48
329	2016-06-30	2016-06-07	598	558
220	2016-07-04	2016-03-22	103	807
208	2016-07-04	2016-03-09	201	391
297	2016-07-06	2016-05-06	565	75
291	2016-07-06	2016-05-03	329	1011
264	2016-07-15	2016-04-12	561	177
331	2016-07-18	2016-06-09	36	765
309	2016-07-18	2016-05-20	560	131
236	2016-07-29	2016-03-28	318	681
326	2016-08-03	2016-05-31	605	1110
308	2016-08-18	2016-05-20	580	267
298	2016-08-24	2016-05-06	73	891
332	2016-09-20	2016-06-09	292	444
293	2016-09-21	2016-05-05	320	391
282	2016-09-21	2016-04-19	310	967
322	2016-09-22	2016-05-30	269	58
307	2016-09-23	2016-05-19	312	1021
301	2016-10-12	2016-05-06	251	447
223	2016-11-22	2016-03-23	373	37
337	2016-12-22	2016-06-16	597	772
212	2016-12-29	2016-03-14	335	422
317	2017-01-18	2016-05-25	359	1086
316	2017-01-31	2016-05-24	264	1077
277	2017-02-03	2016-04-15	558	923
181	2017-02-06	2016-02-02	328	249
338	2016-06-17	2016-06-17	59	57
341	\N	2016-06-17	376	865
340	2016-06-21	2016-06-17	200	279
346	\N	2016-06-22	275	66
347	2016-06-22	2016-06-22	283	765
339	2016-06-23	2016-06-17	587	765
350	\N	2016-06-24	372	1089
78	2016-06-27	2015-10-28	38	66
353	2016-06-29	2016-06-29	117	1186
354	2016-06-30	2016-06-30	531	775
355	\N	2016-06-30	531	915
352	2016-06-30	2016-06-27	589	765
255	2016-06-30	2016-04-06	339	304
125	2016-07-04	2015-12-11	280	72
360	\N	2016-07-05	289	488
361	\N	2016-07-06	565	1179
362	\N	2016-07-06	329	488
368	\N	2016-07-12	54	58
369	\N	2016-07-13	102	953
275	2016-07-13	2016-04-15	566	953
371	\N	2016-07-15	228	177
349	2016-07-18	2016-06-22	283	765
357	2016-07-20	2016-06-30	132	940
374	\N	2016-07-22	281	197
375	2016-07-22	2016-07-22	579	940
382	2016-07-22	2016-07-22	130	940
383	2016-07-25	2016-07-25	607	57
386	\N	2016-07-26	632	1279
356	2016-07-27	2016-06-30	117	1186
387	\N	2016-07-28	283	1053
342	2016-07-28	2016-06-21	614	644
215	2016-07-29	2016-03-15	286	681
389	2016-07-29	2016-07-29	614	42
351	2016-07-29	2016-06-24	372	1089
390	\N	2016-07-29	614	42
410	\N	2016-08-03	930	1315
364	2016-08-04	2016-07-08	291	1194
414	2016-08-05	2016-08-05	40	1315
136	2016-08-05	2015-12-16	273	15
416	\N	2016-08-08	61	48
345	2016-08-08	2016-06-22	326	48
385	2016-08-10	2016-07-25	49	57
418	\N	2016-08-10	658	1279
419	\N	2016-08-10	652	1279
394	2016-08-10	2016-08-03	653	1313
396	2016-08-10	2016-08-03	716	1313
397	2016-08-10	2016-08-03	654	1313
398	2016-08-10	2016-08-03	718	1313
399	2016-08-10	2016-08-03	656	1313
402	2016-08-10	2016-08-03	703	1313
404	2016-08-10	2016-08-03	635	1313
406	2016-08-10	2016-08-03	659	1313
407	2016-08-10	2016-08-03	738	1313
408	2016-08-10	2016-08-03	627	1313
400	2016-08-10	2016-08-03	745	1313
401	2016-08-10	2016-08-03	870	1313
403	2016-08-10	2016-08-03	878	1313
405	2016-08-10	2016-08-03	688	1313
395	2016-08-10	2016-08-03	885	1313
393	2016-08-12	2016-08-02	51	57
412	2016-08-12	2016-08-04	156	976
417	2016-08-15	2016-08-08	74	1331
422	2016-08-15	2016-08-15	199	1269
425	\N	2016-08-16	935	1315
426	\N	2016-08-17	51	72
427	\N	2016-08-17	936	1279
428	\N	2016-08-17	937	1279
370	2016-08-18	2016-07-14	598	558
429	\N	2016-08-19	578	1366
330	2016-08-19	2016-06-08	573	1027
430	\N	2016-08-19	932	279
431	2016-08-22	2016-08-22	382	1377
420	2016-08-22	2016-08-11	606	57
434	\N	2016-08-22	637	1313
433	2016-08-22	2016-08-22	641	1313
436	\N	2016-08-23	569	1395
437	2016-08-23	2016-08-23	199	1315
439	\N	2016-08-24	70	891
440	\N	2016-08-24	940	558
442	2016-08-25	2016-08-25	290	1390
444	\N	2016-08-29	286	1390
409	2016-08-30	2016-08-03	58	1110
448	2016-09-09	2016-09-09	44	1339
443	2016-09-12	2016-08-26	290	1390
363	2016-09-12	2016-07-07	621	73
359	2016-09-12	2016-07-05	619	1013
452	2016-09-12	2016-09-12	619	1013
453	2016-09-12	2016-09-12	619	1013
454	2016-09-14	2016-09-12	619	1013
432	2016-09-14	2016-08-22	606	1013
413	2016-09-14	2016-08-04	705	1321
457	2016-09-14	2016-09-14	619	1494
411	2016-09-14	2016-08-04	117	1194
460	\N	2016-09-16	744	1277
461	\N	2016-09-16	656	1277
424	2016-09-16	2016-08-16	293	1011
391	2016-09-19	2016-08-01	336	681
446	2016-09-19	2016-09-08	942	293
462	2016-09-19	2016-09-19	622	1513
384	2016-09-20	2016-07-25	607	1272
465	\N	2016-09-20	292	1504
466	2016-09-20	2016-09-20	657	1513
467	2016-09-20	2016-09-20	761	1513
441	2016-09-21	2016-08-24	272	681
415	2016-09-21	2016-08-05	619	15
283	2016-09-21	2016-04-19	319	967
470	\N	2016-09-23	333	1550
471	\N	2016-09-23	619	1350
472	2016-09-23	2016-09-23	657	1555
473	\N	2016-09-23	943	1556
474	\N	2016-09-23	974	1559
475	\N	2016-09-23	305	1021
455	2016-09-29	2016-09-13	934	681
476	\N	2016-09-29	262	1593
478	\N	2016-09-30	326	622
479	\N	2016-09-30	651	622
480	\N	2016-09-30	633	622
481	\N	2016-09-30	337	1534
482	\N	2016-10-03	310	381
483	2016-10-03	2016-10-03	622	193
484	2016-10-03	2016-10-03	621	1013
485	2016-10-03	2016-10-03	621	1013
449	2016-10-04	2016-09-12	58	1110
486	2016-10-04	2016-10-04	117	1110
489	2016-10-04	2016-10-04	95	390
392	2016-10-05	2016-08-02	325	765
490	\N	2016-10-06	574	1618
493	\N	2016-10-07	45	91
464	2016-10-10	2016-09-20	336	1140
421	2016-10-10	2016-08-12	321	193
468	2016-10-19	2016-09-21	49	681
469	2016-10-19	2016-09-21	293	444
423	2016-10-20	2016-08-16	933	1011
492	2016-10-20	2016-10-06	299	940
491	2016-10-20	2016-10-06	320	940
376	2016-10-20	2016-07-22	141	940
458	2016-10-21	2016-09-15	619	681
379	2016-10-24	2016-07-22	298	940
343	2016-10-27	2016-06-21	200	279
488	2016-11-09	2016-10-04	76	1478
459	2016-11-21	2016-09-16	605	1504
487	2016-11-22	2016-10-04	372	1510
373	2016-11-24	2016-07-20	334	940
381	2016-11-24	2016-07-22	298	940
348	2016-11-28	2016-06-22	557	1162
344	2016-11-29	2016-06-22	602	47
438	2016-11-30	2016-08-24	560	891
372	2016-12-22	2016-07-18	287	772
378	2016-12-22	2016-07-22	298	940
366	2017-01-09	2016-07-08	284	1194
358	2017-01-16	2016-07-04	103	345
388	2017-01-26	2016-07-28	620	197
365	2017-01-26	2016-07-08	599	1220
447	2017-02-20	2016-09-09	34	193
445	2016-10-08	2016-09-02	252	1232
494	2016-10-10	2016-10-10	621	1654
495	\N	2016-10-10	156	1659
367	2016-10-11	2016-07-11	37	765
496	2016-10-11	2016-10-11	273	1110
497	2016-10-11	2016-10-11	117	1556
498	2016-10-11	2016-10-11	273	681
502	\N	2016-10-11	252	91
503	\N	2016-10-12	566	6
505	\N	2016-10-13	957	1678
509	\N	2016-10-14	980	1681
501	2016-10-18	2016-10-11	273	681
500	2016-10-18	2016-10-11	273	681
499	2016-10-18	2016-10-11	273	681
511	\N	2016-10-19	621	193
510	2016-10-19	2016-10-19	277	1694
506	2016-10-20	2016-10-14	408	775
507	2016-10-20	2016-10-14	475	775
508	2016-10-20	2016-10-14	405	775
513	\N	2016-10-20	545	775
515	\N	2016-10-20	986	1710
380	2016-10-20	2016-07-22	298	940
516	\N	2016-10-20	201	976
463	2016-10-24	2016-09-20	607	57
518	\N	2016-10-24	975	391
519	\N	2016-10-24	492	53
520	\N	2016-10-24	268	91
514	2016-10-25	2016-10-20	985	1518
522	2016-10-25	2016-10-25	316	1652
524	\N	2016-10-25	934	1293
525	\N	2016-10-25	42	1293
528	\N	2016-10-27	33	53
512	2016-10-27	2016-10-19	277	1694
531	\N	2016-11-01	610	57
532	\N	2016-11-02	996	1114
533	\N	2016-11-02	985	1114
535	\N	2016-11-02	417	1114
536	\N	2016-11-03	1021	1533
534	2016-11-04	2016-11-02	396	1114
537	\N	2016-11-04	1006	1114
539	2016-11-08	2016-11-07	704	1766
541	\N	2016-11-09	325	422
542	\N	2016-11-09	38	422
544	\N	2016-11-09	73	953
377	2016-11-10	2016-07-22	218	940
545	2016-11-10	2016-11-10	216	1269
540	2016-11-10	2016-11-08	643	1766
279	2016-11-14	2016-04-18	338	386
530	2016-11-14	2016-10-31	44	1110
548	2016-11-14	2016-11-14	801	1786
550	\N	2016-11-15	272	53
527	2016-11-18	2016-10-27	200	53
552	\N	2016-11-18	200	1110
553	\N	2016-11-18	300	1489
555	2016-11-22	2016-11-22	308	1804
558	\N	2016-11-22	79	1027
560	\N	2016-11-23	75	1835
543	2016-11-24	2016-11-09	37	78
562	\N	2016-11-24	831	1807
563	\N	2016-11-24	831	1807
477	2016-11-24	2016-09-30	942	1174
567	2016-11-24	2016-11-24	942	1174
569	2016-11-25	2016-11-25	584	1859
570	2016-11-25	2016-11-25	584	1859
568	2016-11-25	2016-11-25	282	1859
572	2016-11-29	2016-11-28	933	620
573	2016-11-29	2016-11-28	1030	620
575	2016-11-30	2016-11-30	607	78
576	2016-12-01	2016-12-01	93	891
577	\N	2016-12-02	942	271
571	2016-12-02	2016-11-28	1018	1799
556	2016-12-02	2016-11-22	1026	1510
578	\N	2016-12-05	933	1390
523	2016-12-06	2016-10-25	316	1728
580	2016-12-07	2016-12-07	731	1766
526	2016-12-07	2016-10-26	273	70
581	\N	2016-12-07	273	74
582	\N	2016-12-07	138	1799
554	2016-12-08	2016-11-21	62	1797
564	2016-12-09	2016-11-24	358	580
584	\N	2016-12-09	950	1786
517	2016-12-12	2016-10-21	588	1110
547	2016-12-12	2016-11-14	609	1110
586	2016-12-12	2016-12-12	559	1925
587	\N	2016-12-12	560	1060
588	\N	2016-12-12	560	1060
589	2016-12-12	2016-12-12	1031	259
590	\N	2016-12-12	1056	1331
559	2016-12-13	2016-11-22	973	642
504	2016-12-13	2016-10-13	256	1243
591	\N	2016-12-13	255	1243
592	\N	2016-12-15	516	78
593	\N	2016-12-15	1032	1186
594	\N	2016-12-15	1035	1957
595	\N	2016-12-16	1031	1013
596	2016-12-16	2016-12-16	46	1013
450	2016-12-16	2016-09-12	290	1390
597	\N	2016-12-19	290	1390
598	\N	2016-12-20	1041	57
599	\N	2016-12-20	607	57
600	\N	2016-12-20	1061	488
574	2016-12-21	2016-11-29	602	1841
601	\N	2016-12-22	1063	772
549	2016-12-22	2016-11-14	280	772
602	2016-12-22	2016-12-22	321	772
603	\N	2016-12-22	55	279
566	2016-12-22	2016-11-24	338	940
565	2016-12-22	2016-11-24	306	940
606	2016-12-26	2016-12-23	605	2003
529	2016-12-26	2016-10-31	49	1140
607	\N	2016-12-26	622	42
608	\N	2016-12-28	1043	1566
609	\N	2016-12-28	590	1566
610	\N	2016-12-29	335	3
611	2016-12-30	2016-12-29	104	1418
585	2017-01-02	2016-12-12	668	856
604	2017-01-02	2016-12-22	308	940
551	2017-01-03	2016-11-18	994	1681
613	\N	2017-01-03	984	1681
614	\N	2017-01-03	1014	1681
583	2017-01-03	2016-12-07	37	199
615	\N	2017-01-03	191	2029
546	2017-01-03	2016-11-11	291	2
616	\N	2017-01-03	291	199
617	\N	2017-01-04	601	1420
538	2017-01-05	2016-11-07	1022	48
618	2017-01-05	2017-01-05	973	48
294	2017-01-10	2016-05-05	66	690
456	2017-01-10	2016-09-14	318	1013
619	\N	2017-01-10	318	1140
620	\N	2017-01-11	282	2070
621	\N	2017-01-11	1022	622
622	\N	2017-01-11	295	940
623	\N	2017-01-12	939	940
625	\N	2017-01-13	1067	2029
626	\N	2017-01-13	588	51
605	2017-01-16	2016-12-23	557	1988
628	\N	2017-01-17	987	2105
629	\N	2017-01-17	989	2105
627	2017-01-17	2017-01-16	371	1988
630	\N	2017-01-17	90	2103
579	2017-01-18	2016-12-06	316	1728
635	\N	2017-01-20	695	2117
636	\N	2017-01-20	792	2117
637	2017-01-20	2017-01-20	584	73
632	2017-01-20	2017-01-18	101	1974
638	\N	2017-01-20	234	1974
639	\N	2017-01-23	331	64
640	\N	2017-01-23	112	2125
641	\N	2017-01-26	993	907
642	\N	2017-01-26	620	261
634	2017-01-26	2017-01-19	643	558
633	2017-01-26	2017-01-18	95	1974
643	\N	2017-01-30	557	2046
561	2017-01-31	2016-11-24	320	1526
644	\N	2017-01-31	320	1077
645	\N	2017-02-01	1077	390
646	\N	2017-02-01	1075	353
647	\N	2017-02-01	284	261
521	2017-02-09	2016-10-25	988	1518
624	2017-02-20	2017-01-12	1029	1829
612	2017-02-22	2016-12-29	110	9
648	2017-03-01	2017-02-03	358	1974
649	2017-02-03	2017-02-03	241	1085
650	\N	2017-02-03	1076	923
557	2017-02-06	2016-11-22	1025	1510
651	\N	2017-02-06	1086	1510
652	\N	2017-02-06	1089	1813
653	\N	2017-02-06	1078	1618
654	\N	2017-02-06	1091	2179
655	\N	2017-02-06	1088	2046
657	\N	2017-02-08	1081	2125
658	2017-02-08	2017-02-08	62	1339
659	\N	2017-02-08	270	1830
661	\N	2017-02-09	103	486
656	2017-02-09	2017-02-08	101	486
662	\N	2017-02-09	74	84
663	\N	2017-02-10	120	2200
631	2017-02-10	2017-01-17	90	2103
665	2017-02-10	2017-02-10	373	2103
666	\N	2017-02-13	1038	620
667	\N	2017-02-13	101	338
668	\N	2017-02-15	1083	2125
669	\N	2017-02-15	371	2125
670	\N	2017-02-16	1082	1950
671	\N	2017-02-16	708	616
672	\N	2017-02-17	1094	428
673	\N	2017-02-17	605	2231
674	\N	2017-02-20	576	2239
675	\N	2017-02-21	1103	191
676	\N	2017-02-21	1069	597
660	2017-02-22	2017-02-09	117	2069
677	\N	2017-02-22	66	9
229	2017-02-22	2016-03-23	108	366
678	\N	2017-02-22	95	366
435	2017-02-23	2016-08-23	154	1238
679	2017-03-01	2017-03-01	1111	2260
664	2017-03-01	2017-02-10	360	1988
680	\N	2017-03-02	1023	66
681	\N	2017-03-02	39	66
682	\N	2017-03-02	1071	2232
683	\N	2017-03-03	1011	2201
687	2017-03-03	2017-03-03	405	2201
686	2017-03-03	2017-03-03	999	2201
685	2017-03-03	2017-03-03	999	2201
684	2017-03-03	2017-03-03	999	2201
688	\N	2017-03-03	1098	3
\.


--
-- Name: loan_gen; Type: SEQUENCE SET; Schema: public; Owner: libraryadmin
--

SELECT pg_catalog.setval('loan_gen', 688, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: libraryadmin
--

COPY users (id, email, name) FROM stdin;
1	alisboa@thoughtworks.com	Adriano Lisboa
2	fantunes@thoughtworks.com	Felipe Antunes
3	tcarmo@thoughtworks.com	Tiago Carmo
4	eduarte@thoughtworks.com	Elio Duarte
6	mcorrale@thoughtworks.com	David Corrales
7	dalcocer@thoughtworks.com	Diego Alcocer
338	edelgado@thoughtworks.com	Ernesto Medina Delgado
9	mduenias@thoughtworks.com	Maria Elena Duenias
10	jmorales@thoughtworks.com	Jessica Morales
340	jreyes@thoughtworks.com	Jonathan Reyes
12	disrael@thoughtworks.com	Dawson Israel
97	nmenhem@thoughtworks.com	Natalia Menhem
14	jdornel@thoughtworks.com	Juliana Dorneles
15	pprado@thoughtworks.com	Patrick Prado
16	lguimara@thoughtworks.com	Leandro Guimaraes
17	lmunda@thoughtworks.com	Luz Marina Unda
19	agarcia@thoughtworks.com	Ariam Garcia
346	cfuentes@thoughtworks.com	Carlos Fuentes
348	rmaia@thoughtworks.com	Rodrigo Maia
250	mbalhest@thoughtworks.com	Maite Balhester
252	ddeva@thoughtworks.com	Dhiana Deva
254	fmartins@thoughtworks.com	Fernanda Martins
444	mviegas@thoughtworks.com	Marcio Viegas
354	gchasifa@thoughtworks.com	Gabriela Chasifan
262	omachado@thoughtworks.com	Otavio Rodrigues Machado
264	cborim@thoughtworks.com	Carolina Borim
266	gprestes@thoughtworks.com	Guilherme Prestes
268	lmello@thoughtworks.com	Luciene Mello
174	mjormaza@thoughtworks.com	Maria Jose Ormaza
175	sriprak@thoughtworks.com	Sri Prasanna K
270	mneris@thoughtworks.com	Marrony Neris
177	fcoronel@thoughtworks.com	Freddy Coronel
37	josilvam@thoughtworks.com	Jose Silva
272	aamaral@thoughtworks.com	Augusto Amaral
179	digarcia@thoughtworks.com	Diana Garcia
181	geguez@thoughtworks.com	Gustavo Eguez
42	fviane@thoughtworks.com	Francieli Viane
43	lsouza@thoughtworks.com	Luiza Souza
182	arodrig@thoughtworks.com	Adisleydis Rodríguez
276	lpalmas@thoughtworks.com	Leticia Nunes
46	psilva@thoughtworks.com	Pedro Silva
47	ebraga@thoughtworks.com	Eduardo Braga
48	fmorais@thoughtworks.com	Felipe Morais
51	tcruz@thoughtworks.com	Tulio Cruz
186	mtait@thoughtworks.com	Matheus Tait
53	tmegale@thoughtworks.com	Tiago Megale
282	gdutra@thoughtworks.com	Guilherme Dutra
188	rsalazar@thoughtworks.com	Rodrigo Salazar
56	btrecent@thoughtworks.com	Bruno Trecenti
57	rlemos@thoughtworks.com	Raquel Lemos
58	lalonso@thoughtworks.com	Leandro Alonso
191	mmurillo@thoughtworks.com	Mauricio Murillo
366	btorres@thoughtworks.com	Byron Torres
63	fzampa@thoughtworks.com	Felipe Zampa
64	gmelo@thoughtworks.com	Gregorio Melo
65	gvinici@thoughtworks.com	Glauco Vinicius
66	gfroes@thoughtworks.com	Guilherme Froes
131	fureta@thoughtworks.com	Felipe Ureta
68	dnotini@thoughtworks.com	Denise Notini
132	rparedes@thoughtworks.com	Roberto Paredes
70	bdias@thoughtworks.com	Bruno Dias
71	dsilva@thoughtworks.com	Diogo Silva
72	acarvalh@thoughtworks.com	Anderson Carvalho
73	raolivei@thoughtworks.com	Rafael de Almeida Oliveira
74	mcosta@thoughtworks.com	Mateus Costa
75	lnunes@thoughtworks.com	Luiza Nunes
193	ldelfim@thoughtworks.com	Flavia Delfim
194	cboadu@thoughtworks.com	Charles Akoto Boadu
78	bsanches@thoughtworks.com	Barbara Sanches
79	ajmartin@thoughtworks.com	Agda Martins
135	fescobar@thoughtworks.com	Freddy Escobar
195	mscudero@thoughtworks.com	María Fernanda Escudero
83	gnotari@thoughtworks.com	Gabriel Notari
84	procha@thoughtworks.com	Pedro Rocha
197	mbueno@thoughtworks.com	Michel Bueno
199	mganine@thoughtworks.com	Marcos Ganine
90	lavila@thoughtworks.com	Lucas Avila
91	rgoncalv@thoughtworks.com	Ramon Goncalves
298	lramag@thoughtworks.com	Luciano Ramalho
302	tkrische@thoughtworks.com	Thais Krischer
304	vandrade@thoughtworks.com	Vinicius Andrade
306	rguimar@thoughtworks.com	Raquel Guimaraes
207	Jmercad@thoughtworks.com	Jesus Mercado
386	hsoejima@thoughtworks.com	Henrique Soejima
214	gargenti@thoughtworks.com	Gustavo Argentino
390	spuente@thoughtworks.com	Sebastian Puente
392	mrodrigu@thoughtworks.com	Marcus Rodrigues
221	tsiqueir@thoughtworks.com	Thais Siqueira
345	cpinto@thoughtworks.com	Cristian Pinto
249	voliveir@thoughtworks.com	Vania Oliveira
251	ccarrara@thoughtworks.com	Caio Carrara
253	abarbos@thoughtworks.com	Alexandre Barbosa
255	btavare@thoughtworks.com	Bruno Tavares
257	vcosta@thoughtworks.com	Vinicius Costa
259	hrodrigu@thoughtworks.com	Henrique Rodrigues
261	vgama@thoughtworks.com	Vinicius Gama
447	bleonar@thoughtworks.com	Bruno Silva
265	rsoares@thoughtworks.com	Roberto Soares
267	lcampos@thoughtworks.com	Leonardo Campos
269	rliedke@thoughtworks.com	Raquel Liedke
271	jengler@thoughtworks.com	Jonas Engler
273	txavier@thoughtworks.com	Thiago Xavier
275	gliberat@thoughtworks.com	Giovane Liberato
277	acosta@thoughtworks.com	Anne Costa
279	jsantana@thoughtworks.com	Joao Lucas Santana
353	rvallejo@thoughtworks.com	Rodrigo Vallejo
285	dbianche@thoughtworks.com	Diego Bianchetti
357	alacerda@thoughtworks.com	Ana Lacerda
291	greis@thoughtworks.com	Guilherme Reis
293	rretamal@thoughtworks.com	Ricardo Retamal
361	lramalho@thoughtworks.com	Luciano Ramalho
299	imedeiro@thoughtworks.com	Igor Medeiros
301	dbarboza@thoughtworks.com	Danilo Barboza
315	pchavez@thoughtworks.com	Pamela Chavez
381	mnetto@thoughtworks.com	Manoel Netto
325	rcastill@thoughtworks.com	Ramiro Castillo
383	rgomes@thoughtworks.com	Rafael Gomes
387	dcosta@thoughtworks.com	Denis Costa
389	mrueda@thoughtworks.com	Miguel Rueda
391	pevange@thoughtworks.com	Pedro Evangelista
393	kyzhang@thoughtworks.com	Kai Y Zhang
404	cvieira@thoughtworks.com	Carolina Vieira
406	rwendel@thoughtworks.com	Ricardo Wendell
420	adomenic@thoughtworks.com	Adriano Domeniconi
422	lrocha@thoughtworks.com	Lisiane Rocha
423	eferreir@thoughtworks.com	Elayne Ferreira
425	lvargas@thoughtworks.com	Luis Vargas
428	vrodrig@thoughtworks.com	Veronica Rodriguez
470	fdornela@thoughtworks.com	Felipe Dornelas
476	fpio@thoughtworks.com	Fabio Pio
485	sceli@thoughtworks.com	Sofia Celi
486	vzapata@thoughtworks.com	Valentin Zapata
488	agomes@thoughtworks.com	Ana Paula Gomes
490	tfernand@thoughtworks.com	Tayane Fernandes
500	tcasagra@thoughtworks.com	Tulio Casagrande
501	nmoura@thoughtworks.com	Nayara Moura
1967	vfernand@thoughtworks.com	Vinicius Fernandes
597	msanches@thoughtworks.com	Mauricio Sanches
700	vlima@thoughtworks.com	Vanessa Lima
600	jgama@thoughtworks.com	Josi Gama
1060	droman@thoughtworks.com	David Roman
602	larmand@thoughtworks.com	Luis Armando Bianchin
1526	ecerejo@thoughtworks.com	Eduardo Cerejo
1532	foliveir@thoughtworks.com	Francisco Oliveira
606	mderaldo@thoughtworks.com	Melina Deraldo
518	settwai@thoughtworks.com	Sett Wai
607	jfarah@thoughtworks.com	Julio Farah
1293	jutsch@thoughtworks.com	Jullie Utsch
609	yueliu@thoughtworks.com	Yue Liu
1420	rnobre@thoughtworks.com	Renata Nobre
612	gmaier@thoughtworks.com	Gabriel Pereira
1081	dasfora@thoughtworks.com	Diego Asfora
1728	dmaximi@thoughtworks.com	Maximiliano Drumond
616	lbeier@thoughtworks.com	Lucas Beier
1308	lcnunes@thoughtworks.com	Luciana Nunes
1093	sndaye@thoughtworks.com	Steven Tshiamala Ndaye
1991	pmartins@thoughtworks.com	Paola Martins
620	mbrizeno@thoughtworks.com	Marcos Brizeno
534	ntsakoc@thoughtworks.com	Ntsako Gift Chauke
622	gmiranda@thoughtworks.com	Gustavo Azevedo
1102	hsouza@thoughtworks.com	Henrique Souza
1199	dramalho@thoughtworks.com	Danilo Ramalho
1005	mcastro@thoughtworks.com	Mauricio Castro
1550	nbenigno@thoughtworks.com	Narciso Benigno
540	tuxavier@thoughtworks.com	Turah Xavier
541	lmedina@thoughtworks.com	Lucas Medina
1011	kmaia@thoughtworks.com	Kelly Maia
1320	rrech@thoughtworks.com	Rodrigo Rech
1114	nskhosan@thoughtworks.com	Nhlanhla Skhosana
545	calbuque@thoughtworks.com	Carina Albuquerque
1740	cbustama@thoughtworks.com	Claudio Bustamante
547	rsantos@thoughtworks.com	Romulo Santos
631	tkubotan@thoughtworks.com	Tatiana Kubotani
1556	glima@thoughtworks.com	Gisele Lima
1559	jlvneto@thoughtworks.com	Juraci Neto
1220	gmoretti@thoughtworks.com	Guilherme Moretti
2003	dbeda@thoughtworks.com	Debora Beda
1226	camorim@thoughtworks.com	Carlos Amorim
1232	pmotta@thoughtworks.com	Pedro Motta
558	vbarbosa@thoughtworks.com	Vitor Barbosa
559	iecheve@thoughtworks.com	Elena Echeverria
1238	dcortes@thoughtworks.com	Dayany Espindola
642	jblandin@thoughtworks.com	Jessica Blandina
1344	dbarra@thoughtworks.com	Daniel Barra
644	molivei@thoughtworks.com	Marcelo Oliveira
646	gcasagra@thoughtworks.com	Gabriela Casagranda
1350	lhanke@thoughtworks.com	Lucas Hanke
765	ncouto@thoughtworks.com	Nicole Couto
767	kbalasub@thoughtworks.com	Karthik Balasubramanian
650	mmachica@thoughtworks.com	Mauricio Machicado
1579	amenegot@thoughtworks.com	Andriele Menegotto
773	tsilva@thoughtworks.com	Tania Silva
775	nseakgoa@thoughtworks.com	Nelly Seakgoa
655	gbrigidi@thoughtworks.com	Gabriel Brigidi
1768	ptrejo@thoughtworks.com	Patricia Trejo
1259	amaeda@thoughtworks.com	Andherson Maeda
658	ialbuqu@thoughtworks.com	Isabella Albuquerque
580	lemme@thoughtworks.com	Luisa Emme
1593	naguiler@thoughtworks.com	Narjara de Aguilera
583	vperez@thoughtworks.com	Viviana Perez
1518	ltsoeu@thoughtworks.com	Bukiwe Tsoeu
1279	rnunes@thoughtworks.com	Rafael Nunes
1705	jrichard@thoughtworks.com	Johnny Richard
701	tsoares@thoughtworks.com	Tomas Soares
1841	mbsilva@thoughtworks.com	Mauricio Silva
705	einacio@thoughtworks.com	Erika Inacio
1968	ralmeida@thoughtworks.com	Roberto Almeida
1291	ssalim@thoughtworks.com	Samir Salim
967	lflores@thoughtworks.com	Luana Flores
1179	srosa@thoughtworks.com	Samantha Rosa
976	gconca@thoughtworks.com	Geisly Conca
1418	crivera@thoughtworks.com	Cristina Rivera
1185	mreyes@thoughtworks.com	Maria Jose Reyes
1533	imaciel@thoughtworks.com	Igor Maciel
679	chigashi@thoughtworks.com	Cristiane Higashi
1085	fbarco@thoughtworks.com	Fanny Barco
681	ronakja@thoughtworks.com	Ronak Jain
1303	mabegg@thoughtworks.com	Matheus Abegg
1194	tpenido@thoughtworks.com	Thiago Penido
1536	caraujo@thoughtworks.com	Carlos Araujo
1857	llasmar@thoughtworks.com	Leticia Lasmar
1315	ddetoni@thoughtworks.com	Douglas Detoni
1321	mvargas@thoughtworks.com	Marcelo Vargas
690	dvillaci@thoughtworks.com	Diego Villacis
1551	aarni@thoughtworks.com	Anike Arni
1021	wmartins@thoughtworks.com	Wandecleya Martins
1988	raalmeid@thoughtworks.com	Roberto Almeida
758	cmartins@thoughtworks.com	Clarissa Martins
1027	csuarez@thoughtworks.com	Carla Suarez
762	gborges@thoughtworks.com	Grazielle Borges
1333	vbauer@thoughtworks.com	Veller Bauer
1336	jkirchne@thoughtworks.com	Jean Kirchner
1339	aaraujo@thoughtworks.com	Ayrton Araujo
1557	jstachel@thoughtworks.com	Jefferson Stachelski
772	cdperei@thoughtworks.com	Caio Pereira
774	ttakuva@thoughtworks.com	Tariro Sharon Takuva
1566	lcsouza@thoughtworks.com	Lorena Souza
1354	abonat@thoughtworks.com	Adriano Bonat
1254	mthiago@thoughtworks.com	Mariana Thiago
2008	nagustin@thoughtworks.com	Nicolas Agustin
1260	hmedeiro@thoughtworks.com	Helio Medeiros
792	mtheodor@thoughtworks.com	Marcelo Theodoro
1366	mnishi@thoughtworks.com	Marianne Nishihata
1266	lnery@thoughtworks.com	Lucas Nery
1269	gcorrea@thoughtworks.com	Gabriela Correa
1272	prampane@thoughtworks.com	Pamela Rampanelli
1369	fhdelfi@thoughtworks.com	Felipe Delfim
1377	charlott@thoughtworks.com	Charlotte Turyahikayo
2020	rcruz@thoughtworks.com	Rodrigo Cruz
1478	acabrera@thoughtworks.com	Alberto Cabrera
2239	pjimenez@thoughtworks.com	Paola Jimenez
1385	craphael@thoughtworks.com	Cynthia Raphaella
807	njumbo@thoughtworks.com	Nelson Jumbo
809	gmoreno@thoughtworks.com	Geykel Moreno
1489	kbezerra@thoughtworks.com	Karlisson Bezerra
1395	jfreixin@thoughtworks.com	Jose Freixinos
1603	tpalma@thoughtworks.com	Thiago Palma
849	dpinto@thoughtworks.com	Diana Pinto
850	slazo@thoughtworks.com	Santiago Lazo
1799	rpierri@thoughtworks.com	Rafael Pierri
856	clopes@thoughtworks.com	Carlos Lopes
1513	rpereira@thoughtworks.com	Rodolfo Pereira
859	twcamper@thoughtworks.com	Tim Camper
860	gdias@thoughtworks.com	Guilherme Dias
1823	emeneses@thoughtworks.com	Eduardo Meneses
864	ssalazar@thoughtworks.com	Andres Salazar
865	ppluas@thoughtworks.com	Pamela Pluas
1950	scastro@thoughtworks.com	Slim Castro
1829	rfagund@thoughtworks.com	Renan Fagundes
1835	evelasco@thoughtworks.com	Elizabeth Velasco
880	lsoares@thoughtworks.com	Lourenço Soares
2105	cbaker@thoughtworks.com	Chris Baker
1053	rmartins@thoughtworks.com	Renan Martins
953	dvillavi@thoughtworks.com	Daniela Villavicencio
1277	rfeijolo@thoughtworks.com	Rodrigo Feijolo
959	akhan@thoughtworks.com	Aslam Khan
1162	dsuarez@thoughtworks.com	Denisse Suarez
1710	kpassos@thoughtworks.com	Keithy Passos
891	jcornejo@thoughtworks.com	Juan Manuel Cornejo
1174	yrachid@thoughtworks.com	Yasser Rachid
2200	tgonzale@thoughtworks.com	Tania Gonzales
1077	mbravo@thoughtworks.com	Mariana Bravo
986	ezuccolo@thoughtworks.com	Enzo Zuccolotto
1083	mleande@thoughtworks.com	Morne Leander
898	tafsam@thoughtworks.com	Tafadzwa Samushonga
1086	kmora@thoughtworks.com	Karina Mora
900	spinia@thoughtworks.com	Saul Pinia
1089	ssuarez@thoughtworks.com	Steven Suarez
998	cmoers@thoughtworks.com	Caroline Moers
1534	jmoraes@thoughtworks.com	Jorge Moraes
1186	lmiglio@thoughtworks.com	Leandro Miglioli
1730	blandim@thoughtworks.com	Barbara Landim
907	charlest@thoughtworks.com	Charles Tumwebaze
1013	lpedone@thoughtworks.com	Luiz Pedone
1110	promagno@thoughtworks.com	Priscilla Romagnoli
1997	jmariano@thoughtworks.com	Julio Mariano
913	qventer@thoughtworks.com	Quintis Venter
914	coquendo@thoughtworks.com	Carlos Andres Oquendo
915	halleh@thoughtworks.com	Halle Handwatch
1313	ncraven@thoughtworks.com	Neil Philip Craven
1207	amilesi@thoughtworks.com	Antonio Milesi
1555	dcenteno@thoughtworks.com	Diego Centeno
1561	praneshb@thoughtworks.com	Pranesh Babasaheb Pokale
923	ipazmino@thoughtworks.com	Ivan Pazmino
1049	mschmidt@thoughtworks.com	Marcelo Schmidt
1225	aneves@thoughtworks.com	Andre Neves
1140	lmcunha@thoughtworks.com	Lucas Cunha
1331	xnaunay@thoughtworks.com	Xavier Naunay
1890	jvanin@thoughtworks.com	Junior Vanin
1766	jnaomi@thoughtworks.com	Julia Naomi
1343	amaia@thoughtworks.com	Ana Paula Maia
932	amohale@thoughtworks.com	Ali Mohale
933	tndlovu@thoughtworks.com	Thembinkosi Ndlovu
934	aphuroe@thoughtworks.com	Atlehang Phuroe
935	mzelda@thoughtworks.com	Millicent Zelda
1243	gsaman@thoughtworks.com	Gabrielle Saman
940	tmicheli@thoughtworks.com	Thales Micheli
1255	dsantos@thoughtworks.com	Desiree Santos
1258	lschlede@thoughtworks.com	Luiz Felipe Schleder
2029	morrico@thoughtworks.com	Mila Orrico
2260	ntsilva@thoughtworks.com	Nadia Silva
1912	ccele@thoughtworks.com	Catherine Cele
1482	zarellan@thoughtworks.com	Zully Arellano
1797	dsantiba@thoughtworks.com	Daniel Santibanez
1494	rmferraz@thoughtworks.com	Renato Ferraz
1608	vsgomes@thoughtworks.com	Vitor Gomes
2048	scrodrig@thoughtworks.com	Schubert Rodriguez
1386	vstefan@thoughtworks.com	Virginia Stefanello
1809	lfarina@thoughtworks.com	Leandro Farina
1390	rpinheir@thoughtworks.com	Rodrigo Pinheiro
1504	nsarsur@thoughtworks.com	Nadja Sarsur
1508	jzanella@thoughtworks.com	Jonathan Zanella
1510	nsoto@thoughtworks.com	Nilet Soto
1618	achiribo@thoughtworks.com	Alejandro Chiriboga
1945	faraujo@thoughtworks.com	Fernanda Araujo
1830	ddaim@thoughtworks.com	Daniel Daim
2069	tgomes@thoughtworks.com	Thalita Gomes
1957	acruz@thoughtworks.com	Anna Cruz
1652	lzanotti@thoughtworks.com	Laura Zanotti
1654	kcaldas@thoughtworks.com	Krishna Caldas
2103	cortiz@thoughtworks.com	Carlos Ortiz
1659	jbessler@thoughtworks.com	Julia Bessler
1974	jvillac@thoughtworks.com	Jose Villacreses
1851	daraujo@thoughtworks.com	Diogenes Araujo
1859	lmoura@thoughtworks.com	Lucas Moura
2201	dsinha@thoughtworks.com	Dipannita Sinha
1735	adaros@thoughtworks.com	Ana Paula Daros
1755	shylatm@thoughtworks.com	Shylat Manzira
2231	rprado@thoughtworks.com	Rafaela Prado
1771	guayres@thoughtworks.com	Gustavo Ayres
1678	cmaniero@thoughtworks.com	Carlos Maniero
1681	hcampbel@thoughtworks.com	Harold Campbell
2256	mbarboza@thoughtworks.com	Mariana Barboza
1786	aoberzin@thoughtworks.com	Augusto Oberziner
1795	wcalder@thoughtworks.com	William Calderipe
1804	gmicheli@thoughtworks.com	Guilherme Michelini
1807	jdoming@thoughtworks.com	Jorge Dominguez
1813	jriewe@thoughtworks.com	Jens Riewe
1925	jsolano@thoughtworks.com	Janeth Solano
1694	ivillavi@thoughtworks.com	Isabel Villavicencio
2046	mhernand@thoughtworks.com	Miguel Hernandes
2055	lreis@thoughtworks.com	Luan Reis
1831	galmeida@thoughtworks.com	Gabriel Almeida
1837	jcarrill@thoughtworks.com	Jennifer Carrillo
2070	ibarroso@thoughtworks.com	Isabella Barroso
2117	delias@thoughtworks.com	Desiree Elias
2119	mvsouza@thoughtworks.com	Marcia Souza
2121	lmviola@thoughtworks.com	Lucas Viola
2125	atelleri@thoughtworks.com	Ana Telleria
2134	jtoscano@thoughtworks.com	Jonathan Toscano
2145	cjacome@thoughtworks.com	Cristina Jacome
2160	xpaz@thoughtworks.com	Xavier Paz
2207	jgarces@thoughtworks.com	Jorge Garces
2232	mcecchi@thoughtworks.com	Mario Cecchi
2266	jfernan@thoughtworks.com	Juliana Fernandes
2179	chernand@thoughtworks.com	Carlos Hernandez
\.


--
-- Name: users_gen; Type: SEQUENCE SET; Schema: public; Owner: libraryadmin
--

SELECT pg_catalog.setval('users_gen', 2276, true);


--
-- Data for Name: waitinglist; Type: TABLE DATA; Schema: public; Owner: libraryadmin
--

COPY waitinglist (id, end_date, start_date, book_id, library_id, user_id) FROM stdin;
\.


--
-- Name: waitinglist_gen; Type: SEQUENCE SET; Schema: public; Owner: libraryadmin
--

SELECT pg_catalog.setval('waitinglist_gen', 1, false);


--
-- Name: book_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);


--
-- Name: copy_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY copy
    ADD CONSTRAINT copy_pkey PRIMARY KEY (id);


--
-- Name: library_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY library
    ADD CONSTRAINT library_pkey PRIMARY KEY (id);


--
-- Name: loan_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY loan
    ADD CONSTRAINT loan_pkey PRIMARY KEY (id);


--
-- Name: pk_databasechangeloglock; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY databasechangeloglock
    ADD CONSTRAINT pk_databasechangeloglock PRIMARY KEY (id);


--
-- Name: uk_5nj8t1hc0l2kvb1r212p2lhkx; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY library
    ADD CONSTRAINT uk_5nj8t1hc0l2kvb1r212p2lhkx UNIQUE (slug);


--
-- Name: uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: waitinglist_pkey; Type: CONSTRAINT; Schema: public; Owner: libraryadmin; Tablespace: 
--

ALTER TABLE ONLY waitinglist
    ADD CONSTRAINT waitinglist_pkey PRIMARY KEY (id);


--
-- Name: fk_5nr6joxxjm233xyongnbacj1f; Type: FK CONSTRAINT; Schema: public; Owner: libraryadmin
--

ALTER TABLE ONLY copy
    ADD CONSTRAINT fk_5nr6joxxjm233xyongnbacj1f FOREIGN KEY (book_id) REFERENCES book(id);


--
-- Name: fk_9e00wniurtr8oqb6i164homop; Type: FK CONSTRAINT; Schema: public; Owner: libraryadmin
--

ALTER TABLE ONLY waitinglist
    ADD CONSTRAINT fk_9e00wniurtr8oqb6i164homop FOREIGN KEY (library_id) REFERENCES library(id);


--
-- Name: fk_bwuisnj36jfuu5e55crd3dp0x; Type: FK CONSTRAINT; Schema: public; Owner: libraryadmin
--

ALTER TABLE ONLY copy
    ADD CONSTRAINT fk_bwuisnj36jfuu5e55crd3dp0x FOREIGN KEY (library_id) REFERENCES library(id);


--
-- Name: fk_eqno849fya3lf1n3sf1hng7ni; Type: FK CONSTRAINT; Schema: public; Owner: libraryadmin
--

ALTER TABLE ONLY waitinglist
    ADD CONSTRAINT fk_eqno849fya3lf1n3sf1hng7ni FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: fk_f7obux2dkllw86emoch3jejy7; Type: FK CONSTRAINT; Schema: public; Owner: libraryadmin
--

ALTER TABLE ONLY loan
    ADD CONSTRAINT fk_f7obux2dkllw86emoch3jejy7 FOREIGN KEY (copy_id) REFERENCES copy(id);


--
-- Name: fk_snp5j1a5kw8r7f2kv1pxu9hp0; Type: FK CONSTRAINT; Schema: public; Owner: libraryadmin
--

ALTER TABLE ONLY loan
    ADD CONSTRAINT fk_snp5j1a5kw8r7f2kv1pxu9hp0 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: fk_socuygl9cpvxt4k46pc7j12uv; Type: FK CONSTRAINT; Schema: public; Owner: libraryadmin
--

ALTER TABLE ONLY waitinglist
    ADD CONSTRAINT fk_socuygl9cpvxt4k46pc7j12uv FOREIGN KEY (book_id) REFERENCES book(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

