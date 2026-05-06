import ContentSectionRenderer from "../../utils/content/ContentSectionRenderer";
import type { ContentSection } from "../../utils/content/types/types";

const paragraphs: ContentSection[] = [
    {
        title: "Contact Forgers™",
        content: [
            {
                type: "text",
                value:
                    "We’re here to help. Whether you have a question about an order, need assistance with a product, or just want to get in touch, the Forgers™ team is happy to hear from you."
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
                type: "list",
                items: [
                    "Email: support@forgers.com",
                    "Response time: Within 1–2 business days"
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
                    "Interested in working with Forgers™? For brand collaborations, partnerships, or business inquiries, please contact:"   
            },
            {
                type: "text",
                value:
                    "Email: collaborations@forgers.com"
            }
        ]
    },
    {
        title: "Collaborations & Partnerships",
        content: [
            {
                type: "text",
                value:
                    "The name Forgers™ reflects the idea of shaping something with intention. Just like forged materials are strengthened through careful craft, personal style and identity are shaped through thoughtful choices."
            },
            {
                type: "text",
                value:
                    "Forgers™ represents confidence, creativity, and the freedom to define your own look—without limits."
            }
        ]
    },
    {
        title: "Stay Connected",
        content: [
            {
                type: "text",
                value:
                    "Follow Forgers™ for updates, new arrivals, and inspiration:"
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