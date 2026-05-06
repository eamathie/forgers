import ContentSectionRenderer from "../../utils/content/ContentSectionRenderer";
import type { ContentSection } from "../../utils/content/types/types";

const paragraphs: ContentSection[] = [
    {
        title: "Contact Forgers™",
        content: [
            {
                type: "rich-text",
                spans: [
                    { text: "We’re here to help. Whether you have a question about an order, need assistance with a product, or just want to get in touch, the " },
                    { text: "Forgers™", marks: ["bold"] },
                    { text: " team is happy to hear from you." }
                ]   
            }
        ]
    },
    {
        title: "Get in Touch",
        content: [
            {
                type: "text",
                value:
                    "For general inquiries, support questions, or feedback, reach out to us anytime:"
            },
            {
                type: "rich-text",
                spans: [
                    { text: "Email: ", marks: ["bold"] },
                    { text: "support@forgers.com" }
                ]
            },
            {
                type: "rich-text",
                spans: [
                    { text: "Response time: ", marks: ["bold"] },
                    { text: "Within 1–2 business days" }
                ]
            },
            {
                type: "text",
                value: "We aim to respond as quickly as possible and make sure you get the help you need."
            }
        ]
    },
    {
        title: "Orders & Support",
        content: [
            {
                type: "text",
                value:
                    "If you’re contacting us about an order, please include your order number where possible. This helps us assist you faster and more accurately."
            }
        ]
    },
    {
        title: "Collaborations & Partnerships",
        content: [
            {
                type: "text",
                value:
                    "Interested in working with Forgers™? For brand collaborations, partnerships, or business inquiries, please contact:"   
            },
            {
                type: "rich-text",
                spans: [
                    { text: "Email: ", marks: ["bold"] },
                    { text: "collaborations@forgers.com"}
                ]
            }
        ]
    },
    {
        title: "Stay Connected",
        content: [
            {
                type: "rich-text",
                spans: [
                    { text: "Follow " },
                    { text: "Forgers™ ", marks: ["bold"] },
                    { text: "for updates, new arrivals, and inspiration:" }
                ]
            },
            {
                type: "list",
                items: [
                    "Instagram",
                    "Facebook",
                    "X (Twitter)"
                ]
            },
            {
                type: "text",
                value: 
                    "Thanks for reaching out to Forgers™.\nWe look forward to hearing from you."
            }
        ]
    }
];

const Contact: React.FC = () => {
    return (
        <div className="relative flex-1 min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-8 p-8">
                {paragraphs.map(section => (
                    <ContentSectionRenderer
                        key={section.title}
                        section={section}
                    />
                ))}
            </div>
        </div>
    );
};

export default Contact;