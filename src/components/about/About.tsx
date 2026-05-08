import ContentSectionRenderer from "../../utils/content/ContentSectionRenderer";
import type { ContentSection } from "../../utils/content/types/types";

const paragraphs: ContentSection[] = [
    {
        title: "About Forgers™",
        content: [
            {
                type: "rich-text",
                spans: [
                    { text: "Forgers™ ", marks: ["bold"] },
                    { text: "is a modern lifestyle store bringing together clothing, technology, and jewelry in one curated space." },
                ]
            },
            {
                type: "text",
                value: 
                    "We focus on pieces that balance style and function, so you can express yourself through what you wear, use, and accessorize with—without overthinking it."
            }
        ]
    },
    {
        title: "Curated for Everyday Style",
        content: [
            {
                type: "text",
                value: 
                    "Our collections are chosen to work together, making it easy to mix everyday essentials with standout details that fit your personal style. Whether you’re upgrading your look or adding the finishing touch, everything is designed to feel cohesive and effortless." 
            }
        ]
    },
    {
        title: "No Trends, Just Taste",
        content: [
            {
                type: "text",
                value: 
                    "At Forgers™, it’s not about chasing trends. It’s about offering products that feel current, well‑considered, and easy to make your own—pieces that feel right today and still make sense tomorrow."
            },
        ]
    },
    {
        title: "Why the Name Forgers™",
        content: [
            {
                type: "rich-text",
                spans: [
                    { text: "The name " },
                    { text: "Forgers™", marks: ["bold"] },
                    { text: "reflects the idea of shaping something with intention. Just like forged materials are strengthened through careful craft, personal style and identity are shaped through thoughtful choices." },
                ]
            },
            {
                type: "text",
                value:
                    "Forgers™ represents confidence, creativity, and the freedom to define your own look—without limits."
            }
        ]
    },
    {
        title: "Always Evolving",
        content: [
            {
                type: "text",
                value:
                    "We’re always exploring new ideas and refining our selection to bring you products that feel fresh, useful, and authentic." 
            },
            {
                type: "rich-text",
                spans: [
                    { text: "Forgers™ — " },
                    { text: "made for those who forge their own style.", marks: ["italic"] }
                ]
            }
        ]
    }
];

const About: React.FC = () => {
    return (
        <div className="relative flex-1 min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-8 p-8 md:p-10">
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

export default About;