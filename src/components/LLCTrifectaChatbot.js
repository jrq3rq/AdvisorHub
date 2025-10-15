import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/LLCTrifectaChatbot.css";

// LLCTrifectaChatbot component provides an interactive chat-like interface for explaining the LLC Trifecta strategy
const LLCTrifectaChatbot = ({ onClose }) => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileSaverLoaded, setIsFileSaverLoaded] = useState(false);

  // Load FileSaver.js via CDN
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js";
    script.async = true;
    script.onload = () => setIsFileSaverLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Scroll to the top of the container when messages update
  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      chatContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [messages]);

  // Helper function for formatting option labels (fixes LLC display and capitalization)
  const formatOptionLabel = (optionId) => {
    return optionId
      .replace(/_/g, " ")
      .replace(/llc/g, "LLC")
      .replace(/ira/g, "IRA")
      .replace(/cope/g, "COPE")
      .replace(/scorp/g, "S Corp")
      .replace(/#(\d+)/g, "# $1")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace("Llc", "LLC")
      .replace("Scorp", "S Corp");
  };

  // Comprehensive conversation nodes for LLC Trifecta strategy in manual style
  const conversationNodes = {
    start: {
      response:
        "Hello! Welcome to the LLC Trifecta Manual—a clear, step-by-step guide to building wealth securely with LLCs.\n\n" +
        "This manual is for everyone: side hustlers, freelancers, families, and retirees alike.\n\n" +
        "You'll learn how LLCs separate your 'left side' (active income from gigs, businesses, and assets like Uber or Etsy earnings) from your 'right side' (legacy building for tax savings, asset protection, and inheritance).\n\n" +
        "It's fully scalable—start simple under $2,000 and grow at your pace, regardless of age, marital status, or income.\n\n" +
        "LLCs are flexible U.S. tools for protection and taxes, but this is educational only—not legal advice. Always consult professionals.\n\n" +
        "Ready to get started? Let's turn the page!",
      options: [
        "intro_trifecta",
        "llc1_holding",
        "llc2_operational",
        "llc3_scorp",
        "llc4_partnership",
        "llc5_cope",
        "llc6_ira",
        "application_general",
        "best_practices",
        "costs_setup",
        "reality_check",
        "about_tool",
        "exit",
      ],
    },
    intro_trifecta: {
      response: `**Section 1: Trifecta Framework Overview**

This framework appeals to everyone—70% of Americans have side hustles, and it protects your earnings while growing wealth.

What is it? It's a simple blueprint. The 'left side' covers active income: jobs, gigs like Uber or Etsy, and investments. The 'right side' handles passive assets: savings, rentals, and retirement. Separating them minimizes risks and supports steady growth.

Why does it work for all? It creates 'financial armor' against lawsuits and taxes. Singles use it to protect gigs. Married couples build family legacies. Low-income starters can begin with free state filings—no barriers.

How does it work step by step? Begin with affordable LLCs at $400–$1,200. In your 20s, emphasize protection. In your 40s, focus on tax savings. In retirement, secure your legacy.

Broad benefits include tax deductions for mileage and home offices, liability shields in our litigious U.S., and compounded savings—even for the 78% living paycheck-to-paycheck.

Your first step: Assess your situation. Inventory income, assets, and goals like stability or growth. This builds your foundation.

Reflect and proceed to the next section as needed.`,
      options: ["llc1_holding", "application_general", "best_practices", "start", "exit"],
    },
    llc1_holding: {
      response: `**Section 2: LLC #1 - Holding LLC for Assets**

This section suits anyone with risky items, such as a car for deliveries, equipment, or a first rental like an Airbnb room.

The purpose is clear: It holds investments like rentals or stocks for protection, focusing less on taxes. This shields your personal life from asset-related lawsuits.

Benefits are straightforward. You get limited liability—a lawsuit affects only the LLC. Privacy keeps your name off titles and leases. For example, a California resident owning Tennessee property uses a Tennessee LLC to isolate risks.

Who uses this? Middle-class individuals protecting home equity or freelancers safeguarding gear. It's ideal for modest investments with low initial risk.

Setup is simple. Go online for $400–$600 basic version. Opt for $1,000–$1,200 full package, including operating agreement, EIN, and minutes. Lawyers help newbies avoid mistakes.

Tips for success: Reserve for real risks, not every item. Balance costs and evolve your assets, perhaps using apps like Roofstock for growth.

Consider how this applies to you—move forward when ready.`,
      options: ["llc2_operational", "costs_setup", "reality_check", "start", "exit"],
    },
    llc2_operational: {
      response: `**Section 3: LLC #2 - Operational LLC for Business & Hustles**

Ideal for 1 in 3 Americans with gigs like Etsy sales, rideshare driving, or consulting.

The purpose handles 'left side' operations. It separates revenue and expenses from personal banks for organized management.

Benefits include added legitimacy and liability protection. It builds a 'wall' from personal assets and allows deductions for everything, such as internet and mileage.

Examples clarify: A teacher tutoring online uses this LLC for income and write-offs. A realtor keeps operations in a California LLC and rentals separate.

Appeal lies in its fit for solopreneurs—over 60 million in the U.S. Get professional invoices without needing employees.

A common mistake: Assuming the LLC document alone provides full protection. Always maintain separation to keep benefits intact.

Review and continue building your knowledge.`,
      options: ["llc3_scorp", "reality_check", "start", "exit"],
    },
    llc3_scorp: {
      response: `**Section 4: LLC #3 - S Corporation Election**

This optimizes taxes for growing hustles earning $50K+, achievable through YouTube or DoorDash.

The purpose: Convert your Operational LLC (#2) at the income threshold to unlock savings.

Benefits save 15.3% self-employment tax on profits—it applies only to salary, not distributions. For example, on $100K profit, save $9K on $60K distributions.

Implementation is easy: A simple election costs $300–$500 with no complex payroll, just quarterly reports.

Who benefits? Nurses with side shops, influencers, or electricians. Middle-class users fund vacations or college savings.

Admin notes: File forms online via free IRS tools and split income at year-end. It's straightforward for growth.

Apply this when your earnings align—proceed to partnerships next.`,
      options: ["llc4_partnership", "best_practices", "start", "exit"],
    },
    llc4_partnership: {
      response: `**Section 5: LLC #4 - Partnership LLC**

Designed for teams: family businesses, spouses, or friends, even in group crypto buys.

The purpose documents joint ventures on asset or operations sides and defines ownership plus profits clearly.

Benefits protect from a partner's actions and avoid handshake deals that lead to disasters or lawsuits.

Examples help: Siblings renting a house use the LLC to shield each owner. Couples podcasting set clear rules upfront.

Why essential? The wealthy always document—it's risky otherwise. Immigrants pool resources safely, and it strengthens bonds.

Broad appeal reaches millennials co-buying in high-cost markets to build trust and security.

Lesson on partnerships: Structure is key. Continue to advanced protection.`,
      options: ["llc5_cope", "start", "exit"],
    },
    llc5_cope: {
      response: `**Section 6: LLC #5 - COPE LLC (Charging Order Protection Entity)**

Advanced shield for assets reaching $100K+—average U.S. household level by age 50s.

The purpose adds an extra barrier between personal actions and your business or assets.

Benefits protect assets from personal suits. For instance, a car accident won't impact rentals. It complements LLC #1 perfectly.

Practical example: A homeowner with rentals isolates everything if sued personally.

Who needs this? Retirees or boomers nesting eggs, or aspirational savers building wealth like you.

Setup requirements: Lawyer-required. It layers in diagrams as trust → COPE → LLCs for planning.

Evolve your defenses—consider how this fits your growth stage.`,
      options: ["llc6_ira", "start", "exit"],
    },
    llc6_ira: {
      response: `**Section 7: Special LLC #6 - IRA/401(k) LLC (Self-Directed)**

Smarter retirement for 44% of Americans with accounts—invest beyond Wall Street.

The purpose: Owned by a self-directed IRA for alternatives like real estate, crypto, or small businesses.

Benefits let you invest in what you know with 'checkbook control' for quick moves. Peter Thiel grew his Roth IRA to billions this way.

How to start: Use a custodian at $500 setup. Explore property flips or local businesses instead of stocks.

Examples inspire: A mechanic invests in an auto shop via IRA. Enjoy better fees than Fidelity or Schwab.

Rules to follow: Strict IRS compliance requires a lawyer—not DIY, but worth the cost. Builds tax-free legacy.

Your retirement, your rules—think big and plan ahead.`,
      options: ["application_general", "start", "exit"],
    },
    application_general: {
      response: `**Section 8: Universal Application in Real Life**

Apply it all! Turn a $10K hustle into an empire and reduce stress for everyday people.

Step 1: Assess left and right sides. Tools like ZenBusiness apps simplify the process.

Steps 2-7: Add LLCs gradually, starting with #1-2. Remote workers deduct home offices seamlessly.

For all demographics: Singles shield gigs, families pass inheritance, low-income qualify for free filings.

Core benefits: Ringfences risks and creates legacies for kids. Join communities like Reddit for shared stories.

How to evolve: As income and assets grow, layer on more—achieve financial freedom for all.

Action item: Map this manual to your goals today.`,
      options: ["best_practices", "costs_setup", "start", "exit"],
    },
    best_practices: {
      response: `**Section 9: Best Practices & Tips**

Scalable advice for maximum impact in your wealth journey.

How to start small: Use LLCs #1-2 under $2K with LegalZoom plus lawyer review.

Avoid overload: One LLC per major risk—not for tiny things to keep admin low.

Maintenance must-knows: Separate banks and file annual reports at $50–$800. Note state variations, like higher fees in CA.

Important caveats: Skip DIY for #5-6; find affordable lawyers at $200/hr via UpCounsel.

Ultimate goals: Save taxes, protect assets, build legacy. Grab free IRS EINs online.

Practice these tips—wealth building becomes a practical skill.`,
      options: ["reality_check", "start", "exit"],
    },
    costs_setup: {
      response: `**Section 10: Costs & Setup Details**

Budget wisely—this is affordable for all.

Basic LLC breakdown: $400–$600 online, covering state fees.

Full package: $1,000–$1,200 includes docs and EIN.

Advanced adds: S-Election at $300–$500. IRA LLC higher with custodian plus lawyer.

Ongoing costs: Annual reports $50–$800. Lawyers crucial for first-timers to get it right.

Why it pays off: Savings outweigh risks—deductions and protection repay fast.

Knowledge check: Does this fit your budget? Adjust and proceed.`,
      options: ["start", "exit"],
    },
    reality_check: {
      response: `**Section 11: Reality Check & Final Insights**

Honest talk—no shortcuts in wealth protection.

Maintenance is key: Avoid commingling funds; poor records void protection entirely.

Scaling wisely: Build the trifecta gradually. Common mistake: Over-relying on one LLC alone.

Who to consult: Tax lawyers like KQS with 25+ years for nationwide help.

Core truth: Wealthy evolve structures—start now and do something practical.

Final disclaimer: This is general education. Personalize with pros for your situation.

You've read the manual—apply and thrive!`,
      options: ["start", "exit"],
    },
    about_tool: {
      response: "This manual educates on the LLC Trifecta for wealth building. It's designed for side hustlers, families, and retirees with scalable, step-by-step sections. Not legal or tax advice—use to clarify priorities, then consult pros. State laws vary; build gradually and seek expert guidance.",
      options: ["start", "exit"],
    },
    exit: {
      response:
        "Manual complete! Thanks for reading the LLC Trifecta guide. Key takeaways: Save taxes, protect assets, leave a legacy. Always consult attorneys and tax pros for personalized plans—this was general guidance to empower your journey. Keep learning and building!",
      options: [],
    },
  };

  // Handle click on conversation options with a delay and loading state
  const handleOptionClick = (nextNodeId, currentMessage) => {
    const node = conversationNodes[nextNodeId];
    if (!node) {
      console.error(`Node not found: ${nextNodeId}`);
      return;
    }

    setVisitedNodes((prev) => new Set([...prev, nextNodeId]));
    setCurrentNodeId(nextNodeId);

    const userMessage = {
      id: uuidv4(),
      role: "user",
      content: formatOptionLabel(nextNodeId),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [userMessage, ...prev]);
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage = {
        id: uuidv4(),
        role: "assistant",
        content: node.response,
        timestamp: new Date().toISOString(),
        options: node.options || null,
        url: node.url || null,
        nodeId: nextNodeId,
      };

      setMessages((prev) => [aiMessage, ...prev]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

  // Helper to strip markdown from content for plain text download
  const stripMarkdown = (text) => {
    return text
      .replace(/\*\*/g, '') // Remove bold **
      .replace(/\*/g, '') // Remove italic *
      .replace(/__/g, '') // Remove underline if any
      .replace(/`[^`]*`/g, (match) => match.slice(1, -1)) // Remove code `
      .replace(/#{1,6}\s?/g, '') // Remove headers #
      .replace(/\n\n/g, '\n\n') // Keep paragraph spacing
      .trim();
  };

  const downloadResponse = (content, nodeId) => {
    if (isFileSaverLoaded && window.saveAs) {
      const plainText = stripMarkdown(content);
      const blob = new Blob([plainText], { type: "text/plain;charset=utf-8" });
      const date = new Date().toISOString().split("T")[0];
      const filename = `LLCTrifectaAdvice_${nodeId}_${date}.txt`;
      window.saveAs(blob, filename);
    } else {
      console.error("FileSaver.js is not loaded or not supported.");
    }
  };

  const MessageBubble = ({ message }) => {
    // Split content into paragraphs for manual-style reading (handles \n\n)
    const paragraphs = message.content.split('\n\n').map((para, index) => {
      const lines = para.split('\n');
      const title = lines[0].startsWith('**') ? lines[0] : null;
      const body = title ? lines.slice(1).join(' ') : para;

      return (
        <div key={index}>
          {title && <h3 dangerouslySetInnerHTML={{ __html: title.replace(/\*\*/g, '') }} />}
          <p>{body.trim()}</p>
        </div>
      );
    });

    return (
      <div className={`llc-message ${message.role === "user" ? "user" : "assistant"}`}>
        {paragraphs}
        {message.role === "assistant" && (
          <button
            className="download-btn"
            onClick={() => downloadResponse(message.content, message.nodeId || "general")}
            aria-label="Download this response"
          >
            Download
          </button>
        )}
        {message.options && (
          <div className="link-buttons">
            {message.options.map((optionId, index) => (
              <button
                key={index}
                className="helper-link-button"
                onClick={() => handleOptionClick(optionId, message)}
                disabled={visitedNodes.has(optionId)}
                aria-label={`Explore ${formatOptionLabel(optionId)}`}
              >
                {formatOptionLabel(optionId)}
              </button>
            ))}
          </div>
        )}
        <span className="llc-timestamp">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    );
  };

  const LoadingIndicator = () => (
    <div className="loading-indicator">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="llc-modal">
        <div className="llc-header">
          <h3>LLC Trifecta Manual</h3>
          <button
            onClick={onClose}
            className="llc-close-button"
            aria-label="Close LLC Trifecta Modal"
          >
            ×
          </button>
        </div>
        <div className="llc-container" ref={chatContainerRef}>
          {messages.length === 0 && (
            <div className="llc-hints">
              <div className="llc-welcome">
                {conversationNodes.start.response.split('\n\n').map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
              <div className="hint-buttons">
                {conversationNodes.start.options.map((optionId, index) => (
                  <button
                    key={index}
                    className="hint-button"
                    onClick={() => handleOptionClick(optionId, { options: conversationNodes.start.options })}
                    disabled={visitedNodes.has(optionId)}
                    aria-label={`Explore ${formatOptionLabel(optionId)}`}
                  >
                    {formatOptionLabel(optionId)}
                  </button>
                ))}
              </div>
            </div>
          )}
          {isLoading && <LoadingIndicator />}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
        <div className="llc-input">
          <input
            type="text"
            placeholder="Type your question..."
            disabled={true}
            aria-label="Type your question"
          />
          <button
            className="llc-send-btn"
            disabled={true}
            aria-label="Send Question"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default LLCTrifectaChatbot;