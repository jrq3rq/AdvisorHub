import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/BusinessEntityChatbot.css";

// BusinessEntityChatbot component provides an interactive chat-like interface for business entity selection
const BusinessEntityChatbot = ({ onClose }) => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [currentNodeId, setCurrentNodeId] = useState(null); // Remove if not needed elsewhere
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

  // Helper function for formatting option labels
  const formatOptionLabel = (optionId) => {
    return optionId
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace("Ip", "IP")
      .replace("D O", "D&O");
  };

  // Comprehensive conversation nodes for business entity selection
  const conversationNodes = {
    start: {
      response:
        "Welcome to the Business Entity Advisor! I'm here to help you determine the best business structure for your needs—sole proprietorship, partnership, S corporation, or C corporation. Let's start with the fundamentals.",
      options: [
        "ownership_control",
        "liability_risk",
        "taxation",
        "funding_growth",
        "management_operations",
        "future_plans",
        "compliance_legal",
        "ip_ownership",
        "succession_planning",
        "insurance_risk",
        "administrative_concerns",
        "strategic_ethical",
        "employment_hr",
        "governance_records",
        "international_ops",
        "about_tool",
        "exit",
      ],
    },
    ownership_control: {
      response: `**Ownership and Control** is a key factor in choosing your business structure. Consider these questions:

1. How many owners/shareholders will you have initially, and do you anticipate adding more? *(More owners may require partnerships or corporations.)*
2. Will owners be individuals, trusts, other businesses, tax-exempt organizations, or non-U.S. residents? *(S corps restrict non-U.S. owners; C corps are more flexible.)*
3. Do you want complete control or are you comfortable sharing decision-making? *(Sole proprietorships offer full control; others involve shared governance.)*
4. Will you provide equity incentives to employees/consultants? *(C corps and LLCs are best for equity incentives.)*
5. Does the business need to continue independently if an owner leaves/dies? *(Corporations offer perpetual existence.)*`,
      options: ["liability_risk", "taxation", "funding_growth", "management_operations", "future_plans", "ownership_details", "start", "exit"],
    },
    liability_risk: {
      response: `**Liability and Risk Protection** is crucial. Consider these questions:

1. Are you willing to risk personal assets (home, savings) or want limited liability? *(Sole proprietorships/partnerships expose personal assets.)*
2. Do your services/products pose lawsuit risks (injuries, damages)? *(High-risk businesses benefit from corporate structures.)*
3. Do you have significant personal assets to protect? *(Limited liability entities protect personal wealth.)*
4. Is this a low-risk testing phase or high-risk industry? *(Low-risk may suit sole proprietorships.)*
5. How will you maintain liability protection? *(Requires proper record-keeping and separation of finances.)*`,
      options: ["ownership_control", "taxation", "funding_growth", "management_operations", "liability_details", "start", "exit"],
    },
    taxation: {
      response: `**Taxation** impacts your bottom line. Consider these questions:

1. Do you prefer pass-through taxation (personal returns) or corporate taxation? *(Pass-through avoids double taxation.)*
2. Will you distribute earnings immediately or reinvest for growth? *(C corps suit reinvestment.)*
3. Will you have startup losses to deduct personally? *(Pass-through entities allow loss deductions.)*
4. How do individual vs. corporate tax rates affect you? *(Check current rates and self-employment taxes.)*
5. Have your tax needs changed recently? *(Recent changes may influence entity choice.)*
6. Are you considering tax elections like S corp status? *(S corps combine corporate structure with pass-through.)*`,
      options: ["ownership_control", "liability_risk", "funding_growth", "tax_details", "start", "exit"],
    },
    funding_growth: {
      response: `**Funding, Growth, and Capital Needs** determine scalability. Consider these questions:

1. Do you need investors, venture capital, or stock sales? *(C corps are investor-friendly.)*
2. Will you seek funding from non-U.S. persons or many shareholders? *(C corps allow diverse shareholders.)*
3. Do you plan significant growth, hiring, or going public? *(C corps suit IPOs and scaling.)*
4. Do you need new capital or new owners/investors? *(Corporations facilitate capital raises.)*
5. Is attracting talent through stock options important? *(C corps offer flexible equity options.)*`,
      options: ["ownership_control", "liability_risk", "taxation", "funding_details", "start", "exit"],
    },
    management_operations: {
      response: `**Management, Flexibility, and Operations** affect daily running. Consider these questions:

1. How flexible does management need to be? *(Sole proprietorships offer maximum flexibility.)*
2. Can you handle formation paperwork and compliance? *(Corporations require more filings.)*
3. Do you prefer minimal setup or more structure? *(Sole proprietorships are simplest.)*
4. Will you need to adapt quickly to changes? *(Less formal structures are more adaptable.)*
5. Where will you form/operate (state-specific rules)? *(State laws impact compliance.)*`,
      options: ["ownership_control", "liability_risk", "taxation", "funding_growth", "management_details", "start", "exit"],
    },
    future_plans: {
      response: `**Future Plans and Adaptability** guide long-term structure. Consider these questions:

1. What are your 5-10 year plans (steady operation, sale, IPO)? *(C corps suit growth and exits.)*
2. Is the business mission-driven or focused on public benefit? *(Benefit corporations align with missions.)*
3. Are you prepared to change structure as needs evolve? *(Changing structures can incur costs.)*
4. Does it align with your exit strategy? *(Entity impacts sale or transfer ease.)*`,
      options: ["ownership_control", "future_details", "start", "exit"],
    },
    compliance_legal: {
      response: `**Compliance and Legal Considerations** add operational layers. Consider these questions:

1. What are annual compliance requirements in your state? *(Corporations need annual reports.)*
2. Are there industry licensing/regulatory approvals needed? *(Certain industries require specific licenses.)*
3. Will you operate in multiple states/countries? *(Requires foreign qualification.)*`,
      options: ["compliance_details", "start", "exit"],
    },
    ip_ownership: {
      response: `**Intellectual Property and Ownership Structure**. Consider these questions:

1. Who owns key IP, trademarks, software (entity vs. founders)? *(Entity ownership is standard.)*
2. Do you plan IP licensing between entities? *(Holding companies may be useful.)*
3. Will ownership % differ from voting rights/profit allocation? *(LLCs/partnerships allow customization.)*`,
      options: ["ip_details", "start", "exit"],
    },
    succession_planning: {
      response: `**Succession, Estate, and Asset Planning**. Consider these questions:

1. Should the entity simplify estate planning/transfer to family? *(LLCs/partnerships can simplify.)*
2. Planning multiple entities for asset protection/tax efficiency? *(Holding structures can help.)*
3. How will ownership transfer during exit, divorce, inheritance? *(Entity type affects valuation.)*`,
      options: ["succession_details", "start", "exit"],
    },
    insurance_risk: {
      response: `**Insurance and Risk Mitigation**. Consider these questions:

1. What insurance policies will you need (liability, D&O, etc.)? *(All entities need general liability.)*
2. Does entity type impact coverage availability? *(Corporations may need additional policies.)*`,
      options: ["insurance_details", "start", "exit"],
    },
    administrative_concerns: {
      response: `**Administrative and Practical Concerns**. Consider these questions:

1. What's your budget for formation/maintenance costs? *(Sole proprietorships are cheapest.)*
2. How much flexibility do you need for bookkeeping/tax filings? *(Corporations require more records.)*
3. Do you prefer simplicity/control or formal governance? *(Sole proprietorships offer simplicity.)*`,
      options: ["admin_details", "start", "exit"],
    },
    strategic_ethical: {
      response: `**Strategic or Ethical Considerations**. Consider these questions:

1. Do you want B Corp, nonprofit, or benefit corporation status? *(Aligns with social missions.)*
2. Does your model include community ownership or open-source? *(Cooperatives suit community models.)*`,
      options: ["strategic_details", "start", "exit"],
    },
    employment_hr: {
      response: `**Employment and HR Considerations**. Think about how you’ll hire, compensate, and manage employees:

1. Will you hire W-2 employees or 1099 contractors? *(Sole proprietors and partnerships often use contractors.)*
2. Will you offer benefits (health insurance, retirement plans)? *(Corporations are often better suited.)*
3. Do you plan to set up payroll or HR systems? *(Corporations and LLCs simplify compliance.)*
4. Are you concerned about employment taxes and worker classification? *(Entity type affects liability and taxes.)*
5. Will you issue equity-based compensation (options, RSUs)? *(C corps best for stock-based incentives.)*`,
      options: ["start", "exit"],
    },
    governance_records: {
      response: `**Governance and Record-Keeping**. Consider:

1. Will you maintain meeting minutes, bylaws, or operating agreements?
2. Do you need a board of directors or advisory board?
3. How will you handle voting, resolutions, or ownership changes?
4. Who will serve as registered agent or maintain compliance calendar?
5. Will you store records digitally or in physical form?`,
      options: ["start", "exit"],
    },
    international_ops: {
      response: `**International and Cross-Border Operations**. Consider:

1. Will you have non-U.S. founders, investors, or customers? *(S corps not allowed.)*
2. Are you planning foreign subsidiaries or sales abroad?
3. Will you need international tax compliance or transfer pricing planning?
4. Do you expect to repatriate profits or hold IP offshore?`,
      options: ["start", "exit"],
    },
    about_tool: {
      response: "This advisor offers educational guidance only—not legal or tax advice. It’s designed to help you clarify priorities before consulting professionals.",
      options: ["start", "exit"],
    },
    recommendation_prompt: {
      response: "Would you like entity recommendations based on your answers so far?",
      options: ["get_recommendation", "start", "exit"],
    },
    ownership_details: {
      response:
        "Based on ownership needs:\n- **Single owner**: Sole proprietorship (simplest)\n- **Multiple owners**: Partnership, S corp (limited), or C corp\n- **Future investors/non-U.S. owners**: C corp preferred\n- **Employee equity**: C corp or LLC (S corp has restrictions)\n\nReady to explore another area?",
      options: ["start", "exit"],
    },
    liability_details: {
      response:
        "Liability protection summary:\n- **No protection**: Sole proprietorship, general partnership\n- **Limited liability**: Limited partnership, S corp, C corp\n- **High risk industries**: Consider corporations\n- **Personal assets to protect**: Choose limited liability entities\n\nWhat else would you like to explore?",
      options: ["start", "exit"],
    },
    tax_details: {
      response:
        "Tax treatment overview:\n- **Pass-through (personal taxes)**: Sole prop, partnership, S corp\n- **Corporate taxes**: C corp (double taxation risk)\n- **Self-employment taxes**: Sole prop and partnerships\n- **Loss deductions**: Pass-through entities\n\nConsider consulting a tax professional for your specific situation.",
      options: ["start", "exit"],
    },
    funding_details: {
      response:
        "Funding considerations:\n- **Venture capital/IPO**: C corporation best\n- **Bank loans**: Most entities qualify\n- **Many shareholders**: C corp only\n- **Stock options**: C corp most flexible\n\nGrowth plans significantly impact entity choice.",
      options: ["start", "exit"],
    },
    management_details: {
      response:
        "Management complexity:\n- **Simplest**: Sole proprietorship\n- **Moderate**: Partnership\n- **Formal**: S corp, C corp (boards, meetings)\n- **State variations**: Check specific requirements\n\nBalance control vs. structure needs.",
      options: ["start", "exit"],
    },
    future_details: {
      response:
        "Future planning:\n- **Long-term growth**: C corp\n- **Family business**: Consider succession-friendly structures\n- **Exit strategy**: Entity impacts sale/transfer ease\n- **Mission-driven**: Explore benefit corporation options\n\nThink 5-10 years ahead.",
      options: ["start", "exit"],
    },
    compliance_details: {
      response:
        "Compliance varies by entity:\n- **Sole prop**: Minimal\n- **Partnership**: Agreement + basic filings\n- **Corporations**: Annual reports, meetings, registered agent\n- **Multi-state**: Foreign qualification needed\n\nBudget for ongoing compliance costs.",
      options: ["start", "exit"],
    },
    ip_details: {
      response:
        "IP ownership:\n- **Entity-owned**: Standard for most structures\n- **Founder-owned**: May complicate liability protection\n- **Multiple entities**: Consider holding company structure\n- **Custom agreements**: Partnerships/LLCs offer flexibility\n\nClear IP ownership prevents future disputes.",
      options: ["start", "exit"],
    },
    succession_details: {
      response:
        "Succession planning:\n- **Family transfer**: LLC/partnership may be simpler\n- **Asset protection**: Multiple entities structure\n- **Valuation**: Entity type affects transfer taxes\n- **Trust integration**: Consider estate planning compatibility\n\nPlan for ownership transitions early.",
      options: ["start", "exit"],
    },
    insurance_details: {
      response:
        "Insurance considerations:\n- **All entities**: General liability essential\n- **Corporations**: May need D&O insurance\n- **High-risk**: Professional liability/E&O\n- **Key person**: Consider for critical founders\n\nEntity choice can impact insurance costs/coverage.",
      options: ["start", "exit"],
    },
    admin_details: {
      response:
        "Administrative burden:\n- **Lowest cost**: Sole proprietorship\n- **Moderate**: Partnership\n- **Higher**: Corporations (filings, meetings)\n- **Bookkeeping**: Corporations require more separation\n\nBalance cost vs. protection/features needed.",
      options: ["start", "exit"],
    },
    strategic_details: {
      response:
        "Strategic considerations:\n- **Social mission**: B Corp, benefit corporation\n- **Community ownership**: Consider cooperative structures\n- **Open source**: May need special licensing\n- **Tokenization**: Emerging structures/DAOs\n\nAlign entity with your values and model.",
      options: ["start", "exit"],
    },
    get_recommendation: {
      response:
        "Based on typical scenarios:\n- **Sole Proprietorship**: Single owner, low risk, simple operations\n- **Partnership**: Multiple owners, shared control, moderate complexity\n- **S Corp**: Small business, pass-through taxes, limited shareholders\n- **C Corp**: Growth-focused, investor-friendly, corporate taxes\n\n**Next Steps**: Consult a business attorney and tax professional to match your specific situation to the optimal entity. State laws vary significantly.",
      options: ["exit"],
    },
    exit: {
      response:
        "Thanks for using the Business Entity Advisor! Remember to consult legal and tax professionals before making your final decision. This tool provides general guidance only.",
      options: [],
    },
  };

  // Handle click on conversation options with a delay and loading state
  const handleOptionClick = (nextNodeId, currentMessage) => {
    console.log(
      "Clicked option:",
      nextNodeId,
      "Current message:",
      currentMessage
    );

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

    // Add the user's message immediately and show loading
    setMessages((prev) => [userMessage, ...prev]);
    setIsLoading(true);

    // Simulate a delay before showing the AI's response
    setTimeout(() => {
      const aiMessage = {
        id: uuidv4(),
        role: "assistant",
        content: node.response || "", // Ensure content is string
        timestamp: new Date().toISOString(),
        options: node.options || null,
        url: node.url || null,
        nodeId: nextNodeId,
      };

      setMessages((prev) => [aiMessage, ...prev]);
      setIsLoading(false);
    }, 1500); // 1.5-second delay for more comprehensive responses
  };

  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

  // Helper to strip markdown from content for plain text download
  const stripMarkdown = (text) => {
    if (!text) return "";
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
      const filename = `BusinessEntityAdvice_${nodeId}_${date}.txt`;
      window.saveAs(blob, filename);
    } else {
      console.error("FileSaver.js is not loaded or not supported.");
    }
  };

  const MessageBubble = ({ message }) => {
    if (!message || !message.content) {
      return null; // Safety check
    }

    // Parse response to extract title, questions, bullet points, and final paragraph
    const lines = message.content.split('\n');
    let title = null;
    let questions = [];
    let bulletPoints = [];
    let finalParagraph = "";

    lines.forEach(line => {
      if (!title && line.startsWith('**')) {
        title = line;
      } else if (line.match(/^\d+\./)) {
        const splitIndex = line.indexOf('. ');
        if (splitIndex !== -1) {
          const questionWithNote = line.substring(splitIndex + 2);
          const noteSplit = questionWithNote.split(' *(');
          const question = noteSplit[0].trim();
          const note = noteSplit[1] ? noteSplit[1].replace(')*', '').trim() : null;
          questions.push({ question, note });
        }
      } else if (line.startsWith('-')) {
        const cleanedLine = line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        bulletPoints.push(cleanedLine);
      } else if (line.trim() && !title && questions.length === 0 && bulletPoints.length === 0) {
        finalParagraph += line.trim() + ' ';
      } else if (line.trim() && (questions.length > 0 || bulletPoints.length > 0)) {
        finalParagraph += line.trim() + ' ';
      }
    });

    return (
      <div
        className={`business-message ${
          message.role === "user" ? "user" : "assistant"
        }`}
      >
        {title && <h3 dangerouslySetInnerHTML={{ __html: title.replace(/\*\*/g, '') }} />}
        {questions.length > 0 && (
          <ol>
            {questions.map((q, index) => (
              <li key={index}>
                {q.question}
                {q.note && <span className="question-note"> ({q.note})</span>}
              </li>
            ))}
          </ol>
        )}
        {bulletPoints.length > 0 && (
          <ul>
            {bulletPoints.map((point, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
        )}
        {finalParagraph && <p>{finalParagraph.trim()}</p>}
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
        {message.url && (
          <div className="link-buttons">
            <a
              href={message.url}
              className="helper-link-button"
              onClick={() => onClose()}
              aria-label={`Go to ${message.url.split("/")[1]}`}
            >
              Go to {message.url.split("/")[1]}
            </a>
          </div>
        )}
        <span className="business-timestamp">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    );
  };

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="loading-indicator">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="business-modal">
        <div className="business-header">
          <h3>Business Entity Advisor</h3>
          <button
            onClick={onClose}
            className="business-close-button"
            aria-label="Close Business Entity Modal"
          >
            ×
          </button>
        </div>
        <div className="business-container" ref={chatContainerRef}>
          {messages.length === 0 && (
            <div className="business-hints">
              <p className="business-welcome">{conversationNodes.start.response}</p>
              <div className="hint-buttons">
                {conversationNodes.start.options.map((optionId, index) => (
                  <button
                    key={index}
                    className="hint-button"
                    onClick={() =>
                      handleOptionClick(optionId, {
                        options: conversationNodes.start.options,
                      })
                    }
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
        <div className="business-input">
          <input
            type="text"
            placeholder="Type your question..."
            disabled={true}
            aria-label="Type your question"
          />
          <button
            className="business-send-btn"
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

export default BusinessEntityChatbot;